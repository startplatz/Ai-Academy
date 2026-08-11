export const metadata = {
  title: 'NEXUS//BREACH – knackst du KAIRO?',
  description:
    'Lerne Prompt Injection und Jailbreaks spielerisch kennen: sechs Missionen, direkte Rückmeldung und konkrete Schutzmaßnahmen für den sicheren KI-Einsatz.',
  alternates: { canonical: '/prompt-challenge' },
  openGraph: {
    title: 'NEXUS//BREACH – die Prompt Injection Challenge',
    description:
      'Kannst du die KI überlisten? Eine kostenlose, interaktive Lern-Challenge der STARTPLATZ AI Academy.',
    url: 'https://startplatz-ai-academy.de/prompt-challenge',
    type: 'website',
    images: [{
      url: '/prompt-challenge/og-nexus-breach.webp',
      width: 1200,
      height: 630,
      alt: 'KAIRO bewacht den digitalen NEXUS-Tresor',
    }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NEXUS//BREACH – die Prompt Injection Challenge',
    description:
      'Sechs Missionen zu Jailbreaks, Prompt Injection und sicheren KI-Systemen.',
    images: ['/prompt-challenge/og-nexus-breach.webp'],
  },
};

export default function PromptChallengeLayout({ children }) {
  return children;
}
