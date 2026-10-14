import './InfoCard.css';

/**
 * InfoCard — Figma 1074:1211
 * Sidebar card on the Contact page: heading, email, phone, then the location
 * line set 16 apart. The trailing icon tile is gone from the Figma frame.
 */
export default function InfoCard({
  heading = 'Project inquiries or friend requests',
  location = 'Ridgefield, CT • USA',
  email = 'hello@paulwro.com',
  phone = '203 506 0030',
}) {
  return (
    <aside className="info-card" aria-label="Contact information">
      <p className="info-card__heading">{heading}</p>

      <div className="info-card__content">
        <a className="info-card__line info-card__link" href={`mailto:${email}`}>
          {email}
        </a>
        <a className="info-card__line info-card__link" href={`tel:${phone.replace(/\s/g, '')}`}>
          {phone}
        </a>
        <p className="info-card__line info-card__location">{location}</p>
      </div>
    </aside>
  );
}
