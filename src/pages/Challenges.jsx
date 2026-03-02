// src/pages/Challenges.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerName, getTribeName, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Challenges() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  if (season.challenges.length === 0) {
    return (
      <div className="article">
        <Breadcrumbs crumbs={[
          { label: 'Main Page', to: '/' },
          { label: season.name, to: `/season/${sid}` },
          { label: 'Challenges' },
        ]} />
        <h1>Challenges — {season.name}</h1>
        <p className="empty-state">No challenge data yet.</p>
      </div>
    );
  }

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Challenges' },
      ]} />

      <h1>Challenges — {season.name}</h1>

      <table className="challenge-table">
        <thead>
          <tr>
            <th>Episode</th>
            <th>Type</th>
            <th>Name</th>
            <th>Description</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {season.challenges.map((c) => {
            const winnerName = c.winnerPid ? getPlayerName(season, c.winnerPid) : null;
            const winnerDisplay = winnerName ? (
              <Link to={`/season/${sid}/cast/${slugify(winnerName)}`}>
                {winnerName}
              </Link>
            ) : c.winnerTid ? (
              getTribeName(season, c.winnerTid)
            ) : (
              'TBD'
            );
            return (
              <tr key={c.cid}>
                <td>Ep. {c.episode}</td>
                <td>
                  <span className={c.type === 'Immunity' ? 'challenge-type-immunity' : 'challenge-type-reward'}>
                    {c.type === 'Immunity' ? '🛡️ ' : '🎁 '}{c.type}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td style={{ color: 'var(--text-muted)' }}>{c.description}</td>
                <td>{winnerDisplay}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
