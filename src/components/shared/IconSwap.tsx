import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { iconEnterTransition, iconExitTransition } from '../../utils/motion';

/** Cross-fades between icons keyed by state (play ↔ pause, sun ↔ moon). */
export function IconSwap({ children }: {children: React.ReactNode;}) {
  return (
    <span className="relative grid place-items-center">
      <AnimatePresence mode="popLayout" initial={false}>
        {children}
      </AnimatePresence>
    </span>);

}

export const IconSwapItem = React.forwardRef<HTMLSpanElement, {children: React.ReactNode;}>(function IconSwapItem({ children }, ref) {
  return (
    <motion.span
      ref={ref}
      className="grid place-items-center"
      initial={{ opacity: 0, scale: 0.6, filter: 'blur(2px)' }}
      animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', transition: iconEnterTransition }}
      exit={{ opacity: 0, scale: 0.6, filter: 'blur(2px)', transition: iconExitTransition }}>
      
      {children}
    </motion.span>);

});