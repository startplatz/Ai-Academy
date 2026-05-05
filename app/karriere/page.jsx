import KarrierePageClient from './KarrierePageClient';

export const metadata = {
  title: 'Karriere & Jobs',
  description:
    'Karriere bei der STARTPLATZ AI Academy: Offene Rollen in KI-Bildung, Marketing, Operations, Sales und Academy-Aufbau.',
  alternates: { canonical: '/karriere' },
  openGraph: {
    title: 'Karriere & Jobs | STARTPLATZ AI Academy',
    description:
      'Werde Teil der STARTPLATZ AI Academy und gestalte praxisnahe KI-Bildung für Menschen, Teams und Unternehmen.',
    url: 'https://startplatz-ai-academy.de/karriere',
    images: [
      {
        url: 'https://res.cloudinary.com/startplatz/image/upload/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png',
        width: 1200,
        height: 630,
        alt: 'STARTPLATZ AI Academy Team',
      },
    ],
  },
};

export default function KarrierePage() {
  return <KarrierePageClient />;
}
