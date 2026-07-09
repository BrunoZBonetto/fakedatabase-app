import { useCallback } from 'react';
import { useLocale } from '../hooks/useLocale';

declare global {
  interface Window { gtag?: (command: string, ...args: unknown[]) => void; }
}

function isAvailable(): boolean {
  return typeof window !== 'undefined' && typeof window.gtag === 'function';
}

function track(eventName: string, params?: Record<string, unknown>) {
  if (isAvailable()) {
    window.gtag!('event', eventName, params);
  }
}

export function useAnalytics() {
  const { locale } = useLocale();

  const trackGenerate = useCallback((recordCount: number, fieldsCount: number, locale: string) => {
    track('generate_data', { record_count: recordCount, fields_count: fieldsCount, locale });
  }, []);

  const trackLocaleToggle = useCallback((newLocale: string) => {
    track('locale_toggle', { locale: newLocale });
  }, []);

  const trackThemeToggle = useCallback((newTheme: string) => {
    track('theme_toggle', { theme: newTheme });
  }, []);

  const trackDownload = useCallback((format: string) => {
    track('download', { format });
  }, []);

  const trackSponsorClick = useCallback(() => {
    track('sponsor_click');
  }, []);

  const trackTemplateApply = useCallback((templateName: string) => {
    track('template_apply', { template: templateName });
  }, []);

  const trackCopy = useCallback(() => {
    track('copy_to_clipboard');
  }, []);

  return { trackGenerate, trackLocaleToggle, trackThemeToggle, trackDownload, trackSponsorClick, trackTemplateApply, trackCopy };
}
