/** Retorna um número inteiro aleatório entre min (inclusivo) e max (inclusivo) */
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Retorna um elemento aleatório de um array */
export const randomPick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/** Retorna um booleano aleatório */
export const randomBool = () =>
  Math.random() >= 0.5;

/** Gera um CPF válido (formato: XXX.XXX.XXX-XX) */
export const generateCPF = () => {
  const n = Array.from({ length: 9 }, () => randomInt(0, 9));
  const calc = (digits: number[]) => {
    const sum = digits.reduce((acc, d, i) => acc + d * (digits.length + 1 - i), 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  n.push(calc(n));
  n.push(calc(n));
  const s = n.join('');
  return `${s.slice(0,3)}.${s.slice(3,6)}.${s.slice(6,9)}-${s.slice(9)}`;
};

/** Gera um CNPJ válido (formato: XX.XXX.XXX/XXXX-XX) */
export const generateCNPJ = () => {
  const n = Array.from({ length: 8 }, () => randomInt(0, 9));
  n.push(0, 0, 0, 1);
  const calc = (digits: number[], weights: number[]) => {
    const sum = digits.reduce((acc, d, i) => acc + d * weights[i], 0);
    const rest = sum % 11;
    return rest < 2 ? 0 : 11 - rest;
  };
  const w1 = [5,4,3,2,9,8,7,6,5,4,3,2];
  const w2 = [6,5,4,3,2,9,8,7,6,5,4,3,2];
  n.push(calc(n, w1));
  n.push(calc(n, w2));
  const s = n.join('');
  return `${s.slice(0,2)}.${s.slice(2,5)}.${s.slice(5,8)}/${s.slice(8,12)}-${s.slice(12)}`;
};

/** Gera um SSN americano válido (formato: XXX-XX-XXXX) */
export const generateSSN = () => {
  const area = randomInt(100, 899);
  const group = randomInt(10, 99);
  const serial = randomInt(1000, 9999);
  return `${area}-${group}-${serial}`;
};

/** Gera um EIN americano válido (formato: XX-XXXXXXX) */
export const generateEIN = () => {
  const prefix = randomInt(10, 99);
  const suffix = randomInt(1000000, 9999999);
  return `${prefix}-${suffix}`;
};

/** Gera uma data aleatória entre duas datas */
export const randomDate = (start = new Date(1950, 0, 1), end = new Date()) =>
  new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));

/** Embaralha um array (Fisher-Yates) */
export const shuffle = <T>(arr: T[]): T[] => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};
