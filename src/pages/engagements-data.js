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

// FIGMA 1388:1468
export const hero = {
  headline: 'You’ve outgrown DIY (esp. with AI) – and it’s showing',
  lede:
    'Teams from startup to enterprise rarely need more design for its own sake. They need senior ' +
    'creative help when how the business shows up has consequences, and an ' +
    'engagement sized to the decision in front of them rather than a default ' +
    'retainer or another vendor layer.',
};

export const engagementTypes = {
  headline: 'Three ways to move forward',   // FIGMA 1161:1229 (eyebrow + lede were cut)
  // FIGMA 1651:1464 / 1465 / 1484 — titles, ledes and lists are all Paul's text.
  cards: [
    {
      title: 'Goals',
      price: 'Starts at $3,500',
      lede: 'Let us help you crush your objectives. We offer accomplishments-as-a-service:',
      items: [
        'Build a bespoke AI image-generation system for your brand',
        'Automate your PDF accessibility and compliance workflow',
        'Build a smarter creative intake and briefing process',
        'Turn your brand standards into instructions AI can follow',
        'Make your presentations faster and easier to produce',
      ],
      clients: [
        { label: 'WEX', href: '#' },
        { label: 'Pear Suite', href: '#' },
        { label: 'Inbox Health', href: '#' },
        { label: 'Partner Name', href: '#' },
      ],
    },
    {
      title: 'Sprints',
      price: 'Starts at $15,000',
      lede: 'Focused engagements for bigger creative challenges.',
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
        { label: 'Partner Name', href: '#' },
      ],
    },
    {
      title: 'Integrated Partnerships',
      // Paul, Oct 2026: Integrated Partnerships start at $6,000 a month (this
      // reverses the earlier $3,500/month Figma figure). Written "/mo." on the card.
      price: 'Starts at $6,000/mo.',
      lede:
        'Ongoing creative support that flexes with your priorities, without adding ' +
        'another full-time hire or traditional agency relationship.',
      items: [
        'Lead brand and creative direction',
        'Give your internal creative team senior-level support',
        'Develop campaigns and initiatives throughout the year',
        'Bring new AI and creative capabilities into your team',
        'Take high-priority creative work off your plate',
      ],
      clients: [
        { label: 'WEX', href: '#' },
        { label: 'Pear Suite', href: '#' },
        { label: 'Inbox Health', href: '#' },
        { label: 'Partner Name', href: '#' },
      ],
    },
  ],
};

export const services = {
  heading: 'Services we offer',   // FIGMA — step 3 headline
  // FIGMA 1189:1560 — all six cards are written in the file.
  cards: [
    {
      title: 'Brand Identity',
      lede:
        'Build a distinctive brand foundation that makes your business easier to ' +
        'understand, recognize and believe in.',
      items: [
        'Brand strategy and positioning',
        'Brand refreshes and rebrands',
        'Visual identity systems',
        'AI-ready brand standards',
        'Brand templates and toolkits',
      ],
    },
    {
      title: 'Creative Systems',
      lede:
        'Build smarter ways to create, manage and scale great work across your ' +
        'team, partners and tools.',
      items: [
        'AI-enabled creative workflows',
        'Creative intake and briefing systems',
        'Brand asset libraries',
        'Prompt and instruction libraries',
        'Creative workflow automation',
      ],
    },
    {
      title: 'Imagery & Content',
      lede:
        'Create a distinctive visual world your team can use without looking like ' +
        'everyone else.',
      items: [
        'Bespoke AI image libraries',
        'Branded photography systems',
        'AI photography and image generation',
        'Social content systems',
        'Image-generation guidelines',
      ],
    },
    {
      title: 'Marketing Communications',
      lede:
        'Turn business objectives into ideas and communications people understand, ' +
        'remember and act on.',
      items: [
        'Product and service launches',
        'Sales presentations',
        'E-books and thought leadership',
        'Digital and social campaigns',
        'Campaign concepts',
      ],
    },
    {
      title: 'Digital Experiences',
      lede:
        'Create digital experiences that make your business easier to understand, ' +
        'trust and choose.',
      items: [
        'New/redesigned websites',
        'SEO and AEO-ready content structure',
        'Digital prototypes',
        'Website design systems',
        'UX/UI design',
      ],
    },
    {
      title: 'Creative Leadership',
      lede:
        'Bring experienced creative thinking closer to the business and the ' +
        'decisions shaping what comes next.',
      items: [
        'Fractional creative direction',
        'Brand and creative audits',
        'Internal creative team support',
        'AI creative strategy',
        'Emerging technology evaluation',
      ],
    },
  ],
};

export const whyClients = {
  // Figma 1195:1635. The headline is still Figma's literal placeholder
  // ("This is a headline about why people choose us"); working headline set Oct 2026,
  // replace when Paul supplies his own. The three columns are real copy.
  heading: 'Why teams choose an agency of one',
  reasons: [
    {
      title: 'Collaborative expertise',
      body:
        'With over 20 years of experience working with mid-market companies, startups, ' +
        'and enterprise organizations, we know how to work together to create brands ' +
        'that stand out and drive results.',
    },
    {
      title: 'Tailored solutions',
      body:
        'No matter where you are in your branding journey, we customize our approach to ' +
        'meet your unique needs—whether you’re building a foundation or unifying an ' +
        'established identity.',
    },
    {
      title: 'Speed-to-market',
      body: 'Get high-quality work without the rigidity of a traditional agency.',
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
