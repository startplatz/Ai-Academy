'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import styled, { css } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { CHAMFER } from '../styles/cyberpunk';

/* ─────────────────────────────────────────────
   PERSONA REVEAL – Ghost of Tsushima style
   Cyberpunk: outer edges chamfered (TL on first,
   BR on last panel) for the iconic angled look.
   ───────────────────────────────────────────── */

const PERSONAS = [
  {
    id: 'jobseeker',
    title: 'Arbeitssuchend',
    subtitle: 'Dein Neustart',
    description: '8 Wochen Vollzeit, digital und mit Bildungsgutschein komplett kostenfrei.',
    cta: 'Förderung prüfen',
    href: '/arbeitssuchende',
    color: tokens.colors.mint,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776473244/ai-hub/website/AI-Academy-Website-Images/hero-panel-arbeitssuchende-upscaled.png',
  },
  {
    id: 'professional',
    title: 'Berufstätig',
    subtitle: 'Neben dem Job',
    description: 'Zwei Abende pro Woche. Automation lernen, ohne den Job zu pausieren.',
    cta: 'Kurse entdecken',
    href: '/berufstaetige',
    color: tokens.colors.navy,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776473245/ai-hub/website/AI-Academy-Website-Images/hero-panel-berufstaetige-upscaled.png',
  },
  {
    id: 'enterprise',
    title: 'Unternehmen',
    subtitle: 'Für Teams',
    description: 'Vom OneDay Workshop bis zur 12-monatigen Private Academy.',
    cta: 'Beratung anfragen',
    href: '/unternehmen',
    color: tokens.colors.orange,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776473243/ai-hub/website/AI-Academy-Website-Images/hero-panel-unternehmen-upscaled.png',
  },
];

const Wrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  gap: 3px;
  overflow: hidden;
  /* Sharp rectangle – no border-radius */
`;

const C = CHAMFER.lg;

const panelClip = {
  first: css`
    clip-path: polygon(
      ${C}px 0, 100% 0,
      100% 100%,
      0 100%, 0 ${C}px
    );
  `,
  last: css`
    clip-path: polygon(
      0 0, 100% 0,
      100% calc(100% - ${C}px),
      calc(100% - ${C}px) 100%,
      0 100%
    );
  `,
};

const Panel = styled.div`
  position: relative;
  flex: ${({ $active, $hasActive }) => $active ? '2.8' : $hasActive ? '0.55' : '1'};
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.65s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $pos }) => $pos === 'first' && panelClip.first}
  ${({ $pos }) => $pos === 'last' && panelClip.last}

  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 4px;
    z-index: 4;
    background: ${({ $color, $active }) => ($active ? $color : 'transparent')};
    transition: background 0.5s ease;
  }
`;

const PanelImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center;
  filter: ${({ $active }) => ($active ? 'saturate(1.1) brightness(1)' : 'saturate(0.05) brightness(0.5)')};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(1.08)')};
  transition: filter 0.65s ease, transform 0.8s ease;
`;

const Overlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, transparent 40%, rgba(0,0,0,0.6) 100%)'
      : 'linear-gradient(180deg, rgba(10,10,10,0.3) 0%, rgba(10,10,10,0.82) 100%)'};
  transition: background 0.65s ease;
`;

const VerticalLabel = styled.span`
  position: absolute;
  top: 50%; left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  z-index: 3;
  font-family: ${tokens.fonts.display};
  font-size: 11px;
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  white-space: nowrap;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: ${({ $visible }) => ($visible ? 0.9 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: none;
`;

const IdleLabel = styled.div`
  position: absolute;
  bottom: ${tokens.spacing.lg};
  left: 0; right: 0;
  z-index: 3;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity 0.4s ease;
  pointer-events: none;
`;

const IdleTitle = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  text-align: center;
`;

const IdleAccent = styled.span`
  display: block;
  width: 24px;
  height: 2px;
  background: ${({ $color }) => $color};
  border-radius: 1px;
`;

const Content = styled.div`
  position: absolute;
  bottom: 0; left: 0; right: 0;
  z-index: 3;
  padding: ${tokens.spacing.xl} ${tokens.spacing.lg};
  transform: translateY(${({ $active }) => ($active ? '0' : '16px')});
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: transform 0.5s ease 0.1s, opacity 0.5s ease 0.1s;
`;

const Title = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
`;

const Subtitle = styled.span`
  display: block;
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: ${tokens.spacing.sm};
`;

const Desc = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: rgba(255,255,255,0.8);
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.md};
`;

const CTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color};
  text-transform: uppercase;
  letter-spacing: 0.04em;

  svg { width: 14px; height: 14px; }
`;

const ArrowSVG = () => (
  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h8.5m0 0L8 4.5m3.5 3.5L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

export default function PersonaReveal() {
  const [activeId, setActiveId] = useState(null);
  const router = useRouter();
  const hasActive = activeId !== null;

  return (
    <Wrapper role="group" aria-label="Zielgruppen">
      {PERSONAS.map((p, i) => {
        const isActive = activeId === p.id;
        const showVertical = hasActive && !isActive;
        const pos = i === 0 ? 'first' : i === PERSONAS.length - 1 ? 'last' : 'mid';

        return (
          <Panel key={p.id} $active={isActive} $hasActive={hasActive} $color={p.color} $pos={pos}
            onMouseEnter={() => setActiveId(p.id)} onMouseLeave={() => setActiveId(null)}
            onFocus={() => setActiveId(p.id)} onBlur={() => setActiveId(null)}
            onClick={() => router.push(p.href)}
            tabIndex={0} role="link" aria-label={`${p.title} – ${p.subtitle}`}>
            <PanelImage $src={p.image} $active={isActive} />
            <Overlay $active={isActive} />
            {/* Vertical label: sichtbar wenn Panel nicht selbst aktiv ist */}
            <VerticalLabel $visible={!isActive && hasActive}>{p.title}</VerticalLabel>
            {/* Idle-Label: immer sichtbar wenn kein Panel aktiv ist */}
            <IdleLabel $visible={!hasActive}>
              <IdleAccent $color={p.color} />
              <IdleTitle>{p.title}</IdleTitle>
            </IdleLabel>
            <Content $active={isActive}>
              <Title>{p.title}</Title>
              <Subtitle $color={p.color}>{p.subtitle}</Subtitle>
              <Desc>{p.description}</Desc>
              <CTA $color={p.color}>{p.cta} <ArrowSVG /></CTA>
            </Content>
          </Panel>
        );
      })}
    </Wrapper>
  );
}
