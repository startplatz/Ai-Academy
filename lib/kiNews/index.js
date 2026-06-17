/* ─────────────────────────────────────────────
   KI-NEWS FEED — Loader + Stats
   Single source of truth: feed.json (täglich vom
   Task `daily-ki-news-brief` aktualisiert).
   Alle Helfer sind rein und server-tauglich.
   ───────────────────────────────────────────── */

import feed from './feed.json';

/* Markenfarben pro Lab/Akteur. Fallback = Primary Purple. */
export const LAB_COLORS = {
  OpenAI: '#10A37F',
  Google: '#5CB5F2',
  DeepMind: '#5CB5F2',
  Anthropic: '#FF9947',
  Meta: '#5B8DEF',
  Mistral: '#FF7000',
  'Aleph Alpha': '#7C3AED',
  xAI: '#0F0F0F',
  'EU / Regulierung': '#E11D48',
  'G7 / Politik': '#14B8A6',
  Microsoft: '#5CB5F2',
  Nvidia: '#14B8A6',
  'Hugging Face': '#FF9947',
};

const FALLBACK_COLOR = '#7C3AED';

export function labColor(lab) {
  return LAB_COLORS[lab] || FALLBACK_COLOR;
}

/* Editionen, neueste zuerst. */
export function getEditions() {
  const editions = Array.isArray(feed.editions) ? [...feed.editions] : [];
  return editions.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));
}

export function getFeedMeta() {
  return feed.meta || {};
}

/* Lab-Ranking: zählt, wie viele Stories jedes Lab über die
   gegebenen Editionen ausgelöst hat. Absteigend sortiert. */
export function getLabRanking(editions = getEditions(), limit = 8) {
  const counts = new Map();
  for (const ed of editions) {
    for (const story of ed.stories || []) {
      for (const lab of story.labs || []) {
        counts.set(lab, (counts.get(lab) || 0) + 1);
      }
    }
  }
  const ranking = [...counts.entries()]
    .map(([lab, count]) => ({ lab, count, color: labColor(lab) }))
    .sort((a, b) => b.count - a.count || a.lab.localeCompare(b.lab));

  const max = ranking.reduce((m, r) => Math.max(m, r.count), 0) || 1;
  return ranking.slice(0, limit).map((r) => ({ ...r, pct: Math.round((r.count / max) * 100) }));
}

/* News-Volumen je Edition (für die Sparkline), älteste→neueste. */
export function getVolumeSeries(editions = getEditions(), limit = 14) {
  const series = [...editions]
    .sort((a, b) => (a.date < b.date ? -1 : 1))
    .slice(-limit)
    .map((ed) => ({
      date: ed.date,
      label: ed.dateLabel || ed.date,
      count: (ed.stories || []).length,
    }));
  return series;
}

/* Kennzahlen-Kacheln. */
export function getKpis(editions = getEditions()) {
  const totalStories = editions.reduce((n, ed) => n + (ed.stories || []).length, 0);
  const latest = editions[0];
  const ranking = getLabRanking(editions, 1);
  const sourcesTracked = editions.reduce((n, ed) => n + (ed.sources || []).length, 0);
  return {
    editionsCount: editions.length,
    storiesLatest: latest ? (latest.stories || []).length : 0,
    totalStories,
    sourcesTracked,
    topLab: ranking[0] ? ranking[0].lab : '—',
    latestDateLabel: latest ? latest.dateLabel || latest.date : '',
    latestPeriod: latest ? latest.period || '' : '',
  };
}
