import React from 'react';
import { UsersIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { formatLives, livesSaved } from '../../utils/colony/meci';

/** MECI countdown: lives the colony can still receive at the current delay. */
export function MeciChip({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const lives = livesSaved(game);
  const delay = game.colony.delaySols;
  const tone = delay === 0 ? 'text-green' : delay < 6 ? 'text-amber' : 'text-red';
  return (
    <div className="glass flex h-10 items-center gap-2.5 rounded-full pl-3 pr-4" title={t.colony.meci.title}>
      <UsersIcon size={14} strokeWidth={1.7} className={tone} aria-hidden="true" />
      <div className="leading-tight">
        <span className="hud-label">{t.colony.meci.label}</span>
        <div className="flex items-baseline gap-1.5 whitespace-nowrap">
          <span className="text-[13.5px] font-[650] text-ink">{t.colony.meci.lives(formatLives(lives))}</span>
          <span className={`text-[11px] font-[600] ${tone}`}>{t.colony.meci.delay(delay)}</span>
        </div>
      </div>
    </div>);

}