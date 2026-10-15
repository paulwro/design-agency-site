/**
 * After `vite build`: write dist/<route>/index.html for every page, with that
 * page's own <title>, description, canonical, Open Graph / Twitter tags,
 * page-level structured data and a plain-text <noscript> summary already in the
 * HTML. Crawlers that never run JavaScript then see the right page, not just
 * the home page. The React app takes over in the browser exactly as before.
 *
 * Source of truth is src/seo/seo-data.js — this script only reads it.
 */
import { register } from 'node:module';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

// seo-data.js pulls in page data files that import images; Node can't read
// those, so stub every non-JS import with an empty string.
register(
  'data:text/javascript,' +
    encodeURIComponent(`
export async function resolve(spec, ctx, next) {
  try { return await next(spec, ctx); } catch (e) {
    if (e.code === 'ERR_MODULE_NOT_FOUND' && /^\\./.test(spec)) return next(spec + '.js', ctx);
    throw e;
  }
}
export async function load(url, ctx, next) {
  if (/\\.(svg|png|jpe?g|webp|gif|avif|mp4|webm|css)(\\?.*)?$/.test(url)) {
    return { format: 'module', shortCircuit: true, source: 'export default ""' };
  }
  return next(url, ctx);
}`),
  import.meta.url,
);

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const { ROUTE_SEO, SITE } = await import(pathToFileURL(join(root, 'src/seo/seo-data.js')).href);

const template = readFileSync(join(root, 'dist/index.html'), 'utf8');
const esc = (s) => s.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
const PAGES = ['home', 'work', 'studio', 'engagements', 'contact'];
const LINKS = PAGES.map((k) => `<a href="${ROUTE_SEO[k].path}">${esc(ROUTE_SEO[k].title.split(' | ')[0])}</a>`).join(' · ');

function setTag(html, re, tag) {
  if (!re.test(html)) throw new Error(`template is missing ${re}`);
  return html.replace(re, tag);
}

let count = 0;
for (const key of PAGES) {
  const seo = ROUTE_SEO[key];
  const url = `${SITE.url}${seo.path === '/' ? '/' : seo.path}`;
  const ogTitle = seo.ogTitle ? `${seo.ogTitle} | ${SITE.name}` : seo.title;
  let html = template;
  html = setTag(html, /<title>.*?<\/title>/s, `<title>${esc(seo.title)}</title>`);
  html = setTag(html, /<meta name="description"[^>]*>/, `<meta name="description" content="${esc(seo.description)}" />`);
  html = setTag(html, /<link rel="canonical"[^>]*>/, `<link rel="canonical" href="${url}" />`);
  html = setTag(html, /<meta property="og:url"[^>]*>/, `<meta property="og:url" content="${url}" />`);
  html = setTag(html, /<meta property="og:title"[^>]*>/, `<meta property="og:title" content="${esc(ogTitle)}" />`);
  html = setTag(html, /<meta property="og:description"[^>]*>/, `<meta property="og:description" content="${esc(seo.description)}" />`);
  html = setTag(html, /<meta name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${esc(ogTitle)}" />`);
  html = setTag(html, /<meta name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${esc(seo.description)}" />`);

  const graph = seo.graph();
  if (graph.length) {
    const ld = JSON.stringify({ '@context': 'https://schema.org', '@graph': graph }).replace(/</g, '\\u003c');
    html = html.replace('</head>', `<script type="application/ld+json" data-seo="page">${ld}</script>\n  </head>`);
  }
  // Home keeps the richer summary already in index.html; other pages get their own.
  if (key !== 'home') {
    const h1 = esc((seo.ogTitle || seo.title.split(' | ')[0]));
    html = html.replace(
      /<noscript>[\s\S]*?<\/noscript>/,
      `<noscript><main><h1>${h1}</h1><p>${esc(seo.description)}</p><nav>${LINKS}</nav></main></noscript>`,
    );
  }
  const out = join(root, 'dist', seo.path === '/' ? 'index.html' : `${seo.path.slice(1)}/index.html`);
  mkdirSync(dirname(out), { recursive: true });
  writeFileSync(out, html);
  count++;
}
console.log(`prerender-meta: wrote ${count} pages`);
