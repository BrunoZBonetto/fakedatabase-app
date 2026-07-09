const STORAGE_KEY = 'fdg_sponsor_key';

// ===== Chaves de sponsor =====
// Adicione quantas quiser. Cada chave é compartilhada manualmente com um
// sponsor após o patrocínio (via mensagem do GitHub Sponsors).
//
// Se uma chave vazar, remova-a da lista e crie uma nova. Avise os sponsores
// válidos sobre a nova chave.
//
// Exemplo com 2 chaves:
//   export const SPONSOR_KEYS = ['abc-123', 'xyz-789'];
export const SPONSOR_KEYS = ['sponsor-dev-2024'];

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
