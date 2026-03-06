// src/pages/Home.jsx
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor } from '../utils/helpers';
import Avatar from '../components/Avatar';

function Countdown({ target }) {
  const [now, setNow] = useState(Date.now());
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);
  const diff = Math.max(0, target - now);
  const days = Math.floor(diff / 86400000);
  const hrs = Math.floor((diff % 86400000) / 3600000);
  const mins = Math.floor((diff % 3600000) / 60000);
  const secs = Math.floor((diff % 60000) / 1000);
  if (diff === 0) return <span className="season-tile-countdown">Premiering Now</span>;
  return (
    <span className="season-tile-countdown">
      {days}d {hrs}h {mins}m {secs}s
    </span>
  );
}

export default function Home() {
  return (
    <div className="home-page">
      <div className="season-grid">
        {SEASONS.map((s) => {
          const noContent = s.cast.length === 0;
          const hasStats = s.episodes.length > 0;
          const winner = s.cast.find((p) => p.pid === s.winnerPid);
          const hasCastPhoto = !!s.castPhotoPath;
          const showLogo = !hasCastPhoto && s.logoPath;

          return (
            <Link
              key={s.sid}
              to={noContent ? '#' : `/season/${s.sid}`}
              className={`season-tile${noContent ? ' season-tile--soon' : ''}`}
              onClick={noContent ? (e) => e.preventDefault() : undefined}
            >
              {/* Background: cast photo or scrolling cast headshots */}
              {hasCastPhoto && (
                <img src={s.castPhotoPath} alt="" className="season-tile-bg" />
              )}
              {!hasCastPhoto && s.cast.length > 0 && (
                <div className="season-tile-marquee">
                  <div className="season-tile-marquee-track">
                    {/* Repeat cast 2x for seamless endless loop, sorted alphabetically */}
                    {(() => { const sorted = [...s.cast].sort((a, b) => a.name.localeCompare(b.name)); return [...sorted, ...sorted]; })().map((p, i) => (
                      <img key={i} src={p.photoUrl} alt={p.name} className="season-tile-marquee-img" />
                    ))}
                  </div>
                </div>
              )}
              <div className="season-tile-overlay" />

              <div className="season-tile-body">
                {/* Countdown + logo grouped at bottom for upcoming seasons */}
                {!hasStats && s.premiereDate && (
                  <div className="season-tile-coming season-tile-coming--above-logo">
                    <Countdown target={new Date(s.premiereDate).getTime()} />
                  </div>
                )}

                {/* Season logo only when no cast photo */}
                {showLogo && (
                  <img src={s.logoPath} alt={s.name} className="season-tile-logo" />
                )}

                {/* Season name for cards with cast photos */}
                {hasCastPhoto && (
                  <div className="season-tile-name">{s.name}</div>
                )}

                {/* Winner */}
                {winner && (
                  <div className="season-tile-winner">
                    <Avatar name={winner.name} color={getTribeColor(s, winner.tid)}
                      size={28} photoUrl={winner.photoUrl} imgStyle={winner.photoStyle}
                      pid={winner.pid} noBorder />
                    <span className="season-tile-winner-name">{winner.name}</span>
                    <span className="season-tile-winner-label">Sole Survivor</span>
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
