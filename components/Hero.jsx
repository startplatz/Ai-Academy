'use client';

import React, { useState, useEffect, useCallback, useRef } from 'react';
import styled, { css, keyframes } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import useMouseParallax from '../hooks/useMouseParallax';
import PersonaReveal from './PersonaReveal';
import { CALENDLY_URL } from '../lib/site';

/* ─────────────────────────────────────────────
   HERO – Single-word "liquid dissolve" rotation
   Only the highlighted keyword morphs.
   Structure: ENTDECKE / DEINE / [keyword] / MIT KI.
   ───────────────────────────────────────────── */

/* ── Rotating keyword data ────────────────── */

const KEYWORDS = [
  {
    word: 'KARRIERE',
    color: tokens.colors.mint,
    sheenOpacity: 1,
    sub: 'Gefördert. AZAV-zertifiziert. Dein KI-Neustart beginnt hier.',
  },
  {
    word: 'SKILLS',
    color: tokens.colors.navy,
    sheenOpacity: 0.48,
    sub: 'Abends lernen, täglich anwenden. Staatlich anerkannt.',
  },
  {
    word: 'ZUKUNFT',
    color: tokens.colors.orange,
    sheenOpacity: 0.58,
    sub: 'Praxisnah. Messbar wirksam. KI-Kompetenz für euer Team.',
  },
];

const DISPLAY_MS = 8000;
const DISSOLVE_MS = 800;
const EMERGE_MS = 800;

/* ── Partners ─────────────────────────────── */

const PARTNERS = [
  {
    label: 'STARTPLATZ',
    src: 'https://res.cloudinary.com/startplatz/image/upload/v1614775778/logos/STARTPLATZ_Logos/STARTPLATZ_Logo_RGB.png',
  },
  { label: 'NRW Hub', src: 'https://res.cloudinary.com/startplatz/image/upload/v1751977324/logos/NRW_Hub_Wei%C3%9F.png' },
  { label: 'MIFCOM', src: 'https://res.cloudinary.com/startplatz/image/upload/v1750242811/logos/mifcom_logo_fin.png' },
  { label: 'Anthropic', src: 'https://cdn.simpleicons.org/anthropic/191919', name: 'Anthropic' },
  { label: 'Claude', src: 'https://cdn.simpleicons.org/claude/D97757', name: 'Claude' },
  { label: 'Microsoft Founders Hub', src: 'https://upload.wikimedia.org/wikipedia/commons/4/44/Microsoft_logo.svg', name: 'Microsoft Founders Hub' },
  { label: 'HubSpot', src: 'https://cdn.simpleicons.org/hubspot/FF7A59', name: 'HubSpot' },
  { label: 'Amazon', src: 'https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg' },
  { label: 'Google', src: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg' },
  { label: 'Make', src: 'https://cdn.simpleicons.org/make/6D00CC', name: 'Make' },
  { label: 'n8n', src: 'https://cdn.simpleicons.org/n8n/EA4B71', name: 'n8n' },
  { label: 'HSD', src: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/D%C3%BCsseldorf_University_of_Applied_Sciences_logos.png' },
];

/* ── Styles ────────────────────────────────── */

const Section = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  min-height: 100svh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
  padding-top: 72px;
`;

const SlashAccent = styled.div`
  position: absolute;
  top: -10%; right: -5%;
  width: 45%; height: 120%;
  background: ${tokens.colors.primaryLighter};
  transform: skewX(-8deg);
  opacity: 0.3;
  pointer-events: none;
`;

const Inner = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: center;
  flex: 1;

  ${media.md} {
    gap: ${tokens.spacing['3xl']};
  }

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(440px, 1fr);
    padding: 0 ${tokens.spacing['2xl']};
    align-items: start;
    padding-top: ${tokens.spacing['3xl']};
  }
  ${media.xl} {
    grid-template-columns: minmax(0, 1.15fr) minmax(520px, 0.85fr);
  }
`;

const ClaimWrapper = styled.div`
  position: relative;
  min-width: 0;
  will-change: transform;

  ${media.lg} {
    align-self: stretch;
    min-height: 520px;
    display: flex;
    flex-direction: column;
  }

  ${media.xl} {
    min-height: 580px;
  }
`;

const Headline = styled.h1`
  font-family: ${tokens.fonts.display};
  font-size: clamp(2.75rem, 6vw, 6rem);
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
  letter-spacing: 0;
  margin-bottom: ${tokens.spacing.xl};
  text-transform: uppercase;
  text-align: left;
`;

const SeoHeadlineText = styled.span`
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
`;

const HeadlineWord = styled.span`
  display: block;
  will-change: transform;
  color: ${tokens.colors.text};

  &.highlight {
    background: linear-gradient(135deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted});
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }
  &.dim { color: ${tokens.colors.textDim}; }
`;

/* Parallax wrapper — moves instantly with mouse, no transition */
const MorphParallax = styled.span`
  display: block;
  width: 10ch;
  max-width: 100%;
  will-change: transform;
`;

/* The morphing keyword — category-color wash through a lightweight text mask */
const keywordSheen = keyframes`
  0%, 18% {
    opacity: 0;
    -webkit-mask-position: 160% 0;
    mask-position: 160% 0;
  }
  36% {
    opacity: var(--sheen-opacity, 0.48);
    -webkit-mask-position: 58% 0;
    mask-position: 58% 0;
  }
  62%, 100% {
    opacity: 0;
    -webkit-mask-position: -78% 0;
    mask-position: -78% 0;
  }
`;

const MorphWord = styled.span`
  position: relative;
  display: block;
  will-change: opacity, filter;
  color: ${tokens.colors.primary};
  --sheen-opacity: ${({ $sheenOpacity }) => $sheenOpacity ?? 0.48};

  &::after {
    content: attr(data-text);
    position: absolute;
    inset: 0;
    color: ${({ $color }) => $color || tokens.colors.primaryLight};
    opacity: 0;
    pointer-events: none;
    -webkit-mask-image: linear-gradient(
      105deg,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 28%,
      #000 46%,
      #000 54%,
      rgba(0, 0, 0, 0.1) 72%,
      transparent 100%
    );
    mask-image: linear-gradient(
      105deg,
      transparent 0%,
      rgba(0, 0, 0, 0.1) 28%,
      #000 46%,
      #000 54%,
      rgba(0, 0, 0, 0.1) 72%,
      transparent 100%
    );
    -webkit-mask-size: 220% 100%;
    mask-size: 220% 100%;
    -webkit-mask-position: 160% 0;
    mask-position: 160% 0;
  }

  ${({ $introReady }) => $introReady && css`
    &::after {
      animation: ${keywordSheen} 7.2s ease-in-out infinite;
      animation-delay: 1s;
    }
  `}
  transition:
    opacity ${DISSOLVE_MS}ms cubic-bezier(0.4, 0, 0.2, 1),
    filter ${DISSOLVE_MS}ms cubic-bezier(0.4, 0, 0.2, 1);
`;

const SubText = styled.p`
  font-size: clamp(1.125rem, 2vw, 1.45rem);
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 640px;
  margin-bottom: ${tokens.spacing.xl};
  white-space: pre-line;
  will-change: opacity, filter;
  transition:
    opacity ${DISSOLVE_MS * 0.6}ms ease,
    filter ${DISSOLVE_MS * 0.6}ms ease;
`;

const CTAGroup = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};

  ${media.lg} {
    margin-top: auto;
    padding-bottom: ${tokens.spacing.sm};
  }
`;

const PrimaryBtnWrap = styled.div`
  position: relative;
  display: inline-flex;
`;

const PrimaryBtn = styled.a`
  position: relative;
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
  transition: background ${tokens.transitions.fast}, transform ${tokens.transitions.fast};
  z-index: 1;

  &:hover {
    background: ${tokens.colors.primaryHover};
    transform: translate(-2px, -2px);
    color: #fff;
  }

  svg { width: 16px; height: 16px; transition: transform ${tokens.transitions.fast}; }
  &:hover svg { transform: translateX(3px); }
`;

const PrimaryOffset = styled.div`
  position: absolute;
  inset: 0;
  background: ${tokens.colors.primary};
  opacity: 0.25;
  ${clipBR(CHAMFER.sm)}
  transform: translate(4px, 4px);
  transition: transform ${tokens.transitions.fast};
  z-index: 0;

  ${PrimaryBtnWrap}:hover & {
    transform: translate(6px, 6px);
  }
`;

const SecondaryBtn = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 14px 28px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.medium};
  color: ${tokens.colors.textSoft};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0,0,0,0.1);
  ${clipBR(CHAMFER.sm)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  transition: all ${tokens.transitions.fast};

  &:hover {
    background: ${tokens.colors.surfaceAlt};
    color: ${tokens.colors.text};
    border-color: ${tokens.colors.primary};
  }
`;

const RevealContainer = styled.div`
  position: relative;
  align-self: center;
  justify-self: center;
  width: min(100%, 420px);
  min-width: 0;
  contain: layout paint;
  height: clamp(240px, 66vw, 310px);
  display: block;

  ${media.md} {
    align-self: start;
    justify-self: stretch;
    width: 100%;
    height: 420px;
  }

  ${media.lg} { height: 520px; }
  ${media.xl} { height: 580px; }
`;

/* ── Infinite Marquee ──────────────────────── */

const marqueeScroll = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }
`;

const MarqueeWrapper = styled.div`
  position: relative;
  z-index: 2;
  width: 100%;
  overflow: hidden;
  padding: ${tokens.spacing['2xl']} 0 ${tokens.spacing.xl};
  border-top: 1px solid rgba(0,0,0,0.04);

  &::before, &::after {
    content: '';
    position: absolute;
    top: 0; bottom: 0;
    width: 100px;
    z-index: 2;
    pointer-events: none;
  }
  &::before {
    left: 0;
    background: linear-gradient(90deg, rgba(255,255,255,0.85), transparent);
  }
  &::after {
    right: 0;
    background: linear-gradient(270deg, rgba(255,255,255,0.85), transparent);
  }
`;

const MarqueeLabel = styled.span`
  display: block;
  text-align: center;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: ${tokens.colors.textDim};
  margin-bottom: ${tokens.spacing.lg};
`;

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  animation: ${marqueeScroll} 32s linear infinite;
  &:hover { animation-play-state: paused; }
`;

const MarqueeItem = styled.div`
  flex-shrink: 0;
  padding: 0 ${tokens.spacing.lg};
`;

const PartnerMark = styled.div`
  width: ${({ $named }) => ($named ? '238px' : '190px')};
  height: 76px;
  padding: 8px 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  opacity: 0.72;
  transition: opacity ${tokens.transitions.fast}, filter ${tokens.transitions.fast}, transform ${tokens.transitions.fast};

  &:hover {
    opacity: 1;
    filter: saturate(1.1);
    transform: translateY(-2px);
  }

  img {
    max-width: ${({ $named }) => ($named ? '74px' : '100%')};
    max-height: ${({ $named }) => ($named ? '38px' : '50px')};
    object-fit: contain;
  }
`;

const PartnerName = styled.span`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.textSoft};
  line-height: 1.1;
  max-width: 138px;
`;

const ArrowIcon = () => (
  <svg viewBox="0 0 16 16" fill="none">
    <path d="M3 8.5h8.5m0 0L8 5m3.5 3.5L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/* ── Component ─────────────────────────────── */

export default function Hero() {
  const { x, y } = useMouseParallax(0.06);
  const depths = [14, 20, 28, 10];

  const [kwIndex, setKwIndex] = useState(0);
  const [phase, setPhase] = useState('visible'); // 'visible' | 'dissolving' | 'emerging'
  const [displayWord, setDisplayWord] = useState(KEYWORDS[0].word);
  const [displaySub, setDisplaySub] = useState(KEYWORDS[0].sub);
  const [introReady, setIntroReady] = useState(false);
  const timerRef = useRef(null);

  const startTransition = useCallback(() => {
    // Phase 1: dissolve — word spreads apart, blurs, fades into ether
    setPhase('dissolving');

    setTimeout(() => {
      // Swap to next keyword while invisible
      const nextIdx = (kwIndex + 1) % KEYWORDS.length;
      setKwIndex(nextIdx);
      setDisplayWord(KEYWORDS[nextIdx].word);
      setDisplaySub(KEYWORDS[nextIdx].sub);

      // Phase 2: emerge — new word materializes from blur
      setPhase('emerging');

      setTimeout(() => {
        setPhase('visible');
      }, EMERGE_MS);
    }, DISSOLVE_MS);
  }, [kwIndex]);

  useEffect(() => {
    if (introReady && phase === 'visible') {
      timerRef.current = setTimeout(startTransition, DISPLAY_MS);
    }
    return () => clearTimeout(timerRef.current);
  }, [introReady, phase, startTransition]);

  useEffect(() => {
    const markIntroReady = () => setIntroReady(true);
    window.addEventListener('ai-academy:preloader-complete', markIntroReady);
    const fallback = setTimeout(markIntroReady, 5600);

    return () => {
      window.removeEventListener('ai-academy:preloader-complete', markIntroReady);
      clearTimeout(fallback);
    };
  }, []);

  /* Morphing word style — only opacity + filter, no layout changes */
  const getMorphStyle = () => {
    const glowFilter = (blurPx) => `drop-shadow(0 0 12px ${tokens.colors.primary}33) blur(${blurPx}px)`;

    if (phase === 'dissolving') {
      return { opacity: 0, filter: glowFilter(18) };
    }
    if (phase === 'emerging') {
      return { opacity: 1, filter: glowFilter(0) };
    }
    return { opacity: 1, filter: glowFilter(0) };
  };

  /* Subtitle style */
  const getSubStyle = () => {
    if (phase === 'dissolving') {
      return { opacity: 0, filter: 'blur(6px)' };
    }
    if (phase === 'emerging') {
      return { opacity: 1, filter: 'blur(0px)' };
    }
    return { opacity: 1, filter: 'blur(0px)' };
  };

  const staticWords = ['ENTDECKE', 'DEINE', null, 'MIT KI.'];
  const currentKeyword = KEYWORDS[kwIndex];

  return (
    <Section id="hero" aria-label="Hero">
      <SlashAccent aria-hidden="true" />

      <Inner>
        <ClaimWrapper style={{ transform: `translate(${x * 6}px, ${y * 6}px)` }}>
          <Headline
            id="hero-headline"
            aria-label={`Entdecke deine ${displayWord.toLowerCase()} mit KI.`}
            aria-live="polite"
          >
            <SeoHeadlineText aria-hidden="true">ENTDECKE DEINE KARRIERE MIT KI.</SeoHeadlineText>
            {staticWords.map((word, i) => {
              if (i === 2) {
                /* The morphing keyword — parallax on outer, dissolve on inner */
                return (
                  <React.Fragment key="morph">
                    <MorphParallax
                      data-hero-word={2}
                      aria-hidden="true"
                      style={{ transform: `translate(${x * depths[2]}px, ${y * depths[2]}px)` }}
                    >
                      <MorphWord
                        $color={currentKeyword.color}
                        $sheenOpacity={currentKeyword.sheenOpacity}
                        $introReady={introReady}
                        data-text={displayWord}
                        style={getMorphStyle()}
                      >
                        {displayWord}
                      </MorphWord>
                    </MorphParallax>
                    {' '}
                  </React.Fragment>
                );
              }
              return (
                <React.Fragment key={word}>
                  <HeadlineWord
                    data-hero-word={i}
                    aria-hidden="true"
                    className={i === 3 ? 'dim' : ''}
                    style={{ transform: `translate(${x * depths[i]}px, ${y * depths[i]}px)` }}
                  >
                    {word}
                  </HeadlineWord>
                  {i < staticWords.length - 1 ? ' ' : null}
                </React.Fragment>
              );
            })}
          </Headline>

          <SubText style={getSubStyle()}>
            {displaySub}
          </SubText>

          <CTAGroup>
            <PrimaryBtnWrap>
              <PrimaryOffset aria-hidden="true" />
              <PrimaryBtn href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
                Kostenlos beraten lassen
                <ArrowIcon />
              </PrimaryBtn>
            </PrimaryBtnWrap>
            <SecondaryBtn href="/wissens-test">
              Wissens-Test machen
              <CyberCorners $color={tokens.colors.textDim} $size={6} />
            </SecondaryBtn>
          </CTAGroup>
        </ClaimWrapper>

        <RevealContainer id="hero-persona-reveal">
          <CyberCorners $color={tokens.colors.mint} $size={14} />
          <PersonaReveal />
        </RevealContainer>
      </Inner>

      {/* Infinite partner marquee */}
      <MarqueeWrapper>
        <MarqueeLabel>Technologie- & Netzwerkpartner</MarqueeLabel>
        <MarqueeTrack>
          {[...PARTNERS, ...PARTNERS].map((p, i) => (
            <MarqueeItem key={`${p.label}-${i}`}>
              <PartnerMark aria-label={p.label} $named={Boolean(p.name)}>
                <img src={p.src} alt={p.label} loading="lazy" />
                {p.name && <PartnerName>{p.name}</PartnerName>}
              </PartnerMark>
            </MarqueeItem>
          ))}
        </MarqueeTrack>
      </MarqueeWrapper>
    </Section>
  );
}
