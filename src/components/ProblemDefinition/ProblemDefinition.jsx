import { RevealGroup, RevealItem } from '../blocks/Reveal';
import './ProblemDefinition.css';

const HEADING = 'The ‘path of least resistance’ is the one everyone else is taking';
const BODY =
  "Most companies today build brands using the same tools, the same templates, and the same visual trends. The result is a kind of creative convergence — where brands begin to look indistinguishable from one another. The problem isn't a lack of effort. It's a lack of differentiated judgment.";

export default function ProblemDefinition() {
  return (
    <section className="problem-definition container">
      <RevealGroup className="problem-definition__stage">
        {/* Placeholder fill standing in for a real video — swap the media div
            below for a <video> element once Paul supplies the asset. */}
        <RevealItem className="problem-definition__media" />
        <RevealItem className="problem-definition__text">
          <h2 className="problem-definition__heading">{HEADING}</h2>
          <p className="problem-definition__body">{BODY}</p>
        </RevealItem>
      </RevealGroup>
    </section>
  );
}
