'use client';

import React, { useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled, { css } from 'styled-components';
import { tokens, media } from '../../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners, OuterCornerFrame } from '../../styles/cyberpunk';

const spanMap = {
  sm: 2,
  md: 3,
  wide: 4,
  hero: 4,
  tall: 2,
  full: 6,
};

const minHeightMap = {
  sm: '220px',
  md: '260px',
  wide: '280px',
  hero: '340px',
  tall: '360px',
  full: '260px',
};

const BentoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.lg} {
    grid-template-columns: repeat(6, minmax(0, 1fr));
    grid-auto-flow: dense;
    align-items: stretch;
  }
`;

const BentoTile = styled.article`
  position: relative;
  min-width: 0;
  min-height: 220px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${tokens.spacing.xl};
  overflow: hidden;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $bg }) => $bg || tokens.colors.primaryLighter}, rgba(255, 255, 255, 0.9) 44%),
    ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}33`};
  ${clipTLBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
  transition:
    transform ${tokens.transitions.fast},
    border-color ${tokens.transitions.fast},
    box-shadow ${tokens.transitions.fast};

  &::before {
    content: '';
    position: absolute;
    inset: -1px;
    opacity: 0;
    pointer-events: none;
    background: radial-gradient(
      280px circle at var(--x, 50%) var(--y, 45%),
      ${({ $color }) => `${$color || tokens.colors.primary}26`},
      transparent 58%
    );
    transition: opacity ${tokens.transitions.base};
  }

  &::after {
    content: '';
    position: absolute;
    right: -18%;
    bottom: -18%;
    width: 46%;
    height: 46%;
    background: repeating-linear-gradient(
      -35deg,
      ${({ $color }) => `${$color || tokens.colors.primary}1f`} 0 2px,
      transparent 2px 10px
    );
    transform: skewX(-10deg);
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $color }) => `${$color || tokens.colors.primary}66`};
    box-shadow: ${tokens.shadows.cardHover};
  }

  &:hover::before,
  &:focus-within::before {
    opacity: 1;
  }

  @media (hover: none) {
    &::before {
      opacity: 0.72;
      background: linear-gradient(135deg, ${({ $color }) => `${$color || tokens.colors.primary}18`}, transparent 56%);
    }
  }

  > * {
    transition: opacity 260ms ease;
  }

  &[data-active='false'] > * {
    opacity: 0;
  }

  ${media.lg} {
    grid-column: span ${({ $size }) => spanMap[$size] || spanMap.md};
    min-height: ${({ $size }) => minHeightMap[$size] || minHeightMap.md};
  }
`;

const BentoLabel = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primary};
  background: rgba(255, 255, 255, 0.74);
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}2e`};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const BentoMetric = styled.div`
  position: relative;
  z-index: 1;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4.5vw, ${tokens.fontSizes['6xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: 0.95;
  color: ${({ $color }) => $color || tokens.colors.primary};
  letter-spacing: 0;
`;

const BentoTitle = styled.h3`
  position: relative;
  z-index: 1;
  max-width: 740px;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 2.2vw, ${tokens.fontSizes['3xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  color: ${tokens.colors.text};
  overflow-wrap: anywhere;
`;

const BentoText = styled.p`
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin-top: ${tokens.spacing.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const BentoChips = styled.ul`
  position: relative;
  z-index: 1;
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const BentoChip = styled.li`
  padding: 5px 9px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${tokens.colors.textSoft};
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.06);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const BentoAction = styled.span`
  position: relative;
  z-index: 1;
  display: inline-flex;
  width: fit-content;
  align-items: center;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color || tokens.colors.primary};
  letter-spacing: 0.08em;
  text-transform: uppercase;

  &::after {
    content: '>';
    transition: transform ${tokens.transitions.fast};
  }
`;

const clickableTile = css`
  color: inherit;
  text-decoration: none;

  &:hover ${BentoAction}::after {
    transform: translateX(4px);
  }
`;

const BentoLink = styled(Link)`
  ${clickableTile}
`;

const BentoAnchor = styled.a`
  ${clickableTile}
`;

function TileFrame({ item, children, onPointerMove, accentColor, accentBg }) {
  const props = {
    $size: item.size,
    $color: item.accentColor || accentColor,
    $bg: item.accentBg || accentBg,
    onPointerMove,
  };

  if (item.href?.startsWith('/')) {
    return (
      <BentoTile as={BentoLink} href={item.href} {...props}>
        {children}
      </BentoTile>
    );
  }

  if (item.href) {
    return (
      <BentoTile
        as={BentoAnchor}
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </BentoTile>
    );
  }

  return <BentoTile {...props}>{children}</BentoTile>;
}

export function SpotlightBento({
  items = [],
  accentColor = tokens.colors.primary,
  accentBg = tokens.colors.primaryLighter,
  ariaLabel,
}) {
  const handlePointerMove = useCallback((event) => {
    const rect = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty('--x', `${event.clientX - rect.left}px`);
    event.currentTarget.style.setProperty('--y', `${event.clientY - rect.top}px`);
  }, []);

  return (
    <BentoGrid aria-label={ariaLabel}>
      {items.map((item, index) => {
        const color = item.accentColor || accentColor;

        return (
          <TileFrame
            key={item.title || item.metric || index}
            item={item}
            onPointerMove={handlePointerMove}
            accentColor={accentColor}
            accentBg={accentBg}
          >
            <CyberCorners $color={tokens.colors.mint} $size={9} $revealOnHover />
            <div>
              {(item.label || item.kicker) && <BentoLabel $color={color}>{item.label || item.kicker}</BentoLabel>}
              {item.metric && <BentoMetric $color={color}>{item.metric}</BentoMetric>}
            </div>
            <div>
              <BentoTitle>{item.title}</BentoTitle>
              {item.description && <BentoText>{item.description}</BentoText>}
              {item.chips?.length > 0 && (
                <BentoChips>
                  {item.chips.map((chip) => (
                    <BentoChip key={chip}>{chip}</BentoChip>
                  ))}
                </BentoChips>
              )}
              {item.cta && <BentoAction $color={color}>{item.cta}</BentoAction>}
            </div>
          </TileFrame>
        );
      })}
    </BentoGrid>
  );
}

const RailLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: start;

  ${media.lg} {
    grid-template-columns: minmax(260px, 0.78fr) minmax(0, 1.22fr);
  }
`;

const RailIntro = styled.aside`
  position: relative;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $bg }) => $bg || tokens.colors.primaryLighter}, rgba(255,255,255,0.72)),
    ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}2e`};
  ${clipTLBR(CHAMFER.lg)}

  ${media.lg} {
    position: sticky;
    top: 112px;
  }
`;

const RailKicker = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primary};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const RailTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
`;

const RailText = styled.p`
  margin-top: ${tokens.spacing.md};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const RailMeta = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.xl};
`;

const RailMetaItem = styled.span`
  padding: 6px 9px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${tokens.colors.textSoft};
  background: rgba(255, 255, 255, 0.7);
  border: 1px solid rgba(0, 0, 0, 0.06);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const RailList = styled.ol`
  position: relative;
  display: grid;
  gap: ${tokens.spacing.lg};
  counter-reset: step;

  &::before {
    content: '';
    position: absolute;
    top: 22px;
    bottom: 22px;
    left: 20px;
    width: 2px;
    background: linear-gradient(
      180deg,
      transparent,
      ${({ $color }) => `${$color || tokens.colors.primary}55`},
      transparent
    );
  }
`;

const RailItem = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: ${tokens.spacing.lg};
  list-style: none;
`;

const RailNode = styled.span`
  position: relative;
  z-index: 1;
  width: 42px;
  height: 42px;
  display: grid;
  place-items: center;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color || tokens.colors.primary};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}44`};
  box-shadow: 0 0 0 6px ${({ $bg }) => $bg || tokens.colors.primaryLighter};
  ${clipBR(CHAMFER.xs)}
`;

const RailCard = styled.article`
  position: relative;
  min-width: 0;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}2e`};
  ${clipBR(CHAMFER.md)}
  transition:
    transform ${tokens.transitions.fast},
    border-color ${tokens.transitions.fast},
    box-shadow ${tokens.transitions.fast};

  &:hover {
    transform: translateX(4px);
    border-color: ${({ $color }) => `${$color || tokens.colors.primary}5c`};
    box-shadow: ${tokens.shadows.card};
  }
`;

const RailItemKicker = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primary};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const RailItemTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 2vw, ${tokens.fontSizes['2xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  color: ${tokens.colors.text};
  overflow-wrap: anywhere;
`;

const RailItemText = styled.p`
  margin-top: ${tokens.spacing.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

export function MilestoneRail({
  items = [],
  intro,
  accentColor = tokens.colors.primary,
  accentBg = tokens.colors.primaryLighter,
}) {
  return (
    <RailLayout>
      <RailIntro $color={accentColor} $bg={accentBg}>
        <CyberCorners $color={tokens.colors.mint} $size={11} />
        {intro?.kicker && <RailKicker $color={accentColor}>{intro.kicker}</RailKicker>}
        {intro?.title && <RailTitle>{intro.title}</RailTitle>}
        {intro?.text && <RailText>{intro.text}</RailText>}
        {intro?.meta?.length > 0 && (
          <RailMeta>
            {intro.meta.map((item) => (
              <RailMetaItem key={item}>{item}</RailMetaItem>
            ))}
          </RailMeta>
        )}
      </RailIntro>

      <RailList $color={accentColor}>
        {items.map((item, index) => (
          <RailItem key={item.title || index}>
            <RailNode $color={accentColor} $bg={accentBg}>
              {item.step || String(index + 1).padStart(2, '0')}
            </RailNode>
            <RailCard $color={accentColor}>
              <CyberCorners $color={tokens.colors.mint} $size={7} $revealOnHover />
              {item.kicker && <RailItemKicker $color={accentColor}>{item.kicker}</RailItemKicker>}
              <RailItemTitle>{item.title}</RailItemTitle>
              <RailItemText>{item.description || item.text}</RailItemText>
            </RailCard>
          </RailItem>
        ))}
      </RailList>
    </RailLayout>
  );
}

const ChromaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
`;

const chromaClickable = css`
  color: inherit;
  text-decoration: none;
`;

const ChromaTile = styled.article`
  position: relative;
  min-width: 0;
  min-height: 340px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  overflow: hidden;
  background: ${tokens.colors.dark};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}55`};
  ${clipTLBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.92) saturate(0.72) contrast(1.05);
    transform: scale(1.02);
    transition:
      filter ${tokens.transitions.base},
      transform ${tokens.transitions.slow};
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10,10,10,0.02), rgba(10,10,10,0.76)),
      linear-gradient(105deg, ${({ $color }) => `${$color || tokens.colors.primary}73`}, transparent 42%);
  }

  &:hover img {
    filter: grayscale(0.12) saturate(1.08) contrast(1.02);
    transform: scale(1.06);
  }

  ${media.md} {
    min-height: 420px;
  }
`;

const ChromaLink = styled(Link)`
  ${chromaClickable}
`;

const ChromaAnchor = styled.a`
  ${chromaClickable}
`;

const ChromaContent = styled.div`
  position: relative;
  z-index: 1;
  padding: ${tokens.spacing.xl};
  color: ${tokens.colors.darkText};
`;

const ChromaKicker = styled.span`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.md};
  padding: 5px 9px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.darkText};
  background: rgba(10, 10, 10, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.16);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const ChromaTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 2.2vw, ${tokens.fontSizes['3xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  color: ${tokens.colors.darkText};
`;

const ChromaText = styled.p`
  margin-top: ${tokens.spacing.sm};
  color: rgba(245, 245, 245, 0.82);
  line-height: ${tokens.lineHeights.relaxed};
`;

function ChromaFrame({ item, children, accentColor }) {
  const props = { $color: item.accentColor || accentColor };

  if (item.href?.startsWith('/')) {
    return (
      <ChromaTile as={ChromaLink} href={item.href} {...props}>
        {children}
      </ChromaTile>
    );
  }

  if (item.href) {
    return (
      <ChromaTile
        as={ChromaAnchor}
        href={item.href}
        target={item.external ? '_blank' : undefined}
        rel={item.external ? 'noopener noreferrer' : undefined}
        {...props}
      >
        {children}
      </ChromaTile>
    );
  }

  return <ChromaTile {...props}>{children}</ChromaTile>;
}

export function ChromaShowcase({ items = [], accentColor = tokens.colors.primary, ariaLabel }) {
  return (
    <ChromaGrid aria-label={ariaLabel}>
      {items.map((item) => (
        <ChromaFrame key={item.title} item={item} accentColor={accentColor}>
          <Image
            src={item.image}
            alt=""
            fill
            sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw"
          />
          <ChromaContent>
            {item.kicker && <ChromaKicker>{item.kicker}</ChromaKicker>}
            <ChromaTitle>{item.title}</ChromaTitle>
            {item.description && <ChromaText>{item.description}</ChromaText>}
          </ChromaContent>
        </ChromaFrame>
      ))}
    </ChromaGrid>
  );
}

const ScrollStackShell = styled.div`
  position: relative;
  isolation: isolate;
`;

const ScrollStackTrack = styled.div`
  position: relative;
  display: grid;
  gap: clamp(5rem, 20vh, 11rem);
  padding: ${tokens.spacing.md} 0 clamp(4rem, 13vh, 8rem);

  &::before {
    content: '';
    position: absolute;
    top: 2rem;
    bottom: 7rem;
    left: 42px;
    width: 1px;
    background: linear-gradient(
      180deg,
      transparent,
      ${({ $color }) => `${$color || tokens.colors.primary}88`},
      transparent
    );
  }

  @media (max-width: 767px) {
    gap: ${tokens.spacing.lg};
    padding: 0;

    &::before {
      display: none;
    }
  }
`;

const StackSlide = styled.article`
  position: sticky;
  top: ${({ $index }) => `calc(84px + ${$index * 12}px)`};
  z-index: ${({ $index }) => 10 + $index};
  min-height: clamp(420px, 62vh, 640px);
  display: grid;
  grid-template-columns: 92px minmax(0, 1fr) minmax(260px, 0.56fr);
  gap: ${tokens.spacing.xl};
  align-items: stretch;
  overflow: hidden;
  padding: ${tokens.spacing['2xl']};
  color: ${tokens.colors.darkText};
  background:
    linear-gradient(115deg, rgba(255, 255, 255, 0.11), rgba(255, 255, 255, 0.035) 48%, rgba(255, 255, 255, 0.08)),
    linear-gradient(135deg, rgba(10, 10, 10, 0.99), rgba(20, 20, 20, 0.97));
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  ${clipTLBR(CHAMFER.xl)}
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.34);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    z-index: 0;
    opacity: 0.26;
    background:
      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255,255,255,0.07) 1px, transparent 1px);
    background-size: 34px 34px;
    mask-image: linear-gradient(90deg, #000, transparent 68%);
  }

  &::after {
    content: '';
    position: absolute;
    right: -12%;
    top: 0;
    width: 34%;
    height: 100%;
    opacity: 0.22;
    background: repeating-linear-gradient(
      -32deg,
      ${({ $color }) => `${$color || tokens.colors.primary}cc`} 0 2px,
      transparent 2px 12px
    );
    transform: skewX(-12deg);
  }

  @media (max-width: 900px) {
    grid-template-columns: 72px minmax(0, 1fr);
  }

  @media (max-width: 767px) {
    position: relative;
    top: auto;
    min-height: 0;
    grid-template-columns: 1fr;
    gap: ${tokens.spacing.lg};
    padding: ${tokens.spacing.xl};
  }
`;

const StackIndex = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes['5xl']};
  font-weight: ${tokens.fontWeights.black};
  line-height: 1;
  color: ${({ $color }) => $color || tokens.colors.primary};
  opacity: 0.86;

  @media (max-width: 767px) {
    position: absolute;
    top: ${tokens.spacing.lg};
    right: ${tokens.spacing.lg};
    font-size: ${tokens.fontSizes['4xl']};
    opacity: 0.1;
  }
`;

const StackCopy = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const StackKicker = styled.span`
  width: fit-content;
  margin-bottom: ${tokens.spacing.lg};
  padding: 6px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  background: ${({ $color }) => `${$color || tokens.colors.primary}1f`};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  letter-spacing: 0;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const StackTitle = styled.h3`
  max-width: 760px;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['4xl']};
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  letter-spacing: 0;
  overflow-wrap: anywhere;

  ${media.lg} {
    font-size: ${tokens.fontSizes['6xl']};
  }

  @media (max-width: 767px) {
    padding-right: ${tokens.spacing['3xl']};
    font-size: ${tokens.fontSizes['3xl']};
  }
`;

const StackHook = styled.p`
  max-width: 720px;
  margin-top: ${tokens.spacing.lg};
  color: rgba(245, 245, 245, 0.78);
  font-size: ${tokens.fontSizes.lg};
  line-height: ${tokens.lineHeights.relaxed};

  @media (max-width: 767px) {
    font-size: ${tokens.fontSizes.base};
  }
`;

const StackOutcome = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(180deg, ${({ $color }) => `${$color || tokens.colors.primary}24`}, rgba(255, 255, 255, 0.055)),
    rgba(255, 255, 255, 0.04);
  border-left: 3px solid ${({ $color }) => $color || tokens.colors.primary};
  ${clipBR(CHAMFER.lg)}

  @media (max-width: 900px) {
    grid-column: 2;
  }

  @media (max-width: 767px) {
    grid-column: auto;
    padding: ${tokens.spacing.lg};
    gap: ${tokens.spacing.lg};
    border-left: 0;
    border-top: 3px solid ${({ $color }) => $color || tokens.colors.primary};
  }
`;

const StackOutcomeLabel = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  letter-spacing: 0;
  text-transform: uppercase;
`;

const StackOutputs = styled.ul`
  display: grid;
  gap: ${tokens.spacing.sm};
  margin: 0;
`;

const StackOutput = styled.li`
  list-style: none;
  padding: 0 0 ${tokens.spacing.sm};
  color: ${tokens.colors.darkText};
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  border-bottom: 1px solid rgba(255, 255, 255, 0.12);

  &:last-child {
    padding-bottom: 0;
    border-bottom: 0;
  }

  @media (max-width: 767px) {
    font-size: ${tokens.fontSizes.lg};
  }
`;

const StackDecision = styled.div`
  display: grid;
  gap: ${tokens.spacing.md};

  @media (max-width: 767px) {
    display: none;
  }
`;

const StackDecisionTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  color: ${tokens.colors.darkText};
  letter-spacing: 0;
`;

const StackDecisionText = styled.p`
  color: rgba(245, 245, 245, 0.74);
  line-height: ${tokens.lineHeights.relaxed};

  @media (max-width: 767px) {
    display: none;
  }
`;

const StackProof = styled.ul`
  display: grid;
  gap: ${tokens.spacing.sm};

  @media (max-width: 767px) {
    display: none;
  }
`;

const StackProofItem = styled.li`
  display: grid;
  grid-template-columns: 18px minmax(0, 1fr);
  gap: ${tokens.spacing.sm};
  list-style: none;
  color: rgba(245, 245, 245, 0.78);
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '>';
    font-family: ${tokens.fonts.mono};
    color: ${({ $color }) => $color || tokens.colors.primaryLight};
  }
`;

const StackAction = styled.a`
  width: fit-content;
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
  padding: 12px 16px;
  color: #fff;
  text-decoration: none;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  background: ${({ $color }) => $color || tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
  transition:
    transform ${tokens.transitions.fast},
    background ${tokens.transitions.fast};

  &::after {
    content: '>';
    font-family: ${tokens.fonts.mono};
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }
`;

export function ScrollStackShowcase({
  items = [],
  accentColor = tokens.colors.primary,
  label = 'Scroll Stack',
  ctaHref,
  ctaLabel,
}) {
  if (!items.length) {
    return null;
  }

  return (
    <ScrollStackShell>
      <ScrollStackTrack role="list" aria-label={label} $color={accentColor}>
        {items.map((item, index) => {
          const outputs = item.outputs?.length ? item.outputs : item.flow?.slice(-3) || [];
          const href = item.ctaHref || ctaHref;

          return (
            <StackSlide key={item.title || index} role="listitem" $index={index} $color={accentColor}>
              <CyberCorners $color={tokens.colors.mint} $size={14} />
              <StackIndex $color={accentColor}>{String(index + 1).padStart(2, '0')}</StackIndex>

              <StackCopy>
                <StackKicker $color={accentColor}>{item.kicker || item.badge || `Case ${index + 1}`}</StackKicker>
                <StackTitle>{item.title}</StackTitle>
                <StackHook>{item.hook || item.teaser || item.description}</StackHook>
                {href && (
                  <StackAction
                    as={href.startsWith('/') ? Link : 'a'}
                    href={href}
                    target={href.startsWith('/') ? undefined : '_blank'}
                    rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                    $color={accentColor}
                  >
                    {item.ctaLabel || ctaLabel || 'Nächsten Schritt klären'}
                  </StackAction>
                )}
              </StackCopy>

              <StackOutcome $color={accentColor}>
                <div>
                  <StackOutcomeLabel $color={accentColor}>{item.surfaceLabel || item.badge || 'Output'}</StackOutcomeLabel>
                  {outputs.length > 0 && (
                    <StackOutputs>
                      {outputs.slice(0, 3).map((output) => (
                        <StackOutput key={output}>{output}</StackOutput>
                      ))}
                    </StackOutputs>
                  )}
                </div>

                <StackDecision>
                  {item.decisionTitle && <StackDecisionTitle>{item.decisionTitle}</StackDecisionTitle>}
                  {item.decisionText && <StackDecisionText>{item.decisionText}</StackDecisionText>}
                  {item.proof?.length > 0 && (
                    <StackProof>
                      {item.proof.slice(0, 2).map((proof) => (
                        <StackProofItem key={proof} $color={accentColor}>{proof}</StackProofItem>
                      ))}
                    </StackProof>
                  )}
                </StackDecision>
              </StackOutcome>
            </StackSlide>
          );
        })}
      </ScrollStackTrack>
    </ScrollStackShell>
  );
}

const CinemaShell = styled.div`
  position: relative;
  overflow: visible;
  color: ${tokens.colors.darkText};
  background:
    linear-gradient(125deg, rgba(255,255,255,0.08), transparent 38%),
    linear-gradient(180deg, rgba(10,10,10,0.98), rgba(5,5,5,1));
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}4f`};
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.38);

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: 0.18;
    pointer-events: none;
    background:
      linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px),
      linear-gradient(0deg, rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 42px 42px;
    mask-image: linear-gradient(180deg, #000, transparent 85%);
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: min(36%, 460px);
    height: 100%;
    opacity: 0.2;
    pointer-events: none;
    background: repeating-linear-gradient(
      -28deg,
      ${({ $color }) => `${$color || tokens.colors.primary}d9`} 0 2px,
      transparent 2px 14px
    );
  }

  @media (max-width: 767px) {
    &::after {
      width: 48%;
      opacity: 0.07;
    }
  }
`;

const CinemaIntro = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  gap: ${tokens.spacing.lg};
  padding: clamp(1.5rem, 5vw, 4.5rem) clamp(1.5rem, 5vw, 5rem) 0;

  ${media.lg} {
    grid-template-columns: minmax(0, 0.9fr) minmax(300px, 0.52fr);
    align-items: end;
  }

  @media (max-width: 767px) {
    gap: ${tokens.spacing.md};
    padding: ${tokens.spacing.md} ${tokens.spacing.lg} 0;
  }
`;

const CinemaEyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  background: ${({ $color }) => `${$color || tokens.colors.primary}1f`};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  text-transform: uppercase;
  letter-spacing: 0;
  ${clipBR(CHAMFER.xs)}
`;

const CinemaTitle = styled.h3`
  max-width: 960px;
  margin-top: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['6xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  letter-spacing: 0;

  @media (max-width: 767px) {
    margin-top: ${tokens.spacing.md};
    font-size: clamp(${tokens.fontSizes['2xl']}, 7vw, ${tokens.fontSizes['3xl']});
  }
`;

const CinemaText = styled.p`
  max-width: 760px;
  margin-top: ${tokens.spacing.md};
  color: rgba(245,245,245,0.72);
  font-size: ${tokens.fontSizes.lg};
  line-height: ${tokens.lineHeights.relaxed};

  @media (max-width: 767px) {
    font-size: ${tokens.fontSizes.sm};
    line-height: ${tokens.lineHeights.normal};
  }
`;

const CinemaCounter = styled.div`
  display: grid;
  gap: ${tokens.spacing.sm};
  color: rgba(245,245,245,0.64);
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0;

  span {
    display: block;
    font-family: ${tokens.fonts.display};
    font-size: clamp(${tokens.fontSizes['4xl']}, 6vw, ${tokens.fontSizes['7xl']});
    font-weight: ${tokens.fontWeights.black};
    line-height: 0.9;
    color: ${({ $color }) => $color || tokens.colors.primary};
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const CinemaStackFrame = styled.div`
  position: relative;
  z-index: 1;
  margin-top: clamp(2rem, 5vw, 4.5rem);
  min-height: ${({ $count }) => `clamp(${980 + ($count || 3) * 160}px, ${112 + ($count || 3) * 24}vh, ${1240 + ($count || 3) * 190}px)`};

  @media (max-width: 767px) {
    margin-top: ${tokens.spacing.lg};
    min-height: 0;
  }
`;

const CinemaStackStage = styled.div`
  position: sticky;
  z-index: 2;
  top: 76px;
  width: 100%;
  height: min(780px, calc(100svh - 96px));
  min-height: 640px;
  overflow-x: hidden;
  overflow-y: hidden;
  border-top: 1px solid rgba(255,255,255,0.1);
  transform: translateZ(0);
  touch-action: pan-y;
  isolation: isolate;
  contain: layout paint style;
  will-change: transform;

  @media (max-width: 767px) {
    position: relative;
    top: auto;
    height: auto;
    min-height: 0;
    overflow-x: auto;
    overflow-y: visible;
    scroll-snap-type: x mandatory;
    scroll-padding-inline: ${tokens.spacing.lg};
    border-top: 0;
    -webkit-overflow-scrolling: touch;

    &::-webkit-scrollbar {
      display: none;
    }
  }

  ${media.lg} {
    top: 92px;
  }
`;

const CinemaStackCardLayer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  padding: clamp(4.5rem, 13vh, 6.5rem) clamp(1.5rem, 5vw, 5rem) clamp(1.5rem, 4vh, 2.5rem);

  @media (max-width: 767px) {
    display: flex;
    gap: ${tokens.spacing.md};
    width: max-content;
    height: auto;
    padding: 0 ${tokens.spacing.lg} ${tokens.spacing.sm};
  }
`;

const CinemaStackNav = styled.div`
  position: absolute;
  z-index: 80;
  top: 28px;
  right: clamp(1rem, 3vw, 2rem);
  display: grid;
  gap: 8px;
  width: fit-content;

  @media (max-width: 767px) {
    position: relative;
    top: auto;
    right: auto;
    z-index: 1;
    grid-auto-flow: column;
    justify-content: start;
    margin: 0 0 ${tokens.spacing.md} ${tokens.spacing.lg};
  }
`;

const CinemaStackButton = styled.button`
  display: grid;
  place-items: center;
  width: 34px;
  height: 34px;
  padding: 0;
  color: rgba(245,245,245,0.56);
  background: rgba(255,255,255,0.07);
  border: 1px solid rgba(255,255,255,0.14);
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  font-weight: ${tokens.fontWeights.black};
  cursor: pointer;
  ${clipBR(CHAMFER.xs)}
  transition: none;

  &[aria-current='true'] {
    color: ${tokens.colors.darkText};
    background: ${({ $color }) => $color || tokens.colors.primary};
    border-color: ${({ $color }) => $color || tokens.colors.primary};
  }
`;

const CinemaCase = styled.article`
  position: absolute;
  inset: clamp(1.5rem, 4vw, 3rem) clamp(1.5rem, 5vw, 5rem);
  z-index: 1;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  min-width: 0;
  padding: clamp(1.5rem, 2.8vw, 2.5rem);
  overflow: hidden;
  background:
    linear-gradient(115deg, rgba(255,255,255,0.075), rgba(255,255,255,0.025) 48%, rgba(255,255,255,0.055)),
    linear-gradient(180deg, rgba(16,16,16,0.99), rgba(8,8,8,0.995));
  border: 1px solid ${({ $active, $color }) => ($active ? `${$color || tokens.colors.primary}88` : 'rgba(255,255,255,0.13)')};
  transform-origin: top center;
  transform-style: preserve-3d;
  backface-visibility: hidden;
  will-change: transform, opacity;
  ${clipTLBR(CHAMFER.xl)}
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.03) inset,
    0 28px 82px rgba(0,0,0,0.42);
  transition:
    transform 680ms cubic-bezier(0.22, 1, 0.36, 1),
    border-color ${tokens.transitions.base};

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    opacity: ${({ $active }) => ($active ? 0.34 : 0.08)};
    pointer-events: none;
    background: linear-gradient(105deg, ${({ $color }) => `${$color || tokens.colors.primary}26`}, transparent 42%);
    transition: opacity ${tokens.transitions.base};
  }

  > * {
    transition: opacity 180ms ease;
  }

  &[data-active='false'] > * {
    opacity: 0;
  }

  ${media.lg} {
    grid-template-columns: minmax(0, 0.94fr) minmax(420px, 0.86fr);
    align-items: center;
  }

  @media (max-width: 767px) {
    position: relative;
    inset: auto;
    flex: 0 0 min(86vw, 420px);
    min-height: 620px;
    align-content: start;
    gap: ${tokens.spacing.md};
    padding: ${tokens.spacing.lg};
    scroll-snap-align: start;
    scroll-snap-stop: always;
    transform: none !important;
    opacity: 1 !important;
    pointer-events: auto !important;
  }
`;

const CinemaCaseCopy = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  max-width: 760px;
`;

const CinemaCaseNumber = styled.div`
  margin-bottom: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.mono};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${({ $color }) => $color || tokens.colors.primary};
  line-height: 0.9;
  will-change: transform;
  transition: transform ${tokens.transitions.smooth};

  @media (hover: none), (prefers-reduced-motion: reduce) {
    transform: none !important;
  }

  @media (max-width: 767px) {
    margin-bottom: ${tokens.spacing.md};
    font-size: ${tokens.fontSizes['3xl']};
  }
`;

const CinemaCaseTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 3.35vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  letter-spacing: 0;
  overflow-wrap: anywhere;
  will-change: transform;
  transition: transform ${tokens.transitions.smooth};

  @media (hover: none), (prefers-reduced-motion: reduce) {
    transform: none !important;
  }

  @media (max-width: 767px) {
    font-size: clamp(${tokens.fontSizes['2xl']}, 7.4vw, ${tokens.fontSizes['4xl']});
  }
`;

const CinemaCaseHook = styled.p`
  max-width: 720px;
  margin-top: ${tokens.spacing.md};
  color: rgba(245,245,245,0.78);
  font-size: clamp(${tokens.fontSizes.base}, 1.25vw, ${tokens.fontSizes.lg});
  line-height: ${tokens.lineHeights.relaxed};
  will-change: transform;
  transition: transform ${tokens.transitions.smooth};

  @media (hover: none), (prefers-reduced-motion: reduce) {
    transform: none !important;
  }

  @media (max-width: 767px) {
    margin-top: ${tokens.spacing.sm};
    font-size: ${tokens.fontSizes.base};
    line-height: ${tokens.lineHeights.normal};
  }
`;

const CinemaActList = styled.ol`
  display: grid;
  gap: ${tokens.spacing.md};
  max-width: 760px;
  margin-top: ${tokens.spacing.xl};

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: ${tokens.spacing.md};
    margin-top: ${tokens.spacing.lg};
  }

  @media (max-width: 767px) {
    gap: 10px;
    margin-top: ${tokens.spacing.md};
  }
`;

const CinemaAct = styled.li`
  display: grid;
  grid-template-columns: 54px minmax(0, 1fr);
  gap: ${tokens.spacing.lg};
  list-style: none;
  align-items: start;

  ${media.lg} {
    grid-template-columns: 1fr;
    gap: ${tokens.spacing.sm};
  }

  @media (max-width: 767px) {
    grid-template-columns: 40px minmax(0, 1fr);
    gap: ${tokens.spacing.md};

    &:nth-child(n + 2) {
      display: none;
    }
  }
`;

const CinemaActIndex = styled.span`
  display: grid;
  place-items: center;
  width: 42px;
  height: 42px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.darkText};
  background: ${({ $color }) => $color || tokens.colors.primary};
  ${clipBR(CHAMFER.xs)}

  ${media.lg} {
    width: 36px;
    height: 36px;
  }

  @media (max-width: 767px) {
    width: 34px;
    height: 34px;
  }
`;

const CinemaActLabel = styled.span`
  display: block;
  margin-bottom: 3px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  text-transform: uppercase;
  letter-spacing: 0;
`;

const CinemaActText = styled.p`
  color: rgba(245,245,245,0.78);
  line-height: ${tokens.lineHeights.relaxed};

  ${media.lg} {
    font-size: ${tokens.fontSizes.sm};
    line-height: ${tokens.lineHeights.normal};
  }

  @media (max-width: 767px) {
    font-size: ${tokens.fontSizes.sm};
    line-height: ${tokens.lineHeights.normal};
  }
`;

const CinemaProof = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.lg};

  span {
    color: rgba(245,245,245,0.7);
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    text-transform: uppercase;
    letter-spacing: 0;
  }

  span::before {
    content: '>';
    margin-right: ${tokens.spacing.sm};
    color: ${({ $color }) => $color || tokens.colors.primaryLight};
  }

  @media (max-width: 767px) {
    display: none;
  }
`;

const CinemaAction = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  width: fit-content;
  margin-top: ${tokens.spacing.xl};
  padding: 13px 17px;
  color: #fff;
  text-decoration: none;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  background: ${({ $color }) => $color || tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
  transition:
    transform ${tokens.transitions.fast},
    filter ${tokens.transitions.fast};

  &::after {
    content: '>';
    font-family: ${tokens.fonts.mono};
  }

  &:hover {
    transform: translateY(-2px);
    filter: brightness(0.95);
  }

  @media (max-width: 767px) {
    margin-top: ${tokens.spacing.md};
    padding: 11px 13px;
    font-size: ${tokens.fontSizes.xs};
  }
`;

const CinemaVisual = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  align-self: center;
  justify-self: stretch;

  @media (max-width: 767px) {
    align-self: end;
  }
`;

const CinemaDeck = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${tokens.colors.darkMid};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}88`};
  ${clipTLBR(CHAMFER.lg)}
  box-shadow:
    14px 14px 0 ${({ $color }) => `${$color || tokens.colors.primary}24`},
    0 34px 80px rgba(0,0,0,0.34);
  transform: none;

  img {
    object-fit: cover;
  }

  @media (max-width: 767px) {
    aspect-ratio: 16 / 4.8;
    box-shadow: 10px 10px 0 ${({ $color }) => `${$color || tokens.colors.primary}22`};
  }
`;

const CinemaDeckMeta = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.lg};
  color: rgba(245,245,245,0.6);
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  text-transform: uppercase;
  letter-spacing: 0;

  @media (max-width: 767px) {
    display: none;
  }
`;

export function ProjectCinemaShowcase({
  projects = [],
  accentColor = tokens.colors.primary,
  eyebrow = 'Echte Abschlussprojekte',
  title = 'Was KI-Manager wirklich bauen.',
  text = 'Drei reale Teilnehmerprojekte, die zeigen: Es geht nicht um Tool-Demos, sondern um Entscheidungen, Reibung, Systeme und sichtbare Ergebnisse.',
  ctaHref,
  ctaLabel,
}) {
  const frameRef = React.useRef(null);
  const stageRef = React.useRef(null);
  const rafRef = React.useRef(null);
  const activeIndexRef = React.useRef(0);
  const snapTimeoutRef = React.useRef(null);
  const snapLockRef = React.useRef(false);
  const snapLockTimeoutRef = React.useRef(null);
  const [activeIndex, setActiveIndex] = React.useState(0);

  const maxProjectIndex = Math.max(projects.length - 1, 0);

  const setActiveProject = React.useCallback((index) => {
    if (activeIndexRef.current === index) {
      return;
    }

    activeIndexRef.current = index;
    setActiveIndex(index);
  }, []);

  const getStickyOffset = React.useCallback(() => {
    const stage = stageRef.current;

    if (stage) {
      const measuredTop = Number.parseFloat(window.getComputedStyle(stage).top);

      if (Number.isFinite(measuredTop)) {
        return measuredTop;
      }
    }

    return window.matchMedia('(max-width: 767px)').matches ? 84 : 92;
  }, []);

  const isMobileStack = React.useCallback(() => (
    window.matchMedia('(max-width: 767px)').matches
  ), []);

  const getStackMetrics = React.useCallback(() => {
    const frame = frameRef.current;
    const stage = stageRef.current;

    if (!frame || !stage) {
      return null;
    }

    const frameRect = frame.getBoundingClientRect();
    const stickyOffset = getStickyOffset();
    const frameTop = window.scrollY + frameRect.top;
    const scrollDistance = Math.max(1, frame.offsetHeight - stage.offsetHeight);
    const startY = frameTop - stickyOffset;
    const endY = startY + scrollDistance;
    const rawProgress = maxProjectIndex === 0
      ? 0
      : ((window.scrollY - startY) / scrollDistance) * maxProjectIndex;
    const progress = Math.max(0, Math.min(maxProjectIndex, rawProgress));

    return {
      endY,
      frameRect,
      progress,
      scrollDistance,
      startY,
      stickyOffset,
    };
  }, [getStickyOffset, maxProjectIndex]);

  const updateActiveFromPageScroll = React.useCallback(() => {
    if (isMobileStack()) {
      return;
    }

    const metrics = getStackMetrics();

    if (!metrics) {
      return;
    }

    const { frameRect, progress } = metrics;

    if (frameRect.top > window.innerHeight * 0.9 || frameRect.bottom < window.innerHeight * 0.1) {
      return;
    }

    setActiveProject(Math.round(progress));
  }, [getStackMetrics, isMobileStack, setActiveProject]);

  const releaseSnapLock = React.useCallback(() => {
    if (snapLockTimeoutRef.current) {
      window.clearTimeout(snapLockTimeoutRef.current);
    }

    snapLockTimeoutRef.current = window.setTimeout(() => {
      snapLockRef.current = false;
      snapLockTimeoutRef.current = null;
      updateActiveFromPageScroll();
    }, 720);
  }, [updateActiveFromPageScroll]);

  const scrollToProject = React.useCallback((index, behavior = 'instant') => {
    const nextIndex = Math.max(0, Math.min(maxProjectIndex, index));
    const stage = stageRef.current;

    if (stage && isMobileStack()) {
      const targetCard = stage.querySelector(`[data-cinema-index="${nextIndex}"]`);

      if (targetCard) {
        setActiveProject(nextIndex);
        stage.scrollTo({
          left: Math.max(0, targetCard.offsetLeft - 24),
          behavior: behavior === 'instant' ? 'smooth' : behavior,
        });
      }

      return;
    }

    const metrics = getStackMetrics();

    if (!metrics) {
      return;
    }

    const targetTop = maxProjectIndex === 0
      ? metrics.startY
      : metrics.startY + (metrics.scrollDistance * (nextIndex / maxProjectIndex));

    snapLockRef.current = true;
    setActiveProject(nextIndex);
    window.scrollTo({ top: Math.max(0, targetTop), behavior });
    releaseSnapLock();
  }, [getStackMetrics, isMobileStack, maxProjectIndex, releaseSnapLock, setActiveProject]);

  const snapToNearestProject = React.useCallback(() => {
    if (snapLockRef.current || maxProjectIndex < 1 || isMobileStack()) {
      return;
    }

    const metrics = getStackMetrics();

    if (!metrics) {
      return;
    }

    const { endY, frameRect, progress, scrollDistance, startY, stickyOffset } = metrics;
    const stackIsPinned = window.scrollY > startY + 24
      && window.scrollY < endY - 24
      && frameRect.top <= stickyOffset + 24
      && frameRect.bottom >= stickyOffset + 160;

    if (!stackIsPinned) {
      return;
    }

    const nearestIndex = Math.max(0, Math.min(maxProjectIndex, Math.round(progress)));
    const targetTop = startY + (scrollDistance * (nearestIndex / maxProjectIndex));

    if (nearestIndex === 0 && window.scrollY < targetTop - 16) {
      return;
    }

    if (nearestIndex === maxProjectIndex && window.scrollY > targetTop + 16) {
      return;
    }

    if (Math.abs(window.scrollY - targetTop) < 18) {
      return;
    }

    scrollToProject(nearestIndex);
  }, [getStackMetrics, isMobileStack, maxProjectIndex, scrollToProject]);

  const scheduleSnap = React.useCallback(() => {
    if (snapLockRef.current) {
      return;
    }

    if (snapTimeoutRef.current) {
      window.clearTimeout(snapTimeoutRef.current);
    }

    snapTimeoutRef.current = window.setTimeout(() => {
      snapTimeoutRef.current = null;
      snapToNearestProject();
    }, 150);
  }, [snapToNearestProject]);

  const requestScrollSync = React.useCallback(() => {
    if (!snapLockRef.current && !isMobileStack()) {
      scheduleSnap();
    }

    if (rafRef.current) {
      return;
    }

    rafRef.current = requestAnimationFrame(() => {
      rafRef.current = null;
      updateActiveFromPageScroll();
    });
  }, [isMobileStack, scheduleSnap, updateActiveFromPageScroll]);

  const handleStageScroll = React.useCallback((event) => {
    if (!isMobileStack()) {
      return;
    }

    const stage = event.currentTarget;
    const cards = Array.from(stage.querySelectorAll('[data-cinema-index]'));

    if (!cards.length) {
      return;
    }

    const stageLeft = stage.getBoundingClientRect().left + 24;
    let nearestIndex = activeIndexRef.current;
    let nearestDistance = Number.POSITIVE_INFINITY;

    cards.forEach((card) => {
      const cardIndex = Number(card.getAttribute('data-cinema-index'));
      const distance = Math.abs(card.getBoundingClientRect().left - stageLeft);

      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = cardIndex;
      }
    });

    setActiveProject(nearestIndex);
  }, [isMobileStack, setActiveProject]);

  React.useLayoutEffect(() => {
    const initialFrame = requestAnimationFrame(updateActiveFromPageScroll);

    window.addEventListener('scroll', requestScrollSync, { passive: true });
    window.addEventListener('resize', requestScrollSync);

    return () => {
      cancelAnimationFrame(initialFrame);
      window.removeEventListener('scroll', requestScrollSync);
      window.removeEventListener('resize', requestScrollSync);

      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }

      if (snapTimeoutRef.current) {
        window.clearTimeout(snapTimeoutRef.current);
        snapTimeoutRef.current = null;
      }

      if (snapLockTimeoutRef.current) {
        window.clearTimeout(snapLockTimeoutRef.current);
        snapLockTimeoutRef.current = null;
      }
    };
  }, [requestScrollSync, updateActiveFromPageScroll]);

  const getCardStyle = React.useCallback((index) => {
    const relativeIndex = index - activeIndex;
    const absDistance = Math.abs(relativeIndex);
    const activeDistance = Math.abs(index - activeIndex);
    const clampedDistance = Math.min(absDistance, 2.4);
    const translateY = relativeIndex < 0
      ? -34 * clampedDistance
      : 58 * clampedDistance;
    const scale = relativeIndex === 0
      ? 1
      : Math.max(0.86, 1 - clampedDistance * (relativeIndex < 0 ? 0.055 : 0.04));
    const opacity = activeDistance === 0
      ? 1
      : relativeIndex < 0
        ? Math.max(0, 0.18 - activeDistance * 0.06)
        : Math.max(0.12, 0.38 - activeDistance * 0.1);

    return {
      zIndex: Math.round(50 - clampedDistance * 8 - (relativeIndex > 0 ? 2 : 0)),
      opacity,
      pointerEvents: activeDistance === 0 ? 'auto' : 'none',
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
    };
  }, [activeIndex]);

  if (!projects.length) {
    return null;
  }

  return (
    <CinemaShell $color={accentColor}>
      <CyberCorners $color={tokens.colors.mint} $size={16} />
      <CinemaIntro>
        <div>
          <CinemaEyebrow $color={accentColor}>{eyebrow}</CinemaEyebrow>
          <CinemaTitle>{title}</CinemaTitle>
          <CinemaText>{text}</CinemaText>
        </div>
        <CinemaCounter $color={accentColor}>
          <span>{String(projects.length).padStart(2, '0')}</span>
          reale Projekt-Decks
        </CinemaCounter>
      </CinemaIntro>

      <CinemaStackFrame ref={frameRef} $count={projects.length}>
        <CinemaStackStage ref={stageRef} aria-label="Projektbeispiele" onScroll={handleStageScroll}>
          <CinemaStackNav aria-label="Projekt wechseln">
            {projects.map((project, index) => (
              <CinemaStackButton
                key={project.title || index}
                type="button"
                $active={activeIndex === index}
                $color={accentColor}
                aria-label={`Projekt ${index + 1}: ${project.title}`}
                aria-current={activeIndex === index ? 'true' : undefined}
                onClick={() => scrollToProject(index)}
              >
                {String(index + 1).padStart(2, '0')}
              </CinemaStackButton>
            ))}
          </CinemaStackNav>

          <CinemaStackCardLayer>
          {projects.map((project, index) => {
            const href = project.href || ctaHref;
            const LinkTag = href?.startsWith('/') ? Link : 'a';
            const isActive = activeIndex === index;

            return (
              <CinemaCase
                key={project.title || index}
                $active={isActive}
                $color={accentColor}
                data-active={isActive ? 'true' : 'false'}
                data-cinema-index={index}
                style={getCardStyle(index)}
              >
                <CinemaCaseCopy>
                  <CinemaCaseNumber $color={accentColor}>
                    {String(index + 1).padStart(2, '0')}
                  </CinemaCaseNumber>
                  <CinemaEyebrow $color={accentColor}>{project.kicker || 'Teilnehmerprojekt'}</CinemaEyebrow>
                  <CinemaCaseTitle>{project.title}</CinemaCaseTitle>
                  <CinemaCaseHook>{project.hook}</CinemaCaseHook>

                  {project.acts?.length > 0 && (
                    <CinemaActList>
                      {project.acts.map((act, actIndex) => (
                        <CinemaAct key={act.label || act.text}>
                          <CinemaActIndex $color={accentColor}>{String(actIndex + 1).padStart(2, '0')}</CinemaActIndex>
                          <div>
                            <CinemaActLabel $color={accentColor}>{act.label}</CinemaActLabel>
                            <CinemaActText>{act.text}</CinemaActText>
                          </div>
                        </CinemaAct>
                      ))}
                    </CinemaActList>
                  )}

                  {project.proof?.length > 0 && (
                    <CinemaProof $color={accentColor}>
                      {project.proof.map((proof) => (
                        <span key={proof}>{proof}</span>
                      ))}
                    </CinemaProof>
                  )}

                  {href && (
                    <CinemaAction
                      as={LinkTag}
                      href={href}
                      target={href.startsWith('/') ? undefined : '_blank'}
                      rel={href.startsWith('/') ? undefined : 'noopener noreferrer'}
                      $color={accentColor}
                    >
                      {project.ctaLabel || ctaLabel || 'Projekt einordnen lassen'}
                    </CinemaAction>
                  )}
                </CinemaCaseCopy>

                <CinemaVisual>
                  <CinemaDeck $color={accentColor}>
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={project.imageAlt || ''}
                        fill
                        sizes="(min-width: 1024px) 44vw, 100vw"
                      />
                    )}
                  </CinemaDeck>
                  <CinemaDeckMeta>
                    <span>{project.deckLabel || 'KI-Manager Abschlussdeck'}</span>
                    <span>{project.deckMeta || 'Teilnehmerprojekt'}</span>
                  </CinemaDeckMeta>
                </CinemaVisual>
              </CinemaCase>
            );
          })}
          </CinemaStackCardLayer>
        </CinemaStackStage>
      </CinemaStackFrame>
    </CinemaShell>
  );
}

const LabShell = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  min-height: 620px;
  overflow: hidden;
  background:
    linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 20, 0.96)),
    ${tokens.colors.dark};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}55`};
  ${clipTLBR(CHAMFER.xl)}
  box-shadow: ${tokens.shadows.xl};

  ${media.lg} {
    grid-template-columns: 310px minmax(0, 1fr);
  }
`;

const LabChooser = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  gap: ${tokens.spacing.sm};
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  padding: ${tokens.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.lg} {
    flex-direction: column;
    overflow: visible;
    border-bottom: 0;
    border-right: 1px solid rgba(255, 255, 255, 0.1);
  }
`;

const LabChoice = styled.button`
  position: relative;
  min-width: min(78vw, 280px);
  scroll-snap-align: start;
  display: grid;
  gap: ${tokens.spacing.xs};
  padding: ${tokens.spacing.md};
  color: inherit;
  text-align: left;
  background: ${({ $active, $color }) => ($active ? `${$color || tokens.colors.primary}24` : 'rgba(255,255,255,0.055)')};
  border: 1px solid ${({ $active, $color }) => ($active ? `${$color || tokens.colors.primary}88` : 'rgba(255,255,255,0.09)')};
  cursor: pointer;
  ${clipBR(CHAMFER.sm)}
  transition:
    transform ${tokens.transitions.fast},
    border-color ${tokens.transitions.fast},
    background ${tokens.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    border-color: ${({ $color }) => `${$color || tokens.colors.primary}88`};
  }

  ${media.lg} {
    min-width: 0;
  }
`;

const LabChoiceKicker = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const LabChoiceTitle = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  color: ${tokens.colors.darkText};
`;

const LabChoiceText = styled.span`
  color: rgba(245, 245, 245, 0.64);
  font-size: ${tokens.fontSizes.sm};
  line-height: ${tokens.lineHeights.relaxed};
`;

const LabStage = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.lg};

  ${media.md} {
    padding: ${tokens.spacing['2xl']};
  }

  ${media.xl} {
    grid-template-columns: minmax(0, 1fr) 330px;
    align-items: stretch;
  }
`;

const LabMain = styled.div`
  min-width: 0;
`;

const LabTopline = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  align-items: center;
  margin-bottom: ${tokens.spacing.lg};
`;

const LabBadge = styled.span`
  padding: 6px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}55`};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const LabTitle = styled.h3`
  max-width: 900px;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  letter-spacing: 0;
`;

const LabHook = styled.p`
  max-width: 760px;
  margin-top: ${tokens.spacing.md};
  color: rgba(245, 245, 245, 0.78);
  font-size: clamp(${tokens.fontSizes.base}, 1.5vw, ${tokens.fontSizes.lg});
  line-height: ${tokens.lineHeights.relaxed};
`;

const WorkSurface = styled.div`
  position: relative;
  min-width: 0;
  margin-top: ${tokens.spacing.xl};
  overflow: hidden;
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.12);
  ${clipBR(CHAMFER.lg)}
`;

const SurfaceHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  background: rgba(0, 0, 0, 0.24);
`;

const SurfaceLabel = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: rgba(245, 245, 245, 0.68);
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const SurfaceStatus = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.mint};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const FlowGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  padding: ${tokens.spacing.lg};

  ${media.lg} {
    grid-template-columns: 0.82fr 1.18fr;
  }
`;

const InputPanel = styled.div`
  min-width: 0;
  padding: ${tokens.spacing.lg};
  background: rgba(255, 255, 255, 0.06);
  border-left: 3px solid ${({ $color }) => $color || tokens.colors.primary};
`;

const PanelLabel = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const InputList = styled.ul`
  display: grid;
  gap: ${tokens.spacing.sm};
`;

const InputItem = styled.li`
  display: grid;
  grid-template-columns: 14px minmax(0, 1fr);
  gap: ${tokens.spacing.sm};
  color: rgba(245, 245, 245, 0.78);
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '';
    width: 8px;
    height: 8px;
    margin-top: 0.55em;
    background: ${({ $color }) => $color || tokens.colors.primary};
    ${clipBR(2)}
    transform: rotate(45deg);
  }
`;

const FlowPanel = styled.div`
  min-width: 0;
`;

const FlowNodes = styled.ol`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.sm};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const FlowNode = styled.li`
  position: relative;
  min-width: 0;
  list-style: none;
  padding: ${tokens.spacing.md};
  background: rgba(255, 255, 255, 0.065);
  border: 1px solid rgba(255, 255, 255, 0.12);
  ${clipBR(CHAMFER.sm)}

  &::before {
    content: attr(data-step);
    display: block;
    margin-bottom: ${tokens.spacing.sm};
    font-family: ${tokens.fonts.mono};
    font-size: 10px;
    color: ${({ $color }) => $color || tokens.colors.primaryLight};
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }
`;

const FlowNodeTitle = styled.span`
  display: block;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.darkText};
  line-height: ${tokens.lineHeights.snug};
`;

const OutputStrip = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const OutputPill = styled.span`
  padding: 7px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.darkText};
  background: ${({ $color }) => `${$color || tokens.colors.primary}26`};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const DecisionPanel = styled.aside`
  position: relative;
  min-width: 0;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $color }) => `${$color || tokens.colors.primary}24`}, rgba(255,255,255,0.055)),
    rgba(255, 255, 255, 0.05);
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}55`};
  ${clipTLBR(CHAMFER.lg)}
`;

const DecisionKicker = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const DecisionTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 2.2vw, ${tokens.fontSizes['3xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.darkText};
  line-height: ${tokens.lineHeights.snug};
`;

const DecisionText = styled.p`
  margin-top: ${tokens.spacing.md};
  color: rgba(245, 245, 245, 0.76);
  line-height: ${tokens.lineHeights.relaxed};
`;

const ProofList = styled.ul`
  display: grid;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const ProofItem = styled.li`
  display: grid;
  grid-template-columns: 16px minmax(0, 1fr);
  gap: ${tokens.spacing.sm};
  color: rgba(245, 245, 245, 0.78);
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '>';
    font-family: ${tokens.fonts.mono};
    color: ${({ $color }) => $color || tokens.colors.primaryLight};
  }
`;

const LabAction = styled.a`
  display: inline-flex;
  width: fit-content;
  margin-top: ${tokens.spacing.xl};
  padding: 12px 16px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  background: ${({ $color }) => $color || tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
`;

export function DecisionLab({
  items = [],
  accentColor = tokens.colors.primary,
  accentBg = tokens.colors.primaryLighter,
  label = 'Live Lab',
  ctaHref,
  ctaLabel,
}) {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const active = items[activeIndex] || items[0] || {};

  return (
    <LabShell $color={accentColor}>
      <CyberCorners $color={tokens.colors.mint} $size={14} />
      <LabChooser aria-label={label}>
        {items.map((item, index) => (
          <LabChoice
            key={item.title}
            type="button"
            $active={activeIndex === index}
            $color={accentColor}
            aria-pressed={activeIndex === index}
            onClick={() => setActiveIndex(index)}
          >
            <LabChoiceKicker $color={accentColor}>{item.kicker || `Case ${index + 1}`}</LabChoiceKicker>
            <LabChoiceTitle>{item.title}</LabChoiceTitle>
            <LabChoiceText>{item.teaser}</LabChoiceText>
          </LabChoice>
        ))}
      </LabChooser>

      <LabStage>
        <LabMain>
          <LabTopline>
            <LabBadge $color={accentColor}>{label}</LabBadge>
            {active.badge && <LabBadge $color={accentColor}>{active.badge}</LabBadge>}
          </LabTopline>
          <LabTitle>{active.title}</LabTitle>
          <LabHook>{active.hook}</LabHook>

          <WorkSurface>
            <SurfaceHeader>
              <SurfaceLabel>{active.surfaceLabel || 'Projektansicht'}</SurfaceLabel>
              <SurfaceStatus $color={accentColor}>{active.status || 'Prototype ready'}</SurfaceStatus>
            </SurfaceHeader>
            <FlowGrid>
              <InputPanel $color={accentColor}>
                <PanelLabel $color={accentColor}>{active.inputLabel || 'Input'}</PanelLabel>
                <InputList>
                  {(active.inputs || []).map((input) => (
                    <InputItem key={input} $color={accentColor}>{input}</InputItem>
                  ))}
                </InputList>
              </InputPanel>

              <FlowPanel>
                <PanelLabel $color={accentColor}>{active.flowLabel || 'Ablauf'}</PanelLabel>
                <FlowNodes>
                  {(active.flow || []).map((step, index) => (
                    <FlowNode key={step} data-step={`Step ${String(index + 1).padStart(2, '0')}`} $color={accentColor}>
                      <FlowNodeTitle>{step}</FlowNodeTitle>
                    </FlowNode>
                  ))}
                </FlowNodes>
                <OutputStrip>
                  {(active.outputs || []).map((output) => (
                    <OutputPill key={output} $color={accentColor}>{output}</OutputPill>
                  ))}
                </OutputStrip>
              </FlowPanel>
            </FlowGrid>
          </WorkSurface>
        </LabMain>

        <DecisionPanel $color={accentColor}>
          <CyberCorners $color={tokens.colors.mint} $size={9} $revealOnHover />
          <DecisionKicker $color={accentColor}>Entscheidung</DecisionKicker>
          <DecisionTitle>{active.decisionTitle}</DecisionTitle>
          <DecisionText>{active.decisionText}</DecisionText>
          <ProofList>
            {(active.proof || []).map((item) => (
              <ProofItem key={item} $color={accentColor}>{item}</ProofItem>
            ))}
          </ProofList>
          {(active.ctaHref || ctaHref) && (
            <LabAction
              href={active.ctaHref || ctaHref}
              target={(active.ctaHref || ctaHref)?.startsWith('/') ? undefined : '_blank'}
              rel={(active.ctaHref || ctaHref)?.startsWith('/') ? undefined : 'noopener noreferrer'}
              $color={accentColor}
            >
              {active.ctaLabel || ctaLabel || 'Nächsten Schritt klären'}
            </LabAction>
          )}
        </DecisionPanel>
      </LabStage>
    </LabShell>
  );
}

const FreebieFrame = styled.div`
  position: relative;
`;

const FreebieShell = styled.div`
  position: relative;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1fr;
  gap: clamp(1.5rem, 4vw, 3.5rem);
  padding: clamp(1.5rem, 4vw, 3.5rem);
  background:
    linear-gradient(125deg, ${({ $color }) => `${$color || tokens.colors.primary}1f`}, transparent 42%),
    linear-gradient(180deg, rgba(16,16,16,0.99), rgba(8,8,8,0.995));
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  ${clipTLBR(CHAMFER.xl)}
  box-shadow:
    0 28px 90px rgba(0,0,0,0.32),
    0 0 0 1px rgba(255,255,255,0.04) inset;

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background:
      linear-gradient(rgba(255,255,255,0.035) 1px, transparent 1px),
      linear-gradient(90deg, rgba(255,255,255,0.035) 1px, transparent 1px);
    background-size: 48px 48px;
    mask-image: linear-gradient(90deg, rgba(0,0,0,0.35), transparent 72%);
  }

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 0;
    width: min(34%, 420px);
    height: 100%;
    pointer-events: none;
    opacity: 0.18;
    background: repeating-linear-gradient(
      -28deg,
      ${({ $color }) => `${$color || tokens.colors.primary}d9`} 0 2px,
      transparent 2px 14px
    );
  }

  ${media.md} {
    padding: ${tokens.spacing['2xl']};
  }

  ${media.lg} {
    grid-template-columns: minmax(320px, 0.72fr) minmax(0, 1fr);
    align-items: stretch;
  }
`;

const FreebieIntro = styled.div`
  position: relative;
  z-index: 1;
  display: grid;
  align-content: start;
  gap: clamp(1.5rem, 4vw, 3rem);
`;

const FreebieKicker = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 6px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color || tokens.colors.primary};
  background: ${({ $color }) => `${$color || tokens.colors.primary}1f`};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  letter-spacing: 0;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const FreebieTitle = styled.h3`
  max-width: 620px;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3.1vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  letter-spacing: 0;
  hyphens: auto;
  text-wrap: balance;

  @media (max-width: 767px) {
    font-size: clamp(${tokens.fontSizes['2xl']}, 7vw, ${tokens.fontSizes['3xl']});
  }
`;

const FreebieText = styled.p`
  max-width: 520px;
  margin-top: ${tokens.spacing.md};
  color: rgba(245,245,245,0.72);
  line-height: ${tokens.lineHeights.relaxed};
`;

const Terminal = styled.div`
  position: relative;
  z-index: 1;
  min-width: 0;
  overflow: hidden;
  align-self: stretch;
  background: rgba(255,255,255,0.045);
  border: 1px solid rgba(255,255,255,0.12);
  ${clipBR(CHAMFER.lg)}
  box-shadow: 0 18px 54px rgba(0,0,0,0.22);
`;

const TerminalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg} ${tokens.spacing.lg} ${tokens.spacing.md};
  border-bottom: 1px solid rgba(255,255,255,0.09);
`;

const TerminalLabel = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: rgba(245,245,245,0.66);
  letter-spacing: 0;
  text-transform: uppercase;
`;

const ResourceList = styled.div`
  display: grid;
  padding: ${tokens.spacing.sm};
`;

const ResourceRow = styled.a`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg};
  color: inherit;
  text-decoration: none;
  background: rgba(10,10,10,0.42);
  border: 1px solid transparent;
  transition:
    background ${tokens.transitions.fast},
    border-color ${tokens.transitions.fast},
    transform ${tokens.transitions.fast};
  ${clipBR(CHAMFER.md)}

  & + & {
    margin-top: ${tokens.spacing.sm};
  }

  &:hover {
    background: rgba(255,255,255,0.075);
    border-color: ${({ $color }) => `${$color || tokens.colors.primary}55`};
    transform: translateX(4px);
  }

  ${media.md} {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: center;
  }
`;

const ResourceName = styled.span`
  display: block;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.lg}, 1.5vw, ${tokens.fontSizes.xl});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.darkText};
  line-height: ${tokens.lineHeights.snug};
  overflow-wrap: anywhere;
`;

const ResourceDesc = styled.span`
  display: block;
  max-width: 720px;
  margin-top: 6px;
  color: rgba(245,245,245,0.7);
  line-height: ${tokens.lineHeights.relaxed};
`;

const ResourceMeta = styled.span`
  width: fit-content;
  min-width: 104px;
  padding: 8px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  text-align: center;
  color: ${({ $color }) => $color || tokens.colors.primaryLight};
  background: ${({ $color }) => `${$color || tokens.colors.primary}18`};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.primary}66`};
  letter-spacing: 0;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

export function FreebieConsole({
  title,
  text,
  kicker = 'Freebie Pack',
  resources = [],
  accentColor = tokens.colors.primary,
  accentBg = tokens.colors.primaryLighter,
}) {
  return (
    <FreebieFrame>
      <OuterCornerFrame $color={tokens.colors.mint} $size={18} $offset={10} />
      <FreebieShell $color={accentColor} $bg={accentBg}>
        <FreebieIntro>
          <FreebieKicker $color={accentColor}>{kicker}</FreebieKicker>
          <FreebieTitle>{title}</FreebieTitle>
          <FreebieText>{text}</FreebieText>
        </FreebieIntro>

        <Terminal $color={accentColor}>
          <TerminalHeader>
            <TerminalLabel>/downloads</TerminalLabel>
            <TerminalLabel>{resources.length} Dateien</TerminalLabel>
          </TerminalHeader>
          <ResourceList>
            {resources.map((resource) => (
              <ResourceRow key={resource.href} href={resource.href} download $color={accentColor}>
                <span>
                  <ResourceName>{resource.title}</ResourceName>
                  <ResourceDesc>{resource.description}</ResourceDesc>
                </span>
                <ResourceMeta $color={accentColor}>{resource.type || 'Download'}</ResourceMeta>
              </ResourceRow>
            ))}
          </ResourceList>
        </Terminal>
      </FreebieShell>
    </FreebieFrame>
  );
}
