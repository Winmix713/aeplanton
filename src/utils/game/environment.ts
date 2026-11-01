import { actForSol } from '../../data/acts';
import { regionDef } from '../../data/regions';
import type { EnvironmentState, GameState } from '../../types/game';
import type { Rng } from './rng';

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

/** Deterministic daily environmental telemetry. Every displayed value feeds at least one system. */
export function generateEnvironment(game: Pick<GameState, 'region' | 'sol' | 'storm' | 'environment'>, rng: Rng): EnvironmentState {
  const region = regionDef(game.region);
  const act = actForSol(game.sol);
  const seasonal = Math.sin(game.sol / 500 * Math.PI * 2 + 0.7);
  const storm = game.storm.intensity;
  const inheritedDust = game.environment?.dustIndex ?? 0.18;
  const windMs = clamp(4 + region.stormMult * 2 + storm * 24 + rng.range(-2.5, 3.5), 0.5, 35);
  const dustIndex = clamp(inheritedDust * 0.72 + storm * 0.34 + windMs / 150 + rng.range(-0.025, 0.025), 0.04, 0.98);
  const daylightHours = clamp(12.2 + seasonal * 0.8 - storm * 1.4, 8.5, 13.5);
  const solarIrradiance = Math.round(clamp(590 + seasonal * 55 - dustIndex * 330 - storm * 130 + rng.range(-25, 25), 90, 680));
  const pressurePa = Math.round(660 + (game.region === 'hellas' ? 170 : game.region === 'sirenum' ? -60 : 15) + rng.range(-18, 18) + storm * 22);
  const dayTempC = Math.round(region.nightTemp + 62 + seasonal * 5 - storm * 7 + rng.range(-3, 3));
  const visibilityKm = +clamp(32 - dustIndex * 27 - storm * 8, 1.2, 32).toFixed(1);
  const scienceQuality = +clamp(1.08 - dustIndex * 0.45 - Math.max(0, windMs - 16) * 0.012 + (act.id === 'discovery' ? 0.04 : 0), 0.48, 1.15).toFixed(2);
  return { dayTempC, pressurePa, windMs: +windMs.toFixed(1), dustIndex: +dustIndex.toFixed(2), solarIrradiance, daylightHours: +daylightHours.toFixed(1), visibilityKm, scienceQuality };
}

export function solarChargeFactor(env: EnvironmentState): number {
  return clamp(env.solarIrradiance / 590 * (env.daylightHours / 12), 0.15, 1.2);
}

export function driveEnvironmentFactor(env: EnvironmentState): number {
  return clamp(1 - Math.max(0, env.windMs - 12) * 0.018 - env.dustIndex * 0.16, 0.45, 1.05);
}