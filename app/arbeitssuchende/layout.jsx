import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'In 8 Wochen zum KI-Manager — 100 % gefördert',
  description:
    'FortyDays Bootcamp: 8 Wochen Vollzeit, komplett über Bildungsgutschein finanzierbar. AZAV- & Cert-IT-zertifiziert. Du lernst Prompting, Automatisierung und KI-Strategie — und gehst mit einem anerkannten Zertifikat.',
  alternates: { canonical: '/arbeitssuchende' },
  openGraph: {
    title: 'In 8 Wochen zum KI-Manager — 100 % gefördert',
    description:
      'FortyDays Bootcamp: Vollzeit, digital, komplett über Bildungsgutschein finanzierbar. Du gehst mit einem Cert-IT-Zertifikat.',
    url: 'https://startplatz-ai-academy.de/arbeitssuchende',
  },
});

export default function ArbeitssuchendeLayout({ children }) {
  return children;
}
