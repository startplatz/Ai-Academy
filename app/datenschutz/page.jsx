'use client';

import React from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens, media } from '../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../styles/cyberpunk';

/* ─────────────────────────────────────────────
   DATENSCHUTZERKLÄRUNG – DSGVO-konform
   ───────────────────────────────────────────── */

const Section = styled.section`
  padding: ${tokens.spacing['4xl']} 0;
  background: transparent;
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

  &:first-child { margin-top: 0; }
`;

const SubTitle = styled.h3`
  font-family: ${tokens.fonts.display};
  font-size: ${tokens.fontSizes.lg};
  font-weight: ${tokens.fontWeights.semi};
  color: ${tokens.colors.text};
  margin-top: ${tokens.spacing.xl};
  margin-bottom: ${tokens.spacing.sm};
`;

const Text = styled.p`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.md};
`;

const List = styled.ul`
  margin: ${tokens.spacing.sm} 0 ${tokens.spacing.md};
  padding-left: ${tokens.spacing.xl};
`;

const ListItem = styled.li`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.textSoft};
  line-height: ${tokens.lineHeights.relaxed};
  margin-bottom: ${tokens.spacing.xs};
`;

const Link = styled.a`
  color: ${tokens.colors.primary};
  text-decoration: none;
  &:hover { text-decoration: underline; }
`;

export default function DatenschutzPage() {
  return (
    <SubpageLayout>
      <Hero>
        <Container>
          <Title>Datenschutzerklärung</Title>
        </Container>
      </Hero>

      <Section>
        <Container>
          <Card>
            <CyberCorners $color={tokens.colors.primary} $size={10} />

            <SectionTitle>1. Datenschutz auf einen Blick</SectionTitle>

            <SubTitle>Allgemeine Hinweise</SubTitle>
            <Text>
              Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
            </Text>

            <SubTitle>Datenerfassung auf dieser Website</SubTitle>
            <Text>
              <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br />
              Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
            </Text>
            <Text>
              <strong>Wie erfassen wir Ihre Daten?</strong><br />
              Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z.B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z.B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
            </Text>
            <Text>
              <strong>Wofür nutzen wir Ihre Daten?</strong><br />
              Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
            </Text>
            <Text>
              <strong>Welche Rechte haben Sie bezüglich Ihrer Daten?</strong><br />
              Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
            </Text>

            <SectionTitle>2. Hosting</SectionTitle>
            <Text>
              Wir hosten die Inhalte unserer Website bei Vercel Inc., 340 S Lemon Ave #4133, Walnut, CA 91789, USA. Details entnehmen Sie der Datenschutzerklärung von Vercel: <Link href="https://vercel.com/legal/privacy-policy" target="_blank" rel="noopener noreferrer">https://vercel.com/legal/privacy-policy</Link>.
            </Text>
            <Text>
              Die Verwendung von Vercel erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO. Die Einwilligung ist jederzeit widerrufbar.
            </Text>
            <Text>
              Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt.
            </Text>

            <SectionTitle>3. Allgemeine Hinweise und Pflichtinformationen</SectionTitle>

            <SubTitle>Datenschutz</SubTitle>
            <Text>
              Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung. Die Nutzung unserer Website ist in der Regel ohne Angabe personenbezogener Daten möglich.
            </Text>

            <SubTitle>Hinweis zur verantwortlichen Stelle</SubTitle>
            <Text>
              Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:
            </Text>
            <Text>
              STARTPLATZ AI Academy GmbH<br />
              Im Mediapark 5<br />
              50670 Köln<br /><br />
              E-Mail: <Link href="mailto:academy@startplatz.de">academy@startplatz.de</Link>
            </Text>
            <Text>
              Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z.B. Namen, E-Mail-Adressen o.Ä.) entscheidet.
            </Text>

            <SubTitle>Speicherdauer</SubTitle>
            <Text>
              Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
            </Text>

            <SubTitle>Widerruf Ihrer Einwilligung zur Datenverarbeitung</SubTitle>
            <Text>
              Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
            </Text>

            <SubTitle>Beschwerderecht bei der zuständigen Aufsichtsbehörde</SubTitle>
            <Text>
              Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde zu, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
            </Text>

            <SubTitle>Recht auf Datenübertragbarkeit</SubTitle>
            <Text>
              Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
            </Text>

            <SubTitle>Auskunft, Löschung und Berichtigung</SubTitle>
            <Text>
              Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit an uns wenden.
            </Text>

            <SectionTitle>4. Datenerfassung auf dieser Website</SectionTitle>

            <SubTitle>Server-Log-Dateien</SubTitle>
            <Text>
              Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:
            </Text>
            <List>
              <ListItem>Browsertyp und Browserversion</ListItem>
              <ListItem>verwendetes Betriebssystem</ListItem>
              <ListItem>Referrer URL</ListItem>
              <ListItem>Hostname des zugreifenden Rechners</ListItem>
              <ListItem>Uhrzeit der Serveranfrage</ListItem>
              <ListItem>IP-Adresse</ListItem>
            </List>
            <Text>
              Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen. Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
            </Text>

            <SubTitle>Kontaktformular / Newsletter</SubTitle>
            <Text>
              Wenn Sie uns per Kontaktformular Anfragen zukommen lassen oder sich für unseren Newsletter anmelden, werden Ihre Angaben aus dem Formular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).
            </Text>

            <SectionTitle>5. Externe Dienste und Inhalte</SectionTitle>

            <SubTitle>Google Fonts</SubTitle>
            <Text>
              Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Google Fonts, die von Google bereitgestellt werden. Die Google Fonts werden über einen CDN-Link geladen. Dabei wird eine Verbindung zu den Servern von Google hergestellt. Hierdurch erlangt Google Kenntnis darüber, dass über Ihre IP-Adresse diese Website aufgerufen wurde. Die Nutzung von Google Fonts erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Weitere Informationen finden Sie unter <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</Link>.
            </Text>

            <SubTitle>Cloudinary</SubTitle>
            <Text>
              Wir nutzen den Dienst Cloudinary zur Bereitstellung und Optimierung von Bildern und Medien auf unserer Website. Beim Abruf von Medieninhalten wird eine Verbindung zu den Servern von Cloudinary Ltd. hergestellt, wobei Ihre IP-Adresse übertragen wird. Weitere Informationen: <Link href="https://cloudinary.com/privacy" target="_blank" rel="noopener noreferrer">https://cloudinary.com/privacy</Link>.
            </Text>

            <SubTitle>Google Tag Manager</SubTitle>
            <Text>
              Diese Website nutzt den Google Tag Manager, einen Dienst der Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google"). Der Google Tag Manager ist ein Tag-Management-System, mit dem wir Website-Tags zentral über eine Oberfläche einbinden und verwalten können. Der Google Tag Manager selbst (der die Tags implementiert) ist eine cookielose Domain und erfasst keine personenbezogenen Daten. Der Dienst sorgt aber für die Auslösung anderer Tags, die ihrerseits Daten erfassen können (z.B. Google Analytics, Microsoft Clarity).
            </Text>
            <Text>
              Die Nutzung des Google Tag Managers erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an einer schnellen und unkomplizierten Einbindung und Verwaltung verschiedener Tools auf seiner Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar. Weitere Informationen: <Link href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">https://policies.google.com/privacy</Link>.
            </Text>

            <SubTitle>Google Analytics 4</SubTitle>
            <Text>
              Diese Website nutzt Funktionen des Webanalysedienstes Google Analytics 4. Anbieter ist die Google Ireland Limited, Gordon House, Barrow Street, Dublin 4, Irland („Google"). Google Analytics ermöglicht es uns, das Verhalten unserer Websitebesucher zu analysieren. Hierbei erhalten wir verschiedene Nutzungsdaten, wie z.B. Seitenaufrufe, Verweildauer, verwendete Betriebssysteme und Herkunft des Nutzers. Diese Daten werden in einer User-ID zusammengefasst und dem jeweiligen Endgerät des Websitebesuchers zugeordnet.
            </Text>
            <Text>
              Des Weiteren können wir mit Google Analytics 4 u.a. Ihre Maus- und Scrollbewegungen und Klicks aufzeichnen. Ferner verwendet Google Analytics 4 verschiedene Modellierungsansätze, um die erfassten Datensätze zu ergänzen, und setzt Machine-Learning-Technologien bei der Datenanalyse ein.
            </Text>
            <Text>
              Google Analytics nutzt Technologien, die die Wiedererkennung des Nutzers zum Zwecke der Analyse des Nutzerverhaltens ermöglichen (z.B. Cookies oder Device-Fingerprinting). Die von Google erfassten Informationen über die Benutzung dieser Website werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert.
            </Text>
            <Text>
              Die Nutzung dieses Dienstes erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung ist jederzeit widerrufbar. Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: <Link href="https://privacy.google.com/businesses/controllerterms/mccs/" target="_blank" rel="noopener noreferrer">https://privacy.google.com/businesses/controllerterms/mccs/</Link>.
            </Text>
            <Text>
              <strong>IP-Anonymisierung:</strong> In Google Analytics 4 ist die IP-Anonymisierung standardmäßig aktiviert. Dadurch wird Ihre IP-Adresse von Google innerhalb von Mitgliedstaaten der Europäischen Union oder in anderen Vertragsstaaten des Abkommens über den Europäischen Wirtschaftsraum vor der Übermittlung in die USA gekürzt.
            </Text>
            <Text>
              <strong>Browser-Plugin:</strong> Sie können die Erfassung und Verarbeitung Ihrer Daten durch Google verhindern, indem Sie das unter dem folgenden Link verfügbare Browser-Plugin herunterladen und installieren: <Link href="https://tools.google.com/dlpage/gaoptout?hl=de" target="_blank" rel="noopener noreferrer">https://tools.google.com/dlpage/gaoptout?hl=de</Link>.
            </Text>
            <Text>
              Weitere Informationen zum Umgang mit Nutzerdaten bei Google Analytics finden Sie in der Datenschutzerklärung von Google: <Link href="https://support.google.com/analytics/answer/6004245?hl=de" target="_blank" rel="noopener noreferrer">https://support.google.com/analytics/answer/6004245?hl=de</Link>.
            </Text>
            <Text>
              <strong>Auftragsverarbeitung:</strong> Wir haben mit Google einen Vertrag zur Auftragsverarbeitung abgeschlossen und setzen die strengen Vorgaben der deutschen Datenschutzbehörden bei der Nutzung von Google Analytics vollständig um.
            </Text>

            <SubTitle>Microsoft Clarity</SubTitle>
            <Text>
              Wir nutzen auf dieser Website Microsoft Clarity, einen Webanalysedienst der Microsoft Ireland Operations Limited, One Microsoft Place, South County Business Park, Leopardstown, Dublin 18, Irland („Microsoft"). Microsoft Clarity ermöglicht es uns, die Nutzung unserer Website durch Besucher besser zu verstehen, indem Maus- und Scrollbewegungen, Klicks sowie aggregierte Nutzungsdaten erfasst und in sogenannten Heatmaps und Session Recordings ausgewertet werden.
            </Text>
            <Text>
              Hierbei werden Informationen wie z.B. die aufgerufenen Seiten, Verweildauer, Klick-/Scroll-Verhalten, Browsertyp, Betriebssystem, Spracheinstellungen, Referrer-URL sowie eine gekürzte/maskierte IP-Adresse erfasst. Microsoft Clarity maskiert standardmäßig sensible Eingabefelder (z.B. Passwörter, Zahlungsdaten); zusätzlich haben wir die strikte Maskierung („Mask") aktiviert, sodass eingegebene Texte nicht im Klartext aufgezeichnet werden.
            </Text>
            <Text>
              Microsoft Clarity setzt Cookies und ähnliche Technologien zur Wiedererkennung von Endgeräten ein. Die erfassten Daten werden an Server von Microsoft übertragen und dort gespeichert; eine Übermittlung in die USA kann nicht ausgeschlossen werden.
            </Text>
            <Text>
              Die Nutzung von Microsoft Clarity erfolgt auf Grundlage Ihrer Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TDDDG. Die Einwilligung erteilen Sie über unser Cookie-Banner beim ersten Besuch der Website; sie ist jederzeit mit Wirkung für die Zukunft widerrufbar — über den Link „Cookie-Einstellungen“ im Seitenfuß. Die Datenübertragung in die USA wird, soweit erforderlich, auf die Standardvertragsklauseln der EU-Kommission gestützt.
            </Text>
            <Text>
              Weitere Informationen zur Datenverarbeitung durch Microsoft Clarity finden Sie in der Datenschutzerklärung von Microsoft: <Link href="https://privacy.microsoft.com/de-de/privacystatement" target="_blank" rel="noopener noreferrer">https://privacy.microsoft.com/de-de/privacystatement</Link> sowie in den Informationen zu Clarity: <Link href="https://learn.microsoft.com/en-us/clarity/setup-and-installation/cookie-list" target="_blank" rel="noopener noreferrer">https://learn.microsoft.com/en-us/clarity/setup-and-installation/cookie-list</Link>.
            </Text>

            <SectionTitle>6. Änderung dieser Datenschutzerklärung</SectionTitle>
            <Text>
              Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
            </Text>
            <Text>
              Stand: April 2026
            </Text>
          </Card>
        </Container>
      </Section>
    </SubpageLayout>
  );
}
