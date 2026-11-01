import React from 'react';
import { CheckIcon, ShieldCheckIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { DRILL_RANGE, ICE_CORES, SURVEY_RANGE } from '../../data/pillars';
import type { C012State, GameState } from '../../types/game';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

const CUSTODY: Exclude<C012State, 'none'>[] = ['selected', 'surveyed', 'spectrographed', 'sampled', 'sealed', 'checked', 'analyzed', 'packetReady', 'uplinked'];
const ORDER: C012State[] = ['none', ...CUSTODY];

export function SciencePanel({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const w = game.pillars.water;
  const sample = game.sample;
  const reached = ORDER.indexOf(sample.state);
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.science.custody} aside={<span className="text-[11px] text-ink-4">{t.science.candidate}</span>}>
        <ol className="relative grid gap-x-5 gap-y-3 pl-6 xl:grid-cols-2">
          <span className="absolute bottom-2 left-[7px] top-2 w-px bg-line-2" aria-hidden="true" />
          {CUSTODY.map((id, i) => {
            const done = reached >= i + 1;
            const next = reached === i;
            const c = t.science.steps[id];
            return (
              <li key={id} className="relative min-h-[38px]">
                <span className={`absolute -left-6 top-0.5 grid h-[15px] w-[15px] place-items-center rounded-full ${done ? 'bg-green text-obsidian' : next ? 'border-2 border-amber bg-obsidian' : 'border border-line-2 bg-obsidian'}`}>
                  {done && <CheckIcon size={10} strokeWidth={3} />}
                </span>
                <div className={`text-[12.5px] font-[600] ${done ? 'text-ink' : next ? 'text-amber' : 'text-ink-3'}`}>{c.label}</div>
                <div className="text-[11px] leading-snug text-ink-4">{c.hint}</div>
              </li>);

          })}
        </ol>
        <dl className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-3 text-[12px] sm:grid-cols-3">
          <SampleDatum label={t.science.quality} value={sample.quality ? `${sample.quality}%` : t.science.pending} />
          <SampleDatum label={t.science.storage} value={t.science.storageValues[sample.storage]} />
          <SampleDatum label={t.science.mineralogy} value={sample.mineralogy.length ? sample.mineralogy.join(' · ') : t.science.pending} />
          <SampleDatum label={t.science.selectedSol} value={sample.selectedSol ? `Sol ${sample.selectedSol}` : '—'} />
          <SampleDatum label={t.science.collectedSol} value={sample.collectedSol ? `Sol ${sample.collectedSol}` : '—'} />
          <div>
            <dt className="hud-label">{t.science.tool}</dt>
            <dd className={`mt-1 flex items-center gap-1 text-[12.5px] font-[600] ${game.sterile ? 'text-green' : 'text-ink-3'}`}>
              <ShieldCheckIcon size={13} /> {game.sterile ? t.science.sterile : t.science.notPrepped}
            </dd>
          </div>
        </dl>
        <div className="mt-3 flex gap-4 text-[11.5px] text-ink-3">
          <span>{t.science.tubes}: <strong className="text-ink">{game.inventory.tubes}</strong></span>
          <span>{t.science.voided}: <strong className={game.pillars.science.voidedTubes ? 'text-red' : 'text-ink'}>{game.pillars.science.voidedTubes}</strong></span>
        </div>
      </Panel>

      <Panel title={t.science.ice}>
        <div className="space-y-3">
          <Meter label={t.science.coverage} value={`${Math.round(w.coverage)}%`} fraction={w.coverage / 100} tone={w.coverage >= 100 ? 'green' : 'amber'} marker={0.6} />
          <Meter label={t.science.cores} value={`${w.cores}/${ICE_CORES}`} fraction={w.cores / ICE_CORES} tone={w.cores >= ICE_CORES ? 'green' : 'amber'} />
          <Meter label={t.science.bit} value={t.science.bitValue(Math.round(game.rover.drill), game.inventory.drillBits)} fraction={game.rover.drill / 100} tone={healthTone(game.rover.drill)} />
        </div>
        <p className="mt-3 text-[11.5px] leading-relaxed text-ink-4">
          {t.science.note(Math.round(SURVEY_RANGE * 100), Math.round(DRILL_RANGE * 100))}
          {w.uplinked && <span className="text-green">{t.science.delivered}</span>}
        </p>
      </Panel>
    </div>);

}

function SampleDatum({ label, value }: {label: string;value: string;}) {
  return (
    <div className="min-w-0">
      <dt className="hud-label">{label}</dt>
      <dd className="mt-1 truncate text-[12.5px] font-[600] text-ink" title={value}>{value}</dd>
    </div>);

}