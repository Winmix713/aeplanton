import React from 'react';
import { HomeIcon, RotateCcwIcon, TrophyIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { scoreAxes } from '../../data/scoring';
import type { GameState } from '../../types/game';
import { pillarsDone } from '../../utils/game/pillars';
import { computeEnding, livesSaved } from '../../utils/colony/meci';
import { Meter } from '../shared/Meter';
import { Modal } from '../shared/Modal';
import { MedalBadge } from './MedalBadge';

interface DebriefProps {
  open: boolean;
  game: GameState | null;
  onNew: () => void;
  onLeaderboard: () => void;
  onTitle: () => void;
  onClose: () => void;
}

export function Debrief({ open, game, onNew, onLeaderboard, onTitle, onClose }: DebriefProps) {
  const { t, f } = useI18n();
  const outcome = game?.outcome;
  const ending = game ? game.colony.ending ?? computeEnding(game) : 'regime';
  return (
    <Modal open={open && !!outcome} labelledBy="debrief-title" onClose={onClose} className="max-w-[620px]">
      {game && outcome &&
      <div className="p-6 md:p-8">
          <p className={`hud-label ${outcome.result === 'victory' ? '!text-green' : '!text-red'}`}>{outcome.result === 'victory' ? t.debrief.certified : t.debrief.lost}</p>
          <h2 id="debrief-title" className="mt-2 text-[26px] font-[650] leading-tight text-ink">
            {outcome.result === 'victory' ? t.debrief.winHead : t.debrief.lossHead}
          </h2>
          <p className="mt-2 text-[13.5px] text-ink-3">{f(outcome.reason)}</p>

          <div className="mt-6 grid gap-5 rounded-[16px] bg-fill-1 p-5 sm:grid-cols-[auto_1fr]">
            <div>
              <div className="hud-label">{t.colony.debrief.lives}</div>
              <div className={`mt-1 text-[34px] font-[650] leading-none ${livesSaved(game) >= 7_500_000 ? 'text-green' : livesSaved(game) > 0 ? 'text-amber' : 'text-red'}`}>
                {livesSaved(game).toLocaleString()}
              </div>
              <div className="mt-1 text-[11.5px] text-ink-4">
                {t.colony.debrief.of} · {t.colony.debrief.delay} {game.colony.delaySols} Sol
              </div>
            </div>
            <div className="sm:border-l sm:border-line sm:pl-5">
              <div className="hud-label">{t.colony.debrief.ending}</div>
              <div className="mt-1 text-[17px] font-[650] text-ink">{t.colony.endings[ending].name}</div>
              <p className="mt-1 text-[12.5px] leading-relaxed text-ink-3">{t.colony.endings[ending].text}</p>
            </div>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-6 border-y border-line py-5">
            <div>
              <div className="hud-label">{t.debrief.final}</div>
              <div className="mt-1 text-[34px] font-[650] leading-none text-ink">{game.score.total}</div>
            </div>
            <div>
              <div className="hud-label mb-1.5">{t.debrief.rating}</div>
              {outcome.medal ? <MedalBadge medal={outcome.medal} size="lg" /> : <span className="text-[13px] text-ink-4">{t.debrief.noRating}</span>}
            </div>
            <dl className="ml-auto grid grid-cols-3 gap-5 text-[12px]">
              <div>
                <dt className="hud-label">{t.common.sol}</dt>
                <dd className="mt-1 text-[15px] font-[650] text-ink">{game.sol}</dd>
              </div>
              <div>
                <dt className="hud-label">{t.debrief.pillars}</dt>
                <dd className="mt-1 text-[15px] font-[650] text-ink">{pillarsDone(game)}/4</dd>
              </div>
              <div>
                <dt className="hud-label">{t.debrief.faults}</dt>
                <dd className="mt-1 text-[15px] font-[650] text-ink">{game.stats.faults}</dd>
              </div>
            </dl>
          </div>

          <div className="mt-5 space-y-3">
            {scoreAxes.map((a) =>
          <Meter key={a.id} label={t.scoreAxes[a.id].label} value={String(game.score[a.id])} fraction={game.score[a.id] / 1000} tone="amber" />
          )}
          </div>
          <p className="mt-4 text-[11.5px] text-ink-4">
            {t.difficulty[game.difficulty].name} · {t.regions[game.region].name}
            {game.permadeath && t.debrief.permadeath}
            {t.debrief.saved}
          </p>

          <div className="mt-6 flex flex-wrap justify-end gap-2">
            <button type="button" onClick={onTitle} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              <HomeIcon size={14} />
              {t.debrief.toTitle}
            </button>
            <button type="button" onClick={onLeaderboard} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              <TrophyIcon size={14} />
              {t.debrief.records}
            </button>
            <button type="button" onClick={onNew} className="inline-flex h-10 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-5 text-[13px] font-[700] text-obsidian transition-[filter] duration-150 hover:brightness-110">
              <RotateCcwIcon size={14} strokeWidth={2} />
              {t.debrief.newMission}
            </button>
          </div>
        </div>
      }
    </Modal>);

}