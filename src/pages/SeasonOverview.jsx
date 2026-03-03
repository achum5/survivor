// src/pages/SeasonOverview.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';
import Avatar from '../components/Avatar';
import TribeBadgeComp from '../components/TribeBadge';

function hexToRgba(hex, alpha) {
  if (!hex || !hex.startsWith('#')) return `rgba(100,100,100,${alpha})`;
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

// Turn plain-text paragraphs into React nodes with player/tribe names as <Link>s
function linkifySummary(text, season, sid) {
  const terms = [];

  season.cast.forEach((p) => {
    terms.push({ text: p.name, url: `/season/${sid}/cast/${slugify(p.name)}` });
  });
  season.tribes.forEach((t) => {
    terms.push({ text: t.name, url: `/season/${sid}/tribe/${t.tid}` });
  });
  if (season.mergeTribe) {
    terms.push({ text: season.mergeTribe.name, url: `/season/${sid}/tribe/${season.mergeTribe.tid}` });
  }

  // Sort longest first so "Sam R." matches before "Sam"
  terms.sort((a, b) => b.text.length - a.text.length);

  const termMap = {};
  terms.forEach((t) => { termMap[t.text] = t.url; });

  // Build regex: \b at start, \b at end only if term ends with a word char
  const escaped = terms.map((t) => {
    const e = t.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const endB = /\w$/.test(t.text) ? '\\b' : '';
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

export default function SeasonOverview() {
  const { sid } = useParams();
  const seasonIdx = SEASONS.findIndex((s) => s.sid === sid);
  const season = SEASONS[seasonIdx];
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const prevSeason = SEASONS[seasonIdx - 1] ?? null;
  const nextSeason = SEASONS[seasonIdx + 1] ?? null;

  const sorted = [...season.cast].sort((a, b) => b.placement - a.placement);
  const winner = season.cast.find((p) => p.pid === season.winnerPid);
  const runnerUp = season.cast.find((p) => p.pid === season.runnerUpPid);
  const fanFav = season.cast.find((p) => p.pid === season.fanFavoritePid);

  const hasSwitch = season.cast.some((p) => p.switchedTid);
  const hasMerge  = season.cast.some((p) => p.merged);
  const totalPlayers = season.cast.length;

  const infoRows = [
    { label: 'Season',    value: season.name },
    { label: 'Filmed',    value: season.filmingDates },
    { label: 'Players',   value: season.cast.length || '—' },
    { label: 'Winner',    value: winner   ? <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>   : '—' },
    { label: 'Runner-Up', value: runnerUp ? <Link to={`/season/${sid}/cast/${slugify(runnerUp.name)}`}>{runnerUp.name}</Link> : '—' },
    ...(fanFav ? [{ label: 'Fan Favorite', value: <Link to={`/season/${sid}/cast/${slugify(fanFav.name)}`}>{fanFav.name}</Link> }] : []),
    ...(season.tribes.length > 0 ? [{
      label: 'Tribes',
      value: (
        <div className="infobox-tribe-swatches">
          {season.tribes.map((t) => (
            <Link key={t.tid} to={`/season/${sid}/tribe/${t.tid}`} className="infobox-tribe-swatch" style={{ background: t.color }} title={t.name} />
          ))}
          {season.mergeTribe && (
            <Link to={`/season/${sid}/tribe/${season.mergeTribe.tid}`} className="infobox-tribe-swatch" style={{ background: season.mergeTribe.color }} title={season.mergeTribe.name} />
          )}
        </div>
      ),
    }] : []),
  ];

  function getTribeObj(tid) {
    return season.tribes.find((t) => t.tid === tid) ?? null;
  }

  function getFinishInfo(p) {
    const elimTc = season.votingHistory.find((tc) => tc.eliminatedPid === p.pid);
    const elimEid = elimTc?.eid ?? null;
    if (p.pid === season.winnerPid) return { text: 'Sole Survivor', eid: null };
    if (p.pid === season.runnerUpPid) return { text: 'Runner-Up', eid: null };
    if (p.pid === season.secondRunnerUpPid) return { text: '2nd Runner-Up', eid: null };
    const elimOrder = totalPlayers - p.placement + 1;
    const suffix = ordinal(elimOrder);
    const jury = p.juryMember ? '\nJury Member' : '';
    return { text: `${suffix} Voted Out${jury}`, eid: elimEid };
  }

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name },
      ]} />

      <h1>{season.name}</h1>

      <div className="season-content">
        <div className="season-infobox-float">
          <Infobox
            title={season.name}
            headerColor={season.tribes[0]?.color || '#8b0000'}
            rows={infoRows}
            logo={season.logoPath}
            logoSubHeader="Season Information"
            castPhoto={season.castPhotoPath}
            chronology={{ prev: prevSeason, next: nextSeason }}
          />
        </div>

          <p>
            <strong>{season.name}</strong> is a season of 14508 Survivor
            filmed on {season.filmingDates}.
            {winner && <> The season was won by <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>.</>}
          </p>

          {season.summary && (
            <>
              <h2>Season Summary</h2>
              {Array.isArray(season.summary)
                ? season.summary.map((para, i) => <p key={i}>{linkifySummary(para, season, sid)}</p>)
                : <p>{linkifySummary(season.summary, season, sid)}</p>
              }
            </>
          )}

          {season.twists && season.twists.length > 0 && (
            <>
              <h2>Twists &amp; Gameplay</h2>
              <ul className="twists-list">
                {season.twists.map((twist, i) => (
                  <li key={i}>{twist}</li>
                ))}
              </ul>
            </>
          )}

          {/* Castaways */}
          <h2>Castaways</h2>
          <div className="cast-table-wrap">
            <table className="cast-table">
              <thead>
                <tr>
                  <th colSpan={2} className="cast-th-contestant">Contestant</th>
                  <th className="cast-th-tribe">Original Tribe</th>
                  {hasSwitch && <th className="cast-th-tribe">Switched Tribe</th>}
                  {hasMerge  && <th className="cast-th-tribe">Merged Tribe</th>}
                  <th className="cast-th-finish">Finish</th>
                  <th className="cast-th-votes">Votes Against</th>
                </tr>
              </thead>
          <tbody>
            {sorted.map((p) => {
              const origTribe = getTribeObj(p.tid);
              const switchTribe = p.switchedTid ? getTribeObj(p.switchedTid) : null;
              const mergeTribe = p.merged ? season.mergeTribe : null;
              const votesAgainst = season.votingHistory.reduce(
                (sum, tc) => sum + tc.votes.filter((v) => v.votedForPid === p.pid).length, 0
              );
              const isWinner = p.pid === season.winnerPid;
              const isRunnerUp = p.pid === season.runnerUpPid;

              return (
                <tr key={p.pid} className={isWinner ? 'cast-row-winner' : isRunnerUp ? 'cast-row-runnerup' : ''}>
                  <td className="cast-cell-photo">
                    <Link to={`/season/${sid}/cast/${slugify(p.name)}`}>
                      <div className="cast-photo-frame">
                        {p.photoUrl && (
                          <img src={p.photoUrl} alt={p.name} style={{
                            objectPosition: p.portraitStyle?.objectPosition ?? '50% 0%',
                            transform: p.portraitStyle?.transform,
                            transformOrigin: p.portraitStyle?.transformOrigin,
                          }} />
                        )}
                      </div>
                    </Link>
                  </td>
                  <td className="cast-cell-info">
                    <Link to={`/season/${sid}/cast/${slugify(p.name)}`} className="cast-player-name">
                      {p.name}
                    </Link>
                  </td>
                  <td className="cast-cell-tribe" style={{ background: origTribe?.color ?? 'transparent' }}>
                    {origTribe && <Link to={`/season/${sid}/tribe/${origTribe.tid}`} className="cast-tribe-label">{origTribe.name}</Link>}
                  </td>
                  {hasSwitch && (
                    <td className="cast-cell-tribe" style={{ background: switchTribe?.color ?? 'transparent' }}>
                      {switchTribe && <Link to={`/season/${sid}/tribe/${switchTribe.tid}`} className="cast-tribe-label">{switchTribe.name}</Link>}
                    </td>
                  )}
                  {hasMerge && (
                    <td className="cast-cell-tribe" style={{ background: mergeTribe?.color ?? 'transparent' }}>
                      {mergeTribe && <Link to={`/season/${sid}/tribe/${season.mergeTribe.tid}`} className="cast-tribe-label">{mergeTribe.name}</Link>}
                    </td>
                  )}
                  <td className="cast-cell-finish">
                    {(() => {
                      const info = getFinishInfo(p);
                      const lines = info.text.split('\n').map((line, i) => <div key={i}>{line}</div>);
                      if (info.eid) {
                        return <Link to={`/season/${sid}/episode/${info.eid}`} className="cast-finish-link">{lines}</Link>;
                      }
                      return lines;
                    })()}
                  </td>
                  <td className="cast-cell-votes">{votesAgainst}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Episodes */}
      {season.episodes.length > 0 && (
        <>
          <h2>Episodes</h2>
          <div className="episode-table-wrap">
            <table className="episode-table">
              <thead>
                <tr>
                  <th>Episode</th>
                  <th>Challenge</th>
                  <th>Eliminated (Vote)</th>
                </tr>
              </thead>
              <tbody>
                {season.episodes.map((ep) => {
                  const tcs = season.votingHistory.filter(
                    (t) => t.episode === ep.number && t.eliminatedPid
                  );
                  const ic = ep.immunityChallenge;

                  let winnerLabel = null;
                  let winnerColor = null;
                  if (ic?.winner) {
                    const tribe = season.tribes.find((t) => t.tid === ic.winner);
                    if (tribe) {
                      winnerLabel = tribe.name;
                      winnerColor = tribe.color;
                    } else {
                      const player = season.cast.find((p) => p.pid === ic.winner);
                      if (player) winnerLabel = player.name;
                    }
                  }

                  const isFinale =
                    season.juryVotes?.length > 0 &&
                    ep.number === season.episodes[season.episodes.length - 1]?.number &&
                    tcs.length === 0;

                  const rows = tcs.length > 0 ? tcs : [null];

                  return rows.map((tc, rowIdx) => {
                    const elim = tc ? season.cast.find((p) => p.pid === tc.eliminatedPid) : null;
                    let voteStr = '';
                    let voteNote = null;
                    if (tc && tc.votes.length > 0) {
                      const valid = tc.votes.filter((v) => !v.idolNullified);
                      const nullified = tc.votes.filter((v) => v.idolNullified);
                      const groups = {};
                      valid.forEach((v) => {
                        groups[v.votedForPid] = (groups[v.votedForPid] || 0) + 1;
                      });
                      voteStr = Object.values(groups).sort((a, b) => b - a).join('-');

                      // Check for preceding tie vote (revote)
                      const tieTc = season.votingHistory.find(
                        (t) => t.episode === tc.episode && t.tid === tc.tid && !t.eliminatedPid
                      );
                      if (tieTc) {
                        const tieCounts = {};
                        tieTc.votes.forEach((v) => {
                          tieCounts[v.votedForPid] = (tieCounts[v.votedForPid] || 0) + 1;
                        });
                        const tieStr = Object.values(tieCounts).sort((a, b) => b - a).join('-');
                        const forElim = valid.filter((v) => v.votedForPid === tc.eliminatedPid).length;
                        const against = valid.length - forElim;
                        voteNote = `Tie ${tieStr}, Revote ${forElim}-${against}`;
                        voteStr = null;
                      } else if (nullified.length > 0) {
                        voteNote = `${nullified.length} nullified, ${voteStr} vote`;
                        voteStr = null;
                      }
                    } else if (tc?.firemaking) {
                      voteStr = 'Fire 🔥';
                    }
                    const elimTribe = tc
                      ? (tc.tid && season.tribes.find((t) => t.tid === tc.tid)) ||
                        season.tribes.find((t) => t.tid === (elim?.switchedTid || elim?.tid))
                      : null;
                    // Anchor ID: for revotes use the tie TC (first in group), otherwise the TC itself
                    const tieTc2 = tc ? season.votingHistory.find(
                      (t) => t.episode === tc.episode && t.tid === tc.tid && !t.eliminatedPid && t.tcid !== tc.tcid
                    ) : null;
                    const anchorTcid = tieTc2 ? tieTc2.tcid : tc?.tcid;

                    return (
                      <tr key={tc?.tcid || ep.eid}>
                        {rowIdx === 0 && (
                          <>
                            <td className="ep-tbl-ep" rowSpan={rows.length}>
                              <Link to={`/season/${sid}/episode/${ep.eid}`}>Episode {ep.number}</Link>
                            </td>
                            <td
                              className={`ep-tbl-challenge${winnerColor ? ' ep-tbl-colored' : ''}`}
                              style={winnerColor ? { backgroundColor: winnerColor } : {}}
                              rowSpan={rows.length}
                            >
                              {ic ? (
                                <Link to={`/season/${sid}/episode/${ep.eid}/challenge/immunity`}
                                  className="ep-tbl-chal-link">
                                  {ic.name && <span className="ep-tbl-chal-name">{ic.name} — </span>}
                                  {winnerLabel && <span className="ep-tbl-chal-winner">{winnerLabel}</span>}
                                </Link>
                              ) : null}
                            </td>
                          </>
                        )}
                        <td
                          className={`ep-tbl-elim${elimTribe ? ' ep-tbl-elim-colored' : ''}`}
                          style={elimTribe ? { backgroundColor: elimTribe.color } : {}}
                        >
                          {elim && (
                            <Link to={`/season/${sid}/episode/${ep.eid}#tribal-${anchorTcid}`} className="ep-tbl-elim-link">
                              <span className="ep-tbl-elim-name">{elim.name}</span>
                              {voteStr && <span className="ep-tbl-elim-vote"> ({voteStr})</span>}
                              {voteNote && <span className="ep-tbl-elim-note"> ({voteNote})</span>}
                            </Link>
                          )}
                          {!elim && isFinale && (
                            <span className="ep-tbl-finale-label">Jury Vote</span>
                          )}
                        </td>
                      </tr>
                    );
                  });
                })}
              </tbody>
            </table>
          </div>
        </>
      )}

      {/* Voting History */}
      {season.votingHistory.length > 0 && (() => {
        const vhPlayers = [...season.cast].sort((a, b) => a.placement - b.placement);
        const vhTcs = season.votingHistory;
        const hasJury = season.juryVotes && season.juryVotes.length > 0;

        // Track at which TC index each player was eliminated
        const eliminatedAtIdx = {};
        vhTcs.forEach((tc, idx) => {
          if (tc.eliminatedPid) eliminatedAtIdx[tc.eliminatedPid] = idx;
        });

        // Build episode spans for the top header row
        const episodeSpans = [];
        vhTcs.forEach((tc) => {
          const epNum = tc.episode;
          if (episodeSpans.length && episodeSpans[episodeSpans.length - 1].episode === epNum) {
            episodeSpans[episodeSpans.length - 1].span++;
          } else {
            const ep = season.episodes.find((e) => e.number === epNum);
            episodeSpans.push({ episode: epNum, eid: ep?.eid, span: 1 });
          }
        });

        function getPlayerTribeColor(player) {
          return season.tribes.find((t) => t.tid === player.tid)?.color || '#555';
        }

        function getVoteStr(tc) {
          if (tc.votes.length === 0) return tc.firemaking ? <span>No vote<sup className="vh-footnote">*</sup></span> : '—';
          if (!tc.eliminatedPid) {
            // Tie or no elimination — count all votes
            const counts = {};
            tc.votes.forEach((v) => { counts[v.votedForPid] = (counts[v.votedForPid] || 0) + 1; });
            return Object.values(counts).sort((a, b) => b - a).join('-');
          }
          // Normal elimination — count only non-nullified
          const valid = tc.votes.filter((v) => !v.idolNullified);
          const forElim = valid.filter((v) => v.votedForPid === tc.eliminatedPid).length;
          const against = valid.length - forElim;
          return `${forElim}-${against}`;
        }

        // Detect tie/revote pairs: consecutive TCs in same ep+tribe where first has no elimination
        const revoteTcIds = new Set();
        const tieTcRevoteMap = {}; // tieTcid → revoteTC
        vhTcs.forEach((tc, idx) => {
          if (idx > 0) {
            const prev = vhTcs[idx - 1];
            if (prev.episode === tc.episode && prev.tid === tc.tid && !prev.eliminatedPid && tc.eliminatedPid) {
              revoteTcIds.add(tc.tcid);
              tieTcRevoteMap[prev.tcid] = tc;
            }
          }
        });

        // Build finalists array and per-finalist jury vote counts
        const finalists = hasJury
          ? [season.secondRunnerUpPid, season.runnerUpPid, season.winnerPid]
              .filter(Boolean)
              .map((pid) => season.cast.find((p) => p.pid === pid))
              .filter(Boolean)
          : [];
        const juryCountByPid = {};
        finalists.forEach((f) => { juryCountByPid[f.pid] = 0; });
        if (hasJury) {
          season.juryVotes.forEach((jv) => {
            juryCountByPid[jv.votedForPid] = (juryCountByPid[jv.votedForPid] || 0) + 1;
          });
        }

        return (
          <>
            <h2>Voting History</h2>
            <div className="vh-table-wrap">
              <table className="vh-table">
                <thead>
                  {/* Row 1: Episode numbers */}
                  <tr>
                    <th className="vh-corner" rowSpan={3} colSpan={2}></th>
                    {episodeSpans.map((es, i) => (
                      <th key={i} colSpan={es.span} className="vh-ep-header">
                        {es.eid
                          ? <Link to={`/season/${sid}/episode/${es.eid}`}>{es.episode}</Link>
                          : es.episode}
                      </th>
                    ))}
                    {hasJury && (
                      <th className="vh-ep-header vh-jury-col" colSpan={finalists.length}>Jury Vote</th>
                    )}
                  </tr>

                  {/* Row 2: Voted Out — photos + names */}
                  <tr>
                    {vhTcs.map((tc) => {
                      // Revote TC — its header is covered by the tie TC's colSpan
                      if (revoteTcIds.has(tc.tcid)) return null;

                      // If this is a tie TC, the eliminated player is from the revote
                      const revoteTc = tieTcRevoteMap[tc.tcid];
                      const elimPid = revoteTc ? revoteTc.eliminatedPid : tc.eliminatedPid;
                      const elim = elimPid ? season.cast.find((p) => p.pid === elimPid) : null;

                      return (
                        <th key={tc.tcid} className="vh-elim-header" colSpan={revoteTc ? 2 : 1}>
                          {elim ? (
                            <Link to={`/season/${sid}/cast/${slugify(elim.name)}`} className="vh-elim-link">
                              <Avatar name={elim.name} color={getPlayerTribeColor(elim)} size={36}
                                photoUrl={elim.photoUrl} imgStyle={elim.photoStyle} pid={elim.pid} noBorder />
                              <span className="vh-elim-name">{elim.name}</span>
                            </Link>
                          ) : (
                            <span className="vh-no-elim">—</span>
                          )}
                        </th>
                      );
                    })}
                    {finalists.map((f) => (
                      <th key={f.pid} className="vh-elim-header vh-jury-col">
                        <Link to={`/season/${sid}/cast/${slugify(f.name)}`} className="vh-elim-link">
                          <Avatar name={f.name} color={getPlayerTribeColor(f)} size={36}
                            photoUrl={f.photoUrl} imgStyle={f.photoStyle} pid={f.pid} noBorder />
                          <span className="vh-elim-name">{f.name}</span>
                        </Link>
                      </th>
                    ))}
                  </tr>

                  {/* Row 3: Vote counts */}
                  <tr>
                    {vhTcs.map((tc) => (
                      <th key={tc.tcid} className="vh-vote-count">{getVoteStr(tc)}</th>
                    ))}
                    {finalists.map((f) => (
                      <th key={f.pid} className="vh-vote-count vh-jury-col">{juryCountByPid[f.pid]}</th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {vhPlayers.map((p) => {
                    const tribeColor = getPlayerTribeColor(p);
                    const isWinner = p.pid === season.winnerPid;

                    return (
                      <tr key={p.pid} className={isWinner ? 'vh-row-winner' : ''}>
                        {(() => {
                          // Build tribe progression: [original, switched, merged]
                          const tribeObjs = [];
                          const orig = season.tribes.find((t) => t.tid === p.tid);
                          if (orig) tribeObjs.push(orig);
                          if (p.switchedTid) {
                            const sw = season.tribes.find((t) => t.tid === p.switchedTid);
                            if (sw) tribeObjs.push(sw);
                          }
                          if (p.merged && season.mergeTribe) tribeObjs.push(season.mergeTribe);
                          const lastTribe = tribeObjs[tribeObjs.length - 1];
                          const lastColor = lastTribe?.color || '#333';
                          const prevTribes = tribeObjs.slice(0, -1);
                          return (
                            <td className="vh-tribe-pips" style={{ background: lastColor }}>
                              {lastTribe && <Link to={`/season/${sid}/tribe/${lastTribe.tid}`} className="vh-tribe-pips-link" />}
                              {prevTribes.map((t, i) => (
                                <Link key={i} to={`/season/${sid}/tribe/${t.tid}`} className="vh-tribe-arrow" style={{ color: t.color }}>▶</Link>
                              ))}
                            </td>
                          );
                        })()}
                        <td className="vh-player-cell">
                          <Link to={`/season/${sid}/cast/${slugify(p.name)}`} className="vh-player-link">
                            {p.name}
                          </Link>
                        </td>

                        {vhTcs.map((tc, tcIdx) => {
                          const alreadyElim = eliminatedAtIdx[p.pid] !== undefined
                            && tcIdx > eliminatedAtIdx[p.pid];

                          if (alreadyElim) {
                            return <td key={tc.tcid} className="vh-cell vh-cell-dead" />;
                          }

                          // Did the player vote?
                          const vote = tc.votes.find((v) => v.voterPid === p.pid);
                          if (vote) {
                            const target = season.cast.find((pl) => pl.pid === vote.votedForPid)?.name ?? '?';
                            return (
                              <td key={tc.tcid} className="vh-cell"
                                style={{ background: hexToRgba(tribeColor, 0.55) }}>
                                <span className={vote.idolNullified ? 'vh-nullified' : ''}>
                                  {target}
                                </span>
                              </td>
                            );
                          }

                          // Fire-making TC — no traditional vote
                          if (tc.firemaking) {
                            // Loser of fire = eliminated
                            if (tc.firemaking.loser === p.pid) {
                              return (
                                <td key={tc.tcid} className="vh-cell vh-cell-fire-elim"
                                  style={{ background: hexToRgba(tribeColor, 0.55) }}>
                                  Eliminated
                                </td>
                              );
                            }
                            // Everyone else still in the game = No vote
                            return (
                              <td key={tc.tcid} className="vh-cell vh-cell-no-vote"
                                style={{ background: hexToRgba(tribeColor, 0.55) }}>
                                No vote<sup className="vh-footnote">*</sup>
                              </td>
                            );
                          }

                          // Absent — different tribe or no vote at this TC
                          return <td key={tc.tcid} className="vh-cell vh-cell-absent">—</td>;
                        })}

                        {/* Jury vote columns — one per finalist */}
                        {finalists.map((f) => {
                          const jv = season.juryVotes.find((j) => j.jurorPid === p.pid);
                          // This player is a finalist
                          if (p.pid === season.winnerPid) {
                            return (
                              <td key={f.pid} className={`vh-cell ${f.pid === p.pid ? 'vh-cell-winner' : 'vh-cell-finalist'}`}>
                                {f.pid === p.pid ? 'Winner' : ''}
                              </td>
                            );
                          }
                          if (p.pid === season.runnerUpPid || p.pid === season.secondRunnerUpPid) {
                            return (
                              <td key={f.pid} className={`vh-cell ${f.pid === p.pid ? 'vh-cell-finalist' : 'vh-cell-finalist'}`}>
                                {f.pid === p.pid ? (p.pid === season.runnerUpPid ? 'Runner-Up' : '2nd Runner-Up') : ''}
                              </td>
                            );
                          }
                          // Jury member
                          if (jv) {
                            return (
                              <td key={f.pid} className={`vh-cell ${jv.votedForPid === f.pid ? 'vh-cell-jury' : 'vh-cell-absent'}`}>
                                {jv.votedForPid === f.pid ? f.name : ''}
                              </td>
                            );
                          }
                          // Pre-jury player — no jury vote
                          return <td key={f.pid} className="vh-cell vh-cell-dead" />;
                        })}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="vh-legend">
              <span>— = Did not attend</span>
              <span><span className="vh-nullified">Name</span> = Nullified by idol</span>
            </div>
            {season.votingHistory.some((tc) => tc.firemaking) && (() => {
              const fireTc = season.votingHistory.find((tc) => tc.firemaking);
              const winner = season.cast.find((p) => p.pid === fireTc.firemaking.winner);
              const loser = season.cast.find((p) => p.pid === fireTc.firemaking.loser);
              return (
                <div className="vh-footnote-text">
                  <sup>*</sup> Instead of a traditional vote, the winner of the Immunity Challenge chose someone to take with them to the Final Three. The remaining two players competed in a {fireTc.firemaking.challenge} challenge{winner && loser ? <> — {winner.name} won, eliminating {loser.name}</> : ''}.
                </div>
              );
            })()}
          </>
        );
      })()}

      </div>

    </div>
  );
}
