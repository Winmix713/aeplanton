import { advisorOrder } from '../../data/advisors';
import { TIER_BASELINE, TIER_FRICTION, TIER_LOYAL, moduleOrder } from '../../data/colony';
import { difficultyDef } from '../../data/difficulty';
import type { ApBreakdown, TrustTier } from '../../types/colony';
import type { GameState } from '../../types/game';
import { pillarComplete } from '../game/pillars';

/** Four trust tiers: ≥81 loyal (−1 AP), 36–80 baseline, 15–35 friction (+1 AP tax), <15 open defiance. */
export function trustTier(trust: number): TrustTier {
  if (trust >= TIER_LOYAL) return 'loyal';
  if (trust >= TIER_BASELINE) return 'baseline';
  if (trust >= TIER_FRICTION) return 'friction';
  return 'defiant';
}

/** Net Sol AP = base + infrastructure + loyalty − friction − environment − module upkeep − grid shed − mission. */
export function computeAp(g: GameState): ApBreakdown {
  const c = g.colony;
  const crisis = c.morale < 30 || c.debtSols > 0;
  const base = crisis ? 6 : difficultyDef(g.difficulty).ap;
  const infrastructure = (pillarComplete(g, 'power') ? 1 : 0) + (g.pillars.comms.relay >= 100 ? 1 : 0) + (c.lavaTube >= 100 ? 1 : 0);
  let loyalty = 0;
  let friction = 0;
  advisorOrder.forEach((id) => {
    const tier = trustTier(g.advisors[id].trust);
    if (tier === 'loyal') loyalty += 1;
    if (tier === 'friction') friction -= 1;
    if (tier === 'defiant') friction -= 2;
  });
  const environment = -(g.storm.sols > 0 ? 2 : 0) - (c.flareSols > 0 ? 3 : 0);
  const upkeep = -moduleOrder.filter((id) => c.modules[id].mode !== 'off').length;
  const grid = -Math.min(2, c.gridLevel);
  const safeMode = g.rover.safeModeSols > 0 ? -2 : 0;
  const mission = -c.missionAp;
  const total = Math.max(2, base + infrastructure + loyalty + friction + environment + upkeep + grid + safeMode + mission);
  return { base, infrastructure, loyalty, friction, environment, upkeep, grid, safeMode, mission, total };
}

/** Recomputes the AP breakdown and today's budget in place. */
export function refreshAp(g: GameState): void {
  g.colony.ap = computeAp(g);
  g.apBudget = g.colony.ap.total;
}