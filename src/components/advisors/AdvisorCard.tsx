import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, KeyRoundIcon, LockIcon, PlusIcon, TriangleAlertIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { TRUST_LOW, advisors } from '../../data/advisors';
import { advisorPortraits } from '../../data/colony';
import { trustTier } from '../../utils/colony/ap';
import { commandDefs, sequenceAp } from '../../data/gameCommands';
import type { AdvisorId, AdvisorState, Proposal } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { enterTransition, stagger } from '../../utils/motion';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';
import { TrustMeter } from './TrustMeter';

interface AdvisorCardProps {
  id: AdvisorId;
  state: AdvisorState;
  proposals: Proposal[];
  accepted: string[];
  onAccept: (p: Proposal) => void;
  locked: boolean;
  conflict?: Msg;
  compact?: boolean;
  index?: number;
  secretKnown?: boolean;
}

export function AdvisorCard({ id, state, proposals, accepted, onAccept, locked, conflict, compact = false, index = 0, secretKnown = false }: AdvisorCardProps) {
  const { t, f } = useI18n();
  const meta = advisors[id];
  const Icon = meta.icon;
  const lowTrust = state.trust < TRUST_LOW;
  const isAccepted = proposals.some((p) => accepted.includes(p.id));
  const tier = trustTier(state.trust);

  return (
    <motion.article
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ ...enterTransition, delay: stagger(index) }}
      aria-label={t.advisor.aria(meta.code)}
      className={`glass rounded-[18px] ${compact ? 'p-3' : 'p-4'} transition-[box-shadow] duration-200 ${isAccepted ? 'shadow-[inset_0_0_0_1px_var(--amber)]' : ''}`}>
      
      <header className="flex items-center gap-2.5">
        <span className="relative shrink-0">
          <img src={advisorPortraits[id]} alt={meta.lead} className={`${compact ? 'h-8 w-8' : 'h-10 w-10'} rounded-full object-cover`} />
          <span className="absolute -bottom-0.5 -right-0.5 grid h-4 w-4 place-items-center rounded-full bg-obsidian text-ink-2" aria-hidden="true">
            <Icon size={9} strokeWidth={2} />
          </span>
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="flex items-baseline gap-2">
            <span className="text-[13px] font-[650] tracking-[0.06em] text-ink">{meta.code}</span>
            <span className="truncate text-[11.5px] text-ink-4">{compact ? meta.lead : t.advisors[id].name}</span>
          </div>
          {!compact &&
          <div className="flex items-center gap-1.5 truncate text-[11px] text-ink-4">
              {meta.lead}
              {secretKnown &&
            <span className="inline-flex items-center gap-0.5 text-blue" title={t.colony.secretKnown}>
                  <KeyRoundIcon size={10} strokeWidth={2} aria-label={t.colony.secretKnown} />
                </span>
            }
            </div>
          }
        </div>
        <TrustMeter trust={state.trust} compact={compact} />
      </header>
      {!compact && (tier === 'friction' || tier === 'defiant') &&
      <p className="mt-2.5 flex items-center gap-1.5 rounded-lg bg-fill-2 px-2.5 py-1 text-[11px] font-[600] text-red">
          <LockIcon size={11} strokeWidth={2} aria-hidden="true" />
          {t.colony.tierHint[tier]}
        </p>
      }

      <div className={`${compact ? 'mt-2.5 space-y-2' : 'mt-3.5 space-y-3'}`}>
        {proposals.map((p) => {
          const on = accepted.includes(p.id);
          return (
            <div key={p.id} className={p.alternative ? 'border-t border-line pt-3' : ''}>
              {p.alternative && <div className="mb-1 text-[10.5px] font-[600] text-green">{t.advisor.alternative}</div>}
              <h3 className={`${compact ? 'text-[12.5px]' : 'text-[13.5px]'} font-[600] leading-snug text-ink`}>{f(p.title)}</h3>
              {!compact && <p className="mt-1 text-[12px] leading-relaxed text-ink-3">{f(p.rationale)}</p>}
              <div className="mt-2 flex flex-wrap items-center gap-1.5">
                {p.commands.map((c, i) => {
                  const C = commandDefs[c].icon;
                  return (
                    <span key={`${c}-${i}`} className="inline-flex items-center gap-1 rounded-md bg-fill-2 px-1.5 py-0.5 text-[11px] font-[550] text-ink-2">
                      <C size={11} strokeWidth={1.6} />
                      {t.commands[c].short}
                    </span>);

                })}
                {p.pillar && <span className="text-[11px] text-ink-4">→ {t.pillars[p.pillar].name}</span>}
              </div>
              <div className="mt-2 flex items-center justify-between gap-2">
                <p className={`min-w-0 text-[11.5px] ${lowTrust ? 'text-amber' : 'text-ink-3'}`}>
                  {lowTrust && <TriangleAlertIcon size={11} strokeWidth={1.8} className="mr-1 inline -translate-y-px" aria-label={t.advisor.lowConfidence} />}
                  {t.advisor.est} {f(p.estimate)}
                </p>
                <button
                  type="button"
                  disabled={locked}
                  onClick={() => onAccept(p)}
                  aria-pressed={on}
                  className={`inline-flex h-8 shrink-0 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[11.5px] font-[600] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-40 ${
                  on ? 'bg-amber text-obsidian hover:brightness-110' : 'border border-line-2 text-ink hover:border-amber hover:text-amber'}`
                  }>
                  
                  <IconSwap>
                    <IconSwapItem key={on ? 'on' : 'off'}>{on ? <CheckIcon size={12} strokeWidth={2.2} /> : <PlusIcon size={12} strokeWidth={2} />}</IconSwapItem>
                  </IconSwap>
                  {on ? t.advisor.accepted : t.advisor.accept(sequenceAp(p.commands))}
                </button>
              </div>
            </div>);

        })}
      </div>

      {conflict &&
      <p className="mt-3 flex items-start gap-1.5 rounded-lg bg-amber-soft px-2.5 py-1.5 text-[11.5px] leading-snug text-amber-ink">
          <TriangleAlertIcon size={12} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber" />
          {f(conflict)}
        </p>
      }
      {state.ignoredStreak >= 2 && !compact && <p className="mt-2 text-[11px] text-ink-4">{t.advisor.ignored(state.ignoredStreak)}</p>}
    </motion.article>);

}