/**
 * Templates prontos para geração rápida de dados (localized labels via i18n)
 */
export interface TemplatePreset {
  fields: string[];
  primaryKey: string;
  foreignKeyPatterns?: string[];
}

export const PRESETS: Record<string, TemplatePreset> = {
  pessoaFisica: {
    fields: ['id', 'fullName', 'cpf', 'birthDate', 'email', 'phone', 'fullAddress', 'profession'],
    primaryKey: 'id',
    foreignKeyPatterns: ['pessoa_id', 'cliente_id', 'pessoaFisica_id'],
  },
  empresa: {
    fields: ['id', 'company', 'cnpj', 'sector', 'phone', 'email', 'fullAddress', 'website'],
    primaryKey: 'id',
    foreignKeyPatterns: ['empresa_id', 'company_id'],
  },
  pedido: {
    fields: ['id', 'uuid', 'fullName', 'email', 'product', 'quantity', 'price', 'amount', 'paymentMethod', 'status', 'date'],
    primaryKey: 'id',
    foreignKeyPatterns: ['pessoa_id', 'cliente_id', 'pedido_id'],
  },
  funcionario: {
    fields: ['id', 'fullName', 'cpf', 'email', 'phone', 'company', 'position', 'area', 'seniority', 'salary', 'education'],
    primaryKey: 'id',
    foreignKeyPatterns: ['funcionario_id', 'empresa_id'],
  },
  produto: {
    fields: ['id', 'uuid', 'product', 'productCategory', 'price', 'quantity', 'rating', 'status', 'sentence'],
    primaryKey: 'id',
    foreignKeyPatterns: ['produto_id', 'categoria_id'],
  },
  cliente: {
    fields: ['id', 'fullName', 'cpf', 'birthDate', 'email', 'phone', 'gender', 'fullAddress', 'maritalStatus', 'profession'],
    primaryKey: 'id',
    foreignKeyPatterns: ['cliente_id', 'pessoa_id'],
  },
  contaBancaria: {
    fields: ['id', 'fullName', 'cpf', 'bank', 'bankCode', 'currency', 'paymentMethod', 'status', 'date'],
    primaryKey: 'id',
    foreignKeyPatterns: ['conta_id', 'cliente_id'],
  },
  logistica: {
    fields: ['id', 'uuid', 'fullName', 'fullAddress', 'city', 'state', 'zipCode', 'phone', 'product', 'quantity', 'shippingMethod', 'trackingCode', 'status', 'date'],
    primaryKey: 'id',
    foreignKeyPatterns: ['pedido_id', 'logistica_id'],
  },
  paciente: {
    fields: ['id', 'fullName', 'birthDate', 'gender', 'bloodType', 'height', 'weight', 'bloodPressure', 'heartRate', 'allergy', 'disease', 'medication', 'phone', 'fullAddress'],
    primaryKey: 'id',
    foreignKeyPatterns: ['paciente_id', 'cliente_id'],
  },
  estudante: {
    fields: ['id', 'fullName', 'birthDate', 'email', 'phone', 'fullAddress', 'university', 'course', 'degreeType', 'grade', 'year'],
    primaryKey: 'id',
    foreignKeyPatterns: ['estudante_id', 'aluno_id'],
  },
  ecommerce: {
    fields: ['id', 'uuid', 'fullName', 'email', 'phone', 'fullAddress', 'product', 'productCategory', 'sku', 'quantity', 'price', 'discount', 'tax', 'amount', 'paymentMethod', 'creditCardFlag', 'orderStatus', 'date', 'trackingCode'],
    primaryKey: 'id',
    foreignKeyPatterns: ['cliente_id', 'pedido_id', 'produto_id'],
  },
  usuarioSaaS: {
    fields: ['id', 'uuid', 'fullName', 'email', 'phone', 'company', 'position', 'browser', 'operatingSystem', 'ipAddress', 'hostname', 'language', 'timezone', 'status'],
    primaryKey: 'id',
    foreignKeyPatterns: ['usuario_id', 'cliente_id'],
  },
  leads: {
    fields: ['id', 'fullName', 'email', 'phone', 'company', 'position', 'website', 'linkedin', 'city', 'state', 'sector', 'date'],
    primaryKey: 'id',
    foreignKeyPatterns: ['lead_id', 'empresa_id'],
  },
  veiculo: {
    fields: ['id', 'uuid', 'carBrand', 'carModel', 'carYear', 'fuelType', 'vehicleType', 'licensePlate', 'renavam', 'chassi', 'color', 'price'],
    primaryKey: 'id',
    foreignKeyPatterns: ['veiculo_id', 'cliente_id'],
  },
  usuarioStreaming: {
    fields: ['id', 'nickname', 'email', 'streamingPlatform', 'movie', 'movieGenre', 'series', 'musicGenre', 'game', 'gameGenre', 'hobby', 'language', 'age'],
    primaryKey: 'id',
    foreignKeyPatterns: ['usuario_id', 'cliente_id'],
  }
};
