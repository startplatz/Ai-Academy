# Meeting-to-Tasks Workflow Blueprint

Ein einfacher Workflow, der aus Meetingnotizen klare Aufgaben macht.

## Ablauf

1. Trigger: neues Meeting-Transkript oder neue Notiz
2. KI extrahiert Entscheidungen, Risiken und Aufgaben
3. KI ordnet Owner und Priorität zu
4. Mensch prüft die Liste
5. Aufgaben werden in Projekttool oder E-Mail übernommen

## Prompt für den KI-Schritt

```text
Analysiere dieses Meeting-Transkript.

Extrahiere:
- Entscheidungen
- offene Fragen
- Aufgaben mit Owner, Deadline und Priorität
- Risiken oder Blocker

Gib das Ergebnis als strukturierte Tabelle aus.
Markiere unklare Owner oder Deadlines mit "Review nötig".
```

## Qualitätscheck

- Gibt es Aufgaben ohne Owner?
- Sind Deadlines realistisch?
- Ist jede Aufgabe konkret ausführbar?
- Muss etwas aus Datenschutzgründen entfernt werden?
