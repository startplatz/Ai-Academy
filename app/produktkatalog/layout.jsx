import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Preisliste 2026 & Produktkatalog',
  description:
    'Preisliste 2026 und Produktkatalog der STARTPLATZ AI Academy: OneDay, KI-Manager/in in Vollzeit und Teilzeit und Corporate Inhouse.',
  alternates: { canonical: '/produktkatalog' },
  openGraph: {
    title: 'Preisliste 2026 & Produktkatalog | STARTPLATZ AI Academy',
    description:
      'Programme, OneDay Workshops und Teamformate der STARTPLATZ AI Academy mit Preisen und Formatüberblick.',
    url: 'https://startplatz-ai-academy.de/produktkatalog',
  },
});

export default function ProduktkatalogLayout({ children }) {
  return children;
}
