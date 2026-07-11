import { randomPick, randomInt, randomBool, randomDate, generateCPF, generateCNPJ, generateSSN, generateEIN, generateNINO } from '../utils/random';
import namesPt from '../dictionaries/names.json';
import addressPt from '../dictionaries/address.json';
import companyPt from '../dictionaries/company.json';
import internet from '../dictionaries/internet.json';
import financePt from '../dictionaries/finance.json';
import professionPt from '../dictionaries/profession.json';
import categoriesPt from '../dictionaries/categories.json';
import world from '../dictionaries/world.json';
import personPt from '../dictionaries/person.json';
import educationPt from '../dictionaries/education.json';
import healthPt from '../dictionaries/health.json';
import entertainmentPt from '../dictionaries/entertainment.json';
import foodPt from '../dictionaries/food.json';
import animalPt from '../dictionaries/animal.json';
import fashionPt from '../dictionaries/fashion.json';
import namesEn from '../dictionaries/en/names.json';
import addressEn from '../dictionaries/en/address.json';
import companyEn from '../dictionaries/en/company.json';
import financeEn from '../dictionaries/en/finance.json';
import professionEn from '../dictionaries/en/profession.json';
import categoriesEn from '../dictionaries/en/categories.json';
import personEn from '../dictionaries/en/person.json';
import educationEn from '../dictionaries/en/education.json';
import healthEn from '../dictionaries/en/health.json';
import entertainmentEn from '../dictionaries/en/entertainment.json';
import foodEn from '../dictionaries/en/food.json';
import animalEn from '../dictionaries/en/animal.json';
import fashionEn from '../dictionaries/en/fashion.json';
import namesGb from '../dictionaries/en-GB/names.json';
import addressGb from '../dictionaries/en-GB/address.json';
import companyGb from '../dictionaries/en-GB/company.json';
import financeGb from '../dictionaries/en-GB/finance.json';
import professionGb from '../dictionaries/en-GB/profession.json';
import categoriesGb from '../dictionaries/en-GB/categories.json';
import personGb from '../dictionaries/en-GB/person.json';
import educationGb from '../dictionaries/en-GB/education.json';
import healthGb from '../dictionaries/en-GB/health.json';
import entertainmentGb from '../dictionaries/en-GB/entertainment.json';
import foodGb from '../dictionaries/en-GB/food.json';
import animalGb from '../dictionaries/en-GB/animal.json';
import fashionGb from '../dictionaries/en-GB/fashion.json';
import {
  getCarBrandData,
  getProductCategoryMap, getProductNames, getProductCategories,
  getMovieGenreMap, getGameGenreMap, getMusicGenreInstruments,
  getSeriesGenreMap, getBookGenreMap,
  getProfessionSectorMap, getProfessionSoftwareMap,
  getDiseaseMedicationMap,
  getCuisineRestaurantMap, getDietFoodMap,
  getUniversityCoursesMap,
  getDogBreedNames, getCatBreedNames,
  getOSBrowserMap, getOSPhoneMap,
  getClothingTypeSizes,
  getCreditCardBins,
  COUNTRY_CURRENCY, getCountryCorrelation,
  getGenderTitleMap,
  getCategoryPriceMap, getCategoryShippingMap,
  getFootballTeamStateMap, getBasketballTeamStateMap,
  getZodiacSigns, ZODIAC_BOUNDARIES, getZodiac, randomDateInZodiac,
  getAgeMaritalMap, getAgeEducationMap, getAgeHobbyMap,
  getHobbyEquipmentMap, getStreamingGenreMap,
} from './correlations';

interface DictSet {
  names: {
    _description: string;
    firstName: Record<string, string[]>;
    lastName: string[];
  };
  address: {
    _description: string;
    streetPrefix: string[];
    streetNames?: string[];
    streetSuffix?: string[];
    neighborhoods: string[];
    cities: { name: string; state: string }[];
    states: { name: string; abbr: string }[];
  };
  company: typeof companyPt;
  finance: typeof financePt;
  profession: typeof professionPt;
  categories: typeof categoriesPt & { baseballTeams?: string[]; hobbiesSports?: string[] };
  person: typeof personPt;
  education: typeof educationPt;
  health: typeof healthPt;
  entertainment: typeof entertainmentPt;
  food: typeof foodPt;
  animal: typeof animalPt;
  fashion: typeof fashionPt;
}

const DICT_PT: DictSet = { names: namesPt as DictSet['names'], address: addressPt as DictSet['address'], company: companyPt, finance: financePt, profession: professionPt, categories: categoriesPt as DictSet['categories'], person: personPt, education: educationPt, health: healthPt, entertainment: entertainmentPt, food: foodPt, animal: animalPt, fashion: fashionPt };
const DICT_EN: DictSet = { names: namesEn as DictSet['names'], address: addressEn as DictSet['address'], company: companyEn, finance: financeEn, profession: professionEn, categories: categoriesEn as DictSet['categories'], person: personEn, education: educationEn, health: healthEn, entertainment: entertainmentEn, food: foodEn, animal: animalEn, fashion: fashionEn };
const DICT_EN_GB: DictSet = { names: namesGb as DictSet['names'], address: addressGb as DictSet['address'], company: companyGb, finance: financeGb, profession: professionGb, categories: categoriesGb as DictSet['categories'], person: personGb, education: educationGb, health: healthGb, entertainment: entertainmentGb, food: foodGb, animal: animalGb, fashion: fashionGb };

const DICT_MAP: Record<string, DictSet> = {
  'pt-BR': DICT_PT,
  'en-US': DICT_EN,
  'en-GB': DICT_EN_GB,
};

// ===== Colunas Personalizadas: dicionário de inferência semântica =====
// Mapeia palavras-chave (PT/EN) encontradas no nome da coluna para um gerador já existente
const SEMANTIC_MAP = [
  // ===== Identificação =====
  { keywords: ['uuid'], generator: 'uuid' },
  { keywords: ['cpf'], generator: 'cpf' },
  { keywords: ['nino'], generator: 'nino' },
  { keywords: ['cnpj'], generator: 'cnpj' },
  { keywords: ['rg'], generator: 'rg' },

  // ===== Nome / Pessoa =====
  { keywords: ['primeironome', 'firstname'], generator: 'firstName' },
  { keywords: ['sobrenome', 'lastname'], generator: 'lastName' },
  { keywords: ['nomecompleto', 'fullname'], generator: 'fullName' },
  { keywords: ['apelido', 'nickname'], generator: 'nickname' },
  { keywords: ['nome', 'name'], generator: 'fullName' },
  { keywords: ['genero', 'gender', 'sexo'], generator: 'gender' },
  { keywords: ['estadocivil', 'maritalstatus'], generator: 'maritalStatus' },
  { keywords: ['tiposanguineo', 'bloodtype'], generator: 'bloodType' },
  { keywords: ['signo', 'zodiac'], generator: 'zodiacSign' },
  { keywords: ['religiao', 'religion'], generator: 'religion' },
  { keywords: ['corcabelo', 'haircolor'], generator: 'hairColor' },
  { keywords: ['corolho', 'eyecolor'], generator: 'eyeColor' },

  // ===== Contato =====
  { keywords: ['email', 'mail'], generator: 'email' },
  { keywords: ['telefonefixo'], generator: 'phoneFixo' },
  { keywords: ['telefone', 'celular', 'phone', 'fone'], generator: 'phone' },
  { keywords: ['linkedin'], generator: 'linkedin' },
  { keywords: ['site', 'website', 'url'], generator: 'website' },
  { keywords: ['redesocial', 'socialmedia'], generator: 'socialMedia' },
  { keywords: ['streaming'], generator: 'streamingPlatform' },
  { keywords: ['navegador', 'browser'], generator: 'browser' },
  { keywords: ['sistemaoperacional', 'operatingsystem', 'so'], generator: 'operatingSystem' },
  { keywords: ['linguagemprogramacao', 'programminglanguage'], generator: 'programmingLanguage' },
  { keywords: ['bancodedados', 'database'], generator: 'database' },

  // ===== Endereço =====
  { keywords: ['enderecocompleto', 'fulladdress'], generator: 'fullAddress' },
  { keywords: ['endereco', 'rua', 'street', 'address', 'logradouro'], generator: 'street' },
  { keywords: ['bairro', 'neighborhood'], generator: 'neighborhood' },
  { keywords: ['cidade', 'city'], generator: 'city' },
  { keywords: ['uf', 'estadosigla'], generator: 'state' },
  { keywords: ['estado', 'state'], generator: 'stateFull' },
  { keywords: ['cep', 'zipcode', 'zip'], generator: 'zipCode' },
  { keywords: ['pais', 'country'], generator: 'country' },

  // ===== Profissional =====
  { keywords: ['empresa', 'company'], generator: 'company' },
  { keywords: ['setor', 'sector'], generator: 'sector' },
  { keywords: ['cargo', 'posicao', 'position', 'job'], generator: 'position' },
  { keywords: ['area', 'department'], generator: 'area' },
  { keywords: ['profissao', 'profession'], generator: 'profession' },
  { keywords: ['escolaridade', 'education'], generator: 'education' },
  { keywords: ['materiaescolar', 'schoolsubject', 'disciplina'], generator: 'schoolSubject' },
  { keywords: ['senioridade', 'seniority'], generator: 'seniority' },
  { keywords: ['salario', 'salary'], generator: 'salary' },

  // ===== Financeiro =====
  { keywords: ['banco', 'bank'], generator: 'bank' },
  { keywords: ['moeda', 'currency'], generator: 'currency' },
  { keywords: ['pagamento', 'paymentmethod'], generator: 'paymentMethod' },
  { keywords: ['statuspedido', 'orderstatus'], generator: 'orderStatus' },
  { keywords: ['status', 'situacao'], generator: 'status' },
  { keywords: ['preco', 'price', 'valor', 'amount'], generator: 'price' },

  // ===== Datas / Números =====
  { keywords: ['datanascimento', 'birthdate', 'nascimento'], generator: 'birthDate' },
  { keywords: ['datahora', 'datetime'], generator: 'dateTime' },
  { keywords: ['data', 'date'], generator: 'date' },
  { keywords: ['diasemana', 'weekday'], generator: 'weekDay' },
  { keywords: ['mes', 'month'], generator: 'month' },
  { keywords: ['estacao', 'season'], generator: 'season' },
  { keywords: ['ano', 'year'], generator: 'year' },
  { keywords: ['idade', 'age'], generator: 'age' },
  { keywords: ['quantidade', 'qtd', 'quantity'], generator: 'quantity' },
  { keywords: ['percentual', 'percentage', 'porcentagem'], generator: 'percentage' },
  { keywords: ['avaliacao', 'rating', 'nota'], generator: 'rating' },

  // ===== Produto =====
  { keywords: ['produtocategoria', 'productcategory', 'categoriaproduto'], generator: 'productCategory' },
  { keywords: ['produto', 'product'], generator: 'product' },
  { keywords: ['sku'], generator: 'sku' },
  { keywords: ['codigobarras', 'barcode'], generator: 'barcode' },

  // ===== Novas categorias amplas =====
  { keywords: ['timedefutebol', 'timefutebol', 'clubefutebol'], generator: 'footballTeam' },
  { keywords: ['timebasquete', 'timedebasquete'], generator: 'basketballTeam' },
  { keywords: ['time', 'equipe', 'team', 'clube'], generator: 'footballTeam' },
  { keywords: ['comidafavorita', 'comida', 'food', 'pratofavorito', 'prato'], generator: 'food' },
  { keywords: ['bebidafavorita', 'bebida', 'drink'], generator: 'drink' },
  { keywords: ['fruta', 'fruit', 'frutafavorita'], generator: 'fruit' },
  { keywords: ['racacachorro', 'dogbreed'], generator: 'dogBreed' },
  { keywords: ['racagato', 'catbreed'], generator: 'catBreed' },
  { keywords: ['animalestimacao', 'pet', 'animal'], generator: 'animal' },
  { keywords: ['filmefavorito', 'filme', 'movie'], generator: 'movie' },
  { keywords: ['generofilme', 'moviegenre'], generator: 'movieGenre' },
  { keywords: ['generolivro', 'bookgenre'], generator: 'bookGenre' },
  { keywords: ['serie', 'series'], generator: 'series' },
  { keywords: ['generomusical', 'musicgenre', 'estilomusical'], generator: 'musicGenre' },
  { keywords: ['instrumentomusical', 'instrument'], generator: 'instrument' },
  { keywords: ['esportefavorito', 'esporte', 'sport'], generator: 'sport' },
  { keywords: ['hobby', 'passatempo'], generator: 'hobby' },
  { keywords: ['marcacarro', 'carbrand'], generator: 'carBrand' },
  { keywords: ['modelocarro', 'carmodel'], generator: 'carModel' },
  { keywords: ['combustivel', 'fuel'], generator: 'fuelType' },
  { keywords: ['marcacelular', 'phonebrand'], generator: 'phoneBrand' },
  { keywords: ['tipoveiculo', 'vehicletype'], generator: 'vehicleType' },
  { keywords: ['tiporoupa', 'clothingtype', 'peca'], generator: 'clothingType' },
  { keywords: ['tamanhoroupa', 'clothingsize'], generator: 'clothingSize' },
  { keywords: ['corfavorita', 'cor', 'color'], generator: 'color' },
  { keywords: ['planeta', 'planet'], generator: 'planet' },

  // ===== Novas características pessoais =====
  { keywords: ['sufixo', 'suffix'], generator: 'suffix' },
  { keywords: ['titulo', 'title', 'tratamento'], generator: 'title' },
  { keywords: ['nomedamae', 'mae', 'mothername'], generator: 'motherName' },
  { keywords: ['nomedopai', 'pai', 'fathername'], generator: 'fatherName' },
  { keywords: ['etnia', 'ethnicity', 'raca'], generator: 'ethnicity' },
  { keywords: ['nacionalidade', 'nationality'], generator: 'nationality' },
  { keywords: ['naturalidade', 'naturalness', 'cidadenatal'], generator: 'naturalness' },

  // ===== Tecnologia =====
  { keywords: ['ip', 'enderecoip', 'ipaddress', 'ipv4', 'ipv6'], generator: 'ipAddress' },
  { keywords: ['mac', 'macaddress', 'enderecomac'], generator: 'macAddress' },
  { keywords: ['useragent', 'useragent'], generator: 'userAgent' },
  { keywords: ['hostname', 'host', 'serverhost'], generator: 'hostname' },

  // ===== Veículo =====
  { keywords: ['placa', 'licenseplate', 'licensplate'], generator: 'licensePlate' },
  { keywords: ['renavam'], generator: 'renavam' },
  { keywords: ['chassi', 'vin'], generator: 'chassi' },
  { keywords: ['anoveiculo', 'caryear', 'anocarro'], generator: 'carYear' },

  // ===== Alimentação =====
  { keywords: ['tipocozinha', 'cuisinetype', 'cozinha'], generator: 'cuisineType' },
  { keywords: ['restricaoalimentar', 'dietaryrestriction', 'dieta'], generator: 'dietaryRestriction' },
  { keywords: ['refeicao', 'meal'], generator: 'meal' },
  { keywords: ['restaurante', 'restaurant'], generator: 'restaurant' },

  // ===== Saúde =====
  { keywords: ['altura', 'height'], generator: 'height' },
  { keywords: ['peso', 'weight'], generator: 'weight' },
  { keywords: ['pressaoarterial', 'bloodpressure', 'pressao'], generator: 'bloodPressure' },
  { keywords: ['frequenciacardiaca', 'heartrate', 'batimentos'], generator: 'heartRate' },
  { keywords: ['alergia', 'allergy'], generator: 'allergy' },
  { keywords: ['doenca', 'disease', 'condicao'], generator: 'disease' },
  { keywords: ['medicamento', 'medication', 'remedio'], generator: 'medication' },

  // ===== Educação =====
  { keywords: ['universidade', 'university', 'faculdade', 'instituicao'], generator: 'university' },
  { keywords: ['curso', 'course'], generator: 'course' },
  { keywords: ['grauacademico', 'degreetype', 'formacao'], generator: 'degreeType' },
  { keywords: ['nota', 'grade', 'media'], generator: 'grade' },

  // ===== Jogos =====
  { keywords: ['generoserie','seriesgenre','generoserie'], generator: 'seriesGenre' },
  { keywords: ['generolivro','bookgenre'], generator: 'bookGenre' },
  { keywords: ['software','ferramenta'], generator: 'software' },
  { keywords: ['equipamento','equipment'], generator: 'equipment' },
  { keywords: ['generostreaming','streaminggenre'], generator: 'streamingGenre' },
  { keywords: ['jogo', 'game', 'videogame'], generator: 'game' },
  { keywords: ['generodejogo', 'gamegenre', 'generojogo'], generator: 'gameGenre' },

  // ===== Geografia =====
  { keywords: ['continente', 'continent'], generator: 'continent' },
  { keywords: ['idioma', 'language', 'lingua'], generator: 'language' },
  { keywords: ['fuso', 'fuso horario', 'timezone', 'timezone', 'utc'], generator: 'timezone' },
  { keywords: ['latitude', 'lat'], generator: 'latitude' },
  { keywords: ['longitude', 'lng', 'long'], generator: 'longitude' },

  // ===== Animais =====
  { keywords: ['nomepet', 'petname', 'nomeanimal', 'nomebichinho'], generator: 'petName' },

  // ===== Moda =====
  { keywords: ['marcaroupa', 'clothingbrand', 'marcaderoupa'], generator: 'clothingBrand' },
  { keywords: ['numerosapato', 'footwearsize', 'calcado'], generator: 'footwearSize' },
  { keywords: ['tecido', 'fabric', 'materialroupa'], generator: 'fabric' },

  // ===== Financeiro extra =====
  { keywords: ['desconto', 'discount'], generator: 'discount' },
  { keywords: ['imposto', 'tax'], generator: 'tax' },
  { keywords: ['bandeiracartao', 'creditcardflag', 'bandeiracartao'], generator: 'creditCardFlag' },
  { keywords: ['numerocartao', 'creditcardnumber', 'numerodecartao'], generator: 'creditCardNumber' },
  { keywords: ['numeronf', 'invoicenumber', 'notafiscal'], generator: 'invoiceNumber' },
  { keywords: ['codigorastreio', 'trackingcode', 'rastreio'], generator: 'trackingCode' },
  { keywords: ['transportadora', 'shippingmethod', 'envio'], generator: 'shippingMethod' },

  // ===== Datas extra =====
  { keywords: ['hora', 'time', 'horario'], generator: 'time' },
  { keywords: ['timestamp', 'carimbo'], generator: 'timestamp' },
  { keywords: ['datavencimento', 'duedate', 'vencimento'], generator: 'dueDate' },
  { keywords: ['datapagamento', 'paymentdate'], generator: 'paymentDate' },

  // ===== Nome extra =====
  // ===== Fallback texto =====
  { keywords: ['descricao', 'lorem', 'texto'], generator: 'lorem' },
];


function normalizeColumnName(str) {
  return str
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '') // remove acentos
    .replace(/[_\-\s]/g, '')                          // remove separadores
    .toLowerCase();
}

function findSemanticMatch(columnName) {
  const normalized = normalizeColumnName(columnName);
  for (const entry of SEMANTIC_MAP) {
    if (entry.keywords.some((kw) => normalized.includes(kw))) {
      return entry.generator;
    }
  }
  return null;
}

// Tipos de colunas personalizadas disponíveis + tamanhos sugeridos (usado pela UI também)
export const COLUMN_TYPES = {
  INT:      { label: 'Inteiro (INT)', sizes: [5, 10, 15, 20], hasSize: true },
  BIGINT:   { label: 'Inteiro Grande (BIGINT)', sizes: [20, 25], hasSize: true },
  VARCHAR:  { label: 'Texto Curto (VARCHAR)', sizes: [32, 64, 128, 256, 512], hasSize: true },
  CHAR:     { label: 'Texto Fixo (CHAR)', sizes: [1, 2, 5, 10], hasSize: true },
  TEXT:     { label: 'Texto Longo (TEXT)', sizes: [], hasSize: false },
  DECIMAL:  { label: 'Decimal (DECIMAL)', sizes: [8, 10, 12, 15], hasSize: true },
  FLOAT:    { label: 'Ponto Flutuante (FLOAT)', sizes: [8, 10, 12], hasSize: true },
  BOOLEAN:  { label: 'Booleano (BOOLEAN)', sizes: [], hasSize: false },
  DATE:     { label: 'Data (DATE)', sizes: [], hasSize: false },
  DATETIME: { label: 'Data e Hora (DATETIME)', sizes: [], hasSize: false },
  UUID:     { label: 'UUID', sizes: [36], hasSize: true },
};

// ===== Correlações entre campos (importadas de ./correlations) =====

function genShippingMethod(category: string | undefined, locale: string): string {
  const fallback = locale.startsWith('pt')
    ? ['Correios PAC', 'Correios Sedex', 'Jadlog', 'Total Express', 'Loggi', 'Transportadora Própria', 'Motoboy', 'Retirada no Local']
    : ['USPS Priority Mail', 'UPS Ground', 'FedEx Express', 'DHL Express', 'Amazon Logistics', 'Store Pickup', 'Local Delivery'];
  if (!category) return randomPick(fallback);
  const methods = getCategoryShippingMap(locale)[category];
  if (methods) return randomPick(methods);
  return randomPick(locale.startsWith('pt')
    ? ['Correios PAC', 'Correios Sedex', 'Jadlog']
    : ['USPS Priority Mail', 'UPS Ground', 'FedEx Express']);
}

function getCardBinLocale(flag: string, locale: string): string {
  const bins = getCreditCardBins(locale);
  const info = bins[flag];
  if (!info) return '4';
  const prefix = randomPick(info.prefixes);
  const remaining = info.length - prefix.length;
  return prefix + Array.from({ length: remaining }, () => randomInt(0, 9)).join('');
}

function genPhone(ctx: Record<string, any> | undefined, isMobile: boolean): string {
  const areaCode = ctx?.areaCode ?? '011';
  const fmt = ctx?.countryData?.phoneFormat ?? 'brazil';
  const localNum = isMobile
    ? `9${randomInt(1000,9999)}-${randomInt(1000,9999)}`
    : `${randomInt(3000,3999)}-${randomInt(1000,9999)}`;
  switch (fmt) {
    case 'brazil': return `(${areaCode}) ${localNum}`;
    case 'north_america': return `+1 (${areaCode}) ${randomInt(100,999)}-${randomInt(1000,9999)}`;
    case 'uk': return `+44 ${areaCode} ${randomInt(1000,9999)} ${randomInt(100,999)}`;
    case 'europe': return `+${ctx?.countryData?.phoneCode ?? '33'} ${areaCode} ${randomInt(100,999)} ${randomInt(100,999)} ${randomInt(100,999)}`;
    case 'south_america': return `(${areaCode}) ${randomInt(1000,9999)}-${randomInt(1000,9999)}`;
    case 'japan': return `+81 ${areaCode}-${randomInt(1000,9999)}-${randomInt(1000,9999)}`;
    case 'australia': return `+61 ${areaCode} ${randomInt(1000,9999)} ${randomInt(100,999)}`;
    default: return `(${areaCode}) ${localNum}`;
  }
}

interface CustomField {
  id?: string;
  name: string;
  type: string;
  size?: number | null;
  useCustomValues?: boolean;
  customValues?: { id?: string; text: string }[];
}

class FakeDataGenerator {
  private counter = 0;
  nullRate = 0;
  errorRate = 0;
  locale: string;

  constructor(nullRate = 0, errorRate = 0, locale = 'pt-BR') {
    this.nullRate = nullRate;
    this.errorRate = errorRate;
    this.locale = locale;
  }

  private get d(): DictSet {
    return DICT_MAP[this.locale] ?? (this.locale.startsWith('en') ? DICT_EN : DICT_PT);
  }

  generate(fields: string[], count = 10, customFields: CustomField[] = []) {
    return Array.from({ length: count }, () => this.generateOne(fields, customFields));
  }

  private resolveName(obj: Record<string, any>): string {
    if (this.locale.startsWith('en') && obj.nameEn) return obj.nameEn;
    return obj.name;
  }

  generateOne(fields: string[], customFields: CustomField[] = []) {
    this.counter++;
    const hasCountry = fields.includes('country');
    let ctx: Record<string, any>;
    if (hasCountry) {
      const countryKeys = Object.keys(world.countries);
      const countryKey = randomPick(countryKeys);
      const countryData: any = world.countries[countryKey];
      const stateData: any = randomPick(countryData.states);
      const cities: any[] = countryData.cities.filter(c => c.state === stateData.abbr);
      const cityData = cities.length ? randomPick(cities) : { name: this.resolveName(stateData), state: stateData.abbr };
      const areaCode = stateData.areaCodes?.length ? randomPick(stateData.areaCodes) : randomPick(countryData.areaCodes);
      ctx = { countryKey, countryData, stateData, cityData, areaCode };
    } else {
      const d = this.d;
      const keys = Object.keys(world.countries);
      const defaultKey = this.locale.startsWith('en') ? (this.locale === 'en-GB' ? 'GB' : 'US') : this.locale === 'pt-BR' ? 'BR' : 'US';
      const countryKey = keys.includes(defaultKey) ? defaultKey : randomPick(keys);
      const countryData: any = world.countries[countryKey];
      const stateData: any = randomPick(countryData.states);
      const cities: any[] = countryData.cities.filter(c => c.state === stateData.abbr);
      const cityData = cities.length ? randomPick(cities) : { name: this.resolveName(stateData), state: stateData.abbr };
      const areaCode = stateData.areaCodes?.length ? randomPick(stateData.areaCodes) : randomPick(countryData.areaCodes);
      ctx = { countryKey, countryData, stateData, cityData, areaCode };
    }
    const coreDateFields = ['date', 'dateUS', 'dateTime', 'year', 'month', 'weekDay', 'season', 'time', 'timestamp'];
    const hasCoreDate = coreDateFields.some(f => fields.includes(f));
    if (hasCoreDate) {
      ctx._refDate = randomDate(new Date(2000, 0, 1), new Date());
    }

    const record = {};
    const d = this.d;
    const isEN = this.locale.startsWith('en');
    const nameMaleKey = isEN ? 'masculine' : 'masculino';
    const nameFemaleKey = isEN ? 'feminine' : 'feminino';
    if (fields.includes('company') && !ctx._companyName) {
      ctx._companyName = `${randomPick(d.company.prefixes)}${randomPick(d.company.suffixes)}`;
    }

    // ===== CORRELATION ENGINE =====
    // Pre-populate ctx with coherent cross-field values before individual generators run.

    // Gender ↔ title (bidirectional)
    if (fields.includes('title') || fields.includes('gender')) {
      const hasFirstName = fields.includes('firstName') || fields.includes('fullName') || fields.includes('email') || fields.includes('nickname') || fields.includes('motherName');
      const hasMaleName = fields.includes('firstNameMale');
      const hasFemaleName = fields.includes('firstNameFemale');

      // If name fields already set a specific gender, respect it
      if (!ctx._gender) {
        if (hasMaleName && !hasFemaleName) {
          ctx._gender = isEN ? 'Male' : 'Masculino';
        } else if (hasFemaleName && !hasMaleName) {
          ctx._gender = isEN ? 'Female' : 'Feminino';
        } else {
          ctx._gender = randomPick(d.categories.genders);
        }
      }

      // Pick title matching the resolved gender
      if (fields.includes('title')) {
        const _titleMap = getGenderTitleMap(this.locale);
        const _titles = _titleMap[ctx._gender];
        if (_titles) ctx._title = randomPick(_titles);
      }
    }

    // Gender → first name
    const _hasGenericName = fields.includes('firstName') || fields.includes('fullName') || fields.includes('email') || fields.includes('nickname') || fields.includes('motherName');
    const _hasMaleField = fields.includes('firstNameMale');
    const _hasFemaleField = fields.includes('firstNameFemale');
    if (!ctx._firstName && (_hasGenericName || _hasMaleField || _hasFemaleField)) {
      if (_hasMaleField && !_hasFemaleField && !_hasGenericName) {
        ctx._firstName = randomPick(d.names.firstName[nameMaleKey]);
      } else if (_hasFemaleField && !_hasMaleField && !_hasGenericName) {
        ctx._firstName = randomPick(d.names.firstName[nameFemaleKey]);
      } else if (_hasMaleField && !_hasFemaleField) {
        ctx._firstName = randomPick(d.names.firstName[nameMaleKey]);
      } else if (_hasFemaleField && !_hasMaleField) {
        ctx._firstName = randomPick(d.names.firstName[nameFemaleKey]);
      } else if (ctx._gender) {
        if (ctx._gender === (isEN ? 'Male' : 'Masculino')) {
          ctx._firstName = randomPick(d.names.firstName[nameMaleKey]);
        } else if (ctx._gender === (isEN ? 'Female' : 'Feminino')) {
          ctx._firstName = randomPick(d.names.firstName[nameFemaleKey]);
        } else {
          ctx._firstName = randomPick([...d.names.firstName[nameMaleKey], ...d.names.firstName[nameFemaleKey]]);
        }
      } else {
        ctx._firstName = randomPick([...d.names.firstName[nameMaleKey], ...d.names.firstName[nameFemaleKey]]);
      }
    }
    if (!ctx._lastName && (fields.includes('lastName') || fields.includes('fullName') || fields.includes('email') || fields.includes('motherName') || fields.includes('fatherName') || fields.includes('firstName') || fields.includes('firstNameMale') || fields.includes('firstNameFemale'))) {
      ctx._lastName = randomPick(d.names.lastName);
    }

    // Car brand → car model, fuel type, vehicle type
    const _carData = getCarBrandData(this.locale);
    if (fields.includes('carBrand')) {
      const _brands = Object.keys(_carData);
      ctx._carBrand = randomPick(_brands);
      const _brandInfo = _carData[ctx._carBrand];
      if (fields.includes('carModel')) ctx._carModel = randomPick(_brandInfo.models);
      if (fields.includes('fuelType')) ctx._carFuelType = randomPick(_brandInfo.fuelTypes);
      if (fields.includes('vehicleType')) ctx._carVehicleType = randomPick(_brandInfo.vehicleTypes);
    }

    // Product category ↔ product (bi-directional)
    const _pcMap = getProductCategoryMap(this.locale);
    if (fields.includes('productCategory') && fields.includes('product')) {
      const _catToProds: Record<string, string[]> = {};
      for (const [prod, cat] of Object.entries(_pcMap)) {
        if (!_catToProds[cat]) _catToProds[cat] = [];
        _catToProds[cat].push(prod);
      }
      const _cats = Object.keys(_catToProds);
      ctx._productCategory = randomPick(_cats);
      ctx._product = randomPick(_catToProds[ctx._productCategory]);
    } else if (fields.includes('productCategory')) {
      ctx._productCategory = randomPick(getProductCategories(this.locale));
    }

    // Movie genre → movie
    const _movieMap = getMovieGenreMap(this.locale);
    if (fields.includes('movieGenre')) {
      const _mGenres = Object.keys(_movieMap);
      ctx._movieGenre = randomPick(_mGenres);
      if (fields.includes('movie')) ctx._movie = randomPick(_movieMap[ctx._movieGenre]);
    }

    // Game genre → game
    const _gameMap = getGameGenreMap(this.locale);
    if (fields.includes('gameGenre')) {
      const _gGenres = Object.keys(_gameMap);
      ctx._gameGenre = randomPick(_gGenres);
      if (fields.includes('game')) ctx._game = randomPick(_gameMap[ctx._gameGenre]);
    }

    // Music genre → instrument
    const _musicMap = getMusicGenreInstruments(this.locale);
    if (fields.includes('musicGenre')) {
      const _muGenres = Object.keys(_musicMap);
      ctx._musicGenre = randomPick(_muGenres);
      if (fields.includes('instrument')) ctx._instrument = randomPick(_musicMap[ctx._musicGenre]);
    }

    // Profession → sector
    const _profSectorMap = getProfessionSectorMap(this.locale);
    if (fields.includes('profession') && fields.includes('sector')) {
      const _profs = Object.keys(_profSectorMap);
      ctx._profession = randomPick(_profs);
      ctx._sector = randomPick(_profSectorMap[ctx._profession]);
    }

    // Disease → medication
    const _diseaseMedMap = getDiseaseMedicationMap(this.locale);
    if (fields.includes('disease')) {
      const _diseases = Object.keys(_diseaseMedMap);
      ctx._disease = randomPick(_diseases);
      if (fields.includes('medication')) ctx._medication = randomPick(_diseaseMedMap[ctx._disease]);
    }

    // Cuisine type → restaurant
    const _cuisineRestMap = getCuisineRestaurantMap(this.locale);
    if (fields.includes('cuisineType')) {
      const _cuisines = Object.keys(_cuisineRestMap);
      ctx._cuisineType = randomPick(_cuisines);
      if (fields.includes('restaurant')) ctx._restaurant = randomPick(_cuisineRestMap[ctx._cuisineType]);
    }

    // Dietary restriction → food
    const _dietFoodMap = getDietFoodMap(this.locale);
    if (fields.includes('dietaryRestriction')) {
      const _diets = Object.keys(_dietFoodMap);
      ctx._dietaryRestriction = randomPick(_diets);
      if (fields.includes('food')) ctx._food = randomPick(_dietFoodMap[ctx._dietaryRestriction]);
    }

    // University → course
    const _uniCourseMap = getUniversityCoursesMap(this.locale);
    if (fields.includes('university')) {
      const _unis = Object.keys(_uniCourseMap);
      ctx._university = randomPick(_unis);
      if (fields.includes('course')) ctx._course = randomPick(_uniCourseMap[ctx._university]);
    }

    // Dog breed → pet name
    const _dogPetMap = getDogBreedNames(this.locale);
    if (fields.includes('dogBreed') && fields.includes('petName')) {
      const _dogBreeds = Object.keys(_dogPetMap);
      ctx._dogBreed = randomPick(_dogBreeds);
      ctx._petName = randomPick(_dogPetMap[ctx._dogBreed]);
    }

    // Cat breed → pet name
    const _catPetMap = getCatBreedNames(this.locale);
    if (fields.includes('catBreed') && fields.includes('petName')) {
      const _catBreeds = Object.keys(_catPetMap);
      ctx._catBreed = randomPick(_catBreeds);
      ctx._petName = randomPick(_catPetMap[ctx._catBreed]);
    }

    // OS → browser
    const _osBrowserMap = getOSBrowserMap(this.locale);
    if (fields.includes('operatingSystem')) {
      const _oss = Object.keys(_osBrowserMap);
      ctx._operatingSystem = randomPick(_oss);
      if (fields.includes('browser')) ctx._browser = randomPick(_osBrowserMap[ctx._operatingSystem]);
    }

    // OS → phone brand
    const _osPhoneMap = getOSPhoneMap(this.locale);
    if (fields.includes('operatingSystem') && fields.includes('phoneBrand')) {
      if (!ctx._operatingSystem) ctx._operatingSystem = randomPick(Object.keys(_osPhoneMap));
      ctx._phoneBrand = randomPick(_osPhoneMap[ctx._operatingSystem]);
    }

    // Clothing type → clothing size
    const _clothingSizeMap = getClothingTypeSizes(this.locale);
    if (fields.includes('clothingType')) {
      const _types = Object.keys(_clothingSizeMap);
      ctx._clothingType = randomPick(_types);
      if (fields.includes('clothingSize')) ctx._clothingSize = randomPick(_clothingSizeMap[ctx._clothingType]);
    }

    // Seniority ↔ salary
    if (fields.includes('salary')) {
      if (fields.includes('seniority')) {
        const _snr = ctx._seniority ?? randomPick(d.profession.seniority);
        ctx._seniority = _snr;
        if (isEN) {
          const _salaryRanges: Record<string, [number, number]> = {
            'Intern': [25000, 45000], 'Entry Level': [30000, 55000], 'Junior': [40000, 70000],
            'Mid-Level': [60000, 100000], 'Senior': [95000, 160000], 'Staff': [130000, 200000],
            'Principal': [160000, 280000], 'Lead': [110000, 175000], 'Fellow': [180000, 350000],
          };
          const _range = _salaryRanges[_snr] ?? [40000, 120000];
          ctx._salary = randomInt(_range[0], _range[1]);
        } else {
          const _salaryRanges: Record<string, [number, number]> = {
            'Estagiário': [800, 2000], 'Trainee': [1500, 3500],
            'Júnior': [2500, 6000], 'Pleno': [5000, 12000],
            'Sênior': [10000, 22000], 'Especialista': [15000, 30000], 'Master': [18000, 40000],
          };
          const _range = _salaryRanges[_snr] ?? [2500, 20000];
          ctx._salary = randomInt(_range[0], _range[1]);
        }
      } else {
        ctx._salary = isEN ? randomInt(35000, 150000) : randomInt(1500, 35000);
      }
    }

    // Age ↔ seniority
    if (fields.includes('age') && fields.includes('seniority')) {
      if (!ctx._seniority && ctx._age) {
        const _age = ctx._age;
        if (isEN) {
          if (_age < 20) ctx._seniority = 'Intern';
          else if (_age < 24) ctx._seniority = randomPick(['Junior', 'Entry Level']);
          else if (_age < 30) ctx._seniority = randomPick(['Junior', 'Mid-Level']);
          else if (_age < 40) ctx._seniority = randomPick(['Mid-Level', 'Senior']);
          else if (_age < 50) ctx._seniority = randomPick(['Senior', 'Staff', 'Lead']);
          else ctx._seniority = randomPick(['Staff', 'Principal', 'Fellow', 'Senior']);
        } else {
          if (_age < 20) ctx._seniority = 'Estagiário';
          else if (_age < 24) ctx._seniority = randomPick(['Júnior', 'Trainee']);
          else if (_age < 30) ctx._seniority = randomPick(['Júnior', 'Pleno']);
          else if (_age < 40) ctx._seniority = randomPick(['Pleno', 'Sênior']);
          else if (_age < 50) ctx._seniority = randomPick(['Sênior', 'Especialista']);
          else ctx._seniority = randomPick(['Sênior', 'Especialista', 'Master']);
        }
      }
      if (!ctx._age && ctx._seniority) {
        if (isEN) {
          const _seniorityAgeRanges: Record<string, [number, number]> = {
            'Intern': [16, 22], 'Entry Level': [18, 25], 'Junior': [20, 30],
            'Mid-Level': [25, 40], 'Senior': [32, 55], 'Staff': [38, 60],
            'Principal': [40, 65], 'Lead': [32, 55], 'Fellow': [42, 70],
          };
          const _range = _seniorityAgeRanges[ctx._seniority] ?? [18, 65];
          ctx._age = randomInt(_range[0], _range[1]);
        } else {
          const _seniorityAgeRanges: Record<string, [number, number]> = {
            'Estagiário': [16, 24], 'Trainee': [18, 26],
            'Júnior': [18, 32], 'Pleno': [23, 45], 'Sênior': [30, 60],
            'Especialista': [35, 65], 'Master': [38, 70],
          };
          const _range = _seniorityAgeRanges[ctx._seniority] ?? [18, 65];
          ctx._age = randomInt(_range[0], _range[1]);
        }
      }
    }

    // Birth date ↔ age
    if (fields.includes('birthDate') && fields.includes('age')) {
      const _age = ctx._age ?? randomInt(18, 80);
      ctx._age = _age;
      const _bd = new Date();
      _bd.setFullYear(_bd.getFullYear() - _age);
      _bd.setMonth(randomInt(0, 11));
      _bd.setDate(randomInt(1, 28));
      ctx._birthDate = _bd;
    }

    // Quantity × price = amount
    if (fields.includes('amount')) {
      if (fields.includes('quantity') && fields.includes('price')) {
        const _qty = ctx._quantity ?? randomInt(1, 100);
        ctx._quantity = _qty;
        const _price = ctx._price ?? parseFloat((Math.random() * 5000 + 10).toFixed(2));
        ctx._price = _price;
        ctx._amount = parseFloat((_qty * _price).toFixed(2));
      } else {
        ctx._amount = parseFloat((Math.random() * 10000).toFixed(2));
      }
    }

    // Height ↔ weight (BMI 18.5–30)
    if (fields.includes('height') && fields.includes('weight')) {
      if (isEN) {
        const _height = parseFloat((randomInt(58, 84) / 12).toFixed(2));
        ctx._height = _height;
        const _heightInches = _height * 12;
        const _targetBMI = 18.5 + Math.random() * 11.5;
        const _weightLbs = Math.round(_targetBMI * _heightInches * _heightInches / 703);
        ctx._weight = Math.max(80, Math.min(400, _weightLbs));
      } else {
        const _height = parseFloat((randomInt(145, 210) / 100).toFixed(2));
        ctx._height = _height;
        const _targetBMI = 18.5 + Math.random() * 11.5;
        const _weightKg = Math.round(_targetBMI * _height * _height);
        ctx._weight = Math.max(35, Math.min(200, _weightKg));
      }
    }

    // Age → disease (older = more likely to have conditions)
    if (fields.includes('disease') && fields.includes('age') && !ctx._disease) {
      const _age = ctx._age ?? randomInt(18, 80);
      ctx._age = _age;
      if (_age >= 60 && Math.random() < 0.7) {
        ctx._disease = randomPick(isEN
          ? ['Hypertension', 'High Cholesterol', 'Type 2 Diabetes', 'Hypothyroidism', 'Osteoporosis', 'Rheumatoid Arthritis', 'GERD']
          : ['Hipertensão Arterial', 'Colesterol Alto', 'Diabetes Tipo 2', 'Hipotireoidismo', 'Osteoporose', 'Artrite Reumatoide', 'Gastrite']);
      } else if (_age >= 40 && Math.random() < 0.5) {
        ctx._disease = randomPick(isEN
          ? ['Hypertension', 'Allergic Rhinitis', 'Asthma', 'Migraine', 'Anxiety Disorder', 'High Cholesterol']
          : ['Hipertensão Arterial', 'Rinite Alérgica', 'Asma', 'Enxaqueca', 'Ansiedade', 'Colesterol Alto']);
      }
      if (ctx._disease && fields.includes('medication')) {
        const _dmm = getDiseaseMedicationMap(this.locale);
        if (_dmm[ctx._disease]) ctx._medication = randomPick(_dmm[ctx._disease]);
      }
    }

    // Ethnicity → hair/eye color (approximate demographic correlations)
    if (fields.includes('ethnicity')) {
      const _eth = ctx._ethnicity ?? randomPick(d.person.ethnicities);
      ctx._ethnicity = _eth;
      if (isEN) {
        if (_eth === 'White' || _eth === 'Hispanic or Latino') {
          if (fields.includes('hairColor')) ctx._hairColor = randomPick(['Black', 'Brown', 'Dark Brown', 'Light Brown', 'Blonde', 'Red', 'Gray']);
          if (fields.includes('eyeColor')) ctx._eyeColor = randomPick(['Brown', 'Blue', 'Green', 'Hazel', 'Gray']);
        } else if (_eth === 'Black or African American') {
          if (fields.includes('hairColor')) ctx._hairColor = randomPick(['Black', 'Brown', 'Dark Brown']);
          if (fields.includes('eyeColor')) ctx._eyeColor = randomPick(['Brown', 'Black', 'Hazel']);
        } else if (_eth === 'Asian') {
          if (fields.includes('hairColor')) ctx._hairColor = randomPick(['Black', 'Dark Brown']);
          if (fields.includes('eyeColor')) ctx._eyeColor = randomPick(['Brown', 'Black']);
        } else {
          if (fields.includes('hairColor')) ctx._hairColor = randomPick(['Black', 'Brown', 'Dark Brown']);
          if (fields.includes('eyeColor')) ctx._eyeColor = randomPick(['Brown', 'Black', 'Hazel']);
        }
      } else {
        if (_eth === 'Branca' || _eth === 'Parda') {
          if (fields.includes('hairColor')) ctx._hairColor = randomPick(['Preto', 'Castanho', 'Castanho Claro', 'Ruivo', 'Loiro', 'Grisalho']);
          if (fields.includes('eyeColor')) ctx._eyeColor = randomPick(['Castanho', 'Azul', 'Verde', 'Mel', 'Cinza']);
        } else {
          if (fields.includes('hairColor')) ctx._hairColor = randomPick(['Preto', 'Castanho']);
          if (fields.includes('eyeColor')) ctx._eyeColor = randomPick(['Castanho', 'Preto']);
        }
      }
    }

    // ===== Additional correlations =====

    // Credit card flag → credit card number
    if (fields.includes('creditCardFlag')) {
      ctx._creditCardFlag = randomPick(d.finance.creditCardFlags);
      if (fields.includes('creditCardNumber')) {
        ctx._creditCardNumber = getCardBinLocale(ctx._creditCardFlag, this.locale);
      }
    }

    // Bank → bankCode (correlated)
    if (fields.includes('bank') || fields.includes('bankCode')) {
      const _bankEntry = randomPick(d.finance.banks);
      if (fields.includes('bank')) ctx._bank = _bankEntry.name;
      if (fields.includes('bankCode')) ctx._bankCode = _bankEntry.code;
    }

    // Country → currency
    if (fields.includes('currency') && ctx?.countryKey) {
      const _ccyMap = COUNTRY_CURRENCY[ctx.countryKey];
      if (_ccyMap) ctx._currency = randomPick(_ccyMap);
    }

    // Country → nationality
    if (fields.includes('nationality') && ctx?.countryKey) {
      const _natMap = getCountryCorrelation(this.locale).nationality;
      const _nats = _natMap[ctx.countryKey];
      if (_nats) ctx._nationality = randomPick(_nats);
    }

    // Country → naturalness (cidade natal)
    if (fields.includes('naturalness') && ctx?.countryKey) {
      if (ctx.countryKey === 'BR' || ctx.countryKey === 'US') {
        const _natCities = d.person.naturalness;
        ctx._naturalness = randomPick(_natCities);
      }
    }

    // Country → language
    if (fields.includes('language') && ctx?.countryKey) {
      const _langMap = getCountryCorrelation(this.locale).language;
      const _langs = _langMap[ctx.countryKey];
      if (_langs) ctx._language = randomPick(_langs);
    }

    // Country → timezone
    if (fields.includes('timezone') && ctx?.countryKey) {
      const _tzMap = getCountryCorrelation(this.locale).timezone;
      const _tzs = _tzMap[ctx.countryKey];
      if (_tzs) ctx._timezone = randomPick(_tzs);
    }

    // Product category → price range
    if (fields.includes('price') && ctx._productCategory) {
      const _priceMap = getCategoryPriceMap(this.locale);
      const _range = _priceMap[ctx._productCategory];
      if (_range) ctx._price = parseFloat((_range[0] + Math.random() * (_range[1] - _range[0])).toFixed(2));
    }

    // Age → marital status
    if (fields.includes('maritalStatus') && ctx._age) {
      const _maritalMap = getAgeMaritalMap(this.locale);
      let _key: string;
      if (ctx._age < 25) _key = 'young';
      else if (ctx._age < 55) _key = 'mid';
      else _key = 'senior';
      const _options = _maritalMap[_key];
      if (_options) ctx._maritalStatus = randomPick(_options);
    }

    // Age → blood pressure
    if (fields.includes('bloodPressure') && ctx._age) {
      const _baseSystolic = 100 + ctx._age * 0.5;
      const _systolic = Math.round(_baseSystolic + (Math.random() - 0.5) * 20);
      const _diastolic = Math.round(60 + ctx._age * 0.2 + (Math.random() - 0.5) * 10);
      ctx._bloodPressure = `${Math.min(180, Math.max(90, _systolic))}/${Math.min(100, Math.max(55, _diastolic))}`;
    }

    // Gender → height/weight
    if (fields.includes('height') && fields.includes('weight') && !ctx._height) {
      const _gender = ctx._gender;
      if (isEN) {
        const _hIn = _gender === 'Male' ? randomInt(64, 78) : randomInt(58, 70);
        ctx._height = parseFloat((_hIn / 12).toFixed(2));
        const _targetBMI = 18.5 + Math.random() * 11.5;
        ctx._weight = Math.max(80, Math.min(350, Math.round(_targetBMI * _hIn * _hIn / 703)));
      } else {
        const _hCm = _gender === 'Masculino' ? randomInt(160, 195) : randomInt(148, 175);
        ctx._height = parseFloat((_hCm / 100).toFixed(2));
        const _targetBMI = 18.5 + Math.random() * 11.5;
        ctx._weight = Math.max(40, Math.min(180, Math.round(_targetBMI * (_hCm / 100) * (_hCm / 100))));
      }
    }

    // Discount → amount (desconto aplicado ao total)
    if (fields.includes('discount') && fields.includes('amount') && fields.includes('quantity') && fields.includes('price')) {
      const _qty = ctx._quantity ?? randomInt(1, 100);
      ctx._quantity = _qty;
      const _price = ctx._price ?? parseFloat((Math.random() * 5000 + 10).toFixed(2));
      ctx._price = _price;
      if (!ctx._discount) ctx._discount = randomInt(5, 50);
      const _discount = ctx._discount;
      ctx._amount = parseFloat((_qty * _price * (1 - _discount / 100)).toFixed(2));
    }

    // Football team → state
    if (fields.includes('footballTeam')) {
      const _ftMap = getFootballTeamStateMap(this.locale);
      const _teams = Object.keys(_ftMap);
      ctx._footballTeam = randomPick(_teams);
      const _states = _ftMap[ctx._footballTeam];
      if (fields.includes('state') && ctx?.cityData && _states && _states.length > 0) {
        // Only override state if the team's state matches the country context
        if (_states.includes(ctx.cityData.state)) {
          ctx._state = ctx.cityData.state;
        }
      }
    }

    // Basketball team → state
    if (fields.includes('basketballTeam')) {
      const _btMap = getBasketballTeamStateMap(this.locale);
      const _teams = Object.keys(_btMap);
      ctx._basketballTeam = randomPick(_teams);
      const _states = _btMap[ctx._basketballTeam];
      if (fields.includes('state') && ctx?.cityData && _states && _states.length > 0) {
        if (_states.includes(ctx.cityData.state)) {
          ctx._state = ctx.cityData.state;
        }
      }
    }

    // Birth date → zodiac sign
    if (fields.includes('zodiacSign') && ctx._birthDate) {
      ctx._zodiacSign = getZodiac(ctx._birthDate, this.locale);
    } else if (fields.includes('zodiacSign') && fields.includes('birthDate') && !ctx._birthDate) {
      const _zodiac = randomPick(getZodiacSigns(this.locale));
      ctx._zodiacSign = _zodiac;
      ctx._birthDate = randomDateInZodiac(_zodiac, randomInt(1950, 2005), this.locale);
    }

    // Age → hair color (older → more gray)
    if (fields.includes('hairColor') && ctx._age && !ctx._hairColor) {
      if (ctx._age >= 60 && Math.random() < 0.6) {
        ctx._hairColor = isEN ? randomPick(['Gray', 'White', 'Silver']) : randomPick(['Grisalho', 'Branco', 'Platinado']);
      } else if (ctx._age >= 45 && Math.random() < 0.3) {
        ctx._hairColor = isEN ? randomPick(['Gray', 'Salt and Pepper']) : randomPick(['Grisalho']);
      }
    }

    // Height → footwear size
    if (fields.includes('footwearSize') && ctx._height) {
      if (isEN) {
        const _hIn = ctx._height * 12;
        if (_hIn < 62) ctx._footwearSize = randomPick(['5','6']);
        else if (_hIn < 66) ctx._footwearSize = randomPick(['6','7','8']);
        else if (_hIn < 70) ctx._footwearSize = randomPick(['8','9','10']);
        else if (_hIn < 74) ctx._footwearSize = randomPick(['10','11','12']);
        else ctx._footwearSize = randomPick(['12','13','14']);
      } else {
        const _hCm = ctx._height * 100;
        if (_hCm < 155) ctx._footwearSize = randomPick(['33','34','35','36']);
        else if (_hCm < 165) ctx._footwearSize = randomPick(['35','36','37','38']);
        else if (_hCm < 175) ctx._footwearSize = randomPick(['37','38','39','40']);
        else if (_hCm < 185) ctx._footwearSize = randomPick(['39','40','41','42','43']);
        else ctx._footwearSize = randomPick(['42','43','44','45','46']);
      }
    }

    // Education ↔ seniority
    if (fields.includes('education') && ctx._seniority) {
      if (isEN) {
        if (['Intern','Entry Level','Junior'].includes(ctx._seniority)) {
          ctx._education = randomPick(["Some College","Associate Degree","Bachelor's Degree"]);
        } else if (['Mid-Level'].includes(ctx._seniority)) {
          ctx._education = randomPick(["Bachelor's Degree","Some Graduate School","Master's Degree"]);
        } else if (['Senior','Lead'].includes(ctx._seniority)) {
          ctx._education = randomPick(["Bachelor's Degree","Master's Degree","MBA"]);
        } else {
          ctx._education = randomPick(["Master's Degree","Doctorate (PhD)",'MBA']);
        }
      } else {
        if (ctx._seniority === 'Estagiário' || ctx._seniority === 'Trainee' || ctx._seniority === 'Júnior') {
          ctx._education = randomPick(['Ensino Médio Completo','Graduação Incompleta','Curso Técnico Completo','Graduação Completa']);
        } else if (ctx._seniority === 'Pleno') {
          ctx._education = randomPick(['Graduação Completa','Pós-graduação Completa','MBA Completo']);
        } else {
          ctx._education = randomPick(['Graduação Completa','Pós-graduação Completa','Mestrado Completo','MBA Completo','Doutorado Completo']);
        }
      }
    }

    // Age → education
    if (fields.includes('education') && ctx._age && !ctx._education) {
      const _eduMap = getAgeEducationMap(this.locale);
      let _key: string;
      if (ctx._age < 24) _key = 'young';
      else if (ctx._age < 45) _key = 'mid';
      else _key = 'senior';
      ctx._education = randomPick(_eduMap[_key]);
    }

    // Age → hobby
    if (fields.includes('hobby') && ctx._age) {
      const _hobbyMap = getAgeHobbyMap(this.locale);
      let _key: string;
      if (ctx._age < 25) _key = 'young';
      else if (ctx._age < 50) _key = 'mid';
      else _key = 'senior';
      ctx._hobby = randomPick(_hobbyMap[_key]);
    }

    // Product category → shipping method
    if (fields.includes('shippingMethod') && ctx._productCategory) {
      ctx._shippingMethod = genShippingMethod(ctx._productCategory, this.locale);
    }

    // Education → salary (if salary not set by seniority)
    if (fields.includes('salary') && !ctx._salary && ctx._education) {
      if (isEN) {
        if (ctx._education === 'High School Diploma' || ctx._education === 'Some College') {
          ctx._salary = randomInt(25000, 50000);
        } else if (ctx._education === 'Associate Degree') {
          ctx._salary = randomInt(35000, 65000);
        } else if (ctx._education === "Bachelor's Degree") {
          ctx._salary = randomInt(45000, 90000);
        } else if (ctx._education === "Master's Degree" || ctx._education === 'MBA') {
          ctx._salary = randomInt(65000, 130000);
        } else {
          ctx._salary = randomInt(80000, 180000);
        }
      } else {
        if (ctx._education === 'Ensino Médio Completo' || ctx._education === 'Curso Técnico Completo') {
          ctx._salary = randomInt(1200, 4000);
        } else if (ctx._education === 'Graduação Incompleta') {
          ctx._salary = randomInt(1500, 5000);
        } else if (ctx._education === 'Graduação Completa') {
          ctx._salary = randomInt(3000, 10000);
        } else if (ctx._education.includes('Pós') || ctx._education.includes('MBA') || ctx._education.includes('Mestrado')) {
          ctx._salary = randomInt(6000, 18000);
        } else {
          ctx._salary = randomInt(8000, 25000);
        }
      }
    }

    // Genre → Series
    if (fields.includes('series') && ctx._movieGenre) {
      const _seriesMap = getSeriesGenreMap(this.locale);
      const _series = _seriesMap[ctx._movieGenre];
      if (_series && _series.length > 0) ctx._series = randomPick(_series);
    }

    // Genre → Book
    if (fields.includes('bookGenre')) {
      const _bookMap = getBookGenreMap(this.locale);
      const _genres = Object.keys(_bookMap);
      ctx._bookGenre = randomPick(_genres);
    }

    // Profession → Software
    if (fields.includes('software') && ctx._profession) {
      const _swMap = getProfessionSoftwareMap(this.locale);
      const _sw = _swMap[ctx._profession];
      if (_sw && _sw.length > 0) ctx._software = randomPick(_sw);
    }

    // Hobby → Equipment
    if (fields.includes('equipment') && ctx._hobby) {
      const _eqMap = getHobbyEquipmentMap(this.locale);
      const _eq = _eqMap[ctx._hobby];
      if (_eq && _eq.length > 0) ctx._equipment = randomPick(_eq);
    }

    // Streaming → Genre
    if (fields.includes('streamingGenre') || fields.includes('streamingPlatform')) {
      if (!ctx._streamingPlatform) ctx._streamingPlatform = randomPick(isEN ? ['Netflix','Amazon Prime Video','Disney+','HBO Max','Paramount+','Apple TV+','Peacock','Hulu','Crunchyroll'] : ['Netflix','Amazon Prime Video','Disney+','HBO Max','Globoplay','Paramount+','Apple TV+','Crunchyroll']);
    }
    if (fields.includes('streamingGenre') && ctx._streamingPlatform) {
      const _sgMap = getStreamingGenreMap(this.locale);
      const _sg = _sgMap[ctx._streamingPlatform];
      if (_sg && _sg.length > 0) ctx._streamingGenre = randomPick(_sg);
    }

    for (const field of fields) {
      record[field] = this.generateField(field, ctx);
    }
    for (const custom of customFields) {
      if (custom.name?.trim()) {
        record[custom.name] = this.generateCustomField(
          custom.name,
          custom.type,
          custom.size,
          custom.customValues,
          custom.useCustomValues
        );
      }
    }
    return this.applyInjection(record, fields);
  }

  private applyInjection(record: Record<string, unknown>, fields: string[]): Record<string, unknown> {
    if (this.nullRate <= 0 && this.errorRate <= 0) return record;
    for (const field of fields) {
      if (field === 'id') continue;
      if (this.nullRate > 0 && Math.random() < this.nullRate) {
        record[field] = null;
      } else if (this.errorRate > 0 && Math.random() < this.errorRate) {
        record[field] = this.corruptValue(record[field]);
      }
    }
    return record;
  }

  private corruptValue(val: unknown): unknown {
    if (val === null || val === undefined) return val;
    const s = String(val);
    if (s.length === 0) return val;
    const pos = randomInt(0, s.length - 1);
    const noise = '!@#$%'.split('')[randomInt(0, 4)];
    return s.slice(0, pos) + noise + s.slice(pos + 1);
  }

  generateField(field: string, ctx?: Record<string, any>) {
    const d = this.d;
    const isEN = this.locale.startsWith('en');
    const isUS = this.locale === 'en-US';
    const nameMaleKey = isEN ? 'masculine' : 'masculino';
    const nameFemaleKey = isEN ? 'feminine' : 'feminino';
    const fmtDate = (dt: Date) => isUS
      ? `${String(dt.getMonth()+1).padStart(2,'0')}/${String(dt.getDate()).padStart(2,'0')}/${dt.getFullYear()}`
      : `${String(dt.getDate()).padStart(2,'0')}/${String(dt.getMonth()+1).padStart(2,'0')}/${dt.getFullYear()}`;
    const fmtDateTime = (dt: Date) => `${fmtDate(dt)} ${String(dt.getHours()).padStart(2,'0')}:${String(dt.getMinutes()).padStart(2,'0')}:${String(dt.getSeconds()).padStart(2,'0')}`;
    const firstNamesAll = (): string[] => [...d.names.firstName[nameMaleKey], ...d.names.firstName[nameFemaleKey]];
    const randFN = () => ctx?._firstName ?? randomPick(firstNamesAll());
    const randLN = () => ctx?._lastName ?? randomPick(d.names.lastName);

    const seasonFromMonth = (month: number): string => {
      const idx = isEN
        ? [3, 3, 0, 0, 0, 1, 1, 1, 2, 2, 2, 3][month]
        : [0, 0, 1, 1, 1, 2, 2, 2, 3, 3, 3, 0][month];
      return d.categories.seasons[idx];
    };

    const generators = {
      id:            () => this.counter,
      uuid:          () => crypto.randomUUID?.() ?? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random()*16|0; return (c==='x'?r:(r&0x3|0x8)).toString(16); }),
      firstName:     () => randFN(),
      firstNameMale: () => {
        if (ctx?._firstName && d.names.firstName[nameMaleKey].includes(ctx._firstName)) return ctx._firstName;
        return randomPick(d.names.firstName[nameMaleKey]);
      },
      firstNameFemale:()=> {
        if (ctx?._firstName && d.names.firstName[nameFemaleKey].includes(ctx._firstName)) return ctx._firstName;
        return randomPick(d.names.firstName[nameFemaleKey]);
      },
      lastName:      () => randLN(),
      fullName:      () => `${randFN()} ${randLN()}`,
      nickname:      () => randFN().toLowerCase() + randomInt(1, 999),
      cpf:           () => isEN ? generateSSN() : generateCPF(),
      cnpj:          () => isEN ? generateEIN() : generateCNPJ(),
      rg:            () => isEN ? `D${randomInt(1000000, 9999999)}` : `${randomInt(10,99)}.${randomInt(100,999)}.${randomInt(100,999)}-${randomInt(0,9)}`,
      nino:          () => generateNINO(),
      email:         () => {
        const fn = randFN();
        const ln = randLN();
        const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]/g,'');
        const sep = Math.random() < 0.5 ? '.' : '_';
        const parts = Math.random() < 0.5 ? [normalize(fn), normalize(ln)] : [normalize(ln), normalize(fn)];
        const local = parts.join(sep) + (Math.random() < 0.4 ? randomInt(1, 999) : '');
        let domain: string;
        if (ctx?._companyName) {
          domain = ctx._companyName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          const suffixes = isEN ? ['llc','inc','corp',''] : ['ltda','sa',''];
          const sfx = Math.random() < 0.3 ? randomPick(suffixes) : '';
          const exts = isEN ? ['.com','.net','.io','.org','.app','.tech','.store'] : ['.com','.com.br','.dev.br','.net','.io','.org','.app','.tech','.store'];
          domain = `${domain}${sfx ? '.'+sfx : ''}${randomPick(exts)}`;
        } else {
          domain = randomPick(internet.emailDomains);
        }
        return `${local}@${domain}`;
      },
      phone:         () => genPhone(ctx, true),
      phoneFixo:     () => genPhone(ctx, false),
      website:       () => {
        if (ctx?._companyName) {
          const domain = ctx._companyName.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9]/g, '').toLowerCase();
          return `https://www.${domain}.com`;
        }
        return `https://www.${randomPick(internet.corporateDomains)}`;
      },
      linkedin:      () => isEN ? `linkedin.com/in/user-${this.counter}` : `linkedin.com/in/usuario-${this.counter}`,
      street:        () => {
        if (ctx?.countryKey === 'BR') {
          const stName = d.address.streetNames ? randomPick(d.address.streetNames) : 'Rua';
          return `${randomPick(d.address.streetPrefix)} ${stName}, ${randomInt(1,5000)}`;
        }
        const num = randomInt(1, 9999);
        const name = randomPick(d.address.streetPrefix);
        const suffix = d.address.streetSuffix ? randomPick(d.address.streetSuffix) : 'St';
        return `${num} ${name} ${suffix}`;
      },
      neighborhood:  () => ctx?.countryKey ? randomPick(d.address.neighborhoods) : randomPick(d.address.neighborhoods),
      city:          () => ctx?.cityData ? this.resolveName(ctx.cityData) : randomPick(d.address.cities).name,
      state:         () => ctx?.cityData?.state ?? randomPick(d.address.states).abbr,
      stateFull:     () => {
        const abbr = ctx?.cityData?.state;
        if (abbr) {
          const found = d.address.states.find(s => s.abbr === abbr);
          if (found) return this.resolveName(found);
        }
        return this.resolveName(randomPick(d.address.states));
      },
      zipCode:       () => {
        const ck = ctx?.countryKey;
        if (ck === 'US' || ck === 'CA') {
          return isEN ? `${randomInt(10000,99999)}-${String(randomInt(1000,9999))}` : `${randomInt(10000,99999)}`;
        }
        if (ck === 'GB') return `${String(randomInt(1,99)).padStart(2,'0')} ${String(randomInt(1,9))}${String(randomInt(10,99))}`;
        if (ck === 'BR') return `${randomInt(10000,99999)}-${randomInt(100,999)}`;
        return `${String(randomInt(1000,99999))}`;
      },
      country:       () => ctx?.countryData ? this.resolveName(ctx.countryData) : (isEN ? 'United States' : 'Brasil'),
      fullAddress:   () => {
        if (ctx?.countryKey === 'US') {
          const num = randomInt(1, 9999);
          const stName = randomPick(d.address.streetPrefix);
          const stSuffix = randomPick(d.address.streetSuffix || ['St','Ave','Dr']);
          const c = ctx?.cityData ? this.resolveName(ctx.cityData) : 'City';
          const s = ctx?.cityData?.state ?? '';
          const z = `${randomInt(10000,99999)}-${randomInt(1000,9999)}`;
          if (isEN) return `${num} ${stName} ${stSuffix}, ${c}${s ? ', '+s : ''} ${z}`;
        }
        if (ctx?.countryKey === 'GB') {
          const num = randomInt(1, 200);
          const stName = d.address.streetPrefix ? randomPick(d.address.streetPrefix) : randomPick(['High','Park','Church','King','Queen','Victoria','Elizabeth']);
          const suffix = randomPick(['Road','Street','Lane','Avenue','Close','Drive','Way','Place','Court','Crescent']);
          const c = this.resolveName(ctx.cityData);
          const pc = `${String(randomInt(1,99)).padStart(2,'0')} ${String(randomInt(1,9))}${randomPick(['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'])}${randomPick(['A','B','C','D','E','F','G','H','J','K','L','M','N','P','Q','R','S','T','U','V','W','X','Y','Z'])}`;
          return `${num} ${stName} ${suffix}, ${c} ${pc}`;
        }
        if (ctx?.countryKey === 'BR' || !ctx?.countryKey) {
          const cityData = ctx?.cityData ?? randomPick(d.address.cities);
          const stName = d.address.streetNames ? randomPick(d.address.streetNames) : 'Rua';
          return `${randomPick(d.address.streetPrefix)} ${stName}, ${randomInt(1,5000)} — ${randomPick(d.address.neighborhoods)} — ${cityData.name}/${cityData.state} — ${randomInt(10000,99999)}-${randomInt(100,999)}`;
        }
        const city = ctx?.cityData ? this.resolveName(ctx.cityData) : 'City';
        const state = ctx?.cityData?.state ?? '';
        return `${randomInt(1, 9999)} ${randomPick(world.streetGeneric)}, ${city}${state ? ', '+state : ''}`;
      },
      company:       () => ctx?._companyName ?? `${randomPick(d.company.prefixes)} ${randomPick(d.company.suffixes)}`,
      sector:        () => ctx?._sector ?? randomPick(d.company.sectors),
      position:      () => isEN ? `${randomPick(d.company.positions)} of ${randomPick(d.company.areas)}` : `${randomPick(d.company.positions)} de ${randomPick(d.company.areas)}`,
      area:          () => randomPick(d.company.areas),
      profession:    () => ctx?._profession ?? randomPick(d.profession.professions),
      education:     () => ctx?._education ?? randomPick(d.profession.education),
      seniority:     () => ctx?._seniority ?? randomPick(d.profession.seniority),
      salary:        () => ctx?._salary ?? (isEN ? randomInt(35000, 150000) : randomInt(1500, 35000)),
      bank:          () => ctx?._bank ?? randomPick(d.finance.banks).name,
      bankCode:      () => ctx?._bankCode ?? randomPick(d.finance.banks).code,
      currency:      () => ctx?._currency ?? randomPick(d.finance.currencies).code,
      paymentMethod: () => randomPick(d.finance.paymentMethods),
      status:        () => randomPick(d.finance.statusOptions),
      amount:        () => ctx?._amount ?? parseFloat((Math.random() * 10000).toFixed(2)),
      price:         () => ctx?._price ?? parseFloat((Math.random() * 5000 + 10).toFixed(2)),
      date:          () => ctx?._refDate ? fmtDate(ctx._refDate) : fmtDate(randomDate(new Date(2000,0,1), new Date())),
      dateTime:      () => ctx?._refDate ? fmtDateTime(ctx._refDate) : fmtDateTime(randomDate(new Date(2020,0,1), new Date())),
      birthDate:     () => ctx?._birthDate ? fmtDate(ctx._birthDate) : fmtDate(randomDate(new Date(1950,0,1), new Date(2005,11,31))),
      dateUS:        () => ctx?._refDate ? ctx._refDate.toISOString().split('T')[0] : randomDate(new Date(2000,0,1), new Date()).toISOString().split('T')[0],
      year:          () => ctx?._refDate ? ctx._refDate.getFullYear() : randomInt(1990, 2026),
      age:           () => ctx?._age ?? randomInt(18, 80),
      quantity:      () => ctx?._quantity ?? randomInt(1, 100),
      percentage:    () => randomInt(0, 100),
      rating:        () => parseFloat((Math.random() * 5).toFixed(1)),
      boolean:       () => randomBool(),
      lorem:         () => 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      sentence:      () => {
        if (isEN) {
          const subjects = ['The system', 'The platform', 'The module', 'The application', 'The process', 'The feature'];
          const verbs    = ['processes', 'manages', 'analyzes', 'integrates', 'validates', 'optimizes'];
          const objects  = ['real-time data', 'critical information', 'financial transactions', 'concurrent requests', 'system logs', 'management reports'];
          return `${randomPick(subjects)} ${randomPick(verbs)} ${randomPick(objects)}.`;
        }
        const subjects = ['O sistema', 'A plataforma', 'O módulo', 'A aplicação', 'O processo', 'A funcionalidade'];
        const verbs    = ['processa', 'gerencia', 'analisa', 'integra', 'valida', 'otimiza'];
        const objects  = ['dados em tempo real', 'informações críticas', 'transações financeiras', 'requisições simultâneas', 'logs do sistema', 'relatórios gerenciais'];
        return `${randomPick(subjects)} ${randomPick(verbs)} ${randomPick(objects)}.`;
      },
      product:         () => ctx?._product ?? randomPick(getProductNames(this.locale)),
      productCategory: () => ctx?._productCategory ?? randomPick(getProductCategories(this.locale)),
      sku:             () => `SKU-${randomInt(10000, 99999)}`,
      barcode:         () => Array.from({ length: 13 }, () => randomInt(0, 9)).join(''),
      footballTeam:      () => ctx?._footballTeam ?? randomPick(d.categories.footballTeams),
      basketballTeam:    () => ctx?._basketballTeam ?? randomPick(d.categories.basketballTeams),
      food:              () => ctx?._food ?? randomPick(d.categories.foods),
      drink:             () => randomPick(d.categories.drinks),
      fruit:             () => randomPick(d.categories.fruits),
      animal:            () => randomPick(d.categories.animals),
      dogBreed:          () => ctx?._dogBreed ?? randomPick(d.categories.dogBreeds),
      catBreed:          () => ctx?._catBreed ?? randomPick(d.categories.catBreeds),
      movie:             () => ctx?._movie ?? randomPick(d.categories.movies),
      movieGenre:        () => ctx?._movieGenre ?? randomPick(d.categories.movieGenres),
      series:            () => ctx?._series ?? randomPick(d.categories.series),
      musicGenre:        () => ctx?._musicGenre ?? randomPick(d.categories.musicGenres),
      instrument:        () => ctx?._instrument ?? randomPick(d.categories.instruments),
      sport:             () => randomPick(d.categories.sports),
      hobby:             () => ctx?._hobby ?? randomPick(d.categories.hobbies),
      seriesGenre:       () => ctx?._seriesGenre ?? randomPick(Object.keys(getSeriesGenreMap(this.locale))),
      bookGenre:         () => ctx?._bookGenre ?? randomPick(Object.keys(getBookGenreMap(this.locale))),
      software:          () => ctx?._software ?? randomPick(Object.values(getProfessionSoftwareMap(this.locale)).flat()),
      equipment:         () => ctx?._equipment ?? randomPick(Object.values(getHobbyEquipmentMap(this.locale)).flat()),
      streamingGenre:    () => ctx?._streamingGenre ?? randomPick(isEN ? ['Drama','Thriller','Science Fiction','Comedy','Action','Animation','Horror'] : ['Drama','Suspense','Ficção Científica','Comédia','Ação','Animação','Terror']),
      carBrand:          () => ctx?._carBrand ?? randomPick(d.categories.carBrands),
      carModel:          () => ctx?._carModel ?? randomPick(d.categories.carModels),
      fuelType:          () => ctx?._carFuelType ?? randomPick(d.categories.fuelTypes),
      phoneBrand:        () => ctx?._phoneBrand ?? randomPick(d.categories.phoneBrands),
      operatingSystem:   () => ctx?._operatingSystem ?? randomPick(d.categories.operatingSystems),
      programmingLanguage:()=> randomPick(d.categories.programmingLanguages),
      database:          () => randomPick(d.categories.databases),
      browser:           () => ctx?._browser ?? randomPick(d.categories.browsers),
      socialMedia:       () => randomPick(d.categories.socialMedia),
      streamingPlatform: () => ctx?._streamingPlatform ?? randomPick(d.categories.streamingPlatforms),
      clothingType:      () => ctx?._clothingType ?? randomPick(d.categories.clothingTypes),
      clothingSize:      () => ctx?._clothingSize ?? randomPick(d.categories.clothingSizes),
      color:             () => randomPick(d.categories.colors),
      hairColor:         () => ctx?._hairColor ?? randomPick(d.categories.hairColors),
      eyeColor:          () => ctx?._eyeColor ?? randomPick(d.categories.eyeColors),
      religion:          () => randomPick(d.categories.religions),
      zodiacSign:        () => ctx?._zodiacSign ?? randomPick(d.categories.zodiacSigns),
      maritalStatus:     () => ctx?._maritalStatus ?? randomPick(d.categories.maritalStatus),
      bloodType:         () => randomPick(d.categories.bloodTypes),
      gender:            () => ctx?._gender ?? randomPick(d.categories.genders),
      vehicleType:       () => ctx?._carVehicleType ?? randomPick(d.categories.vehicleTypes),
      planet:            () => randomPick(d.categories.planets),
      weekDay:           () => ctx?._refDate ? d.categories.weekDays[ctx._refDate.getDay()] : randomPick(d.categories.weekDays),
      month:             () => ctx?._refDate ? d.categories.months[ctx._refDate.getMonth()] : randomPick(d.categories.months),
      season:            () => ctx?._refDate ? seasonFromMonth(ctx._refDate.getMonth()) : randomPick(d.categories.seasons),
      orderStatus:       () => randomPick(d.categories.orderStatus),
      schoolSubject:     () => randomPick(d.categories.schoolSubjects),
      suffix:         () => randomPick(d.person.suffixes),
      title:          () => ctx?._title ?? randomPick(Object.values(getGenderTitleMap(this.locale)).flat()),
      motherName:     () => `${randomPick(d.names.firstName[nameFemaleKey])} ${randLN()}`,
      fatherName:     () => `${randomPick(d.names.firstName[nameMaleKey])} ${randLN()}`,
      ethnicity:      () => ctx?._ethnicity ?? randomPick(d.person.ethnicities),
      nationality:    () => ctx?._nationality ?? randomPick(d.person.nationalities),
      naturalness:    () => ctx?._naturalness ?? randomPick(d.person.naturalness),
      ipAddress:      () => `${randomInt(1,223)}.${randomInt(0,255)}.${randomInt(0,255)}.${randomInt(1,254)}`,
      macAddress:     () => Array.from({length:6},()=>randomInt(0,255).toString(16).padStart(2,'0').toUpperCase()).join(':'),
      userAgent:      () => randomPick([
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/120.0.0.0 Safari/537.36',
        'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 Safari/605.1.15',
        'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/119.0.0.0 Safari/537.36',
        'Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X) AppleWebKit/605.1.15 Mobile/15E148',
        'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Edge/120.0.0.0'
      ]),
      hostname:       () => `${randomPick(['server','web','db','app','api','mail','proxy','node','host','cloud'])}-${randomInt(1,999)}.${randomPick(['internal','corp','prod','dev','staging','local'])}.${randomPick(['com','net','local','lan'])}`,
      licensePlate:   () => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (isEN) {
          return `${letters[randomInt(0,25)]}${letters[randomInt(0,25)]}${letters[randomInt(0,25)]} ${randomInt(1000,9999)}`;
        }
        return `${letters[randomInt(0,25)]}${letters[randomInt(0,25)]}${letters[randomInt(0,25)]}${randomInt(1,9)}${letters[randomInt(0,25)]}${randomInt(10,99)}`;
      },
      renavam:        () => String(randomInt(1000000000, 99999999999)),
      chassi:         () => Array.from({length:17},()=>'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'[randomInt(0,35)]).join(''),
      carYear:        () => randomInt(2000, 2026),
      cuisineType:    () => ctx?._cuisineType ?? randomPick(d.food.cuisineTypes),
      dietaryRestriction: () => ctx?._dietaryRestriction ?? randomPick(d.food.dietaryRestrictions),
      meal:           () => randomPick(d.food.meals),
      restaurant:     () => ctx?._restaurant ?? randomPick(d.food.restaurants),
      height:         () => ctx?._height ?? (isEN ? parseFloat((randomInt(58, 84) / 12).toFixed(2)) : parseFloat((randomInt(145, 210) / 100).toFixed(2))),
      weight:         () => ctx?._weight ?? (isEN ? randomInt(100, 300) : randomInt(45, 150)),
      bloodPressure:  () => ctx?._bloodPressure ?? `${randomInt(100,140)}/${randomInt(60,90)}`,
      heartRate:      () => randomInt(60, 100),
      allergy:        () => randomPick(d.health.allergies),
      disease:        () => ctx?._disease ?? randomPick(d.health.diseases),
      medication:     () => ctx?._medication ?? randomPick(d.health.medications),
      university:     () => ctx?._university ?? randomPick(d.education.universities),
      course:         () => ctx?._course ?? randomPick(d.education.courses),
      degreeType:     () => randomPick(d.education.degreeTypes),
      grade:          () => randomPick(d.education.grades),
      game:           () => ctx?._game ?? randomPick(d.entertainment.games),
      gameGenre:      () => ctx?._gameGenre ?? randomPick(d.entertainment.gameGenres),
      continent:      () => randomPick(world.continents),
      language:       () => ctx?._language ?? randomPick(world.languages),
      timezone:       () => ctx?._timezone ?? randomPick(world.timezones),
      latitude:       () => parseFloat((Math.random() * 180 - 90).toFixed(6)),
      longitude:      () => parseFloat((Math.random() * 360 - 180).toFixed(6)),
      petName:        () => ctx?._petName ?? randomPick(d.animal.petNames),
      clothingBrand:  () => randomPick(d.fashion.clothingBrands),
      footwearSize:   () => ctx?._footwearSize ?? randomPick(d.fashion.footwearSizes),
      fabric:         () => randomPick(d.fashion.fabrics),
      discount:       () => ctx?._discount ?? randomInt(5, 50),
      tax:            () => parseFloat((randomInt(1, 30) + Math.random()).toFixed(2)),
      creditCardFlag: () => ctx?._creditCardFlag ?? randomPick(d.finance.creditCardFlags),
      creditCardNumber: () => ctx?._creditCardNumber ?? Array.from({length:16},()=>randomInt(0,9)).join('').replace(/(.{4})/g,'$1 ').trim(),
      invoiceNumber:  () => isEN ? `INV-${randomInt(100000, 999999)}` : `NF-${randomInt(100000, 999999)}-${randomPick(['SP','RJ','MG','RS','PR','BA','DF'])}`,
      trackingCode:   () => {
        if (isEN) {
          return `1Z${randomPick(['A','E','F','R','X'])}${randomInt(100,999)}${randomInt(1000000,9999999)}`;
        }
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return `BR${randomInt(100000000,999999999)}${letters[randomInt(0,25)]}${letters[randomInt(0,25)]}`;
      },
      shippingMethod: () => ctx?._shippingMethod ?? (isEN
        ? randomPick(['USPS Priority Mail', 'UPS Ground', 'FedEx Express', 'DHL Express', 'Amazon Logistics', 'Store Pickup', 'Local Delivery'])
        : randomPick(['Correios PAC', 'Correios Sedex', 'Jadlog', 'Total Express', 'Loggi', 'Transportadora Própria', 'Motoboy', 'Retirada no Local'])),
      time:           () => ctx?._refDate ? `${String(ctx._refDate.getHours()).padStart(2,'0')}:${String(ctx._refDate.getMinutes()).padStart(2,'0')}` : `${String(randomInt(0,23)).padStart(2,'0')}:${String(randomInt(0,59)).padStart(2,'0')}`,
      timestamp:      () => ctx?._refDate ? Math.floor(ctx._refDate.getTime() / 1000) : Math.floor(randomDate(new Date(2020,0,1),new Date()).getTime() / 1000),
      dueDate:        () => fmtDate(randomDate(new Date(), new Date(2027,11,31))),
      paymentDate:    () => fmtDate(randomDate(new Date(2020,0,1), new Date())),
    };

    const gen = generators[field];
    if (!gen) return `[Campo desconhecido: ${field}]`;
    return gen();
  }

  // ===== Colunas Personalizadas =====

  // Gera o valor de uma coluna personalizada.
  // Se useCustomValues estiver ativo e houver valores válidos informados pelo usuário,
  // sorteia um deles. Caso contrário, tenta inferir semanticamente pelo nome da coluna;
  // se não encontrar correspondência, gera um valor aleatório compatível com o tipo/tamanho.
  generateCustomField(columnName: string, type: string, size: number | null | undefined, customValues: { id?: string; text: string }[] | null = null, useCustomValues = false) {
    if (useCustomValues && Array.isArray(customValues)) {
      const validValues = customValues
        .map((v) => (typeof v === 'string' ? v : v.text))
        .filter((v) => v && v.trim() !== '');
      if (validValues.length > 0) {
        return randomPick(validValues);
      }
    }

    const matchedGenerator = findSemanticMatch(columnName);
    if (matchedGenerator) {
      const value = this.generateField(matchedGenerator);
      return this.castToType(value, type, size);
    }
    return this.generateByType(type, size);
  }

  // Ajusta um valor já gerado (por inferência semântica) ao tipo/tamanho solicitado
  castToType(value: unknown, type: string, size: number | null | undefined) {
    switch (type) {
      case 'VARCHAR':
      case 'CHAR':
      case 'TEXT':
        return size ? String(value).slice(0, size) : String(value);
      case 'INT':
      case 'BIGINT': {
        const digits = String(value).replace(/\D/g, '');
        const num = parseInt(digits, 10);
        return isNaN(num) ? randomInt(1, Math.pow(10, Math.min(size || 10, 15)) - 1) : num;
      }
      case 'DECIMAL':
      case 'FLOAT': {
        const num = parseFloat(String(value));
        return isNaN(num) ? parseFloat((Math.random() * 10000).toFixed(2)) : parseFloat(num.toFixed(2));
      }
      case 'BOOLEAN':
        return typeof value === 'boolean' ? value : randomBool();
      case 'DATE':
      case 'DATETIME':
      case 'UUID':
      default:
        return value;
    }
  }

  // Gera um valor totalmente aleatório baseado apenas no tipo/tamanho (sem inferência semântica)
  generateByType(type: string, size: number | null | undefined) {
    switch (type) {
      case 'INT':
        return randomInt(1, Math.pow(10, Math.min(size || 10, 15)) - 1);
      case 'BIGINT':
        return randomInt(1, Math.pow(10, Math.min(size || 20, 15)) - 1);
      case 'VARCHAR': {
        const str = `Item ${randomInt(1, 9999)}`;
        return str.slice(0, size || 32);
      }
      case 'CHAR': {
        const words = ['dado', 'valor', 'registro', 'informacao', 'campo', 'exemplo', 'teste'];
        let result = '';
        while (result.length < (size || 32)) {
          result += randomPick(words) + ' ';
        }
        return result.trim().slice(0, size || 32);
      }
      case 'TEXT':
        return 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
      case 'DECIMAL':
      case 'FLOAT': {
        const intDigits = Math.max((size || 10) - 2, 1);
        const maxVal = Math.pow(10, Math.min(intDigits, 10));
        return parseFloat((Math.random() * maxVal).toFixed(2));
      }
      case 'BOOLEAN':
        return randomBool();
      case 'DATE': {
        const d = randomDate(new Date(2000, 0, 1), new Date());
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()}`;
      }
      case 'DATETIME': {
        const d = randomDate(new Date(2020, 0, 1), new Date());
        return `${String(d.getDate()).padStart(2, '0')}/${String(d.getMonth() + 1).padStart(2, '0')}/${d.getFullYear()} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}:${String(d.getSeconds()).padStart(2, '0')}`;
      }
      case 'UUID':
        return crypto.randomUUID?.() ?? 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => { const r = Math.random()*16|0; return (c==='x'?r:(r&0x3|0x8)).toString(16); });
      default:
        return null;
    }
  }

  static get FIELDS() {
    return {
      identificacao: ['id', 'uuid', 'cpf', 'cnpj', 'rg', 'nino'],
      nome:          ['firstName', 'firstNameMale', 'firstNameFemale', 'lastName', 'fullName', 'nickname', 'suffix', 'title', 'motherName', 'fatherName'],
      contato:       ['email', 'phone', 'phoneFixo', 'website', 'linkedin', 'socialMedia', 'streamingPlatform', 'browser', 'ipAddress', 'macAddress', 'userAgent', 'hostname'],
      endereco:      ['street', 'neighborhood', 'city', 'state', 'stateFull', 'zipCode', 'country', 'fullAddress', 'continent', 'language', 'timezone', 'latitude', 'longitude'],
      profissional:  ['company', 'sector', 'position', 'area', 'profession', 'education', 'seniority', 'salary'],
      financeiro:    ['bank', 'bankCode', 'currency', 'paymentMethod', 'status', 'amount', 'price', 'orderStatus', 'discount', 'tax', 'creditCardFlag', 'creditCardNumber', 'invoiceNumber', 'shippingMethod', 'trackingCode'],
      datas:         ['date', 'dateUS', 'dateTime', 'birthDate', 'year', 'weekDay', 'month', 'season', 'time', 'timestamp', 'dueDate', 'paymentDate'],
      numeros:       ['age', 'quantity', 'percentage', 'rating'],
      produto:       ['product', 'productCategory', 'sku', 'barcode'],
      pessoal:       ['gender', 'maritalStatus', 'hairColor', 'eyeColor', 'religion', 'zodiacSign', 'ethnicity', 'nationality', 'naturalness'],
      entretenimento:['movie', 'movieGenre', 'bookGenre', 'series', 'musicGenre', 'instrument', 'sport', 'hobby', 'game', 'gameGenre'],
      tecnologia:    ['operatingSystem', 'programmingLanguage', 'database', 'phoneBrand'],
      veiculo:       ['carBrand', 'carModel', 'fuelType', 'vehicleType', 'licensePlate', 'renavam', 'chassi', 'carYear'],
      alimentacao:   ['food', 'drink', 'fruit', 'cuisineType', 'dietaryRestriction', 'meal', 'restaurant'],
      saude:         ['bloodType', 'height', 'weight', 'bloodPressure', 'heartRate', 'allergy', 'disease', 'medication'],
      educacao:      ['schoolSubject', 'university', 'course', 'degreeType', 'grade'],
      animal:        ['animal', 'dogBreed', 'catBreed', 'petName'],
      moda:          ['clothingType', 'clothingSize', 'color', 'clothingBrand', 'footwearSize', 'fabric'],
      outros:        ['boolean', 'lorem', 'sentence']
    };
  }

  
}

export default FakeDataGenerator;
