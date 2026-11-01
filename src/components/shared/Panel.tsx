import React from 'react';

interface PanelProps {
  title: string;
  aside?: React.ReactNode;
  className?: string;
  children: React.ReactNode;
  as?: 'section' | 'div';
}

/** Glass HUD panel with a quiet header row. */
export function Panel({ title, aside, className = '', children, as = 'section' }: PanelProps) {
  const Tag = as;
  return (
    <Tag className={`glass rounded-[18px] p-4 ${className}`} aria-label={as === 'section' ? title : undefined}>
      <header className="mb-3 flex items-center justify-between gap-3">
        <h2 className="hud-label text-ink-3">{title}</h2>
        {aside}
      </header>
      {children}
    </Tag>);

}