import OneDayDetailPage from '../../../components/OneDayDetailPage';
import { CALENDLY_URL } from '../../../lib/site';

export const metadata = {
  title: 'OneDay Immobilien | KI-Bootcamp für Makler',
  description:
    'Ein eintägiges KI-Bootcamp für Immobilienmakler: Exposés, Social Content, Eigentümer-Akquise und Kundenkommunikation mit direkt nutzbaren KI-Workflows.',
  alternates: { canonical: '/oneday/immobilien' },
};

const config = {
  href: '/oneday/immobilien',
  searchIntentKey: 'immobilien',
  breadcrumb: 'Immobilien',
  badge: 'OneDay Workshop · Immobilien',
  accent: 'orange',
  title: 'KI-Workflows für <span>Makler.</span>',
  subtitle:
    'Ein Praxistag für Immobilienprofis, die mit KI bessere Exposés schreiben, schneller kommunizieren und Eigentümer-Akquise strukturierter angehen wollen.',
  heroImage: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1400/v1777162756/ai-hub/website/AI-Academy-Website-Images/oneday-immobilien-hero.png',
  ctaHref: CALENDLY_URL,
  primaryCta: 'Platz anfragen',
  meta: [
    { value: '1 Tag', label: '09-17 Uhr' },
    { value: '4', label: 'Use Cases' },
    { value: 'Max. 12', label: 'Teilnehmer' },
    { value: '449 €', label: 'Pilotplatz' },
  ],
  takeaways: [
    {
      title: 'Exposé-System',
      text: 'Aus Objektinfos, Zielgruppe und Tonalität entstehen bessere Texte und Varianten.',
    },
    {
      title: 'Akquise-Routine',
      text: 'Anschreiben, Gesprächsleitfaden und Einwandlogik für Eigentümerkontakte.',
    },
    {
      title: 'Content-Motor',
      text: 'Aus einem Objekt werden Posts, Captions, Stories und Follow-ups für mehrere Kanäle.',
    },
  ],
  why: {
    badge: 'Warum dieses Format',
    title: 'Immobilien-KI, die <span>im Alltag funktioniert.</span>',
    subtitle:
      'Kein generisches KI-Seminar. Der Tag ist auf typische Makleraufgaben gebaut: Objektkommunikation, Content, Eigentümergespräche und Follow-up.',
    cards: [
      {
        title: 'Branchenspezifisch',
        description:
          'Alle Übungen arbeiten mit Immobilienlogik: Objekte, Zielgruppen, Eigentümer, Interessenten und Vermarktung.',
        features: ['Objekte', 'Zielgruppen', 'Vermarktung'],
      },
      {
        title: 'Direkt anwendbar',
        description:
          'Du gehst mit Prompt-Vorlagen und Workflows raus, die du am nächsten Tag einsetzen kannst.',
        features: ['Vorlagen', 'Workflows', 'Sofortstart'],
      },
      {
        title: 'Eigene Fälle',
        description:
          'Bring ein Objekt, Exposé, Akquiseproblem oder Kommunikationsbeispiel mit. Wir arbeiten konkret daran.',
        features: ['Eigene Objekte', 'Akquise', 'Follow-up'],
      },
      {
        title: 'Weiterbildungsnachweis',
        description:
          'Du erhältst ein Zertifikat der STARTPLATZ AI Academy zur Dokumentation deiner Teilnahme.',
        features: ['Zertifikat', 'Dokumentation', 'Teamfähig'],
      },
    ],
  },
  useCases: {
    badge: 'Was du lernst',
    title: 'Vier Use Cases. <span>Kein Theorieballast.</span>',
    subtitle:
      'Der Fokus liegt auf Ergebnissen, die im Makleralltag Zeit sparen und Qualität erhöhen.',
    items: [
      {
        title: 'Objektexposé',
        description:
          'Aus Stichpunkten, Objektinfos und Zielgruppe entsteht ein überzeugendes Exposé mit klarer Tonalität.',
        features: ['Objekt-Briefing', 'Zielgruppenansprache', 'Textvarianten'],
      },
      {
        title: 'Social Media Content',
        description:
          'Aus einem Objekt entstehen LinkedIn-Post, Instagram-Caption und Story-Idee ohne jedes Mal bei null zu starten.',
        features: ['Content-Mix', 'Hook-Varianten', 'Redaktionsroutine'],
      },
      {
        title: 'Eigentümer-Akquise',
        description:
          'Personalisierte Anschreiben, Gesprächsleitfäden und Einwandbehandlung für Eigentümergespräche.',
        features: ['Akquisebrief', 'Einwandlogik', 'Gesprächsstruktur'],
      },
      {
        title: 'Kundenkommunikation',
        description:
          'Nachfass-E-Mails, Besichtigungs-Follow-ups, Absagen und Lead-Reaktivierung professionell vorbereiten.',
        features: ['Follow-up-System', 'E-Mail-Vorlagen', 'Lead-Reaktivierung'],
      },
    ],
  },
  visual: {
    title: 'Immobilien AI Workflow',
    image: 'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1777162756/ai-hub/website/AI-Academy-Website-Images/oneday-immobilien-hero.png',
    prompt:
      'New generated STARTPLATZ AI Academy visual: real estate professionals working with property material and AI workflow overlays, purple CI, no logos, no readable text.',
  },
  schedule: {
    title: 'Von 9 bis 17 Uhr. <span>Alles praktisch.</span>',
    subtitle:
      'Jede Einheit ist kurz erklärt und danach direkt angewendet. Du arbeitest an eigenen Objekten, Texten oder Akquise-Situationen.',
    items: [
      {
        time: '09:00',
        title: 'Ankommen & KI-Grundlagen',
        description:
          'Das wichtigste Fundament in kompakter Form: Tools, Datenschutzbewusstsein, gute Prompts und realistische Erwartungen.',
      },
      {
        time: '09:30',
        title: 'Use Case 1: Objektexposé',
        description:
          'Du arbeitest an einem eigenen Objekt und entwickelst daraus ein besser strukturiertes Exposé inklusive Varianten.',
        tag: 'Hands-on',
        highlight: true,
      },
      {
        time: '11:15',
        title: 'Use Case 2: Social Media Content',
        description:
          'Vom Exposé zum Content-Mix: LinkedIn, Instagram und kurze Story-Ideen aus einem strukturierten Input.',
        tag: 'Hands-on',
        highlight: true,
      },
      {
        time: '12:30',
        title: 'Lunch & Austausch',
        description: 'Pause, Catering und Austausch über konkrete Anwendungsfälle aus der Gruppe.',
      },
      {
        time: '13:15',
        title: 'Use Case 3: Eigentümer-Akquise',
        description:
          'Anschreiben, Gesprächsleitfäden und Einwandbehandlung für Eigentümerkontakte.',
        tag: 'Akquise',
        highlight: true,
      },
      {
        time: '14:45',
        title: 'Use Case 4: Kundenkommunikation & Follow-up',
        description:
          'Nachfass-E-Mails, Absagen, Reaktivierung und professionelle Antworten in wenigen Minuten vorbereiten.',
        tag: 'Kommunikation',
        highlight: true,
      },
      {
        time: '16:15',
        title: 'Toolkit & Transfer',
        description:
          'Du bekommst eine Prompt-Bibliothek und definierst deine nächsten drei Anwendungen für den Alltag.',
      },
    ],
  },
  pricing: {
    title: 'Pilotpreis für <span>Makler.</span>',
    subtitle:
      'Ein Tag, klare Workflows, kleines Teilnehmerfeld und konkrete Vorlagen zum Mitnehmen.',
    eyebrow: 'Pilotplatz',
    price: '449 €',
    priceSub: 'pro Person · eintägiger Workshop · netto zzgl. 19% MwSt. · inkl. Zertifikat',
    features: [
      'Ganztages-Bootcamp von 09:00 bis 17:00 Uhr',
      'Vier KI-Use-Cases für den Makleralltag',
      'Prompt-Toolkit für Exposé, Content, Akquise und Follow-up',
      'Kleine Gruppe mit maximal 12 Teilnehmern',
      'Zertifikat der STARTPLATZ AI Academy',
    ],
    cta: 'Platz anfragen',
    note: 'Für Maklerbüros und Teams bieten wir Inhouse-Termine auf Anfrage an.',
  },
  details: [
    { label: 'Format', value: 'OneDay Workshop, vor Ort in Köln' },
    { label: 'Zielgruppe', value: 'Immobilienmakler:innen, Maklerbüros, Vertriebs- und Marketingteams aus der Immobilienbranche.' },
    { label: 'Vorkenntnisse', value: 'Keine KI-Vorkenntnisse nötig. Du solltest Laptop und reale Beispielaufgaben mitbringen.' },
    { label: 'Ort', value: 'STARTPLATZ Köln · Im Mediapark 5 · 50670 Köln' },
  ],
  faqTitle: 'Fragen zu <span>OneDay Immobilien.</span>',
  faq: [
    {
      q: 'Ist das nur für Immobilienmakler?',
      a: 'Der Workshop ist auf Makleraufgaben optimiert. Auch Immobilienvertrieb, Projektentwicklung und Immobilienmarketing können profitieren.',
    },
    {
      q: 'Kann ich eigene Objekte mitbringen?',
      a: 'Ja. Genau das ist gewünscht. Bitte achte darauf, keine vertraulichen Kundendaten oder personenbezogenen Informationen in KI-Tools zu laden.',
    },
    {
      q: 'Bekomme ich Vorlagen?',
      a: 'Ja. Du erhältst ein Toolkit mit Prompt-Vorlagen für Exposé, Social Content, Akquise und Kundenkommunikation.',
    },
    {
      q: 'Ist das Rechts- oder Datenschutzberatung?',
      a: 'Nein. Wir zeigen verantwortungsbewusste Anwendung, typische Risiken und gute Arbeitsroutinen, ersetzen aber keine Rechts- oder Datenschutzberatung.',
    },
    {
      q: 'Können Maklerbüros das als Teamformat buchen?',
      a: 'Ja. Für Büros und Vertriebs- oder Marketingteams bieten wir Inhouse-Termine mit euren Objekten, Prozessen und Tonalitäten an.',
    },
  ],
  finalCta: {
    title: 'Bereit für bessere <span>Makler-Workflows?</span>',
    subtitle:
      'Frag deinen Platz an oder sprich mit uns über einen Inhouse-Termin für dein Maklerbüro.',
    button: 'Platz anfragen',
  },
};

export default function ImmobilienPage() {
  return <OneDayDetailPage config={config} />;
}
