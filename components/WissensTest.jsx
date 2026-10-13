'use client';

import React, { useState, useCallback } from 'react';
import styled, { keyframes, css } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';

/* ─────────────────────────────────────────────
   KI WISSENS-TEST
   Fullscreen step-by-step quiz based on
   4D AI Fluency Framework (Anthropic)
   10 questions → 4 result levels → program CTA
   ───────────────────────────────────────────── */

/* ── 4D Dimensions ──────────────────────────── */
const DIMENSIONS = {
  describe:  { label: 'Beschreiben', color: tokens.colors.mint,   icon: '◈' },
  delegate:  { label: 'Delegieren',  color: tokens.colors.navy,   icon: '◇' },
  discern:   { label: 'Bewerten',    color: tokens.colors.primary, icon: '◆' },
  direct:    { label: 'Steuern',     color: tokens.colors.orange,  icon: '▣' },
};

/* ── Questions ────────────────────────────────
   Scoring: 0 = falsch, 1 = akzeptabel, 2 = gut, 3 = optimal
   Alle Optionen klingen plausibel.
   Correct-Position variiert bewusst (kein Shuffle nötig).
   ──────────────────────────────────────────── */
const QUESTIONS = [
  {
    id: 1,
    dimension: 'describe',
    question: 'ChatGPT "versteht" Sprache wie ein Mensch. Stimmt das?',
    options: [
      { icon: '○', text: 'Ja, LLMs verstehen Sprache ähnlich wie Menschen.', score: 1 },
      { icon: '◇', text: 'Nein, sie berechnen wahrscheinliche Fortsetzungen.', score: 3 },
      { icon: '□', text: 'Sie suchen fertige Antworten aus einer Datenbank.', score: 0 },
      { icon: '▣', text: 'Der Unterschied ist im Alltag praktisch egal.', score: 2 },
    ],
  },
  {
    id: 2,
    dimension: 'describe',
    question: 'Du willst eine Wettbewerbsanalyse mit KI starten. Was hilft?',
    options: [
      { icon: '○', text: 'Firmennamen eingeben und komplette Analyse verlangen.', score: 1 },
      { icon: '◇', text: 'Branche, Wettbewerber, Kriterien und Format festlegen.', score: 3 },
      { icon: '□', text: 'Viele Dokumente hochladen und frei analysieren lassen.', score: 1 },
      { icon: '▣', text: 'Jeden Wettbewerber einzeln fragen und selbst bündeln.', score: 2 },
    ],
  },
  {
    id: 3,
    dimension: 'delegate',
    question: 'Ein KI-Entwurf klingt zu förmlich. Was tust du?',
    options: [
      { icon: '○', text: 'Manuell überarbeiten, Tonalität kann KI kaum.', score: 1 },
      { icon: '◇', text: 'Drei neue Versionen erzeugen und die beste nehmen.', score: 1 },
      { icon: '□', text: 'Konkretes Feedback plus Beispielton geben.', score: 3 },
      { icon: '▣', text: '"Lockerer Ton" ergänzen und von vorne starten.', score: 2 },
    ],
  },
  {
    id: 4,
    dimension: 'delegate',
    question: 'Dein Team soll KI nutzen, um den wöchentlichen Reporting-Aufwand zu reduzieren. Welche Strategie wählst du?',
    options: [
      { icon: '○', text: 'Ein Tool kaufen und Reports vollautomatisch erzeugen.', score: 1 },
      { icon: '◇', text: 'Rohdaten per Standard-Prompt in Review-Entwürfe wandeln.', score: 3 },
      { icon: '□', text: 'Jedes Teammitglied nutzt eigene Prompts und Methoden.', score: 1 },
      { icon: '▣', text: 'KI nur für Datenaufbereitung einsetzen.', score: 2 },
    ],
  },
  {
    id: 5,
    dimension: 'discern',
    question: 'Eine KI erstellt dir eine Marktanalyse mit konkreten Zahlen und Quellenangaben. Alles wirkt schlüssig. Wie gehst du vor?',
    options: [
      { icon: '○', text: 'Quellen stichprobenartig prüfen.', score: 3 },
      { icon: '◇', text: 'Wenn Quellen genannt werden, sind sie ausgewertet.', score: 0 },
      { icon: '□', text: 'Zahlen grob mit Branchenwissen abgleichen.', score: 2 },
      { icon: '▣', text: 'KI-Analysen grundsätzlich verwerfen.', score: 0 },
    ],
  },
  {
    id: 6,
    dimension: 'discern',
    question: 'Du bittest eine KI um Empfehlungen für Projektmanagement-Software. Die Antwort enthält detaillierte Feature-Vergleiche und Preise. Was bedenkst du?',
    options: [
      { icon: '○', text: 'KI-Modelle haben aktuelle Produktdatenbanken.', score: 0 },
      { icon: '◇', text: 'Preise und Features direkt beim Anbieter prüfen.', score: 3 },
      { icon: '□', text: 'Als Startpunkt nutzen und Bewertungsportale checken.', score: 2 },
      { icon: '▣', text: 'KI-Empfehlungen sind grundsätzlich nicht neutral.', score: 1 },
    ],
  },
  {
    id: 7,
    dimension: 'discern',
    question: 'Du nutzt KI, um Bewerbungen vorzufiltern. Ein Kollege äußert Bedenken wegen möglicher Diskriminierung. Was ist deine Einschätzung?',
    options: [
      { icon: '○', text: 'KI ist objektiver als Menschen, Bedenken sind übertrieben.', score: 0 },
      { icon: '◇', text: 'Ein Disclaimer im Bewerbungsprozess reicht aus.', score: 0 },
      { icon: '□', text: 'Bias prüfen, Audits nutzen, Menschen entscheiden lassen.', score: 3 },
      { icon: '▣', text: 'KI in sensiblen HR-Prozessen nie einsetzen.', score: 1 },
    ],
  },
  {
    id: 8,
    dimension: 'direct',
    question: 'Du führst KI-Tools in einem Unternehmen mit 200 Mitarbeitern ein. Es gibt Begeisterung, aber auch Ängste. Wie gehst du vor?',
    options: [
      { icon: '○', text: 'Schnell flächendeckend ausrollen.', score: 0 },
      { icon: '◇', text: 'Mit Pilotteams, Use Cases und Guidelines starten.', score: 3 },
      { icon: '□', text: 'Jedes Team entscheidet frei über Nutzung.', score: 1 },
      { icon: '▣', text: 'Erst 6 Monate schulen, dann produktiv nutzen.', score: 1 },
    ],
  },
  {
    id: 9,
    dimension: 'direct',
    question: 'Dein Unternehmen möchte eine interne KI-Richtlinie erstellen. Was sollte sie priorisieren?',
    options: [
      { icon: '○', text: 'Maximale Nutzung in allen Teams fördern.', score: 0 },
      { icon: '◇', text: 'Datenregeln, Vertraulichkeit und Output-Review klären.', score: 3 },
      { icon: '□', text: 'Nur Enterprise-Tools erlauben, alles andere sperren.', score: 2 },
      { icon: '▣', text: 'Nur freigegebene Use Cases zulassen.', score: 1 },
    ],
  },
  {
    id: 10,
    dimension: 'direct',
    question: 'Ein Startup-Gründer fragt dich: "Werden KI-Agenten in 2 Jahren die meisten Bürojobs ersetzen?" Was antwortest du?',
    options: [
      { icon: '○', text: 'Ja, ohne Automatisierung verschwinden Unternehmen.', score: 0 },
      { icon: '◇', text: 'Aufgaben verschwinden, Berufsbilder verändern sich.', score: 3 },
      { icon: '□', text: 'Agenten sind noch zu unzuverlässig für echte Arbeit.', score: 1 },
      { icon: '▣', text: 'Nur Wissensarbeit ist betroffen, Handwerk gar nicht.', score: 2 },
    ],
  },
];

/* ── Result Levels ─────────────────────────── */
const LEVELS = [
  {
    key: 'novice',
    label: 'KI-Novize',
    range: [0, 9],
    tagline: 'Du stehst am Anfang — und das ist der beste Zeitpunkt, um zu starten.',
    description: 'Du hast noch wenig Berührungspunkte mit KI gehabt. Kein Problem — die KI-Revolution beginnt gerade erst, und wer jetzt einsteigt, hat einen klaren Vorteil. Die Grundlagen sind schneller gelernt als du denkst.',
    color: tokens.colors.mint,
    program: {
      title: 'KI-Manager/in (Vollzeit)',
      text: '8 Wochen Vollzeit, online oder vor Ort und 100% förderfähig mit Bildungsgutschein. Für deinen strukturierten KI-Neustart.',
      href: '/arbeitssuchende',
      cta: 'Weiterbildung ansehen',
    },
  },
  {
    key: 'explorer',
    label: 'KI-Explorer',
    range: [10, 17],
    tagline: 'Du weißt, was KI kann — jetzt geht es darum, es gezielt einzusetzen.',
    description: 'Du hast ein grundlegendes Verständnis von KI und nutzt sie gelegentlich. Dir fehlt aber noch die Tiefe, um KI strategisch und effizient in deinem Beruf einzusetzen. Mit dem richtigen Training kannst du den nächsten großen Sprung machen.',
    color: tokens.colors.navy,
    program: {
      title: 'KI-Manager/in (Teilzeit)',
      text: '16 Wochen berufsbegleitend, Mo–Do ab 14 Uhr. Für konkrete Workflows, Automatisierung und sichere Anwendung im Job.',
      href: '/berufstaetige',
      cta: 'Weiterbildung ansehen',
    },
  },
  {
    key: 'practitioner',
    label: 'KI-Practitioner',
    range: [18, 24],
    tagline: 'Du nutzt KI aktiv — jetzt wird es Zeit, andere mitzunehmen.',
    description: 'Du arbeitest regelmäßig mit KI-Tools, kennst die Grenzen und weißt, wie man Outputs kritisch bewertet. Dein nächster Schritt: Dieses Wissen strategisch in dein Team oder Unternehmen bringen und KI-Prozesse skalieren.',
    color: tokens.colors.primary,
    program: {
      title: 'OneDay Workshops',
      text: 'Ein Tag, ein Thema, ein konkretes Deliverable. Ideal, wenn du schnell Orientierung oder ein Tool-Setup brauchst.',
      href: '/oneday',
      cta: 'OneDay ansehen',
    },
  },
  {
    key: 'fluent',
    label: 'KI-Fluent',
    range: [25, 30],
    tagline: 'Du bist KI-fluent — die Zukunft gehört dir.',
    description: 'Beeindruckend! Du verstehst KI auf einem hohen Niveau, evaluierst Outputs kritisch und denkst strategisch über KI-Integration nach. Du bist genau die Art von Person, die die KI-Transformation in Unternehmen vorantreiben kann.',
    color: tokens.colors.primary,
    program: {
      title: 'OneDay Deep Dive',
      text: 'Für Fortgeschrittene passt ein fokussierter OneDay Deep Dive oder ein Teamformat, das direkt in Umsetzung geht.',
      href: '/oneday',
      cta: 'Deep Dive ansehen',
    },
  },
];

/* ── Animations ───────────────────────────── */

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(24px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const slideInFromRight = keyframes`
  from { opacity: 0; transform: translateX(40px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const pulseGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 0 rgba(124, 58, 237, 0); }
  50% { box-shadow: 0 0 20px 4px rgba(124, 58, 237, 0.15); }
`;

const countUp = keyframes`
  from { opacity: 0; transform: scale(0.5); }
  to   { opacity: 1; transform: scale(1); }
`;

const barGrow = keyframes`
  from { width: 0%; }
`;

/* ── Styled Components ────────────────────── */

const QuizContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  padding-top: 80px;
`;

const ProgressBar = styled.div`
  position: fixed;
  top: 72px;
  left: 0;
  right: 0;
  z-index: 40;
  height: 3px;
  background: rgba(0, 0, 0, 0.06);
`;

const ProgressFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${tokens.colors.primary}, ${tokens.colors.primaryLight});
  transition: width 500ms cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;

  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: -2px;
    width: 7px;
    height: 7px;
    background: ${tokens.colors.primary};
    border-radius: 1px;
    transform: rotate(45deg);
    box-shadow: 0 0 8px ${tokens.colors.primary};
  }
`;

const StepLabel = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${tokens.colors.textDim};
  margin-bottom: ${tokens.spacing.lg};

  span {
    color: ${tokens.colors.primary};
    font-weight: ${tokens.fontWeights.bold};
  }
`;

const DimensionTag = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || tokens.colors.primary};
  padding: 4px 10px;
  background: ${({ $color }) => $color ? `${$color}12` : 'rgba(124,58,237,0.07)'};
  border: 1px solid ${({ $color }) => $color ? `${$color}30` : 'rgba(124,58,237,0.15)'};
  margin-bottom: ${tokens.spacing.md};
  ${clipBR(CHAMFER.xs)}
`;

const QuestionArea = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing.xl} ${tokens.spacing.lg};

  ${media.lg} {
    padding: ${tokens.spacing['3xl']} ${tokens.spacing['2xl']};
  }
`;

const QuestionCard = styled.div`
  width: 100%;
  max-width: 720px;
  animation: ${fadeIn} 500ms cubic-bezier(0.4, 0, 0.2, 1) both;
`;

const QuestionText = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 3vw, ${tokens.fontSizes['3xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing['2xl']};
  letter-spacing: 0;
`;

const OptionsGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
`;

const LETTERS = ['A', 'B', 'C', 'D'];

const OptionButton = styled.button`
  position: relative;
  width: 100%;
  text-align: left;
  display: grid;
  grid-template-columns: 28px 1fr;
  align-items: center;
  gap: ${tokens.spacing.md};
  padding: 18px 24px;
  padding-left: 54px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.light};
  line-height: ${tokens.lineHeights.normal};
  color: ${tokens.colors.textSoft};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.08);
  ${clipBR(CHAMFER.sm)}
  cursor: pointer;
  transition: all 200ms ease;
  animation: ${slideInFromRight} 400ms cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: ${({ $delay }) => $delay || 0}ms;

  &::before {
    content: attr(data-letter);
    position: absolute;
    left: 18px;
    top: 50%;
    transform: translateY(-50%);
    width: 26px;
    height: 26px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: ${tokens.fonts.mono};
    font-size: 11px;
    font-weight: ${tokens.fontWeights.bold};
    color: ${tokens.colors.textDim};
    background: rgba(0, 0, 0, 0.03);
    border: 1px solid rgba(0, 0, 0, 0.06);
    ${clipBR(4)}
    transition: all 200ms ease;
  }

  &:hover {
    border-color: ${tokens.colors.primary};
    background: ${tokens.colors.surfaceAlt};
    transform: translateX(4px);
    box-shadow: ${tokens.shadows.md};

    &::before {
      background: ${tokens.colors.primary};
      color: #fff;
      border-color: ${tokens.colors.primary};
    }
  }

  &:active {
    transform: translateX(2px);
  }

  ${({ $selected }) => $selected && css`
    border-color: ${tokens.colors.primary};
    background: ${tokens.colors.primaryLighter};
    color: ${tokens.colors.text};
    font-weight: ${tokens.fontWeights.medium};

    &::before {
      background: ${tokens.colors.primary};
      color: #fff;
      border-color: ${tokens.colors.primary};
    }
  `}
`;

const OptionIcon = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 26px;
  height: 26px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  ${clipBR(4)}
`;

/* ── Intro Screen ─────────────────────────── */

const IntroScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing['2xl']} ${tokens.spacing.lg};
`;

const IntroCard = styled.div`
  max-width: 640px;
  text-align: center;
  animation: ${fadeIn} 600ms cubic-bezier(0.4, 0, 0.2, 1) both;
`;

const IntroIcon = styled.div`
  width: 72px;
  height: 72px;
  margin: 0 auto ${tokens.spacing.xl};
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted});
  ${clipBR(CHAMFER.md)}
  font-size: 28px;
  color: #fff;
`;

const IntroTitle = styled.h1`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  text-transform: uppercase;
  letter-spacing: 0;
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.lg};
`;

const IntroHighlight = styled.span`
  background: linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const IntroDescription = styled.p`
  font-size: ${tokens.fontSizes.lg};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 480px;
  margin: 0 auto ${tokens.spacing.md};
  font-weight: ${tokens.fontWeights.light};
`;

const IntroMeta = styled.div`
  display: flex;
  justify-content: center;
  gap: ${tokens.spacing.xl};
  margin-bottom: ${tokens.spacing['2xl']};
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.textDim};

  span { display: flex; align-items: center; gap: 6px; }
`;

const DimensionPreview = styled.div`
  display: flex;
  justify-content: center;
  gap: ${tokens.spacing.md};
  flex-wrap: wrap;
  margin-bottom: ${tokens.spacing['2xl']};
`;

const DimChip = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 6px 14px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $color }) => `${$color}10`};
  border: 1px solid ${({ $color }) => `${$color}25`};
  ${clipBR(CHAMFER.xs)}
`;

const StartBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: 16px 36px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${tokens.colors.primary};
  border: none;
  ${clipBR(CHAMFER.sm)}
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 200ms ease;
  animation: ${pulseGlow} 2s ease infinite;

  &:hover {
    background: ${tokens.colors.primaryHover};
    transform: translate(-2px, -2px);
  }

  svg { width: 16px; height: 16px; transition: transform 200ms; }
  &:hover svg { transform: translateX(3px); }
`;

/* ── Result Screen ────────────────────────── */

const ResultScreen = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${tokens.spacing['2xl']} ${tokens.spacing.lg};
`;

const ResultCard = styled.div`
  width: 100%;
  max-width: 800px;
  animation: ${fadeIn} 600ms cubic-bezier(0.4, 0, 0.2, 1) both;
`;

const ResultHeader = styled.div`
  text-align: center;
  margin-bottom: ${tokens.spacing['3xl']};
`;

const ScoreBadge = styled.div`
  display: inline-flex;
  align-items: baseline;
  gap: 4px;
  margin-bottom: ${tokens.spacing.lg};
  animation: ${countUp} 600ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: 300ms;
`;

const ScoreNumber = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['5xl']}, 10vw, 8rem);
  font-weight: ${tokens.fontWeights.black};
  line-height: 1;
  background: linear-gradient(135deg, ${({ $color }) => $color}, ${tokens.colors.primaryMuted});
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
`;

const ScoreMax = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xl};
  color: ${tokens.colors.textDim};
`;

const ResultLevel = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 4vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  text-transform: uppercase;
  letter-spacing: 0;
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.sm};
`;

const ResultTagline = styled.p`
  font-size: ${tokens.fontSizes.lg};
  color: ${tokens.colors.primary};
  font-weight: ${tokens.fontWeights.medium};
  margin-bottom: ${tokens.spacing.lg};
`;

const ResultDescription = styled.p`
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  font-weight: ${tokens.fontWeights.light};
  max-width: 560px;
  margin: 0 auto;
`;

const DimensionBars = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  margin-bottom: ${tokens.spacing['3xl']};
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.06);
  ${clipBR(CHAMFER.md)}
  position: relative;

  ${media.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

const DimBarItem = styled.div``;

const DimBarLabel = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 8px;
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.textSoft};

  span:last-child {
    font-weight: ${tokens.fontWeights.bold};
    color: ${({ $color }) => $color};
  }
`;

const DimBarTrack = styled.div`
  height: 6px;
  background: rgba(0, 0, 0, 0.04);
  ${clipBR(2)}
  overflow: hidden;
`;

const DimBarFill = styled.div`
  height: 100%;
  background: ${({ $color }) => $color};
  ${clipBR(2)}
  animation: ${barGrow} 800ms cubic-bezier(0.4, 0, 0.2, 1) both;
  animation-delay: ${({ $delay }) => $delay || 0}ms;
`;

const RecommendCard = styled.div`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}30`};
  ${clipBR(CHAMFER.md)}
  margin-bottom: ${tokens.spacing.xl};
`;

const RecommendBadge = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${tokens.colors.textDim};
  margin-bottom: ${tokens.spacing.md};
`;

const RecommendTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  text-transform: uppercase;
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.sm};
`;

const RecommendText = styled.p`
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  font-weight: ${tokens.fontWeights.light};
  margin-bottom: ${tokens.spacing.xl};
`;

const ResultActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  justify-content: center;
`;

const ProgramBtn = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: 14px 28px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 200ms ease;

  &:hover {
    background: ${tokens.colors.primaryHover};
    transform: translate(-2px, -2px);
    color: #fff;
  }

  svg { width: 16px; height: 16px; }
`;

const RestartBtn = styled.button`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: 14px 28px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.medium};
  color: ${tokens.colors.textSoft};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.1);
  ${clipBR(CHAMFER.sm)}
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all 200ms ease;

  &:hover {
    background: ${tokens.colors.surfaceAlt};
    color: ${tokens.colors.text};
    border-color: ${tokens.colors.primary};
  }
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5h8.5m0 0L8 5m3.5 3.5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ── Component ─────────────────────────────── */

export default function WissensTestPage() {
  const [phase, setPhase] = useState('intro');
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animKey, setAnimKey] = useState(0);

  const handleStart = useCallback(() => {
    setPhase('quiz');
    setCurrentQ(0);
    setAnswers({});
    setAnimKey((k) => k + 1);
  }, []);

  const handleSelect = useCallback((questionId, optionIndex, score) => {
    setAnswers((prev) => ({ ...prev, [questionId]: { optionIndex, score } }));

    setTimeout(() => {
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((c) => c + 1);
        setAnimKey((k) => k + 1);
      } else {
        setPhase('result');
      }
    }, 400);
  }, [currentQ]);

  /* Calculate results */
  const getResults = () => {
    const totalScore = Object.values(answers).reduce((sum, a) => sum + a.score, 0);
    const dimScores = {};

    Object.keys(DIMENSIONS).forEach((dim) => {
      const dimQs = QUESTIONS.filter((q) => q.dimension === dim);
      const maxDim = dimQs.length * 3;
      const scored = dimQs.reduce((sum, q) => sum + (answers[q.id]?.score || 0), 0);
      dimScores[dim] = { scored, max: maxDim, pct: maxDim > 0 ? Math.round((scored / maxDim) * 100) : 0 };
    });

    const level = LEVELS.find((l) => totalScore >= l.range[0] && totalScore <= l.range[1]) || LEVELS[0];

    return { totalScore, dimScores, level };
  };

  const progress = phase === 'quiz' ? ((currentQ + 1) / QUESTIONS.length) * 100 : phase === 'result' ? 100 : 0;
  const question = QUESTIONS[currentQ];
  const dim = question ? DIMENSIONS[question.dimension] : null;

  return (
      <QuizContainer>
        {phase !== 'intro' && (
          <ProgressBar>
            <ProgressFill style={{ width: `${progress}%` }} />
          </ProgressBar>
        )}

        {/* ── INTRO ── */}
        {phase === 'intro' && (
          <IntroScreen>
            <IntroCard>
              <IntroIcon aria-hidden="true">{'◈'}</IntroIcon>
              <IntroTitle>
                {'Wie '}
                <IntroHighlight>{'KI-fit'}</IntroHighlight>
                {' bist du?'}
              </IntroTitle>
              <IntroDescription>
                {'Teste dein KI-Wissen in 10 Fragen \u2014 basierend auf dem 4D\u00a0AI\u00a0Fluency\u00a0Framework. Finde heraus, wo du stehst und welcher n\u00e4chste Schritt zu dir passt.'}
              </IntroDescription>
              <IntroMeta>
                <span>{'\u23F1 3 Minuten'}</span>
                <span>{'\u25C8 10 Fragen'}</span>
                <span>{'\u25C6 4 Dimensionen'}</span>
              </IntroMeta>
              <DimensionPreview>
                {Object.entries(DIMENSIONS).map(([key, d]) => (
                  <DimChip key={key} $color={d.color}>
                    {d.icon} {d.label}
                  </DimChip>
                ))}
              </DimensionPreview>
              <StartBtn onClick={handleStart}>
                {'Test starten'}
                <ArrowIcon />
              </StartBtn>
            </IntroCard>
          </IntroScreen>
        )}

        {/* ── QUIZ ── */}
        {phase === 'quiz' && question && (
          <QuestionArea>
            <QuestionCard key={animKey}>
              <StepLabel>
                {'Frage '}
                <span>{currentQ + 1}</span>
                {' von ' + QUESTIONS.length}
              </StepLabel>
              <DimensionTag $color={dim.color}>
                {dim.icon} {dim.label}
              </DimensionTag>
              <QuestionText>{question.question}</QuestionText>
              <OptionsGrid>
                {question.options.map((opt, i) => {
                  const isSelected = answers[question.id]?.optionIndex === i;
                  return (
                    <OptionButton
                      key={`${question.id}-${i}`}
                      data-letter={LETTERS[i]}
                      $delay={80 + i * 60}
                      $selected={isSelected}
                      onClick={() => handleSelect(question.id, i, opt.score)}
                    >
                      <OptionIcon aria-hidden="true">{opt.icon || '◇'}</OptionIcon>
                      <span>{opt.text}</span>
                    </OptionButton>
                  );
                })}
              </OptionsGrid>
            </QuestionCard>
          </QuestionArea>
        )}

        {/* ── RESULT ── */}
        {phase === 'result' && (() => {
          const results = getResults();
          return (
            <ResultScreen>
              <ResultCard>
                <ResultHeader>
                  <ScoreBadge>
                    <ScoreNumber $color={results.level.color}>{results.totalScore}</ScoreNumber>
                    <ScoreMax>{'/30'}</ScoreMax>
                  </ScoreBadge>
                  <ResultLevel>{results.level.label}</ResultLevel>
                  <ResultTagline>{results.level.tagline}</ResultTagline>
                  <ResultDescription>{results.level.description}</ResultDescription>
                </ResultHeader>

                <DimensionBars>
                  <CyberCorners $color={tokens.colors.textDim} $size={8} />
                  {Object.entries(DIMENSIONS).map(([key, d], i) => {
                    const ds = results.dimScores[key];
                    return (
                      <DimBarItem key={key}>
                        <DimBarLabel $color={d.color}>
                          <span>{d.icon} {d.label}</span>
                          <span>{ds.scored}/{ds.max}</span>
                        </DimBarLabel>
                        <DimBarTrack>
                          <DimBarFill
                            $color={d.color}
                            $delay={400 + i * 150}
                            style={{ width: `${ds.pct}%` }}
                          />
                        </DimBarTrack>
                      </DimBarItem>
                    );
                  })}
                </DimensionBars>

                <RecommendCard $color={results.level.color}>
                  <CyberCorners $color={results.level.color} $size={10} />
                  <RecommendBadge>{'// Das k\u00f6nnte zu dir passen'}</RecommendBadge>
                  <RecommendTitle>{results.level.program.title}</RecommendTitle>
                  <RecommendText>{results.level.program.text}</RecommendText>
                  <ResultActions>
                    <ProgramBtn href={results.level.program.href}>
                      {results.level.program.cta}
                      <ArrowIcon />
                    </ProgramBtn>
                    <RestartBtn onClick={handleStart}>
                      {'Test wiederholen'}
                    </RestartBtn>
                  </ResultActions>
                </RecommendCard>
              </ResultCard>
            </ResultScreen>
          );
        })()}
      </QuizContainer>
  );
}
