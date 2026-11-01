import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { difficultyDef } from '../../data/difficulty';
import type { GameState, Inventory } from '../../types/game';

const ROWS: (keyof Inventory)[] = ['drillBits', 'tubes', 'spares', 'solarKits', 'relayKits'];

export function InventoryList({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const start = difficultyDef(game.difficulty).inventory;
  return (
    <ul className="divide-y divide-line">
      {ROWS.map((id) => {
        const v = game.inventory[id];
        const max = start[id];
        return (
          <li key={id} className="flex items-center justify-between gap-3 py-2 text-[12.5px]">
            <span className="truncate text-ink-3">{t.inventory[id]}</span>
            <span className="flex items-center gap-2">
              <span className="flex gap-0.5" aria-hidden="true">
                {Array.from({ length: max }, (_, i) =>
                <span key={i} className={`h-2 w-1.5 rounded-[1px] ${i < v ? v <= 1 ? 'bg-red' : 'bg-ink-2' : 'bg-ink-5'}`} />
                )}
              </span>
              <span className={`w-9 text-right font-[600] ${v === 0 ? 'text-red' : 'text-ink'}`}>
                {v}/{max}
              </span>
            </span>
          </li>);

      })}
    </ul>);

}