import './blocks.css';

/**
 * SectionHeader — Figma "Step 0_Step 4_Step 0"
 *
 * The eyebrow / headline / lede stack that opens most sections, with an
 * optional CTA beneath. Used by Engagements and Studio.
 *
 * `level` picks the headline step: 4 is the Home/Engagements size, 3 is the
 * smaller one every Studio section uses. Figma binds these per section, so it
 * is a prop rather than something to infer from where the block is placed.
 *
 * NOTE: ExpertiseSection, EngagementsSection and WorkTeaser each hand-roll this
 * same stack with their own class names. They are working and untouched —
 * migrating them to this block is available but has not been done.
 */
export default function SectionHeader({
  eyebrow,
  headline,
  lede,
  cta,
  as: Heading = 'h2',
  width = 'two-thirds',
  level = 4,
}) {
  return (
    <header className={`section-header section-header--${width} section-header--step-${level}`}>
      {eyebrow && <p className="section-header__eyebrow">{eyebrow}</p>}
      <Heading className="section-header__headline">{headline}</Heading>
      {lede && <p className="section-header__lede">{lede}</p>}
      {cta && (
        <a className="btn-primary section-header__cta" href={cta.href}>
          {cta.label}
        </a>
      )}
    </header>
  );
}
