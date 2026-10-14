import './blocks.css';

/**
 * DividedRow — equal columns separated by hairline rules.
 *
 * Figma: Engagements "Why clients choose us" (4 across, vertical rules) and
 * Studio "How we work" (2 across, each column internally ruled).
 *
 * Columns are `1fr`, so every cell is the same width regardless of content
 * length — same principle as the client logo grid.
 */
export default function DividedRow({ children, columns = 4, rule = 'vertical', className = '' }) {
  return (
    <div
      className={`divided-row divided-row--${rule}${className ? ` ${className}` : ''}`}
      style={{ '--divided-row-columns': columns }}
    >
      {children}
    </div>
  );
}
