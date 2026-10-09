import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Presse & Medien',
  description:
    'Logos, Fotos, Factsheet und Ansprechpartner für Journalisten. Alles, was du für eine Story über die AI Academy brauchst.',
  alternates: { canonical: '/presse' },
  openGraph: {
    title: 'Presse & Medien',
    description: 'Logos, Fotos, Factsheet und Ansprechpartner für Journalisten.',
    url: 'https://startplatz-ai-academy.de/presse',
  },
});

export default function PresseLayout({ children }) {
  return children;
}
