/* ─────────────────────────────────────────────
   STARTPLATZ Events – live feed
   Source: HTML-Scrape of https://www.startplatz.de/events?tag=startplatz-ai-hub

   The STARTPLATZ site is Symfony-based (not WordPress), so there is no
   public REST API. The events page is server-rendered with a consistent
   card structure, which we parse with dependency-free regex.

   Strategy:
   1. Fetch the server-rendered HTML (ISR: 30 min).
   2. Split the document at the "Vergangene Events" heading so we only
      parse the upcoming-events section.
   3. Match each <a href="/event/..."> block and extract image / title /
      date / location / price via regex.
   4. Filter events whose start-date is in the future, sort, and trim.
   ───────────────────────────────────────────── */

const SOURCE_URL = 'https://www.startplatz.de/events?tag=startplatz-ai-hub';
const MONTHS_DE = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL', 'AUG', 'SEP', 'OKT', 'NOV', 'DEZ'];

/* ── Helpers ───────────────────────────────── */

function stripHtml(html) {
  if (!html) return '';
  return html
    .replace(/<[^>]*>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&quot;/g, '"')
    .replace(/&#039;|&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&ouml;/g, 'ö')
    .replace(/&auml;/g, 'ä')
    .replace(/&uuml;/g, 'ü')
    .replace(/&Ouml;/g, 'Ö')
    .replace(/&Auml;/g, 'Ä')
    .replace(/&Uuml;/g, 'Ü')
    .replace(/&szlig;/g, 'ß')
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(s, n = 140) {
  if (!s) return '';
  return s.length <= n ? s : `${s.slice(0, n - 1).trimEnd()}…`;
}

function formatDateBadge(d) {
  if (!(d instanceof Date) || Number.isNaN(d.getTime())) return '';
  return `${MONTHS_DE[d.getMonth()]} ${String(d.getDate()).padStart(2, '0')}`;
}

/**
 * Parse a German date string like "15.04.26" into a JS Date (local).
 * Returns null if invalid.
 */
function parseGermanDate(str, hhmm = '00:00') {
  const m = /(\d{2})\.(\d{2})\.(\d{2,4})/.exec(str || '');
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const month = parseInt(m[2], 10) - 1;
  let year = parseInt(m[3], 10);
  if (year < 100) year += 2000;
  const [h, mi] = (hhmm || '00:00').split(':').map((x) => parseInt(x, 10) || 0);
  const d = new Date(year, month, day, h, mi, 0, 0);
  return Number.isNaN(d.getTime()) ? null : d;
}

function absolutize(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `https://www.startplatz.de${url}`;
  return url;
}

/* ── Heuristic tag derivation ───────────────── */

function deriveTags({ title, priceText, location }) {
  const tags = [];
  const t = (title || '').toLowerCase();

  const price = (priceText || '').toLowerCase().trim();
  const isFree =
    !price ||
    price === 'kostenlos' ||
    price === 'free' ||
    price === '0' ||
    price === '0 €' ||
    price === '0€' ||
    price.startsWith('0,00');
  if (isFree) tags.push('Kostenlos');

  const typeMap = [
    ['bootcamp', 'Bootcamp'],
    ['hackathon', 'Hackathon'],
    ['masterclass', 'Masterclass'],
    ['webinar', 'Webinar'],
    ['workshop', 'Workshop'],
    ['meetup', 'Meetup'],
    ['ai friday', 'AI Friday'],
    ['ai builder friday', 'AI Friday'],
    ['openclaw', 'OpenClaw'],
    ['ki-manager', 'KI-Manager'],
    ['ki manager', 'KI-Manager'],
    ['mistral', 'Mistral'],
    ['claude', 'Claude'],
  ];
  for (const [needle, label] of typeMap) {
    if (tags.length >= 3) break;
    if (t.includes(needle) && !tags.includes(label)) tags.push(label);
  }

  if (tags.length < 3 && location) {
    const loc = location.toLowerCase();
    if (loc.includes('online') && !tags.includes('Online')) tags.push('Online');
    else if (loc.includes('köln') && !tags.includes('Köln')) tags.push('Köln');
    else if (loc.includes('düsseldorf') && !tags.includes('Düsseldorf')) tags.push('Düsseldorf');
  }

  return tags.slice(0, 3);
}

/* ── Core scraper ──────────────────────────── */

/**
 * Extract each event anchor and the price text that follows it,
 * within the "upcoming events" region of the page.
 */
function extractEventBlocks(html) {
  // Cut off everything from "Vergangene Events" onwards so past events
  // never leak through.
  const pastIdx = html.search(/Vergangene Events/i);
  const scope = pastIdx > 0 ? html.slice(0, pastIdx) : html;

  // Also cut off "News & beliebte Veranstaltungen" (same region marker).
  // Match both the raw "&" and the HTML-encoded "&amp;".
  const newsIdx = scope.search(/News\s*(?:&amp;|&)\s*beliebte\s*Veranstaltungen/i);
  const upcomingScope = newsIdx > 0 ? scope.slice(0, newsIdx) : scope;

  // Match anchors that link to /event/... – non-greedy, cross-line.
  // Group 1: full attributes (we re-extract href separately for safety).
  // Group 2: inner HTML of the anchor.
  const anchorRe = /<a\b([^>]*?href="[^"]*\/event\/[^"]*"[^>]*)>([\s\S]*?)<\/a>/gi;

  const blocks = [];
  let lastIndex = 0;
  let m;
  while ((m = anchorRe.exec(upcomingScope)) !== null) {
    const attrs = m[1];
    const inner = m[2];
    const hrefMatch = /href="([^"]+)"/i.exec(attrs);
    const href = hrefMatch ? hrefMatch[1] : '';
    if (!href.includes('/event/')) continue;

    // Peek at ~400 chars after the anchor close for a price token.
    const after = upcomingScope.slice(m.index + m[0].length, m.index + m[0].length + 400);
    blocks.push({ href, inner, after });
    lastIndex = anchorRe.lastIndex;
  }
  return blocks;
}

function parseBlock(block) {
  const { href, inner, after } = block;

  // Title – first <h5>
  const h5 = /<h5[^>]*>([\s\S]*?)<\/h5>/i.exec(inner);
  const title = stripHtml(h5 ? h5[1] : '');

  // Image – first <img src=...>
  const imgSrc = /<img[^>]*\bsrc="([^"]+)"/i.exec(inner);
  const image = imgSrc ? absolutize(imgSrc[1]) : null;

  // List items – pull out each <li>...</li> as plain text
  const liRe = /<li[^>]*>([\s\S]*?)<\/li>/gi;
  const listItems = [];
  let lm;
  while ((lm = liRe.exec(inner)) !== null) {
    const txt = stripHtml(lm[1]);
    if (txt) listItems.push(txt);
  }

  // Strategy: first <li> holds the date line ("Mi. 15.04.26 11:00 - 12:00"
  // or "Fr.29.05.26 16:30 - So.31.05.26 16:00 (Mehrtages-Event)").
  // The last <li> usually holds the location ("Köln", "Düsseldorf", "Online").
  const dateLine = listItems[0] || '';
  const locLine = listItems.length > 1 ? listItems[listItems.length - 1] : '';

  const dateMatch = /(\d{2}\.\d{2}\.\d{2,4})/.exec(dateLine);
  const timeMatch = /(\d{2}:\d{2})/.exec(dateLine);
  const startDate = parseGermanDate(dateMatch ? dateMatch[1] : '', timeMatch ? timeMatch[1] : '00:00');

  // Location – treat common venues; fallback to raw string
  let location = locLine;
  if (!location) {
    // Sometimes location lives in middle li (e.g. "Online")
    location = listItems.find((x) => /online|köln|düsseldorf|remote/i.test(x)) || '';
  }

  // Price – look for "Kostenlos" or "XX,XX €" in the text after the anchor
  const priceFree = /\bKostenlos\b/i.test(after);
  const priceMoney = /(\d{1,3}(?:\.\d{3})*(?:,\d{2})?\s*€)/.exec(after);
  const priceText = priceFree ? 'Kostenlos' : priceMoney ? priceMoney[1] : '';

  const tags = deriveTags({ title, priceText, location });

  return {
    id: href.replace(/[^a-z0-9]+/gi, '-').toLowerCase(),
    href: absolutize(href),
    title,
    image,
    startDate,
    dateLine,
    location,
    priceText,
    tags,
  };
}

/* ── Normalize to card shape used by EventsTimeline ── */

function toCard(ev, idx) {
  const description = ev.dateLine
    ? `${ev.dateLine}${ev.location ? ` · ${ev.location}` : ''}`
    : ev.location || '';
  return {
    id: ev.id,
    featured: idx === 0,
    date: formatDateBadge(ev.startDate),
    startDateIso: ev.startDate ? ev.startDate.toISOString() : null,
    title: ev.title || 'Event',
    tags: ev.tags,
    description: truncate(description, 140),
    location: ev.location || '',
    cta: ev.priceText && ev.priceText !== 'Kostenlos' ? `Ticket · ${ev.priceText}` : 'Anmelden',
    href: ev.href || '#',
    image: ev.image || null,
  };
}

/* ── Main fetcher ──────────────────────────── */

/**
 * Robust fetch of the events HTML.
 * - Realistic browser User-Agent + Accept-Language (the Symfony site
 *   sometimes refuses or stalls on unknown bot agents).
 * - Hard timeout via AbortController so a slow upstream never hangs the
 *   ISR render (the route would otherwise sit until the platform kills it
 *   and we silently fall back to stale content).
 * - One retry on transient failure.
 */
async function fetchEventsHtml({ timeoutMs = 8000, retries = 1 } = {}) {
  let lastErr;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), timeoutMs);
    try {
      const res = await fetch(SOURCE_URL, {
        signal: controller.signal,
        redirect: 'follow',
        headers: {
          Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
          'Accept-Language': 'de-DE,de;q=0.9,en;q=0.8',
          'User-Agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36',
        },
        // Revalidate at the Next Data Cache level every 30 minutes.
        next: { revalidate: 1800, tags: ['startplatz-events'] },
      });
      if (!res.ok) throw new Error(`STARTPLATZ events page responded ${res.status}`);
      return await res.text();
    } catch (err) {
      lastErr = err;
    } finally {
      clearTimeout(timer);
    }
  }
  throw lastErr || new Error('STARTPLATZ events fetch failed');
}

export async function fetchStartplatzEvents({ limit = 6 } = {}) {
  const html = await fetchEventsHtml();
  const blocks = extractEventBlocks(html);

  const now = new Date();
  // Allow events that started up to 2h ago (so a running event still shows today).
  const cutoff = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const parsed = blocks
    .map(parseBlock)
    .filter((ev) => ev.title && ev.startDate && ev.startDate >= cutoff)
    // Dedupe by href + startDate (the site sometimes lists a recurring
    // master + its current instance).
    .reduce((acc, ev) => {
      const key = `${ev.href}|${ev.startDate.toISOString().slice(0, 10)}`;
      if (!acc.seen.has(key)) {
        acc.seen.add(key);
        acc.list.push(ev);
      }
      return acc;
    }, { seen: new Set(), list: [] }).list;

  parsed.sort((a, b) => a.startDate - b.startDate);

  return parsed.slice(0, limit).map(toCard);
}

export { SOURCE_URL };
