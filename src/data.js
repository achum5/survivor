// ============================================================
// BACKYARD SURVIVOR WIKI — SEASON DATA
// ============================================================
// This is the ONLY file you need to edit to update the wiki.
// Every entity has a unique ID for relational tracking:
//   sid  = season id
//   pid  = player id
//   tid  = tribe id
//   eid  = episode id
//   cid  = challenge id
//   tcid = tribal council id
//   vid  = vote id
// Cross-references always use IDs, never raw name strings.
// ============================================================

export const SEASONS = [
  // ──────────────────────────────────────────────────────────
  // SEASON 1
  // ──────────────────────────────────────────────────────────
  {
    sid: "s1",
    name: "Season 1",
    subtitle: "",
    location: "The Backyard",
    filmingDates: "September 21, 2024",
    days: 14,
    logoPath: "/survivor/logos/season-1.png",
    castPhotoPath: "https://i.imgur.com/ASseu6A.jpeg",
    winnerPid: "s1_p01",
    runnerUpPid: "s1_p02",
    fanFavoritePid: null,
    summary: null,
    twists: [],
    // fill in when merge tribe name/color is known: { name: "TribeName", color: "#hex" }
    mergeTribe: null,

    juryVotes: [
      { jurorPid: "s1_p12", votedForPid: "s1_p01" }, // Sean → Jace
      { jurorPid: "s1_p11", votedForPid: "s1_p01" }, // Clara → Jace
      { jurorPid: "s1_p10", votedForPid: "s1_p02" }, // Dom → Olivia
      { jurorPid: "s1_p09", votedForPid: "s1_p01" }, // Savannah → Jace
      { jurorPid: "s1_p08", votedForPid: "s1_p01" }, // Kelsey → Jace
      { jurorPid: "s1_p07", votedForPid: "s1_p01" }, // Madison → Jace
      { jurorPid: "s1_p06", votedForPid: "s1_p01" }, // Jacob → Jace
      { jurorPid: "s1_p05", votedForPid: "s1_p01" }, // Abdul → Jace
      { jurorPid: "s1_p04", votedForPid: "s1_p01" }, // Caroline → Jace
    ],

    // winner field: use a pid (e.g. "s1_p01") for individual winner, tid (e.g. "s1_t1") for tribe winner
    episodes: [
      { eid: "s1_e01", number: 1,  title: "Episode 1",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e02", number: 2,  title: "Episode 2",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e03", number: 3,  title: "Episode 3",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e04", number: 4,  title: "Episode 4",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e05", number: 5,  title: "Episode 5",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e06", number: 6,  title: "The Merge",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e07", number: 7,  title: "Episode 7",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e08", number: 8,  title: "Episode 8",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e09", number: 9,  title: "Episode 9",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e10", number: 10, title: "Episode 10", videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s1_e11", number: 11, title: "Finale",     videoUrl: null,
        images: [
          { url: "https://i.imgur.com/SVUjVa1.jpeg", caption: "Final votes" },
          { url: "https://i.imgur.com/rlw6ktU.jpeg", caption: "Jace wins Season 1" },
        ],
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
    ],

    tribes: [
      { tid: "s1_t1", name: "Purple", color: "#7c3aed", phase: "original" },
      { tid: "s1_t2", name: "Blue",   color: "#2563eb", phase: "original" },
      { tid: "s1_t3", name: "Yellow", color: "#ca8a04", phase: "switched" },
      { tid: "s1_t4", name: "Green",  color: "#16a34a", phase: "switched" },
      { tid: "s1_t5", name: "Orange", color: "#ea580c", phase: "switched" },
    ],

    cast: [
      // tid = original tribe | switchedTid = switched tribe (null if voted out before switch)
      // merged = true if they made the merged phase
      { pid: "s1_p01", name: "Jace",     tid: "s1_t2", placement: 1,  juryMember: false, votesAgainst: 2,  switchedTid: "s1_t3", merged: true  },
      { pid: "s1_p02", name: "Olivia",   tid: "s1_t1", placement: 2,  juryMember: false, votesAgainst: 3,  switchedTid: "s1_t3", merged: true  },
      { pid: "s1_p03", name: "Meredith", tid: "s1_t1", placement: 3,  juryMember: false, votesAgainst: 5,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p04", name: "Caroline", tid: "s1_t2", placement: 4,  juryMember: true,  votesAgainst: 1,  switchedTid: "s1_t4", merged: true  },
      { pid: "s1_p05", name: "Abdul",    tid: "s1_t2", placement: 5,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t4", merged: true  },
      { pid: "s1_p06", name: "Jacob",    tid: "s1_t1", placement: 6,  juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p07", name: "Madison",  tid: "s1_t2", placement: 7,  juryMember: true,  votesAgainst: 7,  switchedTid: "s1_t3", merged: true  },
      { pid: "s1_p08", name: "Kelsey",   tid: "s1_t2", placement: 8,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p09", name: "Savannah", tid: "s1_t2", placement: 9,  juryMember: true,  votesAgainst: 8,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p10", name: "Dom",      tid: "s1_t1", placement: 10, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false },
      { pid: "s1_p11", name: "Clara",    tid: "s1_t2", placement: 11, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false },
      { pid: "s1_p12", name: "Sean",     tid: "s1_t2", placement: 12, juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t3", merged: false },
      { pid: "s1_p13", name: "Marissa",  tid: "s1_t1", placement: 13, juryMember: false, votesAgainst: 5,  switchedTid: null,    merged: false },
      { pid: "s1_p14", name: "Sam",      tid: "s1_t1", placement: 14, juryMember: false, votesAgainst: 6,  switchedTid: null,    merged: false },
    ],

    votingHistory: [
      // ── TC 1: Sam eliminated (6-1) — Purple tribe ──────────────────
      {
        tcid: "s1_tc01", eid: "s1_e01", episode: 1, tid: "s1_t1", notes: "",
        eliminatedPid: "s1_p14",
        votes: [
          { vid: "s1_tc01_v1", voterPid: "s1_p02", votedForPid: "s1_p14" }, // Olivia → Sam
          { vid: "s1_tc01_v2", voterPid: "s1_p03", votedForPid: "s1_p14" }, // Meredith → Sam
          { vid: "s1_tc01_v3", voterPid: "s1_p06", votedForPid: "s1_p14" }, // Jacob → Sam
          { vid: "s1_tc01_v4", voterPid: "s1_p07", votedForPid: "s1_p14" }, // Madison → Sam
          { vid: "s1_tc01_v5", voterPid: "s1_p10", votedForPid: "s1_p14" }, // Dom → Sam
          { vid: "s1_tc01_v6", voterPid: "s1_p13", votedForPid: "s1_p14" }, // Marissa → Sam
          { vid: "s1_tc01_v7", voterPid: "s1_p14", votedForPid: "s1_p03" }, // Sam → Meredith
        ],
      },
      // ── TC 2: Marissa eliminated (5-1) — Purple tribe ──────────────
      {
        tcid: "s1_tc02", eid: "s1_e02", episode: 2, tid: "s1_t1", notes: "",
        eliminatedPid: "s1_p13",
        votes: [
          { vid: "s1_tc02_v1", voterPid: "s1_p02", votedForPid: "s1_p13" }, // Olivia → Marissa
          { vid: "s1_tc02_v2", voterPid: "s1_p03", votedForPid: "s1_p13" }, // Meredith → Marissa
          { vid: "s1_tc02_v3", voterPid: "s1_p06", votedForPid: "s1_p13" }, // Jacob → Marissa
          { vid: "s1_tc02_v4", voterPid: "s1_p07", votedForPid: "s1_p13" }, // Madison → Marissa
          { vid: "s1_tc02_v5", voterPid: "s1_p10", votedForPid: "s1_p13" }, // Dom → Marissa
          { vid: "s1_tc02_v6", voterPid: "s1_p13", votedForPid: "s1_p02" }, // Marissa → Olivia
        ],
      },
      // ── TC 3a: Tie vote (2-2) — Yellow switched tribe ──────────────
      {
        tcid: "s1_tc03a", eid: "s1_e03", episode: 3, tid: "s1_t3", notes: "Tie vote",
        eliminatedPid: null,
        votes: [
          { vid: "s1_tc03a_v1", voterPid: "s1_p01", votedForPid: "s1_p07" }, // Jace → Madison
          { vid: "s1_tc03a_v2", voterPid: "s1_p02", votedForPid: "s1_p12" }, // Olivia → Sean
          { vid: "s1_tc03a_v3", voterPid: "s1_p07", votedForPid: "s1_p12" }, // Madison → Sean
          { vid: "s1_tc03a_v4", voterPid: "s1_p12", votedForPid: "s1_p07" }, // Sean → Madison
        ],
      },
      // ── TC 3b: Revote — Sean eliminated (2-0) ──────────────────────
      {
        tcid: "s1_tc03b", eid: "s1_e03", episode: 3, tid: "s1_t3", notes: "Revote",
        eliminatedPid: "s1_p12",
        votes: [
          { vid: "s1_tc03b_v1", voterPid: "s1_p01", votedForPid: "s1_p12" }, // Jace → Sean
          { vid: "s1_tc03b_v2", voterPid: "s1_p02", votedForPid: "s1_p12" }, // Olivia → Sean
        ],
      },
      // ── TC 4: Clara eliminated (3-1) — Green switched tribe ────────
      {
        tcid: "s1_tc04", eid: "s1_e04", episode: 4, tid: "s1_t4", notes: "",
        eliminatedPid: "s1_p11",
        votes: [
          { vid: "s1_tc04_v1", voterPid: "s1_p04", votedForPid: "s1_p11" }, // Caroline → Clara
          { vid: "s1_tc04_v2", voterPid: "s1_p05", votedForPid: "s1_p11" }, // Abdul → Clara
          { vid: "s1_tc04_v3", voterPid: "s1_p10", votedForPid: "s1_p11" }, // Dom → Clara
          { vid: "s1_tc04_v4", voterPid: "s1_p11", votedForPid: "s1_p10" }, // Clara → Dom
        ],
      },
      // ── TC 5: Dom eliminated (2-1) — Green switched tribe ──────────
      {
        tcid: "s1_tc05", eid: "s1_e05", episode: 5, tid: "s1_t4", notes: "",
        eliminatedPid: "s1_p10",
        votes: [
          { vid: "s1_tc05_v1", voterPid: "s1_p04", votedForPid: "s1_p10" }, // Caroline → Dom
          { vid: "s1_tc05_v2", voterPid: "s1_p05", votedForPid: "s1_p10" }, // Abdul → Dom
          { vid: "s1_tc05_v3", voterPid: "s1_p10", votedForPid: "s1_p04" }, // Dom → Caroline
        ],
      },
      // ── TC 6: Savannah eliminated (8-1) — Merge ────────────────────
      {
        tcid: "s1_tc06", eid: "s1_e06", episode: 6, tid: null, notes: "",
        eliminatedPid: "s1_p09",
        votes: [
          { vid: "s1_tc06_v1", voterPid: "s1_p01", votedForPid: "s1_p09" }, // Jace → Savannah
          { vid: "s1_tc06_v2", voterPid: "s1_p02", votedForPid: "s1_p09" }, // Olivia → Savannah
          { vid: "s1_tc06_v3", voterPid: "s1_p03", votedForPid: "s1_p09" }, // Meredith → Savannah
          { vid: "s1_tc06_v4", voterPid: "s1_p04", votedForPid: "s1_p09" }, // Caroline → Savannah
          { vid: "s1_tc06_v5", voterPid: "s1_p05", votedForPid: "s1_p09" }, // Abdul → Savannah
          { vid: "s1_tc06_v6", voterPid: "s1_p06", votedForPid: "s1_p09" }, // Jacob → Savannah
          { vid: "s1_tc06_v7", voterPid: "s1_p07", votedForPid: "s1_p09" }, // Madison → Savannah
          { vid: "s1_tc06_v8", voterPid: "s1_p08", votedForPid: "s1_p09" }, // Kelsey → Savannah
          { vid: "s1_tc06_v9", voterPid: "s1_p09", votedForPid: "s1_p03" }, // Savannah → Meredith
        ],
      },
      // ── TC 7: Kelsey eliminated (5-3) — Merge ──────────────────────
      {
        tcid: "s1_tc07", eid: "s1_e07", episode: 7, tid: null, notes: "",
        eliminatedPid: "s1_p08",
        votes: [
          { vid: "s1_tc07_v1", voterPid: "s1_p01", votedForPid: "s1_p08" }, // Jace → Kelsey
          { vid: "s1_tc07_v2", voterPid: "s1_p02", votedForPid: "s1_p08" }, // Olivia → Kelsey
          { vid: "s1_tc07_v3", voterPid: "s1_p03", votedForPid: "s1_p08" }, // Meredith → Kelsey
          { vid: "s1_tc07_v4", voterPid: "s1_p06", votedForPid: "s1_p08" }, // Jacob → Kelsey
          { vid: "s1_tc07_v5", voterPid: "s1_p07", votedForPid: "s1_p08" }, // Madison → Kelsey
          { vid: "s1_tc07_v6", voterPid: "s1_p04", votedForPid: "s1_p03" }, // Caroline → Meredith
          { vid: "s1_tc07_v7", voterPid: "s1_p05", votedForPid: "s1_p03" }, // Abdul → Meredith
          { vid: "s1_tc07_v8", voterPid: "s1_p08", votedForPid: "s1_p03" }, // Kelsey → Meredith
        ],
      },
      // ── TC 8: Madison eliminated (5-2) — Merge ─────────────────────
      {
        tcid: "s1_tc08", eid: "s1_e08", episode: 8, tid: null, notes: "",
        eliminatedPid: "s1_p07",
        votes: [
          { vid: "s1_tc08_v1", voterPid: "s1_p02", votedForPid: "s1_p07" }, // Olivia → Madison
          { vid: "s1_tc08_v2", voterPid: "s1_p03", votedForPid: "s1_p07" }, // Meredith → Madison
          { vid: "s1_tc08_v3", voterPid: "s1_p04", votedForPid: "s1_p07" }, // Caroline → Madison
          { vid: "s1_tc08_v4", voterPid: "s1_p05", votedForPid: "s1_p07" }, // Abdul → Madison
          { vid: "s1_tc08_v5", voterPid: "s1_p06", votedForPid: "s1_p07" }, // Jacob → Madison
          { vid: "s1_tc08_v6", voterPid: "s1_p01", votedForPid: "s1_p05" }, // Jace → Abdul
          { vid: "s1_tc08_v7", voterPid: "s1_p07", votedForPid: "s1_p05" }, // Madison → Abdul
        ],
      },
      // ── TC 9: Jacob eliminated (4-2) — Merge ───────────────────────
      {
        tcid: "s1_tc09", eid: "s1_e09", episode: 9, tid: null, notes: "",
        eliminatedPid: "s1_p06",
        votes: [
          { vid: "s1_tc09_v1", voterPid: "s1_p01", votedForPid: "s1_p06" }, // Jace → Jacob
          { vid: "s1_tc09_v2", voterPid: "s1_p02", votedForPid: "s1_p06" }, // Olivia → Jacob
          { vid: "s1_tc09_v3", voterPid: "s1_p03", votedForPid: "s1_p06" }, // Meredith → Jacob
          { vid: "s1_tc09_v4", voterPid: "s1_p05", votedForPid: "s1_p06" }, // Abdul → Jacob
          { vid: "s1_tc09_v5", voterPid: "s1_p04", votedForPid: "s1_p01" }, // Caroline → Jace
          { vid: "s1_tc09_v6", voterPid: "s1_p06", votedForPid: "s1_p01" }, // Jacob → Jace
        ],
      },
      // ── TC 10: Abdul eliminated (3-2) — Merge ──────────────────────
      {
        tcid: "s1_tc10", eid: "s1_e10", episode: 10, tid: null, notes: "",
        eliminatedPid: "s1_p05",
        votes: [
          { vid: "s1_tc10_v1", voterPid: "s1_p02", votedForPid: "s1_p05" }, // Olivia → Abdul
          { vid: "s1_tc10_v2", voterPid: "s1_p03", votedForPid: "s1_p05" }, // Meredith → Abdul
          { vid: "s1_tc10_v3", voterPid: "s1_p04", votedForPid: "s1_p05" }, // Caroline → Abdul
          { vid: "s1_tc10_v4", voterPid: "s1_p01", votedForPid: "s1_p02" }, // Jace → Olivia
          { vid: "s1_tc10_v5", voterPid: "s1_p05", votedForPid: "s1_p02" }, // Abdul → Olivia
        ],
      },
      // ── TC 11: Caroline — eliminated, no vote ──────────────────────
      {
        tcid: "s1_tc11", eid: "s1_e11", episode: 11, tid: null, notes: "No vote — eliminated",
        eliminatedPid: "s1_p04",
        votes: [],
      },
    ],

    challenges: [],
  },

  // ──────────────────────────────────────────────────────────
  // SEASON 2
  // ──────────────────────────────────────────────────────────
  {
    sid: "s2",
    name: "Season 2",
    subtitle: "",
    location: "The Backyard",
    filmingDates: "May 17–18, 2025",
    days: 14,
    winnerPid: "s2_p01",
    runnerUpPid: "s2_p02",
    fanFavoritePid: "s2_p03",
    logoPath: "/survivor/logos/season-2.png",
    castPhotoPath: null,
    summary: null,
    twists: [],
    mergeTribe: null,
    juryVotes: [],

    episodes: [
      { eid: "s2_e01", number: 1,  title: "Premiere",   videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e02", number: 2,  title: "Episode 2",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e03", number: 3,  title: "Episode 3",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e04", number: 4,  title: "Episode 4",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e05", number: 5,  title: "Episode 5",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e06", number: 6,  title: "Episode 6",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e07", number: 7,  title: "Episode 7",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e08", number: 8,  title: "Episode 8",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e09", number: 9,  title: "Episode 9",  videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
      { eid: "s2_e10", number: 10, title: "Finale",     videoUrl: null,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
    ],

    tribes: [
      { tid: "s2_t1", name: "Vets", color: "#e67e22" },
      { tid: "s2_t2", name: "Rookies", color: "#2ecc71" },
    ],

    cast: [
      // switchedTid/merged left null/false until S2 data is entered
      { pid: "s2_p01", name: "Returnee 1",  tid: "s2_t1", placement: 1,  juryMember: false, votesAgainst: 1,  switchedTid: null, merged: false },
      { pid: "s2_p02", name: "Newbie 1",    tid: "s2_t2", placement: 2,  juryMember: false, votesAgainst: 3,  switchedTid: null, merged: false },
      { pid: "s2_p03", name: "Returnee 3",  tid: "s2_t1", placement: 3,  juryMember: true,  votesAgainst: 4,  switchedTid: null, merged: false },
      { pid: "s2_p04", name: "Newbie 2",    tid: "s2_t2", placement: 4,  juryMember: true,  votesAgainst: 5,  switchedTid: null, merged: false },
      { pid: "s2_p05", name: "Returnee 2",  tid: "s2_t1", placement: 5,  juryMember: true,  votesAgainst: 3,  switchedTid: null, merged: false },
      { pid: "s2_p06", name: "Newbie 3",    tid: "s2_t2", placement: 6,  juryMember: true,  votesAgainst: 6,  switchedTid: null, merged: false },
      { pid: "s2_p07", name: "Returnee 4",  tid: "s2_t1", placement: 7,  juryMember: true,  votesAgainst: 5,  switchedTid: null, merged: false },
      { pid: "s2_p08", name: "Newbie 4",    tid: "s2_t2", placement: 8,  juryMember: true,  votesAgainst: 4,  switchedTid: null, merged: false },
      { pid: "s2_p09", name: "Returnee 5",  tid: "s2_t1", placement: 9,  juryMember: true,  votesAgainst: 7,  switchedTid: null, merged: false },
      { pid: "s2_p10", name: "Newbie 5",    tid: "s2_t2", placement: 10, juryMember: false, votesAgainst: 6,  switchedTid: null, merged: false },
      { pid: "s2_p11", name: "Returnee 6",  tid: "s2_t1", placement: 11, juryMember: false, votesAgainst: 8,  switchedTid: null, merged: false },
      { pid: "s2_p12", name: "Newbie 6",    tid: "s2_t2", placement: 12, juryMember: false, votesAgainst: 7,  switchedTid: null, merged: false },
      { pid: "s2_p13", name: "Returnee 7",  tid: "s2_t1", placement: 13, juryMember: false, votesAgainst: 9,  switchedTid: null, merged: false },
      { pid: "s2_p14", name: "Newbie 7",    tid: "s2_t2", placement: 14, juryMember: false, votesAgainst: 10, switchedTid: null, merged: false },
    ],

    votingHistory: [
      {
        tcid: "s2_tc01", eid: "s2_e01", episode: 1, tid: "s2_t2", notes: "",
        votes: [
          { vid: "s2_tc01_v01", voterPid: "s2_p14", votedForPid: "s2_p06" },
          { vid: "s2_tc01_v02", voterPid: "s2_p12", votedForPid: "s2_p14" },
          { vid: "s2_tc01_v03", voterPid: "s2_p10", votedForPid: "s2_p14" },
          { vid: "s2_tc01_v04", voterPid: "s2_p08", votedForPid: "s2_p14" },
          { vid: "s2_tc01_v05", voterPid: "s2_p06", votedForPid: "s2_p14" },
          { vid: "s2_tc01_v06", voterPid: "s2_p04", votedForPid: "s2_p14" },
          { vid: "s2_tc01_v07", voterPid: "s2_p02", votedForPid: "s2_p14" },
        ],
        eliminatedPid: "s2_p14",
      },
      {
        tcid: "s2_tc02", eid: "s2_e02", episode: 2, tid: "s2_t1", notes: "",
        votes: [
          { vid: "s2_tc02_v01", voterPid: "s2_p13", votedForPid: "s2_p05" },
          { vid: "s2_tc02_v02", voterPid: "s2_p11", votedForPid: "s2_p13" },
          { vid: "s2_tc02_v03", voterPid: "s2_p09", votedForPid: "s2_p13" },
          { vid: "s2_tc02_v04", voterPid: "s2_p07", votedForPid: "s2_p13" },
          { vid: "s2_tc02_v05", voterPid: "s2_p05", votedForPid: "s2_p13" },
          { vid: "s2_tc02_v06", voterPid: "s2_p03", votedForPid: "s2_p13" },
          { vid: "s2_tc02_v07", voterPid: "s2_p01", votedForPid: "s2_p13" },
        ],
        eliminatedPid: "s2_p13",
      },
    ],

    challenges: [
      { cid: "s2_c01", eid: "s2_e01", episode: 1, type: "Reward",   name: "Opening Sprint", description: "Sprint relay with puzzle finish.",  winnerTid: "s2_t1", winnerPid: null },
      { cid: "s2_c02", eid: "s2_e01", episode: 1, type: "Immunity",  name: "Tower Build",    description: "Build the tallest block tower.",    winnerTid: "s2_t1", winnerPid: null },
      { cid: "s2_c03", eid: "s2_e02", episode: 2, type: "Immunity",  name: "Tug of War",     description: "Classic tug of war.",               winnerTid: "s2_t2", winnerPid: null },
    ],
  },

  // ──────────────────────────────────────────────────────────
  // SEASON 3
  // ──────────────────────────────────────────────────────────
  {
    sid: "s3",
    name: "Season 3",
    subtitle: "",
    location: "TBD",
    filmingDates: "May 16–17, 2026",
    days: null,
    winnerPid: null,
    runnerUpPid: null,
    fanFavoritePid: null,
    logoPath: "/survivor/logos/season-3.png",
    castPhotoPath: null,
    summary: null,
    twists: [],
    mergeTribe: null,
    juryVotes: [],
    episodes: [],
    tribes: [],
    cast: [],
    votingHistory: [],
    challenges: [],
  },
];
