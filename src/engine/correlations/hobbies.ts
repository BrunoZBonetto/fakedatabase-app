const HOBBY_EQUIPMENT_PT: Record<string, string[]> = {
  'Fotografia': ['Câmera Digital', 'Lente', 'Tripé', 'Drone', 'Flash', 'Cartão de Memória', 'Editor de Vídeo'],
  'Caminhada': ['Tênis', 'Garrafa de Água', 'Mochila', 'Roupa Térmica', 'Capacete', 'Luvas', 'Bastão de Caminhada'],
  'Corrida': ['Tênis de Corrida', 'Relógio GPS', 'Roupa Esportiva', 'Garrafa de Água', 'Fone de Ouvido', 'Faixa de Cabeça'],
  'Ioga': ['Tapete', 'Roupa Confortável', 'Bloco', 'Faixa Elástica', 'Bola', 'Garrafa de Água'],
  'Trilho': ['Botas', 'Mochila', 'Garrafa de Água', 'Lanterna', 'Capacete', 'Luvas', 'Corda'],
  'Acampamento': ['Barraca', 'Saco de Dormir', 'Lanterna', 'Fogareiro', 'Mochila', 'Corda', 'Isqueiro'],
  'Natação': ['Maiô', 'Touca', 'Óculos', 'Prancha', 'Palmar', 'Tubo de Snorkel'],
  'Artes Marciais': ['Kimono', 'Luva', 'Protetor', 'Capacete', 'Espaguete', 'Barefoot'],
};

const HOBBY_EQUIPMENT_EN: Record<string, string[]> = {
  'Photography': ['Camera', 'Lens', 'Tripod', 'Drone', 'Flash', 'SD Card', 'Editing Software'],
  'Hiking': ['Boots', 'Backpack', 'Water Bottle', 'Rain Jacket', 'Hat', 'Trekking Poles', 'First Aid Kit'],
  'Running': ['Running Shoes', 'GPS Watch', 'Running Shorts', 'Water Bottle', 'Headphones', 'Moisture-Wicking Socks'],
  'Yoga': ['Mat', 'Yoga Pants', 'Block', 'Strap', 'Bolster', 'Water Bottle', 'Towel'],
  'Camping': ['Tent', 'Sleeping Bag', 'Lantern', 'Camp Stove', 'Backpack', 'Rope', 'Matches'],
  'Swimming': ['Swimsuit', 'Goggles', 'Swim Cap', 'Fins', 'Kickboard', 'Snorkel', 'Towel'],
  'Martial Arts': ['Gi', 'Gloves', 'Shin Guards', 'Headgear', 'Mouth Guard', 'Training Dummy', 'Pads'],
  'Surfing': ['Surfboard', 'Wetsuit', 'Leash', 'Wax', 'Rash Guard', 'Booties', 'Fin Key'],
  'Cycling': ['Helmet', 'Bike Shorts', 'Gloves', 'Pump', 'Lights', 'Water Bottle', 'Multi-Tool'],
  'Gardening': ['Gloves', 'Shovel', 'Rake', 'Pruners', 'Watering Can', 'Potting Soil', 'Wheelbarrow'],
};

const HOBBY_EQUIPMENT_FR: Record<string, string[]> = {
  'Photographie': ['Appareil photo', 'Objectif', 'Trépied', 'Drone', 'Flash', 'Carte mémoire', 'Logiciel de retouche'],
  'Randonnée': ['Chaussures de rando', 'Sac à dos', 'Gourde', 'Veste de pluie', 'Chapeau', 'Bâtons de marche', 'Trousse de secours'],
  'Course à pied': ['Chaussures de course', 'Montre GPS', 'Short de course', 'Gourde', 'Écouteurs', 'Chaussettes techniques'],
  'Yoga': ['Tapis', 'Vêtements de yoga', 'Bloc', 'Sangle', 'Bolster', 'Gourde', 'Serviette'],
  'Camping': ['Tente', 'Sac de couchage', 'Lampe', 'Réchaud', 'Sac à dos', 'Corde', 'Allumettes'],
  'Escalade': ['Chaussures d\'escalace', 'Casque', 'Corde', 'Mousqueton', 'Chaussures', 'Sac à dos', 'Magnésie'],
  'Cyclisme': ['Casque', 'Short cycliste', 'Gants', 'Pompe', 'Éclairage', 'Gourde', 'Multi-outil'],
  'Jardinage': ['Gants', 'Pelle', 'Râteau', 'Sécateur', 'Arrosoir', 'Terreau', 'Brouette'],
};

export function getHobbyEquipmentMap(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) return HOBBY_EQUIPMENT_PT;
  if (locale === 'fr-FR') return HOBBY_EQUIPMENT_FR;
  return HOBBY_EQUIPMENT_EN;
}
