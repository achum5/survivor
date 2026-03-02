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

export function getYouTubeEmbedUrl(url, endTime) {
  if (!url) return null;
  try {
    const u = new URL(url);
    let videoId, startSeconds;
    if (u.hostname === 'youtu.be') {
      videoId = u.pathname.slice(1);
      startSeconds = u.searchParams.get('t');
    } else {
      videoId = u.searchParams.get('v');
      startSeconds = u.searchParams.get('t');
    }
    if (!videoId) return null;
    const params = [];
    if (startSeconds) params.push(`start=${parseInt(startSeconds)}`);
    if (endTime)       params.push(`end=${parseInt(endTime)}`);
    let embed = `https://www.youtube.com/embed/${videoId}`;
    if (params.length) embed += `?${params.join('&')}`;
    return embed;
  } catch {
    return null;
  }
}
