import { useState } from "react";
import { SEASONS } from "./data";
import "./styles.css";

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

// ─── Avatar ─────────────────────────────────────────────────
function Avatar({ name, color, size = 48 }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .join("")
    .slice(0, 2);
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${color}, ${color}99)`,
      }}
    >
      {initials}
    </div>
  );
}

// ─── Navigation ─────────────────────────────────────────────
function Nav({ page, setPage, seasonSid, setSeasonSid }) {
  return (
    <header className="nav">
      <div className="nav-inner">
        <button className="logo" onClick={() => setPage("home")}>
          <span className="logo-icon">🔥</span>
          <span className="logo-text">Backyard Survivor Wiki</span>
        </button>

        <div className="nav-links">
          <button
            className={page === "home" ? "active" : ""}
            onClick={() => setPage("home")}
          >
            Home
          </button>

          {SEASONS.map((s) => (
            <button
              key={s.sid}
              className={page !== "home" && seasonSid === s.sid ? "active" : ""}
              onClick={() => {
                setSeasonSid(s.sid);
                setPage("overview");
              }}
            >
              {s.name}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

// ─── Home ───────────────────────────────────────────────────
function Home({ setPage, setSeasonSid }) {
  return (
    <div className="home">
      <div className="hero">
        <h1>Backyard Survivor Wiki</h1>
        <p>The definitive source for every season, castaway, and tribal council.</p>
      </div>

      <div className="season-grid">
        {SEASONS.map((s) => {
          const comingSoon = s.cast.length === 0;
          return (
            <div
              key={s.sid}
              className={`season-card ${comingSoon ? "coming-soon" : ""}`}
              onClick={() => {
                if (!comingSoon) {
                  setSeasonSid(s.sid);
                  setPage("overview");
                }
              }}
            >
              <div className="season-card-header">
                <h2>{s.name}</h2>
                <span className="season-subtitle">{s.subtitle}</span>
              </div>
              {comingSoon ? (
                <p className="coming-soon-text">Coming Soon</p>
              ) : (
                <div className="season-card-stats">
                  <span>{s.cast.length} Players</span>
                  <span>{s.episodes.length} Episodes</span>
                  <span>{s.days} Days</span>
                </div>
              )}
              {!comingSoon && (
                <div className="season-card-tribes">
                  {s.tribes.map((t) => (
                    <span
                      key={t.tid}
                      className="tribe-badge"
                      style={{ background: t.color }}
                    >
                      {t.name}
                    </span>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ─── Season Sub-Nav ─────────────────────────────────────────
function SeasonNav({ page, setPage }) {
  const tabs = [
    { key: "overview", label: "Overview" },
    { key: "cast", label: "Cast" },
    { key: "voting", label: "Voting History" },
    { key: "challenges", label: "Challenges" },
  ];
  return (
    <div className="season-nav">
      {tabs.map((t) => (
        <button
          key={t.key}
          className={page === t.key ? "active" : ""}
          onClick={() => setPage(t.key)}
        >
          {t.label}
        </button>
      ))}
    </div>
  );
}

// ─── Season Overview ────────────────────────────────────────
function Overview({ season }) {
  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);

  return (
    <div className="overview">
      <div className="overview-header">
        <h1>{season.name}: {season.subtitle}</h1>
        <div className="overview-meta">
          <span>📍 {season.location}</span>
          <span>📅 {season.filmingDates}</span>
          <span>📺 {season.episodes.length} Episodes</span>
          <span>☀️ {season.days} Days</span>
        </div>
      </div>

      <div className="overview-highlights">
        <div className="highlight-card winner">
          <span className="highlight-label">Sole Survivor</span>
          <span className="highlight-value">
            {getPlayerName(season, season.winnerPid)}
          </span>
        </div>
        <div className="highlight-card">
          <span className="highlight-label">Runner-Up</span>
          <span className="highlight-value">
            {getPlayerName(season, season.runnerUpPid)}
          </span>
        </div>
        {season.fanFavoritePid && (
          <div className="highlight-card">
            <span className="highlight-label">Fan Favorite</span>
            <span className="highlight-value">
              {getPlayerName(season, season.fanFavoritePid)}
            </span>
          </div>
        )}
      </div>

      <h2>Elimination Order</h2>
      <div className="elimination-order">
        {sorted.map((p) => (
          <div key={p.pid} className="elim-slot">
            <Avatar
              name={p.name}
              color={getTribeColor(season, p.tid)}
              size={40}
            />
            <span className="elim-name">{p.name}</span>
            <span className="elim-place">{ordinal(p.placement)}</span>
            {p.juryMember && <span className="jury-tag">Jury</span>}
          </div>
        ))}
      </div>

      <h2>Tribes</h2>
      <div className="tribes-section">
        {season.tribes.map((tribe) => {
          const members = season.cast.filter((p) => p.tid === tribe.tid);
          return (
            <div key={tribe.tid} className="tribe-block">
              <h3 style={{ color: tribe.color }}>{tribe.name}</h3>
              <div className="tribe-members">
                {members.map((m) => (
                  <div key={m.pid} className="tribe-member">
                    <Avatar name={m.name} color={tribe.color} size={32} />
                    <span>{m.name}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
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
      <h1>Cast — {season.name}</h1>

      {selected && (
        <div className="player-modal-overlay" onClick={() => setSelectedPid(null)}>
          <div className="player-modal" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close" onClick={() => setSelectedPid(null)}>
              ✕
            </button>
            <div className="modal-header">
              <Avatar
                name={selected.name}
                color={getTribeColor(season, selected.tid)}
                size={80}
              />
              <div>
                <h2>{selected.name}</h2>
                <span
                  className="tribe-badge"
                  style={{ background: getTribeColor(season, selected.tid) }}
                >
                  {getTribeName(season, selected.tid)}
                </span>
              </div>
            </div>
            <p className="modal-bio">{selected.bio}</p>
            <div className="modal-stats">
              <div>
                <span className="stat-label">Placement</span>
                <span className="stat-value">
                  {ordinal(selected.placement)}
                </span>
              </div>
              <div>
                <span className="stat-label">Days Lasted</span>
                <span className="stat-value">{selected.daysLasted}</span>
              </div>
              <div>
                <span className="stat-label">Challenge Wins</span>
                <span className="stat-value">{selected.challengeWins}</span>
              </div>
              <div>
                <span className="stat-label">Votes Against</span>
                <span className="stat-value">{selected.votesAgainst}</span>
              </div>
              <div>
                <span className="stat-label">Jury Member</span>
                <span className="stat-value">
                  {selected.juryMember ? "Yes" : "No"}
                </span>
              </div>
              <div>
                <span className="stat-label">Hometown</span>
                <span className="stat-value">{selected.hometown}</span>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="cast-grid">
        {sorted.map((p) => (
          <div
            key={p.pid}
            className="cast-card"
            onClick={() => setSelectedPid(p.pid)}
          >
            <Avatar
              name={p.name}
              color={getTribeColor(season, p.tid)}
              size={56}
            />
            <div className="cast-card-info">
              <h3>{p.name}</h3>
              <span
                className="tribe-badge small"
                style={{ background: getTribeColor(season, p.tid) }}
              >
                {getTribeName(season, p.tid)}
              </span>
              <span className="cast-placement">
                {ordinal(p.placement)} Place
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Voting History ─────────────────────────────────────────
function VotingHistory({ season }) {
  if (season.votingHistory.length === 0) {
    return (
      <div className="voting">
        <h1>Voting History — {season.name}</h1>
        <p className="empty-state">No voting data yet.</p>
      </div>
    );
  }

  return (
    <div className="voting">
      <h1>Voting History — {season.name}</h1>

      {season.votingHistory.map((tc) => {
        const tribeName = tc.tid ? getTribeName(season, tc.tid) : "Merged";
        return (
          <div key={tc.tcid} className="tribal-card">
            <div className="tribal-header">
              <h3>
                Episode {tc.episode} — {tribeName} Tribal Council
              </h3>
              {tc.notes && <span className="tribal-note">{tc.notes}</span>}
            </div>

            <div className="vote-table-wrapper">
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
                        className={
                          v.voterPid === tc.eliminatedPid ? "eliminated" : ""
                        }
                      >
                        <td>
                          <div className="voter-cell">
                            <Avatar
                              name={voter?.name || "?"}
                              color={getTribeColor(season, voter?.tid)}
                              size={28}
                            />
                            {voter?.name || v.voterPid}
                          </div>
                        </td>
                        <td className="vote-target">
                          {target?.name || v.votedForPid}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="tribal-result">
              <span className="eliminated-label">Eliminated:</span>{" "}
              <strong>{getPlayerName(season, tc.eliminatedPid)}</strong>
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
        <h1>Challenges — {season.name}</h1>
        <p className="empty-state">No challenge data yet.</p>
      </div>
    );
  }

  const grouped = {};
  season.challenges.forEach((c) => {
    if (!grouped[c.episode]) grouped[c.episode] = [];
    grouped[c.episode].push(c);
  });

  return (
    <div className="challenges">
      <h1>Challenges — {season.name}</h1>

      {Object.entries(grouped).map(([ep, challenges]) => (
        <div key={ep} className="challenge-episode">
          <h3>Episode {ep}</h3>
          <div className="challenge-cards">
            {challenges.map((c) => {
              const winnerDisplay = c.winnerPid
                ? getPlayerName(season, c.winnerPid)
                : c.winnerTid
                  ? getTribeName(season, c.winnerTid)
                  : "TBD";
              return (
                <div key={c.cid} className="challenge-card">
                  <div className="challenge-type-badge">
                    {c.type === "Immunity" ? "🛡️" : "🎁"} {c.type}
                  </div>
                  <h4>{c.name}</h4>
                  <p>{c.description}</p>
                  <div className="challenge-winner">
                    <span className="winner-label">Winner:</span> {winnerDisplay}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
}

// ─── App ────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [seasonSid, setSeasonSid] = useState("s1");

  const season = SEASONS.find((s) => s.sid === seasonSid);

  return (
    <div className="app">
      <Nav
        page={page}
        setPage={setPage}
        seasonSid={seasonSid}
        setSeasonSid={setSeasonSid}
      />

      <main className="main">
        {page === "home" ? (
          <Home setPage={setPage} setSeasonSid={setSeasonSid} />
        ) : (
          <>
            <SeasonNav page={page} setPage={setPage} />
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
