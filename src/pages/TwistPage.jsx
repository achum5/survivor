// src/pages/TwistPage.jsx
import { useParams, Link, useNavigate } from 'react-router-dom';
import { SEASONS, TWIST_ARTICLES } from '../data';
import { slugify, getPlayer, getTribeColor, getTribe } from '../utils/helpers';
import { linkify } from '../utils/linkify';
import Avatar from '../components/Avatar';

function twistSlug(name) {
  return slugify(name.split(' — ')[0].trim());
}

// Determine what tribe a player was on at a given episode
function getTribeAtEpisode(season, player, episode) {
  if (!player || !episode) return null;
  // S1: swap after ep2, merge after ep4
  // S2: swap after ep2, merge at ep6
  const swapAfter = { s1: 2, s2: 2 };
  const mergeAt = { s1: 5, s2: 6 };
  const sid = season.sid;
  if (episode >= (mergeAt[sid] || 99) && player.merged) {
    return season.mergeTribe;
  }
  if (episode > (swapAfter[sid] || 99) && player.switchedTid) {
    return season.tribes.find(t => t.tid === player.switchedTid) || null;
  }
  return season.tribes.find(t => t.tid === player.tid) || null;
}

// Map advantage types to their twist names for cross-referencing
const TWIST_TO_ADV = {
  'Hidden Immunity Idols': ['Hidden Immunity Idol'],
  'Safety Without Power': ['Safety Without Power'],
  'Final 7 Advantage': ['Final 7 Advantage'],
  'Shot in the Dark': ['Shot in the Dark'],
};

// Build master list of all unique twists across all seasons
function getAllTwists() {
  const map = new Map();
  SEASONS.forEach((season) => {
    if (!season.twists) return;
    season.twists.forEach((twist) => {
      const name = twist.split(' — ')[0].trim();
      const description = twist.includes(' — ') ? twist.split(' — ').slice(1).join(' — ').trim() : '';
      const slug = twistSlug(twist);
      if (!map.has(slug)) {
        map.set(slug, { name, slug, seasons: [] });
      }
      const advTypes = TWIST_TO_ADV[name] || [];
      const advantages = [];
      if (season.advantages) {
        season.advantages.forEach((adv) => {
          if (advTypes.includes(adv.type)) advantages.push(adv);
        });
      }
      map.get(slug).seasons.push({ sid: season.sid, seasonName: season.name, description, advantages, season });
    });
  });
  return map;
}

export default function TwistPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const allTwists = getAllTwists();
  const twist = allTwists.get(slug);
  const allSlugs = [...allTwists.keys()];
  const article = TWIST_ARTICLES[slug];

  if (!twist) {
    return (
      <div className="article" style={{ padding: '40px 20px', textAlign: 'center' }}>
        <h1>Twist Not Found</h1>
        <Link to="/">Back to Home</Link>
      </div>
    );
  }

  // Build linkify context from all seasons this twist appears in
  const linkifySeasons = twist.seasons.map((s) => ({ season: s.season, sid: s.sid }));

  const currentIdx = allSlugs.indexOf(slug);
  const prevSlug = currentIdx > 0 ? allSlugs[currentIdx - 1] : null;
  const nextSlug = currentIdx < allSlugs.length - 1 ? allSlugs[currentIdx + 1] : null;

  return (
    <div className="article twist-page">
      <h1>Twists &amp; Advantages</h1>

      {/* Dropdown nav row */}
      <div className="ep-header-nav-row" style={{ marginBottom: 8 }}>
        {prevSlug ? (
          <Link to={`/twist/${prevSlug}`} className="ep-nav-arrow" title={allTwists.get(prevSlug).name}>&lsaquo;</Link>
        ) : (
          <span className="ep-nav-arrow disabled">&lsaquo;</span>
        )}
        <select
          className="ep-select"
          value={slug}
          onChange={(e) => navigate(`/twist/${e.target.value}`)}
        >
          {allSlugs.map((s) => (
            <option key={s} value={s}>{allTwists.get(s).name}</option>
          ))}
        </select>
        {nextSlug ? (
          <Link to={`/twist/${nextSlug}`} className="ep-nav-arrow" title={allTwists.get(nextSlug).name}>&rsaquo;</Link>
        ) : (
          <span className="ep-nav-arrow disabled">&rsaquo;</span>
        )}
      </div>

      {/* Overview */}
      {article?.overview && (
        <p className="twist-overview">{linkify(article.overview, linkifySeasons)}</p>
      )}

      {twist.seasons.map((s) => {
        const season = s.season;
        const articleParas = article?.seasons?.[s.sid];
        return (
          <section key={s.sid} className="twist-season-section">
            <h2>
              <Link to={`/season/${s.sid}`} className="twist-season-link">
                {s.seasonName}
              </Link>
            </h2>

            {/* Detailed article paragraphs if available, otherwise brief description */}
            {articleParas ? (
              articleParas.map((para, i) => (
                <p key={i} className="twist-description">{linkify(para, linkifySeasons)}</p>
              ))
            ) : (
              s.description && <p className="twist-description">{linkify(s.description, linkifySeasons)}</p>
            )}

            {/* Advantage instance cards */}
            {s.advantages.length > 0 && (
              <div className="twist-advantages">
                <h3>All Instances</h3>
                {s.advantages.map((adv, i) => {
                  const player = getPlayer(season, adv.holder);
                  const tribe = player ? getTribeAtEpisode(season, player, adv.foundEpisode) : null;
                  const tribeColor = tribe?.color || '#888';
                  return (
                    <div key={i} className="twist-adv-card" style={{ borderLeft: `3px solid ${tribeColor}` }}>
                      <div className="twist-adv-header">
                        {player && (
                          <Link to={`/season/${s.sid}/cast/${slugify(player.name)}`} className="twist-adv-player">
                            <Avatar name={player.name} photoUrl={player.photoUrl} imgStyle={player.photoStyle} pid={player.pid} color={tribeColor} size={32} noBorder />
                            <span className="twist-adv-name">{player.name}</span>
                          </Link>
                        )}
                        <span className={`twist-adv-status twist-adv-status--${adv.status.replace(/\s+/g, '-')}`}>
                          {adv.status}
                        </span>
                      </div>
                      <p className="twist-adv-notes">{linkify(adv.notes, [{ season, sid: s.sid }])}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
