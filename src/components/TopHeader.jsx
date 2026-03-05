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
  sections.push({ id: 'episodes', label: 'Episodes' });
  sections.push({ id: 'voting-history', label: 'Voting History' });
  sections.push({ id: 'castaways', label: 'Castaways' });
  if (season.twists?.length > 0) sections.push({ id: 'twists', label: 'Twists' });
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
