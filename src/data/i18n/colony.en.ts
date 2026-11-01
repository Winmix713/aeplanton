import type { MsgParams } from '../../types/i18n';

type MsgFn = (p: MsgParams) => string;

export interface MissionText {
  title: string;
  brief: string;
  options: Record<string, {label: string;detail: string;later?: string;}>;
}

export const robotCommandsEn = {
  cleanSolar: { label: 'Clean solar array', short: 'Clean', description: '5 SYS robots sweep the 100 kW array · dust −10%.' },
  harvestRegolith: { label: 'Harvest regolith', short: 'Regolith', description: '20 SCI robots gather +30 kg raw material for repairs and building.' },
  mineIce: { label: 'Deep ice mining', short: 'Ice', description: '20 SCI + 5 NAV robots for 2 Sols · +120 kg water.' },
  serviceModules: { label: 'Service modules', short: 'Service', description: '10 SYS robots restore the most worn module · +30% integrity · 10 kg regolith.' },
  repairFleet: { label: 'Repair fleet', short: 'Fleet', description: 'Refit the most worn robot fleet · +35% condition · 20 kg regolith.' },
  reinforceTube: { label: 'Reinforce lava tube', short: 'Tube', description: '15 SYS robots for 3 Sols · habitat +20% · 30 kg regolith.' },
  calibrateAntenna: { label: 'Calibrate fleet antenna', short: 'Antenna', description: '10 COMM robots tune the orbital link · crew morale +5.' }
};

export const missionsEn: Record<string, MissionText> = {
  M001: {
    title: 'First Breath',
    brief: 'Sol 1. ARES-1 was stocked for a crew of twelve, not a hundred. Bellini can push electrolysis to buy oxygen; Varga wants the water recovery loop stabilised first. Doing both by hand eats most of today’s crew hours.',
    options: {
      o2: { label: 'Prioritise oxygen', detail: 'Overclock electrolysis now. WRS maintenance slips.', later: 'The neglected WRS loop backed up. Contaminated water had to be dumped.' },
      wrs: { label: 'Prioritise water recovery', detail: 'Stabilise the WRS. Oxygen reserves dip for a few Sols.' },
      both: { label: 'Do both by hand', detail: 'Every crew member on the loop. Costs most of today’s action points.' }
    }
  },
  M002: {
    title: 'Unverified Route',
    brief: 'Orbital scans show Delta Ridge as a stable outflow terrace, but the sector is flagged UNVERIFIED. Okafor wants a drone pass first. Varga wants the rover on the ridge today.',
    options: {
      rover: { label: 'Send the rover', detail: 'Gain ground toward the ridge now. Okafor objects.', later: 'The terrace gave way under the rover’s track — the instability Okafor had in her data.' },
      drone: { label: 'Drone survey first', detail: 'Spend time to verify the line. Okafor is reassured.' },
      abandon: { label: 'Abandon the ridge for now', detail: 'No risk, no progress. The science team loses faith.' }
    }
  },
  M003: {
    title: 'Sabatier Impulse',
    brief: 'The Sabatier reactor is throwing pressure spikes on start-up. Bellini insists on a controlled shutdown. Varga points at the water ledger.',
    options: {
      force: { label: 'Force the start', detail: 'Water now, at the cost of the reactor’s integrity.', later: 'The catalyst bed cracked — the fault Bellini never logged.' },
      shutdown: { label: 'Controlled shutdown', detail: 'Take the reactor offline and inspect it. Slower, safer.' }
    }
  },
  M004: {
    title: 'Life Support Crunch',
    brief: 'Five Sols in, the consumption curves no longer meet the production curves. Something has to give.',
    options: {
      ration: { label: 'Ration the crew', detail: 'Cut food rations. Reserves recover, morale suffers.' },
      reserves: { label: 'Draw down reserves', detail: 'Feed everyone properly now and trust the next drop.', later: 'The reserve drawdown caught up with us: the food cache is short.' },
      overclock: { label: 'Overclock electrolysis', detail: 'Buy oxygen with module wear.' }
    }
  },
  M005: {
    title: 'Deep Radar',
    brief: 'Ground radar returns a structured echo forty metres below the lava-tube field — and it pulses.',
    options: {
      isolate: { label: 'Isolate the signal', detail: 'Wall it off from the grid. Bellini approves, Varga does not.' },
      monitor: { label: 'Monitor it', detail: 'Keep instruments on it. Varga is thrilled.', later: 'The signal pulsed in sync with the grid and drained the battery bank.' }
    }
  },
  M006: {
    title: 'Solar Flare',
    brief: 'SPE alert: a proton storm hits within hours — 4,500 mSv/yr equivalent on the surface. Crews and robots are spread across the field.',
    options: {
      slow: { label: 'Orderly evacuation', detail: 'Bring everyone and everything in. It takes the whole day.' },
      fast: { label: 'Emergency evacuation', detail: 'People first. Five NAV robots are left outside.' },
      sacrifice: { label: 'Leave the COMM array team', detail: 'Keep the link alive. Ten COMM robots are lost — Mercer will not forget.', later: 'Mercer made sure the crew heard who was left outside.' }
    }
  },
  M007: {
    title: 'Underground Water Matrix',
    brief: 'Varga has found an ice lens beneath the tube field. Drilling it fast would solve water for weeks.',
    options: {
      safe: { label: 'Safe drilling', detail: 'Slow, supported bores. A steady water gain.' },
      aggressive: { label: 'Aggressive drilling', detail: 'Double the yield. Bellini warns about the tube roof.', later: 'Subsidence: the aggressive bore weakened the lava-tube roof.' }
    }
  },
  M008: {
    title: 'Whisper in the Code',
    brief: 'Mercer brings you logs: someone patched over the Sabatier fault reports. The signature is Bellini’s.',
    options: {
      expose: { label: 'Expose it', detail: 'Put it in front of the crew. The reactor gets properly fixed; Bellini is humiliated.' },
      cover: { label: 'Cover it quietly', detail: 'Protect Bellini’s standing. Mercer resents it.', later: 'The hidden catalyst fault failed for real.' }
    }
  },
  M009: {
    title: 'The Mars Paradox',
    brief: 'The signal is a door. Varga wants to open the Vault beneath the tubes. Bellini wants to drain its power source into the grid and bury it forever. This choice will shape what kind of colony the refugees inherit.',
    options: {
      vault: { label: 'Open the Vault', detail: 'Unlock what lies below. Science ascends; Systems breaks with you.' },
      drain: { label: 'Drain the signal', detail: 'Stabilise the grid and close the question. Science breaks with you.' }
    }
  },
  A2: { title: 'Act II · The Foundation', brief: 'The fleet confirms the 500-Sol window. Now build: solar kits, the relay tower and the lava-tube habitat. A cargo drop restocks food, hydrogen and regolith.', options: { ack: { label: 'Begin construction', detail: '' } } },
  A3: { title: 'Act III · The Silent Signal', brief: 'The link to the fleet goes quiet for hours at a time. Mercer’s antenna crews matter now — and so does what he is not telling you.', options: { ack: { label: 'Understood', detail: '' } } },
  A4: { title: 'Act IV · The Human Factor', brief: 'Machines can be repaired. People cannot be rebooted. Trust and morale decide the next hundred Sols.', options: { ack: { label: 'Understood', detail: '' } } },
  A5: { title: 'Act V · The Last Arrival', brief: 'The first refugee landers are scheduled. Every system you built will be tested at a hundred times the load.', options: { ack: { label: 'Prepare the landing zone', detail: '' } } },
  A6: { title: 'Act VI · A New Humanity', brief: 'The final stretch. Whatever ARES-1 is now is what humanity becomes.', options: { ack: { label: 'Finish the work', detail: '' } } }
};

const moduleNamesEn: Record<string, string> = { sabatier: 'Sabatier reactor', wrs: 'Water recovery', electrolysis: 'Electrolysis' };
const leadsEn: Record<string, string> = { nav: 'Okafor', sci: 'Varga', sys: 'Bellini', comm: 'Mercer' };
const secretsEn: Record<string, string> = {
  nav: 'Okafor shares her hidden Delta Ridge instability data. The ridge consequence is defused.',
  sci: 'Varga reveals the unidentified chemical samples she kept off the books · +40 kg material.',
  sys: 'Bellini admits the faulty Sabatier catalyst bed and repairs it properly.',
  comm: 'Mercer discloses the crew surveillance algorithm — and shuts it down. Morale lifts.'
};
const gridEn = ['Nominal', 'SCI shed', 'NAV shed', 'Modules shed', 'Life support failing'];

export const colonyUiEn = {
  meci: {
    label: 'MECI',
    lives: (n: string) => `${n} lives`,
    delay: (n: number) => n === 0 ? 'On schedule' : `${n} Sol${n > 1 ? 's' : ''} late`,
    title: 'Lives the colony can still receive. Every Sol of delay costs 250,000.'
  },
  panel: {
    resources: 'Life support reserves',
    loop: 'Chemical loop',
    power: 'Power grid',
    crew: 'Crew & habitat',
    perSol: '/Sol',
    solsLeft: (n: number) => Number.isFinite(n) ? `${n} Sols left` : 'Stable',
    battery: 'Battery bank',
    generation: 'Generation',
    load: 'Load',
    dust: 'Array dust',
    capacity: (kw: number) => `${kw} kW solar · 20 kW RTG`,
    colonists: 'Colonists',
    morale: 'Morale',
    dose: 'Crew dose',
    shielding: 'Radiation shielding',
    lavaTube: 'Lava-tube habitat',
    integrity: 'Integrity',
    failed: 'Failed tonight',
    forecast: 'Tonight’s forecast',
    grid: (level: number) => gridEn[level] ?? gridEn[0],
    modeLocked: 'Modes are locked while commands execute.',
    modeAria: (name: string) => `${name} mode`,
    upkeep: 'Each running module costs 1 AP of upkeep per Sol.',
    flare: 'Solar flare · surface crews sheltered'
  },
  resources: { water: 'Water', o2: 'Oxygen', food: 'Food', h2: 'Hydrogen', regolith: 'Regolith' },
  units: { kg: 'kg', food: 'rations' },
  modules: {
    sabatier: { name: 'Sabatier reactor', io: 'CO₂ + H₂ → CH₄ + H₂O' },
    wrs: { name: 'Water recovery', io: 'Wastewater → 90% clean' },
    electrolysis: { name: 'Electrolysis', io: 'H₂O → O₂ + H₂' }
  },
  modes: { off: 'Off', on: 'On', overclock: 'Boost' },
  robotics: {
    title: 'ARN robot network',
    free: 'Free',
    busy: 'Busy',
    lost: 'Lost',
    condition: 'Condition',
    offline: 'Offline',
    halved: 'Half speed',
    tasks: 'Active tasks',
    noTasks: 'No robots deployed. Robot tasks are in the command palette.',
    solsLeft: (n: number) => `${n} Sol${n > 1 ? 's' : ''} left`,
    note: 'Wear 2%/Sol × environment (clear ×1, flare ×3, storm ×5). Below 50% a fleet works at half speed; below 25% it shuts down and busy robots can be stranded.',
    total: (free: number, total: number) => `${free}/${total} free`,
    fleetAria: (code: string) => `${code} fleet`
  },
  tiers: { loyal: 'Loyal', baseline: 'Baseline', friction: 'Friction', defiant: 'Defiant' },
  tierHint: { loyal: '+1 AP · secret unlocked', baseline: 'No AP effect', friction: '−1 AP friction tax', defiant: '−2 AP · open defiance' },
  secretKnown: 'Secret revealed',
  ap: {
    title: 'Action point budget',
    base: 'Base',
    infrastructure: 'Infrastructure',
    loyalty: 'Loyalty',
    friction: 'Friction tax',
    environment: 'Environment',
    upkeep: 'Module upkeep',
    grid: 'Grid shed',
    safeMode: 'Safe mode',
    mission: 'Mission',
    crisis: 'Crisis base (morale < 30 or life-support debt)'
  },
  readiness: {
    title: 'Arrival readiness',
    solsLeft: (n: number) => `${n} Sols to fleet arrival`,
    habitat: 'Habitat',
    habitatGoal: 'Lava-tube habitat sealed for the refugees (95% shielding)'
  },
  mission: {
    decision: 'Mission decision',
    briefing: 'Act briefing',
    commit: 'Commit decision',
    acknowledge: 'Continue',
    backs: (name: string) => `${name} backs this`,
    unknown: 'Long-term effects unknown',
    irreversible: 'Decisions are final. Some consequences surface dozens of Sols later.',
    sol: (sol: number) => `Sol ${sol}`,
    waiting: 'Resolve the mission decision first.',
    optionsAria: 'Decision options'
  },
  effects: {
    resource: (name: string, n: number, unit: string) => `${n > 0 ? '+' : '−'}${Math.abs(n)} ${unit} ${name}`,
    battery: (n: number) => `${n > 0 ? '+' : '−'}${Math.abs(n)} kWh`,
    morale: (n: number) => `Morale ${n > 0 ? '+' : '−'}${Math.abs(n)}`,
    trust: (code: string, n: number) => `${code} trust ${n > 0 ? '+' : '−'}${Math.abs(n)}`,
    delay: (n: number) => `+${n} Sol delay`,
    ap: (n: number) => `−${n} AP today`,
    robots: (code: string, n: number) => `−${n} ${code} robots`,
    integrity: (name: string, n: number) => `${name} ${n > 0 ? '+' : '−'}${Math.abs(n)}%`,
    mode: (name: string, mode: string) => `${name} → ${mode}`,
    route: 'Route progress',
    wheels: (n: number) => `Rover wheels −${Math.abs(n)}%`,
    flare: 'Flare shelter',
    verify: 'Route verified',
    tube: (n: number) => `Lava tube ${n > 0 ? '+' : '−'}${Math.abs(n)}%`
  },
  endings: {
    directorate: { name: 'Scientific Directorate', text: 'The Vault’s technology shapes a colony run by its scientists. Ten million arrive to a world of wonders — and of new hierarchies.' },
    fragmented: { name: 'Fragmented Colony', text: 'The Vault opened, but the colony split around it. Arrivals land into rival enclaves and contested air.' },
    regime: { name: 'Survival Regime', text: 'The signal is buried and the grid holds, but only under rationing and rule. Humanity survives — on strict terms.' },
    united: { name: 'United Human Colony', text: 'The signal was drained, the habitat sealed, the crew still together. The fleet lands into one colony.' }
  },
  debrief: { lives: 'Lives saved', ending: 'Ending', delay: 'Delay', of: 'of 10,000,000' },
  missions: missionsEn,
  secrets: secretsEn
};

/** Keeps contextual typing for message params while preserving literal keys for parity checks. */
export function colonyMessages<T extends Record<string, MsgFn>>(o: T): T {
  return o;
}

export const colonyMsgEn = (cmd: MsgFn) => colonyMessages({
  taskSolarDust: (p) => `Array dust ${p.pct}%`,
  taskRegolith: (p) => `+${p.n} kg regolith · ${p.total} kg in stock`,
  taskIce: (p) => `+${p.n} kg water to the reserve`,
  taskModule: (p) => `${moduleNamesEn[String(p.id)] ?? p.id} ${p.pct}%`,
  taskFleet: (p) => `${p.code} fleet ${p.pct}%`,
  taskTube: (p) => `Lava-tube habitat ${p.pct}%`,
  taskAntenna: (p) => `Fleet link clean · morale ${p.pct}%`,
  robotShortage: (p) => `Robot shortage · ${p.code}`,
  robotShortageDetail: (p) => `${cmd(p)} needs more free robots than the fleet has online.`,
  needRegolith: (p) => `Needs ${p.n} kg regolith`,
  taskDone: (p) => `${cmd(p)} complete`,
  taskStarted: (p) => `${cmd(p)} under way`,
  taskEta: (p) => `Robots locked · completes in ${p.n} Sols`,
  missionDecided: (p) => `${p.id} · ${missionsEn[String(p.id)]?.title ?? ''}`,
  missionChoice: (p) => `Decision: ${missionsEn[String(p.id)]?.options[String(p.opt)]?.label ?? p.opt}`,
  flareIncoming: () => 'Solar particle event',
  flareIncomingDetail: () => 'Proton storm inbound · surface crews shelter, robots wear ×3, −3 AP.',
  flareCleared: () => 'Flare subsided',
  flareClearedDetail: (p) => `Crew cumulative dose ${p.dose} mSv`,
  gridShed: (p) => `Grid shed · ${gridEn[Number(p.level)] ?? ''}`,
  gridShedDetail: (p) => `Night shortfall ${p.kwh} kWh. Load shed in order SCI → NAV → SYS → life support.`,
  lifeDebt: () => 'Life-support debt',
  lifeDebtDetail: (p) => `Oxygen, water or food ran dry · ${p.n} Sol${Number(p.n) > 1 ? 's' : ''} in debt. Three in a row ends the colony.`,
  moduleFailed: (p) => `${moduleNamesEn[String(p.id)] ?? p.id} failed`,
  moduleFailedDetail: (p) => `Integrity ${p.pct}% · offline tomorrow. Service it before it fails again.`,
  fleetOffline: (p) => `${p.code} fleet offline`,
  fleetOfflineDetail: () => 'Condition below 25%. Repair the fleet before assigning tasks.',
  robotsStranded: (p) => `${p.n} ${p.code} robots stranded`,
  robotsStrandedDetail: () => 'Worn robots caught in the field were lost for good.',
  consequenceAverted: (p) => `${p.id} · consequence averted`,
  consequenceAvertedDetail: (p) => `What you learned since defused it: “${missionsEn[String(p.id)]?.options[String(p.opt)]?.later ?? ''}”`,
  consequenceLanded: (p) => `${p.id} · ${missionsEn[String(p.id)]?.title ?? ''} — consequence`,
  consequenceDetail: (p) => missionsEn[String(p.id)]?.options[String(p.opt)]?.later ?? '',
  secretRevealed: (p) => `${leadsEn[String(p.a)] ?? p.a} confides in you`,
  secretDetail: (p) => secretsEn[String(p.a)] ?? '',
  defiance: (p) => `${leadsEn[String(p.a)] ?? p.a} acts on their own`,
  defianceDetail: () => 'Open defiance: an unsanctioned resource grab cost 30 kg of water and crew morale.',
  lossCollapse: () => 'ARES-1 collapsed after three Sols of life-support debt',
  lossMutiny: () => 'Crew morale broke · command of ARES-1 lost',
  resupply: () => 'Cargo drop from the orbital fleet',
  resupplyDetail: (p) => `+${p.food} food rations · +${p.h2} kg hydrogen · +40 kg regolith`,
  sysService: () => 'Service the worn module',
  sysServiceWhy: (p) => `${moduleNamesEn[String(p.id)] ?? p.id} is past the comfort line. Below 50% it can fail overnight.`,
  integrityTruth: (p) => `${moduleNamesEn[String(p.id)] ?? p.id} ${p.pct}%`,
  sysClean: () => 'Clean the solar array',
  sysCleanWhy: () => 'Dust is eating into generation. A clean array keeps the bank positive overnight.',
  dustTruth: (p) => `Array dust ${p.pct}%`,
  sysTube: () => 'Reinforce the lava tube',
  sysTubeWhy: () => 'The refugees need shielded habitat. Every segment raises shielding toward 95%.',
  tubeTruth: (p) => `Habitat ${p.from}% → ${p.to}%`,
  sciMineIce: () => 'Mine the ice lens',
  sciMineIceWhy: () => 'Water is the loop’s bottleneck. Electrolysis eats it faster than we recover it.',
  waterTruth: (p) => `Water reserve ${p.kg} kg`,
  sciRegolith: () => 'Harvest regolith',
  sciRegolithWhy: () => 'Repairs and construction both run on raw material. We are nearly out.',
  regolithTruth: (p) => `Regolith ${p.n} kg`,
  commMorale: () => 'Calibrate the fleet antenna',
  commMoraleWhy: () => 'The crew needs to hear the fleet. A clean link steadies morale.',
  moraleTruth: (p) => `Morale ${p.pct}%`,
  chkGrid: (p) => `Grid short ${p.kwh} kWh tonight · ${gridEn[Number(p.level)] ?? ''}`,
  chkGridOk: (p) => `Battery bank ~${p.kwh} kWh by dawn`,
  chkO2: (p) => `Oxygen reserve lasts ~${p.n} Sols at this rate`,
  chkWater: (p) => `Water reserve lasts ~${p.n} Sols at this rate`,
  chkRobots: (p) => `${p.code} fleet: ${p.need} robots needed · ${p.free} free`
});