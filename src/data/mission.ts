export const mission = {
  code: 'IX-7',
  site: 'Hesper Basin',
  siteName: 'Hesper Basin Site 2',
  sol: 48,
  coords: '22.61°S · 312.08°E',
  sector: 'Delta Ridge',
  sectorType: 'Layered sediments · C-012',
  route: 'Route 04-A',
  summary:
  'IX-7 HERMES is on the pad with ATLAS-01 at the service dock. Today’s plan: verify the lander, hot-fire the engines, and return a core from the layered outcrop in Sector 04.'
};

export const rover = {
  name: 'ARES-1',
  kind: 'Rover',
  description: 'Six-wheel science rover · Autonomous nav'
};

export const lander = {
  name: 'IX-7',
  kind: 'Hermes',
  description: 'Crew ascent vehicle · Methalox · 3 engines'
};

/** Fixed site positions in world meters. North is −z. */
export const sitePositions = {
  lander: { x: 0, z: 0 },
  dock: { x: 11, z: 4 },
  habitat: { x: 23, z: 6 },
  depot: { x: 18, z: 12 },
  tower: { x: 34, z: -3 },
  solar: { x: 36, z: 19 },
  sector: { x: 27, z: -37 },
  explorerCenter: { x: -26, z: -14 }
};

/** ATLAS-01 traverse from the service dock to the Sector 04 approach point. */
export const routeWaypoints: [number, number][] = [
[11, 4],
[12, -6],
[17, -16],
[21, -24],
[24, -31]];


/** CARGO-03 closed loop; the first point is the depot. */
export const cargoLoop: [number, number][] = [
[18, 12],
[26, 14],
[30, 8],
[27, 0],
[18, 1],
[14, 8]];


export const sectorPosition = sitePositions.sector;