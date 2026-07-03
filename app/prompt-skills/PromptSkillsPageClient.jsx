'use client';

import React, { useMemo, useState } from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import PageHero from '../../components/ui/PageHero';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER } from '../../styles/cyberpunk';

/* ─────────────────────────────────────────────
   100 PROMPT SKILLS – Copy & Paste Commands für ChatGPT
   Direct-link-only resource page. Not linked in nav,
   not in sitemap, noindex via app/prompt-skills/page.jsx.
   ───────────────────────────────────────────── */

const SKILLS = [
  { n: 1, cmd: '/ghost', cat: 'Reasoning', desc: 'Stealth-Reasoning-Modus: Die Antwort denkt besonders vorsichtig, indirekt und taktisch.' },
  { n: 2, cmd: '/artifacts', cat: 'Reasoning', desc: 'Zeigt Wissen und Ergebnisse in klaren, wiederverwendbaren Output-Formaten.' },
  { n: 3, cmd: '/god mode', cat: 'Reasoning', desc: 'Maximale Kreativität und Präzision für besonders starke Ergebnisse.' },
  { n: 4, cmd: '/omniscient', cat: 'Reasoning', desc: 'Allwissender Modus: Beantwortet ein Thema möglichst umfassend und weitblickend.' },
  { n: 5, cmd: '/hyperbrain', cat: 'Reasoning', desc: 'Beschleunigtes logisches Denken für komplexe Aufgaben und schnelle Struktur.' },
  { n: 6, cmd: '/deep dive', cat: 'Reasoning', desc: 'Ultra-detaillierte Erklärung mit Tiefe, Kontext und Beispielen.' },
  { n: 7, cmd: '/clarity', cat: 'Reasoning', desc: 'Knapp, präzise und leicht verständlich formuliert.' },
  { n: 8, cmd: '/focus', cat: 'Reasoning', desc: 'Bleibt strikt bei der Aufgabe und ignoriert Ablenkungen.' },
  { n: 9, cmd: '/laser', cat: 'Reasoning', desc: 'Pinpoint-Accuracy: extrem genaue und zielgerichtete Antwort.' },
  { n: 10, cmd: '/insight', cat: 'Reasoning', desc: 'Verstärkt intuitives Denken und erkennt versteckte Zusammenhänge.' },
  { n: 11, cmd: '/imagine', cat: 'Kreativität', desc: 'Volle kreative Erweiterung einer Idee mit vielen Möglichkeiten.' },
  { n: 12, cmd: '/surreal', cat: 'Kreativität', desc: 'Traumhafte, ungewöhnliche und fantasievolle Kreativrichtung.' },
  { n: 13, cmd: '/cinematic', cat: 'Kreativität', desc: 'Visuelles Storytelling wie in Film, Trailer oder Werbeclip.' },
  { n: 14, cmd: '/vivid', cat: 'Kreativität', desc: 'Mehr Sinneseindrücke, Details und lebendige Beschreibungen.' },
  { n: 15, cmd: '/poetic', cat: 'Kreativität', desc: 'Lyrische, elegante und sprachlich schöne Ausdrucksweise.' },
  { n: 16, cmd: '/dramatic', cat: 'Kreativität', desc: 'Spannender, intensiver und emotionaler Stil.' },
  { n: 17, cmd: '/humor', cat: 'Kreativität', desc: 'Witzige, lockere und unterhaltsame Antwort.' },
  { n: 18, cmd: '/storyteller', cat: 'Kreativität', desc: 'Denkt und schreibt zuerst in Story, Szene und Erzählbogen.' },
  { n: 19, cmd: '/metaphor', cat: 'Kreativität', desc: 'Erklärt mit abstrakten Verbindungen, Bildern und Vergleichen.' },
  { n: 20, cmd: '/artful', cat: 'Kreativität', desc: 'Künstlerische, stilvolle und besonders ästhetische Sprache.' },
  { n: 21, cmd: '/historian', cat: 'Experten', desc: 'Historischer Kontext, Entwicklungen und Einordnung.' },
  { n: 22, cmd: '/scientist', cat: 'Experten', desc: 'Analytisch, faktenbasiert und methodisch erklärend.' },
  { n: 23, cmd: '/philosopher', cat: 'Experten', desc: 'Tiefes Nachdenken über Bedeutung, Prinzipien und Konsequenzen.' },
  { n: 24, cmd: '/techie', cat: 'Experten', desc: 'Detaillierte technische Erklärung mit Tools, Systemen und Abläufen.' },
  { n: 25, cmd: '/mathematician', cat: 'Experten', desc: 'Zahlen, Logik, Berechnungen und saubere Schlussfolgerungen im Fokus.' },
  { n: 26, cmd: '/linguist', cat: 'Experten', desc: 'Sprache, Bedeutung, Formulierung und Stil stehen im Mittelpunkt.' },
  { n: 27, cmd: '/doctor', cat: 'Experten', desc: 'Gesundheits- und Medizinfragen verständlich und vorsichtig erklären.' },
  { n: 28, cmd: '/engineer', cat: 'Experten', desc: 'Praktisch, lösungsorientiert und umsetzbar denken.' },
  { n: 29, cmd: '/economist', cat: 'Experten', desc: 'Märkte, Finanzen, Trends und wirtschaftliche Auswirkungen analysieren.' },
  { n: 30, cmd: '/lawyer', cat: 'Experten', desc: 'Juristisch klar, strukturiert und vorsichtig argumentieren.' },
  { n: 31, cmd: '/OODA', cat: 'Analyse', desc: 'Schneller Denkzyklus: Beobachten, Einordnen, Entscheiden, Handeln.' },
  { n: 32, cmd: '/L99', cat: 'Analyse', desc: 'Elite-Problemlösungsmodus für schwierige Aufgaben.' },
  { n: 33, cmd: '/solver', cat: 'Analyse', desc: 'Fokussiert sich ausschließlich auf Lösungen und nächste Schritte.' },
  { n: 34, cmd: '/debug', cat: 'Analyse', desc: 'Findet Fehler in Texten, Code, Abläufen oder Logik.' },
  { n: 35, cmd: '/optimizer', cat: 'Analyse', desc: 'Verbessert Prozesse, Inhalte oder Ergebnisse systematisch.' },
  { n: 36, cmd: '/streamline', cat: 'Analyse', desc: 'Macht Abläufe effizienter, schlanker und schneller.' },
  { n: 37, cmd: '/critical', cat: 'Analyse', desc: 'Kritisches Denken: hinterfragt Annahmen und Schwächen.' },
  { n: 38, cmd: '/detective', cat: 'Analyse', desc: 'Untersucht Hinweise, Muster und mögliche Ursachen.' },
  { n: 39, cmd: '/strategist', cat: 'Analyse', desc: 'Plant taktisch, priorisiert und denkt in Szenarien.' },
  { n: 40, cmd: '/advisor', cat: 'Analyse', desc: 'Gibt strategische Empfehlungen mit klarer Richtung.' },
  { n: 41, cmd: '/analyst', cat: 'Analyse', desc: 'Interpretiert Daten, Zahlen, Statistiken und Muster.' },
  { n: 42, cmd: '/trends', cat: 'Analyse', desc: 'Erkennt Entwicklungen, Muster und mögliche Trendrichtungen.' },
  { n: 43, cmd: '/correlate', cat: 'Analyse', desc: 'Verknüpft Ideen, Datenpunkte und Ursachen miteinander.' },
  { n: 44, cmd: '/forecast', cat: 'Analyse', desc: 'Schätzt mögliche Entwicklungen und Zukunftsszenarien ein.' },
  { n: 45, cmd: '/risk', cat: 'Analyse', desc: 'Bewertet Risiken, Fallstricke und Schwachstellen.' },
  { n: 46, cmd: '/logic', cat: 'Analyse', desc: 'Leitet Antworten streng logisch und nachvollziehbar ab.' },
  { n: 47, cmd: '/matrix', cat: 'Analyse', desc: 'Analysiert mehrere Faktoren gleichzeitig und strukturiert sie.' },
  { n: 48, cmd: '/inspector', cat: 'Analyse', desc: 'Prüft auf Widersprüche, Fehler und Ungenauigkeiten.' },
  { n: 49, cmd: '/summary', cat: 'Analyse', desc: 'Fasst Inhalte kurz, klar und konzentriert zusammen.' },
  { n: 50, cmd: '/breakdown', cat: 'Analyse', desc: 'Zerlegt ein Thema Schritt für Schritt in Einzelteile.' },
  { n: 51, cmd: '/mentor', cat: 'Kommunikation', desc: 'Gibt Orientierung, Erfahrung und langfristige Hinweise.' },
  { n: 52, cmd: '/coach', cat: 'Kommunikation', desc: 'Motiviert, aktiviert und hilft bei konkreter Umsetzung.' },
  { n: 53, cmd: '/teacher', cat: 'Kommunikation', desc: 'Erklärt didaktisch, verständlich und lernorientiert.' },
  { n: 54, cmd: '/storyhero', cat: 'Kommunikation', desc: 'Betrachtet die Antwort aus der Perspektive einer Hauptfigur.' },
  { n: 55, cmd: '/villain', cat: 'Kommunikation', desc: 'Nimmt eine konträre, provokante oder gegenläufige Perspektive ein.' },
  { n: 56, cmd: '/journalist', cat: 'Kommunikation', desc: 'Recherchiert, hinterfragt und formuliert im journalistischen Stil.' },
  { n: 57, cmd: '/interviewer', cat: 'Kommunikation', desc: 'Stellt gute Fragen, um mehr Tiefe und Klarheit zu gewinnen.' },
  { n: 58, cmd: '/debater', cat: 'Kommunikation', desc: 'Zeigt Argumente, Gegenargumente und Abwägungen.' },
  { n: 59, cmd: '/friend', cat: 'Kommunikation', desc: 'Antwortet locker, unterstützend und nahbar.' },
  { n: 60, cmd: '/critic', cat: 'Kommunikation', desc: 'Gibt ehrliche Kritik und zeigt Verbesserungspotenzial.' },
  { n: 61, cmd: '/infinite', cat: 'Modi', desc: 'Erweitert Ideen maximal kreativ und grenzenlos.' },
  { n: 62, cmd: '/hyperfocus', cat: 'Modi', desc: 'Konzentriert sich extrem tief auf ein Thema oder Ziel.' },
  { n: 63, cmd: '/memory', cat: 'Modi', desc: 'Nutzt den bisherigen Kontext besonders stark und konsistent.' },
  { n: 64, cmd: '/sandbox', cat: 'Modi', desc: 'Denkt experimentell, testet wilde Ideen und Varianten.' },
  { n: 65, cmd: '/simulation', cat: 'Modi', desc: 'Spielt hypothetische Szenarien realistisch durch.' },
  { n: 66, cmd: '/multiverse', cat: 'Modi', desc: 'Betrachtet mehrere Perspektiven oder alternative Möglichkeiten.' },
  { n: 67, cmd: '/timewarp', cat: 'Modi', desc: 'Denkt aus Vergangenheit, Gegenwart oder Zukunft heraus.' },
  { n: 68, cmd: '/quantum', cat: 'Modi', desc: 'Unkonventionelles, probabilistisches und flexibles Denken.' },
  { n: 69, cmd: '/dimension', cat: 'Modi', desc: 'Mehrschichtige Analyse mit verschiedenen Ebenen.' },
  { n: 70, cmd: '/fractal', cat: 'Modi', desc: 'Entwickelt wiederkehrende Muster, Strukturen und rekursive Ideen.' },
  { n: 71, cmd: '/concise', cat: 'Stil', desc: 'Sehr kurz, direkt und präzise.' },
  { n: 72, cmd: '/verbose', cat: 'Stil', desc: 'Ausführlich, lang und detailreich.' },
  { n: 73, cmd: '/analog', cat: 'Stil', desc: 'Erklärt mit Vergleichen, Bildern und Analogien.' },
  { n: 74, cmd: '/clarify', cat: 'Stil', desc: 'Vereinfacht komplexe Inhalte und macht sie verständlich.' },
  { n: 75, cmd: '/translate', cat: 'Stil', desc: 'Übersetzt oder erklärt mehrsprachig.' },
  { n: 76, cmd: '/debunk', cat: 'Stil', desc: 'Entlarvt falsche Annahmen, Mythen oder Fehlinformationen.' },
  { n: 77, cmd: '/highlight', cat: 'Stil', desc: 'Hebt die wichtigsten Punkte klar hervor.' },
  { n: 78, cmd: '/contrast', cat: 'Stil', desc: 'Vergleicht Vor- und Nachteile oder Unterschiede.' },
  { n: 79, cmd: '/rephrase', cat: 'Stil', desc: 'Formuliert einen Text besser, klarer oder passender um.' },
  { n: 80, cmd: '/explainlikeimfive', cat: 'Stil', desc: 'Erklärt so einfach, dass es jeder versteht.' },
  { n: 81, cmd: '/alchemy', cat: 'Output', desc: 'Verwandelt eine rohe Idee in etwas Wertvolles und Umsetzbares.' },
  { n: 82, cmd: '/mindmap', cat: 'Output', desc: 'Organisiert Gedanken visuell und strukturiert wie eine Mindmap.' },
  { n: 83, cmd: '/lab', cat: 'Output', desc: 'Experimenteller Ansatz mit Tests, Hypothesen und Varianten.' },
  { n: 84, cmd: '/chaos', cat: 'Output', desc: 'Bringt ungewöhnliche, wilde und randomisierte Ideen ein.' },
  { n: 85, cmd: '/wizard', cat: 'Output', desc: 'Magischer, fantasievoller und spielerischer Stil.' },
  { n: 86, cmd: '/robot', cat: 'Output', desc: 'Rein sachlich, faktisch und emotionsarm.' },
  { n: 87, cmd: '/alien', cat: 'Output', desc: 'Blick von außen: fremde, ungewohnte Perspektive.' },
  { n: 88, cmd: '/dream', cat: 'Output', desc: 'Visionäre, kreative und zukunftsorientierte Ideen.' },
  { n: 89, cmd: '/echo', cat: 'Output', desc: 'Wiederholt Muster bewusst und verstärkt zentrale Aussagen.' },
  { n: 90, cmd: '/mimic', cat: 'Output', desc: 'Kopiert einen vorgegebenen Stil oder eine bestimmte Tonalität.' },
  { n: 91, cmd: '/boost', cat: 'Output', desc: 'Allgemeine Verstärkung der Antwortqualität.' },
  { n: 92, cmd: '/refine', cat: 'Output', desc: 'Poliert Inhalte sauber aus und macht sie professioneller.' },
  { n: 93, cmd: '/amplify', cat: 'Output', desc: 'Verstärkt Argumente, Stil oder Wirkung.' },
  { n: 94, cmd: '/elevate', cat: 'Output', desc: 'Hebt die Antwort auf eine strategischere Ebene.' },
  { n: 95, cmd: '/powerup', cat: 'Output', desc: 'Verbessert gleichzeitig Logik, Kreativität und Wirkung.' },
  { n: 96, cmd: '/clarion', cat: 'Output', desc: 'Kristallklare Kommunikation ohne unnötige Umwege.' },
  { n: 97, cmd: '/precision', cat: 'Output', desc: 'Minimiert Fehler und maximiert Genauigkeit.' },
  { n: 98, cmd: '/spark', cat: 'Output', desc: 'Erzeugt Inspiration und neue Denkanstöße.' },
  { n: 99, cmd: '/ignition', cat: 'Output', desc: 'Startet neue Ideen, Konzepte oder Projekte kraftvoll an.' },
  { n: 100, cmd: '/supreme', cat: 'Output', desc: 'Maximaler Output-Modus mit höchster Qualität und Wirkung.' },
];

const CATEGORIES = ['Alle', 'Reasoning', 'Kreativität', 'Experten', 'Analyse', 'Kommunikation', 'Modi', 'Stil', 'Output'];

/* ── Styled ──────────────────────────────── */

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: 0 0 ${tokens.spacing['4xl']};
`;

const Controls = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};

  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const SearchWrap = styled.div`
  position: relative;
`;

const SearchIcon = styled.span`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: ${tokens.colors.textDim};
  font-size: ${tokens.fontSizes.base};
  pointer-events: none;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 12px 14px 12px 40px;
  font-size: ${tokens.fontSizes.sm};
  font-family: ${tokens.fonts.body};
  border: 1.5px solid ${tokens.colors.glassBorder};
  border-radius: ${tokens.radii.lg};
  background: ${tokens.colors.surface};
  color: ${tokens.colors.text};
  outline: none;
  transition: border-color ${tokens.transitions.fast};

  &:focus { border-color: ${tokens.colors.primary}; }
  &::placeholder { color: ${tokens.colors.textDim}; }
`;

const Filters = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
`;

const FilterButton = styled.button`
  padding: 6px 14px;
  font-size: ${tokens.fontSizes.xs};
  font-family: ${tokens.fonts.body};
  font-weight: ${tokens.fontWeights.medium};
  border: 1.5px solid ${({ $active }) => ($active ? tokens.colors.primary : tokens.colors.glassBorder)};
  border-radius: ${tokens.radii.md};
  background: ${({ $active }) => ($active ? tokens.colors.primary : tokens.colors.surface)};
  color: ${({ $active }) => ($active ? '#fff' : tokens.colors.textMuted)};
  cursor: pointer;
  transition: all ${tokens.transitions.fast};
  white-space: nowrap;

  &:hover {
    border-color: ${tokens.colors.primary};
    color: ${({ $active }) => ($active ? '#fff' : tokens.colors.primary)};
  }
`;

const ResultsCount = styled.p`
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};

  strong { color: ${tokens.colors.primary}; font-weight: ${tokens.fontWeights.semi}; }
`;

const GridWrap = styled.div`
  max-width: 1200px;
  margin: ${tokens.spacing.xl} auto 0;
  padding: 0 ${tokens.spacing.lg};

  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: ${tokens.spacing.md};
`;

const Card = styled.div`
  background: ${tokens.colors.surface};
  border: 1.5px solid ${tokens.colors.glassBorder};
  border-radius: ${tokens.radii.xl};
  padding: ${tokens.spacing.md} ${tokens.spacing.md} 14px;
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
  align-items: flex-start;
  justify-content: space-between;
  gap: ${tokens.spacing.sm};
`;

const CardLeft = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const CardNum = styled.span`
  font-size: 10px;
  font-family: ${tokens.fonts.mono};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.06em;
`;

const CardCommand = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.primary};
  letter-spacing: -0.01em;
`;

const CardCat = styled.span`
  display: inline-block;
  font-size: 9px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  padding: 2px 8px;
  border-radius: ${tokens.radii.sm};
  font-weight: ${tokens.fontWeights.semi};
  margin-top: 2px;
  width: fit-content;
`;

const CopyButton = styled.button`
  flex-shrink: 0;
  padding: 6px 12px;
  font-size: ${tokens.fontSizes.xs};
  font-family: ${tokens.fonts.body};
  font-weight: ${tokens.fontWeights.medium};
  background: ${({ $copied }) => ($copied ? '#DCFCE7' : tokens.colors.surfaceAlt)};
  border: 1.5px solid ${({ $copied }) => ($copied ? '#86EFAC' : tokens.colors.glassBorder)};
  ${clipBR(CHAMFER.xs)}
  color: ${({ $copied }) => ($copied ? '#15803D' : tokens.colors.textMuted)};
  cursor: pointer;
  transition: all ${tokens.transitions.fast};
  white-space: nowrap;

  &:hover {
    background: ${({ $copied }) => ($copied ? '#DCFCE7' : tokens.colors.primaryLighter)};
    border-color: ${({ $copied }) => ($copied ? '#86EFAC' : tokens.colors.primary)};
    color: ${({ $copied }) => ($copied ? '#15803D' : tokens.colors.primary)};
  }
`;

const CardDesc = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const Empty = styled.div`
  grid-column: 1 / -1;
  text-align: center;
  padding: ${tokens.spacing['3xl']} 0;
  color: ${tokens.colors.textDim};
  font-size: ${tokens.fontSizes.sm};
`;

const Note = styled.p`
  max-width: 1200px;
  margin: 0 auto;
  padding: ${tokens.spacing.xl} ${tokens.spacing.lg} ${tokens.spacing['3xl']};
  text-align: center;
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  line-height: ${tokens.lineHeights.relaxed};

  ${media.lg} { padding-left: ${tokens.spacing['2xl']}; padding-right: ${tokens.spacing['2xl']}; }
`;

/* ── Component ───────────────────────────── */

export default function PromptSkillsPageClient() {
  const [query, setQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Alle');
  const [copiedCmd, setCopiedCmd] = useState(null);

  const filtered = useMemo(() => {
    const q = query.toLowerCase().trim();
    return SKILLS.filter((s) => {
      const matchCat = activeCategory === 'Alle' || s.cat === activeCategory;
      const matchText =
        !q ||
        s.cmd.toLowerCase().includes(q) ||
        s.desc.toLowerCase().includes(q) ||
        s.cat.toLowerCase().includes(q);
      return matchCat && matchText;
    });
  }, [query, activeCategory]);

  const handleCopy = async (cmd) => {
    try {
      await navigator.clipboard.writeText(cmd);
    } catch {
      const ta = document.createElement('textarea');
      ta.value = cmd;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopiedCmd(cmd);
    setTimeout(() => {
      setCopiedCmd((current) => (current === cmd ? null : current));
    }, 1800);
  };

  return (
    <SubpageLayout>
      <PageHero
        title="100 <span>Prompt Skills</span>"
        subtitle="Copy & Paste Commands für ChatGPT — Deutsch erklärt."
      />

      <Section>
        <Controls>
          <SearchWrap>
            <SearchIcon aria-hidden="true">⌕</SearchIcon>
            <SearchInput
              type="text"
              placeholder="Skill suchen … z.B. /deep dive oder Kreativität"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              aria-label="Skill suchen"
            />
          </SearchWrap>

          <Filters role="group" aria-label="Kategorie-Filter">
            {CATEGORIES.map((cat) => (
              <FilterButton
                key={cat}
                type="button"
                $active={activeCategory === cat}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </FilterButton>
            ))}
          </Filters>

          <ResultsCount>
            <strong>{filtered.length}</strong> von {SKILLS.length} Skills angezeigt
          </ResultsCount>
        </Controls>

        <GridWrap>
          <Grid role="list" aria-label="Prompt Skills">
            {filtered.length === 0 && (
              <Empty>Keine Skills gefunden — versuch einen anderen Suchbegriff.</Empty>
            )}
            {filtered.map((s) => (
              <Card key={s.n} role="listitem">
                <CardTop>
                  <CardLeft>
                    <CardNum>{String(s.n).padStart(2, '0')}</CardNum>
                    <CardCommand>{s.cmd}</CardCommand>
                    <CardCat>{s.cat}</CardCat>
                  </CardLeft>
                  <CopyButton
                    type="button"
                    $copied={copiedCmd === s.cmd}
                    onClick={() => handleCopy(s.cmd)}
                  >
                    {copiedCmd === s.cmd ? '✓ Kopiert' : 'Kopieren'}
                  </CopyButton>
                </CardTop>
                <CardDesc>{s.desc}</CardDesc>
              </Card>
            ))}
          </Grid>
        </GridWrap>
      </Section>

      <Note>
        <strong>Hinweis:</strong> Diese Skills sind Prompt-Shortcuts für Stil, Rolle und Antwortverhalten — keine offiziellen ChatGPT-Systembefehle.
      </Note>
    </SubpageLayout>
  );
}
