import Hero from '../components/Hero/Hero';
import ProblemDefinition from '../components/ProblemDefinition/ProblemDefinition';
import ExpertiseSection from '../components/ExpertiseSection/ExpertiseSection';
import EngagementsSection from '../components/EngagementsSection/EngagementsSection';
import WorkTeaser from '../components/WorkTeaser/WorkTeaser';
import TestimonialArcCarousel from '../components/TestimonialArcCarousel/TestimonialArcCarousel';
import FaqSection from '../components/FaqSection/FaqSection';
import { homeFaqs } from '../components/FaqSection/home-faq-data';

/** Home — section order follows Figma 1015:910: engagements, work, problem, how we work, FAQs, testimonials. */
export default function Home() {
  return (
    <>
      <Hero />
      <EngagementsSection />
      <WorkTeaser />
      <ProblemDefinition />
      <ExpertiseSection />
      <FaqSection items={homeFaqs} />
      <TestimonialArcCarousel />
    </>
  );
}
