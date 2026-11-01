import { advisorOrder } from '../../data/advisors';
import { commandDefs } from '../../data/gameCommands';
import type { Fleet, RobotTask } from '../../types/colony';
import type { AdvisorId, CommandId, GameState } from '../../types/game';
import type { Msg } from '../../types/i18n';
import { m } from '../msg';

export function freeRobots(f: Fleet): number {
  return Math.max(0, f.total - f.lost - f.busy);
}

export function fleetOnline(f: Fleet): boolean {
  return f.condition >= 25 && f.total - f.lost > 0;
}

/** Halved below 50 % condition. */
export function fleetEfficiency(f: Fleet): number {
  return f.condition < 50 ? 0.5 : 1;
}

/** Fleet code that blocks this task, or null when every required fleet has the robots. */
export function robotShortage(g: GameState, command: CommandId): AdvisorId | null {
  const need = commandDefs[command].robots ?? {};
  const short = (Object.keys(need) as AdvisorId[]).find((id) => {
    const f = g.colony.fleets[id];
    return !fleetOnline(f) || freeRobots(f) < (need[id] ?? 0);
  });
  return short ?? null;
}

function worstFleet(g: GameState): AdvisorId {
  return advisorOrder.reduce((a, b) => g.colony.fleets[b].condition < g.colony.fleets[a].condition ? b : a, advisorOrder[0]);
}

/** Applies the task's payoff and returns a short detail line. */
export function applyTaskEffect(g: GameState, command: CommandId, eff: number): Msg {
  const c = g.colony;
  switch (command) {
    case 'cleanSolar':
      c.solarDust = Math.max(0, c.solarDust - 0.1 * eff);
      return m('taskSolarDust', { pct: Math.round(c.solarDust * 100) });
    case 'harvestRegolith':{
        const n = Math.round(30 * eff);
        c.resources.regolith += n;
        return m('taskRegolith', { n, total: Math.round(c.resources.regolith) });
      }
    case 'mineIce':{
        const n = Math.round(120 * eff);
        c.resources.water += n;
        c.resources.regolith += 10;
        return m('taskIce', { n });
      }
    case 'serviceModules':{
        const id = (['sabatier', 'wrs', 'electrolysis'] as const).reduce((a, b) => c.modules[b].integrity < c.modules[a].integrity ? b : a);
        c.modules[id].integrity = Math.min(100, c.modules[id].integrity + 30 * eff);
        c.modules[id].failed = false;
        return m('taskModule', { id, pct: Math.round(c.modules[id].integrity) });
      }
    case 'repairFleet':{
        const id = worstFleet(g);
        c.fleets[id].condition = Math.min(100, c.fleets[id].condition + 35);
        return m('taskFleet', { code: id.toUpperCase(), pct: Math.round(c.fleets[id].condition) });
      }
    case 'reinforceTube':
      c.lavaTube = Math.min(100, c.lavaTube + 20 * eff);
      return m('taskTube', { pct: Math.round(c.lavaTube) });
    case 'calibrateAntenna':
      c.morale = Math.min(100, c.morale + 5 * eff);
      return m('taskAntenna', { pct: Math.round(c.morale) });
    default:
      return m('routine');
  }
}

export interface DispatchResult {
  ok: boolean;
  title: Msg;
  detail: Msg;
}

/** Locks robots for a task. One-Sol tasks pay off immediately; longer ones complete in the night tick. */
export function dispatchTask(g: GameState, command: CommandId): DispatchResult {
  const def = commandDefs[command];
  const c = g.colony;
  const short = robotShortage(g, command);
  if (short) return { ok: false, title: m('robotShortage', { code: short.toUpperCase() }), detail: m('robotShortageDetail', { cmd: command }) };
  if (def.regolith && c.resources.regolith < def.regolith) {
    return { ok: false, title: m('stepRefused', { cmd: command }), detail: m('needRegolith', { n: def.regolith }) };
  }
  if (def.regolith) c.resources.regolith -= def.regolith;
  const robots = def.robots ?? {};
  const fleetIds = Object.keys(robots) as AdvisorId[];
  fleetIds.forEach((id) => c.fleets[id].busy += robots[id] ?? 0);
  const eff = fleetIds.length ? Math.min(...fleetIds.map((id) => fleetEfficiency(c.fleets[id]))) : 1;
  const duration = def.duration ?? 1;
  const task: RobotTask = { id: g.nextId++, command, robots, solsLeft: duration, efficiency: eff };
  c.tasks.push(task);
  if (duration <= 1) {
    const detail = applyTaskEffect(g, command, eff);
    return { ok: true, title: m('taskDone', { cmd: command }), detail };
  }
  return { ok: true, title: m('taskStarted', { cmd: command }), detail: m('taskEta', { n: duration }) };
}

/** Advances robot tasks one Sol; returns commands that completed multi-Sol work tonight. */
export function advanceTasks(g: GameState): {command: CommandId;detail: Msg;}[] {
  const c = g.colony;
  const done: {command: CommandId;detail: Msg;}[] = [];
  c.tasks.forEach((t) => t.solsLeft -= 1);
  c.tasks.
  filter((t) => t.solsLeft <= 0).
  forEach((t) => {
    (Object.keys(t.robots) as AdvisorId[]).forEach((id) => c.fleets[id].busy = Math.max(0, c.fleets[id].busy - (t.robots[id] ?? 0)));
    if ((commandDefs[t.command].duration ?? 1) > 1) done.push({ command: t.command, detail: applyTaskEffect(g, t.command, t.efficiency) });
  });
  c.tasks = c.tasks.filter((t) => t.solsLeft > 0);
  return done;
}