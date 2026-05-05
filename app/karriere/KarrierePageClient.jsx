'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import { Button, CTABanner, PageHero, SectionBlock } from '../../components/ui';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';

const PERSONIO_URL = 'https://ai-academy.jobs.personio.com/';

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(320px, 0.82fr);
    align-items: stretch;
  }
`;

const StoryPanel = styled.article`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
`;

const StoryTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.tight};
  margin-bottom: ${tokens.spacing.md};

  span {
    color: ${tokens.colors.primary};
  }
`;

const StoryText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 760px;
`;

const PillarList = styled.div`
  display: grid;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.xl};
`;

const PillarItem = styled.div`
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: ${tokens.spacing.md};
  align-items: start;
  padding-top: ${tokens.spacing.md};
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const PillarIndex = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color};
  letter-spacing: 0.1em;
`;

const PillarCopy = styled.div`
  strong {
    display: block;
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes.lg};
    color: ${tokens.colors.text};
    margin-bottom: 4px;
  }

  span {
    color: ${tokens.colors.textMuted};
    line-height: ${tokens.lineHeights.relaxed};
  }
`;

const VisualPanel = styled.aside`
  position: relative;
  min-height: 420px;
  overflow: hidden;
  background: ${tokens.colors.dark};
  border: 1px solid rgba(124, 58, 237, 0.24);
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.card};

  img {
    width: 100%;
    height: 100%;
    min-height: 420px;
    object-fit: cover;
    display: block;
    filter: saturate(0.92) contrast(1.02);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, transparent 36%, rgba(10, 10, 10, 0.76)),
      linear-gradient(90deg, rgba(124, 58, 237, 0.28), transparent 48%);
    pointer-events: none;
  }
`;

const VisualCaption = styled.div`
  position: absolute;
  left: ${tokens.spacing.lg};
  right: ${tokens.spacing.lg};
  bottom: ${tokens.spacing.lg};
  z-index: 2;
  color: #fff;

  span {
    display: block;
    margin-bottom: ${tokens.spacing.xs};
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${tokens.colors.mint};
  }

  strong {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes['2xl']};
    line-height: ${tokens.lineHeights.snug};
  }
`;

const RoleGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RoleCard = styled.article`
  position: relative;
  min-height: 260px;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}33`};
  ${clipBR(CHAMFER.md)}
  box-shadow: ${tokens.shadows.sm};
  transition: transform ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadows.card};
  }
`;

const RoleKicker = styled.span`
  display: inline-block;
  margin-bottom: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const RoleTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin-bottom: ${tokens.spacing.sm};
`;

const RoleText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const JobBoardShell = styled.div`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.18);
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;
  box-shadow: ${tokens.shadows.card};
`;

const JobBoardTop = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg};
  background:
    linear-gradient(135deg, rgba(124, 58, 237, 0.09), rgba(20, 184, 166, 0.06)),
    ${tokens.colors.surface};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const JobBoardLabel = styled.div`
  display: grid;
  gap: 4px;

  span {
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    color: ${tokens.colors.primary};
    letter-spacing: 0.1em;
    text-transform: uppercase;
  }

  strong {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes.xl};
    color: ${tokens.colors.text};
  }
`;

const IframeWrap = styled.div`
  position: relative;
  height: min(1180px, 150vh);
  min-height: 760px;
  background: ${tokens.colors.surfaceAlt};

  ${media.md} {
    height: 1120px;
  }
`;

const JobsFrame = styled.iframe`
  width: 100%;
  height: 100%;
  border: 0;
  display: block;
  background: #fff;
`;

const FallbackNote = styled.p`
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  border-top: 1px solid rgba(0, 0, 0, 0.06);
`;

const workingModes = [
  {
    title: 'Academy mit echtem Impact',
    text: 'Du arbeitest an Bildung, die Menschen direkt in neue Rollen, bessere Arbeit und konkrete KI-Anwendung bringt.',
    color: tokens.colors.primary,
  },
  {
    title: 'Startup-Speed mit Struktur',
    text: 'Kurze Wege, klare Verantwortung und genug Raum, Dinge wirklich zu bauen statt nur zu verwalten.',
    color: tokens.colors.mint,
  },
  {
    title: 'Nah an KI, Community und Markt',
    text: 'Du bist dort, wo neue Tools, Unternehmenskontakte, Workshops und echte Lernbedarfe zusammenkommen.',
    color: tokens.colors.orange,
  },
];

const roleAreas = [
  {
    kicker: 'Education',
    title: 'Dozent:innen & KI-Expert:innen',
    text: 'Für Menschen, die KI nicht nur verstehen, sondern anderen praxisnah beibringen können.',
    color: tokens.colors.primary,
  },
  {
    kicker: 'Growth',
    title: 'Marketing, Sales & Community',
    text: 'Für alle, die unsere Programme sichtbar machen und starke Beziehungen in den Markt bauen.',
    color: tokens.colors.mint,
  },
  {
    kicker: 'Operations',
    title: 'Academy-Aufbau & Organisation',
    text: 'Für Talente, die Prozesse, Teilnehmende, Formate und Teamalltag sauber zusammenbringen.',
    color: tokens.colors.orange,
  },
];

export default function KarrierePageClient() {
  const breadcrumbs = [
    { label: 'Karriere', href: '/karriere', active: true },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Karriere"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="Gestalte KI-Bildung <br/><span>mit uns.</span>"
        subtitle="Wir bauen die STARTPLATZ AI Academy weiter aus: praxisnah, menschlich und mitten im Innovations-Ökosystem von Köln und Düsseldorf."
        image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1400/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png"
        breadcrumbs={breadcrumbs}
        accentColor={tokens.colors.primaryLighter}
      >
        <Button href="#offene-stellen" size="lg" offset arrow>
          Offene Stellen ansehen
        </Button>
        <Button href={PERSONIO_URL} variant="secondary" size="lg" target="_blank" rel="noopener noreferrer" arrow>
          In Personio öffnen
        </Button>
      </PageHero>

      <SectionBlock
        badge="Warum STARTPLATZ AI Academy"
        title="Ein Team für <span>echte KI-Kompetenz.</span>"
        subtitle="Bei uns geht es nicht um abstrakte Zukunftsversprechen, sondern um Lernformate, die Menschen und Unternehmen sofort weiterbringen."
        variant="light"
        accent={tokens.colors.glow}
      >
        <IntroGrid>
          <StoryPanel>
            <CyberCorners $color={tokens.colors.primary} $size={12} />
            <StoryTitle>
              Wir suchen Menschen, die <span>mitdenken, mitbauen und Verantwortung übernehmen.</span>
            </StoryTitle>
            <StoryText>
              Unsere Academy verbindet Weiterbildung, Beratung, Community und Startup-Energie. Wenn du Lust hast, KI-Bildung nah an echten Problemen zu gestalten, findest du hier ein Umfeld mit Tempo, Gestaltungsraum und einem Team, das Wirkung wichtiger nimmt als Buzzwords.
            </StoryText>
            <PillarList>
              {workingModes.map((item, index) => (
                <PillarItem key={item.title}>
                  <PillarIndex $color={item.color}>{String(index + 1).padStart(2, '0')}</PillarIndex>
                  <PillarCopy>
                    <strong>{item.title}</strong>
                    <span>{item.text}</span>
                  </PillarCopy>
                </PillarItem>
              ))}
            </PillarList>
          </StoryPanel>

          <VisualPanel>
            <CyberCorners $color={tokens.colors.mint} $size={14} />
            <Image
              src="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png"
              alt="Das STARTPLATZ AI Academy Team"
              fill
              sizes="(min-width: 1024px) 38vw, 100vw"
              loading="lazy"
            />
            <VisualCaption>
              <span>Köln · Düsseldorf · Remote</span>
              <strong>Academy, Startup-Ökosystem und KI-Praxis in einem Umfeld.</strong>
            </VisualCaption>
          </VisualPanel>
        </IntroGrid>
      </SectionBlock>

      <SectionBlock
        badge="Bereiche"
        title="Wo du bei uns <span>andocken kannst.</span>"
        subtitle="Unsere offenen Rollen wechseln. Diese drei Arbeitsfelder bleiben der Kern unseres Teams."
        variant="white"
        accent={tokens.colors.glowMint}
      >
        <RoleGrid>
          {roleAreas.map((role) => (
            <RoleCard key={role.title} $color={role.color}>
              <CyberCorners $color={role.color} $size={10} />
              <RoleKicker $color={role.color}>{role.kicker}</RoleKicker>
              <RoleTitle>{role.title}</RoleTitle>
              <RoleText>{role.text}</RoleText>
            </RoleCard>
          ))}
        </RoleGrid>
      </SectionBlock>

      <SectionBlock
        id="offene-stellen"
        badge="Offene Stellen"
        title="Aktuelle Jobs <span>live aus Personio.</span>"
        subtitle="Das Board wird direkt aus unserem Recruiting-System geladen. Falls dein Browser das eingebettete Board blockiert, kannst du Personio in einem neuen Tab öffnen."
        variant="light"
        accent={tokens.colors.glow}
      >
        <JobBoardShell>
          <CyberCorners $color={tokens.colors.primary} $size={12} />
          <JobBoardTop>
            <JobBoardLabel>
              <span>STARTPLATZ AI Academy Jobs</span>
              <strong>Bewerbung läuft sicher über Personio</strong>
            </JobBoardLabel>
            <Button href={PERSONIO_URL} variant="secondary" target="_blank" rel="noopener noreferrer" arrow>
              Extern öffnen
            </Button>
          </JobBoardTop>
          <IframeWrap>
            <JobsFrame
              src={PERSONIO_URL}
              title="Offene Stellen der STARTPLATZ AI Academy auf Personio"
              loading="lazy"
            />
          </IframeWrap>
          <FallbackNote>
            Wird das Jobboard nicht angezeigt, öffne die aktuelle Karriereseite direkt unter{' '}
            <a href={PERSONIO_URL} target="_blank" rel="noopener noreferrer">
              ai-academy.jobs.personio.com
            </a>.
          </FallbackNote>
        </JobBoardShell>
      </SectionBlock>

      <CTABanner
        title="Keine passende Rolle gesehen?"
        subtitle="Schau regelmäßig wieder rein oder bewirb dich initiativ über unser Personio-Board, wenn du glaubst, dass du die Academy sinnvoll stärker machst."
      >
        <Button href={PERSONIO_URL} size="lg" offset target="_blank" rel="noopener noreferrer" arrow>
          Zum Jobboard
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
