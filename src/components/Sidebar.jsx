// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { SEASONS } from '../data';

export default function Sidebar() {
  const { sid } = useParams();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [seasonExpanded, setSeasonExpanded] = useState({});

  // Auto-expand the current season
  useEffect(() => {
    if (sid) setSeasonExpanded((prev) => ({ ...prev, [sid]: true }));
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
    setSeasonExpanded((prev) => ({ ...prev, [seasonSid]: !prev[seasonSid] }));
  };

  const lnk = ({ isActive }) => `sb-item${isActive ? ' active' : ''}`;

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
        <NavLink to="/" className="sb-brand">
          <img src="/logos/season-1.png" alt="" className="sb-brand-img" />
          <span className="sb-brand-text">14508 Survivor Wiki</span>
        </NavLink>

        <div className="sb-nav">
          {SEASONS.map((s) => {
            const isExpanded = seasonExpanded[s.sid];
            const hasCast = s.cast.length > 0;

            return (
              <div key={s.sid}>
                {/* Section header for this season */}
                <button
                  className="sb-section-hdr"
                  onClick={() => hasCast && toggleSeason(s.sid)}
                >
                  {hasCast && <span className={`sb-arrow${isExpanded ? ' open' : ''}`}>▸</span>}
                  {s.name}
                </button>

                {hasCast && (
                  <div className={`sb-expand${isExpanded ? ' open' : ''}`}>
                    <div className="sb-expand-inner">
                      <NavLink to={`/season/${s.sid}`} end className={lnk}>Overview</NavLink>
                      <NavLink to={`/season/${s.sid}/episodes`} className={lnk}>Episodes</NavLink>
                      {s.episodes.map((ep) => (
                        <NavLink
                          key={ep.eid}
                          to={`/season/${s.sid}/episode/${ep.eid}`}
                          className={lnk}
                        >
                          <span className="sb-ep-num">Ep {ep.number}</span>
                        </NavLink>
                      ))}
                    </div>
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
