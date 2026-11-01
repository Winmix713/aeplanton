import type { LanderPhase } from '../types/mission';
import type { RoverStatus } from '../types/rover';

export type Tone = 'amber' | 'green' | 'blue' | 'plain';

export interface StatusMeta {
  label: string;
  tone: Tone;
  live: boolean;
}

const ROVER: Record<RoverStatus, StatusMeta> = {
  docked: { label: 'Docked', tone: 'green', live: false },
  navigating: { label: 'Navigating', tone: 'amber', live: true },
  returning: { label: 'Returning', tone: 'amber', live: true },
  holding: { label: 'Holding', tone: 'plain', live: false },
  'on-target': { label: 'On target', tone: 'green', live: false },
  scanning: { label: 'Scanning', tone: 'blue', live: true },
  collecting: { label: 'Coring', tone: 'blue', live: true },
  transferring: { label: 'Transferring', tone: 'blue', live: true }
};

const LANDER: Record<LanderPhase, StatusMeta> = {
  standby: { label: 'Standby', tone: 'green', live: false },
  checking: { label: 'Systems check', tone: 'blue', live: true },
  checked: { label: 'Checked', tone: 'green', live: false },
  hotfire: { label: 'Hot-fire', tone: 'amber', live: true },
  ready: { label: 'Ready', tone: 'green', live: false },
  countdown: { label: 'Countdown', tone: 'amber', live: true },
  ascent: { label: 'Ascent', tone: 'amber', live: true },
  departed: { label: 'Departed', tone: 'plain', live: false }
};

export function roverStatus(s: RoverStatus): StatusMeta {
  return ROVER[s];
}

export function landerStatus(p: LanderPhase): StatusMeta {
  return LANDER[p];
}

export const toneText: Record<Tone, string> = {
  amber: 'text-amber',
  green: 'text-green',
  blue: 'text-blue',
  plain: 'text-ink-3'
};

export const toneChip: Record<Tone, string> = {
  amber: 'text-amber bg-amber-soft border-[rgba(245,168,87,0.32)]',
  green: 'text-green bg-green-soft border-[rgba(146,220,174,0.3)]',
  blue: 'text-blue bg-blue-soft border-[rgba(156,194,240,0.3)]',
  plain: 'text-ink-3 bg-fill-1 border-line-2'
};