import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import Reveal from '../blocks/Reveal';
import './Footer.css';

const NAV_LINKS = [
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/studio' },
  { label: 'Engagements', href: '/engagements' },
];

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/pwronski/' },
  { label: 'Instagram', href: 'https://www.instagram.com/paulwronski/' },
];

const HEADLINE = 'An agency of one for brands that have outgrown average';
const LEGAL = 'Paul Wronski Graphic Design, LLC';

function PillNavItem({ label, href, isActive, ready, onHover, itemRef }) {
  return (
    <a href={href} className="footer-pill-btn" ref={itemRef} onMouseEnter={() => onHover(label)}>
      <span className={isActive && ready ? 'is-active' : undefined}>{label}</span>
    </a>
  );
}

export default function Footer({ headline = HEADLINE }) {
  const [activeItem, setActiveItem] = useState('Contact');
  const [isNavHovering, setIsNavHovering] = useState(false);
  const still = useReducedMotion();

  /* The pill is one indicator positioned from measured offsets, not a shared
     layoutId element. A layoutId pill re-projects whenever the page shifts
     under it — closing the menu unlocks the body and restores the scroll, which
     made the pill fall in from above. Offsets are scroll-independent, so it
     simply isn't affected. On first sight it zaps out as a dot over Contact,
     then stretches into the pill. */
  const navRef = useRef(null);
  const itemRefs = useRef({});
  const [box, setBox] = useState(null); // { x, w, h } of the active item
  const seen = useInView(navRef, { once: true, amount: 0.6 });
  const [phase, setPhase] = useState(still ? 'pill' : 'hidden'); // hidden | dot | pill

  useLayoutEffect(() => {
    const measure = () => {
      const el = itemRefs.current[activeItem];
      if (el) setBox({ x: el.offsetLeft, w: el.offsetWidth, h: el.offsetHeight });
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (navRef.current) ro.observe(navRef.current);
    return () => ro.disconnect();
  }, [activeItem]);

  useEffect(() => {
    if (still) {
      setPhase('pill');
      return undefined;
    }
    if (!seen) return undefined;
    setPhase('dot');
    const t = setTimeout(() => setPhase('pill'), 300);
    return () => clearTimeout(t);
  }, [seen, still]);

  const dot = box ? { x: box.x + box.w / 2 - box.h / 2, width: box.h } : null;

  return (
    <footer className="footer">
      <div className="footer-desktop">
        <Reveal className="footer-cta">
          <h2 className="footer-headline">{headline}</h2>
          <nav
            className="footer-nav"
            ref={navRef}
            onMouseEnter={() => setIsNavHovering(true)}
            onMouseLeave={() => {
              setActiveItem('Contact');
              setIsNavHovering(false);
            }}
          >
            <PillNavItem
              label="Contact"
              href="/contact"
              isActive={activeItem === 'Contact'}
              ready={phase === 'pill'}
              onHover={setActiveItem}
              itemRef={(el) => { itemRefs.current.Contact = el; }}
            />
            {box && (
              <motion.div
                className="footer-pill"
                aria-hidden="true"
                initial={false}
                animate={
                  phase === 'hidden'
                    ? { ...dot, scale: 0, opacity: 0, boxShadow: 'none' }
                    : phase === 'dot'
                      ? { ...dot, scale: 1, opacity: 1, boxShadow: 'none' }
                      : {
                          x: box.x,
                          width: box.w,
                          scale: isNavHovering ? 1.04 : 1,
                          opacity: 1,
                          boxShadow: isNavHovering ? 'var(--shadow-lift)' : 'none',
                        }
                }
                transition={
                  still
                    ? { duration: 0 }
                    : phase === 'dot'
                      ? { scale: { type: 'spring', stiffness: 520, damping: 14, mass: 0.7 }, opacity: { duration: 0.12 } }
                      : {
                          x: { type: 'spring', stiffness: 190, damping: 26, mass: 1 },
                          width: { type: 'spring', stiffness: 190, damping: 26, mass: 1 },
                          scale: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
                          boxShadow: { duration: 0.5, ease: [0.445, 0.05, 0.55, 0.95] },
                        }
                }
              />
            )}
            {NAV_LINKS.map((link) => (
              <PillNavItem
                key={link.label}
                label={link.label}
                href={link.href}
                isActive={activeItem === link.label}
                ready={phase === 'pill'}
                onHover={setActiveItem}
                itemRef={(el) => { itemRefs.current[link.label] = el; }}
              />
            ))}
          </nav>
        </Reveal>

        <Reveal className="footer-meta container">
          <p className="footer-legal">{LEGAL}</p>
          <div className="footer-social">
            {SOCIAL_LINKS.map((social) => (
              <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer">
                {social.label}
              </a>
            ))}
          </div>
        </Reveal>
      </div>

      <div className="footer-mobile">
        <div className="footer-cta">
          <h2 className="footer-headline">{headline}</h2>
          <a href="/contact" className="btn-primary">
            Contact
          </a>
        </div>

        <div className="footer-link-grid">
          <ul className="footer-link-col">
            {NAV_LINKS.map((link) => (
              <li key={link.label}>
                <a href={link.href}>{link.label}</a>
              </li>
            ))}
          </ul>
          <ul className="footer-link-col">
            {SOCIAL_LINKS.map((social) => (
              <li key={social.label}>
                <a href={social.href} target="_blank" rel="noopener noreferrer">
                  {social.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <p className="footer-legal footer-legal--mobile">{LEGAL}</p>
      </div>
    </footer>
  );
}
