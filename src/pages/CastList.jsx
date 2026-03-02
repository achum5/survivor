// src/pages/CastList.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

export default function CastList() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Cast' },
      ]} />

      <h1>Cast — {season.name}: {season.subtitle}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
        {season.cast.length} castaways competed in {season.name}.
      </p>

      <div className="cast-grid">
        {sorted.map((p) => (
          <Link key={p.pid} to={`/season/${sid}/cast/${slugify(p.name)}`} className="cast-card">
            <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={52} photoUrl={p.photoUrl} imgStyle={p.photoStyle} />
            <h3>{p.name}</h3>
            <span className="tribe-badge" style={{ background: getTribeColor(season, p.tid) }}>
              {getTribeName(season, p.tid)}
            </span>
            <span className="placement">{ordinal(p.placement)} place</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
