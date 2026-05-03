'use client';

import React, { useState } from 'react';
import styled, { css, keyframes } from 'styled-components';
import {
  Button,
  CTABanner,
  MiniFAQ,
  PageHero,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';
import { ONE_DAY_PRODUCTS, PRODUCT_CATALOG_URL } from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';

const previewDrift = keyframes`
  from { transform: scale(1.08) translateX(-2.2%); }
  to { transform: scale(1.08) translateX(2.2%); }
`;

const ExplorerGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: start;

  ${media.lg} {
    grid-template-columns: minmax(0, 1.04fr) minmax(360px, 0.96fr);
    align-items: stretch;
  }
`;

const PreviewPanel = styled.article`
  position: relative;
  min-height: 560px;
  overflow: hidden;
  background: ${tokens.colors.dark};
  border: 1px solid rgba(124, 58, 237, 0.22);
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.card};

  ${media.lg} {
    position: sticky;
    top: 112px;
    align-self: stretch;
    height: 100%;
    min-height: 100%;
  }
`;

const PreviewImage = styled.img`
  position: absolute;
  top: 0;
  bottom: 0;
  left: -4%;
  width: 108%;
  height: 100%;
  object-fit: cover;
  transform: scale(1.08);
  animation: ${previewDrift} 9s ease-in-out infinite alternate;
  animation-direction: ${({ $reverse }) => ($reverse ? 'alternate-reverse' : 'alternate')};
  transition: opacity ${tokens.transitions.base};

  @media (prefers-reduced-motion: reduce) {
    animation: none;
    transform: scale(1.04);
  }
`;

const PreviewShade = styled.div`
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(10, 10, 10, 0.08) 0%, rgba(10, 10, 10, 0.28) 48%, rgba(10, 10, 10, 0.84) 100%),
    linear-gradient(90deg, rgba(124, 58, 237, 0.2), transparent 45%);
`;

const PreviewCopy = styled.div`
  position: absolute;
  inset: auto ${tokens.spacing.xl} ${tokens.spacing.xl};
  color: ${tokens.colors.darkText};
`;

const PreviewKicker = styled.div`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.sm};
  padding: 5px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: ${tokens.colors.primaryLight};
  background: rgba(124, 58, 237, 0.22);
  border: 1px solid rgba(167, 139, 250, 0.35);
  ${clipBR(CHAMFER.xs)}
`;

const PreviewTitle = styled.h3`
  max-width: 680px;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  margin-bottom: ${tokens.spacing.sm};
  text-shadow: 0 2px 18px rgba(0, 0, 0, 0.34);
`;

const PreviewText = styled.p`
  max-width: 620px;
  color: rgba(245, 245, 245, 0.82);
  line-height: ${tokens.lineHeights.relaxed};
`;

const PreviewFacts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const PreviewFact = styled.span`
  padding: 7px 10px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.darkText};
  background: rgba(255, 255, 255, 0.11);
  border: 1px solid rgba(255, 255, 255, 0.16);
  ${clipBR(CHAMFER.xs)}
`;

const WorkshopList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

const WorkshopItem = styled.article`
  position: relative;
  overflow: hidden;
  background: ${({ $active }) => ($active ? tokens.colors.surface : 'rgba(255, 255, 255, 0.58)')};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(124, 58, 237, 0.32)' : tokens.colors.glassBorder)};
  ${clipBR(CHAMFER.md)}
  transition:
    transform ${tokens.transitions.fast},
    border-color ${tokens.transitions.fast},
    background ${tokens.transitions.fast},
    box-shadow ${tokens.transitions.fast};

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${({ $active }) => ($active ? tokens.colors.primary : 'transparent')};
    transition: background ${tokens.transitions.base};
  }

  &:hover {
    transform: translateX(4px);
    border-color: rgba(124, 58, 237, 0.32);
    background: ${tokens.colors.surface};
    box-shadow: ${tokens.shadows.sm};
  }
`;

const WorkshopButton = styled.button`
  width: 100%;
  display: grid;
  grid-template-columns: auto 1fr;
  gap: ${tokens.spacing.md};
  align-items: start;
  padding: ${tokens.spacing.lg};
  color: inherit;
  background: transparent;
  border: 0;
  text-align: left;
  cursor: pointer;
`;

const WorkshopIndex = styled.span`
  width: 34px;
  height: 34px;
  display: inline-grid;
  place-items: center;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $active }) => ($active ? tokens.colors.primary : tokens.colors.textDim)};
  background: ${({ $active }) => ($active ? tokens.colors.primaryLighter : tokens.colors.surfaceAlt)};
  border: 1px solid ${({ $active }) => ($active ? 'rgba(124, 58, 237, 0.2)' : tokens.colors.glassBorder)};
  ${clipBR(CHAMFER.xs)}
`;

const WorkshopTitleRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: ${tokens.spacing.sm};
  margin-bottom: ${tokens.spacing.xs};
`;

const WorkshopTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
`;

const WorkshopPrice = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.primary};
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

const WorkshopText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
  transition: color ${tokens.transitions.fast};

  ${({ $active }) => !$active && css`
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
  `}
`;

const WorkshopReveal = styled.div`
  display: grid;
  grid-template-rows: ${({ $active }) => ($active ? '1fr' : '0fr')};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transform: translateY(${({ $active }) => ($active ? '0' : '-6px')});
  transition:
    grid-template-rows 0.5s cubic-bezier(0.4, 0, 0.2, 1),
    opacity ${tokens.transitions.base},
    transform ${tokens.transitions.base};

  > div {
    min-height: 0;
    overflow: hidden;
  }
`;

const WorkshopDeliverables = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.md};
`;

const WorkshopDeliverable = styled.li`
  padding: 5px 9px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: ${tokens.colors.textSoft};
  background: ${tokens.colors.surfaceAlt};
  border: 1px solid rgba(0, 0, 0, 0.06);
  ${clipBR(CHAMFER.xs)}
`;

const ProductActions = styled.div`
  padding: 0 ${tokens.spacing.lg} ${tokens.spacing.lg} calc(${tokens.spacing.lg} + 50px);
`;

const DeliverableBoard = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  padding: ${tokens.spacing.lg};
  background:
    linear-gradient(135deg, rgba(124, 58, 237, 0.08), rgba(255, 255, 255, 0.72)),
    ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.16);
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.card};

  ${media.md} {
    padding: ${tokens.spacing['2xl']};
  }

  ${media.lg} {
    grid-template-columns: 0.88fr 1.12fr;
    align-items: center;
  }
`;

const BoardHeadline = styled.div`
  max-width: 440px;
`;

const BoardKicker = styled.span`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.primary};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const BoardTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
`;

const BoardText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const DeliverableGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const DeliverableStep = styled.div`
  position: relative;
  padding: ${tokens.spacing.lg};
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid rgba(0, 0, 0, 0.07);
  ${clipBR(CHAMFER.md)}

  ${media.md} {
    min-height: 178px;
  }
`;

const StepLabel = styled.span`
  display: block;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.primary};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const StepTitle = styled.h4`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.sm};
`;

const StepText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

export default function OneDayPage() {
  const products = ONE_DAY_PRODUCTS;

  const [activeIndex, setActiveIndex] = useState(0);
  const activeProduct = products[activeIndex];

  const deliverables = [
    {
      label: 'Input',
      title: 'Dein echter Fall',
      text: 'Du bringst Aufgabe, Ziel oder Teamfrage mit. Wir arbeiten nicht im Demo-Modus.',
    },
    {
      label: 'System',
      title: 'Workflow statt Einzelprompt',
      text: 'Aus Kontext, Rollen, Qualitätscheck und Output-Format entsteht ein wiederholbarer Ablauf.',
    },
    {
      label: 'Output',
      title: 'Ergebnis zum Mitnehmen',
      text: 'Briefing, Prompt-Toolkit, Prototyp, Zertifizierung oder konkrete Entscheidungsgrundlage.',
    },
    {
      label: 'Transfer',
      title: 'Nächste Woche nutzbar',
      text: 'Du gehst mit den nächsten Schritten raus und weißt, wie der Workflow in deinen Alltag kommt.',
    },
  ];

  const benefits = [
    { value: '3-5 Std.', label: 'pro Woche einsparen, wenn ein wiederkehrender Workflow sauber sitzt.' },
    { value: '1 Toolkit', label: 'Prompts, Checklisten und nächste Schritte statt einer losen Mitschrift.' },
    { value: '0 Vorwissen', label: 'du kannst starten, ohne technischen Hintergrund oder Tool-Overload.' },
    { value: '1 Ergebnis', label: 'am Ende steht ein nutzbarer Workflow, Prototyp oder Kompetenznachweis.' },
  ];

  const faq = [
    { q: 'Was lerne ich an einem Tag?', a: 'Du arbeitest an einem klaren Thema und gehst mit einem konkreten Ergebnis raus: Workflow, Tool-Setup, Zertifizierung oder Entscheidungsgrundlage.' },
    { q: 'Für wen sind die OneDay Workshops geeignet?', a: 'Für Einzelpersonen, Professionals und Teams, die schnell Orientierung oder einen produktiven Einstieg in ein konkretes KI-Thema brauchen.' },
    { q: 'Brauche ich Vorkenntnisse?', a: 'Nein. Die Workshops sind praxisnah aufgebaut und starten mit dem nötigen Kontext. Fortgeschrittene Formate werden entsprechend gekennzeichnet.' },
    { q: 'Kann mein Arbeitgeber die Kosten übernehmen?', a: 'Ja. Viele Teilnehmer buchen OneDay über Weiterbildungbudgets. Für Teamtermine erstellen wir ein separates Angebot.' },
    { q: 'Gibt es Folgeprogramme nach dem OneDay?', a: 'Ja. Je nach Ziel passen danach AfterWork, FortyDays oder eine Inhouse-Schulung für dein Team.' },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Tagesformate"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="Ein Tag verändert, <span>was du morgen tust.</span>"
        subtitle="Intensive Tagesworkshops. Praxisnah, mit konkreten Deliverables. Kein Vorwissen nötig."
        breadcrumbs={[{ label: 'OneDay', href: '/oneday', active: true }]}
        accentColor={tokens.colors.primaryLighter}
        image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776473243/ai-hub/website/AI-Academy-Website-Images/hero-panel-unternehmen-upscaled.png"
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" arrow>
          Platz sichern
        </Button>
        <Button href="/wissens-test" variant="secondary" size="lg">
          Format finden
        </Button>
      </PageHero>

      <SectionBlock
        badge="Produkte"
        title="Wähle deinen <span>OneDay.</span>"
        subtitle="Links das Gefühl, rechts die Entscheidung: Fahre über einen Workshop und sieh sofort, was du mitnimmst."
        accent={tokens.colors.glow}
      >
        <ExplorerGrid>
          <PreviewPanel aria-live="polite">
            <CyberCorners $color={tokens.colors.primary} $size={14} />
            <PreviewImage
              key={activeProduct.image}
              src={activeProduct.image}
              alt=""
              loading="eager"
              $reverse={activeIndex % 2 === 1}
            />
            <PreviewShade />
            <PreviewCopy>
              <PreviewKicker>{activeProduct.badge}</PreviewKicker>
              <PreviewTitle>{activeProduct.title}</PreviewTitle>
              <PreviewText>{activeProduct.preview}</PreviewText>
              <PreviewFacts>
                <PreviewFact>{activeProduct.price}</PreviewFact>
                {activeProduct.deliverables.map((deliverable) => (
                  <PreviewFact key={deliverable}>{deliverable}</PreviewFact>
                ))}
              </PreviewFacts>
            </PreviewCopy>
          </PreviewPanel>

          <WorkshopList>
            {products.map((product, index) => {
              const isActive = index === activeIndex;
              return (
                <WorkshopItem key={product.title} $active={isActive}>
                  <CyberCorners $color={isActive ? tokens.colors.primary : tokens.colors.textDim} $size={7} />
                  <WorkshopButton
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => setActiveIndex(index)}
                    onFocus={() => setActiveIndex(index)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <WorkshopIndex $active={isActive}>{String(index + 1).padStart(2, '0')}</WorkshopIndex>
                    <div>
                      <WorkshopTitleRow>
                        <WorkshopTitle>{product.title}</WorkshopTitle>
                        <WorkshopPrice>{product.price}</WorkshopPrice>
                      </WorkshopTitleRow>
                      <WorkshopText $active={isActive}>{product.subline}</WorkshopText>
                      <WorkshopReveal $active={isActive}>
                        <div>
                          <WorkshopDeliverables>
                            {product.deliverables.map((deliverable) => (
                              <WorkshopDeliverable key={deliverable}>{deliverable}</WorkshopDeliverable>
                            ))}
                          </WorkshopDeliverables>
                        </div>
                      </WorkshopReveal>
                    </div>
                  </WorkshopButton>
                  {isActive && product.href && (
                    <ProductActions>
                      <Button
                        href={product.href}
                        target={product.external ? '_blank' : undefined}
                        rel={product.external ? 'noopener noreferrer' : undefined}
                        variant="secondary"
                        size="sm"
                        arrow
                      >
                        {product.cta}
                      </Button>
                    </ProductActions>
                  )}
                </WorkshopItem>
              );
            })}
          </WorkshopList>
        </ExplorerGrid>
      </SectionBlock>

      <SectionBlock
        badge="Deliverable"
        title="Ein Tag, ein klares <span>Ergebnis.</span>"
        variant="muted"
        accent={tokens.colors.glow}
      >
        <DeliverableBoard>
          <CyberCorners $color={tokens.colors.primary} $size={14} />
          <BoardHeadline>
            <BoardKicker>Workshop Operating System</BoardKicker>
            <BoardTitle>Vom offenen Thema zum nutzbaren Arbeitsablauf.</BoardTitle>
            <BoardText>
              OneDay ist bewusst kein Folienmarathon. Jede Einheit ist so gebaut, dass aus einem echten Fall ein
              verwertbarer Output entsteht.
            </BoardText>
          </BoardHeadline>
          <DeliverableGrid>
            {deliverables.map((item) => (
              <DeliverableStep key={item.label}>
                <CyberCorners $color={tokens.colors.primary} $size={6} />
                <StepLabel>{item.label}</StepLabel>
                <StepTitle>{item.title}</StepTitle>
                <StepText>{item.text}</StepText>
              </DeliverableStep>
            ))}
          </DeliverableGrid>
        </DeliverableBoard>
      </SectionBlock>

      <SectionBlock
        badge="Benefit"
        title="Was sich nach einem Tag <span>verändert.</span>"
        subtitle="Die Zahlen sind kein Selbstzweck. Sie beschreiben, was der Workshop im Alltag leichter machen soll."
        accent={tokens.colors.glow}
      >
        <SpotlightBento
          ariaLabel="OneDay Nutzen"
          accentColor={tokens.colors.primary}
          accentBg={tokens.colors.primaryLighter}
          items={benefits.map((item, index) => ({
            label: `Output ${String(index + 1).padStart(2, '0')}`,
            metric: item.value,
            title: index === 0
              ? 'Zeitgewinn statt Tool-Sammlung'
              : index === 1
                ? 'Unterlagen, die du wirklich nutzt'
                : index === 2
                  ? 'Einstieg ohne Technik-Hürde'
                  : 'Ein Ergebnis, kein Notizstapel',
            description: item.label,
            size: index === 0 ? 'wide' : index === 1 ? 'sm' : 'md',
            chips: index === 0
              ? ['Workflow', 'Routine']
              : index === 1
                ? ['Prompts', 'Checklisten']
                : index === 2
                  ? ['Geführt', 'Praxisnah']
                  : ['Transfer', 'Nächster Schritt'],
          }))}
        />
      </SectionBlock>

      <SectionBlock
        badge="Gefragte Suchfragen"
        subtitle="Direkte Antworten auf Fragen, die Menschen vor einem kompakten KI-Workshop stellen."
        accent={tokens.colors.glow}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.oneday} accentColor={tokens.colors.primary} />
      </SectionBlock>

      <SectionBlock badge="FAQ" title="Fragen zu <span>OneDay.</span>" accent={tokens.colors.glow}>
        <MiniFAQ items={faq} accentColor={tokens.colors.primary} />
      </SectionBlock>

      <CTABanner
        title="Sichert euch den <span>nächsten Termin.</span>"
        subtitle="Wir helfen dir, den passenden OneDay für dich oder dein Team auszuwählen."
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" arrow>
          Platz sichern
        </Button>
        <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
          Produktkatalog ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
