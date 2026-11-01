import { sitePositions } from '../../data/mission';
import type { Fault, MissionState, SimEvent } from '../../types/mission';
import { CARGO_LOOP_LENGTH } from '../vehicles';
import { formatDuration } from '../time';
import { LINK_CLOSED_S, createComms, stepComms, type CommsChange } from './comms';
import { activeFault, openFault, resolveFault } from './faults';
import { createLander, isLanderBusy, stepLander } from './lander';
import { LOW_RESERVE, baseLoadKw, solarFieldKw, stepPower } from './power';
import { createRover, isRoverMoving, stepRover } from './rover';
import { STORM_WARNING_S, createWeather, stepWeather } from './weather';

export function createMission(commsEnabled = true): MissionState {
  const arrayDust = 0.14;
  const rover = createRover();
  const lander = createLander();
  const solarKw = solarFieldKw(175, arrayDust);
  return {
    rover,
    lander,
    resources: { power: 78.4, propellant: 61, oxygen: 92, water: 64, solarKw, netKw: solarKw - baseLoadKw(lander, rover), arrayDust },
    env: { temp: -16.2, wind: 6.6, pressure: 0.619, dust: 0.54, irradiance: 175, radiation: 10 },
    vehicles: { cargoU: 0.15, cargoDwell: 0, explorerT: 0 },
    comms: createComms(commsEnabled),
    weather: createWeather(),
    faults: [],
    queue: [],
    commandLog: [],
    elapsed: 0,
    startOdometer: 1284.6,
    startPropellant: 61
  };
}

const COMMS_INTERVAL = 75;
const ENV_INTERVAL = 110;

/** Opens/resolves a fault from a condition and reports the transition. */
function track(
faults: Fault[],
events: SimEvent[],
at: number,
cond: {system: Fault['system'];active: boolean;clear: boolean;title: string;severity: Fault['severity'];source: string;},
messages: {open: string;resolved: string;openDetail: string;resolvedDetail: string;})
: Fault[] {
  if (cond.active) {
    const r = openFault(faults, cond.system, cond.title, cond.severity, at);
    if (r.opened) {
      events.push({
        toast: { text: messages.open, tone: 'warn' },
        log: { source: cond.source, category: 'warning', status: 'error', title: cond.title, detail: messages.openDetail }
      });
    }
    return r.faults;
  }
  if (cond.clear) {
    const r = resolveFault(faults, cond.system, at);
    if (r.resolved) {
      events.push({
        toast: { text: messages.resolved, tone: 'ok' },
        log: { source: cond.source, category: 'warning', status: 'success', title: `${cond.title} · resolved`, detail: messages.resolvedDetail }
      });
    }
    return r.faults;
  }
  return faults;
}

export function stepMission(prev: MissionState, dt: number): {next: MissionState;events: SimEvent[];commsChange: CommsChange;} {
  const events: SimEvent[] = [];
  const elapsed = prev.elapsed + dt;

  // Weather
  const weatherRes = stepWeather(prev.weather, dt);
  const weather = weatherRes.next;
  const storm = weather.intensity;
  if (weatherRes.change === 'warning') {
    events.push({
      toast: { text: `Dust front inbound · storm in ${STORM_WARNING_S} s`, tone: 'warn' },
      log: { source: 'ENV', category: 'warning', status: 'waiting', title: 'Dust front inbound', detail: 'Expect reduced solar output and link quality' }
    });
  } else if (weatherRes.change === 'storm') {
    events.push({
      toast: { text: 'Dust storm · solar output and link degraded', tone: 'warn' },
      log: {
        source: 'ENV',
        category: 'warning',
        status: 'waiting',
        title: 'Dust storm over Hesper Basin',
        detail: `Expected ${Math.round(weather.duration)} s · weather NO-GO for launch`
      }
    });
  } else if (weatherRes.change === 'cleared') {
    events.push({
      toast: { text: 'Storm cleared · systems recovering', tone: 'ok' },
      log: { source: 'ENV', category: 'warning', status: 'success', title: 'Dust storm cleared', detail: 'Visibility and irradiance recovering' }
    });
  }

  // Comms
  const commsRes = stepComms(prev.comms, dt, storm);
  const comms = commsRes.next;
  if (commsRes.change === 'closed') {
    const counting = prev.lander.phase === 'countdown';
    events.push({
      toast: counting ?
      { text: `Link lost · count holding at T-${Math.ceil(prev.lander.countdown)}`, tone: 'warn' } :
      prev.queue.length ?
      undefined :
      { text: `Loss of signal · commands will queue for ${formatDuration(LINK_CLOSED_S)}`, tone: 'info' },
      log: {
        source: 'GROUND',
        category: 'comms',
        status: 'waiting',
        title: 'Loss of signal · relay TGO-2 below horizon',
        detail: `Next window in ${formatDuration(comms.remaining)}`
      }
    });
  } else if (commsRes.change === 'opened') {
    events.push({
      toast: prev.lander.phase === 'countdown' ? { text: 'Link acquired · count resuming', tone: 'ok' } : undefined,
      log: {
        source: 'GROUND',
        category: 'comms',
        title: 'Acquisition of signal · relay TGO-2',
        detail: prev.queue.length ? `Uplinking ${prev.queue.length} queued command${prev.queue.length > 1 ? 's' : ''}` : 'Uplink open'
      }
    });
  }

  // Lander — terminal count holds on lost link or a critical power fault.
  const powerCritical = !!activeFault(prev.faults, 'base-power');
  const landerRes = stepLander(prev.lander, dt, !comms.open || powerCritical);
  const lander = landerRes.next;
  events.push(...landerRes.events);

  let rover = prev.rover;
  if (isLanderBusy(lander) && isRoverMoving(rover)) {
    rover = { ...rover, status: 'holding' };
    events.push({
      toast: { text: 'ATLAS-01 holding · IX-7 propulsion active', tone: 'warn' },
      log: { source: 'ATLAS-01', category: 'telemetry', status: 'waiting', title: 'Traverse paused', detail: 'Holding for IX-7 propulsion activity' }
    });
  }
  const roverRes = stepRover(rover, dt, storm);
  events.push(...roverRes.events);

  // Environment
  const env = {
    ...prev.env,
    temp: -16.2 + Math.sin(elapsed * 0.01) * 0.8 - storm * 2.5,
    wind: 6.6 + Math.sin(elapsed * 0.13) * 0.7 + (Math.random() - 0.5) * 0.2 + storm * 12,
    irradiance: (175 + Math.sin(elapsed * 0.02) * 6) * (1 - 0.6 * storm),
    dust: 0.54 + Math.sin(elapsed * 0.004) * 0.05 + storm * 0.9
  };

  // Power
  const res = { ...prev.resources };
  res.arrayDust = Math.min(0.7, Math.max(0.12, res.arrayDust + dt * (0.004 * storm - 0.0015 * (1 - storm))));
  res.solarKw = solarFieldKw(env.irradiance, res.arrayDust);
  res.netKw = res.solarKw - baseLoadKw(lander, roverRes.next);
  res.power = stepPower(res.power, res.netKw, dt);
  if (lander.enginesOn) res.propellant = Math.max(0, res.propellant - dt * (lander.phase === 'ascent' ? 2.4 : 0.85));
  res.oxygen = Math.max(0, res.oxygen - dt * 0.0008);

  // Faults
  const r = roverRes.next;
  let faults = prev.faults;
  faults = track(
    faults,
    events,
    elapsed,
    { system: 'drill', active: r.drillOverheated, clear: !r.drillOverheated, title: 'Drill overheated', severity: 'critical', source: 'ATLAS-01' },
    {
      open: 'Drill overheated · coring blocked',
      resolved: 'Drill cooled · coring available',
      openDetail: `Bit heat ${Math.round(r.drillHeat * 100)}% · let it cool or run Inspect Drill`,
      resolvedDetail: 'Bit temperature within limits'
    }
  );
  faults = track(
    faults,
    events,
    elapsed,
    {
      system: 'rover-power',
      active: r.battery < LOW_RESERVE,
      clear: r.battery > LOW_RESERVE + 5,
      title: 'ATLAS-01 low power reserve',
      severity: 'warn',
      source: 'ATLAS-01'
    },
    {
      open: 'Low power reserve · return ATLAS-01 to dock',
      resolved: 'ATLAS-01 reserve restored',
      openDetail: `Battery ${r.battery.toFixed(1)}% · drive and science locked`,
      resolvedDetail: `Battery ${r.battery.toFixed(1)}%`
    }
  );
  faults = track(
    faults,
    events,
    elapsed,
    { system: 'base-power', active: res.power < 25, clear: res.power > 30, title: 'Base power low', severity: 'critical', source: 'IX-7' },
    {
      open: 'Base power low · launch power NO-GO',
      resolved: 'Base power recovered',
      openDetail: `${res.power.toFixed(1)}% · net ${res.netKw.toFixed(2)} kW`,
      resolvedDetail: `${res.power.toFixed(1)}%`
    }
  );
  faults = track(
    faults,
    events,
    elapsed,
    {
      system: 'antenna',
      active: comms.calibration < 0.55,
      clear: comms.calibration >= 0.9,
      title: 'High-gain antenna drift',
      severity: 'warn',
      source: 'IX-7'
    },
    {
      open: 'Antenna drift · calibrate to restore signal',
      resolved: 'Antenna calibrated',
      openDetail: `Pointing ${Math.round(comms.calibration * 100)}% · signal degraded`,
      resolvedDetail: 'Pointing 100%'
    }
  );
  if (lander.phase === 'countdown' && !powerCritical && activeFault(faults, 'base-power')) {
    events.push({ toast: { text: `Count holding at T-${Math.ceil(lander.countdown)} · power fault`, tone: 'warn' } });
  }

  // Fleet
  const veh = { ...prev.vehicles, explorerT: prev.vehicles.explorerT + dt };
  if (veh.cargoDwell > 0) {
    veh.cargoDwell = Math.max(0, veh.cargoDwell - dt);
  } else {
    veh.cargoU += 2 * dt / CARGO_LOOP_LENGTH;
    if (veh.cargoU >= 1) {
      veh.cargoU -= 1;
      veh.cargoDwell = 12;
      res.water = Math.min(100, res.water + 0.4);
      events.push({
        log: {
          source: 'CARGO-03',
          category: 'telemetry',
          title: 'Arrived at depot — consumables transfer',
          detail: '412 kg · water, N₂, spares',
          target: sitePositions.depot
        }
      });
    }
  }

  if (comms.open && Math.floor(elapsed / COMMS_INTERVAL) > Math.floor(prev.elapsed / COMMS_INTERVAL)) {
    events.push({
      log: {
        source: 'GROUND',
        category: 'comms',
        title: 'Telemetry downlink — relay TGO-2',
        detail: `${Math.round(comms.strength * 100)}% signal · ${150 + Math.round(Math.random() * 20)} ms`
      }
    });
  }
  if (Math.floor(elapsed / ENV_INTERVAL) > Math.floor(prev.elapsed / ENV_INTERVAL)) {
    events.push({
      log: {
        source: 'ENV',
        category: 'telemetry',
        title: 'Weather update',
        detail: `Dust τ ${env.dust.toFixed(2)} · wind ${env.wind.toFixed(1)} m/s · ${env.temp.toFixed(1)} °C`
      }
    });
  }

  return {
    next: { ...prev, lander, rover: r, resources: res, env, vehicles: veh, comms, weather, faults, elapsed },
    events,
    commsChange: commsRes.change
  };
}