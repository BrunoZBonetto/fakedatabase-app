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
  'Italian': ['Olive Garden','Paolo\'s','Buca di Beppo','Carmine\'s','Maggiano\'s','Carrabba\'s'],
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

export function getCuisineRestaurantMap(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) return CUISINE_RESTAURANT_PT;
  return CUISINE_RESTAURANT_EN;
}

export function getDietFoodMap(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) return DIET_FOOD_MAP_PT;
  return DIET_FOOD_MAP_EN;
}
