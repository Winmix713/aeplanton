import type { Tone } from '../types/game';

export const toneText: Record<Tone, string> = {
  amber: 'text-amber',
  green: 'text-green',
  blue: 'text-blue',
  red: 'text-red',
  neutral: 'text-ink-3'
};

export const toneBg: Record<Tone, string> = {
  amber: 'bg-amber',
  green: 'bg-green',
  blue: 'bg-blue',
  red: 'bg-red',
  neutral: 'bg-ink-4'
};

/** Matches the four ARES 2051 trust tiers: loyal ≥81, baseline 36–80, friction 15–35, defiant <15. */
export function trustTone(trust: number): Tone {
  if (trust >= 81) return 'green';
  if (trust < 15) return 'red';
  if (trust < 36) return 'amber';
  return 'neutral';
}

export function healthTone(v: number): Tone {
  if (v < 30) return 'red';
  if (v < 55) return 'amber';
  return 'green';
}

export function formatLmst(hours: number): string {
  const h = (hours % 24 + 24) % 24;
  const hh = Math.floor(h);
  const mm = Math.floor((h - hh) * 60);
  return `${String(hh).padStart(2, '0')}:${String(mm).padStart(2, '0')}`;
}