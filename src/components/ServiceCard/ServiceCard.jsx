import RuledList from '../blocks/RuledList';
import PillLink from '../blocks/PillLink';
import PriceCta from './PriceCta';
import './ServiceCard.css';

/**
 * ServiceCard — Figma "Article (Service Card)" 1651:1464
 *
 * Full-width engagement card: a 3-column grid where the copy spans two columns
 * and the third carries a media slot plus client pill links. The whole card
 * links to the contact form through the price row (see PriceCta); the client
 * pills stay independently clickable.
 */
export default function ServiceCard({ title, price, lede, items = [], media, clients = [], href = '/contact' }) {
  return (
    <article className="service-card">
      <div className="service-card__body">
        <h3 className="service-card__title">{title}</h3>
        {lede && <p className="service-card__lede">{lede}</p>}
        <RuledList items={items} leadingRule trailingRule />
        {price && <PriceCta label={price} href={href} />}
      </div>

      <div className="service-card__aside">
        <figure className="service-card__media">
          {media?.src ? (
            <img className="service-card__img" src={media.src} alt={media.alt || ''} loading="lazy" />
          ) : null}
        </figure>
        {clients.length > 0 && (
          <div className="service-card__clients">
            {clients.map((c) => (
              <PillLink key={c.label} label={c.label} href={c.href} />
            ))}
          </div>
        )}
      </div>
    </article>
  );
}
