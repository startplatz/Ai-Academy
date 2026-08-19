# Linkliste: Skills, die sich lohnen

Kuratiert am 18. August 2026 für die KinoConnect E-Academy. Jeder Eintrag mit einem Satz dazu, warum er draufsteht.

**Eine Warnung vorweg, die für diese ganze Liste gilt.** Viele geteilte Skills und Prompt-Sammlungen im Netz sind für ältere Modelle geschrieben. Sie enthalten Formulierungen wie „CRITICAL: You MUST" oder erzwungene Prüfschritte, die gegen Schwächen anschreiben, die aktuelle Modelle nicht mehr haben. Das Ergebnis ist doppelte Arbeit, höhere Kosten und manchmal schlechtere Qualität. Anthropic empfiehlt in seinen Prompting-Hinweisen für den Wechsel auf aktuelle Modelle ausdrücklich, solche Zwangsformulierungen zu **streichen** statt sie umzuschreiben. Das heißt nicht, dass Deutlichkeit schädlich wäre, an einzelnen wirklich kritischen Stellen empfiehlt die Skills-Dokumentation weiterhin klare Muss-Formulierungen. Es geht um das reflexhafte Anschreien.

Achten Sie deshalb auf zwei Dinge, bevor Sie etwas übernehmen: **Wann war der letzte Commit?** Und: **Klingt die Anleitung befehlend oder erklärend?** Wenn Sie einen älteren Skill nützlich finden, ist die beste erste Änderung meist, die Großbuchstaben-Befehle in normale Sätze umzuschreiben.

---

## Inhalt

1. Der Standard selbst
2. Sammelstellen
3. Gegen generisches KI-Schreiben
4. Kürzer und billiger antworten
5. Dokumente und Tabellen
6. Recherche
7. Wie Sie einen eigenen Skill schreiben
8. Wenn Sie tiefer einsteigen wollen

---

## 1. Der Standard selbst

**agentskills.io** — https://agentskills.io/specification
Die verbindliche Spezifikation. Anthropic hat das Skill-Format am 18. Dezember 2025 als offenen Standard freigegeben; OpenAI verweist in seiner eigenen API-Dokumentation darauf. Wenn Sie wissen wollen, welche Felder erlaubt sind und wie ein Skill aufgebaut sein muss, ist das die Quelle, und nicht ein Blogartikel.
Ergänzend: https://agentskills.io/clients zeigt, welche Werkzeuge den Standard unterstützen.

**Anthropic-Dokumentation zu Skills** — https://platform.claude.com/docs/en/agents-and-tools/agent-skills/overview
Die praxisnähere Einführung, inklusive Best Practices unter `/best-practices`. Hier steht auch die beste verfügbare Anleitung dazu, wie eine Beschreibungszeile formuliert sein muss, damit ein Skill gefunden wird.

**Anleitung für Claude.ai und Cowork** — https://support.claude.com/en/articles/12512180-use-skills-in-claude
Der Weg von der ZIP-Datei zum installierten Skill, Schritt für Schritt.

**Skills in ChatGPT** — https://help.openai.com/en/articles/20001066-skills-in-chatgpt
Das Gegenstück auf der OpenAI-Seite, inklusive der Information, welche Tarife Skills unterstützen.

---

## 2. Sammelstellen

**anthropics/skills** — https://github.com/anthropics/skills
Die offizielle Sammlung. Enthält unter anderem die Skills für Word-, PDF-, PowerPoint- und Excel-Dateien und eine Vorlage für eigene Skills. Der sicherste Ausgangspunkt, weil hier nichts veraltet liegen bleibt.

**ComposioHQ/awesome-claude-skills** — https://github.com/ComposioHQ/awesome-claude-skills
Die größte kuratierte Community-Liste, sehr aktiv gepflegt. Gut zum Stöbern, aber prüfen Sie bei jedem verlinkten Skill selbst das Commit-Datum.

**VoltAgent/awesome-agent-skills** — https://github.com/VoltAgent/awesome-agent-skills
Interessant, weil ausdrücklich plattformübergreifend sortiert: Claude Code, Codex, Gemini CLI, Cursor. Die richtige Liste, wenn Sie nicht auf einen Anbieter festgelegt sein wollen.

**officialskills.sh** — https://officialskills.sh
Skills, die von den Herstellern selbst gepflegt werden statt von der Community. Deutlich kleiner, aber verlässlicher.

---

## 3. Gegen generisches KI-Schreiben

Das ist für ein Kino kein Kosmetikthema. Ein Text, der klingt wie jeder andere, verspielt genau das, was ein Haus von einem anderen unterscheidet.

**humanizer** — https://github.com/blader/humanizer
Der beste Vertreter dieser Kategorie. Arbeitet in zwei Durchgängen: erst umschreiben, dann das eigene Ergebnis auf verbleibende KI-Marker prüfen. Als Grundlage dient die Musterliste aus Wikipedias „Signs of AI writing", also eine externe und nachprüfbare Quelle statt Geschmack. Kann außerdem an einer Textprobe lernen, wie Sie schreiben.
*Warum er draufsteht: Der Selbstprüfungs-Durchgang ist der Unterschied zwischen „klingt weniger nach KI" und „klingt nach Ihnen".*

**stop-slop** — https://github.com/hardikpandya/stop-slop
Macht es messbar. Bewertet einen Text auf fünf Achsen von 1 bis 10: Direktheit, Rhythmus, Vertrauen in den Leser, Authentizität, Dichte. Unter 35 von 50 heißt überarbeiten. Funktioniert auch als reines Textschnipsel, ist also plattformunabhängig.
*Warum er draufsteht: Eine Zahl macht Diskussionen im Team kürzer als „ich finde, das klingt komisch".*

---

## 4. Kürzer und billiger antworten

**caveman** — https://github.com/JuliusBrussee/caveman
Der Skill, der die KI wie ein Höhlenmensch antworten lässt: „why use many token when few token do trick". Artikel weg, Füllwörter weg, Höflichkeitsfloskeln weg. Der Autor gibt rund 65 Prozent weniger Ausgabetext über zehn Testaufgaben an. Vier Stufen: `lite`, `full`, `ultra` und `wenyan` (klassisches Chinesisch, ja, wirklich). Letzter Commit Mai 2026.

*Warum er auf dieser Liste steht, obwohl niemand seinen Newsletter im Höhlenmenschen-Stil schreiben will:* Weil er in fünf Sekunden zeigt, was ein Skill überhaupt ist. Und weil in ihm eine Zeile steht, die jeder in seine eigenen Skills übernehmen sollte:

> „Never drop not/never/no/only/except — flip meaning worse than any token saved."

Also: Verneinungen bleiben stehen, egal wie stark gekürzt wird. Zahlen, Einheiten und Fachbegriffe auch. **Belastbar wird eine Regel erst durch ihre Ausnahmen.** Für ein Kino heißt das: „Kürze die Filmbeschreibung" ist ein Prompt. „Kürze die Filmbeschreibung, aber FSK, Fassung und Laufzeit stehen nie zur Diskussion" ist ein Skill.

*Ein Hinweis zur Ehrlichkeit:* Die 65 Prozent betreffen die Ausgabe, nicht das interne Nachdenken des Modells. Der Autor sagt das selbst.

---

## 5. Dokumente und Tabellen

**docx, xlsx, pptx, pdf** — https://github.com/anthropics/skills
Diese vier sind der Grund, warum Claude überhaupt saubere Word-, Excel-, PowerPoint- und PDF-Dateien erzeugt. Für ein Kino relevant bei allem, was formatiert eingereicht werden muss: Förderunterlagen, Zuschauertabellen im vorgegebenen Format, Präsentationen für Gesellschafter oder Stadtrat.
*Warum sie draufstehen: Wenn Sie eine Excel-Tabelle im Vorgabeformat einer Förderstelle brauchen, ist das der Unterschied zwischen einer Datei und einer brauchbaren Datei.*

---

## 6. Recherche

**Firecrawl Web Search** — https://officialskills.sh/firecrawl/skills/firecrawl-build-search
Vom Hersteller gepflegt, für strukturiertes Auslesen von Webseiten. Relevant, wenn Sie das Markt-Briefing aus diesem Paket automatisieren wollen. Die Kinoquellen liefern HTML, keine Datenschnittstelle.

**Skill_Seekers** — https://github.com/yusufkaraaslan/Skill_Seekers
Wandelt Dokumentationen und PDFs in Skills um. Der interessante Anwendungsfall für ein Kino: aus einer Förderrichtlinie oder einem Handbuch einen Skill machen, der die Regeln kennt.
*Mit Vorbehalt: Prüfen Sie das Ergebnis. Ein automatisch erzeugter Skill aus einem 80-seitigen PDF ist meist zu lang und muss gekürzt werden.*

---

## 7. Wie Sie einen eigenen Skill schreiben

Sie brauchen dafür kein Werkzeug. Ein Texteditor genügt.

1. Legen Sie einen Ordner an, kleingeschrieben, mit Bindestrichen: `kino-gutscheinfragen`
2. Legen Sie darin eine Datei `SKILL.md` an
3. Schreiben Sie oben hinein:

```
---
name: kino-gutscheinfragen
description: Beantwortet Fragen zu Gutscheinen des Hauses. Verwende diesen Skill,
  wenn jemand nach Gutscheinen, Gültigkeit, Restbetrag oder Einlösung fragt.
---
```

4. Darunter schreiben Sie in normalen Sätzen, wie die Aufgabe zu erledigen ist. Erklären Sie das Warum und nicht nur das Was. Die Modelle sind gut darin, aus einer Begründung die richtigen Einzelfälle abzuleiten.
5. Packen Sie den Ordner in eine ZIP-Datei und laden Sie sie hoch.

**Drei Regeln, die die häufigsten Fehler verhindern:**

- Der Ordnername und der `name` im Kopf müssen gleich sein. Kleinbuchstaben, Bindestriche, keine Umlaute, keine Leerzeichen.
- Die `description` braucht beides: was das Ding tut **und wann** es benutzt werden soll. Der zweite Teil zählt mehr. Ohne ihn wird der Skill nicht gefunden.
- Schreiben Sie erklärend, nicht befehlend. Kein „DU MUSST IMMER". Ein Satz, der begründet, wirkt bei aktuellen Modellen besser als eine Anweisung, die schreit.

**Und die Regel, auf die es am Ende ankommt:** Fangen Sie mit der Aufgabe an, die Sie diese Woche zum dritten Mal erklärt haben. Schreiben Sie auf, was Sie jedes Mal dazusagen müssen. Das ist Ihr erster Skill, verbessern können Sie ihn bei jeder Nutzung.

---

## 8. Wenn Sie tiefer einsteigen wollen

**Prompting-Hinweise von Anthropic** — https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices
Enthält den Abschnitt zum Übertriggern, der erklärt, warum alte Anleitungen mit neuen Modellen Probleme machen. Die praktisch nützlichste Seite der ganzen Dokumentation, wenn Sie Skills pflegen.

**Kinoleitfaden** — https://kinoleitfaden.de/
Kein KI-Thema, aber die beste Grundlage für die Inhalte, die Sie in Ihre Skills schreiben. FFA-gefördert, erstellt mit AG Kino – Gilde, HDF KINO und dem Verband der Filmverleiher, 19 Kapitel von Filmwirtschaft über Abrechnung bis Inklusion.

**Digital Marketing Cinema** — https://www.agkino.de/online-lehrgang-und-training-digital-marketing-cinema/
Viermonatiger Online-Lehrgang der drei Kinoverbände, BKM-finanziert. Module zu Digitalstrategie, Website und SEO, Content und Social Media. 275 Euro pro Person, 120 Euro für weitere Personen im Team, 180 Euro unter 30.

**ScreenDaily zu KI in Kinoketten** — https://www.screendaily.com/features/how-major-and-indie-cinema-chains-are-using-ai-tools-they-are-saving-me-at-least-one-day-a-week/5215694.article
Mit Namen und Zahlen. Enthält den Fall Tynset Kino in Norwegen: 14.000 Besucher im Jahr, selbstgebaute KI-Agenten, nach Angaben des Managers eine Zeitersparnis von mindestens einem Tag pro Woche, plus 21 Prozent Besucherwachstum. Und die Gegenstimmen aus derselben Branche.

---

## Wie Sie diese Liste selbst aktuell halten

Ein Blick pro Quartal genügt, auf drei Dinge:

1. Gibt es in `anthropics/skills` neue Skills, die zu Ihrer Arbeit passen?
2. Sind die Skills, die Sie nutzen, noch gepflegt? Ein Blick auf das letzte Commit-Datum reicht.
3. Ist ein neues Modell erschienen? Dann lohnt ein halbstündiges Review Ihrer eigenen Skills, und die Richtung ist meistens Streichen.

---

Zusammengestellt von der STARTPLATZ AI Academy, Köln, für KinoConnect. Stand: 18. August 2026.
Alle Links an diesem Tag geprüft. Bei GitHub-Projekten lohnt vor der Übernahme immer ein Blick auf das letzte Commit-Datum.
