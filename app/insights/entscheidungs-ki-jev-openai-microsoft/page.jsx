import SubpageLayout from '../../../components/SubpageLayout';
import HtmlArticleEmbed from '../../../components/ui/HtmlArticleEmbed';
import content from './content.json';
import schema from './schema.json';
import { withSocial } from '../../../lib/seo';

export const metadata = withSocial({
  title: 'Entscheidungs-KI: Jev, OpenAI und Microsoft im Vergleich',
  description: 'Entscheidungs-KI wählt aus festen Optionen statt Text zu schreiben. Was Jev, OpenAIs Decisions API und Microsoft-Decision-1 können.',
  alternates: { canonical: '/insights/entscheidungs-ki-jev-openai-microsoft' },
  openGraph: {
    title: 'Entscheidungs-KI: Jev, OpenAI und Microsoft im Vergleich',
    description: 'Entscheidungs-KI wählt aus festen Optionen statt Text zu schreiben. Was Jev, OpenAIs Decisions API und Microsoft-Decision-1 können.',
    url: 'https://startplatz-ai-academy.de/insights/entscheidungs-ki-jev-openai-microsoft',
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
      <link rel="stylesheet" href="/insights/entscheidungs-ki-jev-openai-microsoft.css" />
      <HtmlArticleEmbed html={content.html} />
    </SubpageLayout>
  );
}
