'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
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
  height: 180px;
  box-shadow:
    0 18px 44px rgba(15, 15, 15, 0.22),
    0 0 0 1px rgba(255, 255, 255, 0.84),
    inset 0 1px 0 rgba(255, 255, 255, 0.36);

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    pointer-events: none;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.46),
      inset 0 -32px 54px rgba(0, 0, 0, 0.18);
    z-index: 1;
  }

  ${media.md} {
    height: 220px;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: brightness(0.85);
    transition: transform ${tokens.transitions.slow};
  }

  &:hover img { transform: scale(1.04); }
`;

const LocationLabel = styled.div`
  position: absolute;
  bottom: ${tokens.spacing.lg};
  left: ${tokens.spacing.lg};
  z-index: 2;

  span {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes['2xl']};
    font-weight: ${tokens.fontWeights.bold};
    color: #fff;
    text-shadow: 0 2px 8px rgba(0,0,0,0.4);
  }
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
      <GroupPhotoWrap>
        <CyberCorners $color={tokens.colors.mint} $size={12} />
        <GroupImage
          src={GROUP_PHOTO}
          alt="Das AI Academy Team — Gruppenfoto"
          loading="eager"
          width="1400"
          height="600"
        />
      </GroupPhotoWrap>

      <LocationRow>
        {LOCATIONS.map((l) => (
          <LocationCard key={l.city}>
            <CyberCorners $color={tokens.colors.mint} $size={10} />
            <img src={l.image} alt={`Standort ${l.city}`} loading="lazy" width="800" height="400" />
            <LocationLabel><span>{l.city}</span></LocationLabel>
          </LocationCard>
        ))}
      </LocationRow>
    </PlanetSection>
  );
}
