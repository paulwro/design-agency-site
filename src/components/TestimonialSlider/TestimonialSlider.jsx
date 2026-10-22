import { useCallback, useEffect, useRef, useState } from 'react';
import { animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import Reveal from '../blocks/Reveal';
import { testimonials } from './testimonials-data';
import './TestimonialSlider.css';

/**
 * TestimonialSlider — after Bold Scandinavia's homepage testimonials (Paul,
 * 2026-10-22). Replaces the arced carousel, which is archived in
 * 04_website/_archive/TestimonialArcCarousel.
 *
 * A horizontal track that starts on the content edge and runs off the right of
 * the screen: each card is five-sixths of the content width, so the next one
 * peeks in. Drag it (mouse or touch), swipe it on a trackpad, or use the arrow
 * keys; it settles on the nearest card. On a real pointer the cursor becomes a
 * large "Drag" over the track, and the card under it takes its client's brand
 * colour. On touch screens, which have no hover, the card that is in place
 * wears its colour instead.
 */

// Movement matches --ease-out-expo / --dur-slow in tokens.css.
const SETTLE = { duration: 0.8, ease: [0.19, 1, 0.22, 1] };

const cardColors = (item) => ({ '--tsl-bg': item.bg, '--tsl-fg': item.fg });

function Logo({ item }) {
  if (item.logoFullColor) {
    return (
      <img
        className="tsl-card__logo-img"
        src={item.logo}
        alt={item.logoAlt}
        width={item.logoWidth}
        height={item.logoHeight}
        draggable={false}
      />
    );
  }
  return (
    <span
      className="tsl-card__logo-mark"
      role="img"
      aria-label={item.logoAlt}
      style={{
        width: item.logoWidth,
        height: item.logoHeight,
        maskImage: `url("${item.logo}")`,
        WebkitMaskImage: `url("${item.logo}")`,
      }}
    />
  );
}

/** The "Drag" label that stands in for the cursor over the track. */
function DragCursor({ trackRef, dragging }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [color, setColor] = useState(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const track = trackRef.current;
    const el = ref.current;
    if (!track || !el) return undefined;
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return undefined;

    const target = { x: 0, y: 0 };
    const pos = { x: 0, y: 0 };
    let raf = 0;
    let placed = false;

    // A short lag behind the pointer — it trails rather than sticks, which is
    // what keeps a cursor this big from feeling heavy.
    const tick = () => {
      const k = reduce ? 1 : 0.22;
      pos.x += (target.x - pos.x) * k;
      pos.y += (target.y - pos.y) * k;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      raf = requestAnimationFrame(tick);
    };

    const move = (e) => {
      target.x = e.clientX;
      target.y = e.clientY;
      if (!placed) {
        pos.x = target.x;
        pos.y = target.y;
        placed = true;
      }
      const card = e.target.closest?.('.tsl-card');
      setColor(card ? card.dataset.fg : null);
    };
    const enter = (e) => {
      move(e);
      setVisible(true);
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const leave = () => {
      setVisible(false);
      placed = false;
    };

    track.addEventListener('pointerenter', enter);
    track.addEventListener('pointermove', move);
    track.addEventListener('pointerleave', leave);
    return () => {
      track.removeEventListener('pointerenter', enter);
      track.removeEventListener('pointermove', move);
      track.removeEventListener('pointerleave', leave);
      cancelAnimationFrame(raf);
    };
  }, [trackRef, reduce]);

  return (
    <div
      ref={ref}
      className={`tsl-cursor${visible ? ' is-visible' : ''}${dragging ? ' is-dragging' : ''}`}
      style={color ? { color } : undefined}
      aria-hidden="true"
    >
      Drag
    </div>
  );
}

export default function TestimonialSlider() {
  const viewportRef = useRef(null);
  const trackRef = useRef(null);
  const x = useMotionValue(0);
  const [index, setIndex] = useState(0);
  const [bounds, setBounds] = useState({ min: 0, max: 0, stops: [0] });
  const [dragging, setDragging] = useState(false);
  const wheelTimer = useRef(0);
  const reduce = useReducedMotion();

  /* Where each card sits when it is "in place".
     Desktop: its left edge on the content edge, with the last stops clamped so
     the track never pulls past its end and leaves an empty band on the right.
     Phones (Paul, 2026-10-22): the card centred on the screen, every one of
     them, first and last included, so a swipe always lands a whole card. */
  const measure = useCallback(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;
    const cards = [...track.children];
    const vw = viewport.clientWidth;
    if (window.matchMedia('(max-width: 760px)').matches) {
      const stops = cards.map((c) => Math.round((vw - c.offsetWidth) / 2 - c.offsetLeft));
      setBounds({ min: Math.min(...stops), max: Math.max(...stops), stops });
      return;
    }
    const styles = getComputedStyle(track);
    const padStart = parseFloat(styles.paddingLeft) || 0;
    const visible = vw - padStart - (parseFloat(styles.paddingRight) || 0);
    const span = track.scrollWidth - padStart - (parseFloat(styles.paddingRight) || 0);
    const min = Math.min(0, visible - span);
    const stops = cards.map((c) => Math.max(min, -(c.offsetLeft - padStart)));
    setBounds({ min, max: 0, stops: stops.filter((s, i) => i === 0 || s !== stops[i - 1]) });
  }, []);

  useEffect(() => {
    measure();
    const ro = new ResizeObserver(measure);
    if (viewportRef.current) ro.observe(viewportRef.current);
    return () => ro.disconnect();
  }, [measure]);

  const settle = useCallback(
    (i) => {
      const next = Math.max(0, Math.min(bounds.stops.length - 1, i));
      setIndex(next);
      animate(x, bounds.stops[next], reduce ? { duration: 0 } : SETTLE);
    },
    [bounds, reduce, x],
  );

  // Keep the current card in place when the layout changes size.
  useEffect(() => {
    x.set(bounds.stops[Math.min(index, bounds.stops.length - 1)] ?? 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bounds]);

  const nearest = (value) => {
    let best = 0;
    bounds.stops.forEach((s, i) => {
      if (Math.abs(s - value) < Math.abs(bounds.stops[best] - value)) best = i;
    });
    return best;
  };

  const onDragEnd = (_, info) => {
    setDragging(false);
    // Throw it: project where the flick would carry the track, then settle on
    // the card nearest that point.
    settle(nearest(x.get() + info.velocity.x * 0.25));
  };

  /* Two-finger swipe on a trackpad moves the track directly, then settles.
     A native, non-passive listener so a sideways swipe over the track does not
     also fire the browser's swipe-back gesture. */
  const wheelState = useRef({});
  wheelState.current = { bounds, settle, nearest };
  useEffect(() => {
    const el = viewportRef.current;
    if (!el) return undefined;
    const onWheel = (e) => {
      if (Math.abs(e.deltaX) <= Math.abs(e.deltaY)) return;
      e.preventDefault();
      const { bounds: b, settle: go, nearest: near } = wheelState.current;
      x.set(Math.max(b.min, Math.min(b.max, x.get() - e.deltaX)));
      clearTimeout(wheelTimer.current);
      wheelTimer.current = setTimeout(() => go(near(x.get())), 140);
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [x]);

  const onKeyDown = (e) => {
    if (e.key === 'ArrowRight') { e.preventDefault(); settle(index + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); settle(index - 1); }
  };

  return (
    <section className="tsl" aria-roledescription="carousel" aria-label="Client testimonials">
      <Reveal>
        <div
          className="tsl__viewport"
          ref={viewportRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
        >
          <motion.ul
            ref={trackRef}
            className={`tsl__track${dragging ? ' is-dragging' : ''}`}
            style={{ x }}
            drag="x"
            dragDirectionLock
            dragConstraints={{ left: bounds.min, right: bounds.max }}
            dragElastic={0.08}
            dragMomentum={false}
            onDragStart={() => setDragging(true)}
            onDragEnd={onDragEnd}
          >
            {testimonials.map((item, i) => (
              <li
                key={item.id}
                className={`tsl-card${i === index ? ' is-current' : ''}`}
                style={cardColors(item)}
                data-fg={item.fg}
                aria-roledescription="slide"
                aria-label={`${i + 1} of ${testimonials.length}`}
              >
                <span className="tsl-card__bg" aria-hidden="true" />
                <div className="tsl-card__client">
                  <Logo item={item} />
                </div>
                <figure className="tsl-card__main">
                  <blockquote className="tsl-card__quote">
                    <p>&ldquo;{item.quote}</p>
                  </blockquote>
                  <figcaption className="tsl-card__author">
                    <span className="tsl-card__name">{item.name}</span>
                    <span className="tsl-card__role">{item.role}</span>
                  </figcaption>
                </figure>
              </li>
            ))}
          </motion.ul>
        </div>
      </Reveal>
      <DragCursor trackRef={trackRef} dragging={dragging} />
    </section>
  );
}
