'use client';

import React from 'react';
import styled from 'styled-components';
import { REVIEW_RATINGS } from '../lib/reviewRatings';
import { tokens, media } from '../styles/tokens';
import { CHAMFER, CyberCorners, clipBR, clipTLBR } from '../styles/cyberpunk';

const accentColor = (accent) => {
  if (accent === 'navy') return tokens.colors.navy;
  if (accent === 'primary') return tokens.colors.primary;
  if (accent === 'mint') return tokens.colors.mint;
  return tokens.colors.primary;
};

const Section = styled.section`
  position: relative;
  z-index: 1;
  padding: ${tokens.spacing['3xl']} ${tokens.spacing.lg};
  background: linear-gradient(180deg, rgba(255,255,255,0.68), rgba(248,246,251,0.84));

  ${media.lg} {
    padding: ${tokens.spacing['3xl']} ${tokens.spacing['2xl']};
  }
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  align-items: stretch;

  ${media.lg} {
    grid-template-columns: minmax(260px, 0.9fr) minmax(0, 2fr);
  }
`;

const Intro = styled.div`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: rgba(255,255,255,0.72);
  border: 1px solid rgba(124,58,237,0.12);
  ${clipTLBR(CHAMFER.md)}
`;

const Eyebrow = styled.span`
  display: block;
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
  margin-bottom: ${tokens.spacing.sm};
`;

const Title = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  text-transform: uppercase;
  letter-spacing: 0;
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
`;

const Copy = styled.p`
  color: ${tokens.colors.textMuted};
  font-size: ${tokens.fontSizes.sm};
  line-height: ${tokens.lineHeights.relaxed};
`;

const Checked = styled.span`
  display: inline-block;
  margin-top: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.colors.textDim};
`;

const RatingsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RatingCard = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 178px;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(0,0,0,0.07);
  color: ${tokens.colors.text};
  text-decoration: none;
  overflow: hidden;
  ${clipBR(CHAMFER.md)}
  transition: transform ${tokens.transitions.base}, border-color ${tokens.transitions.base},
              filter ${tokens.transitions.base};

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $accent }) => $accent};
  }

  &:hover {
    transform: translateY(-3px);
    border-color: ${({ $accent }) => $accent};
    filter: drop-shadow(0 12px 28px rgba(124,58,237,0.10));
  }
`;

const CardLabel = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 11px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $accent }) => $accent};
  margin-bottom: auto;
`;

const ValueLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 4px;
  margin: ${tokens.spacing.lg} 0 ${tokens.spacing.sm};
`;

const Value = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['4xl']}, 5vw, ${tokens.fontSizes['6xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: 0.9;
  letter-spacing: 0;
`;

const Suffix = styled.span`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.textDim};
`;

const Detail = styled.span`
  color: ${tokens.colors.textMuted};
  font-size: ${tokens.fontSizes.sm};
  line-height: ${tokens.lineHeights.normal};
`;

const TotalCard = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  min-height: 178px;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.dark};
  color: #fff;
  overflow: hidden;
  ${clipBR(CHAMFER.md)}

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${tokens.colors.mint};
  }

  ${Detail}, ${Suffix} {
    color: rgba(255,255,255,0.58);
  }
`;

const FooterWrap = styled.div`
  position: relative;
  margin: ${tokens.spacing.lg} 0 ${tokens.spacing.xl};
  padding: ${tokens.spacing.md};
  background: rgba(255,255,255,0.04);
  border: 1px solid rgba(255,255,255,0.08);
  ${clipBR(CHAMFER.xs)}
`;

const FooterTitle = styled.a`
  display: inline-flex;
  color: #fff;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  margin-bottom: ${tokens.spacing.sm};

  &:hover {
    color: ${tokens.colors.primaryLight};
  }
`;

const FooterLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm} ${tokens.spacing.md};
  align-items: center;
`;

const FooterMetric = styled.a`
  color: rgba(255,255,255,0.68);
  font-size: ${tokens.fontSizes.xs};
  line-height: ${tokens.lineHeights.normal};
  text-decoration: none;

  strong {
    color: #fff;
    font-weight: ${tokens.fontWeights.bold};
  }

  &:hover {
    color: #fff;
  }
`;

function useReviewRatings() {
  const [ratings, setRatings] = React.useState(REVIEW_RATINGS);

  React.useEffect(() => {
    let active = true;

    fetch('/api/review-ratings?source=startplatz', { cache: 'no-store' })
      .then((response) => {
        if (!response.ok) throw new Error('ratings unavailable');
        return response.json();
      })
      .then((data) => {
        if (active) setRatings(data);
      })
      .catch(() => {
        if (active) setRatings(REVIEW_RATINGS);
      });

    return () => {
      active = false;
    };
  }, []);

  return ratings;
}

export function ReviewTrustBar() {
  const ratings = useReviewRatings();

  return (
    <Section aria-label="STARTPLATZ Bewertungen">
      <Inner>
        <Intro>
          <CyberCorners $color={tokens.colors.primary} $size={10} />
          <Eyebrow>STARTPLATZ Bewertungen</Eyebrow>
          <Title>Vertrauen aus dem STARTPLATZ Netzwerk</Title>
          <Copy>
            Bewertungen aus dem STARTPLATZ Profil auf ProvenExpert inklusive Google-Quelle.
          </Copy>
          <Checked>{ratings.checkedAt}</Checked>
        </Intro>
        <RatingsGrid>
          {ratings.platforms.map((rating) => {
            const color = accentColor(rating.accent);
            return (
              <RatingCard
                key={rating.id}
                href={rating.href}
                target="_blank"
                rel="noopener noreferrer"
                $accent={color}
                aria-label={`${rating.name}: ${rating.value}${rating.suffix} ${rating.label}`}
              >
                <CardLabel $accent={color}>{rating.name}</CardLabel>
                <ValueLine>
                  <Value>{rating.value}</Value>
                  {rating.suffix && <Suffix>{rating.suffix}</Suffix>}
                </ValueLine>
                <Detail>{rating.label}<br />{rating.detail}</Detail>
              </RatingCard>
            );
          })}
          <TotalCard>
            <CardLabel $accent={tokens.colors.mint}>Gesamt</CardLabel>
            <ValueLine>
              <Value>{ratings.total.value}</Value>
            </ValueLine>
            <Detail>{ratings.total.label}<br />{ratings.total.detail}</Detail>
          </TotalCard>
        </RatingsGrid>
      </Inner>
    </Section>
  );
}

export function FooterReviewRatings() {
  const ratings = useReviewRatings();
  const google = ratings.platforms.find((item) => item.id === 'google');
  const provenExpert = ratings.platforms.find((item) => item.id === 'provenexpert');

  return (
    <FooterWrap aria-label="STARTPLATZ Bewertungen">
      <CyberCorners $color={tokens.colors.mint} $size={7} />
      <FooterTitle href={ratings.sourceUrl} target="_blank" rel="noopener noreferrer">
        STARTPLATZ Bewertungen
      </FooterTitle>
      <FooterLine>
        <FooterMetric href={ratings.sourceUrl} target="_blank" rel="noopener noreferrer">
          <strong>{ratings.total.value}</strong> veröffentlicht
        </FooterMetric>
        {google && (
          <FooterMetric href={google.href} target="_blank" rel="noopener noreferrer">
            Google <strong>{google.value}{google.suffix}</strong> ({google.detail.replace(' Bewertungen auf Google', '')})
          </FooterMetric>
        )}
        {provenExpert && (
          <FooterMetric href={provenExpert.href} target="_blank" rel="noopener noreferrer">
            ProvenExpert <strong>{provenExpert.value}{provenExpert.suffix}</strong> ({provenExpert.detail.replace(' Bewertungen auf ProvenExpert', '')})
          </FooterMetric>
        )}
      </FooterLine>
    </FooterWrap>
  );
}
