const PRODUCT_NAMES_PT = ['Notebook Pro', 'Mouse Wireless', 'Teclado Mecânico', 'Monitor 27"', 'Cadeira Ergonômica', 'Fone Bluetooth', 'Câmera Digital', 'Smartphone X', 'Tablet Air', 'Impressora Laser', 'HD Externo 1TB', 'SSD NVMe 512GB', 'Webcam HD', 'Carregador USB-C', 'Roteador Wi-Fi 6', 'Mousepad Gamer', 'Hub USB-C', 'Power Bank 20000mAh', 'Smartwatch Pro', 'Caixa de Som Bluetooth', 'Fone ANC', 'Monitor Ultrawide 34"', 'Teclado Slim', 'Cabo HDMI 2.1', 'Suporte para Notebook'];

const PRODUCT_NAMES_EN = ['MacBook Pro', 'Wireless Mouse', 'Mechanical Keyboard', '27" Monitor', 'Ergonomic Chair', 'Bluetooth Headphones', 'Digital Camera', 'Smartphone X', 'Air Tablet', 'Laser Printer', '1TB External HD', '512GB NVMe SSD', 'HD Webcam', 'USB-C Charger', 'Wi-Fi 6 Router', 'Gaming Mousepad', 'USB-C Hub', '20000mAh Power Bank', 'Pro Smartwatch', 'Bluetooth Speaker', 'ANC Headphones', '34" Ultrawide Monitor', 'Slim Keyboard', 'HDMI 2.1 Cable', 'Laptop Stand'];

const PRODUCT_NAMES_GB = ['MacBook Pro', 'Wireless Mouse', 'Mechanical Keyboard', '27" Monitor', 'Ergonomic Chair', 'Bluetooth Headphones', 'Digital Camera', 'Smartphone X', 'Air Tablet', 'Laser Printer', '1TB External HD', '512GB NVMe SSD', 'HD Webcam', 'USB-C Charger', 'Wi-Fi 6 Router', 'Gaming Mousepad', 'USB-C Hub', '20000mAh Power Bank', 'Pro Smartwatch', 'Bluetooth Speaker', 'ANC Headphones', '34" Ultrawide Monitor', 'Slim Keyboard', 'HDMI 2.1 Cable', 'Laptop Stand'];

const PRODUCT_CATEGORIES_PT = ['Eletrônicos', 'Informática', 'Móveis', 'Acessórios', 'Periféricos'];

const PRODUCT_CATEGORIES_EN = ['Electronics', 'Computers', 'Furniture', 'Accessories', 'Peripherals'];

const PRODUCT_CATEGORIES_GB = ['Electronics', 'Computers', 'Furniture', 'Accessories', 'Peripherals'];

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

const PRODUCT_CATEGORY_MAP_GB: Record<string, string> = PRODUCT_CATEGORY_MAP_EN;

export function getProductNames(locale: string): string[] {
  switch (locale) {
    case 'pt-BR':
      return PRODUCT_NAMES_PT;
    case 'en-GB':
      return PRODUCT_NAMES_GB;
    case 'en':
    default:
      return PRODUCT_NAMES_EN;
  }
}

export function getProductCategories(locale: string): string[] {
  switch (locale) {
    case 'pt-BR':
      return PRODUCT_CATEGORIES_PT;
    case 'en-GB':
      return PRODUCT_CATEGORIES_GB;
    case 'en':
    default:
      return PRODUCT_CATEGORIES_EN;
  }
}

export function getProductCategoryMap(locale: string): Record<string, string> {
  switch (locale) {
    case 'pt-BR':
      return PRODUCT_CATEGORY_MAP_PT;
    case 'en-GB':
      return PRODUCT_CATEGORY_MAP_GB;
    case 'en':
    default:
      return PRODUCT_CATEGORY_MAP_EN;
  }
}
