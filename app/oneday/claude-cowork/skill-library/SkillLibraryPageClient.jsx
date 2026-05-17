'use client';

import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styled from 'styled-components';
import SubpageLayout from '../../../../components/SubpageLayout';
import { Button, PageHero, SectionBlock } from '../../../../components/ui';
import {
  CLAUDE_COWORK_PACKAGES,
  CLAUDE_COWORK_SELECTION_GUIDES,
  CLAUDE_COWORK_SKILLS,
  getClaudeCoworkPackage,
} from '../../../../lib/claudeCoworkLibrary';
import { tokens, media } from '../../../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../../../styles/cyberpunk';
import { logoutClaudeCoworkLibrary } from './actions';

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

const UtilityBar = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: flex-end;
  max-width: 1400px;
  margin: -${tokens.spacing['2xl']} auto ${tokens.spacing.xl};
  padding: 0 ${tokens.spacing.lg};

  ${media.lg} {
    padding: 0 ${tokens.spacing['2xl']};
  }
`;

const LogoutButton = styled.button`
  padding: 8px 12px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textMuted};
  background: rgba(255, 255, 255, 0.82);
  border: 1px solid ${tokens.colors.glassBorder};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  ${clipBR(CHAMFER.xs)}

  &:hover {
    color: ${tokens.colors.primary};
    border-color: rgba(124, 58, 237, 0.32);
  }
`;

const Stats = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const InstallGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const InstallPanel = styled.article`
  position: relative;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $color }) => `${$color}12`}, rgba(255, 255, 255, 0.92) 46%),
    ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}32`};
  ${clipBR(CHAMFER.md)}
`;

const Stat = styled.div`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const StatValue = styled.div`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['4xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${({ $color }) => $color};
  line-height: ${tokens.lineHeights.tight};
`;

const StatLabel = styled.div`
  margin-top: ${tokens.spacing.xs};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const PackageGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }

  ${media.xl} {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const PackageCard = styled.article`
  position: relative;
  overflow: hidden;
  min-height: 520px;
  display: flex;
  flex-direction: column;
  background: ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}30`};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
  transition: transform ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadows.card};
  }
`;

const PackageImage = styled.div`
  position: relative;
  min-height: 220px;
  overflow: hidden;
  background: ${tokens.colors.surfaceAlt};

  img {
    width: 100%;
    height: 100%;
    min-height: 220px;
    object-fit: cover;
    display: block;
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(180deg, transparent 42%, rgba(10, 10, 10, 0.42));
  }
`;

const PackageBody = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing.xl};
`;

const Kicker = styled.div`
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  color: ${({ $color }) => $color};
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;

const PackageTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes['2xl']};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin-bottom: ${tokens.spacing.sm};
`;

const PackageText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const ChipRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: ${tokens.spacing.lg};
`;

const Chip = styled.span`
  padding: 5px 8px;
  font-family: ${tokens.fonts.mono};
  font-size: 10px;
  color: ${tokens.colors.textSoft};
  background: ${({ $bg }) => $bg};
  border: 1px solid rgba(0, 0, 0, 0.06);
  ${clipBR(CHAMFER.xs)}
`;

const Actions = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
  margin-top: auto;
  padding-top: ${tokens.spacing.xl};
`;

const DownloadLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: ${({ $compact }) => ($compact ? '8px 12px' : '12px 18px')};
  font-family: ${tokens.fonts.body};
  font-size: ${({ $compact }) => ($compact ? tokens.fontSizes.xs : tokens.fontSizes.sm)};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${({ $color }) => $color};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  ${clipBR(CHAMFER.sm)}

  &:hover {
    color: #fff;
    transform: translateY(-1px);
  }
`;

const FilterBar = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.md};
  margin-bottom: ${tokens.spacing.xl};

  ${media.lg} {
    grid-template-columns: minmax(280px, 0.6fr) minmax(0, 1.4fr);
  }
`;

const SearchInput = styled.input`
  min-height: 50px;
  width: 100%;
  padding: 0 ${tokens.spacing.md};
  color: ${tokens.colors.text};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.22);
  outline: 0;
  ${clipBR(CHAMFER.sm)}

  &:focus {
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
  }
`;

const FilterChips = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.sm};
`;

const FilterChip = styled.button`
  min-height: 40px;
  padding: 0 12px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${({ $active, $color }) => ($active ? '#fff' : $color)};
  background: ${({ $active, $color, $bg }) => ($active ? $color : $bg)};
  border: 1px solid ${({ $color }) => `${$color}45`};
  cursor: pointer;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  ${clipBR(CHAMFER.xs)}
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
  min-height: 280px;
  display: flex;
  flex-direction: column;
  padding: ${tokens.spacing.xl};
  background:
    linear-gradient(135deg, ${({ $color }) => `${$color}10`}, rgba(255, 255, 255, 0.9) 42%),
    ${tokens.colors.surface};
  border: 1px solid ${({ $color }) => `${$color}2f`};
  ${clipBR(CHAMFER.md)}
`;

const SkillTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  line-height: ${tokens.lineHeights.snug};
  margin: ${tokens.spacing.sm} 0;
`;

const SkillText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const SkillLinks = styled.div`
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

const GuideGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const GuideCard = styled.article`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const GuideTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.black};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.lg};
`;

export default function SkillLibraryPageClient() {
  const [query, setQuery] = useState('');
  const [activePackage, setActivePackage] = useState('all');

  const filteredSkills = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return CLAUDE_COWORK_SKILLS.filter((skill) => {
      const packageMatch = activePackage === 'all' || skill.packageIds.includes(activePackage);
      const queryMatch = !normalizedQuery
        || `${skill.title} ${skill.shortDescription} ${skill.description}`.toLowerCase().includes(normalizedQuery);
      return packageMatch && queryMatch;
    });
  }, [activePackage, query]);

  return (
    <SubpageLayout>
      <PageHero
        badge="Teilnehmerbereich"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="Claude Cowork <span>Skill Library.</span>"
        subtitle="Einzelne Skills für konkrete Aufgaben und Plugins als gebündelte Skill-Systeme für ganze Arbeitsbereiche."
        breadcrumbs={[
          { label: 'OneDay', href: '/oneday' },
          { label: 'Claude Cowork', href: '/oneday/claude-cowork' },
          { label: 'Skill Library', href: '/oneday/claude-cowork/skill-library', active: true },
        ]}
        accentColor={tokens.colors.primaryLighter}
        image="/claude-cowork/images/library-hero.webp"
      >
        <Button href="#plugins" variant="primary" size="lg" arrow>
          Plugin-Katalog
        </Button>
        <Button href="#skills" variant="secondary" size="lg">
          Skills suchen
        </Button>
      </PageHero>

      <UtilityBar>
        <form action={logoutClaudeCoworkLibrary}>
          <LogoutButton type="submit">Logout</LogoutButton>
        </form>
      </UtilityBar>

      <SectionBlock variant="white" accent={tokens.colors.glow}>
        <Stats>
          <Stat>
            <CyberCorners $color={tokens.colors.primary} $size={7} />
            <StatValue $color={tokens.colors.primary}>{CLAUDE_COWORK_SKILLS.length}</StatValue>
            <StatLabel>Skills</StatLabel>
          </Stat>
          <Stat>
            <CyberCorners $color={tokens.colors.mint} $size={7} />
            <StatValue $color={tokens.colors.mint}>{CLAUDE_COWORK_PACKAGES.length}</StatValue>
            <StatLabel>Plugins</StatLabel>
          </Stat>
          <Stat>
            <CyberCorners $color={tokens.colors.orange} $size={7} />
            <StatValue $color={tokens.colors.orange}>SKILL.md</StatValue>
            <StatLabel>Skill-Format</StatLabel>
          </Stat>
        </Stats>
      </SectionBlock>

      <SectionBlock
        badge="Installation"
        title="Der richtige Download für <span>den richtigen Ort.</span>"
        subtitle="Ein Skill ist eine einzelne Fähigkeit. Ein Plugin bündelt mehrere Skills und wird in Cowork als Plugin installiert."
        accent={tokens.colors.glow}
      >
        <InstallGrid>
          <InstallPanel $color={tokens.colors.primary}>
            <CyberCorners $color={tokens.colors.primary} $size={7} />
            <Kicker $color={tokens.colors.primary}>Einzelner Skill</Kicker>
            <PackageTitle>Claude.ai: Upload skill</PackageTitle>
            <PackageText>
              Skill-ZIP direkt im Skill-Upload auswählen. Die ZIP enthält genau einen Ordner mit `SKILL.md`
              und ist für einzelne Aufgaben gedacht.
            </PackageText>
          </InstallPanel>
          <InstallPanel $color={tokens.colors.mint}>
            <CyberCorners $color={tokens.colors.mint} $size={7} />
            <Kicker $color={tokens.colors.mint}>Plugin</Kicker>
            <PackageTitle>Cowork: Custom plugin file</PackageTitle>
            <PackageText>
              Plugin-ZIP im Cowork Plugin-Bereich installieren. Die ZIP enthält `.claude-plugin/plugin.json`
              und mehrere Skills unter `skills/`.
            </PackageText>
          </InstallPanel>
        </InstallGrid>
      </SectionBlock>

      <SectionBlock
        id="plugins"
        badge="Plugin-Katalog"
        title="Mehrere Skills als <span>Plugin.</span>"
        subtitle="Jedes Plugin bündelt passende Skills zu einem Arbeitsbereich und folgt dem Claude Code / Cowork Plugin-Format mit plugin.json und skills-Verzeichnis."
        accent={tokens.colors.glow}
      >
        <PackageGrid>
          {CLAUDE_COWORK_PACKAGES.map((pack) => {
            const color = accentColors[pack.accent] || tokens.colors.primary;
            const bg = accentBgs[pack.accent] || tokens.colors.primaryLighter;
            const skills = pack.skillIds.map((id) => CLAUDE_COWORK_SKILLS.find((skill) => skill.id === id)).filter(Boolean);

            return (
              <PackageCard key={pack.id} $color={color}>
                <PackageImage>
                  <Image
                    src={pack.image}
                    alt=""
                    fill
                    sizes="(min-width: 1280px) 33vw, (min-width: 768px) 50vw, 100vw"
                  />
                </PackageImage>
                <PackageBody>
                  <Kicker $color={color}>{skills.length} Skills</Kicker>
                  <PackageTitle>{pack.title}</PackageTitle>
                  <PackageText>{pack.description}</PackageText>
                  <ChipRow>
                    {skills.slice(0, 4).map((skill) => (
                      <Chip key={skill.id} $bg={bg}>{skill.title}</Chip>
                    ))}
                  </ChipRow>
                  <Actions>
                    <Button href={`/oneday/claude-cowork/skill-library/plugins/${pack.id}`} variant="secondary" size="sm" arrow>
                      Details
                    </Button>
                    <DownloadLink href={pack.download} download $color={color}>
                      Plugin laden
                    </DownloadLink>
                  </Actions>
                </PackageBody>
              </PackageCard>
            );
          })}
        </PackageGrid>
      </SectionBlock>

      <SectionBlock
        id="skills"
        badge="Skill-Katalog"
        title="Einzelne Skills <span>gezielt auswählen.</span>"
        subtitle="Filtere nach Arbeitsbereich oder suche nach einer Aufgabe, einem Dokumenttyp oder einem typischen Output."
        variant="muted"
        accent={tokens.colors.glow}
      >
        <FilterBar>
          <SearchInput
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Skill, Aufgabe oder Output suchen"
            aria-label="Skills suchen"
          />
          <FilterChips>
            <FilterChip
              type="button"
              $active={activePackage === 'all'}
              $color={tokens.colors.primary}
              $bg={tokens.colors.primaryLighter}
              onClick={() => setActivePackage('all')}
            >
              Alle
            </FilterChip>
            {CLAUDE_COWORK_PACKAGES.map((pack) => {
              const color = accentColors[pack.accent] || tokens.colors.primary;
              const bg = accentBgs[pack.accent] || tokens.colors.primaryLighter;
              return (
                <FilterChip
                  key={pack.id}
                  type="button"
                  $active={activePackage === pack.id}
                  $color={color}
                  $bg={bg}
                  onClick={() => setActivePackage(pack.id)}
                >
                  {pack.shortTitle}
                </FilterChip>
              );
            })}
          </FilterChips>
        </FilterBar>

        <SkillGrid>
          {filteredSkills.map((skill) => {
            const pack = getClaudeCoworkPackage(skill.primaryPackageId);
            const color = accentColors[skill.accent] || tokens.colors.primary;
            const bg = accentBgs[skill.accent] || tokens.colors.primaryLighter;

            return (
              <SkillCard key={skill.id} $color={color}>
                <CyberCorners $color={color} $size={7} />
                <Kicker $color={color}>{pack?.shortTitle || 'Skill'}</Kicker>
                <SkillTitle>{skill.title}</SkillTitle>
                <SkillText>{skill.shortDescription}</SkillText>
                <ChipRow>
                  {skill.outputs.slice(0, 3).map((output) => (
                    <Chip key={output} $bg={bg}>{output}</Chip>
                  ))}
                </ChipRow>
                <SkillLinks>
                  <TextLink href={`/oneday/claude-cowork/skill-library/skills/${skill.id}`} $color={color}>
                    Detailseite
                  </TextLink>
                  <DownloadLink href={skill.download} download $color={color} $compact>
                    Skill laden
                  </DownloadLink>
                </SkillLinks>
              </SkillCard>
            );
          })}
        </SkillGrid>
      </SectionBlock>

      <SectionBlock
        badge="Auswahl nach Arbeitsalltag"
        title="Nicht nach Tool, sondern nach <span>Aufgabe starten.</span>"
        accent={tokens.colors.glow}
      >
        <GuideGrid>
          {CLAUDE_COWORK_SELECTION_GUIDES.map((guide) => (
            <GuideCard key={guide.title}>
              <CyberCorners $color={tokens.colors.mint} $size={7} />
              <GuideTitle>{guide.title}</GuideTitle>
              <ChipRow>
                {guide.skillIds.slice(0, 6).map((skillId) => {
                  const skill = CLAUDE_COWORK_SKILLS.find((item) => item.id === skillId);
                  return skill ? <Chip key={skill.id} $bg={tokens.colors.surfaceAlt}>{skill.title}</Chip> : null;
                })}
              </ChipRow>
              <ChipRow>
                {guide.packageIds.map((packageId) => {
                  const pack = getClaudeCoworkPackage(packageId);
                  return pack ? (
                    <TextLink key={pack.id} href={`/oneday/claude-cowork/skill-library/plugins/${pack.id}`} $color={tokens.colors.primary}>
                      {pack.title}
                    </TextLink>
                  ) : null;
                })}
              </ChipRow>
            </GuideCard>
          ))}
        </GuideGrid>
      </SectionBlock>
    </SubpageLayout>
  );
}
