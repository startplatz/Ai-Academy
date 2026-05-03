'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, OuterCornerFrame } from '../styles/cyberpunk';
import PlanetSection from './PlanetSection';

/* ─────────────────────────────────────────────
   TEAM SECTION – Cyberpunk style
   Large group photo with overlapping location cards
   ───────────────────────────────────────────── */

const GROUP_PHOTO = 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1400/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png';

const LOCATIONS = [
  { city: 'Köln', image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,c_fill,q_auto,w_800,h_400/v1614775893/Offices/K%C3%B6ln/Au%C3%9Fenansicht/STARTPLATZ_Ko%CC%88ln_Au%C3%9Fenansicht9.jpg' },
  { city: 'Düsseldorf', image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,c_fill,q_auto,w_800,h_400/v1737547718/conference-rooms/Confi%20DUS%20new/Au%C3%9Fenansicht.jpg' },
];

const GroupPhotoFrame = styled.div`
  position: relative;
  width: 100%;
`;

const GroupPhotoWrap = styled.div`
  position: relative;
  ${clipTLBR(CHAMFER.lg)}
  overflow: hidden;
  width: 100%;
  background: ${tokens.colors.surfaceAlt};

  ${media.md} {
    min-height: 320px;
  }

  ${media.lg} {
    min-height: 400px;
  }
`;

const GroupImage = styled.img`
  width: 100%;
  height: auto;
  display: block;
`;

const LocationRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  margin-top: -${tokens.spacing['2xl']};
  padding: 0 ${tokens.spacing.lg};
  position: relative;
  z-index: 2;

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
    margin-top: -${tokens.spacing['3xl']};
    padding: 0 ${tokens.spacing['2xl']};
  }
`;

const LocationCard = styled.div`
  position: relative;
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;
  height: 200px;
  box-shadow:
    0 28px 60px rgba(0, 0, 0, 0.38),
    0 8px 20px rgba(0, 0, 0, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.9),
    inset 0 1px 0 rgba(255, 255, 255, 0.5);
  transition: transform ${tokens.transitions.slow}, box-shadow ${tokens.transitions.slow};

  /* farbiger Akzentbalken oben — bindet Karte ans Design-System */
  &::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 3px;
    background: linear-gradient(90deg, ${tokens.colors.primary}, ${tokens.colors.mint});
    z-index: 3;
  }

  /* Gradient-Overlay für Text-Lesbarkeit */
  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    background: linear-gradient(
      180deg,
      transparent 35%,
      rgba(0, 0, 0, 0.25) 65%,
      rgba(0, 0, 0, 0.72) 100%
    );
    z-index: 1;
  }

  ${media.md} {
    height: 240px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.9) saturate(1.05);
    transition: transform ${tokens.transitions.slow}, filter ${tokens.transitions.slow};
  }

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 36px 72px rgba(0, 0, 0, 0.44),
      0 12px 28px rgba(0, 0, 0, 0.28),
      0 0 0 1px rgba(255, 255, 255, 0.9),
      0 0 0 2px ${tokens.colors.primary}33;
  }

  &:hover img {
    transform: scale(1.05);
    filter: brightness(0.95) saturate(1.1);
  }
`;

const LocationLabel = styled.div`
  position: absolute;
  bottom: ${tokens.spacing.lg};
  left: ${tokens.spacing.lg};
  z-index: 2;
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const LocationTag = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
  text-shadow: 0 1px 6px rgba(0,0,0,0.8);
`;

const LocationCity = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.bold};
  color: #fff;
  text-shadow: 0 2px 12px rgba(0,0,0,0.7), 0 1px 3px rgba(0,0,0,0.9);
`;

export default function TeamSection() {
  return (
    <PlanetSection
      solid
      id="team"
      badge="Unser Netzwerk"
      title="Experten, die <span>begeistern</span>"
      subtitle="Dozenten und Mentoren aus der Praxis. Führende KI-Experten, Tech-Pioniere und erfahrene Coaches."
    >
      <GroupPhotoFrame>
        <OuterCornerFrame $color={tokens.colors.mint} $size={18} $offset={10} />
        <GroupPhotoWrap>
          <GroupImage
            src={GROUP_PHOTO}
            alt="Das AI Academy Team — Gruppenfoto"
            loading="eager"
            width="1400"
            height="600"
          />
        </GroupPhotoWrap>
      </GroupPhotoFrame>

      <LocationRow>
        {LOCATIONS.map((l) => (
          <LocationCard key={l.city}>
            <img src={l.image} alt={`Standort ${l.city}`} loading="lazy" width="800" height="400" />
            <LocationLabel>
              <LocationTag>Standort</LocationTag>
              <LocationCity>{l.city}</LocationCity>
            </LocationLabel>
          </LocationCard>
        ))}
      </LocationRow>
    </PlanetSection>
  );
}
