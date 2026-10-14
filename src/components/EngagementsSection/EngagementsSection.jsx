import Reveal, { RevealGroup, RevealItem } from '../blocks/Reveal';
import { engagements } from './engagements-data';
import './EngagementsSection.css';

const HEADLINE =
  'Your business has places to go. We bring the experience, imagination, and creative capabilities to help you get there.';

const BODY =
  'We are an independent creative studio helping ambitious companies, from startups to enterprise, clarify who they are, sharpen how they show up, and turn that clarity into brand, web, marketing, and AI-enabled creative that drives growth.';

export default function EngagementsSection() {
  return (
    <section className="engagements">
      <Reveal className="engagements-header">
        <div className="engagements-heading">
          <div className="engagements-heading__stack">
            <p className="engagements-kicker">An agency of one</p>
            <h2 className="engagements-headline">{HEADLINE}</h2>
          </div>
          <p className="engagements-body">{BODY}</p>
        </div>
        <a href="/engagements" className="btn-primary btn-primary--deep">
          Engagements
        </a>
      </Reveal>

      <RevealGroup as="ul" className="engagements-list" pace="quick">
        {engagements.map((item) => (
          <RevealItem as="li" className="engagements-item" key={item.slug}>
            <a href="/engagements" className="engagements-row">
              <h3 className="engagements-label">{item.label}</h3>
              <span className="engagements-description">{item.description}</span>
            </a>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
