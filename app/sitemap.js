import { getJobs } from '../lib/personioJobs.mjs';

/* Stellen ändern sich häufiger als der Rest der Seite */
export const revalidate = 3600;

/*
  `updated` = Datum der letzten inhaltlichen Änderung der Seite (aus der
  Git-Historie). Bei substanziellen Inhaltsänderungen hier mitpflegen —
  nicht bei reinen Code-/Style-Änderungen.
  /insights/ki-news ist bewusst nicht enthalten, solange der Feed nicht
  wieder regelmäßig gepflegt wird.
*/
const routes = [
  { path: '/', priority: 1.0, changeFrequency: 'weekly', updated: '2026-10-15' },
  { path: '/arbeitssuchende', priority: 0.9, changeFrequency: 'weekly', updated: '2026-06-01' },
  { path: '/berufstaetige', priority: 0.9, changeFrequency: 'weekly', updated: '2026-10-09' },
  { path: '/unternehmen', priority: 0.9, changeFrequency: 'weekly', updated: '2026-10-09' },
  { path: '/oneday', priority: 0.9, changeFrequency: 'weekly', updated: '2026-05-03' },
  { path: '/produktkatalog', priority: 0.8, changeFrequency: 'monthly', updated: '2026-05-03' },
  { path: '/experten', priority: 0.7, changeFrequency: 'monthly', updated: '2026-04-29' },
  { path: '/ueber-uns', priority: 0.6, changeFrequency: 'monthly', updated: '2026-04-29' },
  { path: '/leitbild', priority: 0.5, changeFrequency: 'yearly', updated: '2026-08-10' },
  { path: '/karriere', priority: 0.6, changeFrequency: 'weekly', updated: '2026-09-08' },
  { path: '/insights', priority: 0.8, changeFrequency: 'weekly', updated: '2026-10-15' },
  { path: '/bewerben-mit-ki', priority: 0.8, changeFrequency: 'monthly', updated: '2026-06-06' },
  { path: '/ki-im-kino', priority: 0.8, changeFrequency: 'monthly', updated: '2026-08-19' },
  { path: '/wissens-test', priority: 0.7, changeFrequency: 'monthly', updated: '2026-05-05' },
  { path: '/prompt-challenge', priority: 0.8, changeFrequency: 'monthly', updated: '2026-08-12' },
  { path: '/presse', priority: 0.5, changeFrequency: 'monthly', updated: '2026-04-25' },
  // OneDay detail pages
  { path: '/oneday/claude-cowork', priority: 0.8, changeFrequency: 'weekly', updated: '2026-05-17' },
  { path: '/oneday/immobilien', priority: 0.8, changeFrequency: 'weekly', updated: '2026-05-03' },
  // Insight articles
  { path: '/insights/entscheidungs-ki-jev-openai-microsoft', priority: 0.7, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/fable-5-reasoning-opus-4-8', priority: 0.7, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/minecraft-hintergrund-prompt', priority: 0.6, changeFrequency: 'monthly', updated: '2026-07-24' },
  { path: '/insights/generative-ai-kreativbranche', priority: 0.7, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/5-skills-ki-manager', priority: 0.7, changeFrequency: 'monthly', updated: '2026-04-30' },
  { path: '/insights/prompt-engineering-anfaenger', priority: 0.7, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/interview-zukunft-arbeit-ki', priority: 0.7, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/chatgpt-claude-gemini-vergleich', priority: 0.7, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/bildungsgutschein-ki-kurse', priority: 0.8, changeFrequency: 'monthly', updated: '2026-10-15' },
  { path: '/insights/machine-learning-basics', priority: 0.7, changeFrequency: 'monthly', updated: '2026-04-30' },
  // Legal
  { path: '/impressum', priority: 0.3, changeFrequency: 'yearly', updated: '2026-04-29' },
  { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly', updated: '2026-08-11' },
  { path: '/agb', priority: 0.3, changeFrequency: 'yearly', updated: '2026-04-25' },
];

export default async function sitemap() {
  const baseUrl = 'https://startplatz-ai-academy.de';
  const now = new Date().toISOString();

  const jobs = await getJobs();

  // Jede offene Stelle als eigene URL — Voraussetzung dafür, dass Google
  // die JobPosting-Daten findet. Geschlossene Stellen fallen automatisch raus.
  const jobRoutes = jobs.map((job) => ({
    url: `${baseUrl}/karriere/${job.slug}`,
    lastModified: job.publishedAt || now,
    changeFrequency: 'daily',
    priority: 0.7,
  }));

  return [
    ...routes.map(({ path, priority, changeFrequency, updated }) => ({
      url: `${baseUrl}${path}`,
      lastModified: updated,
      changeFrequency,
      priority,
    })),
    ...jobRoutes,
  ];
}
