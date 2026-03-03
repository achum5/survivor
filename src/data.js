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
        immunityChallenge: { name: "Nothing But Net", type: "Immunity", description: "A basketball free throw shooting competition. Players lined up and shot one at a time, alternating between tribes. First team to six misses lost immunity and went to tribal council.", winner: "s1_t2",
          imageUrl: "https://i.imgur.com/9w4qvbD.png",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t1", place: 2 }], sitOuts: ["s1_p09"] } },
      { eid: "s1_e03", number: 3,  title: "Episode 3",  videoUrl: "https://youtu.be/qPJoYyABYHE?t=852",
        rewardChallenge:   { name: null, description: null, winner: null, reward: null },
        immunityChallenge: { name: "Word Scramble", type: "Immunity", description: "Each tribe received a sheet of paper and had 3 minutes to write down as many valid words (3+ letters) as they could form from the letters in the word \"CHALLENGE\". Words were scored against a pre-made Scrabble-valid answer key, and teams graded each other's lists. Most valid words won immunity; the two lowest-scoring tribes went to tribal council. One player was caught writing after time was called and received a −1 penalty. The winning tribe also got to pick their camp spot and received pizza.", winner: "s1_t2",
          imageUrl: "https://i.imgur.com/q7cq6UY.png",
          results: [{ id: "s1_t2", place: 1 }, { id: "s1_t3", place: 2 }, { id: "s1_t4", place: 3 }], sitOuts: [] } },
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
        immunityChallenge: { name: "Paper Airplane Toss", type: "Immunity", description: "Alex is dumb. Challenge was not recorded. Abdul won immunity.", winner: "s1_p05", imageUrl: "https://i.imgur.com/IzbWgBH.png" } },
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
      { pid: "s1_p02", name: "Olivia",   fullName: "Olivia Saylor", instagram: "https://www.instagram.com/olivia_saylor_/", photoUrl: "https://i.imgur.com/v15gL2S.png", portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 2,  juryMember: false, votesAgainst: 3,  switchedTid: "s1_t3", merged: true,
        bio: [
          "Olivia started on the Purple tribe, which lost both of the first two immunity challenges. She voted with the majority both times, helping eliminate Sam R. (6-1) and Marissa (5-1). After the tribe switch, she landed on the Blue tribe with Jace, Madison, and Sean.",
          "At Blue's Tribal Council, Olivia made the season's first big move — playing a hidden immunity idol on herself. Though no votes had actually been cast against her, the play created chaos: the vote tied 2-2 between Madison and Sean, and on the revote Jace was forced to flip and send Sean home to avoid a rock draw. It was a bold and disruptive play that reshaped Blue's dynamics heading into the merge.",
          "After the merge, Olivia voted with the majority in most rounds — including the 8-1 vote against Savannah and the 5-3 blindside of Kelsey. When the majority alliance targeted Abdul and then Jace, both plays were thwarted by hidden immunity idols, with Olivia's votes nullified in back-to-back episodes. At the final five, she voted with Meredith and Caroline to take out Abdul 3-2.",
          "Olivia won the final four immunity challenge — Images Under Cups, a memory matching game where she figured out the hidden pattern of the images to pull ahead. She chose Meredith to join her in the Final Three, sending Jace and Caroline to the fire-making challenge. At Final Tribal Council, Olivia received one jury vote from Dom, finishing as the runner-up to Jace's 8-1 victory.",
        ] },
      { pid: "s1_p03", name: "Meredith", fullName: "Meredith Hogue", photoUrl: "https://i.imgur.com/47WJZvC.png", photoStyle: { objectPosition: "50% -63%", transform: "scale(1.55)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%", transformOrigin: "47% 50%", transform: "scale(1.15)" }, tid: "s1_t1", placement: 3,  juryMember: false, votesAgainst: 5,  switchedTid: "s1_t5", merged: true,
        bio: [
          "Meredith began on the Purple tribe, which lost the first two immunity challenges. She voted with the majority to eliminate Sam R. and Marissa, though Sam cast his lone vote against her in the first Tribal Council. After the tribe switch, she was placed on the Orange tribe, which avoided Tribal Council during the pre-merge phase.",
          "At the merge, Meredith voted with the majority alliance consistently — the 8-1 vote against Savannah, the 5-3 blindside of Kelsey, and both rounds where the majority targeted Abdul and Jace (though both were nullified by idol plays). She received three votes at the Kelsey Tribal Council from Caroline, Abdul, and Kelsey, but survived comfortably as the majority held.",
          "Meredith won the Episode 9 immunity challenge — Kentucky Derby, a three-stage endurance and puzzle challenge where she solved the final word scramble first, guaranteeing herself a spot in the final four. She then joined Olivia and Caroline in the pivotal 3-2 vote that sent Abdul home. Olivia selected Meredith to join her in the Final Three after winning the final immunity challenge.",
          "At Final Tribal Council, Meredith did not receive any jury votes, finishing as the second runner-up behind Jace (8 votes) and Olivia (1 vote).",
        ] },
      { pid: "s1_p04", name: "Caroline", fullName: "Caroline Kremer", instagram: "https://www.instagram.com/carolinekremerr/", photoUrl: "https://i.imgur.com/Pq42UDY.png", photoStyle: { objectPosition: "50% -183%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 4,  juryMember: true,  votesAgainst: 1,  switchedTid: "s1_t4", merged: true,
        bio: [
          "Caroline started on the Red tribe, which won the first two immunity challenges. After the tribe switch, she landed on the Yellow tribe with Abdul, Clara, and Dom. Caroline and Abdul formed a tight alliance on Yellow, voting together to eliminate Clara (3-1) and Dom (2-1) across two Tribal Councils.",
          "At the merge, Caroline initially stuck with Abdul, voting with him in the minority against Meredith at the Kelsey blindside (5-3). When the majority targeted Abdul in Episode 7, Abdul's idol play saved him and sent Madison home — with Caroline casting one of the two counting votes. The following round, she made a significant move by flipping on Jace at Jacob's urging, but Jace's idol play rendered it meaningless.",
          "Episode 9 was Caroline's defining moment. With both idols spent, she made the decisive flip of the season — turning on her closest ally Abdul to join Olivia and Meredith, sending Abdul home 3-2. As she later reflected, she took out her main alliance because she believed Abdul would beat her at the end.",
          "At the final four, Olivia won immunity and chose Meredith, leaving Caroline and Jace to face off in the fire-making equivalent — a Marshmallow & Stick Tower challenge. Jace's structure held, ending Caroline's game in 4th place. Only one vote was ever cast against Caroline the entire season, making her one of the least-targeted players despite her aggressive endgame moves.",
        ] },
      { pid: "s1_p05", name: "Abdul",    fullName: "Abdul Alwan", instagram: "https://www.instagram.com/abdulxalwan/", photoUrl: "https://i.imgur.com/O18he6C.png", photoStyle: { objectPosition: "50% -91%", transformOrigin: "66% 50%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 5,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t4", merged: true,
        bio: [
          "Abdul started on the Red tribe, which won the first two immunity challenges. After the tribe switch, he landed on the Yellow tribe alongside Caroline, Clara, and Dom. Abdul and Caroline formed a strong alliance, voting together to eliminate Clara (3-1) and Dom (2-1), controlling Yellow's Tribal Councils.",
          "At the merge, Abdul voted with the majority to take out Savannah 8-1, then won his first individual immunity — Paper Airplane Toss — in Episode 6. He voted against Meredith with Caroline and Kelsey, but the majority blindsided Kelsey 5-3 instead.",
          "Episode 7 was Abdul's signature moment. The majority alliance sent five votes his way, but Abdul played a hidden immunity idol on himself, nullifying every one and sending Madison home with just two votes. The following round, he won immunity again in the Block Balance challenge after a long showdown against Meredith, keeping himself safe while Jace used his own idol to survive.",
          "With both idols gone, Abdul's game came down to the final five. He and Jace voted for Olivia, but Caroline — his closest ally — flipped, joining Olivia and Meredith to send Abdul home 3-2. In his exit confessional, Abdul credited himself with swaying people throughout the game and called out Caroline's betrayal, but acknowledged he got farther than he expected.",
        ] },
      { pid: "s1_p06", name: "Jacob",    fullName: "Jacob Williams", instagram: "https://www.instagram.com/jacob.williams2/", photoUrl: "https://i.imgur.com/IKBqmSa.png", photoStyle: { objectPosition: "50% -162%", transformOrigin: "49% 50%", transform: "scale(1.70)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 6,  juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t5", merged: true,
        bio: [
          "Jacob began on the Purple tribe, voting with the majority to send Sam R. and Marissa home in the first two Tribal Councils. After the tribe switch, he was placed on the Orange tribe, which avoided Tribal Council entirely during the pre-merge phase.",
          "At the merge, Jacob positioned himself well within the majority alliance. He voted on the correct side of every elimination — the 8-1 Savannah vote, the 5-3 Kelsey blindside, and both idol-affected rounds. In his own words, he orchestrated the vote swap that targeted Kelsey and organized the numbers against both Abdul and Jace.",
          "Jacob's downfall came in Episode 8. He rallied the majority against Jace and even convinced Caroline to flip, but Jace played a hidden immunity idol — nullifying all four votes and sending Jacob home with just two. In his exit confessional, Jacob reflected that he had been on the right side of every vote he participated in, but back-to-back idol plays ultimately ended his game.",
        ] },
      { pid: "s1_p07", name: "Madison",  fullName: "Madison Chumbler", instagram: "https://www.instagram.com/madisonchumbler/", photoUrl: "https://i.imgur.com/VBmfwXj.png", photoStyle: { objectPosition: "50% -73%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 7,  juryMember: true,  votesAgainst: 7,  switchedTid: "s1_t3", merged: true,
        bio: [
          "Madison started on the Purple tribe and voted with the majority in both pre-switch Tribal Councils. After the tribe switch, she was placed on the Blue tribe with Jace, Olivia, and Sean. At Blue's chaotic Tribal Council, she was tied 2-2 with Sean after Olivia's idol play. She was immune on the revote, and Sean was sent home.",
          "At the merge, Madison came close to winning the first individual immunity — she tied with Jace in the Noodle Count challenge but lost the tiebreaker draw. She voted with the majority for both the Savannah and Kelsey eliminations, staying in the numbers through the early merge.",
          "Madison's game ended in Episode 7 when the majority targeted Abdul. Abdul played his hidden immunity idol, nullifying all five votes — including Madison's — and the two remaining votes from Abdul and Caroline sent Madison home. In her exit confessional, she took it in stride, saying she felt lucky to be voted off on an idol play and that she appreciated Abdul's move.",
        ] },
      { pid: "s1_p08", name: "Kelsey",   fullName: "Kelsey Brown", instagram: "https://www.instagram.com/kels_alyssa/", photoUrl: "https://i.imgur.com/vb5oY6d.png", photoStyle: { objectPosition: "50% -11%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 8,  juryMember: true,  votesAgainst: 5,  switchedTid: "s1_t5", merged: true,
        bio: [
          "Kelsey began on the Red tribe, which won both pre-switch immunity challenges. After the tribe switch, she was placed on the Orange tribe, which avoided Tribal Council during the pre-merge phase, giving Kelsey a smooth ride into the merge without attending a single Tribal Council.",
          "At the merge, Kelsey voted with the majority to eliminate Savannah 8-1. In Episode 6, with Abdul holding individual immunity, the vote split — Kelsey, Caroline, and Abdul voted for Meredith, while the majority of five targeted Kelsey. She was blindsided 5-3, not seeing it coming. In her exit confessional, Kelsey said she felt betrayed and called out Jacob, Meredith, and Madison for lying to her.",
        ] },
      { pid: "s1_p09", name: "Savannah", fullName: "Savannah Brinley", instagram: "https://www.instagram.com/savannah.brinley/", photoUrl: "https://i.imgur.com/s9JnOdy.png", photoStyle: { objectPosition: "50% -22%", transformOrigin: "22% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 9,  juryMember: true,  votesAgainst: 8,  switchedTid: "s1_t5", merged: true,
        bio: "Savannah started on the Red tribe, which won the first two immunity challenges — she sat out of the Episode 2 Nothing But Net challenge. After the tribe switch, she was placed on the Orange tribe, which avoided Tribal Council pre-merge. At the merge, Savannah became the first player voted out, eliminated in a near-unanimous 8-1 vote. She cast her lone vote for Meredith." },
      { pid: "s1_p10", name: "Dom",      fullName: "Dominic Croyle", instagram: "https://www.instagram.com/dominic_croyle/", photoUrl: "https://i.imgur.com/SahJ0Ot.png", photoStyle: { objectPosition: "50% -24%", transformOrigin: "75% 50%", transform: "scale(1.40)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 10, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false,
        bio: "Dom started on the Purple tribe and voted with the majority in the first two Tribal Councils to eliminate Sam R. and Marissa. After the tribe switch, he landed on the Yellow tribe with Caroline, Abdul, and Clara. Dom voted with them to eliminate Clara 3-1, but when Yellow returned to Tribal Council the following episode, Caroline and Abdul turned on him. Dom tried last-minute to get one of them to switch, but was eliminated 2-1. He attended four Tribal Councils — the most of any pre-merge boot. At Final Tribal Council, Dom was the only juror to vote for Olivia over Jace." },
      { pid: "s1_p11", name: "Clara",    fullName: "Clara Kaelin", instagram: "https://www.instagram.com/clarakaelin/", photoUrl: "https://i.imgur.com/J7GuBMh.png", photoStyle: { objectPosition: "50% -4%", transformOrigin: "72% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t2", placement: 11, juryMember: true,  votesAgainst: 3,  switchedTid: "s1_t4", merged: false,
        bio: "Clara started on the Red tribe, which won both pre-switch immunity challenges. After the tribe switch, she was placed on the Yellow tribe with Caroline, Abdul, and Dom. At Yellow's first Tribal Council, Caroline, Abdul, and Dom voted against Clara while she cast her lone vote for Dom, and she was eliminated 3-1." },
      { pid: "s1_p12", name: "Sean",     fullName: "Sean Stephens", instagram: "https://www.instagram.com/notseanstephens/", photoUrl: "https://i.imgur.com/VjBqAOH.png", photoStyle: { objectPosition: "50% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s1_t2", placement: 12, juryMember: true,  votesAgainst: 4,  switchedTid: "s1_t3", merged: false,
        bio: "Sean began on the Red tribe, which won both pre-switch immunity challenges. After the tribe switch, he was placed on the Blue tribe with Jace, Olivia, and Madison. Blue's first Tribal Council became one of the season's most chaotic votes — Olivia played a hidden immunity idol on herself, and the vote tied 2-2 between Sean and Madison. On the revote, Jace was the only eligible rocks candidate, forcing him to flip and vote Sean out to avoid drawing rocks. In his exit confessional, Sean revealed that the boys had initially planned to vote Olivia but switched targets when they found out about her idol." },
      { pid: "s1_p13", name: "Marissa",  fullName: "Marissa Coon", instagram: "https://www.instagram.com/mcooon/", photoUrl: "https://i.imgur.com/m4L09S2.png", photoStyle: { objectPosition: "50% -4%", transformOrigin: "17% 50%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 6%" }, tid: "s1_t1", placement: 13, juryMember: false, votesAgainst: 5,  switchedTid: null,    merged: false,
        bio: "Marissa was on the Purple tribe, which lost both of the first two immunity challenges. She voted with the majority in the first Tribal Council to eliminate Sam R., but was voted out 5-1 at the second Tribal Council in Episode 2. She cast her vote for Olivia." },
      { pid: "s1_p14", name: "Sam R.",   fullName: "Sam Roth", instagram: "https://www.instagram.com/samroth10/", photoUrl: "https://i.imgur.com/HfnY3vo.jpeg",photoStyle: { objectPosition: "50% -10%", transform: "scale(1.20)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s1_t1", placement: 14, juryMember: false, votesAgainst: 6,  switchedTid: null,    merged: false,
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
        notes: "Olivia won immunity and chose Meredith for the final 3. Jace and Caroline competed in a Marshmallow & Stick Tower challenge (fire-making equivalent). Players had 5 minutes to build the tallest freestanding tower using only marshmallows and sticks. Jace won with his 'Plan B' structure, eliminating Caroline.",
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
