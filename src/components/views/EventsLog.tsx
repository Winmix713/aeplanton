import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameEvent } from '../../types/game';
import { toneBg } from '../../utils/tone';

export function EventsLog({ events, limit = 12 }: {events: GameEvent[];limit?: number;}) {
  const { t, f } = useI18n();
  if (!events.length) return <p className="text-[12px] text-ink-4">{t.eventsLog.none}</p>;
  return (
    <ol className="space-y-2.5">
      {events.slice(0, limit).map((e) => {
        const counterLabel = t.events[e.kind].counter;
        return (
          <li key={e.id} className="grid grid-cols-[52px_8px_1fr] items-start gap-2 text-[12px]">
            <span className="pt-px text-[11px] text-ink-4">
              {t.common.sol} {e.sol}
            </span>
            <span className={`mt-1.5 h-1.5 w-1.5 rounded-full ${toneBg[e.tone]}`} aria-hidden="true" />
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="font-[600] text-ink">{f(e.title)}</span>
                {e.chainStep && e.chainStep > 1 ? <span className="rounded bg-fill-2 px-1.5 py-0.5 text-[9.5px] font-[600] text-ink-4">{t.eventsLog.chain(e.chainStep)}</span> : null}
              </div>
              <div className="text-ink-3">{f(e.detail)}</div>
              {e.counter && counterLabel && <div className="mt-0.5 text-[11px] text-amber">{t.eventsLog.counter(counterLabel, t.commands[e.counter].short)}</div>}
            </div>
          </li>);

      })}
    </ol>);

}