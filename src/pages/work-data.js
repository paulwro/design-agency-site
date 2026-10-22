import sweptLogo from '../assets/testimonials/swept-logo.svg';
import everWonderLogo from '../assets/testimonials/ever-wonder-logo.svg';

/**
 * Work page content — Figma 1725:1327.
 *
 * Each entry is one module. `type` is the layout (the Figma component name):
 *
 *   artifact      one piece, full width              { media, client, description }
 *   artifact-duo  two pieces side by side            { items: [piece, piece] }
 *   feature       heading + one large piece + three { heading, subhead, body, lead, items[3], testimonial }
 *   gallery       heading + narrow/wide run          { heading, subhead, body, items[] }  (item.wide = two columns)
 *   story         chapters + outcome + media grid    { heading, chapters[2], outcome, media[] }  (media.span 3 = half)
 *   outcome       headline + container of three      { headline, lede, items[3], testimonial }
 *   case-study    statement + carousel + chapters    { eyebrow, headline, lede, slides[], chapters[2], testimonial }
 *
 * A `piece` is { media, client, description }; `media` is { src, alt } or
 * { type: 'video', src, poster } — empty `{}` renders Figma's grey placeholder.
 *
 * EVERYTHING BELOW IS PLACEHOLDER copy lifted from the Figma frame, to be
 * replaced with real projects. The same module can appear any number of times.
 * A story's `outcome.href` is where its "Read more" goes: /work/<slug>.
 */
const DESC = 'Description of the work we did or what is shown above.';
const CHAPTER =
  'Before making anything, we get clear on the business, the audience, the moment you are in, ' +
  'and what is not working. A website problem may be a positioning problem. A brand problem ' +
  'may really be a consistency problem. Experience helps separate the symptom from the thing ' +
  'worth fixing.';
const QUOTE =
  'We recently worked with Paul to update our website and branding. Paul was thoughtful, ' +
  'grounded and listened carefully to what we needed. He delivered a clear proposal that ' +
  'accurately reflected what we asked for and delivered on time, in scope. Both his work and ' +
  'his approach were professional and on point.';
const LEDE =
  'We are an independent creative studio helping ambitious companies, from startups to enterprise, ' +
  'clarify who they are, sharpen how they show up, and turn that clarity into brand, web, marketing, ' +
  'and AI-enabled creative that drives growth.';

const piece = () => ({ media: {}, client: 'Client Name', description: DESC });

const swept = {
  quote: QUOTE,
  name: 'Michelle Audas',
  role: 'CEO, Swept',
  logo: { src: sweptLogo, alt: 'Swept', width: 102, height: 34 },
};
const everWonder = {
  quote: QUOTE,
  name: 'Brian Sena',
  role: 'Founder/Principal, Ever Wonder',
  logo: { src: everWonderLogo, alt: 'Ever Wonder', width: 38, height: 80 },
};

export const workEntries = [
  { id: 'artifact-1', type: 'artifact', ...piece() },
  { id: 'duo-1', type: 'artifact-duo', items: [piece(), piece()] },
  {
    id: 'feature-1',
    type: 'feature',
    heading: 'Clarify what matters',
    subhead: 'This is the result of our work.',
    body:
      'Before making anything, we get clear on the business, the audience, the moment you are ' +
      'in, and what is not working. A website problem may be a positioning problem.',
    lead: { media: {}, description: DESC },
    items: [piece(), piece(), piece()],
    testimonial: swept,
  },
  {
    id: 'gallery-1',
    type: 'gallery',
    heading: 'Clarify what matters',
    subhead: 'This is the result of our work.',
    body: CHAPTER,
    items: [
      piece(),
      piece(),
      { ...piece(), wide: true },
      piece(),
      piece(),
      { ...piece(), wide: true },
    ],
  },
  {
    id: 'story-1',
    type: 'story',
    heading: 'Clarify what matters',
    chapters: [
      { title: 'Clarify what matters', paragraphs: [CHAPTER, CHAPTER] },
      { title: 'Clarify what matters', paragraphs: [CHAPTER, CHAPTER] },
    ],
    outcome: {
      title: 'Outcome',
      bullets: ['Bulleted item 1', 'Bulleted item 2', 'Bulleted item 3', 'Bulleted item 4'],
      href: '/work/swept',
    },
    media: [
      { ...piece(), span: 3 },
      { ...piece(), span: 3 },
      piece(),
      piece(),
      piece(),
    ],
  },
  {
    id: 'outcome-1',
    type: 'outcome',
    headline: 'This is a headline about the work below like this.',
    lede: LEDE,
    items: [piece(), piece(), piece()],
    testimonial: swept,
  },
  {
    id: 'case-study-1',
    type: 'case-study',
    eyebrow: 'Our work',
    headline: 'This is a statement about who we help and what we do to help them.',
    lede: LEDE,
    slides: [
      { shape: 'landscape', media: { tone: 'error' } },
      { shape: 'portrait', media: { tone: 'orange' } },
      { shape: 'landscape', media: { tone: 'error' } },
      { shape: 'portrait', media: { tone: 'orange' } },
    ],
    chapters: [
      { title: 'Clarify what matters', paragraphs: [CHAPTER, CHAPTER] },
      {
        title: 'Clarify what matters',
        paragraphs: [CHAPTER, CHAPTER.split('. ').slice(0, 2).join('. ') + '.'],
        href: '/work/swept',
      },
    ],
    testimonial: everWonder,
  },
];
