// src/pages/Challenges.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, slugify } from '../utils/helpers';
import TribeBadge from '../components/TribeBadge';
import Avatar from '../components/Avatar';

export default function Challenges() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  // Aggregate all challenges from episode objects
  const rows = [];
  season.episodes.forEach((ep) => {
    const pairs = [
      { ch: ep.rewardChallenge,   ctype: 'reward',   label: 'Reward' },
      { ch: ep.immunityChallenge, ctype: 'immunity',  label: 'Immunity' },
    ];
    pairs.forEach(({ ch, ctype, label }) => {
      if (!ch || (!ch.name && !ch.winner)) return;
      rows.push({ ep, ch, ctype, label });
    });
  });

  if (rows.length === 0) {
    return (
      <div className="article">
        <h1>Challenges — {season.name}</h1>
        <p className="empty-state">No challenge data yet.</p>
      </div>
    );
  }

  function WinnerCell({ winnerId }) {
    if (!winnerId) return <span style={{ color: 'var(--text-muted)' }}>—</span>;
    const tribe = season.tribes.find((t) => t.tid === winnerId);
    if (tribe) return <TribeBadge tribe={tribe} sid={sid} />;
    const player = season.cast.find((p) => p.pid === winnerId);
    if (player) return (
      <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={30} photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} noBorder />
        {player.name}
      </Link>
    );
    return <span>{winnerId}</span>;
  }

  return (
    <div className="article">
      <h1>Challenges — {season.name}</h1>

      <table className="challenge-table">
        <thead>
          <tr>
            <th>Episode</th>
            <th>Type</th>
            <th>Challenge</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(({ ep, ch, ctype, label }) => (
            <tr key={`${ep.eid}-${ctype}`}>
              <td>
                <Link to={`/season/${sid}/episode/${ep.eid}`}>Ep. {ep.number}</Link>
              </td>
              <td>
                <span className={ctype === 'immunity' ? 'challenge-type-immunity' : 'challenge-type-reward'}>
                  {ctype === 'immunity' ? '🛡️ ' : '🎁 '}{label}
                </span>
              </td>
              <td>
                <Link to={`/season/${sid}/episode/${ep.eid}/challenge/${ctype}`}>
                  {ch.name ?? <em style={{ color: 'var(--text-muted)' }}>Unknown</em>}
                </Link>
              </td>
              <td><WinnerCell winnerId={ch.winner} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
