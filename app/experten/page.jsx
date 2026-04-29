'use client';

import React from 'react';
import {
  Button,
  CTABanner,
  FeatureCard,
  PageHero,
  ReflectiveInstructorCard,
  ResponsiveGrid,
  SectionBlock,
  TwoColumn,
  VisualSlot,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens } from '../../styles/tokens';
import { CALENDLY_URL, COMPANY_EMAIL } from '../../lib/site';

export default function ExpertenPage() {
  const profiles = [
    {
      initials: 'JS',
      name: 'Jakow Smirin',
      role: 'CEO, AI Academy',
      signal: 'Strategie',
      accent: tokens.colors.primary,
      focus: 'Positionierung, Lernarchitektur und der Transfer von KI-Kompetenz in echte Rollen.',
      tools: ['AI Strategy', 'Education Design', 'STARTPLATZ Netzwerk'],
      bio: 'Baut seit 2023 KI-Weiterbildungen in NRW und verbindet Bildungsformate mit dem STARTPLATZ Ökosystem.',
    },
    {
      initials: 'LG',
      name: 'Lorenz Gräf',
      role: 'Lead Dozent',
      signal: 'FortyDays',
      accent: tokens.colors.mint,
      focus: 'Vom ersten Prompt bis zum Cert-IT Projekt: strukturiert, ruhig und anwendbar.',
      tools: ['Prompting', 'KI-Manager', 'Zertifizierung'],
      bio: 'Leitet den FortyDays KI-Manager:in und übersetzt komplexe KI-Themen in klare Lernpfade.',
    },
    {
      initials: 'LS',
      name: 'Lukas Stratmann',
      role: 'Lead Dozent',
      signal: 'Automation',
      accent: tokens.colors.navy,
      focus: 'Automationen, die im Alltag wirklich Zeit sparen und sauber dokumentiert sind.',
      tools: ['n8n', 'GPT APIs', 'Workflows'],
      bio: 'Leitet den AfterWork AI Automation und fokussiert n8n, GPT-APIs und praktische Business Workflows.',
    },
  ];

  const trust = [
    { step: '1', title: 'Praxis statt Lehrbuch', description: 'Unsere Dozenten arbeiten selbst täglich mit KI-Tools, Workflows und echten Projekten.' },
    { step: '2', title: 'Anerkannte Programme', description: 'FortyDays und AfterWork sind AZAV-zertifiziert und an klare Kompetenznachweise gekoppelt.' },
    { step: '3', title: 'NRW-Ökosystem', description: 'Köln, Düsseldorf, Events, Startups und Unternehmen bilden den Kontext der Academy.' },
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge="Das Team"
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="Lerne von Menschen, die KI <span>selbst anwenden.</span>"
        subtitle="Kein Hörsaal, keine Buzzword-Bühne. Unsere Experten bauen, automatisieren und beraten in echten Projekten."
        breadcrumbs={[{ label: 'Experten', href: '/experten', active: true }]}
        accentColor={tokens.colors.primaryLighter}
        image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469604/ai-hub/website/AI-Academy-Website-Images/experten-networking-event.png"
      >
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="primary" size="lg" arrow>
          Beratung anfragen
        </Button>
      </PageHero>

      <SectionBlock
        badge="Steckbriefe"
        title="Dozenten, die Praxis <span>sichtbar machen.</span>"
        subtitle="Keine anonymen Kursfolien. Unsere Dozenten stehen für konkrete Anwendung, klare Verantwortung und Lernmomente, die im Arbeitsalltag bleiben."
        accent={tokens.colors.glow}
      >
        <ResponsiveGrid $cols={3}>
          {profiles.map((profile) => (
            <ReflectiveInstructorCard key={profile.name} {...profile} />
          ))}
        </ResponsiveGrid>
      </SectionBlock>

      <SectionBlock
        badge="Warum das zählt"
        title="Gute Weiterbildung ist eine <span>Menschenfrage.</span>"
        variant="muted"
        accent={tokens.colors.glow}
      >
        <TwoColumn>
          <ResponsiveGrid $cols={1}>
            {trust.map((item) => (
              <FeatureCard
                key={item.title}
                step={item.step}
                title={item.title}
                description={item.description}
                accentColor={tokens.colors.primary}
                accentBg={tokens.colors.primaryLighter}
                cornerColor={tokens.colors.primary}
              />
            ))}
          </ResponsiveGrid>
          <VisualSlot
            title="Dozenten-Netzwerk"
            image="https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_900/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png"
            accentColor={tokens.colors.primary}
            prompt="Use case: infographic-diagram. Asset type: experts page visual. Abstract network map connecting trainers, learners, startups, companies, and AI tools in NRW; premium editorial style; STARTPLATZ purple/mint palette; no readable tiny text, no logos, no watermark."
          />
        </TwoColumn>
      </SectionBlock>

      <CTABanner
        title="Du bist selbst KI-Experte?"
        subtitle="Wir suchen punktuell Menschen, die echte Anwendungserfahrung mitbringen und diese respektvoll vermitteln können."
      >
        <Button href={`mailto:${COMPANY_EMAIL}`} variant="primary" size="lg" arrow>
          Sprich uns an
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
