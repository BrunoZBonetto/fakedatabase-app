import { useState, useRef } from 'react';
import FakeDataGenerator from '../engine/generator';
import FieldSelector, { formatFieldLabel } from './FieldSelector';
import SortableFields from './SortableFields';
import OutputPreview from './OutputPreview';
import TemplateSelector from './TemplateSelector';
import CustomFieldsEditor from './CustomFieldsEditor';
import AdUnit from './AdUnit';
import { useToast } from './Toast';
import { useTheme } from '../utils/useTheme';
import { useLocale } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

const MAX_RECORDS = 5000;
const WORKER_THRESHOLD = 1000;

export default function DataGenerator() {
  const { t, locale, toggleLocale } = useLocale();
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

  const outputFields = [
    ...selectedFields,
    ...customFields.filter((f) => f.name?.trim()).map((f) => f.name.trim()),
  ];

  const handleToggleLocale = () => {
    const next = locale === 'pt-BR' ? 'en-US' : 'pt-BR';
    analytics.trackLocaleToggle(next);
    toggleLocale();
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
            <span className="header-logo" aria-hidden="true">🗄️</span>
            <h1>Fake Database</h1>
          </div>
          <div className="header-actions">
            <button className="btn-icon" onClick={handleToggleLocale} aria-label="Toggle locale" title={locale === 'pt-BR' ? 'Switch to English' : 'Mudar para Português'}>
              {locale === 'pt-BR' ? '🇺🇸' : '🇧🇷'}
            </button>
            <button className="btn-icon" onClick={handleToggleTheme} aria-label="Toggle theme" title={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              {theme === 'dark' ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
        <p className="header-tagline">{t.app.subtitle}</p>
      </header>

      <div className="main-layout">
        <aside className="sidebar" role="complementary" aria-label="Settings">
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
        </aside>

        <main className="content" role="main" aria-label="Results">
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
        </main>
      </div>

    </div>
  );
}
