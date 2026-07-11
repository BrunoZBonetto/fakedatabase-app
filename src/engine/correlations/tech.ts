const OS_BROWSER_MAP_PT: Record<string, string[]> = {
  'Windows': ['Chrome','Firefox','Edge','Opera','Brave'],
  'macOS': ['Safari','Chrome','Firefox','Opera','Brave'],
  'Linux': ['Firefox','Chrome','Brave','Opera'],
  'Android': ['Chrome','Firefox','Brave','Opera','Edge'],
  'iOS': ['Safari','Chrome','Firefox','Brave'],
  'Ubuntu': ['Firefox','Chrome','Brave','Opera'],
  'ChromeOS': ['Chrome','Firefox'],
};

const OS_BROWSER_MAP_EN = OS_BROWSER_MAP_PT;

const OS_PHONE_MAP_PT: Record<string, string[]> = {
  'Android': ['Samsung','Motorola','Xiaomi','LG','Asus','Sony','Huawei','OnePlus'],
  'iOS': ['Apple'],
};

const OS_PHONE_MAP_EN: Record<string, string[]> = {
  'Android': ['Samsung','Google','Motorola','OnePlus','LG','Sony','TCL'],
  'iOS': ['Apple'],
};

const OS_BROWSER_MAP_FR: Record<string, string[]> = {
  'Windows': ['Chrome','Firefox','Edge','Opera','Brave'],
  'macOS': ['Safari','Chrome','Firefox','Opera','Brave'],
  'Linux': ['Firefox','Chrome','Brave','Opera'],
  'Android': ['Chrome','Firefox','Brave','Opera','Edge'],
  'iOS': ['Safari','Chrome','Firefox','Brave'],
  'Ubuntu': ['Firefox','Chrome','Brave','Opera'],
  'ChromeOS': ['Chrome','Firefox'],
};

const OS_PHONE_MAP_FR: Record<string, string[]> = {
  'Android': ['Samsung','Google','Motorola','OnePlus','Xiaomi','Honor','Nokia'],
  'iOS': ['Apple'],
};

export function getOSBrowserMap(locale: string): Record<string, string[]> {
  if (locale === 'pt-BR') {
    return OS_BROWSER_MAP_PT;
  }
  if (locale === 'fr-FR') {
    return OS_BROWSER_MAP_FR;
  }
  return OS_BROWSER_MAP_EN;
}

export function getOSPhoneMap(locale: string): Record<string, string[]> {
  if (locale === 'pt-BR') {
    return OS_PHONE_MAP_PT;
  }
  if (locale === 'fr-FR') {
    return OS_PHONE_MAP_FR;
  }
  return OS_PHONE_MAP_EN;
}
