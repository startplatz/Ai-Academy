'use client';

// React is auto-imported in Next.js but we keep it for clarity
import React from 'react';
import styled from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, clipTLBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';

/* ─────────────────────────────────────────────
   FOOTER – Dark cyberpunk section
   Chamfered elements, corner accents
   ───────────────────────────────────────────── */

const LOGO_URL = 'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/png/logo-full-color-on-dark-400w.png';

const LINK_GROUPS = [
  { title: 'Programme', links: [
    { label: 'Für Arbeitssuchende', href: '/arbeitssuchende' },
    { label: 'Für Berufstätige', href: '/berufstaetige' },
    { label: 'Für Unternehmen', href: '/unternehmen' },
    { label: 'OneDay Workshops', href: '/oneday' },
    { label: 'Produktkatalog', href: '/produktkatalog' },
    { label: 'Experten & Dozenten', href: '/experten' },
  ]},
  { title: 'Ressourcen', links: [
    { label: 'Über Uns', href: '/ueber-uns' },
    { label: 'Insights', href: '/insights' },
    { label: 'Presse & Medien', href: '/presse' },
    { label: 'Events', href: '/#events' },
    { label: 'FAQ', href: '/#faq' },
  ]},
  { title: 'Rechtliches', links: [
    { label: 'Impressum', href: '/impressum' },
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'AGB', href: '/agb' },
  ]},
];

const Foot = styled.footer`
  position: relative;
  z-index: 1;
  background: ${tokens.colors.dark};
  color: ${tokens.colors.darkText};
  padding: ${tokens.spacing['4xl']} ${tokens.spacing.lg} ${tokens.spacing['2xl']};
  ${media.lg} {
    padding: ${tokens.spacing['4xl']} ${tokens.spacing['2xl']} ${tokens.spacing['2xl']};
  }
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
`;

const TopGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['3xl']};
  margin-bottom: ${tokens.spacing['3xl']};
  ${media.md} { grid-template-columns: 1.5fr repeat(3, 1fr); gap: ${tokens.spacing['2xl']}; }
`;

const BrandCol = styled.div`
  img { height: 32px; width: auto; margin-bottom: ${tokens.spacing.lg}; }
  p {
    font-size: ${tokens.fontSizes.sm};
    color: ${tokens.colors.darkMuted};
    line-height: ${tokens.lineHeights.relaxed};
    max-width: 320px;
    margin-bottom: ${tokens.spacing.xl};
    hyphens: none;
    word-break: normal;
    overflow-wrap: normal;
  }
`;

const SocialRow = styled.div`
  display: flex;
  gap: ${tokens.spacing.md};
`;

const SocialLink = styled.a`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 36px; height: 36px;
  ${clipBR(CHAMFER.xs)}
  background: rgba(255,255,255,0.06);
  border: 1px solid rgba(255,255,255,0.08);
  color: ${tokens.colors.darkMuted};
  text-decoration: none;
  transition: all ${tokens.transitions.fast};

  svg { flex-shrink: 0; }

  &:hover {
    background: ${tokens.colors.primary};
    color: #fff;
    border-color: ${tokens.colors.primary};
    transform: translateY(-2px);
  }
`;

const LinkCol = styled.div`
  h2 {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes.sm};
    font-weight: ${tokens.fontWeights.semi};
    color: ${tokens.colors.darkText};
    margin-bottom: ${tokens.spacing.lg};
    text-transform: uppercase;
    letter-spacing: 0.06em;
  }
  ul { display: flex; flex-direction: column; gap: ${tokens.spacing.sm}; }
  a {
    font-size: ${tokens.fontSizes.sm};
    color: ${tokens.colors.darkMuted};
    text-decoration: none;
    transition: color ${tokens.transitions.fast};
    &:hover { color: #fff; }
  }
`;

const Divider = styled.hr`
  border: none;
  height: 1px;
  background: rgba(255,255,255,0.08);
  margin-bottom: ${tokens.spacing.xl};
`;

const Bottom = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${tokens.spacing.md};
  ${media.md} { flex-direction: row; justify-content: space-between; align-items: center; }
`;

const Copyright = styled.p`
  font-size: ${tokens.fontSizes.xs};
  color: rgba(255,255,255,0.35);
`;

const Contact = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${tokens.spacing.lg};
  font-size: ${tokens.fontSizes.xs};
  color: rgba(255,255,255,0.35);
  a { color: rgba(255,255,255,0.35); text-decoration: none; &:hover { color: ${tokens.colors.primaryLight}; } }
`;

const FooterCornerDecor = styled.div`
  position: absolute;
  top: ${tokens.spacing.lg};
  right: ${tokens.spacing.lg};
  width: 16px; height: 16px;
  border-top: 2px solid ${tokens.colors.mint};
  border-right: 2px solid ${tokens.colors.mint};
  opacity: 0.3;
  pointer-events: none;
`;

const FooterCornerDecorBL = styled.div`
  position: absolute;
  bottom: ${tokens.spacing.lg};
  left: ${tokens.spacing.lg};
  width: 16px; height: 16px;
  border-bottom: 2px solid ${tokens.colors.mint};
  border-left: 2px solid ${tokens.colors.mint};
  opacity: 0.3;
  pointer-events: none;
`;

export default function Footer() {
  return (
    <Foot role="contentinfo">
      <FooterCornerDecor aria-hidden="true" />
      <FooterCornerDecorBL aria-hidden="true" />
      <Inner>
        <TopGrid>
          <BrandCol>
            <img src={LOGO_URL} alt="STARTPLATZ AI Academy" width="200" height="32" loading="lazy" />
            <p>STARTPLATZ AI Academy – Dein Partner für KI&#8209;Weiterbildung in NRW.<br />Geförderte Bootcamps, praxisnahe Kurse und eine starke Community.</p>
            <SocialRow>
              <SocialLink href="https://www.linkedin.com/company/startplatz" aria-label="LinkedIn" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.5 2h-17A1.5 1.5 0 002 3.5v17A1.5 1.5 0 003.5 22h17a1.5 1.5 0 001.5-1.5v-17A1.5 1.5 0 0020.5 2zM8 19H5v-9h3zM6.5 8.25A1.75 1.75 0 118.3 6.5a1.78 1.78 0 01-1.8 1.75zM19 19h-3v-4.74c0-1.42-.6-1.93-1.38-1.93A1.74 1.74 0 0013 14.19a.66.66 0 000 .14V19h-3v-9h2.9v1.3a3.11 3.11 0 012.7-1.4c1.55 0 3.36.86 3.36 3.66z"/></svg>
              </SocialLink>
              <SocialLink href="https://www.instagram.com/startplatz" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </SocialLink>
              <SocialLink href="https://www.youtube.com/@startplatz" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </SocialLink>
            </SocialRow>
          </BrandCol>
          {LINK_GROUPS.map((g) => (
            <LinkCol key={g.title}>
              <h2>{g.title}</h2>
              <ul>{g.links.map((l) => <li key={l.label}><a href={l.href}>{l.label}</a></li>)}</ul>
            </LinkCol>
          ))}
        </TopGrid>
        <Divider />
        <Bottom>
          <Copyright>&copy; 2026 STARTPLATZ AI Academy. Alle Rechte vorbehalten.</Copyright>
          <Contact as="address">
            <span>Im Mediapark 5, 50670 Köln</span>
            <a href="tel:+4922196881273" aria-label="Telefon: +49 221 96881273">+49 221 96881273</a>
            <a href="mailto:academy@startplatz.de" aria-label="E-Mail: academy@startplatz.de">academy@startplatz.de</a>
          </Contact>
        </Bottom>
      </Inner>
    </Foot>
  );
}
