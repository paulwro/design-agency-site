import { RevealGroup, RevealItem } from '../blocks/Reveal';
import { expertiseCards } from './expertise-data';
import './ExpertiseSection.css';


export default function ExpertiseSection() {
  return (
    <section className="expertise container">
      {/* One 3-col grid, per Figma 1015:966: the heading block spans two columns,
          the third is Figma's Empty Spacer, and the cards fill row two. */}
      {/* Figma 1015:966 annotation: "the cards quickly fade up … with a very
          very minor delay between each". That is the quick pace. */}
      <RevealGroup className="expertise-grid" pace="quick">
        <RevealItem className="expertise-header" pace="default">
          <div className="expertise-header__stack">
            <p className="expertise-kicker">How we work</p>
            <h2 className="expertise-headline">Expertise on-demand</h2>
          </div>
          <p className="expertise-body">
            Access experienced creative thinking and execution when your team needs it — whether
            for high-impact initiatives or ongoing collaboration.
          </p>
        </RevealItem>

        {expertiseCards.map((card) => (
          <RevealItem className="expertise-card" key={card.id}>
            <h3 className="expertise-card__title">{card.title}</h3>
            <p className="expertise-card__body">{card.body}</p>
          </RevealItem>
        ))}
      </RevealGroup>
    </section>
  );
}
