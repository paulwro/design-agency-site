import { useState } from 'react';
import PageHero from '../components/PageHero/PageHero';
import FaqSection from '../components/FaqSection/FaqSection';
import Reveal from '../components/blocks/Reveal';
import WorkEntry from '../components/work/WorkEntry';
import { workEntries } from './work-data';
import { workFaqs } from '../components/FaqSection/work-faq-data';
import '../components/work/work.css';

/**
 * Work — Figma 1725:1327.
 *
 * A hero, then whatever modules work-data.js lists, in order, then Load more
 * and the FAQs. The footer is the site's one global footer, rendered by App.
 * The two hidden Figma frames (visual masonry board, Testimonial Full-Width)
 * are intentionally not built.
 *
 * Load more reveals the next batch of entries; the button goes away when there
 * is nothing left. PAGE_SIZE is counted in modules, not pieces of work.
 */
const PAGE_SIZE = 6;

export default function Work() {
  const [count, setCount] = useState(PAGE_SIZE);
  const shown = workEntries.slice(0, count);

  return (
    <>
      <PageHero
        inset="wide"
        headline="Every business has its next big thing"
        lede="Sometimes it’s a new identity. Sometimes it’s a better way to work. Sometimes it’s the idea that changes everything. Here’s what happens when experience and imagination get to work."
      />

      {shown.map((entry) => (
        <WorkEntry key={entry.id} entry={entry} />
      ))}

      {count < workEntries.length && (
        <Reveal className="work-load-more">
          <span className="work-load-more__rule" aria-hidden="true" />
          <button
            type="button"
            className="work-load-more__btn"
            onClick={() => setCount((c) => c + PAGE_SIZE)}
          >
            Load more
          </button>
          <span className="work-load-more__rule" aria-hidden="true" />
        </Reveal>
      )}

      <FaqSection items={workFaqs} />
    </>
  );
}
