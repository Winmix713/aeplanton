import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { enterTransition, exitTransition, modalSpring } from '../../utils/motion';

interface ModalProps {
  open: boolean;
  labelledBy: string;
  onClose: () => void;
  closeOnBackdrop?: boolean;
  initialFocusRef?: React.RefObject<HTMLElement>;
  className?: string;
  children: React.ReactNode;
}

const FOCUSABLE = 'button:not([disabled]), [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

/**
 * Shared dialog shell. Backdrop fades in 200ms / out 140ms; the panel springs in
 * (0.25s, bounce 0.15) from scale 0.96 + blur and exits faster on the exit curve.
 * Focus is trapped while open and restored on close.
 */
export function Modal({ open, labelledBy, onClose, closeOnBackdrop = true, initialFocusRef, className = '', children }: ModalProps) {
  const panelRef = useRef<HTMLDivElement>(null);
  const restoreRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (!open) return;
    restoreRef.current = document.activeElement as HTMLElement | null;
    const id = window.requestAnimationFrame(() => {
      const target = initialFocusRef?.current ?? panelRef.current?.querySelector<HTMLElement>(FOCUSABLE);
      target?.focus();
    });
    return () => {
      window.cancelAnimationFrame(id);
      restoreRef.current?.focus?.();
    };
  }, [open, initialFocusRef]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.stopPropagation();
      onClose();
      return;
    }
    if (e.key !== 'Tab' || !panelRef.current) return;
    const items = Array.from(panelRef.current.querySelectorAll<HTMLElement>(FOCUSABLE));
    if (!items.length) return;
    const first = items[0];
    const last = items[items.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {open &&
      <motion.div
        className="fixed inset-0 z-50 grid place-items-center overflow-y-auto bg-black/60 p-4 backdrop-blur-md"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { ...enterTransition, duration: 0.2 } }}
        exit={{ opacity: 0, transition: exitTransition }}
        onClick={closeOnBackdrop ? onClose : undefined}>
        
          <motion.div
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          onKeyDown={onKeyDown}
          onClick={(e) => e.stopPropagation()}
          className={`glass glass-strong w-full rounded-[22px] ${className}`}
          style={{ willChange: 'transform, opacity, filter' }}
          initial={{ opacity: 0, scale: 0.96, y: 10, filter: 'blur(4px)' }}
          animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)', transition: modalSpring }}
          exit={{ opacity: 0, scale: 0.98, y: 4, filter: 'blur(2px)', transition: exitTransition }}>
          
            {children}
          </motion.div>
        </motion.div>
      }
    </AnimatePresence>);

}