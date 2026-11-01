function hash(x: number, z: number): number {
  const s = Math.sin(x * 127.1 + z * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

export function valueNoise(x: number, z: number): number {
  const xi = Math.floor(x);
  const zi = Math.floor(z);
  const xf = x - xi;
  const zf = z - zi;
  const u = xf * xf * (3 - 2 * xf);
  const v = zf * zf * (3 - 2 * zf);
  const a = hash(xi, zi);
  const b = hash(xi + 1, zi);
  const c = hash(xi, zi + 1);
  const d = hash(xi + 1, zi + 1);
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v;
}

function smoothstep(a: number, b: number, x: number): number {
  const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
}

const BASE_CENTER = { x: 16, z: 6 };

/** Ground height in meters at world (x, z). The base area is graded flat. North is −z. */
export function terrainHeight(x: number, z: number): number {
  let raw = 0;
  raw += (valueNoise(x * 0.028, z * 0.028) - 0.5) * 6;
  raw += (valueNoise(x * 0.09 + 13, z * 0.09 - 7) - 0.5) * 1.5;
  const fine = (valueNoise(x * 0.35 - 4, z * 0.35 + 9) - 0.5) * 0.22;
  const d = Math.hypot(x - BASE_CENTER.x, z - BASE_CENTER.z);
  const blend = smoothstep(24, 42, d);
  return raw * blend + fine;
}