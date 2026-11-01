import {
  AntennaIcon,
  BatteryChargingIcon,
  CheckCheckIcon,
  CompassIcon,
  CrosshairIcon,
  FileArchiveIcon,
  FlameIcon,
  FlaskConicalIcon,
  MicroscopeIcon,
  NavigationIcon,
  PackageCheckIcon,
  PickaxeIcon,
  RadarIcon,
  SatelliteDishIcon,
  ScanSearchIcon,
  ShieldCheckIcon,
  SunIcon,
  TestTubeIcon,
  WrenchIcon,
  BrushIcon,
  ShovelIcon,
  SnowflakeIcon,
  SettingsIcon,
  BotIcon,
  MountainIcon,
  RadioIcon } from
'lucide-react';
import type { AdvisorId, CommandId } from '../types/game';

export interface CommandDef {
  id: CommandId;
  icon: typeof SunIcon;
  /** Rover battery cost in % (negative = gain). Robot tasks draw nothing from the rover. */
  power: number;
  owner: AdvisorId;
  /** Planning complexity: simple = 1 AP, complex = 2 AP, critical = 3 AP. */
  complexity: 'simple' | 'complex' | 'critical';
  /** Explicit AP override (robot tasks from the ARN framework). */
  ap?: number;
  /** ARN robots locked for the task, per fleet. */
  robots?: Partial<Record<AdvisorId, number>>;
  /** Sols the robots stay locked. */
  duration?: number;
  /** Regolith consumed at dispatch. */
  regolith?: number;
}

export const commandDefs: Record<CommandId, CommandDef> = {
  drive: { id: 'drive', icon: NavigationIcon, power: 12, owner: 'nav', complexity: 'simple' },
  navigate: { id: 'navigate', icon: CompassIcon, power: 3, owner: 'nav', complexity: 'simple' },
  survey: { id: 'survey', icon: RadarIcon, power: 8, owner: 'sci', complexity: 'complex' },
  drill: { id: 'drill', icon: PickaxeIcon, power: 12, owner: 'sci', complexity: 'critical' },
  selectTarget: { id: 'selectTarget', icon: CrosshairIcon, power: 1, owner: 'sci', complexity: 'simple' },
  siteSurvey: { id: 'siteSurvey', icon: ScanSearchIcon, power: 5, owner: 'sci', complexity: 'complex' },
  spectroscopy: { id: 'spectroscopy', icon: MicroscopeIcon, power: 7, owner: 'sci', complexity: 'complex' },
  prep: { id: 'prep', icon: ShieldCheckIcon, power: 3, owner: 'sci', complexity: 'simple' },
  sample: { id: 'sample', icon: TestTubeIcon, power: 10, owner: 'sci', complexity: 'critical' },
  sealSample: { id: 'sealSample', icon: PackageCheckIcon, power: 2, owner: 'sci', complexity: 'simple' },
  checkSample: { id: 'checkSample', icon: CheckCheckIcon, power: 3, owner: 'sci', complexity: 'complex' },
  analyze: { id: 'analyze', icon: FlaskConicalIcon, power: 6, owner: 'sci', complexity: 'complex' },
  preparePacket: { id: 'preparePacket', icon: FileArchiveIcon, power: 2, owner: 'comm', complexity: 'simple' },
  uplink: { id: 'uplink', icon: SatelliteDishIcon, power: 4, owner: 'comm', complexity: 'complex' },
  deploySolar: { id: 'deploySolar', icon: SunIcon, power: 8, owner: 'sys', complexity: 'critical' },
  buildRelay: { id: 'buildRelay', icon: AntennaIcon, power: 9, owner: 'comm', complexity: 'critical' },
  heat: { id: 'heat', icon: FlameIcon, power: 0, owner: 'sys', complexity: 'simple' },
  repair: { id: 'repair', icon: WrenchIcon, power: 5, owner: 'sys', complexity: 'complex' },
  rest: { id: 'rest', icon: BatteryChargingIcon, power: -20, owner: 'sys', complexity: 'simple' },
  cleanSolar: { id: 'cleanSolar', icon: BrushIcon, power: 0, owner: 'sys', complexity: 'simple', ap: 1, robots: { sys: 5 }, duration: 1 },
  harvestRegolith: { id: 'harvestRegolith', icon: ShovelIcon, power: 0, owner: 'sci', complexity: 'simple', ap: 1, robots: { sci: 20 }, duration: 1 },
  mineIce: { id: 'mineIce', icon: SnowflakeIcon, power: 0, owner: 'sci', complexity: 'critical', ap: 3, robots: { sci: 20, nav: 5 }, duration: 2 },
  serviceModules: { id: 'serviceModules', icon: SettingsIcon, power: 0, owner: 'sys', complexity: 'complex', ap: 2, robots: { sys: 10 }, duration: 1, regolith: 10 },
  repairFleet: { id: 'repairFleet', icon: BotIcon, power: 0, owner: 'sys', complexity: 'simple', ap: 1, duration: 1, regolith: 20 },
  reinforceTube: { id: 'reinforceTube', icon: MountainIcon, power: 0, owner: 'sys', complexity: 'critical', ap: 4, robots: { sys: 15 }, duration: 3, regolith: 30 },
  calibrateAntenna: { id: 'calibrateAntenna', icon: RadioIcon, power: 0, owner: 'comm', complexity: 'complex', ap: 2, robots: { comm: 10 }, duration: 1 }
};

export function isRobotTask(id: CommandId): boolean {
  return commandDefs[id].duration !== undefined;
}

/** Manual palette order in the sequence dock. Act locks are applied at render time. */
export function commandAp(id: CommandId): number {
  const def = commandDefs[id];
  if (def.ap !== undefined) return def.ap;
  return def.complexity === 'critical' ? 3 : def.complexity === 'complex' ? 2 : 1;
}

export function sequenceAp(commands: CommandId[]): number {
  return commands.reduce((sum, id) => sum + commandAp(id), 0);
}

export const paletteOrder: CommandId[] = [
'drive',
'navigate',
'survey',
'drill',
'selectTarget',
'siteSurvey',
'spectroscopy',
'prep',
'sample',
'sealSample',
'checkSample',
'analyze',
'preparePacket',
'uplink',
'deploySolar',
'buildRelay',
'heat',
'repair',
'rest',
'cleanSolar',
'harvestRegolith',
'mineIce',
'serviceModules',
'repairFleet',
'reinforceTube',
'calibrateAntenna'];