import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { RevealGroup, RevealItem } from '../blocks/Reveal';
import { featuredQuotes } from './quotes-data';
import './Hero.css';

const HEADLINE = 'Shed the creative limitations holding your business back';
const ROTATE_INTERVAL_MS = 8000;

export default function Hero() {
  const [index, setIndex] = useState(() =>
    featuredQuotes.length > 1 ? Math.floor(Math.random() * featuredQuotes.length) : 0
  );

  useEffect(() => {
    if (featuredQuotes.length <= 1) return undefined;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % featuredQuotes.length);
    }, ROTATE_INTERVAL_MS);
    return () => clearInterval(id);
  }, []);

  const active = featuredQuotes[index];

  return (
    <RevealGroup as="section" className="hero container">
      {/* Superheader wrapper — Figma 1556:1403, max-w 760 with 96 above/below */}
      <RevealItem className="hero-superheader">
        <h1 className="hero-headline">{HEADLINE}</h1>
      </RevealItem>

      <AnimatePresence mode="wait">
        <motion.div
          key={active.id}
          className="hero-quote"
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: -14,
            transition: {
              opacity: { duration: 0.3, ease: [0.445, 0.05, 0.55, 0.95] },
              y: { duration: 0.3, ease: [0.19, 1, 0.22, 1] },
            },
          }}
          transition={{
            opacity: { duration: 0.5, ease: [0.445, 0.05, 0.55, 0.95], delay: 0.12 },
            y: { duration: 0.9, ease: [0.19, 1, 0.22, 1], delay: 0.12 },
          }}
        >
          <p className="hero-quote__badge">{active.stat}</p>
          <p className="hero-quote__text">&ldquo;{active.quote}&rdquo;</p>
          <p className="hero-quote__attribution">
            {active.name}
            <br />
            {active.role}
          </p>
        </motion.div>
      </AnimatePresence>
    </RevealGroup>
  );
}
