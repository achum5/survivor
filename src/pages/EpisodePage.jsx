// src/pages/EpisodePage.jsx
import { useParams, Link } from 'react-router-dom';
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

function renderVoteGroups(tc, season, sid) {
  const targetIds = [...new Set(tc.votes.map((v) => v.votedForPid))];
  const voteGroups = targetIds
    .map((tpid) => ({
      target: season.cast.find((p) => p.pid === tpid),
      votes: tc.votes.filter((v) => v.votedForPid === tpid),
    }))
    .sort((a, b) =>
      b.votes.filter((v) => !v.idolNullified).length -
      a.votes.filter((v) => !v.idolNullified).length
    );

  return (
    <>
      <div className="tc-cols-header">
        <div className="tc-col-label">Voted Against</div>
        <div className="tc-col-label">Voter</div>
      </div>
      {voteGroups.map((group) => {
        const countingVotes = group.votes.filter((v) => !v.idolNullified);
        return (
          <div className="tc-vote-row" key={group.target?.pid ?? 'unknown'}>
            <div className="tc-target-cell">
              {group.target && (
                <Link to={`/season/${sid}/cast/${slugify(group.target.name)}`}>
                  <Avatar name={group.target.name} color={getTribeColor(season, group.target.tid)}
                    size={80} photoUrl={group.target.photoUrl} imgStyle={group.target.photoStyle}
                    pid={group.target.pid} noBorder />
                </Link>
              )}
              <div className="tc-target-name">
                {group.target?.name ?? '?'}
                {countingVotes.length > 0 && (
                  <span className="tc-vote-count"> ({countingVotes.length} vote{countingVotes.length !== 1 ? 's' : ''})</span>
                )}
              </div>
            </div>
            <div className="tc-voters-cell">
              <div className="tc-voter-photos">
                {group.votes.map((v) => {
                  const voter = season.cast.find((p) => p.pid === v.voterPid);
                  return voter ? (
                    <Link key={v.vid} to={`/season/${sid}/cast/${slugify(voter.name)}`}
                      style={{ opacity: v.idolNullified ? 0.4 : 1 }}>
                      <Avatar name={voter.name} color={getTribeColor(season, voter.tid)}
                        size={52} photoUrl={voter.photoUrl} imgStyle={voter.photoStyle}
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
                    <span key={v.vid} style={{ textDecoration: v.idolNullified ? 'line-through' : 'none' }}>
                      {vi > 0 && ', '}{voter.name}
                    </span>
                  );
                })}
              </div>
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
    <div className="tc-card" style={headerTribe ? { background: headerTribe.color } : undefined}>
      <div className="tc-card-header">
        <span>Tribal Council:</span>
        {headerTribe ? (
          <TribeBadge tribe={headerTribe} sid={sid} noLink />
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
            ? renderVoteGroups(tc, season, sid)
            : <div className="tc-no-votes">No votes recorded.</div>
          }
        </div>
      ))}

      {eliminated && (
        <div className="tc-voted-out-footer">
          <div className="tc-voted-out-label">Voted Out</div>
          <div style={{ filter: 'grayscale(1)' }}>
            <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`}>
              <Avatar name={eliminated.name} color={getTribeColor(season, eliminated.tid)}
                size={72} photoUrl={eliminated.photoUrl} imgStyle={eliminated.photoStyle}
                pid={eliminated.pid} noBorder />
            </Link>
          </div>
          <div className="tc-voted-out-name">{eliminated.name}</div>
        </div>
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

  return (
    <div className="episode-challenge-block">
      <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Link to={`/season/${sid}/episode/${eid}/challenge/${ctype}`}
          style={{ color: 'inherit', textDecoration: 'none' }}>
          {label}
        </Link>
        {playUrl && (
          <button className="tc-play-btn"
            onClick={() => onPlay(playUrl, challenge.name ? `${label}: ${challenge.name}` : label)}
            title={`Watch ${label.toLowerCase()}`}>
            ▶
          </button>
        )}
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

      <h1>Episode {episode.number}</h1>

      {/* Episode video — thumbnail + play button opens modal */}
      {embedUrl ? (() => {
        const videoId = getYouTubeVideoId(episode.videoUrl);
        const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
        const modalSrc = embedUrl.includes('?') ? embedUrl + '&autoplay=1' : embedUrl + '?autoplay=1';
        return (
          <div className="episode-thumb-wrapper" onClick={() => setModal({ src: modalSrc, title: `Episode ${episode.number}` })}>
            {thumb && <img src={thumb} alt={`Episode ${episode.number} thumbnail`} />}
            <div className="episode-thumb-play">
              <div className="episode-thumb-play-btn">▶</div>
            </div>
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
          <h2>Challenges</h2>
          <ChallengeSection label="Reward Challenge"   challenge={episode.rewardChallenge}   season={season} sid={sid} eid={eid} ctype="reward"   episode={episode} onPlay={(src, title) => setModal({ src, title })} />
          <ChallengeSection label="Immunity Challenge" challenge={episode.immunityChallenge} season={season} sid={sid} eid={eid} ctype="immunity" episode={episode} onPlay={(src, title) => setModal({ src, title })} />
        </>
      )}

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
            <h2>Tribal Council{tcGroups.length > 1 ? 's' : ''}</h2>
            {tcGroups.map((group, gi) => (
              <TribalCouncilCard key={gi} tcs={group} season={season} sid={sid} episode={episode} onPlay={(src, title) => setModal({ src, title })} />
            ))}
          </>
        );
      })()}

      {tcs.length === 0 && (
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>No tribal council this episode.</p>
      )}

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
