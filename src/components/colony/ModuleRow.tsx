import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { moduleDefs } from '../../data/colony';
import type { ModuleId, ModuleMode, ModuleState } from '../../types/colony';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';

const MODES: ModuleMode[] = ['off', 'on', 'overclock'];

interface ModuleRowProps {
  id: ModuleId;
  mod: ModuleState;
  locked: boolean;
  onMode: (id: ModuleId, mode: ModuleMode) => void;
}

/** One chemical-loop module: what it converts, its run mode and integrity. */
export function ModuleRow({ id, mod, locked, onMode }: ModuleRowProps) {
  const { t } = useI18n();
  const Icon = moduleDefs[id].icon;
  const text = t.colony.modules[id];
  return (
    <li className="py-3 first:pt-0 last:pb-0">
      <div className="flex items-center gap-2.5">
        <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full ${mod.failed ? 'bg-fill-2 text-red' : mod.mode === 'off' ? 'bg-fill-1 text-ink-4' : 'bg-amber-soft text-amber'}`}>
          <Icon size={14} strokeWidth={1.7} />
        </span>
        <div className="min-w-0 flex-1 leading-tight">
          <div className="truncate text-[12.5px] font-[600] text-ink">{text.name}</div>
          <div className="truncate text-[11px] text-ink-4">{mod.failed ? <span className="text-red">{t.colony.panel.failed}</span> : text.io}</div>
        </div>
        <div role="radiogroup" aria-label={t.colony.panel.modeAria(text.name)} className="flex shrink-0 rounded-full bg-fill-1 p-0.5">
          {MODES.map((mode) => {
            const on = mod.mode === mode;
            return (
              <button
                key={mode}
                type="button"
                role="radio"
                aria-checked={on}
                disabled={locked}
                onClick={() => !on && onMode(id, mode)}
                className={`h-7 whitespace-nowrap rounded-full px-2.5 text-[11px] font-[650] transition-colors duration-150 disabled:cursor-not-allowed ${
                on ? mode === 'overclock' ? 'bg-amber text-obsidian' : mode === 'off' ? 'bg-fill-3 text-ink' : 'bg-fill-3 text-ink' : 'text-ink-4 hover:text-ink'}`
                }>
                
                {t.colony.modes[mode]}
              </button>);

          })}
        </div>
      </div>
      <div className="mt-2.5 pl-[42px]">
        <Meter label={t.colony.panel.integrity} value={`${Math.round(mod.integrity)}%`} fraction={mod.integrity / 100} tone={healthTone(mod.integrity)} marker={0.5} />
      </div>
    </li>);

}