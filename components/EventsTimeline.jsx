'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React, { useEffect, useRef, useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';

/* ─────────────────────────────────────────────
   EVENTS TIMELINE – Video background section
   Live data: /api/events (Tribe Events API, 30-min ISR)
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

/* ── Styles ────────────────────────────────── */

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: ${tokens.spacing.section} 0;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 20% 60%, rgba(124, 58, 237, 0.18) 0%, transparent 55%),
    radial-gradient(ellipse at 80% 20%, rgba(167, 139, 250, 0.12) 0%, transparent 50%),
    linear-gradient(155deg, #1A0E3F 0%, #2D1472 40%, #1E0B50 70%, #120830 100%);
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
  display: inline-block;
  padding: 5px 14px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.primaryLight};
  background: rgba(124, 58, 237, 0.12);
  border: 1px solid rgba(124, 58, 237, 0.2);
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.lg};
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
    background: linear-gradient(135deg, ${tokens.colors.primaryLight}, ${tokens.colors.primaryMuted});
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

const ScrollWrapper = styled.div`
  position: relative;
  z-index: 1;
  overflow: hidden;
  padding: 0 ${tokens.spacing.lg};
`;

const ScrollRow = styled.div`
  display: flex;
  gap: ${tokens.spacing.lg};
  cursor: grab;
  user-select: none;
  padding-bottom: ${tokens.spacing.md};

  &:active { cursor: grabbing; }
`;

const EventCard = styled.article`
  flex: 0 0 auto;
  width: 340px;
  position: relative;
  display: flex;
  flex-direction: column;
  background: rgba(20, 20, 20, 0.75);
  backdrop-filter: blur(16px);
  -webkit-backdrop-filter: blur(16px);
  border: 1px solid rgba(255, 255, 255, 0.08);
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;
  transition: transform ${tokens.transitions.base}, border-color ${tokens.transitions.base},
              filter ${tokens.transitions.base};

  &:hover {
    transform: translateY(-4px);
    border-color: rgba(124, 58, 237, 0.3);
    filter: drop-shadow(0 12px 40px rgba(124, 58, 237, 0.15));
  }

  ${({ $featured }) => $featured && css`
    width: 440px;
    border-color: rgba(124, 58, 237, 0.3);
  `}
`;

const CardImageWrap = styled.div`
  aspect-ratio: 5 / 4;
  overflow: hidden;
  img { width: 100%; height: 100%; object-fit: cover; }
`;

const CardBody = styled.div`
  padding: ${tokens.spacing.xl};
  display: flex;
  flex-direction: column;
  flex: 1;
`;

const DateBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.primaryLight};
  background: rgba(124, 58, 237, 0.15);
  ${clipBR(CHAMFER.xs)}
  margin-bottom: ${tokens.spacing.sm};
`;

const TagRow = styled.div`
  display: flex; flex-wrap: wrap;
  gap: ${tokens.spacing.xs};
  margin-bottom: ${tokens.spacing.sm};
`;

const Tag = styled.span`
  padding: 2px 8px;
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  text-transform: uppercase;
  letter-spacing: 0.06em;
  color: ${tokens.colors.darkMuted};
  border: 1px solid rgba(255,255,255,0.08);
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
  display: block;
  font-size: ${tokens.fontSizes.xs};
  color: rgba(255,255,255,0.58);
  margin-bottom: ${tokens.spacing.md};
`;

const EventCTA = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 8px 20px;
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${tokens.colors.primary};
  ${clipBR(CHAMFER.xs)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: all ${tokens.transitions.fast};
  margin-top: auto;
  &:hover { background: ${tokens.colors.primaryHover}; color: #fff; }

  svg { width: 14px; height: 14px; }
`;

const shimmer = keyframes`
  0%   { background-position: -400px 0; }
  100% { background-position: 400px 0; }
`;

const SkeletonCard = styled.div`
  flex: 0 0 auto;
  width: 340px;
  height: 440px;
  background: linear-gradient(
    90deg,
    rgba(255,255,255,0.04) 0%,
    rgba(255,255,255,0.08) 50%,
    rgba(255,255,255,0.04) 100%
  );
  background-size: 800px 100%;
  animation: ${shimmer} 1.6s linear infinite;
  border: 1px solid rgba(255,255,255,0.06);
  ${clipBR(CHAMFER.lg)}
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
  <svg viewBox="0 0 16 16" fill="none"><path d="M3 8h8.5m0 0L8 4.5m3.5 3.5L8 11.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
);

/* ── Component ─────────────────────────────── */

export default function EventsTimeline() {
  const trackRef = useRef(null);
  const wrapperRef = useRef(null);

  /* ── Live events ─────────────────────────── */
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
          // Endpoint reachable but returned no events – show fallback gracefully
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

  /* ── Draggable scroller ──────────────────── */
  useEffect(() => {
    if (!events) return; // wait until cards are rendered

    let draggableInstance;
    const init = async () => {
      try {
        const { gsap } = await import('gsap');
        const { Draggable } = await import('gsap/Draggable');
        gsap.registerPlugin(Draggable);

        if (!trackRef.current || !wrapperRef.current) return;

        const trackWidth = trackRef.current.scrollWidth;
        const wrapperWidth = wrapperRef.current.offsetWidth;
        const maxDrag = -(trackWidth - wrapperWidth);

        draggableInstance = Draggable.create(trackRef.current, {
          type: 'x',
          bounds: { minX: maxDrag, maxX: 0 },
          edgeResistance: 0.85,
          cursor: 'grab',
          activeCursor: 'grabbing',
        })[0];
      } catch (e) {
        /* Fallback: native scroll still works */
      }
    };
    init();

    return () => {
      if (draggableInstance) draggableInstance.kill();
    };
  }, [events]);

  const isLoading = events === null;
  const cards = events || [];

  return (
    <Section id="events" aria-label="Veranstaltungen">
      <Container>
        <SectionBadge>Saison 2026</SectionBadge>
        <SectionTitle>Nächste <span>Events</span></SectionTitle>
        <SectionSubtitle>Von Bootcamps über Workshops bis zu kostenlosen Meetups – finde dein nächstes Event.</SectionSubtitle>
        <DragHint aria-hidden="true">&gt; Ziehen zum Entdecken</DragHint>
        {source === 'fallback' && (
          <StatusNote aria-live="polite">&gt; Live-Feed aktuell nicht erreichbar – zeige Vorschau</StatusNote>
        )}
      </Container>

      <ScrollWrapper ref={wrapperRef} role="region" aria-label="Event-Karussell" tabIndex={0}>
        <ScrollRow ref={trackRef}>
          {isLoading
            ? Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={`sk-${i}`} aria-hidden="true" />)
            : cards.map((ev) => (
                <EventCard key={ev.id || ev.title} $featured={ev.featured} aria-label={`${ev.title} – ${ev.date}`}>
                  <CyberCorners $color={ev.featured ? tokens.colors.primaryLight : tokens.colors.mint} $size={10} />
                  {ev.image && <CardImageWrap><img src={ev.image} alt={ev.title} loading="lazy" width="1000" height="800" /></CardImageWrap>}
                  <CardBody>
                    <DateBadge><time>{ev.date}</time></DateBadge>
                    {ev.tags && ev.tags.length > 0 && (
                      <TagRow>{ev.tags.map((t) => <Tag key={t}>{t}</Tag>)}</TagRow>
                    )}
                    <EventTitle>{ev.title}</EventTitle>
                    {ev.description && <EventDesc>{ev.description}</EventDesc>}
                    {ev.location && <LocationText>{ev.location}</LocationText>}
                    <EventCTA href={ev.href || ALL_EVENTS_URL} target="_blank" rel="noopener noreferrer">
                      {ev.cta || 'Anmelden'} <ArrowSVG />
                    </EventCTA>
                  </CardBody>
                </EventCard>
              ))}
        </ScrollRow>
      </ScrollWrapper>

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
