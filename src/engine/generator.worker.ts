import FakeDataGenerator from './generator';

interface WorkerMessage {
  type: 'generate';
  fields: string[];
  count: number;
  customFields: { name: string; type: string; size?: number | null; useCustomValues?: boolean; customValues?: { text: string }[] }[];
  nullRate?: number;
  errorRate?: number;
  locale?: 'pt-BR' | 'en-US';
}

self.onmessage = (e: MessageEvent<WorkerMessage>) => {
  if (e.data.type === 'generate') {
    const { fields, count, customFields, nullRate = 0, errorRate = 0, locale = 'pt-BR' } = e.data;
    const generator = new FakeDataGenerator(nullRate, errorRate, locale);
    const CHUNK_SIZE = Math.min(count, 1000);
    const result: Record<string, unknown>[] = [];

    for (let i = 0; i < count; i += CHUNK_SIZE) {
      const chunkCount = Math.min(CHUNK_SIZE, count - i);
      const chunk = generator.generate(fields, chunkCount, customFields);
      result.push(...chunk);

      self.postMessage({
        type: 'progress',
        current: result.length,
        total: count,
      });
    }

    self.postMessage({ type: 'complete', data: result });
  }
};
