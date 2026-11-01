import { difficultyDef } from '../../data/difficulty';
import { regionDef } from '../../data/regions';
import type { CommsWindow, GameState } from '../../types/game';
import type { Rng } from './rng';

/** One-way light time drifts across the campaign with orbital geometry. */
export function delayForSol(game: Pick<GameState, 'difficulty'>, sol: number): number {
  const [lo, hi] = difficultyDef(game.difficulty).delay;
  const phase = 0.5 - 0.5 * Math.cos(sol / 500 * Math.PI * 2 * 0.9 + 0.4);
  return Math.round(lo + (hi - lo) * phase);
}

/** Today's DSN overlaps and orbiter passes. The relay adds a long persistent window once built. */
export function generateWindows(game: Pick<GameState, 'region' | 'pillars'>, rng: Rng): CommsWindow[] {
  const region = regionDef(game.region);
  const madrid = rng.range(6, 9);
  const gold = rng.range(14, 17);
  const w: CommsWindow[] = [
  { station: 'Madrid', start: madrid, end: madrid + rng.range(1.2, 2.4), mbps: 0.25 },
  { station: 'Goldstone', start: gold, end: gold + rng.range(1, 2.2), mbps: 0.25 }];

  if (rng.chance(0.85 * region.relayMult)) {
    const s = rng.range(3, 12);
    w.push({ station: 'MRO', start: s, end: s + rng.range(0.15, 0.3), mbps: 2 });
  }
  if (rng.chance(0.75 * region.relayMult)) {
    const s = rng.range(12, 22);
    w.push({ station: 'TGO', start: s, end: s + rng.range(0.12, 0.25), mbps: 1.6 });
  }
  if (game.pillars.comms.relay >= 100) w.push({ station: 'Relay', start: 9, end: 15, mbps: 0.18 });
  return w.sort((a, b) => a.start - b.start);
}

/** Megabytes that today's windows can carry, cut by storms. */
export function windowCapacity(windows: CommsWindow[], storm: number, dustIndex = 0): number {
  const raw = windows.reduce((sum, w) => sum + (w.end - w.start) * 3600 * w.mbps / 8, 0);
  const atmosphericLoss = Math.max(storm * 0.5, dustIndex * 0.22);
  return Math.round(raw * (1 - atmosphericLoss));
}

export function queuedMb(game: Pick<GameState, 'dataQueue'>): number {
  return game.dataQueue.reduce((s, p) => s + p.mb, 0);
}