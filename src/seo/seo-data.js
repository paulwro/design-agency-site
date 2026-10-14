/**
 * SEO / AEO metadata — one entry per route.
 *
 * WHAT LIVES WHERE
 *   index.html      Static defaults + the site-wide structured data (Organization,
 *                   Person, WebSite). Crawlers that do not run JavaScript still
 *                   get these.
 *   this file       Per-page title, description, Open Graph / Twitter text and
 *                   page-level structured data (WebPage, FAQPage, Service).
 *   Seo.jsx         Applies an entry to <head> whenever the route changes.
 *   public/         robots.txt (crawler policy) and llms.txt (a plain-text
 *                   briefing for AI answer engines).
 *
 * WRITING RULES (from the strategic handoff)
 *   · Voice: "we" is deliberate (Paul, Oct 2026) — a group effort, ambiguity accepted.
          Never "I" or "Paul" in visible copy; the name lives in titles and schema.
 *   · Sentence case, no trailing periods on headlines.
 *   · Client names stay OUT of metadata and structured data; one client is never named anywhere in the code.
 *   · Titles <= ~60 characters, descriptions <= ~155, so they are not cut in
 *     results. Each page leads with what it IS, then the brand.
 *   · Prices are stated plainly with "starts at"; they are the facts an answer
 *     engine is most likely to be asked for.
 *
 * ROUTING CAVEAT — read before launch
 *   The site uses hash URLs (#/studio). Search engines ignore everything after
 *   the #, so as built every page shares ONE crawlable URL. Set
 *   PATH_ROUTING = true once the router moves to real paths (/studio) and the
 *   host serves index.html for them (or pre-renders each page); canonical and
 *   og:url then switch on per page automatically.
 */
import { contactFaqs } from '../components/FaqSection/contact-faq-data';
import { homeFaqs } from '../components/FaqSection/home-faq-data';
import { studioFaqs } from '../components/FaqSection/studio-faq-data';
import { workFaqs } from '../components/FaqSection/work-faq-data';
import { howWeWork as studioCapabilities } from '../pages/studio-data';
import { engagementFaqs, engagementTypes, services as engagementServiceList } from '../pages/engagements-data';

export const PATH_ROUTING = false;

export const SITE = {
  url: 'https://paulwro.com',
  name: 'Paul Wronski',
  person: 'Paul Wronski',
  locale: 'en_US',
  twitterCard: 'summary_large_image',
  image: 'https://paulwro.com/og-image.png',   // 1200 x 630
  sameAs: ['https://www.linkedin.com/in/pwronski/', 'https://www.instagram.com/paulwronski/'],
};

const faqPage = (items) => ({
  '@type': 'FAQPage',
  mainEntity: items.map((f) => ({
    '@type': 'Question',
    name: f.question,
    acceptedAnswer: { '@type': 'Answer', text: f.answer },
  })),
});

const webPage = (path, name, description, extra = {}) => ({
  '@type': 'WebPage',
  '@id': `${SITE.url}${path}#webpage`,
  url: `${SITE.url}${path}`,
  name,
  description,
  isPartOf: { '@id': `${SITE.url}/#website` },
  about: { '@id': `${SITE.url}/#studio` },
  inLanguage: 'en-US',
  ...extra,
});

/** "Starts at $3,500" -> 3500 */
const minPrice = (s) => Number(String(s).replace(/[^0-9.]/g, ''));

const engagementServices = () => [
  {
    name: 'Goals',
    description:
      'Single, clearly defined creative or AI-enabled outcomes delivered as accomplishments-as-a-service.',
    price: 3500,
  },
  {
    name: 'Sprints',
    description:
      'Focused engagements for bigger creative challenges: brand repositioning, visual identity, website redesign, campaigns.',
    price: 15000,
  },
  {
    name: 'Integrated partnerships',
    description:
      'Ongoing senior creative direction embedded with your team, with continuity of creative judgment, context, and execution.',
    price: 3500,
    monthly: true,
  },
].map((s) => ({
  '@type': 'Service',
  name: s.name,
  description: s.description,
  serviceType: 'Creative direction',
  provider: { '@id': `${SITE.url}/#studio` },
  areaServed: 'Worldwide',
  offers: {
    '@type': 'Offer',
    priceCurrency: 'USD',
    priceSpecification: {
      '@type': s.monthly ? 'UnitPriceSpecification' : 'PriceSpecification',
      minPrice: s.price,
      priceCurrency: 'USD',
      ...(s.monthly ? { unitText: 'MONTH' } : {}),
    },
  },
}));

export const ROUTE_SEO = {
  home: {
    path: '/',
    title: 'Agency of one: creative direction, brand & AI / Paul Wronski',
    description:
      'Independent creative director for startups to enterprise: brand identity, websites, marketing systems, and AI-enabled creative, from an agency of one.',
    ogTitle: 'Shed the creative limitations holding your business back',
    graph: () => [
      webPage('/', 'Agency of one: creative direction, brand & AI / Paul Wronski',
        'Independent creative director for startups to enterprise, working as an agency of one.', {
          '@type': ['WebPage', 'CollectionPage'],
        }),
      faqPage(homeFaqs),
    ],
  },
  work: {
    path: '/work',
    title: 'Work: B2B brand, web, and campaign projects / Paul Wronski',
    description:
      'Selected brand identity, website, and campaign work for B2B companies from startup to enterprise, with the thinking and outcomes behind each project.',
    graph: () => [
      // Add a CreativeWork per project (name, image, alt, client-approved description)
      // once real case studies replace the placeholders.
      webPage('/work', 'Work', 'Selected brand identity, website, and campaign work for B2B companies.', {
        '@type': ['WebPage', 'CollectionPage'],
      }),
      faqPage(workFaqs),
    ],
  },
  studio: {
    path: '/studio',
    title: 'Studio: B2B brand and creative leadership / Paul Wronski',
    description:
      'An agency of one with 20+ years of brand and creative leadership for B2B companies in health tech, fintech, SaaS, and professional services. How we work.',
    ogTitle: 'Become easier to trust, and harder to ignore',
    graph: () => [
      webPage('/studio', 'Studio', 'Who the studio works with, what it does, and how it works. An agency of one led by Paul Wronski.', {
        '@type': ['WebPage', 'AboutPage'],
        mainEntity: { '@id': `${SITE.url}/#studio` },
        about: [{ '@id': `${SITE.url}/#studio` }, { '@id': `${SITE.url}/#paul` }],
      }),
      {
        '@type': 'ItemList',
        name: 'Studio capabilities',
        itemListElement: studioCapabilities.steps.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.title,
          description: c.body,
        })),
      },
      faqPage(studioFaqs),
    ],
  },
  engagements: {
    path: '/engagements',
    title: 'Creative direction pricing and engagements / Paul Wronski',
    description:
      'Goals from $3,500, sprints from $15,000, and fractional creative direction from $3,500 a month, for B2B brands from startup to enterprise.',
    ogTitle: 'Three ways to move forward',
    graph: () => [
      webPage('/engagements', 'Engagements', engagementTypes.headline, {
        '@type': ['WebPage', 'CollectionPage'],
      }),
      ...engagementServices(),
      {
        '@type': 'ItemList',
        name: 'Services',
        itemListElement: engagementServiceList.cards.map((c, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          name: c.title,
          description: `${c.lede} ${c.items.join('; ')}.`,
        })),
      },
      faqPage(engagementFaqs),
    ],
  },
  contact: {
    path: '/contact',
    title: 'Contact: start a creative direction project / Paul Wronski',
    description:
      'Tell us about your brand, website, or campaign goals and timeline. A short note is enough to start, and every message gets a personal reply.',
    graph: () => [
      webPage('/contact', 'Contact', 'Start a conversation about your brand, website, or campaign project.', {
        '@type': ['WebPage', 'ContactPage'],
        mainEntity: {
          '@type': 'ContactPoint',
          contactType: 'new business',
          email: 'hello@paulwro.com',
          availableLanguage: 'English',
          areaServed: 'Worldwide',
        },
      }),
      faqPage(contactFaqs),
    ],
  },
  // Lightbox routes: #/work/<slug> and #/insight/<slug>. Placeholder until each has real copy.
  caseStudy: {
    path: '/work',
    title: 'Case study / Paul Wronski',
    description: 'A closer look at the thinking, process, and outcome behind a Paul Wronski project.',
    graph: () => [],
  },
  insight: {
    path: '/',
    title: 'Insight / Paul Wronski',
    description: 'Notes on brand, creative direction, and how businesses show up.',
    graph: () => [],
  },
};

/** Which entry applies to the current hash (or open lightbox). */
export function seoKeyFor(hash, lightbox) {
  if (lightbox) return lightbox.kind === 'work' ? 'caseStudy' : 'insight';
  const h = hash.replace(/^#\/?/, '');
  return ROUTE_SEO[h] ? h : 'home';
}

export { minPrice };
