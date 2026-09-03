'use client';

import React from 'react';
import {
  BeforeAfter,
  Button,
  CTABanner,
  FreebieConsole,
  MiniFAQ,
  PageHero,
  ProjectCinemaShowcase,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
  StatsRow,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens } from '../../styles/tokens';
import { CALENDLY_URL } from '../../lib/site';
import { PRODUCT_CATALOG_URL } from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';

export default function BerufstaetigePage() {
  const before = [
    'Alle reden über KI. Du nickst und hoffst.',
    'Dein Chef fragt: "Können wir das mit KI?"',
    'Du fühlst dich abgehängt.',
  ];

  const after = [
    'Du automatisierst Prozesse, die andere händisch machen.',
    'Du sagst: "Kann ich zeigen. Hier ist der Workflow."',
    'Du stehst vor deinem Chef besser da.',
  ];

  const curriculum = [
    {
      icon: '01',
      title: 'n8n Workflows',
      description: 'Du baust Automationen, die wiederkehrende Aufgaben sichtbar reduzieren.',
    },
    {
      icon: '02',
      title: 'GPT-APIs & Agents',
      description: 'Du verbindest KI-Modelle mit Prozessen statt nur einzelne Prompts zu schreiben.',
    },
    {
      icon: '03',
      title: 'RAG & Wissen',
      description: 'Du lernst, wie interne Dokumente und KI-Antworten sauber zusammenkommen.',
    },
    {
      icon: '04',
      title: 'Security & EU AI Act',
      description: 'Du nutzt KI produktiv, ohne Datenschutz und Governance zu ignorieren.',
    },
  ];

  const stats = [
    { value: 1000, label: 'Absolventen', suffix: '+' },
    { value: 20, label: 'Max. Teilnehmer pro Kurs' },
    { displayValue: '2x', label: 'Pro Woche, Di & Do' },
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
      ctaLabel: 'Automation starten',
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

  const faq = [
    { q: 'Schaffe ich das neben meinem Vollzeitjob?', a: 'Ja, wenn du zwei feste Zeitfenster pro Woche blockst. Der Kurs ist bewusst auf berufsbegleitendes Lernen ausgelegt.' },
    { q: 'Was lerne ich in den OneDay-Workshops?', a: 'OneDay ist kompakter: ein Tag, ein Thema, ein konkretes Deliverable. AfterWork führt dich tiefer über 8 Wochen.' },
    { q: 'Kann mein Arbeitgeber die Kosten über QCG übernehmen?', a: 'Ja, AfterWork ist QCG-förderfähig. Wir helfen dir, die Argumentation und nächsten Schritte mit deinem Arbeitgeber vorzubereiten.' },
    { q: 'Was ist der Unterschied zwischen AfterWork und FortyDays?', a: 'FortyDays ist Vollzeit für Arbeitssuchende. AfterWork läuft berufsbegleitend und fokussiert Automation im Job.' },
    { q: 'Brauche ich Vorkenntnisse?', a: 'Nein. Grundlegende digitale Sicherheit reicht. Du lernst die Tools im Kurs und arbeitest an nachvollziehbaren Business Cases.' },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Berufsbegleitend"
        badgeColor={tokens.colors.navy}
        badgeBg={tokens.colors.navyBg}
        title="Du bringst zwei Abende. <span>Wir bringen den Rest.</span>"
        subtitle="AfterWork AI Automation. 8 Wochen, neben dem Job, sofort anwendbar."
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
        subtitle="AfterWork ist für Menschen gebaut, die KI im Job konkret einsetzen wollen."
        accent={tokens.colors.glowNavy}
      >
        <BeforeAfter before={before} after={after} accentColor={tokens.colors.navy} />
      </SectionBlock>

      <SectionBlock
        badge="Echte Workflow-Cases"
        title="Automation wird erst spannend, wenn sie <span>echte Arbeit</span> verändert."
        subtitle="Drei reale KI-Manager Projekte als Entscheidungsfläche: Dokumentation, Jobsuche und Produktworkflow."
        variant="dark"
        accent={tokens.colors.glowNavy}
        allowOverflow
      >
        <ProjectCinemaShowcase
          projects={workflowExamples}
          accentColor={tokens.colors.navy}
          eyebrow="AI Automation Project Cinema"
          title="So sehen Workflows aus, die nicht nach Demo riechen."
          text="Jedes Projekt nimmt einen konkreten Schmerzpunkt und übersetzt ihn in Trigger, KI-Schritt, Datenstruktur und verwertbaren Output."
          ctaHref={CALENDLY_URL}
          ctaLabel="Workflow im Job finden"
        />
      </SectionBlock>

      <SectionBlock
        badge="Skill-Stack"
        title="Welche Bausteine du dafür <span>beherrschst.</span>"
        subtitle="Die Tools sind nicht das Ziel. Sie sind die Bauteile, mit denen du wiederholbare Workflows entwirfst."
        accent={tokens.colors.glowNavy}
      >
        <SpotlightBento
          ariaLabel="AfterWork AI Automation Ergebnisse"
          accentColor={tokens.colors.navy}
          accentBg={tokens.colors.navyBg}
          items={curriculum.map((item, index) => ({
            label: `Skill ${item.icon}`,
            title: item.title,
            description: item.description,
            metric: item.icon,
            size: index === 0 ? 'wide' : index === 1 ? 'sm' : 'md',
            chips: index === 0
              ? ['Routine weg', 'Zeit zurück']
              : index === 1
                ? ['API-Logik', 'Agenten']
                : index === 2
                  ? ['Wissen', 'Antwortqualität']
                  : ['Governance', 'Sicherheit'],
          }))}
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
          text="Diese Freebies bringen Traffic, weil sie kein bloßer Newsletter-Köder sind. Sie helfen direkt beim Entscheiden: Was lohnt sich zu automatisieren?"
          resources={freebies}
          accentColor={tokens.colors.navy}
          accentBg={tokens.colors.navyBg}
        />
      </SectionBlock>

      <SectionBlock
        badge="Gefragte Suchfragen"
        subtitle="Direkte Antworten auf Fragen, die Professionals vor einer berufsbegleitenden KI-Weiterbildung stellen."
        accent={tokens.colors.glowNavy}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.berufstaetige} accentColor={tokens.colors.navy} />
      </SectionBlock>

      <SectionBlock
        badge="FAQ"
        title="Fragen vor dem <span>Feierabend-Kurs.</span>"
        accent={tokens.colors.glowNavy}
      >
        <MiniFAQ items={faq} accentColor={tokens.colors.navy} />
      </SectionBlock>

      <CTABanner
        title="Mach KI zu deinem <span>Arbeitsvorteil.</span>"
        subtitle="Wir klären gemeinsam, ob AfterWork und eine Förderung über QCG für dich passen."
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
