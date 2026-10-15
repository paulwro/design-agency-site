import Reveal from '../blocks/Reveal';
import { Figure, Chapter, PullQuote, ReadMore } from './WorkMedia';
import './work.css';

/**
 * The Work page modules — Figma 1725:1327 (symbols 1759:*).
 *
 * Each is a layout, not a piece of content: the same module is called again
 * with different entries from work-data.js. Everything here is driven by props.
 * Each heading, lede, chapter, figure and quote reveals on its own (Reveal, low
 * `amount` because several modules are taller than a laptop viewport), with a
 * small per-index delay so a row of pieces arrives left to right.
 */

/* 1759:1655 — one full-width piece, 16:9. */
export function Artifact({ media, client, description }) {
  return (
    <section className="work-section work-artifact">
      <Figure media={media} client={client} description={description} ratio="16 / 9" />
    </section>
  );
}

/* 1759:2125 — two pieces side by side. */
export function ArtifactDuo({ items = [] }) {
  return (
    <section className="work-section work-duo">
      {items.slice(0, 2).map((item, i) => (
        <Figure key={i} delay={i * 0.1} ratio="704 / 480" {...item} />
      ))}
    </section>
  );
}

/* 1759:1675 — heading column beside one large piece, three more beneath, then a pull quote. */
export function Feature({ heading, subhead, body, lead, items = [], testimonial }) {
  return (
    <section className="work-section work-feature">
      <div className="work-feature__intro">
        <Reveal as="h2" amount={0.1} className="work-heading">{heading}</Reveal>
        <Chapter title={subhead} paragraphs={body ? [body] : []} />
      </div>
      <Figure className="work-feature__lead" ratio="907 / 600" {...lead} />
      <div className="work-feature__row">
        {items.slice(0, 3).map((item, i) => (
          <Figure key={i} delay={i * 0.08} ratio="437 / 320" {...item} />
        ))}
      </div>
      {testimonial && <PullQuote {...testimonial} />}
    </section>
  );
}

/* 1759:1743 — heading column plus a run of pieces that alternate narrow and wide.
   A piece flagged `wide` takes two of the three columns; the grid flows round it. */
export function Gallery({ heading, subhead, body, items = [] }) {
  return (
    <section className="work-section work-gallery">
      <div className="work-gallery__intro">
        <Reveal as="h2" amount={0.1} className="work-heading">{heading}</Reveal>
        <Chapter strong title={subhead} paragraphs={body ? [body] : []} />
      </div>
      {items.map((item, i) => (
        <Figure
          key={i}
          delay={(i % 3) * 0.08}
          className={item.wide ? 'work-gallery__wide' : undefined}
          ratio={item.wide ? '907 / 480' : '437 / 320'}
          {...item}
        />
      ))}
    </section>
  );
}

/* 1727:1613 — chapter headline, two chapters beside an outcome card, then a grid of pieces.
   The outcome card is the Read more link's home: it points at the story's own URL. */
export function Story({ heading, chapters = [], outcome, media = [] }) {
  return (
    <section className="work-section work-story">
      <div className="work-story__text">
        <Reveal as="h2" amount={0.1} className="work-heading work-heading--lg work-story__heading">{heading}</Reveal>
        {chapters.slice(0, 2).map((c) => (
          <Chapter key={c.title + c.paragraphs[0].slice(0, 12)} {...c} />
        ))}
        {outcome && (
          <Reveal as="aside" amount={0.1} className="work-story__outcome">
            <div className="work-chapter">
              <p className="work-chapter__title">{outcome.title}</p>
              <ul className="work-story__bullets">
                {outcome.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>
            {outcome.href && <ReadMore href={outcome.href} />}
          </Reveal>
        )}
      </div>
      <div className="work-story__media">
        {media.map((m, i) => (
          <Figure
            key={i}
            delay={(i % 3) * 0.08}
            className={m.span === 3 ? 'work-story__half' : 'work-story__third'}
            ratio={m.span === 3 ? '672 / 320' : '437 / 320'}
            {...m}
          />
        ))}
      </div>
    </section>
  );
}

/* 1759:1744 — headline and lede over a container holding three pieces and a pull quote. */
export function Outcome({ headline, lede, items = [], testimonial }) {
  return (
    <section className="work-section work-outcome">
      <header className="work-outcome__intro">
        <Reveal as="h2" amount={0.1} className="work-heading work-heading--lg">{headline}</Reveal>
        {lede && <Reveal as="p" amount={0.1} delay={0.08} className="work-lede">{lede}</Reveal>}
      </header>
      <Reveal amount={0.1} className="work-outcome__panel">
        <div className="work-outcome__row">
          {items.slice(0, 3).map((item, i) => (
            <Figure key={i} delay={i * 0.08} inset ratio="437 / 340" {...item} />
          ))}
        </div>
        {testimonial && (
          <>
            <hr className="work-outcome__rule" />
            <PullQuote {...testimonial} />
          </>
        )}
      </Reveal>
    </section>
  );
}
