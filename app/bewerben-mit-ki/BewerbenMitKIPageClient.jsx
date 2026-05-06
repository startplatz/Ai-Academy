'use client';

import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import { FreebieConsole } from '../../components/ui';
import { tokens, media } from '../../styles/tokens';
import { CHAMFER, CyberCorners, OuterCornerFrame, clipBR, clipTLBR } from '../../styles/cyberpunk';

const packBase = '/freebies/bewerben-mit-ki';

const downloadPack = `${packBase}/bewerben-mit-ki-download-pack.zip`;

const resources = [
  {
    title: 'Bewerben mit KI Prompt-Workbook',
    description: 'Das zentrale Workbook fuer Lebenslauf, Stellenanzeige, ATS-Check und Interviewvorbereitung.',
    href: `${packBase}/Bewerben-mit-KI_Prompt-Workbook.pdf`,
    type: 'PDF',
  },
  {
    title: 'Prompt-Chain fuer Lebenslauf und Stellenanzeige',
    description: 'Vier Prompts, die Profil, Jobanforderungen, ATS-Lesbarkeit und Interviewfit nacheinander schaerfen.',
    href: `${packBase}/01_prompt-chain.md`,
    type: 'Prompt Chain',
  },
  {
    title: 'ImageGen2 Profilfoto-Prompts',
    description: 'Prompts fuer glaubwuerdige LinkedIn- und Bewerbungsfotos passend zu Rolle und Branche.',
    href: `${packBase}/08_imagegen2_profilefoto_prompts.md`,
    type: 'Prompts',
  },
  {
    title: 'Interview-Simulator Prompt',
    description: 'Ein Sparringspartner fuer echte Interviewfragen, kritisches Feedback und bessere Antwortversionen.',
    href: `${packBase}/09_interview_simulator_prompt.md`,
    type: 'Prompt',
  },
  {
    title: 'ATS-Checkliste',
    description: 'Kurzcheck, bevor Lebenslauf oder Portfolio exportiert und verschickt werden.',
    href: `${packBase}/ATS_Checkliste.pdf`,
    type: 'PDF',
  },
  {
    title: 'Bewerbungsportfolio Negativbeispiel',
    description: 'Ein bewusst schwaches Beispiel, an dem du typische Fehler schnell erkennst.',
    href: `${packBase}/Bewerbungsportfolio_Negativbeispiel.pdf`,
    type: 'PDF',
  },
];

const outcomes = [
  {
    tag: '01',
    title: 'Stellenanzeige in Signale zerlegen',
    text: 'Du findest die Keywords, Kriterien und Risiken, die wirklich ueber Einladung oder Absage entscheiden.',
  },
  {
    tag: '02',
    title: 'Lebenslauf gezielt verbessern',
    text: 'Die Prompt-Chain hilft dir, deinen CV klarer, belegbarer und ATS-lesbarer zu machen.',
  },
  {
    tag: '03',
    title: 'Interview vorher simulieren',
    text: 'Du trainierst schwierige Fragen, bessere Antwortstrukturen und souveräne Erklaerungen fuer Luecken.',
  },
];

const steps = [
  'Workbook oeffnen und eine echte Stellenanzeige bereitlegen.',
  'Prompt-Chain in einem Chat durcharbeiten.',
  'ATS-Checkliste vor dem Export kontrollieren.',
  'Interview-Simulator mit deinem aktualisierten Profil starten.',
];

const Page = styled.div`
  color: ${tokens.colors.text};
`;

const Hero = styled.section`
  position: relative;
  overflow: hidden;
  padding: clamp(7rem, 13vw, 10rem) clamp(1.5rem, 5vw, 4rem) clamp(5rem, 9vw, 7rem);
`;

const HeroInner = styled.div`
  width: min(1240px, 100%);
  margin: 0 auto;
  display: grid;
  gap: clamp(2.5rem, 6vw, 5rem);
  align-items: center;

  ${media.lg} {
    grid-template-columns: minmax(0, 0.92fr) minmax(420px, 1fr);
  }
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 7px 12px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  border: 1px solid rgba(124, 58, 237, 0.18);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const HeroTitle = styled.h1`
  max-width: 820px;
  margin-top: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.display};
  font-size: clamp(3.2rem, 9vw, 7.2rem);
  font-weight: ${tokens.fontWeights.black};
  line-height: 0.95;
  letter-spacing: 0;
  color: ${tokens.colors.text};

  span {
    color: ${tokens.colors.primary};
  }
`;

const HeroText = styled.p`
  max-width: 650px;
  margin-top: ${tokens.spacing.xl};
  color: ${tokens.colors.textMuted};
  font-size: clamp(${tokens.fontSizes.lg}, 2vw, ${tokens.fontSizes.xl});
  line-height: ${tokens.lineHeights.relaxed};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.xl};
`;

const PrimaryDownload = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing.sm};
  padding: 14px 28px;
  color: #fff;
  background: ${tokens.colors.primary};
  font-weight: ${tokens.fontWeights.semi};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${clipBR(CHAMFER.sm)}
  box-shadow: 4px 4px 0 rgba(124, 58, 237, 0.22);
  transition: transform ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover {
    color: #fff;
    transform: translate(-2px, -2px);
    box-shadow: 7px 7px 0 rgba(124, 58, 237, 0.22);
  }
`;

const SecondaryLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  color: ${tokens.colors.textSoft};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0, 0, 0, 0.1);
  font-weight: ${tokens.fontWeights.semi};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${clipBR(CHAMFER.sm)}

  &:hover {
    color: ${tokens.colors.primary};
    border-color: ${tokens.colors.primary};
  }
`;

const TrustLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.xl};
`;

const TrustChip = styled.span`
  display: inline-flex;
  align-items: center;
  min-height: 34px;
  padding: 7px 10px;
  color: ${tokens.colors.textMuted};
  background: rgba(255, 255, 255, 0.72);
  border: 1px solid rgba(0, 0, 0, 0.07);
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const PreviewFrame = styled.div`
  position: relative;
`;

const Preview = styled.div`
  position: relative;
  overflow: hidden;
  min-height: 420px;
  background:
    linear-gradient(135deg, rgba(10, 10, 10, 0.98), rgba(20, 20, 20, 0.96)),
    ${tokens.colors.dark};
  border: 1px solid rgba(20, 184, 166, 0.45);
  ${clipTLBR(CHAMFER.xl)}
  box-shadow: 0 28px 90px rgba(0, 0, 0, 0.24);

  ${media.md} {
    min-height: 540px;
  }
`;

const PreviewImage = styled(Image)`
  object-fit: cover;
  object-position: center;
  opacity: 0.9;
`;

const PreviewOverlay = styled.div`
  position: absolute;
  inset: auto ${tokens.spacing.lg} ${tokens.spacing.lg};
  z-index: 2;
  display: grid;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.lg};
  background: rgba(10, 10, 10, 0.78);
  border: 1px solid rgba(255, 255, 255, 0.12);
  ${clipBR(CHAMFER.md)}
`;

const OverlayKicker = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.mint};
  text-transform: uppercase;
`;

const OverlayTitle = styled.strong`
  color: ${tokens.colors.darkText};
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  line-height: ${tokens.lineHeights.snug};
`;

const Section = styled.section`
  padding: clamp(4rem, 9vw, 7rem) clamp(1.5rem, 5vw, 4rem);
  ${({ $dark }) => $dark && `
    background: linear-gradient(180deg, rgba(10,10,10,0.98), rgba(12,12,12,0.96));
    color: ${tokens.colors.darkText};
  `}
`;

const SectionInner = styled.div`
  width: min(1180px, 100%);
  margin: 0 auto;
`;

const SectionHead = styled.div`
  max-width: 820px;
  margin-bottom: ${tokens.spacing['2xl']};
`;

const SectionTitle = styled.h2`
  margin-top: ${tokens.spacing.md};
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  letter-spacing: 0;
  color: ${({ $dark }) => ($dark ? tokens.colors.darkText : tokens.colors.text)};

  span {
    color: ${tokens.colors.primary};
  }
`;

const SectionText = styled.p`
  max-width: 720px;
  margin-top: ${tokens.spacing.md};
  color: ${({ $dark }) => ($dark ? 'rgba(245,245,245,0.72)' : tokens.colors.textMuted)};
  font-size: ${tokens.fontSizes.lg};
  line-height: ${tokens.lineHeights.relaxed};
`;

const OutcomeGrid = styled.div`
  display: grid;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const OutcomeCard = styled.article`
  position: relative;
  min-height: 260px;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipTLBR(CHAMFER.lg)}
`;

const OutcomeTag = styled.span`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.xl};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes['3xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.primary};
`;

const OutcomeTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
`;

const OutcomeText = styled.p`
  margin-top: ${tokens.spacing.md};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const DownloadAnchor = styled.div`
  scroll-margin-top: 110px;
`;

const Steps = styled.ol`
  display: grid;
  gap: ${tokens.spacing.md};
  counter-reset: steps;
`;

const Step = styled.li`
  position: relative;
  display: grid;
  grid-template-columns: auto minmax(0, 1fr);
  gap: ${tokens.spacing.md};
  align-items: start;
  padding: ${tokens.spacing.lg};
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid rgba(255, 255, 255, 0.12);
  ${clipBR(CHAMFER.md)}
  list-style: none;
  color: rgba(245, 245, 245, 0.82);

  &::before {
    counter-increment: steps;
    content: counter(steps, decimal-leading-zero);
    font-family: ${tokens.fonts.mono};
    color: ${tokens.colors.mint};
  }
`;

const Bridge = styled.div`
  position: relative;
  display: grid;
  gap: ${tokens.spacing.xl};
  align-items: center;
  padding: clamp(1.5rem, 4vw, 3rem);
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.22);
  ${clipTLBR(CHAMFER.xl)}

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr) auto;
  }
`;

const BridgeTitle = styled.h2`
  max-width: 820px;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
`;

const BridgeText = styled.p`
  max-width: 740px;
  margin-top: ${tokens.spacing.md};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

export default function BewerbenMitKIPageClient() {
  return (
    <SubpageLayout>
      <Page>
        <Hero>
          <HeroInner>
            <div>
              <Eyebrow>Kostenloses Seminar + Download-Pack</Eyebrow>
              <HeroTitle>
                Bewerben <span>mit KI.</span>
              </HeroTitle>
              <HeroText>
                Ein praktischer Einstieg fuer alle, die Lebenslauf, Stellenanzeige, Profilfoto und Interviewtraining mit KI strukturierter angehen wollen.
              </HeroText>
              <ActionRow>
                <PrimaryDownload href={downloadPack} download>
                  Download-Pack herunterladen
                </PrimaryDownload>
                <SecondaryLink href="#downloads">
                  Einzeldateien ansehen
                </SecondaryLink>
              </ActionRow>
              <TrustLine aria-label="Inhalt des Download-Packs">
                <TrustChip>6 Dateien</TrustChip>
                <TrustChip>Prompt-Chain</TrustChip>
                <TrustChip>ATS-Check</TrustChip>
                <TrustChip>Interview-Simulator</TrustChip>
              </TrustLine>
            </div>

            <PreviewFrame>
              <OuterCornerFrame $color={tokens.colors.mint} $size={18} $offset={10} />
              <Preview>
                <PreviewImage
                  src="/freebies/bewerben-mit-ki/bewerben-mit-ki-preview.webp"
                  alt="Vorschau des Bewerben mit KI Seminar- und Download-Packs"
                  fill
                  sizes="(min-width: 1024px) 48vw, 100vw"
                />
                <PreviewOverlay>
                  <OverlayKicker>/freebie</OverlayKicker>
                  <OverlayTitle>Prompt-Pack fuer Lebenslauf, ATS und Interview.</OverlayTitle>
                </PreviewOverlay>
              </Preview>
            </PreviewFrame>
          </HeroInner>
        </Hero>

        <Section>
          <SectionInner>
            <SectionHead>
              <Eyebrow>Warum das funktioniert</Eyebrow>
              <SectionTitle>
                Nicht mehr blind bewerben. <span>Gezielt matchen.</span>
              </SectionTitle>
              <SectionText>
                KI ist hier kein Trick, sondern ein Arbeitsprozess: Anforderungen erkennen, Profil schaerfen und Antworten trainieren, bevor es ernst wird.
              </SectionText>
            </SectionHead>
            <OutcomeGrid>
              {outcomes.map((item) => (
                <OutcomeCard key={item.title}>
                  <CyberCorners $color={tokens.colors.mint} $size={10} $revealOnHover />
                  <OutcomeTag>{item.tag}</OutcomeTag>
                  <OutcomeTitle>{item.title}</OutcomeTitle>
                  <OutcomeText>{item.text}</OutcomeText>
                </OutcomeCard>
              ))}
            </OutcomeGrid>
          </SectionInner>
        </Section>

        <Section id="downloads">
          <SectionInner>
            <DownloadAnchor>
              <FreebieConsole
                kicker="Direkt herunterladen"
                title="Dein Bewerben mit KI Pack."
                text="Lade alles als Pack herunter oder nimm dir gezielt die Datei, die du gerade brauchst: Workbook, Prompt-Chain, Profilfoto-Prompts, Interview-Simulator, ATS-Checkliste und Analysebeispiel."
                resources={resources}
                accentColor={tokens.colors.mint}
                accentBg={tokens.colors.mintBg}
              />
            </DownloadAnchor>
          </SectionInner>
        </Section>

        <Section $dark>
          <SectionInner>
            <SectionHead>
              <Eyebrow>So nutzt du es</Eyebrow>
              <SectionTitle $dark>
                Ein Chat. Eine echte Stelle. <span>Vier klare Schritte.</span>
              </SectionTitle>
              <SectionText $dark>
                Das Pack ist nicht zum Sammeln gedacht. Am besten arbeitest du es direkt mit einer echten Stellenanzeige und deinem aktuellen Lebenslauf durch.
              </SectionText>
            </SectionHead>
            <Steps>
              {steps.map((step) => (
                <Step key={step}>{step}</Step>
              ))}
            </Steps>
          </SectionInner>
        </Section>

        <Section>
          <SectionInner>
            <Bridge>
              <CyberCorners $color={tokens.colors.mint} $size={12} />
              <div>
                <Eyebrow>Naechster Schritt</Eyebrow>
                <BridgeTitle>Wenn du so arbeiten willst, ist der KI-Manager der naechste logische Schritt.</BridgeTitle>
                <BridgeText>
                  Im Seminar bekommst du einen schnellen Bewerbungshebel. Im KI-Manager lernst du, wie man solche KI-Workflows systematisch baut, bewertet und im Berufsalltag einsetzt.
                </BridgeText>
              </div>
              <ActionRow>
                <PrimaryDownload as={Link} href="/arbeitssuchende">
                  KI-Manager ansehen
                </PrimaryDownload>
                <SecondaryLink href="/wissens-test">
                  Wissens-Test machen
                </SecondaryLink>
              </ActionRow>
            </Bridge>
          </SectionInner>
        </Section>
      </Page>
    </SubpageLayout>
  );
}
