/*
  Faktenregister der STARTPLATZ AI Academy — die eine Quelle für Kursdaten,
  Träger- und Zertifikatsangaben. Seiten, FAQs, llms.txt und Schema-Markup
  sollen ihre Angaben von hier beziehen statt sie zu duplizieren.

  Regeln:
  - Nur belegte Werte eintragen; jede Angabe hat eine Quelle in `sources`.
  - Offene oder widersprüchliche Punkte stehen in `openQuestions` und werden
    auf der Website nicht als Fakt behauptet.
  - Kursdaten (Preis, UE, Zeiten, Maßnahmennummer) führt der Notion-Kurskatalog;
    bei Änderungen dort auch hier nachziehen.

  Stand: 12.10.2026
*/

export const TRAEGER = {
  name: 'STARTPLATZ Köln GmbH',
  street: 'Im Mediapark 5',
  postalCode: '50670',
  city: 'Köln',
  azav: {
    certificateNumber: 'A2403005',
    certifiedBy: 'Kiwa ZERTPUNKT GmbH',
    validFrom: '2024-06-20',
    validUntil: '2029-06-19',
  },
  sources: ['AZAV-Trägerzertifikat A2403005 (Kiwa ZERTPUNKT, 20.06.2024)'],
};

export const ORGANIZATION_HISTORY = {
  startplatzFounded: 2012,
  startplatzDuesseldorfSince: 2015,
  aiHubBrandSince: 2023,
  aiHubCompanySince: 2024,
  firstFundedCourseStart: '2025-01-20',
  renamedToAiAcademy: 2026,
  // Der AI Hub besteht weiter als Marke für die KI-Community von STARTPLATZ
  // (AI Friday, Meetups); die AI Academy steht nur für die Weiterbildungen.
  aiHubContinuesAsCommunityBrand: true,
  sources: [
    'startplatz.de/ueber-uns ("gegründet 2012 in Köln, seit 2015 auch in Düsseldorf")',
    'Dominic Drewes, 12.10.2026 (AI Hub Marke 2023, Firma 2024, Umbenennung 2026)',
    'Notion Batches KIM-VZ-1, Start 20.01.2025',
  ],
};

// Gilt für alle AZAV-Kurse: formal hybrid zugelassen, in der Praxis nehmen
// alle online teil. Auf der Website deshalb so formulieren.
export const COURSE_LOCATION_LABEL = 'online oder vor Ort in Köln';

export const CERT_IT = {
  name: 'Cert-IT',
  // Belegt: freiwillige, externe Abschlussprüfung „KI-Manager/in" bei Cert-IT
  // (Prüfungslisten im Kurs-KPI-Report, Rechnungen von Cert-IT).
  examOptional: true,
  // Vollzeit und Teilzeit (Teilzeit bestätigt 14.10.2026).
  courses: ['ki-manager-vollzeit', 'ki-manager-teilzeit'],
  // Keine Normen (DIN EN ISO/IEC 17024) und kein „europaweit anerkannt“
  // auf der Website nennen (Entscheidung 14.10.2026).
  label: 'freiwillige, unabhängige Abschlussprüfung bei Cert-IT',
  sources: [
    'Akademie-Plugin kurs-kpi-report (Cert-IT-Prüfungslisten, „freiwillige externe Abschlussprüfung“)',
    'Notion: Wert des Cert-IT-Abschlusses (Ehrlichkeits-Hinweis: nicht „staatlich anerkannt“)',
    'Dominic Drewes, 14.10.2026: Cert-IT auch bei Teilzeit',
  ],
};

export const AZAV_COURSES = [
  {
    id: 'ki-manager-vollzeit',
    name: 'KI-Manager/in (Vollzeit)',
    shortCode: 'KIM-VZ',
    status: 'active',
    published: true,
    mode: 'Vollzeit',
    durationWeeks: 8,
    teachingUnits: 320, // à 45 Minuten
    schedule: 'Montag bis Freitag, 09:00–16:00 Uhr (inkl. 1 Stunde Mittagspause)',
    location: COURSE_LOCATION_LABEL,
    price: 3552,
    funding: 'bis zu 100 % über Bildungsgutschein (Agentur für Arbeit, Jobcenter)',
    massnahmennummer: '357/630/2025',
    zulassung: { from: '2025-12-18', until: '2027-09-17' },
    certificate: 'Abschlusszertifikat „KI-Manager/in" der STARTPLATZ Köln GmbH',
    certIt: true,
    path: '/arbeitssuchende',
    allmedaSlug: 'weiterbildung-ki-manager-vollzeit',
    sources: ['Notion Kurskatalog KIM-VZ (Stand 12.10.2026)', 'bildungsziele.json (Zulassungsdauer)'],
  },
  {
    id: 'ki-manager-teilzeit',
    name: 'KI-Manager/in (Teilzeit)',
    shortCode: 'KIM-TZ',
    status: 'active',
    published: true,
    mode: 'Teilzeit',
    durationWeeks: 16,
    teachingUnits: 320,
    schedule: 'Montag bis Donnerstag, 14:00–18:00 Uhr',
    // Mo + Mi Theorie, Di + Do betreute Praxis (Angebot, keine Pflicht —
    // wer wegen der Arbeit mal fehlt, verpasst keine Theorie).
    scheduleDetail: {
      theory: 'Montag und Mittwoch, 14:00–18:00 Uhr',
      practice: 'Dienstag und Donnerstag, 14:00–18:00 Uhr (betreute Praxis, optional)',
    },
    audience: 'Berufstätige, die nachmittags ab 14 Uhr freigestellt werden können',
    location: COURSE_LOCATION_LABEL,
    price: 3558.4,
    // Für Beschäftigte über das Qualifizierungschancengesetz (QCG) mit dem
    // Arbeitgeber; AZAV-Maßnahme, daher auch Bildungsgutschein möglich.
    funding: 'förderfähig über das Qualifizierungschancengesetz (QCG) für Beschäftigte',
    massnahmennummer: '357/413/2026',
    zulassung: { from: '2026-08-24', until: '2029-07-18' },
    certificate: 'Abschlusszertifikat „KI-Manager/in" der STARTPLATZ Köln GmbH',
    certIt: true,
    nextStart: null, // 19.10.2026 abgesagt; nächster Start in Planung
    path: '/berufstaetige',
    allmedaSlug: 'ki-manager-teilzeit',
    sources: [
      'Notion Kurskatalog KIM-TZ (Stand 12.10.2026)',
      'Maßnahmebogen 357/413/2026 (Zulassungsdauer)',
      'Jakow Smirin, 13.10.2026 (Zielgruppe, QCG, Theorie-/Praxistage)',
    ],
    openQuestions: [
      'Förderhinweis im Kurskatalog nennt nur Bildungsgutschein, Jakow das QCG — Kurskatalog ggf. ergänzen.',
    ],
  },
  {
    id: 'ai-automation-engineer',
    name: 'AI Automation Engineer (Vollzeit)',
    shortCode: 'AIAE-VZ',
    status: 'active',
    published: true,
    mode: 'Vollzeit',
    durationDays: 8,
    teachingUnits: 64, // à 45 Minuten
    schedule: 'täglich 09:00–12:00 und 13:00–16:00 Uhr',
    // Start immer mittwochs: Mi–Fr, dann Mo–Fr der Folgewoche (Martin, 12.10.2026)
    startWeekday: 'Mittwoch',
    // Zertifiziert und angeboten ausschließlich online (Briefing Martin 03.08.2026)
    location: 'live online',
    // Selbst-/Firmenzahler, netto zzgl. 19 % MwSt. (brutto 2.320,50 €).
    // Der Kostensatz der Arbeitsagentur (1.019,52 €) ist intern und gehört nicht auf die Website.
    price: 1950,
    funding: 'bis zu 100 % über Bildungsgutschein (Agentur für Arbeit, Jobcenter); keine QCG-Förderung (64 UE)',
    massnahmennummer: '357/420/2026',
    certificateNumber: 'A240300502-V1',
    zulassung: null, // Zeitraum steht im Kiwa-Zertifikat, wird auf der Website nicht genannt
    // Entscheidung 15.10.2026: Teilnahmebescheinigung, kein Zertifikat
    certificate: 'Teilnahmebescheinigung',
    certIt: false,
    trainer: 'Mohammad Speen', // Kurskonzept: Jakow Smirin
    path: '/ai-automation-engineer',
    allmedaSlug: 'weiterbildung-ai-automation-engineer-vollzeit',
    sources: [
      'Notion Kurskatalog AIAE-VZ (Stand 12.10.2026)',
      'Allmeda Event 7135 / Kursseite startplatz.de (Stand 09.11.2026: 1.950 € netto, 100 % live online, Teilnahmebescheinigung)',
      'Briefing Eventseite AI Automation Engineer, Martin Greguletz, 03.08.2026 (nur online, kein QCG, Kostensatz intern)',
      'Wiki akademie/ai-automation-engineer-vz (Entscheidung Teilnahmebescheinigung, 15.10.2026)',
      'Jakow Smirin, 13.10.2026 (Dozent Mohammad Speen)',
    ],
  },
];

export const getCourse = (id) => AZAV_COURSES.find((course) => course.id === id);

export const formatEuro = (amount) =>
  amount == null
    ? null
    : `${amount.toLocaleString('de-DE', { minimumFractionDigits: amount % 1 ? 2 : 0, maximumFractionDigits: 2 })} €`;
