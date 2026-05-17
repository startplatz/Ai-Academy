import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import {
  CLAUDE_COWORK_PACKAGES,
  CLAUDE_COWORK_SKILLS,
  getClaudeCoworkPackage,
} from '../lib/claudeCoworkLibrary.js';

const SKILL_DIR = join(process.cwd(), 'public', 'claude-cowork', 'downloads', 'skills');
const PLUGIN_DIR = join(process.cwd(), 'public', 'claude-cowork', 'downloads', 'plugins');

const AUTHOR = 'STARTPLATZ AI Academy';

const packageContext = {
  'solo-business-cockpit': {
    feeling: 'selbstständig, unter Zeitdruck, nah am Kunden und mit vielen halbfertigen Dingen im Kopf',
    principle: [
      'erst entscheiden, welcher nächste Schritt Geld, Klarheit oder Ruhe bringt',
      'nie eine Kundenantwort schreiben, ohne Annahmen, offene Punkte und Konsequenz sichtbar zu machen',
      'kleine Aufgaben so abschließen, dass daraus direkt ein sendbarer Entwurf oder eine klare Entscheidung entsteht',
    ],
    quality: [
      'klare nächste Handlung mit Verantwortlichem und Datum',
      'keine falsche Sicherheit bei Preisen, Zusagen oder Fristen',
      'Ton: professionell, menschlich, knapp und nicht nach KI klingend',
    ],
  },
  'handwerker-office-agent': {
    feeling: 'zwischen Baustelle, Telefon, Angebot und Materialliste, oft mit unvollständigen Angaben',
    principle: [
      'erst den Auftrag fachlich eingrenzen, dann formulieren',
      'Maße, Material, Ort, Termin, Zugang und Abhängigkeiten als Risiko behandeln, nicht als Nebensache',
      'Kundensprache einfach halten und interne Arbeitsschritte präzise genug für die Ausführung machen',
    ],
    quality: [
      'offene Rückfragen sind getrennt von Annahmen',
      'Leistungsumfang und Ausschlüsse sind verständlich',
      'nichts versprechen, was vor Ort geprüft werden muss',
    ],
  },
  'office-command-center': {
    feeling: 'operativ überladen, viele Nachrichten, Meetings und Tabellen, aber wenig Entscheidungsklarheit',
    principle: [
      'aus Information zuerst Zuständigkeit, Termin und Entscheidung extrahieren',
      'Dubletten, Unschärfe und alte Versionen sichtbar machen',
      'jede Zusammenfassung muss eine Arbeitsliste erzeugen, nicht nur einen schönen Text',
    ],
    quality: [
      'Aufgaben sind eindeutig formuliert',
      'Status trennt Fakten, Blocker und nächste Schritte',
      'Tabellen bleiben überprüfbar und reversibel',
    ],
  },
  'marketing-growth-desk': {
    feeling: 'unter Veröffentlichungsdruck, mit Angst vor generischem Content und Markenverwässerung',
    principle: [
      'erst Zielgruppe, Kanal und gewünschte Handlung klären',
      'eine Kernbotschaft in kanalnative Formen übersetzen, nicht blind kopieren',
      'jede Variante gegen Brand Voice, Faktentreue und Hook-Schärfe prüfen',
    ],
    quality: [
      'Hook, Nutzenversprechen und CTA passen zum Kanal',
      'Brand Voice bleibt erkennbar',
      'keine Leistungsversprechen ohne Beleg',
    ],
  },
  'hr-hiring-pack': {
    feeling: 'zwischen Fachbereichsdruck, Fairnessanspruch und dem Wunsch, gute Menschen nicht zu übersehen',
    principle: [
      'Rolle, Erfolgskriterien und Muss-Anforderungen vor Textproduktion klären',
      'strukturierte Fragen und Bewertungsanker nutzen statt Bauchgefühl',
      'Formulierungen auf Fairness, Verständlichkeit und Kandidatenerlebnis prüfen',
    ],
    quality: [
      'alle Kriterien sind jobbezogen',
      'Bias-Risiken werden markiert',
      'nächster Schritt und Kommunikationsstatus sind klar',
    ],
  },
  'sales-pipeline-assistant': {
    feeling: 'Pipeline-Druck, verstreute Gesprächsnotizen und Sorge, echte Chancen falsch einzuschätzen',
    principle: [
      'jede Empfehlung an Bedarf, Timing, Budget, Entscheidungsweg und nächsten Schritt koppeln',
      'CRM-Hygiene als Führungsinstrument behandeln: Wenn es nicht im CRM steht, existiert es praktisch nicht',
      'Follow-ups mit konkretem Anlass schreiben, nicht als höfliches Nachfassen ohne Substanz',
    ],
    quality: [
      'Next Step plus Datum ist enthalten',
      'Deal-Risiken und fehlende Informationen sind sichtbar',
      'Ton ist hilfreich, spezifisch und nicht drängend',
    ],
  },
  'finance-prep-desk': {
    feeling: 'zahlengetrieben, deadline-nah und mit dem Druck, aus unordentlichen Daten belastbare Aussagen zu machen',
    principle: [
      'immer Quelle, Zeitraum, Annahmen und Unsicherheit ausweisen',
      'Cash, Marge und Abweichungen zuerst erklären, bevor Formulierungen poliert werden',
      'Steuer- und Rechtsfragen nicht selbst entscheiden, sondern sauber vorbereiten',
    ],
    quality: [
      'Zahlenlogik ist nachvollziehbar',
      'Risiken und fehlende Belege sind markiert',
      'Output ist prüfbar und nicht nur hübsch formuliert',
    ],
  },
  'founder-operating-system': {
    feeling: 'mit vielen strategischen Baustellen, wenig Zeit und hoher emotionaler Fallhöhe',
    principle: [
      'zwischen Signal, Meinung und Entscheidung trennen',
      'Investoren-, Team- und Kundenperspektive bewusst unterschiedlich formulieren',
      'jede Empfehlung braucht Trade-off, Risiko und nächsten Test',
    ],
    quality: [
      'knappe Executive-Logik statt langer Erklärungen',
      'Annahmen und Gegenargumente sind sichtbar',
      'Entscheidung ist mit Handlung und Lernziel verbunden',
    ],
  },
  'corporate-project-desk': {
    feeling: 'politisch sensibel, stakeholderreich und mit hohem Bedarf an klarer, defensibler Kommunikation',
    principle: [
      'Status, Risiko, Entscheidung und Eskalation sauber trennen',
      'Stakeholder nicht nur informieren, sondern nach Einfluss, Interesse und benötigter Entscheidung behandeln',
      'jede Management-Kommunikation muss in zwei Minuten verständlich sein',
    ],
    quality: [
      'Ampeln haben Begründung und Maßnahme',
      'Risiken besitzen Owner, Wahrscheinlichkeit und Auswirkung',
      'keine beschönigenden Formulierungen ohne Fakten',
    ],
  },
  'tech-ops-assistant': {
    feeling: 'zwischen Tickets, Spezifikationen, Incidents und dem Wunsch, Ursachen statt Symptome zu bearbeiten',
    principle: [
      'erst Reproduktion, Impact und betroffene Systeme klären',
      'technische Details in entscheidbare Anforderungen übersetzen',
      'Postmortems blameless, konkret und maßnahmenorientiert halten',
    ],
    quality: [
      'Akzeptanzkriterien sind testbar',
      'Logs, Daten und Vermutungen sind getrennt',
      'Automatisierung löst ein wiederholbares Problem, keinen Einzelfall',
    ],
  },
  'customer-service-desk': {
    feeling: 'unter Reaktionsdruck, mit emotionalen Kunden und dem Risiko, Kontext zu verlieren',
    principle: [
      'erst Anliegen, Emotion, Historie und gewünschte Lösung trennen',
      'Antworten sollen deeskalieren, aber nicht Verantwortung erfinden',
      'FAQ- und Vorlagenarbeit aus echten Tickets ableiten, nicht aus Wunschdenken',
    ],
    quality: [
      'Antwort enthält Anerkennung, Sachstand, Lösungspfad und nächste Erwartung',
      'Eskalationen sind begründet',
      'keine internen Details oder ungesicherten Zusagen',
    ],
  },
  'legal-contract-helper': {
    feeling: 'unsicher, weil Verträge wichtig sind, aber juristische Bewertung nicht improvisiert werden darf',
    principle: [
      'nicht beraten, sondern Struktur, Risiken, Unklarheiten und Rückfragen vorbereiten',
      'Klauseln immer mit Kontext, Konsequenz und Verhandlungsfrage betrachten',
      'rote Flaggen markieren, ohne rechtliche Schlussfolgerungen als Gewissheit auszugeben',
    ],
    quality: [
      'juristische Prüfung wird nicht ersetzt',
      'Risiken sind priorisiert und begründet',
      'Rückfragen sind für externe Beratung sofort nutzbar',
    ],
  },
  'data-excel-analyst': {
    feeling: 'mit Zahlen allein gelassen und unsicher, ob Daten, Ausreißer oder Dashboards wirklich stimmen',
    principle: [
      'Datenqualität vor Analyse: Vollständigkeit, Gültigkeit, Konsistenz, Aktualität und Eindeutigkeit prüfen',
      'jede Kennzahl mit Definition, Quelle und Zeitraum versehen',
      'Visualisierung auf Entscheidung ausrichten, nicht auf Dekoration',
    ],
    quality: [
      'Bereinigungsschritte sind dokumentiert',
      'Ausreißer werden erklärt statt nur entfernt',
      'Report trennt Befund, Interpretation und Handlungsempfehlung',
    ],
  },
};

const skillCraft = {
  'angebots-assistent': {
    tension: 'Die Anfrage klingt nach Umsatz, aber der Umfang ist noch neblig.',
    moves: ['Leistungsbausteine, Annahmen, Ausschlüsse und optionale Pakete trennen', 'offene Rückfragen vor Preislogik stellen', 'Begleitmail so formulieren, dass sie Sicherheit gibt ohne zu überversprechen'],
    watch: ['fehlende Entscheidungsgrundlage', 'unbezahlte Zusatzleistungen', 'zu frühe Preissicherheit'],
  },
  'rechnungs-reminder': {
    tension: 'Geld ist offen, aber die Beziehung soll nicht beschädigt werden.',
    moves: ['Zahlungsstatus und bisherige Kommunikation rekonstruieren', 'Tonstufen von freundlich bis bestimmt anbieten', 'nächste Eskalation mit Datum vorbereiten'],
    watch: ['Scham- oder Schuldton', 'fehlende Rechnungsdaten', 'zu harte Formulierung beim ersten Reminder'],
  },
  'kundenbriefing-reader': {
    tension: 'Im Briefing steht viel, aber nicht alles, was für saubere Arbeit nötig ist.',
    moves: ['Ziele, Zielgruppe, Deliverables, Timing und Entscheider extrahieren', 'Widersprüche markieren', 'Rückfragen nach Arbeitsrisiko priorisieren'],
    watch: ['versteckte Muss-Kriterien', 'unklare Freigabewege', 'fehlende Erfolgskriterien'],
  },
  'wochen-cockpit': {
    tension: 'Viele lose Aufgaben konkurrieren um Aufmerksamkeit.',
    moves: ['Umsatz, Deadlines, Kundenrisiko und Energiebedarf gewichten', 'Top-3 Entscheidungen der Woche herausarbeiten', 'Puffer und Follow-ups sichtbar planen'],
    watch: ['zu volle Woche', 'keine echte Priorisierung', 'vergessene Warteschleifen'],
  },
  'content-aus-auftrag': {
    tension: 'Gute Kundenarbeit ist passiert, aber noch kein sichtbarer Content daraus entstanden.',
    moves: ['aus dem Auftrag eine konkrete Lernerkenntnis herauslösen', 'Kundengeheimnisse anonymisieren', 'kanalgerechte Hook und Nutzenperspektive bauen'],
    watch: ['zu werblicher Ton', 'verräterische Kundendetails', 'generische KI-Claims'],
  },
  'scope-creep-waechter': {
    tension: 'Ein kleiner Zusatz fühlt sich höflich an, frisst aber Marge und Fokus.',
    moves: ['Originalscope gegen neue Bitte vergleichen', 'Auswirkung auf Zeit, Kosten und Qualität benennen', 'freundliche Change-Order-Formulierung vorbereiten'],
    watch: ['Bagatellisierung', 'fehlende Dokumentation', 'zu spätes Ansprechen'],
  },
  'anfrage-triage': {
    tension: 'Telefon, Mail und Messenger liefern Anfragen in unterschiedlicher Qualität.',
    moves: ['Dringlichkeit, Wert, Machbarkeit und fehlende Infos klassifizieren', 'Rückruf- oder Angebotspriorität bestimmen', 'kurze Antwortvorlage je Fall erzeugen'],
    watch: ['VIP-Gefühl statt echter Priorität', 'fehlende Orts-/Terminangaben', 'Auftrag ohne Leistungsgrenze'],
  },
  'aufmass-zu-angebot': {
    tension: 'Aus Maßen und Notizen muss ein Angebot entstehen, das später auf der Baustelle trägt.',
    moves: ['Maße, Mengen und Unsicherheiten sauber gruppieren', 'Annahmen und Vor-Ort-Prüfpunkte sichtbar machen', 'Leistungspositionen verständlich formulieren'],
    watch: ['verwechselte Einheiten', 'nicht geprüfte Untergründe', 'fehlende Nebenleistungen'],
  },
  'materiallisten-generator': {
    tension: 'Es soll nichts fehlen, aber Material darf auch nicht blind überplant werden.',
    moves: ['Mengen aus Leistungspositionen ableiten', 'Verbrauch, Verschnitt und Ersatzteile getrennt ausweisen', 'Einkaufsliste nach Gewerk oder Bauabschnitt strukturieren'],
    watch: ['keine Reserve', 'falsche Qualitätsstufe', 'Zubehör vergessen'],
  },
  'baustellen-protokoll': {
    tension: 'Was vor Ort passiert ist, muss später beweisbar und handlungsfähig bleiben.',
    moves: ['Fakten, Entscheidungen, Mängel und offene Punkte trennen', 'Fotos/Belege als Referenzen erwähnen', 'Verantwortliche und Fristen erfassen'],
    watch: ['Schuldzuweisungen', 'fehlende Zeitstempel', 'unklare Abnahmen'],
  },
  'termin-koordinator': {
    tension: 'Ein Termin hängt an Menschen, Material, Zugang und Wetter.',
    moves: ['Abhängigkeiten und Puffer prüfen', 'Kundenkommunikation mit klaren Optionen erstellen', 'Bestätigung, Erinnerung und Fallback formulieren'],
    watch: ['keine Pufferzeit', 'nicht bestätigter Zugang', 'Abhängigkeiten von Drittgewerken'],
  },
  'reklamations-antworter': {
    tension: 'Der Kunde ist unzufrieden, und die Antwort muss beruhigen ohne Haftung zu erfinden.',
    moves: ['Emotion anerkennen, Sachstand klären, Prüfpfad vorschlagen', 'zwischen Mangel, Missverständnis und Zusatzwunsch unterscheiden', 'nächsten Kontaktpunkt festlegen'],
    watch: ['Abwehrhaltung', 'vorschnelles Schuldeingeständnis', 'fehlende Belege'],
  },
  'meeting-zu-aufgaben': {
    tension: 'Nach Meetings fühlen sich alle informiert, aber niemand weiß genau, was passiert.',
    moves: ['Entscheidungen, Aufgaben und offene Fragen trennen', 'Owner, Termin und Definition of Done ergänzen', 'Blocker separat eskalierbar machen'],
    watch: ['Aufgaben ohne Verb', 'Owner-Gruppe statt Person', 'Entscheidungen als Diskussionspunkt versteckt'],
  },
  'inbox-priorisierung': {
    tension: 'Der Posteingang erzeugt Stress, aber nicht jede Nachricht verdient Arbeit.',
    moves: ['Nach Antwortpflicht, Risiko, Frist und Delegierbarkeit sortieren', '2-Minuten-Antworten erkennen', 'Wartet-auf-Listen erzeugen'],
    watch: ['laute Absender über echte Fristen stellen', 'Newsletter als Arbeit behandeln', 'keine Nachverfolgung'],
  },
  'excel-cleaner': {
    tension: 'Die Tabelle sieht brauchbar aus, aber kleine Fehler zerstören die Auswertung.',
    moves: ['Spaltenbedeutung und Datentypen festhalten', 'Dubletten, Leerwerte und Ausreißer protokollieren', 'Änderungen reversibel beschreiben'],
    watch: ['stilles Überschreiben', 'gemischte Datumsformate', 'verlorene Originaldaten'],
  },
  'statusupdate-schreiber': {
    tension: 'Alle wollen Status, aber niemand will eine lange Nacherzählung.',
    moves: ['Fortschritt, Blocker, Risiko und Entscheidungspunkt trennen', 'Ampel nur mit Begründung verwenden', 'nächste Handlung konkret formulieren'],
    watch: ['Status ohne Entscheidung', 'verschleierte Verzögerung', 'zu viel Aktivitätsbericht'],
  },
  'dokumenten-finder': {
    tension: 'Das richtige Dokument existiert wahrscheinlich, aber niemand weiß wo oder in welcher Version.',
    moves: ['Suchbegriffe, Zeitraum, Personen und Versionen ableiten', 'Fundstücke nach Verlässlichkeit sortieren', 'fehlende Dokumente als Risiko markieren'],
    watch: ['alte Versionen', 'ähnliche Dateinamen', 'fehlende Quelle'],
  },
  'vorlagen-standardisierer': {
    tension: 'Viele Vorlagen existieren, aber jede sieht leicht anders aus.',
    moves: ['Pflichtfelder, variable Felder und Formulierungsregeln trennen', 'eine Masterstruktur erzeugen', 'Anwendungsfälle und Grenzen dokumentieren'],
    watch: ['zu starre Vorlage', 'fehlende Freigabe', 'versteckte Alttexte'],
  },
  'kampagnen-planer': {
    tension: 'Eine Kampagne soll schnell starten, aber ohne klare These verbrennt sie Budget.',
    moves: ['Zielgruppe, Angebot, Kernversprechen und Messgröße festlegen', 'Kanalrollen unterscheiden', 'Testplan mit Hypothesen erstellen'],
    watch: ['zu viele Ziele', 'CTA ohne Nutzen', 'Metriken ohne Lernfrage'],
  },
  'content-repurposer': {
    tension: 'Ein starker Inhalt soll mehrfach wirken, ohne überall gleich zu klingen.',
    moves: ['Kerninsight extrahieren', 'pro Kanal Hook, Format und CTA neu bauen', 'Brand Voice und Faktentreue final prüfen'],
    watch: ['Copy-Paste über Kanäle', 'AI-Slop-Ton', 'fehlender Human Edit'],
  },
  'brand-voice-waechter': {
    tension: 'Der Text ist korrekt, aber klingt nicht nach der Marke.',
    moves: ['Stilmarker, verbotene Phrasen und gewünschte Haltung ableiten', 'Text auf Ton, Rhythmus und Wortwahl prüfen', 'konkrete Rewrite-Regeln ausgeben'],
    watch: ['nur Adjektive statt Beispiele', 'zu glatter Corporate-Ton', 'unbelegte Claims'],
  },
  'newsletter-schreiber': {
    tension: 'Der Newsletter muss Aufmerksamkeit gewinnen, ohne nach Massenmail zu wirken.',
    moves: ['Betreff, Einstieg und Nutzenversprechen zuerst testen', 'ein klares Thema pro Mail halten', 'CTA und Segmentbezug formulieren'],
    watch: ['zu viele Botschaften', 'Clickbait ohne Substanz', 'fehlender Anlass'],
  },
  'ad-copy-generator': {
    tension: 'Anzeigen brauchen Schärfe, aber falsche Versprechen kosten Vertrauen und Budget.',
    moves: ['Problem, Zielgruppe und Beleg herausarbeiten', 'mehrere Hook-Winkel statt Synonyme erzeugen', 'Varianten nach Testhypothese labeln'],
    watch: ['Superlative ohne Proof', 'zu breite Zielgruppe', 'CTA ohne konkrete Erwartung'],
  },
  'performance-analyst': {
    tension: 'Zahlen sind da, aber die Interpretation darf nicht Wunschdenken sein.',
    moves: ['Zeitraum, Kampagnenziel und Vergleichsbasis klären', 'Signal von Rauschen trennen', 'nächsten Test statt pauschale Empfehlung ableiten'],
    watch: ['Vanity Metrics', 'zu kleine Datenbasis', 'Korrelation als Ursache verkaufen'],
  },
  'stellenanzeigen-builder': {
    tension: 'Die Anzeige soll attraktiv sein, aber die Rolle darf nicht schöngefärbt werden.',
    moves: ['Erfolg in der Rolle konkretisieren', 'Muss- und Kann-Kriterien trennen', 'Sprache auf Fairness und Klarheit prüfen'],
    watch: ['Wunschliste statt Job', 'Bias in Formulierungen', 'fehlende Realität des Arbeitsalltags'],
  },
  'cv-screener': {
    tension: 'Viele Lebensläufe, wenig Zeit und die Gefahr unfairer Schnellurteile.',
    moves: ['gegen jobbezogene Kriterien screenen', 'Belege statt Eindruck sammeln', 'Rückfragen und Unsicherheiten ausweisen'],
    watch: ['Name, Alter oder Lücken überbewerten', 'Keyword-Fetisch', 'fehlende Scoring-Begründung'],
  },
  'interviewleitfaden': {
    tension: 'Das Gespräch soll menschlich sein, aber vergleichbare Ergebnisse liefern.',
    moves: ['Kompetenzen aus Jobanalyse ableiten', 'strukturierte Fragen mit Bewertungsankern erstellen', 'Follow-ups für Beleg statt Bauchgefühl formulieren'],
    watch: ['hypothetische Fragen ohne Beweiswert', 'unterschiedliche Fragen je Kandidat', 'keine Notizstruktur'],
  },
  'onboarding-paket': {
    tension: 'Neue Mitarbeitende sollen schnell Sicherheit gewinnen, nicht nur Dokumente erhalten.',
    moves: ['erste Woche, erste 30 Tage und erste Entscheidungen strukturieren', 'Rollen, Zugänge und Erwartungen klären', 'soziale Orientierung bewusst einplanen'],
    watch: ['zu viel Information am ersten Tag', 'unklare Ansprechpartner', 'kein Erfolgskriterium'],
  },
  'mitarbeitergespraech-vorbereitung': {
    tension: 'Das Gespräch soll wertschätzend sein und trotzdem klare Entwicklung ermöglichen.',
    moves: ['Fakten, Beobachtungen und Interpretation trennen', 'Feedback mit konkreten Beispielen vorbereiten', 'nächste Vereinbarung messbar formulieren'],
    watch: ['Überraschungsfeedback', 'zu allgemeines Lob', 'keine Folgehandlung'],
  },
  'schulungsplan-designer': {
    tension: 'Training soll helfen, nicht nur Kalender füllen.',
    moves: ['Lernziel, Zielgruppe und Praxisanwendung definieren', 'Module nach Transfer statt Themen sortieren', 'Übung und Nachweis einbauen'],
    watch: ['zu viel Theorie', 'keine Anwendungssituation', 'kein Follow-up'],
  },
  'lead-triage': {
    tension: 'Nicht jeder Lead ist gleich wichtig, aber jeder kann laut wirken.',
    moves: ['Fit, Bedarf, Timing, Budgetsignal und Entscheidungsnähe bewerten', 'nächste Aktion je Score vorschlagen', 'fehlende Informationen gezielt abfragen'],
    watch: ['Titel mit Kaufbereitschaft verwechseln', 'kalte Leads überpflegen', 'kein klares Disqualifikationskriterium'],
  },
  'sales-call-prep': {
    tension: 'Der Call steht an, aber echter Kontext fehlt.',
    moves: ['Account, Person, Auslöser und mögliche Pain Points verdichten', 'Hypothesen statt Behauptungen formulieren', 'Fragen nach Entscheidungsweg und Erfolg definieren'],
    watch: ['zu viel Pitch', 'keine Gesprächsagenda', 'fehlende next-step-Option'],
  },
  'follow-up-schreiber': {
    tension: 'Nach dem Gespräch muss Momentum entstehen, nicht nur Höflichkeit.',
    moves: ['Gesprächsbezug und Wertversprechen wieder aufnehmen', 'Entscheidungen und offene Punkte dokumentieren', 'konkreten nächsten Schritt mit Datum anbieten'],
    watch: ['generisches Danke', 'kein Anlass', 'nächster Schritt ohne Verbindlichkeit'],
  },
  'crm-hygiene-agent': {
    tension: 'Die Pipeline sieht voll aus, aber der Forecast ist nur so gut wie die Daten.',
    moves: ['Deals ohne nächste Aktion, Datum oder Stufe markieren', 'Pflichtfelder und Dubletten prüfen', 'Bereinigungsplan priorisieren'],
    watch: ['Zombie-Deals', 'veraltete Close Dates', 'Aktivität ohne Fortschritt'],
  },
  'lost-deal-analyse': {
    tension: 'Ein verlorener Deal tut weh, soll aber Lernmaterial werden.',
    moves: ['Ursache, Timing, Wettbewerb und Prozessschwäche trennen', 'Kundenzitat von Interpretation trennen', 'konkrete Verbesserung für Pipeline ableiten'],
    watch: ['Schuldzuweisung', 'Rabatt als Standardantwort', 'kein Mustervergleich'],
  },
  'customer-pulse': {
    tension: 'Einzelne Kundensignale sind laut, aber das Muster ist wichtiger.',
    moves: ['Feedback nach Thema, Intensität und Wiederholung clustern', 'Risiko- und Chancenaccounts unterscheiden', 'nächste Kundenaktion vorbereiten'],
    watch: ['Einzelfall verallgemeinern', 'stille Unzufriedenheit übersehen', 'keine Owner für Follow-up'],
  },
  'cashflow-forecast': {
    tension: 'Liquidität entscheidet über Handlungsspielraum, aber Daten sind selten perfekt.',
    moves: ['sichere, wahrscheinliche und unsichere Zahlungsströme trennen', 'Szenarien mit Annahmen bauen', 'kritische Wochen sichtbar machen'],
    watch: ['Umsatz mit Zahlungseingang verwechseln', 'Steuern und Einmalzahlungen vergessen', 'optimistische Annahmen ohne Markierung'],
  },
  'invoice-chaser': {
    tension: 'Offene Rechnungen brauchen Systematik, nicht Ad-hoc-Nachfassen.',
    moves: ['Alter, Betrag, Kunde und bisherige Reminder priorisieren', 'Mahnstufen mit Tonalität vorbereiten', 'Zahlungsvereinbarung oder Eskalation vorschlagen'],
    watch: ['fehlende Rechnungsreferenz', 'zu spätes Eskalieren', 'Beziehungsrisiko ignorieren'],
  },
  'monatsabschluss-prepper': {
    tension: 'Der Monatsabschluss wird hektisch, wenn Belege und Abgrenzungen zu spät auftauchen.',
    moves: ['Checklist nach Belegen, Abgrenzungen, offenen Posten und Rückfragen bauen', 'Owner und Deadlines ergänzen', 'ungeklärte Buchungen separat sammeln'],
    watch: ['fehlende Belegkette', 'unklare Periodenzuordnung', 'keine Review-Spur'],
  },
  'pl-erklaerer': {
    tension: 'Die P&L zeigt Ergebnisse, aber Führung braucht die Story dahinter.',
    moves: ['Umsatz, Kosten, Marge und Sondereffekte trennen', 'Abweichungen gegen Vorperiode/Budget erklären', 'Management-Fragen antizipieren'],
    watch: ['Zahlen ohne Ursache', 'Einmaleffekte verstecken', 'zu viel Buchhaltungssprache'],
  },
  'margin-analyzer': {
    tension: 'Marge verschwindet oft in kleinen Annahmen, nicht in großen Fehlern.',
    moves: ['Preis, Aufwand, Fremdkosten und Nacharbeit getrennt analysieren', 'Marge je Kunde/Projekt/Leistung vergleichen', 'Hebel mit Risiko markieren'],
    watch: ['Durchschnittsmarge überbewerten', 'Zeitaufwand nicht einbeziehen', 'einmalige Effekte ignorieren'],
  },
  'steuerordner-builder': {
    tension: 'Steuerunterlagen sollen vollständig sein, ohne steuerliche Beratung zu improvisieren.',
    moves: ['Belegarten, Zeitraum und fehlende Nachweise sortieren', 'Rückfragen für Steuerberatung formulieren', 'Ordnerstruktur und Checkliste erstellen'],
    watch: ['steuerliche Bewertung vorwegnehmen', 'fehlende Originalbelege', 'private und geschäftliche Vorgänge mischen'],
  },
  'business-briefing': {
    tension: 'Viele Signale treffen auf wenig Zeit und müssen entscheidbar werden.',
    moves: ['Markt, Kunden, Team, Finanzen und Produkt in Signale clustern', 'Top-Entscheidungen und Risiken extrahieren', 'nächste Experimente definieren'],
    watch: ['News-Sammlung statt Briefing', 'keine Entscheidungsebene', 'fehlende Gegenargumente'],
  },
  'investor-update': {
    tension: 'Investoren brauchen Vertrauen, auch wenn nicht alles perfekt läuft.',
    moves: ['Traction, Learnings, Risiken und Asks klar trennen', 'Zahlen mit Kontext versehen', 'knappe, ehrliche Storyline schreiben'],
    watch: ['zu viel Optimismus', 'Asks ohne Konkretion', 'Metriken ohne Vergleich'],
  },
  'pitch-deck-coach': {
    tension: 'Die Story muss in wenigen Slides verstanden werden.',
    moves: ['Problem, Zielgruppe, Lösung, Markt, Traktion und Ask auf Logik prüfen', 'jede Slide auf eine Aussage reduzieren', 'Investorenfragen vorwegnehmen'],
    watch: ['Featureliste statt Nutzen', 'unbelegter Markt', 'unklare Finanzierungslogik'],
  },
  'wettbewerbsanalyse': {
    tension: 'Wettbewerb wirkt bedrohlich, wird aber zur Positionierungshilfe.',
    moves: ['direkte, indirekte und Status-quo-Alternativen trennen', 'Differenzierung nach Kundennutzen statt Feature zählen', 'Belege und Unsicherheiten markieren'],
    watch: ['Konkurrenz kleinreden', 'Feature-Matrix ohne Käuferperspektive', 'veraltete Quellen'],
  },
  'roadmap-priorisierer': {
    tension: 'Alles wirkt wichtig, aber Ressourcen sind endlich.',
    moves: ['Impact, Aufwand, Risiko und Lernwert bewerten', 'Abhängigkeiten sichtbar machen', 'Nicht-jetzt-Entscheidungen dokumentieren'],
    watch: ['lauteste Stakeholder gewinnen', 'keine Kapazitätsrealität', 'Roadmap als Wunschliste'],
  },
  'entscheidungs-memo': {
    tension: 'Eine Entscheidung hängt fest, weil Optionen nicht vergleichbar sind.',
    moves: ['Optionen, Kriterien, Trade-offs und Empfehlung strukturieren', 'Annahmen und Risiken offenlegen', 'Entscheidungsfrist und Owner festlegen'],
    watch: ['Scheinobjektivität', 'fehlende Kosten des Nichtstuns', 'keine Reversibilitätseinschätzung'],
  },
  'stakeholder-briefing': {
    tension: 'Verschiedene Stakeholder brauchen unterschiedliche Tiefe und andere Sorgen werden sichtbar.',
    moves: ['Stakeholder nach Interesse, Einfluss und benötigter Entscheidung segmentieren', 'Botschaft, Risiko und Ask je Gruppe formulieren', 'Einwände vorwegnehmen'],
    watch: ['eine Mail für alle', 'politische Signale ignorieren', 'kein konkreter Ask'],
  },
  'projektstatus-generator': {
    tension: 'Status soll beruhigen, darf aber Risiken nicht weichzeichnen.',
    moves: ['Plan/Ist, Fortschritt, Blocker, Risiken und Entscheidungen trennen', 'Ampel mit Begründung ausgeben', 'nächste Managementhandlung benennen'],
    watch: ['Aktivitätsbericht statt Status', 'grüne Ampel mit roten Risiken', 'fehlende Eskalation'],
  },
  'decision-log': {
    tension: 'Entscheidungen verschwinden in Chats und werden später neu diskutiert.',
    moves: ['Entscheidung, Kontext, Optionen, Begründung und Konsequenz erfassen', 'Owner und Datum festhalten', 'offene Annahmen verlinken'],
    watch: ['Diskussion statt Entscheidung', 'fehlende Konsequenz', 'keine Änderungslogik'],
  },
  'workshop-designer': {
    tension: 'Ein Workshop soll echte Arbeit leisten, nicht nur Beteiligung simulieren.',
    moves: ['Zielentscheidung und Teilnehmerrollen klären', 'Agenda in Divergenz, Bewertung und Entscheidung strukturieren', 'Outputs und Follow-up definieren'],
    watch: ['zu viele Ziele', 'keine Entscheidungsmethode', 'kein Transfer nach dem Workshop'],
  },
  'management-summary': {
    tension: 'Führung braucht die Essenz, nicht die ganze Analyse.',
    moves: ['Kernaussage, Beleg, Risiko und Empfehlung verdichten', 'Details in Anhanglogik auslagern', 'Entscheidungsfrage explizit machen'],
    watch: ['lange Einleitung', 'keine Handlungsempfehlung', 'Zahlen ohne Kontext'],
  },
  'risikoregister': {
    tension: 'Risiken sind bekannt, aber ohne Struktur nicht steuerbar.',
    moves: ['Risiko, Ursache, Auswirkung, Wahrscheinlichkeit, Owner und Maßnahme erfassen', 'Frühindikatoren ergänzen', 'Top-Risiken priorisieren'],
    watch: ['Issue als Risiko erfassen', 'keine Owner', 'Maßnahmen ohne Termin'],
  },
  'ticket-analyzer': {
    tension: 'Viele Tickets zeigen Symptome, aber nicht automatisch Ursachen.',
    moves: ['Tickets nach Thema, Impact, Häufigkeit und System clustern', 'Reproduktionshinweise extrahieren', 'Produkt-/Prozessmuster ableiten'],
    watch: ['lauteste Tickets überbewerten', 'fehlende Logs', 'Workaround als Lösung verkaufen'],
  },
  'tech-spec-writer': {
    tension: 'Eine Idee wird erst umsetzbar, wenn sie testbar und begrenzt ist.',
    moves: ['Problem, Nutzer, Scope, Nicht-Ziele und Akzeptanzkriterien trennen', 'Datenflüsse und Edge Cases benennen', 'offene technische Fragen sammeln'],
    watch: ['Lösung vor Problem', 'unklare Definition of Done', 'vergessene Fehlerfälle'],
  },
  'api-doku-reader': {
    tension: 'Dokumentation ist da, aber der relevante Integrationspfad ist versteckt.',
    moves: ['Authentifizierung, Endpunkte, Limits und Fehlercodes extrahieren', 'Minimal-Flow skizzieren', 'Risiken und offene Testfragen notieren'],
    watch: ['veraltete Versionen', 'Rate Limits übersehen', 'Beispielcode blind übernehmen'],
  },
  'datenanalyse-notebook': {
    tension: 'Analyse soll nachvollziehbar sein, nicht nur ein Ergebnis liefern.',
    moves: ['Fragestellung, Datenquelle und Bereinigung dokumentieren', 'explorative Schritte von Ergebnis trennen', 'Reproduzierbarkeit und Annahmen sichern'],
    watch: ['Notebook ohne Narrativ', 'nicht dokumentierte Filter', 'Diagramme ohne Entscheidung'],
  },
  'automation-blueprint': {
    tension: 'Automatisierung klingt verlockend, aber falsche Prozesse werden nur schneller falsch.',
    moves: ['Trigger, Inputs, Entscheidungspunkte und Ausnahmen modellieren', 'manuelle Kontrollpunkte definieren', 'MVP-Automation mit Risiko prüfen'],
    watch: ['zu früh vollautomatisieren', 'Ausnahmen ignorieren', 'kein Monitoring'],
  },
  'incident-postmortem': {
    tension: 'Nach einem Vorfall ist Druck hoch, aber Lernen braucht Ruhe und Struktur.',
    moves: ['Timeline, Impact, Detection, Response und Root Causes trennen', 'blameless formulieren', 'konkrete Prevent/Detect/Respond-Maßnahmen ableiten'],
    watch: ['Personenschuld', 'zu vage Action Items', 'keine Kundenauswirkung'],
  },
  'ticket-triage': {
    tension: 'Support muss schnell sortieren, ohne wichtige Signale zu verlieren.',
    moves: ['Anliegen, Dringlichkeit, Emotion und Kundentyp erfassen', 'Routing und erste Antwort vorschlagen', 'fehlende Informationen abfragen'],
    watch: ['alles dringend nennen', 'VIP ohne Impact', 'keine SLA-Logik'],
  },
  'antwortvorlagen-generator': {
    tension: 'Vorlagen sparen Zeit, dürfen aber nicht kalt oder falsch wirken.',
    moves: ['wiederkehrende Fälle in Varianten clustern', 'Platzhalter und Entscheidungspunkte markieren', 'Tonstufen nach Emotion anbieten'],
    watch: ['robotischer Ton', 'zu viele interne Begriffe', 'keine Personalisierungsstelle'],
  },
  'eskalations-erkennung': {
    tension: 'Manche Tickets kippen, bevor sie offensichtlich eskalieren.',
    moves: ['Signalwörter, Wartezeit, Kundentyp, Wiederholung und Umsatzrisiko prüfen', 'Eskalationsgrund dokumentieren', 'Owner und Sofortmaßnahme vorschlagen'],
    watch: ['nur Lautstärke messen', 'historische Frustration ignorieren', 'keine Rückmeldung an Kunden'],
  },
  'faq-builder': {
    tension: 'FAQ soll echte Supportlast senken, nicht interne Wunschfragen beantworten.',
    moves: ['Fragen aus Tickets clustern', 'Antworten in Kundensprache schreiben', 'Grenzen und Kontaktpfad ergänzen'],
    watch: ['zu lange Antworten', 'kein Update-Prozess', 'Fragen ohne Suchbegriffe'],
  },
  'beschwerde-antworter': {
    tension: 'Die Antwort muss Würde und Lösung verbinden.',
    moves: ['Emotion anerkennen, Problem paraphrasieren, nächste Prüfung erklären', 'Entschuldigung nur passend einsetzen', 'Follow-up und Erwartung klar setzen'],
    watch: ['defensiver Ton', 'unberechtigte Kompensation', 'keine konkrete nächste Handlung'],
  },
  'vertragsreview': {
    tension: 'Der Vertrag ist wichtig, aber Claude darf nicht Rechtsberatung simulieren.',
    moves: ['Klauseltypen und wirtschaftliche Konsequenzen sortieren', 'unklare Pflichten und Fristen markieren', 'Rückfragen für Jurist oder Gegenpartei vorbereiten'],
    watch: ['rechtliche Bewertung als Gewissheit', 'fehlender Kontext', 'versteckte Kündigungs- oder Haftungslogik'],
  },
  'klausel-risiko-check': {
    tension: 'Einzelne Klauseln können später teuer werden, obwohl sie harmlos klingen.',
    moves: ['Pflicht, Risiko, Auslöser und mögliche Verhandlungspunkte herausarbeiten', 'unklare Begriffe markieren', 'Auswirkung für beide Seiten skizzieren'],
    watch: ['isolierte Klausel ohne Vertrag', 'keine Fristenprüfung', 'zu sichere juristische Sprache'],
  },
  'vergleich-zweier-vertragsversionen': {
    tension: 'Änderungen zwischen Versionen sind leicht zu übersehen.',
    moves: ['inhaltliche Änderungen, Streichungen und neue Pflichten clustern', 'wirtschaftliche Auswirkung priorisieren', 'Rückfragen je Änderung formulieren'],
    watch: ['Formatänderungen als Inhalt werten', 'kleine Wörter übersehen', 'keine Versionsreferenz'],
  },
  'rueckfragenliste-fuer-rechtsberatung': {
    tension: 'Man braucht juristische Hilfe, aber will die Beratungszeit gut nutzen.',
    moves: ['Sachverhalt, Dokumentstellen und gewünschte Entscheidung sammeln', 'Fragen nach Risiko, Option und Empfehlung ordnen', 'Priorität und Frist ergänzen'],
    watch: ['zu allgemeine Fragen', 'fehlende Dokumentreferenz', 'rechtliche Antwort vorwegnehmen'],
  },
  'angebots-und-leistungsumfang-check': {
    tension: 'Ein Angebot kann gut klingen und trotzdem spätere Konflikte produzieren.',
    moves: ['Leistungsumfang, Ausschlüsse, Annahmen, Mitwirkungspflichten und Abnahme prüfen', 'Unschärfen in Rückfragen umwandeln', 'Verhandlungsstellen markieren'],
    watch: ['fehlende Scope-Grenze', 'unklare Erfolgskriterien', 'keine Change-Logik'],
  },
  'docusign-prep': {
    tension: 'Signaturprozesse scheitern oft an kleinen fehlenden Angaben.',
    moves: ['Unterzeichner, Reihenfolge, Pflichtfelder und Anhänge prüfen', 'interne Freigaben festhalten', 'Sendetext und Rückfrageplan vorbereiten'],
    watch: ['falsche Signaturreihenfolge', 'fehlende Vollmacht', 'nicht geprüfte finale Version'],
  },
  'dashboard-builder': {
    tension: 'Ein Dashboard soll Entscheidungen tragen, nicht nur Daten zeigen.',
    moves: ['Zielgruppe, Entscheidungsfrage und Kernmetriken definieren', 'Kennzahlendefinitionen dokumentieren', 'Layout nach Scan-Reihenfolge planen'],
    watch: ['zu viele KPIs', 'unbekannte Datenquelle', 'Dekoration statt Entscheidbarkeit'],
  },
  'ausreisser-erkennung': {
    tension: 'Ein Ausreißer kann Fehler, Risiko oder Chance sein.',
    moves: ['statistische Auffälligkeit von Business-Kontext trennen', 'Ursachenhypothesen bilden', 'Empfehlung: prüfen, behalten, markieren oder ausschließen'],
    watch: ['automatisch löschen', 'Saisonalität ignorieren', 'fehlende Segmentierung'],
  },
  'report-generator': {
    tension: 'Reports sollen Vertrauen schaffen und Handeln auslösen.',
    moves: ['Befund, Ursache, Auswirkung und Empfehlung strukturieren', 'Top-Insights priorisieren', 'Unsicherheit und Datenqualität ausweisen'],
    watch: ['Datenfriedhof', 'keine Zielgruppe', 'Empfehlung ohne Beleg'],
  },
  'datenqualitaets-check': {
    tension: 'Schlechte Daten wirken oft erst später teuer.',
    moves: ['Vollständigkeit, Gültigkeit, Konsistenz, Aktualität und Eindeutigkeit prüfen', 'Fehler nach Auswirkung priorisieren', 'Bereinigungsplan mit Owner formulieren'],
    watch: ['nur optische Prüfung', 'keine Quellenspur', 'Fehler ohne Business-Auswirkung'],
  },
};

function asLines(items) {
  return items.map((item) => `- ${item}`).join('\n');
}

function yamlQuote(value) {
  return `'${String(value).replaceAll("'", "''")}'`;
}

function getContext(skill) {
  return packageContext[skill.primaryPackageId] || packageContext[getClaudeCoworkPackage(skill.primaryPackageId)?.id] || packageContext['office-command-center'];
}

function getCraft(skill) {
  return skillCraft[skill.id] || {
    tension: 'Die Aufgabe ist wichtig, aber die Ausgangsinformationen sind noch unvollständig.',
    moves: ['Ziel, Input, Annahmen und offene Punkte trennen', 'Output so strukturieren, dass er direkt weiterverwendbar ist', 'Risiken und nächste Schritte sichtbar machen'],
    watch: ['zu schnelle Gewissheit', 'fehlender Kontext', 'keine klare nächste Handlung'],
  };
}

function buildStandaloneSkill(skill) {
  return buildSkill(skill, { includeName: true });
}

function buildPluginSkill(skill) {
  return buildSkill(skill, { includeName: false });
}

function buildSkill(skill, { includeName }) {
  const context = getContext(skill);
  const craft = getCraft(skill);
  const frontmatter = [
    '---',
    includeName ? `name: ${skill.id}` : null,
    `description: ${yamlQuote(skill.shortDescription)}`,
    '---',
  ].filter(Boolean).join('\n');

  return `${frontmatter}

# ${skill.title}

## Einsatzmoment
Der Skill ist für Situationen gedacht, in denen Teilnehmende ${context.feeling} sind. Das Ziel ist nicht, schnell generischen Text zu produzieren, sondern Druck aus der Aufgabe zu nehmen und eine belastbare Arbeitsgrundlage zu schaffen.

Typische Spannung: ${craft.tension}

## Zielbild
Am Ende liegt ein Ergebnis vor, das eine Person direkt prüfen, senden, entscheiden oder weiterbearbeiten kann. Claude soll nicht so tun, als sei alles sicher. Claude soll Annahmen, Lücken, Risiken und Rückfragen sichtbar machen.

Erwartete Outputs:
${asLines(skill.outputs)}

## Typischer Input
${asLines(skill.inputs)}

## Praxisprinzipien
${asLines(context.principle)}

## Expert Moves für diesen Skill
${asLines(craft.moves)}

## Vorgehen
1. Lies den Input einmal nur auf Ziel, Kontext und gewünschtes Ergebnis.
2. Markiere fehlende Informationen. Wenn sie entscheidungsrelevant sind, frage nach, statt etwas zu erfinden.
3. Trenne Fakten, Annahmen, Interpretation und Empfehlung sichtbar.
4. Erstelle zuerst eine knappe Arbeitsstruktur, dann den eigentlichen Entwurf.
5. Prüfe das Ergebnis gegen die Qualitätskriterien unten.
6. Liefere bei Unsicherheit zwei Optionen: eine vorsichtige Version und eine mutigere Version mit klarer Begründung.

## Qualitätskriterien
${asLines(context.quality)}

## Worauf du achten musst
${asLines(craft.watch)}

## Rückfragen, wenn Informationen fehlen
- Was soll mit dem Ergebnis direkt passieren: senden, entscheiden, intern vorbereiten oder prüfen?
- Wer ist die Zielperson und wie viel Vorwissen hat sie?
- Welche Frist, welches Risiko oder welche geschäftliche Konsequenz hängt daran?
- Gibt es Formulierungen, Zahlen, Namen oder Zusagen, die unverändert bleiben müssen?

## Output-Format
Gib das Ergebnis in dieser Reihenfolge aus:
1. Kurzdiagnose der Ausgangslage
2. Fertiger Entwurf oder strukturierte Arbeitsvorlage
3. Annahmen und offene Punkte
4. Risiken oder rote Flaggen
5. Konkreter nächster Schritt
`;
}

function buildPluginReadme(pack, skills) {
  return `# ${pack.title}

Dieses Plugin bündelt mehrere Claude Cowork Skills für einen zusammenhängenden Arbeitsbereich.

## Enthaltene Skills
${skills.map((skill) => `- /${pack.id}:${skill.id} - ${skill.title}`).join('\n')}

## Format
Dieses ZIP folgt dem Claude Code / Cowork Plugin-Format:

- \`.claude-plugin/plugin.json\` beschreibt das Plugin.
- \`skills/<skill-name>/SKILL.md\` enthält die einzelnen Skills.
- Die Skill-Namen werden im Plugin namespaced, z. B. \`/${pack.id}:${skills[0]?.id || 'skill'}\`.

Für Claude.ai Custom Skill Uploads nutze die einzelnen Skill-ZIPs aus der Skill Library. Dieses Paket ist bewusst ein Plugin-Bundle.
`;
}

function buildPluginJson(pack) {
  return JSON.stringify({
    name: pack.id,
    description: pack.description,
    version: '1.0.0',
    author: {
      name: AUTHOR,
    },
  }, null, 2);
}

function crc32(buffer) {
  let crc = 0xffffffff;
  for (const byte of buffer) {
    crc ^= byte;
    for (let i = 0; i < 8; i += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function u16(value) {
  const buffer = Buffer.alloc(2);
  buffer.writeUInt16LE(value);
  return buffer;
}

function u32(value) {
  const buffer = Buffer.alloc(4);
  buffer.writeUInt32LE(value >>> 0);
  return buffer;
}

function writeZip(filePath, entries) {
  mkdirSync(dirname(filePath), { recursive: true });

  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const entry of entries) {
    if (entry.name.includes('\\')) {
      throw new Error(`Invalid ZIP entry path: ${entry.name}`);
    }

    const name = Buffer.from(entry.name, 'utf8');
    const data = Buffer.from(entry.content, 'utf8');
    const crc = crc32(data);

    const localHeader = Buffer.concat([
      u32(0x04034b50),
      u16(20),
      u16(0x0800),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),
      name,
    ]);

    localParts.push(localHeader, data);

    centralParts.push(Buffer.concat([
      u32(0x02014b50),
      u16(20),
      u16(20),
      u16(0x0800),
      u16(0),
      u16(0),
      u16(0),
      u32(crc),
      u32(data.length),
      u32(data.length),
      u16(name.length),
      u16(0),
      u16(0),
      u16(0),
      u16(0),
      u32(0),
      u32(offset),
      name,
    ]));

    offset += localHeader.length + data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const end = Buffer.concat([
    u32(0x06054b50),
    u16(0),
    u16(0),
    u16(entries.length),
    u16(entries.length),
    u32(centralDirectory.length),
    u32(offset),
    u16(0),
  ]);

  writeFileSync(filePath, Buffer.concat([...localParts, centralDirectory, end]));
}

function main() {
  const skillsById = new Map(CLAUDE_COWORK_SKILLS.map((skill) => [skill.id, skill]));

  for (const skill of CLAUDE_COWORK_SKILLS) {
    writeZip(join(SKILL_DIR, `${skill.id}.zip`), [
      {
        name: `${skill.id}/SKILL.md`,
        content: buildStandaloneSkill(skill),
      },
    ]);
  }

  for (const pack of CLAUDE_COWORK_PACKAGES) {
    const skills = pack.skillIds.map((id) => skillsById.get(id)).filter(Boolean);
    writeZip(join(PLUGIN_DIR, `${pack.id}.zip`), [
      {
        name: `${pack.id}/.claude-plugin/plugin.json`,
        content: buildPluginJson(pack),
      },
      {
        name: `${pack.id}/README.md`,
        content: buildPluginReadme(pack, skills),
      },
      ...skills.map((skill) => ({
        name: `${pack.id}/skills/${skill.id}/SKILL.md`,
        content: buildPluginSkill(skill),
      })),
    ]);
  }

  console.log(`Built ${CLAUDE_COWORK_SKILLS.length} skill ZIPs and ${CLAUDE_COWORK_PACKAGES.length} plugin ZIPs.`);
}

main();
