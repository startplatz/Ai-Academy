'use client';

import React from 'react';
import styled from 'styled-components';
import { Button, SectionBlock } from './ui';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import { getCourse, formatEuro } from '../lib/academyFacts';

/*
  Querverweis auf den AI Automation Engineer (8 Tage) von den
  KI-Manager-Seiten aus. Zwei Varianten:
  - audience="arbeitssuchende": Förderung über Bildungsgutschein
  - audience="berufstaetige": Selbst-/Firmenzahler (keine QCG-Förderung bei 64 UE)
*/

const course = getCourse('ai-automation-engineer');

const Box = styled.div`
  position: relative;
  display: grid;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}

  ${media.md} {
    grid-template-columns: minmax(0, 1.4fr) minmax(0, 1fr);
    align-items: center;
  }
`;

const Text = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const Facts = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin: ${tokens.spacing.md} 0 0;
  padding: 0;
  list-style: none;
`;

const Fact = styled.li`
  padding: 4px 10px;
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  ${clipBR(CHAMFER.xs || 4)}
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
`;

const COPY = {
  arbeitssuchende: {
    title: 'Lieber kompakt? <span>AI Automation Engineer in 8 Tagen.</span>',
    subtitle: 'Die technische Alternative zum KI-Manager: kürzer, fokussiert auf Automatisierung.',
    text: `Du willst KI-Agenten und Automatisierungen selbst bauen? In ${course.durationDays} Vollzeittagen lernst du n8n von der eigenen Instanz bis zum fertigen Agenten. Ebenfalls AZAV-zugelassen und mit Bildungsgutschein bis zu 100 % förderfähig. Eine kurze Maßnahme heißt oft auch schnellere Bewilligung.`,
  },
  berufstaetige: {
    title: 'Keine 16 Wochen Zeit? <span>8 Tage AI Automation Engineer.</span>',
    subtitle: 'Für Selbst- und Firmenzahler: planbare Abwesenheit, die erste Automatisierung entsteht im Kurs.',
    text: `In ${course.durationDays} Vollzeittagen baust du KI-Agenten und Automatisierungen mit n8n, live online. ${formatEuro(course.price)} netto pro Person, auch als Firmenzahler. Eine Förderung über das QCG ist bei diesem kompakten Format nicht möglich.`,
  },
};

export default function AiAutomationTeaser({ audience = 'arbeitssuchende' }) {
  const copy = COPY[audience] || COPY.arbeitssuchende;

  return (
    <SectionBlock badge="Kompakt-Alternative" title={copy.title} subtitle={copy.subtitle} accent={tokens.colors.glow}>
      <Box>
        <CyberCorners $color={tokens.colors.primary} $size={10} />
        <div>
          <Text>{copy.text}</Text>
          <Facts>
            <Fact>{course.durationDays} Kurstage · {course.teachingUnits} UE</Fact>
            <Fact>Live online</Fact>
            <Fact>Start immer {course.startWeekday.toLowerCase()}s</Fact>
            <Fact>{course.certificate}</Fact>
          </Facts>
        </div>
        <Actions>
          <Button href={course.path} size="lg" arrow>
            AI Automation Engineer ansehen
          </Button>
        </Actions>
      </Box>
    </SectionBlock>
  );
}
