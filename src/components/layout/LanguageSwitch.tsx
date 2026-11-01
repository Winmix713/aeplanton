import React from 'react';
import { GlobeIcon } from 'lucide-react';
import { languages, useI18n } from '../../contexts/LanguageContext';
import type { Lang } from '../../types/i18n';
import { Dropdown } from '../shared/Dropdown';

export function LanguageSwitch({ align = 'right', className = '' }: {align?: 'left' | 'right';className?: string;}) {
  const { lang, setLang, t } = useI18n();
  return (
    <Dropdown<Lang>
      label={t.common.language}
      value={lang}
      onChange={setLang}
      align={align}
      className={className}
      icon={<GlobeIcon size={14} strokeWidth={1.6} />}
      display={languages.find((l) => l.id === lang)?.short}
      options={languages.map((l) => ({ value: l.id, label: l.label, hint: l.short }))} />);


}