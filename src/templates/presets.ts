/**
 * Templates prontos para geração rápida de dados (localized labels via i18n)
 */
export const PRESETS = {
  pessoaFisica: {
    fields: ['id', 'fullName', 'cpf', 'birthDate', 'email', 'phone', 'fullAddress', 'profession']
  },
  empresa: {
    fields: ['id', 'company', 'cnpj', 'sector', 'phone', 'email', 'fullAddress', 'website']
  },
  pedido: {
    fields: ['id', 'uuid', 'fullName', 'email', 'product', 'quantity', 'price', 'amount', 'paymentMethod', 'status', 'date']
  },
  funcionario: {
    fields: ['id', 'fullName', 'cpf', 'email', 'phone', 'company', 'position', 'area', 'seniority', 'salary', 'education']
  },
  produto: {
    fields: ['id', 'uuid', 'product', 'price', 'quantity', 'rating', 'status', 'sentence']
  },
  cliente: {
    fields: ['id', 'fullName', 'cpf', 'birthDate', 'email', 'phone', 'gender', 'fullAddress', 'maritalStatus', 'profession']
  },
  contaBancaria: {
    fields: ['id', 'fullName', 'cpf', 'bank', 'bankCode', 'currency', 'paymentMethod', 'status', 'date']
  },
  logistica: {
    fields: ['id', 'uuid', 'fullName', 'fullAddress', 'city', 'state', 'zipCode', 'phone', 'product', 'quantity', 'shippingMethod', 'trackingCode', 'status', 'date']
  },
  paciente: {
    fields: ['id', 'fullName', 'birthDate', 'gender', 'bloodType', 'height', 'weight', 'bloodPressure', 'heartRate', 'allergy', 'disease', 'medication', 'phone', 'fullAddress']
  },
  estudante: {
    fields: ['id', 'fullName', 'birthDate', 'email', 'phone', 'fullAddress', 'university', 'course', 'degreeType', 'grade', 'year']
  },
  ecommerce: {
    fields: ['id', 'uuid', 'fullName', 'email', 'phone', 'fullAddress', 'product', 'productCategory', 'sku', 'quantity', 'price', 'discount', 'tax', 'amount', 'paymentMethod', 'creditCardFlag', 'orderStatus', 'date', 'trackingCode']
  },
  usuarioSaaS: {
    fields: ['id', 'uuid', 'fullName', 'email', 'phone', 'company', 'position', 'browser', 'operatingSystem', 'ipAddress', 'hostname', 'language', 'timezone', 'status']
  },
  leads: {
    fields: ['id', 'fullName', 'email', 'phone', 'company', 'position', 'website', 'linkedin', 'city', 'state', 'sector', 'date']
  },
  veiculo: {
    fields: ['id', 'uuid', 'carBrand', 'carModel', 'carYear', 'fuelType', 'vehicleType', 'licensePlate', 'renavam', 'chassi', 'color', 'price']
  },
  usuarioStreaming: {
    fields: ['id', 'nickname', 'email', 'streamingPlatform', 'movie', 'movieGenre', 'series', 'musicGenre', 'game', 'gameGenre', 'hobby', 'language', 'age']
  }
};
