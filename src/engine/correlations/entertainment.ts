const MOVIE_GENRE_MAP_PT: Record<string, string[]> = {
  'Ação': ['Matrix','Vingadores: Ultimato','Batman: O Cavaleiro das Trevas','Jurassic Park','Star Wars','John Wick','Mad Max: Estrada da Fúria','Gladiador'],
  'Comédia': ['Pulp Fiction','Forrest Gump','Se Beber, Não Case','O Grande Hotel','A Cor Púrpura'],
  'Drama': ['O Poderoso Chefão','Titanic','Interestelar','Cidade de Deus','Parasita','Clube da Luta','O Lobo de Wall Street','Cisne Negro','O Curioso Caso de Benjamin Button'],
  'Terror': ['O Exorcista','Invocação do Mal','Corra!','Hereditário','O Iluminado','It: A Coisa','Mão Free','A Bruxa'],
  'Romance': ['Titanic','Diário de uma Paixão','Simplesmente Amor','Orgulho e Preconceito','La La Land','Antes do Amanhecer'],
  'Ficção Científica': ['Matrix','Interestelar','Star Wars','Blade Runner 2049','Duna','Arrival','Ex Machina','O Primeiro da Humanidade'],
  'Animação': ['Toy Story','Procurando Nemo','Frozen','Divertida Mente','Shrek','Spider-Man: No Aranha-Verso','Coco','Como Treinar seu Dragão'],
  'Documentário': ['O Dilema das Redes','Nosso Planeta','Amy','13º','Free Solo','A Cor da Tinta'],
  'Suspense': ['Clube da Luta','Seven - Os Sete Crimes Capitais','Ilha do Medo','Cisne Negro','Olhos que Marcam','Zodiac'],
  'Aventura': ['O Senhor dos Anéis','Indiana Jones','Piratas do Caribe','Jurassic Park','Jumanji','O Garçom'],
  'Musical': ['La La Land','Mamma Mia!','O Rei do Show','Bohemian Rhapsody','Os Miseráveis','Hamilton'],
};

const MOVIE_GENRE_MAP_EN: Record<string, string[]> = {
  'Action': ['The Matrix','The Dark Knight','Star Wars','Jurassic Park','Mad Max: Fury Road','John Wick','Gladiator','Top Gun: Maverick'],
  'Comedy': ['Pulp Fiction','The Grand Budapest Hotel','Bridesmaids','Superbad','Step Brothers','The Nice Guys'],
  'Drama': ['The Godfather','The Shawshank Redemption','Forrest Gump','Parasite','Goodfellas','The Wolf of Wall Street','Black Swan','The Curious Case of Benjamin Button'],
  'Horror': ['The Exorcist','The Shining','Get Out','Hereditary','A Quiet Place','It','The Witch','Midsommar'],
  'Romance': ['Titanic','The Notebook','Pride & Prejudice','La La Land','Casablanca','Before Sunrise','Crazy Rich Asians'],
  'Science Fiction': ['The Matrix','Interstellar','Star Wars','Blade Runner 2049','Dune','Arrival','Ex Machina','The Martian'],
  'Animation': ['Toy Story','Finding Nemo','Frozen','Inside Out','Shrek','Spider-Man: Into the Spider-Verse','Coco','How to Train Your Dragon'],
  'Documentary': ['The Social Dilemma','Our Planet','Amy','13th','Free Solo','My Octopus Teacher'],
  'Thriller': ['Fight Club','Se7en','Shutter Island','Black Swan','Gone Girl','Zodiac','Prisoners'],
  'Adventure': ['The Lord of the Rings','Indiana Jones','Pirates of the Caribbean','Jurassic Park','Jumanji','The Revenant'],
  'Musical': ['La La Land','Mamma Mia!','The Greatest Showman','Bohemian Rhapsody','Les Misérables','Hamilton'],
};

const GAME_GENRE_MAP_PT: Record<string, string[]> = {
  'Ação': ['Grand Theft Auto V','Red Dead Redemption 2','Cyberpunk 2077','Sleeping Dogs','Just Cause 4'],
  'Aventura': ['The Legend of Zelda','God of War','Assassin\'s Creed','Uncharted','Horizon Zero Dawn','Tomb Raider'],
  'RPG': ['The Witcher 3','Elden Ring','Final Fantasy','Baldur\'s Gate 3','Dragon Age','Persona 5'],
  'FPS': ['Call of Duty','Counter-Strike 2','Valorant','Overwatch','Halo','Doom Eternal'],
  'Estratégia': ['StarCraft','Age of Empires','Civilization VI','Total War','XCOM'],
  'Simulação': ['The Sims','Animal Crossing','Microsoft Flight Simulator','Euro Truck Simulator','Cities: Skylines'],
  'Esportes': ['FIFA','NBA 2K','EA Sports FC','Rocket League','WRC'],
  'Corrida': ['Forza Horizon','Gran Turismo','Need for Speed','Asphalt','Mario Kart'],
  'Battle Royale': ['Fortnite','PUBG','Free Fire','Apex Legends','Warzone'],
  'MOBA': ['League of Legends','Dota 2','Smite','Heroes of the Storm'],
  'Sandbox': ['Minecraft','Terraria','Garry\'s Mod','Roblox','No Man\'s Sky'],
  'Terror': ['Resident Evil','Silent Hill','Outlast','Dead Space','Amnesia'],
};

const GAME_GENRE_MAP_EN: Record<string, string[]> = {
  'Action': ['Grand Theft Auto V','Red Dead Redemption 2','Cyberpunk 2077','God of War Ragnarok','Sleeping Dogs','Just Cause 4'],
  'Adventure': ['The Legend of Zelda: Tears of the Kingdom','Assassin\'s Creed Mirage','Starfield','Uncharted','Horizon Forbidden West'],
  'RPG': ['The Witcher 3','Elden Ring','Final Fantasy XVI','Baldur\'s Gate 3','Diablo IV','Dragon Age','Persona 5'],
  'FPS': ['Call of Duty: Modern Warfare','Counter-Strike 2','Valorant','Overwatch','Halo Infinite','Doom Eternal'],
  'Strategy': ['StarCraft','Age of Empires','Civilization VI','XCOM','Total War'],
  'Simulation': ['The Sims 4','Animal Crossing','Microsoft Flight Simulator','Euro Truck Simulator','Cities: Skylines'],
  'Sports': ['Madden NFL','NBA 2K','MLB The Show','Rocket League','WRC'],
  'Racing': ['Forza Horizon','Gran Turismo','Need for Speed','Asphalt','Mario Kart'],
  'Battle Royale': ['Fortnite','PUBG','Apex Legends','Warzone'],
  'MOBA': ['League of Legends','Dota 2','Smite','Heroes of the Storm'],
  'Sandbox': ['Minecraft','Terraria','Roblox','No Man\'s Sky'],
  'Horror': ['Resident Evil','Silent Hill','Outlast','Dead Space','Amnesia'],
};

const MUSIC_GENRE_INSTRUMENTS_PT: Record<string, string[]> = {
  'Rock': ['Guitarra','Bateria','Baixo','Teclado'],
  'Samba': ['Cavaquinho','Violão','Tamborim','Pandeiro','Surdo'],
  'MPB': ['Violão','Piano','Cavaquinho','Flauta'],
  'Sertanejo': ['Violão','Guitarra','Acordeon','Sanfona'],
  'Pagode': ['Cavaquinho','Pandeiro','Violão','Tantan'],
  'Forró': ['Sanfona','Zabumba','Triângulo'],
  'Jazz': ['Saxofone','Piano','Trompete','Baixo','Bateria'],
  'Blues': ['Guitarra','Harmônica','Piano','Baixo'],
  'Eletrônica': ['Teclado','Sintetizador','Bateria Eletrônica'],
  'Funk': ['Teclado','Bateria Eletrônica','Baixo'],
  'Rap': ['Teclado','Bateria Eletrônica','Baixo'],
  'Metal': ['Guitarra','Bateria','Baixo','Teclado'],
  'Bossa Nova': ['Violão','Piano','Flauta','Cavaquinho'],
  'Pop': ['Teclado','Guitarra','Violão','Bateria'],
};

const MUSIC_GENRE_INSTRUMENTS_EN: Record<string, string[]> = {
  'Rock': ['Guitar','Drums','Bass','Keyboard'],
  'Country': ['Guitar','Banjo','Fiddle','Harmonica','Mandolin'],
  'Jazz': ['Saxophone','Piano','Trumpet','Bass','Drums','Clarinet'],
  'Blues': ['Guitar','Harmonica','Piano','Bass'],
  'Electronic': ['Synthesizer','Drum Machine','Keyboard'],
  'Hip Hop': ['Turntable','Drum Machine','Keyboard','Bass'],
  'Classical': ['Violin','Piano','Cello','Flute','Oboe','French Horn'],
  'Metal': ['Guitar','Drums','Bass','Keyboard'],
  'Folk': ['Acoustic Guitar','Mandolin','Banjo','Fiddle','Harmonica'],
  'Pop': ['Keyboard','Guitar','Piano','Drums'],
  'R&B': ['Piano','Bass','Drums','Saxophone'],
  'Reggae': ['Guitar','Bass','Drums','Keyboard'],
};

const SERIES_GENRE_MAP_PT: Record<string, string[]> = {
  'Drama': ['Breaking Bad','Game of Thrones','The Crown','Better Call Saul','Chernobyl','Peaky Blinders','Suits','House of Cards'],
  'Comédia': ['Friends','The Office','Brooklyn Nine-Nine','How I Met Your Mother','The Good Place','Schitt\'s Creek','Ted Lasso'],
  'Suspense': ['Sherlock','Dexter','Mindhunter','True Detective','The Mentalist','Lupin','You'],
  'Ficção Científica': ['Stranger Things','Black Mirror','Westworld','The Mandalorian','Severance','Lost','Devs'],
  'Terror': ['The Walking Dead','American Horror Story','Castle Rock','Chilling Adventures of Sabrina','Hannibal'],
  'Ação': ['The Boys','Jack Ryan','Daredevil','The Witcher','Arcane','Reacher','Vikings'],
  'Romance': ['Outlander','Bridgerton','The Office','Grey\'s Anatomy','Normal People','You'],
};

const SERIES_GENRE_MAP_EN: Record<string, string[]> = {
  'Drama': ['Breaking Bad','Game of Thrones','The Crown','Better Call Saul','Chernobyl','Peaky Blinders','Suits','House of Cards','Yellowjackets','The Wire'],
  'Comedy': ['Friends','The Office','Brooklyn Nine-Nine','How I Met Your Mother','The Good Place','Schitt\'s Creek','Ted Lasso','Seinfeld','The Simpsons','Curb Your Enthusiasm'],
  'Thriller': ['Sherlock','Dexter','Mindhunter','True Detective','The Mentalist','Lupin','You','Money Heist','Narcos'],
  'Science Fiction': ['Stranger Things','Black Mirror','Westworld','The Mandalorian','Severance','Lost','Devs','Foundation','Silo','3 Body Problem'],
  'Horror': ['The Walking Dead','American Horror Story','Castle Rock','Chilling Adventures of Sabrina','Hannibal','The Haunting of Hill House','Midnight Mass'],
  'Action': ['The Boys','Jack Ryan','Daredevil','The Witcher','Arcane','Reacher','Vikings','Shogun','The Last Kingdom'],
  'Romance': ['Outlander','Bridgerton','Grey\'s Anatomy','Normal People','You','Virgin River','Heartstopper'],
};

const BOOK_GENRE_MAP_PT: Record<string, string[]> = {
  'Ficção': ['Dom Casmurro','O Alquimista','Capitães da Areia','Memórias Póstumas de Brás Cubas','A Hora da Estrela'],
  'Romance': ['Orgulho e Preconceito','O Poderoso Chefão','Como Eu Era Antes de Você','Cinquenta Tons de Grey','A Culpa é das Estrelas'],
  'Terror': ['Drácula','Frankenstein','It: A Coisa','O Iluminado','A Chamada de Cthulhu'],
  'Fantasia': ['O Senhor dos Anéis','Harry Potter','As Crônicas de Gelo e Fogo','O Hobbit','A Bússola de Ouro'],
  'Biografia': ['Steve Jobs','Malala','Einstein','Sapiens','A Floresta ancestral'],
  'Suspense': ['O Código Da Vinci','Garota Exemplar','A Garota no Trem','Homicídio no Expresso do Oriente','Ela Sabia Demais'],
  'Não-ficção': ['Sapiens','21 Lições para o Século 21','Hábitos Atômicos','O Poder do Hábito','Pensar Rápido, Pensar Devagar'],
  'Autoajuda': ['O Poder do Hábito','Hábitos Atômicos','Mindset','Os 7 Hábitos','Inteligência Emocional'],
};

const BOOK_GENRE_MAP_EN: Record<string, string[]> = {
  'Fiction': ['To Kill a Mockingbird','1984','The Great Gatsby','One Hundred Years of Solitude','The Catcher in the Rye'],
  'Romance': ['Pride and Prejudice','The Notebook','Me Before You','Fifty Shades of Grey','The Fault in Our Stars','Outlander'],
  'Horror': ['Dracula','Frankenstein','It','The Shining','The Haunting of Hill House','Mexican Gothic'],
  'Fantasy': ['The Lord of the Rings','Harry Potter','A Game of Thrones','The Hobbit','The Golden Compass','Mistborn'],
  'Biography': ['Steve Jobs','Becoming','Educated','The Diary of a Young Girl','Sapiens'],
  'Thriller': ['The Da Vinci Code','Gone Girl','The Girl on the Train','Murder on the Orient Express','The Silent Patient'],
  'Non-Fiction': ['Sapiens','21 Lessons for the 21st Century','Atomic Habits','Thinking Fast and Slow','The Power of Habit'],
  'Self-Help': ['Atomic Habits','The Power of Habit','Mindset','The 7 Habits','Emotional Intelligence','Deep Work'],
  'Science Fiction': ['Dune','The Martian','Ender\'s Game','Brave New World','Fahrenheit 451','Neuromancer'],
};

function isPtBr(locale: string): boolean {
  return locale === 'pt-BR';
}

function isEn(locale: string): boolean {
  return locale.startsWith('en');
}

function isFr(locale: string): boolean {
  return locale === 'fr-FR';
}

export function getMovieGenreMap(locale: string): Record<string, string[]> {
  if (isPtBr(locale)) return MOVIE_GENRE_MAP_PT;
  return MOVIE_GENRE_MAP_EN;
}

export function getGameGenreMap(locale: string): Record<string, string[]> {
  if (isPtBr(locale)) return GAME_GENRE_MAP_PT;
  return GAME_GENRE_MAP_EN;
}

export function getMusicGenreInstruments(locale: string): Record<string, string[]> {
  if (isPtBr(locale)) return MUSIC_GENRE_INSTRUMENTS_PT;
  return MUSIC_GENRE_INSTRUMENTS_EN;
}

export function getSeriesGenreMap(locale: string): Record<string, string[]> {
  if (isPtBr(locale)) return SERIES_GENRE_MAP_PT;
  return SERIES_GENRE_MAP_EN;
}

export function getBookGenreMap(locale: string): Record<string, string[]> {
  if (isPtBr(locale)) return BOOK_GENRE_MAP_PT;
  return BOOK_GENRE_MAP_EN;
}
