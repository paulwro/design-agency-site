import { useEffect, useRef } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { getLightbox } from './lightbox-data';
import './Lightbox.css';

/**
 * Lightbox — Figma 1785:1438 (light) · 1784:1585 (dark)
 *
 * The case-study / insight viewer. Three layers, back to front:
 *
 *   site   the page behind does not go anywhere — a flat rounded card in
 *          --collapsed-site-background fades in over it while its edges close
 *          to a 40px inset, so the site reads as having stepped back into a
 *          strip behind the card.
 *   panel  the card itself (--lightbox-background), 10px below the top so the
 *          strip shows above it. It rises on expo and scrolls on its own.
 *   close  fixed at the upper right and never moves, however far the panel
 *          has scrolled.
 *
 * Open is the site's usual expo move with a sine fade. Close is the same
 * choreography run backwards in about 60% of the time: leaving should feel
 * quicker than arriving.
 *
 * Dark mode is the same lightbox on different tokens — nothing here branches.
 * Reduced motion keeps the fades and drops the travel.
 *
 * The caller owns routing: it mounts this inside AnimatePresence and passes
 * `onClose`. Scroll position is locked and restored here.
 */
const EXPO = [0.19, 1, 0.22, 1];
const SINE = [0.445, 0.05, 0.55, 0.95];

function CloseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M1.5 1.5l11 11M12.5 1.5l-11 11" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

function Block({ block }) {
  if (block.type === 'text') {
    return (
      <div className="lightbox__text">
        <h2 className="lightbox__headline">{block.headline}</h2>
        {block.paragraphs.map((p) => (
          <p className="lightbox__body" key={p.slice(0, 24)}>
            {p}
          </p>
        ))}
      </div>
    );
  }
  return (
    <figure className="lightbox__figure">
      <div className="lightbox__media">
        {block.video ? (
          <video src={block.video.src} poster={block.video.poster} autoPlay muted loop playsInline />
        ) : block.src ? (
          <img src={block.src} alt={block.alt || ''} />
        ) : null}
      </div>
      {block.caption && <figcaption className="lightbox__caption">{block.caption}</figcaption>}
    </figure>
  );
}

export default function Lightbox({ kind, slug, onClose }) {
  const { blocks } = getLightbox(kind, slug);
  const reduce = useReducedMotion();
  const closeRef = useRef(null);
  const panelRef = useRef(null);

  // Scroll lock — restores the exact position, like the menu does.
  useEffect(() => {
    const y = window.scrollY;
    const { body } = document;
    const prev = body.style.cssText;
    body.style.cssText = `position:fixed;top:${-y}px;left:0;right:0;width:100%;`;
    return () => {
      body.style.cssText = prev;
      window.scrollTo(0, y);
    };
  }, []);

  // Focus the close button on open, hand focus back on close; Esc closes.
  useEffect(() => {
    const opener = document.activeElement;
    closeRef.current?.focus({ preventScroll: true });
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      if (opener instanceof HTMLElement) opener.focus({ preventScroll: true });
    };
  }, [onClose]);

  const move = (d, ease = EXPO) => (reduce ? { duration: 0 } : { duration: d, ease });
  const fade = (d, delay = 0) => ({ duration: d, ease: SINE, delay });

  return (
    <div className="lightbox" role="dialog" aria-modal="true" aria-label="Case study">
      {/* The receded site. Opening: the page steps back first (insets close to 40,
          corners round, the charcoal fades up behind it), THEN the card wipes up.
          Closing runs in order the other way: the card drops away fast, then the
          corners square off and the edges return to full bleed, and only then does
          the charcoal fade out to leave the live page at 100%. */}
      <motion.div
        className="lightbox__site"
        initial={{ opacity: 0, left: reduce ? 40 : 0, right: reduce ? 40 : 0, borderTopLeftRadius: reduce ? 20 : 0, borderTopRightRadius: reduce ? 20 : 0 }}
        animate={{
          opacity: 1,
          left: 40,
          right: 40,
          borderTopLeftRadius: 20,
          borderTopRightRadius: 20,
          transition: {
            opacity: fade(0.35),
            left: move(0.65),
            right: move(0.65),
            borderTopLeftRadius: move(0.65),
            borderTopRightRadius: move(0.65),
          },
        }}
        exit={{
          opacity: 0,
          left: reduce ? 40 : 0,
          right: reduce ? 40 : 0,
          borderTopLeftRadius: reduce ? 20 : 0,
          borderTopRightRadius: reduce ? 20 : 0,
          transition: reduce
            ? { duration: 0.2 }
            : {
                left: { duration: 0.5, ease: EXPO, delay: 0.28 },
                right: { duration: 0.5, ease: EXPO, delay: 0.28 },
                borderTopLeftRadius: { duration: 0.5, ease: EXPO, delay: 0.28 },
                borderTopRightRadius: { duration: 0.5, ease: EXPO, delay: 0.28 },
                opacity: { duration: 0.4, ease: SINE, delay: 0.6 },
              },
        }}
        onClick={onClose}
      />

      <motion.div
        className="lightbox__panel"
        ref={panelRef}
        initial={reduce ? { opacity: 0 } : { y: '100%' }}
        animate={reduce ? { opacity: 1 } : { y: 0 }}
        exit={reduce ? { opacity: 0 } : { y: '100%', transition: { duration: 0.34, ease: [0.55, 0, 0.9, 0.4] } }}
        transition={reduce ? fade(0.3) : { duration: 0.7, ease: EXPO, delay: 0.3 }}
      >
        <div className="lightbox__column">
          {blocks.map((b, i) => (
            <Block block={b} key={i} />
          ))}
        </div>
      </motion.div>

      <motion.button
        ref={closeRef}
        type="button"
        className="lightbox__close"
        aria-label="Close"
        onClick={onClose}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { opacity: fade(0.4, 0.7), scale: move(0.6, EXPO) } }}
        // delay above lets the panel arrive before the close button appears
        exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.15, ease: SINE } }}
        whileHover={reduce ? undefined : { scale: 1.08 }}
        whileTap={reduce ? undefined : { scale: 0.96 }}
      >
        <CloseIcon />
      </motion.button>
    </div>
  );
}
