'use client';

import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../../styles/tokens';
import SubpageLayout from '../../components/SubpageLayout';
import PageHero from '../../components/ui/PageHero';
import BlogCard from '../../components/ui/BlogCard';
import CTABanner from '../../components/ui/CTABanner';
import Button from '../../components/ui/Button';
import { CALENDLY_URL } from '../../lib/site';

/* Blog posts data */
const BLOG_POSTS = [
  {
    id: 11,
    slug: 'voice-agents-voxtral-elevenlabs',
    title: 'Voice Agents: Was Sprach-KI im Unternehmen leisten kann',
    badge: 'KI in der Praxis',
    excerpt: 'Mistral und ElevenLabs bringen neue Sprach-KI für Hotlines und Termine. Zwei Ansätze im Vergleich und was das für dich bedeutet.',
    meta: '23 Okt 2026 • 8 min Lesezeit',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format',
    featured: true,
  },
  {
    id: 10,
    slug: 'entscheidungs-ki-jev-openai-microsoft',
    title: 'Entscheidungs-KI: Wenn KI nur noch Ja oder Nein sagt',
    badge: 'KI in der Praxis',
    excerpt: 'Jev, OpenAI und Microsoft bringen KI, die nicht schreibt, sondern entscheidet. Was das für Automatisierung im Job bedeutet.',
    meta: '15 Okt 2026 • 8 min Lesezeit',
  },
  {
    id: 6,
    slug: 'bildungsgutschein-ki-kurse',
    title: 'Bildungsgutschein für KI-Kurse: So läuft die Förderung',
    badge: 'Förderung',
    excerpt: 'Wie du eine KI-Weiterbildung über Bildungsgutschein oder Qualifizierungschancengesetz fördern lässt.',
    meta: '15 Okt 2026 • 3 min Lesezeit',
  },
  {
    id: 8,
    slug: 'fable-5-reasoning-opus-4-8',
    title: 'Fable-5-Reasoning in Opus 4.8 – mit einem einzigen Prompt',
    badge: 'Prompt Guide',
    excerpt: 'Ein Betriebshandbuch-Prompt für Claude Opus 4.8. Stand Juli 2026, inzwischen gibt es neuere Claude-Modelle.',
    meta: 'Prompt Guide • Stand Jul 2026',
  },
  {
    id: 9,
    slug: 'minecraft-hintergrund-prompt',
    title: 'Foto in eine Minecraft-Welt verwandeln',
    badge: 'Prompt',
    excerpt: 'Bild-Prompt, der die Person fotorealistisch lässt und nur den Hintergrund als Minecraft-Welt neu aufbaut.',
    meta: 'Bild-Prompt',
  },
  {
    id: 1,
    slug: 'generative-ai-kreativbranche',
    title: 'Wie generative KI die Kreativbranche verändert',
    badge: 'Trend Report',
    excerpt: 'Wie generative KI Design, Fotografie und kreative Prozesse verändert und was dabei menschlich bleibt.',
    meta: '15 Apr 2026 • 2 min Lesezeit',
  },
  {
    id: 2,
    slug: '5-skills-ki-manager',
    title: '5 Skills, die jeder KI-Manager braucht',
    badge: 'Karriere',
    excerpt: 'Entwickle die wichtigsten Fähigkeiten, um in der KI-Wirtschaft handlungsfähig zu werden.',
    meta: '12 Apr 2026 • 1 min Lesezeit',
  },
  {
    id: 3,
    slug: 'prompt-engineering-anfaenger',
    title: 'Prompt Engineering für Einsteiger: 5 Grundregeln',
    badge: 'Tutorial',
    excerpt: 'Fünf Grundregeln, mit denen du bessere Prompts schreibst und KI-Modelle gezielter steuerst.',
    meta: '10 Apr 2026 • 1 min Lesezeit',
  },
  {
    id: 4,
    slug: 'interview-zukunft-arbeit-ki',
    title: 'Die Zukunft der Arbeit mit KI: 5 Thesen',
    badge: 'Einordnung',
    excerpt: 'Fünf Thesen der AI Academy dazu, wie KI Aufgaben, Rollen und Weiterbildung in Teams verändert.',
    meta: '08 Apr 2026 • 1 min Lesezeit',
  },
  {
    id: 5,
    slug: 'chatgpt-claude-gemini-vergleich',
    title: 'ChatGPT, Claude oder Gemini? So findest du das passende Modell',
    badge: 'Ratgeber',
    excerpt: 'Statt allgemeiner Rankings: wie du KI-Modelle mit deinen eigenen Aufgaben vergleichst.',
    meta: '05 Apr 2026 • 1 min Lesezeit',
  },
  {
    id: 7,
    slug: 'machine-learning-basics',
    title: 'Machine Learning Basics: Von der Theorie zur Praxis',
    badge: 'Deep Dive',
    excerpt: 'Die Grundbegriffe des Machine Learning kurz erklärt: Daten, Training, Test und Anwendung.',
    meta: '31 Mär 2026 • 1 min Lesezeit',
  },
];

const Section = styled.section`
  padding: ${tokens.spacing['3xl']} 0;
  background: ${tokens.colors.pageBg};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.lg} {
    padding: 0 ${tokens.spacing['2xl']};
  }
`;

const FeaturedWrapper = styled.div`
  margin-bottom: ${tokens.spacing['4xl']};
`;

const GridWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  margin-bottom: ${tokens.spacing['4xl']};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default function BlogPage() {
  const featuredPost = BLOG_POSTS.find((post) => post.featured);
  const regularPosts = BLOG_POSTS.filter((post) => !post.featured);

  return (
    <SubpageLayout>
      <PageHero
        badge="Insights"
        title="Wissen für die <span style='white-space:nowrap'>KI-Zukunft</span>"
        subtitle="Artikel, Ratgeber und Prompt-Guides zu KI-Weiterbildung, Automatisierung und Karrierewegen."
        breadcrumbs={[{ label: 'Insights' }]}
      />

      <Section>
        <Container>

          {featuredPost && (
            <FeaturedWrapper>
              <BlogCard
                title={featuredPost.title}
                badge={featuredPost.badge}
                meta={featuredPost.meta}
                excerpt={featuredPost.excerpt}
                image={featuredPost.image}
                slug={featuredPost.slug}
                featured
              />
            </FeaturedWrapper>
          )}

          <GridWrapper>
            {regularPosts.map((post) => (
              <BlogCard
                key={post.id}
                title={post.title}
                badge={post.badge}
                meta={post.meta}
                excerpt={post.excerpt}
                slug={post.slug}
              />
            ))}
          </GridWrapper>
        </Container>
      </Section>

      <CTABanner
        title="Bereit zum <span>KI-Einstieg?</span>"
        subtitle="Finde heraus, welcher Einstieg zu dir passt, oder sprich direkt mit unserem Team."
      >
        <Button variant="primary" size="lg" href="/wissens-test">
          Wissens-Test machen
        </Button>
        <Button variant="secondary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Beratung buchen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
