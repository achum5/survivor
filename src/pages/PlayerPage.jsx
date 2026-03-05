// src/pages/PlayerPage.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerBySlug, getTribeColor, getTribeName, getPlayerName, ordinal, slugify } from '../utils/helpers';
import Infobox from '../components/Infobox';
import { usePhotoEditor } from '../context/PhotoEditorContext';
import TribeBadge from '../components/TribeBadge';
import Avatar from '../components/Avatar';

// ── Bio linkifier ──────────────────────────────────────────────────────────

function linkifyBio(text, season, sid) {
  const terms = [];

  // Link season names ("Season 1", "Season 2", etc.)
  SEASONS.forEach((s) => {
    terms.push({ text: s.name, url: `/season/${s.sid}` });
  });

  // Link player names in this season
  season.cast.forEach((p) => {
    terms.push({ text: p.name, url: `/season/${sid}/cast/${slugify(p.name)}` });
    if (p.fullName && p.fullName !== p.name) {
      terms.push({ text: p.fullName, url: `/season/${sid}/cast/${slugify(p.name)}` });
    }
  });

  // Link tribe names
  season.tribes.forEach((t) => {
    terms.push({ text: `${t.name} tribe`, url: `/season/${sid}/tribe/${t.tid}` });
    terms.push({ text: t.name, url: `/season/${sid}/tribe/${t.tid}` });
  });
  if (season.mergeTribe) {
    terms.push({ text: season.mergeTribe.name, url: `/season/${sid}/tribe/${season.mergeTribe.tid}` });
  }

  // Link episode references ("Episode 1", "Episode 10", etc.)
  season.episodes.forEach((ep) => {
    terms.push({ text: `Episode ${ep.number}`, url: `/season/${sid}/episode/${ep.eid}` });
    // Link challenge names to their challenge pages
    if (ep.immunityChallenge?.name) {
      terms.push({ text: ep.immunityChallenge.name, url: `/season/${sid}/episode/${ep.eid}/challenge/immunity` });
    }
    if (ep.rewardChallenge?.name) {
      terms.push({ text: ep.rewardChallenge.name, url: `/season/${sid}/episode/${ep.eid}/challenge/reward` });
    }
  });

  // Link twist names
  SEASONS.forEach((s) => {
    if (!s.twists) return;
    s.twists.forEach((twist) => {
      const name = twist.split(' — ')[0].trim();
      terms.push({ text: name, url: `/twist/${slugify(name)}` });
    });
  });

  // Sort longest first so "Sam R." matches before "Sam", "Season 1" before "Season"
  terms.sort((a, b) => b.text.length - a.text.length);

  const termMap = {};
  terms.forEach((t) => { if (!termMap[t.text]) termMap[t.text] = t.url; });

  const escaped = Object.keys(termMap).map((t) => {
    const e = t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const endB = /\w$/.test(t) ? '\\b' : '';
    return `\\b${e}${endB}`;
  });
  const pattern = escaped.join('|');
  if (!pattern) return [text];

  const regex = new RegExp(pattern, 'g');
  const parts = [];
  let lastIdx = 0;

  for (const m of text.matchAll(regex)) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    const url = termMap[m[0]];
    parts.push(url ? <Link key={m.index} to={url}>{m[0]}</Link> : m[0]);
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}

// ── Helpers ────────────────────────────────────────────────────────────────

function tribeRowBg(hex) {
  const r = parseInt(hex.slice(1, 3), 16) / 255;
  const g = parseInt(hex.slice(3, 5), 16) / 255;
  const b = parseInt(hex.slice(5, 7), 16) / 255;
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  if (d !== 0) {
    if (max === r) h = ((g - b) / d + (g < b ? 6 : 0)) * 60;
    else if (max === g) h = ((b - r) / d + 2) * 60;
    else h = ((r - g) / d + 4) * 60;
  }
  const l = (max + min) / 2;
  const s = d === 0 ? 0 : d / (1 - Math.abs(2 * l - 1));
  return `hsl(${Math.round(h)}, ${Math.round(Math.max(s * 100, 55))}%, 38%)`;
}

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

// ── Player Stats Computation ────────────────────────────────────────────────

function computePlayerStats(player, season) {
  const switchEp = getSwitchEpisode(season);
  const mergeEp = getMergeEpisode(season);

  let tribalsAttended = 0;
  let totalVotesCast = 0;
  let majorityVotes = 0;
  let minorityVotes = 0;
  let votesReceived = 0;
  let timesReceivedButSurvived = 0;
  let idolsPlayed = 0;
  let votesNullifiedByIdol = 0;
  let timesSavedByIdol = 0;
  let timesVoteNullified = 0;
  let currentStreak = 0;
  let longestStreak = 0;

  let eliminated = false;
  let lastAttendedEp = null;

  season.votingHistory.forEach((tc) => {
    if (eliminated) return;

    // Check if player was present at this TC
    const isMerge = !tc.tid;
    const playerTribe = getTribeAtEpisode(player, tc.episode, switchEp, mergeEp);
    const present = isMerge || (tc.tid && tc.tid === playerTribe);
    if (!present) return;

    // Count unique episodes (tie + revote = 1 tribal)
    if (tc.episode !== lastAttendedEp) {
      tribalsAttended++;
      lastAttendedEp = tc.episode;
    }

    // Votes cast by this player
    const myVote = tc.votes.find((v) => v.voterPid === player.pid);
    if (myVote) {
      totalVotesCast++;
      if (tc.eliminatedPid) {
        if (myVote.votedForPid === tc.eliminatedPid) majorityVotes++;
        else minorityVotes++;
      }
      if (myVote.idolNullified) timesVoteNullified++;
    }

    // Votes received
    const against = tc.votes.filter((v) => v.votedForPid === player.pid);
    votesReceived += against.length;
    if (against.length > 0 && tc.eliminatedPid !== player.pid) {
      timesReceivedButSurvived++;
    }

    // Voting streak (consecutive TCs without receiving votes)
    if (against.length === 0) {
      currentStreak++;
      if (currentStreak > longestStreak) longestStreak = currentStreak;
    } else {
      currentStreak = 0;
    }

    // Idol plays
    if (tc.idols) {
      tc.idols.forEach((idol) => {
        if (idol.playerPid === player.pid) {
          idolsPlayed++;
          votesNullifiedByIdol += tc.votes.filter(
            (v) => v.idolNullified && v.votedForPid === idol.playedOn
          ).length;
        }
        if (idol.playedOn === player.pid && idol.playerPid !== player.pid) {
          timesSavedByIdol++;
        }
      });
    }

    if (tc.eliminatedPid === player.pid) eliminated = true;
  });

  // Challenge stats
  let individualImmunityWins = 0;
  let individualChallenges = 0;
  let teamChallengeWins = 0;
  let teamChallenges = 0;
  let challengesParticipated = 0;
  let challengeSitOuts = 0;

  const elimEp = season.votingHistory.find((tc) => tc.eliminatedPid === player.pid)?.episode ?? Infinity;

  season.episodes.forEach((ep) => {
    if (ep.number > elimEp) return;
    const isMerge = ep.number >= mergeEp;
    const playerTribe = getTribeAtEpisode(player, ep.number, switchEp, mergeEp);

    [ep.rewardChallenge, ep.immunityChallenge].forEach((ch) => {
      if (!ch?.winner) return;

      if (ch.sitOuts?.includes(player.pid)) {
        challengeSitOuts++;
        return;
      }

      challengesParticipated++;

      if (isMerge) {
        individualChallenges++;
        if (ch.winner === player.pid) individualImmunityWins++;
      } else {
        teamChallenges++;
        if (playerTribe && ch.winner === playerTribe) teamChallengeWins++;
      }
    });
  });

  const totalChallengeWins = individualImmunityWins + teamChallengeWins;
  const challengeWinRate = challengesParticipated > 0
    ? Math.round((totalChallengeWins / challengesParticipated) * 100)
    : 0;

  // Jury stats (finalists only)
  let juryVotesReceived = null;
  let juryVoteTotal = null;
  const isFinalist = player.pid === season.winnerPid || player.pid === season.runnerUpPid || player.pid === season.secondRunnerUpPid;
  if (isFinalist && season.juryVotes?.length > 0) {
    juryVoteTotal = season.juryVotes.length;
    juryVotesReceived = season.juryVotes.filter((jv) => jv.votedForPid === player.pid).length;
  }

  return {
    tribalsAttended, totalVotesCast, majorityVotes, minorityVotes,
    votesReceived, timesReceivedButSurvived, longestStreak,
    idolsPlayed, votesNullifiedByIdol, timesSavedByIdol, timesVoteNullified,
    individualImmunityWins, individualChallenges,
    teamChallengeWins, teamChallenges,
    challengeWinRate, challengeSitOuts, challengesParticipated,
    juryVotesReceived, juryVoteTotal,
  };
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

  // Find the episode where this player was eliminated
  const eliminatedEp = season.votingHistory.find((tc) => tc.eliminatedPid === player.pid)?.episode ?? Infinity;

  // Build a flat list of challenge rows: one row per challenge entry per episode
  const rows = [];
  let insertedMergeSeparator = false;
  season.episodes.forEach((ep) => {
    if (ep.number > eliminatedEp) return;
    const challenges = [];
    if (ep.rewardChallenge?.name || ep.rewardChallenge?.winner) {
      challenges.push({ ch: ep.rewardChallenge, label: 'rewardChallenge' });
    }
    if (ep.immunityChallenge?.name || ep.immunityChallenge?.winner) {
      challenges.push({ ch: ep.immunityChallenge, label: 'immunityChallenge' });
    }

    const tribeId = getTribeAtEpisode(player, ep.number, switchEp, mergeEp);
    const tribe = tribeId ? season.tribes.find((t) => t.tid === tribeId) : null;

    // Insert merge separator row
    if (!insertedMergeSeparator && ep.number >= mergeEp && player.merged) {
      insertedMergeSeparator = true;
      rows.push({ separator: 'merge' });
    }

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
      } else if (ch.winner) {
        // Fall back to winner field when no detailed results array
        const isIndividual = !tribeId; // merge phase = individual challenge
        if (isIndividual) {
          result = ch.winner === player.pid ? 'Won' : 'Lost';
        } else {
          result = ch.winner === tribeId ? 'Won' : 'Lost';
        }
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
  // (skip separator rows)
  let gi = 0;
  while (gi < rows.length) {
    if (rows[gi].separator) { gi++; continue; }
    const curTid = rows[gi].tribe?.tid ?? null;
    let gj = gi + 1;
    while (gj < rows.length && !rows[gj].separator && (rows[gj].tribe?.tid ?? null) === curTid) gj++;
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
          {rows.map((row, i) => {
            if (row.separator === 'merge') {
              return (
                <tr key={i} className="pchall-merge-row">
                  <td colSpan={6}>Tribes Merged</td>
                </tr>
              );
            }
            return (
            <tr key={i}>
              {row.epRowIndex === 0 && (
                <td rowSpan={row.epRowSpan} className="pchall-ep-cell">
                  <Link to={`/season/${sid}/episode/${row.eid}`}>{row.epNumber}</Link>
                </td>
              )}
              {row.tribeGroupStart && (
                <td
                  rowSpan={row.tribeGroupSpan}
                  className="pchall-tribe-cell"
                  style={{
                    background: row.tribe?.color ?? season.mergeTribe?.color ?? '#555',
                    color: '#fff',
                    borderColor: row.tribe?.color ?? season.mergeTribe?.color ?? '#555',
                  }}
                >
                  <Link
                    to={`/season/${sid}/tribe/${row.tribe?.tid ?? season.mergeTribe?.tid}`}
                    style={{ color: '#fff', textDecoration: 'none' }}
                  >
                    {row.tribe?.name ?? season.mergeTribe?.name ?? 'Merged'}
                  </Link>
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
            );
          })}
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

function VotingHistoryTab({ player, season, sid, navigate }) {
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
      ? episodeTcs.filter((tc) =>
          tc.votes.length === 0 || // fire-making / no-vote TC — all remaining players
          tc.eliminatedPid === player.pid ||
          tc.votes.some((v) => v.voterPid === player.pid || v.votedForPid === player.pid)
        )
      : episodeTcs.filter((tc) => tc.tid === tribeId);

    if (playerTcs.length === 0) {
      const usedSwp = (season.advantages ?? []).some(
        (a) => a.type === 'Safety Without Power' && a.holder === player.pid && a.playedEpisode === epNum
      );
      const immuneLabel = usedSwp
        ? 'Safety Without Power'
        : tribe ? `${tribe.name} Tribe Immune` : 'Tribe Immune';
      tableRows.push({ type: 'immune', epNum, eid: ep.eid, tribe, immuneLabel, phase });
      return;
    }

    playerTcs.forEach((tc) => {
      // FTC for finalist: show jury votes received instead of normal row
      const isFinalist = player.pid === season.winnerPid || player.pid === season.runnerUpPid || player.pid === season.secondRunnerUpPid;
      if (isFinalist && season.juryVotes?.length > 0 && tc.votes.length === 0 && !ep.fireMakingChallenge) {
        const votersForPlayer = season.juryVotes
          .filter(jv => jv.votedForPid === player.pid)
          .map(jv => season.cast.find(p => p.pid === jv.jurorPid))
          .filter(Boolean);
        tableRows.push({
          type: 'juryVotesReceived',
          epNum, eid: ep.eid, voters: votersForPlayer,
        });
        return;
      }

      const myVote = tc.votes.find((v) => v.voterPid === player.pid);
      const votedForPlayer = myVote ? season.cast.find((p) => p.pid === myVote.votedForPid) : null;
      const votesAgainst = tc.votes.filter((v) => v.votedForPid === player.pid);
      const isRevote = tc.notes?.toLowerCase().includes('revote');
      const isTie = tc.notes?.toLowerCase().includes('tie vote');

      // Fire-making episode: compute who the immunity winner chose for F3
      let chosenForF3 = null;
      if (tc.votes.length === 0 && ep.fireMakingChallenge && ep.immunityChallenge?.winner === player.pid) {
        const finalThree = [season.winnerPid, season.runnerUpPid, season.secondRunnerUpPid].filter(Boolean);
        const chosenPid = finalThree.find(pid => pid !== player.pid && pid !== ep.fireMakingChallenge.winner);
        if (chosenPid) chosenForF3 = season.cast.find(p => p.pid === chosenPid);
      }

      tableRows.push({
        type: 'vote',
        epNum, eid: ep.eid, tc, tribe, phase, isMerged,
        myVote, votedForPlayer, votesAgainst,
        isElimHere: tc.eliminatedPid === player.pid,
        indivImmune,
        isRevote, isTie,
        chosenForF3,
      });
    });

    if (eliminatedEp === epNum) {
      const isFireMaking = ep.fireMakingChallenge && ep.fireMakingChallenge.loser === player.pid;
      tableRows.push({ type: 'votedOut', isFireMaking });
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
              const bg = row.tribe?.color ?? season.mergeTribe?.color ?? '#888';
              const epUrl = `/season/${sid}/episode/${row.eid}`;
              return (
                <tr key={i} className="pvote-immune-row pvote-clickable" onClick={() => navigate(epUrl)}>
                  <td className="pvote-ep-cell" style={{ background: bg, color: '#fff', borderColor: bg }}>
                    <Link to={epUrl} style={{ color: '#fff' }}>{row.epNum}</Link>
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
                  <td colSpan={3}>{row.isFireMaking ? 'Eliminated (Fire-Making)' : 'Voted Out'}</td>
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
                        <Avatar name={row.target.name} color={getTribeColor(season, row.target.tid)} size={24} photoUrl={row.target.photoUrl} imgStyle={row.target.photoStyle} pid={row.target.pid} noBorder />
                        {row.target.name}
                      </Link>
                    ) : '—'}
                  </td>
                </tr>
              );
            }

            // ── Jury votes received (FTC for finalists) ────────────────
            if (row.type === 'juryVotesReceived') {
              const mergeColor = season.mergeTribe?.color ?? '#228B22';
              const bg = tribeRowBg(mergeColor);
              return (
                <tr key={i} className="pvote-jury-received">
                  <td className="pvote-jury-recv-label" style={{ background: bg, color: '#fff', borderColor: bg }}>
                    Jury Votes<br />for {player.name}
                  </td>
                  <td colSpan={2} className="pvote-jury-voters" style={{ background: bg, color: '#fff', borderColor: bg }}>
                    <div className="pvote-jury-voters-inner">
                      {row.voters.length > 0 ? row.voters.map((voter) => (
                        <Link key={voter.pid} to={`/season/${sid}/cast/${slugify(voter.name)}`}>
                          <Avatar name={voter.name} color={getTribeColor(season, voter.tid)} size={24} photoUrl={voter.photoUrl} imgStyle={voter.photoStyle} pid={voter.pid} noBorder />
                          {voter.name}
                        </Link>
                      )) : <em>No votes</em>}
                    </div>
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
            const rowTribeColor = row.isMerged ? season.mergeTribe?.color : row.tribe?.color;
            const rowStyle = rowTribeColor ? { background: tribeRowBg(rowTribeColor) } : {};

            const tribalUrl = `/season/${sid}/episode/${row.eid}#tribal-${tc.tcid}`;
            const goToTribal = (e) => { if (!e.target.closest('a')) navigate(tribalUrl); };

            return (
              <tr key={i}
                className={[
                  isElimHere        ? 'pvote-elim-row'     : 'pvote-vote-row',
                  row.phase === 'merged'   ? 'pvote-vote-merged'   : '',
                  row.phase === 'switched' ? 'pvote-vote-switched' : '',
                  'pvote-clickable',
                ].filter(Boolean).join(' ')}
                style={rowStyle}
                onClick={goToTribal}
              >
                <td className="pvote-ep-cell">
                  <Link to={tribalUrl}>{row.epNum}</Link>
                  {isRevote && <span className="pvote-revote-tag"> Revote</span>}
                  {isTie    && <span className="pvote-revote-tag"> Tie</span>}
                </td>
                <td className="pvote-cast-cell">
                  {row.chosenForF3 ? (
                    <span className="pvote-chose-f3">
                      Took{' '}
                      <Link to={`/season/${sid}/cast/${slugify(row.chosenForF3.name)}`} className="pvote-vote-chip">
                        <Avatar name={row.chosenForF3.name} color={getTribeColor(season, row.chosenForF3.tid)} size={24} photoUrl={row.chosenForF3.photoUrl} imgStyle={row.chosenForF3.photoStyle} pid={row.chosenForF3.pid} noBorder />
                        {row.chosenForF3.name}
                      </Link>
                      {' '}to Final 3
                    </span>
                  ) : tc.votes.length === 0 ? (
                    <em className="pvote-no-vote">No Vote</em>
                  ) : myVote ? (
                    votedForPlayer ? (
                      <Link to={`/season/${sid}/cast/${slugify(votedForPlayer.name)}`}
                        className="pvote-vote-chip">
                        <Avatar name={votedForPlayer.name} color={getTribeColor(season, votedForPlayer.tid)} size={24} photoUrl={votedForPlayer.photoUrl} imgStyle={votedForPlayer.photoStyle} pid={votedForPlayer.pid} noBorder />
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
                            {voter ? (
                              <Link to={`/season/${sid}/cast/${slugify(voter.name)}`}
                                style={{
                                  display: 'inline-flex', alignItems: 'center', gap: 4,
                                  color: v.idolNullified ? 'rgba(255,255,255,0.7)' : 'var(--link)',
                                  textDecoration: v.idolNullified ? 'line-through' : 'none',
                                }}>
                                <Avatar name={voter.name} color={getTribeColor(season, voter.tid)} size={24} photoUrl={voter.photoUrl} imgStyle={voter.photoStyle} pid={voter.pid} noBorder />
                                {voter.name}
                              </Link>
                            ) : getPlayerName(season, v.voterPid)}
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
  const navigate = useNavigate();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const player = getPlayerBySlug(season, slug);
  if (!player) return <div className="article"><p>Player not found.</p></div>;

  const { editMode, setEditing } = usePhotoEditor();
  const tribeColor = getTribeColor(season, player.tid);
  const tribeName = getTribeName(season, player.tid);
  const origTribe = season.tribes.find((t) => t.tid === player.tid);

  // Cross-season appearances for returnees
  const appearances = player.personId
    ? SEASONS.filter(s => s.cast.some(c => c.personId === player.personId))
        .map(s => ({ season: s, castMember: s.cast.find(c => c.personId === player.personId) }))
    : [];

  const stats = computePlayerStats(player, season);

  const infoRows = [
    { label: 'Season',        value: <Link to={`/season/${sid}`}>{season.name}</Link> },
    { label: origTribe && (player.switchedTid || player.merged) ? 'Tribes' : 'Tribe',
      value: (() => {
        const tribes = [];
        if (origTribe) tribes.push(origTribe);
        if (player.switchedTid) {
          const sw = season.tribes.find((t) => t.tid === player.switchedTid);
          if (sw && sw.tid !== origTribe?.tid) tribes.push(sw);
        }
        if (player.merged && season.mergeTribe) tribes.push(season.mergeTribe);
        return <span style={{ display: 'flex', flexWrap: 'wrap', gap: '4px' }}>
          {tribes.map((t) => <TribeBadge key={t.tid} tribe={t} sid={sid} />)}
        </span>;
      })() },
    { label: 'Placement',     value: ordinal(player.placement) + (player.pid === season.winnerPid ? ' ★ Sole Survivor' : '') },
    { label: 'Jury Member',   value: player.juryMember ? 'Yes' : 'No' },
    // ── Voting stats ──
    { section: 'Voting' },
    { label: 'Tribals Attended',  value: stats.tribalsAttended },
    { label: 'Votes Against',     value: stats.votesReceived },
    { label: 'In Majority',        value: stats.majorityVotes },
    { label: 'In Minority',        value: stats.minorityVotes },
    ...(stats.idolsPlayed > 0 ? [{ label: 'Idols Played', value: stats.idolsPlayed }] : []),
    ...(stats.votesNullifiedByIdol > 0 ? [{ label: 'Votes Nullified', value: stats.votesNullifiedByIdol }] : []),
    ...(stats.timesSavedByIdol > 0 ? [{ label: 'Saved by Idol', value: stats.timesSavedByIdol }] : []),
    ...(stats.timesVoteNullified > 0 ? [{ label: 'Own Votes Nullified', value: stats.timesVoteNullified }] : []),
    // ── Challenge stats ──
    { section: 'Challenges' },
    { label: 'Individual Wins',   value: `${stats.individualImmunityWins} / ${stats.individualChallenges}` },
    { label: 'Team Wins',         value: `${stats.teamChallengeWins} / ${stats.teamChallenges}` },
    { label: 'Win Rate',          value: `${stats.challengeWinRate}%` },
    ...(stats.challengeSitOuts > 0 ? [{ label: 'Sat Out', value: stats.challengeSitOuts }] : []),
    // ── Jury stats (finalists only) ──
    ...(stats.juryVotesReceived !== null ? [
      { section: 'Jury' },
      { label: 'Jury Votes', value: `${stats.juryVotesReceived} / ${stats.juryVoteTotal}` },
    ] : []),
  ];

  // Build section nav links
  const sections = [];
  if (player.bio) sections.push({ id: 'bio', label: 'Bio' });
  sections.push({ id: 'voting-history', label: 'Voting History' });
  sections.push({ id: 'challenge-history', label: 'Challenge History' });

  // Sorted cast for prev/next navigation
  const sortedCast = [...season.cast].sort((a, b) => a.name.localeCompare(b.name));
  const castIdx = sortedCast.findIndex(p => p.pid === player.pid);
  const prevPlayer = sortedCast[castIdx - 1];
  const nextPlayer = sortedCast[castIdx + 1];

  return (
    <>
    <div className="ep-subheader">
      <div className="ep-subheader-inner">
        <div className="ep-header-nav-row">
          {prevPlayer ? (
            <Link to={`/season/${sid}/cast/${slugify(prevPlayer.name)}`} className="ep-nav-arrow" title={prevPlayer.name}>&lsaquo;</Link>
          ) : (
            <span className="ep-nav-arrow disabled">&lsaquo;</span>
          )}
          <select
            className="ep-select"
            value={player.pid}
            onChange={(e) => {
              const p = season.cast.find((c) => c.pid === e.target.value);
              if (p) navigate(`/season/${sid}/cast/${slugify(p.name)}`);
            }}
          >
            {sortedCast.map((p) => (
              <option key={p.pid} value={p.pid}>{p.name}</option>
            ))}
          </select>
          {nextPlayer ? (
            <Link to={`/season/${sid}/cast/${slugify(nextPlayer.name)}`} className="ep-nav-arrow" title={nextPlayer.name}>&rsaquo;</Link>
          ) : (
            <span className="ep-nav-arrow disabled">&rsaquo;</span>
          )}
        </div>
        {sections.length > 0 && (
          <nav className="ep-section-nav">
            {sections.map((s) => (
              <a key={s.id} href={`#${s.id}`} className="ep-section-link">{s.label}</a>
            ))}
          </nav>
        )}
      </div>
    </div>
    <div className="article ep-article">
      {appearances.length > 1 && (
        <div className="player-season-tabs">
          {appearances.map(({ season: s, castMember: cm }) => (
            <Link
              key={s.sid}
              to={`/season/${s.sid}/cast/${slugify(cm.name)}`}
              className={`player-season-tab${s.sid === sid ? ' active' : ''}`}
            >
              {s.name}
            </Link>
          ))}
        </div>
      )}

      <div className="player-article clearfix">
        <Infobox
          headerContent={
            <div className="infobox-header-player">
              <span className="infobox-player-name">{player.name}</span>
              {(() => {
                const ig = player.instagram || appearances.find(a => a.castMember.instagram)?.castMember.instagram;
                return ig ? (
                  <a href={ig} target="_blank" rel="noopener noreferrer" className="infobox-player-ig" title="Instagram">
                    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                  </a>
                ) : null;
              })()}
            </div>
          }
          headerColor={tribeColor}
          rows={infoRows}
          logo={player.photoUrl}
          logoStyle={{ width: '100%', height: '280px', maxHeight: 'none', objectFit: 'cover', display: 'block', ...player.portraitStyle }}
          onLogoClick={editMode && player.photoUrl
            ? () => setEditing({ pid: player.pid, name: player.name, photoUrl: player.photoUrl, currentStyle: player.portraitStyle ?? {}, field: 'portraitStyle' })
            : undefined}
        />

        {player.bio && (
          <>
            <h2 id="bio" className="player-section-heading">Bio</h2>
            {(Array.isArray(player.bio) ? player.bio : [player.bio]).map((item, i) => {
              // String items render as narrative paragraphs
              if (typeof item === 'string') {
                return <p key={i} className="player-bio">{linkifyBio(item, season, sid)}</p>;
              }
              // Quote objects render as confessional-style bubbles
              if (item && item.type === 'quote') {
                const speaker = season.cast.find(p => p.pid === item.pid);
                if (!speaker) return null;
                const speakerColor = getTribeColor(season, speaker.tid) || '#555';
                const epLabel = item.episode ? `Ep. ${item.episode}` : '';
                const contextLabel = item.context || '';
                return (
                  <div key={i} className="confessional-bubble bio-quote-bubble" style={{ '--tribe-color': speakerColor }}>
                    <div className="confessional-bubble-avatar">
                      <Link to={`/season/${sid}/cast/${slugify(speaker.name)}`}>
                        <Avatar name={speaker.name} color={speakerColor} size={40}
                          photoUrl={speaker.photoUrl} imgStyle={speaker.photoStyle}
                          pid={speaker.pid} noBorder />
                      </Link>
                    </div>
                    <div className="confessional-bubble-content">
                      <div className="confessional-bubble-header">
                        <Link to={`/season/${sid}/cast/${slugify(speaker.name)}`} className="confessional-bubble-name">
                          {speaker.name}
                        </Link>
                        {(epLabel || contextLabel) && (
                          <span className="bio-quote-context">
                            {[contextLabel, epLabel].filter(Boolean).join(' — ')}
                          </span>
                        )}
                      </div>
                      <div className="confessional-bubble-quote">
                        <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                        {linkifyBio(item.quote, season, sid)}
                        <span className="tc-quote-mark tc-quote-close">&rdquo;</span>
                      </div>
                    </div>
                  </div>
                );
              }
              return null;
            })}
          </>
        )}

        <h2 id="voting-history" className="player-section-heading">Voting History</h2>
        <VotingHistoryTab player={player} season={season} sid={sid} navigate={navigate} />

        <h2 id="challenge-history" className="player-section-heading">Challenge History</h2>
        <ChallengeHistoryTab player={player} season={season} sid={sid} />
      </div>
    </div>
    </>
  );
}
