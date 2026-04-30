'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import Breadcrumb from './Breadcrumb';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM – PageHero
   Reusable hero section for subpages.
   Variants: light (default), dark, image
   ───────────────────────────────────────────── */

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: calc(72px + ${tokens.spacing['3xl']}) 0 ${tokens.spacing['3xl']};
  overflow: hidden;
  background: ${({ $variant }) =>
    $variant === 'dark' ? tokens.colors.dark : 'transparent'};
`;

const SlashAccent = styled.div`
  position: absolute;
  top: -10%; right: -5%;
  width: 35%; height: 120%;
  background: ${({ $accentColor }) => $accentColor || tokens.colors.primaryLighter};
  transform: skewX(-8deg);
  opacity: ${({ $variant }) => $variant === 'dark' ? 0.08 : 0.18};
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const Badge = styled.span`
  display: inline-block;
  position: relative;
  padding: 6px 14px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || tokens.colors.mint};
  background: ${({ $bg }) => $bg || tokens.colors.mintBg};
  border: 1px solid ${({ $color }) => `${$color || tokens.colors.mint}40`};
  ${clipBR(CHAMFER.sm)}
  margin-bottom: ${tokens.spacing.xl};
`;

const Title = styled.h1`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['4xl']}, 7.5vw, ${tokens.fontSizes['7xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${({ $variant }) => $variant === 'dark' ? tokens.colors.darkText : tokens.colors.text};
  letter-spacing: 0;
  margin-bottom: ${tokens.spacing.xl};
  text-transform: uppercase;
  max-width: 960px;

  span {
    background: linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Subtitle = styled.p`
  font-size: clamp(${tokens.fontSizes.base}, 2vw, ${tokens.fontSizes.xl});
  color: ${({ $variant }) => $variant === 'dark' ? tokens.colors.darkMuted : tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 640px;
  margin-bottom: ${tokens.spacing['2xl']};
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
`;

const ImageWrap = styled.div`
  position: absolute;
  right: 0;
  top: 0;
  bottom: 0;
  width: 50%;
  overflow: hidden;
  display: none;
  ${media.lg} { display: block; }

  /* CSS mask fades the entire image to transparent on all edges */
  -webkit-mask-image:
    linear-gradient(to right, transparent 0%, black 35%),
    linear-gradient(to bottom, transparent 0%, black 8%, black 75%, transparent 100%);
  -webkit-mask-composite: destination-in;
  mask-image:
    linear-gradient(to right, transparent 0%, black 35%),
    linear-gradient(to bottom, transparent 0%, black 8%, black 75%, transparent 100%);
  mask-composite: intersect;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: saturate(0.85);
    opacity: 0.8;
  }
`;

export default function PageHero({
  badge,
  badgeColor,
  badgeBg,
  title,
  subtitle,
  variant = 'light',
  accentColor,
  image,
  breadcrumbs,
  children,
}) {
  const titleHtml = title?.replace(/<br\s*\/?>/gi, ' <br />');

  return (
    <Section $variant={variant}>
      <SlashAccent $variant={variant} $accentColor={accentColor} aria-hidden="true" />

      {image && (
        <ImageWrap $variant={variant} aria-hidden="true">
          <Image
            src={image}
            alt=""
            fill
            priority
            sizes="(min-width: 1024px) 50vw, 0vw"
          />
        </ImageWrap>
      )}

      <Inner>
        {breadcrumbs && <Breadcrumb items={breadcrumbs} variant={variant} />}

        {badge && (
          <Badge $color={badgeColor} $bg={badgeBg}>
            {badge}
            <CyberCorners $color={badgeColor || tokens.colors.mint} $size={8} />
          </Badge>
        )}

        {titleHtml && (
          <Title $variant={variant} dangerouslySetInnerHTML={{ __html: titleHtml }} />
        )}

        {subtitle && <Subtitle $variant={variant}>{subtitle}</Subtitle>}

        {children && <Actions>{children}</Actions>}
      </Inner>
    </Section>
  );
}
