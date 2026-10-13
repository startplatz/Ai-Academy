import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'KI-Manager/in in Teilzeit: berufsbegleitend mit QCG-Förderung',
  description:
    'KI-Weiterbildung für Berufstätige: KI-Manager/in in Teilzeit, 16 Wochen, Montag bis Donnerstag 14–18 Uhr, online oder vor Ort in Köln. AZAV-zugelassen und förderfähig über das Qualifizierungschancengesetz.',
  alternates: { canonical: '/berufstaetige' },
  openGraph: {
    title: 'KI-Manager/in in Teilzeit: berufsbegleitend mit QCG-Förderung',
    description:
      '16 Wochen, Mo–Do ab 14 Uhr, online oder vor Ort in Köln. AZAV-zugelassen, förderfähig über das QCG.',
    url: 'https://startplatz-ai-academy.de/berufstaetige',
  },
});

export default function BerufstaetigeLayout({ children }) {
  return children;
}
