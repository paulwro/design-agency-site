import './ServiceListCard.css';

/**
 * ServiceListCard — one service on the Engagements page.
 *
 * Desktop: a card on --container (Figma 1209:1675) with the title, a one-line
 * description and a media slot. Phones: the 390 frame (1863:1830) drops the
 * card and the image and sets each service as a ruled row — title over
 * description. Paul, 2026-10-21: the description folds what used to be a
 * five-item list into one sentence.
 */
export default function ServiceListCard({ title, description, media }) {
  return (
    <article className="service-list-card">
      <div className="service-list-card__body">
        <h3 className="service-list-card__title">{title}</h3>
        {description && <p className="service-list-card__description">{description}</p>}
      </div>
      <figure className="service-list-card__media">
        {media?.src ? (
          <img className="service-list-card__img" src={media.src} alt={media.alt || ''} loading="lazy" />
        ) : null}
      </figure>
    </article>
  );
}
