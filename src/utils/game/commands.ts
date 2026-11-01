import { TRUST_LOW } from '../../data/advisors';
import { difficultyDef } from '../../data/difficulty';
import { eventMeta } from '../../data/events';
import { commandDefs, isRobotTask } from '../../data/gameCommands';
import { dispatchTask } from '../colony/robots';
import { DRILL_RANGE, ICE_CORES, RELAY_SEGMENT, SOLAR_KIT_W, SURVEY_RANGE } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { EventKind, GameEvent, GameState, QueueItem, StepResult } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';
import { driveEnvironmentFactor } from './environment';
import { windowCapacity } from './comms';
import type { Rng } from './rng';

export interface ExecContext {
  g: GameState;
  rng: Rng;
  safe: boolean;
  events: GameEvent[];
  flags: {safeMode: boolean;heated: boolean;linkLost: boolean;};
}

export function makeEvent(g: GameState, kind: EventKind, title: Msg, detail: Msg, chain?: {id: string;step: number;}): GameEvent {
  const meta = eventMeta[kind];
  return {
    id: g.nextId++,
    sol: g.sol,
    kind,
    title,
    detail,
    tone: meta.tone,
    counter: meta.counter,
    chainId: chain?.id,
    chainStep: chain?.step
  };
}

const clamp = (v: number, lo = 0, hi = 100) => Math.min(hi, Math.max(lo, v));

/** Executes one queued command against the mutable draft and reports what happened. */
export function executeStep(ctx: ExecContext, item: QueueItem): StepResult {
  const { g, rng, safe } = ctx;
  const def = commandDefs[item.command];
  const diff = difficultyDef(g.difficulty);
  const region = regionDef(g.region);
  const risk = (p: number) => p * diff.faultMult * (safe ? 0.5 : 1);
  const base = { command: item.command, source: item.source };
  const cmd = { cmd: item.command };
  const result = (ok: boolean, title: Msg, detail: Msg, event?: GameEvent): StepResult => {
    if (event) ctx.events.push(event);
    if (event && event.tone === 'red') g.stats.faults += 1;
    return { ...base, ok, title, detail, routeAfter: g.route, event };
  };

  // ARN robot tasks run independently of the rover.
  if (isRobotTask(item.command)) {
    const r = dispatchTask(g, item.command);
    return result(r.ok, r.title, r.detail, r.ok ? undefined : makeEvent(g, 'robots', r.title, r.detail));
  }

  if (ctx.flags.safeMode) return { ...base, ok: false, skipped: true, title: m('stepSkipped', cmd), detail: m('safeModeNoResponse'), routeAfter: g.route };

  if (def.power > 0 && g.rover.battery < def.power + 4)
  return result(false, m('stepRefused', cmd), m('batteryFloor', { battery: Math.round(g.rover.battery), floor: def.power + 4 }));

  // Bad advice: following a low-trust advisor can carry a wrong estimate.
  const advisorTrust = item.source === 'manual' ? 100 : g.advisors[item.source].trust;
  let badAdvice: GameEvent | undefined;
  if (item.source !== 'manual' && advisorTrust < TRUST_LOW && rng.chance(0.35)) {
    const code = item.source.toUpperCase();
    if (item.command === 'drive') {
      g.rover.wheels = clamp(g.rover.wheels - 12);
      badAdvice = makeEvent(g, 'badAdvice', m('badTerrain', { code }), m('badTerrainDetail'));
    } else {
      g.rover.battery = clamp(g.rover.battery - 8);
      badAdvice = makeEvent(g, 'badAdvice', m('badPower', { code }), m('badPowerDetail'));
    }
  }
  const pay = () => {
    g.rover.battery = clamp(g.rover.battery - Math.max(0, def.power));
  };

  switch (item.command) {
    case 'drive':{
        if (g.route >= 1) return result(false, m('driveSkipped'), m('atRidge'), badAdvice);
        if (!g.waypointsVerified && rng.chance(risk(0.24))) {
          pay();
          ctx.flags.safeMode = true;
          g.rover.safeModeSols = 1;
          return result(false, m('softwareFault'), m('badUpload'), makeEvent(g, 'software', m('safeModeEntered'), m('safeModeDetail')));
        }
        pay();
        const gust = rng.chance(risk(0.05 + g.storm.intensity * 0.15));
        const factor = region.driveFactor * driveEnvironmentFactor(g.environment) * (g.rover.wheels < 40 ? 0.6 : 1) * (1 - 0.3 * g.storm.intensity) * (gust ? 0.5 : 1);
        const gain = 0.13 * factor;
        const before = g.route;
        g.route = Math.min(1, g.route + gain);
        g.waypointsVerified = false;
        g.rover.wheels = clamp(g.rover.wheels - (3 + rng.next() * 3) * region.wearMult * (safe ? 0.6 : 1));
        g.rover.dust = Math.min(0.9, g.rover.dust + 0.015);
        let event: GameEvent | undefined = badAdvice;
        if (gust) event = makeEvent(g, 'wind', m('windHalt'), m('windHaltDetail'));else
        if (rng.chance(risk((g.rover.wheels < 35 ? 0.16 : 0.035) * region.wearMult))) {
          g.rover.wheels = clamp(g.rover.wheels - 15);
          event = makeEvent(g, 'wear', m('wheelCrack'), m('wheelCrackDetail'));
        }
        const arrived = g.route >= 1 && before < 1;
        if (arrived) ctx.events.push(makeEvent(g, 'milestone', m('arrivedRidge'), m('arrivedRidgeDetail')));
        return result(true, arrived ? m('arrivedRidge') : m('driveDone'), m('driveDetail', { m: Math.round((g.route - before) * 4200), pct: Math.round(g.route * 100) }), event);
      }
    case 'navigate':
      pay();
      g.waypointsVerified = true;
      return result(true, m('waypointsVerified'), m('waypointsVerifiedDetail'), badAdvice);
    case 'survey':{
        if (g.route < SURVEY_RANGE) return result(false, m('surveyOutOfRange'), m('surveyRange', { pct: Math.round(SURVEY_RANGE * 100) }), badAdvice);
        if (g.pillars.water.coverage >= 100) return result(false, m('surveyRedundant'), m('iceMapComplete'), badAdvice);
        pay();
        const mult = g.advisors.sci.trust < TRUST_LOW ? 0.7 : 1;
        g.pillars.water.coverage = Math.min(100, g.pillars.water.coverage + 20 * mult);
        return result(true, m('surveyDone'), m('iceMapPct', { pct: Math.round(g.pillars.water.coverage) }), badAdvice);
      }
    case 'drill':{
        if (g.route < DRILL_RANGE) return result(false, m('drillOutOfRange'), m('drillRange'), badAdvice);
        if (g.pillars.water.coverage < 60) return result(false, m('drillRefused'), m('drillMapLow'), badAdvice);
        if (g.rover.drill <= 0 && g.inventory.drillBits <= 0) return result(false, m('drillUnavailable'), m('noBits'), badAdvice);
        pay();
        g.rover.drill = clamp(g.rover.drill - 18 * (safe ? 0.7 : 1));
        let event = badAdvice;
        if (g.rover.drill <= 0 || rng.chance(risk(0.05))) {
          if (g.inventory.drillBits > 0) {
            g.inventory.drillBits -= 1;
            g.rover.drill = 100;
            event = makeEvent(g, 'wear', m('bitBroke'), m('bitSwapped'));
          } else {
            g.rover.drill = 0;
            event = makeEvent(g, 'wear', m('bitBroke'), m('noBitsLeft'));
          }
          return result(false, m('iceCoreLost'), m('bitFailure'), event);
        }
        g.pillars.water.cores += 1;
        if (g.pillars.water.cores >= ICE_CORES && !g.pillars.water.uplinked && !g.dataQueue.some((p) => p.kind === 'ice')) {
          g.dataQueue.push({ id: g.nextId++, kind: 'ice', mb: 420 });
        }
        return result(true, m('iceCoreOk'), m('coresCount', { n: g.pillars.water.cores, max: ICE_CORES }), event);
      }
    case 'selectTarget':
      if (g.route < 0.72) return result(false, m('targetOutOfRange'), m('targetNeedsRidge'), badAdvice);
      if (g.sample.state !== 'none') return result(false, m('targetAlreadySelected'), m('sampleStageDetail'), badAdvice);
      pay();
      g.sample.state = 'selected';
      g.sample.selectedSol = g.sol;
      g.pillars.science.c012 = 'selected';
      return result(true, m('targetSelected'), m('targetSelectedDetail'), badAdvice);
    case 'siteSurvey':
      if (g.sample.state !== 'selected') return result(false, m('surveyNeedsTarget'), m('selectTargetFirst'), badAdvice);
      pay();
      g.sample.state = 'surveyed';
      g.pillars.science.c012 = 'surveyed';
      return result(true, m('siteSurveyDone'), m('siteSurveyDetail', { quality: Math.round(g.environment.scienceQuality * 100) }), badAdvice);
    case 'spectroscopy':
      if (g.sample.state !== 'surveyed') return result(false, m('spectroscopyBlocked'), m('surveyFirst'), badAdvice);
      pay();
      g.sample.state = 'spectrographed';
      g.sample.mineralogy = ['clay', 'sulfate', 'carbonate'];
      g.pillars.science.c012 = 'spectrographed';
      return result(true, m('spectroscopyDone'), m('spectroscopyDetail'), badAdvice);
    case 'prep':
      pay();
      g.sterile = true;
      return result(true, m('prepDone'), m('prepDetail'), badAdvice);
    case 'sample':{
        if (g.route < 1) return result(false, m('sampleOutOfReach'), m('c012AtRidge'), badAdvice);
        if (g.sample.state !== 'spectrographed') return result(false, m('sampleNotReady'), m('spectroscopyFirst'), badAdvice);
        if (g.inventory.tubes <= 0) return result(false, m('noTubes'), m('inventoryEmpty'), badAdvice);
        pay();
        g.inventory.tubes -= 1;
        const contam = rng.chance(risk((g.sterile ? 0.05 : 0.33) * (1.25 - g.environment.scienceQuality)));
        g.sterile = false;
        g.sample.state = 'sampled';
        g.sample.collectedSol = g.sol;
        g.sample.contaminated = contam;
        g.sample.storage = 'arm';
        g.sample.quality = Math.round(clamp(55 + g.environment.scienceQuality * 35 - (contam ? 40 : 0)));
        if (contam) {
          g.pillars.science.voidedTubes += 1;
          g.sample.state = 'spectrographed';
          g.sample.storage = 'uncollected';
          g.pillars.science.c012 = 'spectrographed';
          return result(false, m('c012Contaminated'), m('tubeVoided', { n: g.inventory.tubes }), makeEvent(g, 'contamination', m('contaminated'), m('contaminatedDetail')));
        }
        g.pillars.science.c012 = 'sampled';
        return result(true, m('c012Collected'), m('tubesLeft', { n: g.inventory.tubes }), badAdvice);
      }
    case 'sealSample':
      if (g.sample.state !== 'sampled' || g.sample.contaminated) return result(false, m('sealBlocked'), m('validSampleNeeded'), badAdvice);
      pay();
      g.sample.state = 'sealed';
      g.sample.storage = 'tube';
      g.pillars.science.c012 = 'sealed';
      ctx.events.push(makeEvent(g, 'milestone', m('c012Sealed'), m('c012SealedDetail')));
      return result(true, m('c012Sealed'), m('sampleStored'), badAdvice);
    case 'checkSample':
      if (g.sample.state !== 'sealed') return result(false, m('checkBlocked'), m('sealFirst'), badAdvice);
      pay();
      g.sample.state = 'checked';
      g.sample.storage = 'cache';
      g.pillars.science.c012 = 'checked';
      return result(true, m('sampleChecked'), m('sampleCheckedDetail', { quality: g.sample.quality }), badAdvice);
    case 'analyze':{
        if (g.sample.state !== 'checked') return result(false, m('nothingToAnalyze'), m('checkFirst'), badAdvice);
        pay();
        g.sample.state = 'analyzed';
        g.sample.analysis = g.sample.quality >= 70 ? 'organicsDetected' : 'inconclusive';
        g.pillars.science.c012 = 'analyzed';
        return result(true, m('c012Analyzed'), m('analysisDetail', { quality: g.sample.quality }), badAdvice);
      }
    case 'preparePacket':
      if (g.sample.state !== 'analyzed') return result(false, m('packetBlocked'), m('analyzeFirst'), badAdvice);
      pay();
      g.sample.state = 'packetReady';
      g.pillars.science.c012 = 'packetReady';
      if (!g.dataQueue.some((p) => p.kind === 'c012')) g.dataQueue.push({ id: g.nextId++, kind: 'c012', mb: 900 });
      return result(true, m('packetPrepared'), m('packetQueued'), badAdvice);
    case 'uplink':{
        pay();
        if (ctx.flags.linkLost || rng.chance(risk(0.07 + g.storm.intensity * 0.18))) {
          ctx.flags.linkLost = true;
          return result(false, m('uplinkFailed'), m('noAos'), makeEvent(g, 'commsLoss', m('linkLoss'), m('linkLossDetail')));
        }
        let cap = windowCapacity(g.windows, g.storm.intensity, g.environment.dustIndex);
        const sent: string[] = [];
        while (g.dataQueue.length && cap > 0) {
          const p = g.dataQueue[0];
          if (p.mb <= cap) {
            cap -= p.mb;
            g.dataQueue.shift();
            sent.push(p.kind);
            if (p.kind === 'ice') g.pillars.water.uplinked = true;
            if (p.kind === 'c012') {
              g.pillars.science.c012 = 'uplinked';
              g.sample.state = 'uplinked';
              g.sample.uploaded = true;
              ctx.events.push(makeEvent(g, 'milestone', m('c012OnEarth'), m('c012OnEarthDetail')));
            }
          } else {
            p.mb -= cap;
            cap = 0;
          }
        }
        const detail = sent.length ? m('delivered', { kinds: sent.join(',') }) : g.dataQueue.length ? m('partial', { mb: g.dataQueue[0].mb }) : m('routine');
        return result(true, m('uplinkDone'), detail, badAdvice);
      }
    case 'deploySolar':
      if (g.inventory.solarKits <= 0) return result(false, m('noSolarKits'), m('inventoryEmpty'), badAdvice);
      pay();
      g.inventory.solarKits -= 1;
      g.pillars.power.farmW += SOLAR_KIT_W;
      return result(true, m('solarDeployed'), m('farmInstalled', { w: g.pillars.power.farmW }), badAdvice);
    case 'buildRelay':
      if (g.pillars.comms.relay >= 100) return result(false, m('relayComplete'), m('nothingToBuild'), badAdvice);
      if (g.inventory.relayKits <= 0) return result(false, m('noRelay'), m('inventoryEmpty'), badAdvice);
      pay();
      g.inventory.relayKits -= 1;
      const plannedGain = RELAY_SEGMENT * (g.advisors.comm.trust < TRUST_LOW ? 0.7 : 1);
      const finalKitGain = g.inventory.relayKits === 0 ? 100 - g.pillars.comms.relay : 0;
      g.pillars.comms.relay = Math.min(100, g.pillars.comms.relay + Math.max(plannedGain, finalKitGain));
      if (g.pillars.comms.relay >= 100) ctx.events.push(makeEvent(g, 'milestone', m('relayOnline'), m('relayOnlineDetail')));
      return result(true, m('relayRaised'), m('towerPct', { pct: Math.round(g.pillars.comms.relay) }), badAdvice);
    case 'heat':
      ctx.flags.heated = true;
      return result(true, m('heatScheduled'), m('heatDetail'), badAdvice);
    case 'repair':{
        if (g.inventory.spares <= 0) return result(false, m('noSpares'), m('inventoryEmpty'), badAdvice);
        pay();
        g.inventory.spares -= 1;
        if (g.rover.wheels <= g.rover.drill) {
          g.rover.wheels = clamp(g.rover.wheels + 40);
          return result(true, m('wheelSwapped'), m('wheelsPct', { pct: Math.round(g.rover.wheels) }), badAdvice);
        }
        g.rover.drill = clamp(g.rover.drill + 45);
        return result(true, m('drillServiced'), m('drillPct', { pct: Math.round(g.rover.drill) }), badAdvice);
      }
    case 'rest':{
        const gain = 20 * (1 - g.rover.dust * 0.6) * (1 - 0.6 * g.storm.intensity) + 4;
        g.rover.battery = clamp(g.rover.battery + gain);
        g.rover.dust = Math.max(0.05, g.rover.dust - 0.08);
        return result(true, m('rested'), m('batteryGain', { n: Math.round(gain) }), badAdvice);
      }
    default:
      return result(false, m('stepRefused', cmd), m('routine'), badAdvice);
  }
}