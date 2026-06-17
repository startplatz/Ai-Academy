'use client';

import React from 'react';
import Link from 'next/link';
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
    id: 1,
    slug: 'generative-ai-kreativbranche',
    title: 'Wie Generative AI die Kreativbranche revolutioniert',
    badge: 'Trend Report',
    excerpt: 'Entdecke, wie generative KI Design, Fotografie und kreative Prozesse verändert.',
    image: '/generated/insights-generative-ai.png',
    meta: '15 Apr 2026 • 8 min Lesezeit',
    featured: true,
  },
  {
    id: 2,
    slug: '5-skills-ki-manager',
    title: '5 Skills, die jeder KI-Manager braucht',
    badge: 'Karriere',
    excerpt: 'Entwickle die wichtigsten Fähigkeiten, um in der KI-Wirtschaft handlungsfähig zu werden.',
    meta: '12 Apr 2026 • 6 min Lesezeit',
  },
  {
    id: 3,
    slug: 'prompt-engineering-anfaenger',
    title: 'Prompt Engineering: Der ultimative Einsteiger Guide',
    badge: 'Tutorial',
    excerpt: 'Lerne, wie du bessere Prompts schreibst und KI-Modelle gezielter steuerst.',
    meta: '10 Apr 2026 • 10 min Lesezeit',
  },
  {
    id: 4,
    slug: 'interview-zukunft-arbeit-ki',
    title: 'Interview: Die Zukunft der Arbeit mit KI',
    badge: 'Interview',
    excerpt: 'Experten diskutieren, wie KI die Arbeitswelt und unsere berufliche Zukunft verändern wird.',
    meta: '08 Apr 2026 • 12 min Lesezeit',
  },
  {
    id: 5,
    slug: 'chatgpt-claude-gemini-vergleich',
    title: 'ChatGPT vs. Claude vs. Gemini: Der große Vergleich 2026',
    badge: 'Vergleich',
    excerpt: 'Umfassender Überblick über die führenden KI-Sprachmodelle und ihre Stärken.',
    meta: '05 Apr 2026 • 9 min Lesezeit',
  },
  {
    id: 6,
    slug: 'bildungsgutschein-ki-kurse',
    title: 'Bildungsgutschein für KI-Kurse: Alles was du wissen musst',
    badge: 'Förderung',
    excerpt: 'So nutzt du Bildungsgutscheine und weitere Förderungen für KI-Weiterbildung.',
    meta: '02 Apr 2026 • 7 min Lesezeit',
  },
  {
    id: 7,
    slug: 'machine-learning-basics',
    title: 'Machine Learning Basics: Von der Theorie zur Praxis',
    badge: 'Deep Dive',
    excerpt: 'Fundamentale Konzepte des Machine Learning verständlich erklärt und angewendet.',
    meta: '31 Mär 2026 • 14 min Lesezeit',
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

const NewsBanner = styled(Link)`
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: ${tokens.spacing.lg};
  text-decoration: none;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-left: 4px solid ${tokens.colors.primary};
  padding: ${tokens.spacing.lg} ${tokens.spacing.xl};
  margin-bottom: ${tokens.spacing['2xl']};
  transition: transform ${tokens.transitions.base}, border-color ${tokens.transitions.base};

  &:hover {
    transform: translateX(4px);
    border-color: ${tokens.colors.primary};
  }
`;

const NewsBannerMain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const NewsBannerKicker = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};

  &::before {
    content: '';
    width: 8px; height: 8px;
    background: ${tokens.colors.mint};
    border-radius: 50%;
  }
`;

const NewsBannerTitle = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
`;

const NewsBannerSub = styled.span`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
`;

const NewsBannerCta = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.primary};
  white-space: nowrap;
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
        subtitle="Artikel, Tutorials und Interviews zu KI-Weiterbildung, Automatisierung und Karrierewegen in NRW."
        breadcrumbs={[{ label: 'Insights' }]}
      />

      <Section>
        <Container>
          <NewsBanner href="/insights/ki-news">
            <NewsBannerMain>
              <NewsBannerKicker>KI-News · Daily</NewsBannerKicker>
              <NewsBannerTitle>Täglicher KI-Newsstream</NewsBannerTitle>
              <NewsBannerSub>Die wichtigsten KI-Nachrichten des Tages — eingeordnet für die Praxis, mit Lab-Ranking und Quellen.</NewsBannerSub>
            </NewsBannerMain>
            <NewsBannerCta>Zum Newsstream →</NewsBannerCta>
          </NewsBanner>

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
