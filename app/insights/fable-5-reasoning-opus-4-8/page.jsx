import SubpageLayout from '../../../components/SubpageLayout';
import HtmlArticleEmbed from '../../../components/ui/HtmlArticleEmbed';
import content from './content.json';

export const metadata = {
  title: 'Fable-5-Reasoning in Opus 4.8 – Betriebshandbuch',
  description: 'Jemand hat gerade herausgefunden, wie man Fable-5-Reasoning in Opus 4.8 mit einem einzigen Prompt bekommt.',
  alternates: { canonical: '/insights/fable-5-reasoning-opus-4-8' },
  openGraph: {
    title: 'Fable-5-Reasoning in Opus 4.8 – Betriebshandbuch',
    description: 'Jemand hat gerade herausgefunden, wie man Fable-5-Reasoning in Opus 4.8 mit einem einzigen Prompt bekommt.',
    url: 'https://startplatz-ai-academy.de/insights/fable-5-reasoning-opus-4-8',
    type: 'article',
  },
};

export default function Page() {
  return (
    <SubpageLayout>
      <link rel="stylesheet" href="/insights/fable-5-reasoning-opus-4-8.css" />
      <HtmlArticleEmbed html={content.html} />
    </SubpageLayout>
  );
}
