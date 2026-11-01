import type { CommandId, EventKind, Tone } from '../types/game';

/** Event catalogue: tone and the recommended counter-move offered next Sol. Labels live in i18n. */
export const eventMeta: Record<EventKind, {tone: Tone;counter?: CommandId;}> = {
  storm: { tone: 'red', counter: 'rest' },
  stormEnd: { tone: 'green' },
  cold: { tone: 'red', counter: 'heat' },
  wear: { tone: 'red', counter: 'repair' },
  commsLoss: { tone: 'red', counter: 'uplink' },
  wind: { tone: 'amber', counter: 'navigate' },
  contamination: { tone: 'red', counter: 'prep' },
  software: { tone: 'red', counter: 'navigate' },
  badAdvice: { tone: 'amber' },
  brownout: { tone: 'red', counter: 'rest' },
  discovery: { tone: 'green', counter: 'siteSurvey' },
  favorableWindow: { tone: 'blue', counter: 'uplink' },
  technology: { tone: 'green' },
  dustLoad: { tone: 'amber', counter: 'rest' },
  milestone: { tone: 'green' },
  flare: { tone: 'red' },
  lifeSupport: { tone: 'red', counter: 'serviceModules' },
  robots: { tone: 'amber', counter: 'repairFleet' },
  consequence: { tone: 'amber' },
  secret: { tone: 'blue' },
  defiance: { tone: 'red' },
  mission: { tone: 'blue' }
};