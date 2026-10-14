import { motion } from 'framer-motion';
import './ThemeToggle.css';

/**
 * ThemeToggle — Figma 876:956 (Lightmode) / 876:958 (Darkmode)
 *
 * Two overlapping 24px circles in a 40x24 frame, per Paul's dev-mode annotations:
 *
 *   Rest     light: primary (text colour) at left, ON TOP of muted at right.
 *            dark:  the two have swapped sides, and the overlap order inverts.
 *   Hover    both circles ease 1px further apart, horizontally.
 *   Toggle   both bump ~3px further apart, then cross: the one travelling
 *            left→right scales to 0.9 and passes BEHIND; the one travelling
 *            right→left scales to 1.1 and passes IN FRONT. Both settle back to 1.
 *
 * The hover nudge rides on `left` rather than `transform` so it composes with
 * the transform Framer is driving on the same element.
 */
// Travel and bump are read from the same tokens the CSS sizes the dots with,
// so changing --toggle-dot moves the choreography with it.
const BUMP = 3;

function readTravel() {
  if (typeof window === 'undefined') return 10;
  const css = getComputedStyle(document.documentElement);
  const dot = parseFloat(css.getPropertyValue('--toggle-dot')) || 14;
  const overlap = parseFloat(css.getPropertyValue('--toggle-overlap')) || 4;
  return dot - overlap;
}

const DOTS = [
  { key: 'primary', className: 'theme-toggle__dot--primary' },
  { key: 'muted', className: 'theme-toggle__dot--muted' },
];

export default function ThemeToggle({ isDark = false, onToggle }) {
  const TRAVEL = readTravel();
  return (
    <button
      type="button"
      className="theme-toggle"
      role="switch"
      aria-checked={isDark}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      onClick={onToggle}
    >
      {DOTS.map((dot, i) => {
        // primary sits left in light mode; they swap in dark mode
        const atLeft = isDark ? i === 1 : i === 0;
        const to = atLeft ? 0 : TRAVEL;
        const from = TRAVEL - to;
        const behind = to === TRAVEL; // travelled left → right
        const bumped = from === 0 ? -BUMP : TRAVEL + BUMP;

        return (
          <motion.span
            key={dot.key}
            className={`theme-toggle__dot ${dot.className}`}
            data-side={atLeft ? 'left' : 'right'}
            initial={false}
            animate={{
              x: [from, bumped, to, to],
              scale: [1, 1, behind ? 0.9 : 1.1, 1],
              zIndex: behind ? [2, 2, 1, 1] : [1, 1, 2, 2],
            }}
            transition={{
              duration: 0.9,
              times: [0, 0.32, 0.8, 1],
              // One easing across four keyframes decelerates into *every*
              // waypoint, so the anticipation and the travel both braked and
              // the whole move read as two separate shuffles. Per-segment
              // easing instead: the back-up eases in and out of its farthest
              // point, the crossing is expo, and the last segment just holds.
              ease: [
                [0.445, 0.05, 0.55, 0.95],
                [0.19, 1, 0.22, 1],
                [0.19, 1, 0.22, 1],
              ],
            }}
          />
        );
      })}
    </button>
  );
}
