// src/pages/EpisodePage.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, slugify, getYouTubeEmbedUrl } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
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

function VideoModal({ src, title, onClose }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  return (
    <div className="video-modal-backdrop" onClick={onClose}>
      <div className="video-modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="video-modal-bar">
          {title && <span className="video-modal-title">{title}</span>}
          <button className="video-modal-close" onClick={onClose} title="Close (Esc)">✕</button>
        </div>
        <iframe
          src={src}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
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
      <div className="tc-card-header">
        <span>Tribal Council:</span>
        {headerTribe ? (
          <TribeBadge tribe={headerTribe} sid={sid} />
        ) : (
          <span className="tribe-badge tribe-badge-merged">Merged</span>
        )}
        {playUrl && (
          <button className="tc-play-btn"
            onClick={() => onPlay(playUrl, `Tribal Council — ${headerTribe?.name ?? 'Merged'}`)}
            title="Watch tribal council">
            ▶
          </button>
        )}
      </div>

      {tcs.map((tc, i) => (
        <div key={tc.tcid}>
          {i > 0 && <div className="tc-revote-divider">↩ Revote</div>}
          {tc.notes && <div className="tc-section-notes">— {tc.notes}</div>}
          {tc.votes.length > 0
            ? renderVoteGroups(tc, season, sid, elimTc?.eliminatedPid)
            : <div className="tc-no-votes">No votes recorded.</div>
          }
        </div>
      ))}

      {eliminated && (
        <div className="tc-voted-out-footer">
          <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`} style={{ filter: 'grayscale(1)', flexShrink: 0 }}>
            <Avatar name={eliminated.name} color={getTribeColor(season, eliminated.tid)}
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
                  <Avatar name={eliminated.name} color={getTribeColor(season, eliminated.tid)}
                    size={56} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle}
                    pid={eliminated.pid} noBorder />
                </Link>
                <div className="tc-final-words-who">{eliminated.name.toUpperCase()}</div>
              </div>
              <div className="tc-final-words-quote">
                <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                {elimTc.confessionalQuote}
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
            <tr><th>Description</th><td>{challenge.description}</td></tr>
          )}
          {challenge.winner !== undefined && (
            <tr>
              <th>Winner</th>
              <td><WinnerDisplay winnerId={challenge.winner} season={season} sid={sid} /></td>
            </tr>
          )}
          {challenge.reward && (
            <tr><th>Reward</th><td>{challenge.reward}</td></tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default function EpisodePage() {
  const { sid, eid } = useParams();
  const navigate = useNavigate();
  const [modal, setModal] = useState(null); // { src, title }

  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const episode = season.episodes.find((e) => e.eid === eid);
  if (!episode) return <div className="article"><p>Episode not found.</p></div>;

  const tcs = season.votingHistory.filter((tc) => tc.episode === episode.number);
  const embedUrl = getYouTubeEmbedUrl(episode.videoUrl, episode.videoEndTime);

  const idx = season.episodes.findIndex((e) => e.eid === eid);
  const prev = season.episodes[idx - 1];
  const next = season.episodes[idx + 1];

  const hasReward = episode.rewardChallenge?.name || episode.rewardChallenge?.winner;
  const hasImmunity = episode.immunityChallenge?.name || episode.immunityChallenge?.winner;

  return (
    <div className="article">
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />}
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Episodes', to: `/season/${sid}/episodes` },
        { label: `Episode ${episode.number}` },
      ]} />

      <div className="episode-nav episode-nav-top">
        {prev ? (
          <Link to={`/season/${sid}/episode/${prev.eid}`} className="episode-nav-btn episode-nav-btn-sm">
            ← Episode {prev.number}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/season/${sid}/episode/${next.eid}`} className="episode-nav-btn episode-nav-btn-sm">
            Episode {next.number} →
          </Link>
        ) : <span />}
      </div>

      <div className="episode-header-row">
        <h1>
          <select
            className="player-select"
            style={{ width: 'auto' }}
            value={eid}
            onChange={(e) => navigate(`/season/${sid}/episode/${e.target.value}`)}
          >
            {season.episodes.map((ep) => (
              <option key={ep.eid} value={ep.eid}>Episode {ep.number}</option>
            ))}
          </select>
        </h1>
        {(() => {
          const sections = [];
          if (hasReward || hasImmunity) sections.push({ id: 'challenges', label: 'Challenges' });
          if (episode.journey) sections.push({ id: 'journey', label: 'Journey' });
          if (tcs.some(tc => tc.confessionals?.length > 0)) sections.push({ id: 'confessionals', label: 'Confessionals' });
          if (tcs.length > 0) sections.push({ id: 'tribal-council', label: 'Tribal Council' });
          return sections.length > 1 ? (
            <div className="season-quicknav" style={{ margin: 0 }}>
              {sections.map((s) => (
                <a key={s.id} href={`#${s.id}`} className="season-quicknav-btn">{s.label}</a>
              ))}
            </div>
          ) : null;
        })()}
      </div>

      {/* Episode video — thumbnail + play button opens modal */}
      {embedUrl ? (() => {
        // Determine which image the main thumbnail uses, and whether IC is shown separately
        const hasEpisodeImage = !!episode.episodeImageUrl;
        const hasRewardImage = !!episode.rewardChallenge?.imageUrl;
        const icImage = episode.immunityChallenge?.imageUrl;
        const mainThumbIsIC = !hasEpisodeImage && !hasRewardImage && !!icImage;
        const videoId = getYouTubeVideoId(episode.videoUrl);
        const thumb = episode.episodeImageUrl || episode.rewardChallenge?.imageUrl || icImage || (videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null);
        const modalSrc = embedUrl.includes('?') ? embedUrl + '&autoplay=1' : embedUrl + '?autoplay=1';
        const fmTc = tcs.find((tc) => tc.firemaking?.imageUrl);
        const fm = fmTc?.firemaking;
        const fmPlayUrl = fm?.videoTimestamp != null ? buildEmbedAt(episode.videoUrl, fm.videoTimestamp) : null;
        // When main thumbnail IS the IC image, link its play button to the challenge timestamp
        const mainPlaySrc = mainThumbIsIC && episode.immunityChallenge?.videoTimestamp != null
          ? buildEmbedAt(episode.videoUrl, episode.immunityChallenge.videoTimestamp)
          : modalSrc;
        const mainPlayTitle = mainThumbIsIC
          ? (episode.immunityChallenge?.name || 'Immunity Challenge')
          : `Episode ${episode.number}`;
        return (
          <div className="episode-thumbs-row">
            <div>
              <div className="episode-thumb-wrapper" onClick={() => setModal({ src: mainPlaySrc, title: mainPlayTitle })}>
                {thumb && <img src={thumb} alt={`Episode ${episode.number} thumbnail`} />}
                <div className="episode-thumb-play">
                  <div className="episode-thumb-play-btn">▶</div>
                </div>
              </div>
              {episode.rewardChallenge?.name && <div className="episode-thumb-label">{episode.rewardChallenge.name}</div>}
              {mainThumbIsIC && episode.immunityChallenge?.name && <div className="episode-thumb-label">{episode.immunityChallenge.name}</div>}
            </div>
            {/* Show IC thumbnail separately only when it's NOT already the main thumbnail */}
            {!mainThumbIsIC && icImage && (() => {
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
            {(() => {
              const tcWithImage = tcs.find(tc => tc.imageUrl);
              if (!tcWithImage) return null;
              const tcEmbed = tcWithImage.videoTimestamp != null
                ? buildEmbedAt(episode.videoUrl, tcWithImage.videoTimestamp)
                : null;
              const tcTribe = tcWithImage.tid ? season.tribes.find(t => t.tid === tcWithImage.tid) : null;
              return (
                <div>
                  <div className="episode-thumb-wrapper"
                    onClick={tcEmbed ? () => setModal({ src: tcEmbed, title: `Tribal Council${tcTribe ? ' — ' + tcTribe.name : ''}` }) : undefined}
                    style={tcEmbed ? undefined : { cursor: 'default' }}>
                    <img src={tcWithImage.imageUrl} alt="Tribal Council" />
                    {tcEmbed && (
                      <div className="episode-thumb-play">
                        <div className="episode-thumb-play-btn">▶</div>
                      </div>
                    )}
                  </div>
                  <div className="episode-thumb-label">Tribal Council</div>
                </div>
              );
            })()}
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
          <ChallengeSection label="Reward Challenge"   challenge={episode.rewardChallenge}   season={season} sid={sid} eid={eid} ctype="reward"   episode={episode} onPlay={(src, title) => setModal({ src, title })} />
          <ChallengeSection label="Immunity Challenge" challenge={episode.immunityChallenge} season={season} sid={sid} eid={eid} ctype="immunity" episode={episode} onPlay={(src, title) => setModal({ src, title })} />
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
              {j.description && <p className="journey-description">{j.description}</p>}
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
        // Collect all confessionals across TCs for this episode
        const allConfessionals = tcs.flatMap(tc =>
          (tc.confessionals || []).map(c => ({ ...c, tcid: tc.tcid, tid: tc.tid }))
        );
        if (allConfessionals.length === 0) return null;
        return (
          <>
            <h2 id="confessionals">Confessionals</h2>
            <div className="confessional-bubbles">
              {allConfessionals.map((c) => {
                const member = season.cast.find(p => p.pid === c.pid);
                if (!member) return null;
                const tribe = season.tribes.find(t => t.tid === member.tid);
                const playUrl = (episode.videoUrl && c.timestamp != null)
                  ? buildEmbedAt(episode.videoUrl, c.timestamp)
                  : null;
                return (
                  <div key={c.pid} className="confessional-bubble" style={{ '--tribe-color': tribe?.color || '#555' }}>
                    <div className="confessional-bubble-avatar">
                      <Link to={`/season/${sid}/cast/${slugify(member.name)}`}>
                        <Avatar name={member.name} color={tribe?.color || '#555'} size={48}
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
                            onClick={() => setModal({ src: playUrl, title: `${member.name} — Confessional` })}
                            title={`Watch ${member.name}'s confessional`}>
                            ▶
                          </button>
                        )}
                      </div>
                      {c.quote ? (
                        <div className="confessional-bubble-quote">
                          <span className="tc-quote-mark tc-quote-open">&ldquo;</span>
                          {c.quote}
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

      {/* Tribal Council(s) — group by tribe so tie+revote merges into one card */}
      {tcs.length > 0 && (() => {
        const tcGroups = [];
        const tidMap = new Map();
        tcs.forEach((tc) => {
          const key = tc.tid ?? '__merged__';
          if (!tidMap.has(key)) { tidMap.set(key, []); tcGroups.push(tidMap.get(key)); }
          tidMap.get(key).push(tc);
        });
        return (
          <>
            <h2 id="tribal-council">Tribal Council{tcGroups.length > 1 ? 's' : ''}</h2>
            {tcGroups.map((group, gi) => (
              <TribalCouncilCard key={gi} tcs={group} season={season} sid={sid} episode={episode} onPlay={(src, title) => setModal({ src, title })} />
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
              <div className="tc-card-header">
                <span>Tribal Council {tcNumber}: Jury Vote</span>
                <TribeBadge tribe={mergeTribe} sid={sid} />
              </div>

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

      {/* Prev / Next */}
      <div className="episode-nav">
        {prev ? (
          <Link to={`/season/${sid}/episode/${prev.eid}`} className="episode-nav-btn">
            ← Episode {prev.number}
          </Link>
        ) : <span />}
        {next ? (
          <Link to={`/season/${sid}/episode/${next.eid}`} className="episode-nav-btn">
            Episode {next.number} →
          </Link>
        ) : <span />}
      </div>
    </div>
  );
}
