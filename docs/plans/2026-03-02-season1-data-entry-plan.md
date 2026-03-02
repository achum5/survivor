# Season 1 Data Entry + Branding Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace all Season 1 placeholder data with real game data, rename the site to "14508 Survivor", display season logos, and add a jury vote section to the Voting History page.

**Architecture:** All data lives in `src/data.js` (a JS module — no architecture change). Season logos are moved to `public/logos/` so Vite serves them as static assets. The VotingHistory page gains a jury vote section below the grid. No new routes or components needed.

**Tech Stack:** React 18, Vite, React Router v7, plain CSS

---

## Player ID Reference (use these IDs throughout)

| pid | Name | Original Tribe |
|-----|------|---------------|
| s1_p01 | Jace | s1_t2 (Blue) — winner |
| s1_p02 | Olivia | s1_t1 (Purple) — runner-up |
| s1_p03 | Meredith | s1_t1 (Purple) — 3rd place |
| s1_p04 | Caroline | s1_t2 (Blue) — 4th, jury |
| s1_p05 | Abdul | s1_t2 (Blue) — 5th, jury |
| s1_p06 | Jacob | s1_t1 (Purple) — 6th, jury |
| s1_p07 | Madison | s1_t2 (Blue) — 7th, jury |
| s1_p08 | Kelsey | s1_t2 (Blue) — 8th, jury |
| s1_p09 | Savannah | s1_t2 (Blue) — 9th, jury |
| s1_p10 | Dom | s1_t1 (Purple) — 10th, jury |
| s1_p11 | Clara | s1_t2 (Blue) — 11th, jury |
| s1_p12 | Sean | s1_t2 (Blue) — 12th, jury |
| s1_p13 | Marissa | s1_t1 (Purple) — 13th, pre-jury |
| s1_p14 | Sam | s1_t1 (Purple) — 14th, pre-jury |

## Tribe ID Reference

| tid | Name | Color | Phase | Members |
|-----|------|-------|-------|---------|
| s1_t1 | Purple | #7c3aed | Original | Sam, Marissa, Olivia, Meredith, Jacob, Madison, Dom |
| s1_t2 | Blue | #2563eb | Original | Jace, Sean, Clara, Caroline, Abdul, Kelsey, Savannah |
| s1_t3 | Yellow | #ca8a04 | Switched A | Jace, Olivia, Madison, Sean |
| s1_t4 | Green | #16a34a | Switched B | Caroline, Abdul, Clara, Dom |
| s1_t5 | Orange | #ea580c | Switched C | Meredith, Jacob, Kelsey, Savannah (never went to tribal) |

---

## Task 1: Move Season Logos to Public Folder

**Files:**
- Create: `public/logos/` directory
- Move: `season 1.png` → `public/logos/season-1.png`
- Move: `season 2.png` → `public/logos/season-2.png`
- Move: `season 3.png` → `public/logos/season-3.png`

**Step 1: Create directory and move files**

```bash
mkdir -p public/logos
mv "season 1.png" public/logos/season-1.png
mv "season 2.png" public/logos/season-2.png
mv "season 3.png" public/logos/season-3.png
```

**Step 2: Verify files are served**

Run: `npm run build`
Expected: Build succeeds, logos appear in `dist/logos/`

**Step 3: Commit**

```bash
git add public/logos/
git commit -m "feat: move season logos to public/logos/"
```

---

## Task 2: Rewrite Season 1 — Tribes, Cast, Episodes, Jury Votes

**Files:**
- Modify: `src/data.js` (Season 1 section only — do NOT touch Season 2 or 3)

**Step 1: Replace the entire Season 1 entry in SEASONS array**

Find the `// SEASON 1` section and replace everything from `{` through `},` (the Season 1 object) with the following. Season 2 and Season 3 remain unchanged.

```js
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
      // placement 1 = winner, 14 = first boot
      // tid = ORIGINAL tribe only
      // daysLasted and challengeWins are approximate — update as needed
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
```

**Step 2: Run build to verify no syntax errors**

```bash
npm run build
```
Expected: ✓ built successfully

**Step 3: Commit**

```bash
git add src/data.js
git commit -m "feat: add Season 1 real cast, tribes, and jury vote data"
```

---

## Task 3: Add Season 1 Voting History (11 tribal councils)

**Files:**
- Modify: `src/data.js` — add `votingHistory` and `challenges` arrays to the Season 1 object

> The Season 1 object from Task 2 is missing `votingHistory` and `challenges`. Add them now.

**Step 1: Add votingHistory array**

After the `cast: [...]` array in the Season 1 object, add:

```js
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
      // No elimination. Jace & Sean vote Madison; Olivia & Madison vote Sean.
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
      // Tied players (Sean & Madison) cannot vote on the revote.
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
      // Remaining players: Jace, Olivia, Meredith, Caroline (F4).
      // Caroline was eliminated without a traditional vote (twist/fire-making/advantage).
      {
        tcid: "s1_tc11", eid: "s1_e11", episode: 11, tid: null, notes: "No vote — eliminated",
        eliminatedPid: "s1_p04",
        votes: [],
      },
    ],

    challenges: [],
  },
```

> **Note:** `challenges: []` leaves Season 1 challenge data blank. It can be filled in later.

**Step 2: Run build to verify**

```bash
npm run build
```
Expected: ✓ built successfully (no JS syntax errors)

**Step 3: Commit**

```bash
git add src/data.js
git commit -m "feat: add Season 1 full voting history and jury votes"
```

---

## Task 4: Also add logoPath to Season 2 and Season 3

**Files:**
- Modify: `src/data.js` — Season 2 and Season 3 sections only

**Step 1: Add logoPath and juryVotes to Season 2**

In the Season 2 object, add these two fields after the `fanFavoritePid` line:

```js
    logoPath: "/survivor/logos/season-2.png",
    juryVotes: [],
```

**Step 2: Add logoPath to Season 3**

In the Season 3 object, add:

```js
    logoPath: "/survivor/logos/season-3.png",
    juryVotes: [],
```

**Step 3: Build + commit**

```bash
npm run build && git add src/data.js && git commit -m "feat: add logoPath and juryVotes fields to Season 2 and 3"
```

---

## Task 5: Update Branding to "14508 Survivor"

**Files:**
- Modify: `src/components/Sidebar.jsx` — brand text
- Modify: `src/App.jsx` — footer text
- Modify: `src/pages/Home.jsx` — hero heading
- Modify: `index.html` — `<title>` tag

**Step 1: Update Sidebar.jsx**

Find line: `<span className="sidebar-brand-text">Backyard Survivor Wiki</span>`
Replace with: `<span className="sidebar-brand-text">14508 Survivor Wiki</span>`

**Step 2: Update App.jsx footer**

Find line: `Backyard Survivor Wiki — Not affiliated with CBS Survivor`
Replace with: `14508 Survivor Wiki — Not affiliated with CBS Survivor`

**Step 3: Update Home.jsx hero**

Find line: `<h1>Backyard Survivor Wiki</h1>`
Replace with: `<h1>14508 Survivor Wiki</h1>`

**Step 4: Update index.html title**

Find line: `<title>Backyard Survivor Wiki</title>`
Replace with: `<title>14508 Survivor Wiki</title>`

**Step 5: Build + commit**

```bash
npm run build
git add src/components/Sidebar.jsx src/App.jsx src/pages/Home.jsx index.html
git commit -m "feat: rename site to 14508 Survivor Wiki"
```

---

## Task 6: Add Jury Vote Section to VotingHistory Page

The Voting History page needs a section below the main grid showing how each jury member voted at Final Tribal Council.

**Files:**
- Modify: `src/pages/VotingHistory.jsx`
- Modify: `src/styles.css` — add `.jury-vote-section` styles

**Step 1: Update VotingHistory.jsx**

After the closing `</div>` of `voting-grid-wrapper` and the legend paragraph, add a jury vote section. The full file should look like this after the legend `<p>`:

```jsx
      {season.juryVotes && season.juryVotes.length > 0 && (
        <>
          <h2 style={{ marginTop: 32 }}>Final Jury Vote</h2>
          <table className="challenge-table jury-vote-table">
            <thead>
              <tr>
                <th>Juror</th>
                <th>Voted For</th>
              </tr>
            </thead>
            <tbody>
              {season.juryVotes.map((jv) => (
                <tr key={jv.jurorPid}>
                  <td>
                    <Link to={`/season/${sid}/cast/${slugify(getPlayerName(season, jv.jurorPid))}`}>
                      {getPlayerName(season, jv.jurorPid)}
                    </Link>
                  </td>
                  <td>
                    <Link to={`/season/${sid}/cast/${slugify(getPlayerName(season, jv.votedForPid))}`}>
                      {getPlayerName(season, jv.votedForPid)}
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
```

**Step 2: Add CSS for jury vote table in styles.css**

At the bottom of `src/styles.css`, append:

```css
/* ── Jury Vote Table ─────────────────────────────────────────── */
.jury-vote-table td:last-child {
  font-weight: 600;
  color: var(--accent);
}
```

**Step 3: Build + commit**

```bash
npm run build
git add src/pages/VotingHistory.jsx src/styles.css
git commit -m "feat: add jury vote section to Voting History page"
```

---

## Task 7: Add Season Logos to Home Page and Season Overview

**Files:**
- Modify: `src/pages/Home.jsx` — add Logo column to season table
- Modify: `src/pages/SeasonOverview.jsx` — add logo above infobox
- Modify: `src/styles.css` — logo thumbnail styles

**Step 1: Add logo column to Home.jsx season table**

In `src/pages/Home.jsx`, add a `Logo` `<th>` as the **first** column in the `<thead>`:

```jsx
          <tr>
            <th>Logo</th>
            <th>Season</th>
            <th>Subtitle</th>
            <th>Location</th>
            <th>Players</th>
            <th>Episodes</th>
            <th>Winner</th>
          </tr>
```

And add the corresponding `<td>` as the **first** `<td>` in each row (inside the `SEASONS.map` tbody):

```jsx
              <td>
                {s.logoPath ? (
                  <img
                    src={s.logoPath}
                    alt={`${s.name} logo`}
                    className="season-logo-thumb"
                  />
                ) : '—'}
              </td>
```

**Step 2: Add logo to SeasonOverview.jsx**

In `src/pages/SeasonOverview.jsx`, right before the `<div className="clearfix">` that wraps the infobox, add:

```jsx
      {season.logoPath && (
        <div className="season-logo-header">
          <img src={season.logoPath} alt={`${season.name} logo`} />
        </div>
      )}
```

**Step 3: Add CSS for logos in styles.css**

Append to `src/styles.css`:

```css
/* ── Season Logos ────────────────────────────────────────────── */
.season-logo-thumb {
  width: 60px;
  height: 60px;
  object-fit: contain;
  display: block;
}

.season-logo-header {
  text-align: center;
  margin-bottom: 16px;
}

.season-logo-header img {
  max-height: 120px;
  max-width: 100%;
  object-fit: contain;
}
```

**Step 4: Build + commit**

```bash
npm run build
git add src/pages/Home.jsx src/pages/SeasonOverview.jsx src/styles.css
git commit -m "feat: add season logos to Home and Season Overview pages"
```

---

## Task 8: Final Verification

**Step 1: Run full build**

```bash
npm run build
```
Expected: ✓ built in under 10s, no warnings, no errors

**Step 2: Spot-check data consistency**

Run this one-liner in a terminal to verify vote counts match expectations:

```bash
node -e "
const { SEASONS } = await import('./src/data.js');
const s1 = SEASONS[0];
console.log('Cast:', s1.cast.length, '(expect 14)');
console.log('Tribes:', s1.tribes.length, '(expect 5)');
console.log('TCs:', s1.votingHistory.length, '(expect 11)');
console.log('Jury votes:', s1.juryVotes.length, '(expect 9)');
console.log('Winner:', s1.cast.find(p=>p.pid===s1.winnerPid)?.name, '(expect Jace)');
" --input-type=module 2>/dev/null || echo "Run manually in browser console if needed"
```

**Step 3: Final commit if any loose changes remain**

```bash
git status
# If anything is unstaged:
git add -A && git commit -m "chore: final cleanup for Season 1 data entry"
```
