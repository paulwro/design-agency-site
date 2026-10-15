import './PriceCta.css';

/**
 * PriceCta — the "Starts at $…" row of an engagement card (Figma 1687:1646).
 *
 * At rest it is a plain price with a small dot. On hover or focus the dot grows
 * into a circle that carries an arrow, and each letter of the price rolls up and
 * out of its slot while the matching letter of `hoverLabel` rolls in from below
 * with a small overshoot — the slot-machine effect from the previous site.
 *
 * Only the price row is the link and the hover target. The card around it is
 * not clickable, so the effect starts when the pointer is on this row alone.
 *
 * Both strings sit in one grid cell, so the row is as wide as the longer of the
 * two and nothing reflows when the label changes.
 */
export default function PriceCta({ label, hoverLabel = 'Contact us', href = '/contact' }) {
  const roll = (text, className) => (
    <span className={`price-cta__line ${className}`} aria-hidden="true">
      {Array.from(text).map((ch, i) => (
        <span className="price-cta__char" style={{ '--i': i }} key={i}>
          {ch === ' ' ? ' ' : ch}
        </span>
      ))}
    </span>
  );

  return (
    <a className="price-cta" href={href} aria-label={`${label} — ${hoverLabel}`}>
      <span className="price-cta__icon" aria-hidden="true">
        <span className="price-cta__dot" />
      </span>
      <span className="price-cta__text">
        {roll(label, 'price-cta__line--out')}
        {roll(hoverLabel, 'price-cta__line--in')}
      </span>
    </a>
  );
}
