import type { Transition } from 'framer-motion';

/**
 * Motion tokens (Amicro design system §4): every one-shot animation stays under 300ms,
 * entrances ease out on [0.16, 1, 0.3, 1], exits are shorter and use the exit curve.
 */
export const enterTransition: Transition = { duration: 0.25, ease: [0.16, 1, 0.3, 1] };
export const exitTransition: Transition = { duration: 0.14, ease: [0.25, 0.46, 0.45, 0.94] };
export const iconEnterTransition: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };
export const iconExitTransition: Transition = { duration: 0.12, ease: [0.25, 0.46, 0.45, 0.94] };
export const menuEnterTransition: Transition = { duration: 0.2, ease: [0.16, 1, 0.3, 1] };
export const modalSpring: Transition = { type: 'spring', duration: 0.25, bounce: 0.15 };
export const hoverSpring: Transition = { type: 'spring', stiffness: 400, damping: 28 };

/** Stagger capped so a full list finishes inside the timing budget. */
export function stagger(index: number): number {
  return Math.min(index * 0.015, 0.05);
}