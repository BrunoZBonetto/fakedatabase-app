import { useState, useMemo, type ReactNode } from 'react';
import { useToast } from './Toast';
import { toSQL, toXML, toXLSX, toYAML } from '../utils/exporters';
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
  const pagedData = useMemo(
    () => data.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE),
    [data, page]
  );

  const jsonOutput = useMemo(() => JSON.stringify(data, null, 2), [data]);

  const csvOutput = useMemo(() => {
    if (!data.length || !fields.length) return '';
    const header = fields.map(escapeCSVValue).join(',');
    const rows = data.map((row) =>
      fields.map((f) => escapeCSVValue(row[f])).join(',')
    );
    return [header, ...rows].join('\n');
  }, [data, fields]);

  const sqlOutput = useMemo(() => {
    const schema = {};
    for (const cf of customFields) {
      if (cf.name?.trim() && cf.type) {
        schema[cf.name.trim()] = { type: cf.type, size: cf.size };
      }
    }
    return toSQL(data, schema);
  }, [data, customFields]);
  const xmlOutput = useMemo(() => toXML(data), [data]);
  const yamlOutput = useMemo(() => toYAML(data), [data]);

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
    const buffer = toXLSX(data, fields);
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
                    {fields.map((f) => <th key={f}>{formatFieldLabel(f, fieldLabels)}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {pagedData.map((row, i) => (
                    <tr key={page * PAGE_SIZE + i}>
                      <td className="row-index">{page * PAGE_SIZE + i + 1}</td>
                      {fields.map((f) => (
                        <td key={f}>{String(row[f] ?? '')}</td>
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
