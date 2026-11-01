import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { en } from '../data/i18n/en';
import { hu } from '../data/i18n/hu';
import type { Dict, Lang, Msg } from '../types/i18n';

interface LanguageValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: Dict;
  /** Renders language-neutral game text. */
  f: (m: Msg | string) => string;
}

const STORAGE_KEY = 'aether.lang';
const dicts: Record<Lang, Dict> = { en, hu };

const LanguageContext = createContext<LanguageValue | null>(null);

function initialLang(fallback: Lang): Lang {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'en' || saved === 'hu') return saved;
  } catch {

    /* storage unavailable */}
  return fallback;
}

export function LanguageProvider({ defaultLang, children }: {defaultLang: Lang;children: React.ReactNode;}) {
  const [lang, setLangState] = useState<Lang>(() => initialLang(defaultLang));

  const setLang = useCallback((l: Lang) => {
    setLangState(l);
    try {
      localStorage.setItem(STORAGE_KEY, l);
    } catch {

      /* storage unavailable */}
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo<LanguageValue>(() => {
    const t = dicts[lang];
    return {
      lang,
      setLang,
      t,
      f: (m) => {
        if (typeof m === 'string') return m;
        const fn = t.msg[m.k];
        return fn ? fn(m.p ?? {}) : String(m.k);
      }
    };
  }, [lang, setLang]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n(): LanguageValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used inside LanguageProvider');
  return ctx;
}

export const languages: {id: Lang;label: string;short: string;}[] = [
{ id: 'en', label: en.name, short: en.short },
{ id: 'hu', label: hu.name, short: hu.short }];