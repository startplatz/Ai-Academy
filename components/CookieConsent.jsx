'use client';

import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { tokens } from '../styles/tokens';

/* ─────────────────────────────────────────────
   COOKIE CONSENT – Consent Mode v2 Banner
   Kategorien: Essenziell (immer), Statistik, Marketing.
   Die Defaults (alles denied) setzt ein Inline-Script im
   <head> (app/layout.jsx), BEVOR GTM/GA laden. Diese
   Komponente holt die Nutzerwahl ein und pusht das Update.
   ───────────────────────────────────────────── */

const STORAGE_KEY = 'aia_consent_v1';

function readStored() {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (typeof parsed !== 'object' || parsed === null) return null;
    return { analytics: !!parsed.analytics, marketing: !!parsed.marketing };
  } catch {
    return null;
  }
}

function applyConsent(choice) {
  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  gtag('consent', 'update', {
    analytics_storage: choice.analytics ? 'granted' : 'denied',
    ad_storage: choice.marketing ? 'granted' : 'denied',
    ad_user_data: choice.marketing ? 'granted' : 'denied',
    ad_personalization: choice.marketing ? 'granted' : 'denied',
    personalization_storage: choice.analytics || choice.marketing ? 'granted' : 'denied',
  });
  // Re-Trigger für consent-gated GTM-Tags (z.B. Clarity), da ein
  // consent-update allein blockierte Tags nicht erneut auslöst.
  window.dataLayer.push({ event: 'aia_consent_update' });
}

function persist(choice) {
  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ ...choice, ts: new Date().toISOString() })
    );
  } catch {
    /* Storage nicht verfügbar (z.B. Safari privat) – Wahl gilt für die Session */
  }
}

const Banner = styled.section`
  position: fixed;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  z-index: 10001;
  width: min(680px, calc(100vw - 24px));
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-top: 3px solid ${tokens.colors.primary};
  box-shadow: 0 12px 40px rgba(15, 15, 15, 0.18);
  padding: 20px 22px;

  h2 {
    font-size: 15px;
    font-weight: 700;
    color: ${tokens.colors.text};
    margin-bottom: 6px;
  }

  p {
    font-size: 13px;
    line-height: 1.55;
    color: ${tokens.colors.textMuted};
    margin-bottom: 14px;

    a {
      color: ${tokens.colors.primary};
      text-decoration: underline;
    }
  }
`;

const Toggles = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px 22px;
  margin-bottom: 14px;

  label {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    font-size: 13px;
    color: ${tokens.colors.textSoft};
    cursor: pointer;

    input {
      accent-color: ${tokens.colors.primary};
      width: 16px;
      height: 16px;
      cursor: pointer;
    }

    input:disabled {
      cursor: not-allowed;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;

  @media (max-width: 560px) {
    flex-direction: column;
  }
`;

const BaseButton = styled.button`
  font-family: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 10px 18px;
  border: 1px solid transparent;
  cursor: pointer;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;
`;

const AcceptAll = styled(BaseButton)`
  background: ${tokens.colors.primary};
  color: #fff;

  &:hover {
    background: ${tokens.colors.primaryHover};
  }
`;

const Decline = styled(BaseButton)`
  background: transparent;
  color: ${tokens.colors.textSoft};
  border-color: ${tokens.colors.glassBorder};

  &:hover {
    border-color: ${tokens.colors.textMuted};
  }
`;

const SaveSelection = styled(BaseButton)`
  background: transparent;
  color: ${tokens.colors.primary};
  border-color: ${tokens.colors.primary};

  &:hover {
    background: ${tokens.colors.primaryLighter};
  }
`;

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [analytics, setAnalytics] = useState(false);
  const [marketing, setMarketing] = useState(false);

  useEffect(() => {
    const stored = readStored();
    if (!stored) {
      setVisible(true);
    }

    const reopen = () => {
      const current = readStored();
      setAnalytics(current ? current.analytics : false);
      setMarketing(current ? current.marketing : false);
      setVisible(true);
    };
    window.addEventListener('aia:consent-open', reopen);
    return () => window.removeEventListener('aia:consent-open', reopen);
  }, []);

  if (!visible) return null;

  const decide = (choice) => {
    persist(choice);
    applyConsent(choice);
    setVisible(false);
  };

  return (
    <Banner role="dialog" aria-modal="false" aria-label="Cookie-Einstellungen">
      <h2>Cookies &amp; Datenschutz</h2>
      <p>
        Wir verwenden Cookies und ähnliche Technologien für Statistik (Google
        Analytics, Microsoft Clarity) und Marketing. Essenzielle Funktionen
        laufen ohne Tracking. Details in der{' '}
        <a href="/datenschutz">Datenschutzerklärung</a>.
      </p>
      <Toggles>
        <label>
          <input type="checkbox" checked disabled />
          Essenziell
        </label>
        <label>
          <input
            type="checkbox"
            checked={analytics}
            onChange={(e) => setAnalytics(e.target.checked)}
          />
          Statistik
        </label>
        <label>
          <input
            type="checkbox"
            checked={marketing}
            onChange={(e) => setMarketing(e.target.checked)}
          />
          Marketing
        </label>
      </Toggles>
      <Buttons>
        <AcceptAll onClick={() => decide({ analytics: true, marketing: true })}>
          Alle akzeptieren
        </AcceptAll>
        <Decline onClick={() => decide({ analytics: false, marketing: false })}>
          Ablehnen
        </Decline>
        <SaveSelection onClick={() => decide({ analytics, marketing })}>
          Auswahl speichern
        </SaveSelection>
      </Buttons>
    </Banner>
  );
}
