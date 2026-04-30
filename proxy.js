import { NextResponse } from 'next/server';

/**
 * 301-Redirects von alten Domains auf startplatz-ai-academy.de
 *
 * Alte Domain               →  Neue URL
 * ─────────────────────────────────────────────────────────────
 * startplatz-ai-hub.de/*                    →  startplatz-ai-academy.de/
 * www.startplatz-ai-hub.de/*                →  startplatz-ai-academy.de/
 * bildungsgutschein.startplatz-ai-hub.de/*  →  startplatz-ai-academy.de/arbeitssuchende
 * afterwork.startplatz-ai-hub.de/*          →  startplatz-ai-academy.de/berufstaetige
 */

const OLD_DOMAINS = new Map([
  ['startplatz-ai-hub.de', '/'],
  ['www.startplatz-ai-hub.de', '/'],
  ['bildungsgutschein.startplatz-ai-hub.de', '/arbeitssuchende'],
  ['afterwork.startplatz-ai-hub.de', '/berufstaetige'],
]);

// Bekannte Pfade auf der alten Hub-Domain → neue Ziele
const PATH_MAP = new Map([
  ['/ki-manager-weiterbildung', '/arbeitssuchende'],
  ['/afterwork', '/berufstaetige'],
  ['/afterwork-ai-automation', '/berufstaetige'],
  ['/unternehmen', '/unternehmen'],
  ['/team', '/experten'],
  ['/about', '/ueber-uns'],
  ['/blog', '/insights'],
  ['/kontakt', '/'],
  ['/bildungsgutschein', '/arbeitssuchende'],
]);

const CANONICAL_HOST = 'startplatz-ai-academy.de';

export function proxy(request) {
  const host = request.headers.get('host')?.replace(/:.*$/, '') || '';

  // Nur alte Domains abfangen — alles auf der neuen Domain durchlassen
  if (host === CANONICAL_HOST || host === `www.${CANONICAL_HOST}`) {
    return NextResponse.next();
  }

  // Subdomain-spezifische Redirects (bildungsgutschein.*, afterwork.*)
  const subdomainTarget = OLD_DOMAINS.get(host);
  if (subdomainTarget !== undefined) {
    const pathname = request.nextUrl.pathname;

    // Prüfe ob es eine bekannte Pfad-Zuordnung gibt
    const mappedPath = PATH_MAP.get(pathname) || PATH_MAP.get(pathname.replace(/\/$/, ''));

    const targetPath = mappedPath || subdomainTarget;
    return NextResponse.redirect(
      `https://${CANONICAL_HOST}${targetPath}`,
      { status: 301 }
    );
  }

  return NextResponse.next();
}

export const config = {
  // Nur HTML-Requests abfangen, keine Assets
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico|css|js|woff|woff2|ttf|eot)).*)',
  ],
};
