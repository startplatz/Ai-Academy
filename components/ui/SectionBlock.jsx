'use client';

import React, { useRef, useState, useCallback, useEffect } from 'react';
import styled, { css } from 'styled-components';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER } from '../../styles/cyberpunk';

/* ─────────────────────────────────────────────
   DESIGN SYSTEM – SectionBlock
   Reusable section wrapper (simplified PlanetSection)
   Variants: light (default), dark, muted
   ───────────────────────────────────────────── */

const bgColors = {
  light: 'transparent',
  white: 'rgba(255, 255, 255, 0.25)',
  dark: tokens.colors.dark,
  muted: 'rgba(255, 255, 255, 0.1)',
  glass: 'transparent',
};

const Wrapper = styled.section`
  position: relative;
  z-index: 1;
  padding: ${tokens.spacing.section} 0;
  overflow: ${({ $allowOverflow }) => ($allowOverflow ? 'visible' : 'hidden')};
  background: ${({ $variant }) => bgColors[$variant] || bgColors.light};
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

const SectionBadge = styled.span`
  display: inline-block;
  padding: 5px 14px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $variant }) => $variant === 'dark' ? tokens.colors.primaryLight : tokens.colors.primary};
  background: ${({ $variant }) => $variant === 'dark' ? 'rgba(124,58,237,0.12)' : tokens.colors.primaryLighter};
  border: 1px solid ${({ $variant }) => $variant === 'dark' ? 'rgba(124,58,237,0.2)' : 'rgba(99,102,241,0.12)'};
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.lg};
`;

const SectionTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${({ $variant }) => $variant === 'dark' ? tokens.colors.darkText : tokens.colors.text};
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
  color: ${({ $variant }) => $variant === 'dark' ? tokens.colors.darkMuted : tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 640px;
  margin-bottom: ${tokens.spacing['2xl']};
`;

const GridHighlight = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
`;

export default function SectionBlock({
  id,
  badge,
  title,
  subtitle,
  variant = 'light',
  accent,
  children,
  centered = false,
  allowOverflow = false,
}) {
  const sectionRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: -300, y: -300 });

  const handleMouseMove = useCallback((e) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  useEffect(() => {
    if (allowOverflow) {
      return undefined;
    }

    let ctx;
    const init = async () => {
      try {
        const { gsap } = await import('gsap');
        const { ScrollTrigger } = await import('gsap/ScrollTrigger');
        gsap.registerPlugin(ScrollTrigger);
        ctx = gsap.context(() => {
          gsap.from(sectionRef.current, {
            y: 40, duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 88%' },
          });
        }, sectionRef);
      } catch {}
    };
    init();
    return () => ctx?.revert();
  }, [allowOverflow]);

  return (
    <Wrapper
      ref={sectionRef}
      id={id}
      $variant={variant}
      $allowOverflow={allowOverflow}
      onMouseMove={handleMouseMove}
    >
      <GlowLine $accent={accent} />
      <GridHighlight>
        <div style={{
          position: 'absolute',
          left: mousePos.x - 250,
          top: mousePos.y - 250,
          width: 500, height: 500,
          background: `radial-gradient(circle, ${accent || 'rgba(99,102,241,0.04)'}, transparent 70%)`,
          transition: 'left 0.3s ease-out, top 0.3s ease-out',
          pointerEvents: 'none',
        }} />
      </GridHighlight>
      <Container style={centered ? { textAlign: 'center' } : undefined}>
        {badge && <SectionBadge $variant={variant}>{badge}</SectionBadge>}
        {title && <SectionTitle $variant={variant} dangerouslySetInnerHTML={{ __html: title }} />}
        {subtitle && <SectionSubtitle $variant={variant}>{subtitle}</SectionSubtitle>}
        {children}
      </Container>
    </Wrapper>
  );
}
