import { actForSol } from '../../data/acts';
import { TRUST_START } from '../../data/advisors';
import { difficultyDef } from '../../data/difficulty';
import type { GameState, NewGameOptions } from '../../types/game';
import { refreshAp } from '../colony/ap';
import { nextMission } from '../colony/missions';
import { createColony } from '../colony/setup';
import { m } from '../msg';
import { delayForSol, generateWindows } from './comms';
import { generateEnvironment } from './environment';
import { generateProposals } from './proposals';
import { makeRng, randomSeed } from './rng';
import { computeScore } from './scoring';

/** Prepares the briefing for `game.sol`: delay, comms windows, proposals, due story missions and the AP budget. */
export function prepareSol(game: GameState): GameState {
  const g: GameState = { ...game, colony: { ...game.colony } };
  const rng = makeRng(g.rng);
  g.act = actForSol(g.sol).id;
  g.environment = generateEnvironment(g, rng);
  g.delayMin = delayForSol(g, g.sol);
  g.windows = generateWindows(g, rng);
  g.proposals = generateProposals(g, rng);
  g.colony.missionAp = 0;
  g.colony.pendingMission = nextMission(g);
  refreshAp(g);
  g.rng = rng.state();
  return g;
}

export function createGame(opts: NewGameOptions): GameState {
  const diff = difficultyDef(opts.difficulty);
  const seed = opts.seed ?? randomSeed();
  const advisor = () => ({ trust: TRUST_START, ignoredStreak: 0, accepted: 0, justifiedRejections: 0 });
  const base: GameState = {
    version: 4,
    runId: `${Date.now().toString(36)}-${seed.toString(36)}`,
    slot: opts.slot,
    seed,
    rng: seed,
    difficulty: opts.difficulty,
    region: opts.region,
    permadeath: opts.difficulty === 'director' && opts.permadeath,
    sol: 1,
    act: 'discovery',
    delayMin: 0,
    route: 0,
    waypointsVerified: false,
    sterile: false,
    environment: { dayTempC: -8, pressurePa: 675, windMs: 5, dustIndex: 0.18, solarIrradiance: 520, daylightHours: 12.1, visibilityKm: 27, scienceQuality: 0.98 },
    sample: {
      id: 'C-012',
      state: 'none',
      location: 'Delta Ridge',
      selectedSol: null,
      collectedSol: null,
      type: 'biosignatureCandidate',
      mineralogy: [],
      quality: 0,
      contaminated: null,
      storage: 'uncollected',
      analysis: 'pending',
      uploaded: false
    },
    rover: { battery: 88, wheels: 100, drill: 100, dust: 0.18, safeModeSols: 0, brownouts: 0 },
    inventory: { ...diff.inventory },
    pillars: {
      water: { coverage: 0, cores: 0, uplinked: false },
      power: { farmW: 0, rtgW: 110, streak: 0 },
      comms: { relay: 0, streak: 0 },
      science: { c012: 'none', voidedTubes: 0 }
    },
    storm: { sols: 0, intensity: 0, chainId: null, chainStep: 0 },
    windows: [],
    dataQueue: [],
    advisors: { nav: advisor(), sci: advisor(), sys: advisor(), comm: advisor() },
    proposals: [],
    apBudget: diff.ap,
    events: [],
    reports: [],
    score: { efficiency: 0, risk: 0, science: 0, total: 0 },
    stats: { apUsed: 0, apAvailable: 0, faults: 0, crisesHandled: 0, discoveries: 0, eventChainsBroken: 0 },
    outcome: null,
    nextId: 1,
    startedAt: Date.now(),
    colony: createColony()
  };
  base.events.push({
    id: base.nextId++,
    sol: 1,
    kind: 'milestone',
    title: m('missionStart'),
    detail: m('missionStartDetail'),
    tone: 'green'
  });
  base.score = computeScore(base);
  return prepareSol(base);
}