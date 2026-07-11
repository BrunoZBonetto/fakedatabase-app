const STREAMING_GENRE_MAP_PT: Record<string, string[]> = {
  'Netflix': ['Drama','Suspense','Ficção Científica','Terror','Comédia','Documentário','Animação'],
  'Amazon Prime Video': ['Drama','Ação','Ficção Científica','Comédia','Suspense','Terror'],
  'Disney+': ['Animação','Ficção Científica','Aventura','Fantasia','Comédia','Drama'],
  'HBO Max': ['Drama','Suspense','Ficção Científica','Terror','Comédia','Documentário'],
  'Globoplay': ['Drama','Comédia','Romance','Suspense','Documentário','Novela'],
  'Paramount+': ['Drama','Ação','Comédia','Suspense','Ficção Científica'],
  'Apple TV+': ['Drama','Ficção Científica','Comédia','Suspense','Documentário'],
  'Crunchyroll': ['Animação','Ação','Aventura','Romance','Comédia','Fantasia'],
};

const STREAMING_GENRE_MAP_EN: Record<string, string[]> = {
  'Netflix': ['Drama','Thriller','Science Fiction','Horror','Comedy','Documentary','Animation','Romance'],
  'Amazon Prime Video': ['Drama','Action','Science Fiction','Comedy','Thriller','Horror','Fantasy'],
  'Disney+': ['Animation','Science Fiction','Adventure','Fantasy','Comedy','Drama','Musical'],
  'HBO Max': ['Drama','Thriller','Science Fiction','Horror','Comedy','Documentary','Romance'],
  'Paramount+': ['Drama','Action','Comedy','Thriller','Science Fiction','Horror'],
  'Apple TV+': ['Drama','Science Fiction','Comedy','Thriller','Documentary','Romance'],
  'Peacock': ['Drama','Comedy','Thriller','Action','Horror','Documentary'],
  'Hulu': ['Drama','Comedy','Thriller','Horror','Science Fiction','Documentary'],
  'Crunchyroll': ['Animation','Action','Adventure','Romance','Comedy','Fantasy'],
};

export function getStreamingGenreMap(locale: string): Record<string, string[]> {
  if (locale === 'pt') {
    return STREAMING_GENRE_MAP_PT;
  }
  return STREAMING_GENRE_MAP_EN;
}
