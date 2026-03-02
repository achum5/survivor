// src/pages/PlayerPage.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerBySlug, getTribeColor, getTribeName, getPlayerName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';

export default function PlayerPage() {
  const { sid, slug } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const player = getPlayerBySlug(season, slug);
  if (!player) return <div className="article"><p>Player not found.</p></div>;

  const tribeColor = getTribeColor(season, player.tid);
  const tribeName = getTribeName(season, player.tid);

  const infoRows = [
    { label: 'Season',       value: <Link to={`/season/${sid}`}>{season.name}</Link> },
    { label: 'Tribe',        value: <span className="tribe-badge" style={{ background: tribeColor }}>{tribeName}</span> },
    { label: 'Placement',    value: ordinal(player.placement) + (player.pid === season.winnerPid ? ' ★ Sole Survivor' : '') },
    { label: 'Votes Against',value: player.votesAgainst },
    { label: 'Jury Member',  value: player.juryMember ? 'Yes' : 'No' },
  ];

  // Votes this player cast
  const votesCast = season.votingHistory.flatMap((tc) =>
    tc.votes
      .filter((v) => v.voterPid === player.pid)
      .map((v) => ({ episode: tc.episode, target: getPlayerName(season, v.votedForPid), tcid: tc.tcid }))
  );

  // Votes cast against this player
  const votesReceived = season.votingHistory.flatMap((tc) =>
    tc.votes
      .filter((v) => v.votedForPid === player.pid)
      .map((v) => ({ episode: tc.episode, voter: getPlayerName(season, v.voterPid), tcid: tc.tcid }))
  );

  // Challenges this player won
  const challengeWins = season.challenges.filter((c) => c.winnerPid === player.pid);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Cast', to: `/season/${sid}/cast` },
        { label: player.name },
      ]} />

      <h1>{player.name}</h1>

      <div className="player-article clearfix">
        <Infobox title={player.name} headerColor={tribeColor} rows={infoRows} logo={player.photoUrl} />

        <p className="player-bio">{player.bio}</p>

        <p>
          <strong>{player.name}</strong> competed in{' '}
          <Link to={`/season/${sid}`}>{season.name}</Link> as a member of the{' '}
          <span className="tribe-badge" style={{ background: tribeColor }}>{tribeName}</span> tribe.
          {player.pid === season.winnerPid && <> They won the season as the Sole Survivor.</>}
          {player.pid === season.fanFavoritePid && <> They were voted Fan Favorite by viewers.</>}
        </p>
      </div>

      {votesCast.length > 0 && (
        <>
          <h2>Votes Cast</h2>
          <table className="player-vote-grid">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Voted For</th>
              </tr>
            </thead>
            <tbody>
              {votesCast.map((v) => (
                <tr key={v.tcid}>
                  <td>Episode {v.episode}</td>
                  <td>{v.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {votesReceived.length > 0 && (
        <>
          <h2>Votes Received</h2>
          <table className="player-vote-grid">
            <thead>
              <tr>
                <th>Episode</th>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {votesReceived.map((v) => (
                <tr key={v.tcid}>
                  <td>Episode {v.episode}</td>
                  <td>{v.voter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {challengeWins.length > 0 && (
        <>
          <h2>Individual Challenge Wins</h2>
          <table className="player-vote-grid">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Challenge</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {challengeWins.map((c) => (
                <tr key={c.cid}>
                  <td>Episode {c.episode}</td>
                  <td>{c.name}</td>
                  <td>{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
