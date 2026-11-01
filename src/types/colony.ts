import type { AdvisorId, CommandId } from './game';

export type ModuleId = 'sabatier' | 'wrs' | 'electrolysis';
export type ModuleMode = 'off' | 'on' | 'overclock';
export type TrustTier = 'loyal' | 'baseline' | 'friction' | 'defiant';
export type EndingId = 'directorate' | 'fragmented' | 'regime' | 'united';
export type ResourceId = 'water' | 'o2' | 'food' | 'h2' | 'regolith';

/** Stocks in kg (food in ration units, battery in kWh). */
export interface Resources {
  water: number;
  o2: number;
  food: number;
  h2: number;
  regolith: number;
  battery: number;
}

export interface ModuleState {
  mode: ModuleMode;
  /** 0–100. Below 75 loses efficiency, below 50 risks failure, below 25 is critical. */
  integrity: number;
  /** Offline for the current Sol after a failure roll. */
  failed: boolean;
}

export interface Fleet {
  total: number;
  busy: number;
  /** Permanently lost (stranded or sacrificed). */
  lost: number;
  /** 0–100 average fleet condition. */
  condition: number;
}

export interface RobotTask {
  id: number;
  command: CommandId;
  robots: Partial<Record<AdvisorId, number>>;
  solsLeft: number;
  /** Fleet efficiency at dispatch (0.5 when the fleet was worn below 50%). */
  efficiency: number;
}

export interface ColonyEffect {
  water?: number;
  o2?: number;
  food?: number;
  h2?: number;
  regolith?: number;
  battery?: number;
  morale?: number;
  trust?: Partial<Record<AdvisorId, number>>;
  /** Sols of delay to the refugee landing (−250 000 lives each). */
  delaySols?: number;
  integrity?: Partial<Record<ModuleId, number>>;
  robotsLost?: Partial<Record<AdvisorId, number>>;
  /** Action points spent right now on the current Sol. */
  ap?: number;
  lavaTube?: number;
  route?: number;
  wheels?: number;
  solarDust?: number;
  flareSols?: number;
  verifyWaypoints?: boolean;
  moduleMode?: Partial<Record<ModuleId, ModuleMode>>;
  flags?: string[];
  revealSecret?: AdvisorId;
}

export interface DelayedEffect {
  id: number;
  sol: number;
  missionId: string;
  optionId: string;
  effect: ColonyEffect;
  /** Flag that cancels this consequence if set before it lands. */
  cancelledBy?: string;
}

export interface ApBreakdown {
  base: number;
  infrastructure: number;
  loyalty: number;
  friction: number;
  environment: number;
  upkeep: number;
  grid: number;
  safeMode: number;
  /** AP already committed to today's mission decision. */
  mission: number;
  total: number;
}

export interface ResourceBalance {
  water: number;
  o2: number;
  food: number;
  h2: number;
  generationKwh: number;
  loadKwh: number;
}

export interface ColonyState {
  colonists: number;
  resources: Resources;
  modules: Record<ModuleId, ModuleState>;
  /** Solar array dust cover 0–1 (−1 %/Sol). */
  solarDust: number;
  flareSols: number;
  /** Cumulative crew dose in mSv. */
  doseMsv: number;
  morale: number;
  /** Lava-tube habitat readiness 0–100 (radiation shielding 30 % → 95 %). */
  lavaTube: number;
  fleets: Record<AdvisorId, Fleet>;
  tasks: RobotTask[];
  /** Sols of delay accumulated against the MECI deadline. */
  delaySols: number;
  /** Consecutive Sols in oxygen or water debt. */
  debtSols: number;
  /** 0 = nominal, 1 SCI shed, 2 NAV shed, 3 SYS shed, 4 life support. */
  gridLevel: number;
  flags: string[];
  missionsDone: Record<string, string>;
  pendingMission: string | null;
  /** AP spent on mission decisions during the current Sol. */
  missionAp: number;
  pending: DelayedEffect[];
  secrets: AdvisorId[];
  lastDefiance: Record<AdvisorId, number>;
  balance: ResourceBalance;
  ap: ApBreakdown;
  ending: EndingId | null;
}