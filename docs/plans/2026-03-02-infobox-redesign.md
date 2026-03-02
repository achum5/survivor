# Infobox Redesign Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Redesign SeasonOverview infobox to match Fandom wiki layout — logo at top, tribe color swatches, cast photo section, and Season Chronology (prev/next) at the bottom of the infobox.

**Architecture:** Extend the existing generic `Infobox` component with three optional props (`logo`, `castPhoto`, `chronology`). Update `SeasonOverview` to pass these props and render tribe swatches. Remove standalone logo block and bottom season-nav from page body since they move into the infobox.

**Tech Stack:** React 18, Vite, React Router v7, plain CSS

---

### Task 1: Add castPhotoPath to data.js

**Files:**
- Modify: `src/data.js`

**Step 1: Add castPhotoPath: null to all three seasons**

In `src/data.js`, add `castPhotoPath: null` immediately after `logoPath` in each season object.

Season 1 (around line 31):
```js
logoPath: "/survivor/images/s1-logo.png",
castPhotoPath: null,
```

Season 2 (around line 276):
```js
logoPath: null,
castPhotoPath: null,
```

Season 3 (around line 387):
```js
logoPath: null,
castPhotoPath: null,
```

**Step 2: Verify build still passes**

Run: `npm run build`
Expected: `✓ built in X.XXs` with no errors

**Step 3: Commit**

```bash
git add src/data.js
git commit -m "feat: add castPhotoPath field to all seasons"
```

---

### Task 2: Extend Infobox.jsx with logo, castPhoto, chronology slots

**Files:**
- Modify: `src/components/Infobox.jsx`

**Step 1: Rewrite Infobox.jsx**

Replace entire file contents with:

```jsx
// src/components/Infobox.jsx
import { Link } from 'react-router-dom';

export default function Infobox({ title, headerColor = '#e74c3c', rows, logo, castPhoto, chronology }) {
  return (
    <table className="infobox">
      <thead>
        <tr>
          <th colSpan={2} className="infobox-header" style={{ background: headerColor }}>
            {title}
          </th>
        </tr>
      </thead>
      <tbody>
        {/* Logo */}
        {logo && (
          <tr>
            <td colSpan={2} className="infobox-logo-cell">
              <img src={logo} alt={`${title} logo`} className="infobox-logo-img" />
            </td>
          </tr>
        )}

        {/* Season Information sub-header */}
        {rows.length > 0 && (
          <tr>
            <td colSpan={2} className="infobox-section-header">Season Information</td>
          </tr>
        )}

        {/* Rows */}
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 0 ? 'infobox-row even' : 'infobox-row odd'}>
            <td className="infobox-label">{row.label}</td>
            <td className="infobox-value">{row.value}</td>
          </tr>
        ))}

        {/* Cast Photo */}
        {castPhoto && (
          <>
            <tr>
              <td colSpan={2} className="infobox-section-header">Cast</td>
            </tr>
            <tr>
              <td colSpan={2} className="infobox-cast-cell">
                <img src={castPhoto} alt={`${title} cast`} className="infobox-cast-img" />
              </td>
            </tr>
          </>
        )}

        {/* Season Chronology */}
        {chronology && (chronology.prev || chronology.next) && (
          <>
            <tr>
              <td colSpan={2} className="infobox-section-header">Season Chronology</td>
            </tr>
            <tr>
              <td colSpan={2} className="infobox-chronology-cell">
                <div className="infobox-chronology">
                  <div className="infobox-chron-prev">
                    {chronology.prev ? (
                      <>
                        <span className="infobox-chron-label">Previous</span>
                        <Link to={`/season/${chronology.prev.sid}`} className="infobox-chron-link">
                          {chronology.prev.name}
                        </Link>
                      </>
                    ) : <span />}
                  </div>
                  <div className="infobox-chron-next">
                    {chronology.next ? (
                      <>
                        <span className="infobox-chron-label">Next</span>
                        <Link to={`/season/${chronology.next.sid}`} className="infobox-chron-link">
                          {chronology.next.name}
                        </Link>
                      </>
                    ) : <span />}
                  </div>
                </div>
              </td>
            </tr>
          </>
        )}
      </tbody>
    </table>
  );
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: no errors

**Step 3: Commit**

```bash
git add src/components/Infobox.jsx
git commit -m "feat: extend Infobox with logo, castPhoto, and chronology slots"
```

---

### Task 3: Update SeasonOverview.jsx

**Files:**
- Modify: `src/pages/SeasonOverview.jsx`

**Step 1: Update infoRows to use tribe swatches**

In the `infoRows` array, change the Tribes entry. Add a `Tribes` row that renders colored swatches:

```jsx
const infoRows = [
  { label: 'Season',    value: season.number || season.name },
  { label: 'Location',  value: season.location },
  { label: 'Filmed',    value: season.filmingDates },
  { label: 'Players',   value: season.cast.length || '—' },
  { label: 'Winner',    value: winner   ? <Link to={`/season/${sid}/cast/${slugify(winner.name)}`}>{winner.name}</Link>   : '—' },
  { label: 'Runner-Up', value: runnerUp ? <Link to={`/season/${sid}/cast/${slugify(runnerUp.name)}`}>{runnerUp.name}</Link> : '—' },
  ...(fanFav ? [{ label: 'Fan Favorite', value: <Link to={`/season/${sid}/cast/${slugify(fanFav.name)}`}>{fanFav.name}</Link> }] : []),
  {
    label: 'Tribes',
    value: (
      <div className="infobox-tribe-swatches">
        {season.tribes.map((t) => (
          <span key={t.tid} className="infobox-tribe-swatch" style={{ background: t.color }} title={t.name} />
        ))}
      </div>
    ),
  },
];
```

**Step 2: Pass new props to Infobox**

Change the `<Infobox>` call to include the three new props:

```jsx
<Infobox
  title={season.name}
  headerColor={season.tribes[0]?.color || '#8b0000'}
  rows={infoRows}
  logo={season.logoPath}
  castPhoto={season.castPhotoPath}
  chronology={{ prev: prevSeason, next: nextSeason }}
/>
```

**Step 3: Remove the standalone logo block and bottom season-nav**

Remove this block (the standalone logo in the article body):
```jsx
{season.logoPath && (
  <div className="season-logo-header">
    <img src={season.logoPath} alt={`${season.name} logo`} />
  </div>
)}
```

Remove this block (the bottom season nav):
```jsx
<div className="season-nav">
  {prevSeason ? (
    <Link to={`/season/${prevSeason.sid}`} className="season-nav-btn">← {prevSeason.name}</Link>
  ) : <span />}
  {nextSeason && (
    <Link to={`/season/${nextSeason.sid}`} className="season-nav-btn">{nextSeason.name} →</Link>
  )}
</div>
```

**Step 4: Verify build**

Run: `npm run build`
Expected: no errors

**Step 5: Commit**

```bash
git add src/pages/SeasonOverview.jsx
git commit -m "feat: update SeasonOverview to use extended Infobox with logo, cast photo, and chronology"
```

---

### Task 4: Add CSS for new infobox elements

**Files:**
- Modify: `src/styles.css`

**Step 1: Add CSS after the existing `.tribe-badge` section**

Find the `/* ─── Tribe Badge ───` section and add the following new rules after the existing infobox CSS block. Search for `.infobox-header` to locate the right block, then append after the infobox section:

```css
/* ── Infobox Slots (logo / cast photo / chronology) ─────────── */
.infobox-logo-cell {
  text-align: center;
  padding: 12px 8px 8px;
  background: #111;
}

.infobox-logo-img {
  max-width: 100%;
  max-height: 140px;
  object-fit: contain;
  display: block;
  margin: 0 auto;
}

.infobox-section-header {
  background: var(--bg-card);
  color: var(--text-heading);
  font-weight: 700;
  font-size: 0.82rem;
  text-align: center;
  padding: 5px 8px;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
}

.infobox-cast-cell {
  padding: 0;
}

.infobox-cast-img {
  width: 100%;
  display: block;
  object-fit: cover;
}

.infobox-chronology-cell {
  padding: 0;
}

.infobox-chronology {
  display: flex;
}

.infobox-chron-prev,
.infobox-chron-next {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px;
  gap: 3px;
}

.infobox-chron-prev {
  border-right: 1px solid var(--border);
}

.infobox-chron-label {
  font-size: 0.7rem;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.infobox-chron-link {
  font-size: 0.82rem;
  color: var(--link);
  text-align: center;
  text-decoration: none;
}

.infobox-chron-link:hover {
  color: var(--link-hover);
}

/* ── Infobox Tribe Swatches ──────────────────────────────────── */
.infobox-tribe-swatches {
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
  align-items: center;
}

.infobox-tribe-swatch {
  display: inline-block;
  width: 20px;
  height: 20px;
  border-radius: 3px;
  border: 1px solid rgba(255,255,255,0.15);
}
```

**Step 2: Verify build**

Run: `npm run build`
Expected: no errors

**Step 3: Commit**

```bash
git add src/styles.css
git commit -m "feat: add CSS for infobox logo, cast photo, chronology, and tribe swatches"
```

---

### Task 5: Final verification

**Step 1: Run dev server and manually check**

Run: `npm run dev`

Navigate to `/survivor/season/s1` and verify:
- [ ] Logo appears inside the infobox at the top
- [ ] "Season Information" sub-header appears before rows
- [ ] Tribe swatches (colored squares) appear in Tribes row
- [ ] No cast photo shown (castPhotoPath is null) — cast section hidden
- [ ] "Season Chronology" section appears at bottom of infobox
- [ ] Season 1 shows no "Previous", only "Next → Season 2"
- [ ] Season 2 shows both "← Season 1" and "Season 3 →"
- [ ] Season 3 shows only "← Season 2", no "Next"
- [ ] No logo block in article body above article text
- [ ] No season-nav at bottom of page

**Step 2: Commit final state if any tweaks were made**

```bash
git add -p
git commit -m "fix: infobox redesign tweaks"
```
