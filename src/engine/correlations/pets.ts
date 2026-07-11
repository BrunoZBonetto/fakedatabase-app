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

const DOG_BREED_NAMES_FR: Record<string, string[]> = {
  'Labrador Retriever': ['Rex','Max','Buddy','Luna','Bella','Rocky','Daisy','Charlie','Tucker','Sadie'],
  'Golden Retriever': ['Luna','Max','Bella','Rex','Nala','Charlie','Duke','Daisy','Tucker','Simba'],
  'Bouledogue français': ['Pierre','Louis','Hugo','Camille','Léa','Chocolat','Noisette','Rex','Biscuit','Truffe'],
  'Caniche': ['Coco','Bella','Luna','Lucy','Daisy','Chloé','Max','Sophie'],
  'Berger allemand': ['Max','Rex','Duke','Rex','Zeus','Thor','Bruno','Apollo','Titan'],
  'Shih Tzu': ['Luna','Bella','Léa','Manon','Princesa','Lola','Mia','Chloé'],
  'Beagle': ['Rex','Hugo','Louis','Oscar','Daisy','Lucie','Max','Biscuit'],
  'Rottweiler': ['Max','Rex','Zeus','Bruno','Apollo','Thor','Titan','Rocky'],
  'Husky': ['Loki','Thor','Zeus','Koda','Nala','Maya','Ghost','Duke'],
  'Teckel': ['Max','Bella','Oscar','Truffe','Noisette','Chocolat','Luna','Rex'],
  'Bâtard': ['Rex','Bella','Luna','Daisy','Charlie','Loulou','Tango','Simba','Chocolat','Milou'],
};

const CAT_BREED_NAMES_FR: Record<string, string[]> = {
  'Persan': ['Luna','Nala','Bella','Simba','Chloé','Noisette','Minou','Mia'],
  'Siamois': ['Luna','Oscar','Simba','Maya','Lola','Lucie','Nala','Rex'],
  'Maine Coon': ['Simba','Thor','Louis','Luna','Nala','Milo','Oliver','Hugo'],
  'Sphynx': ['Thor','Hugo','Simba','Luna','Yoda','Gizmo','Loki','Rex'],
  'Bengal': ['Simba','Thor','Luna','Nala','Zoe','Loki','Apollo','Mia'],
  'Ragdoll': ['Luna','Milo','Oscar','Bella','Nala','Noisette','Chloé','Oliver'],
  'Européen': ['Félix','Minou','Truffe','Noisette','Chocolat','Simba','Luna','Rex'],
};

export function getDogBreedNames(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) {
    return DOG_BREED_NAMES_PT;
  }
  if (locale === 'fr-FR') {
    return DOG_BREED_NAMES_FR;
  }
  return DOG_BREED_NAMES_EN;
}

export function getCatBreedNames(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) {
    return CAT_BREED_NAMES_PT;
  }
  if (locale === 'fr-FR') {
    return CAT_BREED_NAMES_FR;
  }
  return CAT_BREED_NAMES_EN;
}
