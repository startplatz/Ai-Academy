import { CALENDLY_URL } from './site';

export const PRODUCT_CATALOG_URL = '/produktkatalog';

export const PRODUCT_IMAGES = {
  arbeitssuchende:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469601/ai-hub/website/AI-Academy-Website-Images/target-audience-arbeitssuchende.png',
  berufstaetige:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469600/ai-hub/website/AI-Academy-Website-Images/target-audience-berufstaetige.png',
  unternehmen:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469603/ai-hub/website/AI-Academy-Website-Images/target-audience-unternehmen.png',
  claudeCowork:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1777162756/ai-hub/website/AI-Academy-Website-Images/oneday-claude-cowork-hero.png',
  claudeCode:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1777167146/ai-hub/website/AI-Academy-Website-Images/oneday-claude-code-hero.png',
  kiKompetenz:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1777167151/ai-hub/website/AI-Academy-Website-Images/oneday-ki-kompetenz-hero.png',
  kiStart:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1777167150/ai-hub/website/AI-Academy-Website-Images/oneday-ki-start-hero.png',
  immobilien:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1777162756/ai-hub/website/AI-Academy-Website-Images/oneday-immobilien-hero.png',
};

export const FLAGSHIP_PRODUCTS = [
  {
    title: 'KI-Manager/in (Vollzeit)',
    category: 'Arbeitssuchende',
    accent: 'mint',
    price: '3.552 € / 0 €',
    priceDetail: 'Selbstzahler / Bildungsgutschein · AZAV',
    duration: '8 Wochen Vollzeit',
    audience: 'Für deinen KI-Neustart mit anerkanntem Kompetenznachweis.',
    image: PRODUCT_IMAGES.arbeitssuchende,
    href: '/arbeitssuchende',
    cta: 'Programm ansehen',
    highlights: ['Mo–Fr, 9–16 Uhr', 'Online oder vor Ort', 'AZAV-zugelassen'],
  },
  {
    title: 'KI-Manager/in (Teilzeit)',
    category: 'Berufstätige',
    accent: 'navy',
    price: 'QCG-förderfähig',
    priceDetail: 'Förderung über das Qualifizierungschancengesetz, je nach Betriebsgröße',
    duration: '16 Wochen, Mo–Do 14–18 Uhr',
    audience: 'Für Berufstätige, die nachmittags ab 14 Uhr freigestellt werden können.',
    image: PRODUCT_IMAGES.berufstaetige,
    href: '/berufstaetige',
    cta: 'Programm ansehen',
    highlights: ['Mo + Mi Theorie', 'Di + Do Praxis', 'AZAV-zugelassen'],
  },
  {
    title: 'OneDay Workshops',
    category: 'Tagesformate',
    accent: 'primary',
    price: 'ab 250 €',
    priceDetail: 'ein Tag, ein Thema, ein konkretes Deliverable',
    duration: '09-17 Uhr',
    audience: 'Für alle, die schnell in ein KI-Thema einsteigen und direkt etwas mitnehmen wollen.',
    image: PRODUCT_IMAGES.claudeCowork,
    href: '/oneday',
    cta: 'Workshops ansehen',
    highlights: ['Claude', 'KI-Start', 'Immobilien'],
  },
  {
    title: 'KI-Formate für Unternehmen',
    category: 'Teams & Organisationen',
    accent: 'orange',
    price: '7.900 €',
    priceDetail: 'Corporate Inhouse für OneDay-Formate bis 10 Teilnehmer:innen',
    duration: '1 Tag bis 12 Monate',
    audience: 'Für Teams, die KI-Kompetenz strukturiert, messbar und praxisnah aufbauen wollen.',
    image: PRODUCT_IMAGES.unternehmen,
    href: '/unternehmen',
    cta: 'Formate ansehen',
    highlights: ['Innovation Day', 'Inhouse', 'Private Academy'],
  },
];

export const ONE_DAY_PRODUCTS = [
  {
    title: 'OneDay Claude Cowork',
    accent: 'primary',
    subline: 'Ab morgen bist du Viele.',
    price: '590 € / 790 €',
    priceDetail: 'Early Bird / Regular · netto zzgl. 19% MwSt.',
    duration: '1 Tag',
    href: '/oneday/claude-cowork',
    cta: 'Details ansehen',
    image: PRODUCT_IMAGES.claudeCowork,
    badge: 'Claude Workflows',
    deliverables: ['Research', 'Writing', 'Analyse'],
    preview:
      'Du baust deinen persönlichen Claude-Arbeitsmodus für Recherche, Schreiben, Analyse und operative Aufgaben.',
  },
  {
    title: 'OneDay Claude Code',
    accent: 'primary',
    subline: 'Road to Thousand Commits.',
    price: '590 € / 790 €',
    priceDetail: 'Early Bird / Regular · netto zzgl. 19% MwSt.',
    duration: '1 Tag',
    href: CALENDLY_URL,
    cta: 'Termin anfragen',
    external: true,
    image: PRODUCT_IMAGES.claudeCode,
    badge: 'AI Coding',
    deliverables: ['Setup', 'Prompts', 'Review'],
    preview:
      'Ein kompakter Coding-Sprint für Teams und Builder, die Claude Code in echte Entwicklungsabläufe bringen wollen.',
  },
  {
    title: 'OneDay KI-Kompetenz',
    accent: 'orange',
    subline: 'EU-Zertifizierung an einem Tag.',
    price: '890 €',
    priceDetail: 'Early Bird und Regular · inkl. Kompetenznachweis',
    duration: '1 Tag',
    href: CALENDLY_URL,
    cta: 'Platz anfragen',
    external: true,
    image: PRODUCT_IMAGES.kiKompetenz,
    badge: 'Compliance & Kompetenz',
    deliverables: ['EU AI Act', 'Rollen', 'Nachweis'],
    preview:
      'Ein strukturierter Tag für Teams, die KI-Kompetenz nicht nur behaupten, sondern sauber dokumentieren wollen.',
  },
  {
    title: 'OneDay KI-Start',
    accent: 'mint',
    subline: 'Der kompakte Einstieg in KI.',
    price: '250 €',
    priceDetail: 'Early Bird und Regular · netto zzgl. 19% MwSt.',
    duration: '1 Tag',
    href: CALENDLY_URL,
    cta: 'Platz anfragen',
    external: true,
    image: PRODUCT_IMAGES.kiStart,
    badge: 'Einstieg',
    deliverables: ['Toolklarheit', 'Prompts', 'Routine'],
    preview:
      'Der schnelle Einstieg für alle, die KI endlich produktiv testen und erste wiederholbare Routinen aufbauen wollen.',
  },
  {
    title: 'OneDay Immobilien',
    accent: 'orange',
    subline: 'KI-Workflows für Makleralltag, Exposés und Akquise.',
    price: '449 € Pilotplatz',
    priceDetail: 'pro Person · eintägiger Workshop',
    duration: '1 Tag',
    href: '/oneday/immobilien',
    cta: 'Details ansehen',
    image: PRODUCT_IMAGES.immobilien,
    badge: 'Immobilien',
    deliverables: ['Exposé', 'Content', 'Akquise'],
    preview:
      'Branchenspezifische Workflows für Exposés, Social Content, Eigentümer-Akquise und Kundenkommunikation.',
  },
];

export const PRICE_LIST_2026 = {
  title: 'STARTPLATZ AI Academy · Preisliste 2026',
  note: 'Alle Preise netto, zzgl. 19 % MwSt.',
  groups: [
    {
      title: 'OneDay — Tagesformate',
      subtitle: 'Nicht förderfähig',
      columns: ['Produkt', 'Early Bird', 'Regular'],
      rows: [
        ['OneDay Claude Cowork', '590 €', '790 €'],
        ['OneDay Claude Code', '590 €', '790 €'],
        ['OneDay KI-Kompetenz', '890 €', '890 €'],
        ['OneDay KI-Start', '250 €', '250 €'],
      ],
    },
    {
      title: 'KI-Manager/in — Vollzeit',
      subtitle: 'AZAV, voll förderfähig',
      columns: ['Produkt', 'Selbstzahler', 'Bildungsgutschein'],
      rows: [['KI-Manager/in (Vollzeit)', '3.552 €', '0 €']],
    },
    {
      title: 'KI-Manager/in — Teilzeit',
      subtitle: 'AZAV, förderfähig über das QCG',
      columns: ['Produkt', 'Rhythmus', 'Förderung'],
      rows: [['KI-Manager/in (Teilzeit)', '16 Wochen, Mo–Do 14–18 Uhr', 'QCG, je nach Betriebsgröße']],
    },
  ],
  corporate: {
    title: 'Corporate Inhouse',
    subtitle: 'Für OneDay-Formate',
    price: '7.900 €',
    description: 'Pauschal bis 10 Teilnehmer:innen, geschlossene Gruppe, eigener Termin.',
  },
  addon: {
    title: 'Add-on',
    price: '120 € p. P.',
    description: '30-Day Follow-Up: 60-min Gruppen-Call + 4 Wochen Slack-Zugang.',
  },
  summerWeek: {
    title: 'SummerWeek',
    status: 'Aktuell pausiert.',
  },
};

export const COMPANY_PRODUCTS = [
  {
    title: 'Innovation Day',
    price: 'auf Anfrage',
    duration: '1 Tag',
    href: '/unternehmen#innovation-day',
    cta: 'Format ansehen',
    image: PRODUCT_IMAGES.unternehmen,
    audience: 'Für Teams, die aus KI-Neugier ein klares Lagebild und priorisierte Use Cases machen wollen.',
    highlights: ['Use-Case-Mapping', 'Tool-Demos', 'Roadmap-Sprint'],
  },
  {
    title: 'Inhouse KI-Schulung',
    price: 'auf Anfrage',
    duration: '1-5 Tage',
    href: '/unternehmen#inhouse-schulungen',
    cta: 'Format ansehen',
    image: PRODUCT_IMAGES.unternehmen,
    audience: 'Für Fachbereiche, die KI im eigenen Arbeitsalltag anwenden und wiederholbare Workflows bauen wollen.',
    highlights: ['Praxisnahes Training', 'Eigene Prozesse', 'Governance-Bausteine'],
  },
  {
    title: 'AI-Private Academy',
    price: 'auf Anfrage',
    duration: '3-12 Monate',
    href: '/unternehmen#private-academy',
    cta: 'Format ansehen',
    image: PRODUCT_IMAGES.unternehmen,
    audience: 'Für Organisationen, die KI-Kompetenz über mehrere Teams hinweg skalierbar aufbauen wollen.',
    highlights: ['Eigene Lernpfade', 'Transferformate', 'Metriken & Refresher'],
  },
];
