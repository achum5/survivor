// src/pages/SeasonOverview.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';
import Avatar from '../components/Avatar';

export default function SeasonOverview() {
  const { sid } = useParams();
  const seasonIdx = SEASONS.findIndex((s) => s.sid === sid);
  const season = SEASONS[seasonIdx];
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const prevSeason = SEASONS[seasonIdx - 1] ?? null;
  const nextSeason = SEASONS[seasonIdx + 1] ?? null;

  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);
  const winner = season.cast.find((p) => p.pid === season.winnerPid);
  const runnerUp = season.cast.find((p) => p.pid === season.runnerUpPid);
  const fanFav = season.cast.find((p) => p.pid === season.fanFavoritePid);

  // Determine which tribe phase columns to show
  const hasSwitch = season.cast.some((p) => p.switchedTid);
  const hasMerge  = season.cast.some((p) => p.merged);

  const infoRows = [
    { label: 'Season',    value: season.name },
    { label: 'Location',  value: season.location },
    { label: 'Filmed',    value: season.filmingDates },
    { label: 'Players',   value: season.cast.length || '—' },
    { label: 'Winner',    value: winner   ? <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>   : '—' },
    { label: 'Runner-Up', value: runnerUp ? <Link to={`/season/${sid}/cast/${slugify(runnerUp.name)}`}>{runnerUp.name}</Link> : '—' },
    ...(fanFav ? [{ label: 'Fan Favorite', value: <Link to={`/season/${sid}/cast/${slugify(fanFav.name)}`}>{fanFav.name}</Link> }] : []),
    {
      label: 'Tribes',
      value: (
        <div className="infobox-tribe-swatches">
          {season.tribes.map((t) => (
            <span key={t.tid} className="infobox-tribe-swatch" style={{ background: t.color }} title={t.name} />
          ))}
        </div>
      ),
    },
  ];

  function TribeBadge({ tid }) {
    if (!tid) return <span className="tribe-badge-empty">—</span>;
    const tribe = season.tribes.find((t) => t.tid === tid);
    if (!tribe) return null;
    return <span className="tribe-badge" style={{ background: tribe.color }}>{tribe.name}</span>;
  }

  function MergeBadge({ merged }) {
    if (!merged) return <span className="tribe-badge-empty">—</span>;
    if (season.mergeTribe) {
      return <span className="tribe-badge" style={{ background: season.mergeTribe.color }}>{season.mergeTribe.name}</span>;
    }
    return <span className="tribe-badge tribe-badge-merged">Merged</span>;
  }

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name },
      ]} />

      <h1>{season.name}</h1>

      <div className="clearfix">
        <Infobox
          title={season.name}
          headerColor={season.tribes[0]?.color || '#8b0000'}
          rows={infoRows}
          logo={season.logoPath}
          castPhoto={season.castPhotoPath}
          chronology={{ prev: prevSeason, next: nextSeason }}
        />

        <div className="overview-meta">
          <span>📅 {season.filmingDates}</span>
        </div>

        <p>
          <strong>{season.name}</strong> is a season of 14508 Survivor
          filmed on {season.filmingDates}.
          {winner && <> The season was won by <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>.</>}
        </p>
      </div>

      {/* Season Summary */}
      {season.summary && (
        <>
          <h2>Season Summary</h2>
          <p>{season.summary}</p>
        </>
      )}

      {/* Twists & Gameplay */}
      {season.twists && season.twists.length > 0 && (
        <>
          <h2>Twists &amp; Gameplay</h2>
          <ul className="twists-list">
            {season.twists.map((twist, i) => (
              <li key={i}>{twist}</li>
            ))}
          </ul>
        </>
      )}

      {/* Castaways */}
      <h2>Castaways</h2>
      <table className="elim-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Original Tribe</th>
            {hasSwitch && <th>Switched Tribe</th>}
            {hasMerge  && <th>Merged Tribe</th>}
            <th>Votes Against</th>
            <th>Jury</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.pid} className={p.pid === season.winnerPid ? 'winner-row' : ''}>
              <td>{ordinal(p.placement)}</td>
              <td>
                <Link to={`/season/${sid}/cast/${slugify(p.name)}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={26} />
                  {p.name}
                  {p.pid === season.winnerPid && <span style={{ marginLeft: 6, color: 'var(--accent)', fontSize: '0.8rem' }}>★ Sole Survivor</span>}
                </Link>
              </td>
              <td><TribeBadge tid={p.tid} /></td>
              {hasSwitch && <td><TribeBadge tid={p.switchedTid ?? null} /></td>}
              {hasMerge  && <td><MergeBadge merged={p.merged} /></td>}
              <td>{p.votesAgainst}</td>
              <td>{p.juryMember ? '✓' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Episodes */}
      {season.episodes.length > 0 && (
        <>
          <h2>Episodes</h2>
          <div className="episode-list-grid">
            {season.episodes.map((ep) => {
              const tc = season.votingHistory.find((t) => t.episode === ep.number && t.eliminatedPid);
              const elim = tc ? season.cast.find((p) => p.pid === tc.eliminatedPid) : null;
              return (
                <Link key={ep.eid} to={`/season/${sid}/episode/${ep.eid}`} className="episode-list-card">
                  <span className="episode-list-num">Ep {ep.number}</span>
                  <span className="episode-list-title">{ep.title}</span>
                  {elim && <span className="episode-list-elim">🔦 {elim.name}</span>}
                  {ep.videoUrl && <span className="episode-list-video">▶</span>}
                </Link>
              );
            })}
          </div>
        </>
      )}

      {/* Tribes */}
      <h2>Tribes</h2>
      {season.tribes.map((tribe) => {
        const members = season.cast.filter((p) => p.tid === tribe.tid);
        return (
          <div key={tribe.tid} className="tribe-block">
            <h3 style={{ color: tribe.color }}>{tribe.name}</h3>
            <div className="tribe-members-list">
              {members.map((m) => (
                <Link key={m.pid} to={`/season/${sid}/cast/${slugify(m.name)}`} className="tribe-member-chip">
                  <Avatar name={m.name} color={tribe.color} size={26} />
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        );
      })}

    </div>
  );
}
