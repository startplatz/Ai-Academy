'use client';

import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';

export const ResponsiveGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};

  ${media.md} {
    grid-template-columns: repeat(${({ $cols }) => Math.min($cols || 2, 2)}, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr);
  }
`;

export const TwoColumn = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: start;

  ${media.lg} {
    grid-template-columns: ${({ $reverse }) => ($reverse ? '0.95fr 1.05fr' : '1.05fr 0.95fr')};
  }
`;

const CompareGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const CompareCard = styled.div`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const CompareTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${({ $color }) => $color || tokens.colors.text};
  margin-bottom: ${tokens.spacing.lg};
`;

const CompareList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
`;

const CompareItem = styled.li`
  display: flex;
  gap: ${tokens.spacing.sm};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: ${({ $positive }) => ($positive ? "'✓'" : "'–'")};
    color: ${({ $positive, $color }) => ($positive ? ($color || tokens.colors.mint) : tokens.colors.textDim)};
    font-weight: ${tokens.fontWeights.bold};
    flex-shrink: 0;
  }
`;

export function BeforeAfter({ before = [], after = [], accentColor }) {
  return (
    <CompareGrid>
      <CompareCard>
        <CyberCorners $color={tokens.colors.textDim} $size={8} />
        <CompareTitle>Vorher</CompareTitle>
        <CompareList>
          {before.map((item) => (
            <CompareItem key={item}>{item}</CompareItem>
          ))}
        </CompareList>
      </CompareCard>
      <CompareCard>
        <CyberCorners $color={accentColor || tokens.colors.mint} $size={8} />
        <CompareTitle $color={accentColor || tokens.colors.mint}>Nachher</CompareTitle>
        <CompareList>
          {after.map((item) => (
            <CompareItem key={item} $positive $color={accentColor}>{item}</CompareItem>
          ))}
        </CompareList>
      </CompareCard>
    </CompareGrid>
  );
}

const Details = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.sm};
`;

const DetailRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 4px;
  padding: ${tokens.spacing.md} 0;
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  ${media.md} {
    grid-template-columns: 180px 1fr;
    gap: ${tokens.spacing.lg};
  }
`;

const DetailKey = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.colors.textDim};
`;

const DetailValue = styled.span`
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
`;

export function DetailTable({ items = [] }) {
  return (
    <Details>
      {items.map((item) => (
        <DetailRow key={item.label}>
          <DetailKey>{item.label}</DetailKey>
          <DetailValue>{item.value}</DetailValue>
        </DetailRow>
      ))}
    </Details>
  );
}

const VisualCard = styled.figure`
  position: relative;
  min-height: 360px;
  margin: 0;
  overflow: hidden;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.card};
`;

const VisualImage = styled.img`
  width: 100%;
  height: 100%;
  min-height: 360px;
  object-fit: cover;
`;

const VisualPlaceholder = styled.div`
  min-height: 360px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $color }) => `${$color || tokens.colors.primary}18`}, rgba(255,255,255,0.55)),
    ${tokens.colors.surfaceAlt};
`;

const VisualEyebrow = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || tokens.colors.primary};
  margin-bottom: ${tokens.spacing.sm};
`;

const VisualTitle = styled.figcaption`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.sm};
`;

const PromptText = styled.p`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

export function VisualSlot({ eyebrow = 'Visual Prompt', title, image, prompt, accentColor }) {
  return (
    <VisualCard>
      <CyberCorners $color={accentColor || tokens.colors.mint} $size={12} />
      {image ? (
        <VisualImage src={image} alt={title} loading="lazy" width="1000" height="800" />
      ) : (
        <VisualPlaceholder $color={accentColor}>
          <VisualEyebrow $color={accentColor}>{eyebrow}</VisualEyebrow>
          <VisualTitle>{title}</VisualTitle>
          {prompt && <PromptText>{prompt}</PromptText>}
        </VisualPlaceholder>
      )}
    </VisualCard>
  );
}

const FaqList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
`;

const FaqItem = styled.article`
  position: relative;
  padding: ${tokens.spacing.lg};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const FaqQuestion = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.xs};
`;

const FaqAnswer = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const SearchQaList = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-auto-flow: dense;
  }
`;

const SearchQaItem = styled.article`
  position: relative;
  min-width: 0;
  min-height: 240px;
  overflow: hidden;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $color }) => `${$color || tokens.colors.primary}12`}, rgba(255,255,255,0.88) 42%),
    ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}33`};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
  transition:
    transform ${tokens.transitions.fast},
    border-color ${tokens.transitions.fast},
    box-shadow ${tokens.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    right: -22%;
    bottom: -26%;
    width: 48%;
    height: 56%;
    background: repeating-linear-gradient(
      -35deg,
      ${({ $color }) => `${$color || tokens.colors.primary}1f`} 0 2px,
      transparent 2px 10px
    );
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $color }) => `${$color || tokens.colors.primary}66`};
    box-shadow: ${tokens.shadows.card};
  }

  ${media.lg} {
    grid-column: span ${({ $index }) => ($index % 5 === 0 ? 4 : $index % 5 === 1 ? 2 : 3)};
  }
`;

const SearchQaQuestion = styled.h2`
  position: relative;
  z-index: 1;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin-bottom: ${tokens.spacing.sm};
  overflow-wrap: anywhere;
  letter-spacing: 0;

  ${media.md} {
    font-size: ${tokens.fontSizes['2xl']};
  }
`;

const SearchQaAnswer = styled.div`
  position: relative;
  z-index: 1;
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};

  p + p {
    margin-top: ${tokens.spacing.sm};
  }
`;

export function MiniFAQ({ items = [], accentColor }) {
  return (
    <FaqList>
      {items.map((item) => (
        <FaqItem key={item.q}>
          <CyberCorners $color={accentColor || tokens.colors.mint} $size={7} />
          <FaqQuestion>{item.q}</FaqQuestion>
          <FaqAnswer>{item.a}</FaqAnswer>
        </FaqItem>
      ))}
    </FaqList>
  );
}

export function SearchQuestionAnswers({ items = [], accentColor }) {
  return (
    <SearchQaList>
      {items.map((item, index) => {
        const answer = item.a || item.answer;
        const paragraphs = Array.isArray(answer) ? answer : [answer];

        return (
          <SearchQaItem key={item.q} $color={accentColor} $index={index}>
            <CyberCorners $color={accentColor || tokens.colors.primary} $size={7} />
            <SearchQaQuestion>{item.q}</SearchQaQuestion>
            <SearchQaAnswer>
              {paragraphs.filter(Boolean).map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </SearchQaAnswer>
          </SearchQaItem>
        );
      })}
    </SearchQaList>
  );
}
