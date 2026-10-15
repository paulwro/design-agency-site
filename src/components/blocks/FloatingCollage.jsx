import { useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import './blocks.css';

/**
 * FloatingCollage — Figma "Floating Imgs" 1630:1384 / 1787:1457
 *
 * Media slots positioned as percentages of a stage, so the arrangement scales
 * intact instead of relying on fixed pixel offsets. The slots are spaced apart
 * (at least ~60px between neighbours) rather than stacked on top of one another.
 *
 * MOTION. Pure parallax. Every slot is on screen from the start — nothing fades
 * in, so you never see several images dissolving over each other — and each one
 * travels against the scroll at its own `depth` (px of travel each way across
 * the section's pass through the viewport). The depths differ a lot, so the
 * slots slide past one another at different speeds and you see more or less of
 * each as you scroll: small, "closer" slots move fastest, big ones barely move.
 *
 * Below 900px the cluster becomes a plain grid and the parallax switches off
 * with it. Reduced motion renders the static arrangement.
 *
 * Slots take { x, y, w, h, depth, round, bg, src, alt, video }. `bg` is a placeholder
 * fill until `src` or `video` ({ src, poster }) exists; a video autoplays muted on
 * a loop. `stage` ({ w, h }) sets the coordinate space the slots are placed in.
 */
const STAGE = { w: 1160, h: 1100 };

const DEFAULT_ITEMS = [
  { x: 0, y: 0, w: 417, h: 520, depth: 40, bg: 'var(--color-border)' },
  { x: 588, y: 60, w: 539, h: 364, depth: 90, bg: '#9e6060' },
  { x: 40, y: 600, w: 434, h: 434, depth: 56, round: true, bg: '#4b3636' },
  { x: 560, y: 520, w: 281, h: 374, depth: 120, bg: '#9e6060' },
  { x: 914, y: 700, w: 246, h: 246, depth: 150, bg: 'var(--color-border)' },
];

const pct = (n, total) => `${(n / total) * 100}%`;

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

function Slot({ item, progress, animate, stage }) {
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
      {figure}
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
          <Slot item={item} progress={scrollYProgress} animate={animate} stage={stage} key={i} />
        ))}
      </div>
    </section>
  );
}
