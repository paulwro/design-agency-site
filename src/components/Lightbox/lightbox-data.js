/**
 * Lightbox content — one entry per slug.
 *
 * A lightbox is a column of blocks, in order. Two kinds, taken from Figma
 * 1785:1438 (Content Column):
 *   { type: 'image', src, alt, caption, video? }   a 700px-tall media panel + caption
 *   { type: 'text',  headline, paragraphs[] }      a 760px-max reading column
 *
 * Add a case study by adding a slug here; its "Read more" link is
 * `/work/<slug>`. Insights open from `/insight/<slug>`. Unknown slugs fall
 * back to the placeholder so a link never lands on nothing.
 */
const LOREM =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';

const placeholder = () => ({
  blocks: [
    { type: 'image', caption: 'This is a caption for the image above.' },
    { type: 'text', headline: 'This is a headline', paragraphs: [LOREM] },
  ],
});

export const lightboxes = {
  work: {
    swept: placeholder(),
  },
  insight: {
    featured: placeholder(),
  },
};

export function getLightbox(kind, slug) {
  return lightboxes[kind]?.[slug] ?? placeholder();
}
