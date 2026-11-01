import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronLeftIcon, ChevronRightIcon, MoonIcon, SendIcon, ShieldIcon, XIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import { commandUnlockSol, unlockedCommands } from '../../data/acts';
import { advisors } from '../../data/advisors';
import { commandAp, commandDefs, paletteOrder, sequenceAp } from '../../data/gameCommands';
import type { AdvisorId, CommandId, GameState, QueueItem } from '../../types/game';
import { freeRobots, robotShortage } from '../../utils/colony/robots';
import { preSendChecklist } from '../../utils/game/checklist';
import { exitTransition, menuEnterTransition } from '../../utils/motion';
import { PreSendChecklist } from './PreSendChecklist';

interface SequenceDockProps {
  game: GameState;
  queue: QueueItem[];
  safe: boolean;
  capacity: number;
  onAdd: (c: CommandId) => void;
  onRemove: (uid: number) => void;
  onMove: (uid: number, dir: -1 | 1) => void;
  onToggleSafe: () => void;
  onSend: () => void;
  onRest: (sols: number) => void;
}

export function SequenceDock({ game, queue, safe, capacity, onAdd, onRemove, onMove, onToggleSafe, onSend, onRest }: SequenceDockProps) {
  const { t } = useI18n();
  const [confirm, setConfirm] = useState(false);
  const checks = useMemo(() => preSendChecklist(game, queue, safe), [game, queue, safe]);
  const warnings = checks.filter((c) => c.level === 'warn');
  const queueAp = sequenceAp(queue.map((item) => item.command));
  const full = queueAp >= capacity;
  const unlocked = useMemo(() => unlockedCommands(game.sol), [game.sol]);
  const ap = game.colony.ap;
  const apParts = (['base', 'infrastructure', 'loyalty', 'friction', 'environment', 'upkeep', 'grid', 'safeMode', 'mission'] as const).
  map((key) => ({ key, value: ap[key] })).
  filter((part) => part.key === 'base' || part.value !== 0);
  const robotsLabel = (id: CommandId) => {
    const robots = commandDefs[id].robots;
    if (!robots) return '';
    return ` · ${(Object.keys(robots) as AdvisorId[]).map((f) => `${robots[f]} ${advisors[f].code} (${freeRobots(game.colony.fleets[f])} ${t.colony.robotics.free.toLowerCase()})`).join(', ')}`;
  };

  const trySend = () => {
    if (warnings.length) setConfirm(true);else
    onSend();
  };

  return (
    <section aria-label={t.dock.aria} className="glass glass-strong relative w-full rounded-[22px] p-3">
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 px-1">
        <div className="leading-tight">
          <h2 className="text-[13px] font-[650] text-ink">{t.dock.title(game.sol)}</h2>
          <p className="text-[11px] text-ink-4">{t.dock.executes(game.delayMin)}</p>
        </div>
        <div className="flex items-center gap-2" aria-label={t.dock.apAria(queueAp + (safe ? 1 : 0), game.apBudget)}>
          <span className="hud-label">{t.common.ap}</span>
          <span className="flex gap-1">
            {Array.from({ length: game.apBudget }, (_, i) => {
              const used = i < queueAp;
              const safeSlot = safe && i === game.apBudget - 1;
              return <span key={i} className={`h-2.5 w-2.5 rounded-full transition-colors duration-150 ${safeSlot ? 'bg-blue' : used ? 'bg-amber' : 'bg-ink-5'}`} />;
            })}
          </span>
          {game.rover.safeModeSols > 0 && <span className="text-[11px] text-red">{t.dock.safeModePenalty}</span>}
        </div>
        <p className="hidden min-w-0 truncate text-[11px] text-ink-4 xl:block" title={t.colony.ap.title}>
          {apParts.
          map((part) => `${part.value > 0 && part.key !== 'base' ? '+' : ''}${part.value} ${t.colony.ap[part.key].toLowerCase()}`).
          join(' · ')}
        </p>

        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={() => onRest(3)}
            title={t.dock.restTitle}
            className="hidden h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3 text-[12px] font-[600] text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink sm:inline-flex">
            
            <MoonIcon size={13} strokeWidth={1.8} />
            {t.dock.rest}
          </button>
          <button
            type="button"
            role="switch"
            aria-checked={safe}
            onClick={onToggleSafe}
            title={t.dock.safeTitle}
            className={`inline-flex h-9 items-center gap-2 rounded-full border px-3 text-[12px] font-[600] transition-colors duration-150 ${
            safe ? 'border-blue bg-blue-soft text-blue' : 'border-line-2 text-ink-3 hover:text-ink'}`
            }>
            
            <ShieldIcon size={13} strokeWidth={1.8} />
            {safe ? t.dock.safe : t.dock.auto}
          </button>
          <div className="relative">
            <button
              type="button"
              onClick={trySend}
              className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-4 text-[12.5px] font-[650] text-obsidian transition-[filter,transform] duration-150 hover:brightness-110 active:scale-[0.97]">
              
              <SendIcon size={13} strokeWidth={2} />
              {t.dock.send}
              {warnings.length > 0 && <span className="grid h-4 min-w-[16px] place-items-center rounded-full bg-obsidian px-1 text-[10px] text-amber">{warnings.length}</span>}
            </button>
            <PreSendChecklist
              open={confirm}
              items={checks}
              delayMin={game.delayMin}
              onCancel={() => setConfirm(false)}
              onConfirm={() => {
                setConfirm(false);
                onSend();
              }} />
            
          </div>
        </div>
      </div>

      <ol className="scroll-quiet mt-3 flex min-h-[46px] items-center gap-1.5 overflow-x-auto rounded-[14px] bg-fill-1 p-1.5" aria-label={t.dock.queueAria}>
        <AnimatePresence initial={false}>
          {queue.map((item, i) => {
            const Icon = commandDefs[item.command].icon;
            const tc = t.commands[item.command];
            return (
              <motion.li
                key={item.uid}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1, transition: menuEnterTransition }}
                exit={{ opacity: 0, scale: 0.96, transition: exitTransition }}
                className="group flex shrink-0 items-center gap-1.5 rounded-[11px] bg-fill-2 py-1 pl-2 pr-1 shadow-[inset_0_0_0_1px_var(--line)]">
                
                <span className="text-[10.5px] font-[650] text-ink-4">{i + 1}</span>
                <Icon size={13} strokeWidth={1.7} className="text-amber" />
                <span className="whitespace-nowrap text-[12px] font-[600] text-ink">{tc.short}</span>
                <span className="text-[10px] font-[600] tracking-[0.06em] text-ink-4">{item.source === 'manual' ? t.common.you : advisors[item.source].code}</span>
                <span className="flex opacity-60 transition-opacity duration-150 group-hover:opacity-100 group-focus-within:opacity-100">
                  <button type="button" aria-label={t.dock.moveEarlier(tc.label)} disabled={i === 0} onClick={() => onMove(item.uid, -1)} className="grid h-6 w-5 place-items-center rounded text-ink-3 hover:text-ink disabled:opacity-30">
                    <ChevronLeftIcon size={12} />
                  </button>
                  <button type="button" aria-label={t.dock.moveLater(tc.label)} disabled={i === queue.length - 1} onClick={() => onMove(item.uid, 1)} className="grid h-6 w-5 place-items-center rounded text-ink-3 hover:text-ink disabled:opacity-30">
                    <ChevronRightIcon size={12} />
                  </button>
                  <button type="button" aria-label={t.dock.remove(tc.label)} onClick={() => onRemove(item.uid)} className="grid h-6 w-6 place-items-center rounded text-ink-3 hover:text-red">
                    <XIcon size={12} />
                  </button>
                </span>
              </motion.li>);

          })}
        </AnimatePresence>
        {!queue.length && <li className="px-2 text-[12px] text-ink-4">{t.dock.empty}</li>}
      </ol>

      <div className="scroll-quiet mt-2 flex gap-1 overflow-x-auto" role="toolbar" aria-label={t.dock.paletteAria}>
        {paletteOrder.map((id) => {
          const def = commandDefs[id];
          const tc = t.commands[id];
          const Icon = def.icon;
          const locked = !unlocked.has(id);
          const cost = commandAp(id);
          const unaffordable = queueAp + cost > capacity;
          return (
            <button
              key={id}
              type="button"
              disabled={full || locked || unaffordable}
              onClick={() => onAdd(id)}
              title={locked ? t.dock.unlocks(commandUnlockSol(id)) : `${tc.label} · ${tc.description} · ${t.dock.apCost(cost)}${def.power ? ` · ${t.dock.battery(def.power)}` : ''}${robotsLabel(id)}`}
              className="relative flex h-12 min-w-[60px] shrink-0 flex-col items-center justify-center gap-0.5 rounded-[12px] px-2 text-ink-3 transition-colors duration-150 hover:bg-fill-2 hover:text-ink disabled:cursor-not-allowed disabled:opacity-35">
              
              <Icon size={15} strokeWidth={1.5} />
              <span className="whitespace-nowrap text-[10.5px] font-[600]">{tc.short} · {cost}</span>
              {locked && <span className="absolute right-1 top-1 text-[8px] font-[700] text-amber">S{commandUnlockSol(id)}</span>}
              {!locked && def.robots && <span className={`absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full ${robotShortage(game, id) ? 'bg-red' : 'bg-blue'}`} aria-hidden="true" />}
            </button>);

        })}
      </div>
    </section>);

}