import ContactForm from '../components/ContactForm/ContactForm';
import InfoCard from '../components/InfoCard/InfoCard';
import ClientLogoGrid from '../components/ClientLogoGrid/ClientLogoGrid';
import Reveal, { RevealGroup, RevealItem } from '../components/blocks/Reveal';
import FaqSection from '../components/FaqSection/FaqSection';
import { contactFaqs } from '../components/FaqSection/contact-faq-data';
import './Contact.css';

/** Contact — Figma 1074:849 · see 01_branding/figma-spec-contact.md */
export default function Contact() {
  return (
    <>
      <section className="contact container">
        <div>
          <Reveal as="h1" className="contact__headline">
            Let&rsquo;s talk about you
          </Reveal>
          <RevealGroup className="contact__layout">
            <ContactForm />
            <RevealItem>
              <InfoCard />
            </RevealItem>
          </RevealGroup>
        </div>
      </section>

      <ClientLogoGrid />
      <FaqSection items={contactFaqs} />
    </>
  );
}
