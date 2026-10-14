import PageHero from '../components/PageHero/PageHero';
import SectionHeader from '../components/blocks/SectionHeader';
import TitleBody from '../components/blocks/TitleBody';
import DividedRow from '../components/blocks/DividedRow';
import MediaPanel from '../components/blocks/MediaPanel';
import CarouselCard from '../components/blocks/CarouselCard';
import ClientLineList from '../components/blocks/ClientLineList';
import Reveal, { RevealGroup, RevealItem } from '../components/blocks/Reveal';
import TestimonialArcCarousel from '../components/TestimonialArcCarousel/TestimonialArcCarousel';
import FaqSection from '../components/FaqSection/FaqSection';
import FloatingCollage from '../components/blocks/FloatingCollage';
import { studioFaqs } from '../components/FaqSection/studio-faq-data';
import { heroCollage, problemStatement, capabilities, bio, whoWeWorkWith, howWeWork } from './studio-data';
import './Studio.css';

/**
 * Studio — Figma 1055:1227 · see 01_branding/figma-spec-studio.md
 *
 * Section order follows Figma, which puts the FAQs *before* the arced
 * carousel. Every section headline is step 3 here, not the step 4 Home uses —
 * hence `level={3}` on each SectionHeader.
 *
 * The two frames hidden in Figma ("visual masonry board", "Testimonial
 * Full-Width") are intentionally not built.
 */
export default function Studio() {
  return (
    <>
      <PageHero
        headline="Become easier to trust, and harder to ignore"
        lede="We are an agency of one, building brand systems for B2B companies whose next stage requires more clarity, alignment and impact. From the brand and website to the marketing and AI-enabled creative, we strengthen the systems that shape how you are understood, trusted, and remembered."
        cta={{ label: 'Engagements', href: '#/engagements' }}
      />

      {/* Floating cluster · 1787:1464 — same gesture as Engagements, own artboard */}
      <Reveal>
        <FloatingCollage items={heroCollage.items} stage={heroCollage.stage} />
      </Reveal>

      {/* Problem statement · 1236:1169 — 3 cols, gap-x 64 / gap-y 128 */}
      <section className="studio-section container">
        <Reveal>
          <SectionHeader headline={problemStatement.heading} as="h2" width="full" level={3} />
        </Reveal>
        <RevealGroup className="studio-grid studio-grid--3 studio-grid--soft">
          <RevealItem>
            <CarouselCard note={problemStatement.card.note} />
          </RevealItem>
          <RevealItem className="studio-col">
            <p className="studio-lede">{problemStatement.lede}</p>
            <TitleBody
              title={problemStatement.middle.title}
              body={problemStatement.middle.body}
              emphasis="strong"
            />
          </RevealItem>
          <RevealItem className="studio-col studio-col--top">
            <div className="title-body title-body--strong">
              <p className="title-body__title">{problemStatement.right.title}</p>
              <div className="title-body__body">
                {problemStatement.right.body.map((para) => (
                  <p className="studio-para" key={para.slice(0, 24)}>
                    {para}
                  </p>
                ))}
              </div>
            </div>
          </RevealItem>
        </RevealGroup>
      </section>

      {/* Full panel img · 1465:1258 — py-64, the one section that is not 128 */}
      <MediaPanel ratio="1184 / 779" inset="tight" />

      {/* Put intellect to work · 1236:1197 */}
      <section className="studio-section container">
        <Reveal>
          <SectionHeader headline={capabilities.heading} as="h2" width="full" level={3} />
        </Reveal>
        <RevealGroup className="studio-grid studio-grid--3">
          <RevealItem>
            <CarouselCard note={capabilities.card.note} />
          </RevealItem>
          <div className="studio-grid__span-2 studio-grid--2-inner">
            {capabilities.items.map((item) => (
              <RevealItem key={item.title}>
                <TitleBody title={item.title} body={item.body} />
              </RevealItem>
            ))}
          </div>
        </RevealGroup>
      </section>

      {/* Bio · 1228:1165 */}
      <RevealGroup as="section" className="studio-bio container">
        <RevealItem className="studio-bio__slot">
          <figure className="studio-bio__card">
            <div className="studio-bio__portrait" />
            <figcaption className="studio-bio__caption">
              <span className="studio-bio__id">
                <span className="studio-bio__name">{bio.name}</span>
                <span className="studio-bio__role">{bio.role}</span>
              </span>
              {/* Figma 1354:1340, exported from the file through the Plugin
                  API rather than redrawn. Masked so it takes --color-text and
                  inverts with the theme. */}
              <a
                className="studio-bio__social"
                href={bio.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${bio.name} on LinkedIn`}
              >
                <span className="studio-bio__social-mark" aria-hidden="true" />
              </a>
            </figcaption>
          </figure>
        </RevealItem>
        <RevealItem as="h2" className="studio-bio__heading">
          {bio.heading}
        </RevealItem>
        <RevealItem className="studio-bio__body">
          {bio.body.map((para) => (
            <p className="studio-para" key={para.slice(0, 24)}>
              {para}
            </p>
          ))}
        </RevealItem>
      </RevealGroup>

      {/* Who we work with · 1055:1283 */}
      <section className="studio-section studio-section--wide-gap container">
        <Reveal>
          <SectionHeader headline={whoWeWorkWith.heading} as="h2" width="two-thirds" level={3} />
        </Reveal>
        <RevealGroup className="studio-grid studio-grid--3">
          <RevealItem className="studio-col">
            {whoWeWorkWith.points.map((p) => (
              <TitleBody key={p.title} title={p.title} body={p.body} />
            ))}
          </RevealItem>
          <RevealItem className="studio-grid__span-2">
            <ClientLineList entries={whoWeWorkWith.clients} />
          </RevealItem>
        </RevealGroup>
      </section>

      {/* How we work · 1133:1130 */}
      <section className="studio-section container">
        <Reveal>
          <SectionHeader headline={howWeWork.heading} as="h2" width="two-thirds" level={3} />
        </Reveal>
        <Reveal className="studio-steps">
          <DividedRow columns={2} rule="vertical">
            {[0, 1].map((col) => (
              <div className="studio-steps__col" key={col}>
                {howWeWork.steps.slice(col * 3, col * 3 + 3).map((step, i) => (
                  <TitleBody key={i} title={step.title} body={step.body} emphasis="strong" />
                ))}
              </div>
            ))}
          </DividedRow>
        </Reveal>
      </section>

      <FaqSection items={studioFaqs} />
      <TestimonialArcCarousel />
    </>
  );
}
