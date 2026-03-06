// src/pages/EpisodePage.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, slugify, getYouTubeEmbedUrl } from '../utils/helpers';
import { linkify } from '../utils/linkify';
import Avatar from '../components/Avatar';
import TribeBadge from '../components/TribeBadge';

function getYouTubeVideoId(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.hostname === 'youtu.be' ? u.pathname.slice(1) : u.searchParams.get('v');
  } catch { return null; }
}

// Build a YouTube embed URL with a specific absolute start time (seconds)
function buildEmbedAt(videoUrl, startSeconds) {
  const videoId = getYouTubeVideoId(videoUrl);
  if (!videoId || startSeconds == null) return null;
  return `https://www.youtube.com/embed/${videoId}?start=${Math.round(startSeconds)}&autoplay=1`;
}

function VideoModal({ src, title, onClose, isImage }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className={`video-modal-content${isImage ? ' video-modal-image' : ''}`} onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-bar">
          {title && <span className="video-modal-title">{title}</span>}
          <button className="video-modal-close" onClick={onClose} title="Close (Esc)">✕</button>
        </div>
        {isImage ? (
          <img src={src} alt={title || 'Results'} style={{ width: '100%', display: 'block' }} />
        ) : (
          <iframe
            src={src}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        )}
      </div>
    </div>
  );
}

// Resolve a winner id to a display name + link (pid = player, tid = tribe)
function WinnerDisplay({ winnerId, season, sid }) {
  if (!winnerId) return <span className="empty-state">TBD</span>;

  // Check if it's a tribe id
  const tribe = season.tribes.find((t) => t.tid === winnerId);
  if (tribe) {
    return <TribeBadge tribe={tribe} sid={sid} />;
  }

  // Otherwise treat as player pid
  const player = season.cast.find((p) => p.pid === winnerId);
  if (player) {
    return (
      <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={30} photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} noBorder />
        {player.name}
      </Link>
    );
  }

  return <span>{winnerId}</span>;
}

function renderVoteGroups(tc, season, sid, eliminatedPid) {
  const targetIds = [...new Set(tc.votes.map((v) => v.votedForPid))];
  const idolTargets = (tc.idols ?? []).map((idol) => idol.playedOn);
  const voteGroups = targetIds
    .map((tpid) => ({
      target: season.cast.find((p) => p.pid === tpid),
      votes: tc.votes.filter((v) => v.votedForPid === tpid),
      idolUsed: idolTargets.includes(tpid),
    }))
    .sort((a, b) => b.votes.length - a.votes.length);

  return (
    <>
      <div className="tc-cols-header">
        <div className="tc-col-label">Voted Against</div>
        <div className="tc-col-label">Voter</div>
      </div>
      {voteGroups.map((group) => {
        const countingVotes = group.votes.filter((v) => !v.idolNullified);
        const allNullified = group.votes.length > 0 && countingVotes.length === 0;
        const isEliminated = group.target?.pid === eliminatedPid;
        return (
          <div className={`tc-vote-row${allNullified ? ' tc-vote-row-nullified' : ''}${isEliminated ? ' tc-vote-row-eliminated' : ''}`} key={group.target?.pid ?? 'unknown'}>
            <div className="tc-target-cell">
              {group.target && (
                <Link to={`/season/${sid}/cast/${slugify(group.target.name)}`}>
                  <Avatar name={group.target.name} color={getTribeColor(season, tc.tid || group.target.tid)}
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
                      <Avatar name={voter.name} color={getTribeColor(season, tc.tid || voter.tid)}
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
  );
}

// tcs = array of TCs for the same tribe (1 = normal, 2+ = tie+revote)
// episode = episode object (for videoUrl); onPlay = fn(embedSrc) to open modal
function TribalCouncilCard({ tcs, season, sid, episode, onPlay }) {
  const tc0 = tcs[0];
  const tcTribe = tc0.tid ? season.tribes.find((t) => t.tid === tc0.tid) : null;
  const headerTribe = tcTribe ?? season.mergeTribe ?? null;
  const elimTc = tcs.find((t) => t.eliminatedPid);
  const eliminated = elimTc ? season.cast.find((p) => p.pid === elimTc.eliminatedPid) : null;

  // Use the first TC's videoTimestamp if available, otherwise fall back to episode video start
  const tcTimestamp = tcs[0].videoTimestamp ?? null;
  const playUrl = episode?.videoUrl
    ? (tcTimestamp != null
        ? buildEmbedAt(episode.videoUrl, tcTimestamp)
        : getYouTubeEmbedUrl(episode.videoUrl) + (getYouTubeEmbedUrl(episode.videoUrl)?.includes('?') ? '&' : '?') + 'autoplay=1'
      )
    : null;

  return (
    <div id={`tribal-${tc0.tcid}`} className="tc-card" style={headerTribe ? { background: headerTribe.color } : undefined}>

      {tcs.map((tc, i) => (
        <div key={tc.tcid}>
          {i > 0 && <div className="tc-revote-divider">↩ Revote</div>}
          {tc.notes && <div className="tc-section-notes">{linkify(tc.notes, [{ season, sid }])}</div>}
          {tc.votes.length > 0
            ? renderVoteGroups(tc, season, sid, elimTc?.eliminatedPid)
            : <div className="tc-no-votes">No votes recorded.</div>
          }
        </div>
      ))}

      {eliminated && !elimTc?.confessionalQuote && (
        <div className="tc-voted-out-footer">
          <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`} style={{ filter: 'grayscale(1)', flexShrink: 0 }}>
            <Avatar name={eliminated.name} color={getTribeColor(season, tc0.tid || eliminated.tid)}
              size={36} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle}
              pid={eliminated.pid} noBorder />
          </Link>
          <div className="tc-voted-out-label">{elimTc?.votes?.length > 0 ? 'Voted Out' : 'Eliminated'}</div>
          <div className="tc-voted-out-name">{eliminated.name}</div>
        </div>
      )}

      {/* Final Words quote */}
      {eliminated && (
        elimTc?.confessionalQuote ? (
          <div className="tc-final-words">
            <div className="tc-final-words-header">
              Final Words
              {(() => {
                const confessionalTs = elimTc?.confessionalTimestamp ?? null;
                const confessionalUrl = (episode?.videoUrl && confessionalTs != null)
                  ? buildEmbedAt(episode.videoUrl, confessionalTs)
                  : null;
                return confessionalUrl ? (
                  <button className="tc-final-words-play"
                    onClick={() => onPlay(confessionalUrl, `${eliminated.name} — Final Words`)}
                    title={`Watch ${eliminated.name}'s final words`}>
                    ▶
                  </button>
                ) : null;
              })()}
            </div>
            <div className="tc-final-words-body">
              <div className="tc-final-words-avatar" style={{ filter: 'grayscale(1)' }}>
                <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`}>
                  <Avatar name={eliminated.name} color={getTribeColor(season, tc0.tid || eliminated.tid)}
                    size={56} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle}
                    pid={eliminated.pid} noBorder />
                </Link>
                <div className="tc-final-words-who">{eliminated.name.toUpperCase()}</div>
              </div>
              <div className="tc-final-words-quote">
                <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                {linkify(elimTc.confessionalQuote, [{ season, sid }])}
                <span className="tc-quote-mark tc-quote-close">&rdquo;</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="tc-no-confessional">No confessional was given.</div>
        )
      )}
    </div>
  );
}

function ChallengeSection({ label, challenge, season, sid, eid, ctype, episode, onPlay }) {
  if (!challenge) return null;
  const hasContent = challenge.name || challenge.winner;
  if (!hasContent) return null;

  const challengeTimestamp = challenge.videoTimestamp ?? null;
  const playUrl = (episode?.videoUrl && challengeTimestamp != null)
    ? buildEmbedAt(episode.videoUrl, challengeTimestamp)
    : null;

  const modalTitle = challenge.name ? `${label}: ${challenge.name}` : label;

  return (
    <div className="episode-challenge-block">
      <h3>
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
          <Link to={`/season/${sid}/episode/${eid}/challenge/${ctype}`}
            style={{ color: 'inherit', textDecoration: 'none' }}>
            {label}
          </Link>
          {playUrl && (
            <button className="tc-play-btn confessional-play-btn"
              onClick={() => onPlay(playUrl, modalTitle)}
              title={`Watch ${label.toLowerCase()}`}>
              ▶
            </button>
          )}
        </span>
      </h3>
      <table className="challenge-table episode-challenge-table">
        <tbody>
          {challenge.name && (
            <tr>
              <th>Challenge</th>
              <td>
                <Link to={`/season/${sid}/episode/${eid}/challenge/${ctype}`}>
                  {challenge.name}
                </Link>
              </td>
            </tr>
          )}
          {challenge.description && (
            <tr><th>Description</th><td>{linkify(challenge.description, [{ season, sid }])}</td></tr>
          )}
          {challenge.winner !== undefined && (
            <tr>
              <th>{challenge.secondWinner ? 'Winners' : 'Winner'}</th>
              <td>
                <WinnerDisplay winnerId={challenge.winner} season={season} sid={sid} />
                {challenge.secondWinner && (
                  <><br /><WinnerDisplay winnerId={challenge.secondWinner} season={season} sid={sid} /></>
                )}
              </td>
            </tr>
          )}
          {challenge.reward && (
            <tr><th>Reward</th><td>{challenge.reward}</td></tr>
          )}
          {challenge.secondaryImageUrl && (
            <tr>
              <th>Results</th>
              <td>
                <span
                  className="challenge-results-link"
                  onClick={() => onPlay(challenge.secondaryImageUrl, `${challenge.name || label} — Results`, true)}
                >
                  View Results
                </span>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function EpisodePage() {
  const { sid, eid } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null); // { src, title, isImage? }
  const [activeTabKey, setActiveTabKey] = useState(null);
  const prevEid = useRef(eid);
  useEffect(() => {
    if (prevEid.current !== eid) { setActiveTabKey(null); prevEid.current = eid; }
  }, [eid]);

  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const episode = season.episodes.find((e) => e.eid === eid);
  if (!episode) return <div className="article"><p>Episode not found.</p></div>;

  const tcs = season.votingHistory.filter((tc) => tc.episode === episode.number && !(tc.eliminatedPid === null && tc.votes.length === 0 && !tc.confessionals?.length));

  // Group TCs for tabbing — group by tid, keeping tie+revote pairs together
  // but splitting truly separate tribals (e.g. two different tribe TCs in same episode)
  const tcGroups = [];
  tcs.forEach((tc, i) => {
    const tidKey = tc.tid ?? '__merged__';
    // Check if this TC is a revote of the previous one (same tid, prev had no elimination)
    const prev = i > 0 ? tcs[i - 1] : null;
    const isRevote = prev && (prev.tid ?? '__merged__') === tidKey && !prev.eliminatedPid;
    if (isRevote && tcGroups.length > 0) {
      // Append to previous group
      tcGroups[tcGroups.length - 1].tcs.push(tc);
    } else {
      // Check if this tid already has a group (different tribal, same tribe)
      const existing = tcGroups.find(g => g.key === tidKey);
      if (existing) {
        // Different tribal for same tribe — use tcid as unique key
        tcGroups.push({ key: tc.tcid, tcs: [tc] });
      } else {
        tcGroups.push({ key: tidKey, tcs: [tc] });
      }
    }
  });
  const isMultiTc = tcGroups.length > 1;
  const resolvedKey = (isMultiTc && activeTabKey && tcGroups.some(g => g.key === activeTabKey))
    ? activeTabKey : tcGroups[0]?.key;
  const embedUrl = getYouTubeEmbedUrl(episode.videoUrl, episode.videoEndTime);

  // Hash-based TC tab switching: #tribal-<tcid> → switch to that TC's tab & scroll
  useEffect(() => {
    const hash = window.location.hash;
    if (!hash) return;
    const m = hash.match(/^#tribal-(.+)/);
    if (!m) return;
    if (isMultiTc) {
      const tcid = m[1];
      const group = tcGroups.find(g => g.tcs.some(t => t.tcid === tcid));
      if (group) setActiveTabKey(group.key);
    }
    setTimeout(() => {
      const el = document.getElementById('tribal-council');
      if (!el) return;
      const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 56;
      const subheader = document.querySelector('.ep-subheader');
      const offset = headerH + (subheader ? subheader.offsetHeight : 0) + 16;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }, 100);
  }, [eid]); // eslint-disable-line react-hooks/exhaustive-deps

  const idx = season.episodes.findIndex((e) => e.eid === eid);
  const prev = season.episodes[idx - 1];
  const next = season.episodes[idx + 1];

  const hasReward = episode.rewardChallenge?.name || episode.rewardChallenge?.winner;
  const hasImmunity = episode.immunityChallenge?.name || episode.immunityChallenge?.winner;

  return (
    <>
      <div className="ep-subheader">
        <div className="ep-subheader-inner">
          <div className="ep-header-nav-row">
            {prev ? (
              <Link to={`/season/${sid}/episode/${prev.eid}`} className="ep-nav-arrow" title={`Episode ${prev.number}`}>&lsaquo;</Link>
            ) : (
              <span className="ep-nav-arrow disabled">&lsaquo;</span>
            )}
            <select
              className="ep-select"
              value={eid}
              onChange={(e) => navigate(`/season/${sid}/episode/${e.target.value}`)}
            >
              {season.episodes.map((ep) => (
                <option key={ep.eid} value={ep.eid}>Episode {ep.number}</option>
              ))}
            </select>
            {next ? (
              <Link to={`/season/${sid}/episode/${next.eid}`} className="ep-nav-arrow" title={`Episode ${next.number}`}>&rsaquo;</Link>
            ) : (
              <span className="ep-nav-arrow disabled">&rsaquo;</span>
            )}
          </div>
          {(() => {
            const sections = [];
            if (hasReward || hasImmunity) sections.push({ id: 'challenges', label: 'Challenges' });
            if (episode.journey) sections.push({ id: 'journey', label: 'Journey' });
            if (tcs.some(tc => tc.confessionals?.length > 0)) sections.push({ id: 'confessionals', label: 'Confessionals' });
            if (tcs.length > 0) sections.push({ id: 'tribal-council', label: 'Tribal Council' });
            return sections.length > 0 ? (
              <nav className="ep-section-nav">
                {sections.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="ep-section-link">{s.label}</a>
                ))}
              </nav>
            ) : null;
          })()}
        </div>
      </div>
    <div className="article ep-article">
      {modal && <VideoModal src={modal.src} title={modal.title} isImage={modal.isImage} onClose={() => setModal(null)} />}

      {/* Episode thumbnails — one per section (challenges, journey, TC, firemaking) */}
      {embedUrl ? (() => {
        const icImage = episode.immunityChallenge?.imageUrl;
        const fmTc = tcs.find((tc) => tc.firemaking?.imageUrl);
        const fm = fmTc?.firemaking;
        const fmPlayUrl = fm?.videoTimestamp != null ? buildEmbedAt(episode.videoUrl, fm.videoTimestamp) : null;
        return (
          <div className="episode-thumbs-row">
            {episode.rewardChallenge?.imageUrl && (() => {
              const rcTs = episode.rewardChallenge.videoTimestamp;
              const rcEmbed = rcTs != null ? buildEmbedAt(episode.videoUrl, rcTs) : null;
              return (
                <div>
                  <div className="episode-thumb-wrapper"
                    onClick={rcEmbed ? () => setModal({ src: rcEmbed, title: episode.rewardChallenge.name || 'Reward Challenge' }) : undefined}
                    style={rcEmbed ? undefined : { cursor: 'default' }}>
                    <img src={episode.rewardChallenge.imageUrl} alt={episode.rewardChallenge.name || 'Reward Challenge'} />
                    {rcEmbed && (
                      <div className="episode-thumb-play">
                        <div className="episode-thumb-play-btn">▶</div>
                      </div>
                    )}
                  </div>
                  <div className="episode-thumb-label">{episode.rewardChallenge.name || 'Reward'}</div>
                </div>
              );
            })()}
            {icImage && (() => {
              const icTs = episode.immunityChallenge.videoTimestamp;
              const icEmbed = icTs != null ? buildEmbedAt(episode.videoUrl, icTs) : null;
              return (
                <div>
                  <div className="episode-thumb-wrapper"
                    onClick={icEmbed ? () => setModal({ src: icEmbed, title: episode.immunityChallenge.name || 'Immunity Challenge' }) : undefined}
                    style={icEmbed ? undefined : { cursor: 'default' }}>
                    <img src={icImage} alt={episode.immunityChallenge.name || 'Immunity Challenge'} />
                    {icEmbed && (
                      <div className="episode-thumb-play">
                        <div className="episode-thumb-play-btn">▶</div>
                      </div>
                    )}
                  </div>
                  <div className="episode-thumb-label">{episode.immunityChallenge.name || 'Immunity'}</div>
                </div>
              );
            })()}
            {episode.journey?.imageUrl && (() => {
              const jUrl = episode.journey.videoUrl;
              const jEmbed = jUrl ? (() => { try { const u = new URL(jUrl); return buildEmbedAt(jUrl, u.searchParams.get('t') || 0); } catch { return null; } })() : null;
              return (
                <div>
                  <div className="episode-thumb-wrapper"
                    onClick={jEmbed ? () => setModal({ src: jEmbed, title: 'Journey' }) : undefined}
                    style={jEmbed ? undefined : { cursor: 'default' }}>
                    <img src={episode.journey.imageUrl} alt="Journey" />
                    {jEmbed && (
                      <div className="episode-thumb-play">
                        <div className="episode-thumb-play-btn">▶</div>
                      </div>
                    )}
                  </div>
                  <div className="episode-thumb-label">Journey</div>
                </div>
              );
            })()}
            {tcs.filter(tc => tc.imageUrl).map((tc, i, arr) => {
              const tcEmbed = tc.videoTimestamp != null
                ? buildEmbedAt(episode.videoUrl, tc.videoTimestamp)
                : null;
              const isMulti = arr.length > 1;
              const label = isMulti ? `Tribal Council ${i + 1}` : 'Tribal Council';
              return (
                <div key={tc.tcid}>
                  <div className="episode-thumb-wrapper"
                    onClick={tcEmbed ? () => setModal({ src: tcEmbed, title: label }) : undefined}
                    style={tcEmbed ? undefined : { cursor: 'default' }}>
                    <img src={tc.imageUrl} alt={label} />
                    {tcEmbed && (
                      <div className="episode-thumb-play">
                        <div className="episode-thumb-play-btn">▶</div>
                      </div>
                    )}
                  </div>
                  <div className="episode-thumb-label">{label}</div>
                </div>
              );
            })}
            {fm && (
              <div>
                <div className="episode-thumb-wrapper"
                  onClick={fmPlayUrl ? () => setModal({ src: fmPlayUrl, title: fm.challenge }) : undefined}
                  style={fmPlayUrl ? undefined : { cursor: 'default' }}>
                  <img src={fm.imageUrl} alt={fm.challenge} />
                  {fmPlayUrl && (
                    <div className="episode-thumb-play">
                      <div className="episode-thumb-play-btn">▶</div>
                    </div>
                  )}
                </div>
                <div className="episode-thumb-label">{fm.challenge}</div>
              </div>
            )}
          </div>
        );
      })() : (
        <div className="episode-no-video">No video added yet.</div>
      )}

      {/* Episode Images */}
      {episode.images && episode.images.length > 0 && (
        <div className="episode-images">
          {episode.images.map((img, i) => (
            <figure key={i} className="episode-image-figure">
              <img src={img.url} alt={img.caption || `Episode ${episode.number} image ${i + 1}`} className="episode-image" />
              {img.caption && <figcaption className="episode-image-caption">{img.caption}</figcaption>}
            </figure>
          ))}
        </div>
      )}

      {/* Challenges */}
      {(hasReward || hasImmunity) && (
        <>
          <h2 id="challenges">Challenges</h2>
          <ChallengeSection label="Reward Challenge"   challenge={episode.rewardChallenge}   season={season} sid={sid} eid={eid} ctype="reward"   episode={episode} onPlay={(src, title, isImage) => setModal({ src, title, isImage })} />
          <ChallengeSection label="Immunity Challenge" challenge={episode.immunityChallenge} season={season} sid={sid} eid={eid} ctype="immunity" episode={episode} onPlay={(src, title, isImage) => setModal({ src, title, isImage })} />
        </>
      )}

      {/* Journey */}
      {episode.journey && (() => {
        const j = episode.journey;
        return (
          <>
            <h2 id="journey">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Journey
                {(() => {
                  const jUrl = j.videoUrl;
                  const jEmbed = jUrl ? (() => { try { const u = new URL(jUrl); return buildEmbedAt(jUrl, u.searchParams.get('t') || 0); } catch { return null; } })() : null;
                  return jEmbed ? (
                    <button className="tc-play-btn" onClick={() => setModal({ src: jEmbed, title: 'Journey' })} title="Watch journey">▶</button>
                  ) : null;
                })()}
              </span>
            </h2>
            <div className="journey-section">
              {j.description && <p className="journey-description">{linkify(j.description, [{ season, sid }])}</p>}
              {j.dialogue && j.dialogue.length > 0 && (
                <div className="dialogue-chat">
                  {j.dialogue.map((d, i) => {
                    const member = season.cast.find((c) => c.pid === d.pid);
                    if (!member) return null;
                    const tribe = member ? season.tribes.find((t) => t.tid === member.tid) : null;
                    const prevSame = i > 0 && j.dialogue[i - 1].pid === d.pid;
                    return (
                      <div key={i} className={`dialogue-msg${prevSame ? ' dialogue-msg-cont' : ''}`}>
                        <div className="dialogue-msg-avatar">
                          {!prevSame && (
                            <Link to={`/season/${sid}/cast/${slugify(member.name)}`}>
                              <Avatar name={member.name} color={tribe?.color || '#555'} size={32}
                                photoUrl={member.photoUrl} imgStyle={member.photoStyle}
                                pid={member.pid} noBorder />
                            </Link>
                          )}
                        </div>
                        <div className="dialogue-msg-body">
                          {!prevSame && (
                            <Link to={`/season/${sid}/cast/${slugify(member.name)}`}
                              className="dialogue-msg-name" style={{ color: tribe?.color || '#aaa' }}>
                              {member.name}
                            </Link>
                          )}
                          <div className="dialogue-msg-text">{linkify(d.quote, [{ season, sid }])}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
              {j.participants && j.participants.length > 0 && (
                <div className="journey-participants">
                  {j.participants.map((p) => {
                    const member = season.cast.find((c) => c.pid === p.pid);
                    const tribe = member ? season.tribes.find((t) => t.tid === member.tid) : null;
                    return member ? (
                      <div key={p.pid} className="journey-participant">
                        <Link to={`/season/${sid}/cast/${slugify(member.name)}`}>
                          <Avatar name={member.name} color={tribe?.color || '#555'} size={42}
                            photoUrl={member.photoUrl} imgStyle={member.photoStyle}
                            pid={member.pid} noBorder />
                        </Link>
                        <div className="journey-participant-info">
                          <Link to={`/season/${sid}/cast/${slugify(member.name)}`} className="journey-participant-name">{member.name}</Link>
                          {tribe && <TribeBadge tribe={tribe} sid={sid} />}
                          <span className="journey-participant-result">{p.result}</span>
                        </div>
                      </div>
                    ) : null;
                  })}
                </div>
              )}
            </div>
          </>
        );
      })()}

      {/* Pre-Tribal Confessionals */}
      {tcs.length > 0 && tcs.some(tc => tc.confessionals?.length > 0) && (() => {
        // Collect confessionals — filter by active tab for multi-TC episodes
        const activeGroup = tcGroups.find(g => g.key === resolvedKey);
        const sourceTcs = isMultiTc && activeGroup ? activeGroup.tcs : tcs;
        const allConfessionals = sourceTcs.flatMap(tc =>
          (tc.confessionals || []).map(c => ({ ...c, tcid: tc.tcid, tid: tc.tid }))
        );
        if (allConfessionals.length === 0 && !isMultiTc) return null;

        // On the finale episode only, split FTC confessionals: jury voting vs pre-FTC finalist
        const isFinalEp = !next && season.juryVotes?.length > 0;
        const jurorPids = isFinalEp ? new Set(season.juryVotes.map(jv => jv.jurorPid)) : new Set();
        const preConfessionals = isFinalEp
          ? allConfessionals.filter(c => !jurorPids.has(c.pid))
          : allConfessionals;

        return (
          <>
            {preConfessionals.length > 0 && (
              <>
                <h2 id="confessionals">Confessionals</h2>
                {isMultiTc && (
                  <div className="tp-tc-tabs" style={{ marginBottom: 12 }}>
                    {tcGroups.map((group, gi) => {
                      const tc0 = group.tcs[0];
                      const tribe = season.tribes.find(t => t.tid === tc0.tid);
                      const isActive = group.key === resolvedKey;
                      const label = tribe?.name || (tcGroups.length > 1 ? `Tribal ${gi + 1}` : 'Tribal');
                      const color = tribe?.color || season.mergeTribe?.color;
                      return (
                        <button
                          key={group.key}
                          className={`tp-tc-tab${isActive ? ' active' : ''}`}
                          style={isActive ? { borderBottomColor: color } : undefined}
                          onClick={() => setActiveTabKey(group.key)}
                        >
                          {label}
                        </button>
                      );
                    })}
                  </div>
                )}
                <div className="confessional-bubbles">
                  {preConfessionals.map((c, ci) => {
                    const member = season.cast.find(p => p.pid === c.pid);
                    if (!member) return null;
                    const isMergedTc = sourceTcs.some(tc => !tc.tid);
                    const tcTid = c.tid || sourceTcs[0]?.tid;
                    const tribeColor = isMergedTc
                      ? (season.mergeTribe?.color || '#555')
                      : (season.tribes.find(t => t.tid === tcTid)?.color || '#555');
                    const playUrl = (episode.videoUrl && c.timestamp != null)
                      ? buildEmbedAt(episode.videoUrl, c.timestamp)
                      : null;
                    return (
                      <div key={`${c.tcid}-${c.pid}-${ci}`} className="confessional-bubble" style={{ '--tribe-color': tribeColor }}>
                        <div className="confessional-bubble-avatar">
                          <Link to={`/season/${sid}/cast/${slugify(member.name)}`}>
                            <Avatar name={member.name} color={tribeColor} size={48}
                              photoUrl={member.photoUrl} imgStyle={member.photoStyle}
                              pid={member.pid} noBorder />
                          </Link>
                        </div>
                        <div className="confessional-bubble-content">
                          <div className="confessional-bubble-header">
                            <Link to={`/season/${sid}/cast/${slugify(member.name)}`} className="confessional-bubble-name">
                              {member.name}
                            </Link>
                            {playUrl && (
                              <button className="tc-play-btn confessional-play-btn"
                                onClick={() => setModal({ src: playUrl, title: `${member.name} — Confessional (Ep. ${episode.number})` })}
                                title={`Watch ${member.name}'s confessional`}>
                                ▶
                              </button>
                            )}
                          </div>
                          {c.quote ? (
                            <div className="confessional-bubble-quote">
                              <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                              {linkify(c.quote, [{ season, sid }])}
                              <span className="tc-quote-mark tc-quote-close">&rdquo;</span>
                            </div>
                          ) : (
                            <div className="confessional-bubble-empty">No quote recorded.</div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

          </>
        );
      })()}

      {/* Tribal Council(s) — filter by active tribe tab for multi-TC episodes */}
      {tcs.length > 0 && (() => {
        const visibleGroups = isMultiTc
          ? tcGroups.filter(g => g.key === resolvedKey)
          : tcGroups;
        return (
          <>
            <h2 id="tribal-council">
              <span style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                Tribal Council
                {(() => {
                  const activeTc = visibleGroups[0]?.tcs[0];
                  const ts = activeTc?.videoTimestamp ?? null;
                  const url = episode?.videoUrl && ts != null ? buildEmbedAt(episode.videoUrl, ts) : null;
                  const activeIdx = tcGroups.findIndex(g => g.key === resolvedKey);
                  const tcLabel = isMultiTc ? `Tribal Council ${activeIdx + 1}` : 'Tribal Council';
                  return url ? (
                    <button className="tc-play-btn" onClick={() => setModal({ src: url, title: tcLabel })} title="Watch tribal council">▶</button>
                  ) : null;
                })()}
              </span>
            </h2>
            {visibleGroups.map((group, gi) => (
              <TribalCouncilCard key={gi} tcs={group.tcs} season={season} sid={sid} episode={episode} onPlay={(src, title) => setModal({ src, title })} />
            ))}
          </>
        );
      })()}

      {tcs.length === 0 && !(season.juryVotes?.length > 0 && !next) && (
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>No tribal council this episode.</p>
      )}

      {/* Final Tribal Council — jury vote on finale episode */}
      {season.juryVotes?.length > 0 && !next && (() => {
        const mergeColor = season.mergeTribe?.color ?? '#4caf50';
        const mergeTribe = season.mergeTribe ?? { name: 'Merged', color: mergeColor };
        const finalistPids = [season.winnerPid, season.runnerUpPid, season.secondRunnerUpPid].filter(Boolean);
        const finalists = finalistPids.map((pid) => season.cast.find((p) => p.pid === pid)).filter(Boolean);
        const tcNumber = season.votingHistory.length + 1;

        // Count votes per finalist
        const voteCounts = {};
        finalists.forEach((f) => { voteCounts[f.pid] = 0; });
        season.juryVotes.forEach((jv) => {
          voteCounts[jv.votedForPid] = (voteCounts[jv.votedForPid] || 0) + 1;
        });

        // Sort finalists by vote count descending
        const sortedFinalists = [...finalists].sort((a, b) => (voteCounts[b.pid] || 0) - (voteCounts[a.pid] || 0));

        return (
          <>
            <h2>Final Tribal Council</h2>
            <div className="tc-card" style={{ background: mergeColor }}>
              <div className="tc-cols-header">
                <div className="tc-col-label">Voted for Winner</div>
                <div className="tc-col-label">Voter</div>
              </div>

              {sortedFinalists.map((f) => {
                const voters = season.juryVotes
                  .filter((jv) => jv.votedForPid === f.pid)
                  .map((jv) => season.cast.find((p) => p.pid === jv.jurorPid))
                  .filter(Boolean);
                const count = voteCounts[f.pid] || 0;

                return (
                  <div key={f.pid} className="tc-vote-row">
                    <div className="tc-target-cell">
                      <Link to={`/season/${sid}/cast/${slugify(f.name)}`}>
                        <Avatar name={f.name} color={getTribeColor(season, f.tid)} size={48}
                          photoUrl={f.photoUrl} imgStyle={f.photoStyle} pid={f.pid} noBorder />
                      </Link>
                      <div className="tc-target-name">{f.name}</div>
                      {count > 0 && <span className="tc-vote-count">{count}</span>}
                    </div>
                    <div className="tc-voters-cell">
                      {voters.length > 0 ? (
                        <>
                          <div className="tc-voter-photos">
                            {voters.map((v) => (
                              <Link key={v.pid} to={`/season/${sid}/cast/${slugify(v.name)}`}>
                                <Avatar name={v.name} color={getTribeColor(season, v.tid)} size={38}
                                  photoUrl={v.photoUrl} imgStyle={v.photoStyle} pid={v.pid} noBorder />
                              </Link>
                            ))}
                          </div>
                          <div className="tc-voter-names">
                            {voters.map((v, i) => (
                              <span key={v.pid}>{i > 0 && ', '}{v.name}</span>
                            ))}
                          </div>
                        </>
                      ) : (
                        <span style={{ fontStyle: 'italic', color: 'rgba(255,255,255,0.5)' }}>None</span>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Winner + runners-up footer */}
              {sortedFinalists.length > 0 && (() => {
                const winner = sortedFinalists[0];
                const runnerUp = sortedFinalists[1];
                const secondRunnerUp = sortedFinalists[2];
                return (
                  <div className="ftc-result-footer">
                    <div className="ftc-winner-row">
                      <Link to={`/season/${sid}/cast/${slugify(winner.name)}`} style={{ flexShrink: 0 }}>
                        <Avatar name={winner.name} color={getTribeColor(season, winner.tid)} size={36}
                          photoUrl={winner.photoUrl} imgStyle={winner.photoStyle} pid={winner.pid} noBorder />
                      </Link>
                      <span className="ftc-winner-label">Sole Survivor</span>
                      <span className="ftc-winner-name">{winner.name}</span>
                      <span className="ftc-winner-icon">🏆</span>
                    </div>
                    {(runnerUp || secondRunnerUp) && (
                      <div className="ftc-runners-up">
                        {runnerUp && <>Runner-Up: {runnerUp.name}</>}
                        {runnerUp && secondRunnerUp && ' · '}
                        {secondRunnerUp && <>2nd Runner-Up: {secondRunnerUp.name}</>}
                      </div>
                    )}
                  </div>
                );
              })()}
            </div>
          </>
        );
      })()}

      {/* Jury Voting Confessionals — after FTC results, showing each juror's quote + who they voted for */}
      {season.juryVotes?.length > 0 && !next && (() => {
        const jurorPids = new Set(season.juryVotes.map(jv => jv.jurorPid));
        const ftcTc = tcs.find(tc => tc.eliminatedPid === null) || tcs[tcs.length - 1];
        const allConfs = ftcTc?.confessionals || [];
        const juryConfs = allConfs.filter(c => jurorPids.has(c.pid));
        if (juryConfs.length === 0) return null;
        const mergeColor = season.mergeTribe?.color || '#555';

        return (
          <>
            <h2 id="jury-votes">Jury Voting Confessionals</h2>
            <div className="confessional-bubbles">
              {juryConfs.map((c, ci) => {
                const member = season.cast.find(p => p.pid === c.pid);
                if (!member) return null;
                const juryVote = season.juryVotes.find(jv => jv.jurorPid === c.pid);
                const votedFor = juryVote ? season.cast.find(p => p.pid === juryVote.votedForPid) : null;
                const votedForColor = votedFor ? (getTribeColor(season, votedFor.tid) || mergeColor) : mergeColor;
                const playUrl = (episode.videoUrl && c.timestamp != null)
                  ? buildEmbedAt(episode.videoUrl, c.timestamp)
                  : null;
                return (
                  <div key={`jury-${c.pid}-${ci}`} className="confessional-bubble jury-vote-bubble" style={{ '--tribe-color': mergeColor }}>
                    <div className="confessional-bubble-avatar">
                      <Link to={`/season/${sid}/cast/${slugify(member.name)}`}>
                        <Avatar name={member.name} color={mergeColor} size={48}
                          photoUrl={member.photoUrl} imgStyle={member.photoStyle}
                          pid={member.pid} noBorder />
                      </Link>
                    </div>
                    <div className="confessional-bubble-content">
                      <div className="confessional-bubble-header jury-vote-header">
                        <span className="jury-vote-label">
                          <Link to={`/season/${sid}/cast/${slugify(member.name)}`} className="confessional-bubble-name">
                            {member.name}
                          </Link>
                          {votedFor && (
                            <>
                              <span className="jury-vote-connector">on voting for</span>
                              <Link to={`/season/${sid}/cast/${slugify(votedFor.name)}`} className="jury-vote-chip" style={{ '--vote-color': votedForColor }}>
                                <Avatar name={votedFor.name} color={votedForColor} size={20}
                                  photoUrl={votedFor.photoUrl} imgStyle={votedFor.photoStyle}
                                  pid={votedFor.pid} noBorder />
                                <span>{votedFor.name}</span>
                              </Link>
                            </>
                          )}
                        </span>
                        {playUrl && (
                          <button className="tc-play-btn confessional-play-btn"
                            onClick={() => setModal({ src: playUrl, title: `${member.name} — Jury Vote` })}
                            title={`Watch ${member.name}'s jury vote`}>
                            ▶
                          </button>
                        )}
                      </div>
                      {c.quote ? (
                        <div className="confessional-bubble-quote">
                          <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                          {linkify(c.quote, [{ season, sid }])}
                          <span className="tc-quote-mark tc-quote-close">&rdquo;</span>
                        </div>
                      ) : (
                        <div className="confessional-bubble-empty">No quote recorded.</div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        );
      })()}

    </div>
    </>
  );
}
