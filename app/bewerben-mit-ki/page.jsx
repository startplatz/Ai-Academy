import BewerbenMitKIPageClient from './BewerbenMitKIPageClient';

export const metadata = {
  title: 'Bewerben mit KI: Prompt-Pack für Lebenslauf, ATS & Interview',
  description:
    'Kostenloses Download-Pack zum Seminar Bewerben mit KI: Prompt-Workbook, Prompt-Chain, Profilfoto-Prompts, Interview-Simulator, ATS-Checkliste und Negativbeispiel.',
  alternates: { canonical: '/bewerben-mit-ki' },
  openGraph: {
    title: 'Bewerben mit KI: kostenloses Prompt-Pack',
    description:
      'Hol dir Prompts und Checklisten für Lebenslauf, ATS-Optimierung, Profilfoto und Interviewtraining.',
    url: 'https://startplatz-ai-academy.de/bewerben-mit-ki',
    images: [
      {
        url: '/freebies/bewerben-mit-ki/bewerben-mit-ki-preview.webp',
        width: 1200,
        height: 750,
        alt: 'Bewerben mit KI Download-Pack Vorschau',
      },
    ],
  },
};

export default function BewerbenMitKIPage() {
  return <BewerbenMitKIPageClient />;
}
