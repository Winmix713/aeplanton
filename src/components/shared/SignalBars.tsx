import React from 'react';

interface SignalBarsProps {
  /** Active bars, 0–5. */
  bars: number;
  label: string;
}

const HEIGHTS = [4, 6, 8, 10, 12];

export function SignalBars({ bars, label }: SignalBarsProps) {
  return (
    <span role="img" aria-label={label} title={label} className="flex h-3 items-end gap-[2px]">
      {HEIGHTS.map((h, i) =>
      <span
        key={h}
        className={`w-[3px] rounded-[1px] transition-colors duration-200 ${i < bars ? 'bg-blue' : 'bg-ink-5'}`}
        style={{ height: h }} />

      )}
    </span>);

}