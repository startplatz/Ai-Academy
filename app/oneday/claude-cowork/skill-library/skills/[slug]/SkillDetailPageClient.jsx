'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import SubpageLayout from '../../../../../../components/SubpageLayout';
import { Button, PageHero, SectionBlock } from '../../../../../../components/ui';
import { tokens, media } from '../../../../../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../../../../../styles/cyberpunk';

const accentColors = {
  primary: tokens.colors.primary,
  mint: tokens.colors.mint,
  navy: tokens.colors.navy,
  orange: tokens.colors.orange,
};

const accentBgs = {
  primary: tokens.colors.primaryLighter,
  mint: tokens.colors.mintBg,
  navy: tokens.colors.navyBg,
  orange: tokens.colors.orangeBg,
};

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: start;

  ${media.lg} {
    grid-template-columns: 0.92fr 1.08fr;
  }
`;

const VisualPanel = styled.figure`
  position: sticky;
  top: 104px;
  margin: 0;
  min-height: 480px;
  overflow: hidden;
  background: ${tokens.colors.dark};
  border: 1px solid ${({ $color }) => `${$color}42`};
  box-shadow: ${tokens.shadows.card};
  ${clipBR(CHAMFER.lg)}

  img {
    width: 100%;
    min-height: 480px;
    height: 100%;
    object-fit: cover;
    opacity: 0.86;
    filter: saturate(0.95);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, transparent 38%, rgba(10, 10, 10, 0.8)),
      linear-gradient(90deg, ${({ $color }) => `${$color}44`}, transparent 55%);
  }
`;

const VisualCaption = styled.figcaption`
  position: absolute;
  z-index: 1;
  left: ${tokens.spacing.xl};
  right: ${tokens.spacing.xl};
  bottom: ${tokens.spacing.xl};
`;

const VisualKicker = styled.div`
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.primaryLight};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const VisualTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
`;

const ContentStack = styled.div`
  display: grid;
  gap: ${tokens.spacing.lg};
`;

const Panel = styled.article`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}32`};
  ${clipBR(CHAMFER.md)}
`;

const PanelLabel = styled.div`
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $color }) => $color};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const PanelTitle = styled.h3`
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
`;

const Text = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const List = styled.ul`
  display: grid;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.md};
`;

const ListItem = styled.li`
  display: flex;
  gap: ${tokens.spacing.sm};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '';
    width: 7px;
    height: 7px;
    flex: 0 0 7px;
    margin-top: 0.65em;
    background: ${({ $color }) => $color};
    transform: skewX(-12deg);
  }
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: 12px 18px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${({ $color }) => $color};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${clipBR(CHAMFER.sm)}
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.xl};
`;

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const PackageLink = styled.a`
  position: relative;
  display: block;
  padding: ${tokens.spacing.lg};
  color: inherit;
  text-decoration: none;
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}30`};
  ${clipBR(CHAMFER.md)}

  &:hover h3 {
    color: ${({ $color }) => $color};
  }
`;

const PackageTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.xs};
`;

export default function SkillDetailPageClient({ skill, packages }) {
  const color = accentColors[skill.accent] || tokens.colors.primary;
  const bg = accentBgs[skill.accent] || tokens.colors.primaryLighter;
  const primaryPackage = packages[0];

  return (
    <SubpageLayout>
      <PageHero
        badge={primaryPackage?.title || 'Claude Skill'}
        badgeColor={color}
        badgeBg={bg}
        title={`${skill.title} <span>Skill.</span>`}
        subtitle={skill.shortDescription}
        breadcrumbs={[
          { label: 'Skill Library', href: '/oneday/claude-cowork/skill-library' },
          { label: skill.title, href: `/oneday/claude-cowork/skill-library/skills/${skill.id}`, active: true },
        ]}
        accentColor={bg}
        image={skill.image}
      >
        <DownloadLink href={skill.download} download $color={color}>
          Upload-ZIP laden
        </DownloadLink>
        <Button href="/oneday/claude-cowork/skill-library#skills" variant="secondary" size="lg">
          Zurück zum Katalog
        </Button>
      </PageHero>

      <SectionBlock variant="white" accent={`${color}22`}>
        <DetailGrid>
          <VisualPanel $color={color}>
            <CyberCorners $color={color} $size={14} />
            <Image
              src={skill.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 44vw, 100vw"
            />
            <VisualCaption>
              <VisualKicker>{primaryPackage?.shortTitle || 'Skill'}</VisualKicker>
              <VisualTitle>{skill.title}</VisualTitle>
            </VisualCaption>
          </VisualPanel>

          <ContentStack>
            <Panel $color={color}>
              <CyberCorners $color={color} $size={7} />
              <PanelLabel $color={color}>Aufgabe</PanelLabel>
              <PanelTitle>Wofür dieser Skill gedacht ist</PanelTitle>
              <Text>{skill.description}</Text>
              <ActionRow>
                <DownloadLink href={skill.download} download $color={color}>
                  Download
                </DownloadLink>
              </ActionRow>
            </Panel>

            <Panel $color={color}>
              <PanelLabel $color={color}>Input</PanelLabel>
              <PanelTitle>Typische Ausgangslage</PanelTitle>
              <List>
                {skill.inputs.map((item) => (
                  <ListItem key={item} $color={color}>{item}</ListItem>
                ))}
              </List>
            </Panel>

            <Panel $color={color}>
              <PanelLabel $color={color}>Output</PanelLabel>
              <PanelTitle>Was Claude damit erzeugen soll</PanelTitle>
              <List>
                {skill.outputs.map((item) => (
                  <ListItem key={item} $color={color}>{item}</ListItem>
                ))}
              </List>
            </Panel>

            <Panel $color={color}>
              <PanelLabel $color={color}>Claude.ai Upload</PanelLabel>
              <PanelTitle>Direkt hochladen</PanelTitle>
              <Text>
                Das ZIP enthält genau einen Skill-Ordner mit `SKILL.md` direkt darin. Nicht entpacken:
                In Claude.ai bei Upload skill auswählen oder per Drag and Drop ablegen.
              </Text>
            </Panel>
          </ContentStack>
        </DetailGrid>
      </SectionBlock>

      {packages.length > 0 && (
        <SectionBlock
          badge="Enthalten in"
          title="Passende <span>Skill-Pakete.</span>"
          accent={`${color}22`}
        >
          <PackageGrid>
            {packages.map((pack) => {
              const packageColor = accentColors[pack.accent] || tokens.colors.primary;
              return (
                <PackageLink
                  key={pack.id}
                  href={`/oneday/claude-cowork/skill-library/plugins/${pack.id}`}
                  $color={packageColor}
                >
                  <CyberCorners $color={packageColor} $size={7} />
                  <PanelLabel $color={packageColor}>{pack.skillIds.length} Skills</PanelLabel>
                  <PackageTitle>{pack.title}</PackageTitle>
                  <Text>{pack.description}</Text>
                </PackageLink>
              );
            })}
          </PackageGrid>
        </SectionBlock>
      )}
    </SubpageLayout>
  );
}
