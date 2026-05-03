'use client';

import React from 'react';
import styled from 'styled-components';
import {
  BeforeAfter,
  Button,
  CTABanner,
  FeatureCard,
  MilestoneRail,
  MiniFAQ,
  PageHero,
  ResponsiveGrid,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
  StatsRow,
  TwoColumn,
  VisualSlot,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';
import { PRODUCT_CATALOG_URL } from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';

const DetailStack = styled.div`
  display: grid;
  gap: ${tokens.spacing.xl};
`;

const OfferDetail = styled.article`
  position: relative;
  scroll-margin-top: 104px;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};

  ${media.lg} {
    grid-template-columns: minmax(220px, 0.72fr) minmax(0, 1.28fr);
    align-items: start;
  }
`;

const DetailMeta = styled.span`
  display: inline-block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.colors.orange};
`;

const DetailTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.tight};
`;

const DetailText = styled.p`
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 760px;
`;

const DetailList = styled.ul`
  display: grid;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};

  li {
    position: relative;
    padding-left: 1.4rem;
  }

  li::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.72em;
    width: 8px;
    height: 8px;
    background: ${tokens.colors.orange};
    ${clipBR(2)}
    transform: translateY(-50%) rotate(45deg);
  }
`;

export default function UnternehmenPage() {
  const before = [
    'Der Vorstand fragt nach KI-Strategie. Du hast keine.',
    'Dein Team experimentiert planlos mit ChatGPT.',
    'Du weißt nicht, wo anfangen.',
  ];

  const after = [
    'Du präsentierst einen Kompetenzrahmen mit Roadmap.',
    'Dein Team automatisiert Prozesse mit klaren Guidelines.',
    'Nach einem Innovation Day weißt du es.',
  ];

  const offers = [
    {
      id: 'innovation-day',
      title: 'Innovation Day',
      duration: '1 Tag',
      text: 'In einem Tag von "Was ist KI?" zu "So setzen wir es ein."',
    },
    {
      id: 'inhouse-schulungen',
      title: 'Inhouse KI-Schulung',
      duration: '1-5 Tage',
      text: 'Euer Team versteht und nutzt KI — ab nächster Woche.',
    },
    {
      id: 'private-academy',
      title: 'AI-Private Academy',
      duration: '3-12 Monate',
      text: 'Eure eigene KI-Akademie. Maßgeschneidert. Begleitet. Messbar.',
    },
    {
      id: 'oneday-workshops',
      title: 'OneDay Workshops',
      duration: '1 Tag',
      text: 'Spezifische Tools und Skills, direkt einsetzbar.',
    },
  ];

  const offerDetails = [
    {
      id: 'innovation-day',
      meta: '1 Tag · Strategie & Use Cases',
      title: 'Innovation Day',
      text: 'Ein intensiver Arbeitstag für Teams, die aus KI-Neugier ein klares Lagebild machen wollen. Am Ende stehen priorisierte Use Cases, erste Guidelines und ein realistischer nächster Schritt.',
      bullets: [
        'Für Führungsteams, Fachbereiche oder gemischte Projektgruppen',
        'Workshop, Tool-Demos, Use-Case-Mapping und Roadmap-Sprint',
        'Ideal als Pilot, bevor ihr größere Trainings oder eine Private Academy startet',
      ],
    },
    {
      id: 'inhouse-schulungen',
      meta: '1-5 Tage · Training im Team',
      title: 'Inhouse KI-Schulung',
      text: 'Für Teams, die KI nicht nur verstehen, sondern im eigenen Arbeitsalltag anwenden wollen. Inhalte, Beispiele und Übungen werden auf eure Prozesse, Tools und Rollen zugeschnitten.',
      bullets: [
        'Praxisnahes Training für Marketing, Sales, HR, Operations oder Führung',
        'Konkrete Workflows statt abstrakter Tool-Show',
        'Auf Wunsch mit Datenschutz-, EU-AI-Act- und Governance-Bausteinen',
      ],
    },
    {
      id: 'private-academy',
      meta: '3-12 Monate · Skalierbarer Kompetenzaufbau',
      title: 'AI-Private Academy',
      text: 'Eure eigene KI-Akademie für nachhaltigen Kompetenzaufbau. Wir kombinieren Curriculum, Dozenten, interne Lernpfade und Transferformate zu einem Programm, das mit eurer Organisation wächst.',
      bullets: [
        'Für Unternehmen, die KI-Kompetenz über mehrere Teams ausrollen wollen',
        'Eigene Lernpfade, wiederkehrende Sessions und Transferaufgaben',
        'Begleitung mit Metriken, Refreshern und strategischer Weiterentwicklung',
      ],
    },
  ];

  const pillars = [
    {
      step: '1',
      title: 'Technologische Grundlagen',
      description: 'Euer Team versteht Modelle, Tools, Grenzen und sinnvolle Einsatzfelder.',
    },
    {
      step: '2',
      title: 'Anwendung im Unternehmenskontext',
      description: 'Aus Wissen werden Workflows, Guidelines und konkrete Use Cases.',
    },
    {
      step: '3',
      title: 'Strategische & ethische Einbettung',
      description: 'KI wird steuerbar: Datenschutz, EU AI Act, Rollen und Roadmap.',
    },
  ];

  const process = [
    { step: '1', title: 'Bedarfsanalyse', description: 'Wo steht euer Team? Was ist das Ziel?' },
    { step: '2', title: 'Curriculum-Design', description: 'Maßgeschneidert für eure Branche und Prozesse.' },
    { step: '3', title: 'Training', description: 'Durch Dozenten, die selbst täglich mit KI arbeiten.' },
    { step: '4', title: 'Nachbetreuung', description: 'Refresher-Sessions und Support für nachhaltigen Transfer.' },
  ];

  const stats = [
    { value: 100, label: 'Unternehmen geschult', suffix: '+' },
    { value: 500, label: 'KI-Events durchgeführt', suffix: '+' },
    { value: 15, label: 'Jahre STARTPLATZ', suffix: '+' },
  ];

  const faq = [
    { q: 'Was kostet ein KI-Training für unser Team?', a: 'Das hängt von Format, Dauer und Individualisierung ab. Innovation Days und Inhouse-Formate kalkulieren wir nach Zielbild und Teamgröße.' },
    { q: 'Wie individuell sind die Inhalte?', a: 'Sehr individuell. Wir starten mit Bedarfsanalyse und bauen Beispiele, Übungen und Transferaufgaben rund um eure realen Prozesse.' },
    { q: 'Wie messen wir den ROI der Schulung?', a: 'Wir definieren vorab Use Cases, Zeitersparnis, Qualitätsziele und Transfermetriken. So bleibt das Training nicht bei Inspiration stehen.' },
    { q: 'Können wir mit einem Pilottag starten?', a: 'Ja. Der Innovation Day ist genau dafür gedacht: ein klares Lagebild, erste Use Cases und eine belastbare nächste Roadmap.' },
    { q: 'Welche Förderprogramme gibt es für Unternehmen?', a: 'Je nach Team und Beschäftigungssituation kann das Qualifizierungschancengesetz relevant sein. Wir prüfen das im Erstgespräch.' },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Für Teams & Organisationen"
        badgeColor={tokens.colors.orange}
        badgeBg={tokens.colors.orangeBg}
        title="Euer Team nutzt KI produktiv — <span>nicht nur zum Experimentieren.</span>"
        subtitle="Von OneDay Workshops bis zur 12-monatigen Private Academy. 100+ Unternehmen vertrauen uns bereits."
        breadcrumbs={[{ label: 'Unternehmen', href: '/unternehmen', active: true }]}
        accentColor={tokens.colors.orangeBg}
        image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469603/ai-hub/website/AI-Academy-Website-Images/target-audience-unternehmen.png"
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="orange" size="lg" arrow>
          Gespräch buchen
        </Button>
        <Button href="/oneday" variant="secondary" size="lg">
          OneDay ansehen
        </Button>
      </PageHero>

      <SectionBlock
        badge="Vorher / Nachher"
        title="Aus KI-Experimenten wird <span>Kompetenzaufbau.</span>"
        accent={tokens.colors.glowOrange}
      >
        <BeforeAfter before={before} after={after} accentColor={tokens.colors.orange} />
      </SectionBlock>

      <SectionBlock
        id="angebote"
        badge="Angebote"
        title="Das passende Format für eure <span>Situation.</span>"
        subtitle="Vom Pilottag bis zur eigenen Academy."
        variant="muted"
        accent={tokens.colors.glowOrange}
      >
        <SpotlightBento
          ariaLabel="KI-Angebote für Unternehmen"
          accentColor={tokens.colors.orange}
          accentBg={tokens.colors.orangeBg}
          items={offers.map((offer, index) => ({
            label: offer.duration,
            title: offer.title,
            description: offer.text,
            href: index < 3 ? `/unternehmen#${offer.id}` : '/oneday',
            cta: index < 3 ? 'Format vertiefen' : 'OneDays vergleichen',
            size: index === 0 ? 'wide' : index === 1 ? 'sm' : 'md',
            chips: index === 0
              ? ['Pilot', 'Roadmap']
              : index === 1
                ? ['Teamtraining', 'Use Cases']
                : index === 2
                  ? ['Rollout', 'Messbar']
                  : ['Kompakt', 'Toolfokus'],
          }))}
        />
      </SectionBlock>

      <SectionBlock
        badge="Formate im Detail"
        title="Drei Einstiege, die euer Team <span>wirklich weiterbringen.</span>"
        subtitle="Vom ersten Pilottag bis zum langfristigen Kompetenzaufbau: jedes Format hat ein klares Ziel, einen passenden Rahmen und ein greifbares Ergebnis."
        accent={tokens.colors.glowOrange}
      >
        <DetailStack>
          {offerDetails.map((detail) => (
            <OfferDetail key={detail.id} id={detail.id}>
              <div>
                <CyberCorners $color={tokens.colors.orange} $size={8} />
                <DetailMeta>{detail.meta}</DetailMeta>
                <DetailTitle>{detail.title}</DetailTitle>
              </div>
              <div>
                <DetailText>{detail.text}</DetailText>
                <DetailList>
                  {detail.bullets.map((bullet) => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </DetailList>
              </div>
            </OfferDetail>
          ))}
        </DetailStack>
      </SectionBlock>

      <SectionBlock
        badge="Kompetenzrahmen"
        title="Drei Säulen, damit KI <span>tragfähig</span> wird."
        accent={tokens.colors.glowOrange}
      >
        <TwoColumn>
          <ResponsiveGrid $cols={1}>
            {pillars.map((pillar) => (
              <FeatureCard
                key={pillar.title}
                step={pillar.step}
                title={pillar.title}
                description={pillar.description}
                accentColor={tokens.colors.orange}
                accentBg={tokens.colors.orangeBg}
                cornerColor={tokens.colors.orange}
              />
            ))}
          </ResponsiveGrid>
          <VisualSlot
            title="KI-Kompetenzrahmen"
            image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469603/ai-hub/website/AI-Academy-Website-Images/target-audience-unternehmen.png"
            accentColor={tokens.colors.orange}
            prompt="Use case: infographic-diagram. Asset type: company subpage visual. Three-pillar AI competence framework with abstract blocks and roadmap arrows, no tiny text, STARTPLATZ purple/coral palette, clean premium B2B training style, no logos, no watermark."
          />
        </TwoColumn>
      </SectionBlock>

      <SectionBlock
        badge="Prozess"
        title="So wird daraus ein <span>Training.</span>"
        variant="white"
        accent={tokens.colors.glowOrange}
      >
        <MilestoneRail
          items={process.map((item) => ({
            ...item,
            kicker: `Phase ${item.step}`,
          }))}
          intro={{
            kicker: 'Umsetzungspfad',
            title: 'Vom Zielbild zum Transfer im Team.',
            text: 'Der Prozess führt Entscheider:innen von der Lageklärung in ein passendes Curriculum und endet nicht am Workshoptag.',
            meta: ['Bedarf', 'Design', 'Training', 'Transfer'],
          }}
          accentColor={tokens.colors.orange}
          accentBg={tokens.colors.orangeBg}
        />
      </SectionBlock>

      <SectionBlock title="Nach Zahlen" centered accent={tokens.colors.glowOrange}>
        <StatsRow stats={stats} />
      </SectionBlock>

      <SectionBlock
        badge="Gefragte Suchfragen"
        subtitle="Direkte Antworten auf Fragen, die Entscheider vor einer KI-Schulung im Unternehmen stellen."
        accent={tokens.colors.glowOrange}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.unternehmen} accentColor={tokens.colors.orange} />
      </SectionBlock>

      <SectionBlock badge="FAQ" title="Fragen für <span>Entscheider.</span>" accent={tokens.colors.glowOrange}>
        <MiniFAQ items={faq} accentColor={tokens.colors.orange} />
      </SectionBlock>

      <CTABanner
        title="Startet mit einem <span>klaren Bild.</span>"
        subtitle="Im Erstgespräch klären wir Zielgruppe, Format, Förderoptionen und den sinnvollsten Startpunkt."
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="orange" size="lg" arrow>
          Gespräch buchen
        </Button>
        <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
          Produktkatalog ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
