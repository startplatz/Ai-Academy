import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Wissen, das du morgen anwenden kannst',
  description:
    'Artikel, Tutorials und Interviews zu KI im Arbeitsalltag — von Prompting über Automatisierung bis Karriere mit KI. Geschrieben von Leuten, die es selbst machen.',
  alternates: { canonical: '/insights' },
  openGraph: {
    title: 'Wissen, das du morgen anwenden kannst',
    description:
      'Artikel, Tutorials und Interviews zu KI im Arbeitsalltag. Von Leuten, die es selbst machen.',
    url: 'https://startplatz-ai-academy.de/insights',
  },
});

export default function InsightsLayout({ children }) {
  return children;
}
