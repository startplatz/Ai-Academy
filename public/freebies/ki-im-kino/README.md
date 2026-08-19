# Kino-Skill-Paket

Neun Skills für den Kinoalltag, gebaut für die KinoConnect E-Academy am 20. August 2026.
Von der STARTPLATZ AI Academy, Köln.

Jeder Skill ist eine Anleitung in normaler Sprache, keine Software. Sie können jede Datei mit einem Texteditor öffnen, lesen und ändern. Das ist ausdrücklich erwünscht, ein Skill, der nicht an Ihr Haus angepasst wird, bleibt halb so nützlich.

---

## Fangen Sie hier an

**Installieren Sie zuerst nur einen Skill: `kino-hausprofil`. Und nehmen Sie sich eine halbe Stunde dafür.**

Das Hausprofil ist eine Textdatei mit den Fakten Ihres Hauses: Säle, Preise, Ermäßigungen, Barrierefreiheit, Reihen, und vor allem, wie Ihr Haus klingt. Sechs der acht anderen Skills lesen diese Datei; nur das Markt-Briefing und die Förderdokumentation arbeiten ohne sie.

Ohne Hausprofil erzeugen die Skills Texte, die für jedes Kino passen würden. Die Unterscheidbarkeit kommt aus dieser Datei, nicht aus den Skills.

### Wo die Datei liegen muss

Ein Skill hat in Claude oder ChatGPT **kein dauerhaftes Arbeitsverzeichnis.** Er kann sich zwischen zwei Unterhaltungen nichts merken. Wenn Sie das Hausprofil einmal erstellen und dann nächste Woche einen Newsletter anfordern, ist die Datei nicht automatisch da.

Sie haben drei Möglichkeiten, und eine davon sollten Sie sich zur Gewohnheit machen:

- **In Claude:** Legen Sie ein Projekt an (etwa „Kino") und hinterlegen Sie `hausprofil.md` dort in den Projektdateien. Dann steht sie in jeder Unterhaltung innerhalb dieses Projekts zur Verfügung. Das ist der bequemste Weg.
- **In ChatGPT:** Legen Sie das Hausprofil als Projektdatei ab oder hängen Sie es an die Unterhaltung an.
- **Immer möglich:** die Datei bei jedem Chat als Anhang mitschicken. Funktioniert überall, kostet zehn Sekunden.

**Wenn ein Ergebnis generisch wirkt, liegt es fast immer daran und nicht am Skill.** Prüfen Sie zuerst, ob das Hausprofil in dieser Unterhaltung überhaupt vorliegt.

Danach installieren Sie den Skill, der Ihr größtes Zeitproblem trifft. Meistens ist das `kino-wochenprogramm`.

Alle Skills folgen dem offenen Agent-Skills-Standard, laufen also in Claude ebenso wie in ChatGPT. Bei den ChatGPT-Tarifen gibt es eine Einschränkung, siehe unten.

---

## Die neun Skills

| Skill | Was er tut | Wann er sich lohnt |
|---|---|---|
| **kino-hausprofil** | Legt die Faktendatei Ihres Hauses an und pflegt sie | Zuerst. Immer. |
| **kino-wochenprogramm** | Erzeugt aus dem fixierten Spielplan alle Textkanäle: Website, Aushang, Flyer, Newsletter-Block, Social | Montag bis Mittwoch, wenn das Programm ab Donnerstag steht |
| **kino-newsletter** | Schreibt den Stammgäste-Newsletter komplett aus, mit mehreren Betreffzeilen zur Auswahl | Wöchentlich, und bei Sonder-Mailings |
| **kino-gaesteanfragen** | Beantwortet Gästeanfragen aus Ihren Hausdaten und benennt Lücken statt zu raten | Täglich. Der Skill mit dem schnellsten Effekt |
| **kino-marktbriefing** | Wöchentliches Briefing zu Filmstarts, Startterminverschiebungen, Chart-Entwicklung und Branchennews, auch als HTML-Dashboard | Montags, vor der Disposition |
| **kino-social-redaktionsplan** | Baut einen Postingplan über zwei bis vier Wochen mit lokalem Dreh und hauseigenen Formaten | Wenn Social Media nebenbei läuft und deshalb einschläft |
| **kino-filmreihe** | Entwickelt Reihen- und Veranstaltungskonzepte inklusive Begründung, Ankündigung und Presseinfo | Bei jeder neuen Reihe. Und weil Reihen förderrelevant sind |
| **kino-verleihkorrespondenz** | Formuliert Mails an Verleiher: Terminanfrage, Bestellung, Verlängerung, Absetzung, fehlendes Material | Laufend. Der dritte große Textblock neben Programm und Gästen |
| **kino-programmpraemie** | Sortiert das Jahresprogramm nach Förderkriterien, prüft Booster-Kriterien, schreibt Begründungstexte | Vor jeder Förderfrist. Besser: das ganze Jahr über |

---

## Connectoren: was die Skills erst richtig nützlich macht

Ein Skill weiß, wie eine Aufgabe in Ihrem Haus erledigt wird. Er weiß nicht, dass gerade eine Gästeanfrage im Postfach liegt oder wo Ihr Spielplan gespeichert ist. Dafür gibt es Connectoren, also Verbindungen zu den Programmen, in denen Ihre Arbeit ohnehin liegt.

**Connector ohne Skill ist Zugriff ohne Verfahren. Skill ohne Connector ist Verfahren ohne Zugriff.** Zusammen ersetzen sie Copy-Paste.

Sechs der neun Skills nutzen einen Connector, wenn einer da ist, und funktionieren ohne genauso:

| Skill | Connector | Was sich ändert |
|---|---|---|
| kino-gaesteanfragen | Gmail oder Microsoft 365 | Anfrage wird im Thread gelesen, Antwortentwurf landet im Postfach |
| kino-verleihkorrespondenz | Gmail oder Outlook, plus Drive | Vorgeschichte des Threads wird gelesen, Verträge kommen aus Drive |
| kino-wochenprogramm | Google Drive | Spielplan kommt aus der Tabelle |
| kino-programmpraemie | Google Drive | Besucherzahlen kommen aus dem Sheet |
| kino-filmreihe | Google Kalender | Freie Termine und Kollisionen kommen aus dem Betriebskalender |
| kino-social-redaktionsplan | Notion oder Google Sheets | Der Plan entsteht im Werkzeug und wird beim nächsten Lauf fortgeschrieben |

Ohne Connector: kino-hausprofil, kino-newsletter, kino-marktbriefing.

**Was es nicht gibt, und das ehrlich vorweg:** Für Kassen- und Ticketsysteme existiert kein Connector. Nicht für cinetixx, nicht für Compeso, nicht für Vista, nicht für kinoheld. Auch nicht für Mailchimp oder CleverReach. Der Weg dorthin führt über Zapier, über einen selbst gebauten Anschluss, oder über einen Export als Datei.

### Tarif und Auftragsverarbeitungsvertrag

**Sobald ein Connector auf ein Postfach oder auf Gästedaten zeigt, brauchen Sie einen Team- oder Business-Tarif.** Der Grund liegt im Auftragsverarbeitungsvertrag nach Artikel 28 DSGVO, nicht in der Funktion. Den bekommen Sie bei Anthropic nur für Claude Team, Enterprise und die API, bei OpenAI nur für Business, Enterprise und die API. Für Claude Pro und ChatGPT Plus gibt es ihn nicht.

Dahinter steht mehr als eine Formalie: In den Privattarifen wird auf Nutzerdaten trainiert, und der Landesbeauftragte für Datenschutz in Baden-Württemberg weist darauf hin, dass die Auftragsverarbeitung als Konstruktion zerfällt, wenn eingegebene Daten der Verbesserung der Anwendung dienen. Dort wäre der Vertrag also auch das falsche Instrument.

Zwei praktische Empfehlungen, die wenig kosten und viel absichern:
- **Nicht das Hauptpostfach anschließen.** Ein dediziertes Konto oder ein abgegrenzter Ordner. Ein Hauptpostfach enthält Bewerbungen, Krankmeldungen und Vertragsdaten, die nie für KI-Verarbeitung gedacht waren.
- **Die Bestätigungspflicht für Aktionen aktiviert lassen.** E-Mail-Versand und Dateifreigabe sollten immer eine Rückfrage auslösen.

Quellen: [Anthropic zum Data Processing Addendum](https://support.claude.com/en/articles/7996862-how-do-i-view-and-sign-your-data-processing-addendum-dpa) · [OpenAI Enterprise privacy](https://openai.com/enterprise-privacy/) · [LfDI Baden-Württemberg zu Rechtsgrundlagen beim KI-Einsatz](https://www.baden-wuerttemberg.datenschutz.de/rechtsgrundlagen-datenschutz-ki/) · [Anthropic zu Google-Workspace-Connectoren](https://support.claude.com/en/articles/10166901-use-google-workspace-connectors)

---

## Installation

Die Skills folgen dem offenen Agent-Skills-Standard und funktionieren deshalb in Claude und in ChatGPT. Der Installationsweg unterscheidet sich.

### In Claude (Claude.ai, Desktop, Cowork)

1. Öffnen Sie **Einstellungen → Capabilities** und stellen Sie sicher, dass die Code-Ausführung aktiviert ist. Ohne diese Einstellung erscheinen keine Skills.
2. Gehen Sie auf **Customize → Skills**, klicken Sie auf **+**, dann **Create skill → Upload a skill**.
3. Laden Sie die gewünschte ZIP-Datei aus diesem Paket hoch (etwa `kino-newsletter.zip`).
4. In einem Team- oder Enterprise-Account muss der Owner Skills vorher unter **Organization settings → Skills** freigeben.

Skills sind bei Claude auch im kostenlosen Tarif verfügbar.

### In ChatGPT

1. Öffnen Sie in der Seitenleiste **Plugins** und dort den Reiter **Skills**.
2. Über **Create → Upload from your computer** fügen Sie den Skill hinzu.
3. ChatGPT zieht passende Skills selbständig heran, wenn sie zur Anfrage passen.

**Eine Einschränkung vorweg.** Skills sind bei OpenAI nur in **ChatGPT Business, Enterprise, Healthcare und Edu** verfügbar, **nicht in Free, Go, Plus oder Pro.** Wenn Sie ein Einzelabo haben, funktioniert dieser Weg nicht; bei Claude gibt es Skills dagegen auch im kostenlosen Tarif. Für die Weitergabe mehrerer Skills an ein Team bündelt OpenAI Skills in Plugins.

### In Claude Code

Entpacken Sie den Skill-Ordner nach `~/.claude/skills/<skill-name>/` für alle Projekte oder nach `.claude/skills/<skill-name>/` innerhalb eines Projekts. Kein Upload nötig, die Änderungen greifen sofort.

### Wenn etwas nicht funktioniert

**Der Skill wird nicht gefunden.** Das liegt fast immer an der Beschreibungszeile, nicht an der Installation. Formulieren Sie Ihre Anfrage konkreter, oder ergänzen Sie in der `description` in der SKILL.md die Wörter, die Sie tatsächlich benutzen. Diese Zeile ist der einzige Mechanismus, über den das Werkzeug gefunden wird, sie darf gerne Ihre Hausbegriffe enthalten.

**Der Upload wird abgelehnt.** Prüfen Sie, ob die ZIP-Datei den Ordner enthält und nicht die Dateien direkt in der Wurzel. Die Struktur muss `kino-newsletter/SKILL.md` sein, nicht `SKILL.md`. Die Dateien in diesem Paket sind schon so gebaut, das Problem tritt erst auf, wenn Sie einen Skill selbst neu packen.

---

## Wie Sie die Skills anpassen

Öffnen Sie die `SKILL.md` in einem Texteditor. Sie finden oben einen kurzen Block zwischen zwei Linien mit drei Bindestrichen. Dort stehen Name und Beschreibung. Darunter steht die Anleitung.

**Was Sie gefahrlos ändern können:** alles unterhalb des Blocks. Regeln ergänzen, Beispiele einsetzen, Abschnitte streichen, die Sie nicht brauchen. Streichen ist oft die beste Änderung.

**Was Sie vorsichtig ändern sollten:** die `description`. Sie entscheidet, ob der Skill gefunden wird. Ergänzen Sie gerne Ihre eigenen Formulierungen, aber löschen Sie nichts heraus.

**Was Sie nicht ändern sollten:** den `name` und den Ordnernamen. Beide müssen übereinstimmen, sonst wird der Skill nicht geladen.

**Wenn Sie eine Regel dreimal per Hand korrigiert haben,** gehört sie in den Skill oder ins Hausprofil. So entsteht ein brauchbares Werkzeug: durch Korrekturen, nicht durch einen guten ersten Entwurf.

---

## Was diese Skills nicht sind

**Sie ersetzen nicht Ihr Kino-CMS.** Wenn Sie mit Cineprog, CINEWEB oder dem Marketing Hub Ihres Kassensystems arbeiten, laufen dort Filmdaten, Trailer, Plakate, generische Beschreibungen und teilweise der automatische Versand. Das ist gelöst und bleibt gelöst. Diese Skills liefern das, was ein automatisiertes System nicht wissen kann: was Ihr Haus von einem anderen unterscheidet.

**Sie ersetzen nicht die Endredaktion.** Alles, was nach außen geht, sollte ein Mensch gelesen haben. Das ist Markenpflege, nicht Vorsicht. Clare Reddington, Geschäftsführerin des Watershed in Bristol, sagt, das Publikum stelle zu Recht viele Fragen zum KI-Einsatz, und: „Unser Ton, unsere Kommunikation mit dem Publikum und unsere Filmkuratierung sind das Wichtigste, das wir haben."

**Sie erfinden keine Zahlen.** Alle Skills sind darauf gebaut, bei fehlenden Angaben eine sichtbare Lücke zu lassen statt einen plausiblen Wert einzusetzen. Wenn in einem Ergebnis `[PREIS PRÜFEN]` steht, ist das die richtige Funktionsweise und nicht ein Fehler.

**Sie sind keine Förderberatung.** Der Programmprämien-Skill hilft beim Sortieren, Rechnen und Formulieren. Was anerkannt wird, entscheidet die Förderstelle.

---

## Was in ein Hausprofil gehört und was nicht

Hinein: Betriebsdaten. Säle, Preise, Öffnungszeiten, Barrierefreiheit, Reihen, Tonalität, Ansprechpartner nach Funktion.

Nicht hinein: personenbezogene Gästedaten. Keine Adresslisten, keine Newsletter-Empfänger, keine Buchungshistorien. Für Newsletter gilt unverändert Double-Opt-In nach DSGVO, daran ändern diese Skills nichts.

---

## Wer das im Haus pflegt

Es gibt drei Rollen, auch in einem Haus mit vier Leuten.

**Anwenden:** alle. Ein Skill wird benutzt, indem man normal fragt.

**Pflegen:** eine Person, und zwar die, die das Geschäft am besten kennt. Meist dieselbe, die heute die Newsletter freigibt. Die Aufgabe ist redaktionell, nicht technisch. Sobald es mehr wird, geben Sie die Rolle ausdrücklich an jemanden, statt sie zwischen allen zu verteilen.

**Freigeben:** die Leitung, und zwar für zwei Dinge: was ins Hausprofil darf (Preise, verbindliche Aussagen) und was ungeprüft nach außen darf. Die Antwort auf das Zweite sollte „nichts" sein.

---

## Ein Hinweis, der Ihnen später Arbeit erspart

Wenn ein neues KI-Modell erscheint, funktionieren alte Anleitungen manchmal schlechter. Nicht weil das Modell schwächer ist, sondern weil die Anleitung gegen Schwächen anschreibt, die es nicht mehr gibt. Anthropic empfiehlt in seinen Prompting-Hinweisen für den Wechsel auf aktuelle Modelle ausdrücklich, Zwangsformulierungen wie „CRITICAL: You MUST" zurückzunehmen und durch normale Sprache zu ersetzen. Für einzelne, wirklich kritische Regeln bleibt eine klare Muss-Formulierung dagegen sinnvoll, es geht um das reflexhafte Anschreien, nicht um Deutlichkeit an der richtigen Stelle.

Diese Skills sind entsprechend geschrieben: erklärend statt befehlend. Wenn Sie sie erweitern, halten Sie es genauso. **Und wenn nach einem Modellwechsel etwas seltsam wird, ist die Antwort meistens Streichen, nicht Hinzufügen.**

Ein halbstündiges Review pro Modellwechsel genügt.

---

## Weitere Skills, die sich lohnen

Siehe `LINKLISTE.md` im Paket: kuratiert, mit Datum, und mit einem Satz dazu, warum jeder Eintrag draufsteht.

---

## Lizenz und Nutzung

CC-BY-4.0. Sie dürfen die Skills verwenden, ändern und weitergeben, auch innerhalb Ihres Hauses und an Kolleginnen und Kollegen in anderen Häusern. Ein Hinweis auf die Herkunft genügt.

Wenn Sie einen Skill verbessern und die Verbesserung allgemein nützlich ist: Wir freuen uns über eine Nachricht.

**STARTPLATZ AI Academy GmbH**
Im Mediapark 5, 50670 Köln
https://startplatz-ai-academy.de/

Stand: 18. August 2026
