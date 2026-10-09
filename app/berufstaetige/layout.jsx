import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'Zwei Abende pro Woche. Nach 8 Wochen automatisierst du.',
  description:
    'AfterWork AI Automation: 8 Wochen, Di & Do 15–18 Uhr, neben dem Job. Du lernst n8n, GPT-APIs und Workflow-Automatisierung — und setzt es direkt in deinem Arbeitsalltag ein. QCG- und AZAV-förderfähig.',
  alternates: { canonical: '/berufstaetige' },
  openGraph: {
    title: 'Zwei Abende pro Woche. Nach 8 Wochen automatisierst du.',
    description:
      'AfterWork AI Automation: 8 Wochen neben dem Job. n8n, GPT-APIs, echte Workflows. QCG-förderfähig.',
    url: 'https://startplatz-ai-academy.de/berufstaetige',
  },
});

export default function BerufstaetigeLayout({ children }) {
  return children;
}
