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
      // Alte startplatz.de KI-Unterseiten → neue Domain
      {
        source: '/ki-weiterbildungen',
        has: [{ type: 'host', value: 'www.startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/arbeitssuchende',
        permanent: true,
      },
      {
        source: '/ki-weiterbildungen',
        has: [{ type: 'host', value: 'startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/arbeitssuchende',
        permanent: true,
      },
      {
        source: '/ki-weiterbildungen/:path*',
        has: [{ type: 'host', value: 'www.startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/arbeitssuchende',
        permanent: true,
      },
      {
        source: '/ki-weiterbildungen/:path*',
        has: [{ type: 'host', value: 'startplatz.de' }],
        destination: 'https://startplatz-ai-academy.de/arbeitssuchende',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
