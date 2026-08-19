import KIImKinoPageClient from './KIImKinoPageClient';

export const metadata = {
  title: 'KI im Kino: 9 kostenlose Skills für den Kinoalltag',
  description:
    'Kostenloses Skill-Paket für Kinos: Hausprofil, Wochenprogramm, Newsletter, Gästeanfragen, Social Media, Verleihkorrespondenz und mehr.',
  alternates: { canonical: '/ki-im-kino' },
  openGraph: {
    title: 'KI im Kino: kostenloses Skill-Paket',
    description:
      'Neun editierbare KI-Skills für wiederkehrende Aufgaben im Kinoalltag - inklusive Schnellstart und Installationsanleitung.',
    url: 'https://startplatz-ai-academy.de/ki-im-kino',
    images: [
      {
        url: '/freebies/ki-im-kino/kino-skill-paket-preview.webp',
        width: 1672,
        height: 941,
        alt: 'Werkzeugkoffer als Symbol für das KI im Kino Skill-Paket',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KI im Kino: 9 kostenlose Skills',
    description: 'Wiederverwendbare KI-Arbeitsabläufe für den Kinoalltag.',
    images: ['/freebies/ki-im-kino/kino-skill-paket-preview.webp'],
  },
};

export default function KIImKinoPage() {
  return <KIImKinoPageClient />;
}
