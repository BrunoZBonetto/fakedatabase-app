const UNIVERSITY_COURSES_PT: Record<string, string[]> = {
  'Universidade de São Paulo (USP)': ['Medicina','Direito','Engenharia Civil','Ciência da Computação','Arquitetura'],
  'Universidade Estadual de Campinas (UNICAMP)': ['Engenharia Mecânica','Ciência da Computação','Medicina','Matemática'],
  'Universidade Federal do Rio de Janeiro (UFRJ)': ['Direito','Engenharia de Produção','Medicina','Economia'],
  'Universidade Federal de Minas Gerais (UFMG)': ['Medicina','Direito','Ciência da Computação','Engenharia Civil'],
  'Pontifícia Universidade Católica de São Paulo (PUC-SP)': ['Direito','Administração de Empresas','Psicologia','Jornalismo'],
  'Massachusetts Institute of Technology (MIT)': ['Engenharia Elétrica','Ciência da Computação','Física'],
  'Stanford University': ['Administração de Empresas','Ciência da Computação','Medicina'],
  'Harvard University': ['Direito','Medicina','Administração de Empresas','Economia'],
  'Universidade Federal do Rio Grande do Sul (UFRGS)': ['Medicina','Engenharia','Direito','Economia','Ciência da Computação'],
  'Universidade Federal do Paraná (UFPR)': ['Medicina','Direito','Engenharia Civil','Arquitetura'],
  'Universidade de Brasília (UnB)': ['Direito','Medicina','Ciência da Computação','Relações Internacionais'],
  'Pontifícia Universidade Católica do Rio de Janeiro (PUC-Rio)': ['Direito','Administração','Engenharia','Informática'],
};

const UNIVERSITY_COURSES_EN: Record<string, string[]> = {
  'Harvard University': ['Law','Medicine','Business Administration','Economics','Political Science','Computer Science'],
  'Stanford University': ['Computer Science','Business Administration','Engineering','Psychology','Medicine'],
  'Massachusetts Institute of Technology (MIT)': ['Computer Science','Mechanical Engineering','Electrical Engineering','Physics','Mathematics'],
  'Yale University': ['Law','Medicine','History','English Literature','Economics'],
  'University of California, Berkeley': ['Computer Science','Economics','Biology','Engineering','Mathematics'],
  'Carnegie Mellon University': ['Computer Science','Software Engineering','Information Systems','Robotics'],
  'Columbia University': ['Journalism','Law','Medicine','Business','Engineering'],
  'University of Michigan': ['Engineering','Business','Medicine','Computer Science','Economics'],
  'Princeton University': ['Mathematics','Physics','Economics','Computer Science','Public Policy'],
  'University of Chicago': ['Economics','Law','Physics','Computer Science','Business'],
};

const UNIVERSITY_COURSES_FR: Record<string, string[]> = {
  'Sorbonne': ['Lettres','Histoire','Philosophie','Droit','Économie','Sciences'],
  'Polytechnique': ['Mathématiques','Physique','Informatique','Génie civil','Électronique'],
  'HEC': ['Finance','Marketing','Management','Stratégie','Entrepreneuriat'],
  'ESSEC': ['Finance','Marketing','Management','Supply Chain','Entrepreneuriat'],
  'CentraleSupélec': ['Génie mécanique','Génie électrique','Informatique','Mathématiques'],
  'ENS': ['Lettres','Sciences','Philosophie','Mathématiques','Physique'],
  'Sciences Po': ['Science politique','Droit','Économie','Histoire','Sociologie'],
  'Dauphine': ['Mathématiques','Économie','Informatique','Droit','Gestion'],
  'Panthéon-Sorbonne': ['Droit','Histoire','Économie','Lettres','Sociologie'],
  'Lyon 1': ['Médecine','Sciences','Pharmacie','Odontologie','Mathématiques'],
};

const UNIVERSITY_COURSES_GB: Record<string, string[]> = {
  'University of Oxford': ['Law','Medicine','English Literature','Mathematics','Physics','Philosophy Politics and Economics'],
  'University of Cambridge': ['Natural Sciences','Engineering','Mathematics','Computer Science','Law','Medicine'],
  'Imperial College London': ['Engineering','Computer Science','Medicine','Physics','Mathematics','Business'],
  'University College London (UCL)': ['Law','Medicine','Economics','Architecture','Psychology','Engineering'],
  'University of Edinburgh': ['Medicine','Law','Computer Science','Engineering','English Literature','Philosophy'],
  'King\'s College London': ['Law','Medicine','Nursing','Psychology','Business','Engineering'],
  'University of Manchester': ['Engineering','Medicine','Law','Computer Science','Economics','Architecture'],
  'London School of Economics (LSE)': ['Economics','Law','International Relations','Philosophy','Sociology','Accounting and Finance'],
  'University of Bristol': ['Engineering','Medicine','Law','Economics','Computer Science','Architecture'],
  'University of Glasgow': ['Medicine','Law','Engineering','Computing Science','Economics','Veterinary Medicine'],
};

export function getUniversityCoursesMap(locale: string): Record<string, string[]> {
  switch (locale) {
    case 'pt-BR':
      return UNIVERSITY_COURSES_PT;
    case 'en-GB':
      return UNIVERSITY_COURSES_GB;
    case 'fr-FR':
      return UNIVERSITY_COURSES_FR;
    case 'en-US':
    default:
      return UNIVERSITY_COURSES_EN;
  }
}
