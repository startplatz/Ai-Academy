import { withSocial } from '../../lib/seo';

export const metadata = withSocial({
  title: 'AI Automation Engineer: n8n-Weiterbildung in 8 Tagen',
  description:
    'AI Automation Engineer: AZAV-zugelassene n8n-Weiterbildung mit KI-Agenten. 8 Kurstage Vollzeit, 64 Unterrichtseinheiten, live online. Mit Bildungsgutschein bis zu 100 % gefördert oder 1.950 € netto für Selbst- und Firmenzahler.',
  alternates: { canonical: '/ai-automation-engineer' },
  openGraph: {
    title: 'AI Automation Engineer: n8n-Weiterbildung in 8 Tagen',
    description:
      'KI-Agenten und Automatisierungen mit n8n bauen: 8 Kurstage, live online, AZAV-zugelassen, mit Bildungsgutschein förderfähig.',
    url: 'https://startplatz-ai-academy.de/ai-automation-engineer',
  },
});

export default function AiAutomationEngineerLayout({ children }) {
  return children;
}
