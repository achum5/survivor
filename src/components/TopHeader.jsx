// src/components/TopHeader.jsx
import { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { SEASONS } from '../data';

function useClickOutside(ref, handler) {
  useEffect(() => {
    const listener = (e) => {
      if (!ref.current || ref.current.contains(e.target)) return;
      handler();
    };
    document.addEventListener('mousedown', listener);
    return () => document.removeEventListener('mousedown', listener);
  }, [ref, handler]);
}

function parseSid(pathname) {
  const m = pathname.match(/\/season\/([^/]+)/);
  return m ? m[1] : null;
}

function parseEid(pathname) {
  const m = pathname.match(/\/season\/[^/]+\/episode\/([^/]+)$/);
  return m ? m[1] : null;
}

function getQuickNavSections(season, location) {
  if (!season) return [];

  const eid = parseEid(location.pathname);
  if (eid) {
    const episode = season.episodes.find((e) => e.eid === eid);
    if (episode) {
      const tcs = season.votingHistory.filter(
        (tc) => tc.episode === episode.number && !(tc.eliminatedPid === null && tc.votes.length === 0)
      );
      const sections = [];
      if (episode.rewardChallenge || episode.immunityChallenge) sections.push({ id: 'challenges', label: 'Challenges' });
      if (episode.journey) sections.push({ id: 'journey', label: 'Journey' });
      if (tcs.some((tc) => tc.confessionals?.length > 0)) sections.push({ id: 'confessionals', label: 'Confessionals' });
      if (tcs.length > 0) sections.push({ id: 'tribal-council', label: 'Tribal Council' });
      return sections;
    }
  }

  const sections = [{ id: '__home__', label: 'Overview' }];
  if (season.twists?.length > 0) sections.push({ id: 'twists', label: 'Twists' });
  sections.push({ id: 'castaways', label: 'Castaways' });
  sections.push({ id: 'episodes', label: 'Episodes' });
  sections.push({ id: 'voting-history', label: 'Voting History' });
  return sections;
}

export default function TopHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const mobileNavRef = useRef(null);

  useClickOutside(mobileNavRef, () => setMobileNavOpen(false));

  useEffect(() => {
    setMobileNavOpen(false);
  }, [location.pathname, location.hash]);

  const sid = parseSid(location.pathname);
  const season = sid ? SEASONS.find((s) => s.sid === sid) : null;
  const sections = getQuickNavSections(season, location);

  const isEpisodePage = !!parseEid(location.pathname);
  const isSeasonOverviewPage = /^\/season\/[^/]+$/.test(location.pathname);

  function handleNav(section) {
    if (section.id === '__home__') {
      navigate(`/season/${sid}`);
      setMobileNavOpen(false);
      return;
    }
    if (isEpisodePage || isSeasonOverviewPage) {
      const el = document.getElementById(section.id);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
        setMobileNavOpen(false);
        return;
      }
    }
    navigate(`/season/${sid}#${section.id}`);
    setMobileNavOpen(false);
  }

  return (
    <header className="top-header">
      <div className="top-header-left">
        <Link to="/" className="top-header-title">
          14508 Survivor Wiki
        </Link>
      </div>

      {/* Center: season select + nav items */}
      <div className="top-header-center">
        <select
          className="top-header-season-select"
          value={sid || ''}
          onChange={(e) => {
            if (e.target.value) navigate(`/season/${e.target.value}`);
          }}
        >
  {!sid && <option value="" disabled>Season</option>}
          {SEASONS.map((s) => (
            <option key={s.sid} value={s.sid}>{s.name}</option>
          ))}
        </select>

        {/* Desktop: inline section links */}
        {sid && sections.length > 0 && (
          <nav className="top-header-nav">
            {sections.map((s) => (
              <button
                key={s.id}
                className="top-header-nav-item"
                onClick={() => handleNav(s)}
              >
                {s.label}
              </button>
            ))}
          </nav>
        )}

        {/* Mobile: collapsed dropdown */}
        {sid && sections.length > 0 && (
          <div className="top-header-nav-mobile" ref={mobileNavRef}>
            <button
              className={`top-header-nav-toggle${mobileNavOpen ? ' open' : ''}`}
              onClick={() => setMobileNavOpen((v) => !v)}
            >
              Nav {mobileNavOpen ? '\u25B4' : '\u25BE'}
            </button>
            {mobileNavOpen && (
              <div className="top-header-nav-dropdown">
                {sections.map((s) => (
                  <button
                    key={s.id}
                    className="top-header-nav-dropdown-item"
                    onClick={() => handleNav(s)}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
}
