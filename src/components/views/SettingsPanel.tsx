import React, { useState } from 'react';
import { GlobeIcon, LogOutIcon, MoonIcon, SaveIcon, SunIcon, Volume2Icon, VolumeXIcon, VibrateIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { listSlots } from '../../utils/storage';
import { LanguageSwitch } from '../layout/LanguageSwitch';
import { IconSwap, IconSwapItem } from '../shared/IconSwap';
import { Panel } from '../shared/Panel';

interface SettingsPanelProps {
  game: GameState;
  canLoad: boolean;
  onSave: (slot: number) => void;
  onLoad: (slot: number) => void;
  onQuit: () => void;
  soundOn: boolean;
  onToggleSound: () => void;
  lightGlass: boolean;
  onToggleGlass: () => void;
  hapticsOn: boolean;
  onToggleHaptics: () => void;
}

function Switch({ on, label, onToggle }: {on: boolean;label: string;onToggle: () => void;}) {
  return (
    <button type="button" role="switch" aria-checked={on} aria-label={label} onClick={onToggle} className={`relative h-6 w-10 shrink-0 rounded-full transition-colors duration-150 ${on ? 'bg-green' : 'bg-fill-3'}`}>
      <span className={`absolute top-1 h-4 w-4 rounded-full bg-ink transition-transform duration-150 ${on ? 'translate-x-5' : 'translate-x-1'}`} />
    </button>);

}

export function SettingsPanel(p: SettingsPanelProps) {
  const { t } = useI18n();
  const [slots, setSlots] = useState(listSlots);
  const refresh = () => setSlots(listSlots());
  const row = 'flex items-center justify-between gap-3 py-2.5';
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.settings.slots} aside={<span className="text-[11px] text-ink-4">{t.settings.offline}</span>}>
        {p.game.permadeath && <p className="mb-3 rounded-lg bg-amber-soft px-3 py-2 text-[12px] text-ink">{t.settings.permadeath(p.game.slot + 1)}</p>}
        <ul className="space-y-2">
          {slots.map((s, i) => {
            const current = p.game.slot === i;
            return (
              <li key={i} className={`flex items-center gap-3 rounded-[12px] px-3 py-2.5 ${current ? 'bg-fill-2' : 'bg-fill-1'}`}>
                <div className="min-w-0 flex-1 leading-tight">
                  <div className="text-[12.5px] font-[600] text-ink">
                    {t.settings.slot(i + 1)}
                    {current && <span className="ml-1.5 text-[11px] font-normal text-amber">{t.settings.current}</span>}
                  </div>
                  <div className="truncate text-[11.5px] text-ink-4">
                    {s ?
                    `${t.common.sol} ${s.sol} · ${t.difficulty[s.difficulty].name} · ${t.regions[s.region].name} · ${s.pillarsDone}/4${s.ended ? t.settings.ended : ''}` :
                    t.common.empty}
                  </div>
                </div>
                <button
                  type="button"
                  disabled={p.game.permadeath && !current}
                  onClick={() => {
                    p.onSave(i);
                    refresh();
                  }}
                  className="inline-flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full border border-line-2 px-3 text-[11.5px] font-[600] text-ink transition-colors duration-150 hover:border-amber hover:text-amber disabled:opacity-35">
                  
                  <SaveIcon size={12} />
                  {t.settings.save}
                </button>
                <button
                  type="button"
                  disabled={!s || !p.canLoad}
                  onClick={() => p.onLoad(i)}
                  className="h-8 whitespace-nowrap rounded-full px-3 text-[11.5px] font-[600] text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink disabled:opacity-35">
                  
                  {t.settings.load}
                </button>
              </li>);

          })}
        </ul>
      </Panel>

      <Panel title={t.settings.console}>
        <div className="divide-y divide-line">
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <GlobeIcon size={14} />
              {t.settings.language}
            </span>
            <LanguageSwitch />
          </div>
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <IconSwap>
                <IconSwapItem key={p.soundOn ? 'on' : 'off'}>{p.soundOn ? <Volume2Icon size={14} /> : <VolumeXIcon size={14} />}</IconSwapItem>
              </IconSwap>
              {t.settings.sound}
            </span>
            <Switch on={p.soundOn} label={t.settings.sound} onToggle={p.onToggleSound} />
          </div>
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <VibrateIcon size={14} />
              {t.settings.haptics}
            </span>
            <Switch on={p.hapticsOn} label={t.settings.haptics} onToggle={p.onToggleHaptics} />
          </div>
          <div className={row}>
            <span className="flex items-center gap-2 text-[12.5px] text-ink">
              <IconSwap>
                <IconSwapItem key={p.lightGlass ? 'sun' : 'moon'}>{p.lightGlass ? <SunIcon size={14} /> : <MoonIcon size={14} />}</IconSwapItem>
              </IconSwap>
              {t.settings.glass}
            </span>
            <Switch on={p.lightGlass} label={t.settings.glass} onToggle={p.onToggleGlass} />
          </div>
        </div>
      </Panel>

      <button
        type="button"
        onClick={p.onQuit}
        className="glass inline-flex h-11 items-center justify-center gap-2 rounded-full text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:text-ink">
        
        <LogOutIcon size={14} />
        {t.settings.quit}
      </button>
    </div>);

}