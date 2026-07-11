const GENDER_TITLE_PT: Record<string, string[]> = {
  'Masculino': ['Sr.','Dr.','Prof.','Eng.','Arq.','Doutor','Professor','Engenheiro','Arquiteto','Senhor'],
  'Feminino': ['Sra.','Srta.','Dra.','Profa.','Enga.','Arqa.','Doutora','Professora','Engenheira','Arquiteta','Senhorita'],
};

const GENDER_TITLE_EN: Record<string, string[]> = {
  'Male': ['Mr.','Sir','Lord','Dr.','Prof.','Gentleman'],
  'Female': ['Ms.','Mrs.','Lady','Dame','Dr.','Prof.','Madam'],
};

export function getGenderTitleMap(locale: string): Record<string, string[]> {
  if (locale === 'pt-BR') return GENDER_TITLE_PT;
  if (locale.startsWith('en-')) return GENDER_TITLE_EN;
  return GENDER_TITLE_EN;
}
