'use client';

import React from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';

/* ─────────────────────────────────────────────
   LEITBILD – STARTPLATZ AI Academy GmbH
   Quelle: QM-Dokument "Leitbild - AI Academy",
   Version 1, letzte Änderung 15.06.2026
   ───────────────────────────────────────────── */

const Section = styled.section`
  padding: ${tokens.spacing['4xl']} 0;
  background: linear-gradient(180deg, ${tokens.colors.pageBg} 0%, ${tokens.colors.surfaceAlt} 100%);
  min-height: 60vh;
  margin-top: -1px;
`;

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.xl} { padding: 0 ${tokens.spacing['2xl']}; }
`;

const Hero = styled.div`
  padding: 120px 0 ${tokens.spacing['3xl']};
  text-align: center;
  background: linear-gradient(180deg, #FFFFFF 0%, ${tokens.colors.surfaceAlt} 58%, ${tokens.colors.pageBg} 100%);
`;

const Title = styled.h1`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
`;

const Subtitle = styled.p`
  font-size: ${tokens.fontSizes.lg};
  color: ${tokens.colors.textMuted};
  max-width: 640px;
  margin: 0 auto;
  line-height: ${tokens.lineHeights.relaxed};
`;

const Card = styled.div`
  position: relative;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  ${clipBR(CHAMFER.md)}
  padding: ${tokens.spacing['3xl']};
  margin-bottom: ${tokens.spacing['2xl']};

  ${media.md} { padding: ${tokens.spacing['4xl']}; }
`;

const ChapterNumber = styled.span`
  display: block;
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${(p) => p.$color || tokens.colors.primary};
  margin-bottom: ${tokens.spacing.xs};
`;

const ChapterTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.xl}, 3vw, ${tokens.fontSizes['2xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.lg};
`;

const SubTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.text};
  margin-top: ${tokens.spacing['2xl']};
  margin-bottom: ${tokens.spacing.md};
`;

const Text = styled.p`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.md};
`;

const List = styled.ul`
  list-style: none;
  margin: 0 0 ${tokens.spacing.lg};
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.sm};
`;

const Item = styled.li`
  position: relative;
  padding-left: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};

  &::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0.55em;
    width: 8px;
    height: 8px;
    background: ${(p) => p.$color || tokens.colors.primary};
    clip-path: polygon(0 0, 100% 0, 100% 65%, 65% 100%, 0 100%);
  }

  strong {
    font-weight: ${tokens.fontWeights.semi};
    color: ${tokens.colors.text};
  }
`;

const Meta = styled.p`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  color: ${tokens.colors.textMuted};
  text-align: center;
  margin-top: ${tokens.spacing.xl};
`;

const Link = styled.a`
  color: ${tokens.colors.primary};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

export default function LeitbildPage() {
  return (
    <SubpageLayout>
      <Hero>
        <Container>
          <Title>Leitbild</Title>
          <Subtitle>
            Das Leitbild der STARTPLATZ AI Academy GmbH beschreibt unser Selbstverständnis als
            zugelassener Bildungsträger nach AZAV – und den Maßstab, an dem wir unsere Arbeit messen.
          </Subtitle>
        </Container>
      </Hero>

      <Section>
        <Container>
          <Card>
            <CyberCorners $color={tokens.colors.primary} $size={10} />

            <ChapterNumber $color={tokens.colors.primary}>01</ChapterNumber>
            <ChapterTitle>Unsere Kunden</ChapterTitle>

            <Text>
              Die STARTPLATZ AI Academy GmbH versteht sich als überparteilicher, unpolitischer sowie
              konfessionell und weltanschaulich neutraler Arbeitsmarktdienstleister. Als zugelassener
              Träger nach der Akkreditierungs- und Zulassungsverordnung Arbeitsförderung (AZAV)
              unterstützen wir im Auftrag von Agenturen für Arbeit, Jobcentern sowie weiteren
              Arbeitsmarktakteuren die nachhaltige Integration von Arbeitssuchenden und von
              Arbeitslosigkeit bedrohten Personen in den Ausbildungs- und Arbeitsmarkt.
            </Text>
            <Text>
              Im Mittelpunkt unseres Handelns stehen die Teilnehmenden unserer Maßnahmen. Ziel unserer
              Angebote ist es, Beschäftigungsfähigkeit zu stärken, berufliche Perspektiven zu eröffnen
              und eine nachhaltige Integration in den Arbeitsmarkt zu fördern.
            </Text>
            <Text>
              Dabei verpflichten wir uns ausdrücklich zur Förderung von Chancengleichheit, insbesondere
              hinsichtlich Geschlecht, Herkunft, Alter, Religion, Behinderung oder sozialer Situation.
              Zudem berücksichtigen wir die Vereinbarkeit von Familie und Beruf bei der Planung und
              Durchführung unserer Maßnahmen.
            </Text>

            <SubTitle>Bildungsträger nach AZAV</SubTitle>
            <Text>
              Als zugelassener Bildungsträger bieten wir im Fachbereich 4 (FB4) der AZAV – Maßnahmen der
              beruflichen Weiterbildung – ein qualitätsgesichertes, arbeitsmarktorientiertes
              Bildungsangebot. Unsere Fort- und Weiterbildungsmaßnahmen orientieren sich an:
            </Text>
            <List>
              <Item>den aktuellen Anforderungen des Arbeitsmarktes</Item>
              <Item>den individuellen Kompetenzen und Entwicklungszielen der Teilnehmenden</Item>
              <Item>den Bedarfen von Unternehmen und Organisationen</Item>
            </List>

            <Text>Unsere Bildungsangebote unterstützen die Teilnehmenden dabei,</Text>
            <List>
              <Item>ihre fachlichen und persönlichen Kompetenzen auszubauen</Item>
              <Item>ihre Beschäftigungsfähigkeit nachhaltig zu verbessern</Item>
              <Item>eine Integration in den Arbeitsmarkt zu erreichen oder zu stabilisieren</Item>
            </List>

            <Text>
              Im Sinne des lebenslangen Lernens ermöglichen unsere Maßnahmen kontinuierliche
              Qualifizierung. Im Rahmen des Qualifizierungschancengesetzes tragen unsere Angebote darüber
              hinaus dazu bei, Beschäftigung zu sichern und den Verbleib im bestehenden
              Arbeitsverhältnis durch Weiterbildung zu unterstützen.
            </Text>
            <Text>
              Zur Sicherstellung und Weiterentwicklung unserer Bildungsqualität führen wir regelmäßige
              Teilnehmer- und Auftraggeberbefragungen durch und berücksichtigen die Ergebnisse
              systematisch bei der Weiterentwicklung unserer Angebote.
            </Text>
          </Card>

          <Card>
            <CyberCorners $color={tokens.colors.mint} $size={10} />

            <ChapterNumber $color={tokens.colors.mint}>02</ChapterNumber>
            <ChapterTitle>Ausrichtung am Ausbildungs- und Arbeitsmarkt</ChapterTitle>

            <Text>
              Die Entwicklung und Durchführung unserer Bildungsangebote orientiert sich konsequent an den
              Anforderungen des Ausbildungs- und Arbeitsmarktes.
            </Text>
            <Text>Zu unseren zentralen Aufgaben gehören:</Text>
            <List>
              <Item $color={tokens.colors.mint}>Analyse aktueller Entwicklungen des Arbeitsmarktes</Item>
              <Item $color={tokens.colors.mint}>Ermittlung der Bedarfe von Auftraggebern und Teilnehmenden</Item>
              <Item $color={tokens.colors.mint}>Konzeption arbeitsmarktorientierter Bildungsmaßnahmen</Item>
              <Item $color={tokens.colors.mint}>wirtschaftliche und erfolgreiche Durchführung von Maßnahmen</Item>
              <Item $color={tokens.colors.mint}>regelmäßige Evaluation und Weiterentwicklung unseres Angebots</Item>
            </List>
            <Text>
              Dabei berücksichtigen wir insbesondere die Anforderungen der Arbeitsförderung sowie die
              nachhaltige Integration der Teilnehmenden in die Beschäftigung.
            </Text>
          </Card>

          <Card>
            <CyberCorners $color={tokens.colors.navy} $size={10} />

            <ChapterNumber $color={tokens.colors.navy}>03</ChapterNumber>
            <ChapterTitle>Kontinuierlicher Verbesserungsprozess</ChapterTitle>

            <Text>
              Um den kontinuierlichen Verbesserungsprozess des Bildungsträgers STARTPLATZ AI Academy GmbH
              zu implementieren, werden folgende Schritte gelebt:
            </Text>
            <List>
              <Item $color={tokens.colors.navy}>
                <strong>Feedbacksystem etablieren:</strong> Regelmäßige Bewertungen durch Teilnehmer und
                Dozenten einführen, um Stärken und Verbesserungsbereiche zu identifizieren.
              </Item>
              <Item $color={tokens.colors.navy}>
                <strong>Datenanalyse:</strong> Feedback und Leistungsdaten zu angebotenen Maßnahmen und
                zum Arbeitsmarkt analysieren, um Trends und Problembereiche zu erkennen.
              </Item>
              <Item $color={tokens.colors.navy}>
                <strong>Zielsetzung:</strong> Klare Verbesserungsziele basierend auf der Analyse
                festlegen, wie bspw. Bestehensquoten bei Abschlussprüfungen, Verbesserung der
                Lehrmethoden, Erweiterung des Kursangebots, Steigerung der Teilnehmerzufriedenheit,
                Förderung der beruflichen Eingliederung durch Erhöhung der Vermittlungsquote von
                Absolventen in den Arbeitsmarkt.
              </Item>
              <Item $color={tokens.colors.navy}>
                <strong>Maßnahmenplanung und -umsetzung:</strong> Spezifische Maßnahmen zur Adressierung
                identifizierter Probleme entwickeln und umsetzen.
              </Item>
              <Item $color={tokens.colors.navy}>
                <strong>Überprüfung und Anpassung:</strong> Die Wirksamkeit der umgesetzten Maßnahmen
                regelmäßig überprüfen und bei Bedarf Anpassungen vornehmen.
              </Item>
            </List>

            <Text>
              Quantifizierbare Ziele für die STARTPLATZ AI Academy GmbH umfassen die Erhöhung der
              Bestehensquoten bei Abschlussprüfungen, die Steigerung der Teilnehmerzufriedenheit durch
              spezifische Bewertungsskalen und die Erhöhung der Vermittlungsquote von Absolventen in den
              Arbeitsmarkt. Diese Ziele lassen sich durch messbare Indikatoren wie Prozentwerte oder
              spezifische Zahlen ausdrücken und überwachen.
            </Text>

            <Text>Um die quantifizierbaren Ziele zu verbessern, werden folgende Maßnahmen ergriffen:</Text>
            <List>
              <Item $color={tokens.colors.navy}>
                <strong>Für erhöhte Bestehensquoten:</strong> Verbesserte Lehrmaterialien, zusätzliche
                Tutorien oder Prüfungsvorbereitungskurse anbieten.
              </Item>
              <Item $color={tokens.colors.navy}>
                <strong>Zur Steigerung der Teilnehmerzufriedenheit:</strong> Regelmäßige Umfragen
                durchführen, um Feedback zu sammeln und darauf basierend den Unterricht anzupassen.
              </Item>
              <Item $color={tokens.colors.navy}>
                <strong>Für höhere Vermittlungsquoten:</strong> Netzwerke mit Unternehmen und
                Organisationen aufbauen, Praktika arrangieren und Karriereberatung intensivieren.
              </Item>
            </List>

            <Text>
              Diese Schritte fördern eine Kultur der ständigen Verbesserung und helfen, die Qualität der
              Fort- und Weiterbildung kontinuierlich zu steigern.
            </Text>
          </Card>

          <Card>
            <CyberCorners $color={tokens.colors.orange} $size={10} />

            <ChapterNumber $color={tokens.colors.orange}>04</ChapterNumber>
            <ChapterTitle>Kommunikation und Überprüfung des Leitbildes</ChapterTitle>

            <Text>
              Das Leitbild wurde von der Geschäftsführung der STARTPLATZ AI Academy GmbH festgelegt und
              ist für alle Mitarbeitenden verbindlich. Es wird:
            </Text>
            <List>
              <Item $color={tokens.colors.orange}>allen Mitarbeitenden und Interessierten zugänglich gemacht</Item>
              <Item $color={tokens.colors.orange}>regelmäßig kommuniziert</Item>
              <Item $color={tokens.colors.orange}>im Rahmen des jährlichen internen Audits überprüft</Item>
              <Item $color={tokens.colors.orange}>bei Bedarf aktualisiert und weiterentwickelt</Item>
            </List>
            <Text>
              Damit stellen wir sicher, dass unser Leitbild dauerhaft die Grundlage unseres Handelns
              bildet und den Anforderungen der AZAV sowie den Entwicklungen des Arbeitsmarktes
              entspricht.
            </Text>
          </Card>

          <Meta>
            Leitbild der STARTPLATZ AI Academy · Stand: 15.06.2026 · Fragen an{' '}
            <Link href="mailto:academy@startplatz.de">academy@startplatz.de</Link>
          </Meta>
        </Container>
      </Section>
    </SubpageLayout>
  );
}
