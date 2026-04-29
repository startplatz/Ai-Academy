'use client';

import React from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import {
  Button,
  PageHero,
  SectionBlock,
  FeatureCard,
  CTABanner,
  StatsRow,
} from '../../components/ui';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';

/* ─────────────────────────────────────────────
   ÜBER UNS – Geschichte & Team
   ───────────────────────────────────────────── */

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 2rem;
  @media (min-width: 768px) { grid-template-columns: repeat(2, 1fr); }
  @media (min-width: 1024px) { grid-template-columns: repeat(${({ $cols }) => $cols || 3}, 1fr); }
`;

const TimelineWrapper = styled.div`
  position: relative;
  max-width: 800px;
  margin: 0 auto;
  padding-left: ${tokens.spacing['2xl']};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 12px;
    width: 2px;
    background: linear-gradient(
      180deg,
      ${tokens.colors.mint},
      ${tokens.colors.primary},
      ${tokens.colors.orange}
    );
  }
`;

const TimelineItem = styled.div`
  position: relative;
  padding-bottom: ${tokens.spacing['3xl']};

  &:last-child { padding-bottom: 0; }

  &::before {
    content: '';
    position: absolute;
    left: -${tokens.spacing['2xl']};
    top: 4px;
    width: 14px;
    height: 14px;
    background: ${({ $color }) => $color || tokens.colors.primary};
    border: 3px solid ${tokens.colors.pageBg};
    border-radius: 50%;
    margin-left: 6px;
    z-index: 1;
  }
`;

const TimelineYear = styled.span`
  display: inline-block;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || tokens.colors.primary};
  background: ${({ $bg }) => $bg || tokens.colors.primaryLighter};
  padding: 3px 10px;
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.sm};
`;

const TimelineTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.xs};
`;

const TimelineText = styled.p`
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
`;

const StoryCard = styled.div`
  position: relative;
  padding: ${tokens.spacing['3xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}

  ${media.md} { padding: ${tokens.spacing['3xl']} ${tokens.spacing['4xl']}; }
`;

const StoryText = styled.p`
  font-size: clamp(${tokens.fontSizes.base}, 2vw, ${tokens.fontSizes.lg});
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.lg};

  strong {
    color: ${tokens.colors.text};
    font-weight: ${tokens.fontWeights.semi};
  }

  span {
    color: ${tokens.colors.primary};
    font-weight: ${tokens.fontWeights.semi};
  }
`;

const GroupPhoto = styled.div`
  position: relative;
  border-radius: 0;
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;
  margin-bottom: ${tokens.spacing.md};

  img {
    width: 100%;
    height: auto;
    display: block;
  }
`;

export default function UeberUnsPage() {
  const breadcrumbs = [
    { label: 'Über Uns', href: '/ueber-uns', active: true },
  ];

  const milestones = [
    {
      year: '2017',
      title: 'STARTPLATZ wird gegründet',
      text: 'Alles beginnt im Mediapark 5 in Köln. STARTPLATZ etabliert sich als einer der führenden Startup-Inkubatoren in NRW mit dem Ziel, Innovation und Unternehmertum zu fördern.',
      color: tokens.colors.mint,
      bg: tokens.colors.mintBg,
    },
    {
      year: '2020',
      title: 'Der AI Hub entsteht',
      text: 'Als die KI-Revolution Fahrt aufnimmt, gründen wir den STARTPLATZ AI Hub – eine spezialisierte Abteilung mit dem Fokus auf KI-Bildung und Community. Erste Workshops und Meetups starten.',
      color: tokens.colors.mint,
      bg: tokens.colors.mintBg,
    },
    {
      year: '2022',
      title: 'Erste geförderte Bootcamps',
      text: 'Der Bildungsgutschein wird zum Game-Changer. Wir erhalten die AZAV-Zertifizierung und starten die ersten vollständig geförderten KI-Bootcamps für Arbeitssuchende. Die Nachfrage explodiert.',
      color: tokens.colors.navy,
      bg: tokens.colors.navyBg,
    },
    {
      year: '2024',
      title: '1.000+ Absolventen',
      text: 'Der AI Hub wächst auf über 1.000 Absolventen, ein starkes Dozenten-Team und 100+ geschulte Unternehmen. Wir expandieren nach Düsseldorf und bauen unser Online-Angebot aus.',
      color: tokens.colors.navy,
      bg: tokens.colors.navyBg,
    },
    {
      year: '2025',
      title: 'Rebranding: AI Academy',
      text: 'Aus dem AI Hub wird die STARTPLATZ AI Academy. Der neue Name spiegelt wider, was wir geworden sind: eine vollwertige Akademie für KI-Kompetenzen mit einem umfassenden Curriculum, erstklassigen Dozenten und einem wachsenden Ökosystem in NRW.',
      color: tokens.colors.primary,
      bg: tokens.colors.primaryLighter,
    },
    {
      year: '2026',
      title: 'NRWs KI-Kompetenzzentrum',
      text: 'Heute verbinden wir Inhouse-Trainings, geförderte Weiterbildungen und ein Praxisnetzwerk in Köln und Düsseldorf. So entsteht KI-Kompetenz dort, wo sie gebraucht wird: im Arbeitsalltag.',
      color: tokens.colors.orange,
      bg: tokens.colors.orangeBg,
    },
  ];

  const values = [
    {
      icon: '🎯',
      title: 'Praxis vor Theorie',
      description: 'Jeder Kurs basiert auf echten Projekten und realen Anwendungsfällen. Unsere Teilnehmer lernen durch Machen, nicht durch Zuhören.',
      accentColor: tokens.colors.primary,
      accentBg: tokens.colors.primaryLighter,
      cornerColor: tokens.colors.primary,
    },
    {
      icon: '🤝',
      title: 'Community First',
      description: 'Wir glauben, dass Lernen in der Gemeinschaft am stärksten ist. Unser Netzwerk aus Absolventen, Dozenten und Partnern unterstützt sich gegenseitig.',
      accentColor: tokens.colors.mint,
      accentBg: tokens.colors.mintBg,
      cornerColor: tokens.colors.mint,
    },
    {
      icon: '♿',
      title: 'Bildung für alle',
      description: 'KI-Bildung darf keine Frage des Geldbeutels sein. Durch 100% geförderte Programme machen wir KI-Weiterbildung für jeden zugänglich.',
      accentColor: tokens.colors.navy,
      accentBg: tokens.colors.navyBg,
      cornerColor: tokens.colors.navy,
    },
  ];

  const stats = [
    { value: 1000, label: 'Absolventen', suffix: '+' },
    { value: 100, label: 'Unternehmen geschult', suffix: '+' },
    { displayValue: '4,98/5', label: 'Bewertung' },
    { value: 2, label: 'Standorte', suffix: '' },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Unsere Geschichte"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="Vom AI Hub zur <br/><span>AI Academy</span>"
        subtitle="Seit 2017 gestalten wir die KI-Bildungslandschaft in NRW. Unsere Reise von einem kleinen Meetup zum offiziellen KI-Kompetenzzentrum Nordrhein-Westfalens."
        breadcrumbs={breadcrumbs}
        accentColor={tokens.colors.primaryLighter}
      />

      {/* Unsere Story */}
      <SectionBlock
        badge="Die Story"
        title="Wie alles <span>begann</span>"
        subtitle="Eine Reise die aus Leidenschaft für KI und Bildung entstanden ist"
        variant="light"
        accent={tokens.colors.glow}
      >
        <StoryCard>
          <CyberCorners $color={tokens.colors.primary} $size={10} />
          <GroupPhoto>
            <CyberCorners $color={tokens.colors.mint} $size={14} />
            <img
              src="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png"
              alt="Das STARTPLATZ AI Academy Team"
              width="1200"
              height="500"
              loading="lazy"
            />
          </GroupPhoto>
          <StoryText>
            <strong>Es begann mit einer einfachen Idee:</strong> KI-Wissen sollte nicht nur Tech-Giganten und Universitäten vorbehalten sein. Als 2020 die KI-Revolution an Fahrt gewann, gründeten wir den <span>STARTPLATZ AI Hub</span> – einen Ort, an dem jeder die Fähigkeiten erlernen kann, die die Zukunft der Arbeit definieren.
          </StoryText>
          <StoryText>
            Was als kleines Meetup in Köln startete, wuchs schnell zu einer der wichtigsten Anlaufstellen für KI-Bildung in Nordrhein-Westfalen. Wir erkannten früh, dass <strong>der größte Engpass nicht die Technologie ist, sondern die Menschen, die sie verstehen und einsetzen können</strong>.
          </StoryText>
          <StoryText>
            2025 wurde aus dem AI Hub die <span>STARTPLATZ AI Academy</span>. Der neue Name ist mehr als ein Rebranding – er spiegelt wider, was wir geworden sind: eine vollwertige Akademie mit einem strukturierten Curriculum, erstklassigen Dozenten und einem Netzwerk, das Karrieren verändert.
          </StoryText>
        </StoryCard>
      </SectionBlock>

      {/* Timeline */}
      <SectionBlock
        badge="Meilensteine"
        title="Unsere <span>Reise</span>"
        subtitle="Von den ersten Workshops bis zum KI-Kompetenzzentrum"
        variant="muted"
        accent={tokens.colors.glow}
      >
        <TimelineWrapper>
          {milestones.map((m, idx) => (
            <TimelineItem key={idx} $color={m.color}>
              <TimelineYear $color={m.color} $bg={m.bg}>{m.year}</TimelineYear>
              <TimelineTitle>{m.title}</TimelineTitle>
              <TimelineText>{m.text}</TimelineText>
            </TimelineItem>
          ))}
        </TimelineWrapper>
      </SectionBlock>

      {/* Zahlen */}
      <SectionBlock
        title="Nach Zahlen"
        variant="white"
        accent={tokens.colors.glow}
        centered
      >
        <StatsRow stats={stats} variant="light" />
      </SectionBlock>

      {/* Werte */}
      <SectionBlock
        badge="Werte"
        title="Wofür wir <span>stehen</span>"
        subtitle="Drei Prinzipien die alles leiten was wir tun"
        variant="light"
        accent={tokens.colors.glow}
      >
        <Grid $cols={3}>
          {values.map((v, idx) => (
            <FeatureCard
              key={idx}
              icon={v.icon}
              title={v.title}
              description={v.description}
              accentColor={v.accentColor}
              accentBg={v.accentBg}
              cornerColor={v.cornerColor}
            />
          ))}
        </Grid>
      </SectionBlock>

      <CTABanner title="Teil unserer <span>Geschichte</span> werden?">
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" arrow>
          Beratung buchen
        </Button>
        <Button href="/experten" variant="secondary" size="lg">
          Als Dozent bewerben
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
