import { difficultyDef } from '../../data/difficulty';
import { DEADLINE_SOL } from '../../data/pillars';
import { medalThresholds } from '../../data/scoring';
import type { GameState, Medal, ScoreBreakdown } from '../../types/game';

const clamp = (v: number, lo = 0, hi = 1000) => Math.round(Math.min(hi, Math.max(lo, v)));

export function computeScore(game: GameState, victory = false): ScoreBreakdown {
  const start = difficultyDef(game.difficulty).inventory;
  const inv = game.inventory;
  const keys = Object.keys(start) as (keyof typeof start)[];
  const kept = keys.reduce((s, k) => s + (start[k] ? inv[k] / start[k] : 1), 0) / keys.length;
  const apUtil = game.stats.apAvailable ? game.stats.apUsed / game.stats.apAvailable : 0;
  const spare = victory ? (DEADLINE_SOL - game.sol) / DEADLINE_SOL : 0;
  const efficiency = clamp(380 * apUtil + 320 * kept + 300 * spare);

  const trusts = Object.values(game.advisors).map((a) => a.trust);
  const imbalance = Math.max(...trusts) - Math.min(...trusts);
  const justified = Object.values(game.advisors).reduce((sum, a) => sum + a.justifiedRejections, 0);
  const risk = clamp(1000 - game.stats.faults * 22 + game.stats.crisesHandled * 18 + game.stats.eventChainsBroken * 20 + justified * 3 - imbalance * 3);

  const p = game.pillars;
  const c012 = {
    none: 0, selected: 25, surveyed: 55, spectrographed: 95, sampled: 140,
    sealed: 180, checked: 225, analyzed: 290, packetReady: 350, uplinked: 420
  }[p.science.c012];
  const science = clamp(c012 + game.sample.quality * 1.2 + game.stats.discoveries * 18 + p.water.coverage * 2.2 + Math.min(p.water.cores, 3) * 55 + (p.water.uplinked ? 110 : 0) - p.science.voidedTubes * 45);

  return { efficiency, risk, science, total: efficiency + risk + science };
}

export function medalFor(total: number): Medal {
  return (medalThresholds.find((m) => total >= m.min) ?? medalThresholds[medalThresholds.length - 1]).medal;
}