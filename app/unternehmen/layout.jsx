import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'KI ins Team bringen — Wirkung ab Tag eins',
  description:
    'Von einem Innovation Day bis zur Private Academy über 3–12 Monate. 100+ Unternehmen haben mit uns gestartet. Wir passen Inhalt, Tempo und Tiefe an euer Team an.',
  alternates: { canonical: '/unternehmen' },
  openGraph: {
    title: 'KI ins Team bringen — Wirkung ab Tag eins',
    description:
      'Innovation Day, Inhouse-Training oder Private Academy. 100+ Unternehmen haben mit uns gestartet.',
    url: 'https://startplatz-ai-academy.de/unternehmen',
  },
});

export default function UnternehmenLayout({ children }) {
  return children;
}
