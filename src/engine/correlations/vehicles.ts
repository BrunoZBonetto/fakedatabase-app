export interface BrandInfo {
  models: string[];
  vehicleTypes: string[];
  fuelTypes: string[];
}

const CAR_BRAND_DATA_PT: Record<string, BrandInfo> = {
  Toyota: { models: ['Corolla', 'Camry', 'RAV4', 'Hilux', 'Etios', 'Yaris'], vehicleTypes: ['Sedan', 'SUV', 'Pickup'], fuelTypes: ['Flex', 'Híbrido', 'Gasolina'] },
  Volkswagen: { models: ['Gol', 'T-Cross', 'Polo', 'Nivus', 'Saveiro', 'Taos'], vehicleTypes: ['Hatch', 'SUV', 'Pickup'], fuelTypes: ['Flex', 'Gasolina', 'Diesel'] },
  Chevrolet: { models: ['Onix', 'Tracker', 'Cruze', 'S10', 'Spin', 'Equinox'], vehicleTypes: ['Sedan', 'SUV', 'Pickup', 'Hatch'], fuelTypes: ['Flex', 'Gasolina', 'Diesel'] },
  Ford: { models: ['Ranger', 'Territory', 'Bronco Sport', 'Mustang', 'Maverick'], vehicleTypes: ['SUV', 'Pickup', 'Coupe'], fuelTypes: ['Gasolina', 'Diesel', 'Flex'] },
  Honda: { models: ['Civic', 'HR-V', 'CR-V', 'Fit', 'City'], vehicleTypes: ['Sedan', 'SUV', 'Hatch'], fuelTypes: ['Flex', 'Gasolina', 'Híbrido'] },
  Hyundai: { models: ['Creta', 'HB20', 'Tucson', 'Santa Fe', 'Azera'], vehicleTypes: ['SUV', 'Hatch', 'Sedan'], fuelTypes: ['Flex', 'Gasolina', 'Diesel'] },
  Fiat: { models: ['Argo', 'Cronos', 'Pulse', 'Strada', 'Mobi', 'Fastback'], vehicleTypes: ['Hatch', 'Sedan', 'Pickup', 'SUV'], fuelTypes: ['Flex', 'Gasolina'] },
  Renault: { models: ['Kwid', 'Sandero', 'Duster', 'Captur', 'Oroch'], vehicleTypes: ['Hatch', 'SUV', 'Pickup'], fuelTypes: ['Flex', 'Gasolina'] },
  Nissan: { models: ['Kicks', 'Versa', 'Frontier', 'Sentra', 'Leaf'], vehicleTypes: ['SUV', 'Sedan', 'Pickup', 'Hatch'], fuelTypes: ['Flex', 'Gasolina', 'Elétrico'] },
  BMW: { models: ['320i', 'X1', 'X3', 'X5', 'M3', '530e'], vehicleTypes: ['Sedan', 'SUV', 'Coupe'], fuelTypes: ['Gasolina', 'Diesel', 'Híbrido', 'Elétrico'] },
  'Mercedes-Benz': { models: ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC', 'GLE'], vehicleTypes: ['Sedan', 'SUV', 'Coupe'], fuelTypes: ['Gasolina', 'Diesel', 'Híbrido', 'Elétrico'] },
  Audi: { models: ['A3', 'A4', 'Q3', 'Q5', 'Q7', 'e-tron'], vehicleTypes: ['Sedan', 'SUV', 'Coupe'], fuelTypes: ['Gasolina', 'Diesel', 'Elétrico', 'Híbrido'] },
  Jeep: { models: ['Compass', 'Renegade', 'Wrangler', 'Commander', 'Grand Cherokee'], vehicleTypes: ['SUV', 'Off-road'], fuelTypes: ['Flex', 'Gasolina', 'Diesel', 'Híbrido'] },
  Peugeot: { models: ['208', '2008', '3008', '5008', 'Partner'], vehicleTypes: ['Hatch', 'SUV', 'Minivan'], fuelTypes: ['Flex', 'Gasolina', 'Diesel'] },
  Kia: { models: ['Sportage', 'Seltos', 'Cerato', 'Stonic', 'EV6'], vehicleTypes: ['SUV', 'Sedan', 'Hatch'], fuelTypes: ['Gasolina', 'Diesel', 'Híbrido', 'Elétrico'] },
};

const CAR_BRAND_DATA_EN: Record<string, BrandInfo> = {
  Ford: { models: ['F-150', 'Mustang', 'Explorer', 'Escape', 'Bronco', 'Edge'], vehicleTypes: ['Pickup', 'Coupe', 'SUV'], fuelTypes: ['Regular Gasoline', 'Premium Gasoline', 'Hybrid', 'Electric'] },
  Chevrolet: { models: ['Silverado', 'Equinox', 'Tahoe', 'Malibu', 'Camaro', 'Traverse'], vehicleTypes: ['Pickup', 'SUV', 'Sedan'], fuelTypes: ['Regular Gasoline', 'Diesel', 'Electric'] },
  Toyota: { models: ['Camry', 'Corolla', 'RAV4', 'Tacoma', 'Highlander', 'Tundra'], vehicleTypes: ['Sedan', 'SUV', 'Pickup'], fuelTypes: ['Regular Gasoline', 'Hybrid', 'Electric'] },
  Honda: { models: ['Civic', 'CR-V', 'Accord', 'Pilot', 'HR-V', 'Odyssey'], vehicleTypes: ['Sedan', 'SUV', 'Minivan'], fuelTypes: ['Regular Gasoline', 'Hybrid'] },
  Jeep: { models: ['Wrangler', 'Grand Cherokee', 'Cherokee', 'Compass', 'Gladiator'], vehicleTypes: ['SUV', 'Off-road', 'Pickup'], fuelTypes: ['Regular Gasoline', 'Hybrid', 'Diesel'] },
  Ram: { models: ['Ram 1500', 'Ram 2500', 'Ram 3500', 'ProMaster'], vehicleTypes: ['Pickup', 'Van'], fuelTypes: ['Regular Gasoline', 'Diesel'] },
  GMC: { models: ['Sierra', 'Yukon', 'Acadia', 'Terrain', 'Canyon'], vehicleTypes: ['Pickup', 'SUV'], fuelTypes: ['Regular Gasoline', 'Diesel'] },
  Buick: { models: ['Encore', 'Envision', 'Enclave', 'LaCrosse', 'Regal'], vehicleTypes: ['SUV', 'Sedan'], fuelTypes: ['Regular Gasoline'] },
  Cadillac: { models: ['Escalade', 'XT5', 'XT4', 'CT5', 'Lyriq'], vehicleTypes: ['SUV', 'Sedan'], fuelTypes: ['Premium Gasoline', 'Electric'] },
  Lincoln: { models: ['Navigator', 'Aviator', 'Corsair', 'Nautilus'], vehicleTypes: ['SUV', 'Sedan'], fuelTypes: ['Premium Gasoline'] },
  Chrysler: { models: ['Pacifica', '300', 'Voyager'], vehicleTypes: ['Minivan', 'Sedan'], fuelTypes: ['Regular Gasoline', 'Hybrid'] },
  Dodge: { models: ['Charger', 'Durango', 'Challenger', 'Grand Caravan', 'Hornet'], vehicleTypes: ['Sedan', 'SUV', 'Coupe', 'Minivan'], fuelTypes: ['Regular Gasoline', 'Diesel'] },
  Tesla: { models: ['Model 3', 'Model Y', 'Model S', 'Model X', 'Cybertruck'], vehicleTypes: ['Sedan', 'SUV', 'Pickup'], fuelTypes: ['Electric'] },
  Nissan: { models: ['Altima', 'Rogue', 'Frontier', 'Pathfinder', 'Sentra', 'Murano'], vehicleTypes: ['Sedan', 'SUV', 'Pickup'], fuelTypes: ['Regular Gasoline', 'Hybrid', 'Electric'] },
  Hyundai: { models: ['Elantra', 'Tucson', 'Santa Fe', 'Palisade', 'Sonata', 'Kona'], vehicleTypes: ['Sedan', 'SUV'], fuelTypes: ['Regular Gasoline', 'Hybrid', 'Electric'] },
  Subaru: { models: ['Outback', 'Forester', 'Crosstrek', 'Impreza', 'Legacy'], vehicleTypes: ['SUV', 'Sedan', 'Hatch'], fuelTypes: ['Regular Gasoline', 'Hybrid'] },
  'Mercedes-Benz': { models: ['C-Class', 'E-Class', 'S-Class', 'GLC', 'GLE', 'GLS'], vehicleTypes: ['Sedan', 'SUV', 'Coupe'], fuelTypes: ['Premium Gasoline', 'Diesel', 'Hybrid', 'Electric'] },
  BMW: { models: ['3 Series', '5 Series', 'X3', 'X5', 'M4', 'i4'], vehicleTypes: ['Sedan', 'SUV', 'Coupe'], fuelTypes: ['Premium Gasoline', 'Diesel', 'Hybrid', 'Electric'] },
  Audi: { models: ['A4', 'A6', 'Q5', 'Q7', 'e-tron GT', 'Q4 e-tron'], vehicleTypes: ['Sedan', 'SUV', 'Coupe'], fuelTypes: ['Premium Gasoline', 'Diesel', 'Electric', 'Hybrid'] },
};

const CAR_BRAND_DATA_GB: Record<string, BrandInfo> = {
  Ford: { models: ['Fiesta', 'Focus', 'Puma', 'Kuga', 'Mustang', 'Ranger'], vehicleTypes: ['Hatch', 'SUV', 'Pickup'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  Vauxhall: { models: ['Corsa', 'Mokka', 'Astra', 'Crossland', 'Grandland', 'Mokka-e'], vehicleTypes: ['Hatch', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Electric'] },
  BMW: { models: ['1 Series', '3 Series', '5 Series', 'X1', 'X3', 'X5'], vehicleTypes: ['Hatch', 'Sedan', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  'Mercedes-Benz': { models: ['A-Class', 'C-Class', 'E-Class', 'GLA', 'GLC', 'GLE'], vehicleTypes: ['Hatch', 'Sedan', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  Audi: { models: ['A1', 'A3', 'A4', 'Q2', 'Q3', 'Q5', 'Q7'], vehicleTypes: ['Hatch', 'Sedan', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Electric', 'Hybrid'] },
  Volkswagen: { models: ['Golf', 'Polo', 'T-Roc', 'Tiguan', 'ID.3', 'ID.4'], vehicleTypes: ['Hatch', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Electric'] },
  Toyota: { models: ['Yaris', 'Corolla', 'RAV4', 'C-HR', 'Hilux', 'Aygo X'], vehicleTypes: ['Hatch', 'SUV', 'Pickup'], fuelTypes: ['Petrol', 'Hybrid', 'Electric'] },
  Hyundai: { models: ['i10', 'i20', 'i30', 'Tucson', 'Kona', 'Ioniq 5'], vehicleTypes: ['Hatch', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  Kia: { models: ['Picanto', 'Rio', 'Ceed', 'Sportage', 'Niro', 'EV6'], vehicleTypes: ['Hatch', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  'Land Rover': { models: ['Defender', 'Discovery', 'Range Rover', 'Range Rover Evoque', 'Range Rover Sport'], vehicleTypes: ['SUV', 'Off-road'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid'] },
  Jaguar: { models: ['F-Pace', 'E-Pace', 'I-Pace', 'XF', 'XE'], vehicleTypes: ['SUV', 'Sedan'], fuelTypes: ['Petrol', 'Diesel', 'Electric'] },
  Nissan: { models: ['Juke', 'Qashqai', 'X-Trail', 'Leaf', 'Ariya'], vehicleTypes: ['SUV', 'Hatch'], fuelTypes: ['Petrol', 'Diesel', 'Electric'] },
  Peugeot: { models: ['208', '2008', '3008', '5008', 'Partner'], vehicleTypes: ['Hatch', 'SUV', 'Van'], fuelTypes: ['Petrol', 'Diesel', 'Electric'] },
  Renault: { models: ['Clio', 'Captur', 'Megane', 'Scenic', 'Arkana'], vehicleTypes: ['Hatch', 'SUV'], fuelTypes: ['Petrol', 'Diesel', 'Hybrid', 'Electric'] },
  MG: { models: ['MG3', 'MG4', 'ZS', 'HS', 'MG5'], vehicleTypes: ['Hatch', 'Sedan', 'SUV'], fuelTypes: ['Petrol', 'Electric'] },
};

const CAR_BRAND_DATA_FR: Record<string, BrandInfo> = {
  Renault: { models: ['Clio', 'Captur', 'Mégane', 'Scénic', 'Austral', 'Arkana', 'Austral'], vehicleTypes: ['Berline', 'SUV'], fuelTypes: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
  Peugeot: { models: ['208', '2008', '3008', '5008', '408', 'Partner', 'Rifter'], vehicleTypes: ['Citadine', 'SUV', 'Utilitaire'], fuelTypes: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
  Citroën: { models: ['C3', 'C4', 'C5 Aircross', 'ë-C4', 'Berlingo', 'Ami'], vehicleTypes: ['Citadine', 'SUV', 'Utilitaire'], fuelTypes: ['Essence', 'Diesel', 'Électrique'] },
  DS: { models: ['DS 3', 'DS 4', 'DS 7', 'DS 9'], vehicleTypes: ['Citadine', 'SUV', 'Berline'], fuelTypes: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
  Alpine: { models: ['A110', 'A290'], vehicleTypes: ['Sportive', 'Citadine'], fuelTypes: ['Essence', 'Électrique'] },
  BMW: { models: ['Série 1', 'Série 3', 'Série 5', 'X1', 'X3', 'X5'], vehicleTypes: ['Berline', 'SUV'], fuelTypes: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
  'Mercedes-Benz': { models: ['Classe A', 'Classe C', 'Classe E', 'GLA', 'GLC', 'GLE'], vehicleTypes: ['Berline', 'SUV'], fuelTypes: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
  Audi: { models: ['A1', 'A3', 'A4', 'Q2', 'Q3', 'Q5'], vehicleTypes: ['Berline', 'SUV'], fuelTypes: ['Essence', 'Diesel', 'Hybride', 'Électrique'] },
  Volkswagen: { models: ['Golf', 'Polo', 'T-Roc', 'Tiguan', 'ID.3', 'ID.4'], vehicleTypes: ['Berline', 'SUV'], fuelTypes: ['Essence', 'Diesel', 'Électrique'] },
  Toyota: { models: ['Yaris', 'Corolla', 'RAV4', 'C-HR', 'Aygo X'], vehicleTypes: ['Citadine', 'SUV'], fuelTypes: ['Essence', 'Hybride', 'Électrique'] },
};

const CAR_BRAND_DATA_MAP: Record<string, Record<string, BrandInfo>> = {
  pt: CAR_BRAND_DATA_PT,
  en: CAR_BRAND_DATA_EN,
  'en-GB': CAR_BRAND_DATA_GB,
  'fr-FR': CAR_BRAND_DATA_FR,
};

export function getCarBrandData(locale: string): Record<string, BrandInfo> {
  return CAR_BRAND_DATA_MAP[locale] ?? CAR_BRAND_DATA_EN;
}
