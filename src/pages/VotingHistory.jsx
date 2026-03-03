// src/pages/VotingHistory.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify, getTribeColor } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

function hexToRgba(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return `rgba(100,100,100,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

const MERGED_COLOR = '#22863a';

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

  // Players sorted best to worst (winner first, first boot last)
  const players = [...season.cast].sort((a, b) => a.placement - b.placement);
  const tcs = season.votingHistory;
  const hasJury = season.juryVotes && season.juryVotes.length > 0;

  function getTribeById(tid) {
    return season.tribes.find((t) => t.tid === tid) || null;
  }

  function getTcPhase(tc) {
    if (!tc.tid) return 'merged';
    const tribe = getTribeById(tc.tid);
    return tribe?.phase || 'original';
  }

  function getTcColor(tc) {
    if (!tc.tid) return MERGED_COLOR;
    return getTribeById(tc.tid)?.color || '#555';
  }

  function getVoteCount(tc) {
    if (tc.votes.length === 0) return 'No vote';
    const counts = {};
    tc.votes.forEach((v) => { counts[v.votedForPid] = (counts[v.votedForPid] || 0) + 1; });
    const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
    if (!tc.eliminatedPid) {
      // Tie or no-elim — show all counts descending
      return sorted.map(([, c]) => c).join('-');
    }
    const forElim = counts[tc.eliminatedPid] || 0;
    const total = tc.votes.length;
    const others = total - forElim;
    return others > 0 ? `${forElim}-${others}` : `${forElim}-0`;
  }

  // Build contiguous phase groups for colspan top header
  const phaseGroups = [];
  tcs.forEach((tc) => {
    const phase = getTcPhase(tc);
    if (!phaseGroups.length || phaseGroups[phaseGroups.length - 1].phase !== phase) {
      phaseGroups.push({ phase, count: 1 });
    } else {
      phaseGroups[phaseGroups.length - 1].count++;
    }
  });

  // Track at which TC index each player was eliminated
  const eliminatedAtIdx = {};
  tcs.forEach((tc, idx) => {
    if (tc.eliminatedPid) eliminatedAtIdx[tc.eliminatedPid] = idx;
  });

  const phaseLabel = { original: 'Original Tribes', switched: 'Switched Tribes', merged: 'Merged Tribe' };
  const phaseHeaderClass = { original: 'vhist-phase-original', switched: 'vhist-phase-switched', merged: 'vhist-phase-merged' };

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Voting History' },
      ]} />

      <h1>Voting History — {season.name}</h1>

      <div className="voting-grid-wrapper">
        <table className="vhist-table">
          <thead>
            {/* Row 1: Phase group headers */}
            <tr>
              <th className="vhist-player-header" rowSpan={3}>Player</th>
              {phaseGroups.map((g, i) => (
                <th key={i} colSpan={g.count} className={`vhist-phase-header ${phaseHeaderClass[g.phase]}`}>
                  {phaseLabel[g.phase]}
                </th>
              ))}
              {hasJury && (
                <th className="vhist-phase-header vhist-phase-jury">Jury Vote</th>
              )}
            </tr>

            {/* Row 2: Eliminated player name per TC */}
            <tr>
              {tcs.map((tc) => {
                const elim = tc.eliminatedPid
                  ? season.cast.find((p) => p.pid === tc.eliminatedPid)
                  : null;
                const color = getTcColor(tc);
                return (
                  <td key={tc.tcid} className="vhist-elim-header"
                    style={{ background: hexToRgba(color, 0.65) }}>
                    {elim ? (
                      <Link to={`/season/${sid}/cast/${slugify(elim.name)}`}
                        style={{ color: '#fff', fontWeight: 700, fontSize: '0.75rem', textDecoration: 'none' }}>
                        {elim.name}
                      </Link>
                    ) : (
                      <span style={{ color: 'rgba(255,255,255,0.45)', fontSize: '0.72rem' }}>
                        {tc.notes || '—'}
                      </span>
                    )}
                  </td>
                );
              })}
              {hasJury && (
                <td className="vhist-elim-header" style={{ background: 'rgba(180,140,50,0.4)', color: '#e8c86a', fontWeight: 700, fontSize: '0.75rem' }}>
                  Jury Vote
                </td>
              )}
            </tr>

            {/* Row 3: Vote counts per TC */}
            <tr>
              {tcs.map((tc) => (
                <td key={tc.tcid} className="vhist-votecount">{getVoteCount(tc)}</td>
              ))}
              {hasJury && <td className="vhist-votecount">{season.juryVotes.length}-vote jury</td>}
            </tr>
          </thead>

          <tbody>
            {players.map((p) => {
              const isWinner = p.pid === season.winnerPid;
              const origTribeColor = getTribeById(p.tid)?.color || '#555';

              return (
                <tr key={p.pid} className={isWinner ? 'vhist-winner-row' : ''}>
                  <td className="vhist-player-name"
                    style={{ borderLeft: `3px solid ${origTribeColor}` }}>
                    <Link to={`/season/${sid}/cast/${slugify(p.name)}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 5 }}>
                      <Avatar name={p.name} color={origTribeColor} size={24} photoUrl={p.photoUrl} imgStyle={p.photoStyle} pid={p.pid} noBorder />
                      {p.name}
                    </Link>
                    {isWinner && <span className="vhist-winner-star"> ★</span>}
                  </td>

                  {tcs.map((tc, tcIdx) => {
                    const alreadyElim = eliminatedAtIdx[p.pid] !== undefined
                      && tcIdx > eliminatedAtIdx[p.pid];
                    const eliminatedHere = tc.eliminatedPid === p.pid;
                    const tcColor = getTcColor(tc);

                    if (alreadyElim) {
                      return <td key={tc.tcid} className="vhist-cell-dead" />;
                    }
                    if (eliminatedHere) {
                      return (
                        <td key={tc.tcid} className="vhist-cell-eliminated"
                          style={{ background: hexToRgba(tcColor, 0.45) }}>
                          🔦
                        </td>
                      );
                    }

                    const voteMap = {};
                    tc.votes.forEach((v) => { voteMap[v.voterPid] = v; });
                    const vote = voteMap[p.pid];
                    const didVote = Object.prototype.hasOwnProperty.call(voteMap, p.pid);

                    if (!didVote) {
                      return <td key={tc.tcid} className="vhist-cell-absent">—</td>;
                    }

                    const votedForName = vote?.votedForPid
                      ? season.cast.find((pl) => pl.pid === vote.votedForPid)?.name ?? '?'
                      : '?';

                    return (
                      <td key={tc.tcid} className="vhist-cell-vote"
                        style={{ background: hexToRgba(tcColor, 0.2) }}>
                        <span style={vote.idolNullified ? { textDecoration: 'line-through', opacity: 0.6 } : undefined}>
                          {votedForName}
                        </span>
                        {vote.idolNullified && <span title="Votes nullified by idol"> 🛡️</span>}
                      </td>
                    );
                  })}

                  {/* Jury vote column */}
                  {hasJury && (() => {
                    const jv = season.juryVotes.find((j) => j.jurorPid === p.pid);
                    if (jv) {
                      const votedForName = season.cast.find((pl) => pl.pid === jv.votedForPid)?.name ?? '?';
                      return (
                        <td className="vhist-cell-vote"
                          style={{ background: 'rgba(180,140,50,0.2)' }}>
                          {votedForName}
                        </td>
                      );
                    }
                    if (p.pid === season.winnerPid) {
                      return <td className="vhist-cell-finalist vhist-cell-winner">Sole Survivor</td>;
                    }
                    if (p.pid === season.runnerUpPid) {
                      return <td className="vhist-cell-finalist">Runner-Up</td>;
                    }
                    return <td className="vhist-cell-dead" />;
                  })()}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 12, fontSize: '0.78rem', color: 'var(--text-muted)' }}>
        🔦 voted out &nbsp;|&nbsp; — did not attend tribal council &nbsp;|&nbsp; 🛡️ vote nullified by idol
      </p>
    </div>
  );
}
