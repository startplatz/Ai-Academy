'use client';

import React from 'react';
import styled from 'styled-components';
import {
  Button,
  CTABanner,
  DetailTable,
  MilestoneRail,
  PageHero,
  SearchQuestionAnswers,
  SectionBlock,
  SpotlightBento,
  TwoColumn,
} from '../../components/ui';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';
import { CALENDLY_URL } from '../../lib/site';
import { PRODUCT_CATALOG_URL, PRODUCT_IMAGES } from '../../lib/productCatalog';
import { searchIntentQuestions } from '../../lib/searchIntentQuestions';
import { getCourse, formatEuro, TRAEGER } from '../../lib/academyFacts';

const course = getCourse('ai-automation-engineer');
const BOOKING_URL = `https://www.startplatz.de/event/${course.allmedaSlug}/`;

const Panel = styled.div`
  position: relative;
  padding: ${tokens.spacing['2xl']};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
`;

const PanelTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
`;

const PanelText = styled.p`
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};

  & + & {
    margin-top: ${tokens.spacing.sm};
  }
`;

const SkillList = styled.ul`
  display: grid;
  gap: ${tokens.spacing.md} ${tokens.spacing.xl};
  margin: 0;
  padding: 0;
  list-style: none;

  ${media.md} {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
`;

const Skill = styled.li`
  position: relative;
  padding-left: 28px;
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.45em;
    width: 14px;
    height: 14px;
    background: ${tokens.colors.primary};
    ${clipBR(4)}
  }
`;

export default function AiAutomationEngineerPage() {
  const price = formatEuro(course.price);

  const details = [
    { label: 'Format', value: `${course.durationDays} Kurstage in Vollzeit, ${course.teachingUnits} Unterrichtseinheiten à 45 Minuten` },
    { label: 'Rhythmus', value: 'Start immer mittwochs, Ende am Freitag der Folgewoche · täglich 9–12 und 13–16 Uhr' },
    { label: 'Ort', value: 'Live online mit Dozent, keine Selbstlernvideos' },
    { label: 'Förderung', value: 'Mit Bildungsgutschein bis zu 100 % förderfähig. Die Entscheidung trifft die Agentur für Arbeit bzw. das Jobcenter im Einzelfall.' },
    { label: 'Selbstzahler', value: `${price} netto pro Person (2.320,50 € brutto), auch als Firmenzahler` },
    { label: 'Abschluss', value: `${course.certificate}, mit Wissenstest und Projektpräsentation am letzten Kurstag` },
    { label: 'Zulassung', value: `AZAV-Maßnahme ${course.massnahmennummer}, Träger ${TRAEGER.name} (zertifiziert durch ${TRAEGER.azav.certifiedBy})` },
  ];

  const paths = [
    {
      label: 'Weg 1',
      title: 'Arbeitssuchend mit Bildungsgutschein',
      description: 'Die Maßnahme ist AZAV-zugelassen. Mit Bildungsgutschein übernimmt der Kostenträger die Kosten. Eine kurze Maßnahme heißt oft auch schnellere Bewilligung und schnellere Rückkehr in den Job.',
      metric: 'bis 100 %',
      size: 'wide',
      chips: ['Bildungsgutschein', 'Bewerbungscoaching', 'Fester Ansprechpartner'],
    },
    {
      label: 'Weg 2',
      title: 'Berufstätig, selbst- oder firmenfinanziert',
      description: `Acht Tage Abwesenheit sind planbar, und die erste echte Automatisierung entsteht bereits im Kurs. ${price} netto pro Person. Eine Förderung über das QCG ist bei diesem Format nicht möglich.`,
      metric: price,
      size: 'md',
      chips: ['Selbstzahler', 'Firmenzahler', 'Inhouse auf Anfrage'],
    },
  ];

  const days = [
    { title: 'Einführung & Prozessanalyse', description: 'Kennenlernen, n8n-Oberfläche und Navigation, Ist-Prozess-Mapping, Docker-Setup und Installation.' },
    { title: 'Security & erste Workflows', description: 'OAuth2, Secrets-Management, Rollen und Rechte. Erster Workflow, Trigger-Typen und Node-Palette.' },
    { title: 'Agenten-Architektur', description: 'Sequenzielle Agenten und Multi-Agent-Systeme, LangChain und Agenten-Muster, Memory-Handling, Testing.' },
    { title: 'Custom Development & Integration', description: 'GPT-Prompting, Custom Nodes und Webhooks. Datenbanken, REST-APIs und Integrations-Best-Practices.' },
    { title: 'Projekt-Kick-off & Sprint', description: 'Szenario-Briefing, Architektur und Projektplanung. Ab hier baust du an deinem eigenen Automatisierungsprojekt.' },
    { title: 'Advanced Features & Testing', description: 'RAG-Integration, MCP-Server einbinden und deployen, Performance-Tests und Debugging.' },
    { title: 'EU AI Act & Compliance', description: 'Risikoklassen und rechtlicher Rahmen, Pflichten und Impact Assessment, Risk Controls und Audit.' },
    { title: 'Finalisierung & Abschluss', description: 'Dokumentation und Review, Projektpräsentation vor Dozent und Gruppe, Wissenstest.' },
  ].map((day, i) => ({ ...day, step: String(i + 1), kicker: `Tag ${i + 1}` }));

  const skills = [
    'eine eigene n8n-Instanz auf Docker-Basis aufsetzen und administrieren',
    'Automatisierungen sicher betreiben: OAuth2, Secrets-Management, Rollen und Rechte',
    'Multi-Agent-Systeme entwerfen und KI-Agenten mit Memory-Handling bauen',
    'Custom Nodes entwickeln und Datenbanken, REST-APIs und Webhooks anbinden',
    'RAG-Integrationen und MCP-Server einbinden und deployen',
    'Workflows testen, debuggen und auf Performance optimieren',
    'Automatisierungen nach EU AI Act einordnen: Risikoklassen, Impact Assessment, Audit',
    'die eigene Lösung dokumentieren und vor Stakeholdern präsentieren',
  ];

  return (
    <SubpageLayout>
      <PageHero
        badge={`AZAV · Maßnahme ${course.massnahmennummer}`}
        badgeColor={tokens.colors.primary}
        badgeBg={tokens.colors.primaryLighter}
        title="AI Automation Engineer. <span>In 8 Tagen.</span>"
        subtitle={`Die kompakte n8n-Weiterbildung: KI-Agenten bauen, Prozesse automatisieren, EU AI Act verstehen. ${course.durationDays} Kurstage Vollzeit, ${course.teachingUnits} Unterrichtseinheiten, live online. Mit Bildungsgutschein bis zu 100 % gefördert.`}
        breadcrumbs={[{ label: 'AI Automation Engineer', href: course.path, active: true }]}
        accentColor={tokens.colors.primaryLighter}
        image={PRODUCT_IMAGES.aiAutomationEngineer}
      >
        <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" size="lg" arrow>
          Termine & Anmeldung
        </Button>
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
          Beratung zum Bildungsgutschein
        </Button>
      </PageHero>

      <SectionBlock
        badge="Kursfakten"
        title="AI Automation Engineer <span>auf einen Blick</span>"
        subtitle="Alle Angaben, die du für die Entscheidung oder das Gespräch mit der Agentur für Arbeit brauchst."
        variant="muted"
        accent={tokens.colors.glow}
      >
        <TwoColumn>
          <Panel>
            <CyberCorners $color={tokens.colors.primary} $size={10} />
            <DetailTable items={details} />
          </Panel>
          <Panel>
            <CyberCorners $color={tokens.colors.primary} $size={10} />
            <PanelTitle>Für wen?</PanelTitle>
            <PanelText>
              Für Fachkräfte, Wissensarbeiter, Selbstständige und Teams, die wiederkehrende Prozesse selbst
              automatisieren wollen, statt sie dauerhaft an Dienstleister zu geben.
            </PanelText>
            <PanelText>
              Keine Programmierkenntnisse und kein IT-Studium nötig. Wer regelmäßig mit digitalen Werkzeugen arbeitet,
              bringt genug mit. Ein Teil der Dokumentation ist englisch, unterrichtet wird auf Deutsch.
            </PanelText>
            <PanelText>
              Du brauchst einen Laptop mit Webcam und Mikrofon. Wenn du keinen hast, stellen wir ein Leihgerät.
            </PanelText>
          </Panel>
        </TwoColumn>
      </SectionBlock>

      <SectionBlock
        badge="Zwei Wege"
        title="Ein Kurs, <span>zwei Wege hinein.</span>"
        subtitle="Gefördert mit Bildungsgutschein oder selbst bzw. vom Arbeitgeber bezahlt: Inhalt und Ablauf sind identisch."
        accent={tokens.colors.glow}
      >
        <SpotlightBento
          ariaLabel="Zugangswege zum AI Automation Engineer"
          accentColor={tokens.colors.primary}
          accentBg={tokens.colors.primaryLighter}
          items={paths}
        />
      </SectionBlock>

      <SectionBlock
        badge="Lernpfad"
        title="Acht Tage, <span>acht Bausteine.</span>"
        subtitle="Die Tage bauen aufeinander auf, deshalb ist ein späterer Einstieg nicht möglich. Ab Tag 5 arbeitest du an deinem eigenen Projekt."
        accent={tokens.colors.glow}
      >
        <MilestoneRail
          items={days}
          intro={{
            kicker: 'AI Automation Lernpfad',
            title: 'Von der eigenen n8n-Instanz zum laufenden Agenten.',
            text: 'Jeder Kurstag hat acht Unterrichtseinheiten: vormittags Input und Live-Demos, nachmittags Umsetzung mit Dozent.',
            meta: [`${course.teachingUnits} Unterrichtseinheiten`, 'Live online', 'Eigenes Projekt'],
          }}
          accentColor={tokens.colors.primary}
          accentBg={tokens.colors.primaryLighter}
        />
      </SectionBlock>

      <SectionBlock
        badge="Nach dem Kurs"
        title="Was du danach <span>kannst.</span>"
        subtitle="Du gehst nicht mit Folien raus, sondern mit einem dokumentierten n8n-Agenten auf deiner eigenen Instanz."
        variant="muted"
        accent={tokens.colors.glow}
      >
        <Panel>
          <CyberCorners $color={tokens.colors.primary} $size={10} />
          <SkillList>
            {skills.map((skill) => (
              <Skill key={skill}>{skill}</Skill>
            ))}
          </SkillList>
        </Panel>
      </SectionBlock>

      <SectionBlock
        badge="FAQ"
        title="Fragen vor dem <span>Start.</span>"
        subtitle="Direkte Antworten auf Fragen, die Menschen vor einer n8n- und KI-Automatisierungs-Weiterbildung stellen."
        accent={tokens.colors.glow}
      >
        <SearchQuestionAnswers items={searchIntentQuestions.aiAutomationEngineer} accentColor={tokens.colors.primary} />
      </SectionBlock>

      <CTABanner
        title="Deine erste Automatisierung <span>läuft nach 8 Tagen.</span>"
        subtitle="Wir klären gemeinsam, ob der Kurs zu dir passt und wie du ihn finanzierst."
      >
        <Button href={BOOKING_URL} target="_blank" rel="noopener noreferrer" size="lg" arrow>
          Termine & Anmeldung
        </Button>
        <Button href={CALENDLY_URL} target="_blank" rel="noopener noreferrer" variant="secondary" size="lg">
          Kostenlos beraten lassen
        </Button>
        <Button href={PRODUCT_CATALOG_URL} variant="secondary" size="lg">
          Produktkatalog ansehen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
