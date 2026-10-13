import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'In 8 Wochen zum KI-Manager — 100 % gefördert',
  description:
    'KI-Manager/in in Vollzeit: 8 Wochen, online oder vor Ort in Köln, komplett über Bildungsgutschein finanzierbar. AZAV-zugelassen, optionale Abschlussprüfung bei Cert-IT. Du lernst Prompting, Automatisierung und KI-Strategie — und gehst mit einem anerkannten Zertifikat.',
  alternates: { canonical: '/arbeitssuchende' },
  openGraph: {
    title: 'In 8 Wochen zum KI-Manager — 100 % gefördert',
    description:
      'KI-Manager/in in Vollzeit: online oder vor Ort in Köln, komplett über Bildungsgutschein finanzierbar. AZAV-zugelassen.',
    url: 'https://startplatz-ai-academy.de/arbeitssuchende',
  },
});

export default function ArbeitssuchendeLayout({ children }) {
  return children;
}
