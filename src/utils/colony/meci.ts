import { advisorOrder } from '../../data/advisors';
import { MECI_PER_SOL, MECI_TOTAL } from '../../data/colony';
import type { EndingId } from '../../types/colony';
import type { GameState } from '../../types/game';

/** Lives the colony can still receive: 10 M minus 250 000 per Sol of delay. Total collapse saves no one. */
export function livesSaved(g: GameState): number {
  if (g.outcome?.result === 'defeat' && g.colony.debtSols >= 3) return 0;
  return Math.max(0, MECI_TOTAL - g.colony.delaySols * MECI_PER_SOL);
}

export function formatLives(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 2)}M`;
  if (n >= 1000) return `${Math.round(n / 1000)}k`;
  return String(n);
}

/**
 * Four endings from the Act I finale branch and colony cohesion:
 * Vault opened → Scientific Directorate (cohesive) or Fragmented Colony;
 * signal drained → United Human Colony (cohesive) or Survival Regime.
 */
export function computeEnding(g: GameState): EndingId {
  const vault = g.colony.flags.includes('vaultOpened');
  const avgTrust = advisorOrder.reduce((s, id) => s + g.advisors[id].trust, 0) / advisorOrder.length;
  const cohesive = g.outcome?.result === 'victory' && livesSaved(g) >= 7_500_000 && avgTrust >= 50 && g.colony.morale >= 45;
  if (vault) return cohesive ? 'directorate' : 'fragmented';
  return cohesive ? 'united' : 'regime';
}