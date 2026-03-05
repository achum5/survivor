// src/utils/linkify.jsx
// Shared utility to turn plain text into React nodes with auto-linked
// player names, tribe names, twist names, and episode references.

import { Link } from 'react-router-dom';
import { SEASONS } from '../data';
import { slugify } from './helpers';

// Build twist terms once (twist name -> slug)
function getTwistTerms() {
  const twists = new Map();
  SEASONS.forEach((season) => {
    if (!season.twists) return;
    season.twists.forEach((twist) => {
      const name = twist.split(' — ')[0].trim();
      const slug = slugify(name);
      if (!twists.has(name)) {
        twists.set(name, `/twist/${slug}`);
      }
    });
  });
  return twists;
}

const TWIST_TERMS = getTwistTerms();

/**
 * linkify(text, seasons)
 *
 * @param {string} text - plain text to linkify
 * @param {Array} seasons - array of { season, sid } objects for context
 *   For single-season pages, pass [{ season, sid }].
 *   For multi-season pages (twist pages), pass all relevant seasons.
 * @returns {Array} React nodes (strings and <Link> elements)
 */
export function linkify(text, seasons) {
  const terms = [];

  // Add player and tribe terms from each season
  seasons.forEach(({ season, sid }) => {
    season.cast.forEach((p) => {
      terms.push({ text: p.name, url: `/season/${sid}/cast/${slugify(p.name)}` });
    });
    season.tribes.forEach((t) => {
      terms.push({ text: t.name, url: `/season/${sid}/tribe/${t.tid}` });
    });
    if (season.mergeTribe) {
      terms.push({ text: season.mergeTribe.name, url: `/season/${sid}/tribe/${season.mergeTribe.tid}` });
    }
  });

  // Add twist terms
  TWIST_TERMS.forEach((url, name) => {
    terms.push({ text: name, url });
  });

  // Deduplicate — keep first occurrence (longest match wins after sort)
  const seen = new Set();
  const unique = [];
  // Sort longest first so "Sam R." matches before "Sam"
  terms.sort((a, b) => b.text.length - a.text.length);
  terms.forEach((t) => {
    if (!seen.has(t.text)) {
      seen.add(t.text);
      unique.push(t);
    }
  });

  const termMap = {};
  unique.forEach((t) => { termMap[t.text] = t.url; });

  const escaped = unique.map((t) => {
    const e = t.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const endB = /\w$/.test(t.text) ? '\\b' : '';
    return `\\b${e}${endB}`;
  });
  const pattern = escaped.join('|');
  if (!pattern) return [text];

  const regex = new RegExp(pattern, 'g');
  const parts = [];
  let lastIdx = 0;

  for (const m of text.matchAll(regex)) {
    if (m.index > lastIdx) parts.push(text.slice(lastIdx, m.index));
    const url = termMap[m[0]];
    parts.push(url ? <Link key={m.index} to={url}>{m[0]}</Link> : m[0]);
    lastIdx = m.index + m[0].length;
  }
  if (lastIdx < text.length) parts.push(text.slice(lastIdx));
  return parts;
}
