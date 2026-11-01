import React from 'react';
import { TrophyIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { scoreAxes } from '../../data/scoring';
import type { GameState } from '../../types/game';
import { medalFor } from '../../utils/game/scoring';
import { MedalBadge } from '../endgame/MedalBadge';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';
import { EventsLog } from './EventsLog';

interface ReportsPanelProps {
  game: GameState;
  onLeaderboard: () => void;
}

export function ReportsPanel({ game, onLeaderboard }: ReportsPanelProps) {
  const { t } = useI18n();
  const projected = medalFor(game.score.total);
  return (
    <div className="flex flex-col gap-3">
      <Panel
        title={t.reports.score}
        aside={
        <button type="button" onClick={onLeaderboard} className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 text-[11.5px] font-[600] text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
            <TrophyIcon size={13} strokeWidth={1.7} />
            {t.reports.records}
          </button>
        }>
        
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[30px] font-[650] leading-none text-ink">{game.score.total}</div>
            <div className="mt-1 text-[11.5px] text-ink-4">{t.reports.of}</div>
          </div>
          <div className="flex items-center gap-2 text-[12px] text-ink-3">
            {t.reports.pace}
            <MedalBadge medal={projected} />
          </div>
        </div>
        <div className="mt-4 space-y-3">
          {scoreAxes.map((a) =>
          <div key={a.id}>
              <Meter label={t.scoreAxes[a.id].label} value={String(game.score[a.id])} fraction={game.score[a.id] / 1000} tone="amber" />
              <p className="mt-1 text-[11px] text-ink-4">{t.scoreAxes[a.id].hint}</p>
            </div>
          )}
        </div>
      </Panel>

      <Panel title={t.reports.missionLearning}>
        <dl className="grid grid-cols-3 gap-2 text-center">
          <div className="rounded-[12px] bg-fill-1 p-3"><dt className="hud-label">{t.reports.discoveries}</dt><dd className="mt-1 text-[19px] font-[650] text-green">{game.stats.discoveries}</dd></div>
          <div className="rounded-[12px] bg-fill-1 p-3"><dt className="hud-label">{t.reports.chains}</dt><dd className="mt-1 text-[19px] font-[650] text-blue">{game.stats.eventChainsBroken}</dd></div>
          <div className="rounded-[12px] bg-fill-1 p-3"><dt className="hud-label">{t.reports.justified}</dt><dd className="mt-1 text-[19px] font-[650] text-amber">{Object.values(game.advisors).reduce((sum, a) => sum + a.justifiedRejections, 0)}</dd></div>
        </dl>
      </Panel>

      <Panel title={t.reports.log}>
        {game.reports.length ?
        <ul className="divide-y divide-line">
            {game.reports.slice(0, 8).map((r) => {
            const failed = r.steps.filter((s) => !s.ok).length;
            const red = r.events.filter((e) => e.tone === 'red').length;
            return (
              <li key={r.sol} className="flex items-center justify-between py-2 text-[12px]">
                  <span className="font-[600] text-ink">
                    {t.common.sol} {r.sol}
                    {r.restSkip ? <span className="font-normal text-ink-4">{t.reports.rested(r.restSkip)}</span> : null}
                  </span>
                  <span className="text-ink-3">
                    {t.reports.ok(r.steps.length - failed, r.steps.length)}
                    {red > 0 && <span className="text-red">{t.reports.alerts(red)}</span>}
                  </span>
                </li>);

          })}
          </ul> :

        <p className="text-[12px] text-ink-4">{t.reports.empty}</p>
        }
      </Panel>

      <Panel title={t.reports.events}>
        <EventsLog events={game.events} limit={14} />
      </Panel>
    </div>);

}