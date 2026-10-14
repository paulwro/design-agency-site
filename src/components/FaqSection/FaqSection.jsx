import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
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

export default function FaqSection({ items = faqs }) {
  const [openId, setOpenId] = useState(null);

  return (
    <section className="faq container">
      <Reveal as="h2" className="faq-headline">
        Frequently asked questions
      </Reveal>

      <RevealGroup as="ul" className="faq-list" pace="quick">
        {items.map(({ id, question, answer }) => {
          const isOpen = openId === id;
          return (
            <RevealItem as="li" className="faq-item" key={id}>
              <button
                type="button"
                className="faq-question"
                aria-expanded={isOpen}
                onClick={() => setOpenId(isOpen ? null : id)}
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
