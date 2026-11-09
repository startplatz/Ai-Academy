import SubpageLayout from '../../../components/SubpageLayout';
import HtmlArticleEmbed from '../../../components/ui/HtmlArticleEmbed';
import content from './content.json';
import schema from './schema.json';
import { withSocial } from '../../../lib/seo';

export const metadata = withSocial({
  title: 'KI-Ranglisten: Ist Gemini 4 Carbon das beste Modell?',
  description: 'Gemini 4 Carbon führt zwei wichtige KI-Ranglisten an, beim Coding liegt Claude vorn. Was Benchmarks messen und wie du das passende Modell findest.',
  alternates: { canonical: '/insights/ki-ranglisten-gemini-4-carbon' },
  openGraph: {
    title: 'KI-Ranglisten: Ist Gemini 4 Carbon das beste Modell?',
    description: 'Gemini 4 Carbon führt zwei wichtige KI-Ranglisten an, beim Coding liegt Claude vorn. Was Benchmarks messen und wie du das passende Modell findest.',
    url: 'https://startplatz-ai-academy.de/insights/ki-ranglisten-gemini-4-carbon',
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
      <link rel="stylesheet" href="/insights/ki-ranglisten-gemini-4-carbon.css" />
      <HtmlArticleEmbed html={content.html} />
    </SubpageLayout>
  );
}
