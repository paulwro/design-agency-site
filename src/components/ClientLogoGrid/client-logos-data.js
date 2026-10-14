import inboxhealth from '../../assets/client-logos/inboxhealth.svg';
import pearsuite from '../../assets/client-logos/pearsuite.svg';
import solargator from '../../assets/client-logos/solargator.svg';
import cinch from '../../assets/client-logos/cinch.svg';
import act from '../../assets/client-logos/act.svg';
import cpx from '../../assets/client-logos/cpx.svg';
import globalCommerce from '../../assets/client-logos/global-commerce.svg';
import elliptica from '../../assets/client-logos/elliptica.svg';

/**
 * THE ARTBOARD IS THE SIZING SYSTEM. Every file in assets/client-logos is a
 * 240 x 87.27 SVG with the mark already placed and sized inside it (Figma
 * 1759:*). The grid renders each one into a 240-wide cell at that same ratio,
 * scaled together, so a wide wordmark and a tall mark are equitable because
 * they were drawn that way — nothing in code resizes a logo. To add one: draw
 * it on a 240 x 87.27 artboard at the visual weight of the others, export SVG,
 * drop it in. Single-colour artwork only; the mark is painted with
 * --color-text so it inverts in dark mode.
 *
 * Order is reading order, left to right then down.
 */
export const clientLogos = [
  { name: 'Inbox Health', alt: 'Inbox Health logo', src: inboxhealth },
  { name: 'Pear Suite', alt: 'Pear Suite logo', src: pearsuite },
  // Alt text is deliberately generic: this client's name stays out of the code.
  { name: 'Global commerce platform', alt: 'Global commerce platform', src: globalCommerce },
  { name: 'Cinch', alt: 'Cinch logo', src: cinch },
  { name: 'ACT', alt: 'A Contemporary Theatre of Connecticut logo', src: act },
  { name: 'CPX', alt: 'CPX logo', src: cpx },
  { name: 'SolarGator', alt: 'SolarGator logo', src: solargator },
  { name: 'Elliptica', alt: 'Elliptica logo', src: elliptica },
];

export default clientLogos;
