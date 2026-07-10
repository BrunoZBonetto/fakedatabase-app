import { useState } from 'react';
import FakeDataGenerator from '../engine/generator';
import { useLocale } from '../hooks/useLocale';

const FIELDS = FakeDataGenerator.FIELDS;

// Fallback: transforma camelCase em "Camel Case" quando não há tradução mapeada
// eslint-disable-next-line react-refresh/only-export-components
export function formatFieldLabel(field, fields) {
  if (fields[field]) return fields[field];
  return field
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, (c) => c.toUpperCase())
    .trim();
}

export default function FieldSelector({ selectedFields, onFieldsChange }) {
  const { t } = useLocale();
  const [openCategory, setOpenCategory] = useState<string | null>('nome');
  const [search, setSearch] = useState('');
  const [isOpen, setIsOpen] = useState(true);

  const labels = t.fieldSelector.fields;
  const categories = t.fieldSelector.categories;

  const formatLabel = (field) => formatFieldLabel(field, labels);

  const filtered = Object.entries(FIELDS).map(([cat, fields]) => {
    if (!search.trim()) return [cat, fields] as const;
    const matching = fields.filter(f =>
      formatLabel(f).toLowerCase().includes(search.toLowerCase())
    );
    return [cat, matching] as const;
  }).filter(([, fields]) => fields.length > 0);

  const isFiltering = search.trim().length > 0;

  const toggleField = (field) => {
    if (selectedFields.includes(field)) {
      onFieldsChange(selectedFields.filter((f) => f !== field));
    } else {
      onFieldsChange([...selectedFields, field]);
    }
  };

  const toggleAll = (fields) => {
    const allSelected = fields.every((f) => selectedFields.includes(f));
    if (allSelected) {
      onFieldsChange(selectedFields.filter((f) => !fields.includes(f)));
    } else {
      const newFields = [...new Set([...selectedFields, ...fields])];
      onFieldsChange(newFields);
    }
  };

  return (
    <div className="field-selector">
      <div className="selector-header" onClick={() => setIsOpen(!isOpen)}>
        <span className="arrow">{isOpen ? '▼' : '▶'}</span>
        <h3>{t.fieldSelector.title}</h3>
        <span className="selected-count-badge">{selectedFields.length}</span>
      </div>

      {isOpen && (
        <>
          <div className="selector-toolbar">
            <input
              type="search"
              placeholder={t.fieldSelector.search}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="field-search"
            />
            {selectedFields.length > 0 && (
              <button
                className="btn-clear-all"
                onClick={() => onFieldsChange([])}
              >
                {t.fieldSelector.clearAll}
              </button>
            )}
          </div>

          {filtered.map(([category, fields]) => {
            const isCatOpen = isFiltering || openCategory === category;
            const allSelected = fields.every((f) => selectedFields.includes(f));
            const selectedInCategory = fields.filter((f) => selectedFields.includes(f)).length;
            const categoryInfo = categories[category] || { icon: '📁', label: category };

            return (
              <div key={category} className="category-group">
                <div className="category-header" onClick={() => setOpenCategory(isCatOpen ? null : category)}>
                  <span className="arrow">{isCatOpen ? '−' : '+'}</span>
                  <span className="category-name">
                    {categoryInfo.icon} {categoryInfo.label}
                  </span>
                  <button
                    className="btn-toggle-all"
                    onClick={(e) => { e.stopPropagation(); toggleAll(fields); }}
                    aria-label={allSelected ? t.fieldSelector.deselectAll : t.fieldSelector.selectAll}
                  >
                    {allSelected ? t.fieldSelector.deselectAll : t.fieldSelector.selectAll}
                  </button>
                  <span className="category-count">{selectedInCategory}/{fields.length}</span>
                </div>
                {isCatOpen && (
                  <div className="field-grid">
                    {fields.map((field) => (
                      <label key={field} className="field-chip">
                        <input
                          type="checkbox"
                          checked={selectedFields.includes(field)}
                          onChange={() => toggleField(field)}
                        />
                        <span>{formatLabel(field)}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </>
      )}
    </div>
  );
}
