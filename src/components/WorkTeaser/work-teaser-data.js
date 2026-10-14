import inboxhealthLogo from '../../assets/home-logos/inboxhealth.svg';
import realizeitLogo from '../../assets/home-logos/realizeit.svg';
import darLogo from '../../assets/home-logos/dar.svg';
import wigginxLogo from '../../assets/home-logos/wigginx.svg';

// Each logo is a 200 x 73 artboard exported from Figma (1015:946) with the
// mark already placed and sized inside it, so the row stays equitable without
// any resizing in code. To swap one, draw it on a 200 x 73 artboard and drop the
// SVG into assets/home-logos. Single-colour artwork only (painted with --color-text).
export const clientLogos = [
  { id: 'inboxhealth', logo: inboxhealthLogo, alt: 'Inbox Health' },
  { id: 'realizeit', logo: realizeitLogo, alt: 'Realize it' },
  { id: 'dar', logo: darLogo, alt: 'Digital Asset Redemption' },
  { id: 'wigginx', logo: wigginxLogo, alt: 'Wiggin(x)' },
];

// Work sample cards for the drag-scroll carousel. No real portfolio media
// yet, so each entry renders as a solid placeholder until Paul supplies
// video/image assets.
export const workSamples = [{ id: 'sample-1' }, { id: 'sample-2' }, { id: 'sample-3' }, { id: 'sample-4' }];
