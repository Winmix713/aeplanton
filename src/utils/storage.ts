import { actForSol } from '../data/acts';
import { missions } from '../data/missions';
import type { GameState, LeaderboardEntry, SlotSummary } from '../types/game';
import { refreshAp } from './colony/ap';
import { nextMission } from './colony/missions';
import { createColony } from './colony/setup';
import { pillarsDone } from './game/pillars';

/** v3 → v4: adds the ARES 2051 colony layer and maps the four-act campaign onto six acts. */
function toV4(g: GameState): GameState {
  const next = {
    ...g,
    version: 4 as const,
    act: actForSol(g.sol).id,
    colony: createColony(),
    reports: (g.reports ?? []).map((r) => ({ ...r, act: actForSol(r.sol).id }))
  } satisfies GameState;
  // Story missions already past are treated as quietly resolved by the previous command staff.
  next.colony.missionsDone = Object.fromEntries(missions.filter((mi) => mi.sol < g.sol).map((mi) => [mi.id, mi.options[0].id]));
  next.colony.pendingMission = nextMission(next);
  refreshAp(next);
  return next;
}

const SLOT_KEY = (slot: number) => `aether.slot.${slot}.v1`;
const LB_KEY = 'aether.leaderboard.v1';
export const SLOT_COUNT = 3;

function read<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) as T : null;
  } catch {
    return null;
  }
}

function write(key: string, value: unknown): boolean {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

/** Upgrades v2 campaigns without discarding the player's run. Text records remain readable through the i18n fallback. */
function migrate(raw: unknown): GameState | null {
  if (!raw || typeof raw !== 'object') return null;
  const version = (raw as {version?: number;}).version;
  const g = raw as GameState;
  if (version === 4) return g;
  if (version === 3) return toV4(g);
  if (version !== 2) return null;
  const c012 = g.pillars?.science?.c012;
  const migratedSampleState = c012 === 'uplinked' ? 'uplinked' : c012 === 'analyzed' ? 'analyzed' : c012 === 'sealed' ? 'sealed' : 'none';
  const fallbackEnvironment = {
    dayTempC: -8,
    pressurePa: 675,
    windMs: 5,
    dustIndex: g.rover?.dust ?? 0.18,
    solarIrradiance: 520,
    daylightHours: 12.1,
    visibilityKm: 27,
    scienceQuality: 0.98
  };
  const migrated = {
    ...g,
    version: 3 as unknown as 4,
    act: actForSol(g.sol).id,
    environment: g.environment ?? fallbackEnvironment,
    sample: g.sample ?? {
      id: 'C-012',
      state: migratedSampleState,
      location: 'Delta Ridge',
      selectedSol: c012 === 'none' ? null : Math.max(1, g.sol - 2),
      collectedSol: c012 === 'none' ? null : Math.max(1, g.sol - 1),
      type: 'biosignatureCandidate' as const,
      mineralogy: c012 === 'none' ? [] : ['clay', 'sulfate'],
      quality: c012 === 'none' ? 0 : 82,
      contaminated: c012 === 'none' ? null : false,
      storage: c012 === 'none' ? 'uncollected' as const : 'tube' as const,
      analysis: c012 === 'analyzed' || c012 === 'uplinked' ? 'organicsDetected' as const : 'pending' as const,
      uploaded: c012 === 'uplinked'
    },
    pillars: {
      ...g.pillars,
      science: { ...g.pillars.science, c012: migratedSampleState }
    },
    reports: (g.reports ?? []).map((report) => ({
      ...report,
      environment: report.environment ?? fallbackEnvironment,
      act: actForSol(report.sol).id
    })),
    storm: {
      ...g.storm,
      chainId: g.storm?.sols > 0 ? `legacy-storm-${g.sol}` : null,
      chainStep: g.storm?.sols > 0 ? 1 : 0
    },
    advisors: Object.fromEntries(
      Object.entries(g.advisors).map(([id, a]) => [id, { ...a, justifiedRejections: (a as {justifiedRejections?: number;}).justifiedRejections ?? 0 }])
    ) as GameState['advisors'],
    stats: { ...g.stats, discoveries: g.stats?.discoveries ?? 0, eventChainsBroken: g.stats?.eventChainsBroken ?? 0 }
  } as GameState;
  return toV4(migrated);
}

export function saveGame(game: GameState): boolean {
  return write(SLOT_KEY(game.slot), { savedAt: Date.now(), game });
}

export function loadGame(slot: number): GameState | null {
  const data = read<{savedAt: number;game: unknown;}>(SLOT_KEY(slot));
  const game = migrate(data?.game);
  if (game && (data?.game as {version?: number;})?.version !== 4) saveGame(game);
  return game;
}

export function deleteSlot(slot: number): void {
  try {
    localStorage.removeItem(SLOT_KEY(slot));
  } catch {

    /* storage unavailable */}
}

export function listSlots(): (SlotSummary | null)[] {
  return Array.from({ length: SLOT_COUNT }, (_, slot) => {
    const data = read<{savedAt: number;game: unknown;}>(SLOT_KEY(slot));
    const g = migrate(data?.game);
    if (!g) return null;
    return {
      slot,
      savedAt: data?.savedAt ?? Date.now(),
      sol: g.sol,
      difficulty: g.difficulty,
      region: g.region,
      permadeath: g.permadeath,
      pillarsDone: pillarsDone(g),
      ended: !!g.outcome
    };
  });
}

export function loadLeaderboard(): LeaderboardEntry[] {
  return read<LeaderboardEntry[]>(LB_KEY) ?? [];
}

export function recordRun(game: GameState): void {
  if (!game.outcome) return;
  const list = loadLeaderboard();
  if (list.some((e) => e.id === game.runId)) return;
  list.push({
    id: game.runId,
    date: Date.now(),
    difficulty: game.difficulty,
    region: game.region,
    score: game.outcome.result === 'victory' ? game.score.total : Math.round(game.score.total * 0.5),
    medal: game.outcome.medal,
    sol: game.sol,
    result: game.outcome.result,
    permadeath: game.permadeath
  });
  list.sort((a, b) => b.score - a.score);
  write(LB_KEY, list.slice(0, 50));
}