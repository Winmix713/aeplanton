import type { DifficultyId, Inventory } from '../types/game';

export interface DifficultyDef {
  id: DifficultyId;
  name: string;
  blurb: string;
  ap: number;
  delay: [number, number];
  faultMult: number;
  stormChance: number;
  undo: boolean;
  inventory: Inventory;
}

export const difficulties: DifficultyDef[] = [
{
  id: 'explorer',
  name: 'Explorer',
  blurb: 'Shorter delay, rarer faults, extra spares. Undo last Sol.',
  ap: 11,
  delay: [4, 12],
  faultMult: 0.6,
  stormChance: 0.025,
  undo: true,
  inventory: { drillBits: 4, tubes: 5, spares: 6, solarKits: 7, relayKits: 4 }
},
{
  id: 'engineer',
  name: 'Engineer',
  blurb: 'The core experience. Balanced risk. Undo available.',
  ap: 10,
  delay: [4, 20],
  faultMult: 1,
  stormChance: 0.04,
  undo: true,
  inventory: { drillBits: 3, tubes: 4, spares: 4, solarKits: 6, relayKits: 3 }
},
{
  id: 'director',
  name: 'Mission Director',
  blurb: 'Long delay, frequent storms, tight resources. No undo.',
  ap: 9,
  delay: [8, 24],
  faultMult: 1.4,
  stormChance: 0.065,
  undo: false,
  inventory: { drillBits: 2, tubes: 3, spares: 2, solarKits: 6, relayKits: 3 }
}];


export function difficultyDef(id: DifficultyId): DifficultyDef {
  return difficulties.find((d) => d.id === id) ?? difficulties[1];
}