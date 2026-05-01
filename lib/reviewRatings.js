export const REVIEW_RATINGS = {
  live: false,
  checkedAt: 'Stand: 01.05.2026',
  sourceLabel: 'STARTPLATZ auf ProvenExpert',
  sourceUrl: 'https://www.provenexpert.com/de-de/startplatz/',
  total: {
    value: '411',
    label: 'veröffentlichte Bewertungen',
    detail: 'von 417 eingegangenen Bewertungen',
  },
  platforms: [
    {
      id: 'google',
      name: 'Google',
      value: '4,50',
      suffix: '/5',
      label: 'Google Bewertung',
      detail: '379 Bewertungen auf Google',
      href: 'https://www.google.com/maps/search/?api=1&query=STARTPLATZ%20Im%20Mediapark%205%2050670%20K%C3%B6ln',
      accent: 'navy',
    },
    {
      id: 'provenexpert',
      name: 'ProvenExpert',
      value: '4,84',
      suffix: '/5',
      label: 'ProvenExpert Bewertung',
      detail: '25 Bewertungen auf ProvenExpert',
      href: 'https://www.provenexpert.com/de-de/startplatz/',
      accent: 'primary',
    },
  ],
};
