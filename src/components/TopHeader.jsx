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

function getQuickNavSections(season) {
  if (!season) return [];

  const sections = [];
  if (season.summary) sections.push({ id: 'summary', label: 'Summary' });
  if (season.episodes?.length > 0) sections.push({ id: 'episodes', label: 'Episodes' });
  if (season.episodes?.length > 0) sections.push({ id: 'voting-history', label: 'Voting History' });
  if (season.cast?.length > 0) sections.push({ id: 'castaways', label: 'Castaways' });
  if (season.twists?.length > 0) sections.push({ id: 'twists', label: 'Twists' });
  return sections;
}

export default function TopHeader() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [seasonDropOpen, setSeasonDropOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const seasonDropRef = useRef(null);

  useClickOutside(mobileNavRef, () => setMobileNavOpen(false));
  useClickOutside(seasonDropRef, () => setSeasonDropOpen(false));

  useEffect(() => {
    setMobileNavOpen(false);
    setSeasonDropOpen(false);
  }, [location.pathname, location.hash]);

  const parsedSid = parseSid(location.pathname);
  // Remember last viewed season so twist pages etc. keep the header intact
  useEffect(() => {
    if (parsedSid) sessionStorage.setItem('lastSid', parsedSid);
  }, [parsedSid]);
  const sid = parsedSid || sessionStorage.getItem('lastSid') || null;
  const season = sid ? SEASONS.find((s) => s.sid === sid) : null;
  const sections = season ? getQuickNavSections(season) : [];

  function handleNav(section) {
    // Only scroll in-page if we're on the season overview page itself
    const onSeasonPage = location.pathname === `/season/${sid}` || location.pathname === `/season/${sid}/`;
    if (onSeasonPage) {
      const el = document.getElementById(section.id);
      if (el) {
        const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 56;
        const subheader = document.querySelector('.ep-subheader');
        const offset = headerH + (subheader ? subheader.offsetHeight : 0) + 16;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
        setMobileNavOpen(false);
        return;
      }
    }
    navigate(`/season/${sid}#${section.id}`);
    setMobileNavOpen(false);
  }

  const isHome = location.pathname === '/' || location.pathname === '';

  return (
    <header className={`top-header${isHome ? ' top-header--home' : ''}`}>
      <div className="top-header-left">
        <Link to="/" className="top-header-title">
          14508 Survivor Wiki
        </Link>
      </div>

      {/* Center: season select + nav items (hidden on home) */}
      {!isHome && <div className="top-header-center">
        <div className="top-header-season-drop" ref={seasonDropRef}>
          <button
            className={`top-header-season-btn${seasonDropOpen ? ' open' : ''}`}
            onClick={() => setSeasonDropOpen((v) => !v)}
          >
            {season ? season.name : 'Season'} {seasonDropOpen ? '\u25B4' : '\u25BE'}
          </button>
          {seasonDropOpen && (
            <div className="top-header-season-dropdown">
              {SEASONS.map((s) => (
                <button
                  key={s.sid}
                  className={`top-header-season-dropdown-item${s.sid === sid ? ' active' : ''}`}
                  onClick={() => { navigate(`/season/${s.sid}`); setSeasonDropOpen(false); }}
                >
                  {s.name}
                </button>
              ))}
            </div>
          )}
        </div>

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
      </div>}
    </header>
  );
}
