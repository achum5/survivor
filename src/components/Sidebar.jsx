// src/components/Sidebar.jsx
import { useState, useEffect } from 'react';
import { NavLink, useParams, useLocation } from 'react-router-dom';
import { SEASONS } from '../data';

export default function Sidebar() {
  const { sid } = useParams();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

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
            Main Page
          </NavLink>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-section-title">Seasons</div>
          {SEASONS.map((s) => (
            <div key={s.sid}>
              <NavLink
                to={`/season/${s.sid}`}
                className={() => sid === s.sid ? 'sidebar-link active' : 'sidebar-link'}
              >
                {s.name}
              </NavLink>
              {sid === s.sid && s.cast.length > 0 && (
                <div className="sidebar-sub">
                  <NavLink to={`/season/${s.sid}`} end className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Overview</NavLink>
                  <NavLink to={`/season/${s.sid}/cast`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Cast</NavLink>
                  <NavLink to={`/season/${s.sid}/voting`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Voting History</NavLink>
                  <NavLink to={`/season/${s.sid}/challenges`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Challenges</NavLink>
                  <NavLink to={`/season/${s.sid}/episodes`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Episodes</NavLink>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </>
  );
}
