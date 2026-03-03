// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify, getTribeColor } from '../utils/helpers';
import Avatar from '../components/Avatar';

export default function Home() {
  return (
    <div className="article">
      <div className="home-hero">
        <h1>14508 Survivor Wiki</h1>
      </div>

      <div className="season-cards">
        {SEASONS.map((s) => {
          const comingSoon = s.cast.length === 0;
          const winner = s.cast.find((p) => p.pid === s.winnerPid);
          const runnerUp = s.cast.find((p) => p.pid === s.runnerUpPid);

          return (
            <Link
              key={s.sid}
              to={comingSoon ? '#' : `/season/${s.sid}`}
              className={`season-card${comingSoon ? ' season-card--soon' : ''}`}
              onClick={comingSoon ? (e) => e.preventDefault() : undefined}
            >
              {s.logoPath && (
                <img src={s.logoPath} alt="" className="season-card-bg" />
              )}
              <div className="season-card-overlay" />
              <div className="season-card-body">
                <div className="season-card-name">{s.name}</div>
                {!comingSoon && (
                  <div className="season-card-stats">
                    <span>{s.cast.length} Players</span>
                    <span>{s.episodes.length} Episodes</span>
                    {s.location && <span>{s.location}</span>}
                  </div>
                )}
                {comingSoon && (
                  <div className="season-card-coming">Coming Soon</div>
                )}
                {winner && (
                  <div className="season-card-winner">
                    <Avatar name={winner.name} color={getTribeColor(s, winner.tid)}
                      size={32} photoUrl={winner.photoUrl} imgStyle={winner.photoStyle}
                      pid={winner.pid} noBorder />
                    <div className="season-card-winner-info">
                      <span className="season-card-winner-label">Winner</span>
                      <span className="season-card-winner-name">{winner.name}</span>
                    </div>
                    {runnerUp && (
                      <>
                        <Avatar name={runnerUp.name} color={getTribeColor(s, runnerUp.tid)}
                          size={32} photoUrl={runnerUp.photoUrl} imgStyle={runnerUp.photoStyle}
                          pid={runnerUp.pid} noBorder />
                        <div className="season-card-winner-info">
                          <span className="season-card-winner-label">Runner-Up</span>
                          <span className="season-card-winner-name">{runnerUp.name}</span>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
