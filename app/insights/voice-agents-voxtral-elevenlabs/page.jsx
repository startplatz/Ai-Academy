import SubpageLayout from '../../../components/SubpageLayout';
import HtmlArticleEmbed from '../../../components/ui/HtmlArticleEmbed';
import content from './content.json';
import schema from './schema.json';
import { withSocial } from '../../../lib/seo';

export const metadata = withSocial({
  title: 'Voice Agents: Mistral Voxtral 3 und ElevenLabs im Vergleich',
  description: 'Voice Agents verstehen Sprache und antworten mit Stimme. Was Mistral Voxtral 3 und ElevenLabs Eleven Realtime können und wofür sie sich eignen.',
  alternates: { canonical: '/insights/voice-agents-voxtral-elevenlabs' },
  openGraph: {
    title: 'Voice Agents: Mistral Voxtral 3 und ElevenLabs im Vergleich',
    description: 'Voice Agents verstehen Sprache und antworten mit Stimme. Was Mistral Voxtral 3 und ElevenLabs Eleven Realtime können und wofür sie sich eignen.',
    url: 'https://startplatz-ai-academy.de/insights/voice-agents-voxtral-elevenlabs',
    type: 'article',
  },
});

export default function Page() {
  return (
    <SubpageLayout>
      {/* BlogPosting + FAQPage für Suche und KI-Antworten */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <link rel="stylesheet" href="/insights/voice-agents-voxtral-elevenlabs.css" />
      <HtmlArticleEmbed html={content.html} />
    </SubpageLayout>
  );
}
