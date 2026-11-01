import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { COMMS_STREAK } from '../../data/pillars';
import type { GameState, Station } from '../../types/game';
import { queuedMb, windowCapacity } from '../../utils/game/comms';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

const STATIONS: Station[] = ['Madrid', 'Goldstone', 'MRO', 'TGO', 'Relay'];

export function CommsPanel({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const cap = windowCapacity(game.windows, game.storm.intensity, game.environment.dustIndex);
  const need = queuedMb(game);
  const c = game.pillars.comms;
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.comms.windows(game.sol)} aside={<span className="whitespace-nowrap text-[11px] font-[600] text-blue">{t.comms.capacity(cap)}</span>}>
        <div className="space-y-2" role="list" aria-label={t.comms.listAria}>
          {STATIONS.map((st) => {
            const ws = game.windows.filter((w) => w.station === st);
            return (
              <div key={st} role="listitem" className="grid grid-cols-[72px_1fr] items-center gap-2">
                <span className={`text-[11.5px] ${ws.length ? 'text-ink-2' : 'text-ink-4'}`}>{st}</span>
                <div className="relative h-4 rounded bg-fill-1">
                  {ws.map((w, i) =>
                  <span
                    key={i}
                    className="absolute inset-y-0.5 rounded-sm bg-blue"
                    style={{ left: `${w.start / 24 * 100}%`, width: `${Math.max(1.2, (w.end - w.start) / 24 * 100)}%` }}
                    title={`${st} · ${w.start.toFixed(1)}–${w.end.toFixed(1)} h · ${w.mbps} Mbps`} />

                  )}
                  {!ws.length && <span className="absolute inset-0 grid place-items-center text-[10px] text-ink-4">{st === 'Relay' ? t.comms.notBuilt : t.comms.noPass}</span>}
                </div>
              </div>);

          })}
          <div className="grid grid-cols-[72px_1fr] gap-2 text-[10px] text-ink-4">
            <span />
            <span className="flex justify-between">
              <span>00</span>
              <span>06</span>
              <span>12</span>
              <span>18</span>
              <span>{t.comms.axisEnd}</span>
            </span>
          </div>
        </div>
        {game.storm.sols > 0 && <p className="mt-2 text-[11.5px] text-red">{t.comms.storm}</p>}
      </Panel>

      <Panel title={t.comms.queue} aside={<span className={`whitespace-nowrap text-[11px] font-[600] ${need > cap ? 'text-amber' : 'text-ink-3'}`}>{t.comms.waiting(need)}</span>}>
        {game.dataQueue.length ?
        <ul className="space-y-2">
            {game.dataQueue.map((p) =>
          <li key={p.id} className="flex items-center justify-between rounded-lg bg-fill-1 px-3 py-2 text-[12.5px]">
                <span className="text-ink">{t.packets[p.kind]}</span>
                <span className="text-ink-3">{p.mb} MB</span>
              </li>
          )}
          </ul> :

        <p className="text-[12px] text-ink-4">{t.comms.queueEmpty}</p>
        }
      </Panel>

      <Panel title={t.comms.relay}>
        <div className="space-y-3">
          <Meter label={t.comms.tower} value={t.comms.towerValue(Math.round(c.relay), game.inventory.relayKits)} fraction={c.relay / 100} tone={c.relay >= 100 ? 'green' : 'blue'} />
          <Meter
            label={t.comms.unbroken}
            value={t.systems.sols(Math.min(c.streak, COMMS_STREAK), COMMS_STREAK)}
            fraction={Math.min(1, c.streak / COMMS_STREAK)}
            tone={c.streak >= COMMS_STREAK ? 'green' : 'blue'} />
          
        </div>
        <p className="mt-3 text-[11.5px] text-ink-4">{t.comms.note(game.delayMin)}</p>
      </Panel>
    </div>);

}