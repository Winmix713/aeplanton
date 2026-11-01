import { missionDef, missions } from '../../data/missions';
import type { GameState } from '../../types/game';
import { m } from '../msg';
import { makeEvent } from '../game/commands';
import { refreshAp } from './ap';
import { applyEffect } from './effects';

/** First story mission that is due and not yet decided. */
export function nextMission(g: GameState): string | null {
  return missions.find((mi) => mi.sol <= g.sol && !g.colony.missionsDone[mi.id])?.id ?? null;
}

/** Commits a mission decision: immediate effect, hidden delayed consequence, AP spend. Returns a new state. */
export function applyMissionChoice(game: GameState, optionId: string): GameState {
  const g = JSON.parse(JSON.stringify(game)) as GameState;
  const id = g.colony.pendingMission;
  const def = id ? missionDef(id) : undefined;
  const option = def?.options.find((o) => o.id === optionId);
  if (!def || !option) return game;
  applyEffect(g, option.effect);
  if (option.delayed) {
    g.colony.pending.push({
      id: g.nextId++,
      sol: g.sol + option.delayed.inSols,
      missionId: def.id,
      optionId: option.id,
      effect: option.delayed.effect,
      cancelledBy: option.delayed.cancelledBy
    });
  }
  g.colony.missionsDone[def.id] = option.id;
  if (def.kind === 'decision') {
    g.events = [makeEvent(g, 'mission', m('missionDecided', { id: def.id }), m('missionChoice', { id: def.id, opt: option.id })), ...g.events].slice(0, 200);
  }
  g.colony.pendingMission = nextMission(g);
  refreshAp(g);
  return g;
}