// src/pages/EpisodePage.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

function getYouTubeEmbedUrl(url) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let videoId, startSeconds;
    if (u.hostname === 'youtu.be') {
      videoId = u.pathname.slice(1);
      startSeconds = u.searchParams.get('t');
    } else {
      videoId = u.searchParams.get('v');
      startSeconds = u.searchParams.get('t');
    }
    if (!videoId) return null;
    let embed = `https://www.youtube.com/embed/${videoId}`;
    if (startSeconds) embed += `?start=${parseInt(startSeconds)}`;
    return embed;
  } catch {
    return null;
  }
}

// Resolve a winner id to a display name + link (pid = player, tid = tribe)
function WinnerDisplay({ winnerId, season, sid }) {
  if (!winnerId) return <span className="empty-state">TBD</span>;

  // Check if it's a tribe id
  const tribe = season.tribes.find((t) => t.tid === winnerId);
  if (tribe) {
    return (
      <span className="tribe-badge" style={{ background: tribe.color }}>
        {tribe.name}
      </span>
    );
  }

  // Otherwise treat as player pid
  const player = season.cast.find((p) => p.pid === winnerId);
  if (player) {
    return (
      <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={20} photoUrl={player.photoUrl} />
        {player.name}
      </Link>
    );
  }

  return <span>{winnerId}</span>;
}

function ChallengeSection({ label, challenge, season, sid }) {
  if (!challenge) return null;
  const hasContent = challenge.name || challenge.winner;
  if (!hasContent) return null;

  return (
    <div className="episode-challenge-block">
      <h3>{label}</h3>
      <table className="challenge-table episode-challenge-table">
        <tbody>
          {challenge.name && (
            <tr><th>Challenge</th><td>{challenge.name}</td></tr>
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
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const episode = season.episodes.find((e) => e.eid === eid);
  if (!episode) return <div className="article"><p>Episode not found.</p></div>;

  const tcs = season.votingHistory.filter((tc) => tc.episode === episode.number);
  const embedUrl = getYouTubeEmbedUrl(episode.videoUrl);

  const idx = season.episodes.findIndex((e) => e.eid === eid);
  const prev = season.episodes[idx - 1];
  const next = season.episodes[idx + 1];

  const hasReward = episode.rewardChallenge?.name || episode.rewardChallenge?.winner;
  const hasImmunity = episode.immunityChallenge?.name || episode.immunityChallenge?.winner;

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Episodes', to: `/season/${sid}/episodes` },
        { label: `Episode ${episode.number}` },
      ]} />

      <h1>Episode {episode.number}: {episode.title}</h1>

      {/* YouTube embed */}
      {embedUrl ? (
        <div className="episode-embed-wrapper">
          <iframe
            className="episode-embed"
            src={embedUrl}
            title={`Episode ${episode.number} — ${episode.title}`}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>
      ) : (
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
          <ChallengeSection label="Reward Challenge" challenge={episode.rewardChallenge} season={season} sid={sid} />
          <ChallengeSection label="Immunity Challenge" challenge={episode.immunityChallenge} season={season} sid={sid} />
        </>
      )}

      {/* Tribal Council(s) */}
      {tcs.length > 0 && (
        <>
          <h2>Tribal Council{tcs.length > 1 ? 's' : ''}</h2>
          {tcs.map((tc) => {
            const eliminated = tc.eliminatedPid
              ? season.cast.find((p) => p.pid === tc.eliminatedPid)
              : null;
            const tribeName = tc.tid ? getTribeName(season, tc.tid) : 'Merged Tribe';
            const tribeColor = tc.tid ? getTribeColor(season, tc.tid) : 'var(--accent)';

            return (
              <div key={tc.tcid} className="episode-tc-block">
                <h3>
                  <span className="tribe-badge" style={{ background: tribeColor }}>
                    {tribeName}
                  </span>
                  {tc.notes && <span className="tc-note"> — {tc.notes}</span>}
                </h3>

                {tc.votes.length > 0 ? (
                  <table className="challenge-table episode-votes-table">
                    <thead>
                      <tr><th>Voter</th><th>Voted For</th></tr>
                    </thead>
                    <tbody>
                      {tc.votes.map((v) => {
                        const voter = season.cast.find((p) => p.pid === v.voterPid);
                        const target = season.cast.find((p) => p.pid === v.votedForPid);
                        return (
                          <tr key={v.vid}>
                            <td>
                              {voter && (
                                <Link to={`/season/${sid}/cast/${slugify(voter.name)}`}
                                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <Avatar name={voter.name} color={getTribeColor(season, voter.tid)} size={20} />
                                  {voter.name}
                                </Link>
                              )}
                            </td>
                            <td>
                              {target && (
                                <Link to={`/season/${sid}/cast/${slugify(target.name)}`}
                                  style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                  <Avatar name={target.name} color={getTribeColor(season, target.tid)} size={20} />
                                  {target.name}
                                </Link>
                              )}
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                ) : (
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>No votes cast.</p>
                )}

                {eliminated && (
                  <p className="episode-eliminated">
                    🔦 <strong>Eliminated:</strong>{' '}
                    <Link to={`/season/${sid}/cast/${slugify(eliminated.name)}`}>
                      {eliminated.name}
                    </Link>
                  </p>
                )}
              </div>
            );
          })}
        </>
      )}

      {tcs.length === 0 && (
        <p style={{ color: 'var(--text-muted)', marginTop: 16 }}>No tribal council this episode.</p>
      )}

      {/* Prev / Next */}
      <div className="episode-nav">
        {prev ? (
          <Link to={`/season/${sid}/episode/${prev.eid}`} className="episode-nav-btn">
            ← Ep {prev.number}: {prev.title}
          </Link>
        ) : <span />}
        {next && (
          <Link to={`/season/${sid}/episode/${next.eid}`} className="episode-nav-btn">
            Ep {next.number}: {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
