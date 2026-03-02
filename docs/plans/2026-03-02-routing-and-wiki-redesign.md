# Design: Routing & Fandom-Style Wiki Redesign

Date: 2026-03-02

## Summary

Migrate the Backyard Survivor Wiki from a single-page useState-driven app to a fully routed React app with deep URL paths, and redesign the UI to match the style of the Fandom Survivor Wiki.

---

## Routing

**Approach:** React Router v6 with HTML5 history mode + GitHub Pages 404 redirect trick.

A `404.html` file is added to `public/` that redirects to the app root with the path encoded as a query string, which the app then restores on load. This lets GitHub Pages serve clean URLs without a backend.

**URL structure:**
```
/                          → Home page
/season/1                  → Season 1 overview
/season/1/cast             → Season 1 cast listing
/season/1/cast/player-1    → Individual player page (name slug)
/season/1/voting           → Voting history
/season/1/challenges       → Challenges
```

Player slugs are derived by slugifying the player name (lowercase, spaces → hyphens).

---

## Visual Design

**Style:** Fandom/Survivor Wiki aesthetic — dark sidebar, article-style content, floating infoboxes.

### Layout
- **Left sidebar** (fixed, ~220px wide): dark navy `#1a1a2e`, contains logo, season navigation links, quick links (Home, All Seasons)
- **Main content area**: slightly lighter dark background `#16213e`, full-width article layout with max-width ~960px

### Typography
- Headings: `Georgia`, serif — wiki feel
- Body: system sans-serif
- Section dividers: thin `1px` horizontal rules with faint color

### Color palette
- Background: `#1a1a2e` (sidebar), `#16213e` (main), `#0f3460` (cards/infoboxes)
- Accent: `#f5a623` (amber, Survivor-style)
- Text: `#e8e8e8`
- Tribe colors: carried through from data

### Components

**Infobox** (player pages, season pages):
- Right-floating table, ~260px wide
- Tribe-color header bar with player name
- Rows: Tribe, Placement, Age, Hometown, Days Lasted, Challenge Wins, Votes Against, Jury Member

**Breadcrumbs:**
- `Home > Season 1 > Cast > Player Name`
- Appears at top of every article page

**Sidebar nav:**
- Logo + site title at top
- Season links (Season 1, Season 2, Season 3)
- Within a season: sub-links for Overview, Cast, Voting History, Challenges

**Voting history table:**
- Fandom-style grid — players as columns across the top, episodes as rows
- Each cell shows who that player voted for that episode
- Eliminated player row highlighted

**Cast listing:**
- Grid of wiki-style cards — avatar initial, name, tribe badge, placement
- Links to individual player pages

**Player page:**
- Article-style layout with infobox floating right
- Sections: Biography, Voting History (per-episode), Challenges won

---

## Implementation Notes

- Install `react-router-dom` v6
- Add `public/404.html` with GitHub Pages redirect script
- Add redirect restoration script to `index.html`
- Refactor `App.jsx` into route-based components in `src/pages/`
- Keep all data in `src/data.js` (no changes needed)
- Rewrite `src/styles.css` for wiki layout
- `vite.config.js` already has `base: '/survivor/'` — no change needed

---

## Files to Create/Modify

| File | Action |
|------|--------|
| `package.json` | Add react-router-dom |
| `public/404.html` | Create (GitHub Pages redirect) |
| `index.html` | Add redirect restoration script |
| `src/main.jsx` | Wrap app in BrowserRouter |
| `src/App.jsx` | Replace with route definitions |
| `src/pages/Home.jsx` | New |
| `src/pages/SeasonOverview.jsx` | New |
| `src/pages/CastList.jsx` | New |
| `src/pages/PlayerPage.jsx` | New |
| `src/pages/VotingHistory.jsx` | New |
| `src/pages/Challenges.jsx` | New |
| `src/components/Sidebar.jsx` | New |
| `src/components/Breadcrumbs.jsx` | New |
| `src/components/Infobox.jsx` | New |
| `src/styles.css` | Full rewrite |
| `src/data.js` | No changes |
