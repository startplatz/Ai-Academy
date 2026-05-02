'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import PlanetSection from './PlanetSection';

/* ─────────────────────────────────────────────
   VISION & CERTIFICATES – Cyberpunk style
   Chamfered glass cards with corner accents
   ───────────────────────────────────────────── */

const CERT_LOGOS = [
  {
    label: 'Bundesagentur für Arbeit',
    src: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Bundesagentur_f%C3%BCr_Arbeit-Logo.svg',
  },
  {
    label: 'Cert-IT',
    src: 'https://static.wixstatic.com/media/eef775_2769b02850834903af9ba5bf412e4684~mv2.png/v1/fill/w_158,h_114,al_c,q_85,enc_avif,quality_auto/cert-it%20logo%20dunkelpurpur.png',
  },
];

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  ${media.md} { grid-template-columns: 1fr 1fr; }
`;

const GlassCard = styled.div`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipTLBR(CHAMFER.lg)}
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -1px; left: 0; right: 0;
    height: 3px;
    background: ${({ $gradient }) => $gradient || 'transparent'};
  }
`;

const CardBadge = styled.span`
  display: inline-block;
  padding: 4px 12px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  ${({ $clip }) => $clip !== false && `clip-path: polygon(0 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%);`}
  margin-bottom: ${tokens.spacing.lg};
`;

const CardTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
  ${media.lg} { font-size: ${tokens.fontSizes['3xl']}; }
`;

const CardText = styled.p`
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const CertGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
  align-items: center;
  margin-top: ${tokens.spacing.xl};

  ${media.sm} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const CertLogo = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 82px;
  padding: ${tokens.spacing.sm} ${tokens.spacing.md};

  img {
    max-width: 100%;
    max-height: 58px;
    object-fit: contain;
  }
`;

const QuoteMark = styled.div`
  position: absolute;
  top: ${tokens.spacing.xl};
  right: ${tokens.spacing.xl};
  font-family: ${tokens.fonts.display};
  font-size: 6rem;
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.primaryLighter};
  line-height: 1;
  pointer-events: none;
  user-select: none;
`;

export default function VisionSection() {
  return (
    <PlanetSection id="vision" compactTop>
      <Grid>
        <GlassCard $gradient={`linear-gradient(90deg, ${tokens.colors.primary}, ${tokens.colors.primaryMuted})`}>
          <CyberCorners $color={tokens.colors.mint} $size={12} />
          <QuoteMark>&ldquo;</QuoteMark>
          <CardBadge>Warum wir</CardBadge>
          <CardTitle>Seit 2011 im Innovations-Ökosystem</CardTitle>
          <CardText>
            STARTPLATZ begleitet seit über 15 Jahren Gründer und Unternehmen in NRW.
            Über 1.000 Absolventen, 500+ KI-Events und Dozenten, die selbst täglich
            mit KI arbeiten. Das Format-System — OneDay, FortyDays, AfterWork —
            sortiert nach Lebenssituation, nicht nach Inhalt.
          </CardText>
        </GlassCard>

        <GlassCard $gradient={`linear-gradient(90deg, ${tokens.colors.mint}, ${tokens.colors.teal})`}>
          <CyberCorners $color={tokens.colors.mint} $size={12} />
          <CardBadge>Anerkannt &amp; gefördert</CardBadge>
          <CardTitle>AZAV-zertifiziert. Cert-IT geprüft.</CardTitle>
          <CardText>
            FortyDays und AfterWork sind AZAV-zertifiziert und über Bildungsgutschein
            bzw. Qualifizierungschancengesetz förderfähig. Personenzertifizierung nach
            Cert-IT (DIN EN ISO/IEC 17024). 4,98 von 5 Sternen bei 290+ Bewertungen.
          </CardText>
          <CertGrid>
            {CERT_LOGOS.map((logo) => (
              <CertLogo key={logo.label}>
                <img src={logo.src} alt={logo.label} loading="lazy" />
              </CertLogo>
            ))}
          </CertGrid>
        </GlassCard>
      </Grid>
    </PlanetSection>
  );
}
