import React from 'react';
import {
  getEditions,
  getLabRanking,
  getVolumeSeries,
  getKpis,
} from '../../../lib/kiNews';
import KiNewsView from './KiNewsView';

export const metadata = {
  title: 'KI-News — täglicher Newsstream',
  description:
    'Der tägliche KI-Newsstream der STARTPLATZ AI Academy: die wichtigsten Modelle, Releases, Regulierung und Research-Trends — eingeordnet für den NRW-Mittelstand. Mit Lab-Ranking und News-Volumen.',
  alternates: { canonical: '/insights/ki-news' },
  openGraph: {
    title: 'KI-News — täglicher Newsstream | STARTPLATZ AI Academy',
    description:
      'Die wichtigsten KI-Nachrichten des Tages, eingeordnet für die Praxis. Mit Lab-Ranking und News-Volumen.',
    url: 'https://startplatz-ai-academy.de/insights/ki-news',
    type: 'website',
  },
};

export default function KiNewsPage() {
  const editions = getEditions();
  const ranking = getLabRanking(editions);
  const series = getVolumeSeries(editions);
  const kpi = getKpis(editions);

  return (
    <KiNewsView editions={editions} ranking={ranking} series={series} kpi={kpi} />
  );
}
