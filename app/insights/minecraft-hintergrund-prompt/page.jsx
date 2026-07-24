import SubpageLayout from '../../../components/SubpageLayout';
import HtmlArticleEmbed from '../../../components/ui/HtmlArticleEmbed';
import content from './content.json';

export const metadata = {
  title: 'Foto in eine Minecraft-Welt verwandeln – Prompt',
  description: 'Bild-Prompt, der die Person fotorealistisch lässt und ausschließlich den Hintergrund als originalgetreue Minecraft-Voxel-Nachbildung neu aufbaut.',
  alternates: { canonical: '/insights/minecraft-hintergrund-prompt' },
  openGraph: {
    title: 'Foto in eine Minecraft-Welt verwandeln – Prompt',
    description: 'Bild-Prompt, der die Person fotorealistisch lässt und ausschließlich den Hintergrund als originalgetreue Minecraft-Voxel-Nachbildung neu aufbaut.',
    url: 'https://startplatz-ai-academy.de/insights/minecraft-hintergrund-prompt',
    type: 'article',
  },
};

export default function Page() {
  return (
    <SubpageLayout>
      <link rel="stylesheet" href="/insights/minecraft-hintergrund-prompt.css" />
      <HtmlArticleEmbed html={content.html} />
    </SubpageLayout>
  );
}
