import { useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import ThemeToggle from '../ThemeToggle/ThemeToggle';
import './Navbar.css';

/**
 * Navbar — Figma 1552:1391 (desktop) / 1651:1516 (mobile pill)
 *
 * Desktop: toggle left, PW mark centred, Menu right, 96px tall.
 * Mobile:  the same three slots inside a rounded container pill.
 *
 * Theme state lives here; dark is the default and the toggle choice is remembered.
 */
const THEME_KEY = 'pw-theme';

/* Logo click: the page is wiped out in the page's own background colour
   (black in dark mode, white in light) by a soft-edged band sweeping up the
   screen, and wiped back in as it leaves — together.agency's gesture. The
   route change and the scroll to top happen at the midpoint, while the screen
   is fully covered. Keep WIPE_MS in step with --dur-wipe in Navbar.css. */
const WIPE_MS = 1300;

/**
 * First visit opens in dark. A choice made with the toggle is remembered and
 * wins from then on. The OS appearance setting is deliberately NOT consulted:
 * "light" is the factory default on most machines, so honouring it would show
 * light mode to nearly everyone and make dark an opt-in rather than the
 * native state of the site.
 */
function initialTheme() {
  try {
    const saved = window.localStorage.getItem(THEME_KEY);
    if (saved === 'light' || saved === 'dark') return saved;
  } catch { /* storage blocked — fall through */ }
  return 'dark';
}

export default function Navbar({
  theme: themeProp,
  onThemeChange,
  onMenuClick,
  menuOpen = false,
}) {
  const [themeState, setThemeState] = useState(initialTheme);
  const isControlled = themeProp !== undefined;
  const theme = isControlled ? themeProp : themeState;
  const isDark = theme === 'dark';
  const [pulse, setPulse] = useState(0);
  const [wiping, setWiping] = useState(false);
  const wipeTimer = useRef(null);
  const fadeTimer = useRef(null);
  useEffect(() => () => clearTimeout(wipeTimer.current), []);

  const goHome = useCallback((event) => {
    setPulse((n) => n + 1);
    // Let modified clicks (new tab, etc.) behave like any link.
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.button > 0) return;
    event.preventDefault();
    if (wiping) return;
    const arrive = () => {
      if (menuOpen) onMenuClick?.();
      if (window.location.hash !== '#/' && window.location.hash !== '') window.location.hash = '#/';
      window.scrollTo(0, 0);
    };
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      arrive();
      return;
    }
    setWiping(true);
    wipeTimer.current = setTimeout(arrive, WIPE_MS / 2);
  }, [wiping, menuOpen, onMenuClick]);

  useEffect(() => {
    document.body.classList.toggle('dark-mode', isDark);
  }, [isDark]);

  // Scroll veil: once the page has moved, the bar gets a soft fade behind it so
  // content passing underneath never collides with the links.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = isDark ? 'light' : 'dark';
    // Cross-fade the colours instead of snapping them (see .theme-fade).
    const root = document.documentElement;
    root.classList.add('theme-fade');
    clearTimeout(fadeTimer.current);
    fadeTimer.current = setTimeout(() => root.classList.remove('theme-fade'), 900);
    try { window.localStorage.setItem(THEME_KEY, next); } catch { /* ignore */ }
    if (isControlled) onThemeChange?.(next);
    else setThemeState(next);
  }, [isDark, isControlled, onThemeChange]);

  return (
    <header className={`navbar container${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
      <div className="navbar__inner">
        <div className="navbar__slot navbar__slot--start">
          <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
        </div>

        {/* The monogram takes together.agency's logo gesture: on hover and on
            click every letter drops to 10% and ripples back to full, left to
            right. The key restarts the animation on each click. */}
        <a
          className="navbar__mark"
          href="#/"
          aria-label="Paul Wronski — home"
          onClick={goHome}
        >
          <span aria-hidden="true" key={`p${pulse}`} className={`navbar__letter${pulse ? ' navbar__letter--pulse' : ''}`}>P</span>
          <span aria-hidden="true" key={`w${pulse}`} className={`navbar__letter${pulse ? ' navbar__letter--pulse' : ''}`}>W</span>
        </a>

        <div className="navbar__slot navbar__slot--end">
          {/* Menu/Close swap, carried over from the previous site: both labels
              are stacked inside a clipped box and slide on translateY, so
              "Menu" exits upward as "Close" rises into the same slot. */}
          <button
            type="button"
            className="navbar__menu"
            aria-expanded={menuOpen}
            aria-controls="site-menu"
            onClick={onMenuClick}
          >
            <span className="navbar__menu-swap">
              <span className="navbar__menu-label navbar__menu-label--menu">Menu</span>
              <span className="navbar__menu-label navbar__menu-label--close" aria-hidden="true">
                Close
              </span>
            </span>
          </button>
        </div>
      </div>
      {wiping &&
        createPortal(
          <div className="page-wipe" aria-hidden="true" onAnimationEnd={() => setWiping(false)} />,
          document.body,
        )}
    </header>
  );
}
