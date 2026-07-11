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

export function getClothingTypeSizes(locale: string): Record<string, string[]> {
  if (locale.startsWith('pt')) return CLOTHING_TYPE_SIZES_PT;
  return CLOTHING_TYPE_SIZES_EN;
}
