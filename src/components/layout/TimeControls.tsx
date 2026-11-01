import React from 'react';
import { motion } from 'framer-motion';
import { PauseIcon, PlayIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { TimeSpeed } from '../../types/game';
import { menuEnterTransition } from '../../utils/motion';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';

interface TimeControlsProps {
  paused: boolean;
  onTogglePause: () => void;
  speed: TimeSpeed;
  onSpeed: (s: TimeSpeed) => void;
  /** Speed-up is locked while a sequence executes. */
  speedLocked: boolean;
  disabled: boolean;
}

const SPEEDS: TimeSpeed[] = [1, 5, 20];

export function TimeControls({ paused, onTogglePause, speed, onSpeed, speedLocked, disabled }: TimeControlsProps) {
  const { t } = useI18n();
  return (
    <div className="glass flex items-center gap-1 rounded-full p-1" role="group" aria-label={t.time.aria}>
      <button
        type="button"
        onClick={onTogglePause}
        disabled={disabled}
        aria-label={paused ? t.time.resume : t.time.pause}
        aria-pressed={paused}
        className={`grid h-8 w-8 place-items-center rounded-full transition-colors duration-150 disabled:opacity-40 ${paused ? 'bg-amber text-obsidian' : 'text-ink-2 hover:bg-fill-2 hover:text-ink'}`}>
        
        <IconSwap>
          <IconSwapItem key={paused ? 'play' : 'pause'}>{paused ? <PlayIcon size={14} strokeWidth={2} /> : <PauseIcon size={14} strokeWidth={2} />}</IconSwapItem>
        </IconSwap>
      </button>
      {SPEEDS.map((s) => {
        const on = speed === s;
        const locked = speedLocked && s !== 1 || disabled;
        return (
          <button
            key={s}
            type="button"
            onClick={() => onSpeed(s)}
            disabled={locked}
            aria-pressed={on}
            title={speedLocked && s !== 1 ? t.time.locked : t.time.playback(s)}
            className={`relative h-8 min-w-[36px] rounded-full px-2 text-[11.5px] font-[650] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-35 ${on ? 'text-ink' : 'text-ink-3 hover:text-ink'}`}>
            
            {on && <motion.span layoutId="speed-glide" className="absolute inset-0 rounded-full bg-fill-3 shadow-[inset_0_0_0_1px_var(--line-2)]" transition={menuEnterTransition} />}
            <span className="relative">{s}×</span>
          </button>);

      })}
    </div>);

}