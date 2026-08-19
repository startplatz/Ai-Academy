'use client';

import Image from 'next/image';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import {
  Button,
  CTABanner,
  FreebieConsole,
  MilestoneRail,
  MiniFAQ,
  SectionBlock,
  SpotlightBento,
} from '../../components/ui';
import { CALENDLY_URL } from '../../lib/site';
import { tokens, media } from '../../styles/tokens';
import { CHAMFER, CyberCorners, clipBR, clipTLBR } from '../../styles/cyberpunk';

const packBase = '/freebies/ki-im-kino';
const downloadPack = `${packBase}/kino-skill-paket.zip`;

const skills = [
  {
    label: 'Zuerst installieren',
    title: 'Kino-Hausprofil',
    description: 'Hält Säle, Preise, Barrierefreiheit, Reihen und Tonalität als gemeinsame Faktengrundlage fest.',
    href: `${packBase}/skills/kino-hausprofil.zip`,
    cta: 'Einzeln laden',
    size: 'wide',
    chips: ['Basis', '30 Minuten'],
  },
  {
    label: 'Filmwoche',
    title: 'Wochenprogramm',
    description: 'Macht aus dem fixierten Spielplan Texte für Website, Schaukasten, Flyer, Newsletter und Social Media.',
    href: `${packBase}/skills/kino-wochenprogramm.zip`,
    cta: 'Einzeln laden',
    size: 'md',
    chips: ['Website', 'Aushang', 'Social'],
  },
  {
    label: 'Stammgäste',
    title: 'Newsletter',
    description: 'Schreibt Betreffzeilen, Preheader, Editorial, Programmteil und Handlungsaufruf in der Tonalität eures Hauses.',
    href: `${packBase}/skills/kino-newsletter.zip`,
    cta: 'Einzeln laden',
    size: 'sm',
    chips: ['Mailing', 'Betreff'],
  },
  {
    label: 'Service',
    title: 'Gästeanfragen',
    description: 'Entwirft Antworten zu Preisen, Gutscheinen, Barrierefreiheit, Jugendschutz oder Saalmieten und markiert fehlende Fakten.',
    href: `${packBase}/skills/kino-gaesteanfragen.zip`,
    cta: 'Einzeln laden',
    size: 'md',
    chips: ['E-Mail', 'FAQ', 'Keine Fantasiezahlen'],
  },
  {
    label: 'Disposition',
    title: 'Marktbriefing',
    description: 'Bündelt kommende Filmstarts, Terminverschiebungen, Charts und relevante Branchennews in einem Wochenbriefing.',
    href: `${packBase}/skills/kino-marktbriefing.zip`,
    cta: 'Einzeln laden',
    size: 'md',
    chips: ['Recherche', 'Dashboard'],
  },
  {
    label: 'Kommunikation',
    title: 'Verleihkorrespondenz',
    description: 'Formuliert Terminanfragen, Bestellungen, Verlängerungen, Absetzungen und Nachfragen zu Fassungen oder Material.',
    href: `${packBase}/skills/kino-verleihkorrespondenz.zip`,
    cta: 'Einzeln laden',
    size: 'md',
    chips: ['Verleih', 'Einsatz'],
  },
  {
    label: 'Programmidee',
    title: 'Filmreihe',
    description: 'Entwickelt Themenreihen und Sonderveranstaltungen mit Titelideen, Terminlogik, Kooperationen und Presseinfo.',
    href: `${packBase}/skills/kino-filmreihe.zip`,
    cta: 'Einzeln laden',
    size: 'md',
    chips: ['Kuration', 'Events'],
  },
  {
    label: 'Redaktion',
    title: 'Social-Redaktionsplan',
    description: 'Plant zwei bis vier Wochen Content mit Formaten, Terminen, Textentwürfen und einem lokalen Dreh.',
    href: `${packBase}/skills/kino-social-redaktionsplan.zip`,
    cta: 'Einzeln laden',
    size: 'md',
    chips: ['Instagram', 'Facebook'],
  },
  {
    label: 'Förderung',
    title: 'Programmprämie',
    description: 'Sortiert das Jahresprogramm nach Förderkriterien und unterstützt bei Übersichten und Begründungstexten.',
    href: `${packBase}/skills/kino-programmpraemie.zip`,
    cta: 'Einzeln laden',
    size: 'wide',
    chips: ['Dokumentation', 'Vier-Augen-Prüfung'],
  },
];

const setupSteps = [
  {
    step: '01',
    kicker: 'Paket öffnen',
    title: 'Komplettpaket laden und README lesen',
    description: 'Im Gesamtpaket liegen neun einzeln installierbare ZIP-Dateien, der Schnellstart und eine kuratierte Linkliste.',
  },
  {
    step: '02',
    kicker: 'Grundlage bauen',
    title: 'Mit kino-hausprofil.zip anfangen',
    description: 'Nehmt euch etwa 30 Minuten für Säle, Preise, Ermäßigungen, Barrierefreiheit, Reihen und die Sprache eures Hauses.',
  },
  {
    step: '03',
    kicker: 'Kontext sichern',
    title: 'Das fertige Hausprofil im Projekt ablegen',
    description: 'Speichert hausprofil.md als Projektdatei oder hängt sie an den Chat. Sonst fehlt dem nächsten Gespräch euer Hauswissen.',
  },
  {
    step: '04',
    kicker: 'Engpass wählen',
    title: 'Nur den wichtigsten Arbeitsskill installieren',
    description: 'Startet zum Beispiel mit Wochenprogramm oder Gästeanfragen, statt alle neun Workflows gleichzeitig einzuführen.',
  },
  {
    step: '05',
    kicker: 'Im Alltag testen',
    title: 'Mit einem echten Fall arbeiten und nachschärfen',
    description: 'Prüft den Output redaktionell. Eine Korrektur, die ihr dreimal macht, gehört als neue Regel in Skill oder Hausprofil.',
  },
];

const downloads = [
  {
    title: 'Kino-Skill-Paket komplett',
    description: 'Alle neun Skills, Schnellstart und Linkliste in einem kompakten Paket.',
    href: downloadPack,
    type: 'ZIP · 9 Skills',
  },
  {
    title: 'Schnellstart & Dokumentation',
    description: 'Installation, Hausprofil, Anpassung, Connectoren und Hinweise für den sicheren Einsatz.',
    href: `${packBase}/README.md`,
    type: 'README',
  },
  {
    title: 'Kuratierte Linkliste',
    description: 'Standards, offizielle Dokumentation und ausgewählte weiterführende Skill-Quellen.',
    href: `${packBase}/LINKLISTE.md`,
    type: 'Markdown',
  },
];

const faq = [
  {
    q: 'Was ist ein Skill - und was ist der Unterschied zu einem Prompt?',
    a: 'Ein Prompt ist eine einzelne Anweisung. Ein Skill beschreibt einen wiederverwendbaren Arbeitsablauf mit Zuständigkeit, Schritten, Qualitätsregeln und bei Bedarf Referenzdateien. Dadurch müsst ihr dieselbe Aufgabe nicht jede Woche neu erklären.',
  },
  {
    q: 'Mit welchem Skill sollten wir anfangen?',
    a: 'Immer mit dem Kino-Hausprofil. Danach nehmt ihr den Workflow, der gerade am meisten Zeit bindet. Für viele Häuser sind das Wochenprogramm oder Gästeanfragen.',
  },
  {
    q: 'Funktioniert das Paket in Claude und ChatGPT?',
    a: 'Ja, das Paket folgt dem offenen Agent-Skills-Format. In Claude könnt ihr die einzelnen ZIP-Dateien als Skills hochladen. In ChatGPT ist der Upload in unterstützten Workspace-Tarifen über Plugins und den Bereich Skills verfügbar. Fehlt der Skill-Upload, lässt sich die enthaltene SKILL.md auch als normale Projektanweisung verwenden.',
  },
  {
    q: 'Brauchen wir dafür Programmierkenntnisse?',
    a: 'Nein. Die Skills bestehen aus lesbaren Textdateien. Ihr könnt Regeln, Beispiele und Hausbegriffe in einem normalen Texteditor ergänzen oder streichen.',
  },
  {
    q: 'Dürfen Gästedaten ins Hausprofil?',
    a: 'Nein. Ins Hausprofil gehören Betriebsdaten wie Preise, Säle, Öffnungszeiten, Barrierefreiheit und Tonalität - keine Adresslisten, Buchungshistorien oder personenbezogenen Gästedaten. Externe Kommunikation bleibt in der menschlichen Endredaktion.',
  },
];

const Page = styled.div`
  color: ${tokens.colors.text};
`;

const Hero = styled.section`
  position: relative;
  min-height: min(860px, 92vh);
  display: grid;
  align-items: center;
  overflow: hidden;
  padding: clamp(8rem, 14vw, 11rem) clamp(1.5rem, 5vw, 4rem) clamp(5rem, 9vw, 7rem);
  background: ${tokens.colors.dark};
`;

const HeroImage = styled(Image)`
  object-fit: cover;
  object-position: 64% center;
`;

const HeroShade = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  background:
    linear-gradient(90deg, rgba(6, 6, 8, 0.99) 0%, rgba(6, 6, 8, 0.91) 38%, rgba(6, 6, 8, 0.2) 74%, rgba(6, 6, 8, 0.32) 100%),
    linear-gradient(180deg, rgba(6, 6, 8, 0.2), rgba(6, 6, 8, 0.72));

  @media (max-width: 767px) {
    background:
      linear-gradient(180deg, rgba(6, 6, 8, 0.62), rgba(6, 6, 8, 0.98) 70%),
      linear-gradient(90deg, rgba(6, 6, 8, 0.8), rgba(6, 6, 8, 0.15));
  }
`;

const HeroInner = styled.div`
  position: relative;
  z-index: 2;
  width: min(1400px, 100%);
  margin: 0 auto;
`;

const HeroContent = styled.div`
  max-width: 820px;
`;

const Eyebrow = styled.span`
  display: inline-flex;
  width: fit-content;
  padding: 7px 12px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.mint};
  background: rgba(20, 184, 166, 0.12);
  border: 1px solid rgba(20, 184, 166, 0.42);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const HeroTitle = styled.h1`
  max-width: 900px;
  margin-top: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.display};
  font-size: clamp(3.5rem, 9vw, 8rem);
  font-weight: ${tokens.fontWeights.black};
  line-height: 0.9;
  letter-spacing: 0;
  color: ${tokens.colors.darkText};
  text-transform: uppercase;

  span {
    display: block;
    color: ${tokens.colors.primaryLight};
  }
`;

const HeroText = styled.p`
  max-width: 700px;
  margin-top: ${tokens.spacing.xl};
  color: rgba(245, 245, 245, 0.78);
  font-size: clamp(${tokens.fontSizes.lg}, 2vw, ${tokens.fontSizes.xl});
  line-height: ${tokens.lineHeights.relaxed};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.xl};
`;

const DarkSecondary = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  color: ${tokens.colors.darkText};
  background: rgba(255, 255, 255, 0.06);
  border: 1px solid rgba(255, 255, 255, 0.2);
  font-weight: ${tokens.fontWeights.semi};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${clipBR(CHAMFER.sm)}

  &:hover {
    color: ${tokens.colors.mint};
    border-color: ${tokens.colors.mint};
  }
`;

const TrustLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.xl};
`;

const TrustItem = styled.span`
  padding: 7px 10px;
  color: rgba(245, 245, 245, 0.72);
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.13);
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const PrincipleGrid = styled.div`
  display: grid;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const Principle = styled.article`
  position: relative;
  min-height: 250px;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.2);
  ${clipTLBR(CHAMFER.lg)}
`;

const PrincipleNumber = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.xl};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes['3xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.primary};
`;

const PrincipleTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.snug};
`;

const PrincipleText = styled.p`
  margin-top: ${tokens.spacing.md};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const InstallGrid = styled.div`
  display: grid;
  gap: ${tokens.spacing.lg};

  ${media.lg} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const InstallCard = styled.article`
  position: relative;
  padding: ${tokens.spacing.xl};
  color: ${tokens.colors.darkText};
  background: rgba(255, 255, 255, 0.055);
  border: 1px solid rgba(255, 255, 255, 0.14);
  ${clipBR(CHAMFER.lg)}
`;

const InstallTag = styled.span`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.lg};
  padding: 6px 10px;
  color: ${tokens.colors.mint};
  background: rgba(20, 184, 166, 0.1);
  border: 1px solid rgba(20, 184, 166, 0.34);
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const InstallTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.darkText};
`;

const InstallList = styled.ol`
  display: grid;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.lg};
  padding-left: 1.2rem;
  color: rgba(245, 245, 245, 0.76);
  line-height: ${tokens.lineHeights.relaxed};

  li::marker {
    color: ${tokens.colors.mint};
    font-family: ${tokens.fonts.mono};
  }
`;

const SafetyNote = styled.aside`
  position: relative;
  display: grid;
  gap: ${tokens.spacing.lg};
  margin-top: ${tokens.spacing['2xl']};
  padding: ${tokens.spacing.xl};
  color: rgba(245, 245, 245, 0.78);
  background: rgba(124, 58, 237, 0.1);
  border: 1px solid rgba(124, 58, 237, 0.34);
  ${clipTLBR(CHAMFER.lg)}

  ${media.md} {
    grid-template-columns: auto minmax(0, 1fr);
    align-items: start;
  }

  p {
    color: rgba(245, 245, 245, 0.78);
  }
`;

const SafetyMark = styled.strong`
  font-family: ${tokens.fonts.mono};
  color: ${tokens.colors.primaryLight};
  text-transform: uppercase;
`;

export default function KIImKinoPageClient() {
  return (
    <SubpageLayout solidNavigation>
      <Page>
        <Hero>
          <HeroImage
            src={`${packBase}/kino-skill-paket-preview.webp`}
            alt="Geöffneter Werkzeugkoffer als Bild für neun modulare Kino-Skills"
            fill
            priority
            sizes="100vw"
          />
          <HeroShade />
          <HeroInner>
            <HeroContent>
              <Eyebrow>Zur Keynote · Kostenloses Skill-Paket</Eyebrow>
              <HeroTitle>
                KI im Kino. <span>9 Skills für den Alltag.</span>
              </HeroTitle>
              <HeroText>
                Wiederverwendbare Arbeitsabläufe für Programm, Kommunikation, Recherche und Förderung - editierbar, auf Deutsch und für euer eigenes Haus anpassbar.
              </HeroText>
              <ActionRow>
                <Button href={downloadPack} variant="primary" size="lg" offset arrow download>
                  Skill-Paket herunterladen
                </Button>
                <DarkSecondary href="#anleitung">So setzt ihr es ein</DarkSecondary>
              </ActionRow>
              <TrustLine aria-label="Eigenschaften des Skill-Pakets">
                <TrustItem>9 Kino-Skills</TrustItem>
                <TrustItem>Offenes Format</TrustItem>
                <TrustItem>Claude + ChatGPT</TrustItem>
                <TrustItem>CC BY 4.0</TrustItem>
              </TrustLine>
            </HeroContent>
          </HeroInner>
        </Hero>

        <SectionBlock
          badge="Mehr als eine Prompt-Sammlung"
          title="Aus einer Erklärung wird ein <span>wiederverwendbarer Ablauf.</span>"
          subtitle="Jeder Skill verbindet eure Hausdaten mit einem klaren Verfahren und einem prüfbaren Ergebnis. So bleibt Wissen nicht in einzelnen Chats hängen."
          accent={tokens.colors.glow}
        >
          <PrincipleGrid>
            <Principle>
              <CyberCorners $color={tokens.colors.mint} $size={9} $revealOnHover />
              <PrincipleNumber>01</PrincipleNumber>
              <PrincipleTitle>Hauswissen als Grundlage</PrincipleTitle>
              <PrincipleText>Preise, Säle, Reihen und Tonalität stehen im Hausprofil, statt bei jeder Aufgabe neu erklärt zu werden.</PrincipleText>
            </Principle>
            <Principle>
              <CyberCorners $color={tokens.colors.mint} $size={9} $revealOnHover />
              <PrincipleNumber>02</PrincipleNumber>
              <PrincipleTitle>Verfahren statt Einmal-Prompt</PrincipleTitle>
              <PrincipleText>Der Skill kennt Reihenfolge, Rückfragen und Qualitätsregeln für genau eine wiederkehrende Aufgabe.</PrincipleText>
            </Principle>
            <Principle>
              <CyberCorners $color={tokens.colors.mint} $size={9} $revealOnHover />
              <PrincipleNumber>03</PrincipleNumber>
              <PrincipleTitle>Menschen geben frei</PrincipleTitle>
              <PrincipleText>Fehlende Fakten werden sichtbar markiert. Was an Gäste, Verleiher oder Förderstellen geht, bleibt in der Endredaktion.</PrincipleText>
            </Principle>
          </PrincipleGrid>
        </SectionBlock>

        <SectionBlock
          id="skills"
          badge="Im Paket"
          title="Neun Werkzeuge. <span>Ein Kinoalltag.</span>"
          subtitle="Ladet das komplette Paket oder nehmt zunächst nur den Skill, der euer größtes Zeitproblem trifft. Das Hausprofil kommt immer zuerst."
          variant="white"
          accent={tokens.colors.glow}
        >
          <SpotlightBento
            items={skills}
            ariaLabel="Neun Skills für den Kinoalltag"
            accentColor={tokens.colors.primary}
            accentBg={tokens.colors.primaryLighter}
          />
        </SectionBlock>

        <SectionBlock
          id="downloads"
          badge="Direkt herunterladen"
          title="Alles dabei. <span>Nichts versteckt.</span>"
          subtitle="Der Download ist kostenlos und enthält lesbare, editierbare Dateien. Für den schnellsten Start reicht das Gesamtpaket."
          accent={tokens.colors.glow}
        >
          <FreebieConsole
            kicker="KI im Kino Download"
            title="Das vollständige Kino-Skill-Paket."
            text="Neun einzeln installierbare Skills, eine ausführliche Schnellstart-Anleitung und eine kuratierte Linkliste. Die einzelnen Skill-ZIPs findet ihr zusätzlich in der Übersicht oben."
            resources={downloads}
            accentColor={tokens.colors.primary}
            accentBg={tokens.colors.primaryLighter}
          />
        </SectionBlock>

        <SectionBlock
          id="anleitung"
          badge="Schnellstart"
          title="Hausprofil zuerst. <span>Dann ein echter Fall.</span>"
          subtitle="Die beste Einführung ist bewusst klein: ein gemeinsamer Kontext, ein Skill und eine Aufgabe aus dieser Woche."
          variant="white"
          accent={tokens.colors.glow}
        >
          <MilestoneRail
            items={setupSteps}
            intro={{
              kicker: 'Empfohlener Ablauf',
              title: 'In fünf Schritten zum ersten brauchbaren Workflow.',
              text: 'Installiert nicht alles auf einmal. Ein sauber eingerichteter Skill, der jede Woche läuft, ist wertvoller als neun ungetestete Downloads.',
              meta: ['30 Min. Basis', '1 Engpass', '1 echter Fall'],
            }}
            accentColor={tokens.colors.primary}
            accentBg={tokens.colors.primaryLighter}
          />
        </SectionBlock>

        <SectionBlock
          badge="Installation"
          title="Wählt den Weg, der zu <span>eurem Setup</span> passt."
          subtitle="Die ZIP-Dateien sind für den direkten Skill-Upload gebaut. Ihr müsst den einzelnen Skill vor dem Upload nicht entpacken."
          variant="dark"
          accent={tokens.colors.glow}
        >
          <InstallGrid>
            <InstallCard>
              <CyberCorners $color={tokens.colors.mint} $size={9} />
              <InstallTag>Claude</InstallTag>
              <InstallTitle>Skill hochladen</InstallTitle>
              <InstallList>
                <li>Code-Ausführung unter Capabilities aktivieren.</li>
                <li>Unter Customize den Bereich Skills öffnen.</li>
                <li>Create skill und Upload a skill wählen.</li>
                <li>Zuerst kino-hausprofil.zip hochladen.</li>
              </InstallList>
            </InstallCard>
            <InstallCard>
              <CyberCorners $color={tokens.colors.mint} $size={9} />
              <InstallTag>ChatGPT</InstallTag>
              <InstallTitle>Im Plugin-Bereich installieren</InstallTitle>
              <InstallList>
                <li>Plugins in der Seitenleiste öffnen.</li>
                <li>Zum Reiter Skills wechseln.</li>
                <li>Create und Upload from your computer wählen.</li>
                <li>Bei Teamkonten gegebenenfalls die Admin-Freigabe klären.</li>
              </InstallList>
            </InstallCard>
            <InstallCard>
              <CyberCorners $color={tokens.colors.mint} $size={9} />
              <InstallTag>Ohne Skill-Upload</InstallTag>
              <InstallTitle>Als Projektanweisung nutzen</InstallTitle>
              <InstallList>
                <li>Die gewünschte Skill-ZIP lokal entpacken.</li>
                <li>SKILL.md öffnen und als Projektanweisung hinterlegen.</li>
                <li>Hausprofil und aktuelle Arbeitsdateien hinzufügen.</li>
                <li>Mit einer konkreten Aufgabe starten.</li>
              </InstallList>
            </InstallCard>
          </InstallGrid>
          <SafetyNote>
            <SafetyMark>Wichtig</SafetyMark>
            <p>
              Legt keine personenbezogenen Gästedaten im Hausprofil ab. Bei verbundenen Postfächern oder Laufwerken braucht ihr ein freigegebenes Business-Setup, klare Zugriffsgrenzen und eine menschliche Bestätigung vor externen Aktionen.
            </p>
          </SafetyNote>
        </SectionBlock>

        <SectionBlock badge="FAQ" title="Fragen zum <span>Kino-Skill-Paket.</span>" accent={tokens.colors.glow}>
          <MiniFAQ items={faq} accentColor={tokens.colors.primary} />
        </SectionBlock>

        <CTABanner
          title="Aus dem Download wird ein <span>funktionierendes Setup.</span>"
          subtitle="Im Praxistag richten wir Hausprofil, Skills und sinnvolle Verbindungen gemeinsam ein. Wenn ihr erst klären möchtet, was zu eurem Haus passt, starten wir mit einer persönlichen Beratung."
        >
          <Button href="/oneday" variant="primary" size="lg" arrow>
            Praxistage ansehen
          </Button>
          <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
            Persönliche Beratung buchen
          </Button>
        </CTABanner>
      </Page>
    </SubpageLayout>
  );
}
