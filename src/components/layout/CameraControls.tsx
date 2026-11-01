import React from 'react';
import { motion } from 'framer-motion';
import { MinusIcon, PlusIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { CameraMode } from '../../types/mission';
import { menuEnterTransition } from '../../utils/motion';

interface CameraControlsProps {
  mode: CameraMode;
  onMode: (m: CameraMode) => void;
  onZoom: (dir: 1 | -1) => void;
  showHints?: boolean;
}

const MODES: {id: CameraMode;key: 'site' | 'tactical' | 'rover';}[] = [
{ id: 'site', key: 'site' },
{ id: 'tactical', key: 'tactical' },
{ id: 'atlas', key: 'rover' }];


export function CameraControls({ mode, onMode, onZoom }: CameraControlsProps) {
  const { t } = useI18n();
  return (
    <div className="flex flex-col items-end gap-2.5">
      <div className="glass flex items-center gap-1 rounded-2xl p-1.5">
        <span className="hud-label px-2.5 text-ink-3">{t.camera.label}</span>
        <div role="tablist" aria-label={t.camera.mode} className="flex items-center rounded-xl bg-fill-1 p-0.5">
          {MODES.map((m) => {
            const on = m.id === mode;
            return (
              <button
                key={m.id}
                type="button"
                role="tab"
                aria-selected={on}
                onClick={() => onMode(m.id)}
                className={`relative whitespace-nowrap rounded-[10px] px-3 py-1.5 text-[10.5px] font-[600] uppercase tracking-[0.1em] transition-colors duration-150 ${
                on ? 'text-ink' : 'text-ink-3 hover:text-ink'}`
                }>
                
                {on && <motion.span layoutId="camera-glide" className="absolute inset-0 rounded-[10px] bg-fill-3 shadow-[inset_0_0_0_1px_var(--line-2)]" transition={menuEnterTransition} />}
                <span className="relative">{t.camera[m.key]}</span>
              </button>);

          })}
        </div>
        <span className="mx-1 h-6 w-px bg-line" aria-hidden="true" />
        <button
          type="button"
          aria-label={t.camera.zoomIn}
          onClick={() => onZoom(1)}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
          
          <PlusIcon size={15} strokeWidth={1.5} />
        </button>
        <button
          type="button"
          aria-label={t.camera.zoomOut}
          onClick={() => onZoom(-1)}
          className="grid h-8 w-8 place-items-center rounded-lg text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
          
          <MinusIcon size={15} strokeWidth={1.5} />
        </button>
      </div>
    </div>);

}