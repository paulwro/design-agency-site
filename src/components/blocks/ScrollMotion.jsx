import { useRef } from 'react';
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from 'framer-motion';

/**
 * Scroll-linked motion — the quiet tier.
 *
 * Entrance reveals (Reveal.jsx) fire once. These respond to the scroll itself,
 * continuously, and are kept small enough to be felt rather than noticed:
 *
 *   ScrollSettle   a media frame grows from 0.96 to 1 as it enters, so images
 *                  and carousels seem to arrive and settle instead of sitting
 *                  flat on the page.
 *   Parallax       the picture inside a frame drifts a few percent against the
 *                  scroll. The frame clips it, and the picture is over-scaled
 *                  just enough that its edges never show.
 *
 * Both are damped with a spring, so a flick of the wheel eases in rather than
 * tracking the scrollbar one-to-one. With reduced motion they render the plain
 * element. Hooks are called before that early return on purpose.
 */

const SPRING = { stiffness: 110, damping: 26, mass: 0.6 };

export function ScrollSettle({ as = 'div', from = 0.96, style, children, ...rest }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.35'] });
  const scale = useSpring(useTransform(scrollYProgress, [0, 1], [from, 1]), SPRING);

  const Tag = as;
  if (still) {
    return (
      <Tag ref={ref} style={style} {...rest}>
        {children}
      </Tag>
    );
  }
  const Motion = motion[as];
  return (
    <Motion ref={ref} style={{ ...style, scale }} {...rest}>
      {children}
    </Motion>
  );
}

/** Wrap an <img> or <video> that fills its frame. `distance` is percent each way. */
export function Parallax({ distance = 5, className = '', children }) {
  const ref = useRef(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const y = useSpring(
    useTransform(scrollYProgress, [0, 1], [`${-distance}%`, `${distance}%`]),
    SPRING,
  );

  if (still) {
    return (
      <div ref={ref} className={`parallax ${className}`}>
        {children}
      </div>
    );
  }
  return (
    <div ref={ref} className={`parallax ${className}`}>
      <motion.div className="parallax__inner" style={{ y, scale: 1 + (distance * 2) / 100 }}>
        {children}
      </motion.div>
    </div>
  );
}
