import Script from 'next/script';
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google';
import StyledComponentsRegistry from '../lib/registry';
import CalendlyWidget from '../components/CalendlyWidget';

export const metadata = {
  title: {
    default: 'Geförderte KI-Weiterbildung — praxisnah & zertifiziert',
    template: '%s | STARTPLATZ AI Academy',
  },
  description:
    'KI-Weiterbildung mit AZAV-Zertifizierung. Bis zu 100% gefördert mit Bildungsgutschein. FortyDays Bootcamp, AfterWork AI Automation & OneDay Workshops. 4,98/5 Sterne bei 290+ Bewertungen. Bundesweit digital verfügbar.',
  keywords:
    'KI Weiterbildung, KI Weiterbildung Deutschland, KI Weiterbildung gefördert, Bildungsgutschein KI, KI Manager Weiterbildung, KI Manager Zertifikat, AZAV KI Kurs, AI Bootcamp, KI Kurs online, Künstliche Intelligenz Kurs, STARTPLATZ, n8n Kurs, Prompt Engineering, KI Schulung Unternehmen, geförderte Weiterbildung, Cert-IT Zertifizierung, KI Weiterbildung berufsbegleitend',
  authors: [{ name: 'STARTPLATZ AI Academy' }],
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
  metadataBase: new URL('https://startplatz-ai-academy.de'),
  alternates: { canonical: '/' },
  icons: {
    icon: 'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/favicon/favicon-512x512.png',
    apple: 'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/favicon/apple-touch-icon.png',
  },
  openGraph: {
    type: 'website',
    siteName: 'STARTPLATZ AI Academy',
    title: 'KI-Weiterbildung mit Zertifikat | STARTPLATZ AI Academy',
    description:
      'KI-Weiterbildung mit Zertifikat. AZAV-zertifiziert, bis zu 100% gefördert. FortyDays, AfterWork & OneDay Workshops. 4,98/5 Sterne.',
    url: 'https://startplatz-ai-academy.de/',
    images: [
      {
        url: 'https://res.cloudinary.com/startplatz/image/upload/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png',
        width: 1200,
        height: 630,
        alt: 'STARTPLATZ AI Academy Team – Gruppenfoto',
      },
    ],
    locale: 'de_DE',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'KI-Weiterbildung mit Zertifikat | STARTPLATZ AI Academy',
    description:
      'KI-Weiterbildung mit Zertifikat. AZAV-zertifiziert, bis zu 100% gefördert. 4,98/5 Sterne bei 290+ Bewertungen.',
    images: [
      {
        url: 'https://res.cloudinary.com/startplatz/image/upload/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png',
        alt: 'STARTPLATZ AI Academy Team – Gruppenfoto',
      },
    ],
  },
  other: {
    'theme-color': '#7C3AED',
    'color-scheme': 'light',
  },
};

const jsonLd = [
  {
    '@context': 'https://schema.org',
    '@type': 'EducationalOrganization',
    name: 'STARTPLATZ AI Academy',
    url: 'https://startplatz-ai-academy.de/',
    logo: 'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/png/logo-full-color-on-light-800w.png',
    description:
      'Geförderte KI-Weiterbildungen, praxisnahe Bootcamps und anerkannte Zertifizierungen. Bundesweit digital verfügbar.',
    address: [
      {
        '@type': 'PostalAddress',
        streetAddress: 'Im Mediapark 5',
        addressLocality: 'Köln',
        postalCode: '50670',
        addressCountry: 'DE',
      },
      {
        '@type': 'PostalAddress',
        addressLocality: 'Düsseldorf',
        addressCountry: 'DE',
      },
    ],
    telephone: '+4922196881273',
    email: 'academy@startplatz.de',
    sameAs: [
      'https://www.linkedin.com/company/startplatz',
      'https://www.instagram.com/startplatz',
      'https://www.youtube.com/@startplatz',
    ],
    offers: {
      '@type': 'Offer',
      category: 'KI-Weiterbildung',
      description: '100 % förderfähig mit Bildungsgutschein',
      areaServed: {
        '@type': 'Place',
        name: 'Nordrhein-Westfalen, Deutschland',
      },
    },
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'STARTPLATZ AI Academy',
    url: 'https://startplatz-ai-academy.de/',
  },
];

export default function RootLayout({ children }) {
  return (
    <html lang="de" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-MJCL3ZS9" />
      <GoogleAnalytics gaId="G-20XFNS5WZY" />
      <head>
        {/* Preconnect */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://res.cloudinary.com" />
        <link rel="preconnect" href="https://reinhart1010.github.io" />

        {/* Fonts – Aileron (display/headings), Inter (body), JetBrains Mono (code) */}
        <link
          href="https://reinhart1010.github.io/aileron/aileron.lite.css"
          rel="stylesheet"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Outfit:wght@400;500;600;700;800;900&family=Inter:wght@400;500;600&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />

        {/* ElevenLabs ConvAI Widget — loaded via next/script to avoid hydration mismatch */}

        {/* JSON-LD */}
        {jsonLd.map((data, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
          />
        ))}

        {/* Inline critical CSS for preloader / base reset */}
        <style
          dangerouslySetInnerHTML={{
            __html: `
              *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
              html { scroll-behavior: smooth; }
              body {
                font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
                background: #FFFFFF;
                color: #111827;
                overflow-x: hidden;
                -webkit-font-smoothing: antialiased;
                -moz-osx-font-smoothing: grayscale;
              }
              #__next { min-height: 100vh; }
              .preloader {
                position: fixed; inset: 0; z-index: 10000;
                background: #FFFFFF;
                display: flex; align-items: center; justify-content: center;
              }
              .preloader-ring {
                width: 48px; height: 48px;
                border: 3px solid rgba(124, 58, 237, 0.15);
                border-top-color: #7C3AED;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
              }
              @keyframes spin { to { transform: rotate(360deg); } }
            `,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <StyledComponentsRegistry>{children}</StyledComponentsRegistry>
        <CalendlyWidget />
        <elevenlabs-convai
          agent-id="agent_7801kphmjab6fmk921djmyxcz10x"
          dismissible="true"
          avatar-orb-color-1="#7C3AED"
          avatar-orb-color-2="#14B8A6"
        />
        <Script
          src="https://unpkg.com/@elevenlabs/convai-widget-embed"
          strategy="lazyOnload"
        />
      </body>
    </html>
  );
}
