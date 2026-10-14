import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import Reveal, { RevealGroup, RevealItem } from '../blocks/Reveal';
import { ScrollSettle } from '../blocks/ScrollMotion';
import { clientLogos, workSamples } from './work-teaser-data';
import './WorkTeaser.css';

const HEADLINE = 'See what happens when limitations disappear';

function DragCarousel() {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [maxDrag, setMaxDrag] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const track = trackRef.current;
    if (!container || !track) return undefined;

    const measure = () => {
      const overflow = track.scrollWidth - container.clientWidth;
      setMaxDrag(Math.max(0, overflow));
    };

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(container);
    observer.observe(track);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="work-carousel-desktop" ref={containerRef}>
      <motion.div
        className="work-carousel-track"
        ref={trackRef}
        drag="x"
        dragConstraints={{ left: -maxDrag, right: 0 }}
        dragElastic={0.08}
      >
        {workSamples.map((sample) => (
          <div className="work-carousel-card" key={sample.id} />
        ))}
      </motion.div>
    </div>
  );
}

function MobilePeekCarousel() {
  return (
    <div className="work-carousel-mobile">
      {workSamples.map((sample) => (
        <div className="work-carousel-card" key={sample.id} />
      ))}
    </div>
  );
}

export default function WorkTeaser() {
  return (
    <section className="work-teaser">
      <Reveal className="work-teaser-header container">
        <div className="work-teaser-kicker-headline">
          <p className="work-teaser-kicker">Our work</p>
          <h2 className="work-teaser-headline">{HEADLINE}</h2>
        </div>

        <RevealGroup className="work-teaser-logos" pace="quick">
          {clientLogos.map(({ id, logo, alt }) => (
            <RevealItem className="work-teaser-logo" key={id}>
              <span
                className="work-teaser-logo__mark"
                role="img"
                aria-label={alt}
                style={{ maskImage: `url("${logo}")`, WebkitMaskImage: `url("${logo}")` }}
              />
            </RevealItem>
          ))}
        </RevealGroup>
      </Reveal>

      <Reveal>
        <ScrollSettle from={0.975}>
          <DragCarousel />
        </ScrollSettle>
      </Reveal>
      <MobilePeekCarousel />
    </section>
  );
}
