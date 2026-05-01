'use client';

import React from 'react';
import styled from 'styled-components';
import { REVIEW_RATINGS } from '../lib/reviewRatings';
import { tokens, media } from '../styles/tokens';

const REVIEW_LOGOS = {
  google: {
    light: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    dark: 'https://upload.wikimedia.org/wikipedia/commons/2/2f/Google_2015_logo.svg',
    width: 74,
    height: 25,
  },
  provenexpert: {
    light: 'https://www.provenexpert.com/images/logo/proven_expert_black.svg',
    dark: 'https://www.provenexpert.com/images/logo/proven_expert.svg',
    width: 132,
    height: 18,
  },
};

const getLogo = (id, tone = 'light') => REVIEW_LOGOS[id]?.[tone] || REVIEW_LOGOS[id]?.light;

const formatCount = (detail, suffix) => detail.replace(suffix, '');

const Rail = styled.section`
  position: relative;
  z-index: 2;
  width: 100%;
  padding: ${tokens.spacing.xl} 0 0;
  background: transparent;

  ${media.lg} {
    padding-top: ${tokens.spacing['2xl']};
  }
`;

const RailInner = styled.div`
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  padding: ${tokens.spacing.lg} 0 0;
  border-top: 1px solid rgba(124,58,237,0.16);
  border-bottom: 1px solid rgba(0,0,0,0.06);
  padding-bottom: ${tokens.spacing.lg};

  ${media.md} {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`;

const RailCopy = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3px;
  min-width: 0;
`;

const RailLabel = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
`;

const RailSource = styled.span`
  color: ${tokens.colors.textDim};
  font-size: ${tokens.fontSizes.xs};
  line-height: ${tokens.lineHeights.normal};
`;

const Metrics = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${tokens.spacing.sm} ${tokens.spacing.lg};
`;

const MetricLink = styled.a`
  display: inline-flex;
  align-items: center;
  gap: ${tokens.spacing.sm};
  min-height: 34px;
  color: ${tokens.colors.textSoft};
  text-decoration: none;
  transition: color ${tokens.transitions.fast}, opacity ${tokens.transitions.fast};

  &:hover {
    color: ${tokens.colors.primary};
  }
`;

const LogoMark = styled.span`
  display: inline-block;
  width: ${({ $width }) => $width}px;
  height: ${({ $height }) => $height}px;
  background-image: url("${({ $src }) => $src}");
  background-position: center;
  background-repeat: no-repeat;
  background-size: contain;
  flex-shrink: 0;
`;

const Score = styled.span`
  display: inline-flex;
  align-items: baseline;
  gap: 2px;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.black};
  letter-spacing: 0;

  small {
    color: ${tokens.colors.textDim};
    font-size: ${tokens.fontSizes.xs};
    font-weight: ${tokens.fontWeights.bold};
  }
`;

const CountLink = styled.a`
  display: inline-flex;
  align-items: baseline;
  gap: 5px;
  min-height: 34px;
  color: ${tokens.colors.textMuted};
  text-decoration: none;
  transition: color ${tokens.transitions.fast};

  &:hover {
    color: ${tokens.colors.primary};
  }

  strong {
    color: ${tokens.colors.text};
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes.lg};
    font-weight: ${tokens.fontWeights.black};
  }

  span {
    font-size: ${tokens.fontSizes.xs};
  }
`;

const FooterWrap = styled.div`
  margin: ${tokens.spacing.lg} 0 ${tokens.spacing.xl};
  padding: ${tokens.spacing.md} 0;
  border-top: 1px solid rgba(255,255,255,0.10);
  border-bottom: 1px solid rgba(255,255,255,0.08);
`;

const FooterTitle = styled.a`
  display: inline-flex;
  color: rgba(255,255,255,0.86);
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.medium};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  text-decoration: none;
  margin-bottom: ${tokens.spacing.sm};

  &:hover {
    color: #fff;
  }
`;

const FooterLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm} ${tokens.spacing.md};
  align-items: center;
`;

const FooterMetric = styled.a`
  display: inline-flex;
  align-items: center;
  gap: 7px;
  color: rgba(255,255,255,0.64);
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
    <Rail aria-label="STARTPLATZ Bewertungen">
      <RailInner>
        <RailCopy>
          <RailLabel>STARTPLATZ Bewertungen</RailLabel>
          <RailSource>{ratings.checkedAt}</RailSource>
        </RailCopy>
        <Metrics>
          {ratings.platforms.map((rating) => {
            const logo = REVIEW_LOGOS[rating.id];
            return (
              <MetricLink
                key={rating.id}
                href={rating.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${rating.name}: ${rating.value}${rating.suffix} ${rating.label}`}
              >
                {logo && (
                  <LogoMark
                    aria-hidden="true"
                    $src={getLogo(rating.id, 'light')}
                    $width={logo.width}
                    $height={logo.height}
                  />
                )}
                <Score>
                  {rating.value}
                  {rating.suffix && <small>{rating.suffix}</small>}
                </Score>
              </MetricLink>
            );
          })}
          <CountLink href={ratings.sourceUrl} target="_blank" rel="noopener noreferrer">
            <strong>{ratings.total.value}</strong>
            <span>{ratings.total.label}</span>
          </CountLink>
        </Metrics>
      </RailInner>
    </Rail>
  );
}

export function FooterReviewRatings() {
  const ratings = useReviewRatings();
  const google = ratings.platforms.find((item) => item.id === 'google');
  const provenExpert = ratings.platforms.find((item) => item.id === 'provenexpert');

  return (
    <FooterWrap aria-label="STARTPLATZ Bewertungen">
      <FooterTitle href={ratings.sourceUrl} target="_blank" rel="noopener noreferrer">
        STARTPLATZ Bewertungen
      </FooterTitle>
      <FooterLine>
        <FooterMetric href={ratings.sourceUrl} target="_blank" rel="noopener noreferrer">
          <strong>{ratings.total.value}</strong> veröffentlicht
        </FooterMetric>
        {google && (
          <FooterMetric href={google.href} target="_blank" rel="noopener noreferrer">
            <LogoMark
              aria-hidden="true"
              $src={getLogo('google', 'dark')}
              $width={58}
              $height={20}
            />
            <strong>{google.value}{google.suffix}</strong>
            ({formatCount(google.detail, ' Bewertungen auf Google')})
          </FooterMetric>
        )}
        {provenExpert && (
          <FooterMetric href={provenExpert.href} target="_blank" rel="noopener noreferrer">
            <LogoMark
              aria-hidden="true"
              $src={getLogo('provenexpert', 'dark')}
              $width={108}
              $height={16}
            />
            <strong>{provenExpert.value}{provenExpert.suffix}</strong>
            ({formatCount(provenExpert.detail, ' Bewertungen auf ProvenExpert')})
          </FooterMetric>
        )}
      </FooterLine>
    </FooterWrap>
  );
}
