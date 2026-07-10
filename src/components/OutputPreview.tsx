import { useState, useMemo, type ReactNode } from 'react';
import { useToast } from './Toast';
import { toSQL, toXML, toXLSX, toYAML, FIELD_TO_SQL } from '../utils/exporters';
import { formatFieldLabel } from './FieldSelector';
import SponsorModal from './SponsorModal';
import { useLocale } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

const PAGE_SIZE = 100;

function renderHTML(text: string): ReactNode {
  const parts = text.split(/(<strong>.*?<\/strong>)/g);
  return parts.map((part, i) => {
    if (part.startsWith('<strong>')) {
      return <strong key={i}>{part.slice(8, -9)}</strong>;
    }
    return part;
  });
}

function escapeCSVValue(val: unknown) {
  const s = String(val ?? '');
  if (/[",\n]/.test(s)) return `"${s.replace(/"/g, '""')}"`;
  return s;
}

function formatNumber(val: unknown, loc: string): unknown {
  if (typeof val !== 'number' || Number.isInteger(val)) return val;
  const str = val.toFixed(2);
  return loc === 'pt-BR' ? str.replace('.', ',') : str;
}

function toCamelCaseKey(label: string): string {
  const normalized = label.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const cleaned = normalized.replace(/[^a-zA-Z0-9\s]+/g, ' ');
  const words = cleaned.trim().split(/\s+/).filter(Boolean);
  if (!words.length) return label;
  return words[0].toLowerCase() + words.slice(1).map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join('');
}

export default function OutputPreview({ data, fields, customFields = [] }: { data: Record<string, unknown>[]; fields: string[]; customFields?: any[] }) {
  const { t, locale } = useLocale();
  const analytics = useAnalytics();
  const [format, setFormat] = useState('table');
  const [copied, setCopied] = useState(false);
  const [showSponsorModal, setShowSponsorModal] = useState(false);
  const { addToast } = useToast();
  const [page, setPage] = useState(0);
  const op = t.outputPreview;
  const fieldLabels = t.fieldSelector.fields;

  const formats = [
    { id: 'table', label: op.table },
    { id: 'json', label: op.json },
    { id: 'csv', label: op.csv },
    { id: 'sql', label: op.sql },
    { id: 'xml', label: op.xml },
    { id: 'yaml', label: op.yaml },
  ];

  const totalPages = Math.ceil(data.length / PAGE_SIZE);

  const localizedFields = useMemo(
    () => fields.map(f => toCamelCaseKey(formatFieldLabel(f, fieldLabels))),
    [fields, fieldLabels]
  );

  const localizedData = useMemo(
    () => data.map(row => {
      const locRow: Record<string, unknown> = {};
      fields.forEach(f => {
        locRow[toCamelCaseKey(formatFieldLabel(f, fieldLabels))] = formatNumber(row[f], locale);
      });
      return locRow;
    }),
    [data, fields, fieldLabels, locale]
  );

  const localizedDataRawNumbers = useMemo(
    () => data.map(row => {
      const locRow: Record<string, unknown> = {};
      fields.forEach(f => {
        locRow[toCamelCaseKey(formatFieldLabel(f, fieldLabels))] = row[f];
      });
      return locRow;
    }),
    [data, fields, fieldLabels]
  );

  const pagedData = useMemo(
    () => data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [data, page]
  );

  const jsonOutput = useMemo(() => JSON.stringify(localizedDataRawNumbers, null, 2), [localizedDataRawNumbers]);

  const csvOutput = useMemo(() => {
    if (!data.length || !fields.length) return '';
    const header = localizedFields.map(escapeCSVValue).join(',');
    const rows = localizedData.map((row) =>
      localizedFields.map((f) => escapeCSVValue(row[f])).join(',')
    );
    return [header, ...rows].join('\n');
  }, [localizedData, localizedFields, data, fields]);

  const sqlOutput = useMemo(() => {
    const schema: Record<string, { type: string; size?: number }> = {};
    for (const cf of customFields) {
      if (cf.name?.trim() && cf.type) {
        schema[toCamelCaseKey(formatFieldLabel(cf.name.trim(), fieldLabels))] = { type: cf.type, size: cf.size };
      }
    }
    for (const f of fields) {
      const label = toCamelCaseKey(formatFieldLabel(f, fieldLabels));
      if (!schema[label] && FIELD_TO_SQL[f]) {
        schema[label] = FIELD_TO_SQL[f];
      }
    }
    const tableName = locale === 'en-US' ? 'generated_data' : 'dados_gerados';
    return toSQL(localizedData, schema, tableName);
  }, [localizedData, customFields, fields, fieldLabels, locale]);
  const xmlOutput = useMemo(() => {
    const rootName = locale === 'en-US' ? 'records' : 'registros';
    const itemName = locale === 'en-US' ? 'record' : 'registro';
    return toXML(localizedData, rootName, itemName);
  }, [localizedData, locale]);
  const yamlOutput = useMemo(() => {
    const itemName = locale === 'en-US' ? 'record' : 'registro';
    return toYAML(localizedData, itemName);
  }, [localizedData, locale]);

  const getContent = () => {
    switch (format) {
      case 'json': return jsonOutput;
      case 'csv': return csvOutput;
      case 'sql': return sqlOutput;
      case 'xml': return xmlOutput;
      case 'yaml': return yamlOutput;
      default: return '';
    }
  };

  const getFileName = (ext: string) => locale === 'en-US' ? `data.${ext}` : `dados.${ext}`;

  const getMimeType = () => ({
    json: 'application/json',
    csv: 'text/csv',
    sql: 'application/sql',
    xml: 'application/xml',
    yaml: 'text/yaml'
  }[format] || 'text/plain');

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      addToast(op.copiedToast, 'success');
      analytics.trackCopy();
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const withSponsorModal = (fn: () => void) => () => {
    setShowSponsorModal(true);
    fn();
  };

  const downloadFile = (content: string, filename: string, type: string) => {
    analytics.trackDownload(format);
    const blob = new Blob([content], { type });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    URL.revokeObjectURL(url);
  };

  const downloadExcel = () => {
    analytics.trackDownload('xlsx');
    const sheetName = locale === 'en-US' ? 'Data' : 'Dados';
    const buffer = toXLSX(localizedDataRawNumbers, localizedFields, sheetName);
    const blob = new Blob([buffer], { type: 'application/octet-stream' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = locale === 'en-US' ? 'data.xlsx' : 'dados.xlsx';
    link.click();
    URL.revokeObjectURL(url);
  };

  if (!data.length) {
    return (
      <div className="output-preview empty" role="region" aria-label={op.generated}>
        <p>{renderHTML(op.empty)}</p>
        <p className="export-hint">{renderHTML(op.exportHint)}</p>
      </div>
    );
  }

  return (
    <div className="output-preview" role="region" aria-label={op.generated}>
      <div className="output-header">
        <h3>{op.generated.replace('{count}', String(data.length))}</h3>
        <div className="output-actions">
          {formats.map((f) => (
            <button
              key={f.id}
              className={`btn-format ${format === f.id ? 'active' : ''}`}
              onClick={() => setFormat(f.id)}
            >
              {f.label}
            </button>
          ))}

          <button className="btn-download" onClick={withSponsorModal(downloadExcel)} title={op.excel} aria-label={op.excel}>
            {op.excel}
          </button>

          <button
            className="btn-copy"
            onClick={withSponsorModal(() => copyToClipboard(format === 'table' ? csvOutput : getContent()))}
            aria-label={op.copy}
          >
            {copied ? op.copied : op.copy}
          </button>

          <button
            className="btn-download"
            onClick={withSponsorModal(() => downloadFile(getContent(), getFileName(format), getMimeType()))}
            aria-label={`${op.download} ${format.toUpperCase()}`}
          >
            {op.download}
          </button>
        </div>

        {showSponsorModal && <SponsorModal onClose={() => setShowSponsorModal(false)} />}
      </div>

      <div className="output-content">
        {format === 'table' && (
          <>
            <div className="table-wrapper">
              <table>
                <thead>
                  <tr>
                    <th>#</th>
                    {localizedFields.map((label) => <th key={label}>{label}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, i) => (
                    <tr key={page * PAGE_SIZE + i}>
                      <td className="row-index">{page * PAGE_SIZE + i + 1}</td>
                      {fields.map((f) => (
                        <td key={f}>{String(formatNumber(row[f], locale) ?? '')}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <button disabled={page === 0} onClick={() => setPage(p => p - 1)}>{op.previous}</button>
                <span>{op.page.replace('{page}', String(page + 1)).replace('{total}', String(totalPages))}</span>
                <button disabled={page >= totalPages - 1} onClick={() => setPage(p => p + 1)}>{op.next}</button>
              </div>
            )}
          </>
        )}

        {format !== 'table' && (
          <pre className="code-block">{getContent()}</pre>
        )}
      </div>
    </div>
  );
}
