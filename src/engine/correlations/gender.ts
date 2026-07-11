const GENDER_TITLE_PT: Record<string, string[]> = {
  'Masculino': ['Sr.','Dr.','Prof.','Eng.','Arq.','Doutor','Professor','Engenheiro','Arquiteto','Senhor'],
  'Feminino': ['Sra.','Srta.','Dra.','Profa.','Enga.','Arqa.','Doutora','Professora','Engenheira','Arquiteta','Senhorita'],
};

const GENDER_TITLE_EN: Record<string, string[]> = {
  'Male': ['Mr.','Sir','Lord','Dr.','Prof.','Gentleman'],
  'Female': ['Ms.','Mrs.','Lady','Dame','Dr.','Prof.','Madam'],
};

const GENDER_TITLE_FR: Record<string, string[]> = {
  'Homme': ['M.','Dr.','Prof.'],
  'Femme': ['Mme','Mlle','Dr.','Pr.'],
  'Masculino': ['M.','Dr.','Prof.'],
  'Feminino': ['Mme','Mlle','Dr.','Pr.'],
  'Male': ['M.','Dr.','Prof.'],
  'Female': ['Mme','Mlle','Dr.','Pr.'],
};

export function getGenderTitleMap(locale: string): Record<string, string[]> {
  if (locale === 'pt-BR') return GENDER_TITLE_PT;
  if (locale === 'fr-FR') return GENDER_TITLE_FR;
  if (locale.startsWith('en-')) return GENDER_TITLE_EN;
  return GENDER_TITLE_EN;
}
