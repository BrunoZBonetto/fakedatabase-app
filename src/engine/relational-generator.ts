import FakeDataGenerator from './generator';
import { PRESETS } from '../templates/presets';
import { randomPick, createSeededRandom } from '../utils/random';

// ─── Interfaces ───────────────────────────────────────────────

export interface EntityRelation {
  parentKey: string;
  childKey: string;
  parentField: string;
  childField: string;
  cardinality: '1:N';
}

export interface RelationalEntity {
  templateKey: string;
  recordCount: number;
  fieldOverrides?: string[];
  customFields?: { name: string; type: string; size?: number | null; useCustomValues?: boolean; customValues?: { text: string }[] }[];
}

export interface RelationalConfig {
  entities: RelationalEntity[];
  relations: EntityRelation[];
  nullRate: number;
  errorRate: number;
  locale: string;
  seed?: number;
}

export interface ValidationResult {
  valid: boolean;
  errors: string[];
  warnings: string[];
}

export interface RelationalResult {
  entities: Map<string, Record<string, unknown>[]>;
  validation: ValidationResult;
}

export interface InferResult {
  field: string | null;
  suggestion: string;
  autoCreated: boolean;
}

// ─── Topological Sort (Kahn's Algorithm) ──────────────────────

export function topologicalSort(
  entities: RelationalEntity[],
  relations: EntityRelation[]
): string[] {
  const keys = entities.map(e => e.templateKey);
  const inDegree = new Map<string, number>();
  const adjacency = new Map<string, string[]>();

  for (const key of keys) {
    inDegree.set(key, 0);
    adjacency.set(key, []);
  }

  for (const rel of relations) {
    if (adjacency.has(rel.parentKey) && inDegree.has(rel.childKey)) {
      adjacency.get(rel.parentKey)!.push(rel.childKey);
      inDegree.set(rel.childKey, (inDegree.get(rel.childKey) || 0) + 1);
    }
  }

  const queue: string[] = [];
  for (const [key, degree] of inDegree) {
    if (degree === 0) queue.push(key);
  }

  const sorted: string[] = [];
  while (queue.length > 0) {
    const current = queue.shift()!;
    sorted.push(current);
    for (const neighbor of adjacency.get(current) || []) {
      const newDegree = (inDegree.get(neighbor) || 1) - 1;
      inDegree.set(neighbor, newDegree);
      if (newDegree === 0) queue.push(neighbor);
    }
  }

  if (sorted.length !== keys.length) {
    throw new Error('Ciclo detectado no grafo de dependências');
  }

  return sorted;
}

// ─── FK Inference (3-Phase Semantic Algorithm) ─────────────────

function extractWords(key: string): string[] {
  return key.replace(/([A-Z])/g, '_$1').toLowerCase().split('_').filter(Boolean);
}

function stripIdSuffix(pattern: string): string {
  return pattern.replace(/(_?id)$/i, '');
}

function baseMatchesEntity(base: string, entityKey: string): boolean {
  if (base === entityKey) return true;
  const words = extractWords(entityKey);
  return words.includes(base);
}

export interface DetectResult {
  parentKey: string;
  childKey: string;
  fkField: string;
  confidence: 'exact' | 'substring' | 'convention';
  ambiguous: boolean;
}

export function detectRelation(entityA: string, entityB: string): DetectResult | null {
  const presetA = PRESETS[entityA as keyof typeof PRESETS];
  const presetB = PRESETS[entityB as keyof typeof PRESETS];
  if (!presetA || !presetB) return null;

  let aReferencesB: { pattern: string; confidence: 'exact' | 'substring' } | null = null;
  let bReferencesA: { pattern: string; confidence: 'exact' | 'substring' } | null = null;

  if (presetA.foreignKeyPatterns) {
    for (const pattern of presetA.foreignKeyPatterns) {
      const base = stripIdSuffix(pattern);
      if (base === entityA) continue;
      if (baseMatchesEntity(base, entityB)) {
        const confidence = base === entityB ? 'exact' : 'substring';
        aReferencesB = { pattern, confidence };
        break;
      }
    }
  }

  if (presetB.foreignKeyPatterns) {
    for (const pattern of presetB.foreignKeyPatterns) {
      const base = stripIdSuffix(pattern);
      if (base === entityB) continue;
      if (baseMatchesEntity(base, entityA)) {
        const confidence = base === entityA ? 'exact' : 'substring';
        bReferencesA = { pattern, confidence };
        break;
      }
    }
  }

  if (aReferencesB && !bReferencesA) {
    return { parentKey: entityB, childKey: entityA, fkField: aReferencesB.pattern, confidence: aReferencesB.confidence, ambiguous: false };
  }
  if (bReferencesA && !aReferencesB) {
    return { parentKey: entityA, childKey: entityB, fkField: bReferencesA.pattern, confidence: bReferencesA.confidence, ambiguous: false };
  }
  if (aReferencesB && bReferencesA) {
    if (aReferencesB.confidence !== bReferencesA.confidence) {
      const winner = aReferencesB.confidence === 'exact' ? aReferencesB : bReferencesA;
      const parentKey = winner === aReferencesB ? entityB : entityA;
      const childKey = winner === aReferencesB ? entityA : entityB;
      return { parentKey, childKey, fkField: winner.pattern, confidence: winner.confidence, ambiguous: false };
    }
    return { parentKey: entityA, childKey: entityB, fkField: aReferencesB.pattern, confidence: 'substring', ambiguous: true };
  }

  return null;
}

export function inferForeignKey(
  parentKey: string,
  childTemplateKey: string,
  childFields: string[]
): InferResult {
  const suggestion = `${parentKey}_id`;

  const childPreset = PRESETS[childTemplateKey as keyof typeof PRESETS];
  if (childPreset?.foreignKeyPatterns) {
    for (const pattern of childPreset.foreignKeyPatterns) {
      const base = stripIdSuffix(pattern);
      if (baseMatchesEntity(base, parentKey)) {
        return { field: pattern, suggestion, autoCreated: false };
      }
    }
  }

  const patterns = [`${parentKey}_id`, `${parentKey}Id`];
  for (const pattern of patterns) {
    if (childFields.includes(pattern)) {
      return { field: pattern, suggestion, autoCreated: false };
    }
  }

  const parentWords = extractWords(parentKey);
  for (const field of childFields) {
    const lower = field.toLowerCase();
    if (lower.endsWith('_id') || lower.endsWith('id')) {
      const fieldBase = lower.replace(/(_?id)$/, '');
      if (parentWords.some(w => fieldBase.includes(w))) {
        return { field, suggestion, autoCreated: false };
      }
    }
  }

  return { field: null, suggestion, autoCreated: true };
}

// ─── Validation ───────────────────────────────────────────────

export function validateConfig(config: RelationalConfig): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (config.entities.length < 2) {
    errors.push('Adicione pelo menos 2 entidades');
  }

  for (const entity of config.entities) {
    const preset = PRESETS[entity.templateKey as keyof typeof PRESETS];
    if (!preset) {
      errors.push(`Template "${entity.templateKey}" não encontrado`);
    }
    if (entity.recordCount < 1) {
      errors.push(`Entidade "${entity.templateKey}" precisa de pelo menos 1 registro`);
    }
    if (entity.recordCount > 5000) {
      errors.push(`Entidade "${entity.templateKey}" excede o limite de 5000 registros`);
    }
  }

  for (const rel of config.relations) {
    const parent = config.entities.find(e => e.templateKey === rel.parentKey);
    const child = config.entities.find(e => e.templateKey === rel.childKey);

    if (!parent) {
      errors.push(`Entidade pai "${rel.parentKey}" não encontrada`);
    }
    if (!child) {
      errors.push(`Entidade filho "${rel.childKey}" não encontrada`);
    }
    if (rel.parentKey === rel.childKey) {
      errors.push(`Entidade "${rel.parentKey}" não pode ser pai de si mesma`);
    }

    if (parent && child) {
      const parentPreset = PRESETS[rel.parentKey as keyof typeof PRESETS];
      const childPreset = PRESETS[rel.childKey as keyof typeof PRESETS];
      if (parentPreset && !parentPreset.fields.includes(rel.parentField)) {
        errors.push(`Campo pai "${rel.parentField}" não existe no template "${rel.parentKey}"`);
      }
      if (childPreset) {
        const childFields = child.fieldOverrides && child.fieldOverrides.length > 0
          ? child.fieldOverrides
          : childPreset.fields;
        if (!childFields.includes(rel.childField)) {
          warnings.push(
            `Campo filho "${rel.childField}" não existe no template "${rel.childKey}" — sera criado automaticamente`
          );
        }
      }
    }
  }

  const parentKeys = config.relations.map(r => r.parentKey);
  const childKeys = config.relations.map(r => r.childKey);
  const roots = config.entities
    .map(e => e.templateKey)
    .filter(k => !childKeys.includes(k));

  if (config.entities.length >= 2 && config.relations.length === 0) {
    warnings.push('Nenhum relacionamento configurado — entidades serão geradas independentemente');
  }

  for (const root of roots) {
    const rootEntity = config.entities.find(e => e.templateKey === root);
    const hasChildren = parentKeys.includes(root);
    if (hasChildren && rootEntity && rootEntity.recordCount === 0) {
      const childEntity = config.entities.find(e =>
        config.relations.some(r => r.parentKey === root && r.childKey === e.templateKey)
      );
      if (childEntity && childEntity.recordCount > 0) {
        errors.push(`Entidade "${root}" tem 0 registros mas "${childEntity.templateKey}" depende dela`);
      }
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

export function validateIntegrity(
  results: Map<string, Record<string, unknown>[]>,
  relations: EntityRelation[]
): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  for (const rel of relations) {
    const parentData = results.get(rel.parentKey) || [];
    const childData = results.get(rel.childKey) || [];

    const parentIds = new Set(parentData.map(r => r[rel.parentField]));
    const missingFks = childData.filter(r => !parentIds.has(r[rel.childField]));

    if (missingFks.length > 0) {
      errors.push(
        `${missingFks.length} FK(s) órfã(s) em "${rel.childKey}.${rel.childField}" ` +
        `→ "${rel.parentKey}.${rel.parentField}" não existe`
      );
    }

    const pkValues = parentData.map(r => r[rel.parentField]);
    const uniquePks = new Set(pkValues);
    if (uniquePks.size !== pkValues.length) {
      const duplicates = pkValues.length - uniquePks.size;
      errors.push(`${duplicates} PK(s) duplicada(s) em "${rel.parentKey}.${rel.parentField}"`);
    }
  }

  return { valid: errors.length === 0, errors, warnings };
}

// ─── Relational Generator ─────────────────────────────────────

export class RelationalGenerator {
  private locale: string;
  private nullRate: number;
  private errorRate: number;
  private seed?: number;

  constructor(config: RelationalConfig) {
    this.locale = config.locale;
    this.nullRate = config.nullRate;
    this.errorRate = config.errorRate;
    this.seed = config.seed;
  }

  generate(config: RelationalConfig): RelationalResult {
    const validation = validateConfig(config);
    if (!validation.valid) {
      return { entities: new Map(), validation };
    }

    let sortedKeys: string[];
    try {
      sortedKeys = topologicalSort(config.entities, config.relations);
    } catch (err) {
      return {
        entities: new Map(),
        validation: {
          valid: false,
          errors: [(err as Error).message],
          warnings: [],
        },
      };
    }

    const results = new Map<string, Record<string, unknown>[]>();
    const parentIdsMap = new Map<string, Map<unknown, unknown[]>>();
    const extraWarnings: string[] = [];

    const originalRandom = Math.random;
    const useSeed = config.seed != null;
    let seeded: ReturnType<typeof createSeededRandom> | null = null;
    if (useSeed) {
      seeded = createSeededRandom(config.seed!);
      Math.random = seeded.random;
    }

    try {
      for (const key of sortedKeys) {
        const entity = config.entities.find(e => e.templateKey === key)!;
        const preset = PRESETS[entity.templateKey as keyof typeof PRESETS];
        if (!preset) continue;

        const fields = entity.fieldOverrides && entity.fieldOverrides.length > 0
          ? [...entity.fieldOverrides]
          : [...preset.fields];

        const incomingRel = config.relations.find(r => r.childKey === key);
        let fkField: string | null = null;
        let parentKey: string | null = null;

        if (incomingRel) {
          fkField = incomingRel.childField;
          parentKey = incomingRel.parentKey;

          if (fields.includes(fkField)) {
            const renamedFk = `${parentKey}_${fkField}`;
            extraWarnings.push(
              `Campo "${fkField}" em "${key}" sera renomeado para "${renamedFk}" para evitar conflito com FK`
            );
            const idx = fields.indexOf(fkField);
            fields[idx] = renamedFk;
            fkField = renamedFk;
            incomingRel.childField = renamedFk;
          }

          if (!fields.includes(fkField)) {
            fields.push(fkField);
          }
        }

        const generator = new FakeDataGenerator(this.nullRate, this.errorRate, this.locale);
        const generated: Record<string, unknown>[] = [];

        for (let i = 0; i < entity.recordCount; i++) {
          const record = generator.generateOne(fields, entity.customFields || []);
          if (fkField && parentKey) {
            const parentPks = parentIdsMap.get(parentKey);
            if (parentPks && parentPks.size > 0) {
              const pkArray = Array.from(parentPks.keys());
              record[fkField] = seeded ? seeded.pick(pkArray) : randomPick(pkArray);
            }
          }
          generated.push(record);
        }

        results.set(key, generated);

        const outgoingRel = config.relations.find(r => r.parentKey === key);
        if (outgoingRel) {
          const pkField = outgoingRel.parentField;
          const pkMap = new Map<unknown, unknown[]>();
          for (const record of generated) {
            const pk = record[pkField];
            if (!pkMap.has(pk)) pkMap.set(pk, []);
            pkMap.get(pk)!.push(pk);
          }
          parentIdsMap.set(key, pkMap);
        }
      }
    } finally {
      if (useSeed) {
        Math.random = originalRandom;
      }
    }

    const integrityValidation = validateIntegrity(results, config.relations);
    const finalValidation: ValidationResult = {
      valid: validation.valid && integrityValidation.valid,
      errors: [...validation.errors, ...integrityValidation.errors],
      warnings: [...validation.warnings, ...integrityValidation.warnings, ...extraWarnings],
    };

    return { entities: results, validation: finalValidation };
  }
}

export default RelationalGenerator;
