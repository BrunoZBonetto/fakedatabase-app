const AGE_MARITAL_PT: Record<string, string[]> = {
  young: ['Solteiro(a)', 'Solteiro(a)', 'Solteiro(a)', 'União Estável'],
  mid: ['Casado(a)', 'Casado(a)', 'Divorciado(a)', 'Solteiro(a)', 'União Estável'],
  senior: ['Casado(a)', 'Viúvo(a)', 'Divorciado(a)', 'Casado(a)'],
};

const AGE_MARITAL_EN: Record<string, string[]> = {
  young: ['Single', 'Single', 'Single', 'In a Relationship'],
  mid: ['Married', 'Married', 'Divorced', 'Single', 'Domestic Partnership'],
  senior: ['Married', 'Widowed', 'Divorced', 'Married'],
};

const AGE_EDUCATION_PT: Record<string, string[]> = {
  young: ['Graduação Incompleta', 'Graduação Completa', 'Curso Técnico Completo'],
  mid: ['Graduação Completa', 'Pós-graduação Completa', 'MBA Completo', 'Mestrado Completo'],
  senior: ['Graduação Completa', 'Pós-graduação Completa', 'Mestrado Completo', 'Doutorado Completo', 'MBA Completo'],
};

const AGE_EDUCATION_EN: Record<string, string[]> = {
  young: ['Some College', "Bachelor's Degree", 'Associate Degree'],
  mid: ["Bachelor's Degree", "Master's Degree", 'MBA', 'PhD'],
  senior: ["Bachelor's Degree", "Master's Degree", 'PhD', 'MBA', 'MD'],
};

const AGE_HOBBY_PT: Record<string, string[]> = {
  young: ['Videogame', 'Fotografia', 'Dança', 'Skate', 'Leitura', 'Yoga', 'Xadrez'],
  mid: ['Culinária', 'Jardinagem', 'Fotografia', 'Pesca', 'Viagem', 'Leitura', 'Marcenaria'],
  senior: ['Jardinagem', 'Pesca', 'Leitura', 'Colecionismo', 'Xadrez', 'Culinária', 'Marcenaria'],
};

const AGE_HOBBY_EN: Record<string, string[]> = {
  young: ['Gaming', 'Photography', 'Dance', 'Skateboarding', 'Reading', 'Yoga', 'Chess'],
  mid: ['Cooking', 'Gardening', 'Photography', 'Fishing', 'Travel', 'Reading', 'Woodworking'],
  senior: ['Gardening', 'Fishing', 'Reading', 'Collecting', 'Chess', 'Cooking', 'Woodworking'],
};

const AGE_MARITAL_FR: Record<string, string[]> = {
  young: ['Célibataire', 'Célibataire', 'Célibataire', 'En couple'],
  mid: ['Marié', 'Marié', 'Divorcé', 'Célibataire', 'Pacsé'],
  senior: ['Marié', 'Veuf', 'Divorcé', 'Marié'],
};

const AGE_EDUCATION_FR: Record<string, string[]> = {
  young: ['Licence', 'Licence professionnelle', 'BTS'],
  mid: ['Master', 'Diplôme d\'ingénieur', 'Mastère', 'Doctorat'],
  senior: ['Master', 'Diplôme d\'ingénieur', 'Doctorat', 'Habilitation à diriger des recherches'],
};

const AGE_HOBBY_FR: Record<string, string[]> = {
  young: ['Jeux vidéo', 'Photographie', 'Danse', 'Skate', 'Lecture', 'Yoga', 'Échecs'],
  mid: ['Cuisine', 'Jardinage', 'Photographie', 'Pêche', 'Voyage', 'Lecture', 'Bricolage'],
  senior: ['Jardinage', 'Pêche', 'Lecture', 'Collection', 'Échecs', 'Cuisine', 'Bricolage'],
};

function isPT(locale: string): boolean {
  return locale.startsWith('pt');
}

function isFR(locale: string): boolean {
  return locale === 'fr-FR';
}

export function getAgeMaritalMap(locale: string): Record<string, string[]> {
  if (isFR(locale)) return AGE_MARITAL_FR;
  return isPT(locale) ? AGE_MARITAL_PT : AGE_MARITAL_EN;
}

export function getAgeEducationMap(locale: string): Record<string, string[]> {
  if (isFR(locale)) return AGE_EDUCATION_FR;
  return isPT(locale) ? AGE_EDUCATION_PT : AGE_EDUCATION_EN;
}

export function getAgeHobbyMap(locale: string): Record<string, string[]> {
  if (isFR(locale)) return AGE_HOBBY_FR;
  return isPT(locale) ? AGE_HOBBY_PT : AGE_HOBBY_EN;
}
