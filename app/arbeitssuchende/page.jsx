'use client';

import React from 'react';
import styled, { keyframes } from 'styled-components';
import {
  BeforeAfter,
  Button,
  CTABanner,
  DetailTable,
  FreebieConsole,
  MiniFAQ,
  MilestoneRail,
  PageHero,
  ProjectCinemaShowcase,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
  StatsRow,
  TwoColumn,
  VisualSlot,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';
import { PRODUCT_CATALOG_URL } from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';

const Panel = styled.div`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const quoteMarquee = keyframes`
  from { transform: translateX(0); }
  to { transform: translateX(-50%); }
`;

const QuoteViewport = styled.div`
  overflow: hidden;
  margin-top: ${tokens.spacing.lg};
  padding: ${tokens.spacing.sm} 0;
  -webkit-mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);
  mask-image: linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent);

  &:hover div,
  &:focus-within div {
    animation-play-state: paused;
  }
`;

const QuoteTrack = styled.div`
  display: flex;
  gap: ${tokens.spacing.lg};
  width: max-content;
  animation: ${quoteMarquee} 42s linear infinite;

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    flex-wrap: wrap;
    width: 100%;
  }
`;

const QuoteCard = styled.figure`
  position: relative;
  flex: 0 0 clamp(260px, 31vw, 420px);
  min-height: 148px;
  margin: 0;
  padding: ${tokens.spacing.lg};
  background: rgba(255, 255, 255, 0.78);
  border: 1px solid rgba(20, 184, 166, 0.18);
  ${clipBR(CHAMFER.md)}
  box-shadow: ${tokens.shadows.sm};
`;

const QuoteMark = styled.span`
  display: block;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.mint};
  line-height: 1;
  margin-bottom: ${tokens.spacing.sm};
`;

const QuoteText = styled.blockquote`
  margin: 0;
  color: ${tokens.colors.textSoft};
  font-size: ${tokens.fontSizes.lg};
  line-height: ${tokens.lineHeights.snug};
`;

const QuoteSource = styled.figcaption`
  margin-top: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.06em;
  text-transform: uppercase;
`;

export default function ArbeitssuchendePage() {
  const before = [
    'Kein Job begeistert dich so wirklich.',
    'Angst, wieder im selben 9-to-5-Hamsterrad zu landen.',
    'Du fragst dich, ob du noch relevant bist.',
  ];

  const after = [
    'Du bewegst etwas Sinnvolles — mit KI-Kompetenz und Nachweis.',
    'Ein Job, der sich deinem Leben anpasst — nicht umgekehrt.',
    'Cert-IT Zertifikat, eigenes Projekt, klarer Karriereweg.',
  ];

  const details = [
    { label: 'Format', value: '8 Wochen Vollzeit (40 Unterrichtstage)' },
    { label: 'Rhythmus', value: 'Mo-Fr, 9-16 Uhr, digital' },
    { label: 'Teilnehmer', value: 'Max. 20 pro Kurs' },
    { label: 'Zertifikat', value: 'Cert-IT (DIN EN ISO/IEC 17024)' },
    { label: 'Förderung', value: '100% Bildungsgutschein (AZAV)' },
    { label: 'Bewertung', value: '4,98/5 (290+ Bewertungen)' },
  ];

  const curriculum = [
    {
      step: '1-2',
      title: 'KI-Grundlagen & Prompt Engineering',
      description: 'ChatGPT, KI-Geschichte, Fachsprache und Architektur. Du gewinnst Sicherheit und Orientierung im KI-Kosmos.',
    },
    {
      step: '3-4',
      title: 'KI-Tools & Automatisierung',
      description: 'n8n, GPT-APIs, KI-Agenten und Code-Reviews. Du baust echte Workflows — nicht nur Theorie.',
    },
    {
      step: '5-6',
      title: 'Prozesse, Ethik & Strategie',
      description: 'Workflow-Optimierung, EU AI Act, Governance und Datenschutz. KI sicher und sinnvoll in echte Abläufe bringen.',
    },
    {
      step: '7-8',
      title: 'Praxisprojekt & Zertifizierung',
      description: 'Eigenes KI-Agenten-Projekt, Präsentation und Abschlussprüfung. Du gehst mit Nachweis und Portfolio raus.',
    },
  ];

  const process = [
    {
      step: '1',
      title: 'Kostenloses Beratungsgespräch',
      description: 'Dein Ansprechpartner Armin prüft gemeinsam mit dir, ob der KI-Manager zu dir passt und wie du die Förderung optimal nutzt.',
    },
    {
      step: '2',
      title: 'Bildungsgutschein beantragen',
      description: 'Du bekommst alle Kursdetails und Argumente, um das Gespräch mit der Agentur für Arbeit oder dem Jobcenter souverän zu führen.',
    },
    {
      step: '3',
      title: 'FortyDays starten',
      description: '8 Wochen intensives Vollzeitprogramm — digital, eng begleitet, mit klarer Struktur von Tag 1.',
    },
  ];

  const stats = [
    { value: 1000, label: 'Absolventen', suffix: '+' },
    { displayValue: '4,98/5', label: 'Bewertung' },
    { value: 100, label: 'Förderquote', suffix: '%' },
    { displayValue: '60.000', label: 'Offene KI-Stellen in Deutschland' },
  ];

  const projectExamples = [
    {
      kicker: 'Teilnehmerprojekt / App',
      title: 'Tankr²',
      hook: 'Aus einer handgeschriebenen App-Story wurde eine echte PWA: Tankvorgänge fotografieren, OCR auslesen, Reporting sehen.',
      image: '/project-examples/tankr-cover.png',
      imageAlt: 'Cover des Teilnehmerprojekts Tankr',
      deckLabel: 'Tankr² - Eine KI-Reise',
      deckMeta: 'App, OCR, Self-hosted Stack',
      acts: [
        {
          label: 'Ausgangspunkt',
          text: 'Kein Code, sondern eine klare Produktgeschichte: Was soll passieren, wenn ein Nutzer Cockpit und Zapfsäule fotografiert?',
        },
        {
          label: 'KI als Baupartner',
          text: 'Claude übersetzte die Story in eine Markdown-Spec, Antigravity lieferte die erste App, danach kam der Reboot mit besserer UX.',
        },
        {
          label: 'Ergebnis',
          text: 'React, Vite, Supabase, n8n, Resend und Mistral Vision: OCR-Konfidenz von etwa 50% auf etwa 90% verbessert.',
        },
      ],
      proof: ['Von Sprache zu Produkt', 'OCR-Tuning', 'Live-Demo-fähig'],
      ctaLabel: 'Eigene Projektidee finden',
    },
    {
      kicker: 'Teilnehmerprojekt / Compliance',
      title: 'Die Zukunft der SOP-Erstellung',
      hook: 'Ein GMP-naher Workflow, der Pflichtdokumentation in ein skalierbares Compliance-System übersetzt.',
      image: '/project-examples/sop-cover.png',
      imageAlt: 'Cover des Teilnehmerprojekts zur automatisierten SOP-Erstellung',
      deckLabel: 'SOP-Erstellung',
      deckMeta: 'n8n, KI-Agenten, GMP',
      acts: [
        {
          label: 'Problem',
          text: 'SOPs kosten Wochen, werden inkonsistent geschrieben und erzeugen Audit-Risiken durch manuelle Pflege.',
        },
        {
          label: 'Workflow',
          text: 'Formulareingabe, KI-Analyse, strukturierte Generierung und Layout-Ausgabe in HTML, CSS und PDF.',
        },
        {
          label: 'Ergebnis',
          text: 'EU-GMP-konforme Dokumente mit einheitlicher Sprache, dynamischen Templates und Audit-Trail in Google Sheets.',
        },
      ],
      proof: ['Business Case', 'Governance', 'Enterprise-tauglich'],
      ctaLabel: 'Projektpfad besprechen',
    },
    {
      kicker: 'Teilnehmerprojekt / Jobsuche',
      title: 'Der Job Finder Buddy',
      hook: 'Ein persönlicher KI-Assistent, der Job-Alerts, RSS-Quellen und Matching-Logik in eine klare Bewerbungsauswahl verwandelt.',
      image: '/project-examples/jobfinder-cover.png',
      imageAlt: 'Cover des Teilnehmerprojekts Job Finder Buddy',
      deckLabel: 'Job Finder Buddy',
      deckMeta: 'RSS, Gmail, OpenAI Matching',
      acts: [
        {
          label: 'Pain',
          text: 'Zu viele Job-Alert-Mails, verstreute Portale und manuelles Prüfen jeder einzelnen Stelle.',
        },
        {
          label: 'System',
          text: 'RSS-Collector, Gmail-Trigger, Plattform-Parser, First-Level-Filter und tiefes Matching gegen das eigene Profil.',
        },
        {
          label: 'Output',
          text: 'Aus rund 100 Jobs werden 10 bis 15 starke Matches mit fundierter Entscheidungsgrundlage für Bewerbungen.',
        },
      ],
      proof: ['Persönlicher ROI', 'n8n Pipeline', 'Matching-Score'],
      ctaLabel: 'Neustart konkret planen',
    },
  ];

  const freebies = [
    {
      title: 'KI-Manager Projektideen Canvas',
      description: 'Ein Canvas, mit dem du aus einer vagen Idee ein präsentierbares Kursprojekt machst.',
      href: '/freebies/ki-manager-projektideen-canvas.md',
      type: 'Canvas',
    },
    {
      title: 'Bildungsgutschein Gesprächsprompt',
      description: 'Prompt für eine klare Argumentation im Gespräch mit Agentur für Arbeit oder Jobcenter.',
      href: '/freebies/bildungsgutschein-gespraechsprompt.md',
      type: 'Prompt',
    },
    {
      title: 'Bewerbungsstory Prompt Pack',
      description: 'Prompts für Positionierung, Stellenanzeigen-Matching und Interviewtraining.',
      href: '/freebies/bewerbungsstory-prompt-pack.md',
      type: 'Prompt Pack',
    },
  ];

  const testimonials = [
    { quote: 'Ich habe nicht einmal Zeit gefunden, mit Freunden zu zocken — weil es mich so gepackt hat. Das Programm hat nicht nur mein Wissen verändert, sondern auch mein Selbstbewusstsein.', source: 'Oskar, Absolvent' },
    { quote: 'Am meisten hat mich beeindruckt, wie viel Zeit man durch Automatisierungen zurückgewinnen kann. Ich weiß jetzt, wie ich wieder Herrin meiner Zeit werde.', source: 'Aline, Absolventin' },
    { quote: 'Ich habe 20 Jahre Marketingerfahrung — und war trotzdem überrascht, wie viel Neues ich gelernt habe. Tools, Strategie, echte Prozesse.', source: 'Catharina, Absolventin' },
    { quote: 'Was ich jemandem sagen würde? Ganz einfach: Mach\'s. Top-Investition — Inhalte, Community, Support und echte Weiterentwicklung.', source: 'Peter, Absolvent' },
    { quote: 'Mich hat besonders beeindruckt, wie viel Substanz das Programm hatte — und die Gruppe war wirklich auf Top-Level. Eine Community, die sich auch nach dem Kurs vernetzt.', source: 'Olga, Absolventin' },
    { quote: 'Ich komme aus der IT und dachte, ich kenne die Tools. Das Programm hat mir ganz neue Perspektiven gezeigt — wie KI Prozesse nutzerzentriert gestalten kann.', source: 'Oliver, Absolvent' },
    { quote: 'Ich bin Mitte 50, Fernsehjournalistin — mit Technik hatte ich wenig zu tun. Trotzdem habe ich alles mitgenommen. Der Zug fährt nicht ohne mich vorbei.', source: 'Birgit, Absolventin' },
    { quote: 'Ich kann jedem empfehlen mitzumachen. Man bekommt einen Überblick, entdeckt neue Potenziale und kann sich danach gezielt in die Tiefe arbeiten.', source: 'Alex, Absolvent' },
  ];

  const faq = [
    { q: 'Wie bekomme ich den Bildungsgutschein?', a: 'Du sprichst mit deiner Agentur für Arbeit oder deinem Jobcenter. Wir bereiten dich in einem kostenlosen Beratungsgespräch mit allen Kursdaten, Zielen und Argumenten gezielt auf dieses Gespräch vor.' },
    { q: 'Wie sieht ein typischer Tag im FortyDays aus?', a: 'Mo–Fr, 9–16 Uhr (inkl. Mittagspause): Live-Theorie von 9–12 Uhr, betreute Praxis von 13–15 Uhr. 100% digital — du kannst von überall teilnehmen.' },
    { q: 'Was ist die Cert-IT Zertifizierung?', a: 'Cert-IT zertifiziert Personen nach DIN EN ISO/IEC 17024 — dem internationalen Standard für Personenzertifizierungen. Das Zertifikat ist EU-weit anerkannt und belegt deine KI-Kompetenz offiziell.' },
    { q: 'Brauche ich einen technischen Hintergrund?', a: 'Nein. Über 1.000 Absolventinnen und Absolventen aus allen Branchen — Marketing, HR, Journalismus, Vertrieb — haben es ohne Vorkenntnisse geschafft. Du lernst mit Tools wie ChatGPT, n8n und APIs.' },
    { q: 'Was passiert nach den 8 Wochen?', a: 'Du gehst mit einem anerkannten Zertifikat, einem eigenen Praxisprojekt und klarer Positionierung für Bewerbungen. Über 60.000 offene KI-Stellen warten — und du bist bereit.' },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="100% Gefördert · AZAV"
        badgeColor={tokens.colors.mint}
        badgeBg={tokens.colors.mintBg}
        title="In 8 Wochen von überfordert zu <span>selbstbewusst.</span>"
        subtitle="FortyDays KI-Manager:in. Vollzeit, digital, komplett kostenfrei mit Bildungsgutschein."
        breadcrumbs={[{ label: 'Arbeitssuchende', href: '/arbeitssuchende', active: true }]}
        accentColor={tokens.colors.mintBg}
        image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469601/ai-hub/website/AI-Academy-Website-Images/target-audience-arbeitssuchende.png"
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="mint" size="lg" arrow>
          Kostenlos beraten lassen
        </Button>
        <Button href="/wissens-test" variant="secondary" size="lg">
          Wissens-Test machen
        </Button>
      </PageHero>

      <SectionBlock
        badge="Vorher / Nachher"
        title="Aus Unsicherheit wird <span>Nachweis.</span>"
        subtitle="Kein Motivationsspruch. Echte Struktur, echte Projekte, ein anerkanntes Zertifikat — in 8 Wochen."
        accent={tokens.colors.glowMint}
      >
        <BeforeAfter before={before} after={after} accentColor={tokens.colors.mint} />
      </SectionBlock>

      <SectionBlock
        badge="Produkt"
        title="FortyDays <span>KI-Manager:in</span>"
        subtitle="Ein klares Vollzeitformat für deinen Neustart in KI."
        variant="muted"
        accent={tokens.colors.glowMint}
      >
        <TwoColumn>
          <Panel>
            <CyberCorners $color={tokens.colors.mint} $size={10} />
            <DetailTable items={details} />
          </Panel>
          <VisualSlot
            title="FortyDays Lernreise"
            image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469601/ai-hub/website/AI-Academy-Website-Images/target-audience-arbeitssuchende.png"
            accentColor={tokens.colors.mint}
            prompt="Use case: infographic-diagram. Asset type: subpage visual. Structured 8-week AI learning roadmap, no readable small text, premium STARTPLATZ purple/teal palette, editorial, clean, no logos, no watermark."
          />
        </TwoColumn>
      </SectionBlock>

      <SectionBlock
        badge="Curriculum"
        title="8 Wochen, klar <span>geführt.</span>"
        subtitle="Jede Phase baut auf der vorherigen auf und endet in praktischer Anwendung."
        accent={tokens.colors.glowMint}
      >
        <MilestoneRail
          items={curriculum.map((item) => ({
            ...item,
            kicker: `Woche ${item.step}`,
          }))}
          intro={{
            kicker: 'FortyDays Lernpfad',
            title: 'Vom ersten Prompt bis zum eigenen KI-Agenten.',
            text: 'Der rote Faden bleibt sichtbar: Orientierung, Anwendung, Strategie und Zertifizierung bauen aufeinander auf.',
            meta: ['40 Unterrichtstage', 'Live begleitet', 'Portfolio-Projekt'],
          }}
          accentColor={tokens.colors.mint}
          accentBg={tokens.colors.mintBg}
        />
      </SectionBlock>

      <SectionBlock
        badge="Projektbeispiele"
        title="Echte Abschlussprojekte statt <span>Kursversprechen.</span>"
        subtitle="Drei reale KI-Manager Projekte aus dem Kurs: App, Compliance-Automation und Jobsuche. Genau so wird aus Lernen ein Portfolio."
        variant="dark"
        accent={tokens.colors.glowMint}
        allowOverflow
      >
        <ProjectCinemaShowcase
          projects={projectExamples}
          accentColor={tokens.colors.mint}
          eyebrow="KI-Manager Projekt-Cinema"
          title="Das ist der Moment, in dem aus Unsicherheit ein eigenes System wird."
          text="Kein Demo-Content. Echte Teilnehmerinnen und Teilnehmer haben aus vagen Problemen funktionierende KI-Produkte, Automationen und Entscheidungslogik gebaut."
          ctaHref={CALENDLY_URL}
          ctaLabel="Eigene Projektidee besprechen"
        />
      </SectionBlock>

      <SectionBlock
        badge="Förderungsprozess"
        title="So kommst du zum <span>Bildungsgutschein.</span>"
        variant="white"
        accent={tokens.colors.glowMint}
      >
        <SpotlightBento
          ariaLabel="Bildungsgutschein Prozess"
          accentColor={tokens.colors.mint}
          accentBg={tokens.colors.mintBg}
          items={process.map((item, index) => ({
            label: `Schritt ${item.step}`,
            metric: item.step,
            title: item.title,
            description: item.description,
            size: index === 0 ? 'wide' : index === 1 ? 'sm' : 'full',
            chips: index === 0
              ? ['Passung prüfen', 'Argumente sammeln']
              : index === 1
                ? ['Agentur für Arbeit', 'Jobcenter']
                : ['Starttermin', 'Kursplan'],
          }))}
        />
      </SectionBlock>

      <SectionBlock title="Nach Zahlen" centered accent={tokens.colors.glowMint}>
        <StatsRow stats={stats} />
      </SectionBlock>

      <SectionBlock
        badge="Absolventen"
        title="Echte Stimmen aus dem <span>Kursalltag.</span>"
        subtitle="Von 290+ Absolventinnen und Absolventen — echte Einblicke, ungefiltert."
        variant="muted"
        accent={tokens.colors.glowMint}
      >
        <QuoteViewport aria-label="Stimmen aus dem FortyDays Kurs">
          <QuoteTrack role="list">
            {[...testimonials, ...testimonials].map((item, index) => (
              <QuoteCard key={`${item.source}-${index}`} role="listitem">
                <CyberCorners $color={tokens.colors.mint} $size={7} />
                <QuoteMark aria-hidden="true">"</QuoteMark>
                <QuoteText>{item.quote}</QuoteText>
                <QuoteSource>{item.source}</QuoteSource>
              </QuoteCard>
            ))}
          </QuoteTrack>
        </QuoteViewport>
      </SectionBlock>

      <SectionBlock
        badge="Freebies"
        title="Hol dir ein <span>KI-Manager Startpaket.</span>"
        subtitle="Nützliche Prompts und Canvas-Vorlagen, die schon vor dem Kurs Orientierung bringen und später als Projektstarter funktionieren."
        accent={tokens.colors.glowMint}
      >
        <FreebieConsole
          kicker="Kostenlos downloaden"
          title="Prompts, Canvas, Beratung."
          text="Diese Dateien sind bewusst praktisch: erst verstehen, dann ausprobieren, dann im Beratungsgespräch den passenden Weg klären."
          resources={freebies}
          accentColor={tokens.colors.mint}
          accentBg={tokens.colors.mintBg}
        />
      </SectionBlock>

      <SectionBlock
        badge="Gefragte Suchfragen"
        subtitle="Direkte Antworten auf Fragen, die Menschen vor einer geförderten KI-Weiterbildung stellen."
        accent={tokens.colors.glowMint}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.arbeitssuchende} accentColor={tokens.colors.mint} />
      </SectionBlock>

      <SectionBlock
        badge="FAQ"
        title="Fragen vor dem <span>Start.</span>"
        accent={tokens.colors.glowMint}
      >
        <MiniFAQ items={faq} accentColor={tokens.colors.mint} />
      </SectionBlock>

      <CTABanner
        title="Bereit für deinen <span>Neustart?</span>"
        subtitle="Wir prüfen gemeinsam, ob FortyDays und der Bildungsgutschein zu deiner Situation passen."
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="mint" size="lg" arrow>
          Kostenlos beraten lassen
        </Button>
        <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
          Produktkatalog ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
