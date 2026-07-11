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

const CATEGORY_SHIPPING_GB: Record<string, string[]> = {
  'Electronics': ['Royal Mail Tracked','DPD','Hermes','DHL Express'],
  'Computers': ['Royal Mail Tracked','DPD','Hermes','DHL Express'],
  'Furniture': ['DPD','Hermes','Local Delivery','Man with a Van'],
  'Accessories': ['Royal Mail 1st Class','DPD','Hermes','Local Delivery'],
  'Peripherals': ['Royal Mail 1st Class','DPD','Hermes','Local Delivery'],
};

const CATEGORY_SHIPPING_FR: Record<string, string[]> = {
  'Électronique': ['Colissimo','Chronopost','Mondial Relay','Relais Colis'],
  'Informatique': ['Colissimo','Chronopost','Mondial Relay','Relais Colis'],
  'Mobilier': ['Colissimo','Mondial Relay','Livraison à domicile'],
  'Accessoires': ['Colissimo','Mondial Relay','Relais Colis','Livraison à domicile'],
  'Périphériques': ['Colissimo','Mondial Relay','Relais Colis','Livraison à domicile'],
};

const CATEGORY_PRICE_FR: Record<string, [number, number]> = {
  'Électronique': [500, 15000], 'Informatique': [200, 8000],
  'Mobilier': [200, 5000], 'Accessoires': [20, 500], 'Périphériques': [50, 1500],
};

export function getCategoryPriceMap(locale: string): Record<string, [number, number]> {
  if (locale.startsWith('pt')) return CATEGORY_PRICE_PT;
  if (locale === 'fr-FR') return CATEGORY_PRICE_FR;
  return CATEGORY_PRICE_EN;
}

export function getCategoryShippingMap(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) return CATEGORY_SHIPPING_PT;
  if (locale === 'en-GB') return CATEGORY_SHIPPING_GB;
  if (locale === 'fr-FR') return CATEGORY_SHIPPING_FR;
  return CATEGORY_SHIPPING_EN;
}
