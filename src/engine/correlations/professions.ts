const PROFESSION_SECTOR_PT: Record<string, string[]> = {
  'Médico': ['Saúde'],
  'Enfermeiro': ['Saúde'],
  'Farmacêutico': ['Saúde', 'Farmacêutico'],
  'Professor': ['Educação'],
  'Diretor de Escola': ['Educação'],
  'Programador': ['Tecnologia da Informação'],
  'Analista de Sistemas': ['Tecnologia da Informação'],
  'Engenheiro': ['Construção Civil', 'Indústria', 'Automotivo', 'Energia'],
  'Advogado': ['Consultoria', 'Jurídico'],
  'Contador': ['Finanças', 'Consultoria'],
  'Consultor': ['Consultoria', 'Tecnologia da Informação', 'Marketing Digital'],
  'Vendedor': ['Varejo', 'E-commerce', 'Comercial'],
  'Designer': ['Marketing Digital', 'Tecnologia da Informação', 'Moda'],
  'Motorista': ['Logística', 'Transporte'],
  'Cozinheiro': ['Alimentício', 'Turismo'],
  'Cientista de Dados': ['Tecnologia da Informação', 'Finanças', 'Saúde'],
  'Gerente': ['Administrativo', 'Varejo', 'Tecnologia da Informação'],
  'Diretor': ['Administrativo', 'Executivo'],
  'Jornalista': ['Comunicação', 'Marketing Digital', 'Mídia'],
  'Arquiteto': ['Construção Civil', 'Design', 'Urbanismo'],
  'Veterinário': ['Saúde', 'Animais', 'Agronegócio'],
  'Psicólogo': ['Saúde', 'Educação', 'Recursos Humanos'],
  'Nutricionista': ['Saúde', 'Alimentício', 'Fitness'],
  'Piloto': ['Transporte', 'Aviação', 'Logística'],
  'Farmacêutico Bioquímico': ['Saúde', 'Farmacêutico', 'Pesquisa'],
  'Engenheiro de Software': ['Tecnologia da Informação'],
  'Analista de Marketing': ['Marketing Digital', 'Varejo', 'E-commerce'],
};

const PROFESSION_SECTOR_EN: Record<string, string[]> = {
  'Doctor': ['Healthcare'],
  'Nurse': ['Healthcare'],
  'Pharmacist': ['Healthcare', 'Pharmaceutical'],
  'Teacher': ['Education'],
  'Principal': ['Education'],
  'Software Developer': ['Technology'],
  'Systems Analyst': ['Technology'],
  'Engineer': ['Construction', 'Manufacturing', 'Automotive', 'Energy'],
  'Lawyer': ['Consulting', 'Legal'],
  'Accountant': ['Finance', 'Consulting'],
  'Consultant': ['Consulting', 'Technology', 'Marketing'],
  'Salesperson': ['Retail', 'E-commerce'],
  'Designer': ['Marketing', 'Technology', 'Fashion'],
  'Driver': ['Logistics', 'Transportation'],
  'Chef': ['Food & Beverage', 'Travel'],
  'Data Scientist': ['Technology', 'Finance', 'Healthcare'],
  'Manager': ['Administrative', 'Retail', 'Technology'],
  'Director': ['Executive', 'Administrative'],
  'Journalist': ['Media', 'Marketing', 'Communications'],
  'Architect': ['Construction', 'Design', 'Urban Planning'],
  'Veterinarian': ['Healthcare', 'Animals', 'Agriculture'],
  'Psychologist': ['Healthcare', 'Education', 'Human Resources'],
  'Nutritionist': ['Healthcare', 'Food & Beverage', 'Fitness'],
  'Pilot': ['Transportation', 'Aviation', 'Logistics'],
  'Software Engineer': ['Technology'],
  'Marketing Analyst': ['Marketing', 'Retail', 'E-commerce'],
};

const PROFESSION_SOFTWARE_PT: Record<string, string[]> = {
  'Desenvolvedor de Software': ['VS Code', 'IntelliJ IDEA', 'Git', 'Docker', 'Postman'],
  'Engenheiro de Dados': ['SQL Server', 'Power BI', 'Tableau', 'Airflow', 'dbt'],
  'Cientista de Dados': ['Jupyter Notebook', 'Python', 'R Studio', 'TensorFlow', 'Pandas'],
  'UX/UI Designer': ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Miro'],
  'Product Manager': ['Jira', 'Confluence', 'Notion', 'Trello', 'Miro'],
  'Analista de Marketing': ['Google Analytics', 'HubSpot', 'SEMrush', 'Google Ads', 'Mailchimp'],
  'Contador': ['Sage', 'TOTVS', 'Omie', 'Domínio', 'Fortes'],
  'Advogado': ['PJe', 'SAJ', 'Astrea', 'JusBrasil', 'Turivius'],
  'Médico': ['Tasy', 'MV', 'Epico', 'Clinicore', 'Doctoralia'],
  'Designer Gráfico': ['Photoshop', 'Illustrator', 'Canva', 'InDesign', 'CorelDRAW'],
};

const PROFESSION_SOFTWARE_EN: Record<string, string[]> = {
  'Software Developer': ['VS Code', 'IntelliJ IDEA', 'Git', 'Docker', 'Postman', 'GitHub Copilot'],
  'Data Engineer': ['SQL Server', 'Power BI', 'Tableau', 'Airflow', 'dbt', 'Snowflake'],
  'Data Scientist': ['Jupyter Notebook', 'Python', 'R Studio', 'TensorFlow', 'Pandas', 'Scikit-learn'],
  'UX/UI Designer': ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Miro', 'Zeplin'],
  'Product Manager': ['Jira', 'Confluence', 'Notion', 'Trello', 'Miro', 'Asana'],
  'Marketing Analyst': ['Google Analytics', 'HubSpot', 'SEMrush', 'Google Ads', 'Mailchimp', 'Hootsuite'],
  'Accountant': ['QuickBooks', 'Sage', 'Xero', 'FreshBooks', 'Wave'],
  'Lawyer': ['Clio', 'Westlaw', 'LexisNexis', 'LegalZoom', 'Rocket Lawyer'],
  'Doctor': ['Epic', 'Cerner', 'Allscripts', 'Athenahealth', 'DrChrono'],
  'Graphic Designer': ['Photoshop', 'Illustrator', 'Canva', 'InDesign', 'Figma', 'CorelDRAW'],
};

const PROFESSION_SECTOR_FR: Record<string, string[]> = {
  'Médecin': ['Santé'],
  'Infirmier': ['Santé'],
  'Infirmière': ['Santé'],
  'Pharmacien': ['Santé', 'Pharmaceutique'],
  'Professeur': ['Éducation'],
  'Développeur': ['Technologie'],
  'Ingénieur': ['Construction', 'Industrie', 'Automobile', 'Énergie'],
  'Avocat': ['Consulting', 'Juridique'],
  'Comptable': ['Finance', 'Consulting'],
  'Consultant': ['Consulting', 'Technologie', 'Marketing'],
  'Commercial': ['Commerce', 'E-commerce'],
  'Designer': ['Marketing', 'Technologie', 'Mode'],
  'Chef cuisinier': ['Alimentaire', 'Tourisme'],
  'Cientiste de données': ['Technologie', 'Finance', 'Santé'],
  'Manager': ['Administratif', 'Commerce', 'Technologie'],
  'Directeur': ['Exécutif', 'Administratif'],
  'Journaliste': ['Média', 'Marketing', 'Communication'],
  'Architecte': ['Construction', 'Design', 'Urbanisme'],
  'Vétérinaire': ['Santé', 'Animaux', 'Agriculture'],
  'Psychologue': ['Santé', 'Éducation', 'Ressources Humaines'],
  'Pilote': ['Transport', 'Aviation', 'Logistique'],
  'Développeur de logiciels': ['Technologie'],
  'Analyste Marketing': ['Marketing', 'Commerce', 'E-commerce'],
};

const PROFESSION_SOFTWARE_FR: Record<string, string[]> = {
  'Développeur': ['VS Code', 'IntelliJ IDEA', 'Git', 'Docker', 'Postman', 'GitHub Copilot'],
  'Développeuse': ['VS Code', 'IntelliJ IDEA', 'Git', 'Docker', 'Postman', 'GitHub Copilot'],
  'Ingénieur': ['AutoCAD', 'SolidWorks', 'MATLAB', 'Git', 'Docker'],
  'Ingénieure': ['AutoCAD', 'SolidWorks', 'MATLAB', 'Git', 'Docker'],
  'Designer': ['Figma', 'Sketch', 'Adobe XD', 'InVision', 'Miro', 'Zeplin'],
  'Consultant': ['Jira', 'Confluence', 'Notion', 'Trello', 'Miro', 'Asana'],
  'Analyste': ['Google Analytics', 'HubSpot', 'SEMrush', 'Google Ads', 'Mailchimp'],
  'Comptable': ['Sage', 'Cegid', 'EBP', 'QuickBooks', 'Wave'],
  'Avocat': ['Doxia', 'LexBase', 'Legalstart', 'Droit-Réponse'],
  'Médecin': ['Doctolib', 'MédecinLibre', 'Keldoc', 'MondoDoc'],
  'Journaliste': ['WordPress', 'Canva', 'Hootsuite', 'Google Analytics'],
};

const SECTOR_MAPS: Record<string, Record<string, string[]>> = {
  'pt': PROFESSION_SECTOR_PT,
  'pt-BR': PROFESSION_SECTOR_PT,
  'en': PROFESSION_SECTOR_EN,
  'en-GB': PROFESSION_SECTOR_EN,
  'fr-FR': PROFESSION_SECTOR_FR,
};

const SOFTWARE_MAPS: Record<string, Record<string, string[]>> = {
  'pt': PROFESSION_SOFTWARE_PT,
  'pt-BR': PROFESSION_SOFTWARE_PT,
  'en': PROFESSION_SOFTWARE_EN,
  'en-GB': PROFESSION_SOFTWARE_EN,
  'fr-FR': PROFESSION_SOFTWARE_FR,
};

export function getProfessionSectorMap(locale: string): Record<string, string[]> {
  return SECTOR_MAPS[locale] ?? PROFESSION_SECTOR_EN;
}

export function getProfessionSoftwareMap(locale: string): Record<string, string[]> {
  return SOFTWARE_MAPS[locale] ?? PROFESSION_SOFTWARE_EN;
}
