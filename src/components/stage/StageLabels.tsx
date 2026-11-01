import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { lander, rover } from '../../data/mission';
import type { LanderPhase } from '../../types/mission';
import type { RoverState } from '../../types/rover';
import { landerStatus, roverStatus, toneText } from '../../utils/status';
import { StageCallout } from './StageCallout';

export function RoverLabel({ state, showBattery }: {state: RoverState;showBattery: boolean;}) {
  const meta = roverStatus(state.status);
  const moving = state.status === 'navigating' || state.status === 'returning';
  return (
    <StageCallout stem={showBattery ? 100 : 60}>
      <div className="text-[13px] font-semibold tracking-[0.02em] text-ink">
        {rover.name} <span className="ml-1 font-normal text-ink-3">{rover.kind}</span>
      </div>
      <div className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] ${toneText[meta.tone]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {meta.label}
        {moving && ` · ${state.speed.toFixed(1)} m/s`}
      </div>
      {showBattery &&
      <div className="glass mt-2 flex w-[140px] items-center justify-between rounded-md px-2.5 py-1.5 text-[10px] font-[600] uppercase tracking-[0.12em] text-ink">
          Battery <span>{Math.round(state.battery)}%</span>
        </div>
      }
    </StageCallout>);

}

/** Game-driven rover tag: name plus what ARES-1 is doing right now. */
export function RoverTag({ status, tone }: {status: string;tone: 'amber' | 'green' | 'neutral' | 'red';}) {
  const { t } = useI18n();
  const color = tone === 'amber' ? 'text-amber' : tone === 'green' ? 'text-green' : tone === 'red' ? 'text-red' : 'text-ink-3';
  return (
    <StageCallout stem={70}>
      <div className="text-[13px] font-semibold tracking-[0.04em] text-ink">
        {rover.name} <span className="ml-1 font-normal text-ink-3">{t.stage.roverKind}</span>
      </div>
      <div className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] ${color}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {status}
      </div>
    </StageCallout>);

}

export function LanderLabel({ phase }: {phase: LanderPhase;}) {
  const meta = landerStatus(phase);
  return (
    <StageCallout stem={70}>
      <div className="text-[13px] font-semibold tracking-[0.04em] text-ink">
        {lander.name} <span className="ml-1 font-normal uppercase text-ink-3">{lander.kind}</span>
      </div>
      <div className={`mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] ${toneText[meta.tone]}`}>
        <span className="h-1.5 w-1.5 rounded-full bg-current" />
        {meta.label}
      </div>
    </StageCallout>);

}

export function SectorLabel() {
  const { t } = useI18n();
  return (
    <StageCallout stem={64}>
      <div className="text-[12px] font-semibold text-ink">{t.stage.ridge}</div>
      <div className="mt-0.5 flex items-center gap-1.5 text-[10px] font-[550] uppercase tracking-[0.12em] text-ink-3">
        <span className="h-1.5 w-1.5 rounded-full bg-ink-3" />
        {t.stage.ridgeType}
      </div>
    </StageCallout>);

}

export function VehicleLabel({ name }: {name: string;}) {
  return (
    <StageCallout stem={32}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-ink">{name}</div>
    </StageCallout>);

}