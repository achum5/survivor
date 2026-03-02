// src/pages/ChallengePage.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribe, getTribeColor, getTribeName, getPlayer, getPlayerName, slugify, getYouTubeEmbedUrl } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

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
    return <span className="tribe-badge" style={{ background: tribe.color }}>{tribe.name}</span>;
  }
  const player = season.cast.find((p) => p.pid === winnerId);
  if (player) {
    return (
      <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
        style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
        <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={20}
          photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} />
        {player.name}
      </Link>
    );
  }
  return <span>{winnerId}</span>;
}

export default function ChallengePage() {
  const { sid, eid, ctype } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const episode = season.episodes.find((e) => e.eid === eid);
  if (!episode) return <div className="article"><p>Episode not found.</p></div>;

  const ch = ctype === 'reward' ? episode.rewardChallenge : episode.immunityChallenge;
  if (!ch) return <div className="article"><p>Challenge not found.</p></div>;

  const typeLabel = ctype === 'reward' ? 'Reward Challenge' : 'Immunity Challenge';
  const challengeName = ch.name ?? typeLabel;
  const embedUrl = getYouTubeEmbedUrl(episode.videoUrl, episode.videoEndTime);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Episodes', to: `/season/${sid}/episodes` },
        { label: `Episode ${episode.number}`, to: `/season/${sid}/episode/${eid}` },
        { label: challengeName },
      ]} />

      <h1>{challengeName}</h1>

      <div className="challenge-page-meta">
        <span className={`challenge-type-tag ${ctype === 'immunity' ? 'challenge-type-immunity' : 'challenge-type-reward'}`}>
          {ctype === 'immunity' ? '🛡️ Immunity Challenge' : '🎁 Reward Challenge'}
        </span>
        <span className="challenge-page-episode">
          <Link to={`/season/${sid}/episode/${eid}`}>Episode {episode.number}: {episode.title}</Link>
        </span>
      </div>

      {/* Video embed */}
      {embedUrl ? (
        <div className="episode-embed-wrapper">
          <iframe
            className="episode-embed"
            src={embedUrl}
            title={challengeName}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
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
          {ch.type && (
            <tr><th>Type</th><td>{ch.type}</td></tr>
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
                        <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={20}
                          photoUrl={p.photoUrl} imgStyle={p.photoStyle} pid={p.pid} />
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
                        <span className="tribe-badge" style={{ background: tribe.color }}>{tribe.name}</span>
                      ) : player ? (
                        <Link to={`/season/${sid}/cast/${slugify(player.name)}`}
                          style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                          <Avatar name={player.name} color={getTribeColor(season, player.tid)} size={20}
                            photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} />
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
