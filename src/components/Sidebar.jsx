// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { SEASONS } from '../data';

export default function Sidebar() {
  const { sid } = useParams();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [expanded, setExpanded] = useState({});

  // Auto-expand the current season
  useEffect(() => {
    if (sid) setExpanded((prev) => ({ ...prev, [sid]: true }));
  }, [sid]);

  // Close sidebar on navigation
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.classList.add('sidebar-open');
    } else {
      document.body.classList.remove('sidebar-open');
    }
    return () => document.body.classList.remove('sidebar-open');
  }, [mobileOpen]);

  const toggleSeason = (seasonSid) => {
    setExpanded((prev) => ({ ...prev, [seasonSid]: !prev[seasonSid] }));
  };

  return (
    <>
      <button
        className="mobile-menu-btn"
        onClick={() => setMobileOpen((v) => !v)}
        aria-label="Toggle navigation menu"
      >
        {mobileOpen ? '\u2715' : '\u2630'}
      </button>

      {mobileOpen && (
        <div className="sidebar-overlay" onClick={() => setMobileOpen(false)} />
      )}

      <nav className={`sidebar${mobileOpen ? ' sidebar--open' : ''}`}>
        <div className="sidebar-logo">
          <NavLink to="/" className="sidebar-brand">
            <span className="sidebar-brand-icon">🔥</span>
            <span className="sidebar-brand-text">14508 Survivor Wiki</span>
          </NavLink>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Navigation</div>
          <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} end>
            Home
          </NavLink>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Seasons</div>
          {SEASONS.map((s) => {
            const isExpanded = expanded[s.sid];
            const isCurrent = sid === s.sid;
            const hasCast = s.cast.length > 0;

            return (
              <div key={s.sid}>
                <div className="sidebar-season-header">
                  <NavLink
                    to={`/season/${s.sid}`}
                    className={() => isCurrent ? 'sidebar-link active' : 'sidebar-link'}
                  >
                    {s.name}
                  </NavLink>
                  {hasCast && (
                    <button
                      className="sidebar-toggle"
                      onClick={() => toggleSeason(s.sid)}
                      aria-label={isExpanded ? 'Collapse' : 'Expand'}
                    >
                      {isExpanded ? '▾' : '▸'}
                    </button>
                  )}
                </div>
                {isExpanded && hasCast && (
                  <div className="sidebar-sub">
                    <NavLink to={`/season/${s.sid}`} end className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Overview</NavLink>
                    <NavLink to={`/season/${s.sid}/cast`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Cast</NavLink>
                    <NavLink to={`/season/${s.sid}/episodes`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Episodes</NavLink>
                    {s.episodes.length > 0 && (
                      <div className="sidebar-episodes">
                        {s.episodes.map((ep) => (
                          <NavLink
                            key={ep.eid}
                            to={`/season/${s.sid}/episode/${ep.eid}`}
                            className={({ isActive }) => `sidebar-ep-link${isActive ? ' active' : ''}`}
                          >
                            {ep.number}
                          </NavLink>
                        ))}
                      </div>
                    )}
                    <NavLink to={`/season/${s.sid}/voting`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Voting History</NavLink>
                    <NavLink to={`/season/${s.sid}/challenges`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Challenges</NavLink>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </nav>
    </>
  );
}
