'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React, { useEffect, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';

/* ─────────────────────────────────────────────
   EVENTS TIMELINE – dark, branded, with pep
   Live data: /api/events (HTML-scrape, 30-min ISR)
   Fallback: static list below if API fails
   ───────────────────────────────────────────── */

const ALL_EVENTS_URL = 'https://www.startplatz.de/events?tag=startplatz-ai-hub#kommendeEvents';

/* Fallback shown while loading or if the live feed errors out */
const FALLBACK_EVENTS = [
  {
    id: 'fallback-1',
    featured: true,
    date: 'FEB 03',
    title: 'KI-Manager Bootcamp',
    tags: ['AZAV', '8 Wochen'],
    description: 'FortyDays KI-Manager:in. Vollzeit, digital und 100% förderfähig.',
    location: 'Köln + Online',
    cta: 'Bewerben',
    href: ALL_EVENTS_URL,
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_600/v1776469601/ai-hub/website/AI-Academy-Website-Images/target-audience-arbeitssuchende.png',
  },
  { id: 'fallback-2', date: 'FEB 15', title: 'ChatGPT für Business', tags: ['Workshop'], description: 'Praktische Anwendungen für Marketing & Sales.', location: 'Düsseldorf', cta: 'Anmelden', href: ALL_EVENTS_URL },
  { id: 'fallback-3', date: 'FEB 22', title: 'AI Meetup Köln #47', tags: ['Kostenlos'], description: 'Networking und Talks zu aktuellen KI-Trends.', location: 'Köln', cta: 'Join', href: ALL_EVENTS_URL },
  { id: 'fallback-4', date: 'MÄR 01', title: 'Machine Learning Basics', tags: ['Deep Dive', '2 Tage'], description: 'Von der Theorie zur Praxis – trainiere dein erstes ML-Modell.', location: 'Köln', cta: 'Anmelden', href: ALL_EVENTS_URL },
  { id: 'fallback-5', date: 'MÄR 10', title: 'AI Trends 2026', tags: ['Online'], description: 'Keynote: Die wichtigsten KI-Entwicklungen im neuen Jahr.', location: 'Livestream', cta: 'Register', href: ALL_EVENTS_URL },
];

/* Per-card accent rotation – keeps the dark wall lively but on-brand */
const ACCENTS = [tokens.colors.mint, tokens.colors.navy, tokens.colors.primaryLight, tokens.colors.orange];
const accentFor = (idx, featured) => (featured ? tokens.colors.primaryLight : ACCENTS[idx % ACCENTS.length]);

/* ── Keyframes ─────────────────────────────── */
const scan = keyframes`
  0%   { transform: translateX(-30%); opacity: 0; }
  12%  { opacity: 1; }
  88%  { opacity: 1; }
  100% { transform: translateX(130%); opacity: 0; }
`;

const pulseDot = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50%      { opacity: 0.35; transform: scale(0.8); }
`;

const featuredGlow = keyframes`
  0%, 100% { box-shadow: 0 0 0 1px rgba(124,58,237,0.45), 0 16px 50px rgba(124,58,237,0.22); }
  50%      { box-shadow: 0 0 0 1px rgba(20,184,166,0.45), 0 16px 60px rgba(124,58,237,0.38); }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

/* ── Styles ────────────────────────────────── */

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: ${tokens.spacing.section} 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 18% 58%, rgba(124, 58, 237, 0.20) 0%, transparent 55%),
    radial-gradient(ellipse at 82% 18%, rgba(20, 184, 166, 0.12) 0%, transparent 52%),
    linear-gradient(155deg, #1A0E3F 0%, #2D1472 40%, #1E0B50 70%, #120830 100%);
`;

/* Fine technical grid texture – static, very low opacity */
const GridOverlay = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.5;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.035) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.035) 1px, transparent 1px);
  background-size: 64px 64px;
  -webkit-mask-image: radial-gradient(ellipse at 50% 40%, #000 0%, transparent 78%);
  mask-image: radial-gradient(ellipse at 50% 40%, #000 0%, transparent 78%);
`;

/* Animated accent scanline sweeping across the section top */
const ScanLine = styled.div`
  position: absolute;
  top: 0; left: 0;
  height: 2px;
  width: 34%;
  pointer-events: none;
  background: linear-gradient(90deg, transparent, ${tokens.colors.primaryLight}, ${tokens.colors.mint}, transparent);
  animation: ${scan} 7s ease-in-out infinite;
  @media (prefers-reduced-motion: reduce) { animation: none; opacity: 0.3; }
`;

const Container = styled.div`
  position: relative;
  z-index: 1;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.lg} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const SectionBadge = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 5px 14px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.primaryLight};
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.25);
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.lg};
`;

const LiveDot = styled.span`
  width: 7px; height: 7px;
  border-radius: 50%;
  background: ${({ $live }) => ($live ? tokens.colors.mint : tokens.colors.darkMuted)};
  box-shadow: ${({ $live }) => ($live ? `0 0 8px ${tokens.colors.mint}` : 'none')};
  ${({ $live }) => $live && css`animation: ${pulseDot} 1.8s ease-in-out infinite;`}
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const SectionTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['4xl']}, 6vw, ${tokens.fontSizes['7xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.darkText};
  line-height: ${tokens.lineHeights.tight};
  letter-spacing: 0;
  margin-bottom: ${tokens.spacing.md};
  text-transform: uppercase;

  span {
    background: linear-gradient(120deg, ${tokens.colors.primaryLight} 0%, ${tokens.colors.mint} 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
`;

const SectionSubtitle = styled.p`
  font-size: ${tokens.fontSizes.lg};
  color: ${tokens.colors.darkMuted};
  margin-bottom: ${tokens.spacing['2xl']};
  max-width: 600px;
`;

const DragHint = styled.span`
  display: inline-block;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${tokens.colors.darkMuted};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-bottom: ${tokens.spacing.md};
`;

/* Viewport with edge fades to hint horizontal scroll */
const ScrollViewport = styled.div`
  position: relative;
  z-index: 1;

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0; bottom: ${tokens.spacing.md};
    width: 56px;
    z-index: 2;
    pointer-events: none;
  }
  &::before { left: 0;  background: linear-gradient(90deg, #160A3A 0%, transparent 100%); }
  &::after  { right: 0; background: linear-gradient(270deg, #120830 0%, transparent 100%); }
  ${media.lg} {
    &::before, &::after { width: 90px; }
  }
`;

const ScrollWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow-x: auto;
  overflow-y: hidden;
  padding: ${tokens.spacing.sm} ${tokens.spacing.lg} 0;
  scroll-padding-inline: ${tokens.spacing.lg};
  scroll-snap-type: x mandatory;
  overscroll-behavior-inline: contain;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;

  &::-webkit-scrollbar { display: none; }
  ${media.lg} { padding-left: ${tokens.spacing['2xl']}; padding-right: ${tokens.spacing['2xl']}; }
`;

const ScrollRow = styled.div`
  display: flex;
  gap: ${tokens.spacing.lg};
  width: max-content;
  min-width: 100%;
  cursor: grab;
  user-select: none;
  padding-bottom: ${tokens.spacing.lg};

  &:active { cursor: grabbing; }
`;

const EventCard = styled.article`
  flex: 0 0 auto;
  width: min(82vw, 340px);
  position: relative;
  display: flex;
  flex-direction: column;
  scroll-snap-align: start;
  scroll-snap-stop: always;
  background: linear-gradient(180deg, rgba(28, 18, 56, 0.92) 0%, rgba(14, 8, 32, 0.96) 100%);
  border: 1px solid rgba(255, 255, 255, 0.08);
  ${clipTLBR(CHAMFER.lg)}
  overflow: hidden;
  transition: transform ${tokens.transitions.base}, border-color ${tokens.transitions.base},
              box-shadow ${tokens.transitions.base};

  &:hover {
    transform: translateY(-6px);
    border-color: ${({ $accent }) => `${$accent}66`};
    box-shadow: 0 18px 50px ${({ $accent }) => `${$accent}33`};
  }
  &:hover img { transform: scale(1.06); }

  ${({ $featured }) => $featured && css`
    width: min(88vw, 440px);
    border-color: transparent;
    animation: ${featuredGlow} 4.5s ease-in-out infinite;
    @media (prefers-reduced-motion: reduce) { animation: none; box-shadow: 0 0 0 1px rgba(124,58,237,0.45); }
  `}
`;

const MediaWrap = styled.div`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  background: linear-gradient(135deg, ${({ $accent }) => `${$accent}2e`} 0%, rgba(10,6,26,0.9) 70%);

  img {
    width: 100%; height: 100%;
    object-fit: cover;
    transition: transform ${tokens.transitions.slow};
  }
`;

const MediaOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 40%, rgba(10, 6, 26, 0.85) 100%);
  pointer-events: none;
`;

/* Big date – the hero element of each card */
const DateChip = styled.div`
  position: absolute;
  left: ${tokens.spacing.md};
  bottom: ${tokens.spacing.md};
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  line-height: 1;
  padding: 8px 12px;
  background: rgba(10, 6, 26, 0.6);
  border: 1px solid ${({ $accent }) => `${$accent}66`};
  border-left: 3px solid ${({ $accent }) => $accent};
  backdrop-filter: blur(4px);
  ${clipBR(CHAMFER.xs)}

  .day {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes['3xl']};
    font-weight: ${tokens.fontWeights.black};
    color: #fff;
  }
  .mon {
    font-family: ${tokens.fonts.mono};
    font-size: 10px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: ${({ $accent }) => $accent};
    margin-top: 2px;
  }
`;

const CardBody = styled.div`
  padding: ${tokens.spacing.xl};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const TagRow = styled.div`
  display: flex; flex-wrap: wrap;
  gap: ${tokens.spacing.xs};
  margin-bottom: ${tokens.spacing.sm};
`;

const Tag = styled.span`
  padding: 2px 8px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${({ $accent }) => $accent};
  background: ${({ $accent }) => `${$accent}1a`};
  border: 1px solid ${({ $accent }) => `${$accent}3d`};
  ${clipBR(4)}
`;

const EventTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.darkText};
  margin-bottom: ${tokens.spacing.xs};
  line-height: ${tokens.lineHeights.tight};
`;

const EventDesc = styled.p`
  font-size: ${tokens.fontSizes.sm};
  color: rgba(255, 255, 255, 0.76);
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.md};
`;

const LocationText = styled.span`
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: ${tokens.fontSizes.xs};
  color: rgba(255,255,255,0.58);
  margin-bottom: ${tokens.spacing.md};

  svg { width: 12px; height: 12px; flex-shrink: 0; color: ${({ $accent }) => $accent}; }
`;

const EventCTA = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  gap: 6px;
  padding: 10px 18px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${({ $featured }) => ($featured ? tokens.colors.primary : 'rgba(255,255,255,0.06)')};
  border: 1px solid ${({ $accent, $featured }) => ($featured ? 'transparent' : `${$accent}55`)};
  ${clipBR(CHAMFER.xs)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: background ${tokens.transitions.fast}, border-color ${tokens.transitions.fast}, color ${tokens.transitions.fast};
  margin-top: auto;

  &:hover {
    background: ${({ $featured }) => ($featured ? tokens.colors.primaryHover : 'rgba(255,255,255,0.12)')};
    border-color: ${({ $accent }) => $accent};
    color: #fff;
  }
  &:hover svg { transform: translateX(4px); }

  svg { width: 14px; height: 14px; transition: transform ${tokens.transitions.fast}; color: ${({ $accent, $featured }) => ($featured ? '#fff' : $accent)}; }
`;

const SkeletonCard = styled.div`
  flex: 0 0 auto;
  width: 340px;
  height: 420px;
  scroll-snap-align: start;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 0%,
    rgba(255,255,255,0.09) 50%,
    rgba(255,255,255,0.04) 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.6s linear infinite;
  border: 1px solid rgba(255,255,255,0.06);
  ${clipTLBR(CHAMFER.lg)}
  @media (prefers-reduced-motion: reduce) { animation: none; }
`;

const StatusNote = styled.p`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: rgba(255,255,255,0.3);
  letter-spacing: 0.1em;
  text-transform: uppercase;
  margin-top: ${tokens.spacing.md};
`;

const AllEventsCTAWrap = styled.div`
  display: flex;
  justify-content: center;
  margin-top: ${tokens.spacing['2xl']};
`;

const AllLink = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  padding: 16px 32px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  transition: background ${tokens.transitions.fast}, transform ${tokens.transitions.fast};
  box-shadow: 0 8px 32px rgba(124, 58, 237, 0.35);

  &:hover {
    background: ${tokens.colors.primaryHover};
    transform: translateY(-2px);
    color: #fff;
    box-shadow: 0 12px 40px rgba(124, 58, 237, 0.55);
  }

  svg { width: 16px; height: 16px; transition: transform ${tokens.transitions.fast}; }
  &:hover svg { transform: translateX(4px); }
`;

const ArrowSVG = () => (
  <svg viewBox="0 0 16 16" fill="none" aria-hidden="true"><path d="M3 8h8.5m0 0L8 4.5m3.5 3.5L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

const PinSVG = () => (
  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 21s7-6.3 7-11a7 7 0 1 0-14 0c0 4.7 7 11 7 11z" stroke="currentColor" strokeWidth="2"/><circle cx="12" cy="10" r="2.4" stroke="currentColor" strokeWidth="2"/></svg>
);

/* Split a "JUN 23" badge into month + day */
function splitDate(date) {
  const parts = (date || '').trim().split(/\s+/);
  if (parts.length >= 2) return { mon: parts[0], day: parts[1] };
  return { mon: '', day: parts[0] || '' };
}

/* ── Component ─────────────────────────────── */

export default function EventsTimeline() {
  const [events, setEvents] = useState(null);        // null = loading, [] = empty/error
  const [source, setSource] = useState('loading');   // 'loading' | 'live' | 'fallback'

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        const res = await fetch('/api/events', { cache: 'no-store' });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (cancelled) return;

        if (Array.isArray(data.events) && data.events.length > 0) {
          setEvents(data.events);
          setSource('live');
        } else {
          setEvents(FALLBACK_EVENTS);
          setSource('fallback');
        }
      } catch (err) {
        if (cancelled) return;
        setEvents(FALLBACK_EVENTS);
        setSource('fallback');
      }
    };

    load();
    return () => { cancelled = true; };
  }, []);

  const isLoading = events === null;
  const cards = events || [];

  return (
    <Section id="events" aria-label="Veranstaltungen">
      <GridOverlay aria-hidden="true" />
      <ScanLine aria-hidden="true" />

      <Container>
        <SectionBadge>
          <LiveDot $live={source === 'live'} aria-hidden="true" />
          {source === 'live' ? 'Live · STARTPLATZ AI Hub' : 'Saison 2026'}
        </SectionBadge>
        <SectionTitle>Nächste <span>Events</span></SectionTitle>
        <SectionSubtitle>Von Bootcamps über Workshops bis zu kostenlosen Meetups – finde dein nächstes Event.</SectionSubtitle>
        <DragHint aria-hidden="true">&gt; Wischen zum Entdecken</DragHint>
        {source === 'fallback' && (
          <StatusNote aria-live="polite">&gt; Live-Feed aktuell nicht erreichbar – zeige Vorschau</StatusNote>
        )}
      </Container>

      <ScrollViewport>
        <ScrollWrapper role="region" aria-label="Event-Karussell" tabIndex={0}>
          <ScrollRow>
            {isLoading
              ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`sk-${i}`} aria-hidden="true" />)
              : cards.map((ev, i) => {
                  const accent = accentFor(i, ev.featured);
                  const { mon, day } = splitDate(ev.date);
                  return (
                    <EventCard key={ev.id || ev.title} $featured={ev.featured} $accent={accent} aria-label={`${ev.title} – ${ev.date}`}>
                      <CyberCorners $color={accent} $size={12} />
                      <MediaWrap $accent={accent}>
                        {ev.image && <img src={ev.image} alt={ev.title} loading="lazy" width="1000" height="625" />}
                        <MediaOverlay />
                        {(day || mon) && (
                          <DateChip $accent={accent}>
                            <span className="day">{day}</span>
                            {mon && <span className="mon">{mon}</span>}
                          </DateChip>
                        )}
                      </MediaWrap>
                      <CardBody>
                        {ev.tags && ev.tags.length > 0 && (
                          <TagRow>{ev.tags.map((t) => <Tag key={t} $accent={accent}>{t}</Tag>)}</TagRow>
                        )}
                        <EventTitle>{ev.title}</EventTitle>
                        {ev.description && <EventDesc>{ev.description}</EventDesc>}
                        {ev.location && <LocationText $accent={accent}><PinSVG />{ev.location}</LocationText>}
                        <EventCTA href={ev.href || ALL_EVENTS_URL} $accent={accent} $featured={ev.featured} target="_blank" rel="noopener noreferrer">
                          {ev.cta || 'Anmelden'} <ArrowSVG />
                        </EventCTA>
                      </CardBody>
                    </EventCard>
                  );
                })}
          </ScrollRow>
        </ScrollWrapper>
      </ScrollViewport>

      <Container>
        <AllEventsCTAWrap>
          <AllLink href={ALL_EVENTS_URL} target="_blank" rel="noopener noreferrer">
            Alle Events entdecken <ArrowSVG />
          </AllLink>
        </AllEventsCTAWrap>
      </Container>
    </Section>
  );
}
