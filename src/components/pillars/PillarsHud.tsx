import React from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, MountainIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { DEADLINE_SOL, pillarOrder, pillars } from '../../data/pillars';
import type { GameState } from '../../types/game';
import { pillarComplete, pillarProgress, pillarSteps } from '../../utils/game/pillars';
import { enterTransition } from '../../utils/motion';

interface Item {
  key: string;
  name: string;
  goal: string;
  icon: typeof MountainIcon;
  done: boolean;
  pct: number;
  next: string;
}

/** Arrival readiness: the four infrastructure milestones plus the lava-tube habitat the fleet needs. */
export function PillarsHud({ game, layout = 'row' }: {game: GameState;layout?: 'row' | 'grid';}) {
  const { t } = useI18n();
  const left = DEADLINE_SOL - game.sol;
  const items: Item[] = [
  ...pillarOrder.map((id) => {
    const next = pillarSteps(game, id).find((s) => !s.done);
    return {
      key: id,
      name: t.pillars[id].name,
      goal: t.pillars[id].goal,
      icon: pillars[id].icon,
      done: pillarComplete(game, id),
      pct: Math.round(pillarProgress(game, id) * 100),
      next: next ? `${t.pillarSteps[next.label]}${next.value ? ` · ${next.value}` : ''}` : ''
    };
  }),
  {
    key: 'habitat',
    name: t.colony.readiness.habitat,
    goal: t.colony.readiness.habitatGoal,
    icon: MountainIcon,
    done: game.colony.lavaTube >= 100,
    pct: Math.round(game.colony.lavaTube),
    next: t.colony.panel.lavaTube
  }];

  return (
    <section aria-label={t.pillarsHud.aria} className={`glass rounded-[18px] p-1.5 ${layout === 'row' ? 'flex items-stretch gap-1' : 'grid grid-cols-2 gap-1'}`}>
      <div className={`flex-col justify-center px-3 leading-tight ${layout === 'row' ? 'hidden 2xl:flex' : 'col-span-2 flex py-1'}`}>
        <span className="hud-label">{t.pillarsHud.title}</span>
        <span className={`mt-1 whitespace-nowrap text-[12px] font-[600] ${left < 60 ? 'text-red' : 'text-ink'}`}>{t.pillarsHud.solsLeft(left)}</span>
      </div>
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <div key={item.key} className="group relative flex min-w-[92px] flex-1 items-center gap-2.5 rounded-[13px] px-2.5 py-2" title={item.goal}>
            <span className={`grid h-7 w-7 shrink-0 place-items-center rounded-full ${item.done ? 'bg-green-soft text-green' : 'bg-fill-2 text-ink-2'}`}>
              {item.done ? <CheckIcon size={14} strokeWidth={2} /> : <Icon size={14} strokeWidth={1.6} />}
            </span>
            <div className="min-w-0 flex-1 leading-tight">
              <div className="flex items-baseline justify-between gap-2">
                <span className="truncate text-[12px] font-[600] text-ink">{item.name}</span>
                <span className={`text-[11px] font-[600] ${item.done ? 'text-green' : 'text-ink-3'}`}>{item.pct}%</span>
              </div>
              <span className="relative mt-1.5 block h-[3px] overflow-hidden rounded-full bg-track">
                <motion.span
                  className={`absolute inset-y-0 left-0 rounded-full ${item.done ? 'bg-green' : 'bg-amber'}`}
                  initial={false}
                  animate={{ width: `${item.pct}%` }}
                  transition={enterTransition} />
                
              </span>
              <span className="mt-1 block truncate text-[10.5px] text-ink-4">{item.done ? t.pillarsHud.certified : item.next}</span>
            </div>
          </div>);

      })}
    </section>);

}