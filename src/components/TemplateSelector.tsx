import { useState } from 'react';
import { PRESETS } from '../templates/presets';
import { useLocale } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

export default function TemplateSelector({ onApply }: { onApply: (fields: string[]) => void }) {
  const { t } = useLocale();
  const analytics = useAnalytics();
  const ts = t.templateSelector;
  const [open, setOpen] = useState(false);

  return (
    <div className="template-selector">
      <div className="collapsible-header" onClick={() => setOpen(!open)}>
        <span className="arrow">{open ? '▼' : '▶'}</span>
        <span>{ts.title}</span>
        <span className="template-count-badge">{Object.keys(PRESETS).length}</span>
      </div>
      {open && (
        <div className="template-grid" style={{ marginTop: 8 }}>
          {Object.entries(PRESETS).map(([key, preset]) => {
            const info = ts.presets[key] || { name: key, desc: '' };
            return (
              <button
                key={key}
                className="template-card"
                onClick={() => { onApply(preset.fields); analytics.trackTemplateApply(key); }}
                title={info.desc}
              >
                <span className="template-name">{info.name}</span>
                <span className="template-desc">{info.desc}</span>
                <span className="template-count">{ts.fields.replace('{count}', String(preset.fields.length))}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
