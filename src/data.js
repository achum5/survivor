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
    twists: [
      "Hidden Immunity Idols — Players could find idols hidden at camp. Three idols were played across the season. Olivia played hers at the Episode 3 Blue tribe tribal council — though no votes were cast against her, it created a 2-2 tie that forced Jace to flip and vote out Sean. Abdul played his in Episode 7, nullifying all 5 votes against him and sending Madison home with just 2 counting votes. Jace played his in Episode 8, nullifying all 4 votes against him and eliminating Jacob.",
      "Tribe Switch — After Episode 2, the two original tribes (Purple and Red) were dissolved into three new tribes: Blue (4 members), Yellow (4 members), and Orange (3 members). Orange never attended tribal council before the merge.",
      "Double Tribal Council — In Episode 3, both Blue and Yellow tribes attended separate tribal councils after the tribe switch. Blue's tribal produced one of the season's most chaotic moments with Olivia's idol play and a tied revote.",
      "Fire-Making Challenge — At the final four, Olivia won immunity and chose Meredith for the final three. Jace and Caroline competed in a Marshmallow & Stick Tower challenge — players had 5 minutes to build the tallest freestanding tower using only marshmallows and sticks. Jace's \"Plan B\" structure held, eliminating Caroline.",
      "Full Jury — All 9 eliminated players (after Sam R. and Marissa) served on the jury and voted at Final Tribal Council.",
    ],
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
    advantages: [
      { type: "Hidden Immunity Idol", holder: "s1_p02", foundEpisode: 3, playedEpisode: 3, status: "played", notes: "Olivia found the idol at camp and played it on herself at the Episode 3 Blue tribe tribal council. No votes were cast against her, but the idol play created a 2-2 tie between Madison and Sean. On the revote, Jace was forced to flip and vote out Sean to avoid a rock draw." },
      { type: "Hidden Immunity Idol", holder: "s1_p05", foundEpisode: 5, playedEpisode: 7, status: "played", notes: "Abdul found the idol and held it through the merge. Played on himself at the Episode 7 tribal council, nullifying all 5 votes against him. Madison was eliminated with just 2 counting votes." },
      { type: "Hidden Immunity Idol", holder: "s1_p01", foundEpisode: 5, playedEpisode: 8, status: "played", notes: "Jace found the idol and played it at the Episode 8 tribal council, nullifying all 4 votes against him. Jacob was eliminated instead. Jacob's exit confessional revealed he had convinced Caroline to flip on Jace, but the idol rendered it meaningless." },
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
    winnerPid: "s2_abdul",
    runnerUpPid: "s2_benc",
    secondRunnerUpPid: "s2_savannah",
    fanFavoritePid: null,
    logoPath: "/logos/season-2.png",
    castPhotoPath: "https://i.imgur.com/oLgFyjG.jpeg",
    summary: [
      "Season 2 of 14508 Survivor brought back 17 players for a high-stakes game of strategy, deception, and survival. Filmed over two days in May 2025, the season featured three original tribes — Navy Blue, Red, and Yellow — a tribe swap into Beige and Purple, and an explosive post-merge game defined by hidden immunity idols, blindsides, and one player's dominant path to victory.",

      "The game opened with a snake draft tribe selection, where three players drew colored rocks and alternated picks to form their tribes. Yellow won the opening Memory Grid reward challenge and earned first pick of camp, while Navy Blue took the first immunity challenge — a relay race puzzle. The losing Yellow tribe went to tribal council first, where Sean, Savannah, and Kelsey blindsided Sam R. in a 3-2 vote despite Sam holding the Safety Without Power advantage he'd won at the Episode 1 journey. Sam chose not to play it, trusting his position, and paid the price.",

      "Episode 2 sent two tribes to tribal council after Yellow won the Color Flip immunity challenge. On the Navy Blue side, the foursome of Ben W., Caroline, Jacob, and Ben C. unanimously targeted Phil, who had lost his vote at the Episode 1 journey. Even Olivia, who was aligned with Phil, joined the 5-0 vote. Over on Red, the returning players — Abdul, Madison, and Meredith — along with Alyssa and Sam W. blindsided Kylea 4-1 while Abdul sat voteless from his own journey loss.",

      "A tribe swap dissolved the three original tribes into two new ones: Beige (Sean, Savannah, Ashton, Ben C., Caroline, Olivia, Jacob) and Purple (Abdul, Meredith, Madison, Sam W., Ben W., Kelsey, Alyssa). Beige won the Episode 3 Slingshot immunity challenge, and the winning tribe sent Olivia and Kelsey on a journey built around a prisoner's dilemma. In a private conversation that would shape the rest of the season, Kelsey and Olivia struck a deal — Kelsey would choose Greedy to win the Safety Without Power advantage while Olivia chose Loyal. They agreed to tell their tribes nothing happened. Kelsey also shared crucial intelligence: she was almost certain Sean had the hidden immunity idol.",

      "At Purple's tribal council, the game fractured along gender lines. Abdul orchestrated a 5-2 vote against Sam W., who was blindsided despite thinking the target was Abdul or Madison. The Williams brothers — Sam W. and Ben W. — voted together for Abdul but were outmaneuvered. In Episode 4, Beige won again with the Blind Leading the Blind challenge, and Purple returned to tribal. Abdul continued pulling strings, flipping the vote to Madison after she got cold feet and refused to commit to a target. Madison was voted out 4-2, with only she and Meredith voting for Ben W.",

      "Episode 5 produced one of the season's most chaotic tribals. Beige lost the Careful Jenga challenge and went to their first tribal council. Sean played his Shot in the Dark — it missed — then stood up and played his hidden immunity idol, nullifying all four votes against him. With Sean's vote forfeited, only Ashton's vote for Jacob and Savannah's vote for Olivia counted, creating a 1-1 tie. On the revote, all four eligible voters — Savannah, Caroline, Ben C., and Ashton — unanimously sent Jacob home. In his exit confessional, Jacob revealed he and Olivia had known Sean had the idol but couldn't avoid becoming collateral.",

      "The merge brought all remaining players together at the Episode 6 tribal council. The game immediately split along gender lines, with the guys trying to pull swing votes and the girls scrambling for numbers. Kelsey, sensing danger, played her Safety Without Power — leaving tribal before the vote and forfeiting her own ballot. The vote fell 6-4, with Olivia eliminated. Ben W. had been playing both sides, telling the girls about the guys' plan, but ultimately the numbers weren't there. Meanwhile, Abdul turned Sean's betrayal at the immunity challenge — where Sean dropped him as a partner at the last second — into an opportunity, being given both a hidden immunity idol and the Final 7 Advantage by the game as compensation for not being picked for the challenge.",

      "Episode 7 split the remaining ten players into two groups of five for separate tribal councils. In Abdul's group, he won immunity in the Hold Your Breath challenge and targeted Caroline as revenge for her betrayal in Season 1. Caroline had a hidden immunity idol but chose not to play it, going home 4-1 in a decision she immediately regretted. In the other group, Meredith found herself on the bottom with her allies gone. She played her hidden immunity idol on herself, nullifying all four votes against her. Her single vote for Alyssa was the only one that counted, sending Alyssa home 1-0 in one of the most dramatic tribal councils of the season.",

      "Abdul won the Episode 8 Who Do You Think They Think? immunity challenge — a jury perception quiz — after a three-way tiebreaker. The majority wanted to flush Meredith's suspected second idol while actually targeting Ben W. Meredith had indeed found another idol by sneaking out to the mailbox at 2:30am. She played it on herself, nullifying Kelsey's vote, and Ben W. was eliminated 5-1 after his Shot in the Dark failed. In his exit confessional, Ben W. admitted he had flipped on the guys to side with Kelsey and Alyssa, but losing both of his closest allies in the previous episode left him exposed.",

      "With Sean immune after winning the Episode 9 Simon Tournament, the anti-Sean coalition pivoted to his closest ally, Ashton. Kelsey saw through Sean's manufactured rumor that Meredith had an idol and organized the vote. Abdul used his Final 7 Advantage for a bye into the semifinals of the immunity challenge but was eliminated by Sean. The vote went 5-1-1 against Ashton, with only Sean voting for Abdul and Ashton casting a lone vote for Meredith.",

      "Episode 10 saw Savannah win immunity in the Ice Breaker challenge. Sean, knowing he was the target, tried to rally Savannah and Ben C. at tribal council, arguing they couldn't win against Abdul and Kelsey from the bottom of a 3-2 split. Abdul played his hidden immunity idol on himself — nullifying votes from Meredith and Sean — but didn't actually need it, as the majority of four had already locked in their votes against Sean. Sean was eliminated 4-0, and in his final words, he called out Abdul and Kelsey as secretly allied since the beginning.",

      "At the final five, Savannah won her second straight immunity with the Internal Clock challenge, stopping her mental timer at 4:30 — the closest to five minutes without going over. The remaining players faced a critical decision. Savannah held a hidden immunity idol and everyone suspected she would give it to Abdul. Kelsey was torn between joining Meredith and Ben C. to vote Abdul or staying loyal to the Savannah-Abdul alliance. At tribal, Savannah gave her idol to Abdul, who played it on himself, nullifying all four votes against him — including Savannah's own vote. Abdul's single vote for Meredith was the only one that counted, eliminating one of the season's most resourceful players.",

      "The finale came down to four: Abdul, Savannah, Ben C., and Kelsey. Abdul solved the Kanoodle puzzle immunity challenge in under three minutes and chose Savannah to join him in the final three, repaying the debt from her idol gift. Ben C. and Kelsey faced off in a 119-domino chain challenge. Kelsey had an early lead but knocked her dominoes over; Ben C. caught up and completed his chain to earn the third seat at Final Tribal Council.",

      "At Final Tribal Council, all 14 eliminated players cast their votes. Abdul made his case as the season's most aggressive strategist — he bounced between alliances, orchestrated key blindsides, found two advantages, and survived multiple tribal councils where his name was on the block. Ben C. emphasized his loyalty and consistency, admitting he wasn't the one throwing blindsides but arguing he positioned himself to survive without ever receiving a single vote against him all season. Savannah highlighted her challenge wins and her game-changing idol play for Abdul, but struggled to separate her game from his.",

      "In the end, Abdul won Season 2 with an 8-4-2 jury vote, improving on his 5th-place finish in Season 1 to become the Sole Survivor. Ben C. earned four jury votes for his steady, under-the-radar game, while Savannah's two votes reflected the jury's perception that her biggest move — giving Abdul the idol — ultimately helped him more than it helped her.",
    ],
    twists: [
      "Snake Draft Tribe Selection — Three players drew colored rocks and each picked one person for their tribe. That person then picked the next, alternating until all 17 players were divided into three tribes: Navy Blue (6), Red (6), and Yellow (5).",
      "Journeys — After certain challenges, players were sent on journeys away from camp. In Episode 1, Phil, Abdul, and Sam R. competed in a timed multiplication tables quiz; the winner (Sam R.) received the Safety Without Power advantage while the two losers lost their votes at the next tribal council. In Episode 3, Olivia and Kelsey faced a prisoner's dilemma — choose Loyal or Greedy. They secretly agreed that Kelsey would pick Greedy to win the advantage while Olivia picked Loyal.",
      "Safety Without Power — An advantage won at a journey. The holder can leave tribal council before the vote for guaranteed safety, but forfeits their own vote. Sam R. won it in Episode 1 but chose not to play it and was voted out. Kelsey won it in Episode 3 and played it at the Episode 6 merge tribal council.",
      "Hidden Immunity Idols — Players could find idol clues and idols hidden at camp. Six idols were found or given across the season: Sean (Episode 1, played Episode 5), Caroline (Episode 2, never played), Meredith (Episode 2, played Episode 7), Abdul (Episode 6, given by the game, played Episode 10), Meredith's second idol (Episode 8, played Episode 8 — retrieved from the mailbox at 2:30am), and Savannah (Episode 9, gave it to Abdul at the Episode 11 tribal council).",
      "Shot in the Dark — A 1-in-6 chance at safety, playable through the final 7. The player forfeits their vote and draws a scroll — if it reads \"Safe,\" all votes against them are nullified. Sean used it in Episode 5 (not safe) before playing his idol. Ben W. used it in Episode 8 (not safe).",
      "Final 7 Advantage — Found by Abdul at camp during Episode 6 alongside his idol. Granted a bye into the semifinals of the Episode 9 Simon Tournament immunity challenge. Could be transferred to another player if the holder was voted out before using it.",
      "Tribe Swap — After Episode 2, the three original tribes (Navy Blue, Red, Yellow) were dissolved and players were redistributed into two new tribes: Beige (7 members) and Purple (7 members). Three players — Phil, Kylea, and Sam R. — were eliminated before the swap.",
      "Double Tribal Council — In Episode 2, both losing tribes (Navy Blue and Red) attended separate tribal councils. In Episode 7, the merged tribe was randomly split into two groups of five, each attending their own tribal council. Two players were eliminated in a single episode both times.",
      "Fire-Making Challenge — At the final four, Abdul won immunity and chose Savannah for the final three. Ben C. and Kelsey competed in a dominoes fire-making challenge — building a continuous chain of 119 dominoes around a barricade. Ben C. completed his chain first to earn the final seat.",
      "Full Jury — All 14 eliminated players served on the jury and voted at Final Tribal Council, regardless of when they were eliminated.",
    ],
    mergeTribe: { tid: "s2_merged", name: "Merged", color: "#228B22" },
    juryVotes: [
      { jurorPid: "s2_sean",      votedForPid: "s2_savannah" }, // Sean → Savannah
      { jurorPid: "s2_kelsey",    votedForPid: "s2_benc" },     // Kelsey → Ben C.
      { jurorPid: "s2_caroline",  votedForPid: "s2_abdul" },    // Caroline → Abdul
      { jurorPid: "s2_madison",   votedForPid: "s2_abdul" },    // Madison → Abdul
      { jurorPid: "s2_meredith",  votedForPid: "s2_abdul" },    // Meredith → Abdul
      { jurorPid: "s2_ashton",    votedForPid: "s2_benc" },     // Ashton → Ben C.
      { jurorPid: "s2_olivia",    votedForPid: "s2_benc" },     // Olivia → Ben C.
      { jurorPid: "s2_jacob",     votedForPid: "s2_abdul" },    // Jacob → Abdul
      { jurorPid: "s2_samw",      votedForPid: "s2_abdul" },    // Sam W. → Abdul
      { jurorPid: "s2_alyssa",    votedForPid: "s2_savannah" }, // Alyssa → Savannah
      { jurorPid: "s2_samr",      votedForPid: "s2_abdul" },    // Sam R. → Abdul
      { jurorPid: "s2_kylea",     votedForPid: "s2_benc" },     // Kylea → Ben C.
      { jurorPid: "s2_benw",      votedForPid: "s2_abdul" },    // Ben W. → Abdul
      { jurorPid: "s2_phil",      votedForPid: "s2_abdul" },    // Phil → Abdul
    ],
    advantages: [
      { type: "Hidden Immunity Idol", holder: "s2_sean", foundEpisode: 1, playedEpisode: 5, status: "played", notes: "Found at camp during Episode 1. Told his tribemates about it. Played on himself at Episode 5 tribal council after using Shot in the Dark (not safe), nullifying 4 votes." },
      { type: "Safety Without Power", holder: "s2_samr", foundEpisode: 1, playedEpisode: null, status: "left in pocket", notes: "Won at the Episode 1 journey (multiplication tables). Allows holder to leave tribal council before the vote for guaranteed safety, but forfeits their vote. Sam chose not to play it and was voted out." },
      { type: "Hidden Immunity Idol", holder: "s2_caroline", foundEpisode: 2, playedEpisode: null, status: "left in pocket", notes: "Found at camp. Caroline did not play it at Episode 7 tribal council and was voted out 4-1." },
      { type: "Hidden Immunity Idol", holder: "s2_meredith", foundEpisode: 2, playedEpisode: 7, status: "played", notes: "Found at camp. Played on herself at Episode 7 tribal council, nullifying 4 votes. Alyssa was eliminated 1-0 as the only unprotected vote." },
      { type: "Safety Without Power", holder: "s2_kelsey", foundEpisode: 3, playedEpisode: 6, status: "played", notes: "Won at the Episode 3 journey (prisoner's dilemma). Kelsey and Olivia agreed that Kelsey would choose Greedy and Olivia would choose Loyal, earning Kelsey the advantage. Played at Episode 6 merge tribal council — Kelsey left tribal before the vote for guaranteed safety, forfeiting her vote." },
      { type: "Hidden Immunity Idol", holder: "s2_abdul", foundEpisode: 6, playedEpisode: 10, status: "played", notes: "Given by the game during Episode 6 as compensation for not being picked for the immunity challenge. Abdul was the odd man out after Sean dropped him last second to pair with Ashton. Played on himself at Episode 10 tribal council, nullifying 2 votes (from Meredith and Sean). Abdul didn't need to play it as the majority was already voting Sean — a wasted idol play." },
      { type: "Final 7 Advantage", holder: "s2_abdul", foundEpisode: 6, playedEpisode: 9, status: "played", notes: "Given by the game during Episode 6 as compensation for not being picked for the immunity challenge. Used at Episode 9 Simon Tournament immunity challenge for a bye into the semifinals." },
      { type: "Hidden Immunity Idol", holder: "s2_meredith", foundEpisode: 8, playedEpisode: 8, status: "played", notes: "Found a clue at camp. The idol was placed in the mailbox between 2am and 5am. Meredith snuck out at 2:30am to retrieve it. Played on herself at Episode 8 tribal council, nullifying Kelsey's vote. Ben W. was eliminated." },
      { type: "Hidden Immunity Idol", holder: "s2_savannah", foundEpisode: 9, playedEpisode: 11, status: "played", notes: "Savannah found an idol around Episode 9. She did not play it at Episodes 9 or 10 tribal councils. At Episode 11 tribal, she gave the idol to Abdul, who played it on himself, nullifying all 4 votes against him. Savannah herself voted for Abdul despite giving him the idol." },
      { type: "Shot in the Dark", holder: "s2_sean", foundEpisode: 5, playedEpisode: 5, status: "not safe", notes: "Used at the Episode 5 Beige tribal council. Sean correctly read he was the target and played his Shot in the Dark before also playing his hidden immunity idol. The scroll came up \"Not Safe,\" providing no protection — but the idol he played immediately after nullified all four votes against him anyway." },
      { type: "Shot in the Dark", holder: "s2_benw", foundEpisode: 8, playedEpisode: 8, status: "not safe", notes: "Used at the Episode 8 tribal council. Ben W. suspected he was the target and rolled the dice. The scroll came up \"Not Safe,\" and without any other protection, he was eliminated in a 5-1 vote." },
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
          secondWinner: "s2_benw",
          imageUrl: "https://i.imgur.com/LsqL52w.png",
          videoTimestamp: 464,
        },
      },
      { eid: "s2_e08", number: 8, title: "Episode 8", videoUrl: "https://www.youtube.com/watch?v=WQkjtJWx7jg",
        immunityChallenge: {
          name: "Who Do You Think They Think?",
          type: "Immunity",
          description: "Jury perception quiz. The jury members answered 30 personality questions about the remaining players — contestants had to guess the jury's majority answer for each question. 20 regulation questions followed by tiebreaker rounds. Scores: Abdul 9, Ben C. 9, Kelsey 8, Savannah 7, Ashton 7, Meredith 7, Sean 7, Ben W. 4. Abdul won after a three-way tiebreaker with Ashton and Ben C. Winner also received 4 bananas as a reward.",
          winner: "s2_abdul",
          imageUrl: "https://i.imgur.com/cTIdvNv.png",
          secondaryImageUrl: "https://i.imgur.com/eFUGJX2.jpeg",
          videoTimestamp: 1,
        },
      },
      { eid: "s2_e09", number: 9, title: "Episode 9", videoUrl: "https://www.youtube.com/watch?v=yXuTkVMk0js",
        episodeImageUrl: "https://i.imgur.com/8XfOr7P.png",
        episodeImageTimestamp: 934,
        immunityChallenge: {
          name: "Simon Tournament",
          type: "Immunity",
          description: "Single-elimination bracket using the Simon electronic memory game. Players competed head-to-head, replicating increasingly long color sequences. Abdul used his Final 7 Advantage for a bye into the semifinals. Round 1: Sean beat Savannah, Ben C. beat Kelsey, Ashton beat Meredith. Semifinals: Sean beat Abdul, Ben C. beat Ashton. Final: Sean beat Ben C. Sean won immunity and a strawberry cheesecake yogurt reward; he chose Kelsey and Ashton to share it.",
          winner: "s2_sean",
          imageUrl: "https://i.imgur.com/vYjtvld.png",
          secondaryImageUrl: "https://i.imgur.com/bOv9ToA.jpeg",
          videoTimestamp: 1,
        },
      },
      { eid: "s2_e10", number: 10, title: "Episode 10", videoUrl: "https://www.youtube.com/watch?v=TNwIZYR4JH8",
        episodeImageUrl: "https://i.imgur.com/xtbMcPZ.png",
        immunityChallenge: {
          name: "Ice Breaker",
          type: "Immunity",
          description: "Players had to melt an ice ball using only their hands to release a nut and bolt frozen inside. Once freed, they had to screw the nut onto the bolt without dropping any pieces. If the nut, bolt, or ice touched the ground or any body part besides hands, the player was eliminated. No using mouth, breath, pockets, or body to assist. Savannah won immunity and a king-size pack of Oreos to share with one person; she chose Meredith.",
          winner: "s2_savannah",
          imageUrl: "https://i.imgur.com/xtbMcPZ.png",
          videoTimestamp: 1,
        },
      },
      { eid: "s2_e11", number: 11, title: "Episode 11", videoUrl: "https://www.youtube.com/watch?v=9qku-hkrJ28",
        episodeImageUrl: "https://i.imgur.com/xi6ShYN.png",
        immunityChallenge: {
          name: "Internal Clock",
          type: "Immunity",
          description: "Players sat blindfolded in chairs in the garage with a stopwatch running. They had to estimate when 5 minutes had passed and raise their thumb. Closest to 5 minutes without going over wins. Savannah stopped at 4:30 and won; Kelsey was second at ~7:38, Ben C. third at ~9 minutes, Meredith and Abdul both went over 9 minutes. The jury watched live via a muted FaceTime call displayed on the TV inside. Savannah also won a reward of Pringles to share with one person; she chose Ben C.",
          winner: "s2_savannah",
          imageUrl: "https://i.imgur.com/xi6ShYN.png",
          videoTimestamp: 1,
        },
      },
      { eid: "s2_e12", number: 12, title: "Episode 12", videoUrl: "https://www.youtube.com/watch?v=sw8Lphulw4M",
        episodeImageUrl: "https://i.imgur.com/ribfwmf.png",
        immunityChallenge: {
          name: "Kanoodle",
          type: "Immunity",
          description: "Players had to solve a Kanoodle puzzle — fitting 5 oddly-shaped pieces into the remaining gaps of a pre-filled board. The winner earns a guaranteed spot in the final three and chooses one person to join them; the other two compete in a fire-making challenge. Abdul solved it in under 3 minutes. The hosts were prepared to give hints at 15 and 20 minutes.",
          winner: "s2_abdul",
          imageUrl: "https://i.imgur.com/ribfwmf.png",
          videoTimestamp: 1,
        },
        fireMakingChallenge: {
          name: "Dominoes",
          type: "Fire-Making",
          description: "Players had to build a continuous chain of 119 dominoes around a barricade, starting from a marked domino and ending at another. All 119 had to be used. First to successfully knock down the entire chain from start to finish wins. Kelsey had an early lead but knocked some over; Ben C. caught up and completed his chain first.",
          winner: "s2_benc",
          loser: "s2_kelsey",
          imageUrl: "https://i.imgur.com/uIP48zg.png",
          videoTimestamp: 466,
        },
      },
      { eid: "s2_e13", number: 13, title: "Episode 13 (Finale)", videoUrl: "https://www.youtube.com/watch?v=JwW_PO-f2_w",
        episodeImageUrl: null,
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
      { pid: "s2_caroline",  name: "Caroline",  fullName: "Caroline Kremer",   personId: "caroline_kremer", photoUrl: "https://i.imgur.com/Pq42UDY.png", photoStyle: { objectPosition: "50% -183%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_blue",   placement: 10, juryMember: true, votesAgainst: 4, switchedTid: "s2_beige", merged: true,
        bio: [
          "Caroline returned for Season 2 on the Navy Blue tribe, where she had been a key player in Season 1's endgame. She was part of Blue's four-person majority that voted out Phil unanimously in Episode 2. She also found a hidden immunity idol at camp during Episode 2 — an advantage she would hold for five episodes but tragically never play.",
          "After the swap, Caroline landed on Beige. She survived the Episode 5 chaos when Sean played his idol and Jacob was eliminated on the revote. At the Episode 6 merge, Caroline won individual immunity in the Domino Stacking challenge, keeping her safe during the vote that sent Olivia home 6-4. Caroline voted for Sean that round, part of the losing minority.",
          "Episode 7 split the merged tribe into two random groups of five for separate tribal councils. Caroline was grouped with Abdul, Savannah, Kelsey, and Ashton. Abdul had won immunity in the Hold Your Breath challenge, and he had unfinished business with Caroline from Season 1.",
          { type: "quote", pid: "s2_abdul", quote: "[I'm] back into familiar territory. Won a challenge every single year. Same thing. Feeling good, feel safe now. I'm kind of just controlling. Everybody's like real puppets in my hands. And I think Caroline [is going home] and that's from what she did to me last year. Revenge is a bitch.", episode: 7, context: "before tribal council" },
          "Caroline sensed the danger. The paranoia was setting in, and she debated playing her idol.",
          { type: "quote", pid: "s2_caroline", quote: "Paranoia's starting to set in. Everyone's hanging with Ashton. I feel like it could be me. Trying to decide if I want to play my idol or not. Leaning towards no, but I'm going to be so upset if I don't play it.", episode: 7, context: "before tribal council" },
          "She decided not to play it. The vote came back 4-1: Abdul, Savannah, Kelsey, and Ashton all voted Caroline, while Caroline cast a lone vote for Ashton. She was eliminated with an idol in her pocket — the season's only wasted idol.",
          { type: "quote", pid: "s2_caroline", quote: "I'm so stupid. I had an idol and I didn't play it. My own fault. I have no words. It's so much fun. I'm so excited to play this. I'm gonna be thinking about this for a while. But I had fun. Damn it. I'm so upset.", episode: 7, context: "final words" },
          "At Final Tribal Council, Caroline voted for Abdul despite their rivalry, acknowledging that he had controlled the game.",
          { type: "quote", pid: "s2_caroline", quote: "As much as I did not want you to win this game, I do think you deserve it. I do think you controlled the game. And my question at the jury was designed to show people that I do think you are deserving of winning. You're welcome.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_benw",      name: "Ben W.",    fullName: "Ben Williams",      personId: "ben_williams", photoUrl: "https://i.imgur.com/177kE7y.png", photoStyle: { objectPosition: "50% -10%", transformOrigin: "50% 20%", transform: "scale(1.3)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 5%" }, tid: "s2_blue",   placement: 8, juryMember: true, votesAgainst: 7, switchedTid: "s2_purple", merged: true,
        bio: [
          "Ben W. played one of the most complex double-agent games of Season 2, but ultimately lost the trust of everyone around him. He started on the Navy Blue tribe alongside his brother Sam W. (who was on Red). On Blue, Ben was part of the four-person majority with Caroline, Jacob, and Ben C. that unanimously voted out Phil in Episode 2.",
          "After the tribe swap, Ben ended up on Purple — the same tribe as his brother Sam W. When the women's alliance plus Abdul targeted Sam in Episode 3, Ben voted with his brother for Abdul, but they were outnumbered 5-2. Sam was blindsided. In Episode 4, Ben pivoted hard — he voted for Madison alongside Abdul and Kelsey, despite earlier being on the outs.",
          { type: "quote", pid: "s2_benw", quote: "I got blindsided the last vote. There were three layers of plans I was in on and there was a fourth layer on top of it. These guys are insane. Right now talking with Abdul about maybe [voting] Madison. Madison was unwilling to drop a name, so I don't trust her. I don't feel safe at all.", episode: 4, context: "before tribal council" },
          "At the Episode 6 merge, Ben's double-agent game was in full swing. The guys wanted Olivia out. Ben told Kelsey and Alyssa about the plan, hoping to position himself with both sides.",
          { type: "quote", pid: "s2_benw", quote: "I'm the rat right now a little bit. The guys all want to get Olivia. I told Kelsey and Alyssa what the plan was, and I said I wanted to work with them. They seem like they're okay with getting rid of Olivia for this vote so that we kind of settle the waters and then I might end up going with them.", episode: 6, context: "before tribal council" },
          "Ben ultimately voted for Sean, putting himself in the minority 6-4 vote. By Episode 7, he won immunity in the Hold Your Breath challenge in his group, keeping him safe while Meredith's idol play sent Alyssa home in the other group.",
          "Episode 8 was where it all fell apart. Abdul won immunity. The majority alliance planned to flush Meredith's suspected second idol while actually targeting Ben. Meredith had indeed found another idol and played it on herself. Ben used his Shot in the Dark — it missed. He was eliminated 5-1.",
          { type: "quote", pid: "s2_benw", quote: "I kind of flipped on the guys. I didn't want to but they went after Kelsey and that was the problem. I was on board the Olivia boat. They flip on Kelsey and I was aligned with Kelsey. So I told her to play her advantage and then I ended up voting Sean because I thought they might be voting for me. I've torched everything. I needed Alyssa or Caroline in the game. Them going home really shot me.", episode: 8, context: "final words" },
          "At Final Tribal Council, Ben voted for Abdul, recognizing that Abdul was in control of nearly every vote.",
          { type: "quote", pid: "s2_benw", quote: "I think this was pretty clearly the best game played of the three remaining. It seems like Abdul is in control of all the votes. And Benny should have taken my lifeline. I tried to save you. I knew this is what would happen if you went to the end with him.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_benc",      name: "Ben C.",    fullName: "Ben Currey",        instagram: "https://www.instagram.com/ben_currey/", photoUrl: "https://i.imgur.com/zZ2Uskz.png", photoStyle: { objectPosition: "50% -30%", transformOrigin: "50% 30%", transform: "scale(1.4)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s2_blue",   placement: 2, juryMember: false, votesAgainst: 0, switchedTid: "s2_beige", merged: true,
        bio: [
          "Ben C. was the only first-time player to reach the final three in Season 2, and he did it without a single vote cast against him all season — a distinction he shared only with Savannah and Kelsey. He never found an idol, never won an advantage, and never had to play from the bottom. His game was built on loyalty, consistency, and positioning.",
          "On the Navy Blue tribe, Ben was part of the four-person majority with Ben W., Caroline, and Jacob that voted out Phil 5-0 in Episode 2. He hit the game-winning shot in the Episode 3 Slingshot challenge, earning immunity for Beige. He sat out the Episode 4 Blind Leading the Blind challenge.",
          { type: "quote", pid: "s2_benc", quote: "I like this tribal. We all get along well. We work together as a team. As far as picking somebody, it's tough because we all want to pick each other, but we sent him out to do that thing and we don't know what kind of advantages he has.", episode: 2, context: "before tribal council" },
          "After the swap to Beige, Ben survived the Episode 5 chaos — he voted for Sean (nullified by the idol) and then voted Jacob on the revote. At the merge, Ben voted with the guys' coalition to take out Olivia 6-4. His read on the game was consistently accurate.",
          { type: "quote", pid: "s2_benc", quote: "Classic just boys and girls separated immediately. We've realized especially after Jacob getting voted out that we probably need to go with a girl for sure. Someone who has a lot of pull. I'm thinking Olivia. Especially with what she has with Caroline.", episode: 6, context: "before tribal council" },
          "In the Episode 7 split tribal, Ben was in the group with Ben W., Meredith, Sean, and Alyssa. He voted for Meredith, but her idol nullified it and Alyssa went home instead. In Episode 8, he helped orchestrate the plan to flush Meredith's suspected second idol while targeting Ben W., voting with the majority in a 5-1 result.",
          { type: "quote", pid: "s2_benc", quote: "Very confusing because I think we figured out that Meredith has an [idol], so we kind of want her to get rid of it. We'd like her to think we're voting her out, but not voting her out. [Our alliance is] pretty much the guys minus Ben [W.]. So we're thinking about Ben out.", episode: 8, context: "before tribal council" },
          "Through Episodes 9, 10, and 11, Ben voted with the majority each time — Ashton, Sean, and then Abdul (nullified by Savannah's idol gift). He was a reliable number but also built genuine trust with the people around him. His bond with Savannah and Abdul kept him safe even as the field narrowed.",
          "In the finale, Abdul won the Kanoodle puzzle immunity and chose Savannah for the final three. Ben faced Kelsey in the dominoes fire-making challenge. Kelsey had an early lead but knocked her chain over; Ben caught up and completed his 119-domino chain first, earning the final seat.",
          { type: "quote", pid: "s2_benc", quote: "I was trying to convince Abdul to take me because we all voted against him. They did tell me last night I was number two on the pecking order. So someone had to do something to jump and I don't know, they may have, because I was trying to get them out.", episode: 12, context: "before fire-making" },
          "At Final Tribal Council, Ben made his case as the loyal, truthful player who never blindsided anyone but strategically positioned himself to survive every round.",
          { type: "quote", pid: "s2_benc", quote: "I'm glad I made the top three because I got my $30 back at least. I probably think [Abdul and Savannah] played really good games and I was maybe not as aggressive as them. I think I played a fairly loyal game mostly. I wasn't the one ever really throwing any blindsides, but I could get people to do that. I'm not great at lying, so I tried to play on the fact that I can't do it.", episode: 13, context: "Final Tribal Council" },
          "Ben received four jury votes — from Kelsey, Ashton, Olivia, and Kylea — finishing as runner-up in the 8-4-2 final tally. The jury members who voted for him praised his game as a first-timer who reached the end without any advantages, while those who voted for Abdul felt Ben's game lacked the proactive strategic moves that defined the winner.",
        ] },
      { pid: "s2_jacob",     name: "Jacob",     fullName: "Jacob Williams",    personId: "jacob_williams", photoUrl: "https://i.imgur.com/IKBqmSa.png", photoStyle: { objectPosition: "50% -162%", transformOrigin: "49% 50%", transform: "scale(1.70)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_blue",   placement: 12, juryMember: true, votesAgainst: 5, switchedTid: "s2_beige", merged: false,
        bio: [
          "Jacob was a returning player from Season 1 who was drafted onto the Navy Blue tribe. On Blue, he was part of the four-person majority with Ben W., Caroline, and Ben C. that unanimously voted out Phil in Episode 2. Jacob won the puzzle portion of the Episode 4 Blind Leading the Blind challenge, helping Beige (his post-swap tribe) secure immunity.",
          "After the tribe swap, Jacob landed on Beige alongside Sean, Savannah, Ashton, Ben C., Caroline, and Olivia. The tribe won the Episode 3 and Episode 4 immunity challenges, keeping them safe. But when Beige finally lost the Episode 5 Careful Jenga challenge, Jacob found himself in the crossfire of one of the season's most chaotic tribals.",
          "The target was supposed to be Sean, who the tribe suspected had a hidden immunity idol. Jacob knew about it — he and Olivia had figured it out days earlier — but there was no way to avoid the fallout.",
          { type: "quote", pid: "s2_jacob", quote: "Seven lies in a row. It's really confusing and I've been so confused about who I've told what. I'm a little dizzy in my head. I think we're good with Ben, Caroline... talking with Sean and we're talking about Olivia even though I know Sean's name.", episode: 5, context: "before tribal council" },
          "At tribal council, Sean first played his Shot in the Dark — it missed. Then he played his hidden immunity idol, nullifying all four votes against him. With Sean's vote forfeited from the Shot in the Dark, only two votes counted: Ashton voted Jacob, and Savannah voted Olivia. The result was a 1-1 tie. On the revote, Savannah, Caroline, Ben C., and Ashton all voted Jacob, sending him home 4-0.",
          { type: "quote", pid: "s2_jacob", quote: "10 minutes before tribal, Olivia and I sat down and we knew Sean had an idol. Someone caught him a long time ago. So, we knew we could be the collateral tonight. I'm a little shocked that on the revote that I got out. I wish I played my shot in the dark because my vote didn't really matter on Sean there and I didn't realize that until I walked out of the voting room.", episode: 5, context: "final words" },
          "Jacob was the sixth person eliminated and did not make the merge. At Final Tribal Council, he voted for Abdul, believing Abdul was the best liar and the most proactive strategist among the final three.",
          { type: "quote", pid: "s2_jacob", quote: "My vote is going to Abdul because I think that he was the best liar out of all of them and he initiated the most conversations. Abdul came in with a lot of negative perception coming into the game and he still made it this far. I think if they played the real game of Survivor, Abdul would dominate.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_olivia",    name: "Olivia",    fullName: "Olivia Saylor",     personId: "olivia_saylor", photoUrl: "https://i.imgur.com/v15gL2S.png", portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_blue",   placement: 11, juryMember: true, votesAgainst: 7, switchedTid: "s2_beige", merged: true,
        bio: [
          "Olivia returned to Season 2 on the Navy Blue tribe, where she was part of the majority but also found herself on the outs. In Episode 2, when the tribe targeted Phil, Olivia joined the 5-0 vote despite being closer to Phil than anyone else — a pragmatic decision to stay in the majority's good graces.",
          "After the swap, Olivia landed on Beige. In Episode 3, she was sent on a journey with Kelsey, where the two faced a prisoner's dilemma. In a private conversation that would shape the season, Olivia and Kelsey struck a deal: Kelsey would choose Greedy to win the Safety Without Power advantage, while Olivia chose Loyal. They agreed to tell their tribes nothing happened.",
          { type: "quote", pid: "s2_olivia", quote: "If you let me take Loyal, I'll give you solid information about my old tribe.", episode: 3, context: "journey with Kelsey" },
          "Olivia also gave Kelsey critical intelligence about Sean's idol, and the two formed a cross-tribal bond that could have been powerful at the merge. Beige won immunity in Episodes 3, 4, and 5, but the Episode 5 tribal was where Olivia's game hit a wall. Sean played his idol after using Shot in the Dark, nullifying all four votes against him. In the chaos, Savannah's lone vote for Olivia created a 1-1 tie with Ashton's vote for Jacob. On the revote, Jacob went home — but Olivia's name had surfaced as a target.",
          { type: "quote", pid: "s2_olivia", quote: "Terrible. Every room I go to, different name. Different name. Different name. So now I think I'm in trouble. Anybody but me, I'll be fine.", episode: 5, context: "before tribal council" },
          "At the Episode 6 merge, the game split along gender lines. The guys formed a coalition and pulled Savannah and Alyssa over to their side, targeting Olivia. Kelsey played her Safety Without Power and left tribal before the vote. Ben W. had been playing both sides — he told the girls the guys' plan but ultimately voted with them.",
          { type: "quote", pid: "s2_benw", quote: "I'm the rat right now a little bit. The guys all want to get Olivia. I told Kelsey and Alyssa what the plan was, and I said I wanted to work with them. They seem like they're okay with getting rid of Olivia for this vote.", episode: 6, context: "before tribal council" },
          "The vote fell 6-4, with Olivia eliminated as the first merge boot. In her exit confessional, she pointed to Kelsey's Safety Without Power play as the turning point — without Kelsey's vote, the girls couldn't flip the numbers.",
          { type: "quote", pid: "s2_olivia", quote: "I think Kelsey playing her Safety Without Power really messed us up because we had the votes for Sean. We had a 6-5 vote, but then she used that. So, somebody flipped. I think it was Alyssa.", episode: 6, context: "final words" },
          "At Final Tribal Council, Olivia voted for Ben C., believing he had played the most strategic game among the final three.",
        ] },
      { pid: "s2_phil",      name: "Phil",      fullName: "Phil Johnson",      instagram: "https://www.instagram.com/phill_johnson/", photoUrl: "https://i.imgur.com/75A82Z1.png", photoStyle: { objectPosition: "50% -20%", transformOrigin: "50% 25%", transform: "scale(1.3)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_blue",   placement: 16, juryMember: true, votesAgainst: 5, switchedTid: null, merged: false,
        bio: [
          "Phil was drafted onto the Navy Blue tribe and quickly found himself on the wrong side of the numbers. When the winning Blue tribe sent one player from each tribe on the Episode 1 journey, Phil was selected alongside Abdul and Sam R. to compete in a multiplication tables quiz. Phil lost, costing him his vote at his next tribal council — a penalty that would prove devastating.",
          "Yellow won the Episode 2 Color Flip immunity challenge, sending both Navy Blue and Red to tribal council. On Blue, the foursome of Ben W., Caroline, Jacob, and Ben C. formed a clear majority. Phil sensed the danger but couldn't find a way in.",
          { type: "quote", pid: "s2_phil", quote: "I think it's going to be crazy. I don't know what to expect. It's the first one, so we'll see. I'm confused right now, honestly. I feel like I need to have some more conversations. I feel like I might be the target.", episode: 2, context: "before tribal council" },
          "His tribemates debated splitting the vote in case Phil had an advantage from the journey, but ultimately decided it wasn't worth the risk of someone flipping.",
          { type: "quote", pid: "s2_benw", quote: "We considered a 2-2 split just in case Phil has an advantage, but that would leave us vulnerable to one person flipping and making it a 3-2-1.", episode: 2, context: "on the vote" },
          "Even Olivia, who was on the outside with Phil, joined the majority to avoid becoming the next target. The vote was unanimous: 5-0 against Phil, who couldn't even cast a ballot to defend himself. Phil took his elimination in stride.",
          { type: "quote", pid: "s2_caroline", quote: "[I think] it's going to be Phil, which I hate to say because I really love Phil. But yeah, I think he's going to go and I'm sad.", episode: 2, context: "before tribal council" },
          "Phil was eliminated 16th out of 17 players, the second person voted out of Season 2. As a jury member under the full jury format, he voted for Abdul at Final Tribal Council.",
          { type: "quote", pid: "s2_phil", quote: "Ben, I wanted you to win. I love an underdog story. Abdul played the game very well. That's what it is.", episode: 13, context: "jury vote" },
        ] },

      // ── Red tribe (6) ────────────────────────────────────────
      { pid: "s2_alyssa",    name: "Alyssa",    fullName: "Alyssa French",     instagram: "https://www.instagram.com/alyssafrenchh/", photoUrl: "https://i.imgur.com/3u6Wor2.png", photoStyle: { objectPosition: "50% -10%", transformOrigin: "50% 22%", transform: "scale(1.3)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 5%" }, tid: "s2_red",    placement: 9, juryMember: true, votesAgainst: 1, switchedTid: "s2_purple", merged: true,
        bio: [
          "Alyssa started on the Red tribe, where she was one of three new players alongside Kylea and Sam W. The returning trio of Abdul, Madison, and Meredith dominated Red's strategy, and Alyssa fell in line — voting with the majority to eliminate Kylea in Episode 2.",
          "After the tribe swap, Alyssa went to Purple. She continued voting with the majority, joining the women's alliance that blindsided Sam W. in Episode 3 and then voting for Madison in Episode 4 when Abdul flipped the target.",
          { type: "quote", pid: "s2_alyssa", quote: "It's really intense. We got like a girl-boy situation going on and then we got like couples going on. It's going to be a tough one for sure. [Who are you voting with?] The girls. We've kind of grouped together. We're pretty set on [voting] Sam.", episode: 3, context: "before tribal council" },
          "At the Episode 6 merge, Alyssa found herself caught between alliances. The guys wanted to vote out Olivia, and Alyssa ultimately sided with them — voting Olivia in a 6-4 result despite earlier connections with the girls.",
          { type: "quote", pid: "s2_alyssa", quote: "[I'm feeling] crazy. There's crazy stuff going on in there right now. It's all snakes. Everybody's a snake. I don't know who to trust. I don't trust anyone actually. [Who are you hoping goes home?] Olivia.", episode: 6, context: "before tribal council" },
          "Episode 7 sealed Alyssa's fate. The merged tribe was split into two groups for separate tribal councils. Alyssa was grouped with Ben W., Meredith, Sean, and Ben C. The target was Meredith, and Alyssa went along. But Alyssa had found the idol clue at camp, and others suspected she might have the idol — when in reality, Meredith had it.",
          { type: "quote", pid: "s2_alyssa", quote: "I don't know. I did find the clue, so I prepared it and people think that I probably have the idol. I'm nervous and I think we're voting Meredith.", episode: 7, context: "before tribal council" },
          "Meredith played her hidden immunity idol, nullifying all four votes against her. Meredith's single vote for Alyssa was the only one that counted, and Alyssa was eliminated 1-0 in one of the most dramatic tribals of the season.",
          { type: "quote", pid: "s2_alyssa", quote: "I blew it. I blew my cover and she knew I was snaking because I admitted to voting Olivia out. I'm just disappointed that she didn't believe that I found the other idol. I've had a much better run than I anticipated.", episode: 7, context: "final words" },
          "At Final Tribal Council, Alyssa was one of two jurors who voted for Savannah, praising her strategic play and selflessness.",
          { type: "quote", pid: "s2_alyssa", quote: "I chose Savannah because I feel like she was flying under the radar most of the game when in reality she was playing very strategically and she was selfless in the end and brought Abdul with her to the final three. So I think she deserves it.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_kylea",     name: "Kylea",     fullName: "Kylea Dobson",      instagram: "https://www.instagram.com/kdobson_12/", photoUrl: "https://i.imgur.com/Ys122rX.png", photoStyle: { objectPosition: "50% 20%", transformOrigin: "50% 25%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_red",    placement: 15, juryMember: true, votesAgainst: 4, switchedTid: null, merged: false,
        bio: [
          "Kylea was drafted onto the Red tribe, joining a group that included three returning players — Abdul, Madison, and Meredith. Red finished second in the Episode 1 Relay Race Puzzle, earning immunity and avoiding tribal council. But when Yellow won the Episode 2 Color Flip challenge, both Navy Blue and Red were sent to tribal.",
          "On the Red side, the returning players had the advantage of experience and pre-existing bonds. Abdul had lost his vote at the Episode 1 journey, but the returning trio of Abdul, Madison, and Meredith still controlled the direction of the vote. They recruited Alyssa and Sam W. to form a majority of five, and the target fell on Kylea.",
          { type: "quote", pid: "s2_abdul", quote: "It's pretty dirty in there, but I think Sam or Kylea is going to be the one to go, or myself. [Who are you voting for?] Kylea. I think she's very athletic, but she wants to play every single challenge and it sometimes brings us down.", episode: 2, context: "before tribal council" },
          "Kylea was completely blindsided. The group told her the vote was going to Sam W., and she believed it. Going into her first tribal council, she had no idea she was the target.",
          { type: "quote", pid: "s2_kylea", quote: "I've never done a tribal council before. People are saying different things and I just feel bad. [Who do you think might be going?] I think unfortunately Sam.", episode: 2, context: "before tribal council" },
          { type: "quote", pid: "s2_madison", quote: "I'm scared because I just learned that Sam is trying to vote my ass out and I was about to go tell him that I wanted to work with him. [Are you targeting him?] That's the fake out vote, but I really want to go for Kylea.", episode: 2, context: "before tribal council" },
          "The vote was 4-1 — Kylea was the only person who voted for Sam W., while everyone else wrote her name down. Abdul couldn't vote due to his journey penalty, but his influence was clear. Kylea was the third person eliminated from Season 2, never making it past the original tribes.",
          "At Final Tribal Council, Kylea voted for Ben C. to win, praising his game as a first-time player who had no advantages the entire season.",
          { type: "quote", pid: "s2_kylea", quote: "[I think] it's really impressive that he's never seen the show or played the game and then he never got an advantage and everybody else was just kind of annoying and Ben was just a cool guy the whole time.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_abdul",     name: "Abdul",     fullName: "Abdul Alwan",       personId: "abdul_alwan", photoUrl: "https://i.imgur.com/O18he6C.png", photoStyle: { objectPosition: "50% -91%", transformOrigin: "66% 50%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_red",    placement: 1, juryMember: false, votesAgainst: 3, switchedTid: "s2_purple", merged: true,
        bio: [
          "Abdul was the dominant strategic force of Season 2, improving on his 5th-place finish in Season 1 to win the game with an 8-4-2 jury vote. He played the biggest, loudest game of the season — orchestrating blindsides, leveraging two advantages given to him by the game, bouncing between alliances, and surviving multiple tribals where his name was on the block.",
          "Abdul returned on the Red tribe alongside Madison and Meredith. He was sent on the Episode 1 journey, where he lost the multiplication tables quiz to Sam R. and lost his vote at the next tribal council. Despite having no vote, Abdul's influence was already apparent — the Red tribe unanimously blindsided Kylea 4-1 in Episode 2, with Abdul directing the strategy.",
          { type: "quote", pid: "s2_abdul", quote: "It's pretty dirty in there, but I think Sam or Kylea is going to be the one to go, or myself. [Who are you voting for?] Kylea. I think she's very athletic, but she wants to play every single challenge and it sometimes brings us down.", episode: 2, context: "before tribal council" },
          "After the swap to Purple, Abdul took control. In Episode 3, the Williams brothers (Sam W. and Ben W.) targeted him, but Abdul organized a 5-2 vote that blindsided Sam W. In Episode 4, he pulled off what he called \"the greatest move in Survivor history\" — flipping the vote from Kelsey to Madison after Madison got cold feet and refused to commit to a target.",
          { type: "quote", pid: "s2_abdul", quote: "I got my nail torn out and man did that hurt. I am playing the biggest game and I am trying to switch everyone to go Madison. I tried to make up lines with her, but I just cannot trust her. If this works, I pulled off the greatest [move] in Survivor history.", episode: 4, context: "before tribal council" },
          "At the Episode 6 merge, Abdul's game reached another level. Sean dropped him as a partner during the immunity challenge, leaving Abdul unpicked. Because the game itself left him out, Abdul was given a hidden immunity idol and the Final 7 Advantage as compensation.",
          { type: "quote", pid: "s2_abdul", quote: "[How did you feel about not getting paired up?] I was kind of upset. Sean snaked me pretty quick. But after getting back to camp, I was pretty happy with what I found. I got an idol and an advantage in the final seven should I make it that far.", episode: 6, context: "before tribal council" },
          "Abdul voted with the guys' coalition to eliminate Olivia 6-4 at the merge. In Episode 7, he won immunity in the Hold Your Breath challenge and targeted Caroline — revenge for her betrayal of him in Season 1. Caroline had a hidden immunity idol but didn't play it, and she was eliminated 4-1.",
          { type: "quote", pid: "s2_abdul", quote: "[I'm] back into familiar territory. Won a challenge every single year. Same thing. Feeling good, feel safe now. I'm kind of just controlling. Everybody's like real puppets in my hands. And I think Caroline [is going home] and that's from what she did to me last year. Revenge is a bitch.", episode: 7, context: "before tribal council" },
          "Abdul won the Episode 8 Who Do You Think They Think? immunity challenge after a three-way tiebreaker. The majority flushed Meredith's idol while targeting Ben W., who was eliminated 5-1. In Episode 9, Abdul used his Final 7 Advantage for a bye into the Simon Tournament semifinals, but Sean beat him. The coalition pivoted to Ashton, who was blindsided 5-1-1.",
          { type: "quote", pid: "s2_abdul", quote: "Last time we can use Shots in the Dark. Everyone doesn't want to sit next to me at the final three and there's some scheming going on to get me out, but I think I might have just turned it on Sean. I think Ashton might be going home just because he's going to align with Sean and just kind of follow his tail.", episode: 9, context: "before tribal council" },
          "In Episode 10, Abdul played his idol on himself, nullifying two votes from Meredith and Sean. He didn't need to — the majority of four had already locked in their votes against Sean, who was eliminated 4-0. It was a wasted idol play, but Abdul couldn't know that at the time.",
          "The Episode 11 final five tribal was Abdul's most precarious position. Everyone wanted him out. Savannah had immunity, and Abdul had no idol. But Savannah gave him her idol before tribal. Abdul played it on himself, nullifying all four votes against him. His single vote for Meredith was the only one that counted, eliminating the season's most resourceful player.",
          { type: "quote", pid: "s2_abdul", quote: "A lot of scheming going on, but hoping we're swinging the votes towards Meredith. I pissed off a lot of people in tribal. So I think she has an edge on me, which I'm trying to convince her not to take Meredith and to take me if we made it this far.", episode: 11, context: "before tribal council" },
          "In the finale, Abdul solved the Kanoodle puzzle in under three minutes to win immunity and chose Savannah for the final three, repaying the debt from her idol gift. At Final Tribal Council, Abdul made his case as the season's most aggressive player — the one who directed every vote, found two advantages, and survived being targeted repeatedly.",
          { type: "quote", pid: "s2_abdul", quote: "Abdul made it to top three. A lot better than last year. Do I think this final tribal council is going to go my way? I honestly don't think so. I think some people are pissed off at Savannah, but I think people are also just annoyed of me. I always play an annoying game just to piss people off and it works most of the time.", episode: 13, context: "Final Tribal Council" },
          "The jury disagreed with Abdul's pessimism. He won 8-4-2, receiving votes from Sam R., Phil, Sam W., Madison, Jacob, Caroline, Ben W., and Meredith. Even players he had directly blindsided — Madison, Caroline — voted for him, recognizing that his aggressive game was the most deserving of the win.",
          { type: "quote", pid: "s2_madison", quote: "Literally at the start of this, if I was asked my winner pick, I would have said I don't have a winner pick, but my one loser pick would be Abdul. I think he had by far the hardest uphill climb to get here. So, as bitter and butthurt as I am, 100% this dude deserves to win.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_madison",   name: "Madison",   fullName: "Madison Chumbler",  personId: "madison_chumbler", photoUrl: "https://i.imgur.com/VBmfwXj.png", photoStyle: { objectPosition: "50% -73%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_red",    placement: 13, juryMember: true, votesAgainst: 4, switchedTid: "s2_purple", merged: false,
        bio: [
          "Madison returned to Season 2 as one of three returning players on the Red tribe, alongside Abdul and Meredith. In Season 1, Madison had been a central figure, and she came back ready to play. On Red, the returning trio formed a natural bond and controlled the Episode 2 vote that sent Kylea home.",
          "After the tribe swap, Madison landed on Purple. The tribe lost the Episode 3 Slingshot challenge, and Abdul began steering the vote toward Sam W. Madison was initially on board — the women formed an alliance and Sam was the target. The plan worked, and Sam was blindsided 5-2.",
          "But Episode 4 changed everything. Purple lost the Blind Leading the Blind challenge, and the tribe returned to tribal council. This time, the scrambling was intense. Abdul wanted to target Kelsey, and Madison was asked to vote with him. But Madison couldn't bring herself to do it.",
          { type: "quote", pid: "s2_madison", quote: "[How are you feeling?] I'm unwell. [You want to vote Kelsey out?] I can't do it. At least when she sees this, she'll know that I was sad about it. She's scary when she gets back with the people from the other side. I don't know if that's going to happen, but if it doesn't, I'm sorry.", episode: 4, context: "before tribal council" },
          "Madison's refusal to commit to a target alarmed Abdul. He read her hesitation as a sign she couldn't be trusted, and he flipped the vote against her.",
          { type: "quote", pid: "s2_abdul", quote: "I got my nail torn out and man did that hurt. I heard chatter about Meredith throwing it out there with the two brothers. I am playing the biggest game and I am trying to switch everyone to go Madison. I tried to make up lines with her, but I just cannot trust her. If this works, I pulled off the greatest [move] in Survivor history.", episode: 4, context: "before tribal council" },
          "Madison voted for Ben W. instead of Kelsey, and Meredith joined her. But Abdul had already flipped the rest: Kelsey, Ben W., and Alyssa all voted Madison. The result was 4-2, and Madison was blindsided by her own returning ally.",
          { type: "quote", pid: "s2_madison", quote: "I'm pretty sure [what happened], which is really rude, but also I literally don't think my heart can handle anymore, so I'm kind of glad. [What happened with the vote?] I think I got cold feet and Abdul probably flipped on me because I was going to vote for Ben and not for Kelsey. But maybe the Kelsey plan was all a lie. I really don't know.", episode: 4, context: "final words" },
          "Despite being voted out by Abdul, Madison voted for him at Final Tribal Council, acknowledging he had played the best game despite the most difficult path.",
          { type: "quote", pid: "s2_madison", quote: "Literally at the start of this, if I was asked my winner pick, I would have said I don't have a winner pick, but my one loser pick would be Abdul. I think he had by far the hardest uphill climb to get here. And I don't know what the hell people were thinking keeping him in this long. So, as bitter and butthurt as I am, 100% this dude deserves to win.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_meredith",  name: "Meredith",  fullName: "Meredith Hogue",    personId: "meredith_hogue", photoUrl: "https://i.imgur.com/47WJZvC.png", photoStyle: { objectPosition: "50% -63%", transform: "scale(1.55)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%", transformOrigin: "47% 50%", transform: "scale(1.15)" }, tid: "s2_red",    placement: 5, juryMember: true, votesAgainst: 2, switchedTid: "s2_purple", merged: true,
        bio: [
          "Meredith was the most resourceful player of Season 2, finding two hidden immunity idols and playing both successfully. A returning player from Season 1, she came back on the Red tribe alongside Abdul and Madison. The returning trio controlled Red's strategy, voting out Kylea 4-1 in Episode 2.",
          "After the swap to Purple, Meredith found her first idol at camp during Episode 2. She held it through Episodes 3 and 4, voting with the majority to eliminate Sam W. and then voting for Ben W. when Abdul flipped the target to Madison. In Episode 4, Meredith was one of only two votes for Ben W. — she and Madison were on the losing side of the 4-2 vote that sent Madison home.",
          { type: "quote", pid: "s2_meredith", quote: "[I'm feeling] good still. I have some strong alliances and I feel like we're going to try to break up the Williams brothers.", episode: 3, context: "before tribal council" },
          "At the merge in Episode 6, Meredith found herself in the minority. The game split along gender lines, and Olivia was eliminated 6-4. Meredith voted for Sean alongside Caroline, Olivia, and Ben W.",
          "Episode 7 was Meredith's defining moment. At the split tribal council, she was grouped with Ben W., Alyssa, Sean, and Ben C. Everyone targeted her. With her allies gone and her back against the wall, Meredith played her first idol on herself, nullifying all four votes. Her single vote for Alyssa was the only one that counted — a 1-0 elimination that stunned the group.",
          { type: "quote", pid: "s2_meredith", quote: "[I'm feeling] not good at all. Two of my main alliances are gone and the girls are outnumbered by the boys. I feel like one of the girls is gonna go home. Me or Alyssa.", episode: 7, context: "before tribal council" },
          "Meredith wasn't done. She found a clue to a second idol, which was placed in the mailbox between 2:00 and 5:00 AM. She snuck out at 2:30 in the morning to retrieve it — a bold move that Kelsey may have noticed.",
          { type: "quote", pid: "s2_meredith", quote: "I woke up right at 2:30 and made it out [to the mailbox] without anyone seeing me. When I came back, I'm pretty sure Kelsey saw me. [I'm] obviously really nervous after last tribal getting voted by everybody. I think Sean is coming for me.", episode: 8, context: "before tribal council" },
          "At Episode 8's tribal council, the majority tried to flush Meredith's suspected second idol while actually targeting Ben W. Meredith read the room and played the idol on herself, nullifying Kelsey's vote. Ben W. was eliminated after his Shot in the Dark failed. Meredith had now played two idols successfully in back-to-back episodes — a season record.",
          "In Episode 9, Meredith joined the majority to vote out Ashton 5-1-1, and in Episode 10 she voted for Abdul (nullified by his idol) as Sean was eliminated 4-0. But at the final five in Episode 11, Meredith's run ended. Savannah gave her idol to Abdul, who played it on himself. All four votes against Abdul were nullified, and Abdul's single vote for Meredith was the only one that counted.",
          { type: "quote", pid: "s2_meredith", quote: "I figured I got everyone on board with Abdul, but I knew he either had an idol or Savannah was going to give him hers. I think Savannah has one. I think Savannah was going to give him hers. And maybe she did already. But yeah, I feel pretty good about how I played and I'm glad I made it this far.", episode: 11, context: "final words" },
          "At Final Tribal Council, Meredith voted for Abdul, acknowledging his strategic dominance.",
          { type: "quote", pid: "s2_meredith", quote: "I'm going with Abdul. I think overall he played a great game. He was basically leading every vote in every tribal. He was the loudest voice in the room and I think getting Savannah to give him her idol was insane.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_samw",      name: "Sam W.",    fullName: "Sam Williams",      instagram: "https://www.instagram.com/sam.williams123/", photoUrl: "https://i.imgur.com/3J8BU5u.png", photoStyle: { objectPosition: "50% 15%", transformOrigin: "50% 25%", transform: "scale(1.15)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_red",    placement: 14, juryMember: true, votesAgainst: 5, switchedTid: "s2_purple", merged: false,
        bio: [
          "Sam W. came into Season 2 on the Red tribe alongside his brother Ben W. (who was on Navy Blue). The Williams brothers — Sam W. and Ben W. — were a known pair, and that connection made Sam a target from early on. Red won immunity in Episode 1 and survived Episode 2 when the group unanimously voted out Kylea instead.",
          "The tribe swap after Episode 2 sent Sam to the Purple tribe along with Abdul, Meredith, Madison, Ben W., Kelsey, and Alyssa. Purple lost the Episode 3 Slingshot immunity challenge, and the tribe fractured along gender lines. Abdul orchestrated the strategy, and the women coalesced into an alliance.",
          { type: "quote", pid: "s2_samw", quote: "I don't think it's me, so I'm happy. Hopefully. I think it's between Madison and Abdul. Madison, I think it would be. So that's spicy.", episode: 3, context: "before tribal council" },
          "Sam was completely in the dark. He and Ben W. voted together for Abdul, but the women plus Abdul had already locked in their votes against Sam. The result was a 5-2 blindside.",
          { type: "quote", pid: "s2_abdul", quote: "[I'm feeling] pretty good. Names being thrown out. The Williams brothers want Madison — they are gunning for her. Sam went to Kelsey when we were all scheming to get Kelsey out and told Kelsey to use her Shot in the Dark. She told me that and I was like yeah, don't. Sam is trying to jump alliances. He's just like his brother — little snake rascal.", episode: 3, context: "before tribal council" },
          "In his exit confessional, Sam admitted he never saw it coming. He thought the battle was between Abdul and Madison and that he had the numbers for Abdul. He also realized too late that he should have built a stronger bond with Kelsey, who ended up voting against him.",
          { type: "quote", pid: "s2_samw", quote: "In hindsight it makes sense because you have the three Williams brothers. I thought it was Abdul and Madison going for each other that whole time and I thought we had the numbers for Abdul. I guess that means Kelsey had to have gone me, which I regret. I should have made a tighter bond with Kelsey quicker because we didn't talk too much. Everyone I was talking to was going Abdul, literally everyone.", episode: 3, context: "final words" },
          "Sam was eliminated 14th, the fourth person voted out of Season 2. At Final Tribal Council, he voted for Abdul, recognizing that Abdul had survived despite having the biggest target from the very beginning of the game.",
          { type: "quote", pid: "s2_samw", quote: "The reason I'm voting Abdul is because he had a high threat level at the very beginning of the game. Everyone said he'd be the first to go and even though he had that threat level throughout the entire game, he stayed in throughout the entire game. So that's really the main reason.", episode: 13, context: "jury vote" },
        ] },

      // ── Yellow tribe (5) ─────────────────────────────────────
      { pid: "s2_savannah",  name: "Savannah",  fullName: "Savannah Brinley",  personId: "savannah_brinley", photoUrl: "https://i.imgur.com/s9JnOdy.png", photoStyle: { objectPosition: "50% -22%", transformOrigin: "22% 50%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_yellow", placement: 3, juryMember: false, votesAgainst: 0, switchedTid: "s2_beige", merged: true,
        bio: [
          "Savannah was a returning player from Season 1 who improved dramatically in Season 2, finishing as the second runner-up. Like Kelsey, Savannah never received a single vote against her all season — one of only three players to achieve that distinction.",
          "She started on the Yellow tribe, where she formed a core alliance with Sean and Kelsey. The trio blindsided Sam R. 3-2 in Episode 1, with Savannah casting one of the three votes. After the swap, Savannah landed on Beige, where her tribe won the Episode 3 and 4 immunity challenges.",
          "The Episode 5 Beige tribal was chaotic — Sean played his idol after his Shot in the Dark missed, and Savannah's vote for Olivia was one of only two that counted, creating the 1-1 tie with Ashton's vote for Jacob. On the revote, Savannah voted Jacob out.",
          { type: "quote", pid: "s2_savannah", quote: "I have a meeting with everybody pretty much. At first it was like we're going to do Ashton, but then we think he's kind of followed our votes since the very beginning. Now I think it's [Sean] but we shall see. I might be going home.", episode: 5, context: "before tribal council" },
          "At the merge, Savannah voted with the guys' coalition to eliminate Olivia 6-4 — a pragmatic move to stay in the majority. In the Episode 7 split tribal, she voted for Caroline alongside Abdul, Kelsey, and Ashton.",
          { type: "quote", pid: "s2_savannah", quote: "[I'm feeling] okay. I am really tired and hungry and I'm really upset that I didn't get a pizza. I think this will go the way that we want it to. And if that's the case, Caroline will be going home tonight.", episode: 7, context: "before tribal council" },
          "Savannah's individual challenge prowess emerged in the late game. She won the Episode 10 Ice Breaker immunity challenge, sharing her Oreos reward with Meredith. She won again in Episode 11 with the Internal Clock challenge, stopping her mental timer at 4:30 — the closest to five minutes without going over.",
          "Around Episode 9, Savannah found a hidden immunity idol. She held it through Episodes 9 and 10, waiting for the right moment. That moment came at the final five. In what became the season's most debated move, Savannah gave her idol to Abdul before tribal council. Abdul played it on himself, nullifying all four votes against him — including Savannah's own vote, since she voted for Abdul despite giving him the idol. Abdul's single vote for Meredith was the only one that counted.",
          { type: "quote", pid: "s2_savannah", quote: "I guess I'm just good at counting or something. I pictured a clock in my head and was like watching it go around. Not sure what's going to happen here. I have an idol still in my backpack. They all want to vote Abdul. So potentially going to use it on him or not yet.", episode: 11, context: "before tribal council" },
          "In the finale, Abdul won the Kanoodle puzzle immunity and chose Savannah to join him in the final three — repaying the debt from her idol gift. At Final Tribal Council, Savannah highlighted her challenge wins and her game-changing idol play, but struggled to separate her legacy from Abdul's.",
          { type: "quote", pid: "s2_savannah", quote: "I think I played the games pretty wellish, especially when we were on tribes. I'm not feeling super confident in my pleading skills, but I guess we'll see how it falls. [How many individual immunities did you win?] Two. And then I won two when I was in the tribes.", episode: 13, context: "Final Tribal Council" },
          "Savannah received two jury votes — from Sean and Alyssa — finishing third with a 2-vote share in the 8-4-2 final tally. The jury largely felt her biggest move — giving Abdul the idol — had ultimately helped him more than herself.",
        ] },
      { pid: "s2_samr",      name: "Sam R.",    fullName: "Sam Roth",          personId: "sam_roth", photoUrl: "https://i.imgur.com/HfnY3vo.jpeg", photoStyle: { objectPosition: "50% -10%", transform: "scale(1.20)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_yellow", placement: 17, juryMember: true, votesAgainst: 3, switchedTid: null, merged: false,
        bio: [
          "Sam R. was the first player eliminated in Season 2, a victim of misplaced trust and a gamble that didn't pay off. Drafted onto the Yellow tribe, Sam was sent on the Episode 1 journey alongside Phil and Abdul, where the three competed in a timed multiplication tables quiz. Sam won, earning the Safety Without Power advantage — which would let him leave tribal council before the vote for guaranteed safety, at the cost of forfeiting his own vote.",
          "Back at camp, Sam made a fateful decision: he told his entire tribe about the advantage, believing transparency would build trust.",
          { type: "quote", pid: "s2_samr", quote: "I'm feeling good. I told everyone about my Safety Without Power because I suck at lying basically. They told me about Kelsey, but I think people think that we're voting Sean because his neck hurts right now. So it's either going to be Sean or Kelsey.", episode: 1, context: "before tribal council" },
          "What Sam didn't realize was that Sean, Savannah, and Kelsey had already formed a tight three and were planning to blindside him. Sean faked being injured to make Sam think Sean would be the easy vote, while Kelsey played along as though she was the target.",
          { type: "quote", pid: "s2_kelsey", quote: "[I'm feeling] not good. I think someone has [the idol]. Someone's lying. I think it's Sam. We're going to try to go for him and say that Sean is hurt, he's just not feeling good, and he's okay to go out. My plan is to try to get out with Sam to find the idol with him, to make him think I'm with him because he did pick me.", episode: 1, context: "before tribal council" },
          "Sam chose not to play his Safety Without Power, trusting his position in the tribe. The vote came back 3-2 — Sean, Savannah, and Kelsey voted Sam, while Sam and Ashton voted Kelsey. Sam became the first person voted out of Season 2, his advantage still in his pocket.",
          "Despite his early exit, Sam returned as a jury member under the season's full jury format and voted for Abdul to win at Final Tribal Council, citing Abdul's aggressive gameplay and ability to survive when his back was against the wall.",
          { type: "quote", pid: "s2_samr", quote: "I'm voting for Abdul. I think the way he played the game, getting Madison out, also being able to get Olivia out and then also playing his immunity idol when his back was against the wall and then convincing Savannah to give him the idol is a crazy play.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_kelsey",    name: "Kelsey",    fullName: "Kelsey Brown",      personId: "kelsey_brown", photoUrl: "https://i.imgur.com/vb5oY6d.png", photoStyle: { objectPosition: "50% -11%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: "s2_yellow", placement: 4, juryMember: true, votesAgainst: 2, switchedTid: "s2_purple", merged: true,
        bio: [
          "Kelsey was a returning player from Season 1 who played one of the most savvy under-the-radar games of Season 2. She started on the Yellow tribe, where she formed a tight alliance with Sean and Savannah that blindsided Sam R. in Episode 1. Kelsey received two votes in Episode 1 — from Sam R. and Ashton — but was never voted against again for the rest of the season, a remarkable feat for a player who was often in the thick of the strategy.",
          "After the swap, Kelsey landed on Purple. She was sent on the Episode 3 journey with Olivia, where they faced a prisoner's dilemma. In a calculated move, Kelsey and Olivia struck a secret deal — Kelsey would choose Greedy to win the Safety Without Power advantage, while Olivia chose Loyal. They agreed to tell their tribes nothing happened.",
          { type: "quote", pid: "s2_kelsey", quote: "I had to make a move, a risk here. I'm going to go for it and choose Greedy.", episode: 3, context: "journey with Olivia" },
          "On Purple, Kelsey voted with the majority to eliminate Sam W. in Episode 3 and Madison in Episode 4. She walked a tightrope, keeping connections with multiple groups while staying off the radar.",
          { type: "quote", pid: "s2_kelsey", quote: "[I'm feeling] not good. Still I think everybody's scrambling. I have a Safety Without Power. We're still scrambling in there. [Who are you hoping goes?] Sam. I'm scared of him.", episode: 3, context: "before tribal council" },
          "At the Episode 6 merge, Kelsey made her boldest move. Sensing danger — her name was being thrown around — she played her Safety Without Power, leaving tribal council before the vote and forfeiting her ballot. The move kept her safe while Olivia was eliminated 6-4.",
          { type: "quote", pid: "s2_kelsey", quote: "Literally every conversation has been confusing. I'm really debating playing my [Safety Without Power]. Nobody's showing their loyalty. I've heard just about every name tonight.", episode: 6, context: "before tribal council" },
          "Post-merge, Kelsey became a strategic pivot point. In Episode 7, she voted Caroline out alongside Abdul, Savannah, and Ashton. In Episode 8, she voted for Meredith (nullified by Meredith's idol), and Ben W. went home instead. By Episode 9, Kelsey organized the blindside of Ashton — seeing through Sean's manufactured rumor about Meredith having an idol.",
          { type: "quote", pid: "s2_kelsey", quote: "Our \"leader\" Sean came up with this story that Meredith has an idol in her sleeve, but I truly don't think she has it. As of right now, we have a solid four, potentially five that will vote for Ashton in hopes to take down the Sean and Ashton alliance.", episode: 9, context: "before tribal council" },
          "Kelsey also figured out that Abdul had a hidden immunity idol — Ben C. let it slip in passing, and Kelsey pressed Abdul until he confirmed it. This intelligence gathering was a hallmark of her game.",
          { type: "quote", pid: "s2_kelsey", quote: "It sounds like it's going to be Sean, but we don't know if he has something. And Abdul has an idol that I found out about. [How'd you find out about Abdul's idol?] Ben told me in passing, then I kind of figured it out and I was like, I know you have an idol. And he said, 'Yeah.'", episode: 10, context: "before tribal council" },
          "At the final five in Episode 11, Kelsey was torn — vote Abdul and hope he doesn't have an idol, or go along with Abdul and Savannah. She voted for Abdul, but Savannah's idol gift to Abdul nullified all four votes. Meredith went home. In the finale, Abdul won immunity and chose Savannah for the final three. Kelsey faced Ben C. in the dominoes fire-making challenge. She had an early lead but knocked her chain over; Ben C. caught up and won.",
          { type: "quote", pid: "s2_kelsey", quote: "I lost on the domino challenge. I think I was beating Ben. I had a good strategy, but I knocked them over and he got it. I think I played hard. I think I had some really good moves. I made it way further than I ever thought I would.", episode: 12, context: "final words" },
          "At Final Tribal Council, Kelsey voted for Ben C., impressed by his ability to reach the end without experience, advantages, or winning immunities.",
          { type: "quote", pid: "s2_kelsey", quote: "I'm voting for Ben because as I pointed out while we were doing the jury questions, I think Ben made it here not having played before, not having seen it, no idols, no advantages. He was on the outside of the Abdul and Savannah alliance. I think Ben played a really good game and I love you.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_sean",      name: "Sean",      fullName: "Sean Stephens",     personId: "sean_stephens", photoUrl: "https://i.imgur.com/VjBqAOH.png", photoStyle: { objectPosition: "50% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: "s2_yellow", placement: 6, juryMember: true, votesAgainst: 8, switchedTid: "s2_beige", merged: true,
        bio: [
          "Sean was a returning player from Season 1 who came into Season 2 on the Yellow tribe with a reputation as a strategic threat. He found a hidden immunity idol at camp during Episode 1 and made the unusual choice to tell his tribemates about it. On Yellow, Sean, Savannah, and Kelsey formed a tight three that blindsided Sam R. 3-2, with Sean faking an injury to sell the plan.",
          { type: "quote", pid: "s2_sean", quote: "I have my idol in my pocket. Probably won't use it because I feel pretty good about the vote. I told Sam that I'm going home because my neck hurts, I don't feel good. So I think he thinks that I'm just going to throw himself on the chopping block.", episode: 1, context: "before tribal council" },
          "After the swap, Sean landed on Beige. Yellow won the Episode 2 immunity, and Beige won the next two challenges, keeping Sean safe. But when Beige lost the Episode 5 Careful Jenga challenge, Sean was the clear target — everyone knew about his idol.",
          "At tribal council, Sean made one of the season's most memorable moves. He first played his Shot in the Dark — it came up \"Not Safe.\" Then he stood up and played his hidden immunity idol, nullifying all four votes against him. The chaos resulted in a 1-1 tie between Jacob and Olivia, and Jacob was sent home on the revote.",
          { type: "quote", pid: "s2_sean", quote: "There's a lot going on. Everybody's throwing everybody's name out. I have an idol. May play it. Don't know yet. May play a shot in the dark.", episode: 5, context: "before tribal council" },
          "At the merge in Episode 6, Sean's game took a hit when he dropped Abdul as a partner at the last second during the immunity challenge, pairing with Ashton instead. This betrayal sent Abdul back to camp alone, where Abdul found both a hidden immunity idol and the Final 7 Advantage. Sean inadvertently armed his biggest rival.",
          { type: "quote", pid: "s2_abdul", quote: "[How did you feel about not getting paired up?] I was kind of upset. Sean snaked me pretty quick. But after getting back to camp, I was pretty happy with what I found. I got an idol and an advantage in the final seven.", episode: 6, context: "before tribal council" },
          "Sean built an alliance with Ashton and tried to control the post-merge votes. He won individual immunity in the Episode 9 Simon Tournament, sharing his reward with Kelsey and Ashton. But Kelsey saw through Sean's attempts to manipulate the vote and organized a 5-1-1 blindside of Ashton.",
          "Without his closest ally, Sean was the obvious next target in Episode 10. Savannah won immunity, and the majority locked in their votes against Sean. He tried a last-ditch effort at tribal council, arguing that Savannah and Ben C. couldn't beat Abdul and Kelsey from the bottom of a 3-2 split.",
          { type: "quote", pid: "s2_sean", quote: "[I'm] definitely going home tonight. There are two people that are on the bottom over there and they're just following their lead and not doing anything. Savannah and Ben cannot win down 3-2. You have to have another vote, make it 3-3, try to do something with the tie.", episode: 10, context: "before tribal council" },
          "Abdul played his idol unnecessarily — the votes were already 4-0 against Sean — and Sean was eliminated. In his final words, he called out Abdul and Kelsey as secretly allied since the beginning.",
          { type: "quote", pid: "s2_sean", quote: "I tried to get Abdul out last time. He's probably the biggest threat left in the game. They didn't want to, they went with Abdul. So Abdul plays a good idol play and now here I am.", episode: 10, context: "final words" },
          "At Final Tribal Council, Sean voted for Savannah, citing her ability to keep her alliances hidden from everyone.",
          { type: "quote", pid: "s2_sean", quote: "[I'm] voting for Savannah. Abdul even said that he would vote for Savannah as well. I think she did a good job of keeping her alliances hidden from everybody else.", episode: 13, context: "jury vote" },
        ] },
      { pid: "s2_ashton",    name: "Ashton",    fullName: "Ashton Sims",       instagram: "https://www.instagram.com/ashtonsims8/", photoUrl: "https://i.imgur.com/bZnfHyw.png", photoStyle: { objectPosition: "50% -15%", transformOrigin: "50% 25%", transform: "scale(1.35)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 10%" }, tid: "s2_yellow", placement: 7, juryMember: true, votesAgainst: 6, switchedTid: "s2_beige", merged: true,
        bio: [
          "Ashton started on the Yellow tribe. In the Episode 1 tribal council that blindsided Sam R. 3-2, Ashton voted for Kelsey — landing on the losing side of the vote — but he quickly adapted and aligned with Sean and Savannah going forward.",
          "After the swap, Ashton landed on Beige. He survived the chaotic Episode 5 tribal where Sean played his idol. In the initial vote, Ashton cast the sole vote for Jacob, which became one of only two votes that counted after Sean's idol nullified the rest. On the revote, Ashton joined the unanimous vote to send Jacob home.",
          "At the merge, Ashton voted with the guys' alliance to eliminate Olivia 6-4 in Episode 6. In Episode 7, he was in Abdul's group at the split tribal council, where they voted Caroline out 4-1. Ashton was a loyal vote throughout — always following the majority and avoiding making waves.",
          { type: "quote", pid: "s2_ashton", quote: "We know people have idols, so we got to bring those out. The plan is actually to get [Meredith] to think we're voting her out so she uses her idol or her Shot in the Dark, and then we flip and get somebody else out.", episode: 8, context: "before tribal council" },
          "By Episode 9, Sean won immunity in the Simon Tournament, choosing Ashton and Kelsey to share his reward. But the rest of the tribe saw Ashton's loyalty to Sean as a threat. Kelsey organized a coalition of five to target Ashton, recognizing that they couldn't get Sean while he was immune.",
          { type: "quote", pid: "s2_kelsey", quote: "Our \"leader\" Sean came up with this story that Meredith has an idol in her sleeve, but I truly don't think she has it. As of right now, we have a solid four, potentially five that will vote for Ashton in hopes to take down the Sean and Ashton alliance.", episode: 9, context: "before tribal council" },
          "Ashton had no idea the vote was coming his way. He believed the plan was to target Meredith and voted accordingly.",
          { type: "quote", pid: "s2_ashton", quote: "[It's] going good. I think somebody found an idol. [Who?] Meredith. [How do you know?] Rumor has it she has it up her sleeve. [Who are you voting for?] I think everybody's pretty much voting [for her].", episode: 9, context: "before tribal council" },
          "The vote was 5-1-1: five voted Ashton, Sean voted Abdul, and Ashton voted Meredith. Ashton was blindsided, and his elimination effectively ended Sean's alliance.",
          { type: "quote", pid: "s2_ashton", quote: "I'm shocked. I thought Meredith was voting Abdul and then I think it would be a tie. I definitely felt safe this round, which is ultimately what killed me. I made some mistakes but I didn't think it'd be tonight. That was way too quick.", episode: 9, context: "final words" },
          "At Final Tribal Council, Ashton voted for Ben C., respecting that Ben had made it to the end without prior experience or any advantages.",
          { type: "quote", pid: "s2_ashton", quote: "I chose Ben because he had no prior experience and he had no idols the entire time. Both of them had experience and advantages. So by nature, they should have performed better. He's sitting in the same spot.", episode: 13, context: "jury vote" },
        ] },
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
          { pid: "s2_benw", timestamp: 1905, quote: "[I'm feeling] not great. This is chaos. It's complete chaos. It's the most structured, ridiculous chaos I've ever seen. Abdul wants to spin a bottle to figure out who is going to talk to who and I'm trying to organize some stuff and he's very much strongarming everything so that there's only two groups of people. He's trying to line his ducks up. Hate it. We're talking about maybe him, maybe Madison." },
          { pid: "s2_samw", timestamp: 1988, quote: "I don't think it's me, so I'm happy. Hopefully. I think it's between Madison and Abdul. Madison, I think it would be. So that's spicy." },
          { pid: "s2_kelsey", timestamp: 1934, quote: "[I'm feeling] not good. Still I think everybody's scrambling. I have a Safety Without Power. We're still scrambling in there. Sounds like there's two groups kind of forming, but there's some slippage. [Who are you hoping goes?] Sam. I'm scared of him." },
          { pid: "s2_madison", timestamp: 1974, quote: "Sam's being sneaky again. [Is that who you want to go?] Yeah, we just made a girl alliance. It's kind of fun." },
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
          { pid: "s2_jacob", timestamp: 3828, quote: "Seven lies in a row. It's really confusing and I've been so confused about who I've told what. I'm a little dizzy in my head. I think we're good with Ben, Caroline... talking with Sean and we're talking about Olivia even though I know Sean's name." },
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
        notes: "Meredith played her second Hidden Immunity Idol on herself (retrieved from the mailbox at 2:30am that morning), nullifying Kelsey's vote against her. Ben W. used his Shot in the Dark (not safe), forfeiting his vote. Abdul had a Hidden Immunity Idol and the Final 7 Advantage but did not play either.",
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
      // ── TC 11: Ashton eliminated (5-1-1) — Merged, Ep9 ──────
      {
        tcid: "s2_tc11", eid: "s2_e09", episode: 9, tid: null,
        videoTimestamp: 1744,
        imageUrl: "https://i.imgur.com/8Sb9JMM.png",
        notes: "Neither Savannah nor Abdul played their Hidden Immunity Idols. Last episode Shot in the Dark could be used.",
        confessionalTimestamp: 1934,
        confessionalQuote: "I'm shocked. I thought Meredith was voting Abdul and then I think it would be a tie. I definitely felt safe this round, which is ultimately what killed me. I made some mistakes but I didn't think it'd be tonight. That was way too quick. I leave knowing I played a good game and hopefully leave some people behind that will carry the torch.",
        confessionals: [
          { pid: "s2_sean",     timestamp: 1566, quote: "Meredith just found an idol. Pretty positive of it. So might end up being Abdul, but all the votes should be going on Meredith. Nobody wants to listen that she has an idol. So we might throw a vote or two [on Abdul]. See what happens." },
          { pid: "s2_meredith", timestamp: 1583, quote: "[I'm feeling] good. I think last [tribal] the guys definitely convinced Kelsey to convince me that they were all going to vote for me, which is why I used my [immunity] idol. And I think they're all going to vote for me this time now that I don't have an idol. So I'm feeling a little scared." },
          { pid: "s2_ashton",   timestamp: 1603, quote: "[It's] going good. I think somebody found an idol. [Who?] Meredith. [How do you know?] Rumor has it she has it up her sleeve. [Who are you voting for?] I think everybody's pretty much voting [for her]." },
          { pid: "s2_kelsey",   timestamp: 1630, quote: "Our \"leader\" Sean came up with this story that Meredith has an idol in her sleeve, but I truly don't think she has it. As of right now, we have a solid four, potentially five that will vote for Ashton in hopes to take down the Sean and Ashton alliance. I think Sean and Ashton pulled me up [to the reward] just to try to get me on their side. So hopefully we're going with [Ashton] and we're telling Sean and Ashton [we're voting Meredith]." },
          { pid: "s2_abdul",    timestamp: 1669, quote: "Last time we can use Shots in the Dark. Everyone doesn't want to sit next to me at the final three and there's some scheming going on to get me out, but I think I might have just turned it on Sean. I think Ashton might be going home just because he's going to align with Sean and just kind of follow his tail. So let's hope it works out. We got to dethrone Sean." },
          { pid: "s2_savannah", timestamp: 1695, quote: "I feel a little bit better about this one. I think that Meredith will play her Shot in the Dark and Ashton will probably go home if it goes the way we want. But I think something might be going crazy too. So I don't know." },
          { pid: "s2_benc",     timestamp: 1721, quote: "[I think] we're going after Sean this round, but of course he's immune. So we think his biggest ally is Ashton and we don't know who would turn his back on Sean. So that's [who] I think [is] my next [target]." },
        ],
        eliminatedPid: "s2_ashton",
        votes: [
          { vid: "s2_tc11_v1", voterPid: "s2_benc",      votedForPid: "s2_ashton" },   // Ben C. → Ashton
          { vid: "s2_tc11_v2", voterPid: "s2_savannah",  votedForPid: "s2_ashton" },   // Savannah → Ashton
          { vid: "s2_tc11_v3", voterPid: "s2_abdul",     votedForPid: "s2_ashton" },   // Abdul → Ashton
          { vid: "s2_tc11_v4", voterPid: "s2_kelsey",    votedForPid: "s2_ashton" },   // Kelsey → Ashton
          { vid: "s2_tc11_v5", voterPid: "s2_meredith",  votedForPid: "s2_ashton" },   // Meredith → Ashton
          { vid: "s2_tc11_v6", voterPid: "s2_ashton",    votedForPid: "s2_meredith" }, // Ashton → Meredith
          { vid: "s2_tc11_v7", voterPid: "s2_sean",      votedForPid: "s2_abdul" },    // Sean → Abdul
        ],
      },
      // ── TC 12: Sean eliminated (4-0) — Merged, Ep10 ─────────
      {
        tcid: "s2_tc12", eid: "s2_e10", episode: 10, tid: null,
        videoTimestamp: 925,
        imageUrl: "https://i.imgur.com/4c2MKWF.png",
        notes: "Abdul played his Hidden Immunity Idol on himself, nullifying 2 votes (from Meredith and Sean). Savannah had a Hidden Immunity Idol but did not play it. Sean called out Kelsey and Abdul as secretly aligned since the beginning and predicted one of them would win.",
        confessionalTimestamp: 1272,
        confessionalQuote: "I tried to get Abdul out last time. He's probably the biggest threat left in the game. They didn't want to, they went with Abdul. So Abdul plays a good idol play and now here I am. So now he has a winning game and we'll see what happens going forward with him and Meredith.",
        confessionals: [
          { pid: "s2_meredith", timestamp: 766, quote: "[I'm feeling] a little more confident going into this round. I think I formed some of my original alliances back and I think we're all in a good like group consensus that we're going with Sean." },
          { pid: "s2_abdul", timestamp: 776, quote: "Sean's a little bit hurt that everybody switched on him. He tried backtracking as soon as we came out of that vote. I know dang well that he put my name on there and he tried to tell Meredith to play an idol to save herself. So his one vote would go against me. He's now sitting on a couch, not really talking to a whole bunch of people. Claims he has an idol, but I think he's bluffing. One good thing is I have an idol too. So we might see two idols being played tonight." },
          { pid: "s2_sean", timestamp: 813, quote: "[I'm] definitely going home tonight. There are two people that are on the bottom over there and they're just following their lead and not doing anything. So might try to get in their ear at tribal a little bit and let them know that they're going to be next two off if they don't try to make a run at it. They can't win 3-2. Savannah and Ben cannot win down 3-2. You have to have another vote, make it 3-3, try to do something with the tie, but we'll see what happens. If not, I'll be eating some fried chicken." },
          { pid: "s2_kelsey", timestamp: 841, quote: "It sounds like it's going to be Sean, but we don't know if he has something. And Abdul has an idol that I found out about. So if Abdul plays his and Sean plays his, will we vote? [How'd you find out about Abdul's idol?] Ben told me in passing, then I think he realized he wasn't supposed to. And so I asked Abdul if he had anything and he said no. So he lied. But then I kind of figured it out and I was like, I know you have an idol. And he said, 'Yeah.'" },
          { pid: "s2_benc", timestamp: 879, quote: "I'm thinking best chance for me to make it to the top four where we have the challenges to get top three right now would be to go out Sean because I have a strong bond with Savannah and Abdul. So for this round specifically, I think that's the play. I have a terrible headache and I'm really hungry." },
          { pid: "s2_savannah", timestamp: 894, quote: "Either way is a win, I guess. But I get to go to final five no matter what. Sean I think is bluffing about an idol and I think that's who's going to go home. But I guess if he's not bluffing, I think we'll probably go home." },
        ],
        idols: [
          { playerPid: "s2_abdul", playedOn: "s2_abdul" },
        ],
        eliminatedPid: "s2_sean",
        votes: [
          { vid: "s2_tc12_v1", voterPid: "s2_meredith",  votedForPid: "s2_abdul", idolNullified: true },  // Meredith → Abdul (nullified)
          { vid: "s2_tc12_v2", voterPid: "s2_kelsey",    votedForPid: "s2_sean" },                        // Kelsey → Sean
          { vid: "s2_tc12_v3", voterPid: "s2_sean",      votedForPid: "s2_abdul", idolNullified: true },   // Sean → Abdul (nullified)
          { vid: "s2_tc12_v4", voterPid: "s2_savannah",  votedForPid: "s2_sean" },                        // Savannah → Sean
          { vid: "s2_tc12_v5", voterPid: "s2_abdul",     votedForPid: "s2_sean" },                        // Abdul → Sean
          { vid: "s2_tc12_v6", voterPid: "s2_benc",      votedForPid: "s2_sean" },                        // Ben C. → Sean
        ],
      },
      // ── TC 13: Meredith eliminated (1-0) — Merged, Ep11 ─────
      {
        tcid: "s2_tc13", eid: "s2_e11", episode: 11, tid: null,
        videoTimestamp: 935,
        imageUrl: "https://i.imgur.com/R5XkrjB.png",
        notes: "Savannah gave her Hidden Immunity Idol to Abdul before tribal. Abdul played it on himself, nullifying all 4 votes against him (from Savannah, Ben C., Kelsey, and Meredith). Savannah voted for Abdul despite giving him the idol. Abdul's single vote for Meredith was the only one that counted. Final five tribal — next episode is the finale with fire-making.",
        confessionalTimestamp: 1123,
        confessionalQuote: "I figured I got everyone on board with Abdul, but I knew he either had an idol or Savannah was going to give him hers. I think Savannah has one. I think Savannah was going to give him hers. And maybe she did already. But yeah, I don't know. I feel pretty good about how I played and I'm glad I made it this far.",
        confessionals: [
          { pid: "s2_savannah", timestamp: 775, quote: "I guess I'm just good at counting or something. I pictured a clock in my head and was like watching it go around. Not sure what's going to happen here. I have an idol still in my backpack. They all want to vote Abdul. So potentially going to use it on him or not yet. Don't know what's going to happen. Don't know if the votes are going to flip." },
          { pid: "s2_benc", timestamp: 811, quote: "Since it's the very last vote, I'm kind of thinking alliances don't matter anymore as much. And I think we should take out who is the biggest threat to us if we make top three. So I'm trying to get the vote for Meredith out except they're giving me mixed signals. Kelsey and Savannah are not giving me straight answers so I feel like they're not on board but we'll see." },
          { pid: "s2_meredith", timestamp: 837, quote: "I honestly don't know what to think at this point. Savannah obviously has immunity. I think she was kind of our next play because I think we're wanting to kick Ben C. because he's just kind of there. So I think it'll probably be me voted out this round." },
          { pid: "s2_abdul", timestamp: 860, quote: "A lot of scheming going on, but hoping we're swinging the votes towards Meredith. I think she'll be the only one that would scare me. Obviously if we were to make it to top three, me and Savannah, we would have a battle. I pissed off a lot of people in tribal. So I think she has an edge on me, which I'm trying to convince her not to take Meredith and to take me if we made it this far. Fingers crossed." },
          { pid: "s2_kelsey", timestamp: 889, quote: "It sounds like it's down to either Meredith or Abdul. However, Savannah has individual immunity and an immunity idol. So we're thinking she's gonna give it to Abdul to play, keep those two safe, and whoever Abdul votes essentially would get it. But I don't know. Right now I'm kind of in the middle of going with Meredith and Ben to vote Abdul, hope he doesn't play his or Savannah's, or just try to go along with Savannah and Abdul and hope he'll let me into final three. I really don't know. And they could also be scheming behind my back." },
        ],
        idols: [
          { playerPid: "s2_abdul", playedOn: "s2_abdul" },
        ],
        eliminatedPid: "s2_meredith",
        votes: [
          { vid: "s2_tc13_v1", voterPid: "s2_savannah",  votedForPid: "s2_abdul", idolNullified: true },   // Savannah → Abdul (nullified)
          { vid: "s2_tc13_v2", voterPid: "s2_benc",      votedForPid: "s2_abdul", idolNullified: true },   // Ben C. → Abdul (nullified)
          { vid: "s2_tc13_v3", voterPid: "s2_abdul",     votedForPid: "s2_meredith" },                     // Abdul → Meredith
          { vid: "s2_tc13_v4", voterPid: "s2_kelsey",    votedForPid: "s2_abdul", idolNullified: true },   // Kelsey → Abdul (nullified)
          { vid: "s2_tc13_v5", voterPid: "s2_meredith",  votedForPid: "s2_abdul", idolNullified: true },   // Meredith → Abdul (nullified)
        ],
      },
      // ── TC 14: Kelsey eliminated (fire-making) — Final 4, Ep12 ──
      {
        tcid: "s2_tc14", eid: "s2_e12", episode: 12, tid: null,
        videoTimestamp: 466,
        imageUrl: "https://i.imgur.com/uIP48zg.png",
        firemaking: { winner: "s2_benc", loser: "s2_kelsey", challenge: "dominoes fire-making" },
        notes: "No votes cast. Abdul won the final four immunity challenge (Kanoodle puzzle) and chose Savannah to join him in the final three. Ben C. and Kelsey competed in a dominoes fire-making challenge (119 dominoes in a continuous chain around a barricade). Kelsey had an early lead but knocked some over; Ben C. caught up and completed his chain first. Kelsey was eliminated.",
        confessionalTimestamp: 1305,
        confessionalQuote: "I lost on the domino challenge. I think I was beating Ben. I had a good strategy, but I knocked them over and he got it. So good job to Ben. Trying to think who's going to make it out of final three. I think Savannah and Ben have a good shot. I'm thinking [Abdul] made some people angry, but I don't know. I think I played hard. I think I had some really good moves. I made it way further than I ever thought I would. I had fun. Thank you.",
        confessionals: [
          { pid: "s2_kelsey", timestamp: 372, quote: "I'm pretty much accepting I'm going to do dominoes. Even though I think Abdul's going to take Ben because he feels very me and Savannah. I did tell him, which is the truth, that the last vote, the people that were starting the Abdul vote were Meredith and Ben, which is true. Me and Savannah were kind of going back and forth the whole time. I just really didn't know what the best move was. The reason I went with Abdul is because I was trying to show the jury some individualism that I'm not just following Abdul and I was trying to make a big move." },
          { pid: "s2_savannah", timestamp: 412, quote: "I do think Abdul's going to take me to final three. If I have to do dominoes, I think I might be okay at it. If I have to go against Ben, I think I should be okay. Sorry, Ben." },
          { pid: "s2_abdul", timestamp: 425, quote: "I hopefully take one person with me. I'm going to let you in on a little secret. Not a lot of people know. Savannah did me a solid, so I'm doing her a solid. She's coming to top three with me. We'll battle it off. She won a couple challenges. I won a couple challenges. So we'll see whoever the jury likes a little bit more." },
          { pid: "s2_benc", timestamp: 449, quote: "I was trying to convince Abdul to take me because we all voted against him. They did tell me last night I was number two on the pecking order. So someone had to do something to jump and I don't know, they may have, because I was trying to get them out." },
        ],
        eliminatedPid: "s2_kelsey",
        votes: [],
      },
      // ── TC 15: Final Tribal Council — Jury Vote, Ep13 ──────
      {
        tcid: "s2_tc15", eid: "s2_e13", episode: 13, tid: null,
        videoTimestamp: 135,
        imageUrl: null,
        notes: "Final Tribal Council. All 14 eliminated players voted for the winner. Abdul won 8-4-2 over Ben C. and Savannah. Abdul's strategy of bouncing between alliances, getting Madison voted out early, and securing Savannah's idol paid off. Ben C. emphasized loyalty and consistency but struggled to claim ownership of any strategic moves. Savannah highlighted giving Abdul her idol and winning key individual challenges but received only 2 votes.",
        confessionals: [
          { pid: "s2_benc", timestamp: 0, quote: "I'm glad I made the top three because I got my $30 back at least. I probably think [Abdul and Savannah] played really good games and I was maybe not as aggressive as them. So I think that might go against me in the vote. But either way, I made the top three. I think I played a fairly loyal game mostly. I wasn't the one ever really throwing any blindsides, but I could get people to do that. I'm not great at lying, so I tried to play on the fact that I can't do it. So I just was pretty truthful the whole time." },
          { pid: "s2_savannah", timestamp: 18, quote: "I think I played the games pretty wellish, especially when we were on tribes. I'm not feeling super confident in my pleading skills, but I guess we'll see how it falls. [How many individual immunities did you win?] Two. And then I won two when I was in the tribes. So, we got food then too. I think that's what kept me going a little bit. I feel like when we were on the tribes, I usually had pretty good strategies for the games." },
          { pid: "s2_abdul", timestamp: 88, quote: "Abdul made it to top three. A lot better than last year. Do I think this final tribal council is going to go my way? I honestly don't think so. I think some people are pissed off at Savannah, but I think people are also just annoyed of me. I always play an annoying game just to piss people off and it works most of the time. I think Savannah might honestly have me on the edge for first place. I think Ben just got free 30 bucks. Kudos to him." },
          // ── Jury Voting Confessionals ──
          { pid: "s2_samr", timestamp: 3441, quote: "I'm voting for Abdul. I think the way he played the game, getting Madison out, also being able to get Olivia out and then also playing his immunity idol when his back was against the wall and then convincing Savannah to give him the idol is a crazy play." },
          { pid: "s2_phil", timestamp: 3455, quote: "Ben, I wanted you to win. I love an underdog story. Abdul played the game very well. That's what it is." },
          { pid: "s2_kylea", timestamp: 3466, quote: "[I think] it's really impressive that he's never seen the show or played the game and then he never got an advantage and everybody else was just kind of annoying and Ben was just a cool guy the whole time." },
          { pid: "s2_samw", timestamp: 3477, quote: "The reason I'm voting Abdul is because he had a high threat level at the very beginning of the game. Everyone said he'd be the first to go and even though he had that threat level throughout the entire game, he stayed in throughout the entire game. So that's really the main reason." },
          { pid: "s2_madison", timestamp: 3493, quote: "Literally at the start of this, if I was asked my winner pick, I would have said I don't have a winner pick, but my one loser pick would be Abdul. I think he had by far the hardest uphill climb to get here. And I don't know what the hell people were thinking keeping him in this long. Personally, I would have gotten him out somewhere at the beginning of the merge, but that's just me. So, as bitter and butthurt as I am, 100% this dude deserves to win." },
          { pid: "s2_jacob", timestamp: 3523, quote: "My vote is going to Abdul because I think that he was the best liar out of all of them and he initiated the most conversations. From personal anecdotes from the jury, sounds like the other two were not the best liars. Even though they made it far, I don't think people really trusted them. Abdul came in with a lot of negative perception coming into the game and he still made it this far. I think if they played the real game of Survivor, Abdul would dominate." },
          { pid: "s2_olivia", timestamp: 3549, quote: "I'm voting for Ben because I think he did the most strategic. I think he played the most." },
          { pid: "s2_caroline", timestamp: 3559, quote: "As much as I did not want you to win this game, I do think you deserve it. I do think you controlled the game. And my question at the jury was I feel like not very well understood, but it was designed to show people that I do think you are deserving of winning. You're welcome." },
          { pid: "s2_alyssa", timestamp: 3576, quote: "I chose Savannah because I feel like she was flying under the radar most of the game when in reality she was playing very strategically and she was selfless in the end and brought Abdul with her to the final three. So I think she deserves it." },
          { pid: "s2_benw", timestamp: 3590, quote: "I think this was pretty clearly the best game played of the three remaining. It seems like Abdul is in control of all the votes. It's a great game. And Benny should have taken my lifeline. I tried to save you. I knew this is what would happen if you went to the end with him. If you had taken it, we could be sitting there right now instead." },
          { pid: "s2_ashton", timestamp: 3611, quote: "I chose Ben because he had no prior experience and he had no idols the entire time. Both of them had experience and advantages. So by nature, they should have performed better. He's sitting in the same spot." },
          { pid: "s2_sean", timestamp: 3624, quote: "[I'm] voting for Savannah. Abdul even said that he would vote for Savannah as well. I think she did a good job of keeping her alliances hidden from everybody else." },
          { pid: "s2_meredith", timestamp: 3633, quote: "I'm going with Abdul. I think overall he played a great game. He had a lot of big strategic moves. He was basically leading every vote in every tribal. He was the loudest voice in the room and I think getting Savannah to give him her idol was insane." },
          { pid: "s2_kelsey", timestamp: 3650, quote: "I'm voting for Ben because as I pointed out while we were doing the jury questions, I think Ben made it here not having played before, not having seen it, no idols, no advantages. He was on the outside of the Abdul and Savannah alliance. To make it with all of that, and he was a good player, he did okay at challenges, but it wasn't like he was winning all the immunities. I think Ben played a really good game and I love you." },
        ],
        eliminatedPid: null,
        votes: [],
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
    location: null,
    filmingDates: "May 16–17, 2026",
    days: null,
    winnerPid: null,
    runnerUpPid: null,
    secondRunnerUpPid: null,
    fanFavoritePid: null,
    logoPath: "/logos/season-3.png",
    castPhotoPath: null,
    summary: null,
    twists: [],
    mergeTribe: null,
    juryVotes: [],
    episodes: [],
    tribes: [],
    cast: [
      // ── Returners ──────────────────────────────────────────
      { pid: "s3_kelsey",    name: "Kelsey",    fullName: "Kelsey Brown",        personId: "kelsey_brown",      photoUrl: "https://i.imgur.com/vb5oY6d.png", photoStyle: { objectPosition: "50% -11%", transform: "scale(1.05)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [], seasonsPlayed: ["s1", "s2"] },
      { pid: "s3_madison",   name: "Madison",   fullName: "Madison Chumbler",    personId: "madison_chumbler",  photoUrl: "https://i.imgur.com/VBmfwXj.png", photoStyle: { objectPosition: "50% -73%", transform: "scale(1.65)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [], seasonsPlayed: ["s1", "s2"] },
      { pid: "s3_sean",      name: "Sean",      fullName: "Sean Stephens",       personId: "sean_stephens",     photoUrl: "https://i.imgur.com/VjBqAOH.png", photoStyle: { objectPosition: "50% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 15%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [], seasonsPlayed: ["s1", "s2"] },
      { pid: "s3_samr",      name: "Sam R.",    fullName: "Sam Roth",            personId: "sam_roth",          photoUrl: "https://i.imgur.com/HfnY3vo.jpeg", photoStyle: { objectPosition: "50% -10%", transform: "scale(1.20)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [], seasonsPlayed: ["s1", "s2"] },
      { pid: "s3_caroline",  name: "Caroline",  fullName: "Caroline Kremer",     personId: "caroline_kremer",   photoUrl: "https://i.imgur.com/Pq42UDY.png", photoStyle: { objectPosition: "50% -183%", transform: "scale(1.50)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [], seasonsPlayed: ["s1", "s2"] },

      // ── New Players ────────────────────────────────────────
      { pid: "s3_casey",     name: "Casey",     fullName: "Casey Storms",        personId: "casey_storms",      instagram: "https://www.instagram.com/caseystorms/", photoUrl: "https://i.imgur.com/BjckALv.png", photoStyle: { objectPosition: "38% 15%", transform: "scale(1.35)" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "38% 10%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_noel",      name: "Noel",      fullName: "Noel Cash",           personId: "noel_cash",         instagram: "https://www.instagram.com/noelcash01/", photoUrl: "https://i.imgur.com/an6jl8e.png", photoStyle: { objectPosition: "50% 10%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 5%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_adam",      name: "Adam",      fullName: "Adam Helmy",          personId: "adam_helmy",        instagram: "https://www.instagram.com/adamhhelmy/", photoUrl: "https://i.imgur.com/lJ9IaVv.png", photoStyle: { objectPosition: "50% 5%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_tamir",     name: "Tamir",     fullName: "Tamir Helmy",         personId: "tamir_helmy",       instagram: "https://www.instagram.com/tamirhelmy/", photoUrl: "https://i.imgur.com/KKxWRbC.png", photoStyle: { objectPosition: "50% 5%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_ryan",      name: "Ryan",      fullName: "Ryan Carlin",         personId: "ryan_carlin",       instagram: "https://www.instagram.com/ryno44/", photoUrl: "https://i.imgur.com/EPu4xCk.png", photoStyle: { objectPosition: "50% 5%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_stephen",   name: "Stephen",   fullName: "Stephen Hillenmeyer", personId: "stephen_hillenmeyer", instagram: "https://www.instagram.com/shillenmeyer/", photoUrl: "https://i.imgur.com/X1tDH0e.png", photoStyle: { objectPosition: "50% 5%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_jacobr",    name: "Jacob R.",  fullName: "Jacob Rayburn",       personId: "jacob_rayburn",     instagram: "https://www.instagram.com/jacob_rayburn1/", photoUrl: "https://i.imgur.com/gEoHCi7.png", photoStyle: { objectPosition: "50% 10%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 5%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_blake",     name: "Blake",     fullName: "Blake Elliott",       personId: "blake_elliott",     instagram: "https://www.instagram.com/blakeelliott19/", photoUrl: "https://i.imgur.com/2zhTMXH.png", photoStyle: { objectPosition: "50% 5%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "50% 0%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
      { pid: "s3_sarah",     name: "Sarah",     fullName: "Sarah Esselman",      personId: "sarah_esselman",    instagram: "https://www.instagram.com/s_esselman21/", photoUrl: "https://i.imgur.com/f4qN6dx.png", photoStyle: { objectPosition: "55% 15%" }, portraitStyle: { objectFit: "cover", width: "100%", height: "230px", objectPosition: "55% 10%" }, tid: null, placement: null, juryMember: false, votesAgainst: 0, switchedTid: null, merged: false, bio: [] },
    ],
    votingHistory: [],
    challenges: [],
  },
];

// ============================================================
// TWIST & ADVANTAGE DETAILED ARTICLES
// ============================================================
// Keyed by twist slug. Each entry has an overview (what the twist IS)
// and per-season detailed writeups covering everything that happened.
// These are displayed on the /twist/:slug pages.
// ============================================================
export const TWIST_ARTICLES = {
  "hidden-immunity-idols": {
    overview: "A Hidden Immunity Idol is a game advantage hidden somewhere at camp or in the surrounding area. A player who finds one can play it at tribal council after the votes are cast but before they are read. When played, all votes cast against the idol holder (or the person the idol is played on) are nullified, and the player with the next-highest vote count is eliminated instead. Idols are single-use — once played, they leave the game. Finding an idol typically requires either discovering a clue that leads to its location or stumbling upon it through dedicated searching. Idols have been the most impactful twist across both seasons, producing some of the most dramatic tribal councils in the game's history.",
    seasons: {
      s1: [
        "Three hidden immunity idols were found and played in Season 1, and every single one changed the course of the game.",
        "Olivia found the first idol at camp and played it on herself at the Episode 3 Blue tribe tribal council. Despite the fact that no votes were actually cast against her, the idol play created chaos. With Olivia's votes nullified (she received zero), the remaining votes tied 2-2 between Madison and Sean. On the revote, Jace was the only player eligible for a rock draw if the tie held, which effectively forced him to flip and vote out his own ally Sean to avoid going home by random chance. It was one of the most strategically consequential idol plays of the season — Olivia didn't need protection, but the threat of nullified votes reshaped the entire vote.",
        "Abdul found his idol and held it through the merge. In Episode 7, with Jace safe behind individual immunity, the majority alliance of five targeted Abdul as the biggest remaining threat. Abdul read the room correctly and played his idol, nullifying all five votes against him. With only two votes counting — Abdul's and his ally's — Madison was eliminated. It was a clean, decisive idol play that single-handedly kept Abdul in the game.",
        "Just one episode later, history repeated itself. In Episode 8, Abdul won immunity, so the majority pivoted their target to Jace. But Jace had found his own idol, and he played it at tribal council, wiping out all four votes against him and sending Jacob home instead. Jacob's exit confessional revealed he had even convinced Caroline to flip on Jace, making the vote theoretically 5-2 against him — but the idol rendered every bit of that social maneuvering meaningless.",
        "The back-to-back idol plays in Episodes 7 and 8 defined the late game of Season 1. Once both idols were spent, the Episode 9 vote became the season's most pivotal moment, as players could no longer hide behind advantages. Caroline's decision to flip on Abdul at that point — sending him home 3-2 — only mattered because the idol safety net was finally gone."
      ],
      s2: [
        "Season 2 saw a staggering six hidden immunity idols found across the season, with five of them successfully played at tribal council. Idols were the dominant strategic force of the season, appearing at nearly every critical vote from the pre-merge through the finale.",
        "Sean found the first idol at the Navy Blue camp during Episode 1 and made the unusual decision to tell his tribemates about it. He held it until Episode 5, when Beige went to their first tribal council. Sean first played his Shot in the Dark (which missed), then stood up and played his idol, nullifying all four votes against him. The resulting chaos — with only Ashton's vote for Jacob and Savannah's vote for Olivia counting — created a 1-1 tie, and Jacob was unanimously eliminated on the revote. It was a messy but effective play that kept Sean alive deep into the merge.",
        "Caroline found her idol at camp during Episode 2 but never played it. At the Episode 7 split tribal council, she was targeted by Abdul's group and voted out 4-1. She had the idol in her pocket the entire time but chose not to play it — a decision she immediately regretted. Caroline's idol expired as the season's only wasted idol, a cautionary tale about reading the room at tribal.",
        "Meredith was the season's most prolific idol finder, discovering two separate idols. She found her first at camp during Episode 2 and held it until the Episode 7 split tribal. With her allies gone and her back against the wall, Meredith played the idol on herself, nullifying all four votes against her. Her single vote for Alyssa was the only one that counted, eliminating Alyssa 1-0 in one of the most dramatic tribal councils of the season.",
        "Meredith's second idol came through pure determination. She found a clue at camp indicating an idol would be placed in the mailbox between 2:00 and 5:00 AM. Meredith snuck out at 2:30 AM to retrieve it — a bold move that could have blown up her game if anyone noticed. She played it on herself at the Episode 8 tribal council, nullifying Kelsey's vote. Ben W. was eliminated instead, having already failed his own Shot in the Dark attempt.",
        "Abdul found his idol during Episode 6 under dramatic circumstances. Sean had dropped him as a partner at the last second during the immunity challenge, leaving Abdul alone at camp while everyone else competed. Abdul used the solitude to search camp and found both the hidden immunity idol and the Final 7 Advantage. He held the idol until Episode 10, when he played it on himself at tribal council. It nullified two votes (from Meredith and Sean), but Abdul didn't actually need it — the majority of four had already locked in their votes against Sean. It was technically a wasted play, but Abdul couldn't have known that at the time.",
        "Savannah found the season's final idol around Episode 9. She held it through Episodes 9 and 10 without playing it, waiting for the right moment. That moment came at the Episode 11 tribal council at final five. In one of the season's most talked-about moves, Savannah gave her idol to Abdul, who played it on himself. All four votes against Abdul were nullified — including Savannah's own vote, as she had voted for Abdul despite giving him the idol. Abdul's single vote for Meredith was the only one that counted, eliminating one of the season's most resourceful players. The move secured Abdul's path to the finale but also became the defining argument against Savannah at Final Tribal Council — the jury felt her biggest move ultimately benefited Abdul more than herself."
      ]
    }
  },
  "tribe-switch": {
    overview: "A Tribe Switch is a twist that dissolves the existing tribes and redistributes players into new ones. Unlike a swap (which typically reshuffles into the same number of tribes), a switch can change the number of tribes entirely. This forces players to build new alliances, adapt to unfamiliar tribemates, and navigate the uncertainty of having former allies suddenly on opposing tribes.",
    seasons: {
      s1: [
        "The Season 1 Tribe Switch occurred after Episode 2, dissolving the two original tribes — Purple (7 members) and Red (7 members) — into three new tribes: Blue (4 members), Yellow (4 members), and Orange (3 members).",
        "The switch dramatically reshuffled alliances. Players who had been working together on Purple or Red suddenly found themselves on different tribes, needing to form new bonds quickly. The smaller tribe sizes — particularly Orange with only 3 members — created intense dynamics where every relationship mattered and there was nowhere to hide.",
        "Orange tribe notably never attended tribal council before the merge, meaning their three members entered the merge phase without having to vote anyone out — a significant advantage, as they had no broken trust or betrayed alliances within their group.",
        "The most consequential result of the switch played out on Blue tribe. The new tribal lines set the stage for one of the season's most chaotic moments: Olivia's idol play at the Episode 3 tribal council, which created a 2-2 tie and forced Jace to flip on his ally Sean. Without the tribe switch putting those specific four players together on Blue, that pivotal vote never would have happened.",
        "Yellow tribe also went to tribal council in Episode 3, sending Clara home 3-1. Then in Episode 4, Yellow returned to tribal again, where Caroline and Abdul's alliance held strong and eliminated Dom 2-1. The switch had isolated Dom on a tribe where he couldn't build enough support to survive."
      ]
    }
  },
  "double-tribal-council": {
    overview: "A Double Tribal Council is an episode format where two separate groups attend tribal council in the same episode, resulting in two eliminations instead of one. This can happen when two losing tribes each go to tribal, or when a single merged tribe is randomly split into two groups that vote independently. Double tribals accelerate the pace of elimination and create high-pressure situations where players must make quick decisions with limited information about what the other group is doing.",
    seasons: {
      s1: [
        "Season 1 featured one double tribal council in Episode 3, occurring immediately after the tribe switch. Both Blue and Yellow tribes lost immunity (Orange won), sending two groups to separate tribal councils in the same episode.",
        "Blue tribe's tribal council was one of the most chaotic in the entire season. Olivia played her hidden immunity idol on herself, which created a 2-2 tie between Madison and Sean even though no votes had been cast against Olivia. On the revote, Jace — the only player who would face a rock draw if the tie held — was forced to flip and vote out his own ally Sean to save himself. The double tribal format amplified the pressure, as there was no time for extended deliberation.",
        "Yellow tribe's tribal was more straightforward, with Clara eliminated in a 3-1 vote. But the double elimination meant two players left the game in a single episode, rapidly thinning the cast and forcing the remaining players to adapt quickly heading into the next phase."
      ],
      s2: [
        "Season 2 featured two double tribal councils — one in the pre-merge and one at the merge — making it one of the season's most impactful recurring twists.",
        "The first double tribal occurred in Episode 2. After Yellow won immunity in the Color Flip challenge, both Navy Blue and Red attended separate tribal councils. On Navy Blue, the tribe unanimously targeted Phil in a 5-0 vote — Phil had lost his vote at the Episode 1 journey, making him an easy target. Even Olivia, who was aligned with Phil, joined the unanimous vote to avoid drawing suspicion. On Red, Abdul orchestrated a 4-1 blindside of Kylea, despite Abdul himself being voteless from the journey. Two players left in one night, setting the stage for the tribe swap.",
        "The second double tribal came at Episode 7 — the first post-merge episode with individual tribal councils. The merged tribe of ten was randomly split into two groups of five, each attending their own tribal council. This twist was particularly brutal because players had no control over which group they ended up in.",
        "In Abdul's group, Abdul won immunity and used the opportunity to settle an old score, targeting Caroline from Season 1. Caroline had her hidden immunity idol but chose not to play it, going home 4-1 in a devastating misread. In the other group, Meredith was isolated without her allies. She played her hidden immunity idol, nullifying all four votes against her, and her single vote for Alyssa was the only one that counted — eliminating Alyssa 1-0.",
        "The Episode 7 double tribal is widely considered one of the most consequential episodes of Season 2. Two idols were played (one successfully, one not), two players went home, and the power dynamics of the merged tribe were completely reshaped in a single night."
      ]
    }
  },
  "fire-making-challenge": {
    overview: "The Fire-Making Challenge is the final competitive challenge before Final Tribal Council. At the final four, the immunity challenge winner selects one player to sit with them in the Final Three. The remaining two players then compete in a head-to-head challenge — the winner earns the third and final seat, while the loser becomes the last player eliminated. In 14508 Survivor, the fire-making challenge is not a literal fire-building challenge but rather a unique physical or mental competition that varies each season.",
    seasons: {
      s1: [
        "The Season 1 fire-making equivalent was the Marshmallow & Stick Tower challenge. At the final four, Olivia won the immunity challenge and chose Meredith to sit with her in the Final Three, leaving Jace and Caroline to compete for the last spot.",
        "The rules were simple: players had exactly five minutes to build the tallest freestanding tower using only marshmallows and sticks. The tower had to be standing on its own when time expired — any tower that collapsed didn't count.",
        "Jace went into the challenge as the underdog, having narrowly survived multiple votes through his idol play and immunity wins. Caroline had been one of the season's most strategic players, orchestrating the pivotal flip on Abdul just one episode earlier. The challenge came down to structural engineering under pressure.",
        "Jace's strategy was his self-described \"Plan B\" structure — a wide, stable base that sacrificed height for reliability. Caroline went taller but riskier. When time expired, Jace's tower held, and Caroline's did not. Jace earned the final seat at Final Tribal Council, where he would go on to win the season in an 8-1 jury vote.",
        "Caroline's elimination was particularly dramatic because she had made arguably the most important strategic move of the season — flipping on Abdul at final five — only to fall short in a challenge that came down to building with marshmallows and sticks."
      ],
      s2: [
        "The Season 2 fire-making challenge was a 119-Domino Chain challenge. At the final four, Abdul won the Kanoodle puzzle immunity challenge in under three minutes and chose Savannah to join him in the Final Three — repaying the debt from Savannah's game-changing idol gift at final five.",
        "Ben C. and Kelsey faced off in the elimination challenge. Each player had to build a continuous chain of exactly 119 dominoes that wound around a barricade. When complete, the player would tip the first domino, and the chain had to successfully knock over every single piece in sequence to light a fuse or hit a target at the end. The first player whose chain completed successfully would earn the last seat.",
        "Kelsey jumped out to an early lead, placing her dominoes quickly and confidently. But in a devastating moment, she accidentally knocked over a section of her chain prematurely, forcing her to rebuild. Ben C., who had been working methodically and carefully, caught up while Kelsey scrambled to recover.",
        "Ben C. completed his chain first and tipped the first domino. The 119 dominoes fell in sequence, and Ben C. earned the third seat at Final Tribal Council. Kelsey became the final player eliminated, just one challenge away from facing the jury.",
        "The challenge was a fitting end to both players' games. Ben C.'s careful, steady approach mirrored his entire season — he never received a single vote against him and played a patient, consistent game. Kelsey's aggressive speed reflected her own style of play but ultimately cost her when it mattered most."
      ]
    }
  },
  "full-jury": {
    overview: "In 14508 Survivor, a Full Jury means that every eliminated player serves on the jury and votes at Final Tribal Council. Unlike traditional Survivor, where early boots are excluded from the jury, this format gives every player — from the first person voted out to the last — an equal say in determining the winner. This twist incentivizes players to maintain good relationships even with early targets, as every vote they cast against someone could come back as a jury vote against them.",
    seasons: {
      s1: [
        "Season 1 featured a nine-member full jury. All nine players eliminated after the game began served on the jury and voted at Final Tribal Council: Sam R., Marissa, Sean, Clara, Dom, Savannah, Kelsey, Madison, Abdul, Jacob, and Caroline — though only the nine eliminated players after the first two (who left pre-jury in some formats) actually served. In Season 1, all 9 eliminated players served.",
        "The full jury format heavily favored Jace, whose aggressive, visible gameplay resonated with jurors who had witnessed his moves firsthand — even those voted out early. Jace earned an overwhelming 8-1 jury vote, with only Dom voting for Olivia. Meredith received no votes.",
        "The full jury was particularly significant because it meant players like Abdul and Caroline — eliminated at final five and final four respectively — sat alongside early boots like Sam R. and Marissa. Everyone had an equal voice, and the consensus was nearly unanimous that Jace had played the best game."
      ],
      s2: [
        "Season 2 expanded the full jury to all 14 eliminated players — the largest jury in the game's history. Every single person voted out, from the very first boot to the final elimination, cast a vote at Final Tribal Council.",
        "The 14-member jury voted 8-4-2 in favor of Abdul over Ben C. and Savannah. Abdul's eight votes came from a broad cross-section of the cast, including early boots (Phil, Sam R.), mid-game eliminations (Sam W., Ben W.), and late-game rivals (Sean, Meredith, Jacob, Madison). This demonstrated that Abdul's gameplay impressed jurors regardless of when they were eliminated.",
        "Ben C. received four votes (Kelsey, Ashton, Olivia, Kylea), reflecting appreciation for his steady, no-enemies approach — he was the only finalist who never received a single vote against him during the entire game. Savannah received two votes (Sean and Alyssa), suggesting the jury largely viewed her biggest move — giving Abdul the idol — as helping Abdul's game more than her own.",
        "The full jury format in Season 2 was especially impactful because it gave early boots like Phil (eliminated Episode 2) and Kylea (eliminated Episode 2) the same voting power as late-game players like Kelsey (eliminated at final four). This created a unique dynamic at Final Tribal Council where the finalists had to appeal to jurors with vastly different perspectives on the game — some had seen only the opening days, while others had witnessed nearly the entire season."
      ]
    }
  },
  "snake-draft-tribe-selection": {
    overview: "The Snake Draft Tribe Selection is a twist used to form the initial tribes at the start of the game. Three players draw colored rocks, and each becomes a tribe captain. The first captain picks one player for their tribe, and that player then picks the next person. The selection alternates back and forth (\"snaking\") until all players have been assigned to a tribe. This format gives players agency over their starting tribes but also creates immediate social dynamics — being picked first signals perceived value, while being picked last can feel like a snub.",
    seasons: {
      s2: [
        "Season 2 opened with the Snake Draft to divide 17 players into three tribes. Three players drew colored rocks to become tribe captains, and the draft alternated until everyone was assigned. The result was three tribes of unequal size: Navy Blue (6 members), Red (6 members), and Yellow (5 members).",
        "The draft created immediate social dynamics that rippled throughout the season. Players who were picked early felt wanted and secure, while those picked later — particularly the last few — entered the game with something to prove. The unequal tribe sizes also mattered: Yellow, with only five members, had the smallest margin for error in challenges.",
        "The draft's most consequential ripple came from the relationships it created. Players remembered who picked them and who passed on them, and those early impressions influenced alliance-building in the opening days. The tribes formed through the snake draft would remain intact for only two episodes before the tribe swap, but the bonds (and grudges) formed during the draft persisted well into the merge."
      ]
    }
  },
  "journeys": {
    overview: "Journeys are a twist where selected players are sent away from camp to a separate location, usually after a challenge. At the journey, players face a dilemma or competition that can result in advantages or penalties. Journeys create opportunities for cross-tribe relationships and strategic deals, but they also carry risk — losing a journey competition can cost a player their vote at the next tribal council.",
    seasons: {
      s2: [
        "Season 2 featured two journeys, each with a completely different format and dramatically different consequences for the players involved.",
        "The Episode 1 journey sent Phil, Abdul, and Sam R. — one from each tribe — to compete in a timed multiplication tables quiz. Players had to solve multiplication problems as quickly as possible, and the fastest player won the Safety Without Power advantage. Sam R. won the advantage, while the two losers — Phil and Abdul — lost their votes at the next tribal council. This penalty proved devastating for both: Phil was voted out unanimously at Episode 2's tribal council (the tribe saw him as easy prey without a vote), and Abdul had to navigate his tribe's Episode 2 vote without being able to cast a ballot himself, though he still managed to orchestrate Kylea's blindside.",
        "The Episode 3 journey sent Olivia and Kelsey to face a prisoner's dilemma. Each player privately chose either \"Loyal\" or \"Greedy.\" If both chose Loyal, neither gained anything. If both chose Greedy, neither gained anything. But if one chose Greedy and the other chose Loyal, the Greedy player won the Safety Without Power advantage while the Loyal player got nothing.",
        "Before making their choices, Olivia and Kelsey had a private conversation that became one of the most pivotal moments of the season. They struck a deal: Kelsey would choose Greedy to win the advantage, and Olivia would choose Loyal, sacrificing her own chance at an advantage to guarantee Kelsey got one. In exchange, Kelsey shared crucial intelligence — she was almost certain Sean had the hidden immunity idol. They also agreed to tell their tribes that nothing happened at the journey.",
        "This secret alliance between Olivia and Kelsey, forged at the journey, shaped the rest of the game. Kelsey's Safety Without Power advantage, won through their deal, saved her at the Episode 6 merge tribal council when she left tribal before the vote. And the intel about Sean's idol informed strategic decisions for multiple players as the game progressed. The journey twist created a cross-tribal bond that neither player's tribemates knew about — exactly the kind of under-the-radar connection that can define a season."
      ]
    }
  },
  "safety-without-power": {
    overview: "Safety Without Power is an advantage that guarantees its holder safety at tribal council — but at a cost. The holder can choose to leave tribal council before the vote is cast, making them immune from elimination. However, by leaving early, they forfeit their own vote, giving up their voice in the decision. It's a defensive advantage that protects the holder but removes their ability to influence the outcome. The advantage is won through journey competitions, not found at camp.",
    seasons: {
      s2: [
        "Two Safety Without Power advantages were awarded in Season 2, and the two holders used them in completely opposite ways — one chose not to play it and paid the ultimate price, while the other played it at the perfect moment.",
        "Sam R. won the first Safety Without Power at the Episode 1 journey by winning a timed multiplication tables quiz against Phil and Abdul. The advantage would have allowed him to leave tribal council before the vote for guaranteed safety, forfeiting his own vote in the process. At Yellow tribe's Episode 1 tribal council, Sam trusted his position in the tribe and chose not to play it. It was a fatal miscalculation — Sean, Savannah, and Kelsey blindsided him in a 3-2 vote. Sam left the game with an unplayed advantage in his pocket, becoming one of the season's most cautionary tales about overconfidence.",
        "Kelsey won the second Safety Without Power at the Episode 3 journey through a prisoner's dilemma deal with Olivia. Kelsey chose Greedy while Olivia chose Loyal, earning Kelsey the advantage. Unlike Sam, Kelsey held onto it and waited for the right moment.",
        "That moment came at the Episode 6 merge tribal council — one of the most chaotic votes of the season. The merge had brought the remaining players together, and the vote was shaping up along gender lines. Kelsey, sensing she could be a target and wanting to gather more information before committing, played her Safety Without Power. She stood up and left tribal council before the vote, guaranteeing her safety but giving up her ballot. The vote went 6-4 against Olivia, and Kelsey lived to play another day.",
        "Kelsey's play was strategically sound — by removing herself from the vote, she avoided being on the wrong side of a potentially game-ending tribal council while preserving her options for the future. She went on to survive until the final four, making it further than any other player who held the advantage."
      ]
    }
  },
  "shot-in-the-dark": {
    overview: "The Shot in the Dark is a last-resort safety mechanism available to any player at tribal council through the final seven. Instead of casting a vote, a player can choose to play their Shot in the Dark — they forfeit their vote and draw a random scroll. If the scroll reads \"Safe,\" all votes against them are nullified and they are immune for that tribal council. If it reads \"Not Safe,\" nothing happens and they have simply lost their vote. The odds are 1 in 6 (approximately 16.7%), making it a desperation play for players who believe they are about to be eliminated.",
    seasons: {
      s2: [
        "The Shot in the Dark was available throughout Season 2, but only two players chose to use it — and neither one hit safe.",
        "Sean used the Shot in the Dark at the Episode 5 Beige tribal council. He correctly read that he was the target and decided to take the gamble before also playing his hidden immunity idol. Sean's shot came up \"Not Safe,\" meaning his scroll provided no protection. However, because he also played his idol immediately after, the failed Shot in the Dark was ultimately irrelevant — the idol nullified all four votes against him anyway. Sean's decision to play both the Shot in the Dark AND his idol was unusual — most players would rely on one or the other — but it reflected his accurate read that he was in serious danger and his desire to use every tool available.",
        "Ben W. used his Shot in the Dark at the Episode 8 tribal council. Like Sean, Ben correctly suspected he was the target. His scroll also came up \"Not Safe,\" and without an idol or any other protection, he was eliminated in a 5-1 vote. Ben's failed shot represented the more typical Shot in the Dark scenario — a player on the bottom with no other options rolling the dice and coming up short.",
        "The Shot in the Dark's 0-for-2 record in Season 2 highlights its nature as a last resort. Both players who used it were correct that they were in danger, but the 1-in-6 odds meant the twist was unlikely to save them. Notably, the Shot in the Dark's existence also affected strategic calculations even when it wasn't played — players had to account for the possibility that their target might gamble on it, which occasionally influenced vote-splitting strategies."
      ]
    }
  },
  "final-7-advantage": {
    overview: "The Final 7 Advantage is a unique challenge advantage that grants the holder a significant edge in a specific immunity challenge. In Season 2, it provided a bye (automatic advancement) into the semifinals of the immunity challenge at the final seven. The advantage could be transferred to another player if the holder was voted out before the challenge took place.",
    seasons: {
      s2: [
        "Abdul found the Final 7 Advantage during Episode 6, hidden at camp alongside his hidden immunity idol. He discovered both advantages while the rest of the tribe competed in the immunity challenge — Abdul had been left out after Sean dropped him as a partner at the last second to pair with Ashton. What could have been a humiliating moment turned into a game-changing opportunity, as Abdul used the alone time to search camp and found two of the game's most powerful advantages.",
        "Abdul held the advantage until Episode 9, when the final seven competed in the Simon Tournament immunity challenge. The Simon Tournament was a memory-based competition where players had to repeat increasingly complex sequences. Abdul's advantage gave him a bye directly into the semifinals, meaning he skipped the first round entirely while other players had to win their way through.",
        "Despite the significant head start, Abdul was eliminated in the semifinals by Sean, who went on to win the full immunity challenge. The advantage guaranteed Abdul a top-four finish in the challenge but couldn't guarantee him the win — he still had to perform in the later rounds.",
        "Even though Abdul didn't win immunity, the advantage served its purpose by keeping him safe through the most dangerous stretch of the game. With Sean wearing the immunity necklace, the coalition targeted Ashton instead, and Abdul survived the vote. The Final 7 Advantage was a unique twist in that it didn't provide tribal council safety directly but rather improved the holder's odds in a specific challenge — a more subtle form of protection that rewarded the player who found it without guaranteeing them safety."
      ]
    }
  },
  "tribe-swap": {
    overview: "A Tribe Swap dissolves the existing tribes and redistributes players into new ones. This twist forces players out of their comfort zones, breaking up dominant alliances and creating new tribal dynamics. A swap can change both the composition and number of tribes, fundamentally altering the strategic landscape of the game.",
    seasons: {
      s2: [
        "The Season 2 Tribe Swap occurred after Episode 2, dissolving the three original tribes — Navy Blue (6 members), Red (6 members), and Yellow (5 members) — into two new tribes: Beige (7 members) and Purple (7 members). Three players had already been eliminated before the swap: Phil and Kylea in Episode 2's double tribal council, and Sam R. in Episode 1.",
        "The swap reduced the game from three tribes to two, concentrating the remaining 14 players into larger groups. Beige received Sean, Savannah, Ashton, Ben C., Caroline, Olivia, and Jacob. Purple received Abdul, Meredith, Madison, Sam W., Ben W., Kelsey, and Alyssa.",
        "The new tribal lines created dramatically different dynamics on each tribe. Beige was stacked with strong challenge competitors but also harbored deep strategic divisions — Sean's idol, Savannah and Caroline's competing alliances, and Jacob and Olivia's secret partnership all created an unstable mix. Beige won the first two post-swap immunity challenges (Episode 3's Slingshot and Episode 4's Blind Leading the Blind), delaying their reckoning until Episode 5.",
        "Purple, meanwhile, saw Abdul emerge as the dominant strategic force. He orchestrated Sam W.'s blindside in Episode 3 (5-2 vote) and then flipped the target to Madison in Episode 4 (4-2 vote) after she refused to commit to his plan. The Purple tribe dynamics were defined by Abdul's ability to build shifting coalitions — he worked with different people each vote while maintaining his core position.",
        "The swap's most lasting impact was in creating the cross-tribal connections that defined the merge. Players who spent the swap together on Beige or Purple carried those relationships forward, and the swap-era alliances — particularly Abdul's coalition on Purple and Sean's network on Beige — formed the foundation of the post-merge power struggle."
      ]
    }
  }
};
