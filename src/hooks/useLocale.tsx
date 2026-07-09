import { createContext, useContext, useState, useCallback, useEffect, type ReactNode } from 'react';
import ptBR from '../i18n/pt-BR';
import enUS from '../i18n/en-US';

export type Locale = 'pt-BR' | 'en-US';

const labelsMap = { 'pt-BR': ptBR, 'en-US': enUS };

type Labels = typeof ptBR;

interface LocaleContextValue {
  locale: Locale;
  t: Labels;
  toggleLocale: () => void;
}

const LocaleContext = createContext<LocaleContextValue>({
  locale: 'pt-BR',
  t: ptBR,
  toggleLocale: () => {},
});

export function LocaleProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>(() => {
    try {
      const stored = localStorage.getItem('locale');
      if (stored === 'en-US' || stored === 'pt-BR') return stored;
    } catch {
      // localStorage indisponível — ignora
    }
    return 'en-US';
  });

  const toggleLocale = useCallback(() => {
    setLocale((prev) => {
      const next = prev === 'pt-BR' ? 'en-US' : 'pt-BR';
      try { localStorage.setItem('locale', next); } catch { /* ignora */ }
      return next;
    });
  }, []);

  useEffect(() => {
    const t = labelsMap[locale];
    const title = t.app.title.replace(/[^\w\s]/g, '').trim();
    document.title = t.app.title;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute('content', t.app.subtitle);
    document.documentElement.lang = locale;
  }, [locale]);

  return (
    <LocaleContext.Provider value={{ locale, t: labelsMap[locale], toggleLocale }}>
      {children}
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  return useContext(LocaleContext);
}
