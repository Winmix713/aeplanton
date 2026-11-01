import React from 'react';
import { CloudSunIcon, EyeIcon, GaugeIcon, RadiationIcon, SunIcon, ThermometerIcon, WindIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { driveEnvironmentFactor, solarChargeFactor } from '../../utils/game/environment';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

export function EnvironmentPanel({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const e = game.environment;
  const drive = driveEnvironmentFactor(e);
  const solar = solarChargeFactor(e);
  const readings = [
  { icon: ThermometerIcon, label: t.environment.temperature, value: `${e.dayTempC} °C` },
  { icon: GaugeIcon, label: t.environment.pressure, value: `${e.pressurePa} Pa` },
  { icon: WindIcon, label: t.environment.wind, value: `${e.windMs} m/s` },
  { icon: RadiationIcon, label: t.environment.dust, value: `${Math.round(e.dustIndex * 100)}%` },
  { icon: SunIcon, label: t.environment.solar, value: `${e.solarIrradiance} W/m²` },
  { icon: CloudSunIcon, label: t.environment.daylight, value: `${e.daylightHours} h` },
  { icon: EyeIcon, label: t.environment.visibility, value: `${e.visibilityKm} km` }];

  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.environment.title} aside={<span className="text-[11px] text-ink-4">{t.environment.live}</span>}>
        <dl className="grid grid-cols-2 gap-2">
          {readings.map(({ icon: Icon, label, value }) =>
          <div key={label} className="rounded-[12px] bg-fill-1 p-3">
              <dt className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-[0.08em] text-ink-4">
                <Icon size={12} strokeWidth={1.6} />
                {label}
              </dt>
              <dd className="mt-1 text-[16px] font-[650] text-ink">{value}</dd>
            </div>
          )}
        </dl>
      </Panel>
      <Panel title={t.environment.systemImpact}>
        <div className="space-y-3">
          <Meter label={t.environment.driveEfficiency} value={`${Math.round(drive * 100)}%`} fraction={drive} tone={drive < 0.7 ? 'amber' : 'green'} />
          <Meter label={t.environment.solarYield} value={`${Math.round(solar * 100)}%`} fraction={solar} tone={solar < 0.55 ? 'red' : solar < 0.8 ? 'amber' : 'green'} />
          <Meter label={t.environment.scienceQuality} value={`${Math.round(e.scienceQuality * 100)}%`} fraction={e.scienceQuality} tone={e.scienceQuality < 0.7 ? 'amber' : 'blue'} />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-4">{t.environment.note}</p>
      </Panel>
      {game.storm.chainId &&
      <Panel title={t.environment.eventChain}>
          <p className="text-[12.5px] text-ink-2">{t.environment.chainActive(game.storm.chainStep, game.storm.sols)}</p>
          <p className="mt-1 text-[11.5px] text-ink-4">{t.environment.chainHint}</p>
        </Panel>
      }
    </div>);

}