import PageHero from '../components/PageHero/PageHero';
import Reveal from '../components/blocks/Reveal';
import FaqSection from '../components/FaqSection/FaqSection';

/**
 * Upcoming — holding page for #/work/<slug>, the per-story pages that are not
 * designed yet. The Work page itself is pages/Work.jsx.
 *
 * Deliberately built only from PageHero and the FAQs — no invented layout.
 * When the story pages land, replace this with them and delete this file.
 */
const UPCOMING = {
  work: {
    headline: 'The work is being written up properly',
    lede:
      'Case studies take longer to make than a gallery does, and they are worth more. ' +
      'Until they are here, the fastest way to see work relevant to your situation is to ask.',
  },
};

export default function Upcoming({ kind }) {
  const copy = UPCOMING[kind] ?? UPCOMING.work;
  return (
    <>
      <PageHero
        headline={copy.headline}
        lede={copy.lede}
        cta={{ label: 'Get in touch', href: '#/contact' }}
      />
      <Reveal>
        <FaqSection />
      </Reveal>
    </>
  );
}
