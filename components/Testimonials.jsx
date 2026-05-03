'use client';

import React, { useState, useCallback, useEffect } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import PlanetSection from './PlanetSection';

/* ─────────────────────────────────────────────
   TESTIMONIALS – PersonaReveal-style panel strip
   B/W panels → expand + colorize on hover.
   YouTube popup on click.
   Same visual language as Hero PersonaReveal.
   ───────────────────────────────────────────── */

const VIDEOS = [
  {
    title: 'Tobias',
    subtitle: 'Aufsichtsratsvorsitzender · 20+ Jahre C-Level',
    quote: 'Ich hab wahnsinnig viel gelernt.',
    youtubeId: 'WYqC5Or82zM',
    color: tokens.colors.mint,
  },
  {
    title: 'Olga',
    subtitle: 'Management & Operations · Quereinsteigerin KI',
    quote: 'Ein Must Know für uns alle.',
    youtubeId: 'zFAO7A84ujY',
    color: tokens.colors.navy,
  },
  {
    title: 'Annika',
    subtitle: 'UX Designerin · Digitale Produktentwicklung',
    quote: 'Das fand ich super verrückt.',
    youtubeId: 'VXbAHkJ0DzQ',
    color: tokens.colors.primary,
  },
  {
    title: 'Carsten',
    subtitle: 'Informatiker & Gründer · 20 Jahre Softwareentwicklung',
    quote: 'KI entzaubern, jenseits des Hypes.',
    youtubeId: '3es2lpCKEZw',
    color: tokens.colors.orange,
  },
  {
    title: 'Carolin',
    subtitle: 'Product Ownerin · Softwareentwicklung B2B',
    quote: 'Die richtige Entscheidung.',
    youtubeId: 'P6rORA19PWc',
    color: tokens.colors.mint,
  },
  {
    title: 'Oskar',
    subtitle: 'Philosoph & Wirtschaftswissenschaftler',
    quote: 'Mehr gelernt als je zuvor.',
    youtubeId: '1Lc7O99DKOc',
    color: tokens.colors.navy,
  },
];

const ytThumb = (id) => `https://img.youtube.com/vi/${id}/maxresdefault.jpg`;

/* ── Animations ──────────────────────────── */

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const scaleIn = keyframes`
  from { opacity: 0; transform: scale(0.94) translateY(8px); }
  to   { opacity: 1; transform: scale(1) translateY(0); }
`;

/* ── Panel Strip Container ───────────────── */

const C = CHAMFER.lg;

const Strip = styled.div`
  position: relative;
  width: 100%;
  height: 360px;
  display: flex;
  gap: 3px;
  overflow: hidden;
  margin-top: ${tokens.spacing.xl};

  ${media.md} {
    height: 440px;
  }

  ${media.lg} {
    height: 520px;
  }
`;

/* ── Individual Panel ────────────────────── */

/* Clip-path: first panel gets TL chamfer, last gets BR chamfer */
const panelClip = {
  first: css`
    clip-path: polygon(
      ${C}px 0, 100% 0,
      100% 100%,
      0 100%, 0 ${C}px
    );
  `,
  last: css`
    clip-path: polygon(
      0 0, 100% 0,
      100% calc(100% - ${C}px),
      calc(100% - ${C}px) 100%,
      0 100%
    );
  `,
};

const Panel = styled.div`
  position: relative;
  flex: ${({ $active, $hasActive }) => $active ? '3' : $hasActive ? '0.5' : '1'};
  height: 100%;
  overflow: hidden;
  cursor: pointer;
  transition: flex 0.65s cubic-bezier(0.4, 0, 0.2, 1);

  ${({ $pos }) => $pos === 'first' && panelClip.first}
  ${({ $pos }) => $pos === 'last' && panelClip.last}

  /* Color accent bar top */
  &::after {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    z-index: 4;
    background: ${({ $color, $active }) => ($active ? $color : 'transparent')};
    transition: background 0.5s ease;
  }
`;

const PanelImage = styled.div`
  position: absolute;
  inset: 0;
  background-image: url(${({ $src }) => $src});
  background-size: cover;
  background-position: center top;
  filter: ${({ $active }) => ($active ? 'saturate(1.1) brightness(1)' : 'saturate(0) brightness(0.45)')};
  transform: ${({ $active }) => ($active ? 'scale(1)' : 'scale(1.08)')};
  transition: filter 0.65s ease, transform 0.8s ease;
`;

const PanelOverlay = styled.div`
  position: absolute;
  inset: 0;
  z-index: 2;
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, transparent 20%, rgba(0,0,0,0.45) 55%, rgba(0,0,0,0.92) 100%)'
      : 'linear-gradient(180deg, rgba(10,10,10,0.25) 0%, rgba(10,10,10,0.85) 100%)'};
  transition: background 0.65s ease;
`;

/* Vertical rotated label — immer sichtbar wenn Panel nicht aktiv */
const VerticalLabel = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) rotate(-90deg);
  z-index: 3;
  font-family: ${tokens.fonts.display};
  font-size: 14px;
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  white-space: nowrap;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  opacity: ${({ $visible }) => ($visible ? 0.9 : 0)};
  transition: opacity 0.5s ease;
  pointer-events: none;
  text-shadow: 0 1px 8px rgba(0,0,0,0.8);
`;

/* Content area when expanded */
const Content = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 3;
  padding: ${tokens.spacing.xl} ${tokens.spacing.lg};
  transform: translateY(${({ $active }) => ($active ? '0' : '20px')});
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: transform 0.5s ease 0.1s, opacity 0.5s ease 0.1s;
`;

const ContentTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  margin-bottom: 4px;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  text-shadow: 0 2px 12px rgba(0,0,0,0.95), 0 1px 4px rgba(0,0,0,1);
`;

const ContentSub = styled.span`
  display: block;
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: ${tokens.spacing.sm};
  text-shadow: 0 1px 8px rgba(0,0,0,0.9);
  filter: drop-shadow(0 0 6px rgba(0,0,0,0.8));
`;

const ContentQuote = styled.p`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-style: italic;
  color: rgba(255, 255, 255, 0.95);
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.md};
  text-shadow: 0 1px 8px rgba(0,0,0,0.95), 0 2px 16px rgba(0,0,0,0.8);
`;

/* Play button */
const PlayCTA = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  padding: 8px 16px;
  background: rgba(124, 58, 237, 0.7);
  ${clipBR(CHAMFER.xs)}
  transition: background 200ms ease;

  &:hover {
    background: ${tokens.colors.primary};
  }
`;

const PlayTriangle = styled.span`
  display: inline-block;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 5px 0 5px 9px;
  border-color: transparent transparent transparent #fff;
`;

/* ── YouTube Popup ────────────────────────── */

const PopupBackdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.90);
  backdrop-filter: blur(12px);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  cursor: pointer;
  animation: ${fadeIn} 0.2s ease;
`;

const PopupFrame = styled.div`
  position: relative;
  width: 100%;
  max-width: 1060px;
  aspect-ratio: 16 / 9;
  background: #000;
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;
  cursor: default;
  animation: ${scaleIn} 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow:
    0 0 0 1px rgba(124, 58, 237, 0.25),
    0 32px 80px rgba(0, 0, 0, 0.5),
    0 0 120px rgba(124, 58, 237, 0.08);
`;

const CloseBtn = styled.button`
  position: absolute;
  top: -52px;
  right: 0;
  width: 40px;
  height: 40px;
  background: rgba(255, 255, 255, 0.08);
  border: 1px solid rgba(255, 255, 255, 0.15);
  ${clipBR(CHAMFER.xs)}
  color: #fff;
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 200ms, transform 200ms;

  &:hover {
    background: rgba(255, 255, 255, 0.15);
    transform: scale(1.1);
  }
`;

const PopupLabel = styled.p`
  position: absolute;
  bottom: -44px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.medium};
  color: rgba(255, 255, 255, 0.55);
`;

/* ── Component ───────────────────────────── */

export default function Testimonials() {
  const [hoveredIdx, setHoveredIdx] = useState(0);
  const [popup, setPopup] = useState(null);

  const hasActive = hoveredIdx !== null;

  const openPopup = useCallback((v) => setPopup(v), []);
  const closePopup = useCallback(() => setPopup(null), []);

  /* Close popup on Escape */
  useEffect(() => {
    if (!popup) return;
    const onKey = (e) => { if (e.key === 'Escape') closePopup(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
    };
  }, [popup, closePopup]);

  return (
    <PlanetSection
      solid
      id="testimonials"
      badge="Was Teilnehmer sagen"
      title="Echte <span>Erfolgsgeschichten</span>"
      subtitle="Von unseren Absolventen – echte Einblicke in den Kursalltag, Karrierewege und praktische KI-Anwendungen."
    >
      <Strip role="group" aria-label="Testimonial Videos">
        <CyberCorners $color={tokens.colors.mint} $size={14} />
        {VIDEOS.map((v, i) => {
          const isActive = hoveredIdx === i;
          const showVertical = hasActive && !isActive;
          const pos = i === 0 ? 'first' : i === VIDEOS.length - 1 ? 'last' : 'mid';

          return (
            <Panel
              key={v.title}
              $active={isActive}
              $hasActive={hasActive}
              $color={v.color}
              $pos={pos}
              onMouseEnter={() => setHoveredIdx(i)}
              onMouseLeave={() => setHoveredIdx(0)}
              onFocus={() => setHoveredIdx(i)}
              onBlur={() => setHoveredIdx(0)}
              onClick={() => openPopup(v)}
              tabIndex={0}
              role="button"
              aria-label={`${v.title} – ${v.subtitle} (Video abspielen)`}
            >
              <PanelImage $src={ytThumb(v.youtubeId)} $active={isActive} />
              <PanelOverlay $active={isActive} />
              <VerticalLabel $visible={!isActive}>{v.title}</VerticalLabel>
              <Content $active={isActive}>
                <ContentTitle>{v.title}</ContentTitle>
                <ContentSub $color={v.color}>{v.subtitle}</ContentSub>
                {v.quote && <ContentQuote>&ldquo;{v.quote}&rdquo;</ContentQuote>}
                <PlayCTA>
                  <PlayTriangle aria-hidden="true" />
                  Video ansehen
                </PlayCTA>
              </Content>
            </Panel>
          );
        })}
      </Strip>

      {/* ── YouTube Popup ──────────────── */}
      {popup && (
        <PopupBackdrop onClick={closePopup}>
          <PopupFrame onClick={(e) => e.stopPropagation()}>
            <CloseBtn onClick={closePopup} aria-label="Video schließen">✕</CloseBtn>
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${popup.youtubeId}?autoplay=1&rel=0`}
              title={`${popup.title} – ${popup.subtitle}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 'none',
              }}
            />
            <PopupLabel>{popup.title} – {popup.subtitle}</PopupLabel>
          </PopupFrame>
        </PopupBackdrop>
      )}
    </PlanetSection>
  );
}
