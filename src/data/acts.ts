import type { ActId, CommandId } from '../types/game';

export interface ActDef {
  id: ActId;
  numeral: string;
  start: number;
  end: number;
  commandUnlocks: CommandId[];
  hazardMult: number;
  opportunityChance: number;
}

/** Canonical six-act, 500-Sol ARES 2051 campaign. */
export const acts: ActDef[] = [
{
  id: 'discovery',
  numeral: 'I',
  start: 1,
  end: 30,
  commandUnlocks: [
  'drive',
  'navigate',
  'survey',
  'selectTarget',
  'siteSurvey',
  'spectroscopy',
  'prep',
  'uplink',
  'heat',
  'repair',
  'rest',
  'cleanSolar',
  'harvestRegolith',
  'mineIce',
  'serviceModules',
  'repairFleet'],

  hazardMult: 0.75,
  opportunityChance: 0.075
},
{ id: 'foundation', numeral: 'II', start: 31, end: 90, commandUnlocks: ['drill', 'deploySolar', 'buildRelay', 'reinforceTube'], hazardMult: 0.9, opportunityChance: 0.065 },
{ id: 'silentSignal', numeral: 'III', start: 91, end: 160, commandUnlocks: ['calibrateAntenna', 'sample', 'sealSample', 'checkSample'], hazardMult: 1.05, opportunityChance: 0.06 },
{ id: 'humanFactor', numeral: 'IV', start: 161, end: 260, commandUnlocks: ['analyze', 'preparePacket'], hazardMult: 1.2, opportunityChance: 0.05 },
{ id: 'lastArrival', numeral: 'V', start: 261, end: 380, commandUnlocks: [], hazardMult: 1.3, opportunityChance: 0.045 },
{ id: 'newHumanity', numeral: 'VI', start: 381, end: 500, commandUnlocks: [], hazardMult: 1.15, opportunityChance: 0.055 }];


export function actForSol(sol: number): ActDef {
  return acts.find((a) => sol >= a.start && sol <= a.end) ?? acts[acts.length - 1];
}

export function unlockedCommands(sol: number): Set<CommandId> {
  const out = new Set<CommandId>();
  acts.filter((a) => a.start <= sol).forEach((a) => a.commandUnlocks.forEach((c) => out.add(c)));
  return out;
}

export function commandUnlockSol(command: CommandId): number {
  return acts.find((a) => a.commandUnlocks.includes(command))?.start ?? 1;
}