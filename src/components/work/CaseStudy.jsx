import { useRef } from 'react';
import Reveal from '../blocks/Reveal';
import { Media, Chapter, Logo, ReadMore } from './WorkMedia';
import './work.css';

/**
 * Case study — Figma 1759:1909.
 *
 * A statement, a draggable strip of work samples that bleeds off the page edge,
 * then two chapters and a testimonial card. Slides are `portrait` (350 x 492)
 * or `landscape` (730 x 492); the strip scrolls natively (touch, trackpad,
 * keyboard) and the mouse can also drag it.
 */
function Carousel({ slides = [] }) {
  const track = useRef(null);
  const drag = useRef(null);

  const onPointerDown = (e) => {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    drag.current = { x: e.clientX, left: track.current.scrollLeft, moved: false };
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d) return;
    const dx = e.clientX - d.x;
    if (Math.abs(dx) > 4) d.moved = true;
    track.current.scrollLeft = d.left - dx;
  };
  const end = () => {
    drag.current = null;
    track.current?.classList.remove('is-dragging');
  };
  const onKeyDown = (e) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    const step = track.current.clientWidth * 0.6 * (e.key === 'ArrowRight' ? 1 : -1);
    track.current.scrollBy({ left: step, behavior: 'smooth' });
  };

  return (
    <div
      className="work-carousel"
      ref={track}
      tabIndex={0}
      role="region"
      aria-label="Work samples"
      onPointerDown={(e) => {
        onPointerDown(e);
        if (drag.current) track.current.classList.add('is-dragging');
      }}
      onPointerMove={onPointerMove}
      onPointerUp={end}
      onPointerLeave={end}
      onKeyDown={onKeyDown}
      onDragStart={(e) => e.preventDefault()}
    >
      {slides.map((s, i) => (
        <div
          key={i}
          className={`work-carousel__slide work-carousel__slide--${s.shape === 'portrait' ? 'portrait' : 'landscape'}`}
        >
          <Media media={s.media} />
        </div>
      ))}
    </div>
  );
}

function TestimonialCard({ quote, name, role, logo }) {
  return (
    <figure className="work-card">
      <blockquote className="work-card__quote">
        <span aria-hidden="true">“</span>
        <span>{quote}”</span>
      </blockquote>
      <figcaption className="work-card__by">
        <span>
          {name}
          <br />
          {role}
        </span>
        {logo && <Logo {...logo} className="work-card__logo" />}
      </figcaption>
    </figure>
  );
}

export function CaseStudy({ eyebrow, headline, lede, slides, chapters = [], testimonial }) {
  const [first, second] = chapters;
  return (
    <Reveal as="section" className="work-section work-case" amount={0.1}>
      <div className="work-case__text">
        <div className="work-case__statement">
          {eyebrow && <p className="work-case__eyebrow">{eyebrow}</p>}
          <h2 className="work-heading work-heading--lg">{headline}</h2>
        </div>
        {lede && <p className="work-lede work-case__lede">{lede}</p>}
      </div>

      <Carousel slides={slides} />

      <div className="work-case__cols">
        {first && <Chapter {...first} />}
        {second && (
          <div className="work-case__col">
            <Chapter title={second.title} paragraphs={second.paragraphs} />
            {second.href && <ReadMore href={second.href} />}
          </div>
        )}
        {testimonial && <TestimonialCard {...testimonial} />}
      </div>
    </Reveal>
  );
}
