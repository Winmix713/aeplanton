import React, { useEffect, useId, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';
import { exitTransition, menuEnterTransition, stagger } from '../../utils/motion';

export interface DropdownOption<T extends string> {
  value: T;
  label: string;
  hint?: string;
}

interface DropdownProps<T extends string> {
  label: string;
  value: T;
  options: DropdownOption<T>[];
  onChange: (v: T) => void;
  /** Text shown on the trigger; defaults to the selected option label. */
  display?: React.ReactNode;
  icon?: React.ReactNode;
  align?: 'left' | 'right';
  className?: string;
}

/** Accessible listbox dropdown: arrow keys move, Enter selects, Escape closes. */
export function Dropdown<T extends string>({ label, value, options, onChange, display, icon, align = 'right', className = '' }: DropdownProps<T>) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(() => Math.max(0, options.findIndex((o) => o.value === value)));
  const rootRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLUListElement>(null);
  const id = useId();
  const selected = options.find((o) => o.value === value);

  useEffect(() => {
    if (!open) return;
    setActive(Math.max(0, options.findIndex((o) => o.value === value)));
    const onDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    window.addEventListener('pointerdown', onDown);
    requestAnimationFrame(() => listRef.current?.focus());
    return () => window.removeEventListener('pointerdown', onDown);
  }, [open, options, value]);

  const choose = (v: T) => {
    onChange(v);
    setOpen(false);
  };

  const onListKey = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % options.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + options.length) % options.length);
    } else if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      choose(options[active].value);
    } else if (e.key === 'Escape' || e.key === 'Tab') {
      e.stopPropagation();
      setOpen(false);
    }
  };

  return (
    <div ref={rootRef} className={`relative ${className}`}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-list`}
        aria-label={`${label}: ${selected?.label ?? ''}`}
        onClick={() => setOpen((o) => !o)}
        className="inline-flex h-9 items-center gap-1.5 rounded-full px-2.5 text-[11.5px] font-[650] uppercase tracking-[0.1em] text-ink-2 transition-colors duration-150 hover:bg-fill-2 hover:text-ink">
        
        {icon}
        {display ?? selected?.label}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={menuEnterTransition} className="grid place-items-center">
          <ChevronDownIcon size={13} strokeWidth={1.8} />
        </motion.span>
      </button>
      <AnimatePresence>
        {open &&
        <motion.ul
          ref={listRef}
          id={`${id}-list`}
          role="listbox"
          tabIndex={-1}
          aria-label={label}
          aria-activedescendant={`${id}-${active}`}
          onKeyDown={onListKey}
          initial={{ opacity: 0, y: -4, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1, transition: menuEnterTransition }}
          exit={{ opacity: 0, y: -2, scale: 0.98, transition: exitTransition }}
          className={`glass glass-strong absolute top-full z-50 mt-1.5 min-w-[168px] rounded-[14px] p-1 outline-none ${align === 'right' ? 'right-0 origin-top-right' : 'left-0 origin-top-left'}`}>
          
            {options.map((o, i) => {
            const on = o.value === value;
            return (
              <motion.li
                key={o.value}
                id={`${id}-${i}`}
                role="option"
                aria-selected={on}
                initial={{ opacity: 0, y: -2 }}
                animate={{ opacity: 1, y: 0, transition: { ...menuEnterTransition, delay: stagger(i) } }}
                onMouseEnter={() => setActive(i)}
                onClick={() => choose(o.value)}
                className={`flex cursor-pointer items-center gap-2.5 rounded-[10px] px-2.5 py-2 text-[12.5px] ${i === active ? 'bg-fill-2 text-ink' : 'text-ink-2'}`}>
                
                  <span className="min-w-0 flex-1">
                    <span className="block font-[600]">{o.label}</span>
                    {o.hint && <span className="block text-[11px] text-ink-4">{o.hint}</span>}
                  </span>
                  {on && <CheckIcon size={13} strokeWidth={2.2} className="text-amber" />}
                </motion.li>);

          })}
          </motion.ul>
        }
      </AnimatePresence>
    </div>);

}