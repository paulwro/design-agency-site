import './PageHero.css';

/**
 * PageHero — Figma 1378:1452 (Studio) / 1388:1468 (Engagements)
 *
 * Shared interior-page hero. A 3-column grid where the content occupies the
 * first two columns, leaving the third as deliberate open space.
 */
export default function PageHero({ headline, lede, cta, inset = 'default' }) {
  return (
    <section className={`page-hero container${inset === 'wide' ? ' page-hero--wide' : ''}`}>
      <div className="page-hero__grid">
        <div className="page-hero__content">
          <div className="page-hero__text">
            <h1 className="page-hero__headline">{headline}</h1>
            {lede && <p className="page-hero__lede">{lede}</p>}
          </div>
          {cta && (
            <a className="btn-primary" href={cta.href}>
              {cta.label}
            </a>
          )}
        </div>
      </div>
    </section>
  );
}
