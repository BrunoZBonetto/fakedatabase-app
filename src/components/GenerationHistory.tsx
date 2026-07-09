import { useState, useEffect, forwardRef, useImperativeHandle, useCallback } from 'react';

const STORAGE_KEY = 'fdg_history';
const MAX_ITEMS = 10;

interface HistoryEntry {
  id: number;
  fields: string[];
  count: number;
  date: string;
}

interface GenerationHistoryProps {
  onLoad: (fields: string[], count: number) => void;
}

const GenerationHistory = forwardRef<{ saveToHistory: (fields: string[], count: number) => void }, GenerationHistoryProps>(({ onLoad }, ref) => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      setHistory(saved);
    } catch {
      setHistory([]);
    }
  }, []);

  const saveToHistory = useCallback((fields, count) => {
    setHistory((prev) => {
      const entry = {
        id: Date.now(),
        fields,
        count,
        date: new Date().toLocaleString('pt-BR')
      };
      const updated = [entry, ...prev].slice(0, MAX_ITEMS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }, []);

  useImperativeHandle(ref, () => ({
    saveToHistory,
  }));

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem(STORAGE_KEY);
  };

  if (!history.length) {
    return (
      <div className="history-panel">
        <h3>🕒 Histórico</h3>
        <p className="hint">Suas últimas gerações aparecerão aqui</p>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <div className="history-header">
        <h3>🕒 Histórico</h3>
        <button className="btn-clear" onClick={clearHistory}>Limpar</button>
      </div>
      <ul className="history-list">
        {history.map((item) => (
          <li key={item.id} className="history-item" onClick={() => onLoad(item.fields, item.count)}>
            <div className="history-meta">
              <strong>{item.count}</strong> registros · <strong>{item.fields.length}</strong> campos
            </div>
            <div className="history-date">{item.date}</div>
            <div className="history-fields">
              {item.fields.slice(0, 5).join(', ')}
              {item.fields.length > 5 && '...'}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default GenerationHistory;
