import SubpageLayout from '../../../components/SubpageLayout';
import HtmlArticleEmbed from '../../../components/ui/HtmlArticleEmbed';
import content from './content.json';
import schema from './schema.json';
import { withSocial } from '../../../lib/seo';

export const metadata = withSocial({
  title: 'Canva Craft: Das KI-Bildmodell für Designs erklärt',
  description: 'Canva Craft ist das erste eigene KI-Bildmodell von Canva. Was es bei Postern, Folien und Infografiken kann, wo die Grenzen liegen und wie du startest.',
  alternates: { canonical: '/insights/canva-craft-ki-bildmodell' },
  openGraph: {
    title: 'Canva Craft: Das KI-Bildmodell für Designs erklärt',
    description: 'Canva Craft ist das erste eigene KI-Bildmodell von Canva. Was es bei Postern, Folien und Infografiken kann, wo die Grenzen liegen und wie du startest.',
    url: 'https://startplatz-ai-academy.de/insights/canva-craft-ki-bildmodell',
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
      <link rel="stylesheet" href="/insights/canva-craft-ki-bildmodell.css" />
      <HtmlArticleEmbed html={content.html} />
    </SubpageLayout>
  );
}
