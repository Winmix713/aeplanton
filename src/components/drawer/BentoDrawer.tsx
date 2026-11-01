import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronUpIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { queuedMb } from '../../utils/game/comms';
import { farmOutput, pillarsDone } from '../../utils/game/pillars';
import { MissionData } from './MissionData';

interface BentoDrawerProps {
  open: boolean;
  onToggle: () => void;
  game: GameState;
}

const EASE_ENTER = [0.16, 1, 0.3, 1] as const;
const EASE_EXIT = [0.25, 0.46, 0.45, 0.94] as const;

/** Pull-up tray along the bottom edge of the stage. Collapsed it is a slim status strip. */
export function BentoDrawer({ open, onToggle, game }: BentoDrawerProps) {
  const { t } = useI18n();
  const d = t.drawer;
  const r = game.rover;
  return (
    <section aria-label={d.title} className="glass glass-strong absolute inset-x-0 bottom-0 z-30 hidden lg:block" style={{ borderLeft: 0, borderRight: 0, borderBottom: 0 }}>
      <motion.div
        onPanEnd={(_, info) => {
          if (info.offset.y < -24 && !open) onToggle();else
          if (info.offset.y > 24 && open) onToggle();
        }}
        className="flex h-11 touch-none select-none items-center gap-4 px-5">
        
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls="bento-drawer-body"
          className="-ml-2 flex h-8 items-center gap-2 rounded-lg px-2 text-ink transition-colors duration-150 hover:bg-fill-2">
          
          <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2, ease: EASE_ENTER }} className="grid place-items-center">
            <ChevronUpIcon size={15} strokeWidth={1.6} />
          </motion.span>
          <span className="whitespace-nowrap text-[11px] font-[600] uppercase tracking-[0.14em]">{d.title}</span>
          <kbd className="rounded-[5px] border border-line-2 px-1.5 font-sans text-[10px] font-[550] text-ink-3">B</kbd>
        </button>

        <dl className="ml-auto flex items-center gap-5 whitespace-nowrap">
          <MiniStat label={d.battery} value={`${Math.round(r.battery)}%`} tone={r.battery < 30 ? 'text-red' : 'text-ink'} />
          <MiniStat label={d.wheels} value={`${Math.round(r.wheels)}%`} tone={r.wheels < 35 ? 'text-red' : 'text-ink'} />
          <MiniStat label={d.power} value={`${farmOutput(game)} W`} />
          <MiniStat label={d.data} value={`${queuedMb(game)} MB`} tone={game.dataQueue.length ? 'text-blue' : 'text-ink'} />
          {game.storm.sols > 0 && <MiniStat label={d.storm} value={d.stormSols(game.storm.sols)} tone="text-red" />}
          <MiniStat label={d.pillars} value={`${pillarsDone(game)}/4`} className="hidden xl:flex" />
        </dl>
      </motion.div>

      <AnimatePresence initial={false}>
        {open &&
        <motion.div
          id="bento-drawer-body"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: 'auto', opacity: 1, transition: { duration: 0.26, ease: EASE_ENTER } }}
          exit={{ height: 0, opacity: 0, transition: { duration: 0.18, ease: EASE_EXIT } }}
          className="overflow-hidden">
          
            <div className="scroll-quiet max-h-[min(46dvh,460px)] overflow-y-auto px-5 pb-5 pt-1">
              <MissionData game={game} />
            </div>
          </motion.div>
        }
      </AnimatePresence>
    </section>);

}

function MiniStat({ label, value, tone = 'text-ink', className = 'flex' }: {label: string;value: string;tone?: string;className?: string;}) {
  return (
    <div className={`${className} items-baseline gap-2`}>
      <dt className="hud-label">{label}</dt>
      <dd className={`text-[12px] font-[550] ${tone}`}>{value}</dd>
    </div>);

}