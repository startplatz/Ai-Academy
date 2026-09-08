'use client';

import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import SubpageLayout from '../../../components/SubpageLayout';
import { Button, CTABanner, PageHero, SectionBlock } from '../../../components/ui';
import { tokens, media } from '../../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../../styles/cyberpunk';

const DetailGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.xl};
  align-items: start;

  ${media.lg} {
    grid-template-columns: minmax(0, 1fr) minmax(280px, 0.42fr);
  }
`;

const JobBody = styled.article`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.lg)}
  box-shadow: ${tokens.shadows.sm};
`;

const JobSection = styled.section`
  & + & {
    margin-top: ${tokens.spacing['2xl']};
    padding-top: ${tokens.spacing['2xl']};
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  h2 {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes['2xl']};
    font-weight: ${tokens.fontWeights.black};
    color: ${tokens.colors.text};
    line-height: ${tokens.lineHeights.snug};
    margin-bottom: ${tokens.spacing.md};
  }
`;

const RichText = styled.div`
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};

  p {
    margin-bottom: ${tokens.spacing.md};
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul,
  ol {
    margin: 0 0 ${tokens.spacing.md} ${tokens.spacing.lg};
  }

  li {
    margin-bottom: ${tokens.spacing.xs};
  }

  strong,
  b {
    font-weight: ${tokens.fontWeights.bold};
    color: ${tokens.colors.text};
  }

  h3,
  h4 {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes.lg};
    color: ${tokens.colors.text};
    margin: ${tokens.spacing.lg} 0 ${tokens.spacing.sm};
  }

  a {
    color: ${tokens.colors.primary};
    text-decoration: underline;
  }
`;

const FactPanel = styled.aside`
  position: relative;
  padding: ${tokens.spacing.xl};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.24);
  ${clipBR(CHAMFER.md)}
  box-shadow: ${tokens.shadows.card};

  ${media.lg} {
    position: sticky;
    top: 96px;
  }
`;

const FactTitle = styled.strong`
  display: block;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
`;

const FactList = styled.dl`
  display: grid;
  gap: ${tokens.spacing.sm};
  margin-bottom: ${tokens.spacing.lg};

  div {
    display: grid;
    gap: 2px;
    padding-top: ${tokens.spacing.sm};
    border-top: 1px solid rgba(0, 0, 0, 0.06);
  }

  dt {
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: ${tokens.colors.textMuted};
  }

  dd {
    color: ${tokens.colors.text};
    line-height: ${tokens.lineHeights.snug};
  }
`;

const FactNote = styled.p`
  margin-top: ${tokens.spacing.md};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing.lg};

  ${media.md} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

const RelatedCard = styled(Link)`
  position: relative;
  display: grid;
  gap: ${tokens.spacing.xs};
  padding: ${tokens.spacing.lg};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.2);
  ${clipBR(CHAMFER.md)}
  text-decoration: none;
  transition: transform ${tokens.transitions.fast}, box-shadow ${tokens.transitions.fast};

  &:hover,
  &:focus-visible {
    transform: translateY(-4px);
    box-shadow: ${tokens.shadows.card};
  }

  span {
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    letter-spacing: 0.1em;
    text-transform: uppercase;
    color: ${tokens.colors.primary};
  }

  strong {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes.lg};
    color: ${tokens.colors.text};
    line-height: ${tokens.lineHeights.snug};
  }

  em {
    font-style: normal;
    font-size: ${tokens.fontSizes.sm};
    color: ${tokens.colors.textMuted};
  }
`;

function escapeHtml(value) {
  return String(value).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export default function JobDetailPageClient({ job, relatedJobs = [] }) {
  const breadcrumbs = [
    { label: 'Karriere', href: '/karriere' },
    { label: job.title, href: `/karriere/${job.slug}`, active: true },
  ];

  const facts = [
    { label: 'Standort', value: job.location },
    { label: 'Anstellungsart', value: job.employmentType },
    { label: 'Arbeitszeit', value: job.schedule },
    { label: 'Level', value: job.seniority },
    { label: 'Bereich', value: job.department },
    { label: 'Online seit', value: job.datePosted },
  ].filter((fact) => fact.value);

  return (
    <SubpageLayout>
      <PageHero
        badge={job.department || 'Offene Stelle'}
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title={escapeHtml(job.title)}
        subtitle={job.excerpt}
        breadcrumbs={breadcrumbs}
        accentColor={tokens.colors.primaryLighter}
      >
        <Button href={job.applyUrl} size="lg" offset target="_blank" rel="noopener noreferrer" arrow>
          Jetzt bewerben
        </Button>
        <Button href="/karriere" variant="secondary">
          Alle offenen Stellen
        </Button>
      </PageHero>

      <SectionBlock variant="white" accent={tokens.colors.glow}>
        <DetailGrid>
          <JobBody>
            <CyberCorners $color={tokens.colors.primary} $size={12} />
            {job.sections.map((section) => (
              <JobSection key={section.heading}>
                <h2>{section.heading}</h2>
                <RichText dangerouslySetInnerHTML={{ __html: section.html }} />
              </JobSection>
            ))}
          </JobBody>

          <FactPanel>
            <CyberCorners $color={tokens.colors.mint} $size={10} />
            <FactTitle>Die Stelle auf einen Blick</FactTitle>
            <FactList>
              {facts.map((fact) => (
                <div key={fact.label}>
                  <dt>{fact.label}</dt>
                  <dd>{fact.value}</dd>
                </div>
              ))}
            </FactList>
            <Button href={job.applyUrl} target="_blank" rel="noopener noreferrer" arrow>
              Auf diese Stelle bewerben
            </Button>
            <FactNote>
              Die Bewerbung läuft über unser Recruiting-System Personio. Du brauchst nur deinen
              Lebenslauf – ein Anschreiben ist willkommen, aber kein Muss.
            </FactNote>
          </FactPanel>
        </DetailGrid>
      </SectionBlock>

      {relatedJobs.length > 0 && (
        <SectionBlock
          badge="Weitere Rollen"
          title="Vielleicht passt das <span>besser zu dir.</span>"
          variant="light"
          accent={tokens.colors.glowMint}
        >
          <RelatedGrid>
            {relatedJobs.map((related) => (
              <RelatedCard key={related.slug} href={`/karriere/${related.slug}`}>
                <CyberCorners $color={tokens.colors.primary} $size={10} />
                {related.department && <span>{related.department}</span>}
                <strong>{related.title}</strong>
                <em>{related.location}</em>
              </RelatedCard>
            ))}
          </RelatedGrid>
        </SectionBlock>
      )}

      <CTABanner
        title="Fragen zur Stelle?"
        subtitle="Schreib uns kurz, worauf es dir ankommt – wir melden uns persönlich und ehrlich zurück, auch wenn die Rolle am Ende nicht passt."
      >
        <Button href="mailto:academy@startplatz.de" size="lg" offset arrow>
          academy@startplatz.de
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
