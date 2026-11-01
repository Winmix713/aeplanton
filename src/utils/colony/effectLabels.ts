import { advisors } from '../../data/advisors';
import { moduleOrder } from '../../data/colony';
import type { ColonyEffect, ResourceId } from '../../types/colony';
import type { AdvisorId, Tone } from '../../types/game';
import type { Dict } from '../../types/i18n';

export interface EffectChip {
  text: string;
  tone: Tone;
}

const RESOURCES: ResourceId[] = ['o2', 'water', 'food', 'h2', 'regolith'];

/** Human-readable, toned chips for the visible part of a mission option. */
export function effectChips(t: Dict, e: ColonyEffect): EffectChip[] {
  const c = t.colony;
  const out: EffectChip[] = [];
  const signed = (n: number): Tone => n > 0 ? 'green' : 'red';
  if (e.ap) out.push({ text: c.effects.ap(e.ap), tone: 'amber' });
  RESOURCES.forEach((k) => {
    const v = e[k];
    if (v) out.push({ text: c.effects.resource(c.resources[k], v, k === 'food' ? c.units.food : c.units.kg), tone: signed(v) });
  });
  if (e.battery) out.push({ text: c.effects.battery(e.battery), tone: signed(e.battery) });
  if (e.morale) out.push({ text: c.effects.morale(e.morale), tone: signed(e.morale) });
  if (e.trust) {
    (Object.keys(e.trust) as AdvisorId[]).forEach((id) => {
      const v = e.trust?.[id];
      if (v) out.push({ text: c.effects.trust(advisors[id].code, v), tone: signed(v) });
    });
  }
  if (e.integrity) {
    moduleOrder.forEach((id) => {
      const v = e.integrity?.[id];
      if (v) out.push({ text: c.effects.integrity(c.modules[id].name, v), tone: signed(v) });
    });
  }
  if (e.moduleMode) {
    moduleOrder.forEach((id) => {
      const mode = e.moduleMode?.[id];
      if (mode) out.push({ text: c.effects.mode(c.modules[id].name, c.modes[mode]), tone: 'neutral' });
    });
  }
  if (e.robotsLost) {
    (Object.keys(e.robotsLost) as AdvisorId[]).forEach((id) => {
      const v = e.robotsLost?.[id];
      if (v) out.push({ text: c.effects.robots(advisors[id].code, v), tone: 'red' });
    });
  }
  if (e.delaySols) out.push({ text: c.effects.delay(e.delaySols), tone: 'red' });
  if (e.route) out.push({ text: c.effects.route, tone: 'green' });
  if (e.wheels) out.push({ text: c.effects.wheels(e.wheels), tone: 'red' });
  if (e.lavaTube) out.push({ text: c.effects.tube(e.lavaTube), tone: signed(e.lavaTube) });
  if (e.flareSols) out.push({ text: c.effects.flare, tone: 'neutral' });
  if (e.verifyWaypoints) out.push({ text: c.effects.verify, tone: 'green' });
  return out;
}