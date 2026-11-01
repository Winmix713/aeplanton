import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { advisorOrder, advisors } from '../../data/advisors';
import { commandDefs } from '../../data/gameCommands';
import type { AdvisorId, GameState } from '../../types/game';
import { fleetOnline, freeRobots } from '../../utils/colony/robots';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { Panel } from '../shared/Panel';

/** ARN robot network: four fleets of fifty, their wear and the tasks they are locked into. */
export function RoboticsPanel({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const c = game.colony;
  return (
    <div className="flex flex-col gap-3">
      <Panel title={t.colony.robotics.title}>
        <ul className="space-y-4">
          {advisorOrder.map((id) =>
          <FleetRow key={id} id={id} game={game} />
          )}
        </ul>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-1 text-[11px] text-ink-4" aria-hidden="true">
          <Legend className="bg-ink-3" label={t.colony.robotics.free} />
          <Legend className="bg-amber" label={t.colony.robotics.busy} />
          <Legend className="bg-fill-2 shadow-[inset_0_0_0_1px_var(--red)]" label={t.colony.robotics.lost} />
        </div>
      </Panel>

      <Panel title={t.colony.robotics.tasks}>
        {c.tasks.length ?
        <ul className="divide-y divide-line">
            {c.tasks.map((task) => {
            const Icon = commandDefs[task.command].icon;
            return (
              <li key={task.id} className="flex items-center gap-2.5 py-2 first:pt-0 last:pb-0">
                  <Icon size={14} strokeWidth={1.7} className="shrink-0 text-amber" />
                  <span className="min-w-0 flex-1 truncate text-[12.5px] font-[600] text-ink">{t.commands[task.command].label}</span>
                  <span className="text-[11px] text-ink-4">
                    {(Object.keys(task.robots) as AdvisorId[]).map((f) => `${task.robots[f]} ${advisors[f].code}`).join(' · ')}
                  </span>
                  <span className="w-[72px] text-right text-[11px] font-[600] text-ink-2">{t.colony.robotics.solsLeft(task.solsLeft)}</span>
                </li>);

          })}
          </ul> :

        <p className="text-[12px] text-ink-4">{t.colony.robotics.noTasks}</p>
        }
        <p className="mt-3 text-[11px] leading-relaxed text-ink-4">{t.colony.robotics.note}</p>
      </Panel>
    </div>);

}

function FleetRow({ id, game }: {id: AdvisorId;game: GameState;}) {
  const { t } = useI18n();
  const f = game.colony.fleets[id];
  const online = fleetOnline(f);
  const free = freeRobots(f);
  const slots = Array.from({ length: f.total }, (_, i) => i < f.lost ? 'lost' : i < f.lost + f.busy ? 'busy' : 'free');
  return (
    <li aria-label={t.colony.robotics.fleetAria(advisors[id].code)}>
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-[12.5px] font-[650] tracking-[0.06em] text-ink">
          {advisors[id].code} <span className="font-normal tracking-normal text-ink-4">· {advisors[id].lead}</span>
        </span>
        <span className={`whitespace-nowrap text-[11.5px] font-[600] ${online ? 'text-ink-2' : 'text-red'}`}>
          {online ? t.colony.robotics.total(free, f.total - f.lost) : t.colony.robotics.offline}
        </span>
      </div>
      <div className="mt-2 grid grid-cols-[repeat(25,minmax(0,1fr))] gap-[3px]" aria-hidden="true">
        {slots.map((s, i) =>
        <span
          key={i}
          className={`aspect-square rounded-[2px] ${s === 'busy' ? 'bg-amber' : s === 'lost' ? 'bg-fill-2 shadow-[inset_0_0_0_1px_var(--red)]' : online ? 'bg-ink-3' : 'bg-ink-5'}`} />

        )}
      </div>
      <div className="mt-2">
        <Meter
          label={f.condition < 50 && online ? `${t.colony.robotics.condition} · ${t.colony.robotics.halved}` : t.colony.robotics.condition}
          value={`${Math.round(f.condition)}%`}
          fraction={f.condition / 100}
          tone={healthTone(f.condition)}
          marker={0.5} />
        
      </div>
    </li>);

}

function Legend({ className, label }: {className: string;label: string;}) {
  return (
    <span className="inline-flex items-center gap-1.5">
      <span className={`h-2 w-2 rounded-[2px] ${className}`} />
      {label}
    </span>);

}