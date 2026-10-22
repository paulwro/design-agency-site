import Hero from '../components/Hero/Hero';
import ExpertiseSection from '../components/ExpertiseSection/ExpertiseSection';
import EngagementsSection from '../components/EngagementsSection/EngagementsSection';
import WorkTeaser from '../components/WorkTeaser/WorkTeaser';
import TestimonialSlider from '../components/TestimonialSlider/TestimonialSlider';
import FaqSection from '../components/FaqSection/FaqSection';
import { homeFaqs } from '../components/FaqSection/home-faq-data';

/** Home — section order follows Figma 1015:910: engagements, work, how we work, FAQs, testimonials.
 *  The video-and-text "problem" section was removed in Figma on 2026-10-22 (annotation on 1015:966). */
export default function Home() {
  return (
    <>
      <Hero />
      <EngagementsSection />
      <WorkTeaser />
      <ExpertiseSection />
      <FaqSection items={homeFaqs} />
      <TestimonialSlider />
    </>
  );
}
