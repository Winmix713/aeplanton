import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { POWER_STREAK, POWER_TARGET_W } from '../../data/pillars';
import { regionDef } from '../../data/regions';
import type { GameState } from '../../types/game';
import { farmOutput } from '../../utils/game/pillars';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';
import { InventoryList } from './InventoryList';

export function SystemsPanel({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const out = farmOutput(game);
  const region = regionDef(game.region);
  const p = game.pillars.power;
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.systems.power}>
        <div className="flex items-end justify-between">
          <div>
            <div className="text-[30px] font-[650] leading-none text-ink">
              {out}
              <span className="text-[14px] font-normal text-ink-4"> / {POWER_TARGET_W} W</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-ink-3">
              {t.systems.farm(p.farmW, Math.round(p.rtgW))}
              {game.storm.sols > 0 && <span className="text-red">{t.systems.storm(Math.round(game.storm.intensity * 55))}</span>}
            </p>
          </div>
          <div className="text-right">
            <div className="hud-label">{t.systems.stable}</div>
            <div className={`mt-1 whitespace-nowrap text-[16px] font-[650] ${p.streak >= POWER_STREAK ? 'text-green' : 'text-ink'}`}>
              {t.systems.sols(Math.min(p.streak, POWER_STREAK), POWER_STREAK)}
            </div>
          </div>
        </div>
        <div className="mt-3">
          <Meter label={t.systems.toward} value={`${Math.round(out / POWER_TARGET_W * 100)}%`} fraction={out / POWER_TARGET_W} tone={out >= POWER_TARGET_W ? 'green' : 'amber'} />
        </div>
      </Panel>

      <Panel title={t.systems.rover}>
        <div className="space-y-3">
          <Meter label={t.systems.battery} value={`${Math.round(game.rover.battery)}%`} fraction={game.rover.battery / 100} tone={healthTone(game.rover.battery)} />
          <Meter label={t.systems.wheels} value={`${Math.round(game.rover.wheels)}%`} fraction={game.rover.wheels / 100} tone={healthTone(game.rover.wheels)} />
          <Meter label={t.systems.drill} value={`${Math.round(game.rover.drill)}%`} fraction={game.rover.drill / 100} tone={healthTone(game.rover.drill)} />
          <Meter label={t.systems.dust} value={`${Math.round(game.rover.dust * 100)}%`} fraction={game.rover.dust} tone={game.rover.dust > 0.5 ? 'amber' : 'neutral'} />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-4">
          {t.systems.night(region.nightTemp)}
          {game.rover.brownouts > 0 && <span className="text-red">{t.systems.brownout}</span>}
        </p>
      </Panel>

      <Panel title={t.systems.inventory}>
        <InventoryList game={game} />
      </Panel>
    </div>);

}