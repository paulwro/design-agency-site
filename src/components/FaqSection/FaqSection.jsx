import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion } from 'framer-motion';
import Reveal, { RevealGroup, RevealItem } from '../blocks/Reveal';
import { faqs } from './faq-data';
import dropdownIcon from '../../assets/faq/dropdown-icon.svg';
import './FaqSection.css';

const EASE_OUT_EXPO = [0.19, 1, 0.22, 1];
const EASE_IN_OUT_SINE = [0.445, 0.05, 0.55, 0.95];

/* The panel's height is the movement and gets the quick tier; the copy fades
   over a shorter window so it is legible before the panel stops growing. At a
   shared 0.3s the answer appeared to be pushed into view by the panel edge. */
const PANEL_TRANSITION = {
  height: { duration: 0.5, ease: EASE_OUT_EXPO },
  opacity: { duration: 0.3, ease: EASE_IN_OUT_SINE },
};

/* The hover panel (Paul, 2026-10-22). It glides from question to question —
   short travel, so the quick tier on the movement curve — and fades on the
   opacity curve. Movement outlasts the fade, as everywhere else on the site. */
const GLIDE = { duration: 0.5, ease: EASE_OUT_EXPO };
const FADE = { duration: 0.35, ease: EASE_IN_OUT_SINE };

/**
 * FaqSection — Figma 1015:976.
 *
 * Hover: one container-coloured panel sits behind the question under the
 * pointer and glides between questions as you move down the list. The two
 * rules touching it (above and below) fade away so the panel reads as a lifted
 * object rather than a fill wedged between lines; every other question steps
 * back to --color-text-dim, like the menu overlay. An open question keeps the
 * panel around question and answer once the pointer leaves. On touch screens
 * there is no hover: the panel only marks the open question, and nothing dims.
 *
 * The panel is one element moved to measured offsets rather than a shared
 * layoutId (see Footer.jsx for why: a layoutId re-projects when the page
 * shifts under it).
 */
/* Home keeps the plain "Frequently asked questions" (it helps search and answer
   engines); the other pages name what their questions are about (Paul,
   2026-10-22). */
export default function FaqSection({ items = faqs, title = 'Frequently asked questions' }) {
  const [openId, setOpenId] = useState(null);
  const [hotId, setHotId] = useState(null); // hovered (mouse) or keyboard-focused
  const activeId = hotId ?? openId;
  const activeIndex = items.findIndex((it) => it.id === activeId);

  const listRef = useRef(null);
  const itemRefs = useRef({});
  const y = useMotionValue(0);
  const h = useMotionValue(0);
  const opacity = useMotionValue(0);
  const shownFor = useRef(null); // the id the panel currently sits on
  const glides = useRef([]); // running glide animations, so a layout change can cut them short
  const activeRef = useRef(activeId);
  activeRef.current = activeId;
  const reduce = useReducedMotion();

  // Glide to the active question when it changes; fade out when there is none.
  useLayoutEffect(() => {
    const el = activeId ? itemRefs.current[activeId] : null;
    if (!el) {
      animate(opacity, 0, reduce ? { duration: 0 } : FADE);
      shownFor.current = null;
      return;
    }
    const top = el.offsetTop;
    const height = el.offsetHeight;
    if (shownFor.current === null || reduce) {
      // Appearing from nothing: place it, then fade in — no slide from the top.
      y.set(top);
      h.set(height);
    } else {
      glides.current = [animate(y, top, GLIDE), animate(h, height, GLIDE)];
    }
    animate(opacity, 1, reduce ? { duration: 0 } : FADE);
    shownFor.current = activeId;
  }, [activeId, reduce, y, h, opacity]);

  /* Follow the active question, frame by frame, while any answer in the list
     opens or closes. Every item is watched, not just the active one: opening a
     question below an open one collapses the one above, which moves the active
     question up after its own height has settled — watching only the active
     item left the panel 18px high (Paul, 2026-10-22: "bottom padding looks
     really small" on some questions). A layout change also cuts a glide short,
     so a half-finished glide cannot land on a stale position. */
  useEffect(() => {
    const seen = new Map();
    const ro = new ResizeObserver((entries) => {
      let changed = false;
      entries.forEach(({ target, contentRect }) => {
        if (seen.has(target) && seen.get(target) !== contentRect.height) changed = true;
        seen.set(target, contentRect.height);
      });
      const el = activeRef.current ? itemRefs.current[activeRef.current] : null;
      if (!changed || !el) return;
      glides.current.forEach((g) => g.stop());
      glides.current = [];
      y.set(el.offsetTop);
      h.set(el.offsetHeight);
    });
    Object.values(itemRefs.current).forEach((el) => el && ro.observe(el));
    return () => ro.disconnect();
  }, [items, h, y]);

  const fromMouse = (e) => e.pointerType === 'mouse' || e.pointerType === 'pen';

  return (
    <section className="faq container">
      <Reveal as="h2" className="faq-headline">
        {title}
      </Reveal>

      <RevealGroup
        as="ul"
        className={`faq-list${hotId ? ' is-hot' : ''}`}
        pace="quick"
        ref={listRef}
        onPointerLeave={() => setHotId(null)}
      >
        <motion.li
          className="faq-panel"
          role="presentation"
          aria-hidden="true"
          style={{ y, height: h, opacity }}
        />
        {items.map(({ id, question, answer }, i) => {
          const isOpen = openId === id;
          const state = [
            id === activeId && 'is-active',
            activeIndex > -1 && i === activeIndex + 1 && 'is-after-active',
            id === hotId && 'is-hover',
          ].filter(Boolean).join(' ');
          return (
            <RevealItem
              as="li"
              className={`faq-item ${state}`}
              key={id}
              ref={(el) => { itemRefs.current[id] = el; }}
              onPointerEnter={(e) => { if (fromMouse(e)) setHotId(id); }}
            >
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : id)}
                onFocus={(e) => { if (e.target.matches(':focus-visible')) setHotId(id); }}
                onBlur={() => setHotId((cur) => (cur === id ? null : cur))}
              >
                <span className="faq-question__text">{question}</span>
                <span
                  className={`faq-question__icon${isOpen ? ' is-open' : ''}`}
                  style={{
                    maskImage: `url("${dropdownIcon}")`,
                    WebkitMaskImage: `url("${dropdownIcon}")`,
                  }}
                />
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    className="faq-answer-wrap"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={PANEL_TRANSITION}
                  >
                    <motion.p
                      className="faq-answer"
                      initial={{ y: -8 }}
                      animate={{ y: 0, transition: { duration: 0.5, ease: EASE_OUT_EXPO } }}
                    >
                      {answer}
                    </motion.p>
                  </motion.div>
                )}
              </AnimatePresence>
            </RevealItem>
          );
        })}
      </RevealGroup>
    </section>
  );
}
