import React from 'react';
import {
  getEditions,
  getLabRanking,
  getVolumeSeries,
  getKpis,
} from '../../../lib/kiNews';
import KiNewsView from './KiNewsView';
import { withSocial } from '../../../lib/seo';

export const metadata = withSocial({
  title: 'KI-News — täglicher Newsstream',
  description:
    'Der tägliche KI-Newsstream der STARTPLATZ AI Academy: die wichtigsten Modelle, Releases, Regulierung und Research-Trends — eingeordnet für den NRW-Mittelstand. Mit Lab-Ranking und News-Volumen.',
  alternates: { canonical: '/insights/ki-news' },
  // Feed wird seit Juni 2026 nicht gepflegt: nicht indexieren und nicht
  // verlinken, bis er wieder regelmäßig läuft (siehe app/sitemap.js).
  robots: { index: false, follow: true },
  openGraph: {
    title: 'KI-News — täglicher Newsstream | STARTPLATZ AI Academy',
    description:
      'Die wichtigsten KI-Nachrichten des Tages, eingeordnet für die Praxis. Mit Lab-Ranking und News-Volumen.',
    url: 'https://startplatz-ai-academy.de/insights/ki-news',
    type: 'website',
  },
});

export default function KiNewsPage() {
  const editions = getEditions();
  const ranking = getLabRanking(editions);
  const series = getVolumeSeries(editions);
  const kpi = getKpis(editions);

  return (
    <KiNewsView editions={editions} ranking={ranking} series={series} kpi={kpi} />
  );
}
