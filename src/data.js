// ============================================================
// 14508 SURVIVOR WIKI — SEASON DATA
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
    location: null,
    filmingDates: "September 21, 2024",
    days: 14,
    logoPath: "/logos/season-1.png",
    castPhotoPath: "https://i.imgur.com/ASseu6A.jpeg",
    winnerPid: "s1_p01",
    runnerUpPid: "s1_p02",
    secondRunnerUpPid: "s1_p03",
    fanFavoritePid: null,
    summary: [
      "Season 1 of 14508 Survivor began with fourteen castaways divided into two tribes: Purple and Red. From the start, Red dominated the immunity challenges, winning the first two in a row and sending Purple to Tribal Council both times. Purple's losses quickly exposed fractures within the tribe, and Sam R. was voted out first in a decisive 6-1 vote, followed by Marissa in a 5-1 vote.",
      "A tribe switch at the top of Episode 3 dissolved the original two tribes into three new ones — Blue, Yellow, and Orange — scattering alliances across new tribal lines. Blue tribe saw one of the season's most dramatic moments when Olivia played a hidden immunity idol on herself, creating a 2-2 tie between Madison and Sean. On the revote, Jace was the only player eligible for a rock draw, forcing him to flip and vote out his ally Sean. Meanwhile, Yellow tribe sent Clara home in a 3-1 vote.",
      "Yellow returned to Tribal Council in Episode 4, where Caroline and Abdul held their alliance strong and eliminated Dom 2-1 despite his last-minute attempts to sway them. With five players gone across four episodes, the remaining nine castaways merged into a single tribe.",
      "At the merge, Jace won the first individual immunity in a Noodle Count challenge — estimating macaroni noodles in a jar — beating Madison in a tiebreaker draw. Savannah became the first merge boot in a near-unanimous 8-1 vote. The following episode saw Abdul win immunity, and a majority alliance blindsided Kelsey in a 5-3 vote, catching her completely off guard.",
      "The middle of the merge was defined by back-to-back idol plays. In Episode 7, with Jace safe behind individual immunity, the majority targeted Abdul — but Abdul played his hidden immunity idol, nullifying all five votes against him and sending Madison home with just two votes. The very next round, history repeated: Abdul won immunity, and the majority pivoted to Jace, but Jace played his own idol, wiping out four votes and eliminating Jacob. Jacob's exit confessional revealed he had even convinced Caroline to flip on Jace, but the idol rendered it all meaningless.",
      "With both idols spent, Episode 9 became the season's pivotal vote. Meredith won immunity, and Caroline made the decisive move of the game — flipping on her ally Abdul to join Olivia and Meredith, sending Abdul home 3-2. At the final four, Olivia won immunity and chose Meredith to join her in the Final Three. Jace and Caroline faced off in a Marshmallow & Stick Tower challenge — the season's fire-making equivalent — where players had five minutes to build the tallest freestanding tower. Jace's \"Plan B\" structure held, eliminating Caroline and securing his spot in the finals.",
      "At Final Tribal Council, Jace, Olivia, and Meredith faced the nine-member jury. Jace's aggressive gameplay — including his clutch idol play, multiple immunity wins, and survival through the most dangerous stretch of the game — earned him an overwhelming 8-1 jury vote. Only Dom voted for Olivia, while Meredith received no votes. Jace was crowned the Sole Survivor of Season 1.",
    ],
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
        immunityChallenge: { name: "Nothing But Net", type: "Immunity", description: "A basketball free throw shooting competition. Players lined up and shot one at a time, alternating between tribes. First team to six misses lost immunity and went to tribal council.", winner: "s1_t2", videoTimestamp: 143,
          imageUrl: "https://i.imgur.com/9w4qvbD.png",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t1", place: 2 }], sitOuts: ["s1_p09"] } },
      { eid: "s1_e03", number: 3,  title: "Episode 3",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=852",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Word Scramble", type: "Immunity", description: "Each tribe received a sheet of paper and had 3 minutes to write down as many valid words (3+ letters) as they could form from the letters in the word \"CHALLENGE\". Words were scored against a pre-made Scrabble-valid answer key, and teams graded each other's lists. Most valid words won immunity; the two lowest-scoring tribes went to tribal council. One player was caught writing after time was called and received a −1 penalty. The winning tribe also got to pick their camp spot and received pizza.", winner: "s1_t2", videoTimestamp: 852,
          imageUrl: "https://i.imgur.com/q7cq6UY.png",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t3", place: 2 }, { id: "s1_t4", place: 2 }], sitOuts: [] } },
      { eid: "s1_e04", number: 4,  title: "Episode 4",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=2361",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Puzzle Race", type: "Immunity", description: "Each tribe raced to solve the same 48-piece puzzle. The two fastest tribes won immunity; the losing tribe went to tribal council.", winner: "s1_t3", videoTimestamp: 2361,
          imageUrl: "https://i.imgur.com/jInLiBV.png",
          results: [{ id: "s1_t3", place: 1 }, { id: "s1_t5", place: 2 }, { id: "s1_t4", place: 3 }], sitOuts: [] } },
      { eid: "s1_e05", number: 5,  title: "The Merge",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=2850",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Noodle Count", type: "Immunity", description: "Castaways estimated the number of macaroni noodles in a jar. Anyone who guessed over the actual number was eliminated — the closest guess under won. Madison and Jace tied with the same distance from the answer, forcing a tiebreaker draw — Jace won immunity.", winner: "s1_p01", videoTimestamp: 2958, imageUrl: "https://i.imgur.com/2fEZbiJ.png" } },
      { eid: "s1_e06", number: 6,  title: "Episode 6",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=3650",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Paper Airplane Toss", type: "Immunity", description: "Alex is dumb. Challenge was not recorded. Abdul won immunity.", winner: "s1_p05", videoTimestamp: 3650, imageUrl: "https://i.imgur.com/IzbWgBH.png" } },
      { eid: "s1_e07", number: 7,  title: "Episode 7",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=3987",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Spelling Bee", type: "Immunity", description: "Rounds-based spelling bee. Players were given increasingly difficult words and eliminated when they misspelled one; if all remaining players in a round missed, no one was eliminated and a new round began. Words included accommodate, condominium, frivolous, requirement, chauffeur, encyclopedia, rhythm, and guarantee. Jace won immunity in the final round by correctly spelling \"emphasize\".", winner: "s1_p01", videoTimestamp: 3987, imageUrl: "https://i.imgur.com/J4VUv3O.png" } },
      { eid: "s1_e08", number: 8,  title: "Episode 8",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=4957",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Block Balance", type: "Immunity", description: "Castaways stood on one foot while holding blocks pinched between their index fingers. At set intervals, more blocks were added to increase difficulty. Abdul won immunity in a long final showdown against Meredith.", winner: "s1_p05", videoTimestamp: 4957, imageUrl: "https://i.imgur.com/doTPs1S.png" } },
      { eid: "s1_e09", number: 9,  title: "Episode 9",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=6031",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Kentucky Derby", type: "Immunity", description: "Three-stage challenge. Stage 1: Golf Ball Relay — players ran back and forth collecting golf balls one at a time into a bag (10 trips). Stage 2: Knot Untying — untie all knots from a rope to free a ball (11th ball). Stage 3: Word Scramble — unscramble letters to form two words. The only clue: \"It's two words, something we all celebrate, has nothing to do with Survivor.\" The answer was Kentucky Derby. Meredith solved it first, guaranteeing her a spot in the final four.", winner: "s1_p03", videoTimestamp: 6031, imageUrl: "https://i.imgur.com/0XGwfwE.png" } },
      { eid: "s1_e10", number: 10, title: "Episode 10", videoUrl: "https://youtu.be/qPJoYyABYHE?t=6797",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Images Under Cups", type: "Immunity", description: "Memory matching game with 30 numbered cups concealing 15 pairs of animal images. Players took turns calling two cup numbers — if the images matched, they kept the pair; if not, the cups were turned back over. Most matches won. The images were secretly arranged in a pattern (every other number), which Olivia figured out to pull ahead and win immunity.", winner: "s1_p02", videoTimestamp: 6797, imageUrl: "https://i.imgur.com/zAfqBYR.png" } },
      { eid: "s1_e11", number: 11, title: "Finale",     videoUrl: "https://youtu.be/qPJoYyABYHE?t=8206",
        episodeImageUrl: "https://i.imgur.com/HzAKTWv.png",
        images: [
          { url: "https://i.imgur.com/SVUjVa1.jpeg" },
          { url: "https://i.imgur.com/rlw6ktU.jpeg" },
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
      { pid: "s1_p01", name: "Jace",     fullName: "Jace Stieler", instagram: "https://www.instagram.com/jacestieler/", photoUrl: "https://i.imgur.com/ZOAlfmU.png", photoStyle: { objectPosition: "67% 5%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "280px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 1,  juryMember: false, votesAgainst: 2,  switchedTid: "s1_t3", merged: true,
        bio: [
          "Jace began Season 1 on the dominant Red tribe, which won the first two immunity challenges and avoided early Tribal Council entirely. After the tribe switch, he landed on the Blue tribe alongside Olivia, Madison, and Sean. Blue's first Tribal Council became one of the season's most pivotal moments — Olivia played a hidden immunity idol, and the vote tied 2-2 between Madison and Sean. On the revote, Jace was the only player eligible for a rock draw, forcing him to flip and vote out his ally Sean to avoid going home by chance.",
          "At the merge, Jace quickly established himself as a challenge threat, winning the first individual immunity in the Noodle Count challenge after beating Madison in a tiebreaker draw. He voted with the majority to eliminate Savannah 8-1 and Kelsey 5-3 in the following round. When the majority alliance turned on Abdul in Episode 7, Jace was safe behind his second individual immunity win in the Spelling Bee — correctly spelling \"emphasize\" in the final round.",
          "Episode 8 marked the most dangerous point of Jace's game. With Abdul immune, the majority targeted Jace — and Jacob even convinced Caroline to flip on him. But Jace played his hidden immunity idol, wiping out all four votes against him and sending Jacob home with just two votes. It was back-to-back idol plays in consecutive episodes, with Jace and Abdul each saving themselves once.",
          "With both idols spent, the final five vote split 3-2. Jace and Abdul voted for Olivia, but Caroline flipped on Abdul, joining Olivia and Meredith to send Abdul home. At the final four, Olivia won immunity and selected Meredith for the Final Three, leaving Jace and Caroline to face off in the fire-making equivalent — a Marshmallow & Stick Tower challenge. Jace's \"Plan B\" structure held, eliminating Caroline and sending him to Final Tribal Council.",
          "Facing the jury alongside Olivia and Meredith, Jace's aggressive gameplay — multiple immunity wins, a clutch idol play, and survival through the season's most dangerous stretch — earned him an overwhelming 8-1 jury vote. Only Dom voted for Olivia. Jace was crowned the Sole Survivor of Season 1.",
        ] },
      { pid: "s1_p02", name: "Olivia",   fullName: "Olivia Saylor", personId: "olivia_saylor", instagram: "https://www.instagram.com/olivia_saylor_/", photoUrl: "https://i.imgur.com/v15gL2S.png", portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 2,  juryMember: false, votesAgainst: 3,  switchedTid: "s1_t3", merged: true,
        bio: [
          "Olivia started on the Purple tribe, which lost both of the first two immunity challenges. She voted with the majority both times, helping eliminate Sam R. (6-1) and Marissa (5-1). After the tribe switch, she landed on the Blue tribe with Jace, Madison, and Sean.",
          "At Blue's Tribal Council, Olivia made the season's first big move — playing a hidden immunity idol on herself. Though no votes had actually been cast against her, the play created chaos: the vote tied 2-2 between Madison and Sean, and on the revote Jace was forced to flip and send Sean home to avoid a rock draw. It was a bold and disruptive play that reshaped Blue's dynamics heading into the merge.",
          "After the merge, Olivia voted with the majority in most rounds — including the 8-1 vote against Savannah and the 5-3 blindside of Kelsey. When the majority alliance targeted Abdul and then Jace, both plays were thwarted by hidden immunity idols, with Olivia's votes nullified in back-to-back episodes. At the final five, she voted with Meredith and Caroline to take out Abdul 3-2.",
          "Olivia won the final four immunity challenge — Images Under Cups, a memory matching game where she figured out the hidden pattern of the images to pull ahead. She chose Meredith to join her in the Final Three, sending Jace and Caroline to the fire-making challenge. At Final Tribal Council, Olivia received one jury vote from Dom, finishing as the runner-up to Jace's 8-1 victory.",
        ] },
      { pid: "s1_p03", name: "Meredith", fullName: "Meredith Hogue", personId: "meredith_hogue", photoUrl: "https://i.imgur.com/47WJZvC.png", photoStyle: { objectPosition: "50% -63%", transform: "scale(1.55)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%", transformOrigin: "47% 50%", transform: "scale(1.15)" }, tid: "s1_t1", placement: 3,  juryMember: false, votesAgainst: 5,  switchedTid: "s1_t5", merged: true,
        bio: [
          "Meredith began on the Purple tribe, which lost the first two immunity challenges. She voted with the majority to eliminate Sam R. and Marissa, though Sam cast his lone vote against her in the first Tribal Council. After the tribe switch, she was placed on the Orange tribe, which avoided Tribal Council during the pre-merge phase.",
          "At the merge, Meredith voted with the majority alliance consistently — the 8-1 vote against Savannah, the 5-3 blindside of Kelsey, and both rounds where the majority targeted Abdul and Jace (though both were nullified by idol plays). She received three votes at the Kelsey Tribal Council from Caroline, Abdul, and Kelsey, but survived comfortably as the majority held.",
          "Meredith won the Episode 9 immunity challenge — Kentucky Derby, a three-stage endurance and puzzle challenge where she solved the final word scramble first, guaranteeing herself a spot in the final four. She then joined Olivia and Caroline in the pivotal 3-2 vote that sent Abdul home. Olivia selected Meredith to join her in the Final Three after winning the final immunity challenge.",
          "At Final Tribal Council, Meredith did not receive any jury votes, finishing as the second runner-up behind Jace (8 votes) and Olivia (1 vote).",
        ] },
      { pid: "s1_p04", name: "Caroline", fullName: "Caroline Kremer", personId: "caroline_kremer", instagram: "https://www.instagram.com/carolinekremerr/", photoUrl: "https://i.imgur.com/Pq42UDY.png", photoStyle: { objectPosition: "50% -183%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 4,  juryMember: true,  votesAgainst: 1,  switchedTid: "s1_t4", merged: true,
        bio: [
          "Caroline started on the Red tribe, which won the first two immunity challenges. After the tribe switch, she landed on the Yellow tribe with Abdul, Clara, and Dom. Caroline and Abdul formed a tight alliance on Yellow, voting together to eliminate Clara (3-1) and Dom (2-1) across two Tribal Councils.",
          "At the merge, Caroline initially stuck with Abdul, voting with him in the minority against Meredith at the Kelsey blindside (5-3). When the majority targeted Abdul in Episode 7, Abdul's idol play saved him and sent Madison home — with Caroline casting one of the two counting votes. The following round, she made a significant move by flipping on Jace at Jacob's urging, but Jace's idol play rendered it meaningless.",
          "Episode 9 was Caroline's defining moment. With both idols spent, she made the decisive flip of the season — turning on her closest ally Abdul to join Olivia and Meredith, sending Abdul home 3-2. As she later reflected, she took out her main alliance because she believed Abdul would beat her at the end.",
          "At the final four, Olivia won immunity and chose Meredith, leaving Caroline and Jace to face off in the fire-making equivalent — a Marshmallow & Stick Tower challenge. Jace's structure held, ending Caroline's game in 4th place. Only one vote was ever cast against Caroline the entire season, making her one of the least-targeted players despite her aggressive endgame moves.",
        ] },
      { pid: "s1_p05", name: "Abdul",    fullName: "Abdul Alwan", personId: "abdul_alwan", instagram: "https://www.instagram.com/abdulxalwan/", photoUrl: "https://i.imgur.com/O18he6C.png", photoStyle: { objectPosition: "50% -91%", transformOrigin: "66% 50%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 5,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t4", merged: true,
        bio: [
          "Abdul started on the Red tribe, which won the first two immunity challenges. After the tribe switch, he landed on the Yellow tribe alongside Caroline, Clara, and Dom. Abdul and Caroline formed a strong alliance, voting together to eliminate Clara (3-1) and Dom (2-1), controlling Yellow's Tribal Councils.",
          "At the merge, Abdul voted with the majority to take out Savannah 8-1, then won his first individual immunity — Paper Airplane Toss — in Episode 6. He voted against Meredith with Caroline and Kelsey, but the majority blindsided Kelsey 5-3 instead.",
          "Episode 7 was Abdul's signature moment. The majority alliance sent five votes his way, but Abdul played a hidden immunity idol on himself, nullifying every one and sending Madison home with just two votes. The following round, he won immunity again in the Block Balance challenge after a long showdown against Meredith, keeping himself safe while Jace used his own idol to survive.",
          "With both idols gone, Abdul's game came down to the final five. He and Jace voted for Olivia, but Caroline — his closest ally — flipped, joining Olivia and Meredith to send Abdul home 3-2. In his exit confessional, Abdul credited himself with swaying people throughout the game and called out Caroline's betrayal, but acknowledged he got farther than he expected.",
        ] },
      { pid: "s1_p06", name: "Jacob",    fullName: "Jacob Williams", personId: "jacob_williams", instagram: "https://www.instagram.com/jacob.williams2/", photoUrl: "https://i.imgur.com/IKBqmSa.png", photoStyle: { objectPosition: "50% -162%", transformOrigin: "49% 50%", transform: "scale(1.70)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 6,  juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t5", merged: true,
        bio: [
          "Jacob began on the Purple tribe, voting with the majority to send Sam R. and Marissa home in the first two Tribal Councils. After the tribe switch, he was placed on the Orange tribe, which avoided Tribal Council entirely during the pre-merge phase.",
          "At the merge, Jacob positioned himself well within the majority alliance. He voted on the correct side of every elimination — the 8-1 Savannah vote, the 5-3 Kelsey blindside, and both idol-affected rounds. In his own words, he orchestrated the vote swap that targeted Kelsey and organized the numbers against both Abdul and Jace.",
          "Jacob's downfall came in Episode 8. He rallied the majority against Jace and even convinced Caroline to flip, but Jace played a hidden immunity idol — nullifying all four votes and sending Jacob home with just two. In his exit confessional, Jacob reflected that he had been on the right side of every vote he participated in, but back-to-back idol plays ultimately ended his game.",
        ] },
      { pid: "s1_p07", name: "Madison",  fullName: "Madison Chumbler", personId: "madison_chumbler", instagram: "https://www.instagram.com/madisonchumbler/", photoUrl: "https://i.imgur.com/VBmfwXj.png", photoStyle: { objectPosition: "50% -73%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 7,  juryMember: true,  votesAgainst: 7,  switchedTid: "s1_t3", merged: true,
        bio: [
          "Madison started on the Purple tribe and voted with the majority in both pre-switch Tribal Councils. After the tribe switch, she was placed on the Blue tribe with Jace, Olivia, and Sean. At Blue's chaotic Tribal Council, she was tied 2-2 with Sean after Olivia's idol play. She was immune on the revote, and Sean was sent home.",
          "At the merge, Madison came close to winning the first individual immunity — she tied with Jace in the Noodle Count challenge but lost the tiebreaker draw. She voted with the majority for both the Savannah and Kelsey eliminations, staying in the numbers through the early merge.",
          "Madison's game ended in Episode 7 when the majority targeted Abdul. Abdul played his hidden immunity idol, nullifying all five votes — including Madison's — and the two remaining votes from Abdul and Caroline sent Madison home. In her exit confessional, she took it in stride, saying she felt lucky to be voted off on an idol play and that she appreciated Abdul's move.",
        ] },
      { pid: "s1_p08", name: "Kelsey",   fullName: "Kelsey Brown", personId: "kelsey_brown", instagram: "https://www.instagram.com/kels_alyssa/", photoUrl: "https://i.imgur.com/vb5oY6d.png", photoStyle: { objectPosition: "50% -11%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 8,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t5", merged: true,
        bio: [
          "Kelsey began on the Red tribe, which won both pre-switch immunity challenges. After the tribe switch, she was placed on the Orange tribe, which avoided Tribal Council during the pre-merge phase, giving Kelsey a smooth ride into the merge without attending a single Tribal Council.",
          "At the merge, Kelsey voted with the majority to eliminate Savannah 8-1. In Episode 6, with Abdul holding individual immunity, the vote split — Kelsey, Caroline, and Abdul voted for Meredith, while the majority of five targeted Kelsey. She was blindsided 5-3, not seeing it coming. In her exit confessional, Kelsey said she felt betrayed and called out Jacob, Meredith, and Madison for lying to her.",
        ] },
      { pid: "s1_p09", name: "Savannah", fullName: "Savannah Brinley", personId: "savannah_brinley", instagram: "https://www.instagram.com/savannah.brinley/", photoUrl: "https://i.imgur.com/s9JnOdy.png", photoStyle: { objectPosition: "50% -22%", transformOrigin: "22% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 9,  juryMember: true,  votesAgainst: 8,  switchedTid: "s1_t5", merged: true,
        bio: "Savannah started on the Red tribe, which won the first two immunity challenges — she sat out of the Episode 2 Nothing But Net challenge. After the tribe switch, she was placed on the Orange tribe, which avoided Tribal Council pre-merge. At the merge, Savannah became the first player voted out, eliminated in a near-unanimous 8-1 vote. She cast her lone vote for Meredith." },
      { pid: "s1_p10", name: "Dom",      fullName: "Dominic Croyle", instagram: "https://www.instagram.com/dominic_croyle/", photoUrl: "https://i.imgur.com/SahJ0Ot.png", photoStyle: { objectPosition: "50% -24%", transformOrigin: "75% 50%", transform: "scale(1.40)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 10, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false,
        bio: "Dom started on the Purple tribe and voted with the majority in the first two Tribal Councils to eliminate Sam R. and Marissa. After the tribe switch, he landed on the Yellow tribe with Caroline, Abdul, and Clara. Dom voted with them to eliminate Clara 3-1, but when Yellow returned to Tribal Council the following episode, Caroline and Abdul turned on him. Dom tried last-minute to get one of them to switch, but was eliminated 2-1. He attended four Tribal Councils — the most of any pre-merge boot. At Final Tribal Council, Dom was the only juror to vote for Olivia over Jace." },
      { pid: "s1_p11", name: "Clara",    fullName: "Clara Kaelin", instagram: "https://www.instagram.com/clarakaelin/", photoUrl: "https://i.imgur.com/J7GuBMh.png", photoStyle: { objectPosition: "50% -4%", transformOrigin: "72% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 11, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false,
        bio: "Clara started on the Red tribe, which won both pre-switch immunity challenges. After the tribe switch, she was placed on the Yellow tribe with Caroline, Abdul, and Dom. At Yellow's first Tribal Council, Caroline, Abdul, and Dom voted against Clara while she cast her lone vote for Dom, and she was eliminated 3-1." },
      { pid: "s1_p12", name: "Sean",     fullName: "Sean Stephens", personId: "sean_stephens", instagram: "https://www.instagram.com/notseanstephens/", photoUrl: "https://i.imgur.com/VjBqAOH.png", photoStyle: { objectPosition: "50% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s1_t2", placement: 12, juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t3", merged: false,
        bio: "Sean began on the Red tribe, which won both pre-switch immunity challenges. After the tribe switch, he was placed on the Blue tribe with Jace, Olivia, and Madison. Blue's first Tribal Council became one of the season's most chaotic votes — Olivia played a hidden immunity idol on herself, and the vote tied 2-2 between Sean and Madison. On the revote, Jace was the only eligible rocks candidate, forcing him to flip and vote Sean out to avoid drawing rocks. In his exit confessional, Sean revealed that the boys had initially planned to vote Olivia but switched targets when they found out about her idol." },
      { pid: "s1_p13", name: "Marissa",  fullName: "Marissa Coon", instagram: "https://www.instagram.com/mcooon/", photoUrl: "https://i.imgur.com/m4L09S2.png", photoStyle: { objectPosition: "50% -4%", transformOrigin: "17% 50%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 6%" }, tid: "s1_t1", placement: 13, juryMember: false, votesAgainst: 5,  switchedTid: null,    merged: false,
        bio: "Marissa was on the Purple tribe, which lost both of the first two immunity challenges. She voted with the majority in the first Tribal Council to eliminate Sam R., but was voted out 5-1 at the second Tribal Council in Episode 2. She cast her vote for Olivia." },
      { pid: "s1_p14", name: "Sam R.",   fullName: "Sam Roth", personId: "sam_roth", instagram: "https://www.instagram.com/samroth10/", photoUrl: "https://i.imgur.com/HfnY3vo.jpeg",photoStyle: { objectPosition: "50% -10%", transform: "scale(1.20)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 14, juryMember: false, votesAgainst: 6,  switchedTid: null,    merged: false,
        bio: "Sam R. was the first player eliminated from Season 1. Starting on the Purple tribe, which lost the first immunity challenge, Sam found himself on the wrong side of the numbers after the tribe split into groups. He knew right away the majority had formed against him and didn't have a real shot at staying. He was voted out 6-1, casting his lone vote for Meredith." },
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
        notes: "Jace and Caroline competed in a Marshmallow & Stick Tower challenge (fire-making equivalent). Players had 5 minutes to build the tallest freestanding tower using only marshmallows and sticks. Jace won with his 'Plan B' structure, eliminating Caroline.",
        eliminatedPid: "s1_p04",
        firemaking: { winner: "s1_p01", loser: "s1_p04", challenge: "Marshmallow & Stick Tower", description: "5 minutes to build the tallest freestanding tower using only marshmallows and sticks. Tower had to stay standing for 15 seconds after time was called.", videoTimestamp: 7787, imageUrl: "https://i.imgur.com/4Z3wqoV.png" },
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
    location: null,
    filmingDates: "May 17–18, 2025",
    days: null,
    winnerPid: null,
    runnerUpPid: null,
    fanFavoritePid: null,
    logoPath: "/logos/season-2.png",
    castPhotoPath: null,
    summary: null,
    twists: [
      "Shot in the Dark — 1-in-6 chance at safety (forfeit vote), playable through final 7",
      "Hidden Immunity Idols — must find clue bead + idol; both pieces required to play",
      "Snake Draft tribe selection — three colored-rock drawers each pick one, then their pick picks next",
    ],
    mergeTribe: { tid: "s2_merged", name: "Merged", color: "#228B22" },
    juryVotes: [],
    advantages: [
      { type: "Hidden Immunity Idol", holder: "s2_sean", foundEpisode: 1, playedEpisode: 5, status: "played", notes: "Found at camp during Episode 1. Told his tribemates about it. Played on himself at Episode 5 tribal council after using Shot in the Dark (not safe), nullifying 4 votes." },
      { type: "Safety Without Power", holder: "s2_samr", foundEpisode: 1, playedEpisode: null, status: "expired", notes: "Won at the Episode 1 journey (multiplication tables). Allows holder to leave tribal council before the vote for guaranteed safety, but forfeits their vote. Sam chose not to play it and was voted out." },
      { type: "Hidden Immunity Idol", holder: "s2_caroline", foundEpisode: 2, playedEpisode: null, status: "expired", notes: "Found at camp. Caroline did not play it at Episode 7 tribal council and was voted out 4-1." },
      { type: "Hidden Immunity Idol", holder: "s2_meredith", foundEpisode: 2, playedEpisode: 7, status: "played", notes: "Found at camp. Played on herself at Episode 7 tribal council, nullifying 4 votes. Alyssa was eliminated 1-0 as the only unprotected vote." },
      { type: "Safety Without Power", holder: "s2_kelsey", foundEpisode: 3, playedEpisode: 6, status: "played", notes: "Won at the Episode 3 journey (prisoner's dilemma). Kelsey and Olivia agreed that Kelsey would choose Greedy and Olivia would choose Loyal, earning Kelsey the advantage. Played at Episode 6 merge tribal council — Kelsey left tribal before the vote for guaranteed safety, forfeiting her vote." },
      { type: "Hidden Immunity Idol", holder: "s2_abdul", foundEpisode: 6, playedEpisode: null, status: "held", notes: "Found at camp during Episode 6 while the rest of the tribe competed in the immunity challenge. Abdul was the odd man out after Sean dropped him last second to pair with Ashton." },
      { type: "Final 7 Advantage", holder: "s2_abdul", foundEpisode: 6, playedEpisode: null, status: "held", notes: "Found at camp during Episode 6 while the rest of the tribe competed in the immunity challenge." },
      { type: "Hidden Immunity Idol", holder: "s2_meredith", foundEpisode: 8, playedEpisode: 8, status: "played", notes: "Found a clue hidden in the basement camp. The idol was placed in the mailbox between 2am and 5am. Meredith snuck out at 2:30am to retrieve it. Played on herself at Episode 8 tribal council, nullifying 1 vote." },
    ],
    episodes: [
      { eid: "s2_e01", number: 1, title: "Episode 1", videoUrl: "https://www.youtube.com/watch?v=KMz9zRmdb54", episodeImageUrl: "https://i.imgur.com/R8CX9ZG.png",
        rewardChallenge: { name: "Memory Grid", type: "Reward",
          description: "One member from each tribe raced back and forth between a grid of random objects and a blank grid at their station. Players had to memorize the positions of objects and recreate them on their blank grid. The strategic dilemma: memorize everything in one trip or make multiple quick trips remembering fewer objects each time.",
          winner: "s2_yellow", reward: "First pick of camp location", imageUrl: "https://i.imgur.com/R8CX9ZG.png",
          results: [{ id: "s2_yellow", place: 1 }, { id: "s2_red", place: 2 }, { id: "s2_blue", place: 3 }], sitOuts: [] },
        immunityChallenge: { name: "Relay Race Puzzle", type: "Immunity",
          description: "Tribe relay race around the block. On the far side, each tribe member received a number. Once all members returned, the tribe had to unscramble their numbers to figure out a lock combination. After unlocking, they opened a bag of puzzle pieces and raced to complete the puzzle. First two tribes to finish won immunity.",
          winner: "s2_blue", imageUrl: "https://i.imgur.com/0jvefJi.png", videoTimestamp: 911,
          results: [{ id: "s2_blue", place: 1 }, { id: "s2_red", place: 2 }, { id: "s2_yellow", place: 3 }], sitOuts: ["s2_phil", "s2_meredith"] },
        journey: {
          videoUrl: "https://youtu.be/KMz9zRmdb54?t=1531",
          imageUrl: "https://i.imgur.com/joHjgFj.png",
          description: "The winning Blue tribe selected one member from each tribe to go on a journey. Phil (Blue), Abdul (Red), and Sam R. (Yellow) were sent to compete in a timed multiplication tables quiz with one minute on the clock. The winner received the contents of a mystery box — the Safety Without Power advantage. The two losers each lost their vote at their next tribal council.",
          sentBy: "s2_blue",
          participants: [
            { pid: "s2_phil", result: "Lost vote at next tribal" },
            { pid: "s2_abdul", result: "Lost vote at next tribal" },
            { pid: "s2_samr", result: "Won Safety Without Power advantage" },
          ],
        },
        tribalCouncilUrl: "https://youtu.be/KMz9zRmdb54?t=1868",
      },
      { eid: "s2_e02", number: 2, title: "Episode 2", videoUrl: "https://www.youtube.com/watch?v=N09g7JOZ0ZQ", episodeImageUrl: "https://i.imgur.com/orqvV32.png",
        immunityChallenge: {
          name: "Color Flip",
          type: "Immunity",
          description: "Round-based challenge played at a circular table with 60 two-sided tiles — 20 red/blue, 20 blue/yellow, and 20 yellow/red. Each round, one player from each tribe competed simultaneously. Players had one minute to flip as many tiles as possible to show their tribe's color. The tribe with the most tiles showing their color won the round. First tribe to four round wins earned immunity. The two losing tribes both went to tribal council.",
          winner: "s2_yellow",
          imageUrl: "https://i.imgur.com/orqvV32.png",
          videoTimestamp: 1,
          results: [
            { id: "s2_yellow", place: 1 },
            { id: "s2_blue", place: 2 },
            { id: "s2_red", place: 2 },
          ],
          sitOuts: [],
        },
      },
      { eid: "s2_e03", number: 3, title: "Episode 3", videoUrl: "https://www.youtube.com/watch?v=wgmusY6usMM", episodeImageUrl: "https://i.imgur.com/Zq5cR0x.png",
        immunityChallenge: {
          name: "Slingshot",
          type: "Immunity",
          description: "Players used a slingshot rocket to launch a projectile and knock a target off a stand. Each tribe member took turns shooting in order, first to five hits won immunity and first pick of camp. Ben C. hit the game-winning shot for Beige.",
          winner: "s2_beige",
          imageUrl: "https://i.imgur.com/Zq5cR0x.png",
          videoTimestamp: 1,
          results: [
            { id: "s2_beige", place: 1 },
            { id: "s2_purple", place: 2 },
          ],
          sitOuts: [],
        },
        journey: {
          videoUrl: "https://youtu.be/wgmusY6usMM?t=1597",
          imageUrl: "https://i.imgur.com/HwxaqmY.png",
          description: "Beige sent Olivia and Purple sent Kelsey. They faced a prisoner's dilemma: secretly choose Loyal or Greedy. If both chose Loyal, nothing happened. If both chose Greedy, both lost their votes. If one chose Greedy and the other Loyal, the Greedy player won a game advantage. After discussing it together, they struck a deal — Kelsey would choose Greedy to win the advantage, and Olivia would choose Loyal. They agreed to tell their tribes they both chose Loyal so no one would know about the advantage.",
          sentBy: "s2_beige",
          participants: [
            { pid: "s2_olivia", result: "Chose Loyal — nothing happened" },
            { pid: "s2_kelsey", result: "Chose Greedy — won Safety Without Power" },
          ],
          dialogue: [
            { pid: "s2_kelsey", quote: "I've not gotten a chance to really talk with anybody. I feel like the obvious vote is either going to be me or Ben, and he's there making bonds right now. At least you have some of your tribe." },
            { pid: "s2_olivia", quote: "If you let me take Loyal, I'll give you solid information about my old tribe." },
            { pid: "s2_kelsey", quote: "What do I say when I go back?" },
            { pid: "s2_olivia", quote: "Just tell them we both chose Loyal, nothing happens — because we were scared to lose our votes." },
            { pid: "s2_kelsey", quote: "I'm okay with doing that, but I really hope you don't backstab me. If we make it to the merge, you and I could both know things." },
            { pid: "s2_olivia", quote: "To be completely honest, I haven't made a deal with anyone either. Our tribe just kind of was ours." },
            { pid: "s2_kelsey", quote: "I'm willing to work with you in the merge. How do I know I can trust you?" },
            { pid: "s2_olivia", quote: "I'm giving you this information. That's proof. And I can tell you if somebody brings up your name." },
            { pid: "s2_kelsey", quote: "I can do that too. Let's do it." },
            { pid: "s2_kelsey", quote: "What I was going to tell you — I saw when Sean went back inside, me and Savannah and Ashton looked the entire place. The clue is gone. When he went back inside, he had something in his pocket. I'm 99% sure he has the idol." },
            { pid: "s2_kelsey", quote: "I had to make a move, a risk here. I'm going to go for it and choose Greedy." },
          ],
        },
      },
      { eid: "s2_e04", number: 4, title: "Episode 4", videoUrl: "https://www.youtube.com/watch?v=eKFGlT77tgM", episodeImageUrl: "https://i.imgur.com/Rs1wmMS.png",
        immunityChallenge: {
          name: "Blind Leading the Blind",
          type: "Immunity",
          description: "One tribe member acted as a shot caller while the rest were blindfolded and tied together in pairs. The pairs navigated through the yard and garage to find bags of puzzle pieces and bring them back to their tribe's basket. Once all bags were collected, one designated puzzle maker untied the bags and assembled a block puzzle. Olivia called for Beige and Abdul called for Purple. Jacob (Beige) and Madison (Purple) were the puzzle makers. Jacob's tribe gave him a head start on pieces, and he finished the puzzle before Madison to win immunity for Beige.",
          winner: "s2_beige",
          imageUrl: "https://i.imgur.com/Rs1wmMS.png",
          videoTimestamp: 1,
          results: [
            { id: "s2_beige", place: 1 },
            { id: "s2_purple", place: 2 },
          ],
          sitOuts: ["s2_benc"],
        },
      },
      { eid: "s2_e05", number: 5, title: "Episode 5", videoUrl: "https://www.youtube.com/watch?v=rL_fAagLaTk", episodeImageUrl: "https://i.imgur.com/73JrtGM.png",
        immunityChallenge: {
          name: "Careful",
          type: "Immunity",
          description: "A Jenga-style tower game with colored sticks and a weighted bell on top. Players drew colored tiles from a sock to determine which color stick they had to remove from the tower using only their hands. Teams could strategize together and use both hands to steady the structure. If the tower fell on your turn, your tribe lost. The challenge lasted over an hour with increasingly tense removals. Purple's tower survived while Beige's eventually collapsed.",
          winner: "s2_purple",
          imageUrl: "https://i.imgur.com/73JrtGM.png",
          videoTimestamp: 1,
          results: [
            { id: "s2_purple", place: 1 },
            { id: "s2_beige", place: 2 },
          ],
          sitOuts: [],
        },
      },
      { eid: "s2_e06", number: 6, title: "Episode 6", videoUrl: "https://www.youtube.com/watch?v=YbWHnEKZsSI", episodeImageUrl: "https://i.imgur.com/xVi4rRU.png",
        immunityChallenge: {
          name: "Domino Stacking",
          type: "Immunity",
          description: "Players paired up for a domino stacking challenge. Sean originally paired with Abdul but last second dropped him to pair with Ashton, leaving Abdul as the odd man out. Abdul went back to camp where he found advantages. Caroline won individual immunity.",
          winner: "s2_caroline",
          imageUrl: "https://i.imgur.com/xVi4rRU.png",
          videoTimestamp: 922,
          sitOuts: ["s2_abdul"],
        },
      },
      { eid: "s2_e07", number: 7, title: "Episode 7", videoUrl: "https://www.youtube.com/watch?v=IAZgIVzhWNo", episodeImageUrl: "https://i.imgur.com/LsqL52w.png",
        immunityChallenge: {
          name: "Hold Your Breath",
          type: "Immunity",
          description: "Players were randomly split into two groups of five, each going to separate tribal councils. All ten competed simultaneously in a breath-holding challenge — face submerged in water, last person standing in each group won individual immunity. The overall last person standing also won a Papa John's pizza for their group. Abdul won immunity for his group, Ben W. won immunity for his group, and Caroline won the overall reward by outlasting everyone.",
          winner: "s2_abdul",
          imageUrl: "https://i.imgur.com/LsqL52w.png",
          videoTimestamp: 464,
        },
      },
      { eid: "s2_e08", number: 8, title: "Episode 8", videoUrl: "https://www.youtube.com/watch?v=WQkjtJWx7jg",
        immunityChallenge: {
          name: "Who Do You Think They Think?",
          type: "Immunity",
          description: "Jury perception quiz. The jury members answered 30 personality questions about the remaining players — contestants had to guess the jury's majority answer for each question. 20 regulation questions followed by tiebreaker rounds. Winner also received 4 bananas as a reward. Abdul won after a three-way tiebreaker with Ashton and Ben C.",
          winner: "s2_abdul",
          videoTimestamp: 1,
        },
      },
    ],

    tribes: [
      { tid: "s2_blue",   name: "Navy Blue", color: "#1a3c6e", phase: "original" },
      { tid: "s2_red",    name: "Red",       color: "#dc2626", phase: "original" },
      { tid: "s2_yellow", name: "Yellow",    color: "#e6b800", phase: "original" },
      { tid: "s2_beige",  name: "Beige",     color: "#c9a96e", phase: "switched" },
      { tid: "s2_purple", name: "Purple",    color: "#7b2d8e", phase: "switched" },
    ],

    cast: [
      // ── Navy Blue tribe (6) ──────────────────────────────────
      { pid: "s2_caroline",  name: "Caroline",  fullName: "Caroline Kremer",   personId: "caroline_kremer", photoUrl: "https://i.imgur.com/Pq42UDY.png", photoStyle: { objectPosition: "50% -183%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_blue",   placement: 10, juryMember: true, votesAgainst: 4, switchedTid: "s2_beige", merged: true },
      { pid: "s2_benw",      name: "Ben W.",    fullName: "Ben Williams",      photoUrl: "https://i.imgur.com/177kE7y.png", photoStyle: { objectPosition: "50% -10%", transformOrigin: "50% 20%", transform: "scale(1.3)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 5%" }, tid: "s2_blue",   placement: 8, juryMember: true, votesAgainst: 7, switchedTid: "s2_purple", merged: true },
      { pid: "s2_benc",      name: "Ben C.",    fullName: "Ben Currey",        instagram: "https://www.instagram.com/ben_currey/", photoUrl: "https://i.imgur.com/zZ2Uskz.png", photoStyle: { objectPosition: "50% -30%", transformOrigin: "50% 30%", transform: "scale(1.4)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s2_blue",   placement: null, juryMember: false, votesAgainst: 0, switchedTid: "s2_beige", merged: true },
      { pid: "s2_jacob",     name: "Jacob",     fullName: "Jacob Williams",    personId: "jacob_williams", photoUrl: "https://i.imgur.com/IKBqmSa.png", photoStyle: { objectPosition: "50% -162%", transformOrigin: "49% 50%", transform: "scale(1.70)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_blue",   placement: 12, juryMember: false, votesAgainst: 5, switchedTid: "s2_beige", merged: false },
      { pid: "s2_olivia",    name: "Olivia",    fullName: "Olivia Saylor",     personId: "olivia_saylor", photoUrl: "https://i.imgur.com/v15gL2S.png", portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_blue",   placement: 11, juryMember: true, votesAgainst: 7, switchedTid: "s2_beige", merged: true },
      { pid: "s2_phil",      name: "Phil",      fullName: "Phil Johnson",      instagram: "https://www.instagram.com/phill_johnson/", photoUrl: "https://i.imgur.com/75A82Z1.png", photoStyle: { objectPosition: "50% -20%", transformOrigin: "50% 25%", transform: "scale(1.3)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_blue",   placement: 16, juryMember: false, votesAgainst: 5, switchedTid: null, merged: false },

      // ── Red tribe (6) ────────────────────────────────────────
      { pid: "s2_alyssa",    name: "Alyssa",    fullName: "Alyssa French",     instagram: "https://www.instagram.com/alyssafrenchh/", photoUrl: "https://i.imgur.com/3u6Wor2.png", photoStyle: { objectPosition: "50% -10%", transformOrigin: "50% 22%", transform: "scale(1.3)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 5%" }, tid: "s2_red",    placement: 9, juryMember: true, votesAgainst: 1, switchedTid: "s2_purple", merged: true },
      { pid: "s2_kylea",     name: "Kylea",     fullName: "Kylea Dobson",      instagram: "https://www.instagram.com/kdobson_12/", photoUrl: "https://i.imgur.com/Ys122rX.png", photoStyle: { objectPosition: "50% 20%", transformOrigin: "50% 25%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_red",    placement: 15, juryMember: false, votesAgainst: 4, switchedTid: null, merged: false },
      { pid: "s2_abdul",     name: "Abdul",     fullName: "Abdul Alwan",       personId: "abdul_alwan", photoUrl: "https://i.imgur.com/O18he6C.png", photoStyle: { objectPosition: "50% -91%", transformOrigin: "66% 50%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_red",    placement: null, juryMember: false, votesAgainst: 0, switchedTid: "s2_purple", merged: true },
      { pid: "s2_madison",   name: "Madison",   fullName: "Madison Chumbler",  personId: "madison_chumbler", photoUrl: "https://i.imgur.com/VBmfwXj.png", photoStyle: { objectPosition: "50% -73%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_red",    placement: 13, juryMember: false, votesAgainst: 4, switchedTid: "s2_purple", merged: false },
      { pid: "s2_meredith",  name: "Meredith",  fullName: "Meredith Hogue",    personId: "meredith_hogue", photoUrl: "https://i.imgur.com/47WJZvC.png", photoStyle: { objectPosition: "50% -63%", transform: "scale(1.55)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%", transformOrigin: "47% 50%", transform: "scale(1.15)" }, tid: "s2_red",    placement: null, juryMember: false, votesAgainst: 0, switchedTid: "s2_purple", merged: true },
      { pid: "s2_samw",      name: "Sam W.",    fullName: "Sam Williams",      instagram: "https://www.instagram.com/sam.williams123/", photoUrl: "https://i.imgur.com/3J8BU5u.png", photoStyle: { objectPosition: "50% 15%", transformOrigin: "50% 25%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_red",    placement: 14, juryMember: false, votesAgainst: 6, switchedTid: "s2_purple", merged: false },

      // ── Yellow tribe (5) ─────────────────────────────────────
      { pid: "s2_savannah",  name: "Savannah",  fullName: "Savannah Brinley",  personId: "savannah_brinley", photoUrl: "https://i.imgur.com/s9JnOdy.png", photoStyle: { objectPosition: "50% -22%", transformOrigin: "22% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_yellow", placement: null, juryMember: false, votesAgainst: 0, switchedTid: "s2_beige", merged: true },
      { pid: "s2_samr",      name: "Sam R.",    fullName: "Sam Roth",          personId: "sam_roth", photoUrl: "https://i.imgur.com/HfnY3vo.jpeg", photoStyle: { objectPosition: "50% -10%", transform: "scale(1.20)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_yellow", placement: 17, juryMember: false, votesAgainst: 3, switchedTid: null, merged: false },
      { pid: "s2_kelsey",    name: "Kelsey",    fullName: "Kelsey Brown",      personId: "kelsey_brown", photoUrl: "https://i.imgur.com/vb5oY6d.png", photoStyle: { objectPosition: "50% -11%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_yellow", placement: null, juryMember: false, votesAgainst: 0, switchedTid: "s2_purple", merged: true },
      { pid: "s2_sean",      name: "Sean",      fullName: "Sean Stephens",     personId: "sean_stephens", photoUrl: "https://i.imgur.com/VjBqAOH.png", photoStyle: { objectPosition: "50% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s2_yellow", placement: null, juryMember: false, votesAgainst: 5, switchedTid: "s2_beige", merged: true },
      { pid: "s2_ashton",    name: "Ashton",    fullName: "Ashton Sims",       instagram: "https://www.instagram.com/ashtonsims8/", photoUrl: "https://i.imgur.com/bZnfHyw.png", photoStyle: { objectPosition: "50% -15%", transformOrigin: "50% 25%", transform: "scale(1.35)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_yellow", placement: null, juryMember: false, votesAgainst: 0, switchedTid: "s2_beige", merged: true },
    ],

    votingHistory: [
      // ── TC 1: Sam R. eliminated (3-2) — Yellow tribe ──────────────
      {
        tcid: "s2_tc01", eid: "s2_e01", episode: 1, tid: "s2_yellow",
        videoTimestamp: 1873, imageUrl: "https://i.imgur.com/05l3yDi.png",
        notes: "Sean had a Hidden Immunity Idol but did not play it. Sam R. held Safety Without Power but chose not to use it. Sean, Savannah, and Kelsey blindsided Sam R. while Sam and Ashton voted Kelsey.",
        confessionalTimestamp: 2079,
        confessionalQuote: "Honestly, I don't know. I was told to vote Kelsey. I honestly thought that was the play. I thought telling them I had the idol would have been a play that they would have wanted to team up with me later on down the line. But taking the idol out of the game and taking me out of the game, I'm kind of surprised by it.",
        confessionals: [
          { pid: "s2_sean", timestamp: 1727, quote: "I have my idol in my pocket. Probably won't use it because I feel pretty good about the vote. I told Sam that I'm going home because my neck hurts, I don't feel good. So I think he thinks that I'm just going to throw myself on the chopping block. But not sure if that's the best for my game just yet. So we might switch that up." },
          { pid: "s2_savannah", timestamp: 1750, quote: "[I'm feeling] very nervous, very confused. I have no idea what's going on actually still. We're looking at voting out maybe two people and I don't know which one's actually going to happen. I feel like they're probably talking about it right now and hopefully it's not me. Kelsey is a possibility. Sean is acting like he's not feeling well to get Sam out, which is what Kelsey and them think. But Kelsey's name has been thrown out. Not by me, but I am looking at my options." },
          { pid: "s2_ashton", timestamp: 1783, quote: "[I have] little mixed feelings. I think if I had to guess, [the person going home] would be Sam. It puts me in a tough situation because if I don't [vote him], then I'll probably be the next one out." },
          { pid: "s2_kelsey", timestamp: 1811, quote: "[I'm feeling] not good. I think someone has [the idol]. Someone's lying. I think it's Sam. We're going to try to go for him and say that Sean is hurt, he's just not feeling good, and he's okay to go out. My plan is to try to get out with Sam to find the idol with him, to make him think I'm with him because he did pick me. So I think he was open to it." },
          { pid: "s2_samr", timestamp: 1850, quote: "I'm feeling good. I told everyone about my Safety Without Power because I suck at lying basically. They told me about Kelsey, but I think people think that we're voting Sean because his neck hurts right now. So it's either going to be Sean or Kelsey." },
        ],
        eliminatedPid: "s2_samr",
        votes: [
          { vid: "s2_tc01_v1", voterPid: "s2_sean",     votedForPid: "s2_samr" },   // Sean → Sam R.
          { vid: "s2_tc01_v2", voterPid: "s2_savannah",  votedForPid: "s2_samr" },   // Savannah → Sam R.
          { vid: "s2_tc01_v3", voterPid: "s2_kelsey",   votedForPid: "s2_samr" },   // Kelsey → Sam R.
          { vid: "s2_tc01_v4", voterPid: "s2_samr",     votedForPid: "s2_kelsey" }, // Sam R. → Kelsey
          { vid: "s2_tc01_v5", voterPid: "s2_ashton",   votedForPid: "s2_kelsey" }, // Ashton → Kelsey
        ],
      },
      // ── TC 2: Phil eliminated (5-0) — Blue tribe ──────────────
      {
        tcid: "s2_tc02", eid: "s2_e02", episode: 2, tid: "s2_blue",
        videoTimestamp: 1853, imageUrl: "https://i.imgur.com/9miZf3V.png",
        notes: "Phil lost his vote at the Episode 1 journey. The foursome of Ben W., Caroline, Jacob, and Ben C. targeted Phil. Even Olivia, who was in the minority with Phil, voted for him. Caroline had a Hidden Immunity Idol but did not play it.",
        confessionalTimestamp: 2019,
        confessionalQuote: "I knew they were going to vote me out. Eye contact is important. I had zero. And now they're going to be starving while I drink my alcohol. So, congrats.",
        confessionals: [
          { pid: "s2_olivia", timestamp: 1695, quote: "[I think] it's going to really show who's aligned with who. Obviously, the two brothers are aligned together. So it's like do you work with them or do you work against them? Eventually they have to go out but do I do it now or do I do it later?" },
          { pid: "s2_benw", timestamp: 1732, quote: "It sucks we have to go but I went to the bathroom right when we split off so that I could intentionally join the majority group. So I ended up in the foursome and now it's kind of a 4-2 split. The two are Olivia and Phil. So we're talking about voting one of them out. We considered a 2-2 split just in case Phil has an advantage, but that would leave us vulnerable to one person flipping and making it a 3-2-1." },
          { pid: "s2_phil", timestamp: 1767, quote: "I think it's going to be crazy. I don't know what to expect. It's the first one, so we'll see. I'm confused right now, honestly. I feel like I need to have some more conversations. I feel like I might be the target." },
          { pid: "s2_caroline", timestamp: 1788, quote: "[I think] it's going to be Phil, which I hate to say because I really love Phil. But yeah, I think he's going to go and I'm sad." },
          { pid: "s2_jacob", timestamp: 1802, quote: "I feel pretty safe this tribal. I think we're deciding between Phil and whether he has an advantage after that little excursion. We totally told him a lie — we pretended like we're switching to someone. And I don't feel good about it." },
          { pid: "s2_benc", timestamp: 1824, quote: "I like this tribal. We all get along well. We work together as a team. As far as picking somebody, it's tough because we all want to pick each other, but we sent him out to do that thing and we don't know what kind of advantages he has. That's something we're keeping in mind." },
        ],
        eliminatedPid: "s2_phil",
        votes: [
          { vid: "s2_tc02_v1", voterPid: "s2_benw",     votedForPid: "s2_phil" },     // Ben W. → Phil
          { vid: "s2_tc02_v2", voterPid: "s2_jacob",    votedForPid: "s2_phil" },     // Jacob → Phil
          { vid: "s2_tc02_v3", voterPid: "s2_benc",     votedForPid: "s2_phil" },     // Ben C. → Phil
          { vid: "s2_tc02_v4", voterPid: "s2_olivia",   votedForPid: "s2_phil" },     // Olivia → Phil
          { vid: "s2_tc02_v5", voterPid: "s2_caroline",  votedForPid: "s2_phil" },     // Caroline → Phil
          // Phil: no vote (lost at Episode 1 journey)
        ],
      },
      // ── TC 3: Kylea eliminated (4-1) — Red tribe ──────────────
      {
        tcid: "s2_tc03", eid: "s2_e02", episode: 2, tid: "s2_red",
        videoTimestamp: 2197, imageUrl: "https://i.imgur.com/05lfsX0.png",
        notes: "Abdul lost his vote at the Episode 1 journey. The returning players (Abdul, Madison, Meredith) along with Alyssa and Sam W. unanimously targeted Kylea. Kylea was blindsided — she thought the vote was for Sam. Meredith had a Hidden Immunity Idol but did not play it.",
        confessionalTimestamp: 2382,
        confessionalQuote: "I got voted out. I thought we were voting Sam, so I was a little bit bummed, but everybody lied to me.",
        confessionals: [
          { pid: "s2_meredith", timestamp: 2032, quote: "I'm feeling pretty confident. I feel safe right now. I think the group has come to a good consensus of who we want to get rid of. [Who is that?] I think Kylea." },
          { pid: "s2_abdul", timestamp: 2046, quote: "It's pretty dirty in there, but I think Sam or Kylea is going to be the one to go, or myself. [Who are you voting for?] Kylea. I think she's very athletic, but she wants to play every single challenge and it sometimes brings us down." },
          { pid: "s2_kylea", timestamp: 2076, quote: "I've never done a tribal council before. People are saying different things and I just feel bad. [Who do you think might be going?] I think unfortunately Sam." },
          { pid: "s2_madison", timestamp: 2092, quote: "I'm scared because I just learned that Sam is trying to vote my ass out and I was about to go tell him that I wanted to work with him. [Are you targeting him?] That's the fake out vote, but I really want to go for Kylea." },
          { pid: "s2_alyssa", timestamp: 2119, quote: "It's really intense. We have three really strong returning players and then outsiders. There are like three or four big threats. I might have to give in to the vote that everyone else is making. [Who is it?] I think it's Kylea." },
          { pid: "s2_samw", timestamp: 2177, quote: "I'm very scared of Madison. I don't want to keep her in the game, but we do not have the manpower right now. She's the one I'm most scared of. I think it's either Madison or Meredith that has the idol right now." },
        ],
        eliminatedPid: "s2_kylea",
        votes: [
          { vid: "s2_tc03_v1", voterPid: "s2_madison",   votedForPid: "s2_kylea" },   // Madison → Kylea
          { vid: "s2_tc03_v2", voterPid: "s2_alyssa",    votedForPid: "s2_kylea" },   // Alyssa → Kylea
          { vid: "s2_tc03_v3", voterPid: "s2_meredith",  votedForPid: "s2_kylea" },   // Meredith → Kylea
          { vid: "s2_tc03_v4", voterPid: "s2_samw",      votedForPid: "s2_kylea" },   // Sam W. → Kylea
          { vid: "s2_tc03_v5", voterPid: "s2_kylea",     votedForPid: "s2_samw" },    // Kylea → Sam W.
          // Abdul: no vote (lost at Episode 1 journey)
        ],
      },
      // ── TC 4: Sam W. eliminated (5-2) — Purple tribe ──────────────
      {
        tcid: "s2_tc04", eid: "s2_e03", episode: 3, tid: "s2_purple",
        videoTimestamp: 2070, imageUrl: "https://i.imgur.com/GhHmPDt.png",
        notes: "Meredith had a Hidden Immunity Idol but did not play it. Kelsey had Safety Without Power (won at the journey) but did not play it. Sam W. was blindsided — he thought the vote was going to Abdul or Madison. The Williams brothers (Sam W. and Ben W.) voted together for Abdul but were outnumbered 5-2.",
        confessionalTimestamp: 2292,
        confessionalQuote: "In hindsight it makes sense because you have the three Williams brothers. I thought it was Abdul and Madison going for each other that whole time and I thought we had the numbers for Abdul. I guess that means Kelsey had to have gone me, which I regret. I should have made a tighter bond with Kelsey quicker because we didn't talk too much. Everyone I was talking to was going Abdul, literally everyone. And then Abdul said Madison. So from my point of view it looked like the two people going at it. No one tipped me off. They kept that sealed. I thought I had pretty good alliances with Alyssa but maybe not.",
        confessionals: [
          { pid: "s2_meredith", timestamp: 1892, quote: "[I'm feeling] good still. I have some strong alliances and I feel like we're going to try to break up the Williams brothers. [Which one are you going for?] Sam." },
          { pid: "s2_samw", timestamp: 1905, quote: "[I'm feeling] not great. This is chaos. It's complete chaos. It's the most structured, ridiculous chaos I've ever seen. Abdul wants to spin a bottle to figure out who is going to talk to who and I'm trying to organize some stuff and he's very much strongarming everything so that there's only two groups of people. He's trying to line his ducks up. Hate it. We're talking about maybe him, maybe Madison." },
          { pid: "s2_kelsey", timestamp: 1934, quote: "[I'm feeling] not good. Still I think everybody's scrambling. I have a Safety Without Power. We're still scrambling in there. Sounds like there's two groups kind of forming, but there's some slippage. [Who are you hoping goes?] Sam. I'm scared of him." },
          { pid: "s2_madison", timestamp: 1974, quote: "Sam's being sneaky again. [Is that who you want to go?] Yeah, we just made a girl alliance. It's kind of fun." },
          { pid: "s2_samw", timestamp: 1988, quote: "I don't think it's me, so I'm happy. Hopefully. I think it's between Madison and Abdul. Madison, I think it would be. So that's spicy." },
          { pid: "s2_alyssa", timestamp: 2002, quote: "It's really intense. We got like a girl-boy situation going on and then we got like couples going on. It's going to be a tough one for sure. [Who are you voting with?] The girls. We've kind of grouped together. We're pretty set on [voting] Sam." },
          { pid: "s2_abdul", timestamp: 2033, quote: "[I'm feeling] pretty good. Names being thrown out. The Williams brothers want Madison — they are gunning for her. Sam went to Kelsey when we were all scheming to get Kelsey out and told Kelsey to use her Shot in the Dark. She told me that and I was like yeah, don't. Sam is trying to jump alliances. He's just like his brother — little snake rascal." },
        ],
        eliminatedPid: "s2_samw",
        votes: [
          { vid: "s2_tc04_v1", voterPid: "s2_meredith",  votedForPid: "s2_samw" },    // Meredith → Sam W.
          { vid: "s2_tc04_v2", voterPid: "s2_madison",   votedForPid: "s2_samw" },    // Madison → Sam W.
          { vid: "s2_tc04_v3", voterPid: "s2_abdul",     votedForPid: "s2_samw" },    // Abdul → Sam W.
          { vid: "s2_tc04_v4", voterPid: "s2_alyssa",    votedForPid: "s2_samw" },    // Alyssa → Sam W.
          { vid: "s2_tc04_v5", voterPid: "s2_kelsey",    votedForPid: "s2_samw" },    // Kelsey → Sam W.
          { vid: "s2_tc04_v6", voterPid: "s2_samw",      votedForPid: "s2_abdul" },   // Sam W. → Abdul
          { vid: "s2_tc04_v7", voterPid: "s2_benw",      votedForPid: "s2_abdul" },   // Ben W. → Abdul
        ],
      },
      {
        tcid: "s2_tc05", eid: "s2_e04", episode: 4, tid: "s2_purple",
        videoTimestamp: 621, imageUrl: "https://i.imgur.com/UySZo8f.png",
        notes: "Abdul orchestrated the vote against Madison after she was unwilling to commit to a target. Meredith had a Hidden Immunity Idol but did not play it. Kelsey had Safety Without Power but did not play it. Madison thought the plan was to vote out Kelsey but got cold feet and voted Ben W. instead. Abdul flipped the vote to Madison.",
        confessionalTimestamp: 878,
        confessionalQuote: "I'm pretty sure [what happened], which is really rude, but also I literally don't think my heart can handle anymore, so I'm kind of glad. [How was the experience?] Way harder than last year. Really, because I actually know people and I actually care about people. [What happened with the vote?] I think I got cold feet and Abdul probably flipped on me because I was going to vote for Ben and not for Kelsey. But maybe the Kelsey plan was all a lie. I really don't know.",
        confessionals: [
          { pid: "s2_alyssa", timestamp: 446, quote: "[How are you feeling about this tribal?] I'm scared. I don't know. I feel like we're going to vote for Ben, but I'm scared that that's fake." },
          { pid: "s2_meredith", timestamp: 477, quote: "[What's about to happen?] I honestly have no idea. We have not come to a consensus at all. Everyone is throwing out everyone's name, so I have no idea. [Who would you most want to go?] I think right now I would want Alyssa or Kelsey. I feel like Kelsey is dangerous when we get to the merge, and Alyssa just doesn't really have anybody." },
          { pid: "s2_benw", timestamp: 503, quote: "I got blindsided the last vote. There were three layers of plans I was in on and there was a fourth layer on top of it. These guys are insane. Right now talking with Abdul about maybe [voting] Madison. Madison was unwilling to drop a name, so I don't trust her. I don't feel safe at all. I don't feel good." },
          { pid: "s2_kelsey", timestamp: 532, quote: "Madison puts my name out there. It's going to be close. Just a matter of who I can trust. On the fence of using [my] advantage, but I think if we do that, then the votes will be split and we'll get nowhere. It's going to be risky, but hopefully I can trust two people." },
          { pid: "s2_madison", timestamp: 556, quote: "[How are you feeling?] I'm unwell. [You want to vote Kelsey out?] I can't do it. At least when she sees this, she'll know that I was sad about it. She's scary when she gets back with the people from the other side. I don't know if that's going to happen, but if it doesn't, I'm sorry." },
          { pid: "s2_abdul", timestamp: 582, quote: "I got my nail torn out and man did that hurt. I heard chatter about Meredith throwing it out there with the two brothers. I am playing the biggest game and I am trying to switch everyone to go Madison. I tried to make up lines with her, but I just cannot trust her. If this works, I pulled off the greatest [move] in Survivor history." },
        ],
        eliminatedPid: "s2_madison",
        votes: [
          { vid: "s2_tc05_v1", voterPid: "s2_abdul",     votedForPid: "s2_madison" },   // Abdul → Madison
          { vid: "s2_tc05_v2", voterPid: "s2_kelsey",    votedForPid: "s2_madison" },   // Kelsey → Madison
          { vid: "s2_tc05_v3", voterPid: "s2_benw",      votedForPid: "s2_madison" },   // Ben W. → Madison
          { vid: "s2_tc05_v4", voterPid: "s2_alyssa",    votedForPid: "s2_madison" },   // Alyssa → Madison
          { vid: "s2_tc05_v5", voterPid: "s2_madison",   votedForPid: "s2_benw" },      // Madison → Ben W.
          { vid: "s2_tc05_v6", voterPid: "s2_meredith",  votedForPid: "s2_benw" },      // Meredith → Ben W.
        ],
      },
      // ── TC 6a: Tie vote (1-1) — Beige, Ep5 — idol play + SITD ─
      {
        tcid: "s2_tc06a", eid: "s2_e05", episode: 5, tid: "s2_beige",
        videoTimestamp: 3886, imageUrl: "https://i.imgur.com/DXSJqhN.png",
        notes: "Sean used his Shot in the Dark (not safe). After seeing it miss, he got up and played his Hidden Immunity Idol on himself, nullifying all four votes against him. With Sean's vote forfeited to the Shot in the Dark, only Ashton's vote for Jacob and Savannah's vote for Olivia counted, resulting in a 1-1 tie.",
        confessionals: [
          { pid: "s2_benc", timestamp: 3661, quote: "We were all talking. It's a lot going on at once. I think we all agreed that Sean kind of poses a threat, especially him and Savannah later on. They're like a dynamic duo that we kind of want to separate. I heard Jacob's name being thrown around too because of his brother. [Who would you rather go?] I think I'm going to go with Sean." },
          { pid: "s2_caroline", timestamp: 3691, quote: "I'm very stressed. I think it's going to be Jacob or Sean. We think Sean has an idol. So, we're going to try and flush it. And then if Sean flushes it, then maybe Jacob will go home." },
          { pid: "s2_olivia", timestamp: 3706, quote: "Terrible. Every room I go to, different name. Different name. Different name. So now I think I'm in trouble. Anybody but me, I'll be fine. [Who are you hearing?] Jacob, Sean, Ashton is what I'm hearing, but I think people are just throwing names out so I feel comfortable. [Who are you voting?] Sean, I think." },
          { pid: "s2_savannah", timestamp: 3741, quote: "I have a meeting with everybody pretty much. At first it was like we're going to do Ashton, but then we think he's kind of followed our votes since the very beginning. Now I think it's [Sean] but we shall see. I might be going home." },
          { pid: "s2_ashton", timestamp: 3767, quote: "[How are you feeling?] Nervous. There's been like four different conversations and the name changes every time. [Who do you think you might write down?] I'm honestly not sure. [Who are the names?] Literally everyone." },
          { pid: "s2_sean", timestamp: 3793, quote: "There's a lot going on. Everybody's throwing everybody's name out. I have an idol. May play it. Don't know yet. May play a shot in the dark. A couple people know about the idol but everybody still has everybody's name out. The only person I haven't heard is my name. I'm kind of in line with Savannah and Ashton. I think it'll probably be Olivia or Jacob tonight." },
          { pid: "s2_jacob", timestamp: 3828, quote: "Seven lies in a row. It's really confusing and I've been so confusing who I've told what. I'm a little dizzy in my head. I think we're good with Ben, Caroline... talking with Sean and we're talking about Olivia even though I know Sean's name." },
        ],
        eliminatedPid: null,
        votes: [
          { vid: "s2_tc06a_v1", voterPid: "s2_ashton",    votedForPid: "s2_jacob" },     // Ashton → Jacob
          { vid: "s2_tc06a_v2", voterPid: "s2_benc",      votedForPid: "s2_sean", idolNullified: true },     // Ben C. → Sean (nullified)
          { vid: "s2_tc06a_v3", voterPid: "s2_jacob",     votedForPid: "s2_sean", idolNullified: true },     // Jacob → Sean (nullified)
          { vid: "s2_tc06a_v4", voterPid: "s2_caroline",  votedForPid: "s2_sean", idolNullified: true },     // Caroline → Sean (nullified)
          { vid: "s2_tc06a_v5", voterPid: "s2_olivia",    votedForPid: "s2_sean", idolNullified: true },     // Olivia → Sean (nullified)
          { vid: "s2_tc06a_v6", voterPid: "s2_savannah",  votedForPid: "s2_olivia" },    // Savannah → Olivia
          // Sean: used Shot in the Dark (not safe) — no vote cast
        ],
      },
      // ── TC 6b: Revote — Jacob eliminated (4-0) — Beige, Ep5 ─
      {
        tcid: "s2_tc06b", eid: "s2_e05", episode: 5, tid: "s2_beige",
        confessionalTimestamp: 4523,
        confessionalQuote: "10 minutes before tribal, Olivia and I sat down and we knew Sean had an idol. Someone caught him a long time ago. So, we knew we could be the collateral tonight. I'm a little shocked that on the revote that I got out. I wish I played my shot in the dark because my vote didn't really matter on Sean there and I didn't realize that until I walked out of the voting room.",
        notes: "Revote. Jacob and Olivia were immune as the tied players. Sean had no vote (used Shot in the Dark). Savannah, Caroline, Ben C., and Ashton revoted — all four voted Jacob.",
        eliminatedPid: "s2_jacob",
        votes: [
          { vid: "s2_tc06b_v1", voterPid: "s2_savannah",  votedForPid: "s2_jacob" },    // Savannah → Jacob
          { vid: "s2_tc06b_v2", voterPid: "s2_caroline",  votedForPid: "s2_jacob" },    // Caroline → Jacob
          { vid: "s2_tc06b_v3", voterPid: "s2_benc",      votedForPid: "s2_jacob" },    // Ben C. → Jacob
          { vid: "s2_tc06b_v4", voterPid: "s2_ashton",    votedForPid: "s2_jacob" },    // Ashton → Jacob
        ],
      },
      // ── TC 7: Olivia eliminated (6-4) — Merged, Ep6 ────────
      {
        tcid: "s2_tc07", eid: "s2_e06", episode: 6, tid: null,
        videoTimestamp: 1,
        imageUrl: "https://i.imgur.com/xydjof2.png",
        notes: "Kelsey played her Safety Without Power, leaving tribal before the vote and forfeiting her vote.",
        confessionalTimestamp: 2408,
        confessionalQuote: "I think Kelsey playing her Safety Without Power really messed us up because we had the votes for Sean. We had a 6-5 vote, but then she used that. So then we had a 5-5. Well, I thought we would have a 5-5. So, somebody flipped. I think it was Alyssa because I didn't get to talk to her at the end. But it's fine. I mean, you come second last season, the first place winner is not here. You automatically know you're a threat.",
        confessionals: [
          { pid: "s2_meredith", timestamp: 1660, quote: "[I'm feeling] good. I'm feeling a little nervous this time. I feel like Kelsey, Abdul, and Alyssa have some sort of alliance after they all voted Madison out without telling me. I feel like they're trying to get people to put me out, so I'm a little nervous." },
          { pid: "s2_benw", timestamp: 1673, quote: "I'm the rat right now a little bit. The guys all want to get Olivia. They said walking down, don't tell anybody, we're going to try to flip Savannah. Savannah seemed down. It's all good, but I don't trust them long term. And the connections I have with Kelsey and Alyssa and Caroline. So, I told Kelsey and Alyssa what the plan was, and I said I wanted to work with them. They seem like they're okay with getting rid of Olivia for this vote so that we kind of settle the waters and then I might end up going with them." },
          { pid: "s2_olivia", timestamp: 1710, quote: "[I'm feeling] okay. I think I'm okay this round, but I'm in trouble. I know people are saying my name, but I think I have enough votes to get me through. [Who are you going for?] It depends on if I want to stick with the girls or not. The girls want to vote either Sean or Ben W., but then all the guys want to vote Alyssa. So, it's like I have to go with one of the majorities. It's just who do I find is a bigger threat." },
          { pid: "s2_abdul", timestamp: 1751, quote: "[How did you feel about not getting paired up?] I was kind of upset. Sean snaked me pretty quick. But after getting back to camp, I was pretty happy with what I found. I got an idol and an advantage in the final seven should I make it that far. But if I don't, I can use it strategically because I can hand it off to another person if I get voted out. So hopefully this will help me forge my alliances. [How you feeling about this tribal?] Pretty good. Don't know if I should use mine or not." },
          { pid: "s2_caroline", timestamp: 1791, quote: "[I'm feeling] great this round. However, I don't know how this vote is going to go. There have been multiple names brought up. I think we're definitely testing some alliances. People are starting to piece together who's working with who. Should be interesting." },
          { pid: "s2_kelsey", timestamp: 1815, quote: "Literally every conversation has been confusing. I'm really debating playing my [Safety Without Power]. Nobody's showing their loyalty. I've heard just about every name tonight. It's looking like there may be a guys alliance, but we just don't know who to trust." },
          { pid: "s2_alyssa", timestamp: 1837, quote: "[I'm feeling] crazy. There's crazy stuff going on in there right now. It's all snakes. Everybody's a snake. I don't know who to trust. I don't trust anyone actually. And everybody's got that look in their eyes and I'm really scared. [Who are you hoping goes home?] Olivia. [Who's going to be with you in that vote?] Sean, Savannah, Kelsey, Caroline." },
          { pid: "s2_ashton", timestamp: 1864, quote: "[I'm feeling] good. Everybody's going around talking to everybody. Nobody's really sure. [Who do you think you might vote for?] Probably Olivia. [Who are you voting with?] I think as the guys, we kind of decided that there are more girls and if we let them stay in the game, it's kind of over for us." },
          { pid: "s2_savannah", timestamp: 1891, quote: "[I'm] not feeling too bad. But I am still a little bit confused about who I'm going to write down, but not really at the same time because I really want to vote Olivia out for last tribal, but there are like two alliances going on and I am kind of in between both of them. I am going with my gut and writing Olivia down." },
          { pid: "s2_sean", timestamp: 1919, quote: "We're boys and girls right now. The boys have been able to pull Alyssa and Savannah over with us. But now we find out that one of the boys is a snake in the grass. [Who's that?] Ben Williams, the brother. Little bit of a snake. We might flip to him. We might vote Olivia. We might do something else. Haven't decided yet, but we'll figure it out before tribal. [You look a little tired.] I'm so tired. It's actually insane." },
          { pid: "s2_benc", timestamp: 1968, quote: "Classic just boys and girls separated immediately. We've realized especially after Jacob getting voted out that we probably need to go with a girl for sure. Someone who has a lot of pull. I'm thinking Olivia. Especially with what she has with Caroline. There was no convincing Caroline to vote for Jacob last round." },
        ],
        eliminatedPid: "s2_olivia",
        votes: [
          { vid: "s2_tc07_v01", voterPid: "s2_sean",      votedForPid: "s2_olivia" },   // Sean → Olivia
          { vid: "s2_tc07_v02", voterPid: "s2_caroline",   votedForPid: "s2_sean" },     // Caroline → Sean
          { vid: "s2_tc07_v03", voterPid: "s2_olivia",     votedForPid: "s2_sean" },     // Olivia → Sean
          { vid: "s2_tc07_v04", voterPid: "s2_alyssa",     votedForPid: "s2_olivia" },   // Alyssa → Olivia
          { vid: "s2_tc07_v05", voterPid: "s2_ashton",     votedForPid: "s2_olivia" },   // Ashton → Olivia
          { vid: "s2_tc07_v06", voterPid: "s2_savannah",   votedForPid: "s2_olivia" },   // Savannah → Olivia
          { vid: "s2_tc07_v07", voterPid: "s2_abdul",      votedForPid: "s2_olivia" },   // Abdul → Olivia
          { vid: "s2_tc07_v08", voterPid: "s2_benc",       votedForPid: "s2_olivia" },   // Ben C. → Olivia
          { vid: "s2_tc07_v09", voterPid: "s2_meredith",   votedForPid: "s2_sean" },     // Meredith → Sean
          { vid: "s2_tc07_v10", voterPid: "s2_benw",       votedForPid: "s2_sean" },     // Ben W. → Sean
        ],
      },
      // ── TC 8: Caroline eliminated (4-1) — Merged, Ep7 (Group 1: upstairs) ──
      {
        tcid: "s2_tc08", eid: "s2_e07", episode: 7, tid: null,
        videoTimestamp: 719,
        imageUrl: "https://i.imgur.com/lcWtwep.png",
        notes: "Caroline had a Hidden Immunity Idol but did not play it.",
        confessionalTimestamp: 863,
        confessionalQuote: "I'm so stupid. I had an idol and I didn't play it. My own fault. I have no words. It's so much fun. I'm so excited to play this. I'm gonna be thinking about this for a while. But I had fun. Damn it. I'm so upset.",
        confessionals: [
          { pid: "s2_abdul", timestamp: 604, quote: "[I'm] back into familiar territory. Won a challenge every single year. Same thing. Feeling good, feel safe now. I'm kind of just controlling. Everybody's like real puppets in my hands. And I think Caroline [is going home] and that's from what she did to me last year. Revenge is a bitch." },
          { pid: "s2_caroline", timestamp: 626, quote: "Paranoia's starting to set in. Everyone's hanging with Ashton. I feel like it could be me. Trying to decide if I want to play my idol or not. Leaning towards no, but I'm going to be so upset if I don't play it." },
          { pid: "s2_savannah", timestamp: 641, quote: "[I'm feeling] okay. I am really tired and hungry and I'm really upset that I didn't get a pizza. I think this will go the way that we want it to. And if that's the case, Caroline will be going home tonight." },
          { pid: "s2_ashton", timestamp: 657, quote: "[I'm] a little nervous. I've heard my name got passed around and Caroline's name. So, we'll see. [Are you going for Caroline?] Most likely." },
          { pid: "s2_kelsey", timestamp: 679, quote: "I evidently didn't really need to use my [Safety Without Power], but it was too risky. I had heard my name too many times. Now somebody's going to be betrayed, so I'm hoping it's not me. I'm so sorry, Caroline. We only formed together this past time, so I just don't feel like we had a long-standing alliance that I can trust." },
        ],
        eliminatedPid: "s2_caroline",
        votes: [
          { vid: "s2_tc08_v1", voterPid: "s2_abdul",     votedForPid: "s2_caroline" },   // Abdul → Caroline
          { vid: "s2_tc08_v2", voterPid: "s2_savannah",   votedForPid: "s2_caroline" },   // Savannah → Caroline
          { vid: "s2_tc08_v3", voterPid: "s2_caroline",   votedForPid: "s2_ashton" },     // Caroline → Ashton
          { vid: "s2_tc08_v4", voterPid: "s2_kelsey",     votedForPid: "s2_caroline" },   // Kelsey → Caroline
          { vid: "s2_tc08_v5", voterPid: "s2_ashton",     votedForPid: "s2_caroline" },   // Ashton → Caroline
        ],
      },
      // ── TC 9: Alyssa eliminated (1-0) — Merged, Ep7 (Group 2: basement) ──
      {
        tcid: "s2_tc09", eid: "s2_e07", episode: 7, tid: null,
        videoTimestamp: 1024,
        imageUrl: "https://i.imgur.com/3qo9foF.png",
        notes: "Meredith played her Hidden Immunity Idol on herself, nullifying all 4 votes against her. Only Meredith's vote for Alyssa counted.",
        confessionalTimestamp: 1229,
        confessionalQuote: "I blew it. I blew my cover and she knew I was snaking because I admitted to voting Olivia out. I'm just disappointed that she didn't believe that I found the other idol. I've had a much better run than I anticipated.",
        confessionals: [
          { pid: "s2_benw", timestamp: 884, quote: "The Denver lungs bought me another day. I have a lot of power right now. I really want to keep Ben C. with me and possibly use him down the road and then it's kind of between Sean and Meredith in my mind. I'm leaning Meredith, but it's kind of in the air. I think people will target Sean later and that can be good for me." },
          { pid: "s2_meredith", timestamp: 918, quote: "[I'm feeling] not good at all. Two of my main alliances are gone and the girls are outnumbered by the boys. I feel like one of the girls is gonna go home. Me or Alyssa." },
          { pid: "s2_sean", timestamp: 943, quote: "The biggest bullseye ever is right on my back. We have Alyssa and Ben as our two swing votes and they will determine if I go home tonight or if Meredith goes home tonight. I might have something in my pocket to help out with this situation." },
          { pid: "s2_alyssa", timestamp: 976, quote: "I don't know. I did find the clue, so I prepared it and people think that I probably have the idol. I'm nervous and I think we're voting Meredith." },
          { pid: "s2_benc", timestamp: 1001, quote: "[I'm feeling] good. It's kind of a Sean vs. Meredith situation. I'm leaning Meredith because Sean definitely has a target on his back, so I'd be okay leaving him in the field. And Meredith's a good player." },
        ],
        idols: [
          { playerPid: "s2_meredith", playedOn: "s2_meredith" },
        ],
        eliminatedPid: "s2_alyssa",
        votes: [
          { vid: "s2_tc09_v1", voterPid: "s2_benw",      votedForPid: "s2_meredith", idolNullified: true },   // Ben W. → Meredith (nullified)
          { vid: "s2_tc09_v2", voterPid: "s2_alyssa",     votedForPid: "s2_meredith", idolNullified: true },   // Alyssa → Meredith (nullified)
          { vid: "s2_tc09_v3", voterPid: "s2_meredith",   votedForPid: "s2_alyssa" },                         // Meredith → Alyssa
          { vid: "s2_tc09_v4", voterPid: "s2_benc",       votedForPid: "s2_meredith", idolNullified: true },   // Ben C. → Meredith (nullified)
          { vid: "s2_tc09_v5", voterPid: "s2_sean",       votedForPid: "s2_meredith", idolNullified: true },   // Sean → Meredith (nullified)
        ],
      },
      // ── TC 10: Ben W. eliminated (5-1) — Merged, Ep8 ────────
      {
        tcid: "s2_tc10", eid: "s2_e08", episode: 8, tid: null,
        videoTimestamp: 1815,
        imageUrl: "https://i.imgur.com/HXRaZpG.png",
        notes: "Meredith played her Hidden Immunity Idol on herself, nullifying 1 vote. Ben W. used his Shot in the Dark (not safe) and forfeited his vote. Abdul had a Hidden Immunity Idol and the Final 7 Advantage but did not play either.",
        confessionalTimestamp: 2031,
        confessionalQuote: "I kind of flipped on the guys. I didn't want to but they went after Kelsey and that was the problem. I was on board the Olivia boat. They flip on Kelsey and I was aligned with Kelsey. So I told her to play her advantage and then I ended up voting Sean because I thought they might be voting for me. None of the guys trusted me. I asked Ben C. very directly, 'Has my name come up?' And he said no. And I knew they had thrown my name out. At one point there's three people in one room, three people in the other. I try to join both and they both push me away. I've torched everything. I needed Alyssa or Caroline in the game. Them going home really shot me.",
        confessionals: [
          { pid: "s2_meredith", timestamp: 1503, quote: "I woke up right at 2:30 and made it out [to the mailbox] without anyone seeing me. When I came back, I'm pretty sure Kelsey saw me. [I'm] obviously really nervous after last tribal getting voted by everybody. I think Sean is coming for me. I think him and Abdul have some sort of alliance now. So I think either they're going to vote me or Ben Williams." },
          { pid: "s2_benc", timestamp: 1569, quote: "Very confusing because I think we figured out that Meredith has an [idol], so we kind of want her to get rid of it. We'd like her to think we're voting her out, but not voting her out. [Our alliance is] pretty much the guys minus Ben [W.]. So we're thinking about Ben out, but I haven't made a decision yet." },
          { pid: "s2_kelsey", timestamp: 1598, quote: "There's obviously a tight little alliance, probably Sean being the leader. And then there's kind of a few stragglers trying to team up against Sean. [Am I a straggler?] I don't know. I really don't know." },
          { pid: "s2_sean", timestamp: 1634, quote: "This one don't feel good about. I think my alliance of five is flipping up pretty quick. Abdul has immunity. Apparently Meredith has an immunity idol that we are going to try to flush today, but getting the votes is going to be harder than I thought." },
          { pid: "s2_savannah", timestamp: 1675, quote: "I can't wait till Sean sees [what's coming] because he's freaking crazy and being psychotic. Everybody wants to vote for him but they also don't. I think we know Meredith has an idol because she found it yesterday. We're trying to have her think [she's the target] and hopefully flush it out." },
          { pid: "s2_abdul", timestamp: 1702, quote: "I won. It's pretty easy. I just had to guess myself basically 80% of the time. We found out that Meredith has an idol and we want her to play it. So we're trying to mislead her into thinking we're voting her so we can get Ben out. And then next round, we would target the big alpha tyrant Sean because he's been running the game from behind the scenes. I thought I had a loud voice, but Sean speaks over me and I sit down and listen. We got to get that man out of here." },
          { pid: "s2_ashton", timestamp: 1741, quote: "We know people have idols, so we got to bring those out. The plan is actually to get [Meredith] to think we're voting her out so she uses her idol or her Shot in the Dark, and then we flip and get somebody else out." },
          { pid: "s2_benw", timestamp: 1780, quote: "We feel very endangered right now. I know my name is spreading like wildfire. My biggest alliances were Alyssa and Caroline and they both went home last time. I think it sounds like it's between Meredith and Sean, but I know my name's out there too. I think I want to go for Sean this time." },
        ],
        idols: [
          { playerPid: "s2_meredith", playedOn: "s2_meredith" },
        ],
        eliminatedPid: "s2_benw",
        votes: [
          { vid: "s2_tc10_v1", voterPid: "s2_benc",      votedForPid: "s2_benw" },                          // Ben C. → Ben W.
          { vid: "s2_tc10_v2", voterPid: "s2_ashton",    votedForPid: "s2_benw" },                           // Ashton → Ben W.
          { vid: "s2_tc10_v3", voterPid: "s2_meredith",  votedForPid: "s2_sean" },                           // Meredith → Sean
          // Ben W. used Shot in the Dark (not safe) — vote forfeited
          { vid: "s2_tc10_v4", voterPid: "s2_sean",      votedForPid: "s2_benw" },                           // Sean → Ben W.
          { vid: "s2_tc10_v5", voterPid: "s2_kelsey",    votedForPid: "s2_meredith", idolNullified: true },   // Kelsey → Meredith (nullified)
          { vid: "s2_tc10_v6", voterPid: "s2_abdul",     votedForPid: "s2_benw" },                           // Abdul → Ben W.
          { vid: "s2_tc10_v7", voterPid: "s2_savannah",  votedForPid: "s2_benw" },                           // Savannah → Ben W.
        ],
      },
    ],
    challenges: [],
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
