import { describe, it, expect } from 'vitest';
import {
  topologicalSort,
  inferForeignKey,
  detectRelation,
  validateConfig,
  validateIntegrity,
  RelationalGenerator,
  type RelationalEntity,
  type EntityRelation,
  type RelationalConfig,
} from '../engine/relational-generator';

describe('topologicalSort', () => {
  it('sorts two entities with dependency', () => {
    const entities: RelationalEntity[] = [
      { templateKey: 'pessoaFisica', recordCount: 10 },
      { templateKey: 'pedido', recordCount: 20 },
    ];
    const relations: EntityRelation[] = [{
      parentKey: 'pessoaFisica',
      childKey: 'pedido',
      parentField: 'id',
      childField: 'pessoa_id',
      cardinality: '1:N',
    }];
    const sorted = topologicalSort(entities, relations);
    expect(sorted[0]).toBe('pessoaFisica');
    expect(sorted[1]).toBe('pedido');
  });

  it('sorts three entities in chain', () => {
    const entities: RelationalEntity[] = [
      { templateKey: 'empresa', recordCount: 5 },
      { templateKey: 'funcionario', recordCount: 20 },
      { templateKey: 'pedido', recordCount: 50 },
    ];
    const relations: EntityRelation[] = [
      { parentKey: 'empresa', childKey: 'funcionario', parentField: 'id', childField: 'empresa_id', cardinality: '1:N' },
      { parentKey: 'funcionario', childKey: 'pedido', parentField: 'id', childField: 'funcionario_id', cardinality: '1:N' },
    ];
    const sorted = topologicalSort(entities, relations);
    expect(sorted.indexOf('empresa')).toBeLessThan(sorted.indexOf('funcionario'));
    expect(sorted.indexOf('funcionario')).toBeLessThan(sorted.indexOf('pedido'));
  });

  it('throws on cycle', () => {
    const entities: RelationalEntity[] = [
      { templateKey: 'A', recordCount: 1 },
      { templateKey: 'B', recordCount: 1 },
    ];
    const relations: EntityRelation[] = [
      { parentKey: 'A', childKey: 'B', parentField: 'id', childField: 'a_id', cardinality: '1:N' },
      { parentKey: 'B', childKey: 'A', parentField: 'id', childField: 'b_id', cardinality: '1:N' },
    ];
    expect(() => topologicalSort(entities, relations)).toThrow('Ciclo detectado');
  });
});

describe('inferForeignKey', () => {
  it('finds pessoa_id via pattern base match', () => {
    const fields = ['id', 'fullName', 'email'];
    const result = inferForeignKey('pessoaFisica', 'pedido', fields);
    expect(result.field).toBe('pessoa_id');
    expect(result.autoCreated).toBe(false);
  });

  it('finds empresa_id via pattern base match', () => {
    const fields = ['id', 'fullName', 'position'];
    const result = inferForeignKey('empresa', 'funcionario', fields);
    expect(result.field).toBe('empresa_id');
    expect(result.autoCreated).toBe(false);
  });

  it('returns null field with suggestion when no match', () => {
    const fields = ['id', 'fullName', 'email'];
    const result = inferForeignKey('estudante', 'pedido', fields);
    expect(result.field).toBeNull();
    expect(result.suggestion).toBe('estudante_id');
    expect(result.autoCreated).toBe(true);
  });

  it('pattern match takes priority over field list', () => {
    const fields = ['id', 'fullName', 'empresaId'];
    const result = inferForeignKey('empresa', 'funcionario', fields);
    expect(result.field).toBe('empresa_id');
    expect(result.autoCreated).toBe(false);
  });
});

describe('detectRelation', () => {
  it('pedido is child of pessoaFisica via pessoa_id', () => {
    const r = detectRelation('pessoaFisica', 'pedido');
    expect(r).not.toBeNull();
    expect(r!.parentKey).toBe('pessoaFisica');
    expect(r!.childKey).toBe('pedido');
    expect(r!.fkField).toBe('pessoa_id');
    expect(r!.ambiguous).toBe(false);
  });

  it('funcionario is child of empresa via empresa_id', () => {
    const r = detectRelation('empresa', 'funcionario');
    expect(r).not.toBeNull();
    expect(r!.parentKey).toBe('empresa');
    expect(r!.childKey).toBe('funcionario');
    expect(r!.fkField).toBe('empresa_id');
    expect(r!.ambiguous).toBe(false);
  });

  it('contaBancaria is child of cliente via cliente_id', () => {
    const r = detectRelation('cliente', 'contaBancaria');
    expect(r).not.toBeNull();
    expect(r!.parentKey).toBe('cliente');
    expect(r!.childKey).toBe('contaBancaria');
    expect(r!.fkField).toBe('cliente_id');
    expect(r!.ambiguous).toBe(false);
  });

  it('logistica is child of pedido via pedido_id', () => {
    const r = detectRelation('pedido', 'logistica');
    expect(r).not.toBeNull();
    expect(r!.parentKey).toBe('pedido');
    expect(r!.childKey).toBe('logistica');
    expect(r!.fkField).toBe('pedido_id');
    expect(r!.ambiguous).toBe(false);
  });

  it('paciente is child of cliente via cliente_id', () => {
    const r = detectRelation('cliente', 'paciente');
    expect(r).not.toBeNull();
    expect(r!.parentKey).toBe('cliente');
    expect(r!.childKey).toBe('paciente');
    expect(r!.fkField).toBe('cliente_id');
    expect(r!.ambiguous).toBe(false);
  });

  it('resolves pessoaFisica vs cliente via exact confidence', () => {
    const r = detectRelation('pessoaFisica', 'cliente');
    expect(r).not.toBeNull();
    expect(r!.ambiguous).toBe(false);
    expect(r!.confidence).toBe('exact');
    expect(r!.fkField).toBe('cliente_id');
  });

  it('returns null for unrelated templates', () => {
    const r = detectRelation('estudante', 'veiculo');
    expect(r).toBeNull();
  });

  it('order does not matter (A,B) == (B,A) with swapped parent/child)', () => {
    const r1 = detectRelation('empresa', 'funcionario');
    const r2 = detectRelation('funcionario', 'empresa');
    expect(r1).not.toBeNull();
    expect(r2).not.toBeNull();
    expect(r1!.parentKey).toBe(r2!.parentKey);
    expect(r1!.childKey).toBe(r2!.childKey);
  });
});

describe('validateConfig', () => {
  it('rejects less than 2 entities', () => {
    const config: RelationalConfig = {
      entities: [{ templateKey: 'pessoaFisica', recordCount: 10 }],
      relations: [],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const result = validateConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('2 entidades');
  });

  it('valid config passes', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 10 },
        { templateKey: 'pedido', recordCount: 20 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const result = validateConfig(config);
    expect(result.valid).toBe(true);
  });

  it('rejects zero parent with non-zero child', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 0 },
        { templateKey: 'pedido', recordCount: 20 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const result = validateConfig(config);
    expect(result.valid).toBe(false);
  });

  it('warns when childField does not exist in template', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 10 },
        { templateKey: 'pedido', recordCount: 20 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'custom_fk_col',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const result = validateConfig(config);
    expect(result.valid).toBe(true);
    expect(result.warnings.some(w => w.includes('custom_fk_col'))).toBe(true);
  });

  it('errors when parentField does not exist', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 10 },
        { templateKey: 'pedido', recordCount: 20 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'nonexistent_field',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const result = validateConfig(config);
    expect(result.valid).toBe(false);
    expect(result.errors.some(e => e.includes('nonexistent_field'))).toBe(true);
  });
});

describe('validateIntegrity', () => {
  it('detects orphan FKs', () => {
    const results = new Map<string, Record<string, unknown>[]>();
    results.set('pessoaFisica', [{ id: 1 }, { id: 2 }]);
    results.set('pedido', [
      { id: 1, pessoa_id: 1 },
      { id: 2, pessoa_id: 999 },
    ]);
    const relations: EntityRelation[] = [{
      parentKey: 'pessoaFisica',
      childKey: 'pedido',
      parentField: 'id',
      childField: 'pessoa_id',
      cardinality: '1:N',
    }];
    const result = validateIntegrity(results, relations);
    expect(result.valid).toBe(false);
    expect(result.errors[0]).toContain('FK(s) órfã(s)');
  });

  it('passes with valid FKs', () => {
    const results = new Map<string, Record<string, unknown>[]>();
    results.set('pessoaFisica', [{ id: 1 }, { id: 2 }]);
    results.set('pedido', [
      { id: 1, pessoa_id: 1 },
      { id: 2, pessoa_id: 2 },
    ]);
    const relations: EntityRelation[] = [{
      parentKey: 'pessoaFisica',
      childKey: 'pedido',
      parentField: 'id',
      childField: 'pessoa_id',
      cardinality: '1:N',
    }];
    const result = validateIntegrity(results, relations);
    expect(result.valid).toBe(true);
  });
});

describe('RelationalGenerator', () => {
  it('generates parent and child with FK', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 5 },
        { templateKey: 'pedido', recordCount: 10 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const rg = new RelationalGenerator(config);
    const result = rg.generate(config);

    expect(result.validation.valid).toBe(true);
    expect(result.entities.size).toBe(2);

    const pessoas = result.entities.get('pessoaFisica')!;
    const pedidos = result.entities.get('pedido')!;

    expect(pessoas).toHaveLength(5);
    expect(pedidos).toHaveLength(10);

    const pessoaIds = new Set(pessoas.map(p => p.id));
    for (const pedido of pedidos) {
      expect(pessoaIds.has(pedido.pessoa_id as number)).toBe(true);
    }
  });

  it('zero FKs orphan', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 20 },
        { templateKey: 'pedido', recordCount: 100 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const rg = new RelationalGenerator(config);
    const result = rg.generate(config);

    const pessoas = result.entities.get('pessoaFisica')!;
    const pedidos = result.entities.get('pedido')!;
    const validFks = new Set(pessoas.map(p => p.id));
    const orphanCount = pedidos.filter(p => !validFks.has(p.pessoa_id as number)).length;

    expect(orphanCount).toBe(0);
  });

  it('auto-creates FK column when field not in template', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'empresa', recordCount: 5 },
        { templateKey: 'estudante', recordCount: 10 },
      ],
      relations: [{
        parentKey: 'empresa',
        childKey: 'estudante',
        parentField: 'id',
        childField: 'empresa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const rg = new RelationalGenerator(config);
    const result = rg.generate(config);

    expect(result.validation.valid).toBe(true);
    const estudantes = result.entities.get('estudante')!;
    expect(estudantes).toHaveLength(10);
    for (const e of estudantes) {
      expect(e.empresa_id).toBeDefined();
    }
  });

  it('renames FK field when conflicts with existing field', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'empresa', recordCount: 5 },
        { templateKey: 'funcionario', recordCount: 10 },
      ],
      relations: [{
        parentKey: 'empresa',
        childKey: 'funcionario',
        parentField: 'id',
        childField: 'company',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const rg = new RelationalGenerator(config);
    const result = rg.generate(config);

    expect(result.validation.valid).toBe(true);
    expect(result.validation.warnings.some(w => w.includes('renomeado'))).toBe(true);

    const funcionarios = result.entities.get('funcionario')!;
    for (const f of funcionarios) {
      expect(f.empresa_company).toBeDefined();
    }
  });

  it('seed produces same FK assignments', () => {
    const makeConfig = (seed?: number): RelationalConfig => ({
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 5 },
        { templateKey: 'pedido', recordCount: 10 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
      seed,
    });

    const rg1 = new RelationalGenerator(makeConfig(42));
    const r1 = rg1.generate(makeConfig(42));

    const rg2 = new RelationalGenerator(makeConfig(42));
    const r2 = rg2.generate(makeConfig(42));

    const fk1 = r1.entities.get('pedido')!.map(p => p.pessoa_id);
    const fk2 = r2.entities.get('pedido')!.map(p => p.pessoa_id);
    expect(fk1).toEqual(fk2);
  });

  it('different seeds produce different FK assignments', () => {
    const makeConfig = (seed: number): RelationalConfig => ({
      entities: [
        { templateKey: 'pessoaFisica', recordCount: 5 },
        { templateKey: 'pedido', recordCount: 50 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
      seed,
    });

    const rg1 = new RelationalGenerator(makeConfig(1));
    const r1 = rg1.generate(makeConfig(1));

    const rg2 = new RelationalGenerator(makeConfig(2));
    const r2 = rg2.generate(makeConfig(2));

    const fk1 = r1.entities.get('pedido')!.map(p => p.pessoa_id).join(',');
    const fk2 = r2.entities.get('pedido')!.map(p => p.pessoa_id).join(',');
    expect(fk1).not.toBe(fk2);
  });

  it('entity order follows topological sort', () => {
    const config: RelationalConfig = {
      entities: [
        { templateKey: 'pedido', recordCount: 10 },
        { templateKey: 'pessoaFisica', recordCount: 5 },
      ],
      relations: [{
        parentKey: 'pessoaFisica',
        childKey: 'pedido',
        parentField: 'id',
        childField: 'pessoa_id',
        cardinality: '1:N',
      }],
      nullRate: 0,
      errorRate: 0,
      locale: 'pt-BR',
    };
    const rg = new RelationalGenerator(config);
    const result = rg.generate(config);

    expect(result.validation.valid).toBe(true);
    const pessoas = result.entities.get('pessoaFisica')!;
    const pedidos = result.entities.get('pedido')!;
    expect(pessoas.length).toBe(5);
    expect(pedidos.length).toBe(10);
  });
});
