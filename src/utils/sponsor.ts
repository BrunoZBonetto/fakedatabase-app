const STORAGE_KEY = 'fdg_sponsor_key';

// ===== Chaves de sponsor =====
// Adicione manualmente as chaves aqui antes do build e compartilhe com cada
// sponsor após o patrocínio. O array vazio = sem chaves válidas em produção
// até que você adicione uma.
// Exemplo: export const SPONSOR_KEYS = ['abc-123'];
export const SPONSOR_KEYS: string[] = [];

export function getSponsorKey(): string | null {
  try {
    return localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

export function setSponsorKey(key: string): boolean {
  const valid = SPONSOR_KEYS.includes(key.trim());
  if (valid) {
    try {
      localStorage.setItem(STORAGE_KEY, key.trim());
    } catch { /* ignore */ }
  }
  return valid;
}

export function isSponsor(): boolean {
  const saved = getSponsorKey();
  return saved !== null && SPONSOR_KEYS.includes(saved);
}

export function clearSponsorKey(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch { /* ignore */ }
}
