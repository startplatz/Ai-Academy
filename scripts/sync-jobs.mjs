/* ─────────────────────────────────────────────
   SYNC JOBS — schreibt lib/jobsSnapshot.mjs neu

   /karriere zieht die Stellen zur Laufzeit live von Personio (ISR, 1 h).
   Der Snapshot ist der Fallback für den Fall, dass Personio beim Build
   oder Revalidate nicht erreichbar ist oder das Markup ändert.

   Aufruf: npm run sync:jobs
   ───────────────────────────────────────────── */

import { writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

import { fetchPersonioJobs, JOB_BOARD_URL } from '../lib/personioJobs.mjs';

const projectRoot = dirname(dirname(fileURLToPath(import.meta.url)));
const target = join(projectRoot, 'lib', 'jobsSnapshot.mjs');

const jobs = await fetchPersonioJobs();

if (!jobs.length) {
  console.error('Keine Stellen von Personio erhalten — Snapshot bleibt unverändert.');
  process.exit(1);
}

/* slug wird beim Lesen aus dem Titel neu abgeleitet → nicht mitspeichern */
const payload = {
  source: JOB_BOARD_URL,
  syncedAt: new Date().toISOString(),
  jobs: jobs.map(({ slug, ...job }) => job),
};

const file = `/* AUTOMATISCH GENERIERT von scripts/sync-jobs.mjs — nicht manuell bearbeiten.
   Fallback-Daten für /karriere, falls Personio nicht erreichbar ist.
   Neu erzeugen mit: npm run sync:jobs */

export const jobsSnapshot = ${JSON.stringify(payload, null, 2)};
`;

writeFileSync(target, file, 'utf8');

console.log(`${jobs.length} Stellen in lib/jobsSnapshot.mjs geschrieben:`);
for (const job of jobs) {
  console.log(`  - ${job.slug}  (${job.title})`);
}
