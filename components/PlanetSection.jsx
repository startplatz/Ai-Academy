'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { css } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER } from '../styles/cyberpunk';

/* ─────────────────────────────────────────────
   PLANET SECTION – Reusable wrapper
   Cyberpunk: chamfered badge, HUD dashes
   ───────────────────────────────────────────── */

const Wrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: ${({ $compactTop }) =>
    $compactTop
      ? `clamp(2rem, 4vh, 3.5rem) 0 ${tokens.spacing.section}`
      : `${tokens.spacing.section} 0`};
  overflow: hidden;

  /* Glass is on <main> — sections only add subtle shade variants */
  background: ${({ $solid }) =>
    $solid ? 'rgba(255, 255, 255, 0.25)' : 'transparent'};
`;

const BgImage = styled.div`
  position: absolute;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background-image: url('${({ $src }) => $src}');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  opacity: ${({ $opacity }) => $opacity || 0.12};

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(
      180deg,
      ${tokens.colors.pageBg} 0%,
      transparent 15%,
      transparent 85%,
      ${tokens.colors.pageBg} 100%
    );
  }
`;

const GlowLine = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 60%;
  max-width: 700px;
  height: 1px;
  background: ${({ $accent }) =>
    `linear-gradient(90deg, transparent, ${$accent || 'rgba(0,0,0,0.06)'}, transparent)`};
`;

const Container = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const GridHighlight = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

const Stitch = styled.div`
  position: absolute;
  bottom: -${tokens.spacing.section};
  left: 50%;
  transform: translateX(-50%);
  width: 1px;
  height: ${tokens.spacing.section};
  pointer-events: none;
  ${({ $hidden }) => $hidden && css`display: none;`}

  &::before {
    content: '';
    position: absolute;
    inset: 0;
    background: repeating-linear-gradient(
      180deg,
      ${tokens.colors.textDim} 0px,
      ${tokens.colors.textDim} 3px,
      transparent 3px,
      transparent 8px
    );
    opacity: 0.15;
  }
`;

const SectionBadge = styled.span`
  display: inline-block;
  padding: 5px 14px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || tokens.colors.primary};
  background: ${({ $color }) => $color ? `${$color}10` : tokens.colors.primaryLighter};
  border: 1px solid ${({ $color }) => $color ? `${$color}20` : 'rgba(99,102,241,0.12)'};
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin-bottom: ${tokens.spacing.md};

  span {
    background: linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionSubtitle = styled.p`
  font-size: clamp(${tokens.fontSizes.base}, 1.5vw, ${tokens.fontSizes.lg});
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 640px;
  margin-bottom: ${tokens.spacing['2xl']};
`;

export default function PlanetSection({
  id, badge, title, subtitle,
  accent, showStitch = true, bgImage, bgImageOpacity,
  glass = false, solid = false, compactTop = false,
  children,
}) {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -300, y: -300 });

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    let ctx;
    const init = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);

        ctx = gsap.context(() => {
          gsap.from(sectionRef.current, {
            y: 40,
            duration: 0.8,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top 88%',
              toggleActions: 'play none none none',
            },
          });
        }, sectionRef);
      } catch (e) {
        /* Graceful fallback */
      }
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <Wrapper
      ref={sectionRef}
      id={id}
      $glass={glass}
      $solid={solid}
      $compactTop={compactTop}
      onMouseMove={handleMouseMove}
      aria-labelledby={id && title ? `${id}-title` : undefined}
    >
      {bgImage && <BgImage $src={bgImage} $opacity={bgImageOpacity} />}
      <GlowLine $accent={accent} />

      <GridHighlight>
        <div
          style={{
            position: 'absolute',
            left: mousePos.x - 250,
            top: mousePos.y - 250,
            width: 500, height: 500,
            background: `radial-gradient(circle, ${accent || 'rgba(99,102,241,0.04)'}, transparent 70%)`,
            transition: 'left 0.3s ease-out, top 0.3s ease-out',
            pointerEvents: 'none',
          }}
        />
      </GridHighlight>

      <Container>
        {badge && <SectionBadge $color={accent}>{badge}</SectionBadge>}
        {title && (
          <SectionTitle id={id ? `${id}-title` : undefined} dangerouslySetInnerHTML={{ __html: title }} />
        )}
        {subtitle && <SectionSubtitle>{subtitle}</SectionSubtitle>}
        {children}
      </Container>

      <Stitch $hidden={!showStitch} />
    </Wrapper>
  );
}
