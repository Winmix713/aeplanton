import { DropletIcon, RadioTowerIcon, SparklesIcon, ZapIcon } from 'lucide-react';
import type { AdvisorId, PillarId } from '../types/game';

export const pillarOrder: PillarId[] = ['water', 'power', 'comms', 'science'];

export const pillars: Record<PillarId, {name: string;goal: string;icon: typeof ZapIcon;owners: AdvisorId[];}> = {
  water: { name: 'Water', goal: 'Subsurface ice mapped, cored and confirmed', icon: DropletIcon, owners: ['sci', 'nav'] },
  power: { name: 'Power', goal: 'Solar farm + RTG ≥ 400 W for 3 Sols', icon: ZapIcon, owners: ['sys'] },
  comms: { name: 'Comms', goal: 'Relay tower up, DSN link unbroken for 5 Sols', icon: RadioTowerIcon, owners: ['comm'] },
  science: { name: 'Science', goal: 'C-012 cored clean, analyzed and uplinked', icon: SparklesIcon, owners: ['sci', 'comm'] }
};

export const POWER_TARGET_W = 400;
export const POWER_STREAK = 3;
export const COMMS_STREAK = 5;
export const ICE_CORES = 2;
export const SOLAR_KIT_W = 70;
export const RELAY_SEGMENT = 34;
/** Route progress gates. */
export const SURVEY_RANGE = 0.3;
export const DRILL_RANGE = 0.5;
export const DEADLINE_SOL = 500;