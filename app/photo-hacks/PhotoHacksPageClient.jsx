'use client';

import React, { useState } from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import PageHero from '../../components/ui/PageHero';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER } from '../../styles/cyberpunk';

/* ─────────────────────────────────────────────
   AI PHOTO HACKS – Copy & Paste Prompts
   Direct-link-only resource page. Not linked in nav,
   not in sitemap, noindex via app/photo-hacks/page.jsx.
   ───────────────────────────────────────────── */

const HACKS = [
  {
    n: 1,
    title: 'Körper anpassen',
    tag: 'KÖRPER',
    tagColor: '#9D174D',
    tagBg: '#FDF2F8',
    prompt:
      'Verändere den Körper in diesem Foto: [breitere Schultern, gut entwickelte Deltamuskeln, definierte Bizeps und Trizeps, eine vollere muskulöse Brust, sichtbare Bauchmuskeln (Six-Pack), eine schmalere Taille mit V-förmigem Oberkörper, muskulöse Oberschenkel und Waden sowie eine aufrechte, kräftige Körperhaltung]. Achte auf realistische Proportionen, natürliche Hauttextur und einheitliche Beleuchtung. Das Ergebnis soll nahtlos und lebensecht wirken, ohne andere Bildelemente zu verzerren.',
  },
  {
    n: 2,
    title: 'Bild restaurieren',
    tag: 'RESTAURIERUNG',
    tagColor: '#92400E',
    tagBg: '#FFFBEB',
    prompt:
      'Restauriere dieses Foto mit zeitgemäßen Techniken und behebe alle altersbedingten Schäden wie Unschärfe, Beschädigungen, Verblassung, Kratzer, Risse, Falten, abgenutzte Bereiche oder Schwarzweißdarstellung. Analysiere zunächst das Bild, um die ungefähre Epoche und den ursprünglichen fotografischen Prozess zu ermitteln und eine historisch korrekte Restaurierung zu gewährleisten. Mache es frisch und klar, indem du weiche Kanten und Gesichtszüge behutsam schärfst, ohne zu übertreiben, körnige Stellen oder Rauschen glättest und fehlende Teile mit realistischen Texturen rekonstruierst. Falls Farbe hinzugefügt wird oder fehlt, bringe sie natürlich und lebendig – passend zur fotografischen Technologie der jeweiligen Epoche. Gleiche Farben an natürliche Beleuchtung an, passe Helligkeit und Kontrast an und erhalte die ursprüngliche Tonalität. Füge subtile Details zu Gesichtern, Objekten oder Hintergründen hinzu, die möglicherweise verloren gegangen sind – bewahre dabei das authentische Gefühl, natürliche Körnung und die ursprüngliche Komposition. Entferne technische Fehler unter Bewahrung des nostalgischen Charmes und der Belichtungsqualitäten der Zeit. Skaliere es abschließend auf eine höhere Auflösung wie Full HD 32K hoch – im fotorealistischen Stil, der wie ein professionell restauriertes oder modernes hochwertiges Foto aussieht.',
  },
  {
    n: 3,
    title: 'Golden Hour Portrait',
    tag: 'BELEUCHTUNG',
    tagColor: '#9A3412',
    tagBg: '#FFF7ED',
    prompt:
      'Frontales Sonnenlicht von vorne – behalte alle Originaldetails des Fotos vollständig bei, ohne Veränderungen, außer an der Beleuchtung und der Farbatmosphäre. Betone lose Haarsträhnen gegen das Gegenlicht. Verstärke die Gesichtsdefinition durch hochdetaillierte Bildverbesserung, ohne die Gesichtszüge zu verändern. Strikte Regel: Verändere nicht das Gesicht, die Haare oder die Hintergrundstruktur der abgebildeten Person. Verändere die Komposition nicht.',
  },
  {
    n: 4,
    title: 'Wasserzeichen entfernen',
    tag: 'REINIGUNG',
    tagColor: '#065F46',
    tagBg: '#ECFDF5',
    prompt:
      'Behalte das Bild so wie es ist und entferne ausschließlich die Logos und Textüberlagerungen im Bild. Halte das Bild sauber und erhalte den Originalinhalt. STRIKTE REGEL: Verändere nicht das Gesicht, die Haare, den Gesichtsausdruck, die Körperhaltung, die Komposition oder den Hintergrund.',
  },
  {
    n: 5,
    title: '4K Enhancer',
    tag: 'HINTERGRUND',
    tagColor: '#1E40AF',
    tagBg: '#EFF6FF',
    prompt:
      'Entferne alle Personen im Hintergrund des hochgeladenen Bildes. Erhalte das Hauptmotiv exakt. Verändere nicht das Gesicht, den Körper, die Kleidung, die Pose oder den Ausdruck des Hauptmotivs. Rekonstruiere den Hintergrund natürlich dort, wo die Personen entfernt wurden – passend zum ursprünglichen Ort, der Architektur, Beleuchtung, den Schatten und der Tiefe. Nicht zuschneiden, weichzeichnen oder stilisieren. Das Ergebnis soll so aussehen, als wäre das Foto von Anfang an ohne Personen im Hintergrund aufgenommen worden.',
  },
];

/* ── Styled ──────────────────────────────── */

const IntroRow = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm};

  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const IntroBadge = styled.span`
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  padding: 4px 12px;
  border-radius: ${tokens.radii.md};
`;

const IntroLabel = styled.span`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
`;

const Main = styled.div`
  max-width: 800px;
  margin: ${tokens.spacing.xl} auto ${tokens.spacing['4xl']};
  padding: 0 ${tokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.lg};

  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const Card = styled.div`
  background: ${tokens.colors.surface};
  border: 1.5px solid ${tokens.colors.glassBorder};
  border-radius: ${tokens.radii.xl};
  padding: ${tokens.spacing.lg} ${tokens.spacing.lg} ${tokens.spacing.md};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
  transition: border-color ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover {
    border-color: ${tokens.colors.primaryLight};
    box-shadow: ${tokens.shadows.cardHover};
  }
`;

const CardTop = styled.div`
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  flex-wrap: wrap;
`;

const CardNum = styled.span`
  font-size: 11px;
  font-family: ${tokens.fonts.mono};
  font-weight: ${tokens.fontWeights.extra};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.06em;
`;

const CardTitle = styled.span`
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.extra};
  color: ${tokens.colors.primary};
  flex: 1;
  min-width: 0;
`;

const CardTag = styled.span`
  font-size: 9.5px;
  font-weight: ${tokens.fontWeights.bold};
  letter-spacing: 0.1em;
  padding: 3px 9px;
  border-radius: ${tokens.radii.sm};
  white-space: nowrap;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
`;

const CardPrompt = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  background: ${tokens.colors.surfaceAlt};
  border-radius: ${tokens.radii.lg};
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  border: 1px solid ${tokens.colors.glassBorder};
`;

const CardFooter = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const CopyButton = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  background: ${({ $copied }) => ($copied ? '#059669' : tokens.colors.primary)};
  color: #fff;
  border: none;
  ${clipBR(CHAMFER.xs)}
  padding: 9px 18px;
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  font-family: ${tokens.fonts.body};
  cursor: pointer;
  transition: background ${tokens.transitions.fast}, transform 80ms ease;

  &:hover { background: ${({ $copied }) => ($copied ? '#059669' : tokens.colors.primaryMuted)}; }
  &:active { transform: scale(0.97); }

  svg { flex-shrink: 0; }
`;

const CopyIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
    <rect x="9" y="9" width="13" height="13" rx="2" />
    <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
  </svg>
);

const CheckIcon = () => (
  <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ── Component ───────────────────────────── */

export default function PhotoHacksPageClient() {
  const [copiedN, setCopiedN] = useState(null);

  const handleCopy = async (hack) => {
    try {
      await navigator.clipboard.writeText(hack.prompt);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = hack.prompt;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedN(hack.n);
    setTimeout(() => {
      setCopiedN((current) => (current === hack.n ? null : current));
    }, 2000);
  };

  return (
    <SubpageLayout>
      <PageHero title="AI <span>Photo Hacks</span>" subtitle="Copy & Paste Prompts für beeindruckende KI-Fotos" />

      <IntroRow>
        <IntroBadge>5 Hacks</IntroBadge>
        <IntroLabel>Einfach Prompt kopieren, Foto hochladen, fertig.</IntroLabel>
      </IntroRow>

      <Main>
        {HACKS.map((hack) => (
          <Card key={hack.n}>
            <CardTop>
              <CardNum>{String(hack.n).padStart(2, '0')}</CardNum>
              <CardTitle>{hack.title}</CardTitle>
              <CardTag $color={hack.tagColor} $bg={hack.tagBg}>
                {hack.tag}
              </CardTag>
            </CardTop>
            <CardPrompt>{hack.prompt}</CardPrompt>
            <CardFooter>
              <CopyButton type="button" $copied={copiedN === hack.n} onClick={() => handleCopy(hack)}>
                {copiedN === hack.n ? <CheckIcon /> : <CopyIcon />}
                {copiedN === hack.n ? 'Kopiert!' : 'Kopieren'}
              </CopyButton>
            </CardFooter>
          </Card>
        ))}
      </Main>
    </SubpageLayout>
  );
}
