# Routing & Fandom-Style Wiki Redesign — Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrate from a useState-driven SPA to a fully routed React app with deep URL paths and a Fandom Survivor Wiki-style design (dark sidebar, infoboxes, article layout, Fandom-style voting grid).

**Architecture:** React Router v6 with HTML5 history mode + GitHub Pages 404 redirect trick. Components split into `src/pages/` (routed pages) and `src/components/` (shared). Shared logic extracted to `src/utils/helpers.js`. CSS fully rewritten for sidebar + article wiki layout.

**Tech Stack:** React 18, React Router v6, Vite, vanilla CSS (no CSS framework)

> **Note:** No test framework is installed. "Verify" steps mean checking the browser at `http://localhost:5173/survivor/`.

---

## Final URL Structure

```
/survivor/                           → Home
/survivor/season/:sid                → Season Overview
/survivor/season/:sid/cast           → Cast List
/survivor/season/:sid/cast/:slug     → Player Page
/survivor/season/:sid/voting         → Voting History
/survivor/season/:sid/challenges     → Challenges
```

---

## Final File Structure

```
src/
  pages/
    Home.jsx
    SeasonOverview.jsx
    CastList.jsx
    PlayerPage.jsx
    VotingHistory.jsx
    Challenges.jsx
  components/
    Sidebar.jsx
    Breadcrumbs.jsx
    Infobox.jsx
    Avatar.jsx
  utils/
    helpers.js
  data.js          ← no changes
  styles.css       ← full rewrite
  App.jsx          ← full rewrite (route definitions only)
  main.jsx         ← wrap in BrowserRouter
public/
  404.html         ← new (GitHub Pages redirect)
index.html         ← add redirect restoration script
```

---

## Task 1: Install react-router-dom

**Files:**
- Modify: `package.json` (via npm)

**Step 1: Install the package**

```bash
npm install react-router-dom
```

Expected output: added react-router-dom to node_modules, package.json updated.

**Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "feat: install react-router-dom"
```

---

## Task 2: GitHub Pages SPA redirect setup

**Files:**
- Create: `public/404.html`
- Modify: `index.html`

**Step 1: Create `public/404.html`**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <title>Backyard Survivor Wiki</title>
    <script>
      // SPA redirect for GitHub Pages
      // Preserves the path by encoding it into a query string
      var l = window.location;
      l.replace(
        l.protocol + '//' + l.hostname + (l.port ? ':' + l.port : '') +
        l.pathname.split('/').slice(0, 2).join('/') + '/?/' +
        l.pathname.slice(1).split('/').slice(1).join('/').replace(/&/g, '~and~') +
        (l.search ? '&' + l.search.slice(1).replace(/&/g, '~and~') : '') +
        l.hash
      );
    </script>
  </head>
  <body></body>
</html>
```

**Step 2: Add redirect restoration to `index.html`**

Add this script block inside `<head>`, before the closing `</head>` tag:

```html
    <script>
      // Restore path encoded by 404.html redirect
      (function(l) {
        if (l.search[1] === '/') {
          var decoded = l.search.slice(1).split('&').map(function(s) {
            return s.replace(/~and~/g, '&');
          }).join('?');
          window.history.replaceState(null, null,
            l.pathname.slice(0, -1) + decoded + l.hash
          );
        }
      }(window.location));
    </script>
```

**Step 3: Verify (manual)**

Navigate to `http://localhost:5173/survivor/season/s1` directly in browser — should load the app (even if no route exists yet, it shouldn't 404 in dev mode).

**Step 4: Commit**

```bash
git add public/404.html index.html
git commit -m "feat: add GitHub Pages SPA redirect for deep linking"
```

---

## Task 3: Extract helpers to `src/utils/helpers.js`

**Files:**
- Create: `src/utils/helpers.js`

**Step 1: Create the helpers file**

```js
// src/utils/helpers.js

export function slugify(name) {
  return name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

export function ordinal(n) {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

export function getPlayer(season, pid) {
  return season.cast.find((p) => p.pid === pid);
}

export function getPlayerBySlug(season, slug) {
  return season.cast.find((p) => slugify(p.name) === slug);
}

export function getTribe(season, tid) {
  return season.tribes.find((t) => t.tid === tid);
}

export function getTribeColor(season, tid) {
  const tribe = getTribe(season, tid);
  return tribe ? tribe.color : '#888';
}

export function getTribeName(season, tid) {
  const tribe = getTribe(season, tid);
  return tribe ? tribe.name : 'Merged';
}

export function getPlayerName(season, pid) {
  const player = getPlayer(season, pid);
  return player ? player.name : 'Unknown';
}
```

**Step 2: Commit**

```bash
git add src/utils/helpers.js
git commit -m "feat: extract shared helpers to src/utils/helpers.js"
```

---

## Task 4: Create `Avatar` component

**Files:**
- Create: `src/components/Avatar.jsx`

**Step 1: Create the file**

```jsx
// src/components/Avatar.jsx

export default function Avatar({ name, color, size = 48 }) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();
  return (
    <div
      className="avatar"
      style={{
        width: size,
        height: size,
        fontSize: size * 0.38,
        background: `linear-gradient(135deg, ${color}, ${color}99)`,
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 700,
        color: '#fff',
        flexShrink: 0,
      }}
    >
      {initials}
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Avatar.jsx
git commit -m "feat: add Avatar component"
```

---

## Task 5: Create `Sidebar` component

**Files:**
- Create: `src/components/Sidebar.jsx`

**Step 1: Create the file**

```jsx
// src/components/Sidebar.jsx
import { NavLink, useParams } from 'react-router-dom';
import { SEASONS } from '../data';

export default function Sidebar() {
  const { sid } = useParams();

  return (
    <nav className="sidebar">
      <div className="sidebar-logo">
        <NavLink to="/" className="sidebar-brand">
          <span className="sidebar-brand-icon">🔥</span>
          <span className="sidebar-brand-text">Backyard Survivor Wiki</span>
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Navigation</div>
        <NavLink to="/" className={({ isActive }) => isActive ? 'sidebar-link active' : 'sidebar-link'} end>
          Main Page
        </NavLink>
      </div>

      <div className="sidebar-section">
        <div className="sidebar-section-title">Seasons</div>
        {SEASONS.map((s) => (
          <div key={s.sid}>
            <NavLink
              to={`/season/${s.sid}`}
              className={({ isActive }) =>
                sid === s.sid ? 'sidebar-link active' : 'sidebar-link'
              }
            >
              {s.name}
            </NavLink>
            {sid === s.sid && s.cast.length > 0 && (
              <div className="sidebar-sub">
                <NavLink to={`/season/${s.sid}`} end className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Overview</NavLink>
                <NavLink to={`/season/${s.sid}/cast`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Cast</NavLink>
                <NavLink to={`/season/${s.sid}/voting`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Voting History</NavLink>
                <NavLink to={`/season/${s.sid}/challenges`} className={({ isActive }) => isActive ? 'sidebar-sublink active' : 'sidebar-sublink'}>Challenges</NavLink>
              </div>
            )}
          </div>
        ))}
      </div>
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Sidebar.jsx
git commit -m "feat: add Sidebar component"
```

---

## Task 6: Create `Breadcrumbs` component

**Files:**
- Create: `src/components/Breadcrumbs.jsx`

**Step 1: Create the file**

```jsx
// src/components/Breadcrumbs.jsx
import { Link } from 'react-router-dom';

export default function Breadcrumbs({ crumbs }) {
  // crumbs: [{ label, to }, ..., { label }]  (last has no `to`)
  return (
    <nav className="breadcrumbs" aria-label="breadcrumb">
      {crumbs.map((crumb, i) => (
        <span key={i} className="breadcrumb-item">
          {i > 0 && <span className="breadcrumb-sep"> &gt; </span>}
          {crumb.to ? (
            <Link to={crumb.to}>{crumb.label}</Link>
          ) : (
            <span className="breadcrumb-current">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Breadcrumbs.jsx
git commit -m "feat: add Breadcrumbs component"
```

---

## Task 7: Create `Infobox` component

**Files:**
- Create: `src/components/Infobox.jsx`

**Step 1: Create the file**

```jsx
// src/components/Infobox.jsx

export default function Infobox({ title, headerColor = '#e74c3c', rows, image }) {
  // rows: [{ label, value }]
  return (
    <table className="infobox">
      <thead>
        <tr>
          <th
            colSpan={2}
            className="infobox-header"
            style={{ background: headerColor }}
          >
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'infobox-row even' : 'infobox-row odd'}>
            <td className="infobox-label">{row.label}</td>
            <td className="infobox-value">{row.value}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
```

**Step 2: Commit**

```bash
git add src/components/Infobox.jsx
git commit -m "feat: add Infobox component"
```

---

## Task 8: Rewrite `src/styles.css`

**Files:**
- Modify: `src/styles.css` (full rewrite)

**Step 1: Replace the entire file contents with:**

```css
/* ═══════════════════════════════════════════════════
   BACKYARD SURVIVOR WIKI — FANDOM-STYLE THEME
   ═══════════════════════════════════════════════════ */

*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

:root {
  --sidebar-width: 220px;
  --bg-page:     #1b1b1b;
  --bg-sidebar:  #151515;
  --bg-card:     #242424;
  --bg-infobox:  #2a2a2a;
  --bg-table-even: #1f1f1f;
  --bg-table-odd:  #242424;
  --accent:      #f5a623;
  --accent-dim:  #c8841a;
  --text:        #d4d4d4;
  --text-muted:  #888;
  --text-heading:#f0f0f0;
  --border:      #333;
  --link:        #8ec3e6;
  --link-hover:  #b8d8f0;
  --sidebar-link:#c8c8c8;
  --sidebar-active: #f5a623;
}

html { font-size: 15px; }

body {
  background: var(--bg-page);
  color: var(--text);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  line-height: 1.6;
}

/* ─── Layout ───────────────────────────────────────── */

.layout {
  display: flex;
  min-height: 100vh;
}

/* ─── Sidebar ──────────────────────────────────────── */

.sidebar {
  width: var(--sidebar-width);
  background: var(--bg-sidebar);
  border-right: 1px solid var(--border);
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  overflow-y: auto;
  z-index: 100;
  padding-bottom: 32px;
}

.sidebar-logo {
  padding: 14px 12px 10px;
  border-bottom: 1px solid var(--border);
  margin-bottom: 8px;
}

.sidebar-brand {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: var(--accent);
}

.sidebar-brand-icon { font-size: 1.3rem; }

.sidebar-brand-text {
  font-family: Georgia, serif;
  font-size: 0.8rem;
  font-weight: 700;
  line-height: 1.2;
  color: var(--accent);
}

.sidebar-section { padding: 6px 0; }

.sidebar-section-title {
  font-size: 0.65rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  color: var(--text-muted);
  padding: 10px 14px 4px;
}

.sidebar-link {
  display: block;
  padding: 5px 14px;
  color: var(--sidebar-link);
  text-decoration: none;
  font-size: 0.88rem;
  border-left: 3px solid transparent;
  transition: color 0.15s, border-color 0.15s;
}

.sidebar-link:hover { color: #fff; }

.sidebar-link.active {
  color: var(--sidebar-active);
  border-left-color: var(--sidebar-active);
  background: rgba(245, 166, 35, 0.05);
}

.sidebar-sub { margin: 0; }

.sidebar-sublink {
  display: block;
  padding: 4px 14px 4px 26px;
  color: var(--text-muted);
  text-decoration: none;
  font-size: 0.82rem;
  border-left: 3px solid transparent;
  transition: color 0.15s;
}

.sidebar-sublink:hover { color: var(--text); }

.sidebar-sublink.active {
  color: var(--sidebar-active);
  border-left-color: var(--sidebar-active);
}

/* ─── Main Content ─────────────────────────────────── */

.main-content {
  margin-left: var(--sidebar-width);
  flex: 1;
  min-width: 0;
}

.article {
  max-width: 960px;
  padding: 28px 36px 60px;
}

/* ─── Breadcrumbs ──────────────────────────────────── */

.breadcrumbs {
  font-size: 0.82rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.breadcrumb-item a {
  color: var(--link);
  text-decoration: none;
}

.breadcrumb-item a:hover { color: var(--link-hover); text-decoration: underline; }

.breadcrumb-sep { margin: 0 4px; color: var(--text-muted); }

.breadcrumb-current { color: var(--text); }

/* ─── Article Typography ───────────────────────────── */

.article h1 {
  font-family: Georgia, serif;
  font-size: 1.9rem;
  color: var(--text-heading);
  border-bottom: 1px solid var(--border);
  padding-bottom: 8px;
  margin-bottom: 16px;
  font-weight: normal;
}

.article h2 {
  font-family: Georgia, serif;
  font-size: 1.3rem;
  color: var(--text-heading);
  border-bottom: 1px solid var(--border);
  padding-bottom: 4px;
  margin: 28px 0 12px;
  font-weight: normal;
}

.article h3 {
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-heading);
  margin: 20px 0 8px;
}

.article p { margin-bottom: 12px; }

.article a { color: var(--link); text-decoration: none; }
.article a:hover { text-decoration: underline; color: var(--link-hover); }

/* ─── Infobox ──────────────────────────────────────── */

.infobox {
  float: right;
  clear: right;
  margin: 0 0 20px 24px;
  width: 260px;
  border-collapse: collapse;
  border: 1px solid var(--border);
  font-size: 0.82rem;
  background: var(--bg-infobox);
}

.infobox-header {
  padding: 10px 12px;
  font-family: Georgia, serif;
  font-size: 1rem;
  font-weight: bold;
  color: #fff;
  text-align: center;
}

.infobox-row.even td { background: var(--bg-table-even); }
.infobox-row.odd  td { background: var(--bg-table-odd); }

.infobox-label {
  padding: 5px 10px;
  font-weight: 600;
  color: var(--text-muted);
  white-space: nowrap;
  width: 40%;
  border-top: 1px solid var(--border);
}

.infobox-value {
  padding: 5px 10px;
  color: var(--text);
  border-top: 1px solid var(--border);
}

/* ─── Tribe Badge ──────────────────────────────────── */

.tribe-badge {
  display: inline-block;
  padding: 2px 8px;
  border-radius: 3px;
  font-size: 0.75rem;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}

/* ─── Home Page ────────────────────────────────────── */

.home-hero {
  border-bottom: 1px solid var(--border);
  padding-bottom: 20px;
  margin-bottom: 28px;
}

.home-hero h1 {
  font-family: Georgia, serif;
  font-size: 2rem;
  color: var(--text-heading);
  margin-bottom: 6px;
  border: none;
  padding: 0;
}

.home-hero p { color: var(--text-muted); font-size: 0.95rem; }

.season-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 8px;
}

.season-table th {
  text-align: left;
  padding: 8px 12px;
  font-size: 0.82rem;
  font-weight: 600;
  color: var(--text-muted);
  border-bottom: 2px solid var(--border);
}

.season-table td {
  padding: 10px 12px;
  border-bottom: 1px solid var(--border);
  font-size: 0.9rem;
  vertical-align: middle;
}

.season-table tr:hover td { background: var(--bg-card); }

.season-table a {
  color: var(--link);
  text-decoration: none;
  font-weight: 500;
}

.season-table a:hover { text-decoration: underline; }

.coming-soon-badge {
  display: inline-block;
  padding: 2px 8px;
  background: #333;
  color: var(--text-muted);
  border-radius: 3px;
  font-size: 0.78rem;
}

/* ─── Season Overview ──────────────────────────────── */

.overview-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  font-size: 0.88rem;
  color: var(--text-muted);
  margin-bottom: 20px;
}

.overview-meta span { display: flex; align-items: center; gap: 5px; }

.elim-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.elim-table th {
  text-align: left;
  padding: 7px 12px;
  border-bottom: 2px solid var(--border);
  font-weight: 600;
  color: var(--text-muted);
  font-size: 0.8rem;
}

.elim-table td {
  padding: 8px 12px;
  border-bottom: 1px solid var(--border);
  vertical-align: middle;
}

.elim-table tr:hover td { background: var(--bg-card); }

.elim-table .jury-tag {
  font-size: 0.72rem;
  background: #2c4a2c;
  color: #7dcc7d;
  border-radius: 3px;
  padding: 1px 6px;
  margin-left: 6px;
}

.elim-table .winner-row td { background: rgba(245,166,35,0.06); }

.tribe-block { margin-bottom: 24px; }

.tribe-members-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 8px;
}

.tribe-member-chip {
  display: flex;
  align-items: center;
  gap: 7px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 5px 10px;
  font-size: 0.85rem;
  text-decoration: none;
  color: var(--text);
  transition: background 0.15s;
}

.tribe-member-chip:hover { background: #2f2f2f; color: var(--text); }

/* ─── Cast List ────────────────────────────────────── */

.cast-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 14px;
  margin-top: 8px;
}

.cast-card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 4px;
  padding: 14px 12px;
  text-decoration: none;
  color: var(--text);
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 8px;
  transition: border-color 0.15s, background 0.15s;
}

.cast-card:hover {
  border-color: var(--accent);
  background: #2a2a2a;
}

.cast-card h3 {
  font-size: 0.9rem;
  font-weight: 600;
  color: var(--text-heading);
  margin: 0;
}

.cast-card .placement {
  font-size: 0.78rem;
  color: var(--text-muted);
}

/* ─── Player Page ──────────────────────────────────── */

.player-article { overflow: hidden; /* contain float */ }

.player-bio { margin-bottom: 20px; color: var(--text); }

.player-vote-grid {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.85rem;
  clear: both;
}

.player-vote-grid th, .player-vote-grid td {
  padding: 7px 12px;
  border: 1px solid var(--border);
  text-align: left;
}

.player-vote-grid th {
  background: var(--bg-card);
  color: var(--text-muted);
  font-size: 0.8rem;
  font-weight: 600;
}

/* ─── Voting History (Fandom grid) ─────────────────── */

.voting-grid-wrapper {
  overflow-x: auto;
  margin-top: 8px;
}

.voting-grid {
  border-collapse: collapse;
  font-size: 0.8rem;
  min-width: 100%;
}

.voting-grid th, .voting-grid td {
  border: 1px solid var(--border);
  padding: 6px 10px;
  text-align: center;
  white-space: nowrap;
}

.voting-grid thead th {
  background: var(--bg-card);
  color: var(--text-muted);
  font-weight: 600;
  font-size: 0.75rem;
}

.voting-grid thead .player-header {
  writing-mode: initial;
  max-width: 80px;
  overflow: hidden;
  text-overflow: ellipsis;
}

.voting-grid tbody tr:nth-child(even) td { background: var(--bg-table-even); }
.voting-grid tbody tr:nth-child(odd)  td { background: var(--bg-table-odd); }

.voting-grid .ep-label {
  font-weight: 600;
  color: var(--text-muted);
  text-align: left;
  white-space: nowrap;
}

.voting-grid .cell-self { background: #2a1a1a !important; color: #7a3a3a; }
.voting-grid .cell-eliminated { background: #1a2a1a !important; }
.voting-grid .cell-absent { color: #444; }

.tribal-result-bar {
  margin-top: 10px;
  padding: 6px 12px;
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: 3px;
  font-size: 0.85rem;
}

.tribal-result-bar strong { color: var(--accent); }

.tribal-episode-header {
  margin: 24px 0 6px;
  font-family: Georgia, serif;
  font-size: 1rem;
  color: var(--text-heading);
  border-bottom: 1px solid var(--border);
  padding-bottom: 4px;
}

/* ─── Challenges ───────────────────────────────────── */

.challenge-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 0.88rem;
}

.challenge-table th {
  text-align: left;
  padding: 8px 12px;
  border-bottom: 2px solid var(--border);
  font-size: 0.8rem;
  color: var(--text-muted);
  font-weight: 600;
}

.challenge-table td {
  padding: 9px 12px;
  border-bottom: 1px solid var(--border);
  vertical-align: top;
}

.challenge-table tr:hover td { background: var(--bg-card); }

.challenge-type-immunity { color: #7daacc; font-weight: 600; font-size: 0.8rem; }
.challenge-type-reward   { color: #ccaa7d; font-weight: 600; font-size: 0.8rem; }

/* ─── Clearfix ─────────────────────────────────────── */
.clearfix::after { content: ''; display: table; clear: both; }

/* ─── Empty State ──────────────────────────────────── */
.empty-state {
  color: var(--text-muted);
  font-style: italic;
  padding: 20px 0;
}

/* ─── Footer ───────────────────────────────────────── */
.wiki-footer {
  margin-left: var(--sidebar-width);
  padding: 16px 36px;
  border-top: 1px solid var(--border);
  font-size: 0.78rem;
  color: var(--text-muted);
}
```

**Step 2: Verify in browser**

The dev server at `http://localhost:5173/survivor/` should not crash (styles compile fine). We'll see the visual result once pages are wired up.

**Step 3: Commit**

```bash
git add src/styles.css
git commit -m "feat: rewrite CSS for Fandom-style wiki layout"
```

---

## Task 9: Rewrite `src/App.jsx` with route definitions

**Files:**
- Modify: `src/App.jsx` (full rewrite)

**Step 1: Replace the entire file with route definitions**

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Home from './pages/Home';
import SeasonOverview from './pages/SeasonOverview';
import CastList from './pages/CastList';
import PlayerPage from './pages/PlayerPage';
import VotingHistory from './pages/VotingHistory';
import Challenges from './pages/Challenges';
import './styles.css';

export default function App() {
  return (
    <div className="layout">
      <Sidebar />
      <div className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/season/:sid" element={<SeasonOverview />} />
          <Route path="/season/:sid/cast" element={<CastList />} />
          <Route path="/season/:sid/cast/:slug" element={<PlayerPage />} />
          <Route path="/season/:sid/voting" element={<VotingHistory />} />
          <Route path="/season/:sid/challenges" element={<Challenges />} />
        </Routes>
        <footer className="wiki-footer">
          Backyard Survivor Wiki — Not affiliated with CBS Survivor
        </footer>
      </div>
    </div>
  );
}
```

**Step 2: Update `src/main.jsx` to wrap in `BrowserRouter`**

```jsx
// src/main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter basename="/survivor">
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
```

**Step 3: Create stub files for all pages so app compiles** (each will be filled in subsequent tasks)

```jsx
// src/pages/Home.jsx
export default function Home() { return <div className="article"><h1>Home</h1></div>; }
```

```jsx
// src/pages/SeasonOverview.jsx
export default function SeasonOverview() { return <div className="article"><h1>Season Overview</h1></div>; }
```

```jsx
// src/pages/CastList.jsx
export default function CastList() { return <div className="article"><h1>Cast</h1></div>; }
```

```jsx
// src/pages/PlayerPage.jsx
export default function PlayerPage() { return <div className="article"><h1>Player</h1></div>; }
```

```jsx
// src/pages/VotingHistory.jsx
export default function VotingHistory() { return <div className="article"><h1>Voting History</h1></div>; }
```

```jsx
// src/pages/Challenges.jsx
export default function Challenges() { return <div className="article"><h1>Challenges</h1></div>; }
```

**Step 4: Verify in browser**

- `http://localhost:5173/survivor/` → shows sidebar + "Home" heading
- Sidebar shows season links
- Clicking a season link navigates to `/survivor/season/s1`

**Step 5: Commit**

```bash
git add src/App.jsx src/main.jsx src/pages/
git commit -m "feat: wire up React Router with all routes and stub pages"
```

---

## Task 10: Implement `Home` page

**Files:**
- Modify: `src/pages/Home.jsx`

**Step 1: Replace stub with full implementation**

```jsx
// src/pages/Home.jsx
import { Link } from 'react-router-dom';
import { SEASONS } from '../data';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Home() {
  return (
    <div className="article">
      <Breadcrumbs crumbs={[{ label: 'Main Page' }]} />

      <div className="home-hero">
        <h1>Backyard Survivor Wiki</h1>
        <p>
          The definitive source for every season, castaway, and tribal council
          of Backyard Survivor.
        </p>
      </div>

      <h2>Seasons</h2>
      <table className="season-table">
        <thead>
          <tr>
            <th>Season</th>
            <th>Subtitle</th>
            <th>Location</th>
            <th>Players</th>
            <th>Episodes</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {SEASONS.map((s) => {
            const comingSoon = s.cast.length === 0;
            const winner = s.cast.find((p) => p.pid === s.winnerPid);
            return (
              <tr key={s.sid}>
                <td>
                  {comingSoon ? (
                    <span>{s.name}</span>
                  ) : (
                    <Link to={`/season/${s.sid}`}>{s.name}</Link>
                  )}
                </td>
                <td>{s.subtitle}</td>
                <td>{s.location}</td>
                <td>{comingSoon ? '—' : s.cast.length}</td>
                <td>{comingSoon ? '—' : s.episodes.length}</td>
                <td>
                  {comingSoon ? (
                    <span className="coming-soon-badge">Coming Soon</span>
                  ) : winner ? (
                    <Link to={`/season/${s.sid}/cast/${winner.name.toLowerCase().replace(/\s+/g, '-')}`}>
                      {winner.name}
                    </Link>
                  ) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

**Step 2: Verify in browser**

- `http://localhost:5173/survivor/` shows a season table with Season 1, Season 2 linked, Season 3 "Coming Soon"
- Clicking Season 1 navigates to `/survivor/season/s1`

**Step 3: Commit**

```bash
git add src/pages/Home.jsx
git commit -m "feat: implement Home page with seasons table"
```

---

## Task 11: Implement `SeasonOverview` page

**Files:**
- Modify: `src/pages/SeasonOverview.jsx`

**Step 1: Replace stub**

```jsx
// src/pages/SeasonOverview.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerName, getTribeColor, getTribeName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';
import Avatar from '../components/Avatar';

export default function SeasonOverview() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);
  const winner = season.cast.find((p) => p.pid === season.winnerPid);
  const runnerUp = season.cast.find((p) => p.pid === season.runnerUpPid);
  const fanFav = season.cast.find((p) => p.pid === season.fanFavoritePid);

  const infoRows = [
    { label: 'Season', value: season.name },
    { label: 'Subtitle', value: season.subtitle },
    { label: 'Location', value: season.location },
    { label: 'Filmed', value: season.filmingDates },
    { label: 'Episodes', value: season.episodes.length },
    { label: 'Days', value: season.days ?? 'TBD' },
    { label: 'Players', value: season.cast.length },
    { label: 'Winner', value: winner ? <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link> : '—' },
    { label: 'Runner-Up', value: runnerUp ? <Link to={`/season/${sid}/cast/${slugify(runnerUp.name)}`}>{runnerUp.name}</Link> : '—' },
    ...(fanFav ? [{ label: 'Fan Favorite', value: <Link to={`/season/${sid}/cast/${slugify(fanFav.name)}`}>{fanFav.name}</Link> }] : []),
  ];

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name },
      ]} />

      <h1>{season.name}: {season.subtitle}</h1>

      <div className="clearfix">
        <Infobox
          title={season.name}
          headerColor="#8b0000"
          rows={infoRows}
        />

        <div className="overview-meta">
          <span>📍 {season.location}</span>
          <span>📅 {season.filmingDates}</span>
          <span>🎬 {season.episodes.length} episodes</span>
          <span>☀️ {season.days ?? 'TBD'} days</span>
        </div>

        <p>
          <strong>{season.name}: {season.subtitle}</strong> is a season of Backyard Survivor
          filmed at {season.location} during {season.filmingDates}.
          {winner && <> The season was won by <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>.</>}
        </p>
      </div>

      <h2>Elimination Order</h2>
      <table className="elim-table">
        <thead>
          <tr>
            <th>Place</th>
            <th>Player</th>
            <th>Tribe</th>
            <th>Days</th>
            <th>Votes Against</th>
            <th>Jury</th>
          </tr>
        </thead>
        <tbody>
          {sorted.map((p) => (
            <tr key={p.pid} className={p.pid === season.winnerPid ? 'winner-row' : ''}>
              <td>{ordinal(p.placement)}</td>
              <td>
                <Link to={`/season/${sid}/cast/${slugify(p.name)}`} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={26} />
                  {p.name}
                  {p.pid === season.winnerPid && <span style={{ marginLeft: 6, color: 'var(--accent)', fontSize: '0.8rem' }}>★ Sole Survivor</span>}
                </Link>
              </td>
              <td>
                <span className="tribe-badge" style={{ background: getTribeColor(season, p.tid) }}>
                  {getTribeName(season, p.tid)}
                </span>
              </td>
              <td>{p.daysLasted}</td>
              <td>{p.votesAgainst}</td>
              <td>{p.juryMember ? '✓' : ''}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Tribes</h2>
      {season.tribes.map((tribe) => {
        const members = season.cast.filter((p) => p.tid === tribe.tid);
        return (
          <div key={tribe.tid} className="tribe-block">
            <h3 style={{ color: tribe.color }}>{tribe.name}</h3>
            <div className="tribe-members-list">
              {members.map((m) => (
                <Link key={m.pid} to={`/season/${sid}/cast/${slugify(m.name)}`} className="tribe-member-chip">
                  <Avatar name={m.name} color={tribe.color} size={26} />
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}
```

**Step 2: Verify**

- Navigate to `/survivor/season/s1` — see infobox floating right, elimination table, tribes section with clickable player chips

**Step 3: Commit**

```bash
git add src/pages/SeasonOverview.jsx
git commit -m "feat: implement SeasonOverview page with infobox and elimination table"
```

---

## Task 12: Implement `CastList` page

**Files:**
- Modify: `src/pages/CastList.jsx`

**Step 1: Replace stub**

```jsx
// src/pages/CastList.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getTribeColor, getTribeName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Avatar from '../components/Avatar';

export default function CastList() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const sorted = [...season.cast].sort((a, b) => a.placement - b.placement);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Cast' },
      ]} />

      <h1>Cast — {season.name}: {season.subtitle}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20 }}>
        {season.cast.length} castaways competed in {season.name}.
      </p>

      <div className="cast-grid">
        {sorted.map((p) => (
          <Link key={p.pid} to={`/season/${sid}/cast/${slugify(p.name)}`} className="cast-card">
            <Avatar name={p.name} color={getTribeColor(season, p.tid)} size={52} />
            <h3>{p.name}</h3>
            <span className="tribe-badge" style={{ background: getTribeColor(season, p.tid) }}>
              {getTribeName(season, p.tid)}
            </span>
            <span className="placement">{ordinal(p.placement)} place</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
```

**Step 2: Verify**

- `/survivor/season/s1/cast` → grid of player cards, each links to player page

**Step 3: Commit**

```bash
git add src/pages/CastList.jsx
git commit -m "feat: implement CastList page"
```

---

## Task 13: Implement `PlayerPage`

**Files:**
- Modify: `src/pages/PlayerPage.jsx`

**Step 1: Replace stub**

```jsx
// src/pages/PlayerPage.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerBySlug, getTribeColor, getTribeName, getPlayerName, ordinal, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';
import Infobox from '../components/Infobox';

export default function PlayerPage() {
  const { sid, slug } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  const player = getPlayerBySlug(season, slug);
  if (!player) return <div className="article"><p>Player not found.</p></div>;

  const tribeColor = getTribeColor(season, player.tid);
  const tribeName = getTribeName(season, player.tid);

  const infoRows = [
    { label: 'Season', value: <Link to={`/season/${sid}`}>{season.name}</Link> },
    { label: 'Tribe', value: <span className="tribe-badge" style={{ background: tribeColor }}>{tribeName}</span> },
    { label: 'Placement', value: ordinal(player.placement) + (player.pid === season.winnerPid ? ' ★ Sole Survivor' : '') },
    { label: 'Age', value: player.age },
    { label: 'Hometown', value: player.hometown },
    { label: 'Days Lasted', value: player.daysLasted },
    { label: 'Challenge Wins', value: player.challengeWins },
    { label: 'Votes Against', value: player.votesAgainst },
    { label: 'Jury Member', value: player.juryMember ? 'Yes' : 'No' },
  ];

  // Votes this player cast
  const votesCast = season.votingHistory.flatMap((tc) =>
    tc.votes
      .filter((v) => v.voterPid === player.pid)
      .map((v) => ({ episode: tc.episode, target: getPlayerName(season, v.votedForPid), tcid: tc.tcid }))
  );

  // Votes cast against this player
  const votesReceived = season.votingHistory.flatMap((tc) =>
    tc.votes
      .filter((v) => v.votedForPid === player.pid)
      .map((v) => ({ episode: tc.episode, voter: getPlayerName(season, v.voterPid), tcid: tc.tcid }))
  );

  // Challenges this player won
  const challengeWins = season.challenges.filter((c) => c.winnerPid === player.pid);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Cast', to: `/season/${sid}/cast` },
        { label: player.name },
      ]} />

      <h1>{player.name}</h1>

      <div className="player-article clearfix">
        <Infobox title={player.name} headerColor={tribeColor} rows={infoRows} />

        <p className="player-bio">{player.bio}</p>

        <p>
          <strong>{player.name}</strong> competed in{' '}
          <Link to={`/season/${sid}`}>{season.name}</Link> as a member of the{' '}
          <span className="tribe-badge" style={{ background: tribeColor }}>{tribeName}</span> tribe.
          {player.pid === season.winnerPid && <> They won the season as the Sole Survivor.</>}
          {player.pid === season.fanFavoritePid && <> They were voted Fan Favorite by viewers.</>}
        </p>
      </div>

      {votesCast.length > 0 && (
        <>
          <h2>Votes Cast</h2>
          <table className="player-vote-grid">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Voted For</th>
              </tr>
            </thead>
            <tbody>
              {votesCast.map((v, i) => (
                <tr key={i}>
                  <td>Episode {v.episode}</td>
                  <td>{v.target}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {votesReceived.length > 0 && (
        <>
          <h2>Votes Received</h2>
          <table className="player-vote-grid">
            <thead>
              <tr>
                <th>Episode</th>
                <th>From</th>
              </tr>
            </thead>
            <tbody>
              {votesReceived.map((v, i) => (
                <tr key={i}>
                  <td>Episode {v.episode}</td>
                  <td>{v.voter}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}

      {challengeWins.length > 0 && (
        <>
          <h2>Individual Challenge Wins</h2>
          <table className="player-vote-grid">
            <thead>
              <tr>
                <th>Episode</th>
                <th>Challenge</th>
                <th>Type</th>
              </tr>
            </thead>
            <tbody>
              {challengeWins.map((c) => (
                <tr key={c.cid}>
                  <td>Episode {c.episode}</td>
                  <td>{c.name}</td>
                  <td>{c.type}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
}
```

**Step 2: Verify**

- `/survivor/season/s1/cast/player-1` → see infobox, bio, votes cast/received tables

**Step 3: Commit**

```bash
git add src/pages/PlayerPage.jsx
git commit -m "feat: implement PlayerPage with infobox and vote tables"
```

---

## Task 14: Implement `VotingHistory` page (Fandom-style grid)

**Files:**
- Modify: `src/pages/VotingHistory.jsx`

**Step 1: Replace stub**

The Fandom-style voting grid: rows = tribal councils, columns = all players ordered by placement (worst → best, so column order goes left = first boot). Each cell shows who that column's player voted for in that tribal. Players who didn't attend show "—".

```jsx
// src/pages/VotingHistory.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerName, getTribeColor, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function VotingHistory() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  if (season.votingHistory.length === 0) {
    return (
      <div className="article">
        <Breadcrumbs crumbs={[
          { label: 'Main Page', to: '/' },
          { label: season.name, to: `/season/${sid}` },
          { label: 'Voting History' },
        ]} />
        <h1>Voting History — {season.name}</h1>
        <p className="empty-state">No voting data yet.</p>
      </div>
    );
  }

  // Players ordered worst placement to best (left = first boot, right = winner)
  const columns = [...season.cast].sort((a, b) => b.placement - a.placement);

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Voting History' },
      ]} />

      <h1>Voting History — {season.name}</h1>
      <p style={{ color: 'var(--text-muted)', marginBottom: 20, fontSize: '0.88rem' }}>
        Each column represents a player. Each row represents a tribal council.
        The cell shows who that player voted for.
      </p>

      <div className="voting-grid-wrapper">
        <table className="voting-grid">
          <thead>
            <tr>
              <th style={{ textAlign: 'left' }}>Episode</th>
              <th style={{ textAlign: 'left' }}>Tribal</th>
              {columns.map((p) => (
                <th key={p.pid} className="player-header">
                  <Link
                    to={`/season/${sid}/cast/${slugify(p.name)}`}
                    style={{ color: getTribeColor(season, p.tid), textDecoration: 'none', fontSize: '0.75rem' }}
                  >
                    {p.name}
                  </Link>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {season.votingHistory.map((tc) => {
              // Build lookup: voterPid → votedForPid for this TC
              const voteMap = {};
              tc.votes.forEach((v) => { voteMap[v.voterPid] = v.votedForPid; });

              // Players who voted in this TC
              const voterPids = new Set(tc.votes.map((v) => v.voterPid));

              return (
                <tr key={tc.tcid}>
                  <td className="ep-label">Ep. {tc.episode}</td>
                  <td className="ep-label" style={{ color: 'var(--text-muted)', fontSize: '0.78rem' }}>
                    {tc.notes || (tc.tid ? season.tribes.find(t => t.tid === tc.tid)?.name : 'Merge')}
                  </td>
                  {columns.map((p) => {
                    const didVote = voterPids.has(p.pid);
                    const votedForPid = voteMap[p.pid];
                    const isEliminated = tc.eliminatedPid === p.pid;
                    const votedForName = votedForPid ? getPlayerName(season, votedForPid) : null;

                    return (
                      <td
                        key={p.pid}
                        className={
                          isEliminated ? 'cell-eliminated' :
                          !didVote ? 'cell-absent' : ''
                        }
                        title={isEliminated ? `${p.name} was eliminated this episode` : ''}
                      >
                        {isEliminated ? '🔦' : didVote ? (votedForName || '?') : '—'}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: 16, fontSize: '0.8rem', color: 'var(--text-muted)' }}>
        🔦 = eliminated at this tribal council &nbsp;|&nbsp; — = did not attend
      </p>
    </div>
  );
}
```

**Step 2: Verify**

- `/survivor/season/s1/voting` → shows a wide grid with player names as column headers, tribal councils as rows, vote targets in cells

**Step 3: Commit**

```bash
git add src/pages/VotingHistory.jsx
git commit -m "feat: implement VotingHistory page with Fandom-style grid"
```

---

## Task 15: Implement `Challenges` page

**Files:**
- Modify: `src/pages/Challenges.jsx`

**Step 1: Replace stub**

```jsx
// src/pages/Challenges.jsx
import { useParams, Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { getPlayerName, getTribeName, slugify } from '../utils/helpers';
import Breadcrumbs from '../components/Breadcrumbs';

export default function Challenges() {
  const { sid } = useParams();
  const season = SEASONS.find((s) => s.sid === sid);
  if (!season) return <div className="article"><p>Season not found.</p></div>;

  if (season.challenges.length === 0) {
    return (
      <div className="article">
        <Breadcrumbs crumbs={[
          { label: 'Main Page', to: '/' },
          { label: season.name, to: `/season/${sid}` },
          { label: 'Challenges' },
        ]} />
        <h1>Challenges — {season.name}</h1>
        <p className="empty-state">No challenge data yet.</p>
      </div>
    );
  }

  return (
    <div className="article">
      <Breadcrumbs crumbs={[
        { label: 'Main Page', to: '/' },
        { label: season.name, to: `/season/${sid}` },
        { label: 'Challenges' },
      ]} />

      <h1>Challenges — {season.name}</h1>

      <table className="challenge-table">
        <thead>
          <tr>
            <th>Episode</th>
            <th>Type</th>
            <th>Name</th>
            <th>Description</th>
            <th>Winner</th>
          </tr>
        </thead>
        <tbody>
          {season.challenges.map((c) => {
            const winnerDisplay = c.winnerPid ? (
              <Link to={`/season/${sid}/cast/${slugify(getPlayerName(season, c.winnerPid))}`}>
                {getPlayerName(season, c.winnerPid)}
              </Link>
            ) : c.winnerTid ? (
              getTribeName(season, c.winnerTid)
            ) : (
              'TBD'
            );
            return (
              <tr key={c.cid}>
                <td>Ep. {c.episode}</td>
                <td>
                  <span className={c.type === 'Immunity' ? 'challenge-type-immunity' : 'challenge-type-reward'}>
                    {c.type === 'Immunity' ? '🛡️ ' : '🎁 '}{c.type}
                  </span>
                </td>
                <td style={{ fontWeight: 500 }}>{c.name}</td>
                <td style={{ color: 'var(--text-muted)' }}>{c.description}</td>
                <td>{winnerDisplay}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
```

**Step 2: Verify**

- `/survivor/season/s1/challenges` → table with all challenges, individual winners linked to player pages

**Step 3: Commit**

```bash
git add src/pages/Challenges.jsx
git commit -m "feat: implement Challenges page"
```

---

## Task 16: Final verification and cleanup

**Step 1: Test all routes manually**

Visit each of these URLs in the browser and confirm they render correctly:
- `http://localhost:5173/survivor/` — home with seasons table
- `http://localhost:5173/survivor/season/s1` — season overview with infobox
- `http://localhost:5173/survivor/season/s1/cast` — cast grid
- `http://localhost:5173/survivor/season/s1/cast/player-1` — player page with infobox + vote tables
- `http://localhost:5173/survivor/season/s1/voting` — fandom-style voting grid
- `http://localhost:5173/survivor/season/s1/challenges` — challenges table
- `http://localhost:5173/survivor/season/s2` — season 2 (partial data)
- `http://localhost:5173/survivor/season/s3` — season 3 (coming soon)

**Step 2: Check sidebar sub-nav**

- When on any `/season/s1/*` route, the sidebar should show sub-links for Overview, Cast, Voting History, Challenges indented under Season 1
- Active link should be highlighted in amber

**Step 3: Check breadcrumbs**

Verify breadcrumbs are correct on every page with clickable parent links.

**Step 4: Delete the old `src/App.jsx` Avatar/helper code if it wasn't already removed**

The old `App.jsx` had inline `Avatar`, `ordinal`, `getPlayer`, etc. These are now in `src/components/Avatar.jsx` and `src/utils/helpers.js`. The new `App.jsx` only has route definitions.

**Step 5: Final commit**

```bash
git add -A
git commit -m "feat: complete Fandom-style wiki redesign with React Router deep routing"
```
