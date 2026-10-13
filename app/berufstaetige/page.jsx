'use client';

import React from 'react';
import styled from 'styled-components';
import {
  BeforeAfter,
  Button,
  CTABanner,
  DetailTable,
  FreebieConsole,
  MilestoneRail,
  PageHero,
  ProjectCinemaShowcase,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
  StatsRow,
  TwoColumn,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';
import { PRODUCT_CATALOG_URL } from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';
import { getCourse, TRAEGER } from '../../lib/academyFacts';

const course = getCourse('ki-manager-teilzeit');

const Panel = styled.div`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const PanelTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
`;

const PanelText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};

  & + & {
    margin-top: ${tokens.spacing.sm};
  }
`;

export default function BerufstaetigePage() {
  const before = [
    'Alle reden über KI. Du nickst und hoffst.',
    'Dein Chef fragt: "Können wir das mit KI?"',
    'Du fühlst dich abgehängt.',
  ];

  const after = [
    'Du setzt KI in deinen Abläufen gezielt ein.',
    'Du sagst: "Kann ich zeigen. Hier ist der Workflow."',
    'Du bringst KI-Kompetenz ins Team, nicht nur Neugier.',
  ];

  const details = [
    { label: 'Format', value: `${course.durationWeeks} Wochen in Teilzeit, ${course.teachingUnits} Unterrichtseinheiten` },
    { label: 'Rhythmus', value: 'Montag bis Donnerstag, 14–18 Uhr' },
    { label: 'Ort', value: 'Online oder vor Ort in Köln' },
    { label: 'Förderung', value: 'Förderfähig über das Qualifizierungschancengesetz (QCG)' },
    { label: 'Abschluss', value: `Abschlusszertifikat „KI-Manager/in“ der ${TRAEGER.name}` },
    { label: 'Zulassung', value: `AZAV-Maßnahme ${course.massnahmennummer}, zertifiziert durch ${TRAEGER.azav.certifiedBy}` },
  ];

  const weekRhythm = [
    {
      label: 'Theorie',
      title: 'Montag & Mittwoch',
      description: 'Live-Unterricht von 14 bis 18 Uhr: Grundlagen, Methoden und Tools, die du in der Woche anwendest.',
      metric: 'Mo · Mi',
      size: 'wide',
      chips: ['Live', '14–18 Uhr'],
    },
    {
      label: 'Praxis',
      title: 'Dienstag & Donnerstag',
      description: 'Betreute Praxis-Tage: Du wendest das Gelernte an, wir unterstützen. Wenn der Job einmal vorgeht, verpasst du keine Theorie.',
      metric: 'Di · Do',
      size: 'md',
      chips: ['Betreut', 'Freiwillig'],
    },
  ];

  const curriculum = [
    {
      step: '1',
      title: 'KI-Grundlagen & Prompt Engineering',
      description: 'Wie KI funktioniert, Fachsprache und Prompt Engineering. Du gewinnst Sicherheit und Orientierung.',
    },
    {
      step: '2',
      title: 'KI-Tools & Automatisierung',
      description: 'n8n, APIs und KI-Agenten. Du baust echte Workflows für wiederkehrende Aufgaben.',
    },
    {
      step: '3',
      title: 'Prozesse, Ethik & Strategie',
      description: 'Prozessoptimierung, EU AI Act, Governance und Datenschutz: KI sicher in echte Abläufe bringen.',
    },
    {
      step: '4',
      title: 'Praxisprojekt & Abschluss',
      description: 'Dein eigenes KI-Projekt, idealerweise aus deinem Arbeitsalltag. Du präsentierst es und gehst mit Zertifikat raus.',
    },
  ];

  const qcgSteps = [
    {
      step: '1',
      title: 'Kostenloses Beratungsgespräch',
      description: 'Wir prüfen gemeinsam, ob der Kurs zu dir passt, und klären die Fördermöglichkeiten für deine Situation.',
    },
    {
      step: '2',
      title: 'Gespräch mit deinem Arbeitgeber',
      description: 'Du bekommst Kursunterlagen und Argumente. Dein Arbeitgeber stellt dich nachmittags ab 14 Uhr frei.',
    },
    {
      step: '3',
      title: 'Förderung beantragen',
      description: 'Die Förderung über das QCG wird gemeinsam mit deinem Arbeitgeber bei der Agentur für Arbeit beantragt.',
    },
    {
      step: '4',
      title: 'Start',
      description: `${course.durationWeeks} Wochen, vier Nachmittage pro Woche: Theorie und betreute Praxis im Wechsel.`,
    },
  ];

  const stats = [
    { value: 1000, label: 'Absolventen', suffix: '+' },
    { value: 20, label: 'Max. Teilnehmer pro Kurs' },
    { value: course.durationWeeks, label: 'Wochen, Mo–Do ab 14 Uhr' },
  ];

  const workflowExamples = [
    {
      kicker: 'Real Workflow / Dokumentation',
      title: 'SOP-Erstellung automatisieren',
      hook: 'Ein reales KI-Manager Projekt zeigt, wie aus Prozessbeschreibung, KI-Agenten und Templates automatisch GMP-nahe SOP-Dokumente entstehen.',
      image: '/project-examples/sop-cover.png',
      imageAlt: 'Cover des Teilnehmerprojekts zur automatisierten SOP-Erstellung',
      deckLabel: 'SOP-Erstellung',
      deckMeta: 'n8n, KI-Agenten, Audit-Trail',
      acts: [
        {
          label: 'Trigger',
          text: 'Eine strukturierte Formulareingabe beschreibt den Prozess, statt dass Fachkräfte jedes Dokument neu aufsetzen.',
        },
        {
          label: 'Automation',
          text: 'n8n orchestriert KI-Analyse, Kapitelstruktur, Textgenerierung, Tabellen und professionelle Ausgabe.',
        },
        {
          label: 'Business-Wert',
          text: 'Konsistente Sprache, bessere Nachverfolgbarkeit und skalierbare Compliance-Logik statt Copy-Paste-Dokumentation.',
        },
      ],
      proof: ['Compliance Case', 'Audit-Sicherheit', 'Skalierbar'],
      ctaLabel: 'Workflow-Passung klären',
    },
    {
      kicker: 'Real Workflow / Matching',
      title: 'Job Finder Buddy',
      hook: 'Ein persönlicher Automations-Stack, der Job-Alert-Mails, RSS-Quellen und OpenAI-Matching in eine brauchbare Shortlist verwandelt.',
      image: '/project-examples/jobfinder-cover.png',
      imageAlt: 'Cover des Teilnehmerprojekts Job Finder Buddy',
      deckLabel: 'Job Finder Buddy',
      deckMeta: 'RSS, Gmail, OpenAI',
      acts: [
        {
          label: 'Input-Chaos',
          text: 'LinkedIn, StepStone, Xing, service.bund.de und weitere Quellen liefern Masse, aber keine Entscheidung.',
        },
        {
          label: 'Workflow',
          text: 'Collector, Parser, First-Level-Processor und Detail-Matching bewerten Stellen gegen Profil, Motivation und Projekte.',
        },
        {
          label: 'Ergebnis',
          text: 'Aus ungefähr 100 Jobs werden 10 bis 15 passende Optionen, die eine Bewerbung wirklich verdienen.',
        },
      ],
      proof: ['API-Kosten senken', 'Matching-Score', 'Entscheidungshilfe'],
      ctaLabel: 'Use Case besprechen',
    },
    {
      kicker: 'Real Workflow / Produkt',
      title: 'Tankr²',
      hook: 'Eine PWA, die Fotos, OCR, Reporting und Backend-Automation verbindet - gebaut aus einer Produktstory statt klassischem Coding-Start.',
      image: '/project-examples/tankr-cover.png',
      imageAlt: 'Cover des Teilnehmerprojekts Tankr',
      deckLabel: 'Tankr²',
      deckMeta: 'PWA, OCR, n8n',
      acts: [
        {
          label: 'Produkt-Idee',
          text: 'Tankvorgänge sollen nicht mehr in Excel, Belegen oder Notizen verschwinden, sondern per Foto erfasst werden.',
        },
        {
          label: 'Automation',
          text: 'OCR-Extraktion, Supabase, Edge Functions, n8n-Webhooks und E-Mail-Prozesse arbeiten als zusammenhängender Stack.',
        },
        {
          label: 'Lerneffekt',
          text: 'Nicht nur ein Tool bedienen, sondern Architektur, Feedback-Loops und Debugging-Entscheidungen nachvollziehen.',
        },
      ],
      proof: ['Produktdenken', 'OCR Pipeline', 'Self-hosted'],
      ctaLabel: 'Projekt besprechen',
    },
  ];

  const freebies = [
    {
      title: 'AI Automation Workflow Canvas',
      description: 'Ein Canvas, um Trigger, KI-Schritt, Human Review und Output sauber zu planen.',
      href: '/freebies/ai-automation-workflow-canvas.md',
      type: 'Canvas',
    },
    {
      title: 'Meeting-to-Tasks Blueprint',
      description: 'Konkreter Ablauf und Prompt, um aus Meetingnotizen Aufgaben zu erzeugen.',
      href: '/freebies/meeting-to-tasks-blueprint.md',
      type: 'Blueprint',
    },
    {
      title: 'Automation ROI Prompt',
      description: 'Prompt, der wiederkehrende Aufgaben auf Zeitgewinn, Risiko und Umsetzbarkeit prüft.',
      href: '/freebies/automation-roi-prompt.md',
      type: 'Prompt',
    },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Berufsbegleitend · Teilzeit"
        badgeColor={tokens.colors.navy}
        badgeBg={tokens.colors.navyBg}
        title="Nachmittags lernen. <span>Morgen anwenden.</span>"
        subtitle={`KI-Manager/in in Teilzeit: ${course.durationWeeks} Wochen, Montag bis Donnerstag ab 14 Uhr, online oder vor Ort in Köln. Förderfähig über das Qualifizierungschancengesetz.`}
        breadcrumbs={[{ label: 'Berufstätige', href: '/berufstaetige', active: true }]}
        accentColor={tokens.colors.navyBg}
        image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469600/ai-hub/website/AI-Academy-Website-Images/target-audience-berufstaetige.png"
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="navy" size="lg" arrow>
          Kostenlos beraten lassen
        </Button>
        <Button href="/wissens-test" variant="secondary" size="lg">
          Wissens-Test machen
        </Button>
      </PageHero>

      <SectionBlock
        badge="Vorher / Nachher"
        title="Von Mitreden zu <span>Vormachen.</span>"
        subtitle="Für Berufstätige, die KI im Job konkret einsetzen wollen, ohne dafür den Job zu pausieren."
        accent={tokens.colors.glowNavy}
      >
        <BeforeAfter before={before} after={after} accentColor={tokens.colors.navy} />
      </SectionBlock>

      <SectionBlock
        badge="Weiterbildung"
        title="KI-Manager/in <span>in Teilzeit</span>"
        subtitle="Dasselbe Programm wie die Vollzeit-Variante, verteilt auf 16 Wochen und vier Nachmittage pro Woche."
        variant="muted"
        accent={tokens.colors.glowNavy}
      >
        <TwoColumn>
          <Panel>
            <CyberCorners $color={tokens.colors.mint} $size={10} />
            <DetailTable items={details} />
          </Panel>
          <Panel>
            <CyberCorners $color={tokens.colors.mint} $size={10} />
            <PanelTitle>Für wen?</PanelTitle>
            <PanelText>
              Für Berufstätige, die nachmittags ab 14 Uhr Zeit haben. Meistens stellt der Arbeitgeber dafür frei,
              denn er profitiert direkt: Das Praxisprojekt entsteht idealerweise aus deinem eigenen Arbeitsalltag.
            </PanelText>
            <PanelText>
              Keine Programmierkenntnisse nötig. Du lernst die Tools im Kurs und wendest sie an den Praxis-Tagen an.
            </PanelText>
          </Panel>
        </TwoColumn>
      </SectionBlock>

      <SectionBlock
        badge="Wochenrhythmus"
        title="Zwei Tage Theorie, <span>zwei Tage Praxis.</span>"
        subtitle="Die Praxis-Tage sind ein Angebot: Wir sind da und unterstützen. Wenn der Job einmal vorgeht, ist das so."
        accent={tokens.colors.glowNavy}
      >
        <SpotlightBento
          ariaLabel="Wochenrhythmus der KI-Manager Weiterbildung in Teilzeit"
          accentColor={tokens.colors.navy}
          accentBg={tokens.colors.navyBg}
          items={weekRhythm}
        />
      </SectionBlock>

      <SectionBlock
        badge="Curriculum"
        title="Vier Phasen, klar <span>geführt.</span>"
        subtitle="Jede Phase baut auf der vorherigen auf und endet in praktischer Anwendung."
        accent={tokens.colors.glowNavy}
      >
        <MilestoneRail
          items={curriculum.map((item) => ({
            ...item,
            kicker: `Phase ${item.step}`,
          }))}
          intro={{
            kicker: 'KI-Manager Lernpfad',
            title: 'Vom ersten Prompt bis zum eigenen KI-Projekt.',
            text: 'Theorie am Montag und Mittwoch, Anwendung am Dienstag und Donnerstag. So bleibt das Gelernte nicht liegen.',
            meta: [`${course.teachingUnits} Unterrichtseinheiten`, 'Live begleitet', 'Praxisprojekt'],
          }}
          accentColor={tokens.colors.navy}
          accentBg={tokens.colors.navyBg}
        />
      </SectionBlock>

      <SectionBlock
        badge="Projektbeispiele"
        title="Automation wird erst spannend, wenn sie <span>echte Arbeit</span> verändert."
        subtitle="Drei reale KI-Manager Projekte: Dokumentation, Jobsuche und Produktworkflow."
        variant="dark"
        accent={tokens.colors.glowNavy}
        allowOverflow
      >
        <ProjectCinemaShowcase
          projects={workflowExamples}
          accentColor={tokens.colors.navy}
          eyebrow="KI-Manager Project Cinema"
          title="So sehen Workflows aus, die nicht nach Demo riechen."
          text="Jedes Projekt nimmt einen konkreten Schmerzpunkt und übersetzt ihn in Trigger, KI-Schritt, Datenstruktur und verwertbaren Output."
          ctaHref={CALENDLY_URL}
          ctaLabel="Projekt aus deinem Job finden"
        />
      </SectionBlock>

      <SectionBlock
        badge="Förderung"
        title="Gefördert über das <span>Qualifizierungschancengesetz.</span>"
        subtitle="Die Weiterbildung ist eine AZAV-zugelassene Maßnahme. Wie viel gefördert wird, hängt unter anderem von der Betriebsgröße ab, das klären wir im Beratungsgespräch."
        accent={tokens.colors.glowNavy}
      >
        <MilestoneRail
          items={qcgSteps.map((item) => ({
            ...item,
            kicker: `Schritt ${item.step}`,
          }))}
          intro={{
            kicker: 'QCG in vier Schritten',
            title: 'Vom ersten Gespräch bis zum Kursstart.',
            text: 'Wir begleiten dich und deinen Arbeitgeber durch den Förderprozess.',
            meta: ['Für Beschäftigte', 'Mit deinem Arbeitgeber', 'AZAV-zugelassen'],
          }}
          accentColor={tokens.colors.navy}
          accentBg={tokens.colors.navyBg}
        />
      </SectionBlock>

      <SectionBlock title="Nach Zahlen" variant="white" centered accent={tokens.colors.glowNavy}>
        <StatsRow stats={stats} />
      </SectionBlock>

      <SectionBlock
        badge="Freebies"
        title="Nimm dir die ersten <span>Automation Blueprints.</span>"
        subtitle="Prompts und Workflow-Vorlagen, die Professionals wirklich speichern, teilen und ausprobieren können."
        accent={tokens.colors.glowNavy}
      >
        <FreebieConsole
          kicker="Kostenlos downloaden"
          title="Workflow Canvas, Meeting Blueprint, ROI Prompt."
          text="Drei Vorlagen, mit denen du prüfst, welche Aufgaben sich in deinem Arbeitsalltag zu automatisieren lohnen."
          resources={freebies}
          accentColor={tokens.colors.navy}
          accentBg={tokens.colors.navyBg}
        />
      </SectionBlock>

      <SectionBlock
        badge="FAQ"
        title="Fragen vor dem <span>Start.</span>"
        subtitle="Direkte Antworten auf Fragen, die Berufstätige vor einer KI-Weiterbildung in Teilzeit stellen."
        accent={tokens.colors.glowNavy}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.berufstaetige} accentColor={tokens.colors.navy} />
      </SectionBlock>

      <CTABanner
        title="Mach KI zu deinem <span>Arbeitsvorteil.</span>"
        subtitle="Wir klären gemeinsam, ob die Weiterbildung und eine Förderung über das QCG für dich passen."
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="navy" size="lg" arrow>
          Kostenlos beraten lassen
        </Button>
        <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
          Produktkatalog ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
