const FOOTBALL_TEAM_STATE_PT: Record<string, string[]> = {
  'Flamengo': ['RJ'], 'Vasco da Gama': ['RJ'], 'Botafogo': ['RJ'], 'Fluminense': ['RJ'],
  'Corinthians': ['SP'], 'São Paulo': ['SP'], 'Palmeiras': ['SP'], 'Santos': ['SP'],
  'Grêmio': ['RS'], 'Internacional': ['RS'],
  'Atlético-MG': ['MG'], 'Cruzeiro': ['MG'],
  'Bahia': ['BA'],
  'Sport Recife': ['PE'],
  'Athletico-PR': ['PR'], 'Coritiba': ['PR'],
  'Goiás': ['GO'],
  'Cuiabá': ['MT'],
  'Fortaleza': ['CE'], 'Ceará': ['CE'],
  'Real Madrid': ['MD'], 'Barcelona': ['CT'], 'Juventus': ['TO'],
};

const FOOTBALL_TEAM_STATE_EN: Record<string, string[]> = {
  'Dallas Cowboys': ['TX'], 'Houston Texans': ['TX'],
  'Kansas City Chiefs': ['MO'],
  'San Francisco 49ers': ['CA'], 'Los Angeles Rams': ['CA'], 'Los Angeles Chargers': ['CA'],
  'Green Bay Packers': ['WI'],
  'New England Patriots': ['MA'],
  'Pittsburgh Steelers': ['PA'], 'Philadelphia Eagles': ['PA'],
  'Buffalo Bills': ['NY'], 'New York Giants': ['NY'], 'New York Jets': ['NY'],
  'Cincinnati Bengals': ['OH'], 'Cleveland Browns': ['OH'],
  'Baltimore Ravens': ['MD'],
  'Miami Dolphins': ['FL'], 'Tampa Bay Buccaneers': ['FL'], 'Jacksonville Jaguars': ['FL'],
};

const FOOTBALL_TEAM_STATE_GB: Record<string, string[]> = {
  'Manchester City': ['ENG'], 'Manchester United': ['ENG'], 'Liverpool': ['ENG'],
  'Arsenal': ['ENG'], 'Chelsea': ['ENG'], 'Tottenham Hotspur': ['ENG'],
  'Newcastle United': ['ENG'], 'Aston Villa': ['ENG'], 'Brighton & Hove Albion': ['ENG'],
  'West Ham United': ['ENG'], 'Brentford': ['ENG'], 'Crystal Palace': ['ENG'],
  'Wolverhampton Wanderers': ['ENG'], 'Fulham': ['ENG'], 'Bournemouth': ['ENG'],
  'Nottingham Forest': ['ENG'], 'Everton': ['ENG'], 'Leicester City': ['ENG'],
  'Leeds United': ['ENG'], 'Southampton': ['ENG'],
  'Celtic': ['SCT'], 'Rangers': ['SCT'], 'Hearts': ['SCT'], 'Hibernian': ['SCT'],
  'Cardiff City': ['WLS'], 'Swansea City': ['WLS'],
};

const BASKETBALL_TEAM_STATE_PT: Record<string, string[]> = {
  'Los Angeles Lakers': ['CA'], 'Los Angeles Clippers': ['CA'],
  'Golden State Warriors': ['CA'], 'Sacramento Kings': ['CA'],
  'Boston Celtics': ['MA'], 'Brooklyn Nets': ['NY'], 'New York Knicks': ['NY'],
  'Chicago Bulls': ['IL'], 'Milwaukee Bucks': ['WI'],
  'Miami Heat': ['FL'], 'Orlando Magic': ['FL'],
  'Dallas Mavericks': ['TX'], 'Houston Rockets': ['TX'], 'San Antonio Spurs': ['TX'],
  'Phoenix Suns': ['AZ'], 'Denver Nuggets': ['CO'],
  'Philadelphia 76ers': ['PA'], 'Toronto Raptors': ['ON'],
  'Atlanta Hawks': ['GA'], 'Portland Trail Blazers': ['OR'],
};

const BASKETBALL_TEAM_STATE_EN = BASKETBALL_TEAM_STATE_PT;

const FOOTBALL_TEAM_STATE: Record<string, Record<string, string[]>> = {
  'pt': FOOTBALL_TEAM_STATE_PT,
  'en': FOOTBALL_TEAM_STATE_EN,
  'en-GB': FOOTBALL_TEAM_STATE_GB,
};

const BASKETBALL_TEAM_STATE: Record<string, Record<string, string[]>> = {
  'pt': BASKETBALL_TEAM_STATE_PT,
  'en': BASKETBALL_TEAM_STATE_EN,
  'en-GB': BASKETBALL_TEAM_STATE_PT,
};

export function getFootballTeamStateMap(locale: string): Record<string, string[]> {
  return FOOTBALL_TEAM_STATE[locale] ?? FOOTBALL_TEAM_STATE['en'];
}

export function getBasketballTeamStateMap(locale: string): Record<string, string[]> {
  return BASKETBALL_TEAM_STATE[locale] ?? BASKETBALL_TEAM_STATE['en'];
}
