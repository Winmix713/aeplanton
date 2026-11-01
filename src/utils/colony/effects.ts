import { advisorOrder } from '../../data/advisors';
import { BATTERY_KWH, moduleOrder } from '../../data/colony';
import type { ColonyEffect, ResourceId } from '../../types/colony';
import type { AdvisorId, GameState } from '../../types/game';

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));
const RESOURCE_KEYS: ResourceId[] = ['water', 'o2', 'food', 'h2', 'regolith'];

/** Applies a mission or consequence effect to a mutable draft. */
export function applyEffect(g: GameState, e: ColonyEffect): void {
  const c = g.colony;
  RESOURCE_KEYS.forEach((k) => {
    const v = e[k];
    if (v) c.resources[k] = Math.max(0, c.resources[k] + v);
  });
  if (e.battery) c.resources.battery = clamp(c.resources.battery + e.battery, 0, BATTERY_KWH);
  if (e.morale) c.morale = clamp(c.morale + e.morale);
  if (e.trust) {
    advisorOrder.forEach((id) => {
      const d = e.trust?.[id];
      if (d) g.advisors[id].trust = clamp(g.advisors[id].trust + d);
    });
  }
  if (e.delaySols) c.delaySols += e.delaySols;
  if (e.integrity) {
    moduleOrder.forEach((id) => {
      const d = e.integrity?.[id];
      if (d) c.modules[id].integrity = clamp(c.modules[id].integrity + d);
    });
  }
  if (e.moduleMode) {
    moduleOrder.forEach((id) => {
      const mode = e.moduleMode?.[id];
      if (mode) c.modules[id].mode = mode;
    });
  }
  if (e.robotsLost) {
    (Object.keys(e.robotsLost) as AdvisorId[]).forEach((id) => {
      const f = c.fleets[id];
      f.lost = Math.min(f.total, f.lost + (e.robotsLost?.[id] ?? 0));
      f.busy = Math.min(f.busy, f.total - f.lost);
    });
  }
  if (e.ap) c.missionAp += e.ap;
  if (e.lavaTube) c.lavaTube = clamp(c.lavaTube + e.lavaTube);
  if (e.route) g.route = Math.min(1, Math.max(0, g.route + e.route));
  if (e.wheels) g.rover.wheels = clamp(g.rover.wheels + e.wheels);
  if (e.solarDust) c.solarDust = clamp(c.solarDust + e.solarDust, 0, 0.9);
  if (e.flareSols) c.flareSols = Math.max(c.flareSols, e.flareSols);
  if (e.verifyWaypoints) g.waypointsVerified = true;
  if (e.flags) e.flags.forEach((f) => !c.flags.includes(f) && c.flags.push(f));
  if (e.revealSecret && !c.secrets.includes(e.revealSecret)) {
    c.secrets.push(e.revealSecret);
    c.flags.push(`secret:${e.revealSecret}`);
  }
}