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
    subtitle: "The Beginning",
    location: "The Backyard",
    filmingDates: "Summer 2024",
    days: 14,
    logoPath: "/survivor/logos/season-1.png",
    winnerPid: "s1_p01",
    runnerUpPid: "s1_p02",
    fanFavoritePid: null,

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

    episodes: [
      { eid: "s1_e01", number: 1,  title: "Episode 1" },
      { eid: "s1_e02", number: 2,  title: "Episode 2" },
      { eid: "s1_e03", number: 3,  title: "Episode 3" },
      { eid: "s1_e04", number: 4,  title: "Episode 4" },
      { eid: "s1_e05", number: 5,  title: "Episode 5" },
      { eid: "s1_e06", number: 6,  title: "The Merge" },
      { eid: "s1_e07", number: 7,  title: "Episode 7" },
      { eid: "s1_e08", number: 8,  title: "Episode 8" },
      { eid: "s1_e09", number: 9,  title: "Episode 9" },
      { eid: "s1_e10", number: 10, title: "Episode 10" },
      { eid: "s1_e11", number: 11, title: "Finale" },
    ],

    tribes: [
      { tid: "s1_t1", name: "Purple", color: "#7c3aed" },
      { tid: "s1_t2", name: "Blue",   color: "#2563eb" },
      { tid: "s1_t3", name: "Yellow", color: "#ca8a04" },
      { tid: "s1_t4", name: "Green",  color: "#16a34a" },
      { tid: "s1_t5", name: "Orange", color: "#ea580c" },
    ],

    cast: [
      { pid: "s1_p01", name: "Jace",     tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 1,  juryMember: false, votesAgainst: 2,  challengeWins: 0, daysLasted: 14 },
      { pid: "s1_p02", name: "Olivia",   tid: "s1_t1", age: 0, hometown: "", bio: "", placement: 2,  juryMember: false, votesAgainst: 3,  challengeWins: 0, daysLasted: 14 },
      { pid: "s1_p03", name: "Meredith", tid: "s1_t1", age: 0, hometown: "", bio: "", placement: 3,  juryMember: false, votesAgainst: 5,  challengeWins: 0, daysLasted: 14 },
      { pid: "s1_p04", name: "Caroline", tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 4,  juryMember: true,  votesAgainst: 1,  challengeWins: 0, daysLasted: 14 },
      { pid: "s1_p05", name: "Abdul",    tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 5,  juryMember: true,  votesAgainst: 5,  challengeWins: 0, daysLasted: 13 },
      { pid: "s1_p06", name: "Jacob",    tid: "s1_t1", age: 0, hometown: "", bio: "", placement: 6,  juryMember: true,  votesAgainst: 4,  challengeWins: 0, daysLasted: 13 },
      { pid: "s1_p07", name: "Madison",  tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 7,  juryMember: true,  votesAgainst: 7,  challengeWins: 0, daysLasted: 12 },
      { pid: "s1_p08", name: "Kelsey",   tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 8,  juryMember: true,  votesAgainst: 5,  challengeWins: 0, daysLasted: 12 },
      { pid: "s1_p09", name: "Savannah", tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 9,  juryMember: true,  votesAgainst: 8,  challengeWins: 0, daysLasted: 11 },
      { pid: "s1_p10", name: "Dom",      tid: "s1_t1", age: 0, hometown: "", bio: "", placement: 10, juryMember: true,  votesAgainst: 3,  challengeWins: 0, daysLasted: 10 },
      { pid: "s1_p11", name: "Clara",    tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 11, juryMember: true,  votesAgainst: 3,  challengeWins: 0, daysLasted: 8  },
      { pid: "s1_p12", name: "Sean",     tid: "s1_t2", age: 0, hometown: "", bio: "", placement: 12, juryMember: true,  votesAgainst: 4,  challengeWins: 0, daysLasted: 6  },
      { pid: "s1_p13", name: "Marissa",  tid: "s1_t1", age: 0, hometown: "", bio: "", placement: 13, juryMember: false, votesAgainst: 5,  challengeWins: 0, daysLasted: 4  },
      { pid: "s1_p14", name: "Sam",      tid: "s1_t1", age: 0, hometown: "", bio: "", placement: 14, juryMember: false, votesAgainst: 6,  challengeWins: 0, daysLasted: 2  },
    ],

    votingHistory: [],

    challenges: [],
  },

  // ──────────────────────────────────────────────────────────
  // SEASON 2
  // ──────────────────────────────────────────────────────────
  {
    sid: "s2",
    name: "Season 2",
    subtitle: "Unfinished Business",
    location: "The Backyard",
    filmingDates: "Summer 2025",
    days: 14,
    winnerPid: "s2_p01",
    runnerUpPid: "s2_p02",
    fanFavoritePid: "s2_p03",

    episodes: [
      { eid: "s2_e01", number: 1, title: "Premiere" },
      { eid: "s2_e02", number: 2, title: "Episode 2" },
      { eid: "s2_e03", number: 3, title: "Episode 3" },
      { eid: "s2_e04", number: 4, title: "Episode 4" },
      { eid: "s2_e05", number: 5, title: "Episode 5" },
      { eid: "s2_e06", number: 6, title: "Episode 6" },
      { eid: "s2_e07", number: 7, title: "Episode 7" },
      { eid: "s2_e08", number: 8, title: "Episode 8" },
      { eid: "s2_e09", number: 9, title: "Episode 9" },
      { eid: "s2_e10", number: 10, title: "Finale" },
    ],

    tribes: [
      { tid: "s2_t1", name: "Vets", color: "#e67e22" },
      { tid: "s2_t2", name: "Rookies", color: "#2ecc71" },
    ],

    cast: [
      { pid: "s2_p01", name: "Returnee 1",  tid: "s2_t1", age: 19, hometown: "Your City", bio: "Came back to finish the job.",              placement: 1,  juryMember: false, votesAgainst: 1,  challengeWins: 4, daysLasted: 14 },
      { pid: "s2_p02", name: "Newbie 1",     tid: "s2_t2", age: 17, hometown: "Your City", bio: "The best newcomer of the season.",          placement: 2,  juryMember: false, votesAgainst: 3,  challengeWins: 2, daysLasted: 14 },
      { pid: "s2_p03", name: "Returnee 3",   tid: "s2_t1", age: 18, hometown: "Your City", bio: "Fan favorite who played hard.",             placement: 3,  juryMember: true,  votesAgainst: 4,  challengeWins: 2, daysLasted: 12 },
      { pid: "s2_p04", name: "Newbie 2",     tid: "s2_t2", age: 16, hometown: "Your City", bio: "Scrappy underdog.",                         placement: 4,  juryMember: true,  votesAgainst: 5,  challengeWins: 1, daysLasted: 11 },
      { pid: "s2_p05", name: "Returnee 2",   tid: "s2_t1", age: 18, hometown: "Your City", bio: "Strategic mastermind.",                     placement: 5,  juryMember: true,  votesAgainst: 3,  challengeWins: 1, daysLasted: 10 },
      { pid: "s2_p06", name: "Newbie 3",     tid: "s2_t2", age: 17, hometown: "Your City", bio: "Physical beast.",                           placement: 6,  juryMember: true,  votesAgainst: 6,  challengeWins: 2, daysLasted: 9 },
      { pid: "s2_p07", name: "Returnee 4",   tid: "s2_t1", age: 17, hometown: "Your City", bio: "The social butterfly.",                     placement: 7,  juryMember: true,  votesAgainst: 5,  challengeWins: 0, daysLasted: 8 },
      { pid: "s2_p08", name: "Newbie 4",     tid: "s2_t2", age: 18, hometown: "Your City", bio: "Quiet but dangerous.",                      placement: 8,  juryMember: true,  votesAgainst: 4,  challengeWins: 1, daysLasted: 7 },
      { pid: "s2_p09", name: "Returnee 5",   tid: "s2_t1", age: 16, hometown: "Your City", bio: "Came back with a chip on their shoulder.",  placement: 9,  juryMember: true,  votesAgainst: 7,  challengeWins: 0, daysLasted: 6 },
      { pid: "s2_p10", name: "Newbie 5",     tid: "s2_t2", age: 17, hometown: "Your City", bio: "Pre-merge casualty.",                       placement: 10, juryMember: false, votesAgainst: 6,  challengeWins: 0, daysLasted: 5 },
      { pid: "s2_p11", name: "Returnee 6",   tid: "s2_t1", age: 18, hometown: "Your City", bio: "Quick exit the second time around.",        placement: 11, juryMember: false, votesAgainst: 8,  challengeWins: 0, daysLasted: 4 },
      { pid: "s2_p12", name: "Newbie 6",     tid: "s2_t2", age: 16, hometown: "Your City", bio: "Targeted early.",                           placement: 12, juryMember: false, votesAgainst: 7,  challengeWins: 0, daysLasted: 3 },
      { pid: "s2_p13", name: "Returnee 7",   tid: "s2_t1", age: 17, hometown: "Your City", bio: "Couldn't escape the target.",               placement: 13, juryMember: false, votesAgainst: 9,  challengeWins: 0, daysLasted: 2 },
      { pid: "s2_p14", name: "Newbie 7",     tid: "s2_t2", age: 18, hometown: "Your City", bio: "First one out.",                            placement: 14, juryMember: false, votesAgainst: 10, challengeWins: 0, daysLasted: 1 },
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
    subtitle: "The Outpost",
    location: "TBD",
    filmingDates: "Coming Soon",
    days: null,
    winnerPid: null,
    runnerUpPid: null,
    fanFavoritePid: null,
    episodes: [],
    tribes: [],
    cast: [],
    votingHistory: [],
    challenges: [],
  },
];
