'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import PlanetSection from './PlanetSection';

/* ─────────────────────────────────────────────
   TARGET AUDIENCE – Three cyberpunk cards
   Chamfered corners, corner accents, HUD details
   ───────────────────────────────────────────── */

/* Softer variants that don't clash with the strong purple primary */
const SOFT = {
  teal:     '#14B8A6',   // softer than mint
  tealBg:   '#ECFDF5',
  sky:      '#5CB5F2',   // softer than navy
  skyBg:    '#E0F2FE',
  coral:    '#FF9947',   // softer than orange
  coralBg:  '#FFF4EB',
};

const AUDIENCES = [
  {
    badge: '100% Gefördert',
    title: 'Arbeitssuchend',
    titleMeta: 'Dein Neustart',
    description: 'In 8 Wochen von unsicher zu gefragt. Vollzeit, digital, AZAV-zertifiziert. Mit Bildungsgutschein komplett kostenfrei.',
    features: [
      '8 Wochen Vollzeit, Mo-Fr 9-16 Uhr',
      'Cert-IT Zertifizierung (EU-weit)',
      'Max. 15 Teilnehmer pro Kohorte',
    ],
    cta: 'Förderung prüfen',
    href: '/arbeitssuchende',
    color: SOFT.teal,
    colorBg: SOFT.tealBg,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776469601/ai-hub/website/AI-Academy-Website-Images/target-audience-arbeitssuchende.png',
  },
  {
    badge: 'Berufsbegleitend',
    title: 'Berufstätig',
    titleMeta: 'Neben dem Job',
    description: 'Zwei Abende pro Woche. Nach 8 Wochen bist du die Person im Team, die weiß wie es geht.',
    features: [
      'Di & Do, 15-18 Uhr',
      'n8n, GPT, APIs — sofort einsetzbar',
      'AZAV, förderfähig über QCG',
    ],
    cta: 'Kurse entdecken',
    href: '/berufstaetige',
    color: SOFT.sky,
    colorBg: SOFT.skyBg,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776469600/ai-hub/website/AI-Academy-Website-Images/target-audience-berufstaetige.png',
  },
  {
    badge: 'Individuell',
    title: 'Unternehmen',
    titleMeta: 'Für Teams',
    description: 'Euer Team nutzt KI produktiv — nicht nur zum Experimentieren. Vom OneDay Workshop bis zur 12-monatigen Private Academy.',
    features: [
      'Innovation Day (1 Tag) bis Private Academy',
      '100+ Unternehmen bereits geschult',
      'Kompetenzrahmen nach 3 Säulen',
    ],
    cta: 'Beratung anfragen',
    href: '/unternehmen',
    color: SOFT.coral,
    colorBg: SOFT.coralBg,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776469603/ai-hub/website/AI-Academy-Website-Images/target-audience-unternehmen.png',
  },
];

/* ── Styled ────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  align-items: stretch;
  ${media.md} { grid-template-columns: repeat(2, 1fr); }
  ${media.lg} { grid-template-columns: repeat(3, 1fr); }
`;

const Card = styled.article`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipTLBR(CHAMFER.lg)}
  overflow: hidden;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: transform ${tokens.transitions.base}, filter ${tokens.transitions.base};

  &:hover {
    transform: translateY(-6px);
    filter: drop-shadow(0 8px 24px rgba(124,58,237,0.10));
  }
`;

const CardImage = styled.div`
  position: relative;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform ${tokens.transitions.slow};
  }

  ${Card}:hover & img { transform: scale(1.05); }

  &::after {
    content: '';
    position: absolute;
    bottom: 0; left: 0; right: 0;
    height: 60px;
    background: linear-gradient(transparent, ${tokens.colors.surface});
  }
`;

const CardBadge = styled.span`
  position: absolute;
  top: ${tokens.spacing.md};
  left: ${tokens.spacing.md};
  z-index: 2;
  padding: 4px 12px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  ${clipBR(CHAMFER.xs)}
  letter-spacing: 0.06em;
  text-transform: uppercase;
  backdrop-filter: blur(8px);
`;

const CardBody = styled.div`
  padding: ${tokens.spacing.lg} ${tokens.spacing.xl} ${tokens.spacing.xl};
  display: flex;
  flex: 1;
  flex-direction: column;
`;

const CardTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.xs};
  min-height: 0;
`;

const CardTitleMeta = styled.span`
  display: block;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: ${tokens.spacing.md};
`;

const CardDesc = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.lg};
  min-height: 72px;
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
  margin-bottom: ${tokens.spacing.xl};
  min-height: 108px;
`;

const Feature = styled.li`
  display: flex;
  align-items: flex-start;
  gap: ${tokens.spacing.sm};
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textSoft};
  position: relative;
  min-height: 40px;

  /* Box with integrated checkmark – single element, checkmark centered inside */
  &::before {
    content: '';
    display: inline-block;
    width: 18px;
    height: 18px;
    ${clipBR(4)}
    background: ${({ $color }) => $color};
    flex-shrink: 0;
    /* SVG checkmark rendered via background */
    background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='none'><path d='M3.5 8.5l3 3 6-7' stroke='white' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'/></svg>");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 14px 14px;
  }
`;

const CardCTA = styled.a`
  display: inline-flex;
  align-items: center;
  align-self: flex-start;
  gap: ${tokens.spacing.sm};
  margin-top: auto;
  padding: 10px 24px;
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${({ $color }) => $color};
  ${clipBR(CHAMFER.sm)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: all ${tokens.transitions.fast};

  &:hover {
    transform: translateY(-1px);
    filter: drop-shadow(0 4px 16px ${({ $color }) => `${$color}30`});
    color: #fff;
  }

  svg {
    width: 14px; height: 14px;
    transition: transform ${tokens.transitions.fast};
  }
  &:hover svg { transform: translateX(3px); }
`;

const StitchTop = styled.div`
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    ${({ $color }) => $color} 0px,
    ${({ $color }) => $color} 6px,
    transparent 6px,
    transparent 12px
  );
  opacity: 0;
  transition: opacity ${tokens.transitions.base};
  ${Card}:hover & { opacity: 0.6; }
`;

const ArrowSVG = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h8.5m0 0L8 4.5m3.5 3.5L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ── Component ─────────────────────────────── */

export default function TargetAudience() {
  const cardsRef = useRef([]);

  useEffect(() => {
    let ctx;
    const init = async () => {
      const { gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        gsap.from(cardsRef.current, {
          y: 40,
          duration: 0.7,
          stagger: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cardsRef.current[0]?.parentElement,
            start: 'top 80%',
          },
        });
      });
    };
    init();
    return () => ctx?.revert();
  }, []);

  return (
    <PlanetSection
      id="weiterbildungen"
      badge="Weiterbildungen"
      title="Unsere <span>3 Zielgruppen</span>"
      subtitle="Das Format, das zu deinem Leben passt."
    >
      <Grid>
        {AUDIENCES.map((a, i) => (
          <Card key={a.title} ref={(el) => { cardsRef.current[i] = el; }} id={a.href === '/unternehmen' ? 'unternehmen' : undefined}>
            <StitchTop $color={a.color} />
            <CyberCorners $color={a.color} $size={10} />
            <CardImage>
              <img src={a.image} alt={`${a.title} — ${a.badge}`} loading="lazy" width="600" height="400" />
            <CardBadge $color={a.color} $bg={a.colorBg}>{a.badge}</CardBadge>
            </CardImage>
            <CardBody>
              <CardTitle>{a.title}</CardTitle>
              <CardTitleMeta $color={a.color}>{a.titleMeta}</CardTitleMeta>
              <CardDesc>{a.description}</CardDesc>
              <FeatureList>
                {a.features.map((f) => <Feature key={f} $color={a.color}>{f}</Feature>)}
              </FeatureList>
              <Link href={a.href} passHref legacyBehavior>
                <CardCTA $color={a.color}>{a.cta}<ArrowSVG /></CardCTA>
              </Link>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </PlanetSection>
  );
}
