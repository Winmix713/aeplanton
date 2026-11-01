import type { ActDef } from '../../data/acts';
import { advisorOrder } from '../../data/advisors';
import { BATTERY_KWH, DUST_PER_SOL, ROBOT_WEAR, ROBOT_WEAR_MULT, WEAR_ON, WEAR_OVERCLOCK, moduleOrder } from '../../data/colony';
import type { GameEvent, GameState } from '../../types/game';
import { m } from '../msg';
import { makeEvent } from '../game/commands';
import type { Rng } from '../game/rng';
import { trustTier } from './ap';
import { applyEffect } from './effects';
import { simulateLifeSupport } from './lifeSupport';
import { advanceTasks } from './robots';

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));

/** Advisor secrets revealed at Absolute Loyalty, each with a one-off benefit. */
function revealSecret(g: GameState, id: (typeof advisorOrder)[number]): void {
  applyEffect(g, { revealSecret: id });
  if (id === 'sys') applyEffect(g, { integrity: { sabatier: 25 }, flags: ['sabatierExposed'] });
  if (id === 'sci') applyEffect(g, { regolith: 40 });
  if (id === 'comm') applyEffect(g, { morale: 8 });
}

/**
 * The ARES 2051 night: robot tasks, solar flares, the chemical loop and grid, wear,
 * radiation, morale, delayed consequences, secrets and defiance. Mutates the draft.
 */
export function colonyNight(g: GameState, rng: Rng, events: GameEvent[], act: ActDef, faultMult: number): void {
  const c = g.colony;

  advanceTasks(g).forEach((t) => events.push(makeEvent(g, 'robots', m('taskDone', { cmd: t.command }), t.detail)));

  // Solar particle events: shielding depends on the lava-tube habitat.
  if (c.flareSols === 0 && rng.chance(0.012 * act.hazardMult)) {
    c.flareSols = 2;
    events.push(makeEvent(g, 'flare', m('flareIncoming'), m('flareIncomingDetail')));
  }
  const shield = 0.3 + 0.65 * (c.lavaTube / 100);
  c.doseMsv = +(c.doseMsv + (c.flareSols > 0 ? 14 : 0.06) * (1 - shield)).toFixed(2);

  // Chemical loop and grid.
  const ls = simulateLifeSupport(g);
  c.balance = { water: ls.water, o2: ls.o2, food: ls.food, h2: ls.h2, generationKwh: ls.generationKwh, loadKwh: ls.loadKwh };
  c.resources.battery = Math.min(BATTERY_KWH, ls.batteryAfter);
  c.resources.water += ls.water;
  c.resources.o2 += ls.o2;
  c.resources.food += ls.food;
  c.resources.h2 = Math.max(0, c.resources.h2 + ls.h2);
  c.gridLevel = ls.gridLevel;
  if (ls.gridLevel > 0) events.push(makeEvent(g, 'lifeSupport', m('gridShed', { level: ls.gridLevel }), m('gridShedDetail', { kwh: ls.shortfallKwh, level: ls.gridLevel })));
  if (ls.gridLevel >= 4) {
    c.morale = clamp(c.morale - 15);
    c.delaySols += 1;
  }

  const debt = c.resources.o2 < 0 || c.resources.water < 0 || c.resources.food < 0;
  c.resources.o2 = Math.max(0, c.resources.o2);
  c.resources.water = Math.max(0, c.resources.water);
  c.resources.food = Math.max(0, c.resources.food);
  if (debt) {
    c.debtSols += 1;
    c.delaySols += 1;
    c.morale = clamp(c.morale - 8);
    events.push(makeEvent(g, 'lifeSupport', m('lifeDebt'), m('lifeDebtDetail', { n: c.debtSols })));
  } else c.debtSols = 0;

  // Module wear and failure rolls for tomorrow.
  moduleOrder.forEach((id) => {
    const mod = c.modules[id];
    mod.failed = false;
    if (mod.mode === 'off') return;
    mod.integrity = clamp(mod.integrity - (mod.mode === 'overclock' ? WEAR_OVERCLOCK : WEAR_ON));
    const risk = mod.integrity < 25 ? 0.5 : mod.integrity < 50 ? 0.2 : 0;
    if (risk && rng.chance(risk * faultMult)) {
      mod.failed = true;
      g.stats.faults += 1;
      events.push(makeEvent(g, 'lifeSupport', m('moduleFailed', { id }), m('moduleFailedDetail', { pct: Math.round(mod.integrity) })));
    }
  });

  c.solarDust = Math.min(0.9, c.solarDust + DUST_PER_SOL + g.storm.intensity * 0.03);

  // Robot wear: 2 %/Sol × environment (clear 1, flare 3, storm 5).
  const mult = g.storm.sols > 0 ? ROBOT_WEAR_MULT.storm : c.flareSols > 0 ? ROBOT_WEAR_MULT.flare : ROBOT_WEAR_MULT.clear;
  advisorOrder.forEach((id) => {
    const f = c.fleets[id];
    const before = f.condition;
    f.condition = clamp(f.condition - (f.busy > 0 ? ROBOT_WEAR : ROBOT_WEAR * 0.25) * mult);
    if (before >= 25 && f.condition < 25) events.push(makeEvent(g, 'robots', m('fleetOffline', { code: id.toUpperCase() }), m('fleetOfflineDetail')));
    if (f.busy > 0 && f.condition < 25 && mult > 1) {
      const stranded = Math.min(5, f.total - f.lost);
      f.lost += stranded;
      f.busy = Math.min(f.busy, f.total - f.lost);
      events.push(makeEvent(g, 'robots', m('robotsStranded', { code: id.toUpperCase(), n: stranded }), m('robotsStrandedDetail')));
    }
  });

  // Morale drifts toward a resting point set by reserves and trust.
  const lowTrust = advisorOrder.filter((id) => trustTier(g.advisors[id].trust) === 'friction' || trustTier(g.advisors[id].trust) === 'defiant').length;
  const target = 60 - lowTrust * 6 - (c.flareSols > 0 ? 8 : 0);
  c.morale = clamp(c.morale + Math.sign(target - c.morale) * Math.min(2, Math.abs(target - c.morale)));

  // Invisible consequences land.
  const due = c.pending.filter((p) => p.sol <= g.sol);
  c.pending = c.pending.filter((p) => p.sol > g.sol);
  due.forEach((p) => {
    if (p.cancelledBy && c.flags.includes(p.cancelledBy)) {
      events.push(makeEvent(g, 'consequence', m('consequenceAverted', { id: p.missionId }), m('consequenceAvertedDetail', { id: p.missionId, opt: p.optionId })));
      return;
    }
    applyEffect(g, p.effect);
    events.push(makeEvent(g, 'consequence', m('consequenceLanded', { id: p.missionId }), m('consequenceDetail', { id: p.missionId, opt: p.optionId })));
  });

  // Secrets at Absolute Loyalty; rogue behaviour at Open Defiance.
  advisorOrder.forEach((id) => {
    const tier = trustTier(g.advisors[id].trust);
    if (tier === 'loyal' && !c.secrets.includes(id)) {
      revealSecret(g, id);
      events.push(makeEvent(g, 'secret', m('secretRevealed', { a: id }), m('secretDetail', { a: id })));
    }
    if (tier === 'defiant' && g.sol - (c.lastDefiance[id] ?? 0) >= 5) {
      c.lastDefiance[id] = g.sol;
      c.resources.water = Math.max(0, c.resources.water - 30);
      c.morale = clamp(c.morale - 3);
      events.push(makeEvent(g, 'defiance', m('defiance', { a: id }), m('defianceDetail', { a: id })));
    }
  });

  if (c.flareSols > 0) {
    c.flareSols -= 1;
    if (c.flareSols === 0) events.push(makeEvent(g, 'stormEnd', m('flareCleared'), m('flareClearedDetail', { dose: Math.round(c.doseMsv) })));
  }
}