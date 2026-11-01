import { useCallback, useEffect, useRef, useState } from 'react';
import { unlockedCommands } from '../data/acts';
import { difficultyDef } from '../data/difficulty';
import { commandAp, sequenceAp } from '../data/gameCommands';
import { useI18n } from '../contexts/LanguageContext';
import type { CommandId, GamePhase, GameState, NewGameOptions, Proposal, QueueItem, SolReport, TimeSpeed } from '../types/game';
import type { ToastMessage, ToastTone } from '../types/rover';
import type { ModuleId, ModuleMode } from '../types/colony';
import { refreshAp } from '../utils/colony/ap';
import { applyMissionChoice } from '../utils/colony/missions';
import { resolveSol } from '../utils/game/resolve';
import { createGame } from '../utils/game/setup';
import { haptic } from '../utils/haptics';
import { playCue } from '../utils/sound';
import { deleteSlot, loadGame, recordRun, saveGame } from '../utils/storage';

export type Screen = 'title' | 'setup' | 'leaderboard' | 'game';

interface Playback {
  report: SolReport;
  next: GameState;
  elapsed: number;
  uplinkDur: number;
  done?: boolean;
}

interface Snapshot {
  game: GameState;
  queue: QueueItem[];
  accepted: string[];
  safe: boolean;
}

export const STEP_S = 2.4;
export const NIGHT_S = 2.6;

function playbackPhase(pb: Playback): GamePhase {
  if (pb.elapsed < pb.uplinkDur) return 'uplink';
  if (pb.elapsed < pb.uplinkDur + pb.report.steps.length * STEP_S) return 'executing';
  return 'night';
}

export function useGame(startScreen: 'title' | 'game') {
  const [screen, setScreen] = useState<Screen>(startScreen === 'game' ? 'game' : 'title');
  const [game, setGame] = useState<GameState | null>(() =>
  startScreen === 'game' ? createGame({ difficulty: 'engineer', region: 'chryse', slot: 0, permadeath: false, seed: 4242 }) : null
  );
  const [basePhase, setPhase] = useState<GamePhase>('planning');
  const [queue, setQueue] = useState<QueueItem[]>([]);
  const [accepted, setAccepted] = useState<string[]>([]);
  const [safe, setSafe] = useState(false);
  const [speed, setSpeed] = useState<TimeSpeed>(1);
  const [paused, setPaused] = useState(false);
  const [playback, setPlayback] = useState<Playback | null>(null);
  const phase: GamePhase = playback ? playbackPhase(playback) : basePhase;
  const [report, setReport] = useState<SolReport | null>(null);
  const [debriefOpen, setDebriefOpen] = useState(false);
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const i18n = useI18n();
  const tr = useRef(i18n);
  tr.current = i18n;
  const snapshot = useRef<Snapshot | null>(null);
  const uid = useRef(1);
  const revealed = useRef(-1);

  const notify = useCallback((text: string, tone: ToastTone = 'info') => {
    setToast({ id: Date.now() + Math.random(), text, tone });
    haptic(tone === 'warn' ? 'error' : tone === 'ok' ? 'success' : 'light');
  }, []);
  useEffect(() => {
    if (!toast) return;
    const id = window.setTimeout(() => setToast(null), 2600);
    return () => window.clearTimeout(id);
  }, [toast]);

  const queueAp = sequenceAp(queue.map((item) => item.command));
  const capacity = game ? game.apBudget - (safe ? 1 : 0) : 0;

  const resetPlanning = useCallback(() => {
    setQueue([]);
    setAccepted([]);
    setPhase('planning');
    setPlayback(null);
    revealed.current = -1;
  }, []);

  // ——— Setup & saves ———
  const startNew = useCallback(
    (opts: NewGameOptions) => {
      const g = createGame(opts);
      saveGame(g);
      setGame(g);
      setSafe(false);
      setSpeed(1);
      setPaused(false);
      setReport(null);
      setDebriefOpen(false);
      snapshot.current = null;
      resetPlanning();
      setScreen('game');
      notify(tr.current.t.toast.started, 'ok');
    },
    [notify, resetPlanning]
  );

  const loadSlot = useCallback(
    (slot: number) => {
      const g = loadGame(slot);
      if (!g) {
        notify(tr.current.t.toast.slotEmpty, 'warn');
        return;
      }
      setGame(g);
      setReport(null);
      setDebriefOpen(!!g.outcome);
      snapshot.current = null;
      resetPlanning();
      setScreen('game');
      notify(tr.current.t.toast.loaded(slot + 1, g.sol), 'ok');
    },
    [notify, resetPlanning]
  );

  const saveNow = useCallback(
    (slot?: number) => {
      if (!game) return;
      const g = slot === undefined || game.permadeath ? game : { ...game, slot };
      if (saveGame(g)) {
        setGame(g);
        notify(tr.current.t.toast.saved(g.slot + 1), 'ok');
      } else notify(tr.current.t.toast.saveFailed, 'warn');
    },
    [game, notify]
  );

  const quitToTitle = useCallback(() => {
    if (game && !game.outcome && phase === 'planning') saveGame(game);
    setScreen('title');
    setDebriefOpen(false);
  }, [game, phase]);

  // ——— Sequence building ———
  const addCommand = useCallback(
    (command: CommandId) => {
      if (phase !== 'planning' || !game) return;
      if (!unlockedCommands(game.sol).has(command)) {
        notify(tr.current.t.toast.commandLocked, 'warn');
        return;
      }
      const cost = commandAp(command);
      if (queueAp + cost > capacity) {
        notify(tr.current.t.toast.noAp(capacity), 'warn');
        return;
      }
      setQueue((q) => [...q, { uid: uid.current++, command, source: 'manual' }]);
      playCue('tick');
    },
    [phase, game, queueAp, capacity, notify]
  );

  const acceptProposal = useCallback(
    (p: Proposal) => {
      if (phase !== 'planning') return;
      if (accepted.includes(p.id)) {
        setAccepted((a) => a.filter((id) => id !== p.id));
        setQueue((q) => q.filter((i) => i.proposalId !== p.id));
        return;
      }
      const cost = sequenceAp(p.commands);
      if (queueAp + cost > capacity) {
        notify(tr.current.t.toast.needsAp(cost, capacity - queueAp), 'warn');
        return;
      }
      setAccepted((a) => [...a, p.id]);
      setQueue((q) => [...q, ...p.commands.map((command) => ({ uid: uid.current++, command, source: p.advisor, proposalId: p.id }))]);
      playCue('tick');
    },
    [phase, accepted, queueAp, capacity, notify]
  );

  const removeItem = useCallback(
    (id: number) => {
      if (phase !== 'planning') return;
      setQueue((q) => {
        const item = q.find((i) => i.uid === id);
        const next = q.filter((i) => i.uid !== id);
        if (item?.proposalId && !next.some((i) => i.proposalId === item.proposalId)) {
          setAccepted((a) => a.filter((p) => p !== item.proposalId));
        }
        return next;
      });
    },
    [phase]
  );

  const moveItem = useCallback(
    (id: number, dir: -1 | 1) => {
      if (phase !== 'planning') return;
      setQueue((q) => {
        const i = q.findIndex((x) => x.uid === id);
        const j = i + dir;
        if (i < 0 || j < 0 || j >= q.length) return q;
        const next = q.slice();
        [next[i], next[j]] = [next[j], next[i]];
        return next;
      });
    },
    [phase]
  );

  const toggleSafe = useCallback(() => {
    if (phase !== 'planning') return;
    if (!safe && queueAp >= (game?.apBudget ?? 0)) {
      notify(tr.current.t.toast.safeNeedsAp, 'warn');
      return;
    }
    setSafe((s) => !s);
  }, [phase, safe, queueAp, game, notify]);

  // ——— ARES-1 colony ———
  const chooseMission = useCallback(
    (optionId: string) => {
      if (!game || phase !== 'planning' || !game.colony.pendingMission) return;
      const next = applyMissionChoice(game, optionId);
      setGame(next);
      saveGame(next);
      // Mission AP may push today's queue over budget: trim from the end.
      const cap = next.apBudget - (safe ? 1 : 0);
      setQueue((q) => {
        const out: QueueItem[] = [];
        let used = 0;
        q.forEach((item) => {
          const c = commandAp(item.command);
          if (used + c <= cap) {
            out.push(item);
            used += c;
          }
        });
        return out;
      });
      playCue('ok');
      haptic('medium');
    },
    [game, phase, safe]
  );

  const setModuleMode = useCallback(
    (id: ModuleId, mode: ModuleMode) => {
      if (!game || phase !== 'planning') return;
      const next: GameState = { ...game, colony: { ...game.colony, modules: { ...game.colony.modules, [id]: { ...game.colony.modules[id], mode } } } };
      refreshAp(next);
      if (queueAp + (safe ? 1 : 0) > next.apBudget) {
        notify(tr.current.t.toast.noAp(next.apBudget), 'warn');
        return;
      }
      setGame(next);
      playCue('tick');
    },
    [game, phase, queueAp, safe, notify]
  );

  // ——— Send & playback ———
  const send = useCallback(() => {
    if (!game || phase !== 'planning' || game.outcome) return;
    if (game.colony.pendingMission) {
      notify(tr.current.t.colony.mission.waiting, 'warn');
      return;
    }
    snapshot.current = { game, queue, accepted, safe };
    const res = resolveSol(game, queue, safe, accepted);
    setPlayback({ ...res, elapsed: 0, uplinkDur: Math.max(2, game.delayMin * 0.5) });
    revealed.current = -1;
    setPhase('uplink');
    setPaused(false);
    playCue('send');
    haptic('medium');
  }, [game, phase, queue, accepted, safe, notify]);

  const finishSol = useCallback(
    (pb: Playback) => {
      const next = pb.next;
      setGame(next);
      if (next.outcome) {
        recordRun(next);
        if (next.permadeath && next.outcome.result === 'defeat') deleteSlot(next.slot);else
        saveGame(next);
      } else saveGame(next);
      setReport(pb.report);
      setPhase('report');
      setPlayback(null);
      if (pb.report.events.some((e) => e.tone === 'red')) playCue('alert');else
      playCue('ok');
    },
    []
  );

  const effSpeed = phase === 'executing' ? 1 : speed;
  useEffect(() => {
    if (!playback || paused) return;
    const id = window.setInterval(() => {
      setPlayback((pb) => {
        if (!pb || pb.done) return pb;
        const elapsed = pb.elapsed + 0.1 * effSpeed;
        const execStart = pb.uplinkDur;
        const execEnd = execStart + pb.report.steps.length * STEP_S;
        const nightEnd = execEnd + NIGHT_S;
        if (elapsed >= nightEnd) {
          window.setTimeout(() => finishSol(pb), 0);
          return { ...pb, elapsed: nightEnd, done: true };
        }
        const nextPhase: GamePhase = elapsed < execStart ? 'uplink' : elapsed < execEnd ? 'executing' : 'night';
        if (nextPhase === 'executing') {
          const idx = Math.floor((elapsed - execStart) / STEP_S);
          const doneIdx = idx - 1;
          if (doneIdx > revealed.current) {
            revealed.current = doneIdx;
            const s = pb.report.steps[doneIdx];
            if (s) window.setTimeout(() => notify(tr.current.f(s.title), s.ok ? 'ok' : 'warn'), 0);
          }
        } else if (nextPhase === 'night' && revealed.current < pb.report.steps.length - 1) {
          revealed.current = pb.report.steps.length - 1;
          const s = pb.report.steps[revealed.current];
          if (s) window.setTimeout(() => notify(tr.current.f(s.title), s.ok ? 'ok' : 'warn'), 0);
        }
        return { ...pb, elapsed };
      });
    }, 100);
    return () => window.clearInterval(id);
  }, [playback !== null, paused, effSpeed, finishSol, notify]); // eslint-disable-line react-hooks/exhaustive-deps

  const continueAfterReport = useCallback(() => {
    setReport(null);
    if (game?.outcome) {
      setDebriefOpen(true);
      return;
    }
    resetPlanning();
  }, [game, resetPlanning]);

  const canUndo = !!game && !!snapshot.current && difficultyDef(game.difficulty).undo && !game.permadeath && phase === 'report';
  const undo = useCallback(() => {
    const s = snapshot.current;
    if (!s || !canUndo) return;
    setGame(s.game);
    saveGame(s.game);
    setReport(null);
    setDebriefOpen(false);
    setPlayback(null);
    setQueue(s.queue);
    setAccepted(s.accepted);
    setSafe(s.safe);
    setPhase('planning');
    snapshot.current = null;
    notify(tr.current.t.toast.restored(s.game.sol), 'info');
  }, [canUndo, notify]);

  /** Resolves several idle Sols (rest + heat) without playback; stops early on red events. */
  const restSols = useCallback(
    (count: number) => {
      if (!game || phase !== 'planning' || game.outcome) return;
      if (game.colony.pendingMission) {
        notify(tr.current.t.colony.mission.waiting, 'warn');
        return;
      }
      let g = game;
      let last: SolReport | null = null;
      let ran = 0;
      for (let i = 0; i < count; i++) {
        const q: QueueItem[] = [
        { uid: uid.current++, command: 'rest', source: 'manual' },
        { uid: uid.current++, command: 'heat', source: 'manual' }];

        const res = resolveSol(g, q, false, []);
        g = res.next;
        last = res.report;
        ran++;
        if (g.outcome || g.colony.pendingMission || res.report.events.some((e) => e.tone === 'red')) break;
      }
      snapshot.current = null;
      if (last) finishSol({ next: g, report: { ...last, restSkip: ran }, elapsed: 0, uplinkDur: 0 });
    },
    [game, phase, finishSol, notify]
  );

  const progress = playback ?
  (() => {
    const execStart = playback.uplinkDur;
    const total = execStart + playback.report.steps.length * STEP_S + NIGHT_S;
    const stepIdx = Math.min(playback.report.steps.length - 1, Math.floor((playback.elapsed - execStart) / STEP_S));
    return {
      uplinkLeft: Math.max(0, execStart - playback.elapsed),
      uplinkDur: execStart,
      stepIndex: playback.elapsed < execStart ? -1 : stepIdx,
      fraction: playback.elapsed / total,
      steps: playback.report.steps
    };
  })() :
  null;

  const apUsed = queueAp + (safe ? 1 : 0);

  return {
    screen,
    setScreen,
    game,
    phase,
    queue,
    accepted,
    safe,
    speed,
    setSpeed,
    paused,
    togglePause: () => setPaused((p) => !p),
    progress,
    playbackNext: playback?.next ?? null,
    report,
    debriefOpen,
    closeDebrief: () => setDebriefOpen(false),
    toast,
    notify,
    capacity,
    apUsed,
    startNew,
    loadSlot,
    saveNow,
    quitToTitle,
    addCommand,
    acceptProposal,
    removeItem,
    moveItem,
    toggleSafe,
    clearQueue: () => {
      setQueue([]);
      setAccepted([]);
    },
    send,
    continueAfterReport,
    canUndo,
    undo,
    restSols,
    chooseMission,
    setModuleMode,
    commandLabel: (c: CommandId) => i18n.t.commands[c].label
  };
}