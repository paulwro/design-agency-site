import sweptLogo from '../../assets/testimonials/swept-logo.svg';
import everWonderLogo from '../../assets/testimonials/ever-wonder-logo.svg';
import solarGatorLogo from '../../assets/testimonials/solargator-logo.svg';
import sema4Logo from '../../assets/testimonials/sema4-logo.svg';
import noteworthyLogo from '../../assets/testimonials/noteworthy-logo.svg';

// To add a card, five inputs are needed: the company logo (svg, saved into
// ../../assets/testimonials/), the quote, the person's name, their title,
// and their company name (title + company become `role`, company alone is
// `logoAlt`). logoWidth/logoHeight are the mark's rendered pixel size —
// derive them from the logo file's own aspect ratio at a height that reads
// as visually balanced against the other cards (swept is 36px tall,
// ever-wonder is 88px tall — narrow/tall marks need more height than
// wide/short ones to carry similar visual weight).
const SHARED_QUOTE =
  'We recently worked with Paul to update our website and branding. Paul was thoughtful, grounded and listened carefully to what we needed. He delivered a clear proposal that accurately reflected what we asked for and delivered on time, in scope. Both his work and his approach were professional and on point.\u201d';

export const testimonials = [
  {
    id: 'swept-audas',
    quote: SHARED_QUOTE,
    name: 'Michelle Audas',
    role: 'CEO, Swept',
    logo: sweptLogo,
    logoAlt: 'Swept',
    logoWidth: 111,
    logoHeight: 36,
  },
  {
    id: 'ever-wonder-sena',
    quote: SHARED_QUOTE,
    name: 'Brian Sena',
    role: 'Founder/Principal, Ever Wonder',
    logo: everWonderLogo,
    logoAlt: 'Ever Wonder',
    logoWidth: 41,
    logoHeight: 88,
  },
  {
    id: 'sema4-deluca',
    quote:
      'Paul worked on the logo design for the rebranding of my company. The logos he delivered were exactly what we were looking for. His talent and passion for graphic design were clear throughout the process and his professional work demeanor made him a pleasure to work with. I also appreciated his strategic thinking and strong attention to detail. I highly recommend working with Paul for your next project!\u201d',
    name: 'Anika Deluca',
    role: 'Creative Director, Sema4',
    logo: sema4Logo,
    logoAlt: 'Sema4',
    logoWidth: 150,
    logoHeight: 32,
  },
  {
    id: 'solargator-beck',
    quote:
      'Paul took our vision for SolarGator.ai and made it real\u2014his creativity, energy+tech experience, and attention to detail raised the bar. Fast, collaborative, and always on point. Highly recommend Paul for anyone needing standout digital design!\u201d',
    name: 'Jason Beck',
    role: 'Partner, SolarGator',
    logo: solarGatorLogo,
    logoAlt: 'SolarGator',
    logoWidth: 84,
    logoHeight: 56,
  },
  {
    id: 'noteworthy-berntsen',
    quote:
      "Paul has an incredible ability to get inside the customers mind and find their underlying wants and needs, and then translate that to breakthrough copy and beautiful, clean designs. Whether you sell via traditional media like mail, or digital, Paul just gets it done, and he's one of the most collaborative, helpful, frictionless people you'll ever meet.\u201d",
    name: 'Joel Berntsen',
    role: 'Head of Marketing, Noteworthy.ai',
    logo: noteworthyLogo,
    logoAlt: 'Noteworthy.ai',
    logoWidth: 190,
    logoHeight: 30,
  },
];
