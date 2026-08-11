export default function sitemap() {
  const baseUrl = 'https://startplatz-ai-academy.de';
  const now = new Date().toISOString();

  // Core pages
  const routes = [
    { path: '/', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/arbeitssuchende', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/berufstaetige', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/unternehmen', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/oneday', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/experten', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/ueber-uns', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/leitbild', priority: 0.5, changeFrequency: 'yearly' },
    { path: '/karriere', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/insights', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/bewerben-mit-ki', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/wissens-test', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/prompt-challenge', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/presse', priority: 0.5, changeFrequency: 'monthly' },
    // OneDay detail pages
    { path: '/oneday/claude-cowork', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/oneday/immobilien', priority: 0.8, changeFrequency: 'weekly' },
    // Insight articles
    { path: '/insights/generative-ai-kreativbranche', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/insights/5-skills-ki-manager', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/insights/prompt-engineering-anfaenger', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/insights/interview-zukunft-arbeit-ki', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/insights/chatgpt-claude-gemini-vergleich', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/insights/bildungsgutschein-ki-kurse', priority: 0.8, changeFrequency: 'monthly' },
    { path: '/insights/machine-learning-basics', priority: 0.7, changeFrequency: 'monthly' },
    // Legal
    { path: '/impressum', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/datenschutz', priority: 0.3, changeFrequency: 'yearly' },
    { path: '/agb', priority: 0.3, changeFrequency: 'yearly' },
  ];

  return routes.map(({ path, priority, changeFrequency }) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency,
    priority,
  }));
}
