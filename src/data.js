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
    logoPath: "/logos/season-1.png",
    castPhotoPath: "https://i.imgur.com/ASseu6A.jpeg",
    winnerPid: "s1_p01",
    runnerUpPid: "s1_p02",
    secondRunnerUpPid: "s1_p03",
    fanFavoritePid: null,
    summary: null,
    twists: [],
    mergeTribe: { tid: "s1_merged", name: "Merged", color: "#4caf50" },

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

    // Challenge fields:
    //   type: "Reward" | "Immunity" | "Reward/Immunity"
    //   winner: pid or tid
    //   results: [{ id: tid_or_pid, place: 1 }, ...] — 1 = best
    //   sitOuts: [pid, ...] — players who sat out
    episodes: [
      { eid: "s1_e01", number: 1,  title: "Episode 1",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=6", videoEndTime: 92,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, type: "Immunity", description: "Alex forgot to record the challenge. He now cannot remember what the challenge was. What a dummy.", winner: "s1_t2",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t1", place: 2 }], sitOuts: [] } },
      { eid: "s1_e02", number: 2,  title: "Episode 2",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=143", videoEndTime: 508,
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Nothing But Net", type: "Immunity", description: "A basketball free throw shooting competition. Dom missed the final shot, costing Purple the win.", winner: "s1_t2",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t1", place: 2 }], sitOuts: ["s1_p09"] } },
      { eid: "s1_e03", number: 3,  title: "Episode 3",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=852",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Word Scramble", type: "Immunity", description: "Each tribe received a sheet of paper and had 3 minutes to write down as many valid words (3+ letters) as they could form from the letters in the word \"CHALLENGE\". Words were scored against a pre-made Scrabble-valid answer key, and teams graded each other's lists. Most valid words won immunity; the two lowest-scoring tribes went to tribal council. One player was caught writing after time was called and received a −1 penalty.", winner: "s1_t2",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t3", place: 2 }, { id: "s1_t4", place: 3 }], sitOuts: [] } },
      { eid: "s1_e04", number: 4,  title: "Episode 4",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=2361",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Puzzle", type: "Immunity", description: null, winner: "s1_t3", videoTimestamp: 2361,
          results: [{ id: "s1_t3", place: 1 }, { id: "s1_t5", place: 2 }, { id: "s1_t4", place: 3 }], sitOuts: [] } },
      { eid: "s1_e05", number: 5,  title: "The Merge",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=2850",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Block Count", type: "Immunity", description: "Castaways guessed the number of blocks in a tub. Madison and Jace both guessed the exact same distance away, forcing a tiebreaker rock draw — Jace won immunity.", winner: "s1_p01", videoTimestamp: 2958 } },
      { eid: "s1_e06", number: 6,  title: "Episode 6",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=3650",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Paper Airplane Toss", type: "Immunity", description: "Challenge was not recorded. Abdul won immunity.", winner: "s1_p05" } },
      { eid: "s1_e07", number: 7,  title: "Episode 7",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=3987",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Spelling Bee", type: "Immunity", description: "Castaways competed in a spelling bee. Jace won immunity by correctly spelling \"emphasize\".", winner: "s1_p01", videoTimestamp: 3987 } },
      { eid: "s1_e08", number: 8,  title: "Episode 8",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=4957",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Block Balance", type: "Immunity", description: "Castaways stood on one foot while holding blocks pinched between their index fingers. At set intervals, more blocks were added to increase difficulty. Abdul won immunity in a long final showdown against Meredith.", winner: "s1_p05", videoTimestamp: 4957 } },
      { eid: "s1_e09", number: 9,  title: "Episode 9",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=6031",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Kentucky Derby", type: "Immunity", description: "Three-stage challenge. Stage 1: Golf Ball Relay — players ran back and forth collecting golf balls one at a time into a bag (10 trips). Stage 2: Knot Untying — untie all knots from a rope to free a ball (11th ball). Stage 3: Word Scramble — unscramble letters to form two words. The only clue: \"It's two words, something we all celebrate, has nothing to do with Survivor.\" The answer was Kentucky Derby. Meredith solved it first, guaranteeing her a spot in the final four.", winner: "s1_p03", videoTimestamp: 6031 } },
      { eid: "s1_e10", number: 10, title: "Episode 10", videoUrl: "https://youtu.be/qPJoYyABYHE?t=6797",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Images Under Cups", description: "Memory game — players called out numbered cups to be turned over, trying to find matching pairs of images underneath.", winner: "s1_p02", videoTimestamp: 6797 } },
      { eid: "s1_e11", number: 11, title: "Finale",     videoUrl: "https://youtu.be/qPJoYyABYHE?t=8206",
        images: [
          { url: "https://i.imgur.com/SVUjVa1.jpeg", caption: "Final votes" },
          { url: "https://i.imgur.com/rlw6ktU.jpeg", caption: "Jace wins Season 1" },
        ],
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: null, description: null, winner: null } },
    ],

    tribes: [
      { tid: "s1_t1", name: "Purple", color: "#7c3aed", phase: "original" },
      { tid: "s1_t2", name: "Red",    color: "#dc2626", phase: "original" },
      { tid: "s1_t3", name: "Blue",   color: "#2563eb", phase: "switched" },
      { tid: "s1_t4", name: "Yellow", color: "#facc15", phase: "switched" },
      { tid: "s1_t5", name: "Orange", color: "#ea580c", phase: "switched" },
    ],

    cast: [
      // tid = original tribe | switchedTid = switched tribe (null if voted out before switch)
      // merged = true if they made the merged phase
      // photoStyle: optional CSS overrides for photo crop/position. Examples:
      //   photoStyle: { objectPosition: "center 20%" }           ← shift crop up/down
      //   photoStyle: { objectPosition: "50% 10%", scale: 1.3 }  ← zoom in + shift
      { pid: "s1_p01", name: "Jace",     photoUrl: "https://i.imgur.com/ZOAlfmU.png", photoStyle: { objectPosition: "67% 5%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "280px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 1,  juryMember: false, votesAgainst: 2,  switchedTid: "s1_t3", merged: true  },
      { pid: "s1_p02", name: "Olivia",   photoUrl: "https://i.imgur.com/v15gL2S.png", portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 2,  juryMember: false, votesAgainst: 3,  switchedTid: "s1_t3", merged: true  },
      { pid: "s1_p03", name: "Meredith", photoUrl: "https://i.imgur.com/47WJZvC.png", photoStyle: { objectPosition: "50% -63%", transform: "scale(1.55)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%", transformOrigin: "47% 50%", transform: "scale(1.15)" }, tid: "s1_t1", placement: 3,  juryMember: false, votesAgainst: 5,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p04", name: "Caroline", photoUrl: "https://i.imgur.com/Pq42UDY.png", photoStyle: { objectPosition: "50% -183%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 4,  juryMember: true,  votesAgainst: 1,  switchedTid: "s1_t4", merged: true  },
      { pid: "s1_p05", name: "Abdul",    photoUrl: "https://i.imgur.com/O18he6C.png", photoStyle: { objectPosition: "50% -91%", transformOrigin: "66% 50%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 5,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t4", merged: true  },
      { pid: "s1_p06", name: "Jacob",    photoUrl: "https://i.imgur.com/IKBqmSa.png", photoStyle: { objectPosition: "50% -162%", transformOrigin: "49% 50%", transform: "scale(1.70)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 6,  juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p07", name: "Madison",  photoUrl: "https://i.imgur.com/VBmfwXj.png", photoStyle: { objectPosition: "50% -73%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 7,  juryMember: true,  votesAgainst: 7,  switchedTid: "s1_t3", merged: true  },
      { pid: "s1_p08", name: "Kelsey",   photoUrl: "https://i.imgur.com/vb5oY6d.png", photoStyle: { objectPosition: "50% -11%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 8,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p09", name: "Savannah", photoUrl: "https://i.imgur.com/s9JnOdy.png", photoStyle: { objectPosition: "50% -22%", transformOrigin: "22% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 9,  juryMember: true,  votesAgainst: 8,  switchedTid: "s1_t5", merged: true  },
      { pid: "s1_p10", name: "Dom",      photoUrl: "https://i.imgur.com/SahJ0Ot.png", photoStyle: { objectPosition: "50% -24%", transformOrigin: "75% 50%", transform: "scale(1.40)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 10, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false },
      { pid: "s1_p11", name: "Clara",    photoUrl: "https://i.imgur.com/J7GuBMh.png", photoStyle: { objectPosition: "50% -4%", transformOrigin: "72% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 11, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false },
      { pid: "s1_p12", name: "Sean",     photoUrl: "https://i.imgur.com/VjBqAOH.png", photoStyle: { objectPosition: "50% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s1_t2", placement: 12, juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t3", merged: false },
      { pid: "s1_p13", name: "Marissa",  photoUrl: "https://i.imgur.com/m4L09S2.png", photoStyle: { objectPosition: "50% -4%", transformOrigin: "17% 50%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 6%" }, tid: "s1_t1", placement: 13, juryMember: false, votesAgainst: 5,  switchedTid: null,    merged: false },
      { pid: "s1_p14", name: "Sam R.",   photoUrl: "https://i.imgur.com/HfnY3vo.jpeg",photoStyle: { objectPosition: "50% -10%", transform: "scale(1.20)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 14, juryMember: false, votesAgainst: 6,  switchedTid: null,    merged: false },
    ],

    votingHistory: [
      // ── TC 1: Sam eliminated (6-1) — Purple tribe ──────────────────
      {
        tcid: "s1_tc01", eid: "s1_e01", episode: 1, tid: "s1_t1", notes: "", confessionalTimestamp: 65,
        confessionalQuote: "Pretty rough, yeah. First one eliminated, kind of tough, but it happened. Kind of broke off into groups, four and three. I knew as soon as I went into group three I was going to be one of the people talked about. Knew right away they had the majority, didn't really have a shot. Then we switched up and I only got to talk to like four out of the three, so I just knew it wasn't meant to be.",
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
        tcid: "s1_tc02", eid: "s1_e02", episode: 2, tid: "s1_t1", notes: "", videoTimestamp: 509,
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
      // ── TC 3a: Tie vote (2-2) — Blue switched tribe — Ep3 tribal 1 ─
      // Olivia played a hidden immunity idol on herself (no votes cast against her).
      // Boys voted Madison; Girls voted Sean → 2-2 tie.
      // Video: https://youtu.be/qPJoYyABYHE?t=1504
      {
        tcid: "s1_tc03a", eid: "s1_e03", episode: 3, tid: "s1_t3", videoTimestamp: 1504,
        notes: "Tie vote (2-2). Olivia played a hidden immunity idol on herself; no votes were cast against her so none were nullified. Boys voted Madison; Girls voted Sean.",
        eliminatedPid: null,
        votes: [
          { vid: "s1_tc03a_v1", voterPid: "s1_p01", votedForPid: "s1_p07" }, // Jace → Madison
          { vid: "s1_tc03a_v2", voterPid: "s1_p02", votedForPid: "s1_p12" }, // Olivia → Sean
          { vid: "s1_tc03a_v3", voterPid: "s1_p07", votedForPid: "s1_p12" }, // Madison → Sean
          { vid: "s1_tc03a_v4", voterPid: "s1_p12", votedForPid: "s1_p07" }, // Sean → Madison
        ],
      },
      // ── TC 3b: Revote — Sean eliminated (2-0) — Blue, Ep3 tribal 1 ─
      // Madison and Sean were immune on the revote. With Olivia idol-protected,
      // Jace was the only eligible rocks candidate — forcing his vote to Sean.
      {
        tcid: "s1_tc03b", eid: "s1_e03", episode: 3, tid: "s1_t3", confessionalTimestamp: 2298,
        confessionalQuote: "Feeling good. I mean, we threw votes on Olivia at first and we had to switch because we found out she was playing an idol. But got voted out, so... Jace didn't have to go home, so feeling good. Hopefully he can pull it out and we're ready to go. Yeah, tough way to go. It sucks but get to go home, get to get my phone, watch cats play.",
        notes: "Revote. Madison and Sean were immune as the tied players. Olivia was idol-protected, making Jace the sole eligible rocks candidate — forcing him to flip and vote Sean.",
        eliminatedPid: "s1_p12",
        votes: [
          { vid: "s1_tc03b_v1", voterPid: "s1_p01", votedForPid: "s1_p12" }, // Jace → Sean
          { vid: "s1_tc03b_v2", voterPid: "s1_p02", votedForPid: "s1_p12" }, // Olivia → Sean
        ],
      },
      // ── TC 3c: Clara eliminated (3-1) — Yellow switched tribe — Ep3 tribal 2 ─
      // Video: https://youtu.be/qPJoYyABYHE?t=2319
      {
        tcid: "s1_tc03c", eid: "s1_e03", episode: 3, tid: "s1_t4", videoTimestamp: 2319, notes: "",
        eliminatedPid: "s1_p11",
        votes: [
          { vid: "s1_tc03c_v1", voterPid: "s1_p04", votedForPid: "s1_p11" }, // Caroline → Clara
          { vid: "s1_tc03c_v2", voterPid: "s1_p05", votedForPid: "s1_p11" }, // Abdul → Clara
          { vid: "s1_tc03c_v3", voterPid: "s1_p10", votedForPid: "s1_p11" }, // Dom → Clara
          { vid: "s1_tc03c_v4", voterPid: "s1_p11", votedForPid: "s1_p10" }, // Clara → Dom
        ],
      },
      // ── TC 4: Dom eliminated (2-1) — Yellow switched tribe ─────────
      {
        tcid: "s1_tc04", eid: "s1_e04", episode: 4, tid: "s1_t4", videoTimestamp: 2776, confessionalTimestamp: 2839, notes: "",
        confessionalQuote: "Feeling all right. I thought I had a chance. Tried very last second to get one of them to switch but they told me it was going to be me. And this is my fourth Council and it was a good time, a lot of fun.",
        eliminatedPid: "s1_p10",
        votes: [
          { vid: "s1_tc04_v1", voterPid: "s1_p04", votedForPid: "s1_p10" }, // Caroline → Dom
          { vid: "s1_tc04_v2", voterPid: "s1_p05", votedForPid: "s1_p10" }, // Abdul → Dom
          { vid: "s1_tc04_v3", voterPid: "s1_p10", votedForPid: "s1_p04" }, // Dom → Caroline
        ],
      },
      // ── TC 5: Savannah eliminated (8-1) — Merge ────────────────────
      {
        tcid: "s1_tc05", eid: "s1_e05", episode: 5, tid: null, videoTimestamp: 3553, notes: "",
        eliminatedPid: "s1_p09",
        votes: [
          { vid: "s1_tc05_v1", voterPid: "s1_p01", votedForPid: "s1_p09" }, // Jace → Savannah
          { vid: "s1_tc05_v2", voterPid: "s1_p02", votedForPid: "s1_p09" }, // Olivia → Savannah
          { vid: "s1_tc05_v3", voterPid: "s1_p03", votedForPid: "s1_p09" }, // Meredith → Savannah
          { vid: "s1_tc05_v4", voterPid: "s1_p04", votedForPid: "s1_p09" }, // Caroline → Savannah
          { vid: "s1_tc05_v5", voterPid: "s1_p05", votedForPid: "s1_p09" }, // Abdul → Savannah
          { vid: "s1_tc05_v6", voterPid: "s1_p06", votedForPid: "s1_p09" }, // Jacob → Savannah
          { vid: "s1_tc05_v7", voterPid: "s1_p07", votedForPid: "s1_p09" }, // Madison → Savannah
          { vid: "s1_tc05_v8", voterPid: "s1_p08", votedForPid: "s1_p09" }, // Kelsey → Savannah
          { vid: "s1_tc05_v9", voterPid: "s1_p09", votedForPid: "s1_p03" }, // Savannah → Meredith
        ],
      },
      // ── TC 6: Kelsey eliminated (5-3) — Merge ──────────────────────
      {
        tcid: "s1_tc06", eid: "s1_e06", episode: 6, tid: null, videoTimestamp: 3663, confessionalTimestamp: 3788, notes: "",
        confessionalQuote: "Betrayed. I was definitely lied to. I think that maybe Jacob lied to me, Meredith definitely lied to me, Madison lied to me. Yeah, never get too comfortable because I thought I had a pretty good alliance and it did not work. So that's kind of all I have to say.",
        eliminatedPid: "s1_p08",
        votes: [
          { vid: "s1_tc06_v1", voterPid: "s1_p01", votedForPid: "s1_p08" }, // Jace → Kelsey
          { vid: "s1_tc06_v2", voterPid: "s1_p02", votedForPid: "s1_p08" }, // Olivia → Kelsey
          { vid: "s1_tc06_v3", voterPid: "s1_p03", votedForPid: "s1_p08" }, // Meredith → Kelsey
          { vid: "s1_tc06_v4", voterPid: "s1_p06", votedForPid: "s1_p08" }, // Jacob → Kelsey
          { vid: "s1_tc06_v5", voterPid: "s1_p07", votedForPid: "s1_p08" }, // Madison → Kelsey
          { vid: "s1_tc06_v6", voterPid: "s1_p04", votedForPid: "s1_p03" }, // Caroline → Meredith
          { vid: "s1_tc06_v7", voterPid: "s1_p05", votedForPid: "s1_p03" }, // Abdul → Meredith
          { vid: "s1_tc06_v8", voterPid: "s1_p08", votedForPid: "s1_p03" }, // Kelsey → Meredith
        ],
      },
      // ── TC 7: Madison eliminated (2-0, 5 nullified) — Merge ──────────
      {
        tcid: "s1_tc07", eid: "s1_e07", episode: 7, tid: null, videoTimestamp: 4815, confessionalTimestamp: 4938,
        confessionalQuote: "I feel so lucky to be voted off on an idol play. Abdul, that was pretty good. I kind of hate you but I kind of appreciate it, so I'm not mad. I know you're butt hurt but I'm not mad.",
        notes: "Abdul played a hidden immunity idol on himself, nullifying 5 votes.",
        idols: [{ playerPid: "s1_p05", playedOn: "s1_p05" }],
        eliminatedPid: "s1_p07",
        votes: [
          { vid: "s1_tc07_v1", voterPid: "s1_p01", votedForPid: "s1_p05", idolNullified: true }, // Jace → Abdul ✗
          { vid: "s1_tc07_v2", voterPid: "s1_p02", votedForPid: "s1_p05", idolNullified: true }, // Olivia → Abdul ✗
          { vid: "s1_tc07_v3", voterPid: "s1_p03", votedForPid: "s1_p05", idolNullified: true }, // Meredith → Abdul ✗
          { vid: "s1_tc07_v4", voterPid: "s1_p06", votedForPid: "s1_p05", idolNullified: true }, // Jacob → Abdul ✗
          { vid: "s1_tc07_v5", voterPid: "s1_p07", votedForPid: "s1_p05", idolNullified: true }, // Madison → Abdul ✗
          { vid: "s1_tc07_v6", voterPid: "s1_p04", votedForPid: "s1_p07" }, // Caroline → Madison
          { vid: "s1_tc07_v7", voterPid: "s1_p05", votedForPid: "s1_p07" }, // Abdul → Madison
        ],
      },
      // ── TC 8: Jacob eliminated (2-0, 4 nullified) — Merge ────────────
      {
        tcid: "s1_tc08", eid: "s1_e08", episode: 8, tid: null, videoTimestamp: 5929, confessionalTimestamp: 6006,
        confessionalQuote: "I kind of knew that one was coming at the end there. I tried to convince Jace at the end to flip but I didn't know he had an idol. I think I played a good game because I was on the right side of I think every single vote that I was in. I pulled the Abdul numbers, I was the vote swap for Kelsey, and I pulled the Jace numbers there. And I even convinced Caroline to flip on him, but they had idols both times, so that got me at the end.",
        notes: "Jace played a hidden immunity idol on himself, nullifying 4 votes.",
        idols: [{ playerPid: "s1_p01", playedOn: "s1_p01" }],
        eliminatedPid: "s1_p06",
        votes: [
          { vid: "s1_tc08_v1", voterPid: "s1_p02", votedForPid: "s1_p01", idolNullified: true }, // Olivia → Jace ✗
          { vid: "s1_tc08_v2", voterPid: "s1_p03", votedForPid: "s1_p01", idolNullified: true }, // Meredith → Jace ✗
          { vid: "s1_tc08_v3", voterPid: "s1_p04", votedForPid: "s1_p01", idolNullified: true }, // Caroline → Jace ✗
          { vid: "s1_tc08_v4", voterPid: "s1_p06", votedForPid: "s1_p01", idolNullified: true }, // Jacob → Jace ✗
          { vid: "s1_tc08_v5", voterPid: "s1_p05", votedForPid: "s1_p06" }, // Abdul → Jacob
          { vid: "s1_tc08_v6", voterPid: "s1_p01", votedForPid: "s1_p06" }, // Jace → Jacob
        ],
      },
      // ── TC 9: Abdul eliminated (3-2) — Merge ──────────────────────
      {
        tcid: "s1_tc09", eid: "s1_e09", episode: 9, tid: null, videoTimestamp: 6680, confessionalTimestamp: 6768, notes: "",
        confessionalQuote: "I played a good game, you know. I got a lot farther than I expected. I swayed a lot of people, a lot of people followed my footsteps which I did not expect. Called out a whole bunch of things. At the end of the day I just got snaked. Caroline, you'll get what's coming to you. Jace, thanks for sticking with me through. And then everybody else — some snakes.",
        eliminatedPid: "s1_p05",
        votes: [
          { vid: "s1_tc09_v1", voterPid: "s1_p02", votedForPid: "s1_p05" }, // Olivia → Abdul
          { vid: "s1_tc09_v2", voterPid: "s1_p03", votedForPid: "s1_p05" }, // Meredith → Abdul
          { vid: "s1_tc09_v3", voterPid: "s1_p04", votedForPid: "s1_p05" }, // Caroline → Abdul
          { vid: "s1_tc09_v4", voterPid: "s1_p01", votedForPid: "s1_p02" }, // Jace → Olivia
          { vid: "s1_tc09_v5", voterPid: "s1_p05", votedForPid: "s1_p02" }, // Abdul → Olivia
        ],
      },
      // ── TC 10: Caroline eliminated — no vote ───────────────────────
      {
        tcid: "s1_tc10", eid: "s1_e10", episode: 10, tid: null, videoTimestamp: 7613, confessionalTimestamp: 8167,
        confessionalQuote: "I'm a little sad but it was a lot of fun playing. I was really close to making it to the final three. Came down to that campfire marshmallow thing and Jace's Plan B got me, you know, that's fair. I was really upset. I felt like I had a really good kind of speech I was going to give to the jury. Feel like I made some blindsides. I know that doesn't always help you win, but I took out my main alliance and then my other alliance too, because I knew my original alliance was going to beat me if it was him and I in the end. And maybe that's what led to my downfall, but I had a lot of fun.",
        notes: "Olivia won immunity and chose Meredith for the final 3. Jace and Caroline competed in a Marshmallow & Stick Tower challenge (fire-making equivalent). Players had 5 minutes to build the tallest freestanding tower using only marshmallows and sticks. Jace won with his 'Plan B' structure, eliminating Caroline.",
        eliminatedPid: "s1_p04",
        firemaking: { winner: "s1_p01", loser: "s1_p04", challenge: "Marshmallow & Stick Tower", description: "5 minutes to build the tallest freestanding tower using only marshmallows and sticks. Tower had to stay standing for 15 seconds after time was called.", videoTimestamp: 7787 },
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
    logoPath: "/logos/season-2.png",
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
    logoPath: "/logos/season-3.png",
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
