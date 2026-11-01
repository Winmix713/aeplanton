import type { MapPoint, RoverState, ToastTone } from './rover';

export type LanderPhase = 'standby' | 'checking' | 'checked' | 'hotfire' | 'ready' | 'countdown' | 'ascent' | 'departed';

export interface LanderState {
  phase: LanderPhase;
  phaseTime: number;
  checkIndex: number;
  hover: number;
  countdown: number;
  altitude: number;
  velocity: number;
  downrange: number;
  maxQ: boolean;
  enginesOn: boolean;
  tankPressure: number;
  engineTemp: number;
  peakAltitude: number;
  peakVelocity: number;
}

export interface Resources {
  /** Base battery state of charge, %. */
  power: number;
  propellant: number;
  oxygen: number;
  water: number;
  /** Solar field generation, kW. */
  solarKw: number;
  /** Generation minus load, kW. */
  netKw: number;
  /** 0–1 dust cover on the base solar field. */
  arrayDust: number;
}

export interface Environment {
  temp: number;
  wind: number;
  pressure: number;
  dust: number;
  irradiance: number;
  radiation: number;
}

export interface Vehicles {
  cargoU: number;
  cargoDwell: number;
  explorerT: number;
}

/** Earth link windows: commands only uplink while `open`; otherwise they queue. */
export interface CommsState {
  enabled: boolean;
  open: boolean;
  /** Seconds left in the current open/closed window. */
  remaining: number;
  /** 0–1 signal quality while open. */
  strength: number;
  /** 0–1 high-gain antenna pointing calibration; drifts down over time. */
  calibration: number;
}

export type WeatherPhase = 'clear' | 'warning' | 'storm';

export interface WeatherState {
  phase: WeatherPhase;
  /** Seconds left in the current phase. */
  timer: number;
  /** Total length of the current phase, seconds. */
  duration: number;
  /** 0–1 storm strength (0 outside storms). */
  intensity: number;
}

export type FaultSystem = 'drill' | 'rover-power' | 'base-power' | 'antenna';

export interface Fault {
  id: number;
  system: FaultSystem;
  title: string;
  severity: 'warn' | 'critical';
  at: number;
  resolvedAt: number | null;
}

/** Commands the dock / hotspots can issue. Only some can be queued for uplink. */
export type CommandKind =
'move' |
'scan' |
'collect' |
'return' |
'check' |
'hotfire' |
'clean' |
'cooldown' |
'calibrate' |
'stop' |
'launch';

export type CommandOutcome = 'executed' | 'queued' | 'rejected';

export interface QueuedCommand {
  id: number;
  kind: CommandKind;
}

export interface CommandRecord {
  id: number;
  kind: CommandKind;
  outcome: CommandOutcome;
  detail: string;
  at: number;
  /** Issued while a dust storm was active. */
  inStorm: boolean;
}

export interface MissionState {
  rover: RoverState;
  lander: LanderState;
  resources: Resources;
  env: Environment;
  vehicles: Vehicles;
  comms: CommsState;
  weather: WeatherState;
  faults: Fault[];
  queue: QueuedCommand[];
  commandLog: CommandRecord[];
  elapsed: number;
  startOdometer: number;
  startPropellant: number;
}

export type JournalCategory = 'command' | 'telemetry' | 'comms' | 'warning' | 'mission';
export type JournalStatus = 'success' | 'waiting' | 'error';

export interface JournalEntry {
  id: number;
  utc: string;
  lmst: string;
  source: string;
  category: JournalCategory;
  status: JournalStatus;
  title: string;
  detail: string;
  target?: MapPoint;
}

export type LogInput = Omit<JournalEntry, 'id' | 'utc' | 'lmst' | 'status'> & {status?: JournalStatus;};

export interface SimEvent {
  toast?: {text: string;tone: ToastTone;};
  log?: LogInput;
}

export type ViewId = 'overview' | 'spacecraft' | 'rover' | 'systems' | 'journal';
export type CameraMode = 'site' | 'tactical' | 'atlas';
export type CalloutId = 'lander' | 'rover' | 'cargo' | 'explorer' | 'sector';
export type PickId = CalloutId | 'habitat' | 'tower' | 'solar' | 'dock';
export type ObjectiveState = 'complete' | 'active' | 'open' | 'blocked';
export type HotspotId = 'drill' | 'solar' | 'navcam' | 'engine' | 'antenna' | 'airlock';
export type BentoTab = 'live' | 'capabilities';

export interface CameraState {
  mode: CameraMode;
  zoom: number;
  focus: MapPoint | null;
  frame: 'base' | 'lander';
}