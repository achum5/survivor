// src/pages/TribePage.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify, ordinal, getTribeColor } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

export default function TribePage() {
  const { sid, tid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const tribe = season.tribes.find((t) => t.tid === tid);
  if (!tribe) return <div className="article"><p>Tribe not found.</p></div>;

  // Members: original tribes by tid, switched tribes by switchedTid
  const members = tribe.phase === 'original'
    ? season.cast.filter((p) => p.tid === tid)
    : season.cast.filter((p) => p.switchedTid === tid);
  const sortedMembers = [...members].sort((a, b) => a.placement - b.placement);

  // Challenge history — episodes where this tribe appears in results
  const challengeRows = [];
  season.episodes.forEach((ep) => {
    [
      { ch: ep.rewardChallenge,   ctype: 'reward'    },
      { ch: ep.immunityChallenge, ctype: 'immunity'  },
    ].forEach(({ ch, ctype }) => {
      if (!ch?.results?.length) return;
      const entry = ch.results.find((r) => r.id === tid);
      if (!entry) return;
      const sitOuts = (ch.sitOuts ?? [])
        .map((pid) => season.cast.find((p) => p.pid === pid))
        .filter(Boolean);
      challengeRows.push({ ep, ch, ctype, place: entry.place, total: ch.results.length, sitOuts });
    });
  });

  const wins   = challengeRows.filter((r) => r.place === 1).length;
  const losses = challengeRows.filter((r) => r.place !== 1).length;

  // Tribal council history
  const tcs = season.votingHistory.filter((tc) => tc.tid === tid);

  const phaseLabel = tribe.phase === 'original' ? 'Original Tribe'
    : tribe.phase === 'switched' ? 'Switched Tribe'
    : 'Tribe';

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: `${tribe.name} Tribe` },
      ]} />

      <h1 className="tribe-page-title" style={{ color: tribe.color }}>
        <span className="tribe-page-color-dot" style={{ background: tribe.color }} />
        {tribe.name}
      </h1>

      {/* Stats bar */}
      <div className="tribe-page-stats">
        <div className="tribe-page-stat">
          <span className="tribe-page-stat-label">Phase</span>
          <span className="tribe-page-stat-value">{phaseLabel}</span>
        </div>
        <div className="tribe-page-stat">
          <span className="tribe-page-stat-label">Members</span>
          <span className="tribe-page-stat-value">{members.length}</span>
        </div>
        {challengeRows.length > 0 && (
          <div className="tribe-page-stat">
            <span className="tribe-page-stat-label">Challenge Record</span>
            <span className="tribe-page-stat-value tribe-page-record">
              <span className="record-wins">{wins}W</span>
              {' – '}
              <span className="record-losses">{losses}L</span>
            </span>
          </div>
        )}
        {tcs.length > 0 && (
          <div className="tribe-page-stat">
            <span className="tribe-page-stat-label">Tribal Councils</span>
            <span className="tribe-page-stat-value">{tcs.filter((tc) => tc.eliminatedPid).length} eliminations</span>
          </div>
        )}
      </div>

      {/* Members */}
      <h2>Members</h2>
      <div className="tribe-page-members">
        {sortedMembers.map((p) => {
          const origTribe = tribe.phase === 'switched'
            ? season.tribes.find((t) => t.tid === p.tid)
            : null;
          return (
            <Link
              key={p.pid}
              to={`/season/${sid}/cast/${slugify(p.name)}`}
              className="tribe-page-member-card"
              style={{ '--tribe-color': tribe.color }}
            >
              <div className="tribe-page-member-photo-wrap">
                {p.photoUrl ? (
                  <img
                    src={p.photoUrl}
                    alt={p.name}
                    className="tribe-page-member-photo"
                    style={p.photoStyle}
                  />
                ) : (
                  <Avatar name={p.name} color={tribe.color} size={72} />
                )}
              </div>
              <div className="tribe-page-member-info">
                <div className="tribe-page-member-name">{p.name}</div>
                <div className="tribe-page-member-placement">{ordinal(p.placement)} place</div>
                {origTribe && (
                  <span className="tribe-badge tribe-page-member-orig" style={{ background: origTribe.color }}>
                    {origTribe.name}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Challenge history */}
      {challengeRows.length > 0 && (
        <>
          <h2>Challenge History</h2>
          <table className="tribe-page-table">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Challenge</th>
                <th>Type</th>
                <th>Result</th>
                <th>Sit-Outs</th>
              </tr>
            </thead>
            <tbody>
              {challengeRows.map((r, i) => {
                const isWin = r.place === 1;
                const result = isWin ? 'Won' : r.total === 2 ? 'Lost' : ordinal(r.place);
                return (
                  <tr key={i}>
                    <td className="tribe-page-tc-ep">
                      <Link to={`/season/${sid}/episode/${r.ep.eid}`}>{r.ep.number}</Link>
                    </td>
                    <td>
                      {r.ch.name
                        ? <Link to={`/season/${sid}/episode/${r.ep.eid}/challenge/${r.ctype}`}>{r.ch.name}</Link>
                        : <span className="text-muted">—</span>}
                    </td>
                    <td>{r.ch.type ?? (r.ctype === 'reward' ? 'Reward' : 'Immunity')}</td>
                    <td>
                      <span className={`tribe-page-result-badge ${isWin ? 'result-win' : 'result-loss'}`}>
                        {result}
                      </span>
                    </td>
                    <td>
                      {r.sitOuts.length > 0
                        ? r.sitOuts.map((p, si) => (
                          <span key={p.pid}>
                            {si > 0 && ', '}
                            <Link to={`/season/${sid}/cast/${slugify(p.name)}`}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={18} photoUrl={p.photoUrl} imgStyle={p.photoStyle} pid={p.pid} />
                              {p.name}
                            </Link>
                          </span>
                        ))
                        : <span className="text-muted">—</span>}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}

      {/* Tribal council history */}
      {tcs.length > 0 && (
        <>
          <h2>Tribal Council History</h2>
          <table className="tribe-page-table">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Notes</th>
                <th>Eliminated</th>
                <th>Vote Breakdown</th>
              </tr>
            </thead>
            <tbody>
              {tcs.map((tc) => {
                const eliminated = tc.eliminatedPid
                  ? season.cast.find((p) => p.pid === tc.eliminatedPid)
                  : null;

                // Build vote breakdown: {targetName: count}
                const voteCounts = {};
                tc.votes.forEach((v) => {
                  voteCounts[v.votedForPid] = (voteCounts[v.votedForPid] ?? 0) + 1;
                });
                const breakdown = Object.entries(voteCounts)
                  .sort(([, a], [, b]) => b - a)
                  .map(([pid, count]) => {
                    const target = season.cast.find((p) => p.pid === pid);
                    return { name: target?.name ?? '?', pid, count };
                  });

                return (
                  <tr key={tc.tcid}>
                    <td className="tribe-page-tc-ep">
                      <Link to={`/season/${sid}/episode/${tc.eid}`}>{tc.episode}</Link>
                    </td>
                    <td>{tc.notes || <span className="text-muted">—</span>}</td>
                    <td>
                      {eliminated ? (
                        <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`}
                          className="tribe-page-eliminated"
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                          <Avatar name={eliminated.name} color={getTribeColor(season, eliminated.tid)} size={20} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle} pid={eliminated.pid} />
                          {eliminated.name}
                        </Link>
                      ) : <span className="text-muted">—</span>}
                    </td>
                    <td className="tribe-page-breakdown">
                      {breakdown.map((b, bi) => {
                        const target = season.cast.find((p) => p.pid === b.pid);
                        return (
                          <span key={b.pid} className="tribe-page-breakdown-entry">
                            {bi > 0 && <span className="breakdown-sep"> · </span>}
                            <Link to={`/season/${sid}/cast/${slugify(b.name)}`}
                              style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                              {target && <Avatar name={target.name} color={getTribeColor(season, target.tid)} size={18} photoUrl={target.photoUrl} imgStyle={target.photoStyle} pid={target.pid} />}
                              {b.name}
                            </Link>
                            <span className="breakdown-count"> ({b.count})</span>
                          </span>
                        );
                      })}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
