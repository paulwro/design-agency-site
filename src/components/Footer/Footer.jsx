import { useState } from 'react';
import { motion } from 'framer-motion';
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

function PillNavItem({ label, href, isActive, isNavHovering, onHover }) {
  return (
    <a href={href} className="footer-pill-btn" onMouseEnter={() => onHover(label)}>
      {isActive && (
        <motion.div
          layoutId="footer-pill"
          className="footer-pill"
          animate={{
            scale: isNavHovering ? 1.04 : 1,
            boxShadow: isNavHovering ? 'var(--shadow-lift)' : 'none',
          }}
          transition={{
            // The pill slides between nav items on layoutId. 350/30 arrived
            // almost instantly and stopped dead; this carries its travel
            // through to the end. Scale and shadow are tweens, not springs —
            // a spring on a shadow has nothing to oscillate about.
            layout: { type: 'spring', stiffness: 190, damping: 26, mass: 1 },
            scale: { duration: 0.5, ease: [0.19, 1, 0.22, 1] },
            boxShadow: { duration: 0.5, ease: [0.445, 0.05, 0.55, 0.95] },
          }}
        />
      )}
      <span className={isActive ? 'is-active' : undefined}>{label}</span>
    </a>
  );
}

export default function Footer({ headline = HEADLINE }) {
  const [activeItem, setActiveItem] = useState('Contact');
  const [isNavHovering, setIsNavHovering] = useState(false);

  return (
    <footer className="footer">
      <div className="footer-desktop">
        <Reveal className="footer-cta">
          <h2 className="footer-headline">{headline}</h2>
          <nav
            className="footer-nav"
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
              isNavHovering={isNavHovering}
              onHover={setActiveItem}
            />
            {NAV_LINKS.map((link) => (
              <PillNavItem
                key={link.label}
                label={link.label}
                href={link.href}
                isActive={activeItem === link.label}
                isNavHovering={isNavHovering}
                onHover={setActiveItem}
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
