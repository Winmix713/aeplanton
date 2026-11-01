import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, SendIcon, TriangleAlertIcon } from 'lucide-react';
import { useI18n } from '../../contexts/LanguageContext';
import type { CheckItem } from '../../utils/game/checklist';
import { exitTransition, menuEnterTransition, stagger } from '../../utils/motion';

interface PreSendChecklistProps {
  open: boolean;
  items: CheckItem[];
  delayMin: number;
  onConfirm: () => void;
  onCancel: () => void;
}

/** Last look before the sequence is committed. Once sent it cannot be recalled. */
export function PreSendChecklist({ open, items, delayMin, onConfirm, onCancel }: PreSendChecklistProps) {
  const { t, f } = useI18n();
  return (
    <AnimatePresence>
      {open &&
      <motion.div
        role="dialog"
        aria-label={t.checklist.title}
        initial={{ opacity: 0, y: 8, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1, transition: menuEnterTransition }}
        exit={{ opacity: 0, y: 4, transition: exitTransition }}
        className="glass glass-strong absolute bottom-full right-0 z-10 mb-2 w-[min(380px,calc(100vw-32px))] rounded-[18px] p-4">
        
          <h3 className="text-[14px] font-[650] text-ink">{t.checklist.title}</h3>
          <p className="mt-0.5 text-[12px] text-ink-3">{t.checklist.arrives(delayMin)}</p>
          <ul className="mt-3 space-y-2">
            {items.map((i, idx) =>
          <motion.li
            key={i.id}
            initial={{ opacity: 0, y: 3 }}
            animate={{ opacity: 1, y: 0, transition: { ...menuEnterTransition, delay: stagger(idx) } }}
            className="flex items-start gap-2 text-[12.5px] leading-snug">
            
                {i.level === 'warn' ?
            <TriangleAlertIcon size={14} strokeWidth={1.8} className="mt-0.5 shrink-0 text-amber" /> :

            <CheckIcon size={14} strokeWidth={2} className="mt-0.5 shrink-0 text-green" />
            }
                <span className={i.level === 'warn' ? 'text-ink' : 'text-ink-3'}>{f(i.text)}</span>
              </motion.li>
          )}
          </ul>
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onCancel} className="h-9 whitespace-nowrap rounded-full px-4 text-[12.5px] font-[600] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
              {t.checklist.back}
            </button>
            <button
            type="button"
            onClick={onConfirm}
            className="inline-flex h-9 items-center gap-2 whitespace-nowrap rounded-full bg-amber px-4 text-[12.5px] font-[650] text-obsidian transition-[filter] duration-150 hover:brightness-110">
            
              <SendIcon size={13} strokeWidth={2} />
              {t.checklist.sendAnyway}
            </button>
          </div>
        </motion.div>
      }
    </AnimatePresence>);

}