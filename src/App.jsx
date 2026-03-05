// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          const headerH = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--header-height')) || 56;
          const top = el.getBoundingClientRect().top + window.scrollY - headerH - 16;
          window.scrollTo({ top, behavior: 'smooth' });
          return;
        }
      }, 100);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
import TopHeader from './components/TopHeader';
import Home from './pages/Home';
import SeasonOverview from './pages/SeasonOverview';
import PlayerPage from './pages/PlayerPage';
import EpisodeList from './pages/EpisodeList';
import EpisodePage from './pages/EpisodePage';
import ChallengePage from './pages/ChallengePage';
import TribePage from './pages/TribePage';
import TwistPage from './pages/TwistPage';
import { PhotoEditorProvider } from './context/PhotoEditorContext';
import './styles.css';

function AppInner() {
  return (
    <div className="layout">
      <ScrollToTop />
      <TopHeader />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/season/:sid" element={<SeasonOverview />} />
          <Route path="/season/:sid/cast/:slug" element={<PlayerPage />} />
          <Route path="/season/:sid/episodes" element={<EpisodeList />} />
          <Route path="/season/:sid/episode/:eid" element={<EpisodePage />} />
          <Route path="/season/:sid/episode/:eid/challenge/:ctype" element={<ChallengePage />} />
          <Route path="/season/:sid/tribe/:tid" element={<TribePage />} />
          <Route path="/twist/:slug" element={<TwistPage />} />
        </Routes>
        <footer className="wiki-footer">
          14508 Survivor Wiki
        </footer>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <PhotoEditorProvider>
      <AppInner />
    </PhotoEditorProvider>
  );
}
