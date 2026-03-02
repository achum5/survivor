// src/pages/PlayerPage.jsx
import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerBySlug, getTribeColor, getTribeName, getPlayerName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';
import { usePhotoEditor } from '../context/PhotoEditorContext';

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
                <td rowSpan={row.epRowSpan} className="pchall-ep-cell">{row.epNumber}</td>
              )}
              {row.epRowIndex === 0 && (
                <td rowSpan={row.epRowSpan} className="pchall-tribe-cell">
                  {row.tribe ? (
                    <span className="tribe-badge" style={{ background: row.tribe.color }}>
                      {row.tribe.name}
                    </span>
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
        </tbody>
      </table>
    </div>
  );
}

// ── Voting History Tab ──────────────────────────────────────────────────────

function VotingHistoryTab({ player, season, sid }) {
  const switchEp = getSwitchEpisode(season);
  const mergeEp = getMergeEpisode(season);
  const hasJury = season.juryVotes && season.juryVotes.length > 0;

  // Group TCs by episode
  const tcsByEp = {};
  season.votingHistory.forEach((tc) => {
    if (!tcsByEp[tc.episode]) tcsByEp[tc.episode] = [];
    tcsByEp[tc.episode].push(tc);
  });

  // Episodes where player participated (their tribe went to TC, or merged TC)
  // We also need to track if player was eliminated
  const eliminatedEp = season.votingHistory.find((tc) => tc.eliminatedPid === player.pid)?.episode ?? null;

  // Build row entries
  const tableRows = [];
  let lastPhase = null;

  season.episodes.forEach((ep) => {
    const epNum = ep.number;
    const tribeId = getTribeAtEpisode(player, epNum, switchEp, mergeEp);
    const tribe = tribeId ? season.tribes.find((t) => t.tid === tribeId) : null;
    const isMerged = epNum >= mergeEp;
    const isSwitched = epNum >= switchEp && !isMerged;

    // Phase separator rows
    const phase = isMerged ? 'merged' : isSwitched ? 'switched' : 'original';
    if (phase !== lastPhase) {
      if (phase === 'switched') tableRows.push({ type: 'separator', label: 'Tribes Switched', color: '#1e4a1e' });
      if (phase === 'merged')   tableRows.push({ type: 'separator', label: 'Tribes Merged',   color: '#0a0a0a' });
      lastPhase = phase;
    }

    const episodeTcs = tcsByEp[epNum] ?? [];
    const playerTcs = isMerged
      ? episodeTcs  // at merge, all TCs involve player
      : episodeTcs.filter((tc) => tc.tid === tribeId);  // only their tribe's TC

    if (playerTcs.length === 0) {
      // Tribe was immune this episode
      const immuneLabel = tribe ? `${tribe.name} Immune` : 'Immune';
      tableRows.push({ type: 'immune', epNum, tribe, immuneLabel });
      return;
    }

    playerTcs.forEach((tc) => {
      // What did this player vote?
      const myVote = tc.votes.find((v) => v.voterPid === player.pid);
      const votedForPlayer = myVote ? season.cast.find((p) => p.pid === myVote.votedForPid) : null;

      // Who voted against this player?
      const votesAgainst = tc.votes.filter((v) => v.votedForPid === player.pid);

      tableRows.push({
        type: 'vote',
        epNum,
        tc,
        tribe,
        isMerged,
        myVote,
        votedForPlayer,
        votesAgainst,
        isElimHere: tc.eliminatedPid === player.pid,
        hasRevote: tc.notes?.toLowerCase().includes('revote') || tc.notes?.toLowerCase().includes('tie'),
      });
    });

    // Voted out row
    if (eliminatedEp === epNum) {
      tableRows.push({ type: 'votedOut' });
    }
  });

  // Jury vote row
  const juryVote = hasJury ? season.juryVotes.find((j) => j.jurorPid === player.pid) : null;
  if (juryVote) {
    const juryTarget = season.cast.find((p) => p.pid === juryVote.votedForPid);
    tableRows.push({ type: 'juryVote', target: juryTarget });
  } else if (player.pid === season.winnerPid) {
    tableRows.push({ type: 'winner' });
  } else if (player.pid === season.runnerUpPid) {
    tableRows.push({ type: 'finalist' });
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
            if (row.type === 'separator') {
              return (
                <tr key={i} className="pvote-separator">
                  <td colSpan={3} style={{ background: row.color }}>
                    {row.label}
                  </td>
                </tr>
              );
            }

            if (row.type === 'immune') {
              const bg = row.tribe ? row.tribe.color + '33' : 'transparent';
              return (
                <tr key={i} className="pvote-immune-row">
                  <td className="pvote-ep-cell">{row.epNum}</td>
                  <td className="pvote-immune-cell" colSpan={2} style={{ color: row.tribe?.color }}>
                    {row.immuneLabel}
                  </td>
                </tr>
              );
            }

            if (row.type === 'votedOut') {
              return (
                <tr key={i} className="pvote-votedout">
                  <td colSpan={3}>🔦 Voted Out</td>
                </tr>
              );
            }

            if (row.type === 'juryVote') {
              return (
                <tr key={i} className="pvote-juryvote">
                  <td className="pvote-jury-label" colSpan={1}>Jury Vote</td>
                  <td colSpan={2} className="pvote-jury-target">
                    {row.target ? (
                      <Link to={`/season/${sid}/cast/${slugify(row.target.name)}`}>
                        {row.target.name}
                      </Link>
                    ) : '—'}
                  </td>
                </tr>
              );
            }

            if (row.type === 'winner') {
              return (
                <tr key={i} className="pvote-juryvote pvote-winner">
                  <td colSpan={3}>★ Sole Survivor</td>
                </tr>
              );
            }

            if (row.type === 'finalist') {
              return (
                <tr key={i} className="pvote-juryvote pvote-finalist">
                  <td colSpan={3}>Runner-Up</td>
                </tr>
              );
            }

            // type === 'vote'
            const { tc, myVote, votedForPlayer, votesAgainst, isElimHere, hasRevote } = row;
            const tribeColor = row.isMerged
              ? 'var(--accent)'
              : row.tribe?.color ?? '#888';

            return (
              <tr key={i} className={isElimHere ? 'pvote-elim-row' : 'pvote-vote-row'}>
                <td className="pvote-ep-cell">
                  {row.epNum}
                  {hasRevote && <span className="pvote-revote-tag"> {tc.notes}</span>}
                </td>
                <td className="pvote-cast-cell">
                  {myVote ? (
                    votedForPlayer ? (
                      <Link to={`/season/${sid}/cast/${slugify(votedForPlayer.name)}`}
                        style={{ color: 'var(--link)' }}>
                        {votedForPlayer.name}
                      </Link>
                    ) : getPlayerName(season, myVote.votedForPid)
                  ) : (
                    <span className="pvote-empty">—</span>
                  )}
                </td>
                <td className="pvote-against-cell">
                  {votesAgainst.length > 0 ? (
                    <span className="pvote-against-list">
                      {votesAgainst.map((v, vi) => {
                        const voter = season.cast.find((p) => p.pid === v.voterPid);
                        return (
                          <span key={v.vid}>
                            {vi > 0 && ', '}
                            {voter ? (
                              <Link to={`/season/${sid}/cast/${slugify(voter.name)}`}
                                style={{
                                  color: v.idolNullified ? 'var(--text-muted)' : 'var(--link)',
                                  textDecoration: v.idolNullified ? 'line-through' : 'none',
                                }}>
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

  const [activeTab, setActiveTab] = useState('votingHistory');

  const votesAgainstCount = season.votingHistory.reduce((sum, tc) =>
    sum + tc.votes.filter((v) => v.votedForPid === player.pid).length, 0
  );

  const infoRows = [
    { label: 'Season',        value: <Link to={`/season/${sid}`}>{season.name}</Link> },
    { label: 'Tribe',         value: <span className="tribe-badge" style={{ background: tribeColor }}>{tribeName}</span> },
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
          <span className="tribe-badge" style={{ background: tribeColor }}>{tribeName}</span> tribe.
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
