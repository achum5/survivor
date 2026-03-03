// src/pages/PlayerPage.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerBySlug, getTribeColor, getTribeName, getPlayerName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';
import { usePhotoEditor } from '../context/PhotoEditorContext';
import TribeBadge from '../components/TribeBadge';
import Avatar from '../components/Avatar';

// ── Helpers ────────────────────────────────────────────────────────────────

// Determine the episode number where switched tribes first appeared
function getSwitchEpisode(season) {
  const tc = season.votingHistory.find((tc) => {
    const tribe = season.tribes.find((t) => t.tid === tc.tid);
    return tribe?.phase === 'switched';
  });
  return tc?.episode ?? Infinity;
}

// Determine the episode number where merge first appeared
function getMergeEpisode(season) {
  const tc = season.votingHistory.find((tc) => !tc.tid);
  return tc?.episode ?? Infinity;
}

// Get the tribe id the player was on during a given episode
function getTribeAtEpisode(player, episode, switchEp, mergeEp) {
  if (episode >= mergeEp) return null; // merged, no tribe
  if (episode >= switchEp) return player.switchedTid ?? player.tid;
  return player.tid;
}

// ── Challenge History Tab ───────────────────────────────────────────────────

function ResultBadge({ result }) {
  if (!result) return <span className="pchall-result-empty">—</span>;
  const isWin = result === 'Won' || result === '1st';
  const isLoss = result === 'Lost';
  return (
    <span className={`pchall-result ${isWin ? 'pchall-result-win' : isLoss ? 'pchall-result-loss' : 'pchall-result-mid'}`}>
      {result}
    </span>
  );
}

function ChallengeHistoryTab({ player, season, sid }) {
  const switchEp = getSwitchEpisode(season);
  const mergeEp = getMergeEpisode(season);

  // Build a flat list of challenge rows: one row per challenge entry per episode
  const rows = [];
  season.episodes.forEach((ep) => {
    const challenges = [];
    if (ep.rewardChallenge?.name || ep.rewardChallenge?.winner) {
      challenges.push({ ch: ep.rewardChallenge, label: 'rewardChallenge' });
    }
    if (ep.immunityChallenge?.name || ep.immunityChallenge?.winner) {
      challenges.push({ ch: ep.immunityChallenge, label: 'immunityChallenge' });
    }

    const tribeId = getTribeAtEpisode(player, ep.number, switchEp, mergeEp);
    const tribe = tribeId ? season.tribes.find((t) => t.tid === tribeId) : null;

    challenges.forEach((entry, i) => {
      const { ch } = entry;
      const ctype = entry.label === 'rewardChallenge' ? 'reward' : 'immunity';
      const sitOut = ch.sitOuts?.includes(player.pid) ?? false;

      // Determine player result from ch.results (array of {id, place}) — id can be pid or tid
      let result = null;
      if (ch.results && ch.results.length > 0) {
        const myId = tribeId ?? player.pid; // individual challenges use pid
        const resultEntry = ch.results.find((r) => r.id === myId || r.id === player.pid);
        if (resultEntry) {
          result = resultEntry.place === 1 ? (ch.results.length === 2 ? 'Won' : '1st')
                 : resultEntry.place === 2 ? (ch.results.length === 2 ? 'Lost' : '2nd')
                 : `${ordinal(resultEntry.place)}`;
        } else {
          result = 'Lost';
        }
      } else if (sitOut) {
        result = null;
      }

      rows.push({
        epNumber: ep.number,
        eid: ep.eid,
        epRowSpan: challenges.length,
        epRowIndex: i,
        tribe,
        name: ch.name,
        type: ch.type ?? (ctype === 'reward' ? 'Reward' : 'Immunity'),
        ctype,
        sitOut,
        result,
      });
    });
  });

  // Compute tribe group spans: merge consecutive rows with the same tribe into one cell
  let gi = 0;
  while (gi < rows.length) {
    const curTid = rows[gi].tribe?.tid ?? null;
    let gj = gi;
    while (gj < rows.length && (rows[gj].tribe?.tid ?? null) === curTid) gj++;
    rows[gi].tribeGroupStart = true;
    rows[gi].tribeGroupSpan = gj - gi;
    for (let k = gi + 1; k < gj; k++) rows[k].tribeGroupStart = false;
    gi = gj;
  }

  const isWinner   = player.pid === season.winnerPid;
  const isRunnerUp = player.pid === season.runnerUpPid;
  const wasEliminated = season.votingHistory.some((tc) => tc.eliminatedPid === player.pid);

  if (rows.length === 0) {
    return <p className="empty-state">No challenge data yet.</p>;
  }

  return (
    <div className="pchall-wrap">
      <table className="pchall-table">
        <thead>
          <tr>
            <th>Episode</th>
            <th>Tribe</th>
            <th>Challenge</th>
            <th>Type</th>
            <th>Sit-Out?</th>
            <th>Result</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {row.epRowIndex === 0 && (
                <td rowSpan={row.epRowSpan} className="pchall-ep-cell">
                  <Link to={`/season/${sid}/episode/${row.eid}`}>{row.epNumber}</Link>
                </td>
              )}
              {row.tribeGroupStart && (
                <td rowSpan={row.tribeGroupSpan} className="pchall-tribe-cell">
                  {row.tribe ? (
                    <TribeBadge tribe={row.tribe} sid={sid} />
                  ) : (
                    <span className="tribe-badge tribe-badge-merged">Merged</span>
                  )}
                </td>
              )}
              <td className="pchall-name-cell">
                {row.name ? (
                  <Link to={`/season/${sid}/episode/${row.eid}/challenge/${row.ctype}`}>
                    {row.name}
                  </Link>
                ) : '—'}
              </td>
              <td className="pchall-type-cell">{row.type}</td>
              <td className="pchall-sitout-cell">{row.sitOut ? 'Yes' : 'No'}</td>
              <td className="pchall-result-cell"><ResultBadge result={row.result} /></td>
            </tr>
          ))}
          {(wasEliminated || isWinner || isRunnerUp) && (
            <tr className="pchall-votedout">
              <td colSpan={6}>
                {isWinner ? 'Sole Survivor' : isRunnerUp ? 'Runner-Up' : 'Voted Out'}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

// ── Voting History Tab ──────────────────────────────────────────────────────

function VotingHistoryTab({ player, season, sid }) {
  const switchEp = getSwitchEpisode(season);
  const mergeEp = getMergeEpisode(season);

  // Group TCs by episode
  const tcsByEp = {};
  season.votingHistory.forEach((tc) => {
    if (!tcsByEp[tc.episode]) tcsByEp[tc.episode] = [];
    tcsByEp[tc.episode].push(tc);
  });

  const eliminatedEp = season.votingHistory.find((tc) => tc.eliminatedPid === player.pid)?.episode ?? null;

  // Build row entries — no separator rows, phase shown via row background
  const tableRows = [];
  let playerOut = false;

  season.episodes.forEach((ep) => {
    if (playerOut) return;
    const epNum = ep.number;
    const tribeId = getTribeAtEpisode(player, epNum, switchEp, mergeEp);
    const tribe = tribeId ? season.tribes.find((t) => t.tid === tribeId) : null;
    const isMerged = epNum >= mergeEp;
    const isSwitched = epNum >= switchEp && !isMerged;
    const phase = isMerged ? 'merged' : isSwitched ? 'switched' : 'original';

    // Individual immunity: player won the immunity challenge this episode
    const indivImmune = isMerged && ep.immunityChallenge?.winner === player.pid;

    const episodeTcs = tcsByEp[epNum] ?? [];
    const playerTcs = isMerged
      ? episodeTcs
      : episodeTcs.filter((tc) => tc.tid === tribeId);

    if (playerTcs.length === 0) {
      const immuneLabel = tribe ? `${tribe.name} Tribe Immune` : 'Tribe Immune';
      tableRows.push({ type: 'immune', epNum, eid: ep.eid, tribe, immuneLabel, phase });
      return;
    }

    playerTcs.forEach((tc) => {
      const myVote = tc.votes.find((v) => v.voterPid === player.pid);
      const votedForPlayer = myVote ? season.cast.find((p) => p.pid === myVote.votedForPid) : null;
      const votesAgainst = tc.votes.filter((v) => v.votedForPid === player.pid);
      const isRevote = tc.notes?.toLowerCase().includes('revote');
      const isTie = tc.notes?.toLowerCase().includes('tie vote');

      tableRows.push({
        type: 'vote',
        epNum, eid: ep.eid, tc, tribe, phase, isMerged,
        myVote, votedForPlayer, votesAgainst,
        isElimHere: tc.eliminatedPid === player.pid,
        indivImmune,
        isRevote, isTie,
      });
    });

    if (eliminatedEp === epNum) {
      tableRows.push({ type: 'votedOut' });
      playerOut = true;
    }
  });

  // Jury-related footer rows
  const juryVote = season.juryVotes?.find((j) => j.jurorPid === player.pid);
  if (juryVote) {
    const juryTarget = season.cast.find((p) => p.pid === juryVote.votedForPid);
    tableRows.push({ type: 'juryVote', target: juryTarget });
  }

  const isWinner   = player.pid === season.winnerPid;
  const isRunnerUp = player.pid === season.runnerUpPid;
  if (isWinner || isRunnerUp) {
    tableRows.push({ type: isWinner ? 'winner' : 'finalist' });
  }

  return (
    <div className="pvote-wrap">
      <table className="pvote-table">
        <thead>
          <tr>
            <th className="pvote-ep-header">Episode</th>
            <th className="pvote-cast-header">{player.name}'s Vote</th>
            <th className="pvote-against-header">Voted Against {player.name}</th>
          </tr>
        </thead>
        <tbody>
          {tableRows.map((row, i) => {
            // ── Tribe immune ──────────────────────────────────────────
            if (row.type === 'immune') {
              const bg = row.tribe?.color ?? '#888';
              return (
                <tr key={i} className="pvote-immune-row">
                  <td className="pvote-ep-cell" style={{ background: bg, color: '#fff', borderColor: bg }}>
                    <Link to={`/season/${sid}/episode/${row.eid}`} style={{ color: '#fff' }}>{row.epNum}</Link>
                  </td>
                  <td className="pvote-immune-cell" colSpan={2} style={{ background: bg, color: '#fff', borderColor: bg }}>
                    <em>{row.immuneLabel}</em>
                  </td>
                </tr>
              );
            }

            // ── Voted out ─────────────────────────────────────────────
            if (row.type === 'votedOut') {
              return (
                <tr key={i} className="pvote-votedout">
                  <td colSpan={3}>Voted Out</td>
                </tr>
              );
            }

            // ── Jury vote cast ────────────────────────────────────────
            if (row.type === 'juryVote') {
              return (
                <tr key={i} className="pvote-juryvote">
                  <td className="pvote-jury-label">Voted for<br />Sole Survivor</td>
                  <td colSpan={2} className="pvote-jury-target">
                    {row.target ? (
                      <Link to={`/season/${sid}/cast/${slugify(row.target.name)}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Avatar name={row.target.name} color={getTribeColor(season, row.target.tid)} size={30} photoUrl={row.target.photoUrl} imgStyle={row.target.photoStyle} pid={row.target.pid} noBorder />
                        {row.target.name}
                      </Link>
                    ) : '—'}
                  </td>
                </tr>
              );
            }

            // ── Winner / finalist footer ──────────────────────────────
            if (row.type === 'winner') {
              return (
                <tr key={i} className="pvote-juryvote pvote-winner">
                  <td colSpan={3}>
                    <em>Sole Survivor{season.days ? `, Day ${season.days}` : ''}</em>
                  </td>
                </tr>
              );
            }

            if (row.type === 'finalist') {
              return (
                <tr key={i} className="pvote-juryvote pvote-finalist">
                  <td colSpan={3}>
                    <em>Runner-Up{season.days ? `, Day ${season.days}` : ''}</em>
                  </td>
                </tr>
              );
            }

            // ── Regular vote row ──────────────────────────────────────
            const { tc, myVote, votedForPlayer, votesAgainst, isElimHere, indivImmune, isRevote, isTie } = row;
            const tribeColor = row.tribe?.color;
            const rowStyle = row.phase === 'switched' && tribeColor
              ? { background: tribeColor + '22' }
              : {};

            return (
              <tr key={i}
                className={[
                  isElimHere        ? 'pvote-elim-row'     : 'pvote-vote-row',
                  row.phase === 'merged'   ? 'pvote-vote-merged'   : '',
                  row.phase === 'switched' ? 'pvote-vote-switched' : '',
                ].filter(Boolean).join(' ')}
                style={rowStyle}
              >
                <td className="pvote-ep-cell">
                  <Link to={`/season/${sid}/episode/${row.eid}`}>{row.epNum}</Link>
                  {isRevote && <span className="pvote-revote-tag"> Revote</span>}
                  {isTie    && <span className="pvote-revote-tag"> Tie</span>}
                </td>
                <td className="pvote-cast-cell">
                  {myVote ? (
                    votedForPlayer ? (
                      <Link to={`/season/${sid}/cast/${slugify(votedForPlayer.name)}`}
                        className="pvote-vote-chip"
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                        <Avatar name={votedForPlayer.name} color={getTribeColor(season, votedForPlayer.tid)} size={30} photoUrl={votedForPlayer.photoUrl} imgStyle={votedForPlayer.photoStyle} pid={votedForPlayer.pid} noBorder />
                        {votedForPlayer.name}
                      </Link>
                    ) : getPlayerName(season, myVote.votedForPid)
                  ) : (
                    <span className="pvote-empty">—</span>
                  )}
                </td>
                <td className="pvote-against-cell">
                  {indivImmune ? (
                    <em className="pvote-indiv-immune">Individual Immunity</em>
                  ) : votesAgainst.length > 0 ? (
                    <span className="pvote-against-list">
                      {votesAgainst.map((v, vi) => {
                        const voter = season.cast.find((p) => p.pid === v.voterPid);
                        return (
                          <span key={v.vid}>
                            {vi > 0 && ', '}
                            {voter ? (
                              <Link to={`/season/${sid}/cast/${slugify(voter.name)}`}
                                style={{
                                  display: 'inline-flex', alignItems: 'center', gap: 4,
                                  color: v.idolNullified ? 'var(--text-muted)' : 'var(--link)',
                                  textDecoration: v.idolNullified ? 'line-through' : 'none',
                                }}>
                                <Avatar name={voter.name} color={getTribeColor(season, voter.tid)} size={28} photoUrl={voter.photoUrl} imgStyle={voter.photoStyle} pid={voter.pid} noBorder />
                                {voter.name}
                              </Link>
                            ) : getPlayerName(season, v.voterPid)}
                            {v.idolNullified && <span title="nullified"> 🛡️</span>}
                          </span>
                        );
                      })}
                    </span>
                  ) : (
                    <span className="pvote-empty">—</span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ── Main PlayerPage ─────────────────────────────────────────────────────────

export default function PlayerPage() {
  const { sid, slug } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const player = getPlayerBySlug(season, slug);
  if (!player) return <div className="article"><p>Player not found.</p></div>;

  const { editMode, setEditing } = usePhotoEditor();
  const tribeColor = getTribeColor(season, player.tid);
  const tribeName = getTribeName(season, player.tid);
  const origTribe = season.tribes.find((t) => t.tid === player.tid);

  const [activeTab, setActiveTab] = useState('votingHistory');

  const votesAgainstCount = season.votingHistory.reduce((sum, tc) =>
    sum + tc.votes.filter((v) => v.votedForPid === player.pid).length, 0
  );

  const infoRows = [
    { label: 'Season',        value: <Link to={`/season/${sid}`}>{season.name}</Link> },
    { label: 'Tribe',         value: <TribeBadge tribe={origTribe} sid={sid} /> },
    { label: 'Placement',     value: ordinal(player.placement) + (player.pid === season.winnerPid ? ' ★ Sole Survivor' : '') },
    { label: 'Votes Against', value: votesAgainstCount },
    { label: 'Jury Member',   value: player.juryMember ? 'Yes' : 'No' },
  ];

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Cast', to: `/season/${sid}/cast` },
        { label: player.name },
      ]} />

      <h1>{player.name}</h1>

      <div className="player-article clearfix">
        <Infobox
          title={player.name}
          headerColor={tribeColor}
          rows={infoRows}
          logo={player.photoUrl}
          logoStyle={{ width: '100%', height: '280px', maxHeight: 'none', objectFit: 'cover', display: 'block', ...player.portraitStyle }}
          onLogoClick={editMode && player.photoUrl
            ? () => setEditing({ pid: player.pid, name: player.name, photoUrl: player.photoUrl, currentStyle: player.portraitStyle ?? {}, field: 'portraitStyle' })
            : undefined}
        />

        <p className="player-bio">{player.bio}</p>

        <p>
          <strong>{player.name}</strong> competed in{' '}
          <Link to={`/season/${sid}`}>{season.name}</Link> as a member of the{' '}
          <TribeBadge tribe={origTribe} sid={sid} /> tribe.
          {player.pid === season.winnerPid && <> They won the season as the Sole Survivor.</>}
          {player.pid === season.fanFavoritePid && <> They were voted Fan Favorite by viewers.</>}
        </p>
      </div>

      {/* ── Tabs ── */}
      <div className="player-tabs">
        <button
          className={`player-tab-btn ${activeTab === 'challengeHistory' ? 'active' : ''}`}
          onClick={() => setActiveTab('challengeHistory')}
        >
          Challenge History
        </button>
        <button
          className={`player-tab-btn ${activeTab === 'votingHistory' ? 'active' : ''}`}
          onClick={() => setActiveTab('votingHistory')}
        >
          Voting History
        </button>
      </div>

      <div className="player-tab-content">
        {activeTab === 'challengeHistory' && (
          <ChallengeHistoryTab player={player} season={season} sid={sid} />
        )}
        {activeTab === 'votingHistory' && (
          <VotingHistoryTab player={player} season={season} sid={sid} />
        )}
      </div>
    </div>
  );
}
