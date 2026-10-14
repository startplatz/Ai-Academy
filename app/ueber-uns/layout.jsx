import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Seit 2012 Innovationsökosystem. Seit 2023 alles auf KI.',
  description:
    '1.000+ Absolventen, AZAV-zertifiziert. Wir kommen aus dem STARTPLATZ Ökosystem — und haben KI-Weiterbildung zu unserem Kernthema gemacht.',
  alternates: { canonical: '/ueber-uns' },
  openGraph: {
    title: 'Seit 2012 Innovationsökosystem. Seit 2023 alles auf KI.',
    description:
      '1.000+ Absolventen, AZAV-zertifiziert. Wir kommen aus dem STARTPLATZ Ökosystem.',
    url: 'https://startplatz-ai-academy.de/ueber-uns',
  },
});

export default function UeberUnsLayout({ children }) {
  return children;
}
