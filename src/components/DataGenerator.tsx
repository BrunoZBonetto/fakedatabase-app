import { useState, useRef } from 'react';
import FakeDataGenerator from '../engine/generator';
import { RelationalGenerator, type RelationalConfig, type EntityRelation } from '../engine/relational-generator';
import FieldSelector, { formatFieldLabel } from './FieldSelector';
import SortableFields from './SortableFields';
import OutputPreview from './OutputPreview';
import RelationalConfigPanel from './RelationalConfig';
import RelationalOutput from './RelationalOutput';
import TemplateSelector from './TemplateSelector';
import CustomFieldsEditor from './CustomFieldsEditor';
import AdUnit from './AdUnit';
import { useToast } from './Toast';
import { useTheme } from '../utils/useTheme';
import { useLocale, LOCALE_OPTIONS } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

const MAX_RECORDS = 5000;
const WORKER_THRESHOLD = 1000;

export default function DataGenerator() {
  const { t, locale, setLocale } = useLocale();
  const analytics = useAnalytics();
  const generatorRef = useRef(new FakeDataGenerator(0, 0, locale));
  generatorRef.current.locale = locale;

  const [selectedFields, setSelectedFields] = useState([
    'id', 'fullName', 'email', 'phone', 'city', 'state', 'profession', 'company', 'salary'
  ]);
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const [customFields, setCustomFields] = useState<any[]>([]);
  const [recordCount, setRecordCount] = useState(10);
  const [nullRate, setNullRate] = useState(0);
  const [errorRate, setErrorRate] = useState(0);
  const [data, setData] = useState<any[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState({ current: 0, total: 0 });
  const { addToast } = useToast();
  const { theme, toggleTheme } = useTheme();
  const dg = t.dataGenerator;

  const [mode, setMode] = useState<'simple' | 'relational'>('simple');
  const [relationalData, setRelationalData] = useState<Map<string, Record<string, unknown>[]>>(new Map());
  const [relationalEntityOrder, setRelationalEntityOrder] = useState<string[]>([]);
  const [relationalRelations, setRelationalRelations] = useState<EntityRelation[]>([]);
  const [relationalValidation, setRelationalValidation] = useState({ valid: true, errors: [] as string[], warnings: [] as string[] });

  const handleGenerate = () => {
    const validCustomFields = customFields.filter((f: any) => f.name?.trim());
    const generator = generatorRef.current;

    if (selectedFields.length === 0 && validCustomFields.length === 0) {
      alert(dg.selectField);
      return;
    }
    if (!recordCount || recordCount < 1) {
      alert(dg.invalidCount);
      return;
    }

    const customNames = validCustomFields.map((f: any) => f.name.trim());
    const hasDuplicate = customNames.some(
      (name, idx) => customNames.indexOf(name) !== idx || selectedFields.includes(name)
    );
    if (hasDuplicate) {
      alert(dg.duplicateFields);
      return;
    }

    setIsGenerating(true);
    analytics.trackGenerate(recordCount, selectedFields.length + validCustomFields.length, locale);
    addToast(dg.generatingToast.replace('{count}', String(recordCount)), 'info');

    if (recordCount >= WORKER_THRESHOLD) {
      const worker = new Worker(
        new URL('../engine/generator.worker.ts', import.meta.url),
        { type: 'module' }
      );

      worker.onmessage = (e) => {
        const msg = e.data;
        if (msg.type === 'progress') {
          setProgress({ current: msg.current, total: msg.total });
        } else if (msg.type === 'complete') {
          setData(msg.data);
          setIsGenerating(false);
          setProgress({ current: 0, total: 0 });
          addToast(dg.successToast.replace('{count}', String(recordCount)), 'success');
          worker.terminate();
        }
      };

      worker.postMessage({
        type: 'generate',
        fields: selectedFields,
        count: recordCount,
        customFields: validCustomFields,
        nullRate: nullRate / 100,
        errorRate: errorRate / 100,
        locale,
      });
    } else {
      setTimeout(() => {
        try {
          generator.nullRate = nullRate / 100;
          generator.errorRate = errorRate / 100;
          const generated = generator.generate(selectedFields, recordCount, validCustomFields);
          setData(generated);
          addToast(dg.successToast.replace('{count}', String(recordCount)), 'success');
        } finally {
          setIsGenerating(false);
        }
      }, 10);
    }
  };

  const handleRelationalGenerate = (config: RelationalConfig) => {
    setIsGenerating(true);
    addToast(t.relational.generating, 'info');

    setTimeout(() => {
      try {
        const rg = new RelationalGenerator({ ...config, locale });
        const result = rg.generate({ ...config, locale });
        setRelationalData(result.entities);
        setRelationalEntityOrder(config.entities.map(e => e.templateKey));
        setRelationalRelations(config.relations);
        setRelationalValidation(result.validation);
        if (result.validation.valid) {
          const total = config.entities.reduce((sum, e) => sum + e.recordCount, 0);
          addToast(t.relational.success.replace('{count}', String(total)), 'success');
        }
      } finally {
        setIsGenerating(false);
      }
    }, 10);
  };

  const outputFields = [
    ...selectedFields,
    ...customFields.filter((f) => f.name?.trim()).map((f) => f.name.trim()),
  ];

  const handleLocaleChange = (next: string) => {
    analytics.trackLocaleToggle(next);
    setLocale(next);
  };

  const handleToggleTheme = () => {
    analytics.trackThemeToggle(theme === 'dark' ? 'light' : 'dark');
    toggleTheme();
  };

  const formatLabel = (field: string) => formatFieldLabel(field, t.fieldSelector.fields);

  const genLabel = isGenerating && progress.total > 0
    ? dg.progress.replace('{current}', String(progress.current)).replace('{total}', String(progress.total))
    : isGenerating
      ? dg.generating
      : dg.generate;

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="header-row">
          <div className="header-brand">
            <img
              className="header-logo"
              src={theme === 'dark' ? '/logo-fakedatabase.png' : '/logo-fakedatabase-whitebackground.png'}
              alt="Fake Database"
            />
          </div>
          <a
            className="header-sponsor"
            href="https://github.com/sponsors/BrunoZBonetto"
            target="_blank"
            rel="noopener noreferrer"
          >
            {t.headerSponsor}
          </a>
          <div className="header-actions">
            <select
              className="locale-select"
              value={locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              aria-label="Select locale"
            >
              {LOCALE_OPTIONS.map((opt) => (
                <option key={opt.code} value={opt.code}>{opt.flag} {opt.label}</option>
              ))}
            </select>
            <button className="btn-icon" onClick={handleToggleTheme} aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </header>

      <div className="mode-toggle">
        <button
          className={`mode-btn${mode === 'simple' ? ' active' : ''}`}
          onClick={() => setMode('simple')}
        >
          {t.relational.simple}
        </button>
        <button
          className={`mode-btn${mode === 'relational' ? ' active' : ''}`}
          onClick={() => setMode('relational')}
        >
          {t.relational.relational} <span className="beta-badge">Beta</span>
        </button>
      </div>

      <div className={`main-layout${mode === 'relational' ? ' relational-mode' : ''}`}>
        <aside className="sidebar" role="complementary" aria-label="Settings">
          {mode === 'simple' && (
            <>
              <TemplateSelector
                onApply={(fields, key) => { setSelectedFields(fields); setSelectedTemplate(key); }}
                selectedTemplate={selectedTemplate}
              />
              <SortableFields
                fields={selectedFields}
                formatLabel={formatLabel}
                onReorder={(reordered) => setSelectedFields(reordered)}
                onRemove={(field) => setSelectedFields(selectedFields.filter(f => f !== field))}
              />
              <FieldSelector
                selectedFields={selectedFields}
                onFieldsChange={setSelectedFields}
              />
            </>
          )}
        </aside>

        <main className="content" role="main" aria-label="Results">
          {mode === 'simple' ? (
            <>
              <div className="controls">
                <div className="control-group">
                  <label htmlFor="recordCount">{dg.records}</label>
                  <input
                    id="recordCount"
                    type="number"
                    min="1"
                    max={MAX_RECORDS}
                    value={recordCount}
                    onChange={(e) => setRecordCount(Math.min(Number(e.target.value), MAX_RECORDS))}
                    disabled={isGenerating}
                  />
                  <span className="record-count-hint">{dg.maxRecords.replace('{max}', String(MAX_RECORDS))}</span>
                </div>
                <div className="control-group range-group">
                  <label htmlFor="nullRate">{dg.nullRate.replace('{value}', String(nullRate))}</label>
                  <input
                    id="nullRate"
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
                  <label htmlFor="errorRate">{dg.errorRate.replace('{value}', String(errorRate))}</label>
                  <input
                    id="errorRate"
                    type="range"
                    min="0"
                    max="50"
                    value={errorRate}
                    onChange={(e) => setErrorRate(Number(e.target.value))}
                    disabled={isGenerating}
                    className="range-input"
                  />
                </div>

                <button
                  className="btn-generate"
                  onClick={handleGenerate}
                  disabled={isGenerating}
                >
                  {genLabel}
                </button>
                {isGenerating && progress.total > 0 && (
                  <div className="progress-bar">
                    <div
                      className="progress-fill"
                      style={{ width: `${(progress.current / progress.total) * 100}%` }}
                    />
                  </div>
                )}
              </div>

              <AdUnit placement="content" />
              <OutputPreview data={data} fields={outputFields} customFields={customFields} aria-live="polite" />

              <CustomFieldsEditor
                customFields={customFields}
                onCustomFieldsChange={setCustomFields}
              />
            </>
          ) : (
            <>
              <RelationalConfigPanel onGenerate={handleRelationalGenerate} isGenerating={isGenerating} />
              {relationalEntityOrder.length > 0 && (
                <RelationalOutput
                  entities={relationalData}
                  entityOrder={relationalEntityOrder}
                  relations={relationalRelations}
                  validation={relationalValidation}
                />
              )}
            </>
          )}
        </main>
      </div>

    </div>
  );
}
