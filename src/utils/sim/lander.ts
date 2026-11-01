import { ASCENT_DURATION, CHECK_STEP, COUNTDOWN_START, HOTFIRE_DURATION, HOTFIRE_ENGINE_OFF, checkSubsystems } from '../../data/launch';
import { sitePositions } from '../../data/mission';
import type { LanderState, SimEvent } from '../../types/mission';

export function createLander(): LanderState {
  return {
    phase: 'standby',
    phaseTime: 0,
    checkIndex: 0,
    hover: 0,
    countdown: COUNTDOWN_START,
    altitude: 0,
    velocity: 0,
    downrange: 0,
    maxQ: false,
    enginesOn: false,
    tankPressure: 2.41,
    engineTemp: -21,
    peakAltitude: 0,
    peakVelocity: 0
  };
}

export function isLanderBusy(l: LanderState): boolean {
  return l.phase === 'hotfire' || l.phase === 'countdown' || l.phase === 'ascent';
}

function ease(x: number): number {
  const t = Math.min(1, Math.max(0, x));
  return t * t * (3 - 2 * t);
}

function hoverProfile(t: number): number {
  if (t < 1.5) return 0;
  if (t < 3.5) return 3 * ease((t - 1.5) / 2);
  if (t < 5) return 3;
  return 3 * (1 - ease((t - 5) / 1.8));
}

const at = sitePositions.lander;

/** `countHold` true holds the terminal count (link lost or critical fault). */
export function stepLander(prev: LanderState, dt: number, countHold = false): {next: LanderState;events: SimEvent[];} {
  const l: LanderState = { ...prev };
  const events: SimEvent[] = [];
  const before = l.phaseTime;
  l.phaseTime += dt;

  switch (l.phase) {
    case 'checking':{
        l.checkIndex = Math.min(checkSubsystems.length, Math.floor(l.phaseTime / CHECK_STEP));
        if (l.checkIndex >= checkSubsystems.length) {
          l.phase = 'checked';
          l.phaseTime = 0;
          events.push({
            toast: { text: 'Systems check complete · hot-fire unlocked', tone: 'ok' },
            log: { source: 'IX-7', category: 'telemetry', title: 'Systems check complete', detail: '6/6 subsystems nominal', target: at }
          });
        }
        break;
      }
    case 'hotfire':{
        l.hover = hoverProfile(l.phaseTime);
        l.enginesOn = l.phaseTime < HOTFIRE_ENGINE_OFF;
        if (l.phaseTime >= HOTFIRE_DURATION) {
          l.phase = 'ready';
          l.phaseTime = 0;
          l.hover = 0;
          l.enginesOn = false;
          events.push({
            toast: { text: 'Hot-fire & hover nominal', tone: 'ok' },
            log: {
              source: 'IX-7',
              category: 'telemetry',
              title: 'Propulsion hot-fire & hover complete',
              detail: 'Peak hover 3.0 m · 3/3 engines nominal',
              target: at
            }
          });
        }
        break;
      }
    case 'countdown':{
        if (countHold) break;
        const prevC = l.countdown;
        l.countdown = Math.max(0, l.countdown - dt);
        if (prevC > 6 && l.countdown <= 6) {
          events.push({ log: { source: 'IX-7', category: 'telemetry', title: 'T-6 · ignition sequence start', detail: 'Turbopumps spinning up', target: at } });
        }
        if (prevC > 3 && l.countdown <= 3) {
          l.enginesOn = true;
          events.push({ log: { source: 'IX-7', category: 'telemetry', title: 'T-3 · engines to full thrust', detail: '3/3 engines at 100%', target: at } });
        }
        if (l.countdown <= 0) {
          l.phase = 'ascent';
          l.phaseTime = 0;
          l.enginesOn = true;
          events.push({
            toast: { text: 'Liftoff · IX-7 Hermes', tone: 'ok' },
            log: { source: 'IX-7', category: 'mission', title: 'Liftoff', detail: 'IX-7 Hermes has cleared the pad', target: at }
          });
        }
        break;
      }
    case 'ascent':{
        const t = l.phaseTime;
        l.altitude = 3 * t * t + 0.6 * t * t * t;
        l.velocity = 6 * t + 1.8 * t * t;
        l.downrange = 0.05 * t * t * t;
        l.maxQ = t > 5 && t < 8;
        l.peakAltitude = Math.max(l.peakAltitude, l.altitude);
        l.peakVelocity = Math.max(l.peakVelocity, l.velocity);
        if (before < 5 && t >= 5) {
          events.push({ log: { source: 'IX-7', category: 'telemetry', title: 'Max-Q', detail: 'Structural loads nominal · throttling to 72%' } });
        }
        if (t >= ASCENT_DURATION) {
          l.phase = 'departed';
          l.enginesOn = false;
          l.maxQ = false;
          events.push({
            toast: { text: 'IX-7 en route to orbit', tone: 'ok' },
            log: {
              source: 'IX-7',
              category: 'mission',
              title: 'Loss of signal · en route to orbit',
              detail: `Altitude ${(l.altitude / 1000).toFixed(2)} km · ${Math.round(l.velocity)} m/s`
            }
          });
        }
        break;
      }
    default:
      break;
  }

  const pressureTarget = l.phase === 'countdown' || l.phase === 'ascent' || l.phase === 'hotfire' ? 2.92 : 2.41;
  l.tankPressure += (pressureTarget - l.tankPressure) * Math.min(1, dt * 0.8);
  const tempTarget = l.enginesOn ? 1180 : -21;
  l.engineTemp += (tempTarget - l.engineTemp) * Math.min(1, dt * (l.enginesOn ? 1.4 : 0.15));
  return { next: l, events };
}