import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { PlayIcon, PlusIcon, TrophyIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { SlotSummary } from '../../types/game';
import { enterTransition } from '../../utils/motion';
import { listSlots } from '../../utils/storage';
import { LanguageSwitch } from '../layout/LanguageSwitch';

interface TitleScreenProps {
  onContinue: (slot: number) => void;
  onNew: () => void;
  onLeaderboard: () => void;
}

export function TitleScreen({ onContinue, onNew, onLeaderboard }: TitleScreenProps) {
  const { t } = useI18n();
  const slots = useMemo(listSlots, []);
  const resumable = slots.filter((s): s is SlotSummary => !!s && !s.ended).sort((a, b) => b.savedAt - a.savedAt);
  const latest = resumable[0];

  return (
    <motion.section aria-labelledby="title-heading" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={enterTransition} className="w-full max-w-[1120px]">
      <div className="grid items-end gap-8 lg:grid-cols-[1.2fr_1fr]">
        <div className="stage-text">
          <p className="text-[12px] uppercase tracking-[0.3em] text-amber-ink">{t.titleScreen.program}</p>
          <h1 id="title-heading" className="mt-3 text-[clamp(3rem,7vw,5.5rem)] font-[300] leading-[0.95] tracking-[0.18em] text-ink">
            ARES
          </h1>
          <p className="mt-2 text-[clamp(0.95rem,1.4vw,1.15rem)] uppercase tracking-[0.42em] text-ink-2">{t.topBar.opsCommand}</p>
          <p className="mt-6 max-w-[520px] text-[14.5px] leading-relaxed text-ink-2">{t.titleScreen.intro}</p>
        </div>

        <div className="glass glass-strong rounded-[24px] p-5 md:p-6">
          <div className="flex flex-col gap-2.5">
            {latest &&
            <button
              type="button"
              onClick={() => onContinue(latest.slot)}
              className="flex h-14 items-center gap-3 rounded-[16px] bg-amber px-5 text-left text-obsidian transition-[filter] duration-150 hover:brightness-110">
              
                <PlayIcon size={18} strokeWidth={2} />
                <span className="min-w-0 leading-tight">
                  <span className="block text-[14px] font-[700]">{t.titleScreen.continue}</span>
                  <span className="block truncate text-[11.5px] opacity-80">
                    {t.titleScreen.slotSol(latest.slot + 1, latest.sol)} · {t.difficulty[latest.difficulty].name} · {t.regions[latest.region].name}
                  </span>
                </span>
              </button>
            }
            <button
              type="button"
              onClick={onNew}
              className={`flex h-12 items-center gap-3 rounded-[16px] px-5 text-[14px] font-[650] transition-[filter,background-color] duration-150 ${
              latest ? 'bg-fill-2 text-ink hover:bg-fill-3' : 'h-14 bg-amber text-obsidian hover:brightness-110'}`
              }>
              
              <PlusIcon size={17} strokeWidth={2} />
              {t.titleScreen.newMission}
            </button>
            <button
              type="button"
              onClick={onLeaderboard}
              className="flex h-12 items-center gap-3 rounded-[16px] px-5 text-[14px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              
              <TrophyIcon size={16} strokeWidth={1.7} />
              {t.titleScreen.leaderboard}
            </button>
          </div>

          {resumable.length > 1 &&
          <div className="mt-4 border-t border-line pt-3">
              <h2 className="hud-label">{t.titleScreen.others}</h2>
              <ul className="mt-2 space-y-1">
                {resumable.slice(1).map((s) =>
              <li key={s.slot}>
                    <button
                  type="button"
                  onClick={() => onContinue(s.slot)}
                  className="flex w-full items-center justify-between gap-3 rounded-lg px-2 py-1.5 text-[12.5px] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
                  
                      <span>{t.titleScreen.slotSol(s.slot + 1, s.sol)}</span>
                      <span className="text-ink-4">
                        {t.difficulty[s.difficulty].name} · {s.pillarsDone}/4
                      </span>
                    </button>
                  </li>
              )}
              </ul>
            </div>
          }
          <div className="mt-4 flex items-center justify-between gap-3 border-t border-line pt-3">
            <p className="text-[11px] text-ink-4">{t.titleScreen.footer}</p>
            <LanguageSwitch />
          </div>
        </div>
      </div>
    </motion.section>);

}