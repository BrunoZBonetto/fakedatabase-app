export type CardBinInfo = { prefixes: string[]; length: number };

const CREDIT_CARD_BINS: Record<string, CardBinInfo> = {
  'Visa': { prefixes: ['4'], length: 16 },
  'Mastercard': { prefixes: ['51','52','53','54','55'], length: 16 },
  'American Express': { prefixes: ['34','37'], length: 15 },
  'Discover': { prefixes: ['6011','644','645','646','647','648','649','65'], length: 16 },
  'Diners Club': { prefixes: ['300','301','302','303','304','305','36','38'], length: 16 },
  'Elo': { prefixes: ['636368','438935','504175','451416','636297','5067','509','6500','6501','6502'], length: 16 },
  'Hipercard': { prefixes: ['6062','3841'], length: 16 },
  'UnionPay': { prefixes: ['62'], length: 16 },
};

const CREDIT_CARD_BINS_EN: Record<string, CardBinInfo> = {
  'Visa': { prefixes: ['4'], length: 16 },
  'Mastercard': { prefixes: ['51','52','53','54','55','2221','2222','2223','2224','2225','2226','2227','2228','2229','223','224','225','226','227','228','229','23','24','25','26','27','2720'], length: 16 },
  'American Express': { prefixes: ['34','37'], length: 15 },
  'Discover': { prefixes: ['6011','644','645','646','647','648','649','65'], length: 16 },
  'Diners Club': { prefixes: ['300','301','302','303','304','305','36','38'], length: 16 },
  'UnionPay': { prefixes: ['62'], length: 16 },
};

const CREDIT_CARD_BINS_GB: Record<string, CardBinInfo> = {
  'Visa': { prefixes: ['4'], length: 16 },
  'Mastercard': { prefixes: ['51','52','53','54','55','2221','2222','2223','2224','2225','2226','2227','2228','2229','223','224','225','226','227','228','229','23','24','25','26','27','2720'], length: 16 },
  'American Express': { prefixes: ['34','37'], length: 15 },
  'Diners Club': { prefixes: ['300','301','302','303','304','305','36','38'], length: 16 },
  'Maestro': { prefixes: ['5018','5020','5038','5893','6304','6759','6761','6762','6763'], length: 16 },
};

const BIN_MAP: Record<string, Record<string, CardBinInfo>> = {
  'pt': CREDIT_CARD_BINS,
  'en': CREDIT_CARD_BINS_EN,
  'en-GB': CREDIT_CARD_BINS_GB,
};

export function getCreditCardBins(locale: string): Record<string, CardBinInfo> {
  return BIN_MAP[locale] ?? CREDIT_CARD_BINS_EN;
}
