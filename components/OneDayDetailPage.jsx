'use client';

import React from 'react';
import styled from 'styled-components';
import {
  Button,
  CTABanner,
  DetailTable,
  MiniFAQ,
  PageHero,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
  VisualSlot,
} from './ui';
import SubpageLayout from './SubpageLayout';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import { CALENDLY_URL } from '../lib/site';
import { PRODUCT_CATALOG_URL } from '../lib/productCatalog';
import { searchIntentQuestions } from '../lib/searchIntentQuestions';

const accentMap = {
  primary: {
    color: tokens.colors.primary,
    bg: tokens.colors.primaryLighter,
    glow: tokens.colors.glow,
  },
  orange: {
    color: tokens.colors.orange,
    bg: tokens.colors.orangeBg,
    glow: tokens.colors.glowOrange,
  },
  mint: {
    color: tokens.colors.mint,
    bg: tokens.colors.mintBg,
    glow: tokens.colors.glowMint,
  },
};

const MetaGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing['2xl']};

  ${media.md} {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const MetaItem = styled.div`
  position: relative;
  padding: ${tokens.spacing.lg};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const MetaValue = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${({ $color }) => $color};
  line-height: ${tokens.lineHeights.tight};
  margin-bottom: ${tokens.spacing.xs};
`;

const MetaLabel = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TakeawayStrip = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0;
  margin-top: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const TakeawayItem = styled.div`
  position: relative;
  padding: ${tokens.spacing.xl};
  border-bottom: 1px solid rgba(0, 0, 0, 0.06);

  &:last-child {
    border-bottom: 0;
  }

  ${media.md} {
    border-bottom: 0;
    border-right: 1px solid rgba(0, 0, 0, 0.06);

    &:last-child {
      border-right: 0;
    }
  }
`;

const TakeawayLabel = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const TakeawayTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.sm};
`;

const TakeawayText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const UseCaseShowcase = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: start;

  ${media.lg} {
    grid-template-columns: 1.1fr 0.9fr;
  }
`;

const IndexDeck = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const IndexCard = styled.article`
  position: relative;
  min-height: 310px;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}33`};
  ${clipBR(CHAMFER.md)}
  box-shadow: ${tokens.shadows.sm};
  transform: rotate(${({ $tilt }) => $tilt}deg);
  transition: transform ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover {
    transform: rotate(0deg) translateY(-4px);
    box-shadow: ${tokens.shadows.card};
  }
`;

const CardTab = styled.div`
  position: absolute;
  top: -1px;
  right: ${tokens.spacing.lg};
  padding: 7px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  border: 1px solid ${({ $color }) => `${$color}33`};
  border-top: 0;
  ${clipBR(CHAMFER.xs)}
`;

const UseCaseTitle = styled.h3`
  margin-top: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
`;

const UseCaseText = styled.p`
  margin-top: ${tokens.spacing.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const FeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const FeatureItem = styled.li`
  display: flex;
  gap: ${tokens.spacing.sm};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '✓';
    color: ${({ $color }) => $color};
    font-weight: ${tokens.fontWeights.bold};
    flex-shrink: 0;
  }
`;

const Schedule = styled.div`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
  overflow: hidden;
`;

const ScheduleRow = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.sm};
  padding: ${tokens.spacing.lg};
  border-bottom: 1px solid rgba(0,0,0,0.06);
  background: ${({ $highlight, $bg }) => ($highlight ? $bg : 'transparent')};

  &:last-child {
    border-bottom: 0;
  }

  ${media.md} {
    grid-template-columns: 120px 1fr;
    gap: ${tokens.spacing.xl};
    padding: ${tokens.spacing.xl};
  }
`;

const Time = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color};
`;

const SessionTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.xs};
`;

const SessionText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const Tag = styled.span`
  display: inline-flex;
  margin-top: ${tokens.spacing.sm};
  padding: 4px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  background: ${({ $bg }) => $bg};
  ${clipBR(CHAMFER.xs)}
`;

const PricingGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: start;

  ${media.lg} {
    grid-template-columns: 0.85fr 1.15fr;
  }
`;

const PricingCard = styled.article`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}55`};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.card};
`;

const PriceEyebrow = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${({ $color }) => $color};
  margin-bottom: ${tokens.spacing.md};
`;

const Price = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['4xl']}, 7vw, ${tokens.fontSizes['6xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.sm};
`;

const PriceSub = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.xl};
`;

const PriceFeatureList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  margin-bottom: ${tokens.spacing.xl};
`;

const PriceActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
`;

const Note = styled.p`
  margin-top: ${tokens.spacing.lg};
  color: ${tokens.colors.textMuted};
  font-size: ${tokens.fontSizes.sm};
  line-height: ${tokens.lineHeights.relaxed};
`;

const DetailsPanel = styled.div`
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
`;

export default function OneDayDetailPage({ config }) {
  const accent = accentMap[config.accent || 'primary'] || accentMap.primary;
  const ctaHref = config.ctaHref || CALENDLY_URL;
  const buttonVariant = config.accent === 'orange' ? 'orange' : config.accent === 'mint' ? 'mint' : 'primary';
  const tilts = [-1.4, 1.1, 0.7, -1];
  const searchQuestions = config.searchIntentKey
    ? searchIntentQuestions[config.searchIntentKey]
    : config.searchIntentQuestions;

  return (
    <SubpageLayout>
      <PageHero
        badge={config.badge}
        badgeColor={accent.color}
        badgeBg={accent.bg}
        title={config.title}
        subtitle={config.subtitle}
        breadcrumbs={[
          { label: 'OneDay', href: '/oneday' },
          { label: config.breadcrumb, href: config.href, active: true },
        ]}
        accentColor={accent.bg}
        image={config.heroImage}
      >
        <Button href={ctaHref} target="_blank" rel="noopener noreferrer" variant={buttonVariant} size="lg" arrow>
          {config.primaryCta || 'Platz sichern'}
        </Button>
        <Button href="#programm" variant="secondary" size="lg">
          Programm ansehen
        </Button>
      </PageHero>

      <SectionBlock variant="white" accent={accent.glow}>
        <MetaGrid>
          {config.meta.map((item) => (
            <MetaItem key={item.label}>
              <CyberCorners $color={accent.color} $size={7} />
              <MetaValue $color={accent.color}>{item.value}</MetaValue>
              <MetaLabel>{item.label}</MetaLabel>
            </MetaItem>
          ))}
        </MetaGrid>

        {config.takeaways && (
          <TakeawayStrip>
            {config.takeaways.map((item, index) => (
              <TakeawayItem key={item.title}>
                <TakeawayLabel $color={accent.color}>{String(index + 1).padStart(2, '0')}</TakeawayLabel>
                <TakeawayTitle>{item.title}</TakeawayTitle>
                <TakeawayText>{item.text}</TakeawayText>
              </TakeawayItem>
            ))}
          </TakeawayStrip>
        )}
      </SectionBlock>

      <SectionBlock
        badge={config.why.badge}
        title={config.why.title}
        subtitle={config.why.subtitle}
        accent={accent.glow}
      >
        <SpotlightBento
          ariaLabel={config.why.badge}
          accentColor={accent.color}
          accentBg={accent.bg}
          items={config.why.cards.map((card, index) => ({
            label: `Grund ${String(index + 1).padStart(2, '0')}`,
            metric: String(index + 1).padStart(2, '0'),
            title: card.title,
            description: card.description,
            chips: card.features,
            size: index === 0 ? 'wide' : index === 1 ? 'sm' : 'md',
          }))}
        />
      </SectionBlock>

      <SectionBlock
        badge={config.useCases.badge}
        title={config.useCases.title}
        subtitle={config.useCases.subtitle}
        variant="muted"
        accent={accent.glow}
      >
        <UseCaseShowcase>
          <IndexDeck>
            {config.useCases.items.map((item, index) => (
              <IndexCard key={item.title} $color={accent.color} $tilt={tilts[index % tilts.length]}>
                <CyberCorners $color={accent.color} $size={7} />
                <CardTab $color={accent.color} $bg={accent.bg}>
                  Case {String(index + 1).padStart(2, '0')}
                </CardTab>
                <UseCaseTitle>{item.title}</UseCaseTitle>
                <UseCaseText>{item.description}</UseCaseText>
                {item.features && (
                  <FeatureList>
                    {item.features.map((feature) => (
                      <FeatureItem key={feature} $color={accent.color}>{feature}</FeatureItem>
                    ))}
                  </FeatureList>
                )}
              </IndexCard>
            ))}
          </IndexDeck>
          <VisualSlot
            title={config.visual.title}
            image={config.visual.image}
            prompt={config.visual.prompt}
            accentColor={accent.color}
          />
        </UseCaseShowcase>
      </SectionBlock>

      <SectionBlock
        id="programm"
        badge="Tagesablauf"
        title={config.schedule.title}
        subtitle={config.schedule.subtitle}
        accent={accent.glow}
      >
        <Schedule>
          {config.schedule.items.map((item) => (
            <ScheduleRow key={`${item.time}-${item.title}`} $highlight={item.highlight} $bg={accent.bg}>
              <Time $color={accent.color}>{item.time}</Time>
              <div>
                <SessionTitle>{item.title}</SessionTitle>
                <SessionText>{item.description}</SessionText>
                {item.tag && (
                  <Tag $color={accent.color} $bg={accent.bg}>
                    {item.tag}
                  </Tag>
                )}
              </div>
            </ScheduleRow>
          ))}
        </Schedule>
      </SectionBlock>

      <SectionBlock
        badge="Investment"
        title={config.pricing.title}
        subtitle={config.pricing.subtitle}
        variant="white"
        accent={accent.glow}
      >
        <PricingGrid>
          <PricingCard $color={accent.color}>
            <CyberCorners $color={accent.color} $size={12} />
            <PriceEyebrow $color={accent.color}>{config.pricing.eyebrow}</PriceEyebrow>
            <Price>{config.pricing.price}</Price>
            <PriceSub>{config.pricing.priceSub}</PriceSub>
            <PriceFeatureList>
              {config.pricing.features.map((feature) => (
                <FeatureItem key={feature} $color={accent.color}>{feature}</FeatureItem>
              ))}
            </PriceFeatureList>
            <PriceActions>
              <Button href={ctaHref} target="_blank" rel="noopener noreferrer" variant={buttonVariant} size="lg" arrow>
                {config.pricing.cta || 'Platz sichern'}
              </Button>
              <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
                Produktkatalog ansehen
              </Button>
            </PriceActions>
            {config.pricing.note && <Note>{config.pricing.note}</Note>}
          </PricingCard>
          <DetailsPanel>
            <DetailTable items={config.details} />
          </DetailsPanel>
        </PricingGrid>
      </SectionBlock>

      {searchQuestions?.length > 0 && (
        <SectionBlock
          badge="Gefragte Suchfragen"
          subtitle="Direkte Antworten auf Fragen, die Menschen vor diesem OneDay-Workshop stellen."
          accent={accent.glow}
        >
          <SearchQuestionAnswers items={searchQuestions} accentColor={accent.color} />
        </SectionBlock>
      )}

      <SectionBlock badge="FAQ" title={config.faqTitle} accent={accent.glow}>
        <MiniFAQ items={config.faq} accentColor={accent.color} />
      </SectionBlock>

      <CTABanner title={config.finalCta.title} subtitle={config.finalCta.subtitle}>
        <Button href={ctaHref} target="_blank" rel="noopener noreferrer" variant={buttonVariant} size="lg" arrow>
          {config.finalCta.button}
        </Button>
        <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
          Produktkatalog ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
