// src/pages/VotingHistory.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerName, getTribeColor, getTribeName, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function VotingHistory() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  if (season.votingHistory.length === 0) {
    return (
      <div className="article">
        <Breadcrumbs crumbs={[
          { label: 'Main Page', to: '/' },
          { label: season.name, to: `/season/${sid}` },
          { label: 'Voting History' },
        ]} />
        <h1>Voting History — {season.name}</h1>
        <p className="empty-state">No voting data yet.</p>
      </div>
    );
  }

  // Players ordered worst placement to best (left = first boot, right = winner)
  const columns = [...season.cast].sort((a, b) => b.placement - a.placement);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Voting History' },
      ]} />

      <h1>Voting History — {season.name}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.88rem' }}>
        Each column represents a player. Each row represents a tribal council.
        The cell shows who that player voted for.
      </p>

      <div className="voting-grid-wrapper">
        <table className="voting-grid">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Episode</th>
              <th style={{ textAlign: 'left' }}>Tribal</th>
              {columns.map((p) => (
                <th key={p.pid} className="player-header">
                  <Link
                    to={`/season/${sid}/cast/${slugify(p.name)}`}
                    style={{ color: getTribeColor(season, p.tid), textDecoration: 'none', fontSize: '0.75rem' }}
                  >
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {season.votingHistory.map((tc) => {
              // Build lookup: voterPid → votedForPid for this TC
              const voteMap = {};
              tc.votes.forEach((v) => { voteMap[v.voterPid] = v.votedForPid; });

              // Players who voted in this TC
              const voterPids = new Set(tc.votes.map((v) => v.voterPid));

              return (
                <tr key={tc.tcid}>
                  <td className="ep-label">Ep. {tc.episode}</td>
                  <td className="ep-label" style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {tc.notes || (tc.tid ? getTribeName(season, tc.tid) : 'Merged')}
                  </td>
                  {columns.map((p) => {
                    const didVote = voterPids.has(p.pid);
                    const votedForPid = voteMap[p.pid];
                    const isEliminated = tc.eliminatedPid === p.pid;
                    const votedForName = votedForPid ? getPlayerName(season, votedForPid) : null;

                    return (
                      <td
                        key={p.pid}
                        className={
                          isEliminated ? 'cell-eliminated' :
                          !didVote ? 'cell-absent' : ''
                        }
                        title={isEliminated ? `${p.name} was eliminated this episode` : ''}
                      >
                        {isEliminated ? '🔦' : didVote ? (votedForName || '?') : '—'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        🔦 = eliminated at this tribal council &nbsp;|&nbsp; — = did not attend
      </p>
    </div>
  );
}
