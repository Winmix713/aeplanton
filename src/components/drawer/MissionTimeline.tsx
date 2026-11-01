import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { acts } from '../../data/acts';
import { DEADLINE_SOL } from '../../data/pillars';
import type { GameState } from '../../types/game';

/** Sol 1 → 500 with milestones and storms marked. */
export function MissionTimeline({ game }: {game: GameState;}) {
  const { t, f } = useI18n();
  const milestones = game.events.filter((e) => e.kind === 'milestone' && e.sol > 1);
  const storms = game.events.filter((e) => e.kind === 'storm');
  const pct = (sol: number) => `${Math.min(100, sol / DEADLINE_SOL * 100)}%`;
  return (
    <div>
      <div className="relative h-8">
        <span className="absolute inset-x-0 top-1/2 h-px -translate-y-1/2 bg-line-2" />
        {acts.slice(1).map((act) =>
        <span key={act.id} className="absolute top-1/2 h-5 w-px -translate-y-1/2 bg-line-2" style={{ left: pct(act.start) }} title={`${t.acts[act.id].name} · ${t.common.sol} ${act.start}`} />
        )}
        <span className="absolute left-0 top-1/2 h-[3px] -translate-y-1/2 rounded-full bg-amber" style={{ width: pct(game.sol) }} />
        {storms.map((s) =>
        <span key={s.id} className="absolute top-1/2 h-3 w-1 -translate-y-1/2 rounded-sm bg-red" style={{ left: pct(s.sol) }} title={`${t.common.sol} ${s.sol} · ${f(s.title)}`} />
        )}
        {milestones.map((m) =>
        <span
          key={m.id}
          className="absolute top-1/2 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-obsidian bg-green"
          style={{ left: pct(m.sol) }}
          title={`${t.common.sol} ${m.sol} · ${f(m.title)}`} />

        )}
        <span className="absolute top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-amber bg-obsidian" style={{ left: pct(game.sol) }} aria-hidden="true" />
      </div>
      <div className="mt-1 flex justify-between text-[10.5px] text-ink-4">
        <span>{t.timeline.landing}</span>
        <span className="text-ink-2">{t.acts[game.act].name} · {t.common.sol} {game.sol}</span>
        <span>{t.timeline.perihelion(DEADLINE_SOL)}</span>
      </div>
      <ul className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-[11.5px] text-ink-3">
        {milestones.slice(0, 5).map((m) =>
        <li key={m.id}>
            <span className="text-ink-4">
              {t.common.sol} {m.sol}
            </span>{' '}
            {f(m.title)}
          </li>
        )}
        {!milestones.length && <li className="text-ink-4">{t.timeline.empty}</li>}
      </ul>
    </div>);

}