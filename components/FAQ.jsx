'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React, { useState } from 'react';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import PlanetSection from './PlanetSection';

/* ─────────────────────────────────────────────
   FAQ – Cyberpunk accordion
   Chamfered items with corner accents
   Background: BG-CTA image for atmosphere
   ───────────────────────────────────────────── */

const FAQ_BG = 'https://res.cloudinary.com/startplatz/image/upload/v1767662307/ai-hub/website/website_stock_images/BG-CTA.png';

const QUESTIONS = [
  {
    q: 'Was ist die STARTPLATZ AI Academy?',
    a: 'Die AI Academy ist das KI-Weiterbildungszentrum von STARTPLATZ — einem der bekanntesten Startup-Hubs in Deutschland mit Standorten in Köln und Düsseldorf. Wir machen KI-Kompetenz zugänglich: für Menschen, die neu starten wollen, für Berufstätige, die sich weiterentwickeln, und für Unternehmen, die ihre Teams zukunftsfähig machen. Kein Elfenbeinturm — sondern Praxis von Tag eins.',
  },
  {
    q: 'Wer steckt hinter der AI Academy?',
    a: 'Wir sind Teil von STARTPLATZ, gegründet 2012, mit über 10.000 Mitgliedern im Netzwerk. Unsere Dozentinnen und Dozenten sind KI-Praktikerinnen und -Praktiker, Tech-Pioniere und erfahrene Coaches — keine reinen Theoretiker. Mehr als 1.000 Absolventinnen und Absolventen sowie über 100 Unternehmen haben unsere Angebote bereits genutzt und weiterempfohlen.',
  },
  {
    q: 'Für wen sind eure Angebote geeignet?',
    a: 'Für alle, die KI nicht nur verstehen, sondern wirklich anwenden wollen. Ob du gerade einen beruflichen Neustart planst, KI neben deinem Job lernen möchtest oder als Unternehmen dein Team fit machen willst — wir haben das passende Format. Keine Vorkenntnisse erforderlich, keine Programmierkenntnisse nötig.',
  },
  {
    q: 'Was macht euch anders als andere Anbieter?',
    a: 'Drei Dinge: Erstens, wir sind in einem echten Startup-Ökosystem verwurzelt — kein reiner Online-Kursanbieter. Zweitens, unsere Inhalte werden laufend aktualisiert, weil KI sich laufend verändert. Drittens, du lernst nicht für ein Zertifikat, sondern für echte Anwendung — mit einem Netzwerk, das auch nach dem Kurs trägt. Bewertung: 4,98 von 5 Sternen.',
  },
  {
    q: 'Wie finde ich heraus, was zu mir passt?',
    a: 'Am einfachsten über unser kostenloses Beratungsgespräch — in 30 Minuten klären wir gemeinsam, welches Format zu deiner Situation, deinen Zielen und deinem Zeitbudget passt. Alternativ: Mach unseren kostenlosen Wissens-Test, um deinen aktuellen KI-Stand einzuschätzen und den richtigen Einstiegspunkt zu finden.',
  },
];

const List = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
  max-width: 800px;
`;

const Item = styled.div`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $open }) => $open ? 'rgba(99,102,241,0.2)' : tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
  overflow: hidden;
  transition: border-color ${tokens.transitions.base}, filter ${tokens.transitions.base};
  ${({ $open }) => $open && `filter: drop-shadow(0 4px 12px rgba(0,0,0,0.06));`}
`;

const Trigger = styled.button`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${tokens.spacing.lg} ${tokens.spacing.xl};
  text-align: left;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.text};
  background: none;
  border: none;
  cursor: pointer;
  transition: color ${tokens.transitions.fast};
  &:hover { color: ${tokens.colors.primary}; }
  ${media.md} { font-size: ${tokens.fontSizes.lg}; }
`;

const Icon = styled.span`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 34px;
  height: 34px;
  ${clipBR(CHAMFER.xs)}
  background: ${({ $open }) => $open ? tokens.colors.primary : 'rgba(124, 58, 237, 0.08)'};
  border: 1px solid ${({ $open }) => $open ? tokens.colors.primary : 'rgba(124, 58, 237, 0.24)'};
  color: ${({ $open }) => $open ? '#fff' : tokens.colors.primary};
  flex-shrink: 0;
  transition: background ${tokens.transitions.base}, border-color ${tokens.transitions.base},
              color ${tokens.transitions.base}, transform ${tokens.transitions.base};

  &::before {
    content: '';
    width: 9px;
    height: 9px;
    border-right: 2px solid currentColor;
    border-bottom: 2px solid currentColor;
    transform: ${({ $open }) => $open
      ? 'translateY(2px) rotate(225deg)'
      : 'translateY(-2px) rotate(45deg)'};
    transition: transform ${tokens.transitions.base};
  }

  &::after {
    content: '';
    position: absolute;
    left: 4px;
    top: 4px;
    bottom: 4px;
    width: 2px;
    background: ${tokens.colors.mint};
    opacity: ${({ $open }) => $open ? 1 : 0.6};
    transition: opacity ${tokens.transitions.base};
  }

  ${Trigger}:hover & {
    border-color: ${tokens.colors.primary};
    transform: translateX(2px);
  }
`;

const Panel = styled.div`
  overflow: hidden;
  max-height: ${({ $open }) => ($open ? '520px' : '0')};
  transition: max-height 0.4s ease;
`;

const PanelInner = styled.div`
  padding: 0 ${tokens.spacing.xl} ${tokens.spacing.lg};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(0);
  const toggle = (i) => setOpenIdx(openIdx === i ? null : i);

  return (
    <PlanetSection
      solid
      id="faq"
      badge="Häufige Fragen"
      title="Was du wissen <span>solltest</span>"
      subtitle="Kurz, konkret und ohne Fachchinesisch."
      bgImage={FAQ_BG}
      bgImageOpacity={0.18}
    >
      <List role="list">
        {QUESTIONS.map((item, i) => {
          const open = openIdx === i;
          return (
            <Item key={i} $open={open} role="listitem">
              <CyberCorners $color={open ? tokens.colors.primary : tokens.colors.mint} $size={8} />
              <Trigger onClick={() => toggle(i)} aria-expanded={open} aria-controls={`faq-p-${i}`} id={`faq-t-${i}`}>
                {item.q}
                <Icon $open={open} aria-hidden="true" />
              </Trigger>
              <Panel $open={open} id={`faq-p-${i}`} role="region" aria-labelledby={`faq-t-${i}`}>
                <PanelInner>{item.a}</PanelInner>
              </Panel>
            </Item>
          );
        })}
      </List>
    </PlanetSection>
  );
}
