import React from 'react';
import { DEADLINE_SOL } from '../../data/pillars';
import type { RegionDef } from '../../data/regions';
import { useI18n } from '../../contexts/LanguageContext';
import type { GamePhase, GameState, TimeSpeed } from '../../types/game';
import { formatLmst } from '../../utils/tone';
import { ActHud } from '../campaign/ActHud';
import { MeciChip } from '../colony/MeciChip';
import { LanguageSwitch } from './LanguageSwitch';
import { TimeControls } from './TimeControls';

interface TopBarProps {
  game: GameState;
  region: RegionDef;
  phase: GamePhase;
  lmst: number;
  paused: boolean;
  onTogglePause: () => void;
  speed: TimeSpeed;
  onSpeed: (s: TimeSpeed) => void;
}

export function TopBar({ game, region, phase, lmst, paused, onTogglePause, speed, onSpeed }: TopBarProps) {
  const { t } = useI18n();
  const playing = phase === 'uplink' || phase === 'executing' || phase === 'night';
  return (
    <header className="stage-text absolute inset-x-0 top-0 z-20 grid grid-cols-[1fr_auto] items-center gap-3 px-4 pt-3 md:grid-cols-[1fr_auto_1fr] lg:px-[22px]">
      <div className="flex min-w-0 items-center gap-4">
        <div className="flex items-center gap-2.5">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path d="M10 2.5 17.5 17h-3.2L10 8.6 5.7 17H2.5L10 2.5Z" stroke="var(--amber)" strokeWidth="1.5" strokeLinejoin="round" />
          </svg>
          <div className="leading-tight">
            <div className="text-[12px] font-[650] uppercase tracking-[0.34em] text-ink">Ares</div>
            <div className="hidden text-[10px] uppercase tracking-[0.2em] text-ink-4 sm:block">{t.topBar.opsCommand}</div>
          </div>
        </div>
        <span className="hidden h-7 w-px bg-line-2 xl:block" />
        <div className="hidden leading-tight xl:block">
          <div className="hud-label">{region.coords}</div>
          <div className="text-[13px] font-medium text-ink">{t.regions[region.id].name}</div>
        </div>
      </div>

      <div className="hidden items-center gap-2 md:flex">
        <ActHud game={game} />
        <div className="glass flex h-10 items-center gap-4 rounded-full px-4">
          <div className="leading-tight">
            <span className="hud-label">{t.common.sol}</span>
            <div className="text-[14px] font-[650] text-ink">
              {game.sol}
              <span className="font-normal text-ink-4"> / {DEADLINE_SOL}</span>
            </div>
          </div>
          <span className="h-6 w-px bg-line-2" />
          <div className="leading-tight">
            <span className="hud-label">{t.topBar.lmst}</span>
            <div className="text-[14px] font-medium text-ink">{formatLmst(lmst)}</div>
          </div>
          <span className="h-6 w-px bg-line-2" />
          <div className="leading-tight">
            <span className="hud-label">{t.topBar.phase}</span>
            <div className={`whitespace-nowrap text-[12.5px] font-[600] ${playing ? 'text-amber' : 'text-ink'}`}>{paused && playing ? t.phase.paused : t.phase[phase]}</div>
          </div>
        </div>
      </div>

      <div className="flex items-center justify-end gap-2">
        <div className="hidden xl:block">
          <MeciChip game={game} />
        </div>
        <div className="hidden items-center gap-2 rounded-full bg-fill-1 px-3 py-1.5 2xl:flex" title={t.topBar.lightTime}>
          <span className="h-1.5 w-1.5 rounded-full bg-red breathe" aria-hidden="true" />
          <span className="whitespace-nowrap text-[11px] font-[600] uppercase tracking-[0.12em] text-ink-2">{t.topBar.delay(game.delayMin)}</span>
        </div>
        <LanguageSwitch className="glass rounded-full" />
        <TimeControls paused={paused} onTogglePause={onTogglePause} speed={speed} onSpeed={onSpeed} speedLocked={phase === 'executing'} disabled={!playing} />
      </div>
    </header>);

}