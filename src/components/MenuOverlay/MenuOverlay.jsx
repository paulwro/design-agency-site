import { useEffect } from 'react';
import FeaturedArticle from '../FeaturedArticle/FeaturedArticle';
import './MenuOverlay.css';

/**
 * MenuOverlay — Figma 902:1447 "Desktop/Menu Expanded"
 *
 * Behaviours carried over from the previous site (REUSABLE-ELEMENTS-NOTES §1):
 * scroll lock while open, ESC to close, close on link click, aria managed by
 * the trigger, and a staggered reveal on the nav links.
 *
 * The real Navbar sits above this (z-index), so the overlay reserves the
 * navbar's height at the top rather than drawing its own — which is why the
 * toggle stays clickable while the menu is open.
 */
const LINKS = [
  { label: 'Contact', href: '/contact' },
  { label: 'Work', href: '/work' },
  { label: 'Studio', href: '/studio' },
  { label: 'Engagements', href: '/engagements' },
];

const SOCIALS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  { label: 'Instagram', href: 'https://www.instagram.com/' },
];

export default function MenuOverlay({ open, onClose }) {
  // Scroll lock. Restores the exact scroll position on close rather than
  // dumping the reader back at the top.
  useEffect(() => {
    if (!open) return undefined;
    const y = window.scrollY;
    const { body } = document;
    const prev = body.style.cssText;
    body.style.cssText = `position:fixed;top:${-y}px;left:0;right:0;width:100%;`;
    return () => {
      body.style.cssText = prev;
      window.scrollTo(0, y);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === 'Escape') onClose?.();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  return (
    <div
      id="site-menu"
      className={`menu-overlay${open ? ' is-open' : ''}`}
      aria-hidden={!open}
      {...(open ? {} : { inert: '' })}
    >
      <div className="menu-overlay__content container">
        <div className="menu-overlay__navbar-spacer" aria-hidden="true" />

        <div className="menu-overlay__row">
          <nav className="menu-overlay__nav" aria-label="Main">
            {LINKS.map((link, i) => (
              <a
                className="menu-overlay__link"
                href={link.href}
                key={link.label}
                style={{ '--i': i }}
                onClick={onClose}
              >
                {link.label}
              </a>
            ))}
          </nav>

          <FeaturedArticle href="/insight/featured" />
        </div>

        <div className="menu-overlay__footer">
          <p className="menu-overlay__copyright">Paul Wronski Graphic Design, LLC</p>
          <div className="menu-overlay__socials">
            {SOCIALS.map((s) => (
              <a className="text-link" href={s.href} key={s.label} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
