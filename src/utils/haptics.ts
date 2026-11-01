export type HapticType = 'light' | 'medium' | 'success' | 'error';

const PATTERNS: Record<HapticType, number | number[]> = {
  light: 8,
  medium: 16,
  success: [10, 40, 10],
  error: [30, 40, 30]
};

let enabled = true;

/** User setting; independent of prefers-reduced-motion. */
export function setHapticsEnabled(on: boolean): void {
  enabled = on;
}

/** Web vibration where supported; silently no-ops elsewhere or when disabled. */
export function haptic(type: HapticType = 'light'): void {
  if (!enabled) return;
  try {
    if (typeof navigator !== 'undefined' && typeof navigator.vibrate === 'function') navigator.vibrate(PATTERNS[type]);
  } catch {

    /* unsupported */}
}