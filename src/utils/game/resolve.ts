import { actForSol } from '../../data/acts';
import { advisorOrder } from '../../data/advisors';
import { difficultyDef } from '../../data/difficulty';
import { sequenceAp } from '../../data/gameCommands';
import { DEADLINE_SOL, POWER_TARGET_W, pillarOrder } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { AdvisorId, GameEvent, GameState, QueueItem, SolReport, StepResult } from '../../types/game';
import { type ExecContext, executeStep, makeEvent } from './commands';
import { solarChargeFactor } from './environment';
import { allPillarProgress, farmOutput, pillarComplete } from './pillars';
import { m } from '../msg';
import { makeRng } from './rng';
import { computeScore, medalFor } from './scoring';
import { prepareSol } from './setup';
import { ACT_RESUPPLY } from '../../data/colony';
import { applyEffect } from '../colony/effects';
import { computeEnding } from '../colony/meci';
import { colonyNight } from '../colony/tick';

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));

function clone(g: GameState): GameState {
  return JSON.parse(JSON.stringify(g)) as GameState;
}

/**
 * Resolves one Sol deterministically from the seeded RNG: executes the sequence, runs the night,
 * rolls events, moves trust, checks pillars and win/lose, then prepares the next briefing.
 */
export function resolveSol(game: GameState, queue: QueueItem[], safe: boolean, acceptedIds: string[]): {next: GameState;report: SolReport;} {
  const g = clone(game);
  const rng = makeRng(g.rng);
  const diff = difficultyDef(g.difficulty);
  const region = regionDef(g.region);
  const act = actForSol(g.sol);
  const events: GameEvent[] = [];
  const pillarsBefore = allPillarProgress(g);
  const batteryBefore = g.rover.battery;
  const routeBefore = g.route;
  const ctx: ExecContext = { g, rng, safe, events, flags: { safeMode: false, heated: false, linkLost: false } };

  if (g.rover.safeModeSols > 0) g.rover.safeModeSols -= 1;

  // Day: execute in order. Commands cannot be cancelled once sent.
  const steps: StepResult[] = queue.map((item) => executeStep(ctx, item));
  const apUsed = sequenceAp(queue.map((item) => item.command)) + (safe ? 1 : 0);
  g.stats.apUsed += apUsed;
  g.stats.apAvailable += g.apBudget;

  // Daytime charge and dust load come from the live environment telemetry.
  const solarFactor = solarChargeFactor(g.environment);
  g.rover.battery = clamp(g.rover.battery + 10 * solarFactor * (1 - g.rover.dust * 0.6) + 3);
  g.rover.dust = Math.min(0.95, g.rover.dust + 0.004 + g.environment.dustIndex * 0.018 + g.storm.intensity * 0.025);
  if (g.environment.dustIndex > 0.72 && !queue.some((q) => q.command === 'rest')) {
    const chainId = g.storm.chainId ?? `dust-${g.sol}-${g.nextId}`;
    events.push(makeEvent(g, 'dustLoad', m('dustLoadEvent'), m('dustLoadDetail', { pct: Math.round(g.rover.dust * 100) }), { id: chainId, step: Math.max(1, g.storm.chainStep + 1) }));
  }

  // Night.
  const extremeCold = rng.chance(region.coldChance * act.hazardMult * (1 + g.storm.intensity));
  const nightTemp = Math.round(region.nightTemp + (g.environment.dayTempC - region.nightTemp - 58) * 0.2 + (rng.next() - 0.5) * 6 - (extremeCold ? 9 : 0));
  if (ctx.flags.heated) {
    g.rover.battery = clamp(g.rover.battery - 6);
    if (extremeCold) g.stats.crisesHandled += 1;
  } else {
    g.rover.battery = clamp(g.rover.battery - (15 + (extremeCold ? 10 : 0)));
    if (extremeCold || g.rover.battery < 30 && rng.chance(0.35 * diff.faultMult)) {
      const hitWheels = rng.chance(0.5);
      if (hitWheels) g.rover.wheels = clamp(g.rover.wheels - 8);else
      g.rover.drill = clamp(g.rover.drill - 12);
      const chainId = g.storm.chainId ?? `cold-${g.sol}-${g.nextId}`;
      const e = makeEvent(g, 'cold', m('coldSoak', { t: nightTemp }), hitWheels ? m('coldSoakWheels') : m('coldSoakDrill'), { id: chainId, step: g.storm.chainId ? g.storm.chainStep + 1 : 1 });
      events.push(e);
      g.stats.faults += 1;
    }
  }
  if (g.rover.battery <= 0) {
    g.rover.brownouts += 1;
    events.push(makeEvent(g, 'brownout', m('brownout'), g.rover.brownouts >= 2 ? m('brownoutSecond') : m('brownoutFirst')));
    g.stats.faults += 1;
    g.rover.battery = 6;
  } else {
    g.rover.brownouts = 0;
  }

  // Weather.
  if (g.storm.sols > 0) {
    g.storm.chainStep += 1;
    g.storm.sols -= 1;
    if (g.storm.sols === 0) {
      g.storm.intensity = 0;
      events.push(makeEvent(g, 'stormEnd', m('stormCleared'), m('stormClearedDetail'), g.storm.chainId ? { id: g.storm.chainId, step: g.storm.chainStep + 1 } : undefined));
      if (g.rover.battery > 30) {
        g.stats.crisesHandled += 1;
        g.stats.eventChainsBroken += 1;
      }
      g.storm.chainId = null;
      g.storm.chainStep = 0;
    }
  } else if (rng.chance(diff.stormChance * region.stormMult * act.hazardMult)) {
    g.storm.sols = rng.int(3, 7);
    g.storm.intensity = rng.range(0.55, 0.95);
    g.storm.chainId = `storm-${g.sol}-${g.nextId}`;
    g.storm.chainStep = 1;
    events.push(makeEvent(g, 'storm', m('stormIncoming'), m('stormIncomingDetail', { n: g.storm.sols }), { id: g.storm.chainId, step: 1 }));
  }

  // ARES-1 colony: robots, flares, chemical loop, grid, consequences, secrets.
  colonyNight(g, rng, events, act, diff.faultMult);

  // Positive opportunities reward exploration and informed risk.
  if (!g.storm.sols && rng.chance(act.opportunityChance)) {
    if (rng.chance(0.55)) {
      g.pillars.water.coverage = Math.min(100, g.pillars.water.coverage + 8);
      g.stats.discoveries += 1;
      events.push(makeEvent(g, 'discovery', m('unexpectedDiscovery'), m('unexpectedDiscoveryDetail')));
    } else {
      let bonusMb = 250;
      const delivered: string[] = [];
      while (g.dataQueue.length && bonusMb > 0) {
        const packet = g.dataQueue[0];
        if (packet.mb <= bonusMb) {
          bonusMb -= packet.mb;
          g.dataQueue.shift();
          delivered.push(packet.kind);
          if (packet.kind === 'ice') g.pillars.water.uplinked = true;
          if (packet.kind === 'c012') {
            g.pillars.science.c012 = 'uplinked';
            g.sample.state = 'uplinked';
            g.sample.uploaded = true;
          }
        } else {
          packet.mb -= bonusMb;
          bonusMb = 0;
        }
      }
      events.push(makeEvent(g, 'favorableWindow', m('favorableWindow'), m('favorableWindowDetail', { mb: 250 - bonusMb, packets: delivered.join(',') || 'telemetry' })));
    }
  }

  // Pillar streaks.
  g.pillars.power.rtgW = Math.max(90, +(g.pillars.power.rtgW - 0.02).toFixed(2));
  g.pillars.power.streak = farmOutput(g) >= POWER_TARGET_W ? g.pillars.power.streak + 1 : 0;
  if (g.pillars.comms.relay >= 100) g.pillars.comms.streak = ctx.flags.linkLost ? 0 : g.pillars.comms.streak + 1;else
  if (ctx.flags.linkLost) g.pillars.comms.streak = 0;

  // Trust: accepted advice builds it; repeatedly ignored advisors lose it.
  const trustDelta = { nav: 0, sci: 0, sys: 0, comm: 0 } as Record<AdvisorId, number>;
  advisorOrder.forEach((id) => {
    const a = g.advisors[id];
    const accepted = game.proposals.some((p) => p.advisor === id && acceptedIds.includes(p.id));
    let d: number;
    if (accepted) {
      const own = steps.filter((s) => s.source === id);
      d = 6 + (own.length && own.every((s) => s.ok) ? 2 : 0);
      a.ignoredStreak = 0;
      a.accepted += 1;
    } else {
      const proposal = game.proposals.find((p) => p.advisor === id && !p.alternative);
      const executed = new Set(queue.map((q) => q.command));
      const sameGoal = proposal?.commands.some((c) => executed.has(c)) || proposal?.stance === 'conserve' && (executed.has('rest') || executed.has('heat') || executed.has('repair'));
      const protectedPillar = proposal?.pillar ? allPillarProgress(g)[proposal.pillar] > pillarsBefore[proposal.pillar] : false;
      const justified = !!proposal && (sameGoal || protectedPillar);
      if (justified) {
        a.ignoredStreak = 0;
        a.justifiedRejections += 1;
        d = 1;
      } else {
        a.ignoredStreak += 1;
        d = a.ignoredStreak >= 2 ? -6 : -2;
      }
    }
    const before = a.trust;
    a.trust = clamp(a.trust + d);
    trustDelta[id] = Math.round(a.trust - before);
  });

  // Outcome.
  // Arrival readiness: every infrastructure pillar plus a sealed lava-tube habitat.
  const victory = pillarOrder.every((id) => pillarComplete(g, id)) && g.colony.lavaTube >= 100;
  if (victory) {
    const score = computeScore(g, true);
    g.score = score;
    g.outcome = { result: 'victory', reason: m('winReason', { sol: g.sol }), medal: medalFor(score.total) };
  } else if (g.colony.debtSols >= 3) {
    g.outcome = { result: 'defeat', reason: m('lossCollapse'), medal: null };
  } else if (g.colony.morale <= 0) {
    g.outcome = { result: 'defeat', reason: m('lossMutiny'), medal: null };
  } else if (g.rover.wheels <= 0 || g.rover.brownouts >= 2) {
    g.outcome = { result: 'defeat', reason: g.rover.wheels <= 0 ? m('lossWheels') : m('lossBrownouts'), medal: null };
  } else if ((g.sample.state === 'none' || g.sample.contaminated) && g.inventory.tubes <= 0) {
    g.outcome = { result: 'defeat', reason: m('lossC012'), medal: null };
  } else if (g.sol >= DEADLINE_SOL) {
    g.colony.delaySols += 20;
    g.outcome = { result: 'defeat', reason: m('lossDeadline'), medal: null };
  }
  if (!victory) g.score = computeScore(g);
  if (g.outcome) g.colony.ending = computeEnding(g);

  const previousAct = g.act;
  const nextAct = actForSol(g.sol + 1).id;
  if (!g.outcome && nextAct !== previousAct) {
    events.push(makeEvent(g, 'technology', m('actUnlocked', { act: nextAct }), m('actUnlockedDetail', { sol: g.sol + 1 })));
    applyEffect(g, ACT_RESUPPLY);
    events.push(makeEvent(g, 'milestone', m('resupply'), m('resupplyDetail', { food: ACT_RESUPPLY.food, h2: ACT_RESUPPLY.h2 })));
  }

  const report: SolReport = {
    sol: g.sol,
    steps,
    events,
    batteryBefore,
    batteryAfter: g.rover.battery,
    routeBefore,
    routeAfter: g.route,
    trustDelta,
    pillarsBefore,
    pillarsAfter: allPillarProgress(g),
    score: g.score,
    apUsed,
    apBudget: g.apBudget,
    nightTemp,
    heated: ctx.flags.heated,
    environment: g.environment,
    act: g.act
  };

  g.events = [...events.slice().reverse(), ...g.events].slice(0, 200);
  g.reports = [report, ...g.reports].slice(0, 40);
  g.rng = rng.state();
  if (g.outcome) return { next: g, report };
  g.sol += 1;
  g.act = nextAct;
  return { next: prepareSol(g), report };
}