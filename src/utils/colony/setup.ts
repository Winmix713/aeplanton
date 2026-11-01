import { FLEET_SIZE, startingResources } from '../../data/colony';
import type { ColonyState, Fleet } from '../../types/colony';

const fleet = (): Fleet => ({ total: FLEET_SIZE, busy: 0, lost: 0, condition: 100 });

/** ARES-1 at Landing Zone Alpha on Sol 1: 100 colonists, a running chemical loop and 200 robots. */
export function createColony(): ColonyState {
  return {
    colonists: 100,
    resources: { ...startingResources },
    modules: {
      sabatier: { mode: 'on', integrity: 88, failed: false },
      wrs: { mode: 'on', integrity: 92, failed: false },
      electrolysis: { mode: 'on', integrity: 90, failed: false }
    },
    solarDust: 0.04,
    flareSols: 0,
    doseMsv: 0,
    morale: 62,
    lavaTube: 0,
    fleets: { nav: fleet(), sci: fleet(), sys: fleet(), comm: fleet() },
    tasks: [],
    delaySols: 0,
    debtSols: 0,
    gridLevel: 0,
    flags: [],
    missionsDone: {},
    pendingMission: null,
    missionAp: 0,
    pending: [],
    secrets: [],
    lastDefiance: { nav: 0, sci: 0, sys: 0, comm: 0 },
    balance: { water: 0, o2: 0, food: 0, h2: 0, generationKwh: 0, loadKwh: 0 },
    ap: { base: 10, infrastructure: 0, loyalty: 0, friction: 0, environment: 0, upkeep: 0, grid: 0, safeMode: 0, mission: 0, total: 10 },
    ending: null
  };
}