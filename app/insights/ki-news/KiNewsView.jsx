'use client';

import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../../styles/cyberpunk';
import SubpageLayout from '../../../components/SubpageLayout';
import PageHero from '../../../components/ui/PageHero';
import CTABanner from '../../../components/ui/CTABanner';
import Button from '../../../components/ui/Button';
import { CALENDLY_URL } from '../../../lib/site';

/* ── Tone → Akzentfarbe ────────────────────── */
const TONE = {
  good: { color: tokens.colors.mint, bg: tokens.colors.mintBg },
  info: { color: tokens.colors.navy, bg: tokens.colors.navyBg },
  warn: { color: tokens.colors.orange, bg: tokens.colors.orangeBg },
  neutral: { color: tokens.colors.primary, bg: tokens.colors.primaryLighter },
};
const toneOf = (t) => TONE[t] || TONE.neutral;

/* ── Layout ────────────────────────────────── */
const Section = styled.section`
  padding: ${tokens.spacing['3xl']} 0;
  background: ${tokens.colors.pageBg};
`;

const Container = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.lg} {
    padding: 0 ${tokens.spacing['2xl']};
  }
`;

const SectionLabel = styled.h2`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.colors.textMuted};
  margin: 0 0 ${tokens.spacing.lg};
`;

/* ── Dashboard ─────────────────────────────── */
const Dashboard = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  margin-bottom: ${tokens.spacing['4xl']};

  ${media.lg} {
    grid-template-columns: 1.1fr 1fr;
  }
`;

const Panel = styled.div`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
  padding: ${tokens.spacing.xl};
`;

const PanelTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin: 0 0 4px;
`;

const PanelSub = styled.p`
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  margin: 0 0 ${tokens.spacing.lg};
`;

/* KPI tiles */
const KpiRow = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: ${tokens.spacing.md};
  margin-bottom: ${tokens.spacing.lg};

  ${media.sm} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const KpiTile = styled.div`
  position: relative;
  background: ${tokens.colors.surfaceAlt};
  border: 1px solid ${tokens.colors.glassBorder};
  border-left: 3px solid ${({ $accent }) => $accent || tokens.colors.primary};
  padding: ${tokens.spacing.md};
`;

const KpiValue = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  line-height: 1;
  color: ${tokens.colors.text};
`;

const KpiLabel = styled.div`
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textMuted};
  margin-top: 6px;
  line-height: ${tokens.lineHeights.snug};
`;

/* Lab ranking bars */
const RankRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 28px;
  align-items: center;
  gap: ${tokens.spacing.md};
  margin-bottom: ${tokens.spacing.sm};

  &:last-child { margin-bottom: 0; }
`;

const RankLabel = styled.span`
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.textSoft};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const RankTrack = styled.div`
  height: 12px;
  background: ${tokens.colors.surfaceAlt};
  border: 1px solid ${tokens.colors.glassBorder};
  overflow: hidden;
`;

const RankFill = styled.div`
  height: 100%;
  width: ${({ $pct }) => $pct}%;
  min-width: 6px;
  background: ${({ $color }) => $color};
`;

const RankCount = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  text-align: right;
`;

/* Sparkline */
const SparkWrap = styled.div`
  width: 100%;
`;

const SparkScale = styled.div`
  display: flex;
  justify-content: space-between;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${tokens.colors.textDim};
  margin-top: 6px;
`;

/* ── Edition / Stream ──────────────────────── */
const EditionHeader = styled.div`
  display: flex;
  align-items: baseline;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  padding-bottom: ${tokens.spacing.md};
  border-bottom: 2px solid ${tokens.colors.primary};
  margin-bottom: ${tokens.spacing.xl};
`;

const EditionDate = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
`;

const EditionPeriod = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
`;

const NewBadge = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.mint};
  background: ${tokens.colors.mintBg};
  border: 1px solid ${tokens.colors.mint}40;
  padding: 2px 8px;
`;

/* TL;DR */
const Tldr = styled.div`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-top: 3px solid ${tokens.colors.primary};
  padding: ${tokens.spacing.xl};
  margin-bottom: ${tokens.spacing['2xl']};
`;

const TldrItem = styled.div`
  display: grid;
  grid-template-columns: 26px 1fr;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.sm} 0;
  &:not(:last-child) { border-bottom: 1px dashed ${tokens.colors.glassBorder}; }
`;

const TldrNum = styled.span`
  width: 24px; height: 24px;
  display: flex; align-items: center; justify-content: center;
  background: ${tokens.colors.primary};
  color: #fff;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.bold};
`;

const TldrTitle = styled.strong`
  display: block;
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: 2px;
`;

const TldrText = styled.span`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

/* Story cards */
const StoryGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  margin-bottom: ${tokens.spacing['2xl']};

  ${media.md} {
    grid-template-columns: 1fr 1fr;
  }
`;

const StoryCard = styled.article`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-left: 3px solid ${({ $accent }) => $accent || tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
  padding: ${tokens.spacing.lg};
`;

const StoryTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: ${tokens.spacing.sm};
`;

const CategoryTag = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${({ $color }) => $color || tokens.colors.primary};
  background: ${({ $bg }) => $bg || tokens.colors.primaryLighter};
  padding: 2px 8px;
`;

const LabTag = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.textMuted};
  border: 1px solid ${({ $color }) => `${$color}55`};
  border-left: 3px solid ${({ $color }) => $color};
  padding: 2px 8px;
`;

const StoryTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin: 0 0 ${tokens.spacing.sm};
`;

const StoryText = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  margin: 0 0 ${tokens.spacing.md};
`;

const WhyBox = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  background: ${tokens.colors.surfaceAlt};
  border-left: 3px solid ${({ $accent }) => $accent || tokens.colors.primary};
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};
  margin: 0 0 ${tokens.spacing.md};

  strong { color: ${tokens.colors.text}; font-weight: ${tokens.fontWeights.bold}; }
`;

const LinkRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
`;

const SourceLink = styled.a`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.primary};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

/* Research strip */
const ResearchGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};
  margin-bottom: ${tokens.spacing['2xl']};

  ${media.sm} { grid-template-columns: 1fr 1fr; }
  ${media.lg} { grid-template-columns: repeat(4, 1fr); }
`;

const Paper = styled.div`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-top: 3px solid ${tokens.colors.primaryLight};
  padding: ${tokens.spacing.md};
`;

const PaperTag = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.06em;
  color: ${tokens.colors.primary};
  margin-bottom: 4px;
`;

const PaperTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin: 0 0 6px;
`;

const PaperText = styled.p`
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  margin: 0;
`;

/* Sources */
const Sources = styled.details`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  padding: 0 ${tokens.spacing.lg};

  summary {
    cursor: pointer;
    list-style: none;
    padding: ${tokens.spacing.md} 0;
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    font-weight: ${tokens.fontWeights.semi};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${tokens.colors.textMuted};
  }
  summary::-webkit-details-marker { display: none; }
  summary::before { content: '▸ '; color: ${tokens.colors.primary}; }
  &[open] summary::before { content: '▾ '; }
`;

const SourceTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: ${tokens.fontSizes.xs};
  margin-bottom: ${tokens.spacing.lg};

  th, td {
    text-align: left;
    padding: 6px 10px;
    border-bottom: 1px solid ${tokens.colors.glassBorder};
  }
  th {
    font-family: ${tokens.fonts.mono};
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: ${tokens.colors.textMuted};
    background: ${tokens.colors.surfaceAlt};
  }
  td a { color: ${tokens.colors.primary}; text-decoration: none; }
  td a:hover { text-decoration: underline; }
`;

const Rating = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.bold};
  padding: 1px 7px;
  color: ${({ $r }) =>
    $r === 'A' ? tokens.colors.teal : $r === 'B' ? tokens.colors.amber : tokens.colors.textMuted};
  background: ${({ $r }) =>
    $r === 'A' ? tokens.colors.mintBg : $r === 'B' ? tokens.colors.orangeBg : tokens.colors.surfaceAlt};
`;

/* Older editions */
const PastEdition = styled.details`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.sm)}
  margin-bottom: ${tokens.spacing.md};
  padding: 0 ${tokens.spacing.lg};

  summary {
    cursor: pointer;
    list-style: none;
    display: flex;
    align-items: baseline;
    gap: ${tokens.spacing.md};
    padding: ${tokens.spacing.md} 0;
  }
  summary::-webkit-details-marker { display: none; }
`;

const PastDate = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
`;

const PastSummary = styled.span`
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
`;

const PastBody = styled.div`
  padding-bottom: ${tokens.spacing.lg};
`;

/* ── Sparkline (SVG) ───────────────────────── */
function Sparkline({ series }) {
  const W = 320;
  const H = 64;
  const pad = 6;
  const counts = series.map((s) => s.count);
  const max = Math.max(1, ...counts);
  const n = series.length;

  if (n <= 1) {
    const c = counts[0] ?? 0;
    const cy = H - pad - ((c / max) * (H - pad * 2));
    return (
      <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" role="img" aria-label="News-Volumen">
        <line x1={pad} y1={H - pad} x2={W - pad} y2={H - pad} stroke={tokens.colors.glassBorder} strokeWidth="1" />
        <circle cx={W / 2} cy={cy} r="4" fill={tokens.colors.primary} />
      </svg>
    );
  }

  const step = (W - pad * 2) / (n - 1);
  const pts = series.map((s, i) => {
    const x = pad + i * step;
    const y = H - pad - ((s.count / max) * (H - pad * 2));
    return [x, y];
  });
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
  const area = `${path} L ${pts[n - 1][0].toFixed(1)} ${H - pad} L ${pts[0][0].toFixed(1)} ${H - pad} Z`;

  return (
    <svg viewBox={`0 0 ${W} ${H}`} width="100%" height={H} preserveAspectRatio="none" role="img" aria-label="News-Volumen pro Ausgabe">
      <path d={area} fill={tokens.colors.primary} fillOpacity="0.08" />
      <path d={path} fill="none" stroke={tokens.colors.primary} strokeWidth="2" />
      {pts.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r="3" fill={tokens.colors.primary} />
      ))}
    </svg>
  );
}

function Edition({ edition }) {
  return (
    <>
      <Tldr>
        <SectionLabel style={{ marginBottom: tokens.spacing.md }}>Die Headlines</SectionLabel>
        {edition.tldr?.map((item, i) => (
          <TldrItem key={i}>
            <TldrNum>{i + 1}</TldrNum>
            <span>
              <TldrTitle>{item.title}</TldrTitle>
              <TldrText>{item.text}</TldrText>
            </span>
          </TldrItem>
        ))}
      </Tldr>

      <SectionLabel>Top Stories</SectionLabel>
      <StoryGrid>
        {edition.stories?.map((story, i) => {
          const tone = toneOf(story.tone);
          return (
            <StoryCard key={i} $accent={tone.color}>
              <CyberCorners $color={tone.color} $size={8} />
              <StoryTags>
                <CategoryTag $color={tone.color} $bg={tone.bg}>{story.category}</CategoryTag>
                {story.labs?.map((lab) => (
                  <LabTag key={lab} $color={tone.color}>{lab}</LabTag>
                ))}
              </StoryTags>
              <StoryTitle>{story.title}</StoryTitle>
              <StoryText>{story.summary}</StoryText>
              {story.why && (
                <WhyBox $accent={tone.color}>
                  <strong>Warum es zählt: </strong>{story.why}
                </WhyBox>
              )}
              {story.links?.length > 0 && (
                <LinkRow>
                  {story.links.map((l) => (
                    <SourceLink key={l.url} href={l.url} target="_blank" rel="noopener noreferrer">
                      {l.label} →
                    </SourceLink>
                  ))}
                </LinkRow>
              )}
            </StoryCard>
          );
        })}
      </StoryGrid>

      {edition.research?.length > 0 && (
        <>
          <SectionLabel>Research Highlights</SectionLabel>
          <ResearchGrid>
            {edition.research.map((p, i) => (
              <Paper key={i}>
                <PaperTag>{p.tag}</PaperTag>
                <PaperTitle>{p.title}</PaperTitle>
                <PaperText>{p.text}</PaperText>
              </Paper>
            ))}
          </ResearchGrid>
        </>
      )}

      {edition.sources?.length > 0 && (
        <Sources>
          <summary>Quellen ({edition.sources.length} · gewertet)</summary>
          <SourceTable>
            <thead>
              <tr><th>#</th><th>Titel</th><th>Outlet</th><th>★</th></tr>
            </thead>
            <tbody>
              {edition.sources.map((s) => (
                <tr key={s.id}>
                  <td>{s.id}</td>
                  <td><a href={s.url} target="_blank" rel="noopener noreferrer">{s.title}</a></td>
                  <td>{s.outlet}</td>
                  <td><Rating $r={s.rating}>{s.rating}</Rating></td>
                </tr>
              ))}
            </tbody>
          </SourceTable>
        </Sources>
      )}
    </>
  );
}

export default function KiNewsView({ editions = [], ranking = [], series = [], kpi = {} }) {
  const latest = editions[0];
  const past = editions.slice(1);

  return (
    <SubpageLayout>
      <PageHero
        badge="KI-News · Daily"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        accentColor={tokens.colors.primaryLighter}
        title="KI-News, <span>eingeordnet</span> für die Praxis"
        subtitle="Jeden Tag die wichtigsten KI-Nachrichten — Modelle, Releases, Regulierung und Research, übersetzt in konkrete Relevanz für den NRW-Mittelstand."
        breadcrumbs={[{ label: 'Insights', href: '/insights' }, { label: 'KI-News' }]}
      />

      <Section>
        <Container>
          {/* ── Mini-Dashboard ── */}
          <SectionLabel>Lagebild · {kpi.latestPeriod || kpi.latestDateLabel}</SectionLabel>
          <Dashboard>
            <Panel>
              <CyberCorners $color={tokens.colors.primary} $size={10} />
              <PanelTitle>Lab-Ranking</PanelTitle>
              <PanelSub>Wie viele Stories die einzelnen Akteure ausgelöst haben</PanelSub>
              {ranking.map((r) => (
                <RankRow key={r.lab}>
                  <RankLabel>{r.lab}</RankLabel>
                  <RankTrack><RankFill $pct={r.pct} $color={r.color} /></RankTrack>
                  <RankCount>{r.count}</RankCount>
                </RankRow>
              ))}
            </Panel>

            <Panel>
              <CyberCorners $color={tokens.colors.mint} $size={10} />
              <PanelTitle>News-Volumen</PanelTitle>
              <PanelSub>Anzahl Top-Stories je Ausgabe</PanelSub>
              <KpiRow>
                <KpiTile $accent={tokens.colors.primary}>
                  <KpiValue>{kpi.storiesLatest}</KpiValue>
                  <KpiLabel>Stories heute</KpiLabel>
                </KpiTile>
                <KpiTile $accent={tokens.colors.mint}>
                  <KpiValue>{kpi.editionsCount}</KpiValue>
                  <KpiLabel>Ausgaben</KpiLabel>
                </KpiTile>
                <KpiTile $accent={tokens.colors.navy}>
                  <KpiValue>{kpi.totalStories}</KpiValue>
                  <KpiLabel>Stories gesamt</KpiLabel>
                </KpiTile>
                <KpiTile $accent={tokens.colors.orange}>
                  <KpiValue>{kpi.sourcesTracked}</KpiValue>
                  <KpiLabel>Quellen geprüft</KpiLabel>
                </KpiTile>
              </KpiRow>
              <SparkWrap>
                <Sparkline series={series} />
                <SparkScale>
                  <span>{series[0]?.label}</span>
                  <span>{series[series.length - 1]?.label}</span>
                </SparkScale>
              </SparkWrap>
            </Panel>
          </Dashboard>

          {/* ── Aktuelle Ausgabe ── */}
          {latest && (
            <>
              <EditionHeader>
                <EditionDate>{latest.dateLabel}</EditionDate>
                <NewBadge>Aktuell</NewBadge>
                {latest.period && <EditionPeriod>Berichtszeitraum {latest.period}</EditionPeriod>}
              </EditionHeader>
              <Edition edition={latest} />
            </>
          )}

          {/* ── Archiv ── */}
          {past.length > 0 && (
            <>
              <SectionLabel style={{ marginTop: tokens.spacing['3xl'] }}>Frühere Ausgaben</SectionLabel>
              {past.map((ed) => (
                <PastEdition key={ed.date}>
                  <summary>
                    <PastDate>{ed.dateLabel}</PastDate>
                    <PastSummary>{ed.summary}</PastSummary>
                  </summary>
                  <PastBody>
                    <Edition edition={ed} />
                  </PastBody>
                </PastEdition>
              ))}
            </>
          )}
        </Container>
      </Section>

      <CTABanner
        title="KI-Kompetenz wird <span>Pflicht</span> — bist du vorbereitet?"
        subtitle="Ab dem 02.08.2026 greift Artikel 4 des EU AI Act. Wir bringen dein Team auf Stand — herstellerunabhängig und vor Ort in NRW."
      >
        <Button variant="primary" size="lg" href="/unternehmen">
          Für Unternehmen
        </Button>
        <Button variant="secondary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Beratung buchen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
