import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Wo stehst du mit KI? Finde es in 2 Minuten heraus.',
  description:
    '10 Fragen, sofortiges Ergebnis, eine persönliche Empfehlung. Kein Account nötig — einfach starten und sehen, wo du stehst.',
  alternates: { canonical: '/wissens-test' },
  openGraph: {
    title: 'Wo stehst du mit KI? Finde es in 2 Minuten heraus.',
    description:
      '10 Fragen, sofortiges Ergebnis, eine persönliche Empfehlung für deinen nächsten Schritt.',
    url: 'https://startplatz-ai-academy.de/wissens-test',
  },
});

export default function WissensTestLayout({ children }) {
  return children;
}
