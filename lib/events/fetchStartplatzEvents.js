/* ─────────────────────────────────────────────
   STARTPLATZ Events – live feed
   Source: HTML-Scrape of https://www.startplatz.de/events?tag=startplatz-ai-hub

   The STARTPLATZ events page is server-rendered (Symfony). Below the
   "events-hero" carousel sits the full catalog ("Stöbere durch alle
   kommenden Events"). Each upcoming event there is one card:

     <div class="event-searchable" data-loc="online" data-free="1"
          data-week="tw" data-search="…">
       <div class="event-card" data-format="webinar" …>
         <div class="event-card-header">
           <img class="event-card-img" src="…cloudinary…" alt="…">
           <span class="event-card-badge">webinar</span>
         </div>
         <div class="event-card-body">
           <div class="event-card-date">18. Jun · Do · 12:00</div>
           <h4 class="event-card-title">…</h4>
           <p class="event-card-meta">Online · <strong>Kostenlos</strong>
              <br>Speaker</p>
           <a href="/event/…/2026-06-18?…#Anmeldung"
              class="event-card-cta">Anmelden</a>
         </div>
       </div>
     </div>

   We parse ALL of those catalog cards (dependency-free regex) so the
   homepage slider shows the complete upcoming line-up, not just the
   3 curated hero slides. The catalog is already ordered chronologically,
   so we preserve document order.
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

const MONTH_ABBR = {
  jan: 0, feb: 1, 'mär': 2, mar: 2, mrz: 2, apr: 3, mai: 4, jun: 5,
  jul: 6, aug: 7, sep: 8, okt: 9, oct: 9, nov: 10, dez: 11, dec: 11,
};

/** Fallback: parse "15. Dez · Di · 09:00" into a Date, inferring the year. */
function parseDisplayDate(dateText, h, mi) {
  if (!dateText) return null;
  // Skip ambiguous ranges like "20.–06. Apr" – not a single occurrence date.
  if (/\d+\.\s*[–-]\s*\d+\./.test(dateText)) return null;
  const m = /(\d{1,2})\.\s*([A-Za-zÄäÖöÜü]{3,4})/.exec(dateText);
  if (!m) return null;
  const day = parseInt(m[1], 10);
  const mon = MONTH_ABBR[m[2].toLowerCase().slice(0, 3)];
  if (mon == null || Number.isNaN(day)) return null;
  const now = new Date();
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);
  let d = new Date(now.getFullYear(), mon, day, h, mi, 0, 0);
  if (d < cutoff) d = new Date(now.getFullYear() + 1, mon, day, h, mi, 0, 0);
  return Number.isNaN(d.getTime()) ? null : d;
}

/**
 * Pull the real occurrence Date for an event.
 * Prefer a YYYY-MM-DD that sits on a path/slug boundary (the occurrence date,
 * e.g. ".../2026-06-18?" or "...-2026-06-18/"). Ignore dates buried mid-slug
 * such as "...-2026-05-14-1778791493/" (an internal id, not the date) and fall
 * back to the human-readable date text instead.
 */
function parseStartDate(href, dateText) {
  const t = /(\d{1,2}):(\d{2})/.exec(dateText || '');
  const h = t ? parseInt(t[1], 10) : 0;
  const mi = t ? parseInt(t[2], 10) : 0;
  const seg = /(\d{4})-(\d{2})-(\d{2})(?=[/?#]|$)/.exec(href || '');
  if (seg) {
    const d = new Date(parseInt(seg[1], 10), parseInt(seg[2], 10) - 1, parseInt(seg[3], 10), h, mi, 0, 0);
    if (!Number.isNaN(d.getTime())) return d;
  }
  return parseDisplayDate(dateText, h, mi);
}

function absolutize(url) {
  if (!url) return '';
  if (url.startsWith('http')) return url;
  if (url.startsWith('//')) return `https:${url}`;
  if (url.startsWith('/')) return `https://www.startplatz.de${url}`;
  return url;
}

function locationLabel(dataLoc, metaLoc) {
  const l = `${dataLoc || ''} ${metaLoc || ''}`.toLowerCase();
  if (l.includes('online') || l.includes('remote') || l.includes('livestream')) return 'Online';
  if (l.includes('duesseldorf') || l.includes('düsseldorf')) return 'Düsseldorf';
  if (l.includes('koeln') || l.includes('köln') || l.includes('cologne')) return 'Köln';
  return metaLoc || '';
}

/** "ai friday" -> "AI Friday", "webinar" -> "Webinar" */
function titleizeFormat(s) {
  const t = stripHtml(s);
  if (!t) return '';
  return t
    .split(/\s+/)
    .map((w) => (/^(ai|ki|geo)$/i.test(w) ? w.toUpperCase() : w.charAt(0).toUpperCase() + w.slice(1)))
    .join(' ');
}

/** Parse the "<loc> · <strong>price</strong> <br>speaker" meta block. */
function parseMeta(metaHtml) {
  const halves = (metaHtml || '').split(/<br\s*\/?>/i);
  const head = halves[0] || '';
  const speaker = stripHtml(halves.slice(1).join(' '));
  const price = stripHtml((/<strong>([\s\S]*?)<\/strong>/i.exec(head) || [])[1] || '');
  const locText = stripHtml(head.replace(/<strong>[\s\S]*?<\/strong>/i, '').replace(/·/g, ' '));
  return { speaker, price, locText };
}

/* ── Core: parse the full catalog cards ── */

function parseCatalogCards(html) {
  // Every upcoming catalog card carries class="event-searchable" (the hero
  // slides and the duplicated "Eventreihen"/"Weitere Events" cards do not),
  // so splitting on it yields exactly the unique upcoming events.
  const parts = html.split(/class="event-searchable"/i).slice(1);
  const events = [];

  for (const part of parts) {
    const title = stripHtml((/class="event-card-title"[^>]*>([\s\S]*?)<\/h4>/i.exec(part) || [])[1] || '');
    if (!title) continue;

    const dataLoc = (/\bdata-loc="([^"]*)"/i.exec(part) || [])[1] || '';
    const dataFree = (/\bdata-free="([^"]*)"/i.exec(part) || [])[1] || '';
    const dataFormat = (/\bdata-format="([^"]*)"/i.exec(part) || [])[1] || '';

    const image = (/class="event-card-img"[^>]*?\bsrc="([^"]+)"/i.exec(part) || [])[1] || null;
    const badge = stripHtml((/class="event-card-badge"[^>]*>([\s\S]*?)<\/span>/i.exec(part) || [])[1] || dataFormat);
    const dateText = stripHtml((/class="event-card-date"[^>]*>([\s\S]*?)<\/div>/i.exec(part) || [])[1] || '');
    const metaHtml = (/class="event-card-meta"[^>]*>([\s\S]*?)<\/p>/i.exec(part) || [])[1] || '';

    const href = (/href="(\/event\/[^"]*#Anmeldung)"/i.exec(part)
      || /href="(\/event\/[^"]+)"/i.exec(part) || [])[1] || '';

    const { speaker, price, locText } = parseMeta(metaHtml);
    const isFree = dataFree === '1' || /kostenlos|eintritt frei|gratis/i.test(price);
    const priceText = isFree ? 'Kostenlos' : price;
    const loc = locationLabel(dataLoc, locText);

    events.push({
      href,
      title,
      image,
      badge,
      speaker,
      startDate: parseStartDate(href, dateText),
      dateText,
      location: loc,
      priceText,
      isFree,
    });
  }

  return events;
}

/* ── Normalize to card shape used by EventsTimeline ── */

function toCard(ev, idx) {
  const tags = [];
  const fmt = titleizeFormat(ev.badge);
  if (fmt) tags.push(fmt);
  if (ev.isFree) tags.push('Kostenlos');
  if (ev.location && !tags.includes(ev.location)) tags.push(ev.location);

  return {
    id: (ev.href.replace(/[?#].*$/, '').replace(/[^a-z0-9]+/gi, '-').toLowerCase()
      || ev.title.toLowerCase().replace(/\s+/g, '-')),
    featured: idx === 0,
    date: formatDateBadge(ev.startDate),
    startDateIso: ev.startDate ? ev.startDate.toISOString() : null,
    title: ev.title || 'Event',
    tags: tags.slice(0, 3),
    description: truncate(ev.speaker || '', 120),
    location: ev.location || '',
    cta: ev.priceText && !ev.isFree ? `Ticket · ${ev.priceText}` : 'Anmelden',
    href: ev.href ? absolutize(ev.href) : 'https://www.startplatz.de/events?tag=startplatz-ai-hub',
    image: ev.image ? absolutize(ev.image) : null,
  };
}

/* ── Robust fetch ──────────────────────────── */

async function fetchEventsHtml({ timeoutMs = 9000, retries = 1 } = {}) {
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

/* ── Main fetcher ──────────────────────────── */

export async function fetchStartplatzEvents({ limit = 40 } = {}) {
  const html = await fetchEventsHtml();
  const cards = parseCatalogCards(html);

  const now = new Date();
  // Keep everything from the start of today onward (safety net; the source
  // catalog is already upcoming-only). Date-less rolling entries are kept.
  const cutoff = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0);

  const seen = new Set();
  const upcoming = [];
  for (const ev of cards) {
    if (ev.startDate && ev.startDate < cutoff) continue;
    const key = ev.href.replace(/#.*$/, '');
    if (seen.has(key)) continue;
    seen.add(key);
    upcoming.push(ev);
  }

  // Preserve the catalog's own chronological document order.
  return upcoming.slice(0, limit).map(toCard);
}

export { SOURCE_URL };
