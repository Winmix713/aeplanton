import { sitePositions } from '../../data/mission';
import type { SimEvent } from '../../types/mission';
import type { RoverState } from '../../types/rover';
import { ROUTE_LENGTH } from '../route';

/** Heat at which the drill trips and the temperature it must fall back to. */
export const DRILL_TRIP = 1;
export const DRILL_RESET = 0.35;
const COOL_RATE = 0.035;
const COOL_RATE_CYCLE = 0.12;

export function createRover(): RoverState {
  return {
    t: 0,
    status: 'docked',
    speed: 0,
    battery: 95.3,
    odometer: 1284.6,
    motorTemp: -14,
    speedLimit: 1.6,
    scanned: false,
    samples: 0,
    panelDust: 0.34,
    drillHeat: 0,
    drillOverheated: false,
    drillCooling: 0,
    reachedTarget: false,
    sampleDelivered: false,
    timer: 0,
    speedHistory: Array.from({ length: 48 }, () => 0),
    batteryHistory: Array.from({ length: 48 }, (_, i) => 91 + i * 0.09)
  };
}

export function isRoverMoving(r: RoverState): boolean {
  return r.status === 'navigating' || r.status === 'returning';
}

export function isRoverBusy(r: RoverState): boolean {
  return r.status === 'scanning' || r.status === 'collecting' || r.status === 'transferring';
}

/** Seconds until the drill is usable again at the current cooling rate. */
export function drillCooldownSeconds(r: RoverState): number {
  const rate = r.drillCooling > 0 ? COOL_RATE_CYCLE : COOL_RATE;
  return Math.max(1, Math.ceil((r.drillHeat - DRILL_RESET) / rate));
}

export function stepRover(prev: RoverState, dt: number, storm = 0): {next: RoverState;events: SimEvent[];} {
  const s: RoverState = { ...prev };
  const events: SimEvent[] = [];
  const moving = isRoverMoving(s);
  const target = moving ? s.speedLimit * 0.88 * (1 - 0.25 * storm) + (Math.random() - 0.5) * 0.12 : 0;
  s.speed += (target - s.speed) * Math.min(1, dt * 3);
  if (!moving && s.speed < 0.02) s.speed = 0;
  const dist = moving ? s.speed * dt : 0;

  if (s.status === 'navigating') {
    s.t = Math.min(1, s.t + dist / ROUTE_LENGTH);
    if (s.t >= 1) {
      s.status = 'on-target';
      s.reachedTarget = true;
      events.push({
        toast: { text: 'Arrived at Sector 04 · ready to scan', tone: 'ok' },
        log: {
          source: 'ATLAS-01',
          category: 'telemetry',
          title: 'Arrived at Sector 04',
          detail: `Layered outcrop in range · battery ${s.battery.toFixed(1)}%`,
          target: sitePositions.sector
        }
      });
    }
  } else if (s.status === 'returning') {
    s.t = Math.max(0, s.t - dist / ROUTE_LENGTH);
    if (s.t <= 0) {
      if (s.samples > 0 && !s.sampleDelivered) {
        s.status = 'transferring';
        s.timer = 2.2;
        events.push({
          toast: { text: 'Docked · transferring sample to IX-7', tone: 'info' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            status: 'waiting',
            title: 'Docked at service bay',
            detail: `Transferring ${s.samples} core${s.samples > 1 ? 's' : ''} to IX-7`,
            target: sitePositions.dock
          }
        });
      } else {
        s.status = 'docked';
        events.push({
          toast: { text: 'ATLAS-01 docked · charging', tone: 'ok' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            title: 'Rover docked · charging',
            detail: `Battery ${s.battery.toFixed(1)}%`,
            target: sitePositions.dock
          }
        });
      }
    }
  }

  s.odometer += dist;
  s.panelDust = Math.min(0.9, s.panelDust + dist * 0.0012 + dt * (0.00015 + 0.004 * storm));
  if (s.status === 'docked') s.battery = Math.min(100, s.battery + dt * 0.04 * (1 - s.panelDust * 0.6) * (1 - 0.6 * storm));else
  s.battery = Math.max(0, s.battery - dist * 0.004 - dt * 0.0012 - (isRoverBusy(s) ? dt * 0.012 : 0));
  s.motorTemp += (-14 + s.speed * 9 - s.motorTemp) * dt * 0.2;

  // Drill thermal model: coring heats, everything else cools (faster during a cooling cycle).
  if (s.status === 'collecting') s.drillHeat += dt * 0.3;else
  s.drillHeat = Math.max(0, s.drillHeat - dt * (s.drillCooling > 0 ? COOL_RATE_CYCLE : COOL_RATE));
  s.drillCooling = Math.max(0, s.drillCooling - dt);

  if (isRoverBusy(s)) {
    s.timer -= dt;
    if (s.timer <= 0) {
      if (s.status === 'scanning') {
        s.scanned = true;
        s.status = 'on-target';
        events.push({
          toast: { text: 'Scan complete · coring target identified', tone: 'ok' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            title: 'Outcrop scan complete',
            detail: 'Coring target in the lower sulfate layer',
            target: sitePositions.sector
          }
        });
      } else if (s.status === 'collecting') {
        s.samples += 1;
        s.status = 'on-target';
        events.push({
          toast: { text: `Core 0${s.samples} sealed in cache`, tone: 'ok' },
          log: {
            source: 'ATLAS-01',
            category: 'telemetry',
            title: `Core 0${s.samples} sealed`,
            detail: `Sample cache ${s.samples}/3 · drill ${Math.round(s.drillHeat * 100)}% heat`,
            target: sitePositions.sector
          }
        });
      } else {
        s.sampleDelivered = true;
        s.status = 'docked';
        events.push({
          toast: { text: 'Sample transferred to IX-7', tone: 'ok' },
          log: {
            source: 'IX-7',
            category: 'mission',
            title: 'Sample transferred · airlock sealed',
            detail: `${s.samples} core${s.samples > 1 ? 's' : ''} secured for ascent`,
            target: sitePositions.lander
          }
        });
      }
    }
  }

  if (!s.drillOverheated && s.drillHeat >= DRILL_TRIP) s.drillOverheated = true;else
  if (s.drillOverheated && s.drillHeat <= DRILL_RESET) s.drillOverheated = false;
  return { next: s, events };
}