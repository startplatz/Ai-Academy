import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const projectRoot = dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  compiler: {
    styledComponents: true,
  },
  turbopack: {
    root: projectRoot,
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      { protocol: 'https', hostname: 'upload.wikimedia.org' },
      { protocol: 'https', hostname: 'images.unsplash.com' },
    ],
  },
  async redirects() {
    return [
      // OneDay-Workshops werden nicht mehr angeboten (Entscheidung Martin, 09.11.2026).
      // Die Skill Library unter /oneday/claude-cowork/skill-library bleibt erreichbar.
      { source: '/oneday', destination: '/produktkatalog', permanent: true },
      { source: '/oneday/claude-cowork', destination: '/produktkatalog', permanent: true },
      { source: '/oneday/immobilien', destination: '/produktkatalog', permanent: true },
      // Kursseiten umbenannt (09.11.2026): Zielgruppen-Adressen → Produkt-Adressen.
      // Dauerhafte Weiterleitung, Query-Parameter (z. B. UTM) bleiben erhalten.
      { source: '/arbeitssuchende', destination: '/ki-manager-vollzeit', permanent: true },
      { source: '/berufstaetige', destination: '/ki-manager-teilzeit', permanent: true },
      // Alte startplatz.de KI-Unterseiten → neue Domain
      {
        source: '/ki-weiterbildungen',
        has: [{ type: 'host', value: 'www.startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/ki-manager-vollzeit',
        permanent: true,
      },
      {
        source: '/ki-weiterbildungen',
        has: [{ type: 'host', value: 'startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/ki-manager-vollzeit',
        permanent: true,
      },
      {
        source: '/ki-weiterbildungen/:path*',
        has: [{ type: 'host', value: 'www.startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/ki-manager-vollzeit',
        permanent: true,
      },
      {
        source: '/ki-weiterbildungen/:path*',
        has: [{ type: 'host', value: 'startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/ki-manager-vollzeit',
        permanent: true,
      },
      // Alte Personio-Stelle, Nachfolger ist das Online-Marketing-Praktikum
      {
        source: '/karriere/marketing-praktikum',
        destination: '/karriere/online-marketing-praktikum',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
