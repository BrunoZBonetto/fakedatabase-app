import { useState } from 'react';
import { PRESETS } from '../templates/presets';
import { useLocale } from '../hooks/useLocale';
import {
  inferForeignKey,
  detectRelation,
  type RelationalEntity,
  type EntityRelation,
  type RelationalConfig,
} from '../engine/relational-generator';

const TEMPLATE_KEYS = Object.keys(PRESETS);
const MAX_ENTITIES = 5;
const MAX_RECORDS = 5000;

interface Props {
  onGenerate: (config: RelationalConfig) => void;
  isGenerating: boolean;
}

export default function RelationalConfigPanel({ onGenerate, isGenerating }: Props) {
  const { t, locale } = useLocale();
  const r = t.relational;

  const [entities, setEntities] = useState<RelationalEntity[]>([
    { templateKey: 'pessoaFisica', recordCount: 100 },
    { templateKey: 'pedido', recordCount: 500 },
  ]);
  const [relations, setRelations] = useState<EntityRelation[]>([]);
  const [nullRate, setNullRate] = useState(0);
  const [errorRate, setErrorRate] = useState(0);
  const [seed, setSeed] = useState<string>('');
  const [ambiguousWarning, setAmbiguousWarning] = useState<string | null>(null);

  const addEntity = () => {
    if (entities.length >= MAX_ENTITIES) return;
    const usedKeys = entities.map(e => e.templateKey);
    const nextKey = TEMPLATE_KEYS.find(k => !usedKeys.includes(k)) || TEMPLATE_KEYS[0];
    setEntities([...entities, { templateKey: nextKey, recordCount: 100 }]);
  };

  const removeEntity = (index: number) => {
    if (entities.length <= 2) return;
    const key = entities[index].templateKey;
    setEntities(entities.filter((_, i) => i !== index));
    setRelations(relations.filter(r => r.parentKey !== key && r.childKey !== key));
  };

  const updateEntity = (index: number, field: keyof RelationalEntity, value: string | number) => {
    const next = [...entities];
    if (field === 'templateKey') {
      const oldKey = next[index].templateKey;
      next[index] = { ...next[index], templateKey: value as string };
      setRelations(relations.map(r => {
        if (r.parentKey === oldKey) return { ...r, parentKey: value as string };
        if (r.childKey === oldKey) return { ...r, childKey: value as string };
        return r;
      }));
    } else {
      next[index] = { ...next[index], [field]: Math.min(Number(value), MAX_RECORDS) };
    }
    setEntities(next);
  };

  const autoDetectRelations = () => {
    const newRelations: EntityRelation[] = [];
    const usedAsChild = new Set<string>();
    const ambiguousPairs: string[] = [];

    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const keyA = entities[i].templateKey;
        const keyB = entities[j].templateKey;

        const result = detectRelation(keyA, keyB);
        if (!result) continue;

        if (result.ambiguous) {
          ambiguousPairs.push(`${keyA} ↔ ${keyB}`);
          continue;
        }

        if (usedAsChild.has(result.childKey)) continue;

        const parentPreset = PRESETS[result.parentKey as keyof typeof PRESETS];
        newRelations.push({
          parentKey: result.parentKey,
          childKey: result.childKey,
          parentField: parentPreset?.primaryKey || 'id',
          childField: result.fkField,
          cardinality: '1:N',
        });
        usedAsChild.add(result.childKey);
      }
    }

    if (ambiguousPairs.length > 0) {
      setAmbiguousWarning(
        `Relacionamentos ambíguos ignorados: ${ambiguousPairs.join(', ')}. Configure manualmente.`
      );
    } else {
      setAmbiguousWarning(null);
    }

    setRelations(newRelations);
  };

  const updateRelation = (index: number, field: keyof EntityRelation, value: string) => {
    const next = [...relations];
    next[index] = { ...next[index], [field]: value };
    setRelations(next);
  };

  const addManualRelation = () => {
    if (entities.length < 2) return;
    const parentPreset = PRESETS[entities[0].templateKey];
    setRelations([...relations, {
      parentKey: entities[0].templateKey,
      childKey: entities[1].templateKey,
      parentField: parentPreset?.primaryKey || 'id',
      childField: '',
      cardinality: '1:N',
    }]);
  };

  const removeRelation = (index: number) => {
    setRelations(relations.filter((_, i) => i !== index));
  };

  const handleGenerate = () => {
    onGenerate({
      entities,
      relations,
      nullRate: nullRate / 100,
      errorRate: errorRate / 100,
      locale,
      seed: seed.trim() ? Number(seed.trim()) : undefined,
    });
  };

  const canGenerate = entities.length >= 2 && relations.length > 0 && !isGenerating;

  const getParentFields = (templateKey: string): string[] => {
    const preset = PRESETS[templateKey];
    if (!preset) return ['id'];
    return preset.fields;
  };

  return (
    <div className="relational-config">
      <h3 className="relational-title">{r.title}</h3>

      <div className="relational-entities">
        {entities.map((entity, i) => (
          <div key={i} className="relational-entity-card">
            <div className="entity-header">
              <span className="entity-badge">
                {i === 0 ? r.parent : `${r.child} ${i}`}
              </span>
              {entities.length > 2 && (
                <button
                  className="btn-icon-sm"
                  onClick={() => removeEntity(i)}
                  title={r.removeEntity}
                >
                  ✕
                </button>
              )}
            </div>
            <div className="entity-fields">
              <div className="field-row">
                <label>{r.template}</label>
                <select
                  value={entity.templateKey}
                  onChange={(e) => updateEntity(i, 'templateKey', e.target.value)}
                  disabled={isGenerating}
                >
                  {TEMPLATE_KEYS.map(key => {
                    const preset = PRESETS[key];
                    const info = t.templateSelector.presets[key];
                    return (
                      <option key={key} value={key}>
                        {info?.name || key} ({preset.fields.length} fields)
                      </option>
                    );
                  })}
                </select>
              </div>
              <div className="field-row">
                <label>{r.records}</label>
                <input
                  type="number"
                  min="1"
                  max={MAX_RECORDS}
                  value={entity.recordCount}
                  onChange={(e) => updateEntity(i, 'recordCount', e.target.value)}
                  disabled={isGenerating}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {entities.length < MAX_ENTITIES && (
        <button className="btn-add-entity" onClick={addEntity} disabled={isGenerating}>
          {r.addEntity}
        </button>
      )}

      <div className="relational-relations">
        <div className="relations-header">
          <h4>{r.relationship}</h4>
          <button
            className="btn-detect"
            onClick={autoDetectRelations}
            disabled={isGenerating || entities.length < 2}
          >
            {r.inferFK}
          </button>
        </div>

        {relations.map((rel, i) => (
          <div key={i} className="relation-card">
            <div className="relation-fields">
              <div className="field-row">
                <label>{r.parentEntity}</label>
                <select
                  value={rel.parentKey}
                  onChange={(e) => updateRelation(i, 'parentKey', e.target.value)}
                  disabled={isGenerating}
                >
                  {entities.map(e => (
                    <option key={e.templateKey} value={e.templateKey}>
                      {t.templateSelector.presets[e.templateKey]?.name || e.templateKey}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field-row">
                <label>{r.parentField}</label>
                <select
                  value={rel.parentField}
                  onChange={(e) => updateRelation(i, 'parentField', e.target.value)}
                  disabled={isGenerating}
                >
                  {getParentFields(rel.parentKey).map(f => (
                    <option key={f} value={f}>{f}</option>
                  ))}
                </select>
              </div>
              <div className="relation-arrow">→</div>
              <div className="field-row">
                <label>{r.childEntity}</label>
                <select
                  value={rel.childKey}
                  onChange={(e) => updateRelation(i, 'childKey', e.target.value)}
                  disabled={isGenerating}
                >
                  {entities.map(e => (
                    <option key={e.templateKey} value={e.templateKey}>
                      {t.templateSelector.presets[e.templateKey]?.name || e.templateKey}
                    </option>
                  ))}
                </select>
              </div>
              <div className="field-row">
                <label>{r.childField}</label>
                <input
                  type="text"
                  value={rel.childField}
                  onChange={(e) => updateRelation(i, 'childField', e.target.value)}
                  placeholder="e.g. pessoa_id"
                  disabled={isGenerating}
                />
              </div>
              <button
                className="btn-icon-sm"
                onClick={() => removeRelation(i)}
                title={r.removeEntity}
              >
                ✕
              </button>
            </div>
            <div className="relation-cardinality">
              {r.cardinality} {r.oneToMany}
            </div>
          </div>
        ))}

        {relations.length === 0 && (
          <p className="no-relations">{r.validation.noRelations}</p>
        )}

        {ambiguousWarning && (
          <p className="ambiguous-warning">{ambiguousWarning}</p>
        )}

        <button
          className="btn-add-relation"
          onClick={addManualRelation}
          disabled={isGenerating || entities.length < 2}
        >
          + {r.relationship}
        </button>
      </div>

      <div className="relational-controls">
        <div className="control-group range-group">
          <label>{r.summary}</label>
        </div>
        <div className="control-group range-group">
          <label>{t.dataGenerator.nullRate.replace('{value}', String(nullRate))}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={nullRate}
            onChange={(e) => setNullRate(Number(e.target.value))}
            disabled={isGenerating}
            className="range-input"
          />
        </div>
        <div className="control-group range-group">
          <label>{t.dataGenerator.errorRate.replace('{value}', String(errorRate))}</label>
          <input
            type="range"
            min="0"
            max="50"
            value={errorRate}
            onChange={(e) => setErrorRate(Number(e.target.value))}
            disabled={isGenerating}
            className="range-input"
          />
        </div>
        <div className="control-group">
          <label>Seed (opcional)</label>
          <input
            type="number"
            placeholder="Ex: 12345"
            value={seed}
            onChange={(e) => setSeed(e.target.value)}
            disabled={isGenerating}
          />
        </div>
      </div>

      <div className="relational-summary">
        {entities.map((entity, i) => {
          const rel = relations.find(r => r.childKey === entity.templateKey);
          const templateName = t.templateSelector.presets[entity.templateKey]?.name || entity.templateKey;
          if (rel) {
            return (
              <div key={i} className="summary-line">
                {r.entitySummaryFK
                  .replace('{template}', templateName)
                  .replace('{count}', String(entity.recordCount))
                  .replace('{fk}', rel.childField)
                  .replace('{parent}', rel.parentKey)
                  .replace('{pk}', rel.parentField)}
              </div>
            );
          }
          const preset = PRESETS[entity.templateKey];
          return (
            <div key={i} className="summary-line">
              {r.entitySummary
                .replace('{template}', templateName)
                .replace('{count}', String(entity.recordCount))
                .replace('{pk}', preset?.primaryKey || 'id')}
            </div>
          );
        })}
      </div>

      <button
        className="btn-generate"
        onClick={handleGenerate}
        disabled={!canGenerate}
      >
        {isGenerating ? r.generating : r.generate}
      </button>
    </div>
  );
}
