'use client';

import React from 'react';
import styled from 'styled-components';
import {
  Button,
  ChromaShowcase,
  CTABanner,
  PageHero,
  SearchQuestionAnswers,
  SectionBlock,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';
import {
  FLAGSHIP_PRODUCTS,
  ONE_DAY_PRODUCTS,
  PRICE_LIST_2026,
  PRODUCT_IMAGES,
} from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';

const accentMap = {
  primary: {
    color: tokens.colors.primary,
    bg: tokens.colors.primaryLighter,
    variant: 'primary',
  },
  mint: {
    color: tokens.colors.mint,
    bg: tokens.colors.mintBg,
    variant: 'mint',
  },
  navy: {
    color: tokens.colors.navy,
    bg: tokens.colors.navyBg,
    variant: 'navy',
  },
  orange: {
    color: tokens.colors.orange,
    bg: tokens.colors.orangeBg,
    variant: 'orange',
  },
};

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  align-items: stretch;

  ${media.lg} {
    grid-template-columns: minmax(0, 1.1fr) minmax(320px, 0.9fr);
  }
`;

const IntroPanel = styled.article`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
`;

const IntroTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.tight};
  margin-bottom: ${tokens.spacing.md};
`;

const IntroText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  max-width: 780px;
`;

const MiniFacts = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.xl};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const MiniFact = styled.div`
  padding: ${tokens.spacing.md};
  background: ${tokens.colors.surfaceAlt};
  border: 1px solid rgba(0, 0, 0, 0.06);
  ${clipBR(CHAMFER.sm)}
`;

const MiniFactValue = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${({ $color }) => $color};
`;

const MiniFactLabel = styled.div`
  margin-top: 4px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const NotePanel = styled.aside`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background:
    linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(255, 255, 255, 0.72)),
    ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.16);
  ${clipBR(CHAMFER.lg)}
`;

const NoteKicker = styled.span`
  display: inline-block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.primary};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const NoteList = styled.ul`
  display: grid;
  gap: ${tokens.spacing.md};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
`;

const PriceSheet = styled.div`
  position: relative;
  display: grid;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing.lg};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.16);
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.card};

  ${media.md} {
    padding: ${tokens.spacing['2xl']};
  }
`;

const PriceSheetHeader = styled.div`
  display: grid;
  gap: ${tokens.spacing.sm};

  ${media.md} {
    grid-template-columns: minmax(0, 1fr) auto;
    align-items: end;
  }
`;

const PriceSheetTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.tight};
`;

const PriceSheetNote = styled.p`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.primary};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PriceGroupGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};
`;

const PriceGroup = styled.article`
  position: relative;
  min-width: 0;
  padding: ${tokens.spacing.md};
  background: ${tokens.colors.surfaceAlt};
  border: 1px solid rgba(0, 0, 0, 0.06);
  ${clipBR(CHAMFER.md)}

  ${media.md} {
    padding: ${tokens.spacing.lg};
  }
`;

const PriceGroupHeader = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  align-items: baseline;
  justify-content: space-between;
  margin-bottom: ${tokens.spacing.md};
`;

const PriceGroupTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
`;

const PriceGroupSub = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const TableWrap = styled.div`
  overflow: visible;

  ${media.md} {
    overflow-x: auto;
  }
`;

const PriceTable = styled.table`
  width: 100%;
  min-width: 0;
  border-collapse: collapse;

  ${media.md} {
    min-width: 620px;
  }

  th,
  td {
    padding: ${tokens.spacing.md};
    border-bottom: 1px solid rgba(0, 0, 0, 0.06);
    text-align: left;
    vertical-align: top;
  }

  th {
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    color: ${tokens.colors.textDim};
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  td {
    color: ${tokens.colors.textSoft};
    line-height: ${tokens.lineHeights.relaxed};
  }

  td:not(:first-child) {
    font-family: ${tokens.fonts.display};
    font-weight: ${tokens.fontWeights.black};
    color: ${tokens.colors.text};
    white-space: nowrap;
  }

  tr:last-child td {
    border-bottom: 0;
  }

  @media (max-width: 767px) {
    display: block;

    thead {
      display: none;
    }

    tbody {
      display: grid;
      gap: ${tokens.spacing.md};
    }

    tr {
      display: grid;
      gap: ${tokens.spacing.sm};
      padding: ${tokens.spacing.md};
      background: ${tokens.colors.surface};
      border: 1px solid rgba(0, 0, 0, 0.06);
      ${clipBR(CHAMFER.sm)}
    }

    th,
    td {
      padding: 0;
      border-bottom: 0;
    }

    td {
      display: grid;
      grid-template-columns: minmax(0, 1fr) auto;
      gap: ${tokens.spacing.sm};
      align-items: baseline;
      color: ${tokens.colors.text};
    }

    td::before {
      content: attr(data-label);
      font-family: ${tokens.fonts.mono};
      font-size: 10px;
      color: ${tokens.colors.textDim};
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }

    td:first-child {
      display: block;
      padding-bottom: ${tokens.spacing.sm};
      border-bottom: 1px solid rgba(0, 0, 0, 0.06);
      font-family: ${tokens.fonts.display};
      font-size: ${tokens.fontSizes.base};
      font-weight: ${tokens.fontWeights.black};
      color: ${tokens.colors.text};
    }

    td:first-child::before {
      display: block;
      margin-bottom: 2px;
    }
  }
`;

const PriceAsideGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const PriceAside = styled.article`
  position: relative;
  min-height: 170px;
  padding: ${tokens.spacing.lg};
  background: ${({ $bg }) => $bg};
  border: 1px solid rgba(0, 0, 0, 0.07);
  ${clipBR(CHAMFER.md)}
`;

const PriceAsideLabel = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PriceAsideValue = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.tight};
`;

const PriceAsideText = styled.p`
  margin-top: ${tokens.spacing.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const OneDayGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr));
  gap: ${tokens.spacing.lg};
`;

const ProductCard = styled.article`
  position: relative;
  min-width: 0;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}33`};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
  transition: transform ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadows.cardHover};
  }
`;

const ImageFrame = styled.div`
  position: relative;
  aspect-ratio: 16 / 9;
  overflow: hidden;
  background: ${tokens.colors.dark};

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: scale(1.01);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10, 10, 10, 0.04), rgba(10, 10, 10, 0.38)),
      linear-gradient(90deg, ${({ $color }) => `${$color}2e`}, transparent 52%);
  }
`;

const CardBadge = styled.span`
  position: absolute;
  left: ${tokens.spacing.md};
  bottom: ${tokens.spacing.md};
  z-index: 1;
  padding: 5px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.darkText};
  background: rgba(10, 10, 10, 0.46);
  border: 1px solid rgba(255, 255, 255, 0.18);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const CardBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing.xl};
`;

const ProductTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 2.4vw, ${tokens.fontSizes['3xl']});
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  overflow-wrap: anywhere;
`;

const ProductAudience = styled.p`
  margin-top: ${tokens.spacing.sm};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const HighlightList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const Highlight = styled.li`
  padding: 5px 9px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${tokens.colors.textSoft};
  background: ${({ $bg }) => $bg};
  border: 1px solid rgba(0, 0, 0, 0.06);
  letter-spacing: 0.06em;
  text-transform: uppercase;
  ${clipBR(CHAMFER.xs)}
`;

const PriceRow = styled.div`
  display: grid;
  gap: ${tokens.spacing.sm};
  margin-top: auto;
  padding-top: ${tokens.spacing.xl};
`;

const PriceBlock = styled.div`
  padding-top: ${tokens.spacing.lg};
  border-top: 1px solid rgba(0, 0, 0, 0.07);
`;

const Price = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${({ $color }) => $color};
  line-height: ${tokens.lineHeights.tight};
`;

const PriceDetail = styled.div`
  margin-top: 4px;
  color: ${tokens.colors.textMuted};
  font-size: ${tokens.fontSizes.sm};
  line-height: ${tokens.lineHeights.relaxed};
`;

const Duration = styled.div`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

function ProductTile({ product, compact = false }) {
  const accent = accentMap[product.accent || 'primary'] || accentMap.primary;
  const highlights = product.highlights || product.deliverables || [];

  return (
    <ProductCard $color={accent.color}>
      <ImageFrame $color={accent.color}>
        <img src={product.image} alt={product.title} loading="eager" width="900" height="506" />
        <CardBadge>{product.category || product.badge || product.duration}</CardBadge>
      </ImageFrame>
      <CardBody>
        <CyberCorners $color={accent.color} $size={8} />
        <Duration>{product.duration}</Duration>
        <ProductTitle>{product.title}</ProductTitle>
        <ProductAudience>{product.audience || product.preview || product.subline}</ProductAudience>
        {highlights.length > 0 && (
          <HighlightList>
            {highlights.map((item) => (
              <Highlight key={item} $bg={accent.bg}>{item}</Highlight>
            ))}
          </HighlightList>
        )}
        <PriceRow>
          <PriceBlock>
            <Price $color={accent.color}>{product.price}</Price>
            <PriceDetail>{product.priceDetail || 'Details im Beratungsgespräch'}</PriceDetail>
          </PriceBlock>
          <Button
            href={product.href}
            target={product.external ? '_blank' : undefined}
            rel={product.external ? 'noopener noreferrer' : undefined}
            variant={compact ? 'secondary' : accent.variant}
            size="sm"
            arrow
          >
            {product.cta}
          </Button>
        </PriceRow>
      </CardBody>
    </ProductCard>
  );
}

export default function ProduktkatalogPage() {
  const facts = [
    { value: 'ab 250 €', label: 'OneDay Einstieg', color: tokens.colors.primary },
    { value: '100%', label: 'Förderung möglich', color: tokens.colors.mint },
    { value: '7.900 €', label: 'Corporate Inhouse', color: tokens.colors.orange },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Preisliste 2026"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="Alle Formate.<br /><span>Ein Überblick.</span>"
        subtitle="Alle Preise netto, zzgl. 19 % MwSt. OneDay, FortyDays, AfterWork und Corporate Inhouse auf einen Blick."
        breadcrumbs={[{ label: 'Produktkatalog', href: '/produktkatalog', active: true }]}
        accentColor={tokens.colors.primaryLighter}
        image={PRODUCT_IMAGES.claudeCowork}
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" arrow>
          Beratung buchen
        </Button>
        <Button href="/oneday" variant="secondary" size="lg">
          OneDays ansehen
        </Button>
      </PageHero>

      <SectionBlock variant="white" accent={tokens.colors.glow}>
        <IntroGrid>
          <IntroPanel>
            <CyberCorners $color={tokens.colors.primary} $size={10} />
            <IntroTitle>Der schnelle Blick auf das passende Produkt.</IntroTitle>
            <IntroText>
              Manche Formate sind klare offene Programme, andere werden auf Teamgröße, Zielbild und Branche angepasst.
              Der Katalog hilft dir, schnell zwischen geförderter Weiterbildung, Tagesworkshop und Unternehmensformat
              zu unterscheiden.
            </IntroText>
            <MiniFacts>
              {facts.map((fact) => (
                <MiniFact key={fact.label}>
                  <MiniFactValue $color={fact.color}>{fact.value}</MiniFactValue>
                  <MiniFactLabel>{fact.label}</MiniFactLabel>
                </MiniFact>
              ))}
            </MiniFacts>
          </IntroPanel>
          <NotePanel>
            <CyberCorners $color={tokens.colors.primary} $size={10} />
            <NoteKicker>Preislogik</NoteKicker>
            <NoteList>
              <li>OneDay Workshops haben feste Preisanker und eignen sich für schnelle Entscheidungen.</li>
              <li>FortyDays und AfterWork sind AZAV-zertifiziert und bei passender Voraussetzung voll förderfähig.</li>
              <li>Corporate Inhouse ist für geschlossene Gruppen bis 10 Teilnehmer:innen pauschal kalkuliert.</li>
              <li>{PRICE_LIST_2026.note}</li>
            </NoteList>
          </NotePanel>
        </IntroGrid>
      </SectionBlock>

      <SectionBlock
        badge="Schnellauswahl"
        title="Welcher Kontext ist <span>deiner?</span>"
        subtitle="Erst der richtige Rahmen, dann der Preisvergleich: diese Auswahl führt dich direkt in das passende Format."
        accent={tokens.colors.glow}
      >
        <ChromaShowcase
          ariaLabel="Produktkatalog Schnellauswahl"
          accentColor={tokens.colors.primary}
          items={FLAGSHIP_PRODUCTS.map((product) => {
            const accent = accentMap[product.accent || 'primary'] || accentMap.primary;
            return {
              title: product.category,
              kicker: product.duration,
              description: product.audience,
              image: product.image,
              href: product.href,
              accentColor: accent.color,
            };
          })}
        />
      </SectionBlock>

      <SectionBlock
        badge="Preisliste 2026"
        title="Preise, die man <span>schnell versteht.</span>"
        subtitle="Die offizielle Preisliste als Referenz: netto, klar nach Format getrennt und ohne versteckte Download-Hürde."
        accent={tokens.colors.glow}
      >
        <PriceSheet>
          <CyberCorners $color={tokens.colors.primary} $size={12} />
          <PriceSheetHeader>
            <PriceSheetTitle>{PRICE_LIST_2026.title}</PriceSheetTitle>
            <PriceSheetNote>{PRICE_LIST_2026.note}</PriceSheetNote>
          </PriceSheetHeader>

          <PriceGroupGrid>
            {PRICE_LIST_2026.groups.map((group) => (
              <PriceGroup key={group.title}>
                <CyberCorners $color={tokens.colors.primary} $size={7} />
                <PriceGroupHeader>
                  <PriceGroupTitle>{group.title}</PriceGroupTitle>
                  <PriceGroupSub>{group.subtitle}</PriceGroupSub>
                </PriceGroupHeader>
                <TableWrap>
                  <PriceTable>
                    <thead>
                      <tr>
                        {group.columns.map((column) => (
                          <th key={column}>{column}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {group.rows.map((row) => (
                        <tr key={row.join('-')}>
                          {row.map((cell, cellIndex) => (
                            <td key={`${cell}-${cellIndex}`} data-label={group.columns[cellIndex]}>
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </PriceTable>
                </TableWrap>
              </PriceGroup>
            ))}
          </PriceGroupGrid>

          <PriceAsideGrid>
            <PriceAside $bg={tokens.colors.orangeBg}>
              <CyberCorners $color={tokens.colors.orange} $size={7} />
              <PriceAsideLabel $color={tokens.colors.orange}>{PRICE_LIST_2026.corporate.subtitle}</PriceAsideLabel>
              <PriceAsideValue>{PRICE_LIST_2026.corporate.price}</PriceAsideValue>
              <PriceAsideText>{PRICE_LIST_2026.corporate.description}</PriceAsideText>
            </PriceAside>
            <PriceAside $bg={tokens.colors.primaryLighter}>
              <CyberCorners $color={tokens.colors.primary} $size={7} />
              <PriceAsideLabel $color={tokens.colors.primary}>{PRICE_LIST_2026.addon.title}</PriceAsideLabel>
              <PriceAsideValue>{PRICE_LIST_2026.addon.price}</PriceAsideValue>
              <PriceAsideText>{PRICE_LIST_2026.addon.description}</PriceAsideText>
            </PriceAside>
            <PriceAside $bg={tokens.colors.surfaceAlt}>
              <CyberCorners $color={tokens.colors.textDim} $size={7} />
              <PriceAsideLabel $color={tokens.colors.textDim}>{PRICE_LIST_2026.summerWeek.title}</PriceAsideLabel>
              <PriceAsideValue>{PRICE_LIST_2026.summerWeek.status}</PriceAsideValue>
              <PriceAsideText>Das Format bleibt im Portfolio, wird aktuell aber nicht aktiv angeboten.</PriceAsideText>
            </PriceAside>
          </PriceAsideGrid>
        </PriceSheet>
      </SectionBlock>

      <SectionBlock
        badge="Hauptformate"
        title="Vier Wege in <span>KI-Kompetenz.</span>"
        subtitle="Vom geförderten Neustart bis zum Teamprogramm: hier siehst du, welches Format für welche Situation gedacht ist."
        accent={tokens.colors.glow}
      >
        <ProductGrid>
          {FLAGSHIP_PRODUCTS.map((product) => (
            <ProductTile key={product.title} product={product} />
          ))}
        </ProductGrid>
      </SectionBlock>

      <SectionBlock
        badge="OneDay Preisliste"
        title="Ein Tag, ein Thema, <span>klare Preise.</span>"
        subtitle="Die OneDay-Reihe ist der schnellste Einstieg in ein konkretes KI-Thema. Ideal für Einzelpersonen, Professionals und Pilotgruppen."
        variant="muted"
        accent={tokens.colors.glow}
      >
        <OneDayGrid>
          {ONE_DAY_PRODUCTS.filter((product) => product.title !== 'OneDay Immobilien').map((product) => (
            <ProductTile key={product.title} product={product} compact />
          ))}
        </OneDayGrid>
      </SectionBlock>

      <SectionBlock
        badge="Gefragte Suchfragen"
        subtitle="Direkte Antworten auf Fragen, die Menschen vor dem Vergleich von KI-Kursen und Preisen stellen."
        accent={tokens.colors.glow}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.produktkatalog} accentColor={tokens.colors.primary} />
      </SectionBlock>

      <CTABanner
        title="Nicht sicher, welches <span>Format passt?</span>"
        subtitle="Schick uns kurz Zielgruppe und Ausgangslage. Wir empfehlen dir den sinnvollsten nächsten Schritt."
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" arrow>
          Beratung buchen
        </Button>
        <Button href="/oneday" variant="secondary" size="lg">
          OneDay Reihe ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
