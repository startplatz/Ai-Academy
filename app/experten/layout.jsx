import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Dozenten, die KI jeden Tag selbst nutzen',
  description:
    'Kein Hörsaal, keine Buzzword-Bühne. Unsere Dozenten bauen KI-Produkte, automatisieren Prozesse und bringen dir bei, was sie selbst täglich anwenden.',
  alternates: { canonical: '/experten' },
  openGraph: {
    title: 'Dozenten, die KI jeden Tag selbst nutzen',
    description:
      'Kein Hörsaal, keine Buzzword-Bühne. Unsere Dozenten bringen dir bei, was sie selbst täglich anwenden.',
    url: 'https://startplatz-ai-academy.de/experten',
  },
});

export default function ExpertenLayout({ children }) {
  return children;
}
