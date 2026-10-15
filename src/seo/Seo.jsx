import { useEffect } from 'react';
import { currentPath } from '../router';
import { PATH_ROUTING, ROUTE_SEO, SITE, seoKeyFor } from './seo-data';

/**
 * Applies the current route's metadata to <head>. Renders nothing.
 *
 * Writes only tags it owns (marked data-seo) plus the title and description,
 * so the static defaults in index.html stay as the no-JavaScript fallback.
 */
function setMeta(attr, key, value) {
  const sel = `meta[${attr}="${key}"]`;
  let el = document.head.querySelector(sel);
  if (value == null || value === '') {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel, href) {
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!href) {
    el?.remove();
    return;
  }
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function applySeo(key) {
  const seo = ROUTE_SEO[key];
  if (!seo) return;
  const url = `${SITE.url}${seo.path === '/' ? '/' : seo.path}`;
  const ogTitle = seo.ogTitle ? `${seo.ogTitle} | ${SITE.name}` : seo.title;

  document.title = seo.title;
  setMeta('name', 'description', seo.description);

  // Canonical / og:url only make sense once pages have their own URLs.
  setLink('canonical', PATH_ROUTING || key === 'home' ? url : null);
  setMeta('property', 'og:url', PATH_ROUTING || key === 'home' ? url : null);

  setMeta('property', 'og:type', 'website');
  setMeta('property', 'og:site_name', SITE.name);
  setMeta('property', 'og:locale', SITE.locale);
  setMeta('property', 'og:title', ogTitle);
  setMeta('property', 'og:description', seo.description);
  setMeta('property', 'og:image', SITE.image);
  setMeta('name', 'twitter:card', SITE.image ? SITE.twitterCard : 'summary');
  setMeta('name', 'twitter:title', ogTitle);
  setMeta('name', 'twitter:description', seo.description);
  setMeta('name', 'twitter:image', SITE.image);

  // Page-level structured data. The site-wide graph is static in index.html.
  let script = document.head.querySelector('script[data-seo="page"]');
  const graph = seo.graph();
  if (!graph.length) {
    script?.remove();
    return;
  }
  if (!script) {
    script = document.createElement('script');
    script.type = 'application/ld+json';
    script.dataset.seo = 'page';
    document.head.appendChild(script);
  }
  script.textContent = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph });
}

export default function Seo({ lightbox, route }) {
  useEffect(() => {
    applySeo(seoKeyFor(currentPath(), lightbox));
  }, [lightbox, route]);
  return null;
}
