// src/App.jsx
import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';

function ScrollToTop() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      setTimeout(() => {
        const el = document.getElementById(hash.slice(1));
        if (el) { el.scrollIntoView({ behavior: 'smooth' }); return; }
      }, 100);
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SeasonOverview from './pages/SeasonOverview';
import CastList from './pages/CastList';
import PlayerPage from './pages/PlayerPage';
import VotingHistory from './pages/VotingHistory';
import Challenges from './pages/Challenges';
import EpisodeList from './pages/EpisodeList';
import EpisodePage from './pages/EpisodePage';
import ChallengePage from './pages/ChallengePage';
import TribePage from './pages/TribePage';
import { PhotoEditorProvider, usePhotoEditor } from './context/PhotoEditorContext';
import PhotoEditorPanel from './components/PhotoEditorPanel';
import './styles.css';

function AppInner() {
  const { editMode, setEditMode, editing, setEditing } = usePhotoEditor();

  return (
    <div className="layout">
      <ScrollToTop />
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/season/:sid" element={<SeasonOverview />} />
          <Route path="/season/:sid/cast" element={<CastList />} />
          <Route path="/season/:sid/cast/:slug" element={<PlayerPage />} />
          <Route path="/season/:sid/voting" element={<VotingHistory />} />
          <Route path="/season/:sid/challenges" element={<Challenges />} />
          <Route path="/season/:sid/episodes" element={<EpisodeList />} />
          <Route path="/season/:sid/episode/:eid" element={<EpisodePage />} />
          <Route path="/season/:sid/episode/:eid/challenge/:ctype" element={<ChallengePage />} />
          <Route path="/season/:sid/tribe/:tid" element={<TribePage />} />
        </Routes>
        <footer className="wiki-footer">
          14508 Survivor Wiki
        </footer>
      </div>

      <button
        className={`photo-edit-toggle${editMode ? ' active' : ''}`}
        onClick={() => { setEditMode((v) => !v); setEditing(null); }}
        title="Toggle photo edit mode (press E)"
      >
        ✏️ {editMode ? 'Editing On' : 'Edit Photos'}
      </button>

      {editing && <PhotoEditorPanel editing={editing} onClose={() => setEditing(null)} />}
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
