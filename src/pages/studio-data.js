/**
 * Studio page content — Figma 1055:1227
 *
 * PROVENANCE. Two kinds of string live in here:
 *   FIGMA  — lifted verbatim from the file. Do not reword without changing Figma.
 *   DRAFT  — written to fill a slot where Figma repeats instance placeholder
 *            text. Written to match the voice of the FIGMA strings; every one
 *            is Paul's to approve, cut or rewrite.
 *
 * `whoWeWorkWith.clients` is FIGMA (1371:1399): six clients with their own
 * icon tiles. Placeholder until Paul supplies the final list.
 */

import inboxHealth from '../assets/studio-clients/inboxhealth.svg';
import pearSuite from '../assets/studio-clients/pearsuite.svg';
import chiefSeconds from '../assets/studio-clients/chiefseconds.svg';
import solarGator from '../assets/studio-clients/solargator.svg';
import act from '../assets/studio-clients/act.svg';
import swept from '../assets/studio-clients/swept.svg';

export const problemStatement = {
  heading: 'Make the business behind your brand impossible to underestimate',
  card: {
    note:
      'Project-based or ongoing — structured around your priorities, not ' +
      'around a fixed retainer model.',
  },
  lede:
    'The best creative work changes how people perceive the business behind it. ' +
    'It makes your value clearer, your difference more meaningful and the case ' +
    'for choosing you more compelling.',
  // Figma column 2, beneath the lede.
  middle: {
    title: 'Compound confidence with every decision.',
    body:
      'The right decisions make the next ones easier. We bring experience, ' +
      'intellect and imagination to find the ideas worth pursuing, sharpen them ' +
      'and build from them with confidence.',
  },
  // Figma column 3 — two paragraphs under one title.
  right: {
    title: 'Experience is leverage.',
    body: [
      'Twenty-plus years of building brands gives us a deep reservoir to draw ' +
        'from: what earns attention, what builds trust, what makes an idea stick ' +
        'and what separates a passing trend from something worth building on.',
      'Today, we can put all of that experience to work with capabilities we ' +
        'could barely have imagined when we started.',
    ],
  },
};

export const capabilities = {
  heading: 'Put intellect and imagination to work',
  card: {
    note:
      'Project-based or ongoing — structured around your priorities, not ' +
      'around a fixed retainer model.',
  },
  items: [
    {
      title: 'Clarify what matters',
      body:
        'Before making anything, we get clear on the business, the audience, the ' +
        'moment you are in, and what is not working. A website problem may be a ' +
        'positioning problem. A brand problem may really be a consistency problem. ' +
        'Experience helps separate the symptom from the thing worth fixing.',
    },
    {
      title: 'Build the system around the idea',
      body:
        'Identity, website, content, campaigns, visual language, guidelines, ' +
        'templates — whatever the engagement requires should feel like parts of ' +
        'the same company, not a collection of individual design projects.',
    },
    {
      title: 'Make it work in the real world',
      body:
        'The work has to survive marketers, developers, vendors, Canva, AI, ' +
        'changing priorities, new channels, and whatever needs to be made six ' +
        'months from now. A beautiful launch is nice. A useful system is better.',
    },
    {
      title: 'Keep it from wandering off again',
      body:
        'Some companies need a defined project and take it from there. Others ' +
        'need ongoing stewardship as the brand, website, and marketing continue ' +
        'to evolve. The engagement should match what the business actually needs.',
    },
  ],
};

export const bio = {
  heading:
    '20+ years of brand and creative leadership for growth-stage and ' +
    'enterprise B2B brands',
  body: [
    'We have spent more than 20 years working across brand identity, ' +
      'websites, marketing communications, campaigns, visual systems, motion, ' +
      'presentations, and the tools that help teams keep the work coherent over ' +
      'time. That range is especially useful for companies with complicated ' +
      'stories to tell — including healthcare and health tech, fintech and ' +
      'payments, SaaS and technology, energy, professional services, and ' +
      'mission-driven organizations.',
    'The practice stays intentionally focused. Senior creative direction leads the thinking and ' +
      'execution, bringing in trusted specialists when the work genuinely calls ' +
      'for them rather than building unnecessary layers around the engagement.',
  ],
  name: 'Paul Wronski',
  role: 'Creative Director & Principal',
  linkedin: 'https://www.linkedin.com/in/pwronski',
};

export const whoWeWorkWith = {
  heading: 'We do our best work with companies where brand decisions actually matter',
  points: [
    {
      title: 'B2B companies, startup to enterprise',
      body:
        'Technology, health tech, fintech, and professional services — building credibility, ' +
        'differentiation, and systems that scale with the business.',
    },
    {
      title: 'Companies at an inflection point',
      body:
        'Post-acquisition, post-pivot, or entering a new market — needing to ' +
        'reframe how they present themselves.',
    },
    {
      title: 'Teams without a creative lead',
      body:
        'Organizations that need experienced creative direction plugged in — ' +
        'without the overhead of a full-time hire.',
    },
  ],
  /**
   * Figma 1371:1399 — six clients, each with its own coloured 56px app-icon
   * tile (assets/studio-clients, exported from Figma as full tiles). Placeholder
   * until Paul supplies the final list. (Older note follows.) These are the four real
   * clients. The tile wants a SQUARE app-icon mark; the project only has
   * horizontal wordmarks, which crush to an illegible sliver at 34px, so each
   * entry carries a monogram instead. Add `mark: <square svg>` to an entry and
   * it replaces the monogram with no other change.
   * for the remaining descriptions.
   */
  clients: [
    { name: 'Inbox Health', description: 'Patient billing & comms', tile: inboxHealth },
    { name: 'Pear Suite', description: 'Community health ecosystem', tile: pearSuite },
    { name: 'Chief Seconds', description: 'Marketing advisory firm', tile: chiefSeconds },
    { name: 'SolarGator', description: 'Solar lead aggregator', tile: solarGator },
    { name: 'A Contemporary Theatre of Connecticut', description: 'Regional theatre', tile: act },
    { name: 'Swept', description: 'Commercial cleaning platform', tile: swept },
  ],
};

export const howWeWork = {
  // FIGMA 1133:1135 — all six entries are now real copy (1133:1136).
  heading: 'More ways to make progress',
  // Two ruled columns of three: left column reads down, then right column.
  steps: [
    {
      title: 'Brand & identity',
      body: 'Build a brand that reflects where your business is headed.',
    },
    {
      title: 'Imagery & Content',
      body: 'Create a distinctive visual world people recognize.',
    },
    {
      title: 'Digital Experiences',
      body: 'Make your business easier to understand, trust, and choose.',
    },
    {
      title: 'Creative Systems',
      body: 'Give your team smarter tools and better ways to work.',
    },
    {
      title: 'Campaigns & Communications',
      body: 'Turn important messages into ideas people remember.',
    },
    {
      title: 'Creative Leadership',
      body: 'Bring experienced thinking and execution closer to your business.',
    },
  ],
};

/* Figma 1787:1464 — the second floating cluster, directly under the page hero.
   Five slots on a 1271.17 x 811 artboard; drop media in with `src` or
   `video: { src, poster }`. `depth` is parallax travel in px: nearer slots
   (smaller, higher z) drift further. */
export const heroCollage = {
  // Same five shapes as Figma 1787:1457, spread out so none of them touches
  // another; the parallax depths differ widely so they pass at different speeds.
  stage: { w: 1271, h: 1271 },
  items: [
    { x: 0, y: 0, w: 586, h: 346, depth: 28, bg: '#9e6060' },
    { x: 790, y: 0, w: 234, h: 234, depth: 120, bg: 'var(--color-border)' },
    { x: 875, y: 330, w: 396, h: 494, depth: 64, bg: '#ece8e8' },
    { x: 60, y: 430, w: 512, h: 512, depth: 44, round: true, bg: '#4b3636' },
    { x: 640, y: 900, w: 333, h: 371, depth: 96, bg: '#824242' },
  ],
  // The phone arrangement: same five shapes in a 342-wide stage, staggered so
  // they pass one another as you scroll. Order matches `items`.
  mobile: {
    stage: { w: 342, h: 690 },
    items: [
      { x: 0, y: 0, w: 230, h: 136, depth: 16 },
      { x: 250, y: 24, w: 92, h: 92, depth: 44 },
      { x: 150, y: 190, w: 192, h: 240, depth: 30 },
      { x: 0, y: 260, w: 128, h: 128, depth: 24 },
      { x: 40, y: 480, w: 168, h: 187, depth: 40 },
    ],
  },
};
