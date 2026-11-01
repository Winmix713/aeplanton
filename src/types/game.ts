import type { ColonyState } from './colony';
import type { Msg } from './i18n';

export type AdvisorId = 'nav' | 'sys' | 'sci' | 'comm';
export type PillarId = 'water' | 'power' | 'comms' | 'science';
export type DifficultyId = 'explorer' | 'engineer' | 'director';
export type RegionId = 'chryse' | 'jezero' | 'sirenum' | 'hellas';
/** Canonical six-act ARES 2051 campaign. */
export type ActId = 'discovery' | 'foundation' | 'silentSignal' | 'humanFactor' | 'lastArrival' | 'newHumanity';
export type CommandId =
'drive' |
'navigate' |
'survey' |
'drill' |
'selectTarget' |
'siteSurvey' |
'spectroscopy' |
'prep' |
'sample' |
'sealSample' |
'checkSample' |
'analyze' |
'preparePacket' |
'uplink' |
'deploySolar' |
'buildRelay' |
'heat' |
'repair' |
'rest'
// ARN robot tasks
| 'cleanSolar' |
'harvestRegolith' |
'mineIce' |
'serviceModules' |
'repairFleet' |
'reinforceTube' |
'calibrateAntenna';
export type GameView = 'command' | 'navigation' | 'science' | 'systems' | 'colony' | 'robotics' | 'environment' | 'comms' | 'reports' | 'settings';
export type GamePhase = 'planning' | 'uplink' | 'executing' | 'night' | 'report';
export type TimeSpeed = 1 | 5 | 20;
export type Tone = 'amber' | 'green' | 'blue' | 'red' | 'neutral';
export type EventKind =
'storm' |
'stormEnd' |
'cold' |
'wear' |
'commsLoss' |
'wind' |
'contamination' |
'software' |
'badAdvice' |
'brownout' |
'discovery' |
'favorableWindow' |
'technology' |
'dustLoad' |
'milestone' |
'flare' |
'lifeSupport' |
'robots' |
'consequence' |
'secret' |
'defiance' |
'mission';
export type Medal = 'gold' | 'silver' | 'bronze';
export type C012State = 'none' | 'selected' | 'surveyed' | 'spectrographed' | 'sampled' | 'sealed' | 'checked' | 'analyzed' | 'packetReady' | 'uplinked';
export type Station = 'Madrid' | 'Goldstone' | 'MRO' | 'TGO' | 'Relay';

export interface QueueItem {
  uid: number;
  command: CommandId;
  source: AdvisorId | 'manual';
  proposalId?: string;
}

export interface Proposal {
  id: string;
  advisor: AdvisorId;
  title: Msg;
  rationale: Msg;
  commands: CommandId[];
  /** Advisor-reported estimate. Noisy when trust is low. */
  estimate: Msg;
  pillar: PillarId | null;
  stance: 'push' | 'conserve';
  alternative?: boolean;
}

export interface AdvisorState {
  trust: number;
  ignoredStreak: number;
  accepted: number;
  justifiedRejections: number;
}

export interface CommsWindow {
  station: Station;
  /** LMST hours 0–24. */
  start: number;
  end: number;
  mbps: number;
}

export interface DataPacket {
  id: number;
  kind: 'ice' | 'c012';
  mb: number;
}

export interface EnvironmentState {
  dayTempC: number;
  pressurePa: number;
  windMs: number;
  dustIndex: number;
  solarIrradiance: number;
  daylightHours: number;
  visibilityKm: number;
  /** 0.48–1.15 multiplier for science accuracy and contamination risk. */
  scienceQuality: number;
}

export interface SampleRecord {
  id: 'C-012';
  state: C012State;
  location: string;
  selectedSol: number | null;
  collectedSol: number | null;
  type: 'biosignatureCandidate';
  mineralogy: string[];
  quality: number;
  contaminated: boolean | null;
  storage: 'uncollected' | 'arm' | 'tube' | 'cache';
  analysis: 'pending' | 'organicsDetected' | 'inconclusive';
  uploaded: boolean;
}

export interface Inventory {
  drillBits: number;
  tubes: number;
  spares: number;
  solarKits: number;
  relayKits: number;
}

export interface RoverHealth {
  /** Battery state of charge, %. */
  battery: number;
  /** Wheel health, %. */
  wheels: number;
  /** Current drill bit health, %. */
  drill: number;
  /** Deck panel dust cover 0–1. */
  dust: number;
  safeModeSols: number;
  brownouts: number;
}

export interface PillarProgress {
  water: {coverage: number;cores: number;uplinked: boolean;};
  power: {farmW: number;rtgW: number;streak: number;};
  comms: {relay: number;streak: number;};
  science: {c012: C012State;voidedTubes: number;};
}

export interface GameEvent {
  id: number;
  sol: number;
  kind: EventKind;
  title: Msg;
  detail: Msg;
  tone: Tone;
  counter?: CommandId;
  /** Related events share a chain id so cause and consequences remain visible. */
  chainId?: string;
  chainStep?: number;
}

export interface StepResult {
  command: CommandId;
  source: AdvisorId | 'manual';
  ok: boolean;
  skipped?: boolean;
  title: Msg;
  detail: Msg;
  routeAfter: number;
  event?: GameEvent;
}

export interface ScoreBreakdown {
  efficiency: number;
  risk: number;
  science: number;
  total: number;
}

export interface SolReport {
  sol: number;
  steps: StepResult[];
  events: GameEvent[];
  batteryBefore: number;
  batteryAfter: number;
  routeBefore: number;
  routeAfter: number;
  trustDelta: Record<AdvisorId, number>;
  pillarsBefore: Record<PillarId, number>;
  pillarsAfter: Record<PillarId, number>;
  score: ScoreBreakdown;
  apUsed: number;
  apBudget: number;
  nightTemp: number;
  heated: boolean;
  environment: EnvironmentState;
  act: ActId;
  restSkip?: number;
}

export interface GameOutcome {
  result: 'victory' | 'defeat';
  reason: Msg;
  medal: Medal | null;
}

export interface GameStats {
  apUsed: number;
  apAvailable: number;
  faults: number;
  crisesHandled: number;
  discoveries: number;
  eventChainsBroken: number;
}

export interface GameState {
  version: 4;
  runId: string;
  slot: number;
  seed: number;
  rng: number;
  difficulty: DifficultyId;
  region: RegionId;
  permadeath: boolean;
  sol: number;
  act: ActId;
  delayMin: number;
  /** 0–1 progress along the traverse to Delta Ridge. */
  route: number;
  waypointsVerified: boolean;
  sterile: boolean;
  environment: EnvironmentState;
  sample: SampleRecord;
  rover: RoverHealth;
  inventory: Inventory;
  pillars: PillarProgress;
  storm: {sols: number;intensity: number;chainId: string | null;chainStep: number;};
  windows: CommsWindow[];
  dataQueue: DataPacket[];
  advisors: Record<AdvisorId, AdvisorState>;
  proposals: Proposal[];
  apBudget: number;
  events: GameEvent[];
  reports: SolReport[];
  score: ScoreBreakdown;
  stats: GameStats;
  outcome: GameOutcome | null;
  nextId: number;
  startedAt: number;
  /** ARES 2051 colony layer: life support, robot fleets, MECI and story. */
  colony: ColonyState;
}

export interface SlotSummary {
  slot: number;
  savedAt: number;
  sol: number;
  difficulty: DifficultyId;
  region: RegionId;
  permadeath: boolean;
  pillarsDone: number;
  ended: boolean;
}

export interface LeaderboardEntry {
  id: string;
  date: number;
  difficulty: DifficultyId;
  region: RegionId;
  score: number;
  medal: Medal | null;
  sol: number;
  result: 'victory' | 'defeat';
  permadeath: boolean;
}

export interface NewGameOptions {
  difficulty: DifficultyId;
  region: RegionId;
  slot: number;
  permadeath: boolean;
  seed?: number;
}