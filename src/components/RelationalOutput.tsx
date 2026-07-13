import { useState } from 'react';
import { useLocale } from '../hooks/useLocale';
import {
  toRelationalSQL,
  toRelationalJSON,
  toRelationalXLSX,
  toRelationalZIP,
} from '../utils/relational-exporters';
import type { EntityRelation } from '../engine/relational-generator';

interface Props {
  entities: Map<string, Record<string, unknown>[]>;
  entityOrder: string[];
  relations: EntityRelation[];
  validation: { valid: boolean; errors: string[]; warnings: string[] };
}

export default function RelationalOutput({ entities, entityOrder, relations, validation }: Props) {
  const { t } = useLocale();
  const r = t.relational;
  const [activeTab, setActiveTab] = useState(entityOrder[0] || '');
  const [page, setPage] = useState(0);
  const [exporting, setExporting] = useState(false);

  const PAGE_SIZE = 50;
  const activeData = entities.get(activeTab) || [];
  const activeColumns = activeData.length > 0 ? Object.keys(activeData[0]) : [];
  const totalPages = Math.ceil(activeData.length / PAGE_SIZE);
  const pageData = activeData.slice(page * PAGE_SIZE, (page + 1) * PAGE_SIZE);

  const downloadBlob = (data: ArrayBuffer | Blob, filename: string, mimeType: string) => {
    const blob = data instanceof Blob ? data : new Blob([data], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportSQL = () => {
    const sql = toRelationalSQL(entities, entityOrder, relations);
    const blob = new Blob([sql], { type: 'text/sql' });
    downloadBlob(blob, 'relational_data.sql', 'text/sql');
  };

  const handleExportJSON = () => {
    const json = toRelationalJSON(entities, entityOrder);
    const blob = new Blob([json], { type: 'application/json' });
    downloadBlob(blob, 'relational_data.json', 'application/json');
  };

  const handleExportXLSX = () => {
    const buf = toRelationalXLSX(entities, entityOrder);
    downloadBlob(buf, 'relational_data.xlsx', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet');
  };

  const handleExportZIP = async () => {
    setExporting(true);
    try {
      const blob = await toRelationalZIP(entities, entityOrder, relations);
      downloadBlob(blob, 'relational_data.zip', 'application/zip');
    } finally {
      setExporting(false);
    }
  };

  const handleExportCSV = () => {
    for (const key of entityOrder) {
      const data = entities.get(key) || [];
      if (data.length === 0) continue;
      const columns = Object.keys(data[0]);
      const header = columns.join(',');
      const rows = data.map(row =>
        columns.map(col => {
          const v = row[col];
          if (v === null || v === undefined) return '';
          const s = String(v);
          return s.includes(',') || s.includes('"') || s.includes('\n')
            ? '"' + s.replace(/"/g, '""') + '"'
            : s;
        }).join(',')
      );
      const csv = header + '\n' + rows.join('\n');
      const blob = new Blob([csv], { type: 'text/csv' });
      downloadBlob(blob, `${key}.csv`, 'text/csv');
    }
  };

  if (entityOrder.length === 0) return null;

  return (
    <div className="relational-output">
      {(!validation.valid || validation.warnings.length > 0) && (
        <div className="validation-banner">
          {validation.errors.map((err, i) => (
            <div key={`e${i}`} className="validation-error">⚠️ {err}</div>
          ))}
          {validation.warnings.map((warn, i) => (
            <div key={`w${i}`} className="validation-warning">ℹ️ {warn}</div>
          ))}
        </div>
      )}

      <div className="entity-tabs">
        {entityOrder.map(key => {
          const preset = t.templateSelector.presets[key];
          const count = entities.get(key)?.length || 0;
          return (
            <button
              key={key}
              className={`entity-tab${activeTab === key ? ' active' : ''}`}
              onClick={() => { setActiveTab(key); setPage(0); }}
            >
              {preset?.name || key} ({count})
            </button>
          );
        })}
      </div>

      <div className="output-table-wrapper">
        <table className="output-table">
          <thead>
            <tr>
              {activeColumns.map(col => (
                <th key={col}>{col}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {pageData.map((row, i) => (
              <tr key={i}>
                {activeColumns.map(col => (
                  <td key={col}>{String(row[col] ?? '')}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => setPage(p => Math.max(0, p - 1))} disabled={page === 0}>
            ←
          </button>
          <span>{page + 1} / {totalPages}</span>
          <button onClick={() => setPage(p => Math.min(totalPages - 1, p + 1))} disabled={page >= totalPages - 1}>
            →
          </button>
        </div>
      )}

      <div className="export-buttons">
        <button className="btn-export" onClick={handleExportSQL}>{r.output.exportSQL}</button>
        <button className="btn-export" onClick={handleExportJSON}>{r.output.exportJSON}</button>
        <button className="btn-export" onClick={handleExportXLSX}>{r.output.exportXLSX}</button>
        <button className="btn-export" onClick={handleExportCSV}>{r.output.exportCSV}</button>
        <button className="btn-export" onClick={handleExportZIP} disabled={exporting}>
          {exporting ? '⏳...' : r.output.exportZIP}
        </button>
      </div>
    </div>
  );
}
