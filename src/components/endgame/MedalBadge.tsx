import React from 'react';
import { useI18n } from '../../contexts/LanguageContext';
import type { Medal } from '../../types/game';

const COLOR: Record<Medal, string> = {
  gold: '#e8c15a',
  silver: '#c9ccd2',
  bronze: '#c48a5a'
};

export function MedalBadge({ medal, size = 'sm' }: {medal: Medal | null;size?: 'sm' | 'lg';}) {
  const { t } = useI18n();
  if (!medal) return <span className="text-[12px] text-ink-4">—</span>;
  const color = COLOR[medal];
  const lg = size === 'lg';
  return (
    <span className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border font-[650] ${lg ? 'px-3 py-1 text-[13px]' : 'px-2 py-0.5 text-[11px]'}`} style={{ borderColor: color, color }}>
      <span className={`rounded-full ${lg ? 'h-2.5 w-2.5' : 'h-1.5 w-1.5'}`} style={{ background: color }} aria-hidden="true" />
      {t.medals[medal]}
    </span>);

}