export const PRODUCT_CATALOG_URL = '/produktkatalog';

export const PRODUCT_IMAGES = {
  arbeitssuchende:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469601/ai-hub/website/AI-Academy-Website-Images/target-audience-arbeitssuchende.png',
  berufstaetige:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469600/ai-hub/website/AI-Academy-Website-Images/target-audience-berufstaetige.png',
  unternehmen:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1776469603/ai-hub/website/AI-Academy-Website-Images/target-audience-unternehmen.png',
  aiAutomationEngineer:
    'https://res.cloudinary.com/startplatz/image/upload/f_auto,q_auto,w_1200/v1786918367/events/2026/ai-automation-engineer-ki-agenten-automa.png',
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
    title: 'AI Automation Engineer',
    category: 'Kompakt in 8 Tagen',
    accent: 'primary',
    price: '1.950 € / bis 100 %',
    priceDetail: 'Selbst- oder Firmenzahler netto / mit Bildungsgutschein gefördert · AZAV',
    duration: '8 Kurstage, live online',
    audience: 'Für alle, die KI-Agenten und Automatisierungen mit n8n selbst bauen wollen.',
    image: PRODUCT_IMAGES.aiAutomationEngineer,
    href: '/ai-automation-engineer',
    cta: 'Programm ansehen',
    highlights: ['Start mittwochs', '9–16 Uhr', 'AZAV-zugelassen'],
  },
  {
    title: 'KI-Formate für Unternehmen',
    category: 'Teams & Organisationen',
    accent: 'orange',
    price: 'auf Anfrage',
    priceDetail: 'Innovation Day, Inhouse-Schulung oder Private Academy, kalkuliert nach Zielbild und Teamgröße',
    duration: '1 Tag bis 12 Monate',
    audience: 'Für Teams, die KI-Kompetenz strukturiert, messbar und praxisnah aufbauen wollen.',
    image: PRODUCT_IMAGES.unternehmen,
    href: '/unternehmen',
    cta: 'Formate ansehen',
    highlights: ['Innovation Day', 'Inhouse', 'Private Academy'],
  },
];

export const PRICE_LIST_2026 = {
  title: 'STARTPLATZ AI Academy · Preisliste 2026',
  note: 'Alle Preise netto, zzgl. 19 % MwSt.',
  groups: [
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
    {
      title: 'AI Automation Engineer — Vollzeit',
      subtitle: 'AZAV, förderfähig mit Bildungsgutschein',
      columns: ['Produkt', 'Selbstzahler', 'Bildungsgutschein'],
      rows: [['AI Automation Engineer (8 Tage)', '1.950 €', 'bis zu 100 %']],
    },
  ],
  corporate: {
    title: 'Für Unternehmen',
    subtitle: 'Für Unternehmen',
    price: 'auf Anfrage',
    description: 'Innovation Day, Inhouse-Schulung oder Private Academy: geschlossene Gruppe, eigener Termin, kalkuliert nach Zielbild, Dauer und Teamgröße.',
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
