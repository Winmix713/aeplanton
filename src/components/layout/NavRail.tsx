import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import { navItems } from '../../data/navigation';
import type { GameView } from '../../types/game';

interface NavRailProps {
  active: GameView;
  onSelect: (id: GameView) => void;
  alert?: boolean;
  orientation?: 'vertical' | 'horizontal';
  className?: string;
}

export function NavRail({ active, onSelect, alert = false, orientation = 'vertical', className = '' }: NavRailProps) {
  const { t } = useI18n();
  const vertical = orientation === 'vertical';
  return (
    <nav
      aria-label={t.nav.aria}
      className={`glass flex items-center gap-1.5 p-2 ${vertical ? 'flex-col rounded-[26px]' : 'scroll-quiet justify-start overflow-x-auto rounded-full sm:justify-center'} ${className}`}>
      
      {navItems.map(({ id, icon: Icon, key, dividerBefore }) => {
        const isActive = active === id;
        const label = t.nav[id];
        return (
          <React.Fragment key={id}>
            {dividerBefore && <span className={`shrink-0 bg-line-2 ${vertical ? 'my-1 h-px w-6' : 'mx-1 h-6 w-px'}`} aria-hidden="true" />}
            <button
              type="button"
              onClick={() => onSelect(id)}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              className={`group relative grid h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-150 lg:h-[38px] lg:w-[38px] ${
              isActive ? 'bg-fill-3 text-ink shadow-[inset_0_0_0_1px_var(--line-2)]' : 'text-ink-3 hover:bg-fill-2 hover:text-ink'}`
              }>
              
              <Icon size={17} strokeWidth={1.4} />
              {id === 'reports' && alert && <span className="absolute right-[7px] top-[7px] h-1.5 w-1.5 rounded-full bg-red" />}
              {vertical &&
              <span className="glass pointer-events-none absolute left-full ml-3 flex -translate-x-1 items-center gap-2 whitespace-nowrap rounded-lg px-2.5 py-1.5 text-[12px] text-ink opacity-0 transition-[opacity,transform] duration-150 group-hover:translate-x-0 group-hover:opacity-100 group-focus-visible:translate-x-0 group-focus-visible:opacity-100">
                  {label}
                  <kbd className="rounded border border-line-2 px-1 text-[10px] text-ink-4">{key}</kbd>
                </span>
              }
            </button>
          </React.Fragment>);

      })}
    </nav>);

}