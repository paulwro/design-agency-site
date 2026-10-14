import { useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { testimonials } from './testimonials-data';
import { STEP_ANGLE_DEG, RADIUS, shortestOffset, cardTransform } from './arcMath';
import arrowIcon from '../../assets/testimonials/arrow-icon.svg';
import './TestimonialArcCarousel.css';

const FADE_START = 1.1;
const FADE_END = 2.1;
// Cards fully fade out before this; also where a card's offset gets recycled
// (wrapped by ±total) so it can re-enter from the opposite side later —
// always while invisible, never mid-sweep.
const VISIBLE_WINDOW = 2.3;
const SNAP_TRANSITION = {
  // Softened from 220/28, which snapped to a halt at the end of the arc. The
  // cards carry a little further now. Opacity is a tween — fading on a spring
  // can overshoot past 1 and clip.
  default: { type: 'spring', stiffness: 190, damping: 26, mass: 1 },
  opacity: { duration: 0.5, ease: [0.445, 0.05, 0.55, 0.95] },
};
const DRAG_TRANSITION = { duration: 0 };

function opacityForOffset(offset) {
  const abs = Math.abs(offset);
  if (abs <= FADE_START) return 1;
  if (abs >= FADE_END) return 0;
  return 1 - (abs - FADE_START) / (FADE_END - FADE_START);
}

function CardContent({ item }) {
  return (
    <>
      <div className="tac-card__logo">
        <span
          className="tac-card__logo-mark"
          role="img"
          aria-label={item.logoAlt}
          style={{
            width: item.logoWidth,
            height: item.logoHeight,
            maskImage: `url("${item.logo}")`,
            WebkitMaskImage: `url("${item.logo}")`,
          }}
        />
      </div>
      <div className="tac-card__text">
        <div className="tac-card__quote">
          <span className="tac-card__quote-mark">&ldquo;</span>
          {/* Every card's quote shares one grid cell; only this card's is visible,
              so all cards size to the tallest quote at any width. */}
          <div className="tac-card__quote-body">
            <p>{item.quote}</p>
            {testimonials
              .filter((t) => t.id !== item.id)
              .map((t) => (
                <p key={t.id} className="tac-card__quote-ghost" aria-hidden="true">
                  {t.quote}
                </p>
              ))}
          </div>
        </div>
        <p className="tac-card__attribution">
          {item.name}
          <br />
          <span className="tac-card__attribution-role">{item.role}</span>
        </p>
      </div>
    </>
  );
}

function ArcCard({ item, offset, isDragging }) {
  const { x, y, rotate } = cardTransform(offset);
  const opacity = opacityForOffset(offset);
  const zIndex = 100 - Math.round(Math.abs(offset));

  return (
    <motion.div
      className="tac-card"
      style={{ zIndex }}
      initial={{ opacity: 0 }}
      animate={{ x, y, rotate, opacity }}
      transition={isDragging ? DRAG_TRANSITION : SNAP_TRANSITION}
    >
      <CardContent item={item} />
    </motion.div>
  );
}

function ArcCarousel() {
  const total = testimonials.length;
  // Unwrapped step count: grows/shrinks by whole steps on every advance, never
  // wrapped modulo `total`, so a card's offset always changes continuously in
  // the direction of travel instead of snapping to its nearest wrapped copy.
  const [baseRotation, setBaseRotation] = useState(0);
  const [liveOffset, setLiveOffset] = useState(0);
  const dragRef = useRef({ dragging: false, startX: 0 });
  // Per-card offset memory, seeded once and then nudged by whichever ±total
  // multiple keeps it closest to its own previous frame (not closest to 0),
  // so recycling only ever happens once a card is already faded out.
  const offsetsRef = useRef(testimonials.map((_, i) => shortestOffset(i, 0, total)));

  const isDragging = dragRef.current.dragging;
  const rotation = baseRotation + liveOffset;

  const offsets = testimonials.map((_, i) => {
    const raw = i - rotation;
    const prev = offsetsRef.current[i];
    let candidate = raw;
    // Guard against any single-frame jump larger than half a lap (e.g. a big
    // drag delta) by staying continuous with last frame instead of the
    // nearest-to-zero representative.
    while (candidate - prev > total / 2) candidate -= total;
    while (candidate - prev < -total / 2) candidate += total;
    // Once a card is safely past the fade (invisible), recycle it by a full
    // lap so offsets don't grow without bound over a long session — this
    // never happens while the card is still visible.
    while (candidate > VISIBLE_WINDOW) candidate -= total;
    while (candidate < -VISIBLE_WINDOW) candidate += total;
    offsetsRef.current[i] = candidate;
    return candidate;
  });

  const advance = (steps) => {
    setBaseRotation((prev) => prev + steps);
    setLiveOffset(0);
  };

  const handlePointerDown = (e) => {
    dragRef.current = { dragging: true, startX: e.clientX };
    e.currentTarget.setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e) => {
    if (!dragRef.current.dragging) return;
    const deltaX = e.clientX - dragRef.current.startX;
    const angleRadStep = (STEP_ANGLE_DEG * Math.PI) / 180;
    const deltaIndexUnits = -deltaX / (RADIUS * angleRadStep);
    setLiveOffset(deltaIndexUnits);
  };

  const endDrag = () => {
    if (!dragRef.current.dragging) return;
    dragRef.current.dragging = false;
    setBaseRotation((prev) => prev + Math.round(liveOffset));
    setLiveOffset(0);
  };

  const visibleCards = testimonials
    .map((item, i) => ({ item, offset: offsets[i] }))
    .filter(({ offset }) => Math.abs(offset) <= VISIBLE_WINDOW);

  return (
    <section className="tac-desktop" aria-roledescription="carousel" aria-label="Client testimonials">
      <div
        className={`tac-stage${isDragging ? ' is-dragging' : ''}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onPointerLeave={endDrag}
        tabIndex={0}
        role="group"
        aria-label="Use arrow keys or drag to browse testimonials"
        onKeyDown={(e) => {
          if (e.key === 'ArrowLeft') advance(-1);
          if (e.key === 'ArrowRight') advance(1);
        }}
      >
        <div className="tac-card tac-card--sizer" aria-hidden="true">
          <CardContent item={testimonials[0]} />
        </div>
        {visibleCards.map(({ item, offset }) => (
          <ArcCard key={item.id} item={item} offset={offset} isDragging={isDragging} />
        ))}
      </div>

      <div className="tac-controls">
        <button type="button" className="tac-arrow" onClick={() => advance(-1)} aria-label="Previous testimonial">
          <span className="tac-arrow__mark" style={{ maskImage: `url("${arrowIcon}")`, WebkitMaskImage: `url("${arrowIcon}")` }} />
        </button>
        <button type="button" className="tac-arrow tac-arrow--next" onClick={() => advance(1)} aria-label="Next testimonial">
          <span className="tac-arrow__mark" style={{ maskImage: `url("${arrowIcon}")`, WebkitMaskImage: `url("${arrowIcon}")` }} />
        </button>
      </div>
    </section>
  );
}

function MobilePeekCarousel() {
  return (
    <section className="tac-mobile" aria-label="Client testimonials">
      <div className="tac-mobile-track">
        {testimonials.map((item) => (
          <div className="tac-card" key={item.id}>
            <CardContent item={item} />
          </div>
        ))}
      </div>
    </section>
  );
}

export default function TestimonialArcCarousel() {
  return (
    <>
      <ArcCarousel />
      <MobilePeekCarousel />
    </>
  );
}
