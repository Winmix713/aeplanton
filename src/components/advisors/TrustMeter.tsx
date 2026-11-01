import React from 'react';
import { motion } from 'framer-motion';
import { useI18n } from '../../contexts/LanguageContext';
import { trustTier } from '../../utils/colony/ap';
import { enterTransition } from '../../utils/motion';
import { toneBg, toneText, trustTone } from '../../utils/tone';

export function TrustMeter({ trust, compact = false }: {trust: number;compact?: boolean;}) {
  const { t } = useI18n();
  const tone = trustTone(trust);
  const tier = trustTier(trust);
  return (
    <div className="flex items-center gap-2" title={`${t.advisor.trust} ${Math.round(trust)} · ${t.colony.tiers[tier]} · ${t.colony.tierHint[tier]}`}>
      {!compact && <span className={`text-[10.5px] font-[650] uppercase tracking-[0.08em] ${tone === 'neutral' ? 'text-ink-4' : toneText[tone]}`}>{t.colony.tiers[tier]}</span>}
      <span className="relative h-1 w-12 overflow-hidden rounded-full bg-track" role="meter" aria-label={t.advisor.trustAria} aria-valuenow={Math.round(trust)} aria-valuemin={0} aria-valuemax={100}>
        <motion.span
          className={`absolute inset-y-0 left-0 rounded-full ${tone === 'neutral' ? 'bg-ink-2' : toneBg[tone]}`}
          initial={false}
          animate={{ width: `${trust}%` }}
          transition={enterTransition} />
        
      </span>
      <span className={`w-6 text-right text-[12px] font-[650] ${tone === 'neutral' ? 'text-ink' : toneText[tone]}`}>{Math.round(trust)}</span>
    </div>);

}