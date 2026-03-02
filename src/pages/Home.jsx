// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { SEASONS } from '../data';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Home() {
  return (
    <div className="article">
      <Breadcrumbs crumbs={[{ label: 'Main Page' }]} />

      <div className="home-hero">
        <h1>Backyard Survivor Wiki</h1>
        <p>
          The definitive source for every season, castaway, and tribal council
          of Backyard Survivor.
        </p>
      </div>

      <h2>Seasons</h2>
      <table className="season-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>Subtitle</th>
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
                  {comingSoon ? (
                    <span>{s.name}</span>
                  ) : (
                    <Link to={`/season/${s.sid}`}>{s.name}</Link>
                  )}
                </td>
                <td>{s.subtitle}</td>
                <td>{s.location}</td>
                <td>{comingSoon ? '—' : s.cast.length}</td>
                <td>{comingSoon ? '—' : s.episodes.length}</td>
                <td>
                  {comingSoon ? (
                    <span className="coming-soon-badge">Coming Soon</span>
                  ) : winner ? (
                    <Link to={`/season/${s.sid}/cast/${winner.name.toLowerCase().replace(/\s+/g, '-')}`}>
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
