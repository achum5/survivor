// src/pages/ChallengePage.jsx
import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { SEASONS } from '../data';
import { getTribe, getTribeColor, getTribeName, getPlayer, getPlayerName, slugify, getYouTubeEmbedUrl } from '../utils/helpers';
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

function PlaceBadge({ place, total }) {
  if (!place) return null;
  const isFirst = place === 1;
  const isLast = place === total;
  return (
    <span className={`challenge-place-badge ${isFirst ? 'place-first' : isLast ? 'place-last' : 'place-mid'}`}>
      {place === 1 ? (total === 2 ? 'Won' : '1st')
       : place === 2 ? (total === 2 ? 'Lost' : '2nd')
       : `${place}${['','st','nd','rd'][place] || 'th'}`}
    </span>
  );
}

function WinnerDisplay({ winnerId, season, sid }) {
  if (!winnerId) return <span className="empty-state">—</span>;
  const tribe = season.tribes.find((t) => t.tid === winnerId);
  if (tribe) {
    return <TribeBadge tribe={tribe} sid={sid} />;
  }
  const player = season.cast.find((p) => p.pid === winnerId);
  if (player) {
    return (
      <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={30}
          photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} noBorder />
        {player.name}
      </Link>
    );
  }
  return <span>{winnerId}</span>;
}

export default function ChallengePage() {
  const { sid, eid, ctype } = useParams();
  const [modal, setModal] = useState(null);
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const episode = season.episodes.find((e) => e.eid === eid);
  if (!episode) return <div className="article"><p>Episode not found.</p></div>;

  const ch = ctype === 'reward' ? episode.rewardChallenge : episode.immunityChallenge;
  if (!ch) return <div className="article"><p>Challenge not found.</p></div>;

  const typeLabel = ctype === 'reward' ? 'Reward Challenge' : 'Immunity Challenge';
  const challengeName = ch.name ?? typeLabel;

  // Build play URL: prefer challenge-specific timestamp, fall back to episode start
  const playUrl = (episode.videoUrl && ch.videoTimestamp != null)
    ? buildEmbedAt(episode.videoUrl, ch.videoTimestamp)
    : (() => {
        const base = getYouTubeEmbedUrl(episode.videoUrl);
        return base ? (base.includes('?') ? base + '&autoplay=1' : base + '?autoplay=1') : null;
      })();

  return (
    <div className="article">
      {modal && <VideoModal src={modal.src} title={modal.title} onClose={() => setModal(null)} />}
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Episodes', to: `/season/${sid}/episodes` },
        { label: `Episode ${episode.number}`, to: `/season/${sid}/episode/${eid}` },
        { label: challengeName },
      ]} />

      <h1>{challengeName}</h1>

      <div className="challenge-page-meta">
        <span className="challenge-page-episode">
          <Link to={`/season/${sid}/episode/${eid}`}>Episode {episode.number}</Link>
        </span>
      </div>

      {/* Challenge thumbnail with play overlay */}
      {ch.imageUrl ? (
        <div className="episode-thumb-wrapper challenge-thumb"
          onClick={playUrl ? () => setModal({ src: playUrl, title: challengeName }) : undefined}
          style={playUrl ? undefined : { cursor: 'default' }}>
          <img src={ch.imageUrl} alt={challengeName} />
          {playUrl && (
            <div className="episode-thumb-play">
              <div className="episode-thumb-play-btn">▶</div>
            </div>
          )}
        </div>
      ) : playUrl ? (
        <div className="episode-thumb-wrapper challenge-thumb"
          onClick={() => setModal({ src: playUrl, title: challengeName })}>
          {(() => {
            const videoId = getYouTubeVideoId(episode.videoUrl);
            const thumb = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;
            return thumb && <img src={thumb} alt={challengeName} />;
          })()}
          <div className="episode-thumb-play">
            <div className="episode-thumb-play-btn">▶</div>
          </div>
        </div>
      ) : (
        <div className="episode-no-video">No video available.</div>
      )}

      {/* Details table */}
      <table className="challenge-table episode-challenge-table" style={{ marginTop: 20 }}>
        <tbody>
          {ch.description && (
            <tr><th>Description</th><td>{ch.description}</td></tr>
          )}
          {(ch.winner !== undefined && ch.winner !== null) && (
            <tr>
              <th>Winner</th>
              <td><WinnerDisplay winnerId={ch.winner} season={season} sid={sid} /></td>
            </tr>
          )}
          {ch.reward && (
            <tr><th>Reward</th><td>{ch.reward}</td></tr>
          )}
          {ch.sitOuts && ch.sitOuts.length > 0 && (
            <tr>
              <th>Sat Out</th>
              <td>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                  {ch.sitOuts.map((pid) => {
                    const p = getPlayer(season, pid);
                    return p ? (
                      <Link key={pid} to={`/season/${sid}/cast/${slugify(p.name)}`}
                        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={24}
                          photoUrl={p.photoUrl} imgStyle={p.photoStyle} pid={p.pid} noBorder />
                        {p.name}
                      </Link>
                    ) : <span key={pid}>{pid}</span>;
                  })}
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Results */}
      {ch.results && ch.results.length > 0 && (
        <>
          <h2>Results</h2>
          <table className="challenge-table" style={{ width: 'auto', minWidth: 280 }}>
            <thead>
              <tr>
                <th>Place</th>
                <th>Tribe / Player</th>
              </tr>
            </thead>
            <tbody>
              {[...ch.results].sort((a, b) => a.place - b.place).map((r) => {
                const tribe = season.tribes.find((t) => t.tid === r.id);
                const player = tribe ? null : season.cast.find((p) => p.pid === r.id);
                return (
                  <tr key={r.id}>
                    <td style={{ textAlign: 'center' }}>
                      <PlaceBadge place={r.place} total={ch.results.length} />
                    </td>
                    <td>
                      {tribe ? (
                        <TribeBadge tribe={tribe} sid={sid} />
                      ) : player ? (
                        <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={24}
                            photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} noBorder />
                          {player.name}
                        </Link>
                      ) : r.id}
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
