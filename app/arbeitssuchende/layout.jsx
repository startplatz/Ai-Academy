import { withSocial } from '../../lib/seo';
import { TRAEGER, getCourse } from '../../lib/academyFacts';

const course = getCourse('ki-manager-vollzeit');
const PAGE_URL = 'https://startplatz-ai-academy.de/arbeitssuchende';

export const metadata = withSocial({
  title: 'KI-Manager Weiterbildung mit Bildungsgutschein — Köln & online',
  description:
    `KI-Manager/in in Vollzeit: ${course.durationWeeks} Wochen, ${course.teachingUnits} UE, online oder vor Ort in Köln. AZAV-Maßnahme ${course.massnahmennummer}, mit bewilligtem Bildungsgutschein ohne Kosten für dich. Praxisprojekt, optionale Prüfung bei Cert-IT.`,
  alternates: { canonical: '/arbeitssuchende' },
  openGraph: {
    title: 'KI-Manager Weiterbildung mit Bildungsgutschein — Köln & online',
    description:
      `${course.durationWeeks} Wochen Vollzeit, online oder vor Ort in Köln. AZAV-Maßnahme ${course.massnahmennummer}, förderfähig über Bildungsgutschein.`,
    url: PAGE_URL,
  },
});

const courseJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Course',
  name: 'KI-Manager/in Weiterbildung (Vollzeit)',
  description:
    `AZAV-zugelassene Vollzeit-Weiterbildung zum/zur KI-Manager/in: ${course.durationWeeks} Wochen, ${course.teachingUnits} Unterrichtseinheiten, Praxisprojekt. Förderfähig über Bildungsgutschein der Agentur für Arbeit oder des Jobcenters.`,
  url: PAGE_URL,
  courseCode: course.massnahmennummer,
  inLanguage: 'de',
  educationalCredentialAwarded: course.certificate,
  provider: {
    '@type': 'EducationalOrganization',
    name: TRAEGER.name,
    url: 'https://startplatz-ai-academy.de/',
  },
  offers: {
    '@type': 'Offer',
    category: 'Paid',
    price: course.price,
    priceCurrency: 'EUR',
    description: 'Förderfähig über Bildungsgutschein (AZAV); die Entscheidung trifft die Agentur für Arbeit bzw. das Jobcenter im Einzelfall.',
  },
  hasCourseInstance: {
    '@type': 'CourseInstance',
    courseMode: ['Online', 'Onsite'],
    courseWorkload: `P${course.durationWeeks}W`,
    location: {
      '@type': 'Place',
      name: TRAEGER.name,
      address: {
        '@type': 'PostalAddress',
        streetAddress: TRAEGER.street,
        postalCode: TRAEGER.postalCode,
        addressLocality: TRAEGER.city,
        addressCountry: 'DE',
      },
    },
  },
};

export default function ArbeitssuchendeLayout({ children }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(courseJsonLd) }}
      />
      {children}
    </>
  );
}
