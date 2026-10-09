/*
  Social-Metadaten für Unterseiten.

  Next.js mergt `openGraph` und `twitter` nicht tief: Sobald eine Seite ein
  eigenes `openGraph`-Objekt setzt, fallen Bild, siteName und locale aus dem
  Root-Layout weg, und ohne eigenes `twitter`-Objekt zeigt X/Twitter den
  Titel der Startseite. `withSocial` ergänzt beides aus den Seitendaten.
*/

export const SITE_NAME = 'STARTPLATZ AI Academy';

export const DEFAULT_OG_IMAGES = [
  {
    url: 'https://res.cloudinary.com/startplatz/image/upload/v1776469608/ai-hub/website/AI-Academy-Website-Images/team-gruppenfoto.png',
    width: 1200,
    height: 630,
    alt: 'STARTPLATZ AI Academy Team – Gruppenfoto',
  },
];

export function withSocial(metadata) {
  const og = metadata.openGraph || {};
  const title = og.title ?? (typeof metadata.title === 'string' ? metadata.title : undefined);
  const description = og.description ?? metadata.description;
  const images = og.images || DEFAULT_OG_IMAGES;

  return {
    ...metadata,
    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      locale: 'de_DE',
      ...og,
      title,
      description,
      images,
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images,
      ...metadata.twitter,
    },
  };
}
