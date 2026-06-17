'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import styled, { css, keyframes } from 'styled-components';
import { tokens, media } from '../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../styles/cyberpunk';
import { CALENDLY_URL } from '../lib/site';

const LOGO_URL = 'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/png/logo-full-color-on-light-400w.png';

const NAV_LINKS = [
  {
    label: 'Weiterbildungen',
    href: '/arbeitssuchende',
    children: [
      { label: 'Arbeitssuchend', href: '/arbeitssuchende' },
      { label: 'Berufstätig', href: '/berufstaetige' },
      { label: 'OneDay Workshops', href: '/oneday' },
    ],
  },
  {
    label: 'Für Unternehmen',
    href: '/unternehmen',
    children: [
      { label: 'Innovation Day', href: '/unternehmen#innovation-day' },
      { label: 'Inhouse Schulungen', href: '/unternehmen#inhouse-schulungen' },
      { label: 'AI-Private Academy', href: '/unternehmen#private-academy' },
    ],
  },
  { label: 'Experten', href: '/experten' },
  {
    label: 'Über Uns',
    href: '/ueber-uns',
    children: [
      { label: 'Über Uns', href: '/ueber-uns' },
      { label: 'Karriere', href: '/karriere' },
      { label: 'Presse & Medien', href: '/presse' },
    ],
  },
  {
    label: 'Insights',
    href: '/insights',
    children: [
      { label: 'Übersicht', href: '/insights' },
      { label: 'KI-News · Daily', href: '/insights/ki-news' },
    ],
  },
];

const Header = styled.header`
  position: fixed;
  top: 0; left: 0; width: 100%;
  z-index: ${tokens.zIndex.nav};
  transition: background ${tokens.transitions.base}, box-shadow ${tokens.transitions.base};

  ${({ $scrolled }) => $scrolled && css`
    background: rgba(255, 255, 255, 0.88);
    backdrop-filter: blur(20px) saturate(1.6);
    -webkit-backdrop-filter: blur(20px) saturate(1.6);
    box-shadow: 0 1px 0 rgba(0,0,0,0.06);
  `}
`;

const Inner = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 72px;

  ${media.lg} {
    padding: 0 ${tokens.spacing['2xl']};
  }
`;

const LogoWrap = styled.a`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 2;
  padding: 4px;
  cursor: pointer;

  img { height: 34px; width: auto; }
`;

const LogoLink = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  text-decoration: none;
  z-index: 2;
  padding: 4px;

  img { height: 34px; width: auto; }
`;

const LogoCorner = styled.span`
  position: absolute;
  bottom: -3px; right: -5px;
  width: 8px; height: 8px;
  border-right: 2px solid ${tokens.colors.mint};
  border-bottom: 2px solid ${tokens.colors.mint};
  pointer-events: none;
`;

const DesktopNav = styled.nav`
  display: none;
  ${media.lg} { display: flex; align-items: center; gap: ${tokens.spacing.xl}; }
`;

const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  padding: 20px 0;
  margin: -20px 0;
`;

const NavLink = styled.a`
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.medium};
  color: ${tokens.colors.textMuted};
  text-decoration: none;
  position: relative;
  padding: ${tokens.spacing.xs} 0;
  transition: color ${tokens.transitions.fast};
  display: flex;
  align-items: center;
  gap: ${tokens.spacing.xs};

  &::after {
    content: '';
    position: absolute;
    bottom: -2px; left: 0;
    width: 0; height: 2px;
    background: ${tokens.colors.primary};
    transition: width ${tokens.transitions.base};
  }

  &:hover {
    color: ${tokens.colors.text};
    &::after { width: 100%; }
  }
`;

const DropdownTrigger = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: ${tokens.fontSizes.xs};
  margin-left: ${tokens.spacing.xs};
  transition: transform ${tokens.transitions.base};
  transform: rotate(0deg);

  ${NavItem}:hover &,
  ${NavItem}:focus-within & {
    transform: rotate(180deg);
  }
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: -${tokens.spacing.md};
  padding-top: 4px;
  background: transparent;
  min-width: 260px;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity 0.2s ease, visibility 0.2s ease, transform 0.2s ease;
  pointer-events: none;
  z-index: ${tokens.zIndex.overlay};

  ${NavItem}:hover &,
  ${NavItem}:focus-within & {
    opacity: 1;
    visibility: visible;
    transform: translateY(0);
    pointer-events: auto;
  }
`;

const DropdownInner = styled.div`
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  box-shadow: ${tokens.shadows.lg};
  border-radius: ${tokens.radii.md};
  overflow: hidden;
`;

const DropdownLink = styled.a`
  display: block;
  padding: ${tokens.spacing.md} ${tokens.spacing.lg};
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.medium};
  color: ${tokens.colors.textMuted};
  text-decoration: none;
  transition: background ${tokens.transitions.fast}, color ${tokens.transitions.fast};

  &:hover {
    background: ${tokens.colors.primaryLighter};
    color: ${tokens.colors.primary};
  }

  &:focus-visible {
    background: ${tokens.colors.primaryLighter};
    color: ${tokens.colors.primary};
    outline: 2px solid ${tokens.colors.primary};
    outline-offset: -2px;
  }
`;

const CTABtnWrap = styled.div`
  position: relative;
  display: none;
  ${media.lg} { display: inline-flex; }
`;

const CTAButton = styled.a`
  position: relative;
  display: inline-flex;
  align-items: center;
  padding: 10px 20px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${tokens.colors.primary};
  ${clipBR(CHAMFER.xs)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  transition: background ${tokens.transitions.fast}, transform ${tokens.transitions.fast};
  z-index: 1;

  &:hover {
    background: ${tokens.colors.primaryHover};
    transform: translate(-1px, -1px);
    color: #fff;
  }
`;

const CTAOffset = styled.div`
  position: absolute;
  inset: 0;
  background: ${tokens.colors.primary};
  opacity: 0.2;
  ${clipBR(CHAMFER.xs)}
  transform: translate(3px, 3px);
  transition: transform ${tokens.transitions.fast};
  z-index: 0;

  ${CTABtnWrap}:hover & {
    transform: translate(4px, 4px);
  }
`;

/* Burger sits inside header flow when closed, but needs a
   separate fixed-position clone overlay when menu is open so
   it escapes the Header stacking context.  We solve this with
   TWO elements: an invisible placeholder inside the header
   and the real button rendered at root level as fixed.       */

const BurgerInner = styled.button`
  display: flex; flex-direction: column; gap: 5px;
  padding: ${tokens.spacing.sm};
  ${media.lg} { display: none; }

  span {
    display: block; width: 22px; height: 2px;
    background: ${tokens.colors.text};
    transition: transform ${tokens.transitions.base}, opacity ${tokens.transitions.fast};
  }

  ${({ $open }) => $open && css`
    span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    span:nth-child(2) { opacity: 0; }
    span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `}
`;

const BurgerFixed = styled.button`
  position: fixed;
  top: 22px;
  right: ${tokens.spacing.lg};
  z-index: ${tokens.zIndex.nav + 10};
  display: flex; flex-direction: column; gap: 5px;
  padding: ${tokens.spacing.sm};
  ${media.lg} { display: none; }

  span {
    display: block; width: 22px; height: 2px;
    background: #fff;
    transition: transform ${tokens.transitions.base}, opacity ${tokens.transitions.fast};
  }

  span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
  span:nth-child(2) { opacity: 0; }
  span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
`;

/* ── Staggered Mobile Menu ──────────────────── */

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-40px); }
  to   { opacity: 1; transform: translateX(0); }
`;

const fadeInMenu = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`;

const MobileOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: ${tokens.colors.dark};
  z-index: ${tokens.zIndex.nav + 1};
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 88px ${tokens.spacing['2xl']} ${tokens.spacing['2xl']};
  overflow-y: auto;
  overscroll-behavior: contain;
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  visibility: ${({ $open }) => ($open ? 'visible' : 'hidden')};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition:
    opacity 0.4s ease,
    visibility 0s linear ${({ $open }) => ($open ? '0s' : '0.4s')};
  ${media.lg} { display: none; }
`;

const MobileNav = styled.nav`
  display: flex;
  flex-direction: column;
  gap: 0;
`;

const MobileLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes.lg}, 5vw, ${tokens.fontSizes['2xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.darkText};
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.02em;
  padding: ${tokens.spacing.md} 0;
  border-bottom: 1px solid rgba(255,255,255,0.08);
  position: relative;
  opacity: 0;
  transform: translateX(-40px);
  transition: color 0.2s ease;

  /* Stagger animation when menu opens */
  ${({ $open, $delay }) => $open && css`
    animation: ${slideIn} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${$delay}ms forwards;
  `}

  &:hover, &:focus {
    color: ${tokens.colors.primary};
  }

  /* Number index */
  &::before {
    content: '${({ $idx }) => String($idx).padStart(2, '0')}';
    font-family: ${tokens.fonts.mono};
    font-size: ${tokens.fontSizes.xs};
    font-weight: ${tokens.fontWeights.medium};
    color: ${tokens.colors.primary};
    letter-spacing: 0.1em;
    position: absolute;
    left: 0;
    top: ${tokens.spacing.sm};
  }
`;

const MobileLinkLabel = styled.span`
  flex: 1;
  min-width: 0;
  padding-left: ${tokens.spacing.xl};
  padding-right: ${tokens.spacing.md};
`;

const MobileLinkArrow = styled.span`
  flex-shrink: 0;
  font-size: ${tokens.fontSizes.lg};
  color: ${tokens.colors.darkMuted};
  transition: color 0.2s ease, transform 0.2s ease;

  ${MobileLink}:hover & {
    color: ${tokens.colors.primary};
    transform: translateX(4px);
  }
`;

const MobileCTA = styled.a`
  display: block;
  margin-top: ${tokens.spacing.xl};
  padding: 16px 32px;
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  font-weight: ${tokens.fontWeights.semi};
  color: #fff;
  background: ${tokens.colors.primary};
  ${clipBR(CHAMFER.sm)}
  text-decoration: none;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  text-align: center;
  opacity: 0;
  transition: background 0.2s ease;

  ${({ $open, $delay }) => $open && css`
    animation: ${slideIn} 0.5s cubic-bezier(0.25, 0.1, 0.25, 1) ${$delay}ms forwards;
  `}

  &:hover { background: ${tokens.colors.primaryHover}; color: #fff; }
`;

const MobileFooter = styled.div`
  margin-top: auto;
  padding-top: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.darkMuted};
  letter-spacing: 0.05em;
  opacity: 0;

  ${({ $open, $delay }) => $open && css`
    animation: ${fadeInMenu} 0.6s ease ${$delay}ms forwards;
  `}
`;

function handleHashNavigation(href) {
  if (href.startsWith('/#')) {
    const hash = href.slice(1);
    const element = document.querySelector(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }
}

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleScroll = useCallback(() => { setScrolled(window.scrollY > 40); }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  /* Close mobile menu on Escape key */
  useEffect(() => {
    const handleEsc = (e) => { if (e.key === 'Escape' && mobileOpen) setMobileOpen(false); };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [mobileOpen]);

  /* Prevent body scroll when mobile menu is open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);
  const mobileLinks = NAV_LINKS.flatMap((l) => {
    if (l.children) {
      return l.children.map((child) => ({
        ...child,
        mobileKey: `${l.href}-${child.href}-${child.label}`,
      }));
    }

    return [{
      ...l,
      mobileKey: `${l.href}-${l.label}`,
    }];
  });

  return (
    <>
      <Header $scrolled={scrolled} role="banner">
        <Inner>
          <LogoLink href="/" aria-label="STARTPLATZ AI Academy">
            <img src={LOGO_URL} alt="STARTPLATZ AI Academy Logo" width="200" height="34" loading="eager" />
            <LogoCorner aria-hidden="true" />
          </LogoLink>
          <DesktopNav aria-label="Hauptnavigation">
            {NAV_LINKS.map((l) => (
              <NavItem key={l.href}>
                {l.children ? (
                  <>
                    <NavLink as={Link} href={l.href} aria-haspopup="true">
                      {l.label}
                      <DropdownTrigger aria-hidden="true">▼</DropdownTrigger>
                    </NavLink>
                    <Dropdown>
                      <DropdownInner>
                        {l.children.map((child) => (
                          <DropdownLink
                            key={`${l.href}-${child.href}-${child.label}`}
                            as={Link}
                            href={child.href}
                          >
                            {child.label}
                          </DropdownLink>
                        ))}
                      </DropdownInner>
                    </Dropdown>
                  </>
                ) : l.href.startsWith('/#') ? (
                  <NavLink
                    as="button"
                    onClick={() => handleHashNavigation(l.href)}
                    style={{ border: 'none', background: 'none', cursor: 'pointer', font: 'inherit' }}
                  >
                    {l.label}
                  </NavLink>
                ) : (
                  <NavLink as={Link} href={l.href}>{l.label}</NavLink>
                )}
              </NavItem>
            ))}
          </DesktopNav>
          <CTABtnWrap>
            <CTAOffset aria-hidden="true" />
            <CTAButton
              href={CALENDLY_URL}
              target="_blank"
              rel="noopener noreferrer"
            >
              Beratung buchen
            </CTAButton>
          </CTABtnWrap>
          <BurgerInner $open={mobileOpen} onClick={() => setMobileOpen(true)}
            aria-label="Menü öffnen" aria-expanded={mobileOpen}
            style={{ visibility: mobileOpen ? 'hidden' : 'visible' }}>
            <span /><span /><span />
          </BurgerInner>
        </Inner>
      </Header>

      {/* Fixed close button – rendered at root level, outside Header stacking context */}
      {mobileOpen && (
        <BurgerFixed onClick={() => setMobileOpen(false)} aria-label="Menü schließen">
          <span /><span /><span />
        </BurgerFixed>
      )}

      <MobileOverlay
        $open={mobileOpen}
        aria-hidden={!mobileOpen}
        aria-modal={mobileOpen ? 'true' : undefined}
        role="dialog"
        aria-label="Navigation"
      >
        <MobileNav aria-label="Mobile Navigation">
          {mobileLinks.map((l, i) => {
            const delay = 100 + i * 70;

            if (l.href.startsWith('/#')) {
              return (
                <MobileLink
                  key={l.mobileKey}
                  as="button"
                  $open={mobileOpen}
                  $delay={delay}
                  $idx={i + 1}
                  onClick={() => { handleHashNavigation(l.href); closeMobile(); }}
                  tabIndex={mobileOpen ? 0 : -1}
                  style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'none', cursor: 'pointer', font: 'inherit', width: '100%' }}
                >
                  <MobileLinkLabel>{l.label}</MobileLinkLabel>
                  <MobileLinkArrow>→</MobileLinkArrow>
                </MobileLink>
              );
            }

            return (
              <MobileLink
                key={l.mobileKey}
                as={Link}
                href={l.href}
                $open={mobileOpen}
                $delay={delay}
                $idx={i + 1}
                onClick={closeMobile}
                tabIndex={mobileOpen ? 0 : -1}
              >
                <MobileLinkLabel>{l.label}</MobileLinkLabel>
                <MobileLinkArrow>→</MobileLinkArrow>
              </MobileLink>
            );
          })}

          <MobileCTA
            href={CALENDLY_URL}
            $open={mobileOpen}
            $delay={100 + mobileLinks.length * 70}
            onClick={closeMobile}
            tabIndex={mobileOpen ? 0 : -1}
            target="_blank"
            rel="noopener noreferrer"
          >
            Beratung buchen
          </MobileCTA>
        </MobileNav>

        <MobileFooter $open={mobileOpen} $delay={100 + (mobileLinks.length + 1) * 70}>
          STARTPLATZ AI Academy — Köln &amp; Düsseldorf
        </MobileFooter>
      </MobileOverlay>
    </>
  );
}
