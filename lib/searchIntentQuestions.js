export const searchIntentQuestions = {
  arbeitssuchende: [
    {
      q: 'Welche KI Weiterbildung wird vom Arbeitsamt gefördert?',
      a: 'Die Weiterbildung KI-Manager/in (Vollzeit) ist AZAV-zugelassen und kann bei passender Voraussetzung zu 100 % über einen Bildungsgutschein der Agentur für Arbeit oder des Jobcenters gefördert werden. Im Beratungsgespräch klären wir, ob das Format zu deiner Situation passt und welche Kursdaten du für deinen Termin brauchst.',
    },
    {
      q: 'Wie bekomme ich einen Bildungsgutschein für einen KI Kurs?',
      a: 'Du vereinbarst zuerst ein kostenloses Beratungsgespräch mit uns. Danach erhältst du alle relevanten Informationen zum Kurs, zur AZAV-Zertifizierung, zu Lernzielen und Berufsperspektiven. Mit diesen Unterlagen gehst du in das Gespräch mit Agentur für Arbeit oder Jobcenter und beantragst dort den Bildungsgutschein.',
    },
    {
      q: 'Was lernt man in einer Weiterbildung zum KI Manager?',
      a: 'Du lernst Prompt Engineering, KI-Tools, Automatisierung mit n8n, GPT-APIs, KI-Agenten, Workflow-Optimierung, EU AI Act, Datenschutz und KI-Strategie. Am Ende arbeitest du an einem eigenen Praxisprojekt und gehst mit dem Abschlusszertifikat „KI-Manager/in“ raus. Optional legst du zusätzlich eine unabhängige Prüfung bei Cert-IT ab.',
    },
    {
      q: 'Ist die KI Manager Weiterbildung online möglich?',
      a: 'Ja. Die Vollzeit-Weiterbildung läuft von Montag bis Freitag, 9 bis 16 Uhr, online oder vor Ort in Köln. Du brauchst einen Laptop, stabile Internetverbindung und die Bereitschaft, acht Wochen intensiv an praktischen KI-Anwendungen zu arbeiten.',
    },
    {
      q: 'Brauche ich Programmierkenntnisse für eine KI Weiterbildung?',
      a: 'Nein. Du brauchst keine Programmierkenntnisse. Der Kurs ist für Menschen aus unterschiedlichen beruflichen Hintergründen gebaut und führt dich Schritt für Schritt von KI-Grundlagen zu praktischen Workflows.',
    },
  ],
  berufstaetige: [
    // Kursdaten: lib/academyFacts.js (KI-Manager/in Teilzeit)
    {
      q: 'Welche KI Weiterbildung kann ich berufsbegleitend machen?',
      a: 'Die Weiterbildung KI-Manager/in (Teilzeit) ist für Berufstätige gebaut. Sie läuft 16 Wochen lang montags bis donnerstags von 14 bis 18 Uhr, online oder vor Ort in Köln, und umfasst 320 Unterrichtseinheiten. Inhaltlich ist es dasselbe Programm wie die Vollzeit-Variante.',
    },
    {
      q: 'Wie viel Zeit brauche ich für die KI-Manager Weiterbildung in Teilzeit?',
      a: 'Plane vier Nachmittage pro Woche ab 14 Uhr ein. Montag und Mittwoch sind Theorie-Tage, Dienstag und Donnerstag betreute Praxis-Tage, an denen du das Gelernte anwendest. Die Praxis-Tage sind ein Angebot: Wenn der Job einmal vorgeht, verpasst du keine Theorie.',
    },
    {
      q: 'Kann eine KI Weiterbildung über das Qualifizierungschancengesetz gefördert werden?',
      a: 'Ja. Die KI-Manager Weiterbildung in Teilzeit ist eine AZAV-zugelassene Maßnahme und für Beschäftigte über das Qualifizierungschancengesetz (QCG) förderfähig. Die Förderung wird gemeinsam mit deinem Arbeitgeber bei der Agentur für Arbeit beantragt. Wie viel gefördert wird, hängt unter anderem von der Betriebsgröße ab, das klären wir im Beratungsgespräch.',
    },
    {
      q: 'Muss mein Arbeitgeber mitmachen?',
      a: 'Ja. Für die Teilnahme brauchst du nachmittags ab 14 Uhr Zeit, meistens stellt der Arbeitgeber dich dafür frei. Eine Förderung über das QCG beantragt ihr gemeinsam. Wir geben dir die Kursunterlagen und Argumente für das Gespräch mit deinem Arbeitgeber an die Hand.',
    },
    {
      q: 'Welchen Abschluss bekomme ich?',
      a: 'Du erhältst das Abschlusszertifikat „KI-Manager/in“ der STARTPLATZ Köln GmbH. Die Weiterbildung ist eine AZAV-zugelassene Maßnahme, zertifiziert durch Kiwa ZERTPUNKT GmbH. Dazu kommt dein eigenes Praxisprojekt als Nachweis.',
    },
    {
      q: 'Brauche ich Vorkenntnisse?',
      a: 'Nein. Du brauchst keine Programmierkenntnisse. Der Kurs führt dich von den KI-Grundlagen über Prompt Engineering und Automatisierung bis zu einem eigenen Praxisprojekt.',
    },
  ],
  unternehmen: [
    {
      q: 'Wie schule ich mein Team im Umgang mit KI?',
      a: 'Der sinnvollste Start ist eine kurze Bedarfsanalyse: Welche Rollen, Prozesse und Risiken gibt es im Team? Danach wählen wir zwischen Innovation Day, Inhouse-Schulung oder AI-Private Academy und bauen Beispiele, Übungen und Transferaufgaben rund um eure echten Arbeitsabläufe.',
    },
    {
      q: 'Was kostet eine KI Schulung für Unternehmen?',
      a: 'Die Kosten hängen von Format, Dauer, Teamgröße und Individualisierung ab. Ein Innovation Day ist anders kalkuliert als eine mehrmonatige Private Academy. Im Erstgespräch klären wir Zielgruppe, Umfang und sinnvollen Startpunkt und erstellen danach ein passendes Angebot.',
    },
    {
      q: 'Was ist ein Innovation Day für KI?',
      a: 'Ein Innovation Day ist ein eintägiger Workshop, in dem euer Team KI-Grundlagen, Tool-Demos, Use-Case-Mapping und nächste Schritte zusammenbringt. Am Ende stehen priorisierte Anwendungsfälle, erste Guidelines und eine realistische Roadmap.',
    },
    {
      q: 'Wie kann ein Unternehmen KI Use Cases identifizieren?',
      a: 'Wir starten bei wiederkehrenden Aufgaben, hohen Abstimmungsaufwänden, manueller Recherche, Content-Produktion, Kundenkommunikation und internen Wissensprozessen. Daraus priorisieren wir Use Cases nach Nutzen, Machbarkeit, Risiko und Umsetzungsaufwand.',
    },
    {
      q: 'Welche KI Schulung passt zu Führungskräften und Fachbereichen?',
      a: 'Führungskräfte brauchen meist Strategie, Governance, EU AI Act und Entscheidungslogik. Fachbereiche brauchen praktische Workflows für Marketing, Sales, HR, Operations oder Produktivität. Unsere Inhouse-Formate kombinieren beides, wenn Teams gemischt lernen sollen.',
    },
  ],
  oneday: [
    {
      q: 'Was ist ein OneDay KI Workshop?',
      a: 'Ein OneDay KI Workshop ist ein intensiver Tagesworkshop mit einem klaren Thema und einem konkreten Ergebnis. Du kommst morgens mit einer Aufgabe oder Fragestellung und gehst abends mit Workflow, Toolkit, Prototyp oder Transferplan raus.',
    },
    {
      q: 'Welcher KI Workshop eignet sich für Einsteiger?',
      a: 'Für den kompakten Einstieg eignet sich OneDay KI-Start. Wenn du schon mit KI arbeitest und konkreter werden willst, passen Formate wie Claude Cowork, KI-Kompetenz oder branchenspezifische Workshops besser.',
    },
    {
      q: 'Kann man KI an einem Tag lernen?',
      a: 'Man kann KI an einem Tag nicht vollständig beherrschen, aber man kann an einem Tag einen produktiven Einstieg schaffen. Genau dafür ist OneDay gebaut: ein Thema, klare Übungen, direkt nutzbare Vorlagen und ein nächster Schritt für den Alltag.',
    },
    {
      q: 'Was ist der Unterschied zwischen OneDay und der KI-Manager Weiterbildung?',
      a: 'OneDay ist ein Tagesformat für schnellen Einstieg oder ein konkretes Thema. Die KI-Manager Weiterbildung ist ein vollständiges Programm mit 320 Unterrichtseinheiten: in Vollzeit über acht Wochen für Arbeitssuchende mit Bildungsgutschein, in Teilzeit über 16 Wochen für Berufstätige mit QCG-Förderung.',
    },
    {
      q: 'Welche KI Workshops gibt es bei STARTPLATZ AI Academy?',
      a: 'Zu den OneDay-Formaten gehören unter anderem Claude Cowork, Claude Code, KI-Kompetenz, KI-Start und branchenspezifische Workshops wie OneDay Immobilien. Für Teams gibt es zusätzlich Inhouse-Formate und Innovation Days.',
    },
  ],
  claudeCowork: [
    {
      q: 'Was lerne ich im Claude Cowork Workshop?',
      a: 'Du lernst, Claude als wiederverwendbaren Arbeitsmodus für Recherche, Schreiben, Analyse und operative Aufgaben einzusetzen. Im Fokus stehen Kontext, Rollen, Dateien, Output-Regeln, Qualitätschecks und eigene Aufgaben aus deinem Alltag.',
    },
    {
      q: 'Für wen ist ein Claude Workshop geeignet?',
      a: 'Der Workshop eignet sich für Professionals, Gründer:innen, Teams und Entscheider:innen, die Claude produktiv statt nur spielerisch nutzen wollen. Technische Vorkenntnisse sind nicht nötig, erste KI-Erfahrung ist hilfreich.',
    },
    {
      q: 'Ist Claude besser als ChatGPT für den Arbeitsalltag?',
      a: 'Das hängt vom Anwendungsfall ab. Claude ist stark bei langen Kontexten, Dokumenten, Schreib- und Analyseaufgaben. ChatGPT ist ebenfalls vielseitig und je nach Tool-Ökosystem sinnvoll. Im Workshop lernst du, wann Claude für deine Arbeitsabläufe besonders gut passt.',
    },
    {
      q: 'Brauche ich Claude Pro für den Workshop?',
      a: 'Ein eigener Claude-Zugang ist sinnvoll. Für intensives Arbeiten empfehlen wir einen bezahlten Account, weil kostenlose Limits während eines Ganztages-Workshops stören können.',
    },
  ],
  immobilien: [
    {
      q: 'Wie können Immobilienmakler KI nutzen?',
      a: 'Immobilienmakler können KI für Exposés, Social-Media-Content, Eigentümer-Akquise, Kundenkommunikation, Follow-ups und interne Routinen nutzen. Wichtig ist, mit strukturierten Objektinformationen, klaren Zielgruppen und sauberen Datenschutzregeln zu arbeiten.',
    },
    {
      q: 'Kann KI Exposés für Immobilien schreiben?',
      a: 'Ja, KI kann auf Basis von Objektinfos, Zielgruppe, Tonalität und Vermarktungsziel sehr gute Exposé-Entwürfe und Varianten erstellen. Im Workshop lernst du, wie du Briefings aufbaust und Ergebnisse prüfst, damit die Texte professionell bleiben.',
    },
    {
      q: 'Welche KI Workflows helfen bei Eigentümer Akquise?',
      a: 'Hilfreich sind Workflows für personalisierte Anschreiben, Gesprächsleitfäden, Einwandbehandlung, Marktargumente und strukturierte Nachfass-E-Mails. So entsteht aus einzelnen Prompts eine wiederholbare Akquise-Routine.',
    },
    {
      q: 'Ist der KI Workshop für Makler ohne Vorkenntnisse geeignet?',
      a: 'Ja. OneDay Immobilien startet mit den nötigen KI-Grundlagen und arbeitet dann direkt an typischen Makleraufgaben. Du solltest Laptop und reale Beispielaufgaben mitbringen.',
    },
  ],
  produktkatalog: [
    {
      q: 'Was kostet eine KI Weiterbildung?',
      a: 'Die Kosten hängen vom Format ab. OneDay Workshops starten ab 250 Euro netto. Die KI-Manager Weiterbildungen in Vollzeit und Teilzeit sind bei passender Voraussetzung förderfähig. Corporate Inhouse-Formate werden nach Zielbild, Teamgröße und Umfang kalkuliert.',
    },
    {
      q: 'Welche KI Kurse bietet die STARTPLATZ AI Academy an?',
      a: 'Die STARTPLATZ AI Academy bietet die KI-Manager Weiterbildung in Vollzeit und Teilzeit, OneDay Workshops und Unternehmensformate wie Innovation Day, Inhouse-Schulung und AI-Private Academy an.',
    },
    {
      q: 'Welche KI Weiterbildung ist förderfähig?',
      a: 'Die KI-Manager Weiterbildungen sind AZAV-zugelassen: in Vollzeit über den Bildungsgutschein, in Teilzeit für Beschäftigte über das Qualifizierungschancengesetz. Ob das in deinem Fall passt, klären wir im Beratungsgespräch.',
    },
    {
      q: 'Was kostet ein KI Workshop für Unternehmen?',
      a: 'Für Unternehmen hängen die Kosten von Format, Dauer und Individualisierung ab. OneDay-Inhouse-Formate haben klare Preisanker, während Innovation Days, Inhouse-Schulungen und Private Academies nach Zielbild kalkuliert werden.',
    },
  ],
};
