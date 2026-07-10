import { randomPick, randomInt, randomBool, randomDate, generateCPF, generateCNPJ, generateSSN, generateEIN } from '../utils/random';
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

// Nomes de produto por locale
const PRODUCT_NAMES_PT = ['Notebook Pro', 'Mouse Wireless', 'Teclado Mecânico', 'Monitor 27"', 'Cadeira Ergonômica', 'Fone Bluetooth', 'Câmera Digital', 'Smartphone X', 'Tablet Air', 'Impressora Laser', 'HD Externo 1TB', 'SSD NVMe 512GB', 'Webcam HD', 'Carregador USB-C', 'Roteador Wi-Fi 6'];
const PRODUCT_NAMES_EN = ['MacBook Pro', 'Wireless Mouse', 'Mechanical Keyboard', '27" Monitor', 'Ergonomic Chair', 'Bluetooth Headphones', 'Digital Camera', 'Smartphone X', 'Air Tablet', 'Laser Printer', '1TB External HD', '512GB NVMe SSD', 'HD Webcam', 'USB-C Charger', 'Wi-Fi 6 Router'];
const PRODUCT_CATEGORIES_PT = ['Eletrônicos', 'Informática', 'Móveis', 'Acessórios', 'Periféricos'];
const PRODUCT_CATEGORIES_EN = ['Electronics', 'Computers', 'Furniture', 'Accessories', 'Peripherals'];

// ===== Colunas Personalizadas: dicionário de inferência semântica =====
// Mapeia palavras-chave (PT/EN) encontradas no nome da coluna para um gerador já existente
const SEMANTIC_MAP = [
  // ===== Identificação =====
  { keywords: ['uuid'], generator: 'uuid' },
  { keywords: ['cpf'], generator: 'cpf' },
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
  locale: 'pt-BR' | 'en-US';

  constructor(nullRate = 0, errorRate = 0, locale: 'pt-BR' | 'en-US' = 'pt-BR') {
    this.nullRate = nullRate;
    this.errorRate = errorRate;
    this.locale = locale;
  }

  private get d(): DictSet {
    return this.locale === 'en-US' ? DICT_EN : DICT_PT;
  }

  generate(fields: string[], count = 10, customFields: CustomField[] = []) {
    return Array.from({ length: count }, () => this.generateOne(fields, customFields));
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
      const cityData = cities.length ? randomPick(cities) : { name: stateData.name, state: stateData.abbr };
      const areaCode = stateData.areaCodes?.length ? randomPick(stateData.areaCodes) : randomPick(countryData.areaCodes);
      ctx = { countryKey, countryData, stateData, cityData, areaCode };
    } else {
      const d = this.d;
      const keys = Object.keys(world.countries);
      const defaultKey = this.locale === 'en-US' ? 'US' : 'BR';
      const countryKey = keys.includes(defaultKey) ? defaultKey : randomPick(keys);
      const countryData: any = world.countries[countryKey];
      const stateData: any = randomPick(countryData.states);
      const cities: any[] = countryData.cities.filter(c => c.state === stateData.abbr);
      const cityData = cities.length ? randomPick(cities) : { name: stateData.name, state: stateData.abbr };
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
    if (fields.includes('email') && fields.includes('company')) {
      ctx._companyName = `${randomPick(d.company.prefixes)}${randomPick(d.company.suffixes)}`;
    }
    if (fields.includes('email')) {
      const fnKey = this.locale === 'en-US' ? 'masculine' : 'masculino';
      const ffKey = this.locale === 'en-US' ? 'feminine' : 'feminino';
      ctx._firstName = randomPick([...d.names.firstName[fnKey], ...d.names.firstName[ffKey]]);
      ctx._lastName = randomPick(d.names.lastName);
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
    const isEN = this.locale === 'en-US';
    const nameMaleKey = isEN ? 'masculine' : 'masculino';
    const nameFemaleKey = isEN ? 'feminine' : 'feminino';
    const fmtDate = (dt: Date) => isEN
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
      firstNameMale: () => randomPick(d.names.firstName[nameMaleKey]),
      firstNameFemale:()=> randomPick(d.names.firstName[nameFemaleKey]),
      lastName:      () => randLN(),
      fullName:      () => `${randFN()} ${randLN()}`,
      nickname:      () => randFN().toLowerCase() + randomInt(1, 999),
      cpf:           () => isEN ? generateSSN() : generateCPF(),
      cnpj:          () => isEN ? generateEIN() : generateCNPJ(),
      rg:            () => isEN ? `D${randomInt(1000000, 9999999)}` : `${randomInt(10,99)}.${randomInt(100,999)}.${randomInt(100,999)}-${randomInt(0,9)}`,
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
      website:       () => `https://www.${randomPick(internet.corporateDomains)}`,
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
      city:          () => ctx?.cityData?.name ?? randomPick(d.address.cities).name,
      state:         () => ctx?.cityData?.state ?? randomPick(d.address.states).abbr,
      stateFull:     () => {
        const abbr = ctx?.cityData?.state;
        if (abbr) {
          const found = d.address.states.find(s => s.abbr === abbr);
          if (found) return found.name;
        }
        return randomPick(d.address.states).name;
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
      country:       () => ctx?.countryData?.name ?? (isEN ? 'United States' : 'Brasil'),
      fullAddress:   () => {
        if (ctx?.countryKey === 'US') {
          const num = randomInt(1, 9999);
          const stName = randomPick(d.address.streetPrefix);
          const stSuffix = randomPick(d.address.streetSuffix || ['St','Ave','Dr']);
          const c = ctx?.cityData?.name ?? 'City';
          const s = ctx?.cityData?.state ?? '';
          const z = `${randomInt(10000,99999)}-${randomInt(1000,9999)}`;
          if (isEN) return `${num} ${stName} ${stSuffix}, ${c}${s ? ', '+s : ''} ${z}`;
        }
        if (ctx?.countryKey === 'BR' || !ctx?.countryKey) {
          const cityData = ctx?.cityData ?? randomPick(d.address.cities);
          const stName = d.address.streetNames ? randomPick(d.address.streetNames) : 'Rua';
          return `${randomPick(d.address.streetPrefix)} ${stName}, ${randomInt(1,5000)} — ${randomPick(d.address.neighborhoods)} — ${cityData.name}/${cityData.state} — ${randomInt(10000,99999)}-${randomInt(100,999)}`;
        }
        const city = ctx?.cityData?.name ?? 'City';
        const state = ctx?.cityData?.state ?? '';
        return `${randomInt(1, 9999)} ${randomPick(world.streetGeneric)}, ${city}${state ? ', '+state : ''}`;
      },
      company:       () => ctx?._companyName ?? `${randomPick(d.company.prefixes)} ${randomPick(d.company.suffixes)}`,
      sector:        () => randomPick(d.company.sectors),
      position:      () => isEN ? `${randomPick(d.company.positions)} of ${randomPick(d.company.areas)}` : `${randomPick(d.company.positions)} de ${randomPick(d.company.areas)}`,
      area:          () => randomPick(d.company.areas),
      profession:    () => randomPick(d.profession.professions),
      education:     () => randomPick(d.profession.education),
      seniority:     () => randomPick(d.profession.seniority),
      salary:        () => isEN ? randomInt(35000, 150000) : randomInt(1500, 35000),
      bank:          () => randomPick(d.finance.banks).name,
      bankCode:      () => randomPick(d.finance.banks).code,
      currency:      () => randomPick(d.finance.currencies).code,
      paymentMethod: () => randomPick(d.finance.paymentMethods),
      status:        () => randomPick(d.finance.statusOptions),
      amount:        () => parseFloat((Math.random() * 10000).toFixed(2)),
      price:         () => parseFloat((Math.random() * 5000 + 10).toFixed(2)),
      date:          () => ctx?._refDate ? fmtDate(ctx._refDate) : fmtDate(randomDate(new Date(2000,0,1), new Date())),
      dateTime:      () => ctx?._refDate ? fmtDateTime(ctx._refDate) : fmtDateTime(randomDate(new Date(2020,0,1), new Date())),
      birthDate:     () => fmtDate(randomDate(new Date(1950,0,1), new Date(2005,11,31))),
      dateUS:        () => ctx?._refDate ? ctx._refDate.toISOString().split('T')[0] : randomDate(new Date(2000,0,1), new Date()).toISOString().split('T')[0],
      year:          () => ctx?._refDate ? ctx._refDate.getFullYear() : randomInt(1990, 2026),
      age:           () => randomInt(18, 80),
      quantity:      () => randomInt(1, 100),
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
      product:         () => randomPick(isEN ? PRODUCT_NAMES_EN : PRODUCT_NAMES_PT),
      productCategory: () => randomPick(isEN ? PRODUCT_CATEGORIES_EN : PRODUCT_CATEGORIES_PT),
      sku:             () => `SKU-${randomInt(10000, 99999)}`,
      barcode:         () => Array.from({ length: 13 }, () => randomInt(0, 9)).join(''),
      footballTeam:      () => randomPick(d.categories.footballTeams),
      basketballTeam:    () => randomPick(d.categories.basketballTeams),
      food:              () => randomPick(d.categories.foods),
      drink:             () => randomPick(d.categories.drinks),
      fruit:             () => randomPick(d.categories.fruits),
      animal:            () => randomPick(d.categories.animals),
      dogBreed:          () => randomPick(d.categories.dogBreeds),
      catBreed:          () => randomPick(d.categories.catBreeds),
      movie:             () => randomPick(d.categories.movies),
      movieGenre:        () => randomPick(d.categories.movieGenres),
      bookGenre:         () => randomPick(d.categories.bookGenres),
      series:            () => randomPick(d.categories.series),
      musicGenre:        () => randomPick(d.categories.musicGenres),
      instrument:        () => randomPick(d.categories.instruments),
      sport:             () => randomPick(d.categories.sports),
      hobby:             () => randomPick(d.categories.hobbies),
      carBrand:          () => randomPick(d.categories.carBrands),
      carModel:          () => randomPick(d.categories.carModels),
      fuelType:          () => randomPick(d.categories.fuelTypes),
      phoneBrand:        () => randomPick(d.categories.phoneBrands),
      operatingSystem:   () => randomPick(d.categories.operatingSystems),
      programmingLanguage:()=> randomPick(d.categories.programmingLanguages),
      database:          () => randomPick(d.categories.databases),
      browser:           () => randomPick(d.categories.browsers),
      socialMedia:       () => randomPick(d.categories.socialMedia),
      streamingPlatform: () => randomPick(d.categories.streamingPlatforms),
      clothingType:      () => randomPick(d.categories.clothingTypes),
      clothingSize:      () => randomPick(d.categories.clothingSizes),
      color:             () => randomPick(d.categories.colors),
      hairColor:         () => randomPick(d.categories.hairColors),
      eyeColor:          () => randomPick(d.categories.eyeColors),
      religion:          () => randomPick(d.categories.religions),
      zodiacSign:        () => randomPick(d.categories.zodiacSigns),
      maritalStatus:     () => randomPick(d.categories.maritalStatus),
      bloodType:         () => randomPick(d.categories.bloodTypes),
      gender:            () => randomPick(d.categories.genders),
      vehicleType:       () => randomPick(d.categories.vehicleTypes),
      planet:            () => randomPick(d.categories.planets),
      weekDay:           () => ctx?._refDate ? d.categories.weekDays[ctx._refDate.getDay()] : randomPick(d.categories.weekDays),
      month:             () => ctx?._refDate ? d.categories.months[ctx._refDate.getMonth()] : randomPick(d.categories.months),
      season:            () => ctx?._refDate ? seasonFromMonth(ctx._refDate.getMonth()) : randomPick(d.categories.seasons),
      orderStatus:       () => randomPick(d.categories.orderStatus),
      schoolSubject:     () => randomPick(d.categories.schoolSubjects),
      suffix:         () => randomPick(d.person.suffixes),
      title:          () => randomPick(d.person.titles),
      motherName:     () => `${randomPick(firstNamesAll())} ${randLN()}`,
      fatherName:     () => `${randomPick(d.names.firstName[nameMaleKey])} ${randLN()}`,
      ethnicity:      () => randomPick(d.person.ethnicities),
      nationality:    () => randomPick(d.person.nationalities),
      naturalness:    () => randomPick(d.person.naturalness),
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
      cuisineType:    () => randomPick(d.food.cuisineTypes),
      dietaryRestriction: () => randomPick(d.food.dietaryRestrictions),
      meal:           () => randomPick(d.food.meals),
      restaurant:     () => randomPick(d.food.restaurants),
      height:         () => isEN ? parseFloat((randomInt(58, 84) / 12).toFixed(2)) : parseFloat((randomInt(145, 210) / 100).toFixed(2)),
      weight:         () => isEN ? randomInt(100, 300) : randomInt(45, 150),
      bloodPressure:  () => `${randomInt(100,140)}/${randomInt(60,90)}`,
      heartRate:      () => randomInt(60, 100),
      allergy:        () => randomPick(d.health.allergies),
      disease:        () => randomPick(d.health.diseases),
      medication:     () => randomPick(d.health.medications),
      university:     () => randomPick(d.education.universities),
      course:         () => randomPick(d.education.courses),
      degreeType:     () => randomPick(d.education.degreeTypes),
      grade:          () => randomPick(d.education.grades),
      game:           () => randomPick(d.entertainment.games),
      gameGenre:      () => randomPick(d.entertainment.gameGenres),
      continent:      () => randomPick(world.continents),
      language:       () => randomPick(world.languages),
      timezone:       () => randomPick(world.timezones),
      latitude:       () => parseFloat((Math.random() * 180 - 90).toFixed(6)),
      longitude:      () => parseFloat((Math.random() * 360 - 180).toFixed(6)),
      petName:        () => randomPick(d.animal.petNames),
      clothingBrand:  () => randomPick(d.fashion.clothingBrands),
      footwearSize:   () => randomPick(d.fashion.footwearSizes),
      fabric:         () => randomPick(d.fashion.fabrics),
      discount:       () => randomInt(5, 50),
      tax:            () => parseFloat((randomInt(1, 30) + Math.random()).toFixed(2)),
      creditCardFlag: () => randomPick(d.finance.creditCardFlags),
      creditCardNumber: () => Array.from({length:16},()=>randomInt(0,9)).join('').replace(/(.{4})/g,'$1 ').trim(),
      invoiceNumber:  () => isEN ? `INV-${randomInt(100000, 999999)}` : `NF-${randomInt(100000, 999999)}-${randomPick(['SP','RJ','MG','RS','PR','BA','DF'])}`,
      trackingCode:   () => {
        if (isEN) {
          return `1Z${randomPick(['A','E','F','R','X'])}${randomInt(100,999)}${randomInt(1000000,9999999)}`;
        }
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        return `BR${randomInt(100000000,999999999)}${letters[randomInt(0,25)]}${letters[randomInt(0,25)]}`;
      },
      shippingMethod: () => isEN
        ? randomPick(['USPS Priority Mail', 'UPS Ground', 'FedEx Express', 'DHL Express', 'Amazon Logistics', 'Store Pickup', 'Local Delivery'])
        : randomPick(['Correios PAC', 'Correios Sedex', 'Jadlog', 'Total Express', 'Loggi', 'Transportadora Própria', 'Motoboy', 'Retirada no Local']),
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
      identificacao: ['id', 'uuid', 'cpf', 'cnpj', 'rg'],
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
