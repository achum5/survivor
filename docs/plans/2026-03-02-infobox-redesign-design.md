# Infobox Redesign Design
Date: 2026-03-02

## Goal
Redesign SeasonOverview infobox to match Fandom wiki layout: logo at top, tribe swatches, cast photo section, and Season Chronology (prev/next) at bottom of infobox.

## Approach: Option A — Extend Infobox with optional slots

### Infobox.jsx changes
Add three optional props:
- `logo` (string|null) — image path; renders full-width above rows with "Season Information" sub-header below
- `castPhoto` (string|null) — image path; renders in a "Cast" section between rows and chronology
- `chronology` ({ prev, next }|null) — each has `{ label, to }`; renders "Season Chronology" section at bottom

### SeasonOverview.jsx changes
- Pass `logo={season.logoPath}`, `castPhoto={season.castPhotoPath}`, `chronology={...}` to Infobox
- Remove standalone logo block from article body
- Remove bottom `season-nav` div (now lives inside infobox)
- Tribes infobox row: render colored pill swatches instead of plain text

### data.js changes
- Add `castPhotoPath: null` to all three seasons

### CSS additions (styles.css)
- `.infobox-logo` — full-width centered image, padding below
- `.infobox-section-header` — bold divider row spanning both columns
- `.infobox-cast-photo` — full-width centered image
- `.infobox-chronology` — two-column flex layout for prev/next links inside infobox

## Data shape
```js
// Season object additions
castPhotoPath: null, // e.g. "/survivor/images/s1-cast.jpg"

// Infobox props
<Infobox
  title={season.name}
  headerColor={...}
  logo={season.logoPath}
  castPhoto={season.castPhotoPath}
  chronology={{ prev: prevSeason, next: nextSeason }}
  rows={infoRows}
/>
```

## Out of scope
- Logo variant tabs (Updated/Original/Alternate) — not needed for our wiki
- No. of Days field — removed previously
