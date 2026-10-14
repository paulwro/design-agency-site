import { ScrollSettle, Parallax } from './ScrollMotion';
import './blocks.css';

/**
 * MediaPanel — rounded media slot(s).
 *
 * Figma: Studio "section (full panel img)" (one across) and Engagements
 * "section (side by side imgs)" (two across). Renders placeholders until real
 * imagery lands; pass `items` with { src, alt } to fill them.
 *
 * `inset="tight"` is Studio's full-panel image, which Figma sets at py-64 —
 * the one section on the site that is not py-128.
 */
export default function MediaPanel({ items = [{}], ratio = '16 / 11', inset = 'default' }) {
  return (
    <section className={`media-panel media-panel--${inset} container`}>
      <div className="media-panel__grid" style={{ '--media-panel-columns': items.length }}>
        {items.map((item, i) => (
          <ScrollSettle as="figure" className="media-panel__item" style={{ aspectRatio: ratio }} key={i}>
            {item.src ? (
              <Parallax>
                <img className="media-panel__img" src={item.src} alt={item.alt || ''} loading="lazy" />
              </Parallax>
            ) : null}
          </ScrollSettle>
        ))}
      </div>
    </section>
  );
}
