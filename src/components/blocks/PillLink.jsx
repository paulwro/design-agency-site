import './blocks.css';

/**
 * PillLink — Figma "Pill Container Link" 1189:1477 / 1189:1479
 * Styling lives in styles/controls.css alongside the rest of the control set.
 */
export default function PillLink({ label, href = '#' }) {
  return (
    <a className="pill-link" href={href}>
      {label}
      <span className="pill-link__arrow" aria-hidden="true" />
    </a>
  );
}
