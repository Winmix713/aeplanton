import type { WeatherState } from '../../types/mission';

export const STORM_WARNING_S = 20;
const RAMP_S = 8;

export type WeatherChange = 'warning' | 'storm' | 'cleared' | null;

function between(a: number, b: number): number {
  return a + Math.random() * (b - a);
}

export function createWeather(): WeatherState {
  // First front arrives early so new operators meet it during the traverse.
  return { phase: 'clear', timer: 150, duration: 150, intensity: 0 };
}

/** clear (3–4 min) → warning (20 s) → storm (40–60 s, ramped) → clear. */
export function stepWeather(prev: WeatherState, dt: number): {next: WeatherState;change: WeatherChange;} {
  let { phase, timer, duration } = prev;
  timer -= dt;
  let change: WeatherChange = null;
  if (timer <= 0) {
    if (phase === 'clear') {
      phase = 'warning';
      duration = STORM_WARNING_S;
      change = 'warning';
    } else if (phase === 'warning') {
      phase = 'storm';
      duration = between(40, 60);
      change = 'storm';
    } else {
      phase = 'clear';
      duration = between(180, 240);
      change = 'cleared';
    }
    timer = duration;
  }
  const into = duration - timer;
  const intensity = phase === 'storm' ? Math.max(0, Math.min(1, into / RAMP_S, timer / RAMP_S)) : 0;
  return { next: { phase, timer, duration, intensity }, change };
}

export function weatherLabel(w: WeatherState): string {
  if (w.phase === 'storm') return `Dust storm · ${Math.ceil(w.timer)} s`;
  if (w.phase === 'warning') return `Dust front inbound · ${Math.ceil(w.timer)} s`;
  return 'Clear';
}