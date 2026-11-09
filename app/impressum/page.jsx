'use client';

import React from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';

/* ─────────────────────────────────────────────
   IMPRESSUM – Anbieterkennzeichnung nach § 5 DDG
   (das TMG gilt seit 14.05.2024 nicht mehr)
   Geschäftsführer laut Handelsregister HRB 68126 (Abruf 03.08.2026).
   Keine „Leitung“-Angabe: keine Pflichtangabe (Entscheidung Martin, 09.11.2026).
   § 18 Abs. 2 MStV: bewusst kein Verantwortlicher benannt
   (Entscheidung Martin Greguletz, 09.11.2026).
   ───────────────────────────────────────────── */

const Section = styled.section`
  padding: ${tokens.spacing['4xl']} 0;
  background: ${tokens.colors.pageBg};
  min-height: 60vh;
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
`;

const Title = styled.h1`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-bottom: ${tokens.spacing.md};
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

const SectionTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.xl};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  margin-top: ${tokens.spacing['2xl']};
  margin-bottom: ${tokens.spacing.md};
  overflow-wrap: anywhere;

  &:first-child { margin-top: 0; }
`;

const Text = styled.p`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.md};
  overflow-wrap: anywhere;
`;

const Link = styled.a`
  color: ${tokens.colors.primary};
  text-decoration: none;
  overflow-wrap: anywhere;
  &:hover { text-decoration: underline; }
`;

const Pending = styled.span`
  display: inline-block;
  padding: 2px 8px;
  background: ${tokens.colors.primaryLighter};
  color: ${tokens.colors.primary};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  border-radius: 4px;
`;

export default function ImpressumPage() {
  return (
    <SubpageLayout>
      <Hero>
        <Container>
          <Title>Impressum</Title>
        </Container>
      </Hero>

      <Section>
        <Container>
          <Card>
            <CyberCorners $color={tokens.colors.primary} $size={10} />

            <SectionTitle>Angaben gemäß § 5 DDG</SectionTitle>
            <Text>
              <strong>STARTPLATZ AI Academy GmbH</strong><br />
              Im Mediapark 5<br />
              50670 Köln<br />
              Deutschland
            </Text>

            <SectionTitle>Vertreten durch</SectionTitle>
            <Text>
              Geschäftsführer: Dr. Lorenz Gräf, Matthias Gräf, Jakow Smirin<br />
              Sitz der Gesellschaft: Köln
            </Text>

            <SectionTitle>Kontakt</SectionTitle>
            <Text>
              E-Mail: <Link href="mailto:academy@startplatz.de">academy@startplatz.de</Link><br />
              Telefon: <Link href="tel:+4922196881273">+49 221 96881273</Link>
            </Text>

            <SectionTitle>Handelsregister</SectionTitle>
            <Text>
              Registergericht: Amtsgericht Köln<br />
              Registernummer: HRB 68126
            </Text>

            <SectionTitle>Umsatzsteuer-Identifikationsnummer</SectionTitle>
            <Text>
              USt-IdNr. gemäß § 27 a Umsatzsteuergesetz:<br />
              DE279993463
            </Text>

            <SectionTitle>Verbraucherstreitbeilegung/Universalschlichtungsstelle</SectionTitle>
            <Text>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
            </Text>

            <SectionTitle>Haftungsausschluss</SectionTitle>

            <Text><strong>Haftung für Inhalte</strong></Text>
            <Text>
              Für eigene Inhalte auf diesen Seiten sind wir nach den allgemeinen Gesetzen verantwortlich. Eine allgemeine Pflicht, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen, besteht nicht (Art. 8 Digital Services Act, Verordnung (EU) 2022/2065). Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
            </Text>

            <Text><strong>Haftung für Links</strong></Text>
            <Text>
              Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
            </Text>

            <Text><strong>Urheberrecht</strong></Text>
            <Text>
              Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet, soweit bei einzelnen Inhalten nichts anderes angegeben ist (zum Beispiel eine Creative-Commons-Lizenz oder das Pressematerial unter <Link href="/presse">Presse &amp; Medien</Link>). Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
            </Text>
          </Card>
        </Container>
      </Section>
    </SubpageLayout>
  );
}
