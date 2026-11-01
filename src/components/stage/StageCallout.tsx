import React from 'react';

interface StageCalloutProps {
  stem: number;
  children: React.ReactNode;
}

/** On-stage label: content sits at the top of a 1px stem that ends in a dot at the anchor point. */
export function StageCallout({ stem, children }: StageCalloutProps) {
  return (
    <div className="relative">
      <span className="absolute -left-[3px] -top-[3px] h-[6px] w-[6px] rounded-full bg-ink shadow-[0_0_0_2px_rgba(0,0,0,0.25)]" />
      <span className="absolute left-0 w-px bg-ink-3" style={{ top: -stem, height: stem }} />
      <div className="stage-text absolute left-2 whitespace-nowrap" style={{ top: -stem - 4 }}>
        {children}
      </div>
    </div>);

}