const STORAGE_KEY = 'fdg_sponsor_key';

// ===== Chaves de sponsor =====
// Adicione manualmente as chaves aqui antes do build e compartilhe com cada
// sponsor após o patrocínio. O array vazio = sem chaves válidas em produção
// até que você adicione uma.
// Exemplo: export const SPONSOR_KEYS = ['abc-123'];
export const SPONSOR_KEYS: string[] = [];

let inMemoryKey: string | null = null;

function persistKey(key: string | null): void {
  inMemoryKey = key;
  try {
    if (key === null) {
      localStorage.removeItem(STORAGE_KEY);
    } else {
      localStorage.setItem(STORAGE_KEY, key);
    }
  } catch {
    // localStorage indisponível (ex.: navegação anônima) — mantém apenas em memória
  }
}

export function getSponsorKey(): string | null {
  if (inMemoryKey !== null) return inMemoryKey;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored !== null) inMemoryKey = stored;
    return stored;
  } catch {
    return inMemoryKey;
  }
}

export function setSponsorKey(key: string): boolean {
  const valid = SPONSOR_KEYS.includes(key.trim());
  if (valid) {
    persistKey(key.trim());
  }
  return valid;
}

export function isSponsor(): boolean {
  const saved = getSponsorKey();
  return saved !== null && SPONSOR_KEYS.includes(saved);
}

export function clearSponsorKey(): void {
  persistKey(null);
}
