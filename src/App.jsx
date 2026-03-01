import { useState, useEffect, useCallback } from "react";
import { SEASONS } from "./data";
import "./styles.css";

// ─── Hash Router ────────────────────────────────────────────
function parseHash() {
  const hash = window.location.hash.replace(/^#\/?/, "");
  if (!hash) return { page: "home", seasonSid: "s1" };
  const parts = hash.split("/");
  if (parts.length >= 2) {
    return { page: parts[1] || "overview", seasonSid: parts[0] };
  }
  return { page: "home", seasonSid: "s1" };
}

function buildHash(page, seasonSid) {
  if (page === "home") return "#/";
  return `#/${seasonSid}/${page}`;
}

function navigate(page, seasonSid) {
  window.location.hash = buildHash(page, seasonSid);
}

function useHashRouter() {
  const [state, setState] = useState(parseHash);

  useEffect(() => {
    function onHashChange() {
      setState(parseHash());
    }
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  const setPage = useCallback(
    (page) => navigate(page, state.seasonSid),
    [state.seasonSid]
  );

  const setSeasonSid = useCallback(
    (sid) => navigate(state.page === "home" ? "overview" : state.page, sid),
    [state.page]
  );

  const navigateTo = useCallback((page, sid) => navigate(page, sid), []);

  return { page: state.page, seasonSid: state.seasonSid, setPage, setSeasonSid, navigateTo };
}

// ─── Lookup helpers ─────────────────────────────────────────
function getPlayer(season, pid) {
  return season.cast.find((p) => p.pid === pid);
}

function getTribe(season, tid) {
  return season.tribes.find((t) => t.tid === tid);
}

function getTribeColor(season, tid) {
  const tribe = getTribe(season, tid);
  return tribe ? tribe.color : "#888";
}

function getTribeName(season, tid) {
  const tribe = getTribe(season, tid);
  return tribe ? tribe.name : "Merged";
}

function getPlayerName(season, pid) {
  const player = getPlayer(season, pid);
  return player ? player.name : "Unknown";
}

function ordinal(n) {
  const s = ["th", "st", "nd", "rd"];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

// ─── Navigation ─────────────────────────────────────────────
function Nav({ page, seasonSid }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <a className="logo" href="#/">
          <span className="logo-icon">🔥</span>
          <span className="logo-text">Backyard Survivor Wiki</span>
        </a>

        <div className="nav-links">
          <a className={page === "home" ? "active" : ""} href="#/">
            Home
          </a>
          {SEASONS.map((s) => (
            <a
              key={s.sid}
              className={page !== "home" && seasonSid === s.sid ? "active" : ""}
              href={`#/${s.sid}/overview`}
            >
              {s.name}
            </a>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Home ───────────────────────────────────────────────────
function Home() {
  return (
    <div className="home">
      <div className="home-header">
        <h1>Backyard Survivor Wiki</h1>
      </div>
      <p className="home-intro">
        The definitive reference for every season, castaway, and tribal council
        of Backyard Survivor.
      </p>

      <h2 className="section-heading">Seasons</h2>
      <table className="season-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>Subtitle</th>
            <th>Location</th>
            <th>Days</th>
            <th>Players</th>
            <th>Winner</th>
            <th>Tribes</th>
          </tr>
        </thead>
        <tbody>
          {SEASONS.map((s) => {
            const comingSoon = s.cast.length === 0;
            return (
              <tr key={s.sid} className={comingSoon ? "coming-soon" : ""}>
                <td>
                  {comingSoon ? (
                    s.name
                  ) : (
                    <a href={`#/${s.sid}/overview`}>{s.name}</a>
                  )}
                </td>
                <td>{s.subtitle}</td>
                <td>{s.location}</td>
                <td>{s.days ?? "TBD"}</td>
                <td>{comingSoon ? "TBD" : s.cast.length}</td>
                <td>
                  {comingSoon
                    ? "TBD"
                    : getPlayerName(s, s.winnerPid)}
                </td>
                <td>
                  {comingSoon
                    ? "TBD"
                    : s.tribes.map((t) => (
                        <span key={t.tid} style={{ marginRight: 8 }}>
                          <span
                            className="tribe-dot"
                            style={{ background: t.color }}
                          />
                          {t.name}
                        </span>
                      ))}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── Season Sub-Nav ─────────────────────────────────────────
function SeasonNav({ page, seasonSid }) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "cast", label: "Cast" },
    { key: "voting", label: "Voting History" },
    { key: "challenges", label: "Challenges" },
  ];
  return (
    <div className="season-nav">
      {tabs.map((t) => (
        <a
          key={t.key}
          className={page === t.key ? "active" : ""}
          href={`#/${seasonSid}/${t.key}`}
        >
          {t.label}
        </a>
      ))}
    </div>
  );
}

// ─── Season Overview ────────────────────────────────────────
function Overview({ season }) {
  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);

  return (
    <div className="overview">
      <h1 className="page-title">{season.name}: {season.subtitle}</h1>

      <div className="overview-layout">
        <div className="overview-body">
          <p className="overview-meta">
            <span>{season.location}</span>
            <span>{season.filmingDates}</span>
            <span>{season.episodes.length} episodes</span>
            <span>{season.days} days</span>
          </p>

          <h2 className="section-heading">Elimination Order</h2>
          <table className="elim-table">
            <thead>
              <tr>
                <th>Place</th>
                <th>Contestant</th>
                <th>Original Tribe</th>
                <th>Days Lasted</th>
                <th>Jury</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((p) => (
                <tr
                  key={p.pid}
                  className={p.placement === 1 ? "winner-row" : ""}
                >
                  <td>{ordinal(p.placement)}</td>
                  <td>{p.name}</td>
                  <td>
                    <span
                      className="tribe-badge small"
                      style={{ background: getTribeColor(season, p.tid) }}
                    >
                      {getTribeName(season, p.tid)}
                    </span>
                  </td>
                  <td>{p.daysLasted}</td>
                  <td>
                    {p.placement === 1 ? "Winner" :
                     p.placement === 2 ? "Runner-Up" :
                     p.juryMember ? <span className="jury-tag">Jury</span> : ""}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <h2 className="section-heading">Tribes</h2>
          {season.tribes.map((tribe) => {
            const members = season.cast.filter((p) => p.tid === tribe.tid);
            return (
              <div key={tribe.tid} className="tribe-section">
                <div className="tribe-name">
                  <span
                    className="tribe-dot"
                    style={{ background: tribe.color }}
                  />
                  {tribe.name}
                </div>
                <ul className="tribe-member-list">
                  {members.map((m) => (
                    <li key={m.pid}>
                      {m.name} — {ordinal(m.placement)} place
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <div className="infobox">
          <div className="infobox-title">{season.name}</div>
          <table>
            <tbody>
              <tr>
                <th>Subtitle</th>
                <td>{season.subtitle}</td>
              </tr>
              <tr>
                <th>Location</th>
                <td>{season.location}</td>
              </tr>
              <tr>
                <th>Filming</th>
                <td>{season.filmingDates}</td>
              </tr>
              <tr>
                <th>Days</th>
                <td>{season.days}</td>
              </tr>
              <tr>
                <th>Episodes</th>
                <td>{season.episodes.length}</td>
              </tr>
              <tr>
                <th>Players</th>
                <td>{season.cast.length}</td>
              </tr>
              <tr>
                <td colSpan={2} className="infobox-section">
                  Results
                </td>
              </tr>
              <tr>
                <th>Winner</th>
                <td>{getPlayerName(season, season.winnerPid)}</td>
              </tr>
              <tr>
                <th>Runner-Up</th>
                <td>{getPlayerName(season, season.runnerUpPid)}</td>
              </tr>
              {season.fanFavoritePid && (
                <tr>
                  <th>Fan Favorite</th>
                  <td>{getPlayerName(season, season.fanFavoritePid)}</td>
                </tr>
              )}
              <tr>
                <td colSpan={2} className="infobox-section">
                  Tribes
                </td>
              </tr>
              {season.tribes.map((t) => (
                <tr key={t.tid}>
                  <th>
                    <span
                      className="tribe-dot"
                      style={{ background: t.color }}
                    />
                    {t.name}
                  </th>
                  <td>
                    {season.cast.filter((p) => p.tid === t.tid).length} members
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// ─── Cast ───────────────────────────────────────────────────
function Cast({ season }) {
  const [selectedPid, setSelectedPid] = useState(null);
  const selected = selectedPid ? getPlayer(season, selectedPid) : null;
  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);

  return (
    <div className="cast">
      <h1 className="page-title">Cast — {season.name}</h1>

      {selected && (
        <div className="player-detail">
          <div className="player-detail-header">
            <div>
              <h2>{selected.name}</h2>
              <span
                className="tribe-badge"
                style={{ background: getTribeColor(season, selected.tid) }}
              >
                {getTribeName(season, selected.tid)}
              </span>
            </div>
            <button
              className="player-detail-close"
              onClick={() => setSelectedPid(null)}
            >
              Close
            </button>
          </div>
          <p className="player-detail-bio">{selected.bio}</p>
          <div className="player-stats-grid">
            <div className="player-stat">
              <div className="player-stat-label">Placement</div>
              <div className="player-stat-value">{ordinal(selected.placement)}</div>
            </div>
            <div className="player-stat">
              <div className="player-stat-label">Days Lasted</div>
              <div className="player-stat-value">{selected.daysLasted}</div>
            </div>
            <div className="player-stat">
              <div className="player-stat-label">Challenge Wins</div>
              <div className="player-stat-value">{selected.challengeWins}</div>
            </div>
            <div className="player-stat">
              <div className="player-stat-label">Votes Against</div>
              <div className="player-stat-value">{selected.votesAgainst}</div>
            </div>
            <div className="player-stat">
              <div className="player-stat-label">Jury Member</div>
              <div className="player-stat-value">{selected.juryMember ? "Yes" : "No"}</div>
            </div>
            <div className="player-stat">
              <div className="player-stat-label">Hometown</div>
              <div className="player-stat-value">{selected.hometown}</div>
            </div>
          </div>
        </div>
      )}

      <table className="cast-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Tribe</th>
            <th>Age</th>
            <th>Hometown</th>
            <th>Days</th>
            <th>Wins</th>
            <th>Votes Against</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.pid}>
              <td>{ordinal(p.placement)}</td>
              <td>
                <span
                  className="player-link"
                  onClick={() => setSelectedPid(p.pid)}
                >
                  {p.name}
                </span>
              </td>
              <td>
                <span
                  className="tribe-badge small"
                  style={{ background: getTribeColor(season, p.tid) }}
                >
                  {getTribeName(season, p.tid)}
                </span>
              </td>
              <td>{p.age}</td>
              <td>{p.hometown}</td>
              <td>{p.daysLasted}</td>
              <td>{p.challengeWins}</td>
              <td>{p.votesAgainst}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Voting History ─────────────────────────────────────────
function VotingHistory({ season }) {
  if (season.votingHistory.length === 0) {
    return (
      <div className="voting">
        <h1 className="page-title">Voting History — {season.name}</h1>
        <p className="empty-state">No voting data yet.</p>
      </div>
    );
  }

  return (
    <div className="voting">
      <h1 className="page-title">Voting History — {season.name}</h1>

      {season.votingHistory.map((tc) => {
        const tribeName = tc.tid ? getTribeName(season, tc.tid) : "Merged";
        return (
          <div key={tc.tcid} className="tribal-section">
            <div className="tribal-heading">
              Episode {tc.episode} — {tribeName} Tribal Council
            </div>
            {tc.notes && <div className="tribal-note">{tc.notes}</div>}

            <table className="vote-table">
              <thead>
                <tr>
                  <th>Voter</th>
                  <th>Voted For</th>
                </tr>
              </thead>
              <tbody>
                {tc.votes.map((v) => {
                  const voter = getPlayer(season, v.voterPid);
                  const target = getPlayer(season, v.votedForPid);
                  return (
                    <tr
                      key={v.vid}
                      className={v.voterPid === tc.eliminatedPid ? "eliminated" : ""}
                    >
                      <td>{voter?.name || v.voterPid}</td>
                      <td>{target?.name || v.votedForPid}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div className="tribal-result">
              Eliminated: <strong>{getPlayerName(season, tc.eliminatedPid)}</strong>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── Challenges ─────────────────────────────────────────────
function Challenges({ season }) {
  if (season.challenges.length === 0) {
    return (
      <div className="challenges">
        <h1 className="page-title">Challenges — {season.name}</h1>
        <p className="empty-state">No challenge data yet.</p>
      </div>
    );
  }

  return (
    <div className="challenges">
      <h1 className="page-title">Challenges — {season.name}</h1>

      <table className="challenge-table">
        <thead>
          <tr>
            <th>Episode</th>
            <th>Type</th>
            <th>Challenge</th>
            <th>Description</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {season.challenges.map((c) => {
            const winnerDisplay = c.winnerPid
              ? getPlayerName(season, c.winnerPid)
              : c.winnerTid
                ? getTribeName(season, c.winnerTid)
                : "TBD";
            return (
              <tr key={c.cid}>
                <td>{c.episode}</td>
                <td>
                  <span className="challenge-type">{c.type}</span>
                </td>
                <td>{c.name}</td>
                <td>{c.description}</td>
                <td>{winnerDisplay}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────
export default function App() {
  const { page, seasonSid } = useHashRouter();

  const season = SEASONS.find((s) => s.sid === seasonSid);

  return (
    <div className="app">
      <Nav page={page} seasonSid={seasonSid} />

      <main className="main">
        {page === "home" ? (
          <Home />
        ) : (
          <>
            <SeasonNav page={page} seasonSid={seasonSid} />
            {page === "overview" && <Overview season={season} />}
            {page === "cast" && <Cast season={season} />}
            {page === "voting" && <VotingHistory season={season} />}
            {page === "challenges" && <Challenges season={season} />}
          </>
        )}
      </main>

      <footer className="footer">
        <p>Backyard Survivor Wiki — Not affiliated with CBS Survivor</p>
      </footer>
    </div>
  );
}
