import { createContext, useContext } from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/* So a RevealGroup's pace reaches its items without every call site repeating
   it on both. An item may still override with its own `pace`. */
const PaceContext = createContext('default');

/**
 * Reveal — the site's single entrance gesture.
 *
 * Every section rises and fades in once, on the same two curves measured off
 * wearecollins.com and recorded in tokens.css:
 *
 *   movement  0.9s  cubic-bezier(.19, 1, .22, 1)       ease-out-expo
 *   fade      0.5s  cubic-bezier(.445, .05, .55, .95)  ease-in-out-sine
 *
 * Splitting the two is the whole trick. A matched duration makes an element
 * look like it is being slid into place; letting the fade finish first makes
 * it look like it was already there and is settling. The numbers live here
 * rather than in CSS because framer-motion needs them as arrays — tokens.css
 * carries the same values for anything animating in plain CSS, and the two
 * must be changed together.
 *
 * Usage
 *   <Reveal as="section" className="hero container">…</Reveal>
 *
 *   <RevealGroup as="ul" className="grid">      // staggers its children
 *     <RevealItem as="li">…</RevealItem>
 *   </RevealGroup>
 *
 * `pace="quick"` is the second tier, for grids of small cards: a shorter rise,
 * a faster move and a tighter stagger. Figma's annotation on 1015:966 asks for
 * precisely this — "the cards quickly fade up … with a very very minor delay
 * between each". A card given the full section rise looks like it is being
 * lowered in on a wire. Set it on the RevealGroup and the items inherit it.
 *
 * `delay` offsets a single Reveal. Inside a RevealGroup the stagger is handled
 * for you — don't hand-delay the items as well.
 *
 * Reduced motion is honoured by rendering the plain element: no wrapper, no
 * observer, no opacity:0 that could strand content if the observer never fires.
 */

const EASE_MOVE = [0.19, 1, 0.22, 1];            /* --ease-out-expo */
const EASE_FADE = [0.445, 0.05, 0.55, 0.95];     /* --ease-in-out-sine */

/* Mirrors the two reveal tiers in tokens.css. Change them together. */
const PACE = {
  default: { rise: 28, move: 0.9, fade: 0.5, stagger: 0.07, lead: 0.05 },
  quick: { rise: 18, move: 0.55, fade: 0.35, stagger: 0.045, lead: 0.03 },
};

/** Fires once, when a quarter of the element has crossed into the viewport. */
const VIEWPORT = { once: true, amount: 0.25 };

function hidden(p) {
  return { opacity: 0, y: p.rise };
}

function shown(p, delay = 0) {
  return {
    opacity: 1,
    y: 0,
    transition: {
      opacity: { duration: p.fade, ease: EASE_FADE, delay },
      y: { duration: p.move, ease: EASE_MOVE, delay },
    },
  };
}

/* The group itself animates nothing — it exists so framer-motion has a parent
   to hang staggerChildren off. Empty variants, so it never hides its own
   children by inheriting an opacity. */
function groupVariants(p) {
  return {
    hidden: {},
    shown: { transition: { staggerChildren: p.stagger, delayChildren: p.lead } },
  };
}

function itemVariants(p) {
  return { hidden: hidden(p), shown: shown(p) };
}

export default function Reveal({ as = 'div', delay = 0, amount, pace = 'default', children, ...rest }) {
  const still = useReducedMotion();
  if (still) {
    const Tag = as;
    return <Tag {...rest}>{children}</Tag>;
  }

  const p = PACE[pace] ?? PACE.default;
  const Motion = motion[as];
  return (
    <Motion
      initial={hidden(p)}
      whileInView={shown(p, delay)}
      viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
      {...rest}
    >
      {children}
    </Motion>
  );
}

export function RevealGroup({ as = 'div', amount, pace = 'default', children, ...rest }) {
  const still = useReducedMotion();
  if (still) {
    const Tag = as;
    return <Tag {...rest}>{children}</Tag>;
  }

  const p = PACE[pace] ?? PACE.default;
  const Motion = motion[as];
  return (
    <PaceContext.Provider value={pace}>
      <Motion
        initial="hidden"
        whileInView="shown"
        viewport={amount ? { ...VIEWPORT, amount } : VIEWPORT}
        variants={groupVariants(p)}
        {...rest}
      >
        {children}
      </Motion>
    </PaceContext.Provider>
  );
}

export function RevealItem({ as = 'div', pace, children, ...rest }) {
  const still = useReducedMotion();
  const inherited = useContext(PaceContext);
  if (still) {
    const Tag = as;
    return <Tag {...rest}>{children}</Tag>;
  }

  const p = PACE[pace ?? inherited] ?? PACE.default;
  const Motion = motion[as];
  return (
    <Motion variants={itemVariants(p)} {...rest}>
      {children}
    </Motion>
  );
}
