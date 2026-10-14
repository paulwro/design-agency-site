import './blocks.css';

/**
 * ClientLineList — Figma "Client Logos-Descript Container" (1371:1399)
 *
 * Studio's client roster. Deliberately NOT ClientLogoGrid: that block is the
 * Contact page's equalised logo wall (1658:1509). This one is a ruled line
 * list — symbol tile, client name, and a right-aligned description — inside a
 * --container box at p-24 / radius 20, rules spanning the padded width.
 *
 * The description sits at opacity 80 in Figma, which is its own value: not the
 * 50% that maps to --color-text-muted. Kept explicit for that reason.
 *
 * A full-colour `tile` (a 56px SVG that already carries its own background and
 * rounded corners — Figma gives each client its own) overrides everything below.
 *
 * THE TILE. Figma puts a 34px SQUARE mark inside a 56px black tile. The
 * project only has horizontal wordmarks, and masking one into a 34px square
 * crushes it to an illegible sliver — which is exactly what it looked like.
 * So a wordmark is not used here at all: each client shows a monogram until a
 * real square mark exists. Pass `mark` (a square SVG) and it takes over; the
 * monogram is the fallback, not the target.
 */
function initials(name) {
  const words = name.replace(/[^A-Za-z0-9 ]/g, '').trim().split(/\s+/);
  if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
  const w = words[0] || '';
  return (w.length <= 3 ? w : w.slice(0, 2)).toUpperCase();
}

export default function ClientLineList({ entries = [] }) {
  return (
    <ul className="client-line-list">
      {entries.map(({ name, description, mark, monogram, tile }) => (
        <li className="client-line-list__row" key={name + description}>
          <span className="client-line-list__symbol-name">
            {tile ? (
              <img className="client-line-list__tile-img" src={tile} alt="" width="56" height="56" />
            ) : (
            <span className="client-line-list__tile">
              {mark ? (
                <span
                  className="client-line-list__mark"
                  role="img"
                  aria-label={name}
                  style={{ maskImage: `url("${mark}")`, WebkitMaskImage: `url("${mark}")` }}
                />
              ) : (
                <span className="client-line-list__monogram" aria-hidden="true">
                  {monogram || initials(name)}
                </span>
              )}
            </span>
            )}
            <span className="client-line-list__name">{name}</span>
          </span>
          <span className="client-line-list__description">{description}</span>
        </li>
      ))}
    </ul>
  );
}
