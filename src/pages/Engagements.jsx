import PageHero from '../components/PageHero/PageHero';
import FloatingCollage from '../components/blocks/FloatingCollage';
import SectionHeader from '../components/blocks/SectionHeader';
import TitleBody from '../components/blocks/TitleBody';
import DividedRow from '../components/blocks/DividedRow';
import MediaPanel from '../components/blocks/MediaPanel';
import ServiceCard from '../components/ServiceCard/ServiceCard';
import ServiceListCard from '../components/ServiceListCard/ServiceListCard';
import FaqSection from '../components/FaqSection/FaqSection';
import Reveal, { RevealGroup, RevealItem } from '../components/blocks/Reveal';
import { hero, engagementTypes, services, whyClients, engagementFaqs } from './engagements-data';
import './Engagements.css';

/** Engagements — Figma 1161:1166 · see 01_branding/figma-spec-engagements.md */
export default function Engagements() {
  return (
    <>
      <PageHero headline={hero.headline} lede={hero.lede} />

      <FloatingCollage />

      <section className="engagements-page__section engagements-page__section--96 container">
        <Reveal>
          <SectionHeader headline={engagementTypes.headline} as="h2" width="two-thirds" />
        </Reveal>
        <RevealGroup className="engagements-page__cards">
          {engagementTypes.cards.map((card, i) => (
            <RevealItem key={i}>
              <ServiceCard {...card} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="engagements-page__section engagements-page__section--grid container">
        <Reveal as="h2" className="engagements-page__heading">
          {services.heading}
        </Reveal>
        <RevealGroup className="service-grid" pace="quick">
          {services.cards.map((card, i) => (
            <RevealItem key={i}>
              <ServiceListCard {...card} />
            </RevealItem>
          ))}
        </RevealGroup>
      </section>

      <section className="engagements-page__section engagements-page__section--96 container">
        <Reveal>
          <SectionHeader headline={whyClients.heading} as="h2" width="full" level={3} />
        </Reveal>
        <Reveal>
          <DividedRow columns={3} rule="none" className="engagements-page__why">
            {whyClients.reasons.map((r, i) => (
              <TitleBody key={i} title={r.title} body={r.body} />
            ))}
          </DividedRow>
        </Reveal>
      </section>

      <MediaPanel items={[{}, {}]} ratio="600 / 544" />

      <FaqSection items={engagementFaqs} title="The practical questions" />
    </>
  );
}
