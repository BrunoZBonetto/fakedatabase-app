export const COUNTRY_CURRENCY: Record<string, string[]> = {
  'BR': ['BRL'], 'US': ['USD'], 'GB': ['GBP'], 'JP': ['JPY'],
  'DE': ['EUR'], 'FR': ['EUR'], 'IT': ['EUR'], 'ES': ['EUR'], 'PT': ['EUR'],
  'CA': ['CAD'], 'MX': ['MXN'], 'AR': ['ARS'], 'AU': ['AUD'],
};

export const COUNTRY_NATIONALITY: Record<string, string[]> = {
  'BR': ['Brasileira'], 'US': ['Americana'], 'GB': ['Inglesa'],
  'JP': ['Japonesa'], 'DE': ['Alemã'], 'FR': ['Francesa'],
  'IT': ['Italiana'], 'ES': ['Espanhola'], 'PT': ['Portuguesa'],
  'CA': ['Canadense'], 'MX': ['Mexicana'], 'AR': ['Argentina'], 'AU': ['Australiana'],
};

export const COUNTRY_NATIONALITY_EN: Record<string, string[]> = {
  'BR': ['Brazilian'], 'US': ['American'], 'GB': ['British'],
  'JP': ['Japanese'], 'DE': ['German'], 'FR': ['French'],
  'IT': ['Italian'], 'ES': ['Spanish'], 'PT': ['Portuguese'],
  'CA': ['Canadian'], 'MX': ['Mexican'], 'AR': ['Argentinian'], 'AU': ['Australian'],
};

export const COUNTRY_LANGUAGE: Record<string, string[]> = {
  'BR': ['Português'], 'US': ['Inglês'], 'GB': ['Inglês'],
  'JP': ['Japonês'], 'DE': ['Alemão'], 'FR': ['Francês'],
  'IT': ['Italiano'], 'ES': ['Espanhol'], 'PT': ['Português'],
  'CA': ['Inglês', 'Francês'], 'MX': ['Espanhol'], 'AR': ['Espanhol'], 'AU': ['Inglês'],
};

export const COUNTRY_LANGUAGE_EN: Record<string, string[]> = {
  'BR': ['Portuguese'], 'US': ['English'], 'GB': ['English'],
  'JP': ['Japanese'], 'DE': ['German'], 'FR': ['French'],
  'IT': ['Italian'], 'ES': ['Spanish'], 'PT': ['Portuguese'],
  'CA': ['English', 'French'], 'MX': ['Spanish'], 'AR': ['Spanish'], 'AU': ['English'],
};

export const COUNTRY_TIMEZONE: Record<string, string[]> = {
  'BR': ['America/Sao_Paulo', 'America/Manaus', 'America/Belem', 'America/Recife', 'America/Cuiaba'],
  'US': ['America/New_York', 'America/Chicago', 'America/Denver', 'America/Los_Angeles'],
  'GB': ['Europe/London'], 'JP': ['Asia/Tokyo'],
  'DE': ['Europe/Berlin'], 'FR': ['Europe/Paris'], 'IT': ['Europe/Rome'],
  'ES': ['Europe/Madrid'], 'PT': ['Europe/Lisbon'],
  'CA': ['America/Toronto', 'America/Vancouver', 'America/Edmonton'],
  'MX': ['America/Mexico_City'], 'AR': ['America/Argentina/Buenos_Aires'], 'AU': ['Australia/Sydney'],
};

export function getCountryCorrelation(locale: string): {
  currency: Record<string, string[]>;
  nationality: Record<string, string[]>;
  language: Record<string, string[]>;
  timezone: Record<string, string[]>;
} {
  const isEn = locale.startsWith('en');
  const isFr = locale === 'fr-FR';
  return {
    currency: COUNTRY_CURRENCY,
    nationality: isFr ? COUNTRY_NATIONALITY : isEn ? COUNTRY_NATIONALITY_EN : COUNTRY_NATIONALITY,
    language: isFr ? COUNTRY_LANGUAGE : isEn ? COUNTRY_LANGUAGE_EN : COUNTRY_LANGUAGE,
    timezone: COUNTRY_TIMEZONE,
  };
}
