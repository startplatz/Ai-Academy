#!/usr/bin/env node
/* ─────────────────────────────────────────────
   KI-News: fügt eine neue Tagesausgabe in
   lib/kiNews/feed.json ein.

   Aufruf:
     node scripts/ki-news-add-edition.mjs <pfad/zur/edition.json>

   - Validiert Pflichtfelder.
   - Dedupliziert nach `date` (gleiches Datum = überschreiben).
   - Sortiert neueste zuerst.
   - Setzt meta.updatedAt.
   - Schreibt sauberes UTF-8-JSON (deutsche „Anführungszeichen“ bleiben erhalten).
   ───────────────────────────────────────────── */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const FEED = path.join(__dirname, '..', 'lib', 'kiNews', 'feed.json');

function fail(msg) {
  console.error('✗ ' + msg);
  process.exit(1);
}

const editionPath = process.argv[2];
if (!editionPath) fail('Kein Pfad zur edition.json übergeben.');
if (!fs.existsSync(editionPath)) fail(`Datei nicht gefunden: ${editionPath}`);

let edition;
try {
  edition = JSON.parse(fs.readFileSync(editionPath, 'utf8'));
} catch (e) {
  fail(`edition.json ist kein gültiges JSON: ${e.message}`);
}

// Pflichtfelder prüfen
for (const key of ['date', 'dateLabel', 'stories']) {
  if (!edition[key]) fail(`Pflichtfeld fehlt in edition.json: "${key}"`);
}
if (!/^\d{4}-\d{2}-\d{2}$/.test(edition.date)) fail('date muss YYYY-MM-DD sein.');
if (!Array.isArray(edition.stories) || edition.stories.length === 0) {
  fail('stories muss eine nicht-leere Liste sein.');
}
for (const s of edition.stories) {
  if (!s.title || !s.summary) fail('Jede Story braucht mindestens title und summary.');
  if (!Array.isArray(s.labs) || s.labs.length === 0) {
    fail(`Story "${s.title || '?'}" braucht mindestens ein Lab in labs[] (für das Lab-Ranking).`);
  }
}

let feed;
try {
  feed = JSON.parse(fs.readFileSync(FEED, 'utf8'));
} catch (e) {
  fail(`feed.json ist kaputt: ${e.message}`);
}
if (!Array.isArray(feed.editions)) feed.editions = [];

// Dedup nach Datum, dann einsortieren (neueste zuerst)
feed.editions = feed.editions.filter((e) => e.date !== edition.date);
feed.editions.push(edition);
feed.editions.sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0));

feed.meta = feed.meta || {};
feed.meta.updatedAt = edition.date;

fs.writeFileSync(FEED, JSON.stringify(feed, null, 2) + '\n', 'utf8');
console.log(
  `✓ Ausgabe ${edition.date} eingefügt. Feed hat jetzt ${feed.editions.length} Ausgabe(n), ` +
    `${edition.stories.length} Stories in dieser Ausgabe.`
);
