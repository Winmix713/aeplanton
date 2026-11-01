import type { LanderState } from '../../types/mission';
import type { RoverState } from '../../types/rover';

/** Nameplate output of the base solar field at 175 W/m² and clean panels. */
const FIELD_KW = 4.2;
const BASE_LOAD_KW = 2.6;
/** % state of charge gained per kW·s of net power. */
const SOC_PER_KWS = 0.08;

export function solarFieldKw(irradiance: number, arrayDust: number): number {
  return Math.max(0, irradiance / 175 * FIELD_KW * (1 - arrayDust));
}

export function baseLoadKw(lander: LanderState, rover: RoverState): number {
  let load = BASE_LOAD_KW;
  if (rover.status === 'docked') load += 0.6;
  if (lander.phase === 'checking') load += 0.4;
  if (lander.phase === 'hotfire') load += 0.8;
  if (lander.phase === 'countdown') load += 1.2;
  return load;
}

export function stepPower(power: number, netKw: number, dt: number): number {
  return Math.min(100, Math.max(0, power + netKw * SOC_PER_KWS * dt));
}

/** Rover reserve below which drive and science commands are refused. */
export const LOW_RESERVE = 15;