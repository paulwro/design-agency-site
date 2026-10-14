import './blocks.css';

/**
 * CarouselCard — Figma "Flickity Carousel Card" (1127:1010 / 1237:1243)
 *
 * A media tile with a short annotated note beneath it. Appears twice on Studio,
 * once per three-column section, always as the first column.
 *
 * Figma: box bg --container, p-8, gap-8, radius 12; image aspect 322/220 at
 * radius 4; note row p-8 gap-8 with a 20px arrow badge at pt-4 and step-0 text.
 *
 * The badge is composed rather than imported — a filled disc in --color-text
 * with the shared diagonal arrow knocked out of it — so it inverts with the
 * theme instead of needing a light and a dark asset.
 */
export default function CarouselCard({ image, alt = '', note }) {
  return (
    <figure className="carousel-card">
      <div className="carousel-card__media">
        {image ? <img className="carousel-card__img" src={image} alt={alt} loading="lazy" /> : null}
      </div>
      {note && (
        <figcaption className="carousel-card__note">
          <span className="carousel-card__badge" aria-hidden="true" />
          <span className="carousel-card__note-text">{note}</span>
        </figcaption>
      )}
    </figure>
  );
}
