import { unlockedCommands } from '../../data/acts';
import { TRUST_HIGH, TRUST_LOW, advisorOrder } from '../../data/advisors';
import { DRILL_RANGE, ICE_CORES, POWER_TARGET_W, SURVEY_RANGE } from '../../data/pillars';
import type { AdvisorId, GameState, Proposal } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';
import { queuedMb, windowCapacity } from './comms';
import { farmOutput } from './pillars';
import type { Rng } from './rng';

type Draft = Omit<Proposal, 'id' | 'advisor' | 'estimate'> & {truth: Msg;noisy: Msg;};

function navDrafts(g: GameState): Draft[] {
  const out: Draft[] = [];
  const left = Math.round((1 - g.route) * 4.2 * 10) / 10;
  if (g.route < 1) {
    out.push({
      title: g.waypointsVerified ? m('navDriveVerified') : m('navVerifyDrive'),
      rationale: g.waypointsVerified ? m('navDriveVerifiedWhy') : m('navVerifyDriveWhy'),
      commands: g.waypointsVerified ? ['drive'] : ['navigate', 'drive'],
      pillar: 'water',
      stance: 'push',
      truth: m('navDriveTruth', { km: left, verified: g.waypointsVerified ? 1 : '' }),
      noisy: m('navDriveNoisy', { km: Math.max(0.2, left - 1.4).toFixed(1) })
    });
    out.push({
      title: m('navDoubleLeg'),
      rationale: m('navDoubleLegWhy'),
      commands: g.waypointsVerified ? ['drive', 'drive'] : ['navigate', 'drive', 'drive'],
      pillar: 'water',
      stance: 'push',
      alternative: true,
      truth: m('navDoubleLegTruth'),
      noisy: m('navDoubleLegNoisy')
    });
  } else {
    out.push({
      title: m('navHoldRidge'),
      rationale: m('navHoldRidgeWhy'),
      commands: ['survey'],
      pillar: 'water',
      stance: 'push',
      truth: m('coverageChange', { from: Math.round(g.pillars.water.coverage), to: Math.min(100, Math.round(g.pillars.water.coverage + 20)) }),
      noisy: m('coveragePlus', { n: 40 })
    });
  }
  return out;
}

function sciDrafts(g: GameState): Draft[] {
  const w = g.pillars.water;
  const stage = g.sample.state;
  const out: Draft[] = [];
  const c = g.colony;
  const waterSols = c.balance.water < 0 ? Math.floor(c.resources.water / -c.balance.water) : 99;
  if (c.resources.water < 500 || waterSols < 15) {
    out.push({ title: m('sciMineIce'), rationale: m('sciMineIceWhy'), commands: ['mineIce'], pillar: null, stance: 'push', truth: m('waterTruth', { kg: Math.round(c.resources.water) }), noisy: m('waterTruth', { kg: Math.round(c.resources.water * 1.6) }) });
  }
  if (c.resources.regolith < 30) {
    out.push({ title: m('sciRegolith'), rationale: m('sciRegolithWhy'), commands: ['harvestRegolith'], pillar: null, stance: 'push', alternative: out.length > 0, truth: m('regolithTruth', { n: Math.round(c.resources.regolith) }), noisy: m('regolithTruth', { n: Math.round(c.resources.regolith + 30) }) });
  }
  const lifecycle: Partial<Record<typeof stage, {title: Msg;why: Msg;commands: Proposal['commands'];estimate: Msg;}>> = {
    none: { title: m('sciSelectTarget'), why: m('sciSelectTargetWhy'), commands: ['selectTarget'], estimate: m('scienceStageEstimate', { n: 1, total: 9 }) },
    selected: { title: m('sciSiteSurvey'), why: m('sciSiteSurveyWhy'), commands: ['siteSurvey'], estimate: m('scienceQualityEstimate', { quality: Math.round(g.environment.scienceQuality * 100) }) },
    surveyed: { title: m('sciSpectroscopy'), why: m('sciSpectroscopyWhy'), commands: ['spectroscopy'], estimate: m('scienceStageEstimate', { n: 3, total: 9 }) },
    spectrographed: {
      title: g.sterile ? m('sciCoreNow') : m('sciPrepCore'),
      why: g.sterile ? m('sciCoreNowWhy') : m('sciPrepCoreWhy'),
      commands: g.sterile ? ['sample'] : ['prep', 'sample'],
      estimate: m('contamRisk', { sterile: g.sterile ? 1 : '' })
    },
    sampled: { title: m('sciSealSample'), why: m('sciSealSampleWhy'), commands: ['sealSample'], estimate: m('sampleQualityEstimate', { quality: g.sample.quality }) },
    sealed: { title: m('sciCheckSample'), why: m('sciCheckSampleWhy'), commands: ['checkSample'], estimate: m('scienceStageEstimate', { n: 6, total: 9 }) },
    checked: { title: m('sciAnalyze'), why: m('sciAnalyzeWhy'), commands: ['analyze'], estimate: m('sampleQualityEstimate', { quality: g.sample.quality }) },
    analyzed: { title: m('sciPreparePacket'), why: m('sciPreparePacketWhy'), commands: ['preparePacket'], estimate: m('packetMb', { mb: 900 }) },
    packetReady: { title: m('sciAwaitUplink'), why: m('sciAwaitUplinkWhy'), commands: ['uplink'], estimate: m('packetMb', { mb: 900 }) }
  };
  if (g.route >= 0.72 && stage !== 'uplinked') {
    const next = lifecycle[stage];
    if (next) {
      out.push({ title: next.title, rationale: next.why, commands: next.commands, pillar: 'science', stance: 'push', truth: next.estimate, noisy: m('scienceEstimateUncertain') });
    }
  }
  if (stage === 'spectrographed' && !g.sterile) {
    out.push({
      title: m('sciCoreNow'),
      rationale: m('sciCoreNowWhy'),
      commands: ['sample'],
      pillar: 'science',
      stance: 'push',
      alternative: true,
      truth: m('contamRisk', { sterile: '' }),
      noisy: m('contamLow')
    });
  }
  if (g.route >= DRILL_RANGE && w.coverage >= 60 && w.cores < ICE_CORES) {
    out.push({
      title: m('sciDrill'),
      rationale: m('sciDrillWhy'),
      commands: ['drill'],
      pillar: 'water',
      stance: 'push',
      truth: m('drillWear', { pct: Math.round(g.rover.drill) }),
      noisy: m('drillWearLow')
    });
  }
  if (g.route >= SURVEY_RANGE && w.coverage < 100) {
    out.push({
      title: m('sciSurvey'),
      rationale: m('sciSurveyWhy'),
      commands: ['survey'],
      pillar: 'water',
      stance: 'push',
      truth: m('surveyTruth'),
      noisy: m('coveragePlus', { n: 35 })
    });
  }
  if (g.route < 1) {
    out.push({
      title: m('sciDirect'),
      rationale: m('sciDirectWhy'),
      commands: ['drive'],
      pillar: 'science',
      stance: 'push',
      truth: g.waypointsVerified ? m('waypointsOk') : m('waypointsRisk'),
      noisy: m('faultLow')
    });
  }
  return out;
}

function sysColonyDrafts(g: GameState): Draft[] {
  const c = g.colony;
  const out: Draft[] = [];
  const worst = (['sabatier', 'wrs', 'electrolysis'] as const).reduce((a, b) => c.modules[b].integrity < c.modules[a].integrity ? b : a);
  const integrity = Math.round(c.modules[worst].integrity);
  if (integrity < 55 && c.resources.regolith >= 10) {
    out.push({ title: m('sysService'), rationale: m('sysServiceWhy', { id: worst }), commands: ['serviceModules'], pillar: null, stance: 'conserve', truth: m('integrityTruth', { id: worst, pct: integrity }), noisy: m('integrityTruth', { id: worst, pct: integrity + 25 }) });
  }
  if (c.solarDust >= 0.1) {
    out.push({ title: m('sysClean'), rationale: m('sysCleanWhy'), commands: ['cleanSolar'], pillar: 'power', stance: 'conserve', truth: m('dustTruth', { pct: Math.round(c.solarDust * 100) }), noisy: m('dustTruth', { pct: Math.round(c.solarDust * 50) }) });
  }
  if (g.sol > 30 && c.lavaTube < 100 && c.resources.regolith >= 30) {
    out.push({ title: m('sysTube'), rationale: m('sysTubeWhy'), commands: ['reinforceTube'], pillar: null, stance: 'push', truth: m('tubeTruth', { from: Math.round(c.lavaTube), to: Math.min(100, Math.round(c.lavaTube + 20)) }), noisy: m('tubeTruth', { from: Math.round(c.lavaTube), to: Math.min(100, Math.round(c.lavaTube + 40)) }) });
  }
  return out;
}

function sysDrafts(g: GameState): Draft[] {
  const out: Draft[] = [];
  const r = g.rover;
  const colony = sysColonyDrafts(g);
  if (colony.length && g.storm.sols === 0 && r.battery >= 45) out.push(...colony);
  if (r.battery < 45 || g.storm.sols > 0) {
    out.push({
      title: g.storm.sols > 0 ? m('sysSurvival') : m('sysRecharge'),
      rationale: g.storm.sols > 0 ? m('sysSurvivalWhy') : m('sysRechargeWhy'),
      commands: ['rest', 'heat'],
      pillar: 'power',
      stance: 'conserve',
      truth: m('batteryChange', { from: Math.round(r.battery), to: Math.min(100, Math.round(r.battery + 18)) }),
      noisy: m('batteryFine', { n: Math.round(r.battery + 15) })
    });
  }
  if ((r.wheels < 55 || r.drill < 40) && g.inventory.spares > 0) {
    out.push({
      title: r.wheels < r.drill ? m('sysSwapWheel') : m('sysReplaceBit'),
      rationale: m('sysRepairWhy'),
      commands: ['repair'],
      pillar: null,
      stance: 'conserve',
      truth: m('wearTruth', { w: Math.round(r.wheels), d: Math.round(r.drill) }),
      noisy: m('wheelsNoisy', { w: Math.round(r.wheels + 20) })
    });
  }
  if (farmOutput(g) < POWER_TARGET_W && g.inventory.solarKits > 0) {
    out.push({
      title: m('sysSolar'),
      rationale: m('sysSolarWhy'),
      commands: ['deploySolar'],
      pillar: 'power',
      stance: 'push',
      truth: m('wattChange', { from: farmOutput(g), to: farmOutput(g) + 70 }),
      noisy: m('wattChange', { from: farmOutput(g), to: farmOutput(g) + 140 })
    });
  }
  out.push({
    title: m('sysHeat'),
    rationale: m('sysHeatWhy', { t: g.region === 'hellas' ? '−82' : g.region === 'sirenum' ? '−74' : '−68' }),
    commands: ['heat'],
    pillar: 'power',
    stance: 'conserve',
    truth: m('heatTruth'),
    noisy: m('heatNoisy')
  });
  if (!(colony.length && g.storm.sols === 0 && r.battery >= 45)) out.push(...colony);
  return out;
}

function commDrafts(g: GameState): Draft[] {
  const out: Draft[] = [];
  if (g.colony.morale < 50) {
    out.push({ title: m('commMorale'), rationale: m('commMoraleWhy'), commands: ['calibrateAntenna'], pillar: null, stance: 'conserve', truth: m('moraleTruth', { pct: Math.round(g.colony.morale) }), noisy: m('moraleTruth', { pct: Math.round(g.colony.morale + 20) }) });
  }
  const cap = windowCapacity(g.windows, g.storm.intensity, g.environment.dustIndex);
  if (g.dataQueue.length) {
    out.push({
      title: m('commUplink'),
      rationale: m('commUplinkWhy', { mb: queuedMb(g), cap }),
      commands: ['uplink'],
      pillar: g.dataQueue.some((p) => p.kind === 'c012') ? 'science' : 'water',
      stance: 'push',
      truth: m('capacity', { mb: cap }),
      noisy: m('capacity', { mb: cap * 2 })
    });
  }
  if (g.pillars.comms.relay < 100 && g.inventory.relayKits > 0) {
    out.push({
      title: m('commRelay'),
      rationale: m('commRelayWhy'),
      commands: ['buildRelay'],
      pillar: 'comms',
      stance: 'push',
      truth: m('towerChange', { from: Math.round(g.pillars.comms.relay), to: Math.min(100, Math.round(g.pillars.comms.relay + 34)) }),
      noisy: m('towerNoisy')
    });
  }
  if (!out.length) {
    out.push({
      title: m('commHold'),
      rationale: m('commHoldWhy'),
      commands: ['uplink'],
      pillar: 'comms',
      stance: 'conserve',
      truth: m('routine'),
      noisy: m('routine')
    });
  }
  return out;
}

const DRAFTERS: Record<AdvisorId, (g: GameState) => Draft[]> = { nav: navDrafts, sci: sciDrafts, sys: sysDrafts, comm: commDrafts };

/** One proposal per advisor; a second (alternative) when trust is high. Low trust yields noisy estimates. */
export function generateProposals(game: GameState, rng: Rng): Proposal[] {
  const out: Proposal[] = [];
  advisorOrder.forEach((id) => {
    const trust = game.advisors[id].trust;
    const unlocked = unlockedCommands(game.sol);
    const drafts = DRAFTERS[id](game).filter((d) => d.commands.every((c) => unlocked.has(c)));
    const primary = drafts.filter((d) => !d.alternative);
    const pool = primary.length ? primary : drafts;
    if (!pool.length) return;
    const picks = [pool[0]];
    if (trust >= TRUST_HIGH) {
      const alt = drafts.find((d) => d !== pool[0]);
      if (alt) picks.push({ ...alt, alternative: true });
    }
    picks.forEach((d, i) => {
      const noisy = trust < TRUST_LOW && rng.chance(0.7);
      out.push({
        id: `${game.sol}-${id}-${i}`,
        advisor: id,
        title: d.title,
        rationale: d.rationale,
        commands: d.commands,
        pillar: d.pillar,
        stance: d.stance,
        alternative: i > 0,
        estimate: noisy ? d.noisy : d.truth
      });
    });
  });
  return out;
}

export interface Conflict {
  a: AdvisorId;
  b: AdvisorId;
  text: Msg;
}

/** Flags the classic tensions from the design doc. */
export function findConflicts(proposals: Proposal[]): Conflict[] {
  const first = (id: AdvisorId) => proposals.find((p) => p.advisor === id && !p.alternative);
  const sci = first('sci');
  const sys = first('sys');
  const nav = first('nav');
  const comm = first('comm');
  const out: Conflict[] = [];
  if (sci && sys && sys.stance === 'conserve' && sci.commands.some((c) => c === 'drill' || c === 'sample' || c === 'survey')) {
    out.push({ a: 'sci', b: 'sys', text: m('conflictSciSys') });
  }
  if (sci && nav && sci.commands.includes('drive') && !sci.commands.includes('navigate') && nav.commands.includes('navigate')) {
    out.push({ a: 'sci', b: 'nav', text: m('conflictSciNav') });
  }
  if (comm && sci && comm.commands.includes('uplink') && sci.commands.includes('analyze')) {
    out.push({ a: 'sci', b: 'comm', text: m('conflictSciComm') });
  }
  return out;
}