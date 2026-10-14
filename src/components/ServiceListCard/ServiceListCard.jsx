import RuledList from '../blocks/RuledList';
import './ServiceListCard.css';

/**
 * ServiceListCard — Figma "Card wUnordered List" 1209:1675
 * The 384px card used across the Services horizontal scroller.
 */
export default function ServiceListCard({ title, lede, items = [], media }) {
  return (
    <article className="service-list-card">
      <div className="service-list-card__body">
        <h3 className="service-list-card__title">{title}</h3>
        {lede && <p className="service-list-card__lede">{lede}</p>}
        <RuledList items={items} />
      </div>
      <figure className="service-list-card__media">
        {media?.src ? (
          <img className="service-list-card__img" src={media.src} alt={media.alt || ''} loading="lazy" />
        ) : null}
      </figure>
    </article>
  );
}
