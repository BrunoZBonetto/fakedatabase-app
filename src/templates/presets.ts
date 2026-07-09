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
  }
};
