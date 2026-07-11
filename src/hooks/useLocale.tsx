import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import ptBR from '../i18n/pt-BR';
import enUS from '../i18n/en-US';
import enGB from '../i18n/en-GB';

export type Locale = string;

const labelsMap: Record<string, typeof ptBR> = { 'pt-BR': ptBR, 'en-US': enUS, 'en-GB': enGB };

type Labels = typeof ptBR;

export interface LocaleOption {
  code: string;
  flag: string;
  label: string;
}

export const LOCALE_OPTIONS: LocaleOption[] = [
  { code: 'pt-BR', flag: '🇧🇷', label: 'Português (BR)' },
  { code: 'en-US', flag: '🇺🇸', label: 'English (US)' },
  { code: 'en-GB', flag: '🇬🇧', label: 'English (UK)' },
  { code: 'fr-FR', flag: '🇫🇷', label: 'Français (FR)' },
  { code: 'de-DE', flag: '🇩🇪', label: 'Deutsch (DE)' },
  { code: 'en-IE', flag: '🇮🇪', label: 'English (IE)' },
  { code: 'hi-IN', flag: '🇮🇳', label: 'हिन्दी (IN)' },
  { code: 'ja-JP', flag: '🇯🇵', label: '日本語 (JP)' },
];

interface LocaleContextValue {
  locale: Locale;
  t: Labels;
  setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'pt-BR',
  t: ptBR,
  setLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem('locale');
      if (stored && LOCALE_OPTIONS.some(o => o.code === stored)) return stored;
    } catch {
      // localStorage indisponível — ignora
    }
    return 'en-US';
  });

  const setLocale = useCallback((next: string) => {
    setLocaleState(next);
    try { localStorage.setItem('locale', next); } catch { /* ignora */ }
  }, []);

  useEffect(() => {
    const t = labelsMap[locale] ?? labelsMap['en-US'];
    document.title = t.app.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.app.subtitle);
    document.documentElement.lang = locale;
  }, [locale]);

  const t = labelsMap[locale] ?? labelsMap['en-US'];

  return (
    <LocaleContext.Provider value={{ locale, t, setLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
