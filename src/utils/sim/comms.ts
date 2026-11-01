import type { CommsState } from '../../types/mission';

export const LINK_OPEN_S = 90;
export const LINK_CLOSED_S = 45;
/** Signal below this is a no-go for launch and raises an antenna fault. */
export const WEAK_SIGNAL = 0.5;

export type CommsChange = 'opened' | 'closed' | null;

export function createComms(enabled: boolean): CommsState {
  return { enabled, open: true, remaining: enabled ? 60 : 0, strength: 0.82, calibration: 1 };
}

/**
 * Alternates open/closed link windows. Signal rises and falls across each pass and is scaled
 * by antenna calibration and storm intensity; storms also burn open windows faster.
 */
export function stepComms(prev: CommsState, dt: number, storm: number): {next: CommsState;change: CommsChange;} {
  const calibration = Math.max(0.2, prev.calibration - dt * (0.0025 + 0.006 * storm));
  const quality = (0.4 + 0.6 * calibration) * (1 - 0.45 * storm);
  if (!prev.enabled) {
    return { next: { ...prev, open: true, remaining: 0, calibration, strength: 0.86 * quality }, change: null };
  }
  let open = prev.open;
  let remaining = prev.remaining - dt * (open ? 1 + 0.6 * storm : 1);
  let change: CommsChange = null;
  if (remaining <= 0) {
    open = !open;
    remaining += open ? LINK_OPEN_S : LINK_CLOSED_S;
    change = open ? 'opened' : 'closed';
  }
  const pass = Math.min(1, Math.max(0, 1 - remaining / LINK_OPEN_S));
  const strength = open ? (0.3 + 0.65 * Math.sin(Math.PI * pass)) * quality + 0.12 * (1 - storm) : 0;
  return { next: { ...prev, open, remaining, calibration, strength: Math.min(1, strength) }, change };
}

/** 0–5 signal bars for the link indicator. */
export function signalBars(c: CommsState): number {
  return c.open ? Math.max(1, Math.ceil(c.strength * 5)) : 0;
}