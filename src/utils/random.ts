/** Retorna um número inteiro aleatório entre min (inclusivo) e max (inclusivo) */
export const randomInt = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

/** Retorna um elemento aleatório de um array */
export const randomPick = <T>(arr: T[]): T =>
  arr[Math.floor(Math.random() * arr.length)];

/** Retorna um booleano aleatório */
export const randomBool = () =>
  Math.random() >= 0.5;

// ─── Mulberry32 PRNG (seeded) ────────────────────────────────

function mulberry32(seed: number) {
  let t = seed | 0;
  return () => {
    t = (t + 0x6D2B79F5) | 0;
    let x = Math.imul(t ^ (t >>> 15), 1 | t);
    x = (x + Math.imul(x ^ (x >>> 7), 61 | x)) ^ x;
    return ((x ^ (x >>> 14)) >>> 0) / 4294967296;
  };
}

export interface SeededRandom {
  random: () => number;
  int: (min: number, max: number) => number;
  pick: <T>(arr: T[]) => T;
  bool: () => boolean;
  date: (start?: Date, end?: Date) => Date;
}

export function createSeededRandom(seed: number): SeededRandom {
  const rng = mulberry32(seed);
  return {
    random: rng,
    int: (min: number, max: number) => Math.floor(rng() * (max - min + 1)) + min,
    pick: <T>(arr: T[]): T => arr[Math.floor(rng() * arr.length)],
    bool: () => rng() >= 0.5,
    date: (start = new Date(1950, 0, 1), end = new Date()) =>
      new Date(start.getTime() + rng() * (end.getTime() - start.getTime())),
  };
}

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

/** Gera um NINO válido (formato: XX999999X) */
export function generateNINO(): string {
  const validPrefixes = [
    'AB','CE','EH','HB','HC','HD','HE','HF','HJ','HM','HN','HP','HR','HS','HU','HX','HY',
    'JA','JB','JC','JD','JE','JF','JG','JH','JJ','JK','JL','JM','JN','JP','JR','JS','JT','JU','JV','JW','JX','JY','JZ',
    'LA','LB','LC','LD','LE','LF','LG','LH','LJ','LL','LN','LP','LR','LS','LT','LU','LW','LX','LY','LZ',
    'MA','MB','MC','MD','ME','MF','MG','MH','MJ','MK','ML','MM','MN','MO','MP','MR','MS','MT','MU','MW','MX','MY','MZ',
    'NA','NB','NC','ND','NE','NF','NG','NH','NJ','NL','NM','NN','NP','NR','NS','NT','NU','NW','NX','NY','NZ',
    'OA','OB','OC','OD','OE','OF','OG','OH','OI','OJ','OK','OL','OM','ON','OP','OR','OS','OT','OU','OW','OX','OY','OZ',
    'PA','PB','PC','PD','PE','PF','PG','PH','PI','PJ','PK','PL','PM','PN','PO','PP','PR','PS','PT','PU','PW','PX','PY','PZ',
    'RA','RB','RC','RD','RE','RF','RG','RH','RI','RJ','RK','RL','RM','RN','RO','RP','RR','RS','RT','RU','RW','RX','RY','RZ',
    'SA','SB','SC','SD','SE','SF','SG','SH','SI','SJ','SK','SL','SM','SN','SO','SP','SR','SS','ST','SU','SW','SX','SY','SZ',
    'TA','TB','TC','TD','TE','TF','TG','TH','TI','TJ','TK','TL','TM','TN','TO','TP','TR','TS','TT','TU','TW','TX','TY','TZ',
    'WA','WB','WC','WD','WE','WF','WG','WH','WJ','WK','WL','WM','WN','WP','WR','WS','WT','WU','WW','WX','WY','WZ',
    'YA','YB','YC','YD','YE','YF','YG','YH','YJ','YK','YL','YM','YN','YP','YR','YS','YT','YU','YW','YX','YY','YZ',
  ];
  const suffixes = ['A','B','C','D','F'];
  const prefix = validPrefixes[randomInt(0, validPrefixes.length - 1)];
  const digits = Array.from({ length: 6 }, () => randomInt(0, 9)).join('');
  const suffix = suffixes[randomInt(0, suffixes.length - 1)];
  return `${prefix}${digits}${suffix}`;
}
