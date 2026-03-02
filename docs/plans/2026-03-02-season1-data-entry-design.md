# Design: Season 1 Real Data Entry + Branding Update

**Date:** 2026-03-02
**Status:** Approved

---

## Overview

Replace all Season 1 placeholder data in `src/data.js` with real game data extracted from the voting chart. Update site branding to "14508 Survivor". Add season logos and jury vote tracking to the data model.

---

## Season 1 Cast (14 players)

| Placement | Player | Original Tribe | Jury? | Notes |
|-----------|--------|---------------|-------|-------|
| 1st | Jace | Blue (s1_t2) | No (winner) | 8 jury votes |
| 2nd | Olivia | Purple (s1_t1) | No (finalist) | 1 jury vote |
| 3rd | Meredith | Purple (s1_t1) | No (finalist) | 0 jury votes |
| 4th | Caroline | Blue (s1_t2) | Yes | Eliminated, No Vote |
| 5th | Abdul | Blue (s1_t2) | Yes | |
| 6th | Jacob | Purple (s1_t1) | Yes | |
| 7th | Madison | Blue (s1_t2) | Yes | |
| 8th | Kelsey | Blue (s1_t2) | Yes | |
| 9th | Savannah | Blue (s1_t2) | Yes | |
| 10th | Dom | Purple (s1_t1) | Yes | |
| 11th | Clara | Blue (s1_t2) | Yes | |
| 12th | Sean | Blue (s1_t2) | Yes | |
| 13th | Marissa | Purple (s1_t1) | No | Pre-jury |
| 14th | Sam | Purple (s1_t1) | No | Pre-jury, first boot |

---

## Tribe Structure (5 tribes total)

| ID | Name | Color | Phase | Players |
|----|------|-------|-------|---------|
| s1_t1 | Purple | #7b2fbe | Original | Sam, Marissa, Olivia, Meredith, Jacob, Madison, Dom |
| s1_t2 | Blue | #2563eb | Original | Jace, Sean, Clara, Caroline, Abdul, Kelsey, Savannah |
| s1_t3 | Yellow | #ca8a04 | Switched A | Jace, Olivia, Madison, Sean |
| s1_t4 | Green | #16a34a | Switched B | Caroline, Abdul, Clara, Dom |
| s1_t5 | Orange | #ea580c | Switched C | Meredith, Jacob, Kelsey, Savannah (never lost) |

> Merged tribe uses `tid: null` in tribal council records.
> Each player's `tid` field = their **original** tribe.

---

## Voting History (11 entries)

| tcid | Episode | Tribe | Eliminated | Vote | Type |
|------|---------|-------|------------|------|------|
| s1_tc01 | 1 | s1_t1 | Sam | 6-1 | vote |
| s1_tc02 | 2 | s1_t1 | Marissa | 5-1 | vote |
| s1_tc03a | 3 | s1_t3 | — (tied) | 2-2 | vote (tie) |
| s1_tc03b | 3 | s1_t3 | Sean | 2-0 | revote |
| s1_tc04 | 4 | s1_t4 | Clara | 3-1 | vote |
| s1_tc05 | 5 | s1_t4 | Dom | 2-1 | vote |
| s1_tc06 | 6 | null | Savannah | 8-1 | vote |
| s1_tc07 | 7 | null | Kelsey | 5-3 | vote |
| s1_tc08 | 8 | null | Madison | 5-2 | vote |
| s1_tc09 | 9 | null | Jacob | 4-2 | vote |
| s1_tc10 | 10 | null | Abdul | 3-2 | vote |
| s1_tc11 | 11 | null | Caroline | — | noVote |

### Tie/Revote Representation
Sean's elimination is modeled as two back-to-back TC entries on episode 3:
- `s1_tc03a`: initial 2-2 vote (no elimination, `eliminatedPid: null`)
- `s1_tc03b`: revote 2-0 (Sean eliminated)

The `noVote: true` flag on `s1_tc11` signals Caroline's elimination without a traditional vote.

---

## New Data Schema Fields

### On `season`:
```js
{
  logoPath: "/survivor/season 1.png",   // path served from public root
  juryVotes: [
    { jurorPid: "s1_pXX", votedForPid: "s1_pXX" },
    ...
  ]
}
```

### On `votingHistory` entry:
```js
{
  noVote: true,      // optional — Caroline's elimination
  isRevote: true,    // optional — marks a revote entry
}
```

---

## Jury Votes

| Juror | Voted For |
|-------|-----------|
| Sean | Jace |
| Clara | Jace |
| Dom | Olivia |
| Savannah | Jace |
| Kelsey | Jace |
| Madison | Jace |
| Jacob | Jace |
| Abdul | Jace |
| Caroline | Jace |

**Result: Jace wins 8-1-0**

---

## Branding Changes

- Site title: **"14508 Survivor Wiki"** (update Sidebar header, App `<title>`, Home hero)
- Season logos: `season 1.png`, `season 2.png`, `season 3.png` are already in project root
  - Move to `public/logos/` so Vite serves them at `/survivor/logos/season-1.png`
  - Display on Home page as a small thumbnail column in the seasons table
  - Display on Season Overview page above the infobox

---

## UI Changes Required

### `VotingHistory.jsx`
- Caroline's TC row: show `🚫 No Vote` instead of torch emoji
- Revote rows: label as `Ep. X (Revote)` in the Episode column
- Add jury vote section below the main grid

### `Home.jsx`
- Add a Logo column to the seasons table showing `<img>` thumbnails

### `SeasonOverview.jsx`
- Add logo `<img>` above the infobox

### `Sidebar.jsx` / `App.jsx`
- Update "Backyard Survivor Wiki" text to "14508 Survivor Wiki"

---

## Out of Scope (for now)
- Player ages, hometowns, bios (left as empty string `""` placeholders)
- Season 2 real data
- Challenge data for Season 1 (current placeholders remain)
