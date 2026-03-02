// src/pages/SeasonOverview.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerName, getTribeColor, getTribeName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';
import Avatar from '../components/Avatar';

export default function SeasonOverview() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);
  const winner = season.cast.find((p) => p.pid === season.winnerPid);
  const runnerUp = season.cast.find((p) => p.pid === season.runnerUpPid);
  const fanFav = season.cast.find((p) => p.pid === season.fanFavoritePid);

  const infoRows = [
    { label: 'Season', value: season.name },
    { label: 'Subtitle', value: season.subtitle },
    { label: 'Location', value: season.location },
    { label: 'Filmed', value: season.filmingDates },
    { label: 'Episodes', value: season.episodes.length },
    { label: 'Days', value: season.days ?? 'TBD' },
    { label: 'Players', value: season.cast.length },
    { label: 'Winner', value: winner ? <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link> : '—' },
    { label: 'Runner-Up', value: runnerUp ? <Link to={`/season/${sid}/cast/${slugify(runnerUp.name)}`}>{runnerUp.name}</Link> : '—' },
    ...(fanFav ? [{ label: 'Fan Favorite', value: <Link to={`/season/${sid}/cast/${slugify(fanFav.name)}`}>{fanFav.name}</Link> }] : []),
  ];

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name },
      ]} />

      <h1>{season.name}: {season.subtitle}</h1>

      {season.logoPath && (
        <div className="season-logo-header">
          <img src={season.logoPath} alt={`${season.name} logo`} />
        </div>
      )}

      <div className="clearfix">
        <Infobox
          title={season.name}
          headerColor={season.tribes[0]?.color || '#8b0000'}
          rows={infoRows}
        />

        <div className="overview-meta">
          <span>📍 {season.location}</span>
          <span>📅 {season.filmingDates}</span>
          <span>🎬 {season.episodes.length} episodes</span>
          <span>☀️ {season.days ?? 'TBD'} days</span>
        </div>

        <p>
          <strong>{season.name}: {season.subtitle}</strong> is a season of Backyard Survivor
          filmed at {season.location} during {season.filmingDates}.
          {winner && <> The season was won by <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>.</>}
        </p>
      </div>

      <h2>Elimination Order</h2>
      <table className="elim-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Tribe</th>
            <th>Days</th>
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
              <td>
                <span className="tribe-badge" style={{ background: getTribeColor(season, p.tid) }}>
                  {getTribeName(season, p.tid)}
                </span>
              </td>
              <td>{p.daysLasted}</td>
              <td>{p.votesAgainst}</td>
              <td>{p.juryMember ? '✓' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

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
