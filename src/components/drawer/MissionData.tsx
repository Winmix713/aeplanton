import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import type { GameState } from '../../types/game';
import { healthTone } from '../../utils/tone';
import { Meter } from '../shared/Meter';
import { EventsLog } from '../views/EventsLog';
import { InventoryList } from '../views/InventoryList';
import { MissionTimeline } from './MissionTimeline';

/** Drawer body: the long view of the mission, grouped by how often it is consulted. */
export function MissionData({ game }: {game: GameState;}) {
  const { t } = useI18n();
  const r = game.rover;
  return (
    <div className="grid gap-x-8 gap-y-6 lg:grid-cols-[1.4fr_1fr_1fr]">
      <section aria-label={t.missionData.timeline} className="lg:col-span-3">
        <h3 className="hud-label mb-2">{t.missionData.timeline}</h3>
        <MissionTimeline game={game} />
      </section>
      <section aria-label={t.missionData.recent}>
        <h3 className="hud-label mb-2.5">{t.missionData.recent}</h3>
        <EventsLog events={game.events} limit={6} />
      </section>
      <section aria-label={t.missionData.health}>
        <h3 className="hud-label mb-2.5">{t.missionData.health}</h3>
        <div className="space-y-3">
          <Meter label={t.systems.battery} value={`${Math.round(r.battery)}%`} fraction={r.battery / 100} tone={healthTone(r.battery)} />
          <Meter label={t.systems.wheels} value={`${Math.round(r.wheels)}%`} fraction={r.wheels / 100} tone={healthTone(r.wheels)} />
          <Meter label={t.systems.drill} value={`${Math.round(r.drill)}%`} fraction={r.drill / 100} tone={healthTone(r.drill)} />
          <Meter label={t.systems.dust} value={`${Math.round(r.dust * 100)}%`} fraction={r.dust} tone={r.dust > 0.5 ? 'amber' : 'neutral'} />
        </div>
      </section>
      <section aria-label={t.missionData.inventory}>
        <h3 className="hud-label mb-1">{t.missionData.inventory}</h3>
        <InventoryList game={game} />
      </section>
    </div>);

}