import React from 'react';
import { motion } from 'framer-motion';
import type { Tone } from '../../types/game';
import { toneBg, toneText } from '../../utils/tone';

interface MeterProps {
  label: string;
  value: string;
  /** 0–1 fill. */
  fraction: number;
  tone?: Tone;
  /** Optional target marker 0–1. */
  marker?: number;
}

export function Meter({ label, value, fraction, tone = 'neutral', marker }: MeterProps) {
  const pct = Math.round(Math.min(1, Math.max(0, fraction)) * 100);
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12px] text-ink-3">{label}</span>
        <span className={`text-[12px] font-[600] ${tone === 'neutral' ? 'text-ink' : toneText[tone]}`}>{value}</span>
      </div>
      <div className="relative mt-1.5 h-1 rounded-full bg-track" role="meter" aria-label={label} aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
        <motion.span
          className={`absolute inset-y-0 left-0 rounded-full ${tone === 'neutral' ? 'bg-ink-2' : toneBg[tone]}`}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }} />
        
        {marker !== undefined && <span className="absolute -top-1 h-3 w-px bg-ink" style={{ left: `${marker * 100}%` }} aria-hidden="true" />}
      </div>
    </div>);

}