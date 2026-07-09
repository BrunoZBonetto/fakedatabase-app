import { useState, type FormEvent } from 'react';
import { isSponsor, setSponsorKey, clearSponsorKey } from '../utils/sponsor';
import { useLocale } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

// eslint-disable-next-line react-refresh/only-export-components
export const SPONSOR_CONFIG = {
  githubSponsors: 'https://github.com/sponsors/BrunoZBonetto',
};

export default function SponsorBanner() {
  const { t } = useLocale();
  const analytics = useAnalytics();
  const sb = t.sponsorBanner;
  const [sponsor, setSponsor] = useState(isSponsor());
  const [keyInput, setKeyInput] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (setSponsorKey(keyInput)) {
      setSponsor(true);
      setKeyInput('');
      setError(false);
    } else {
      setError(true);
    }
  };

  if (sponsor) {
    return (
      <div className="sponsor-banner sponsor-banner--active">
        <p className="sponsor-text">{sb.thanks}</p>
        <button
          className="btn-sponsor-clear"
          onClick={() => { clearSponsorKey(); setSponsor(false); }}
        >
          {sb.removeKey}
        </button>
      </div>
    );
  }

  return (
    <div className="sponsor-banner">
      <p className="sponsor-text">{sb.freeText}</p>
      <div className="sponsor-links">
        <a
          href={SPONSOR_CONFIG.githubSponsors}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sponsor"
          onClick={() => analytics.trackSponsorClick()}
        >
          {sb.buttonText}
        </a>
      </div>
      <form className="sponsor-key-form" onSubmit={handleSubmit}>
        <label className="sponsor-key-label">{sb.alreadySponsor}</label>
        <div className="sponsor-key-row">
          <input
            type="text"
            className="sponsor-key-input"
            placeholder={sb.placeholder}
            value={keyInput}
            onChange={(e) => { setKeyInput(e.target.value); setError(false); }}
          />
          <button type="submit" className="btn-sponsor-key">{sb.ok}</button>
        </div>
        {error && <span className="sponsor-key-error">{sb.invalidKey}</span>}
      </form>
    </div>
  );
}
