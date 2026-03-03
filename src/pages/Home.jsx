// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify, getTribeColor } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

export default function Home() {
  return (
    <div className="article">
      <Breadcrumbs crumbs={[{ label: 'Main Page' }]} />

      <div className="home-hero">
        <h1>14508 Survivor Wiki</h1>
        <p>
          The definitive source for every season, castaway, and tribal council
          of Backyard Survivor.
        </p>
      </div>

      <h2>Seasons</h2>
      <table className="season-table">
        <thead>
          <tr>
            <th>Logo</th>
            <th>Season</th>
            <th>Location</th>
            <th>Players</th>
            <th>Episodes</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {SEASONS.map((s) => {
            const comingSoon = s.cast.length === 0;
            const winner = s.cast.find((p) => p.pid === s.winnerPid);
            return (
              <tr key={s.sid}>
                <td>
                  {s.logoPath ? (
                    <img
                      src={s.logoPath}
                      alt={`${s.name} logo`}
                      className="season-logo-thumb"
                    />
                  ) : '—'}
                </td>
                <td>
                  {comingSoon ? (
                    <span>{s.name}</span>
                  ) : (
                    <Link to={`/season/${s.sid}`}>{s.name}</Link>
                  )}
                </td>
                <td>{s.location}</td>
                <td>{comingSoon ? '—' : s.cast.length}</td>
                <td>{comingSoon ? '—' : s.episodes.length}</td>
                <td>
                  {comingSoon ? (
                    <span className="coming-soon-badge">Coming Soon</span>
                  ) : winner ? (
                    <Link to={`/season/${s.sid}/cast/${slugify(winner.name)}`}
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                      <Avatar name={winner.name} color={getTribeColor(s, winner.tid)} size={20} photoUrl={winner.photoUrl} imgStyle={winner.photoStyle} pid={winner.pid} />
                      {winner.name}
                    </Link>
                  ) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
