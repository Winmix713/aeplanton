import type { RegionId } from '../types/game';

export interface RegionDef {
  id: RegionId;
  name: string;
  blurb: string;
  coords: string;
  driveFactor: number;
  wearMult: number;
  stormMult: number;
  nightTemp: number;
  coldChance: number;
  /** Multiplier on orbiter relay passes. */
  relayMult: number;
  scene: {
    ground: string;
    rocks: string[];
    rockCount: number;
    mountain: string;
    mountainScale: number;
    sky: string;
    stormSky: string;
  };
}

export const regions: RegionDef[] = [
{
  id: 'chryse',
  name: 'Chryse Planitia',
  blurb: 'Landing Zone Alpha. ARES-1 base, lava tubes and the Delta Ridge outflow.',
  coords: '22.27°N · 47.95°W',
  driveFactor: 1.05,
  wearMult: 0.95,
  stormMult: 1.1,
  nightTemp: -70,
  coldChance: 0.09,
  relayMult: 1,
  scene: {
    ground: '#bf8662',
    rocks: ['#87563d', '#734a35', '#946348', '#663f2e'],
    rockCount: 150,
    mountain: '#9a6b52',
    mountainScale: 0.9,
    sky: '#a07357',
    stormSky: '#6a4e3f'
  }
},
{
  id: 'jezero',
  name: 'Jezero Crater',
  blurb: 'Sedimentary delta. The baseline road to Delta Ridge.',
  coords: '18.44°N · 77.45°E',
  driveFactor: 1,
  wearMult: 1,
  stormMult: 1,
  nightTemp: -68,
  coldChance: 0.08,
  relayMult: 1,
  scene: {
    ground: '#c99069',
    rocks: ['#8d5d42', '#7b513a', '#9b6a4c', '#6f4733'],
    rockCount: 170,
    mountain: '#a2735a',
    mountainScale: 1,
    sky: '#a5785a',
    stormSky: '#6f5242'
  }
},
{
  id: 'sirenum',
  name: 'Terra Sirenum',
  blurb: 'Steep, broken highlands. Harder routes, more wheel wear.',
  coords: '39.70°S · 150.00°W',
  driveFactor: 0.8,
  wearMult: 1.5,
  stormMult: 0.9,
  nightTemp: -74,
  coldChance: 0.1,
  relayMult: 1,
  scene: {
    ground: '#b07656',
    rocks: ['#6e4632', '#5d3b2b', '#7f5440', '#4f3426'],
    rockCount: 300,
    mountain: '#8a5f49',
    mountainScale: 1.6,
    sky: '#9c6f55',
    stormSky: '#62483a'
  }
},
{
  id: 'hellas',
  name: 'Hellas Basin',
  blurb: 'Deep basin. Colder nights, more dust, shifted relay passes.',
  coords: '42.40°S · 70.50°E',
  driveFactor: 1.05,
  wearMult: 0.9,
  stormMult: 1.6,
  nightTemp: -82,
  coldChance: 0.16,
  relayMult: 0.7,
  scene: {
    ground: '#d3a07a',
    rocks: ['#9a6c50', '#8a5e44', '#a87a5c', '#7a5038'],
    rockCount: 110,
    mountain: '#b48467',
    mountainScale: 1.25,
    sky: '#b38665',
    stormSky: '#7a5a47'
  }
}];


export function regionDef(id: RegionId): RegionDef {
  return regions.find((r) => r.id === id) ?? regions[0];
}