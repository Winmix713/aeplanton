import { commandDefs } from '../../data/gameCommands';
import type { AdvisorId, GameState, QueueItem } from '../../types/game';
import { simulateLifeSupport, solsOfReserve } from '../colony/lifeSupport';
import { fleetOnline, freeRobots } from '../colony/robots';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';
import { queuedMb, windowCapacity } from './comms';

export interface CheckItem {
  id: string;
  level: 'warn' | 'ok';
  text: Msg;
}

/** Pre-send review of the sequence. Warnings never block — the Director decides. */
export function preSendChecklist(game: GameState, queue: QueueItem[], safe: boolean): CheckItem[] {
  const out: CheckItem[] = [];
  const cmds = queue.map((q) => q.command);
  if (!cmds.length) out.push({ id: 'empty', level: 'warn', text: m('chkEmpty') });

  let verified = game.waypointsVerified;
  let unverifiedDrive = false;
  let unpreppedSample = false;
  let sterile = game.sterile;
  cmds.forEach((c) => {
    if (c === 'navigate') verified = true;
    if (c === 'drive') {
      if (!verified) unverifiedDrive = true;
      verified = false;
    }
    if (c === 'prep') sterile = true;
    if (c === 'sample' && !sterile) unpreppedSample = true;
  });
  if (unverifiedDrive) out.push({ id: 'waypoints', level: 'warn', text: m('chkWaypoints') });
  if (unpreppedSample) out.push({ id: 'sterile', level: 'warn', text: m('chkSterile') });

  const drain = cmds.reduce((s, c) => s + commandDefs[c].power, 0);
  const heated = cmds.includes('heat');
  const projected = game.rover.battery - Math.max(0, drain) + 10 - (heated ? 6 : 15);
  if (projected < 25) out.push({ id: 'battery', level: 'warn', text: m('chkBatteryLow', { pct: Math.max(0, Math.round(projected)), heated: heated ? 1 : '' }) });else
  out.push({ id: 'battery', level: 'ok', text: m('chkBatteryOk', { pct: Math.round(Math.min(100, projected)) }) });

  if (cmds.includes('uplink')) {
    const cap = windowCapacity(game.windows, game.storm.intensity, game.environment.dustIndex);
    const need = queuedMb(game) + (cmds.includes('preparePacket') ? 900 : 0);
    if (need > cap) out.push({ id: 'uplink', level: 'warn', text: m('chkUplinkPartial', { cap, need }) });else
    out.push({ id: 'uplink', level: 'ok', text: m('chkUplinkOk', { cap }) });
  }
  if (game.storm.sols > 0 && !safe) out.push({ id: 'safe', level: 'warn', text: m('chkStorm') });

  // ARES-1 life support forecast for tonight.
  const ls = simulateLifeSupport(game);
  if (ls.gridLevel > 0) out.push({ id: 'grid', level: 'warn', text: m('chkGrid', { kwh: ls.shortfallKwh, level: ls.gridLevel }) });else
  out.push({ id: 'grid', level: 'ok', text: m('chkGridOk', { kwh: ls.batteryAfter }) });
  const o2Sols = solsOfReserve(game.colony.resources.o2, ls.o2);
  if (o2Sols < 8) out.push({ id: 'o2', level: 'warn', text: m('chkO2', { n: o2Sols }) });
  const waterSols = solsOfReserve(game.colony.resources.water, ls.water);
  if (waterSols < 8) out.push({ id: 'water', level: 'warn', text: m('chkWater', { n: waterSols }) });

  // Robots: cumulative demand per fleet across the sequence.
  const demand: Partial<Record<AdvisorId, number>> = {};
  cmds.forEach((c) => {
    const robots = commandDefs[c].robots ?? {};
    (Object.keys(robots) as AdvisorId[]).forEach((id) => demand[id] = (demand[id] ?? 0) + (robots[id] ?? 0));
  });
  (Object.keys(demand) as AdvisorId[]).forEach((id) => {
    const f = game.colony.fleets[id];
    if (!fleetOnline(f) || (demand[id] ?? 0) > freeRobots(f)) out.push({ id: `robots-${id}`, level: 'warn', text: m('chkRobots', { code: id.toUpperCase(), need: demand[id] ?? 0, free: freeRobots(f) }) });
  });
  return out;
}