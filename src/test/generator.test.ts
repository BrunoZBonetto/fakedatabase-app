import { describe, it, expect } from 'vitest';
import FakeDataGenerator from '../engine/generator';
import address from '../dictionaries/address.json';

const generator = new FakeDataGenerator();

describe('FakeDataGenerator', () => {
  it('generates the requested number of records', () => {
    const result: Record<string, unknown>[] = generator.generate(['id', 'fullName'], 5) as Record<string, unknown>[];
    expect(result).toHaveLength(5);
  });

  it('includes all requested fields', () => {
    const fields = ['id', 'fullName', 'email', 'cpf', 'phone'];
    const result = generator.generate(fields, 1) as Record<string, unknown>[];
    for (const field of fields) {
      expect(result[0]).toHaveProperty(field);
    }
  });

  it('generates valid CPF', () => {
    const result = generator.generate(['cpf'], 1) as Record<string, string>[];
    expect(result[0].cpf).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/);
  });

  it('correlates city and state', () => {
    const result = generator.generate(['city', 'state'], 50) as Record<string, string>[];
    for (const row of result) {
      const match = address.cities.find((c: any) => c.name === row.city);
      expect(match).toBeDefined();
      expect(match!.state).toBe(row.state);
    }
  });

  it('supports custom fields', () => {
    const customFields = [{ name: 'nota', type: 'number', size: null as unknown as number | undefined, useCustomValues: false, customValues: [] as { text: string }[] }];
    const result = generator.generate(['id'], 3, customFields) as Record<string, unknown>[];
    for (const row of result) {
      expect(row).toHaveProperty('nota');
      expect(typeof row.nota).toBe('number');
    }
  });

  it('increments id counter', () => {
    const freshGen = new FakeDataGenerator();
    const result = freshGen.generate(['id'], 5) as Record<string, number>[];
    expect(result[0].id).toBe(1);
    expect(result[4].id).toBe(5);
  });
});
