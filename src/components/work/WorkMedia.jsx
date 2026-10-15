import Reveal from '../blocks/Reveal';
import { ScrollSettle, Parallax } from '../blocks/ScrollMotion';

/* Each piece reveals on its own (low threshold: several are taller than a laptop viewport). */
const IN = { amount: 0.1 };
import './work.css';

/**
 * Work page primitives — Figma "Img or Video_Step 0_Step 0" / "Img_Text".
 *
 * Every module on the Work page is built from these. `media` is one of
 *   { src, alt }                      an image
 *   { type: 'video', src, poster }    a muted looping clip
 *   {}                                a placeholder until the asset exists
 * `tone` only tints a placeholder (the case-study carousel uses it in Figma).
 */
export function Media({ media = {}, ratio }) {
  const { type, src, poster, alt = '', tone } = media;
  return (
    <ScrollSettle className="work-media" data-tone={tone} style={ratio ? { '--ratio': ratio } : undefined}>
      {src && type === 'video' ? (
        <Parallax>
          <video src={src} poster={poster} autoPlay muted loop playsInline aria-label={alt || undefined} />
        </Parallax>
      ) : src ? (
        <Parallax>
          <img src={src} alt={alt} loading="lazy" />
        </Parallax>
      ) : null}
    </ScrollSettle>
  );
}

/** Media plus its two-line caption. Either caption line may be omitted. */
export function Figure({ media, client, description, ratio, inset = false, className = '', delay = 0 }) {
  return (
    <Reveal as="figure" delay={delay} {...IN} className={`work-figure${inset ? ' work-figure--inset' : ''} ${className}`.trim()}>
      <Media media={media} ratio={ratio} />
      {(client || description) && (
        <figcaption className="work-figure__caption">
          {client && <span className="work-figure__client">{client}</span>}
          {description && <span className="work-figure__desc">{description}</span>}
        </figcaption>
      )}
    </Reveal>
  );
}

/** Figma "Case study chapter": a step-1 title over one or more soft paragraphs. */
export function Chapter({ title, paragraphs = [], strong = false, children, delay = 0 }) {
  return (
    <Reveal delay={delay} {...IN} className={`work-chapter${strong ? ' work-chapter--strong' : ''}`}>
      <p className="work-chapter__title">{title}</p>
      {paragraphs.length > 0 && (
        <div className="work-chapter__body">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 32)}>{p}</p>
          ))}
        </div>
      )}
      {children}
    </Reveal>
  );
}

/** Logo drawn as a mask so it takes whatever colour its surface needs. */
export function Logo({ src, alt, width, height, className = '' }) {
  return (
    <span
      className={`work-logo ${className}`.trim()}
      role="img"
      aria-label={alt}
      style={{ width, height, maskImage: `url("${src}")`, WebkitMaskImage: `url("${src}")` }}
    />
  );
}

/** Figma "Testimonial" (Feature / Outcome): quote across cols 2–3, byline and logo beneath. */
export function PullQuote({ quote, name, role, logo }) {
  return (
    <Reveal {...IN} className="work-quote">
      <p className="work-quote__text">
        <span aria-hidden="true">“</span>
        <span>{quote}”</span>
      </p>
      <p className="work-quote__by">
        {name}
        <br />
        {role}
      </p>
      {logo && <Logo {...logo} className="work-quote__logo" />}
    </Reveal>
  );
}

/** Figma "Text Link": the site's underlined text link. */
export function ReadMore({ href, children = 'Read more' }) {
  return (
    <a className="text-link" href={href}>
      {children}
    </a>
  );
}
