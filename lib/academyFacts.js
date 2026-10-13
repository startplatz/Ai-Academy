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
  // Laut Notion-Kursbeschreibung nur bei Vollzeit; für Teilzeit unbestätigt.
  courses: ['ki-manager-vollzeit'],
  // NICHT belegt — nicht auf der Website behaupten, bis Cert-IT es bestätigt:
  iso17024Accredited: null,
  euWideRecognition: null,
  label: 'freiwillige, unabhängige Abschlussprüfung bei Cert-IT',
  sources: [
    'Akademie-Plugin kurs-kpi-report (Cert-IT-Prüfungslisten, „freiwillige externe Abschlussprüfung“)',
    'Notion: Wert des Cert-IT-Abschlusses (Ehrlichkeits-Hinweis: nicht „staatlich anerkannt“)',
    'Notion: KI Manager – Weiterbildung (Vollzeit & Teilzeit), Cert-IT nur bei Vollzeit',
  ],
  openQuestions: [
    'Ist die KI-Manager-Prüfung nach DIN EN ISO/IEC 17024 akkreditiert? „Europaweit anerkannt“? (Frage an Duygu)',
    'Können Teilzeit-Teilnehmende die Cert-IT-Prüfung ablegen?',
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
    certIt: false, // unbestätigt, siehe CERT_IT.openQuestions
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
    // Erst veröffentlichen, wenn die offenen Fragen geklärt sind.
    published: false,
    mode: 'Vollzeit',
    durationDays: 8,
    teachingUnits: 64,
    schedule: 'täglich 09:00–12:00 und 13:00–16:00 Uhr', // laut Allmeda-Seite, im Katalog leer
    location: null, // Katalog: „Online"; laut Dominic sind alle Kurse hybrid — klären
    price: null, // Katalog 1.019,52 € vs. Allmeda-Seite 1.950 € netto — klären
    funding: 'bis zu 100 % über Bildungsgutschein',
    massnahmennummer: '357/420/2026',
    zulassung: null, // nicht gefunden
    certificate: 'Teilnahmebescheinigung',
    certIt: false,
    trainer: 'Mohammad Speen', // Kurskonzept: Jakow Smirin
    allmedaSlug: 'weiterbildung-ai-automation-engineer-vollzeit',
    sources: [
      'Notion Kurskatalog AIAE-VZ (Stand 12.10.2026)',
      'Allmeda Event 7135',
      'Jakow Smirin, 13.10.2026 (Dozent Mohammad Speen)',
    ],
    openQuestions: [
      'Ort: nur online (Katalog) oder hybrid?',
      'Preis: 1.019,52 € (Katalog) oder 1.950 € netto (Allmeda)?',
      'Zulassungszeitraum der Maßnahme 357/420/2026',
    ],
  },
];

export const getCourse = (id) => AZAV_COURSES.find((course) => course.id === id);

export const formatEuro = (amount) =>
  amount == null
    ? null
    : `${amount.toLocaleString('de-DE', { minimumFractionDigits: amount % 1 ? 2 : 0, maximumFractionDigits: 2 })} €`;
