// src/pages/EpisodeList.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify, getTribeColor } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

export default function EpisodeList() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  // Count TCs per episode
  const tcsByEpisode = {};
  for (const tc of season.votingHistory) {
    if (!tcsByEpisode[tc.episode]) tcsByEpisode[tc.episode] = [];
    tcsByEpisode[tc.episode].push(tc);
  }

  // Find eliminated player per episode
  const eliminatedByEpisode = {};
  for (const tc of season.votingHistory) {
    if (tc.eliminatedPid) {
      eliminatedByEpisode[tc.episode] = tc.eliminatedPid;
    }
  }

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Episodes' },
      ]} />

      <h1>{season.name} — Episodes</h1>

      <table className="challenge-table episode-list-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Eliminated</th>
            <th>Video</th>
          </tr>
        </thead>
        <tbody>
          {season.episodes.map((ep) => {
            const elimPid = eliminatedByEpisode[ep.number];
            const elim = elimPid ? season.cast.find((p) => p.pid === elimPid) : null;
            return (
              <tr key={ep.eid}>
                <td>{ep.number}</td>
                <td>
                  <Link to={`/season/${sid}/episode/${ep.eid}`}>Episode {ep.number}</Link>
                </td>
                <td>
                  {elim ? (
                    <Link to={`/season/${sid}/cast/${slugify(elim.name)}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Avatar name={elim.name} color={getTribeColor(season, elim.tid)} size={30} photoUrl={elim.photoUrl} imgStyle={elim.photoStyle} pid={elim.pid} noBorder />
                      {elim.name}
                    </Link>
                  ) : '—'}
                </td>
                <td>{ep.videoUrl ? '▶ Added' : '—'}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
