import { clientLogos } from './client-logos-data';
import './ClientLogoGrid.css';

/**
 * ClientLogoGrid — Figma 1658:1509 (grid 1708:1323)
 *
 * A flat list of equal 220 x 80 cells in reading order. The hairlines are not a
 * table: they are drawn per cell, and they never touch each other.
 *
 *   - a horizontal rule runs under each cell, as wide as the cell, centred in
 *     the gap to the next row;
 *   - a vertical rule runs beside each cell, centred in the gutter, and stops
 *     short of the row boundary so it breaks wherever a horizontal rule would
 *     cross it.
 *
 * Which cells carry which rule is decided in CSS by column count (4 across,
 * then 2 across), so the layout can reflow without the markup knowing.
 */
export default function ClientLogoGrid({
  label = 'Client work includes:',
  logos = clientLogos,
}) {
  return (
    <section className="logo-section container">
      <div className="logo-section__inner">
        {label && <p className="logo-section__label">{label}</p>}
        <div className="logo-grid">
          {logos.map((logo, i) => (
            <div className="logo-cell" key={`${logo.name}-${i}`}>
              {/* Masked rather than <img> so the mark takes --color-text and
                  stays visible in dark mode — same technique as WorkTeaser. */}
              <span
                className="logo-cell__mark"
                role="img"
                aria-label={logo.alt ?? logo.name}
                style={{
                  maskImage: `url("${logo.src}")`,
                  WebkitMaskImage: `url("${logo.src}")`,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
