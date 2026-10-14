import { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import Navbar from './components/Navbar/Navbar';
import MenuOverlay from './components/MenuOverlay/MenuOverlay';
import Home from './pages/Home';
import Contact from './pages/Contact';
import Studio from './pages/Studio';
import Engagements from './pages/Engagements';
import Work from './pages/Work';
import Footer from './components/Footer/Footer';
import Lightbox from './components/Lightbox/Lightbox';
import Seo from './seo/Seo';

/**
 * Hash routing, no dependency.
 *
 * Deliberately not react-router: adding a dependency would mean touching
 * node_modules, and the site is a handful of static pages. Swapping this for
 * react-router later is a drop-in — the route table below is the only contract.
 */
const ROUTES = {
  '': Home,
  '#/': Home,
  '#/contact': Contact,
  '#/studio': Studio,
  '#/engagements': Engagements,
  '#/work': Work,
  // News was removed from the site; a stale #/news link is corrected to Home
  // by currentRoute().
};

/**
 * Lightbox routes. A case study ("Read more" → #/work/<slug>) and the menu's
 * Insight card (#/insight/<slug>) both open as a lightbox OVER a page rather
 * than replacing it, so the page stays mounted and scrolled where it was.
 * Each has a default page to sit over when the link is opened cold.
 */
function parseLightbox(hash) {
  const m = /^#\/(work|insight)\/([\w-]+)$/.exec(hash);
  return m ? { kind: m[1], slug: m[2], base: m[1] === 'work' ? '#/work' : '#/' } : null;
}

/**
 * An unrecognised hash is a typo or a stale link, not a page. Send it to Home
 * and correct the address bar, so what is on screen and what the URL claims
 * never disagree.
 */
function currentRoute(hash = window.location.hash) {
  if (hash in ROUTES) return ROUTES[hash];
  if (hash && hash !== '#/') window.history.replaceState(null, '', '#/');
  return Home;
}

/* Route change: the page fades out, the scroll returns to the top while nothing
   is visible, and the next page fades in — its own sections then rise on their
   Reveals. Opacity only: with the logo wipe and the section reveals already
   moving things, a second movement here would be one too many. */
const PAGE_EASE = [0.445, 0.05, 0.55, 0.95];   /* --ease-in-out-sine */
const routeKeyFor = (Page) => Object.keys(ROUTES).find((k) => ROUTES[k] === Page) ?? 'home';

function App() {
  const still = useReducedMotion();
  const pendingScroll = useRef(false);
  const initialLightbox = parseLightbox(window.location.hash);
  const [Page, setPage] = useState(() =>
    initialLightbox ? ROUTES[initialLightbox.base] : currentRoute(),
  );
  const [lightbox, setLightbox] = useState(initialLightbox);
  const [menuOpen, setMenuOpen] = useState(false);
  // Where closing the lightbox returns to, and whether we got here by an
  // in-app navigation (so closing can step back rather than stack history).
  const pageRef = useRef(Page);
  pageRef.current = Page;
  const baseHash = useRef(initialLightbox ? initialLightbox.base : window.location.hash || '#/');
  const openedInApp = useRef(false);

  useEffect(() => {
    const onHashChange = () => {
      const hash = window.location.hash;
      const lb = parseLightbox(hash);
      setMenuOpen(false);   // navigating always closes the menu
      if (lb) {
        // Opening (or switching) a lightbox: the page underneath stays put.
        openedInApp.current = true;
        setLightbox(lb);
        return;
      }
      const wasOpen = lightbox !== null;
      setLightbox(null);
      const next = currentRoute();
      const samePage = next === pageRef.current;
      setPage(() => next);
      baseHash.current = hash || '#/';
      // Closing a lightbox returns to the same scroll position; any other
      // navigation starts at the top — straight away on the same page, or once
      // the old page has faded out when the page is changing.
      if (!wasOpen) {
        if (samePage || still) window.scrollTo(0, 0);
        else pendingScroll.current = true;
      }
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [lightbox, still]);

  const closeLightbox = useCallback(() => {
    if (openedInApp.current) {
      openedInApp.current = false;
      window.history.back();
    } else {
      window.location.hash = baseHash.current;
    }
  }, []);

  return (
    <div className="app-shell">
      <Navbar
        menuOpen={menuOpen}
        onMenuClick={() => setMenuOpen((v) => !v)}
      />
      <Seo lightbox={lightbox} route={Page} />
      <MenuOverlay open={menuOpen} onClose={() => setMenuOpen(false)} />
      {still ? (
        <Page />
      ) : (
        <AnimatePresence
          mode="wait"
          initial={false}
          onExitComplete={() => {
            if (pendingScroll.current) {
              pendingScroll.current = false;
              window.scrollTo(0, 0);
            }
          }}
        >
          <motion.div
            key={routeKeyFor(Page)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.45, ease: PAGE_EASE } }}
            exit={{ opacity: 0, transition: { duration: 0.25, ease: PAGE_EASE } }}
          >
            <Page />
          </motion.div>
        </AnimatePresence>
      )}
      {/* One footer for the whole site, rendered here so no page can wrap it,
          pad around it or hand it different props. */}
      <Footer />
      {/* Easter egg: press P. Lives at the root so it rides above every page and the lightbox. */}
      <AnimatePresence>
        {lightbox && (
          <Lightbox
            key={`${lightbox.kind}/${lightbox.slug}`}
            kind={lightbox.kind}
            slug={lightbox.slug}
            onClose={closeLightbox}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
