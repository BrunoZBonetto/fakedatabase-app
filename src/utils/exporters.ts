/**
 * Exportadores para formatos adicionais
 */
import * as XLSX from 'xlsx';

const FIELD_TO_SQL = {
  id:             { type: 'INT', size: 10 },
  uuid:           { type: 'UUID' },
  cpf:            { type: 'VARCHAR', size: 14 },
  cnpj:           { type: 'VARCHAR', size: 18 },
  rg:             { type: 'VARCHAR', size: 20 },
  firstName:      { type: 'VARCHAR', size: 64 },
  firstNameMale:  { type: 'VARCHAR', size: 64 },
  firstNameFemale:{ type: 'VARCHAR', size: 64 },
  lastName:       { type: 'VARCHAR', size: 64 },
  fullName:       { type: 'VARCHAR', size: 128 },
  nickname:       { type: 'VARCHAR', size: 64 },
  email:          { type: 'VARCHAR', size: 256 },
  phone:          { type: 'VARCHAR', size: 20 },
  phoneFixo:      { type: 'VARCHAR', size: 20 },
  website:        { type: 'VARCHAR', size: 256 },
  linkedin:       { type: 'VARCHAR', size: 256 },
  street:         { type: 'VARCHAR', size: 128 },
  neighborhood:   { type: 'VARCHAR', size: 64 },
  city:           { type: 'VARCHAR', size: 64 },
  state:          { type: 'VARCHAR', size: 2 },
  stateFull:      { type: 'VARCHAR', size: 32 },
  zipCode:        { type: 'VARCHAR', size: 9 },
  country:        { type: 'VARCHAR', size: 32 },
  fullAddress:    { type: 'VARCHAR', size: 256 },
  company:        { type: 'VARCHAR', size: 128 },
  sector:         { type: 'VARCHAR', size: 64 },
  position:       { type: 'VARCHAR', size: 64 },
  area:           { type: 'VARCHAR', size: 64 },
  profession:     { type: 'VARCHAR', size: 64 },
  education:      { type: 'VARCHAR', size: 64 },
  seniority:      { type: 'VARCHAR', size: 32 },
  salary:         { type: 'DECIMAL', size: 10 },
  bank:           { type: 'VARCHAR', size: 64 },
  bankCode:       { type: 'VARCHAR', size: 10 },
  currency:       { type: 'VARCHAR', size: 10 },
  paymentMethod:  { type: 'VARCHAR', size: 32 },
  status:         { type: 'VARCHAR', size: 32 },
  amount:         { type: 'DECIMAL', size: 10 },
  price:          { type: 'DECIMAL', size: 10 },
  date:           { type: 'DATE' },
  dateUS:         { type: 'DATE' },
  dateTime:       { type: 'DATETIME' },
  birthDate:      { type: 'DATE' },
  year:           { type: 'INT', size: 4 },
  age:            { type: 'INT', size: 3 },
  quantity:       { type: 'INT', size: 10 },
  percentage:     { type: 'INT', size: 3 },
  rating:         { type: 'DECIMAL', size: 3 },
  product:        { type: 'VARCHAR', size: 128 },
  productCategory:{ type: 'VARCHAR', size: 64 },
  sku:            { type: 'VARCHAR', size: 32 },
  barcode:        { type: 'VARCHAR', size: 20 },
  boolean:        { type: 'BOOLEAN' },
  lorem:          { type: 'TEXT' },
  sentence:       { type: 'VARCHAR', size: 512 },
};

export function toXLSX(data, fields) {
  const worksheet = XLSX.utils.json_to_sheet(data, { header: fields });
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Dados');
  return XLSX.write(workbook, { type: 'array', bookType: 'xlsx' });
}

function columnDef(col, schema) {
  const s = schema[col] || FIELD_TO_SQL[col];
  if (!s) return '"' + col + '" VARCHAR(255)';
  const type = s.type;
  const size = s.size;
  if (type === 'TEXT' || type === 'BOOLEAN' || type === 'DATE' || type === 'DATETIME' || type === 'UUID') {
    return '"' + col + '" ' + type;
  }
  if (type === 'DECIMAL') {
    return '"' + col + '" DECIMAL(' + (size ?? 10) + ', 2)';
  }
  if (size != null) {
    return '"' + col + '" ' + type + '(' + size + ')';
  }
  return '"' + col + '" ' + type;
}

export const toSQL = (data, schema = {}, tableName = 'dados_gerados') => {
  if (!data.length) return '';
  const columns = Object.keys(data[0]);
  const quote = (name) => '"' + name + '"';
  const q = quote(tableName);
  const cols = columns.map(quote).join(', ');
  const colDefs = columns.map((col) => '  ' + columnDef(col, schema)).join(',\n');
  const create = 'CREATE TABLE ' + q + ' (\n' + colDefs + '\n);\n';
  const rows = data.map((row) => {
    const values = columns.map((col) => {
      const v = row[col];
      if (v === null || v === undefined) return 'NULL';
      if (typeof v === 'number') return v;
      if (typeof v === 'boolean') return v ? 'TRUE' : 'FALSE';
      return "'" + String(v).replace(/'/g, "''") + "'";
    });
    return '  (' + values.join(', ') + ')';
  });
  const insert = 'INSERT INTO ' + q + ' (' + cols + ') VALUES\n' + rows.join(',\n') + ';';
  return create + '\n' + insert;
};

export const toXML = (data, rootName = 'registros', itemName = 'registro') => {
  if (!data.length) return '<?xml version="1.0" encoding="UTF-8"?>\n<' + rootName + '/>';
  const escape = (v) =>
    String(v)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  const items = data.map((row) => {
    const inner = Object.entries(row)
      .map(([k, v]) => '    <' + k + '>' + escape(v ?? '') + '</' + k + '>')
      .join('\n');
    return '  <' + itemName + '>\n' + inner + '\n  </' + itemName + '>';
  });
  return '<?xml version="1.0" encoding="UTF-8"?>\n<' + rootName + '>\n' + items.join('\n') + '\n</' + rootName + '>';
};

export const toYAML = (data: Record<string, unknown>[]): string => {
  if (!data.length) return '';
  const yamlValue = (v: unknown, _indent: number): string => {
    if (v === null || v === undefined) return 'null';
    if (typeof v === 'number' || typeof v === 'boolean') return String(v);
    const s = String(v);
    if (/[:{}[\]&*!|>'"%@`\n]/.test(s) || s === '' || s === 'null' || s === 'true' || s === 'false') {
      return "'" + s.replace(/'/g, "''") + "'";
    }
    return s;
  };
  return data.map(row => {
    const lines = Object.entries(row).map(([k, v]) => `  ${k}: ${yamlValue(v, 0)}`);
    return '  - registro:\n' + lines.join('\n');
  }).join('\n');
};
