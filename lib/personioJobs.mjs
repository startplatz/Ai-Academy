/* ─────────────────────────────────────────────
   PERSONIO JOBS — Datenquelle für /karriere

   Personio liefert auf seinen Job-Seiten selbst KEIN JobPosting-Schema,
   und ein iframe ist für Google ohnehin nicht indexierbar. Damit unsere
   Stellen als Job-Angebote in der Suche landen, spiegeln wir sie auf
   eigene, server-gerenderte Detailseiten unter /karriere/<slug> mit
   JobPosting-JSON-LD.

   Zwei Quellen:
   - `${JOB_BOARD_URL}/search.json` → Liste + Metadaten (stabile JSON-API)
   - `${JOB_BOARD_URL}/job/<id>`    → Beschreibungsblöcke, Datum, Adressen

   Fällt der Abruf aus, greift der eingecheckte Snapshot
   (`lib/jobsSnapshot.mjs`, aktualisierbar via `npm run sync:jobs`).
   ───────────────────────────────────────────── */

import { jobsSnapshot } from './jobsSnapshot.mjs';

export const JOB_BOARD_URL = 'https://ai-academy.jobs.personio.com';
export const SITE_URL = 'https://startplatz-ai-academy.de';

const REVALIDATE_SECONDS = 3600;

const HIRING_ORGANIZATION = {
  '@type': 'Organization',
  name: 'STARTPLATZ AI Academy',
  sameAs: SITE_URL,
  logo: 'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/png/logo-full-color-on-light-800w.png',
};

/* Fallback, falls Personio die Adressblöcke nicht mitliefert */
const OFFICE_FALLBACK = {
  Köln: {
    street: 'Im Mediapark 5',
    city: 'Köln',
    state: 'Nordrhein-Westfalen',
    zip_code: '50670',
    country: 'DE',
  },
  Düsseldorf: {
    street: 'Speditionstraße 15a',
    city: 'Düsseldorf',
    state: 'Nordrhein-Westfalen',
    zip_code: '40221',
    country: 'DE',
  },
};

/* Personio-Slug → schema.org employmentType (nur Google-erlaubte Werte) */
const EMPLOYMENT_TYPE_MAP = {
  permanent: ['FULL_TIME'],
  intern: ['INTERN'],
  internship: ['INTERN'],
  trainee: ['FULL_TIME', 'TEMPORARY'],
  working_student: ['PART_TIME', 'INTERN'],
  freelance: ['CONTRACTOR'],
  temporary: ['TEMPORARY'],
  fixed_term: ['TEMPORARY'],
};

const ALLOWED_TAGS = new Set([
  'p',
  'br',
  'ul',
  'ol',
  'li',
  'strong',
  'b',
  'em',
  'i',
  'u',
  'a',
  'blockquote',
  'h3',
  'h4',
]);

/* h1/h2 sind auf der Seite selbst belegt — Fließtext-Überschriften tiefer */
const TAG_REWRITE = { h1: 'h3', h2: 'h3', h5: 'h4', h6: 'h4' };

const UMLAUT_MAP = { ä: 'ae', ö: 'oe', ü: 'ue', ß: 'ss', é: 'e', è: 'e', ç: 'c' };

export function slugifyJobTitle(name) {
  return String(name)
    .toLowerCase()
    .replace(/[äöüßéèç]/g, (char) => UMLAUT_MAP[char] || char)
    .replace(/\(m\/w\/d\)|\(w\/m\/d\)|\(m\/f\/d\)/g, ' ')
    .replace(/&/g, ' und ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80)
    .replace(/-+$/g, '');
}

function decodeEntities(value) {
  return String(value)
    .replace(/&nbsp;/g, ' ')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#(\d+);/g, (_, code) => String.fromCharCode(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCharCode(parseInt(code, 16)))
    .replace(/&amp;/g, '&');
}

/* Personio-Rich-Text bringt Inline-Styles aus Copy-Paste mit (Slack-Fonts,
   feste Farben, Pixelgrößen). Die würden unser Brand-System überschreiben. */
export function sanitizeRichText(html) {
  if (!html) return '';

  return String(html)
    .replace(/<(script|style)\b[\s\S]*?<\/\1>/gi, '')
    .replace(/<!--[\s\S]*?-->/g, '')
    .replace(/<\/?([a-zA-Z0-9]+)([^>]*)>/g, (match, rawTag, attrs) => {
      const tag = rawTag.toLowerCase();
      const mapped = TAG_REWRITE[tag] || tag;

      if (!ALLOWED_TAGS.has(mapped)) return '';
      if (match.startsWith('</')) return `</${mapped}>`;

      if (mapped === 'a') {
        const href = attrs.match(/href\s*=\s*"([^"]*)"/i)?.[1] || '';
        if (!/^(https?:|mailto:|tel:|\/)/i.test(href)) return '';
        return `<a href="${href}" rel="noopener noreferrer">`;
      }

      return `<${mapped}>`;
    })
    .replace(/(\s*<p>\s*<\/p>\s*)+/g, '')
    .trim();
}

export function richTextToPlain(html) {
  return decodeEntities(String(html).replace(/<[^>]+>/g, ' '))
    .replace(/\s+/g, ' ')
    .trim();
}

function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${cut.slice(0, lastSpace > 60 ? lastSpace : maxLength).trim()} …`;
}

/* Personio rendert die Beschreibung server-seitig. Die gehashten
   CSS-Module-Klassen wechseln bei jedem Personio-Deploy, die
   Custom-CSS-Hooks (`jb-description-item`, `detail-block-*`) sind stabil. */
function parseDescriptionSections(html) {
  const items = [
    ...html.matchAll(/<div class="[^"]*jb-description-item[^"]*">([\s\S]*?)<\/div><\/div>/g),
  ];

  return items
    .map((match) => {
      const segment = match[1];
      const heading = segment.match(/<h2 class="[^"]*detail-block-title[^"]*">([\s\S]*?)<\/h2>/)?.[1];
      const body = segment.match(/<div class="[^"]*detail-block-description[^"]*">([\s\S]*)$/)?.[1];

      return {
        heading: heading ? richTextToPlain(heading) : '',
        html: sanitizeRichText(body),
      };
    })
    .filter((section) => section.heading && section.html);
}

/* Die RSC-Flight-Payload enthält Felder, die die Listen-API nicht liefert. */
function parsePayloadFields(html) {
  const flat = html
    .replace(/\\\\"/g, '"')
    .replace(/\\"/g, '"')
    .replace(/\\u0026/g, '&')
    .replace(/\\u003c/g, '<')
    .replace(/\\u003e/g, '>');

  const read = (key) => flat.match(new RegExp(`"${key}":"([^"]*)"`))?.[1] || '';

  let addresses = [];
  const addressesRaw = flat.match(/"office_addresses":(\[[\s\S]*?\])/)?.[1];
  if (addressesRaw) {
    try {
      addresses = JSON.parse(addressesRaw);
    } catch {
      addresses = [];
    }
  }

  return {
    publishedAt: read('published_at') || read('created_at'),
    employmentTypeSlug: read('employment_type_slug'),
    scheduleSlug: read('schedule_slug'),
    senioritySlug: read('seniority_slug'),
    occupationCategory: read('occupation_category'),
    addresses,
  };
}

function officeAddresses(payloadAddresses, officeNames) {
  const fromPayload = (payloadAddresses || []).filter((address) => address && address.city);
  if (fromPayload.length) return fromPayload;

  return (officeNames || []).map((name) => OFFICE_FALLBACK[name]).filter(Boolean);
}

async function fetchJson(url) {
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  return response.json();
}

async function fetchText(url) {
  const response = await fetch(url, { next: { revalidate: REVALIDATE_SECONDS } });
  if (!response.ok) throw new Error(`${url} → HTTP ${response.status}`);
  return response.text();
}

function assignSlugs(jobs) {
  const seen = new Map();

  return jobs.map((job) => {
    const base = slugifyJobTitle(job.title) || `stelle-${job.id}`;
    const count = seen.get(base) || 0;
    seen.set(base, count + 1);

    return { ...job, slug: count === 0 ? base : `${base}-${job.id}` };
  });
}

/* Roh-Abruf ohne Fallback — wird auch vom Sync-Skript genutzt. */
export async function fetchPersonioJobs() {
  const list = await fetchJson(`${JOB_BOARD_URL}/search.json`);

  const jobs = await Promise.all(
    list.map(async (entry) => {
      const id = String(entry.id);
      const detailHtml = await fetchText(`${JOB_BOARD_URL}/job/${id}`);
      const payload = parsePayloadFields(detailHtml);
      const sections = parseDescriptionSections(detailHtml);

      if (!sections.length) {
        throw new Error(`Keine Beschreibung für Stelle ${id} (${entry.name}) gefunden`);
      }

      const offices =
        Array.isArray(entry.offices) && entry.offices.length
          ? entry.offices
          : String(entry.office || '')
              .split(',')
              .map((part) => part.trim())
              .filter(Boolean);

      return {
        id,
        title: decodeEntities(entry.name).trim(),
        applyUrl: `${JOB_BOARD_URL}/job/${id}`,
        department: entry.department || '',
        employmentType: entry.employment_type || '',
        employmentTypeSlug: payload.employmentTypeSlug,
        schedule: entry.schedule || '',
        scheduleSlug: payload.scheduleSlug,
        seniority: entry.seniority || '',
        senioritySlug: payload.senioritySlug,
        occupationCategory: payload.occupationCategory,
        keywords: String(entry.keywords || '')
          .split(',')
          .map((keyword) => keyword.trim())
          .filter(Boolean),
        offices,
        addresses: officeAddresses(payload.addresses, offices),
        publishedAt: payload.publishedAt,
        sections,
      };
    })
  );

  jobs.sort((a, b) => String(b.publishedAt).localeCompare(String(a.publishedAt)));

  return assignSlugs(jobs);
}

export function snapshotJobs() {
  return assignSlugs(jobsSnapshot.jobs || []);
}

/* Live-Daten mit Snapshot-Fallback. Bewusst nicht throwing: /karriere darf
   nie am Job-Board scheitern. */
export async function getJobs() {
  try {
    const jobs = await fetchPersonioJobs();
    if (jobs.length) return jobs;
  } catch (error) {
    console.error('[personioJobs] Live-Abruf fehlgeschlagen, nutze Snapshot:', error.message);
  }

  return snapshotJobs();
}

export async function getJob(slug) {
  const jobs = await getJobs();
  return jobs.find((job) => job.slug === slug) || null;
}

export function jobEmploymentTypes(job) {
  const mapped = EMPLOYMENT_TYPE_MAP[job.employmentTypeSlug];

  if (mapped) {
    if (job.scheduleSlug === 'part-time' && mapped.includes('FULL_TIME')) {
      return mapped.map((type) => (type === 'FULL_TIME' ? 'PART_TIME' : type));
    }
    return mapped;
  }

  return job.scheduleSlug === 'part-time' ? ['PART_TIME'] : ['FULL_TIME'];
}

export function jobDescriptionHtml(job) {
  return job.sections.map((section) => `<h3>${section.heading}</h3>${section.html}`).join('');
}

export function jobExcerpt(job, maxLength = 155) {
  const intro = job.sections[0] ? richTextToPlain(job.sections[0].html) : '';
  const text = intro || `${job.title} bei der STARTPLATZ AI Academy.`;
  return truncate(text, maxLength);
}

export function jobLocationLabel(job) {
  return job.offices.length ? job.offices.join(' · ') : 'Köln';
}

export function jobDatePosted(job) {
  return job.publishedAt ? job.publishedAt.slice(0, 10) : '';
}

export function formatJobDate(job) {
  const raw = jobDatePosted(job);
  if (!raw) return '';

  const [year, month, day] = raw.split('-');
  return `${day}.${month}.${year}`;
}

/* Google Jobs: JobPosting muss auf der Detailseite mit der Beschreibung
   liegen, nicht auf der Übersicht. `validThrough` lassen wir bewusst weg —
   Personio-Stellen haben kein Ablaufdatum, und geschlossene Stellen
   verschwinden hier automatisch (404 + raus aus der Sitemap). */
export function jobPostingJsonLd(job) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'JobPosting',
    title: job.title,
    description: jobDescriptionHtml(job),
    identifier: {
      '@type': 'PropertyValue',
      name: 'STARTPLATZ AI Academy',
      value: job.id,
    },
    employmentType: jobEmploymentTypes(job),
    hiringOrganization: HIRING_ORGANIZATION,
    jobLocation: job.addresses.map((address) => ({
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        streetAddress: address.street || undefined,
        addressLocality: address.city,
        addressRegion: address.state || undefined,
        postalCode: address.zip_code || undefined,
        addressCountry: address.country || 'DE',
      },
    })),
    industry: 'KI-Weiterbildung, Erwachsenenbildung',
    url: `${SITE_URL}/karriere/${job.slug}`,
    directApply: false,
  };

  const datePosted = jobDatePosted(job);
  if (datePosted) jsonLd.datePosted = datePosted;
  if (job.department) jsonLd.occupationalCategory = job.department;

  return jsonLd;
}
