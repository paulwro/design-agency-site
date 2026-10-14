import './FeaturedArticle.css';

/**
 * FeaturedArticle — Figma 902:1371 (inside Desktop/Menu Expanded)
 *
 * Hover: the card background eases in, then the bullet dot before "New"
 * scales up into a larger circle. That circle is the clipping mask — the
 * arrow slides left to right inside it and eases to a stop beside the word.
 *
 * Icon in Circle 623:819 · Icon_Arrow 43:6809 (chevron at rest, full arrow
 * on hover). The arrow is horizontal; the diagonal arrow belongs to PillLink.
 */
export default function FeaturedArticle({
  kicker = 'New',
  description = 'This is a description of the piece you’re promoting',
  media,
  href = '#',
}) {
  return (
    <a className="featured-article" href={href}>
      <figure className="featured-article__media">
        {media?.src ? (
          <img className="featured-article__img" src={media.src} alt={media.alt || ''} />
        ) : null}
      </figure>

      <div className="featured-article__text">
        <div className="featured-article__meta">
          <span className="featured-article__icon" aria-hidden="true">
            <span className="featured-article__bullet">
              <span className="featured-article__arrow" />
            </span>
          </span>
          <span className="featured-article__kicker">{kicker}</span>
        </div>
        <p className="featured-article__description">{description}</p>
      </div>
    </a>
  );
}
