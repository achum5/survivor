// src/pages/TribePage.jsx
import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify, ordinal, getTribeColor } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';
import TribeBadge from '../components/TribeBadge';

function hexToRgba(hex, alpha) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return `rgba(${r},${g},${b},${alpha})`;
}

/* ── Tribal Council Tabs sub-component ── */
function TcTabs({ tcs, season, sid, tribeColor }) {
  const [activeId, setActiveId] = useState(tcs[0]?.tcid);
  const activeTc = tcs.find((t) => t.tcid === activeId) ?? tcs[0];

  // Resolve tribe for the card header color
  const tcTribe = activeTc.tid ? season.tribes.find((t) => t.tid === activeTc.tid) : null;
  const headerTribe = tcTribe ?? season.mergeTribe ?? null;

  const eliminated = activeTc.eliminatedPid
    ? season.cast.find((p) => p.pid === activeTc.eliminatedPid)
    : null;

  // Group votes by target, sorted by count descending (same logic as EpisodePage)
  const idolTargets = (activeTc.idols ?? []).map((idol) => idol.playedOn);
  const targetIds = [...new Set(activeTc.votes.map((v) => v.votedForPid))];
  const voteGroups = targetIds
    .map((tpid) => ({
      target: season.cast.find((p) => p.pid === tpid),
      votes: activeTc.votes.filter((v) => v.votedForPid === tpid),
      idolUsed: idolTargets.includes(tpid),
    }))
    .sort((a, b) => b.votes.length - a.votes.length);

  return (
    <>
      <h2 className="tp-section-head" style={{ borderLeftColor: tribeColor }}>Tribal Council History</h2>

      {/* Tab strip */}
      <div className="tp-tc-tabs">
        {tcs.map((tcItem) => {
          const elim = tcItem.eliminatedPid
            ? season.cast.find((p) => p.pid === tcItem.eliminatedPid)
            : null;
          return (
            <button
              key={tcItem.tcid}
              className={`tp-tc-tab${tcItem.tcid === activeId ? ' active' : ''}`}
              style={tcItem.tcid === activeId ? { borderBottomColor: tribeColor } : undefined}
              onClick={() => setActiveId(tcItem.tcid)}
            >
              <span className="tp-tc-tab-ep">Ep {tcItem.episode}</span>
              {elim && <span className="tp-tc-tab-elim">{elim.name}</span>}
            </button>
          );
        })}
      </div>

      {/* Active TC — rendered as the same tc-card from EpisodePage */}
      <div className="tc-card tp-tc-card-panel" style={headerTribe ? { background: headerTribe.color } : undefined}>
        <div className="tc-card-header">
          <span>Tribal Council:</span>
          {headerTribe ? (
            <TribeBadge tribe={headerTribe} sid={sid} />
          ) : (
            <span className="tribe-badge tribe-badge-merged">Merged</span>
          )}
        </div>

        {activeTc.notes && <div className="tc-section-notes">— {activeTc.notes}</div>}

        {activeTc.firemaking ? (
          <div className="tc-no-votes" style={{ padding: 16 }}>
            🔥 {activeTc.firemaking.challenge}: {activeTc.firemaking.description}
          </div>
        ) : activeTc.votes.length > 0 ? (
          <>
            <div className="tc-cols-header">
              <div className="tc-col-label">Voted Against</div>
              <div className="tc-col-label">Voter</div>
            </div>
            {voteGroups.map((group) => {
              const countingVotes = group.votes.filter((v) => !v.idolNullified);
              const allNullified = group.votes.length > 0 && countingVotes.length === 0;
              const isEliminated = group.target?.pid === activeTc.eliminatedPid;
              return (
                <div className={`tc-vote-row${allNullified ? ' tc-vote-row-nullified' : ''}${isEliminated ? ' tc-vote-row-eliminated' : ''}`} key={group.target?.pid ?? 'unknown'}>
                  <div className="tc-target-cell">
                    {group.target && (
                      <Link to={`/season/${sid}/cast/${slugify(group.target.name)}`}>
                        <Avatar name={group.target.name} color={getTribeColor(season, group.target.tid)}
                          size={48} photoUrl={group.target.photoUrl} imgStyle={group.target.photoStyle}
                          pid={group.target.pid} noBorder />
                      </Link>
                    )}
                    <div className="tc-target-name">
                      {group.target?.name ?? '?'}
                      {group.idolUsed && (
                        <div className="tc-idol-label">🛡️ Idol</div>
                      )}
                    </div>
                    {countingVotes.length > 0 && (
                      <span className="tc-vote-count">{countingVotes.length}</span>
                    )}
                  </div>
                  <div className="tc-voters-cell">
                    <div className="tc-voter-photos">
                      {group.votes.map((v) => {
                        const voter = season.cast.find((p) => p.pid === v.voterPid);
                        return voter ? (
                          <Link key={v.vid} to={`/season/${sid}/cast/${slugify(voter.name)}`}
                            style={{ opacity: v.idolNullified ? 0.45 : 1 }}>
                            <Avatar name={voter.name} color={getTribeColor(season, voter.tid)}
                              size={38} photoUrl={voter.photoUrl} imgStyle={voter.photoStyle}
                              pid={voter.pid} noBorder />
                          </Link>
                        ) : null;
                      })}
                    </div>
                    <div className="tc-voter-names">
                      {group.votes.map((v, vi) => {
                        const voter = season.cast.find((p) => p.pid === v.voterPid);
                        if (!voter) return null;
                        return (
                          <span key={v.vid}>
                            {vi > 0 && ', '}{voter.name}
                          </span>
                        );
                      })}
                    </div>
                    {allNullified && (
                      <div className="tc-votes-not-counted">(votes not counted)</div>
                    )}
                  </div>
                </div>
              );
            })}
          </>
        ) : (
          <div className="tc-no-votes">No votes recorded.</div>
        )}

        {eliminated && (
          <div className="tc-voted-out-footer">
            <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`} style={{ filter: 'grayscale(1)', flexShrink: 0 }}>
              <Avatar name={eliminated.name} color={getTribeColor(season, eliminated.tid)}
                size={36} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle}
                pid={eliminated.pid} noBorder />
            </Link>
            <div className="tc-voted-out-label">{activeTc.votes.length > 0 ? 'Voted Out' : 'Eliminated'}</div>
            <div className="tc-voted-out-name">{eliminated.name}</div>
          </div>
        )}

        {activeTc.confessionalQuote && eliminated && (
          <div className="tc-final-words">
            <div className="tc-final-words-header">Final Words</div>
            <div className="tc-final-words-body">
              <div className="tc-final-words-avatar" style={{ filter: 'grayscale(1)' }}>
                <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`}>
                  <Avatar name={eliminated.name} color={getTribeColor(season, eliminated.tid)}
                    size={56} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle}
                    pid={eliminated.pid} noBorder />
                </Link>
                <div className="tc-final-words-who">{eliminated.name.toUpperCase()}</div>
              </div>
              <div className="tc-final-words-quote">
                <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                {activeTc.confessionalQuote}
                <span className="tc-quote-mark tc-quote-close">&rdquo;</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default function TribePage() {
  const { sid, tid } = useParams();
  const navigate = useNavigate();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const tribe = season.tribes.find((t) => t.tid === tid)
    || (season.mergeTribe?.tid === tid ? season.mergeTribe : null);
  if (!tribe) return <div className="article"><p>Tribe not found.</p></div>;

  const isMerged = season.mergeTribe?.tid === tid;

  // All tribes for the selector dropdown
  const allTribes = [...season.tribes, ...(season.mergeTribe ? [season.mergeTribe] : [])];

  // Members: original tribes by tid, switched tribes by switchedTid, merged by p.merged
  const members = isMerged
    ? season.cast.filter((p) => p.merged)
    : tribe.phase === 'original'
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

  // Tribal council history — merged TCs have tid: null
  const tcs = isMerged
    ? season.votingHistory.filter((tc) => tc.tid === null)
    : season.votingHistory.filter((tc) => tc.tid === tid);

  const eliminations = tcs.filter((tc) => tc.eliminatedPid).length;

  const phaseLabel = isMerged ? 'Merged Tribe'
    : tribe.phase === 'original' ? 'Original Tribe'
    : tribe.phase === 'switched' ? 'Switched Tribe'
    : 'Tribe';

  const tc = tribe.color;

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: `${tribe.name} Tribe` },
      ]} />

      {/* ── Title Banner ── */}
      <div className="tp-banner" style={{ borderLeftColor: tc }}>
        <div className="tp-banner-top">
          <span className="tp-color-dot" style={{ background: tc }} />
          <div className="tp-title-select-wrap">
            <select
              className="tp-title-select"
              value={tid}
              onChange={(e) => navigate(`/season/${sid}/tribe/${e.target.value}`)}
              style={{ color: tc }}
            >
              {allTribes.map((t) => (
                <option key={t.tid} value={t.tid}>{t.name} Tribe</option>
              ))}
            </select>
          </div>
        </div>
        <p className="tp-subtitle">{phaseLabel} — <Link to={`/season/${sid}`}>{season.name}</Link></p>
      </div>

      {/* ── Stats Row ── */}
      <div className="tp-stats">
        <div className="tp-stat">
          <span className="tp-stat-val">{members.length}</span>
          <span className="tp-stat-lbl">Members</span>
        </div>
        {challengeRows.length > 0 && (
          <div className="tp-stat">
            <span className="tp-stat-val">
              <span className="record-wins">{wins}W</span>
              {' – '}
              <span className="record-losses">{losses}L</span>
            </span>
            <span className="tp-stat-lbl">Record</span>
          </div>
        )}
        {tcs.length > 0 && (
          <div className="tp-stat">
            <span className="tp-stat-val">{eliminations}</span>
            <span className="tp-stat-lbl">Tribal Councils</span>
          </div>
        )}
      </div>

      {/* ── Members ── */}
      <h2 className="tp-section-head" style={{ borderLeftColor: tc }}>Members</h2>
      <div className="cast-grid">
        {sortedMembers.map((p) => (
          <Link key={p.pid} to={`/season/${sid}/cast/${slugify(p.name)}`}
            className="cast-card tp-member-card" style={{ borderTopColor: tc }}>
            <Avatar name={p.name} color={tc} size={80} photoUrl={p.photoUrl} imgStyle={p.photoStyle} pid={p.pid} noBorder />
            <h3>{p.name}</h3>
            <span className="placement">{ordinal(p.placement)} place</span>
          </Link>
        ))}
      </div>

      {/* ── Challenge History ── */}
      {challengeRows.length > 0 && (
        <>
          <h2 className="tp-section-head" style={{ borderLeftColor: tc }}>Challenge History</h2>
          <div className="tp-table-wrap">
            <table className="tp-table">
              <thead>
                <tr>
                  <th>Ep</th>
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
                    <tr key={i} className={isWin ? 'tp-row-win' : 'tp-row-loss'}>
                      <td style={{ textAlign: 'center', whiteSpace: 'nowrap' }}>
                        <Link to={`/season/${sid}/episode/${r.ep.eid}`}>{r.ep.number}</Link>
                      </td>
                      <td>
                        {r.ch.name
                          ? <Link to={`/season/${sid}/episode/${r.ep.eid}/challenge/${r.ctype}`}>{r.ch.name}</Link>
                          : <span className="text-muted">—</span>}
                      </td>
                      <td>{r.ch.type ?? (r.ctype === 'reward' ? 'Reward' : 'Immunity')}</td>
                      <td>
                        <span className={`tp-result-badge ${isWin ? 'result-win' : 'result-loss'}`}>
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
                                <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={28}
                                  photoUrl={p.photoUrl} imgStyle={p.photoStyle} pid={p.pid} noBorder />
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
          </div>
        </>
      )}

      {/* ── Tribal Council History (Tabbed) ── */}
      {tcs.length > 0 && <TcTabs tcs={tcs} season={season} sid={sid} tribeColor={tc} />}
    </div>
  );
}
