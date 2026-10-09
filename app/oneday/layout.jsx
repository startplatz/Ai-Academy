import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Ein Tag. Ein konkretes Ergebnis.',
  description:
    'OneDay Workshops: Claude Cowork, Claude Code, KI-Kompetenz oder KI-Start. Du kommst morgens und gehst abends mit etwas, das du sofort nutzen kannst. Ab 250 €.',
  alternates: { canonical: '/oneday' },
  openGraph: {
    title: 'Ein Tag. Ein konkretes Ergebnis.',
    description:
      'OneDay KI-Workshops: Du kommst morgens und gehst abends mit etwas, das du sofort nutzen kannst.',
    url: 'https://startplatz-ai-academy.de/oneday',
  },
});

export default function OnedayLayout({ children }) {
  return children;
}
