// src/components/TribeBadge.jsx
// Renders a colored tribe badge, optionally linked to the tribe's page.
// Pass noLink=true when already inside a <Link> to avoid nested anchors.
import { Link } from 'react-router-dom';

export default function TribeBadge({ tribe, sid, noLink = false }) {
  if (!tribe) return <span className="tribe-badge-empty">—</span>;

  const badge = (
    <span className="tribe-badge" style={{ background: tribe.color }}>
      {tribe.name}
    </span>
  );

  if (noLink || !sid) return badge;

  return (
    <Link to={`/season/${sid}/tribe/${tribe.tid}`} className="tribe-badge-link">
      {badge}
    </Link>
  );
}
