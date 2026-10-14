import './blocks.css';

/**
 * RuledList — Figma "Unordered List wHorizontal Rules"
 *
 * A list of plain lines separated by hairline rules. Shared by ServiceCard and
 * ServiceListCard. `leadingRule` draws a rule above the first item too, which
 * the full-width card does and the narrow card does not.
 */
export default function RuledList({ items = [], leadingRule = false, trailingRule = false }) {
  return (
    <ul className={`ruled-list${leadingRule ? ' ruled-list--leading-rule' : ''}${trailingRule ? ' ruled-list--trailing-rule' : ''}`}>
      {items.map((item, i) => (
        <li className="ruled-list__item" key={i}>
          {item}
        </li>
      ))}
    </ul>
  );
}
