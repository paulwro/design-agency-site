/**
 * Engagements page content — Figma 1161:1166
 *
 * PROVENANCE. Two kinds of string live in here:
 *   FIGMA  — lifted verbatim from the file. Do not reword without changing Figma.
 *   DRAFT  — written to fill a slot where Figma repeats instance placeholder
 *            text. Written to match the voice of the FIGMA strings; every one
 *            is Paul's to approve, cut or rewrite.
 *
 * Prices are DRAFT and are the one thing here that cannot be guessed at
 * safely — "Starts at $3,500" is real, the other two are structure, not
 * numbers. Confirm before this page goes anywhere near a client.
 */

// FIGMA 1863:1542 (390 mobile frame). Paul, 2026-10-21: the mobile frame's
// shorter copy is the page's copy at every width.
export const hero = {
  headline: 'You’ve outgrown DIY',
  lede: 'Senior creative support for the moments your business needs to show up stronger.',
};

export const engagementTypes = {
  headline: 'Three ways to move forward',   // FIGMA 1863:1562
  // FIGMA 1863:1564 / 1648 / 1734. The mobile frame ends each intro with the
  // price ("… Starts at $3,500."); here the price stays in its own row so it
  // keeps the contact-link hover (PriceCta), and the intro ends before it.
  cards: [
    {
      title: 'Goals',
      price: 'Starts at $3,500',
      lede: 'Specific outcomes in a focused engagement.',
      items: [
        'Build a bespoke AI image-generation system for your brand',
        'Automate your PDF accessibility and compliance workflow',
        'Turn your brand standards into instructions AI can follow',
        'Make your presentations faster and easier to produce',
      ],
      clients: [
        { label: 'WEX', href: '#' },
        { label: 'Inbox Health', href: '#' },
        { label: 'Pear Suite', href: '#' },
      ],
    },
    {
      title: 'Sprints',
      price: 'Starts at $15,000',
      lede: 'Focused creative engagements for bigger challenges.',
      items: [
        'Reposition or refresh your brand',
        'Build a new visual identity',
        'Redesign and launch your website',
        'Develop a campaign from concept through launch',
        'Rebuild your sales story and presentation system',
      ],
      clients: [
        { label: 'WEX', href: '#' },
        { label: 'Pear Suite', href: '#' },
        { label: 'Inbox Health', href: '#' },
      ],
    },
    {
      title: 'Integrated Partnerships',
      // Paul, Oct 2026: Integrated Partnerships start at $6,000 a month.
      price: 'Starts at $6,000/mo.',
      lede:
        'Ongoing creative support that flexes with your priorities — without adding ' +
        'a full-time hire.',
      items: [
        'Lead brand and creative direction',
        'Give your internal team senior-level creative support',
        'Develop campaigns and initiatives throughout the year',
        'Bring new AI and creative capabilities into your team',
        'Take high-priority creative work off your plate',
      ],
      clients: [
        { label: 'WEX', href: '#' },
        { label: 'Inbox Health', href: '#' },
      ],
    },
  ],
};

export const services = {
  heading: 'Services we offer',   // FIGMA 1863:1828
  // FIGMA 1863:1830–1931. Each service is now one sentence that folds the old
  // five-item list into it.
  cards: [
    {
      title: 'Brand Identity',
      description:
        'Build a distinctive brand foundation — strategy, visual identity, AI-ready ' +
        'standards and toolkits — that makes your business easier to understand and believe in.',
    },
    {
      title: 'Creative Systems',
      description:
        'Smarter ways to create and scale work — AI-enabled workflows, briefing systems, ' +
        'asset libraries, prompt libraries and workflow automation.',
    },
    {
      title: 'Imagery & Content',
      description:
        'A distinctive visual world your team can actually use — bespoke AI image ' +
        'libraries, branded photography systems, social content and image-generation guidelines.',
    },
    {
      title: 'Marketing Communications',
      description:
        'Business objectives turned into ideas people remember and act on — launches, ' +
        'sales presentations, thought leadership, digital and social campaigns.',
    },
    {
      title: 'Digital Experiences',
      description:
        'Websites and digital products that make your business easier to trust and ' +
        'choose — redesigns, design systems, UX/UI, prototypes and SEO-ready content structure.',
    },
    {
      title: 'Creative Leadership',
      description:
        'Experienced creative thinking closer to the decisions that matter — fractional ' +
        'creative direction, brand audits, team support, AI creative strategy and emerging ' +
        'tech evaluation.',
    },
  ],
};

export const whyClients = {
  // FIGMA 1863:1946–1962 (390 frame) — the working headline is now Figma's own.
  heading: 'Why teams choose an agency of one',
  reasons: [
    {
      title: 'Collaborative expertise',
      body:
        'Over 20 years working with mid-market companies, startups, and enterprise ' +
        'organizations — creating brands that stand out and drive results.',
    },
    {
      title: 'Tailored solutions',
      body:
        'We customize our approach to your stage — whether you’re building a foundation ' +
        'or unifying an established identity.',
    },
    {
      title: 'Speed-to-market',
      body:
        'High-quality creative work without the rigidity of a traditional agency or the ' +
        'overhead of a full-time hire.',
    },
  ],
};


/**
 * Engagements FAQ — questions are FIGMA (1161:1264–1266). Answers are written
 * in the studio's "we" voice (Paul, Oct 2026), contractions, options rather than directives, a parenthetical aside or two,
 * "evolve" over "change", and a closing invitation ("Let me know…"). Prices
 * match the cards above and the locked partnership floor. Still Paul's to edit.
 */
export const engagementFaqs = [
  {
    id: 'eng-faq-cost',
    question: 'How much does it cost to work with you?',
    answer:
      'It depends on the size of the decision in front of you. Goals, single clearly ' +
      'defined outcomes, start at $3,500. Sprints, for bigger creative challenges like ' +
      'a repositioning, a new identity, a website, or a campaign, start at $15,000. ' +
      'Integrated Partnerships, ongoing creative direction embedded with your team, ' +
      'start at $6,000 per month. Tell us what you are working on and we will point ' +
      'you to the right fit.',
  },
  {
    id: 'eng-faq-1',
    question: 'What’s the difference between a Goal and a Sprint?',
    answer:
      'A Goal is one clearly defined thing that needs to get done (an AI image ' +
      'system, a smarter briefing process, a presentation template that actually ' +
      'works). You hand it over, we take it from there, and it comes back as a ' +
      'finished piece of work starting at $3,500. A Sprint is for the bigger ' +
      'creative challenge: a repositioning, a new identity, a website, a campaign. ' +
      'It has a defined start and finish, and starts at $15,000. If you can ' +
      'describe the outcome in one sentence, it’s usually a Goal. If you need to ' +
      'work out the outcome first, it’s usually a Sprint. Not sure which fits? ' +
      'Let us know what you’re working on and we’ll tell you.',
  },
  {
    id: 'eng-faq-2',
    question: 'Can you help our team use AI?',
    answer:
      'Yes, and it’s a big part of what we do. Sometimes that means building the ' +
      'systems (a bespoke image-generation library, brand standards written as ' +
      'instructions AI tools can follow, automated production workflows). Other ' +
      'times it’s helping your team decide where AI belongs in how you create, ' +
      'and where it doesn’t. The goal is work that still looks like your company, ' +
      'made faster, rather than one more tool nobody ends up using. Happy to dive ' +
      'further into what that could look like for your team.',
  },
  {
    id: 'eng-faq-3',
    question: 'How do Integrated Partnership engagements work?',
    answer:
      'An Integrated Partnership, often called fractional creative direction, is ' +
      'ongoing creative support set up as a monthly engagement starting at $6,000. ' +
      'We work alongside your team on a regular cadence, leading brand and creative ' +
      'direction, supporting your internal designers, and developing campaigns and ' +
      'initiatives through the year. Priorities evolve as the business does, so the ' +
      'work follows whatever matters most that month, without a full-time hire or an ' +
      'agency relationship to manage. Let us know if you’d like to talk it through.',
  },
  {
    id: 'eng-faq-aaas',
    question: 'What is accomplishments-as-a-service?',
    answer:
      'It is how we describe Goals: a single, clearly defined outcome delivered start ' +
      'to finish, rather than hours or a retainer. Examples include a bespoke AI ' +
      'image-generation system for your brand, an automated PDF accessibility and ' +
      'compliance workflow, a smarter creative intake process, or brand standards ' +
      'turned into instructions AI can follow.',
  },
];
