import React, { useMemo, useState } from 'react';
import { ArrowLeftIcon, RocketIcon, SkullIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { difficulties } from '../../data/difficulty';
import { regions } from '../../data/regions';
import type { DifficultyId, NewGameOptions, RegionId } from '../../types/game';
import { listSlots } from '../../utils/storage';

interface NewMissionSetupProps {
  onBack: () => void;
  onStart: (opts: NewGameOptions) => void;
}

export function NewMissionSetup({ onBack, onStart }: NewMissionSetupProps) {
  const { t } = useI18n();
  const slots = useMemo(listSlots, []);
  const firstEmpty = slots.findIndex((s) => !s);
  const [difficulty, setDifficulty] = useState<DifficultyId>('engineer');
  const [region, setRegion] = useState<RegionId>('chryse');
  const [slot, setSlot] = useState(firstEmpty >= 0 ? firstEmpty : 0);
  const [permadeath, setPermadeath] = useState(false);
  const overwrite = !!slots[slot];

  const card = (on: boolean) =>
  `flex h-full flex-col rounded-[16px] p-4 text-left transition-[background-color,box-shadow] duration-150 ${
  on ? 'bg-fill-2 shadow-[inset_0_0_0_1.5px_var(--amber)]' : 'bg-fill-1 shadow-[inset_0_0_0_1px_var(--line)] hover:bg-fill-2'}`;


  return (
    <section aria-labelledby="setup-title" className="glass glass-strong w-full max-w-[920px] rounded-[24px] p-5 md:p-7">
      <div className="flex items-center gap-3">
        <button type="button" onClick={onBack} aria-label={t.common.back} className="grid h-9 w-9 place-items-center rounded-full text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
          <ArrowLeftIcon size={16} />
        </button>
        <div>
          <h1 id="setup-title" className="text-[20px] font-[650] text-ink">
            {t.setup.title}
          </h1>
          <p className="text-[12px] text-ink-4">{t.setup.subtitle}</p>
        </div>
      </div>

      <fieldset className="mt-6">
        <legend className="hud-label mb-2.5">{t.setup.difficulty}</legend>
        <div className="grid gap-2.5 sm:grid-cols-3" role="radiogroup">
          {difficulties.map((d) =>
          <button key={d.id} type="button" role="radio" aria-checked={difficulty === d.id} onClick={() => setDifficulty(d.id)} className={card(difficulty === d.id)}>
              <span className="text-[14px] font-[650] text-ink">{t.difficulty[d.id].name}</span>
              <span className="mt-1 text-[12px] leading-snug text-ink-3">{t.difficulty[d.id].blurb}</span>
              <span className="mt-auto pt-3 text-[11px] text-ink-4">{t.setup.apDelay(d.ap, d.delay[0], d.delay[1])}</span>
            </button>
          )}
        </div>
        {difficulty === 'director' &&
        <label className="mt-3 flex cursor-pointer items-center gap-3 rounded-[14px] bg-fill-1 px-4 py-3">
            <input type="checkbox" checked={permadeath} onChange={(e) => setPermadeath(e.target.checked)} className="h-4 w-4 accent-[var(--amber)]" />
            <SkullIcon size={15} className="text-red" />
            <span className="text-[12.5px] text-ink">
              {t.setup.permadeath}
              <span className="text-ink-4">{t.setup.permadeathHint}</span>
            </span>
          </label>
        }
      </fieldset>

      <fieldset className="mt-6">
        <legend className="hud-label mb-2.5">{t.setup.region}</legend>
        <div className="grid gap-2.5 sm:grid-cols-3" role="radiogroup">
          {regions.map((r) =>
          <button key={r.id} type="button" role="radio" aria-checked={region === r.id} onClick={() => setRegion(r.id)} className={card(region === r.id)}>
              <span className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full" style={{ background: r.scene.ground }} aria-hidden="true" />
                <span className="text-[14px] font-[650] text-ink">{t.regions[r.id].name}</span>
              </span>
              <span className="mt-1 text-[12px] leading-snug text-ink-3">{t.regions[r.id].blurb}</span>
              <span className="mt-auto pt-3 text-[11px] text-ink-4">{t.setup.nights(r.nightTemp, r.coords)}</span>
            </button>
          )}
        </div>
      </fieldset>

      <fieldset className="mt-6">
        <legend className="hud-label mb-2.5">{t.setup.slot}</legend>
        <div className="grid gap-2 sm:grid-cols-3" role="radiogroup">
          {slots.map((s, i) =>
          <button key={i} type="button" role="radio" aria-checked={slot === i} onClick={() => setSlot(i)} className={`${card(slot === i)} !p-3`}>
              <span className="text-[13px] font-[600] text-ink">{t.settings.slot(i + 1)}</span>
              <span className="text-[11.5px] text-ink-4">{s ? t.setup.slotUsed(s.sol) : t.common.empty}</span>
            </button>
          )}
        </div>
      </fieldset>

      <div className="mt-7 flex flex-wrap items-center justify-end gap-3">
        {overwrite && <span className="text-[12px] text-amber">{t.setup.overwrite(slot + 1)}</span>}
        <button
          type="button"
          onClick={() => onStart({ difficulty, region, slot, permadeath: difficulty === 'director' && permadeath })}
          className="inline-flex h-11 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-6 text-[13.5px] font-[700] text-obsidian transition-[filter] duration-150 hover:brightness-110">
          
          <RocketIcon size={15} strokeWidth={2} />
          {t.setup.begin}
        </button>
      </div>
    </section>);

}