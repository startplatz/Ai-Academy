'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React, { useEffect, useRef, useState, useCallback } from 'react';
import styled, { keyframes } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import { ReviewTrustBar } from './ReviewRatings';

/* ─────────────────────────────────────────────
   KPI SECTION – Angular, bold, cyberpunk
   Chamfered cards with corner accents +
   scroll-triggered count-up.
   ───────────────────────────────────────────── */

const KPIS = [
  {
    value: 1000,
    suffix: '+',
    label: 'Menschen beim KI-Einstieg begleitet',
    accent: 'Erprobte Lernpfade',
    color: tokens.colors.mint,
  },
  {
    value: null,
    displayValue: '4,98/5',
    label: 'Lernerfahrung, die wirklich hilft',
    accent: '290+ Bewertungen',
    color: tokens.colors.primary,
  },
  {
    value: 100,
    suffix: '+',
    label: 'Teams in die Anwendung gebracht',
    accent: 'Praxis statt Theorie',
    color: tokens.colors.navy,
  },
  {
    value: 15,
    suffix: '+',
    label: 'Jahre Netzwerk für deinen nächsten Schritt',
    accent: 'STARTPLATZ NRW',
    color: tokens.colors.orange,
  },
];

/* ── Animations ───────────────────────────── */

const shimmer = keyframes`
  0% { transform: translateX(-100%) skewX(-12deg); }
  100% { transform: translateX(200%) skewX(-12deg); }
`;

/* ── Styles ────────────────────────────────── */

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: ${tokens.spacing.section} 0 clamp(2rem, 4vh, 3rem);
  overflow: hidden;
`;

const SkewStripe = styled.div`
  position: absolute;
  top: 0;
  left: -5%;
  right: -5%;
  height: 100%;
  background: linear-gradient(
    135deg,
    ${tokens.colors.primaryLighter} 0%,
    transparent 40%,
    transparent 60%,
    ${tokens.colors.primaryLighter} 100%
  );
  opacity: 0.35;
  transform: skewY(-2deg);
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.xl} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const SectionHeader = styled.div`
  text-align: center;
  margin-bottom: ${tokens.spacing['3xl']};
`;

const SectionLabel = styled.span`
  display: inline-block;
  padding: 5px 16px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  border: 1px solid rgba(124, 58, 237, 0.12);
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.md};
`;

const SectionTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  text-transform: uppercase;
  letter-spacing: 0;
  
  span {
    background: linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
  gap: ${tokens.spacing.lg};
  
  ${media.sm} { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  ${media.lg} { grid-template-columns: repeat(4, minmax(0, 1fr)); }
`;

const KPICard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  min-width: 0;
  min-height: clamp(206px, 15vw, 232px);
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.06);
  overflow: visible;
  box-shadow: 0 16px 44px rgba(15, 15, 15, 0.035);
  transition: transform ${tokens.transitions.base}, border-color ${tokens.transitions.base},
              filter ${tokens.transitions.base};

  /* Chamfered bottom-right corner */
  ${clipBR(CHAMFER.md)}

  /* Shimmer sweep on hover */
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 60%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(124, 58, 237, 0.04), transparent);
    opacity: 0;
    pointer-events: none;
  }

  &:hover {
    transform: translateY(-4px);
    border-color: ${({ $accent }) => `${$accent}45`};
    filter: drop-shadow(0 8px 24px rgba(124,58,237,0.10));
    
    &::after {
      opacity: 1;
      animation: ${shimmer} 1.2s ease-out;
    }
  }
`;

const AccentBar = styled.div`
  position: absolute;
  top: 0; left: 0;
  width: 28px; height: 3px;
  background: ${({ $accent }) => $accent};
  transition: width 0.6s cubic-bezier(0.4, 0, 0.2, 1);

  ${KPICard}:hover & {
    width: 100%;
  }
`;

const AccentTag = styled.span`
  display: inline-block;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  opacity: 0.82;
  margin-bottom: ${tokens.spacing.xl};
`;

const MetricBody = styled.div`
  position: relative;
  z-index: 1;
  width: 100%;
`;

const ValueRow = styled.div`
  display: flex;
  align-items: baseline;
  gap: 0;
  min-width: 0;
  width: 100%;
  margin-bottom: ${tokens.spacing.md};
  white-space: nowrap;
`;

const Value = styled.span`
  position: relative;
  display: inline-grid;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['4xl']}, 4vw, 4.35rem);
  font-weight: ${tokens.fontWeights.black};
  line-height: 1;
  letter-spacing: 0;
  color: ${tokens.colors.text};
  font-variant-numeric: tabular-nums lining-nums;
  font-feature-settings: "tnum" 1, "lnum" 1;

  &::before,
  > span {
    grid-area: 1 / 1;
  }

  &::before {
    content: attr(data-reserve);
    visibility: hidden;
  }
  
  ${media.lg} {
    font-size: clamp(${tokens.fontSizes['4xl']}, 3.6vw, 4.2rem);
  }
`;

const ValueSuffix = styled.span`
  color: ${({ $accent }) => $accent};
  font-size: 0.42em;
  font-weight: ${tokens.fontWeights.bold};
  line-height: 1;
  margin-left: 0.04em;
  transform: translateY(-0.04em);
`;

const Label = styled.span`
  display: block;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.medium};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.normal};
`;

const ParallelogramDecor = styled.div`
  position: absolute;
  bottom: -10px;
  right: -8px;
  width: 80px;
  height: 80px;
  background: ${({ $accent }) => `${$accent}12`};
  opacity: 1;
  transform: skewX(-12deg);
  pointer-events: none;
  transition: opacity ${tokens.transitions.base};

  ${KPICard}:hover & {
    opacity: 1;
  }
`;

/* ── Counter Hook ──────────────────────────── */

function useCountUp(end, duration = 2200) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const hasAnimated = useRef(false);

  const animate = useCallback(() => {
    if (hasAnimated.current) return;
    hasAnimated.current = true;
    const startTime = performance.now();
    const step = (t) => {
      const progress = Math.min((t - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(end * eased));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) animate(); },
      { threshold: 0.3 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [animate]);

  return { count, ref };
}

/* ── KPI Item ──────────────────────────────── */

function KPIItem({ value, displayValue, suffix, label, accent, color }) {
  const { count, ref } = useCountUp(value || 0, 2400);
  const reserveNumber = displayValue || (value || 0).toLocaleString('de-DE');
  const shownNumber = displayValue || count.toLocaleString('de-DE');
  const reserveValue = `${reserveNumber}${suffix || ''}`;

  return (
    <KPICard ref={ref} $accent={color}>
      <AccentBar $accent={color} />
      <ParallelogramDecor $accent={color} />
      <CyberCorners $color={color} $size={8} />
      <AccentTag $accent={color}>{accent}</AccentTag>
      <MetricBody>
        <ValueRow>
          <Value data-reserve={reserveValue}>
            <span>
              {shownNumber}
              {suffix && <ValueSuffix $accent={color}>{suffix}</ValueSuffix>}
            </span>
          </Value>
        </ValueRow>
        <Label>{label}</Label>
      </MetricBody>
    </KPICard>
  );
}

/* ── Section ───────────────────────────────── */

export default function KPISection() {
  return (
    <Section aria-label="Kennzahlen">
      <SkewStripe aria-hidden="true" />
      <Inner>
        <SectionHeader>
          <SectionLabel>Orientierung &amp; Vertrauen</SectionLabel>
          <SectionTitle>Erfahrung, die <span>dir Sicherheit gibt</span></SectionTitle>
        </SectionHeader>
        <Grid>
          {KPIS.map((kpi) => (
            <KPIItem key={kpi.label} {...kpi} />
          ))}
        </Grid>
        <ReviewTrustBar />
      </Inner>
    </Section>
  );
}
