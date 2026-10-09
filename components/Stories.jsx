'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import PlanetSection from './PlanetSection';

/* ─────────────────────────────────────────────
   STORIES / INSIGHTS – Cyberpunk style
   Chamfered cards with corner accents
   ───────────────────────────────────────────── */

const MAIN_STORY = {
  badge: 'Trend Report',
  title: 'Wie Generative AI die Kreativbranche revolutioniert',
  href: '/insights/generative-ai-kreativbranche',
  meta: '15 Apr 2026 \u00b7 8 min Lesezeit',
  image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80&auto=format',
};

const SIDE_STORIES = [
  { badge: 'Karriere', title: '5 Skills, die jeder KI-Manager braucht', href: '/insights/5-skills-ki-manager' },
  { badge: 'Tutorial', title: 'Prompt Engineering: Einsteiger Guide', href: '/insights/prompt-engineering-anfaenger' },
  { badge: 'Interview', title: 'Interview: Die Zukunft der Arbeit', href: '/insights/interview-zukunft-arbeit-ki' },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  ${media.lg} { grid-template-columns: 1.4fr 1fr; }
`;

const MainCard = styled(Link)`
  display: block;
  position: relative;
  text-decoration: none;
  ${clipTLBR(CHAMFER.lg)}
  overflow: hidden;
  min-height: 360px;
  cursor: pointer;
  transition: transform ${tokens.transitions.base}, filter ${tokens.transitions.base};
  &:hover { transform: translateY(-4px); filter: drop-shadow(0 8px 24px rgba(124,58,237,0.10)); }
  &:hover img { transform: scale(1.04); }
`;

const MainImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform ${tokens.transitions.slow};
`;

const MainOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 30%, rgba(15, 23, 42, 0.88) 100%);
`;

const MainContent = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  padding: ${tokens.spacing['2xl']};
  z-index: 2;
`;

const StoryBadge = styled.span`
  display: inline-block;
  padding: 3px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.colors.primaryLight};
  background: rgba(99, 102, 241, 0.2);
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.sm};
`;

const SideBadge = styled(StoryBadge)`
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
`;

const MainTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 3vw, ${tokens.fontSizes['3xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  margin-bottom: ${tokens.spacing.sm};
  line-height: ${tokens.lineHeights.snug};
`;

const MetaText = styled.span`
  font-size: ${tokens.fontSizes.xs};
  color: rgba(255,255,255,0.6);
`;

const SideList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
`;

const SideCard = styled(Link)`
  display: block;
  position: relative;
  text-decoration: none;
  padding: ${tokens.spacing.lg};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
  cursor: pointer;
  transition: all ${tokens.transitions.base};

  &:hover {
    filter: drop-shadow(0 4px 16px rgba(0,0,0,0.06));
    transform: translateX(4px);
    border-color: rgba(124,58,237,0.15);
  }
`;

const SideTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
`;

const AllLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  margin-top: ${tokens.spacing.lg};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.primary};
  text-decoration: none;
  &:hover { color: ${tokens.colors.primaryDark}; }

  svg { width: 14px; height: 14px; transition: transform ${tokens.transitions.fast}; }
  &:hover svg { transform: translateX(3px); }
`;

const ArrowSVG = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h8.5m0 0L8 4.5m3.5 3.5L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function Stories() {
  return (
    <PlanetSection
      id="stories"
      badge="Wissen"
      title="<span>Insights</span>"
      subtitle="Artikel, Tutorials und Interviews rund um KI, Karriere und Innovation."
    >
      <Grid>
        <MainCard href={MAIN_STORY.href}>
          <CyberCorners $color={tokens.colors.mint} $size={14} />
          <MainImage src={MAIN_STORY.image} alt={MAIN_STORY.title} loading="lazy" width="800" height="500" />
          <MainOverlay />
          <MainContent>
            <StoryBadge>{MAIN_STORY.badge}</StoryBadge>
            <MainTitle>{MAIN_STORY.title}</MainTitle>
            <MetaText>{MAIN_STORY.meta}</MetaText>
          </MainContent>
        </MainCard>

        <SideList>
          {SIDE_STORIES.map((s) => (
            <SideCard key={s.title} href={s.href}>
              <CyberCorners $color={tokens.colors.mint} $size={8} />
              <SideBadge>{s.badge}</SideBadge>
              <SideTitle>{s.title}</SideTitle>
            </SideCard>
          ))}
          <AllLink href="/insights">Alle Artikel <ArrowSVG /></AllLink>
        </SideList>
      </Grid>
    </PlanetSection>
  );
}
