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
const PRODUCT_NAMES_PT = ['Notebook Pro', 'Mouse Wireless', 'Teclado Mecânico', 'Monitor 27"', 'Cadeira Ergonômica', 'Fone Bluetooth', 'Câmera Digital', 'Smartphone X', 'Tablet Air', 'Impressora Laser', 'HD Externo 1TB', 'SSD NVMe 512GB', 'Webcam HD', 'Carregador USB-C', 'Roteador Wi-Fi 6', 'Mousepad Gamer', 'Hub USB-C', 'Power Bank 20000mAh', 'Smartwatch Pro', 'Caixa de Som Bluetooth', 'Fone ANC', 'Monitor Ultrawide 34"', 'Teclado Slim', 'Cabo HDMI 2.1', 'Suporte para Notebook'];
const PRODUCT_NAMES_EN = ['MacBook Pro', 'Wireless Mouse', 'Mechanical Keyboard', '27" Monitor', 'Ergonomic Chair', 'Bluetooth Headphones', 'Digital Camera', 'Smartphone X', 'Air Tablet', 'Laser Printer', '1TB External HD', '512GB NVMe SSD', 'HD Webcam', 'USB-C Charger', 'Wi-Fi 6 Router', 'Gaming Mousepad', 'USB-C Hub', '20000mAh Power Bank', 'Pro Smartwatch', 'Bluetooth Speaker', 'ANC Headphones', '34" Ultrawide Monitor', 'Slim Keyboard', 'HDMI 2.1 Cable', 'Laptop Stand'];
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

// ===== Correlações entre campos =====

interface BrandInfo { models: string[]; vehicleTypes: string[]; fuelTypes: string[] }

const CAR_BRAND_DATA_PT: Record<string, BrandInfo> = {
  Toyota:      { models: ['Corolla','Camry','RAV4','Hilux','Etios','Yaris'], vehicleTypes: ['Sedan','SUV','Pickup'], fuelTypes: ['Flex','Híbrido','Gasolina'] },
  Volkswagen:  { models: ['Gol','T-Cross','Polo','Nivus','Saveiro','Taos'], vehicleTypes: ['Hatch','SUV','Pickup'], fuelTypes: ['Flex','Gasolina','Diesel'] },
  Chevrolet:   { models: ['Onix','Tracker','Cruze','S10','Spin','Equinox'], vehicleTypes: ['Sedan','SUV','Pickup','Hatch'], fuelTypes: ['Flex','Gasolina','Diesel'] },
  Ford:        { models: ['Ranger','Territory','Bronco Sport','Mustang','Maverick'], vehicleTypes: ['SUV','Pickup','Coupe'], fuelTypes: ['Gasolina','Diesel','Flex'] },
  Honda:       { models: ['Civic','HR-V','CR-V','Fit','City'], vehicleTypes: ['Sedan','SUV','Hatch'], fuelTypes: ['Flex','Gasolina','Híbrido'] },
  Hyundai:     { models: ['Creta','HB20','Tucson','Santa Fe','Azera'], vehicleTypes: ['SUV','Hatch','Sedan'], fuelTypes: ['Flex','Gasolina','Diesel'] },
  Fiat:        { models: ['Argo','Cronos','Pulse','Strada','Mobi','Fastback'], vehicleTypes: ['Hatch','Sedan','Pickup','SUV'], fuelTypes: ['Flex','Gasolina'] },
  Renault:     { models: ['Kwid','Sandero','Duster','Captur','Oroch'], vehicleTypes: ['Hatch','SUV','Pickup'], fuelTypes: ['Flex','Gasolina'] },
  Nissan:      { models: ['Kicks','Versa','Frontier','Sentra','Leaf'], vehicleTypes: ['SUV','Sedan','Pickup','Hatch'], fuelTypes: ['Flex','Gasolina','Elétrico'] },
  BMW:         { models: ['320i','X1','X3','X5','M3','530e'], vehicleTypes: ['Sedan','SUV','Coupe'], fuelTypes: ['Gasolina','Diesel','Híbrido','Elétrico'] },
  'Mercedes-Benz': { models: ['Classe A','Classe C','Classe E','GLA','GLC','GLE'], vehicleTypes: ['Sedan','SUV','Coupe'], fuelTypes: ['Gasolina','Diesel','Híbrido','Elétrico'] },
  Audi:        { models: ['A3','A4','Q3','Q5','Q7','e-tron'], vehicleTypes: ['Sedan','SUV','Coupe'], fuelTypes: ['Gasolina','Diesel','Elétrico','Híbrido'] },
  Jeep:        { models: ['Compass','Renegade','Wrangler','Commander','Grand Cherokee'], vehicleTypes: ['SUV','Off-road'], fuelTypes: ['Flex','Gasolina','Diesel','Híbrido'] },
  Peugeot:     { models: ['208','2008','3008','5008','Partner'], vehicleTypes: ['Hatch','SUV','Minivan'], fuelTypes: ['Flex','Gasolina','Diesel'] },
  Kia:         { models: ['Sportage','Seltos','Cerato','Stonic','EV6'], vehicleTypes: ['SUV','Sedan','Hatch'], fuelTypes: ['Gasolina','Diesel','Híbrido','Elétrico'] },
};

const CAR_BRAND_DATA_EN: Record<string, BrandInfo> = {
  Ford:         { models: ['F-150','Mustang','Explorer','Escape','Bronco','Edge'], vehicleTypes: ['Pickup','Coupe','SUV'], fuelTypes: ['Regular Gasoline','Premium Gasoline','Hybrid','Electric'] },
  Chevrolet:    { models: ['Silverado','Equinox','Tahoe','Malibu','Camaro','Traverse'], vehicleTypes: ['Pickup','SUV','Sedan'], fuelTypes: ['Regular Gasoline','Diesel','Electric'] },
  Toyota:       { models: ['Camry','Corolla','RAV4','Tacoma','Highlander','Tundra'], vehicleTypes: ['Sedan','SUV','Pickup'], fuelTypes: ['Regular Gasoline','Hybrid','Electric'] },
  Honda:        { models: ['Civic','CR-V','Accord','Pilot','HR-V','Odyssey'], vehicleTypes: ['Sedan','SUV','Minivan'], fuelTypes: ['Regular Gasoline','Hybrid'] },
  Jeep:         { models: ['Wrangler','Grand Cherokee','Cherokee','Compass','Gladiator'], vehicleTypes: ['SUV','Off-road','Pickup'], fuelTypes: ['Regular Gasoline','Hybrid','Diesel'] },
  Ram:          { models: ['Ram 1500','Ram 2500','Ram 3500','ProMaster'], vehicleTypes: ['Pickup','Van'], fuelTypes: ['Regular Gasoline','Diesel'] },
  GMC:          { models: ['Sierra','Yukon','Acadia','Terrain','Canyon'], vehicleTypes: ['Pickup','SUV'], fuelTypes: ['Regular Gasoline','Diesel'] },
  Buick:        { models: ['Encore','Envision','Enclave','LaCrosse','Regal'], vehicleTypes: ['SUV','Sedan'], fuelTypes: ['Regular Gasoline'] },
  Cadillac:     { models: ['Escalade','XT5','XT4','CT5','Lyriq'], vehicleTypes: ['SUV','Sedan'], fuelTypes: ['Premium Gasoline','Electric'] },
  Lincoln:      { models: ['Navigator','Aviator','Corsair','Nautilus'], vehicleTypes: ['SUV','Sedan'], fuelTypes: ['Premium Gasoline'] },
  Chrysler:     { models: ['Pacifica','300','Voyager'], vehicleTypes: ['Minivan','Sedan'], fuelTypes: ['Regular Gasoline','Hybrid'] },
  Dodge:        { models: ['Charger','Durango','Challenger','Grand Caravan','Hornet'], vehicleTypes: ['Sedan','SUV','Coupe','Minivan'], fuelTypes: ['Regular Gasoline','Diesel'] },
  Tesla:        { models: ['Model 3','Model Y','Model S','Model X','Cybertruck'], vehicleTypes: ['Sedan','SUV','Pickup'], fuelTypes: ['Electric'] },
  Nissan:       { models: ['Altima','Rogue','Frontier','Pathfinder','Sentra','Murano'], vehicleTypes: ['Sedan','SUV','Pickup'], fuelTypes: ['Regular Gasoline','Hybrid','Electric'] },
  Hyundai:      { models: ['Elantra','Tucson','Santa Fe','Palisade','Sonata','Kona'], vehicleTypes: ['Sedan','SUV'], fuelTypes: ['Regular Gasoline','Hybrid','Electric'] },
  Subaru:       { models: ['Outback','Forester','Crosstrek','Impreza','Legacy'], vehicleTypes: ['SUV','Sedan','Hatch'], fuelTypes: ['Regular Gasoline','Hybrid'] },
  'Mercedes-Benz': { models: ['C-Class','E-Class','S-Class','GLC','GLE','GLS'], vehicleTypes: ['Sedan','SUV','Coupe'], fuelTypes: ['Premium Gasoline','Diesel','Hybrid','Electric'] },
  BMW:          { models: ['3 Series','5 Series','X3','X5','M4','i4'], vehicleTypes: ['Sedan','SUV','Coupe'], fuelTypes: ['Premium Gasoline','Diesel','Hybrid','Electric'] },
  Audi:         { models: ['A4','A6','Q5','Q7','e-tron GT','Q4 e-tron'], vehicleTypes: ['Sedan','SUV','Coupe'], fuelTypes: ['Premium Gasoline','Diesel','Electric','Hybrid'] },
};

// Mapeamento produto → categoria
const PRODUCT_CATEGORY_MAP_PT: Record<string, string> = {
  'Notebook Pro': 'Eletrônicos', 'Mouse Wireless': 'Periféricos', 'Teclado Mecânico': 'Periféricos',
  'Monitor 27"': 'Informática', 'Cadeira Ergonômica': 'Móveis', 'Fone Bluetooth': 'Acessórios',
  'Câmera Digital': 'Eletrônicos', 'Smartphone X': 'Eletrônicos', 'Tablet Air': 'Eletrônicos',
  'Impressora Laser': 'Informática', 'HD Externo 1TB': 'Informática', 'SSD NVMe 512GB': 'Informática',
  'Webcam HD': 'Periféricos', 'Carregador USB-C': 'Acessórios', 'Roteador Wi-Fi 6': 'Informática',
  'Mousepad Gamer': 'Periféricos', 'Hub USB-C': 'Acessórios', 'Power Bank 20000mAh': 'Acessórios',
  'Smartwatch Pro': 'Eletrônicos', 'Caixa de Som Bluetooth': 'Acessórios', 'Fone ANC': 'Acessórios',
  'Monitor Ultrawide 34"': 'Informática', 'Teclado Slim': 'Periféricos', 'Cabo HDMI 2.1': 'Acessórios',
  'Suporte para Notebook': 'Móveis',
};
const PRODUCT_CATEGORY_MAP_EN: Record<string, string> = {
  'MacBook Pro': 'Electronics', 'Wireless Mouse': 'Peripherals', 'Mechanical Keyboard': 'Peripherals',
  '27" Monitor': 'Computers', 'Ergonomic Chair': 'Furniture', 'Bluetooth Headphones': 'Accessories',
  'Digital Camera': 'Electronics', 'Smartphone X': 'Electronics', 'Air Tablet': 'Electronics',
  'Laser Printer': 'Computers', '1TB External HD': 'Computers', '512GB NVMe SSD': 'Computers',
  'HD Webcam': 'Peripherals', 'USB-C Charger': 'Accessories', 'Wi-Fi 6 Router': 'Computers',
  'Gaming Mousepad': 'Peripherals', 'USB-C Hub': 'Accessories', '20000mAh Power Bank': 'Accessories',
  'Pro Smartwatch': 'Electronics', 'Bluetooth Speaker': 'Accessories', 'ANC Headphones': 'Accessories',
  '34" Ultrawide Monitor': 'Computers', 'Slim Keyboard': 'Peripherals', 'HDMI 2.1 Cable': 'Accessories',
  'Laptop Stand': 'Furniture',
};

// Gênero de filme → filmes
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

// Gênero de jogo → jogos
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

// Gênero musical → instrumentos
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

// Profissões → setores
const PROFESSION_SECTOR_PT: Record<string, string[]> = {
  'Médico': ['Saúde'], 'Enfermeiro': ['Saúde'], 'Farmacêutico': ['Saúde','Farmacêutico'],
  'Professor': ['Educação'], 'Diretor de Escola': ['Educação'],
  'Programador': ['Tecnologia da Informação'], 'Analista de Sistemas': ['Tecnologia da Informação'],
  'Engenheiro': ['Construção Civil','Indústria','Automotivo','Energia'],
  'Advogado': ['Consultoria','Jurídico'],
  'Contador': ['Finanças','Consultoria'],
  'Consultor': ['Consultoria','Tecnologia da Informação','Marketing Digital'],
  'Vendedor': ['Varejo','E-commerce','Comercial'],
  'Designer': ['Marketing Digital','Tecnologia da Informação','Moda'],
  'Motorista': ['Logística','Transporte'],
  'Cozinheiro': ['Alimentício','Turismo'],
  'Cientista de Dados': ['Tecnologia da Informação','Finanças','Saúde'],
  'Gerente': ['Administrativo','Varejo','Tecnologia da Informação'],
  'Diretor': ['Administrativo','Executivo'],
  'Jornalista': ['Comunicação','Marketing Digital','Mídia'],
  'Arquiteto': ['Construção Civil','Design','Urbanismo'],
  'Veterinário': ['Saúde','Animais','Agronegócio'],
  'Psicólogo': ['Saúde','Educação','Recursos Humanos'],
  'Nutricionista': ['Saúde','Alimentício','Fitness'],
  'Piloto': ['Transporte','Aviação','Logística'],
  'Farmacêutico Bioquímico': ['Saúde','Farmacêutico','Pesquisa'],
  'Engenheiro de Software': ['Tecnologia da Informação'],
  'Analista de Marketing': ['Marketing Digital','Varejo','E-commerce'],
};
const PROFESSION_SECTOR_EN: Record<string, string[]> = {
  'Doctor': ['Healthcare'], 'Nurse': ['Healthcare'], 'Pharmacist': ['Healthcare','Pharmaceutical'],
  'Teacher': ['Education'], 'Principal': ['Education'],
  'Software Developer': ['Technology'], 'Systems Analyst': ['Technology'],
  'Engineer': ['Construction','Manufacturing','Automotive','Energy'],
  'Lawyer': ['Consulting','Legal'],
  'Accountant': ['Finance','Consulting'],
  'Consultant': ['Consulting','Technology','Marketing'],
  'Salesperson': ['Retail','E-commerce'],
  'Designer': ['Marketing','Technology','Fashion'],
  'Driver': ['Logistics','Transportation'],
  'Chef': ['Food & Beverage','Travel'],
  'Data Scientist': ['Technology','Finance','Healthcare'],
  'Manager': ['Administrative','Retail','Technology'],
  'Director': ['Executive','Administrative'],
  'Journalist': ['Media','Marketing','Communications'],
  'Architect': ['Construction','Design','Urban Planning'],
  'Veterinarian': ['Healthcare','Animals','Agriculture'],
  'Psychologist': ['Healthcare','Education','Human Resources'],
  'Nutritionist': ['Healthcare','Food & Beverage','Fitness'],
  'Pilot': ['Transportation','Aviation','Logistics'],
  'Software Engineer': ['Technology'],
  'Marketing Analyst': ['Marketing','Retail','E-commerce'],
};

// Doença → medicação
const DISEASE_MEDICATION_PT: Record<string, string[]> = {
  'Diabetes Tipo 1': ['Insulina Glargina','Insulina Regular','Insulina Lispro'],
  'Diabetes Tipo 2': ['Metformina','Glifage','Insulina Glargina','Gliclazida'],
  'Hipertensão Arterial': ['Losartana','Captopril','Hidroclorotiazida','Anlodipino','Valsartana'],
  'Asma': ['Salbutamol','Budesonida','Aerolin','Formoterol','Montelucaste'],
  'Rinite Alérgica': ['Loratadina','Cetirizina','Desloratadina','Fexofenadina'],
  'Bronquite': ['Salbutamol','Amoxicilina','Prednisona','Azitromicina'],
  'Enxaqueca': ['Paracetamol','Ibuprofeno','Sumatriptana','Rizatriptana','Naproxeno'],
  'Ansiedade': ['Fluoxetina','Sertralina','Clonazepam','Diazepam','Escitalopram','Buspirona'],
  'Depressão': ['Fluoxetina','Sertralina','Paroxetina','Escitalopram','Venlafaxina','Amitriptilina'],
  'Hipotireoidismo': ['Levotiroxina','Eutirox','Puran'],
  'Hipertireoidismo': ['Metimazol','Propiltiouracila','Carbimazol'],
  'Colesterol Alto': ['Sinvastatina','Atorvastatina','Rosuvastatina','Ezetimiba'],
  'Obesidade': ['Metformina','Orlistate','Sibutramina','Liraglutida'],
  'Artrite Reumatoide': ['Ibuprofeno','Prednisona','Metotrexato','Adalimumabe','Etanercepte'],
  'Osteoporose': ['Carbonato de Cálcio','Alendronato','Vitamina D3','Risedronato'],
  'Gastrite': ['Omeprazol','Pantoprazol','Ranitidina','Esomeprazol','Pirenzepina'],
  'Refluxo Gastroesofágico': ['Omeprazol','Pantoprazol','Domperidona','Esomeprazol','Lansoprazol'],
  'Sinusite': ['Amoxicilina','Azitromicina','Prednisona','Cefalexina'],
  'Dermatite Atópica': ['Cetirizina','Prednisona','Dexametasona tópica','Tacrolimo','Hidrocortisona'],
  'Psoríase': ['Metotrexato','Ciclosporina','Adalimumabe','Etanercepte','Ácido Fólico'],
  'Insônia': ['Zolpidem','Melatonina','Diazepam','Doxepina','Rivotril'],
  'Epilepsia': ['Carbamazepina','Valproato de Sódio','Lamotrigina','Levetiracetam','Fenitoína'],
};
const DISEASE_MEDICATION_EN: Record<string, string[]> = {
  'Type 1 Diabetes': ['Insulin Glargine','Insulin Lispro','Insulin Aspart'],
  'Type 2 Diabetes': ['Metformin','Glipizide','Insulin Glargine','Glimepiride'],
  'Hypertension': ['Lisinopril','Losartan','Hydrochlorothiazide','Amlodipine','Valsartan'],
  'Asthma': ['Albuterol','Budesonide','Fluticasone','Montelukast','Formoterol'],
  'Allergic Rhinitis': ['Loratadine','Cetirizine','Fexofenadine','Desloratadine'],
  'Bronchitis': ['Albuterol','Amoxicillin','Prednisone','Azithromycin'],
  'Migraine': ['Ibuprofen','Sumatriptan','Rizatriptan','Naproxen','Acetaminophen'],
  'Anxiety Disorder': ['Sertraline','Fluoxetine','Clonazepam','Diazepam','Escitalopram','Buspirone'],
  'Depression': ['Fluoxetine','Sertraline','Paroxetine','Escitalopram','Venlafaxine','Amitriptyline'],
  'Hypothyroidism': ['Levothyroxine','Synthroid','Levoxyl'],
  'Hyperthyroidism': ['Methimazole','Propylthiouracil','Carbimazole'],
  'High Cholesterol': ['Atorvastatin','Simvastatin','Rosuvastatin','Ezetimibe'],
  'Obesity': ['Metformin','Orlistat','Phentermine','Liraglutide','Semaglutide'],
  'Rheumatoid Arthritis': ['Ibuprofen','Prednisone','Methotrexate','Adalimumab','Etanercept'],
  'Osteoporosis': ['Calcium Carbonate','Alendronate','Vitamin D3','Risedronate'],
  'GERD': ['Omeprazole','Pantoprazole','Famotidine','Esomeprazole','Lansoprazole'],
  'Sinusitis': ['Amoxicillin','Azithromycin','Prednisone','Cephalexin'],
  'Eczema': ['Cetirizine','Prednisone','Hydrocortisone cream','Tacrolimus','Eucrisa'],
  'Celiac Disease': ['Gluten-free diet','Vitamin D','Calcium supplement','Iron supplement'],
  'Insomnia': ['Zolpidem','Melatonin','Diazepam','Doxepin','Trazodone'],
  'Epilepsy': ['Carbamazepine','Valproic Acid','Lamotrigine','Levetiracetam','Phenytoin'],
};

// Culinária → restaurantes
const CUISINE_RESTAURANT_PT: Record<string, string[]> = {
  'Brasileira': ['Fogo de Chão','Casa do Pão de Queijo','Giraffas','Terraço Grill','Madero','Armazém São Paulo'],
  'Italiana': ['La Trattoria','Spoleto','Viena','Paris 6','Coco Bambu','Fiama'],
  'Japonesa': ['Kani Sushi','Aoyama','Temakeria','Matsuya','Kan sushi','Sushi Yassu'],
  'Mexicana': ['Taco El Pantera','Los Mexicanos','Don Diego','El Mexican Chili','Taco Bell'],
  'Americana': ['Outback Steakhouse','Madero','McDonald\'s','Burger King','Subway','Applebee\'s','TGI Friday\'s'],
  'Árabe': ['Habib\'s','Almanara','Esfiha & Cia','Koni House','Sultanas'],
  'Chinesa': ['China in Box','Spring Wok','Wok To Go','Mr. Chi','Wok & Roll'],
  'Francesa': ['Paris 6','La Pergula','Chez Claude','Bracellli','Le Petit Jardin'],
  'Indiana': ['Tandoori Flame','Curry House','Bombay Club','Naan & Kabab'],
  'Tailandesa': ['Thai Basil','Pad Thai House','Siam Kitchen','BKK Street Food'],
};
const CUISINE_RESTAURANT_EN: Record<string, string[]> = {
  'American': ['McDonald\'s','Burger King','Wendy\'s','Five Guys','In-N-Out Burger','Cracker Barrel','Shake Shack','Chick-fil-A'],
  'Italian': ['Olive Garden','Paolo\'s','Buca di Beppo','Carmine\'s','Maggiano\'s',' Carrabba\'s'],
  'Mexican': ['Taco Bell','Chipotle','Qdoba','El Pollo Loco','Moe\'s','Del Taco'],
  'Chinese': ['Panda Express','P.F. Chang\'s','Manchu Wok','Sichuan Palace','Golden Dragon'],
  'Japanese': ['Benihana','Sushi Sushi','Wasabi','Sakura','Nobu','Ichiban'],
  'Indian': ['Tandoori Flame','Curry House','Bombay Club','Naan & Kabab','Taj Mahal'],
  'Thai': ['Thai Basil','Pad Thai House','Siam Kitchen','Thai Spice','Baan Thai'],
  'French': ['Le Bernardin','Bouchon','Café du Monde','La Maison','Chez Pierre'],
  'Greek': ['The Greek House','Zorba\'s','Mykonos Grill','Opa!','Greek Caffe'],
  'Southern': ['Cracker Barrel','Popeyes','Bojangles\'','Waffle House','Dickey\'s'],
  'Korean': ['Bonchon','K BBQ House','Seoul Kitchen','Kura','Arirang'],
  'Vietnamese': ['Pho Saigon','Bún Bò Huế','Viet Garden','Saigon Sisters'],
};

// Restrição alimentar → comidas compatíveis
const DIET_FOOD_MAP_PT: Record<string, string[]> = {
  'Vegetariano': ['Pizza','Lasanha','Risoto','Tapioca','Salada Caesar','Omelete','Nhoque','Panqueca','Sopa','Sanduíche'],
  'Vegano': ['Tapioca','Salada Caesar','Sushi','Yakisoba','Acarajé','Baião de Dois','Sanduíche','Fruta','Smoothie','Bowl de Açaí'],
  'Sem Glúten': ['Feijoada','Churrasco','Sushi','Moqueca','Tapioca','Salada Caesar','Omelete','Fruta','Risoto','Sopa'],
  'Sem Lactose': ['Feijoada','Churrasco','Sushi','Moqueca','Tapioca','Yakisoba','Acarajé','Sanduíche','Panqueca','Salada'],
  'Low Carb': ['Churrasco','Omelete','Salada Caesar','Peixe Grelhado','Frango','Abacate','Brócolis','Ovo','Carne Seca','Filé Mignon'],
  'Cetogênica': ['Churrasco','Omelete','Bacon','Abacate','Queijo','Frango','Peixe','Coco','Azeite','Castanhas'],
};
const DIET_FOOD_MAP_EN: Record<string, string[]> = {
  'Vegetarian': ['Pizza','Grilled Cheese','Mac and Cheese','French Fries','Pancakes','Garden Salad','Pasta','Soup','Omelette','Fruit Bowl'],
  'Vegan': ['French Fries','Veggie Burger','Guacamole','Fruit Salad','Smoothie Bowl','Tofu Stir Fry','Hummus Wrap','Buddha Bowl','Oatmeal','Rice & Beans'],
  'Gluten-Free': ['Grilled Chicken','Steak','BBQ Ribs','Tacos','Burrito Bowl','Salmon','Rice','Baked Potato','Corn Tortilla','Fruit'],
  'Keto': ['Steak','BBQ Ribs','Cheese','Avocado','Bacon','Grilled Salmon','Chicken Thighs','Eggs','Nuts','Butter'],
  'Low-Carb': ['Grilled Chicken','Steak','Salmon','Omelette','Salad','Shrimp','Turkey','Broccoli','Cauliflower','Eggs'],
  'Paleo': ['Grilled Chicken','Sweet Potato','Salmon','Avocado','Nuts','Beef','Vegetables','Fruit','Olive Oil','Eggs'],
};

// Universidade → cursos (top 3)
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

// Raça de cachorro → nomes comuns
const DOG_BREED_NAMES_PT: Record<string, string[]> = {
  'Labrador': ['Thor','Mel','Bela','Fred','Luna','Bob','Buddy','Maggie','Max','Rocky'],
  'Golden Retriever': ['Luna','Mel','Bela','Fred','Nina','Buddy','Charlie','Duke','Rex','Coco'],
  'Bulldog Francês': ['Chico','Toddy','Pipoca','Bolinha','Bruce','Bento','Nino','Zeus'],
  'Poodle': ['Luna','Bela','Nina','Amora','Lola','Princesa','Kiara','Coco','Mel'],
  'Pastor Alemão': ['Thor','Rex','Bruce','Lucky','Max','Zeus','Apollo','Rocco','Titan'],
  'Shih Tzu': ['Luna','Bela','Mel','Pandora','Princesa','Lola','Nina','Mia'],
  'Beagle': ['Fred','Buddy','Mel','Bob','Charlie','Duke','Luna','Bela'],
  'Rottweiler': ['Thor','Rex','Zeus','Max','Apollo','Rocky','Bruno','Titan'],
  'Husky Siberiano': ['Loki','Thor','Zeus','Koda','Nala','Maya','Ghost','Duke'],
  'Dachshund': ['Mel','Bob','Chico','Pipoca','Bolinha','Toddy','Nina','Luna'],
  'Vira-lata': ['Caramelo','Costelinha','Pitoco','Paçoca','Tobias','Neguinho','Brisa','Zeca','Xerox','Manchinha'],
};
const DOG_BREED_NAMES_EN: Record<string, string[]> = {
  'Labrador Retriever': ['Buddy','Charlie','Max','Bella','Luna','Cooper','Rocky','Daisy','Tucker','Sadie'],
  'Golden Retriever': ['Buddy','Charlie','Max','Bella','Luna','Cooper','Duke','Daisy','Tucker','Bear'],
  'German Shepherd': ['Max','Rocky','Duke','Rex','Zeus','Bear','Thor','Bruno','Apollo','Titan'],
  'Bulldog': ['Winston','Gus','Tucker','Oliver','Penny','Stella','Hank','Rosie'],
  'Beagle': ['Charlie','Cooper','Jack','Lucy','Daisy','Sadie','Tucker','Molly'],
  'Poodle': ['Coco','Bella','Luna','Lucy','Daisy','Chloe','Max','Sophie'],
  'Siberian Husky': ['Loki','Thor','Zeus','Koda','Nala','Maya','Ghost','Duke'],
  'Corgi': ['Oliver','Loki','Winston','Penny','Ruby','Zoe','Daisy','Baxter'],
  'Rottweiler': ['Max','Rocky','Rex','Zeus','Bruno','Thor','Duke','Bear'],
  'Dachshund': ['Max','Bella','Charlie','Daisy','Coco','Luna','Oscar','Molly'],
  'Mixed Breed': ['Buddy','Bella','Max','Daisy','Charlie','Luna','Cooper','Rocky','Tucker','Sadie'],
};

// Raça de gato → nomes comuns
const CAT_BREED_NAMES_PT: Record<string, string[]> = {
  'Persa': ['Luna','Nina','Pandora','Bela','Amora','Kiara','Simba','Mia','Chloe'],
  'Siamês': ['Luna','Fred','Simba','Maya','Lola','Kiara','Nina','Thor'],
  'Maine Coon': ['Simba','Thor','Fred','Luna','Nina','Bento','Milo','Oliver'],
  'Sphynx': ['Thor','Bruce','Neguinho','Simba','Luna','Yoda','Gizmo','Loki'],
  'Bengal': ['Simba','Thor','Luna','Nina','Zoe','Loki','Apollo','Mia'],
  'Ragdoll': ['Luna','Milo','Fred','Bela','Nina','Amora','Kiara','Oliver'],
  'Vira-lata': ['Bolinha','Pandora','Pipoca','Amora','Floquinho','Paçoca','Tina','Cocada','Manchinha','Xerox'],
};
const CAT_BREED_NAMES_EN: Record<string, string[]> = {
  'Persian': ['Luna','Bella','Chloe','Sophie','Lily','Coco','Simba','Mia','Oscar'],
  'Maine Coon': ['Leo','Oliver','Max','Luna','Stella','Thor','Milo','Cooper'],
  'Siamese': ['Luna','Milo','Leo','Zoe','Nala','Lily','Coco','Loki'],
  'Bengal': ['Leo','Loki','Apollo','Zoe','Nala','Ruby','Milo','Luna'],
  'Sphynx': ['Gizmo','Loki','Thor','Yoda','Arya','Stella','Dobby','Patches'],
  'Ragdoll': ['Luna','Milo','Ollie','Zoe','Lily','Sophie','Bella','Charlie'],
  'American Shorthair': ['Oliver','Leo','Charlie','Luna','Lily','Rosie','Max','Bella'],
  'British Shorthair': ['Oliver','Charlie','Bella','Luna','Max','Sophie','Leo','Daisy'],
};

// OS → browsers
const OS_BROWSER_MAP_PT: Record<string, string[]> = {
  'Windows': ['Chrome','Firefox','Edge','Opera','Brave'],
  'macOS': ['Safari','Chrome','Firefox','Opera','Brave'],
  'Linux': ['Firefox','Chrome','Brave','Opera'],
  'Android': ['Chrome','Firefox','Brave','Opera','Edge'],
  'iOS': ['Safari','Chrome','Firefox','Brave'],
  'Ubuntu': ['Firefox','Chrome','Brave','Opera'],
  'ChromeOS': ['Chrome','Firefox'],
};
const OS_BROWSER_MAP_EN: Record<string, string[]> = OS_BROWSER_MAP_PT;

// OS → phone brand
const OS_PHONE_MAP_PT: Record<string, string[]> = {
  'Android': ['Samsung','Motorola','Xiaomi','LG','Asus','Sony','Huawei','OnePlus'],
  'iOS': ['Apple'],
};
const OS_PHONE_MAP_EN: Record<string, string[]> = {
  'Android': ['Samsung','Google','Motorola','OnePlus','LG','Sony','TCL'],
  'iOS': ['Apple'],
};

// Tipo de roupa → tamanhos sugeridos
const CLOTHING_TYPE_SIZES_PT: Record<string, string[]> = {
  'Camiseta': ['PP','P','M','G','GG','XG'],
  'Calça Jeans': ['36','38','40','42','44','46'],
  'Vestido': ['PP','P','M','G','GG'],
  'Jaqueta': ['P','M','G','GG','XG'],
  'Casaco': ['P','M','G','GG','XG'],
  'Blusa': ['PP','P','M','G','GG'],
  'Shorts': ['36','38','40','42','44','46'],
  'Saia': ['PP','P','M','G','GG'],
  'Terno': ['P','M','G','GG','XG'],
  'Camisa Social': ['PP','P','M','G','GG','XG'],
  'Sapato': ['36','37','38','39','40','41','42','43','44'],
};
const CLOTHING_TYPE_SIZES_EN: Record<string, string[]> = {
  'T-Shirt': ['XS','S','M','L','XL','XXL'],
  'Jeans': ['0','2','4','6','8','10','12','14'],
  'Dress': ['XS','S','M','L','XL'],
  'Jacket': ['S','M','L','XL','XXL'],
  'Coat': ['S','M','L','XL','XXL'],
  'Blouse': ['XS','S','M','L','XL'],
  'Shorts': ['0','2','4','6','8','10','12'],
  'Skirt': ['XS','S','M','L','XL'],
  'Suit': ['S','M','L','XL','XXL'],
  'Dress Shirt': ['XS','S','M','L','XL','XXL'],
  'Shoes': ['5','6','7','8','9','10','11','12','13'],
};

// ===== Additional correlation data =====

const CREDIT_CARD_BINS: Record<string, { prefixes: string[]; length: number }> = {
  'Visa': { prefixes: ['4'], length: 16 },
  'Mastercard': { prefixes: ['51','52','53','54','55'], length: 16 },
  'American Express': { prefixes: ['34','37'], length: 15 },
  'Discover': { prefixes: ['6011','644','645','646','647','648','649','65'], length: 16 },
  'Diners Club': { prefixes: ['300','301','302','303','304','305','36','38'], length: 16 },
  'Elo': { prefixes: ['636368','438935','504175','451416','636297','5067','509','6500','6501','6502'], length: 16 },
  'Hipercard': { prefixes: ['6062','3841'], length: 16 },
  'UnionPay': { prefixes: ['62'], length: 16 },
};
const CREDIT_CARD_BINS_EN: Record<string, { prefixes: string[]; length: number }> = {
  'Visa': { prefixes: ['4'], length: 16 },
  'Mastercard': { prefixes: ['51','52','53','54','55','2221','2222','2223','2224','2225','2226','2227','2228','2229','223','224','225','226','227','228','229','23','24','25','26','27','2720'], length: 16 },
  'American Express': { prefixes: ['34','37'], length: 15 },
  'Discover': { prefixes: ['6011','644','645','646','647','648','649','65'], length: 16 },
  'Diners Club': { prefixes: ['300','301','302','303','304','305','36','38'], length: 16 },
  'UnionPay': { prefixes: ['62'], length: 16 },
};

const COUNTRY_CURRENCY: Record<string, string[]> = {
  'BR': ['BRL'], 'US': ['USD'], 'GB': ['GBP'], 'JP': ['JPY'],
  'DE': ['EUR'], 'FR': ['EUR'], 'IT': ['EUR'], 'ES': ['EUR'], 'PT': ['EUR'],
  'CA': ['CAD'], 'MX': ['MXN'], 'AR': ['ARS'], 'AU': ['AUD'],
};

const COUNTRY_NATIONALITY: Record<string, string[]> = {
  'BR': ['Brasileira'], 'US': ['Americana'], 'GB': ['Inglesa'],
  'JP': ['Japonesa'], 'DE': ['Alemã'], 'FR': ['Francesa'],
  'IT': ['Italiana'], 'ES': ['Espanhola'], 'PT': ['Portuguesa'],
  'CA': ['Canadense'], 'MX': ['Mexicana'], 'AR': ['Argentina'], 'AU': ['Australiana'],
};
const COUNTRY_NATIONALITY_EN: Record<string, string[]> = {
  'BR': ['Brazilian'], 'US': ['American'], 'GB': ['British'],
  'JP': ['Japanese'], 'DE': ['German'], 'FR': ['French'],
  'IT': ['Italian'], 'ES': ['Spanish'], 'PT': ['Portuguese'],
  'CA': ['Canadian'], 'MX': ['Mexican'], 'AR': ['Argentinian'], 'AU': ['Australian'],
};

const COUNTRY_LANGUAGE: Record<string, string[]> = {
  'BR': ['Português'], 'US': ['Inglês'], 'GB': ['Inglês'],
  'JP': ['Japonês'], 'DE': ['Alemão'], 'FR': ['Francês'],
  'IT': ['Italiano'], 'ES': ['Espanhol'], 'PT': ['Português'],
  'CA': ['Inglês','Francês'], 'MX': ['Espanhol'], 'AR': ['Espanhol'], 'AU': ['Inglês'],
};
const COUNTRY_LANGUAGE_EN: Record<string, string[]> = {
  'BR': ['Portuguese'], 'US': ['English'], 'GB': ['English'],
  'JP': ['Japanese'], 'DE': ['German'], 'FR': ['French'],
  'IT': ['Italian'], 'ES': ['Spanish'], 'PT': ['Portuguese'],
  'CA': ['English','French'], 'MX': ['Spanish'], 'AR': ['Spanish'], 'AU': ['English'],
};

const COUNTRY_TIMEZONE: Record<string, string[]> = {
  'BR': ['America/Sao_Paulo','America/Manaus','America/Belem','America/Recife','America/Cuiaba'],
  'US': ['America/New_York','America/Chicago','America/Denver','America/Los_Angeles'],
  'GB': ['Europe/London'], 'JP': ['Asia/Tokyo'],
  'DE': ['Europe/Berlin'], 'FR': ['Europe/Paris'], 'IT': ['Europe/Rome'],
  'ES': ['Europe/Madrid'], 'PT': ['Europe/Lisbon'],
  'CA': ['America/Toronto','America/Vancouver','America/Edmonton'],
  'MX': ['America/Mexico_City'], 'AR': ['America/Argentina/Buenos_Aires'], 'AU': ['Australia/Sydney'],
};

const GENDER_TITLE_PT: Record<string, string[]> = {
  'Masculino': ['Sr.','Dr.','Prof.','Eng.','Arq.','Doutor','Professor','Engenheiro','Arquiteto','Senhor'],
  'Feminino': ['Sra.','Srta.','Dra.','Profa.','Enga.','Arqa.','Doutora','Professora','Engenheira','Arquiteta','Senhorita'],
};
const GENDER_TITLE_EN: Record<string, string[]> = {
  'Male': ['Mr.','Sir','Lord','Dr.','Prof.','Gentleman'],
  'Female': ['Ms.','Mrs.','Lady','Dame','Dr.','Prof.','Madam'],
};

const CATEGORY_PRICE_PT: Record<string, [number, number]> = {
  'Eletrônicos': [500, 15000], 'Informática': [200, 8000],
  'Móveis': [200, 5000], 'Acessórios': [20, 500], 'Periféricos': [50, 1500],
};
const CATEGORY_PRICE_EN: Record<string, [number, number]> = {
  'Electronics': [500, 15000], 'Computers': [200, 8000],
  'Furniture': [200, 5000], 'Accessories': [20, 500], 'Peripherals': [50, 1500],
};

const CATEGORY_SHIPPING_PT: Record<string, string[]> = {
  'Eletrônicos': ['Transportadora Própria','Correios Sedex','Jadlog'],
  'Informática': ['Transportadora Própria','Correios Sedex','Jadlog','Total Express'],
  'Móveis': ['Transportadora Própria','Jadlog','Loggi'],
  'Acessórios': ['Correios PAC','Correios Sedex','Motoboy','Loggi'],
  'Periféricos': ['Correios PAC','Correios Sedex','Motoboy','Loggi'],
};
const CATEGORY_SHIPPING_EN: Record<string, string[]> = {
  'Electronics': ['UPS Ground','FedEx Express','DHL Express'],
  'Computers': ['UPS Ground','FedEx Express','DHL Express'],
  'Furniture': ['UPS Ground','FedEx Express','Local Delivery'],
  'Accessories': ['USPS Priority Mail','Amazon Logistics','Local Delivery'],
  'Peripherals': ['USPS Priority Mail','Amazon Logistics','Local Delivery'],
};

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
  'Las Vegas Raiders': ['NV'],
  'Denver Broncos': ['CO'],
  'Seattle Seahawks': ['WA'],
  'Chicago Bears': ['IL'],
  'Minnesota Vikings': ['MN'],
  'New Orleans Saints': ['LA'],
  'Atlanta Falcons': ['GA'],
  'Detroit Lions': ['MI'],
  'Arizona Cardinals': ['AZ'],
  'Tennessee Titans': ['TN'],
  'Indianapolis Colts': ['IN'],
};

const BASKETBALL_TEAM_STATE_PT: Record<string, string[]> = {
  'Lakers': ['CA'], 'Warriors': ['CA'],
  'Celtics': ['MA'],
  'Bulls': ['IL'],
  'Heat': ['FL'],
  'Nets': ['NY'], 'Knicks': ['NY'],
  'Bucks': ['WI'],
  'Suns': ['AZ'],
  'Nuggets': ['CO'],
  'Mavericks': ['TX'],
  'Flamengo Basquete': ['RJ'], 'Franca': ['SP'],
};
const BASKETBALL_TEAM_STATE_EN: Record<string, string[]> = {
  'Los Angeles Lakers': ['CA'], 'Golden State Warriors': ['CA'], 'Los Angeles Clippers': ['CA'],
  'Boston Celtics': ['MA'],
  'Chicago Bulls': ['IL'],
  'Miami Heat': ['FL'], 'Orlando Magic': ['FL'],
  'Brooklyn Nets': ['NY'], 'New York Knicks': ['NY'],
  'Milwaukee Bucks': ['WI'],
  'Phoenix Suns': ['AZ'],
  'Denver Nuggets': ['CO'],
  'Dallas Mavericks': ['TX'], 'Houston Rockets': ['TX'], 'San Antonio Spurs': ['TX'],
  'Philadelphia 76ers': ['PA'],
  'Atlanta Hawks': ['GA'],
  'Toronto Raptors': ['ON'],
  'Cleveland Cavaliers': ['OH'], 'Detroit Pistons': ['MI'],
  'Indiana Pacers': ['IN'],
  'Memphis Grizzlies': ['TN'],
  'New Orleans Pelicans': ['LA'],
  'Oklahoma City Thunder': ['OK'],
  'Portland Trail Blazers': ['OR'],
  'Utah Jazz': ['UT'],
  'Minnesota Timberwolves': ['MN'],
  'Charlotte Hornets': ['NC'],
  'Washington Wizards': ['DC'],
  'Sacramento Kings': ['CA'],
};

const ZODIAC_SIGNS_PT = ['Aquário','Peixes','Áries','Touro','Gêmeos','Câncer','Leão','Virgem','Libra','Escorpião','Sagitário','Capricórnio'];
const ZODIAC_BOUNDARIES = [
  { month: 0, day: 20 }, { month: 1, day: 19 }, { month: 2, day: 21 }, { month: 3, day: 20 },
  { month: 4, day: 21 }, { month: 5, day: 21 }, { month: 6, day: 23 }, { month: 7, day: 23 },
  { month: 8, day: 23 }, { month: 9, day: 23 }, { month: 10, day: 22 }, { month: 11, day: 22 },
];

const ZODIAC_SIGNS_EN = ['Aquarius','Pisces','Aries','Taurus','Gemini','Cancer','Leo','Virgo','Libra','Scorpio','Sagittarius','Capricorn'];

// Age → marital status
const AGE_MARITAL_PT: Record<string, string[]> = {
  young: ['Solteiro(a)','Solteiro(a)','Solteiro(a)','União Estável'],
  mid: ['Casado(a)','Casado(a)','Divorciado(a)','Solteiro(a)','União Estável'],
  senior: ['Casado(a)','Viúvo(a)','Divorciado(a)','Casado(a)'],
};
const AGE_MARITAL_EN: Record<string, string[]> = {
  young: ['Single','Single','Single','In a Relationship'],
  mid: ['Married','Married','Divorced','Single','Domestic Partnership'],
  senior: ['Married','Widowed','Divorced','Married'],
};

// Age → education
const AGE_EDUCATION_PT: Record<string, string[]> = {
  young: ['Graduação Incompleta','Graduação Completa','Curso Técnico Completo'],
  mid: ['Graduação Completa','Pós-graduação Completa','MBA Completo','Mestrado Completo'],
  senior: ['Graduação Completa','Pós-graduação Completa','Mestrado Completo','Doutorado Completo','MBA Completo'],
};
const AGE_EDUCATION_EN: Record<string, string[]> = {
  young: ['Some College','Bachelor\'s Degree','Associate Degree'],
  mid: ['Bachelor\'s Degree','Master\'s Degree','MBA','PhD'],
  senior: ['Bachelor\'s Degree','Master\'s Degree','PhD','MBA','MD'],
};

// Age → hobby
const AGE_HOBBY_PT: Record<string, string[]> = {
  young: ['Videogame','Fotografia','Dança','Skate','Leitura','Yoga','Xadrez'],
  mid: ['Culinária','Jardinagem','Fotografia','Pesca','Viagem','Leitura','Marcenaria'],
  senior: ['Jardinagem','Pesca','Leitura','Colecionismo','Xadrez','Culinária','Marcenaria'],
};
const AGE_HOBBY_EN: Record<string, string[]> = {
  young: ['Gaming','Photography','Dance','Skateboarding','Reading','Yoga','Chess'],
  mid: ['Cooking','Gardening','Photography','Fishing','Travel','Reading','Woodworking'],
  senior: ['Gardening','Fishing','Reading','Collecting','Chess','Cooking','Woodworking'],
};

// ===== NOVAS CORRELAÇÕES =====

// Genre → Series
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

// Genre → Books
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

// Profession → Software
const PROFESSION_SOFTWARE_PT: Record<string, string[]> = {
  'Desenvolvedor de Software': ['VS Code','IntelliJ IDEA','Git','Docker','Postman'],
  'Engenheiro de Dados': ['SQL Server','Power BI','Tableau','Airflow','dbt'],
  'Cientista de Dados': ['Jupyter Notebook','Python','R Studio','TensorFlow','Pandas'],
  'UX/UI Designer': ['Figma','Sketch','Adobe XD','InVision','Miro'],
  'Product Manager': ['Jira','Confluence','Notion','Trello','Miro'],
  'Analista de Marketing': ['Google Analytics','HubSpot','SEMrush','Google Ads','Mailchimp'],
  'Contador': ['Sage','TOTVS','Omie','Domínio','Fortes'],
  'Advogado': ['PJe','SAJ','Astrea','JusBrasil','Turivius'],
  'Médico': ['Tasy','MV','Epico','Clinicore','Doctoralia'],
  'Designer Gráfico': ['Photoshop','Illustrator','Canva','InDesign','CorelDRAW'],
};
const PROFESSION_SOFTWARE_EN: Record<string, string[]> = {
  'Software Developer': ['VS Code','IntelliJ IDEA','Git','Docker','Postman','GitHub Copilot'],
  'Data Engineer': ['SQL Server','Power BI','Tableau','Airflow','dbt','Snowflake'],
  'Data Scientist': ['Jupyter Notebook','Python','R Studio','TensorFlow','Pandas','Scikit-learn'],
  'UX/UI Designer': ['Figma','Sketch','Adobe XD','InVision','Miro','Zeplin'],
  'Product Manager': ['Jira','Confluence','Notion','Trello','Miro','Asana'],
  'Marketing Analyst': ['Google Analytics','HubSpot','SEMrush','Google Ads','Mailchimp','Hootsuite'],
  'Accountant': ['QuickBooks','Sage','Xero','FreshBooks','Wave'],
  'Lawyer': ['Clio','Westlaw','LexisNexis','LegalZoom','Rocket Lawyer'],
  'Doctor': ['Epic','Cerner','Allscripts','Athenahealth','DrChrono'],
  'Graphic Designer': ['Photoshop','Illustrator','Canva','InDesign','Figma','CorelDRAW'],
};

// Hobby → Equipment
const HOBBY_EQUIPMENT_PT: Record<string, string[]> = {
  'Fotografia': ['Câmera DSLR','Lente 50mm','Tripé','Cartão SD','Mochila Fotográfica'],
  'Culinária': ['Panela de Pressão','Frigideira Antiaderente','Liquidificador','Air Fryer','Forma de Bolo'],
  'Jardinagem': ['Pá','Regador','Tesoura de Poda','Vaso de Plantas','Adubo'],
  'Pesca': ['Vara de Pescar','Molinete','Isca Artificial','Caixa de Pesca','Cadeira de Pesca'],
  'Marcenaria': ['Serra','Plaina','Trena','Lixa','Parafusos'],
  'Videogame': ['Controle','Headset','Monitor Gamer','Cadeira Gamer','Mouse Gamer'],
  'Yoga': ['Esteira de Yoga','Blocos de Yoga','Roupa Fitness','Corda','Bolsa de Yoga'],
  'Dança': ['Sapatos de Dança','Roupa Fitness','Espelho','Barra de Ballet','Caixa de Som'],
  'Xadrez': ['Tabuleiro de Xadrez','Peças de Xadrez','Relógio de Xadrez','Livro de Aberturas'],
  'Leitura': ['E-reader','Luminária','Cadeira Confortável','Marca Página','Óculos de Leitura'],
  'Pintura': ['Tela','Tintas Acrílicas','Pincéis','Paleta','Easel'],
  'Costura': ['Máquina de Costura','Tesoura','Fios','Medidor','Alfinetes'],
  'Viagem': ['Mochila de Viagem','Passaporte','Adaptador de Tomada','Travesseiro de Viagem','Malinha'],
  'Colecionismo': ['Estojos','Prateleiras','Catálogo','Luvas','Caixas Organizadoras'],
};
const HOBBY_EQUIPMENT_EN: Record<string, string[]> = {
  'Photography': ['DSLR Camera','50mm Lens','Tripod','SD Card','Camera Bag'],
  'Cooking': ['Pressure Cooker','Non-stick Pan','Blender','Air Fryer','Baking Sheet'],
  'Gardening': ['Shovel','Watering Can','Pruning Shears','Plant Pot','Fertilizer'],
  'Fishing': ['Fishing Rod','Reel','Lure','Tackle Box','Fishing Chair'],
  'Woodworking': ['Saw','Plane','Tape Measure','Sandpaper','Screws'],
  'Gaming': ['Controller','Headset','Gaming Monitor','Gaming Chair','Gaming Mouse'],
  'Yoga': ['Yoga Mat','Yoga Blocks','Fitness Wear','Strap','Yoga Bag'],
  'Dance': ['Dance Shoes','Fitness Wear','Mirror','Ballet Barre','Speaker'],
  'Chess': ['Chess Board','Chess Pieces','Chess Clock','Opening Book'],
  'Reading': ['E-reader','Desk Lamp','Comfortable Chair','Bookmark','Reading Glasses'],
  'Painting': ['Canvas','Acrylic Paints','Brushes','Palette','Easel'],
  'Knitting': ['Knitting Needles','Yarn','Scissors','Measuring Tape','Stitch Markers'],
  'Travel': ['Travel Backpack','Passport','Power Adapter','Travel Pillow','Carry-on Luggage'],
  'Collecting': ['Display Cases','Shelving','Catalog','Gloves','Storage Boxes'],
  'Camping': ['Tent','Sleeping Bag','Camp Stove','Lantern','Backpack'],
  'Running': ['Running Shoes','Smartwatch','Running Shorts','Water Bottle','Headphones'],
};

// Streaming → Genre
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

function getCardBin(flag: string, isEN: boolean): string {
  const bins = isEN ? CREDIT_CARD_BINS_EN : CREDIT_CARD_BINS;
  const info = bins[flag];
  if (!info) return '4';
  const prefix = randomPick(info.prefixes);
  const remaining = info.length - prefix.length;
  return prefix + Array.from({ length: remaining }, () => randomInt(0, 9)).join('');
}

function getZodiac(date: Date, isEN: boolean): string {
  const signs = isEN ? ZODIAC_SIGNS_EN : ZODIAC_SIGNS_PT;
  const m = date.getMonth();
  const d = date.getDate();
  for (let i = signs.length - 1; i >= 0; i--) {
    if (m > ZODIAC_BOUNDARIES[i].month || (m === ZODIAC_BOUNDARIES[i].month && d >= ZODIAC_BOUNDARIES[i].day)) {
      return signs[i];
    }
  }
  return signs[signs.length - 1];
}

function randomDateInZodiac(sign: string, year: number, isEN: boolean): Date {
  const signs = isEN ? ZODIAC_SIGNS_EN : ZODIAC_SIGNS_PT;
  const idx = signs.indexOf(sign);
  if (idx === -1) return new Date(year, 0, 1);
  const start = ZODIAC_BOUNDARIES[idx];
  const end = ZODIAC_BOUNDARIES[(idx + 1) % signs.length];
  let endMonth = end.month;
  let endYear = year;
  if (end.month <= start.month && end.day <= start.day) { endYear = year + 1; }
  const startDate = new Date(year, start.month, start.day);
  const endDate = new Date(endYear, endMonth, end.day);
  const diff = endDate.getTime() - startDate.getTime();
  return new Date(startDate.getTime() + Math.random() * diff);
}

function genShippingMethod(category: string | undefined, isEN: boolean): string {
  if (!category) return randomPick(isEN
    ? ['USPS Priority Mail', 'UPS Ground', 'FedEx Express', 'DHL Express', 'Amazon Logistics', 'Store Pickup', 'Local Delivery']
    : ['Correios PAC', 'Correios Sedex', 'Jadlog', 'Total Express', 'Loggi', 'Transportadora Própria', 'Motoboy', 'Retirada no Local']);
  const map = isEN ? CATEGORY_SHIPPING_EN : CATEGORY_SHIPPING_PT;
  const methods = map[category];
  if (methods) return randomPick(methods);
  return randomPick(isEN
    ? ['USPS Priority Mail', 'UPS Ground', 'FedEx Express']
    : ['Correios PAC', 'Correios Sedex', 'Jadlog']);
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
    const isEN = this.locale === 'en-US';
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
        const _titleMap = isEN ? GENDER_TITLE_EN : GENDER_TITLE_PT;
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
    const _carData = isEN ? CAR_BRAND_DATA_EN : CAR_BRAND_DATA_PT;
    if (fields.includes('carBrand')) {
      const _brands = Object.keys(_carData);
      ctx._carBrand = randomPick(_brands);
      const _brandInfo = _carData[ctx._carBrand];
      if (fields.includes('carModel')) ctx._carModel = randomPick(_brandInfo.models);
      if (fields.includes('fuelType')) ctx._carFuelType = randomPick(_brandInfo.fuelTypes);
      if (fields.includes('vehicleType')) ctx._carVehicleType = randomPick(_brandInfo.vehicleTypes);
    }

    // Product category ↔ product (bi-directional)
    const _pcMap = isEN ? PRODUCT_CATEGORY_MAP_EN : PRODUCT_CATEGORY_MAP_PT;
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
      ctx._productCategory = randomPick(isEN ? PRODUCT_CATEGORIES_EN : PRODUCT_CATEGORIES_PT);
    }

    // Movie genre → movie
    const _movieMap = isEN ? MOVIE_GENRE_MAP_EN : MOVIE_GENRE_MAP_PT;
    if (fields.includes('movieGenre')) {
      const _mGenres = Object.keys(_movieMap);
      ctx._movieGenre = randomPick(_mGenres);
      if (fields.includes('movie')) ctx._movie = randomPick(_movieMap[ctx._movieGenre]);
    }

    // Game genre → game
    const _gameMap = isEN ? GAME_GENRE_MAP_EN : GAME_GENRE_MAP_PT;
    if (fields.includes('gameGenre')) {
      const _gGenres = Object.keys(_gameMap);
      ctx._gameGenre = randomPick(_gGenres);
      if (fields.includes('game')) ctx._game = randomPick(_gameMap[ctx._gameGenre]);
    }

    // Music genre → instrument
    const _musicMap = isEN ? MUSIC_GENRE_INSTRUMENTS_EN : MUSIC_GENRE_INSTRUMENTS_PT;
    if (fields.includes('musicGenre')) {
      const _muGenres = Object.keys(_musicMap);
      ctx._musicGenre = randomPick(_muGenres);
      if (fields.includes('instrument')) ctx._instrument = randomPick(_musicMap[ctx._musicGenre]);
    }

    // Profession → sector
    const _profSectorMap = isEN ? PROFESSION_SECTOR_EN : PROFESSION_SECTOR_PT;
    if (fields.includes('profession') && fields.includes('sector')) {
      const _profs = Object.keys(_profSectorMap);
      ctx._profession = randomPick(_profs);
      ctx._sector = randomPick(_profSectorMap[ctx._profession]);
    }

    // Disease → medication
    const _diseaseMedMap = isEN ? DISEASE_MEDICATION_EN : DISEASE_MEDICATION_PT;
    if (fields.includes('disease')) {
      const _diseases = Object.keys(_diseaseMedMap);
      ctx._disease = randomPick(_diseases);
      if (fields.includes('medication')) ctx._medication = randomPick(_diseaseMedMap[ctx._disease]);
    }

    // Cuisine type → restaurant
    const _cuisineRestMap = isEN ? CUISINE_RESTAURANT_EN : CUISINE_RESTAURANT_PT;
    if (fields.includes('cuisineType')) {
      const _cuisines = Object.keys(_cuisineRestMap);
      ctx._cuisineType = randomPick(_cuisines);
      if (fields.includes('restaurant')) ctx._restaurant = randomPick(_cuisineRestMap[ctx._cuisineType]);
    }

    // Dietary restriction → food
    const _dietFoodMap = isEN ? DIET_FOOD_MAP_EN : DIET_FOOD_MAP_PT;
    if (fields.includes('dietaryRestriction')) {
      const _diets = Object.keys(_dietFoodMap);
      ctx._dietaryRestriction = randomPick(_diets);
      if (fields.includes('food')) ctx._food = randomPick(_dietFoodMap[ctx._dietaryRestriction]);
    }

    // University → course
    const _uniCourseMap = isEN ? UNIVERSITY_COURSES_EN : UNIVERSITY_COURSES_PT;
    if (fields.includes('university')) {
      const _unis = Object.keys(_uniCourseMap);
      ctx._university = randomPick(_unis);
      if (fields.includes('course')) ctx._course = randomPick(_uniCourseMap[ctx._university]);
    }

    // Dog breed → pet name
    const _dogPetMap = isEN ? DOG_BREED_NAMES_EN : DOG_BREED_NAMES_PT;
    if (fields.includes('dogBreed') && fields.includes('petName')) {
      const _dogBreeds = Object.keys(_dogPetMap);
      ctx._dogBreed = randomPick(_dogBreeds);
      ctx._petName = randomPick(_dogPetMap[ctx._dogBreed]);
    }

    // Cat breed → pet name
    const _catPetMap = isEN ? CAT_BREED_NAMES_EN : CAT_BREED_NAMES_PT;
    if (fields.includes('catBreed') && fields.includes('petName')) {
      const _catBreeds = Object.keys(_catPetMap);
      ctx._catBreed = randomPick(_catBreeds);
      ctx._petName = randomPick(_catPetMap[ctx._catBreed]);
    }

    // OS → browser
    const _osBrowserMap = isEN ? OS_BROWSER_MAP_EN : OS_BROWSER_MAP_PT;
    if (fields.includes('operatingSystem')) {
      const _oss = Object.keys(_osBrowserMap);
      ctx._operatingSystem = randomPick(_oss);
      if (fields.includes('browser')) ctx._browser = randomPick(_osBrowserMap[ctx._operatingSystem]);
    }

    // OS → phone brand
    const _osPhoneMap = isEN ? OS_PHONE_MAP_EN : OS_PHONE_MAP_PT;
    if (fields.includes('operatingSystem') && fields.includes('phoneBrand')) {
      if (!ctx._operatingSystem) ctx._operatingSystem = randomPick(Object.keys(_osPhoneMap));
      ctx._phoneBrand = randomPick(_osPhoneMap[ctx._operatingSystem]);
    }

    // Clothing type → clothing size
    const _clothingSizeMap = isEN ? CLOTHING_TYPE_SIZES_EN : CLOTHING_TYPE_SIZES_PT;
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
        const _dmm = isEN ? DISEASE_MEDICATION_EN : DISEASE_MEDICATION_PT;
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
        ctx._creditCardNumber = getCardBin(ctx._creditCardFlag, isEN);
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
      const _natMap = isEN ? COUNTRY_NATIONALITY_EN : COUNTRY_NATIONALITY;
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
      const _langMap = isEN ? COUNTRY_LANGUAGE_EN : COUNTRY_LANGUAGE;
      const _langs = _langMap[ctx.countryKey];
      if (_langs) ctx._language = randomPick(_langs);
    }

    // Country → timezone
    if (fields.includes('timezone') && ctx?.countryKey) {
      const _tzMap = COUNTRY_TIMEZONE[ctx.countryKey];
      if (_tzMap) ctx._timezone = randomPick(_tzMap);
    }

    // Product category → price range
    if (fields.includes('price') && ctx._productCategory) {
      const _priceMap = isEN ? CATEGORY_PRICE_EN : CATEGORY_PRICE_PT;
      const _range = _priceMap[ctx._productCategory];
      if (_range) ctx._price = parseFloat((_range[0] + Math.random() * (_range[1] - _range[0])).toFixed(2));
    }

    // Age → marital status
    if (fields.includes('maritalStatus') && ctx._age) {
      const _maritalMap = isEN ? AGE_MARITAL_EN : AGE_MARITAL_PT;
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
      const _ftMap = isEN ? FOOTBALL_TEAM_STATE_EN : FOOTBALL_TEAM_STATE_PT;
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
      const _btMap = isEN ? BASKETBALL_TEAM_STATE_EN : BASKETBALL_TEAM_STATE_PT;
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
      ctx._zodiacSign = getZodiac(ctx._birthDate, isEN);
    } else if (fields.includes('zodiacSign') && fields.includes('birthDate') && !ctx._birthDate) {
      const _zodiac = randomPick(isEN ? ZODIAC_SIGNS_EN : ZODIAC_SIGNS_PT);
      ctx._zodiacSign = _zodiac;
      ctx._birthDate = randomDateInZodiac(_zodiac, randomInt(1950, 2005), isEN);
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
      const _eduMap = isEN ? AGE_EDUCATION_EN : AGE_EDUCATION_PT;
      let _key: string;
      if (ctx._age < 24) _key = 'young';
      else if (ctx._age < 45) _key = 'mid';
      else _key = 'senior';
      ctx._education = randomPick(_eduMap[_key]);
    }

    // Age → hobby
    if (fields.includes('hobby') && ctx._age) {
      const _hobbyMap = isEN ? AGE_HOBBY_EN : AGE_HOBBY_PT;
      let _key: string;
      if (ctx._age < 25) _key = 'young';
      else if (ctx._age < 50) _key = 'mid';
      else _key = 'senior';
      ctx._hobby = randomPick(_hobbyMap[_key]);
    }

    // Product category → shipping method
    if (fields.includes('shippingMethod') && ctx._productCategory) {
      ctx._shippingMethod = genShippingMethod(ctx._productCategory, isEN);
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
      const _seriesMap = isEN ? SERIES_GENRE_MAP_EN : SERIES_GENRE_MAP_PT;
      const _series = _seriesMap[ctx._movieGenre];
      if (_series && _series.length > 0) ctx._series = randomPick(_series);
    }

    // Genre → Book
    if (fields.includes('bookGenre')) {
      const _bookMap = isEN ? BOOK_GENRE_MAP_EN : BOOK_GENRE_MAP_PT;
      const _genres = Object.keys(_bookMap);
      ctx._bookGenre = randomPick(_genres);
    }

    // Profession → Software
    if (fields.includes('software') && ctx._profession) {
      const _swMap = isEN ? PROFESSION_SOFTWARE_EN : PROFESSION_SOFTWARE_PT;
      const _sw = _swMap[ctx._profession];
      if (_sw && _sw.length > 0) ctx._software = randomPick(_sw);
    }

    // Hobby → Equipment
    if (fields.includes('equipment') && ctx._hobby) {
      const _eqMap = isEN ? HOBBY_EQUIPMENT_EN : HOBBY_EQUIPMENT_PT;
      const _eq = _eqMap[ctx._hobby];
      if (_eq && _eq.length > 0) ctx._equipment = randomPick(_eq);
    }

    // Streaming → Genre
    if (fields.includes('streamingGenre') || fields.includes('streamingPlatform')) {
      if (!ctx._streamingPlatform) ctx._streamingPlatform = randomPick(isEN ? ['Netflix','Amazon Prime Video','Disney+','HBO Max','Paramount+','Apple TV+','Peacock','Hulu','Crunchyroll'] : ['Netflix','Amazon Prime Video','Disney+','HBO Max','Globoplay','Paramount+','Apple TV+','Crunchyroll']);
    }
    if (fields.includes('streamingGenre') && ctx._streamingPlatform) {
      const _sgMap = isEN ? STREAMING_GENRE_MAP_EN : STREAMING_GENRE_MAP_PT;
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
      product:         () => ctx?._product ?? randomPick(isEN ? PRODUCT_NAMES_EN : PRODUCT_NAMES_PT),
      productCategory: () => ctx?._productCategory ?? randomPick(isEN ? PRODUCT_CATEGORIES_EN : PRODUCT_CATEGORIES_PT),
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
      seriesGenre:       () => ctx?._seriesGenre ?? randomPick(isEN ? Object.keys(SERIES_GENRE_MAP_EN) : Object.keys(SERIES_GENRE_MAP_PT)),
      bookGenre:         () => ctx?._bookGenre ?? randomPick(isEN ? Object.keys(BOOK_GENRE_MAP_EN) : Object.keys(BOOK_GENRE_MAP_PT)),
      software:          () => ctx?._software ?? randomPick(isEN ? Object.values(PROFESSION_SOFTWARE_EN).flat() : Object.values(PROFESSION_SOFTWARE_PT).flat()),
      equipment:         () => ctx?._equipment ?? randomPick(isEN ? Object.values(HOBBY_EQUIPMENT_EN).flat() : Object.values(HOBBY_EQUIPMENT_PT).flat()),
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
      title:          () => ctx?._title ?? randomPick(isEN ? GENDER_TITLE_EN['Male'].concat(GENDER_TITLE_EN['Female']) : GENDER_TITLE_PT['Masculino'].concat(GENDER_TITLE_PT['Feminino'])),
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
