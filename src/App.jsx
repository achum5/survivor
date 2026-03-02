// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SeasonOverview from './pages/SeasonOverview';
import CastList from './pages/CastList';
import PlayerPage from './pages/PlayerPage';
import VotingHistory from './pages/VotingHistory';
import Challenges from './pages/Challenges';
import EpisodeList from './pages/EpisodeList';
import EpisodePage from './pages/EpisodePage';
import './styles.css';

export default function App() {
  return (
    <div className="layout">
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
        </Routes>
        <footer className="wiki-footer">
          14508 Survivor Wiki — Not affiliated with CBS Survivor
        </footer>
      </div>
    </div>
  );
}
