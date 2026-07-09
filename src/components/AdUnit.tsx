import { isSponsor } from '../utils/sponsor';
import { useLocale } from '../hooks/useLocale';

export default function AdUnit({ placement }: { placement: 'sidebar' | 'content' }) {
  const { t } = useLocale();
  const ad = t.adUnit;

  if (isSponsor()) return null;

  return (
    <div className={`ad-unit ad-unit--${placement}`}>
      <span className="ad-label">{ad.label}</span>
      <div className="ad-placeholder">
        <p>
          {ad.text}{' '}
          <a
            href="https://github.com/sponsors/BrunoZBonetto"
            target="_blank"
            rel="noopener noreferrer"
          >
            {ad.link}
          </a>{' '}
          {ad.suffix}
        </p>
      </div>
    </div>
  );
}
