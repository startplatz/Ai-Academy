'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
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

const IntroGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};
  align-items: stretch;

  ${media.lg} {
    grid-template-columns: 0.95fr 1.05fr;
  }
`;

const ImagePanel = styled.figure`
  position: relative;
  min-height: 500px;
  margin: 0;
  overflow: hidden;
  background: ${tokens.colors.dark};
  border: 1px solid ${({ $color }) => `${$color}42`};
  box-shadow: ${tokens.shadows.card};
  ${clipBR(CHAMFER.lg)}

  img {
    width: 100%;
    min-height: 500px;
    height: 100%;
    object-fit: cover;
    opacity: 0.86;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, transparent 36%, rgba(10, 10, 10, 0.82)),
      linear-gradient(90deg, ${({ $color }) => `${$color}44`}, transparent 55%);
  }
`;

const ImageCopy = styled.figcaption`
  position: absolute;
  z-index: 1;
  left: ${tokens.spacing.xl};
  right: ${tokens.spacing.xl};
  bottom: ${tokens.spacing.xl};
`;

const ImageTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  text-transform: uppercase;
`;

const InfoPanel = styled.article`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}32`};
  ${clipBR(CHAMFER.lg)}
`;

const Label = styled.div`
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const InfoTitle = styled.h3`
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
`;

const Text = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.md};
  margin-top: ${tokens.spacing.xl};
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: fit-content;
  padding: ${({ $compact }) => ($compact ? '8px 12px' : '14px 20px')};
  font-family: ${tokens.fonts.body};
  font-size: ${({ $compact }) => ($compact ? tokens.fontSizes.xs : tokens.fontSizes.base)};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${({ $color }) => $color};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${clipBR(CHAMFER.sm)}
`;

const SkillGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const SkillCard = styled.article`
  position: relative;
  min-height: 290px;
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $color }) => `${$color}10`}, rgba(255, 255, 255, 0.9) 44%),
    ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}30`};
  ${clipBR(CHAMFER.md)}
`;

const SkillTitle = styled.h3`
  margin: ${tokens.spacing.sm} 0;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
`;

const SkillActions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: auto;
  padding-top: ${tokens.spacing.lg};
`;

const TextLink = styled(Link)`
  display: inline-flex;
  align-items: center;
  padding: 8px 0;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.08em;
`;

export default function PluginDetailPageClient({ pack, skills }) {
  const color = accentColors[pack.accent] || tokens.colors.primary;
  const bg = accentBgs[pack.accent] || tokens.colors.primaryLighter;

  return (
    <SubpageLayout>
      <PageHero
        badge="Skill-Paket"
        badgeColor={color}
        badgeBg={bg}
        title={`${pack.title} <span>Download.</span>`}
        subtitle={pack.description}
        breadcrumbs={[
          { label: 'Skill Library', href: '/oneday/claude-cowork/skill-library' },
          { label: pack.title, href: `/oneday/claude-cowork/skill-library/plugins/${pack.id}`, active: true },
        ]}
        accentColor={bg}
        image={pack.image}
      >
        <DownloadLink href={pack.download} download $color={color}>
          Upload-ZIP laden
        </DownloadLink>
        <Button href="/oneday/claude-cowork/skill-library#plugins" variant="secondary" size="lg">
          Zurück zum Katalog
        </Button>
      </PageHero>

      <SectionBlock variant="white" accent={`${color}22`}>
        <IntroGrid>
          <ImagePanel $color={color}>
            <CyberCorners $color={color} $size={14} />
            <Image
              src={pack.image}
              alt=""
              fill
              sizes="(min-width: 1024px) 45vw, 100vw"
            />
            <ImageCopy>
              <Label $color={tokens.colors.primaryLight}>{skills.length} Skills</Label>
              <ImageTitle>{pack.shortTitle}</ImageTitle>
            </ImageCopy>
          </ImagePanel>
          <InfoPanel $color={color}>
            <CyberCorners $color={color} $size={10} />
            <Label $color={color}>Claude.ai Skill-Paket</Label>
            <InfoTitle>{pack.title}</InfoTitle>
            <Text>
              Das Paket-ZIP ist ein direkt installierbarer Claude.ai Skill. Es enthält `SKILL.md`
              im Paketordner und die einzelnen Workflows als Referenzen, damit ein Upload reicht.
            </Text>
            <ActionRow>
              <DownloadLink href={pack.download} download $color={color}>
                Upload-ZIP laden
              </DownloadLink>
            </ActionRow>
          </InfoPanel>
        </IntroGrid>
      </SectionBlock>

      <SectionBlock
        badge="Enthaltene Skills"
        title="Bausteine dieses <span>Pakets.</span>"
        accent={`${color}22`}
      >
        <SkillGrid>
          {skills.map((skill) => (
            <SkillCard key={skill.id} $color={color}>
              <CyberCorners $color={color} $size={7} />
              <Label $color={color}>SKILL.md</Label>
              <SkillTitle>{skill.title}</SkillTitle>
              <Text>{skill.shortDescription}</Text>
              <SkillActions>
                <TextLink href={`/oneday/claude-cowork/skill-library/skills/${skill.id}`} $color={color}>
                  Detailseite
                </TextLink>
                <DownloadLink href={skill.download} download $color={color} $compact>
                  Upload-ZIP
                </DownloadLink>
              </SkillActions>
            </SkillCard>
          ))}
        </SkillGrid>
      </SectionBlock>
    </SubpageLayout>
  );
}
