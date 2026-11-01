import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, InfoIcon, TriangleAlertIcon } from 'lucide-react';
import type { ToastMessage } from '../../types/rover';

const ICONS = { ok: CheckIcon, warn: TriangleAlertIcon, info: InfoIcon };
const COLORS = { ok: 'text-green', warn: 'text-amber', info: 'text-blue' };

export function Toast({ toast }: {toast: ToastMessage | null;}) {
  return (
    <div role="status" aria-live="polite" className="pointer-events-none flex justify-center">
      <AnimatePresence mode="wait">
        {toast &&
        <motion.div
          key={toast.id}
          initial={{ opacity: 0, y: 8, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: { duration: 0.22, ease: [0.16, 1, 0.3, 1] } }}
          exit={{ opacity: 0, y: 4, transition: { duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] } }}
          className="glass flex items-center gap-2 rounded-full px-4 py-2 text-[12.5px] text-ink">
          
            {React.createElement(ICONS[toast.tone], { size: 14, strokeWidth: 1.8, className: COLORS[toast.tone] })}
            {toast.text}
          </motion.div>
        }
      </AnimatePresence>
    </div>);

}