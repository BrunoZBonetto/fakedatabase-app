import { useLocale } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

export default function SponsorBanner() {
  const { t } = useLocale();
  const analytics = useAnalytics();
  const sb = t.sponsorBanner;

  return (
    <div className="sponsor-banner">
      <p className="sponsor-text">{sb.freeText}</p>
      <div className="sponsor-links">
        <a
          href="https://github.com/sponsors/BrunoZBonetto"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-sponsor"
          onClick={() => analytics.trackSponsorClick()}
        >
          {sb.buttonText}
        </a>
      </div>
    </div>
  );
}
