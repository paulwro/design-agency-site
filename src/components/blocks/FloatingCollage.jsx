import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './blocks.css';

/**
 * FloatingCollage — Figma "Floating Imgs" 1630:1384
 *
 * Overlapping media slots positioned as percentages of a 1127 x 873 stage, so
 * the arrangement scales intact instead of relying on fixed pixel offsets.
 *
 * MOTION. Two layers per slot, so they never fight over the same transform:
 *   outer  parallax — the slot drifts against the scroll at its own `depth`
 *          (px of travel each way across the section's pass through the
 *          viewport). Small, "closer" slots travel further than large ones,
 *          which is what makes the cluster read as sitting at different
 *          distances.
 *   inner  entrance — the slot fades up and settles once, staggered, on the
 *          site's usual two curves (see Reveal.jsx).
 *
 * Below 900px the overlap stops reading and the cluster becomes a plain grid;
 * parallax and the staggered entrance switch off with it. Reduced motion
 * renders the static arrangement.
 *
 * Slots take { x, y, w, h, depth, round, bg, src, alt, video }. `bg` is a placeholder
 * fill until `src` or `video` ({ src, poster }) exists; a video autoplays muted on
 * a loop. `stage` ({ w, h }) sets the coordinate space the slots are placed in,
 * so a cluster drawn on a different artboard keeps its Figma coordinates.
 */
const STAGE = { w: 1127, h: 873 };

const DEFAULT_ITEMS = [
  { x: 0, y: 83, w: 417, h: 520, depth: 36, bg: 'var(--color-border)' },
  { x: 381, y: 0, w: 539, h: 364, depth: 64, bg: '#9e6060' },
  { x: 172, y: 439, w: 434, h: 434, depth: 96, round: true, bg: '#4b3636' },
  { x: 653, y: 451, w: 281, h: 374, depth: 128, bg: '#9e6060' },
  { x: 881, y: 410, w: 246, h: 246, depth: 160, bg: 'var(--color-border)' },
];

const pct = (n, total) => `${(n / total) * 100}%`;

const EASE_MOVE = [0.19, 1, 0.22, 1];     /* --ease-out-expo */
const EASE_FADE = [0.445, 0.05, 0.55, 0.95]; /* --ease-in-out-sine */

function useWide() {
  const [wide, setWide] = useState(
    () => typeof window !== 'undefined' && window.matchMedia('(min-width: 901px)').matches,
  );
  useEffect(() => {
    const mq = window.matchMedia('(min-width: 901px)');
    const on = () => setWide(mq.matches);
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return wide;
}

function Slot({ item, index, progress, animate, stage }) {
  const y = useTransform(progress, [0, 1], [item.depth ?? 0, -(item.depth ?? 0)]);
  const place = {
    left: pct(item.x, stage.w),
    top: pct(item.y, stage.h),
    width: pct(item.w, stage.w),
    height: pct(item.h, stage.h),
  };

  const figure = (
    <figure
      className={`floating-collage__item${item.round ? ' floating-collage__item--round' : ''}`}
      style={item.bg ? { background: item.bg } : undefined}
    >
      {item.video ? (
        <video
          className="floating-collage__img"
          src={item.video.src}
          poster={item.video.poster}
          autoPlay
          muted
          loop
          playsInline
        />
      ) : item.src ? (
        <img className="floating-collage__img" src={item.src} alt={item.alt || ''} loading="lazy" />
      ) : null}
    </figure>
  );

  if (!animate) {
    return (
      <div className="floating-collage__slot" style={place}>
        {figure}
      </div>
    );
  }

  return (
    <motion.div className="floating-collage__slot" style={{ ...place, y }}>
      <motion.div
        className="floating-collage__enter"
        initial={{ opacity: 0, y: 48, scale: 0.97 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{
          opacity: { duration: 0.6, ease: EASE_FADE, delay: index * 0.09 },
          y: { duration: 1.1, ease: EASE_MOVE, delay: index * 0.09 },
          scale: { duration: 1.1, ease: EASE_MOVE, delay: index * 0.09 },
        }}
      >
        {figure}
      </motion.div>
    </motion.div>
  );
}

export default function FloatingCollage({ items = DEFAULT_ITEMS, stage = STAGE }) {
  const stageRef = useRef(null);
  const reduce = useReducedMotion();
  const wide = useWide();
  const animate = wide && !reduce;

  /* 0 as the stage's top edge enters at the bottom of the viewport, 1 as its
     bottom edge leaves at the top: the full pass, so the drift is continuous. */
  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start end', 'end start'],
  });

  return (
    <section className="floating-collage container">
      <div
        className="floating-collage__stage"
        ref={stageRef}
        style={{ aspectRatio: `${stage.w} / ${stage.h}` }}
      >
        {items.map((item, i) => (
          <Slot item={item} index={i} progress={scrollYProgress} animate={animate} stage={stage} key={i} />
        ))}
      </div>
    </section>
  );
}
