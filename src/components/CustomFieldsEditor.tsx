import { useState } from 'react';
import { COLUMN_TYPES } from '../engine/generator';
import { useLocale } from '../hooks/useLocale';


let uid = 0;
let valueUid = 0;

export default function CustomFieldsEditor({ customFields, onCustomFieldsChange }) {
  const { t } = useLocale();
  const ce = t.customFieldsEditor;
  const [expanded, setExpanded] = useState(true);

  const addField = () => {
    uid++;
    onCustomFieldsChange([
      ...customFields,
      {
        id: `custom_${uid}`,
        name: '',
        type: 'VARCHAR',
        size: 64,
        useCustomValues: false,
        customValues: [{ id: `val_${++valueUid}`, text: '' }],
      },
    ]);
  };

  const updateField = (id, changes) => {
    onCustomFieldsChange(
      customFields.map((f) => {
        if (f.id !== id) return f;
        const updated = { ...f, ...changes };
        // Ao mudar o tipo, ajusta o tamanho para o primeiro sugerido daquele tipo
        if (changes.type && changes.type !== f.type) {
          const sizes = COLUMN_TYPES[changes.type].sizes;
          updated.size = sizes.length ? sizes[0] : null;
        }
        return updated;
      })
    );
  };

  const removeField = (id) => {
    onCustomFieldsChange(customFields.filter((f) => f.id !== id));
  };

  const toggleUseCustomValues = (field, checked) => {
    updateField(field.id, {
      useCustomValues: checked,
      customValues:
        field.customValues && field.customValues.length
          ? field.customValues
          : [{ id: `val_${++valueUid}`, text: '' }],
    });
  };

  const addValue = (field) => {
    valueUid++;
    updateField(field.id, {
      customValues: [...field.customValues, { id: `val_${valueUid}`, text: '' }],
    });
  };

  const updateValue = (field, valueId, text) => {
    updateField(field.id, {
      customValues: field.customValues.map((v) =>
        v.id === valueId ? { ...v, text } : v
      ),
    });
  };

  const removeValue = (field, valueId) => {
    const filtered = field.customValues.filter((v) => v.id !== valueId);
    updateField(field.id, {
      customValues: filtered.length ? filtered : [{ id: `val_${++valueUid}`, text: '' }],
    });
  };

  return (
    <div className="custom-fields-editor">
      <div
        className="category-header"
        onClick={() => setExpanded(!expanded)}
        style={{ cursor: 'pointer' }}
      >
        <span className="arrow">{expanded ? '▼' : '▶'}</span>
        <span className="category-name">{ce.title}</span>
        <button
          className="btn-toggle-all"
          onClick={(e) => { e.stopPropagation(); addField(); }}
        >
          {ce.add}
        </button>
      </div>

      {expanded && (
        <div className="custom-fields-list">
          {customFields.length === 0 && (
            <p className="hint">{ce.noValues}</p>
          )}

          {customFields.map((field) => {
            const typeInfo = COLUMN_TYPES[field.type];
            return (
              <div key={field.id} className="custom-field-block">
                <div className="custom-field-row">
                  <input
                    type="text"
                    placeholder={ce.columnName}
                    value={field.name}
                    onChange={(e) => updateField(field.id, { name: e.target.value })}
                    className="custom-field-name"
                  />

                  <select
                    value={field.type}
                    onChange={(e) => updateField(field.id, { type: e.target.value })}
                    className="custom-field-type"
                  >
                    {Object.keys(COLUMN_TYPES).map((key) => (
                      <option key={key} value={key}>{ce.columnTypes[key]}</option>
                    ))}
                  </select>

                  {typeInfo.hasSize && (
                    <select
                      value={field.size ?? typeInfo.sizes[0]}
                      onChange={(e) => updateField(field.id, { size: parseInt(e.target.value, 10) })}
                      className="custom-field-size"
                    >
                      {typeInfo.sizes.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  )}

                  <button
                    className="btn-remove-field"
                    onClick={() => removeField(field.id)}
                    title={ce.removeColumn}
                  >
                    ✕
                  </button>
                </div>

                <label className="custom-field-checkbox">
                  <input
                    type="checkbox"
                    checked={!!field.useCustomValues}
                    onChange={(e) => toggleUseCustomValues(field, e.target.checked)}
                  />
                  {ce.useValues}
                </label>

                {field.useCustomValues && (
                  <div className="custom-values-list">
                    {field.customValues.map((val) => (
                      <div key={val.id} className="custom-value-row">
                        <input
                          type="text"
                          placeholder={ce.possibleValues}
                          value={val.text}
                          onChange={(e) => updateValue(field, val.id, e.target.value)}
                          className="custom-value-input"
                        />
                        <button
                          className="btn-add-value"
                          onClick={() => addValue(field)}
                          title={ce.addValue}
                        >
                          +
                        </button>
                        <button
                          className="btn-remove-value"
                          onClick={() => removeValue(field, val.id)}
                          title={ce.removeValue}
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                    <p className="custom-field-hint">{ce.hint}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
