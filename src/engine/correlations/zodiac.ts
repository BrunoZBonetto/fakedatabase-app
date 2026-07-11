const ZODIAC_SIGNS_PT = ['Aquário','Peixes','Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário','Capricórnio'];

const ZODIAC_SIGNS_EN = ['Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn'];

const ZODIAC_SIGNS_FR = ['Verseau','Poissons','Bélier','Taureau','Gémeaux','Cancer','Lion','Vierge','Balance','Scorpion','Sagittaire','Capricorne'];

export const ZODIAC_BOUNDARIES = [
  { month: 0, day: 20 }, { month: 1, day: 19 }, { month: 2, day: 21 }, { month: 3, day: 20 },
  { month: 4, day: 21 }, { month: 5, day: 21 }, { month: 6, day: 23 }, { month: 7, day: 23 },
  { month: 8, day: 23 }, { month: 9, day: 23 }, { month: 10, day: 22 }, { month: 11, day: 22 },
] as const;

export function getZodiacSigns(locale: string): string[] {
  if (locale === 'pt-BR') return ZODIAC_SIGNS_PT;
  if (locale === 'fr-FR') return ZODIAC_SIGNS_FR;
  if (locale.startsWith('en-')) return ZODIAC_SIGNS_EN;
  return ZODIAC_SIGNS_EN;
}

export function getZodiac(date: Date, locale: string): string {
  const month = date.getMonth();
  const day = date.getDate();
  const signs = getZodiacSigns(locale);

  let index = 12;
  for (let i = 0; i < 12; i++) {
    const b = ZODIAC_BOUNDARIES[i];
    if (month < b.month || (month === b.month && day < b.day)) {
      index = i;
      break;
    }
  }

  return signs[index % 12];
}

export function randomDateInZodiac(sign: string, year: number, locale: string): Date {
  const signs = getZodiacSigns(locale);
  const idx = signs.indexOf(sign);
  if (idx === -1) {
    throw new Error(`Unknown zodiac sign: ${sign}`);
  }

  const prevIdx = (idx + 11) % 12;
  const startBoundary = ZODIAC_BOUNDARIES[prevIdx];
  const endBoundary = ZODIAC_BOUNDARIES[idx];

  const startMonth = startBoundary.month;
  const startDay = startBoundary.day;
  const endMonth = endBoundary.month;
  const endDay = endBoundary.day;

  const startDate = new Date(year, startMonth, startDay);
  const endDate = new Date(year, endMonth, endDay);

  if (endDate < startDate) {
    endDate.setFullYear(year + 1);
  }

  const startMs = startDate.getTime();
  const endMs = endDate.getTime();
  const randomMs = startMs + Math.random() * (endMs - startMs);

  return new Date(randomMs);
}
