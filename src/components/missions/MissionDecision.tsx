import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, EyeOffIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { actForSol } from '../../data/acts';
import { advisors } from '../../data/advisors';
import { advisorPortraits } from '../../data/colony';
import { missionDef } from '../../data/missions';
import type { GameState } from '../../types/game';
import { effectChips } from '../../utils/colony/effectLabels';
import { stagger } from '../../utils/motion';
import { toneText } from '../../utils/tone';
import { Modal } from '../shared/Modal';

interface MissionDecisionProps {
  open: boolean;
  game: GameState | null;
  onChoose: (optionId: string) => void;
}

/**
 * Story mission card. Shows the immediate costs of each option; delayed consequences stay
 * hidden ("Invisible Consequence") and are only flagged as unknown long-term effects.
 */
export function MissionDecision({ open, game, onChoose }: MissionDecisionProps) {
  const { t } = useI18n();
  const id = game?.colony.pendingMission ?? null;
  const def = id ? missionDef(id) : undefined;
  const text = id ? t.colony.missions[id] : undefined;
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => setSelected(def?.kind === 'briefing' ? def.options[0].id : null), [id, def]);

  const isBriefing = def?.kind === 'briefing';
  const act = game ? actForSol(def?.sol ?? game.sol) : null;

  return (
    <Modal open={open && !!def && !!text} labelledBy="mission-title" onClose={() => undefined} closeOnBackdrop={false} className="max-w-[680px]">
      {def && text && game && act &&
      <div className="p-6 md:p-8">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
            <span className="hud-label !text-amber">{isBriefing ? t.colony.mission.briefing : t.colony.mission.decision}</span>
            <span className="text-[11px] text-ink-4">
              {t.acts[act.id].name} · {isBriefing ? '' : `${def.id} · `}
              {t.colony.mission.sol(game.sol)}
            </span>
          </div>
          <h2 id="mission-title" className="mt-2 text-[26px] font-[650] leading-tight text-ink">
            {text.title}
          </h2>
          <p className="mt-3 max-w-[60ch] text-[14px] leading-relaxed text-ink-2">{text.brief}</p>

          {!isBriefing &&
        <div role="radiogroup" aria-label={t.colony.mission.optionsAria} className="mt-6 flex flex-col gap-2">
              {def.options.map((o, i) => {
            const on = selected === o.id;
            const label = text.options[o.id];
            const chips = effectChips(t, o.effect);
            return (
              <motion.button
                key={o.id}
                type="button"
                role="radio"
                aria-checked={on}
                onClick={() => setSelected(o.id)}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0, transition: { duration: 0.2, ease: [0.23, 1, 0.32, 1], delay: stagger(i) } }}
                className={`flex w-full items-start gap-3.5 rounded-[16px] p-4 text-left transition-[background-color,box-shadow] duration-150 ${
                on ? 'bg-fill-3 shadow-[inset_0_0_0_1px_var(--amber)]' : 'bg-fill-1 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-fill-2'}`
                }>
                
                    {o.backer ?
                <img src={advisorPortraits[o.backer]} alt="" className="mt-0.5 h-9 w-9 shrink-0 rounded-full object-cover" /> :

                <span className="mt-0.5 h-9 w-9 shrink-0 rounded-full bg-fill-2" aria-hidden="true" />
                }
                    <div className="min-w-0 flex-1">
                      <div className="flex items-baseline justify-between gap-3">
                        <span className="text-[14.5px] font-[650] text-ink">{label?.label}</span>
                        {o.backer && <span className="shrink-0 text-[11px] text-ink-4">{t.colony.mission.backs(advisors[o.backer].lead.split(' ').slice(-1)[0])}</span>}
                      </div>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-ink-3">{label?.detail}</p>
                      <div className="mt-2.5 flex flex-wrap gap-1.5">
                        {chips.map((c) =>
                    <span key={c.text} className={`rounded-md bg-fill-2 px-1.5 py-0.5 text-[11px] font-[600] ${c.tone === 'neutral' ? 'text-ink-2' : toneText[c.tone]}`}>
                            {c.text}
                          </span>
                    )}
                        {o.delayed &&
                    <span className="inline-flex items-center gap-1 rounded-md bg-fill-2 px-1.5 py-0.5 text-[11px] font-[600] text-ink-3">
                            <EyeOffIcon size={11} strokeWidth={1.8} aria-hidden="true" />
                            {t.colony.mission.unknown}
                          </span>
                    }
                      </div>
                    </div>
                    <span className={`mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full ${on ? 'bg-amber text-obsidian' : 'shadow-[inset_0_0_0_1.5px_var(--line-2)]'}`} aria-hidden="true">
                      {on && <CheckIcon size={12} strokeWidth={2.6} />}
                    </span>
                  </motion.button>);

          })}
            </div>
        }

          <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-5">
            <p className="max-w-[40ch] text-[11.5px] leading-relaxed text-ink-4">{isBriefing ? '' : t.colony.mission.irreversible}</p>
            <button
            type="button"
            disabled={!selected}
            onClick={() => selected && onChoose(selected)}
            className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 text-[13px] font-[700] text-obsidian transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97] disabled:cursor-not-allowed disabled:opacity-40">
            
              {isBriefing ? text.options.ack?.label ?? t.colony.mission.acknowledge : t.colony.mission.commit}
            </button>
          </div>
        </div>
      }
    </Modal>);

}