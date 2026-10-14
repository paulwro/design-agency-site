/**
 * Path routing, no dependency.
 *
 * Real URLs (/studio, /work/swept) instead of hashes, so every page can be
 * crawled, linked and shared on its own. Internal links are plain <a href="/studio">
 * elements; installRouter() turns a normal click into a history push, and
 * modified clicks (new tab, etc.) behave like any link.
 */
export const ROUTE_EVENT = 'pw:route';

/** Current path without a trailing slash ('/' stays '/'). */
export function currentPath() {
  const p = window.location.pathname.replace(/\/+$/, '');
  return p === '' ? '/' : p;
}

export function navigate(path, { replace = false } = {}) {
  if (path === window.location.pathname + window.location.search) return;
  window.history[replace ? 'replaceState' : 'pushState'](null, '', path);
  window.dispatchEvent(new Event(ROUTE_EVENT));
}

/** Old #/studio style links: rewrite to the real path before the app reads it. */
export function upgradeLegacyHash() {
  const { hash } = window.location;
  if (hash.startsWith('#/')) window.history.replaceState(null, '', hash.slice(1));
}

/** One document-level listener handles every internal link. Returns a cleanup. */
export function installRouter() {
  const onClick = (e) => {
    if (e.defaultPrevented || e.button > 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = e.target.closest?.('a[href]');
    if (!a || a.target || a.hasAttribute('download')) return;
    const href = a.getAttribute('href');
    if (!href.startsWith('/') || href.startsWith('//')) return;
    e.preventDefault();
    navigate(href);
  };
  document.addEventListener('click', onClick);
  return () => document.removeEventListener('click', onClick);
}
