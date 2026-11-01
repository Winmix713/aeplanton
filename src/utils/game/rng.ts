/** Serializable mulberry32 RNG: the state is a single uint32 stored on the game. */
export interface Rng {
  next: () => number;
  chance: (p: number) => boolean;
  range: (a: number, b: number) => number;
  int: (a: number, b: number) => number;
  state: () => number;
}

export function makeRng(seed: number): Rng {
  let s = seed >>> 0;
  const next = () => {
    s = s + 0x6d2b79f5 >>> 0;
    let t = s;
    t = Math.imul(t ^ t >>> 15, t | 1);
    t ^= t + Math.imul(t ^ t >>> 7, t | 61);
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
  return {
    next,
    chance: (p) => next() < p,
    range: (a, b) => a + next() * (b - a),
    int: (a, b) => Math.floor(a + next() * (b - a + 1)),
    state: () => s
  };
}

export function randomSeed(): number {
  return Math.floor(Math.random() * 2 ** 31);
}