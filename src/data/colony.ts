import { FlameIcon, FlaskRoundIcon, WavesIcon } from 'lucide-react';
import type { AdvisorId } from '../types/game';
import type { ModuleId, Resources } from '../types/colony';

/** Per-100-colonist daily consumption (ARES 2051 Survival Systems framework). */
export const CONSUMPTION = { water: 40, o2: 32, food: 50 } as const;

/** Chemical loop per Sol at nominal integrity. */
export const moduleOrder: ModuleId[] = ['sabatier', 'wrs', 'electrolysis'];
export const moduleDefs: Record<ModuleId, {icon: typeof FlameIcon;owner: AdvisorId;powerKw: number;}> = {
  /** 44 kg CO₂ + 8 kg H₂ → 16 kg CH₄ + 36 kg H₂O. */
  sabatier: { icon: FlameIcon, owner: 'sys', powerKw: 15 },
  /** 40 kg wastewater → 36 kg purified water (90 %). */
  wrs: { icon: WavesIcon, owner: 'sys', powerKw: 10 },
  /** 36 kg H₂O → 32 kg O₂ + 4 kg H₂. */
  electrolysis: { icon: FlaskRoundIcon, owner: 'sys', powerKw: 25 }
};
export const SABATIER = { h2In: 8, waterOut: 36 };
export const WRS = { waterOut: 36 };
export const ELECTROLYSIS = { waterIn: 36, o2Out: 32, h2Out: 4 };
export const OVERCLOCK_MULT = 1.5;

/** Power: 100 kW solar array + 20 kW RTG, 500 kWh battery bank. */
export const SOLAR_BASE_KW = 100;
export const SOLAR_PER_KIT_KW = 10;
export const SOLAR_FULL_SUN_HOURS = 13;
export const RTG_KW = 20;
export const HABITAT_KW = 18;
export const BATTERY_KWH = 500;
export const SOL_HOURS = 24.6;
export const HYDROPONICS_FOOD = 30;
export const DUST_PER_SOL = 0.01;

/** Module wear per Sol (on / overclocked). */
export const WEAR_ON = 2;
export const WEAR_OVERCLOCK = 8;

/** MECI: 10 million refugees in orbit, 250 000 lives lost per Sol of delay. */
export const MECI_TOTAL = 10_000_000;
export const MECI_PER_SOL = 250_000;

/** Robot network: 4 fleets of 50. */
export const FLEET_SIZE = 50;
export const ROBOT_WEAR = 2;
export const ROBOT_WEAR_MULT = { clear: 1, flare: 3, storm: 5 } as const;

/** Trust tiers from the AP framework. */
export const TIER_LOYAL = 81;
export const TIER_BASELINE = 36;
export const TIER_FRICTION = 15;

export const startingResources: Resources = { water: 900, o2: 620, food: 4200, h2: 160, regolith: 60, battery: 380 };

/** Cargo drops from the orbital fleet when a new act opens. */
export const ACT_RESUPPLY = { food: 1500, h2: 120, regolith: 40 };

export const advisorPortraits: Record<AdvisorId, string> = {
  nav: "/336f6c6a-8c7c-43a2-93bd-de82eef6e33b.jpg",
  sci: "/bb32226e-5f01-4974-9ee3-d3a5184365c4.jpg",
  sys: "/8fc1207f-2c16-45df-87ae-9ba36942d2a6.jpg",
  comm: "/6c1929ea-4ec6-4e29-86fb-ae5da6277711.jpg"
};