import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { actForSol } from '../../data/acts';
import type { GameState } from '../../types/game';

export function ActHud({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const act = actForSol(game.sol);
  const fraction = (game.sol - act.start + 1) / (act.end - act.start + 1);
  return (
    <div className="glass flex min-w-[180px] items-center gap-3 rounded-full px-3.5 py-2" title={t.acts[act.id].description}>
      <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-amber-soft text-[11px] font-[700] text-amber">{act.numeral}</span>
      <div className="min-w-0 flex-1 leading-tight">
        <div className="truncate text-[11.5px] font-[650] text-ink">{t.acts[act.id].name}</div>
        <div className="mt-1 h-[3px] overflow-hidden rounded-full bg-track">
          <span className="block h-full rounded-full bg-amber" style={{ width: `${Math.min(100, fraction * 100)}%` }} />
        </div>
      </div>
    </div>);

}