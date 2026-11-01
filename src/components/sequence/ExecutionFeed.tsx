import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, LoaderIcon, MinusIcon, MoonIcon, SatelliteDishIcon, XIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { advisors } from '../../data/advisors';
import { commandDefs } from '../../data/gameCommands';
import type { GamePhase, StepResult } from '../../types/game';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';

interface ExecutionFeedProps {
  phase: GamePhase;
  delayMin: number;
  uplinkLeft: number;
  uplinkDur: number;
  stepIndex: number;
  steps: StepResult[];
  paused: boolean;
}

/** Replaces the dock while the sequence is in flight. Results arrive as telemetry, in order. */
export function ExecutionFeed({ phase, delayMin, uplinkLeft, uplinkDur, stepIndex, steps, paused }: ExecutionFeedProps) {
  const { t } = useI18n();
  const transit = phase === 'uplink';
  const night = phase === 'night';
  const minsLeft = Math.ceil(uplinkLeft / Math.max(0.01, uplinkDur) * delayMin);
  return (
    <section aria-label={t.feed.aria} aria-live="polite" className="glass glass-strong w-full rounded-[22px] p-4">
      <div className="flex items-center gap-3">
        <span className={`grid h-9 w-9 place-items-center rounded-full transition-colors duration-200 ${transit ? 'bg-blue-soft text-blue' : night ? 'bg-fill-2 text-ink-2' : 'bg-amber-soft text-amber'}`}>
          <IconSwap>
            <IconSwapItem key={transit ? 'transit' : night ? 'night' : 'exec'}>
              {transit ? <SatelliteDishIcon size={16} strokeWidth={1.6} /> : night ? <MoonIcon size={16} strokeWidth={1.6} /> : <LoaderIcon size={16} strokeWidth={1.6} className={paused ? '' : 'animate-spin'} />}
            </IconSwapItem>
          </IconSwap>
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <h2 className="text-[13.5px] font-[650] text-ink">{transit ? t.feed.transit : night ? t.feed.night : t.feed.executing}</h2>
          <p className="text-[11.5px] text-ink-3">
            {transit ? t.feed.arrives(minsLeft, delayMin) : night ? t.feed.nightSub : t.feed.step(Math.max(1, stepIndex + 1), steps.length)}
            {paused && t.feed.paused}
          </p>
        </div>
      </div>
      {transit &&
      <div className="mt-3 h-1 overflow-hidden rounded-full bg-track">
          <motion.div className="h-full rounded-full bg-blue" initial={false} animate={{ width: `${(1 - uplinkLeft / Math.max(0.01, uplinkDur)) * 100}%` }} transition={{ duration: 0.1, ease: 'linear' }} />
        </div>
      }
      <ol className="scroll-quiet mt-3 flex gap-1.5 overflow-x-auto">
        {steps.map((s, i) => {
          const Icon = commandDefs[s.command].icon;
          const done = night || i < stepIndex;
          const active = !night && i === stepIndex;
          return (
            <li
              key={`${s.command}-${i}`}
              className={`flex shrink-0 items-center gap-1.5 rounded-[11px] px-2 py-1.5 text-[12px] transition-colors duration-200 ${
              active ? 'bg-amber-soft text-ink shadow-[inset_0_0_0_1px_var(--amber)]' : done ? 'bg-fill-2 text-ink-2' : 'bg-fill-1 text-ink-4'}`
              }>
              
              <Icon size={13} strokeWidth={1.7} className={active ? 'text-amber' : ''} />
              <span className="whitespace-nowrap font-[600]">{t.commands[s.command].short}</span>
              <span className="text-[10px] text-ink-4">{s.source === 'manual' ? t.common.you : advisors[s.source].code}</span>
              {done && (
              s.skipped ?
              <MinusIcon size={12} className="text-ink-4" aria-label={t.feed.skipped} /> :
              s.ok ?
              <CheckIcon size={12} strokeWidth={2.2} className="text-green" aria-label={t.feed.success} /> :

              <XIcon size={12} strokeWidth={2.2} className="text-red" aria-label={t.feed.failed} />)
              }
            </li>);

        })}
        {!steps.length && <li className="text-[12px] text-ink-4">{t.feed.idle}</li>}
      </ol>
    </section>);

}