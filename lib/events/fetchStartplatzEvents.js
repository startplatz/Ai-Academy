/* ─────────────────────────────────────────────
   STARTPLATZ Events – live feed
   Source: HTML-Scrape of https://www.startplatz.de/events?tag=startplatz-ai-hub

   The STARTPLATZ events page is server-rendered (Symfony). The page leads
   with an "events-hero" carousel of curated UPCOMING events, each as:

     <article class="slide" data-hero-slide>
       <div class="slide-bg"><img src="…cloudinary…"></div>
       <div class="slide-content">
         <span class="slide-tag">Webinar</span>
         <div class="slide-eyebrow">STARTPLATZ AI Hub</div>
         <h2 class="slide-title">…</h2>
         <p class="slide-hook">…</p>
         <div class="slide-meta">
           <span class="slide-meta-item">18.06.2026</span>
           <span class="slide-meta-item">12:00</span>
           <span class="slide-meta-item">Online</span>
           <span class="slide-meta-item">Eintritt frei</span>
         </div>
         <div class="slide-actions"><a href="/event/…">…</a></div>
       </div>
     </article>

   We parse those hero slides with dependency-free regex, filter to the
   future, sort and trim.
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

/** Parse a German date "18.06.2026" (+ "12:00") into a JS Date. */
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

function shortLocation(location) {
  const l = (location || '').toLowerCase();
  if (l.includes('online') || l.includes('livestream') || l.includes('remote')) return 'Online';
  if (l.includes('düsseldorf') || l.includes('duesseldorf')) return 'Düsseldorf';
  if (l.includes('köln') || l.includes('koeln') || l.includes('cologne')) return 'Köln';
  return '';
}

/* ── Core: parse the events-hero carousel slides ── */

function parseHeroSlides(html) {
  const sliderIdx = html.search(/data-hero-slider/i);
  if (sliderIdx === -1) return [];
  const sectionEnd = html.indexOf('</section>', sliderIdx);
  const scope = html.slice(sliderIdx, sectionEnd > 0 ? sectionEnd : sliderIdx + 80000);

  // Each hero slide is delimited by the data-hero-slide attribute.
  const parts = scope.split(/data-hero-slide/i).slice(1);
  const events = [];

  for (const part of parts) {
    const title = stripHtml((/class="slide-title"[^>]*>([\s\S]*?)<\//i.exec(part) || [])[1] || '');
    if (!title) continue;

    const href = (/href="(\/event\/[^"#]+)/i.exec(part) || [])[1] || '';
    const image = (/class="slide-bg"[\s\S]*?<img[^>]*\bsrc="([^"]+)"/i.exec(part)
      || /<img[^>]*\bsrc="(https:\/\/res\.cloudinary[^"]+)"/i.exec(part) || [])[1] || null;
    const tag = stripHtml((/class="slide-tag"[^>]*>([\s\S]*?)<\//i.exec(part) || [])[1] || '');
    const hook = stripHtml((/class="slide-hook"[^>]*>([\s\S]*?)<\//i.exec(part) || [])[1] || '');

    const metaRe = /class="slide-meta-item"[^>]*>([\s\S]*?)<\//gi;
    const meta = [];
    let mm;
    while ((mm = metaRe.exec(part)) !== null) {
      const t = stripHtml(mm[1]);
      if (t) meta.push(t);
    }

    const dateItem = meta.find((x) => /\d{2}\.\d{2}\.\d{4}/.test(x)) || '';
    const timeItem = meta.find((x) => /^\d{1,2}:\d{2}$/.test(x)) || '';
    const priceItem = meta.find((x) => /eintritt frei|kostenlos|€/i.test(x)) || '';
    const location = meta.find((x) => x !== dateItem && x !== timeItem && x !== priceItem) || '';

    const startDate = parseGermanDate(
      (/\d{2}\.\d{2}\.\d{4}/.exec(dateItem) || [])[0],
      (/(\d{1,2}:\d{2})/.exec(timeItem) || [])[1] || '00:00',
    );

    const isFree = /eintritt frei|kostenlos/i.test(priceItem);
    const priceMoney = (/(\d{1,3}(?:[.,]\d{2})?\s*€)/.exec(priceItem) || [])[1] || '';
    const priceText = isFree ? 'Kostenlos' : priceMoney;

    const tags = [];
    if (tag) tags.push(tag);
    if (isFree && !tags.includes('Kostenlos')) tags.push('Kostenlos');
    const loc = shortLocation(location);
    if (loc && !tags.includes(loc)) tags.push(loc);

    events.push({
      id: (href.replace(/[^a-z0-9]+/gi, '-').toLowerCase() || title.toLowerCase().replace(/\s+/g, '-')),
      href: absolutize(href),
      title,
      image: image ? absolutize(image) : null,
      startDate,
      dateLine: [dateItem, timeItem].filter(Boolean).join(' '),
      hook,
      location,
      priceText,
      tags: tags.slice(0, 3),
    });
  }

  return events;
}

/* ── Normalize to card shape used by EventsTimeline ── */

function toCard(ev, idx) {
  const fallbackLine = ev.dateLine
    ? `${ev.dateLine}${ev.location ? ` · ${ev.location}` : ''}`
    : ev.location || '';
  const description = ev.hook || fallbackLine;
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

export async function fetchStartplatzEvents({ limit = 6 } = {}) {
  const html = await fetchEventsHtml();
  const slides = parseHeroSlides(html);

  const now = new Date();
  // Allow events that started up to 2h ago (so a running event still shows today).
  const cutoff = new Date(now.getTime() - 2 * 60 * 60 * 1000);

  const parsed = slides
    .filter((ev) => ev.title && ev.startDate && ev.startDate >= cutoff)
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
