import { RevealGroup, RevealItem } from '../blocks/Reveal';
import './PageHero.css';

/**
 * PageHero — Figma 1378:1452 (Studio) / 1388:1468 (Engagements) / 1725:1329 (Work)
 *
 * Shared interior-page hero: a centred column, max 760 wide, headline over
 * lede over the optional button. It enters the way the Home hero does — the
 * three pieces rise in turn.
 */
export default function PageHero({ headline, lede, cta, inset = 'default' }) {
  return (
    <RevealGroup as="section" className={`page-hero container${inset === 'wide' ? ' page-hero--wide' : ''}`}>
      <div className="page-hero__content">
        <div className="page-hero__text">
          <RevealItem as="h1" className="page-hero__headline">
            {headline}
          </RevealItem>
          {lede && (
            <RevealItem as="p" className="page-hero__lede">
              {lede}
            </RevealItem>
          )}
        </div>
        {cta && (
          <RevealItem>
            <a className="btn-primary" href={cta.href}>
              {cta.label}
            </a>
          </RevealItem>
        )}
      </div>
    </RevealGroup>
  );
}
