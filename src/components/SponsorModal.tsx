import { useEffect, useRef } from 'react';
import { SPONSOR_CONFIG } from './SponsorBanner';
import { useLocale } from '../hooks/useLocale';
import { useAnalytics } from '../utils/analytics';

export default function SponsorModal({ onClose }: { onClose: () => void }) {
  const { t } = useLocale();
  const analytics = useAnalytics();
  const sm = t.sponsorModal;
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [onClose]);

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (e.target === overlayRef.current) onClose();
  };

  return (
    <div className="modal-overlay" ref={overlayRef} onClick={handleOverlayClick}>
      <div className="modal-content">
        <button className="modal-close" onClick={onClose} aria-label={sm.skip}>&times;</button>
        <div className="modal-body">
          <p className="modal-emoji">❤️</p>
          <p className="modal-text">{sm.text}</p>
          <a
            href={SPONSOR_CONFIG.githubSponsors}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-sponsor modal-btn"
            onClick={() => analytics.trackSponsorClick()}
          >
            {sm.button}
          </a>
          <button className="modal-skip" onClick={onClose}>{sm.skip}</button>
        </div>
      </div>
    </div>
  );
}
