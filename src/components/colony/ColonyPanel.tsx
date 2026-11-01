import React, { useMemo } from 'react';
import { RadiationIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { BATTERY_KWH, moduleOrder } from '../../data/colony';
import type { ModuleId, ModuleMode, ResourceId } from '../../types/colony';
import type { GameState } from '../../types/game';
import { simulateLifeSupport, solarCapacityKw, solsOfReserve } from '../../utils/colony/lifeSupport';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';
import { MeciChip } from './MeciChip';
import { ModuleRow } from './ModuleRow';

interface ColonyPanelProps {
  game: GameState;
  locked: boolean;
  onMode: (id: ModuleId, mode: ModuleMode) => void;
}

const RESOURCE_ROWS: ResourceId[] = ['o2', 'water', 'food', 'h2', 'regolith'];

/** ARES-1 life support: reserves, the chemical loop, the power grid and the crew. */
export function ColonyPanel({ game, locked, onMode }: ColonyPanelProps) {
  const { t } = useI18n();
  const c = game.colony;
  const forecast = useMemo(() => simulateLifeSupport(game), [game]);
  const rates: Record<ResourceId, number> = { o2: forecast.o2, water: forecast.water, food: forecast.food, h2: forecast.h2, regolith: 0 };
  const shielding = Math.round((0.3 + 0.65 * (c.lavaTube / 100)) * 100);
  const net = forecast.generationKwh - forecast.loadKwh;

  return (
    <div className="flex flex-col gap-3">
      <div className="xl:hidden">
        <MeciChip game={game} />
      </div>

      <Panel title={t.colony.panel.resources} aside={<span className="text-[11px] text-ink-4">{t.colony.panel.forecast}</span>}>
        <ul className="divide-y divide-line">
          {RESOURCE_ROWS.map((k) => {
            const stock = Math.round(c.resources[k]);
            const rate = rates[k];
            const left = solsOfReserve(stock, rate);
            const urgent = left < 8;
            return (
              <li key={k} className="flex items-baseline justify-between gap-3 py-2 first:pt-0 last:pb-0">
                <span className="text-[12.5px] text-ink-2">{t.colony.resources[k]}</span>
                <span className="ml-auto text-[13px] font-[650] text-ink">
                  {stock.toLocaleString()} <span className="text-[11px] font-normal text-ink-4">{k === 'food' ? t.colony.units.food : t.colony.units.kg}</span>
                </span>
                <span className={`w-[64px] text-right text-[11.5px] font-[600] ${rate < 0 ? 'text-red' : rate > 0 ? 'text-green' : 'text-ink-4'}`}>
                  {k === 'regolith' ? '—' : `${rate > 0 ? '+' : ''}${rate}${t.colony.panel.perSol}`}
                </span>
                <span className={`hidden w-[92px] text-right text-[11px] sm:block ${urgent ? 'font-[650] text-red' : 'text-ink-4'}`}>{k === 'regolith' ? '' : t.colony.panel.solsLeft(left)}</span>
              </li>);

          })}
        </ul>
      </Panel>

      <Panel title={t.colony.panel.loop}>
        <ul className="divide-y divide-line">
          {moduleOrder.map((id) =>
          <ModuleRow key={id} id={id} mod={c.modules[id]} locked={locked} onMode={onMode} />
          )}
        </ul>
        <p className="mt-3 text-[11px] leading-relaxed text-ink-4">{locked ? t.colony.panel.modeLocked : t.colony.panel.upkeep}</p>
      </Panel>

      <Panel
        title={t.colony.panel.power}
        aside={<span className={`text-[11px] font-[650] ${forecast.gridLevel > 0 ? 'text-red' : 'text-green'}`}>{t.colony.panel.grid(forecast.gridLevel)}</span>}>
        
        <div className="flex items-end justify-between gap-4">
          <div>
            <div className="text-[28px] font-[650] leading-none text-ink">
              {Math.round(c.resources.battery)}
              <span className="text-[13px] font-normal text-ink-4"> / {BATTERY_KWH} kWh</span>
            </div>
            <p className="mt-1.5 text-[11.5px] text-ink-3">{t.colony.panel.capacity(solarCapacityKw(game))}</p>
          </div>
          <dl className="grid grid-cols-2 gap-x-4 text-right">
            <dt className="hud-label">{t.colony.panel.generation}</dt>
            <dt className="hud-label">{t.colony.panel.load}</dt>
            <dd className="text-[13px] font-[650] text-ink">{forecast.generationKwh}</dd>
            <dd className={`text-[13px] font-[650] ${net < 0 ? 'text-red' : 'text-ink'}`}>{forecast.loadKwh}</dd>
          </dl>
        </div>
        <div className="mt-3 space-y-3">
          <Meter label={t.colony.panel.battery} value={`${Math.round(c.resources.battery / BATTERY_KWH * 100)}%`} fraction={c.resources.battery / BATTERY_KWH} tone={healthTone(c.resources.battery / BATTERY_KWH * 100)} />
          <Meter label={t.colony.panel.dust} value={`${Math.round(c.solarDust * 100)}%`} fraction={c.solarDust} tone={c.solarDust > 0.12 ? 'amber' : 'neutral'} />
        </div>
      </Panel>

      <Panel title={t.colony.panel.crew}>
        {c.flareSols > 0 &&
        <p className="mb-3 flex items-center gap-1.5 rounded-lg bg-fill-2 px-2.5 py-1.5 text-[11.5px] font-[600] text-red">
            <RadiationIcon size={12} strokeWidth={1.8} aria-hidden="true" />
            {t.colony.panel.flare}
          </p>
        }
        <dl className="grid grid-cols-3 gap-3">
          <div>
            <dt className="hud-label">{t.colony.panel.colonists}</dt>
            <dd className="mt-1 text-[16px] font-[650] text-ink">{c.colonists}</dd>
          </div>
          <div>
            <dt className="hud-label">{t.colony.panel.dose}</dt>
            <dd className="mt-1 text-[16px] font-[650] text-ink">
              {Math.round(c.doseMsv)} <span className="text-[11px] font-normal text-ink-4">mSv</span>
            </dd>
          </div>
          <div>
            <dt className="hud-label">{t.colony.panel.shielding}</dt>
            <dd className="mt-1 text-[16px] font-[650] text-ink">{shielding}%</dd>
          </div>
        </dl>
        <div className="mt-3 space-y-3">
          <Meter label={t.colony.panel.morale} value={`${Math.round(c.morale)}%`} fraction={c.morale / 100} tone={healthTone(c.morale)} marker={0.3} />
          <Meter label={t.colony.panel.lavaTube} value={`${Math.round(c.lavaTube)}%`} fraction={c.lavaTube / 100} tone={c.lavaTube >= 100 ? 'green' : 'amber'} />
        </div>
      </Panel>
    </div>);

}