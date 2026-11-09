'use client';

import React, { useEffect, useState } from 'react';
import Script from 'next/script';
import styled from 'styled-components';
import { tokens } from '../styles/tokens';

/*
  Startknopf für den KI-Assistenten „Kim“ (ElevenLabs ConvAI).
  Datenschutz: Das ElevenLabs-Skript (unpkg.com) und die Verbindung zu
  ElevenLabs entstehen erst, nachdem Besucher den Hinweis gelesen und
  „Gespräch starten“ geklickt haben. Vorher keine Requests an Dritte.
  Bleibt wegklickbar; die Entscheidung gilt für die Browser-Sitzung.
*/

const SESSION_KEY = 'aia_kim_state'; // 'dismissed' | 'started'

const Dock = styled.div`
  position: fixed;
  right: 16px;
  bottom: 16px;
  z-index: 9000;
  font-family: ${tokens.fonts.body};
`;

const Launcher = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px 10px 10px 14px;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  box-shadow: 0 10px 30px rgba(15, 15, 15, 0.16);
  font-size: 14px;
  color: ${tokens.colors.text};
`;

const Primary = styled.button`
  font: inherit;
  font-size: 13px;
  font-weight: 600;
  padding: 8px 14px;
  color: #fff;
  background: ${tokens.colors.primary};
  border: 0;
  cursor: pointer;

  &:hover { background: ${tokens.colors.primaryHover}; }
`;

const Close = styled.button`
  font: inherit;
  font-size: 18px;
  line-height: 1;
  padding: 4px 6px;
  color: ${tokens.colors.textMuted};
  background: transparent;
  border: 0;
  cursor: pointer;
`;

const Notice = styled.div`
  width: min(340px, calc(100vw - 32px));
  padding: 16px;
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-top: 3px solid ${tokens.colors.primary};
  box-shadow: 0 12px 40px rgba(15, 15, 15, 0.18);
  font-size: 13px;
  line-height: 1.55;
  color: ${tokens.colors.textMuted};

  strong { display: block; margin-bottom: 6px; font-size: 15px; color: ${tokens.colors.text}; }
  p { margin: 0 0 12px; }
  a { color: ${tokens.colors.primary}; }
`;

const Row = styled.div`
  display: flex;
  gap: 8px;
  justify-content: flex-end;
`;

const Secondary = styled.button`
  font: inherit;
  font-size: 13px;
  padding: 8px 12px;
  color: ${tokens.colors.text};
  background: transparent;
  border: 1px solid ${tokens.colors.glassBorder};
  cursor: pointer;
`;

export default function KimAssistantLauncher({ agentId }) {
  const [view, setView] = useState('hidden'); // hidden | launcher | notice | started

  useEffect(() => {
    let stored = null;
    try { stored = window.sessionStorage.getItem(SESSION_KEY); } catch { /* ignore */ }
    // Erst nach dem Mount entscheiden, sonst weicht Server-HTML vom Client ab.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setView(stored === 'started' ? 'started' : stored === 'dismissed' ? 'hidden' : 'launcher');
  }, []);

  const remember = (value) => {
    try { window.sessionStorage.setItem(SESSION_KEY, value); } catch { /* ignore */ }
  };

  if (view === 'hidden') return null;

  if (view === 'started') {
    return (
      <>
        <elevenlabs-convai
          agent-id={agentId}
          dismissible="true"
          avatar-orb-color-1="#bea7ea"
          avatar-orb-color-2="#fffaff"
        />
        <Script src="https://unpkg.com/@elevenlabs/convai-widget-embed" strategy="afterInteractive" />
      </>
    );
  }

  return (
    <Dock>
      {view === 'launcher' && (
        <Launcher>
          <span>Brauchst du Hilfe?</span>
          <Primary type="button" onClick={() => setView('notice')}>Rede mit Kim</Primary>
          <Close type="button" aria-label="Assistent ausblenden" onClick={() => { remember('dismissed'); setView('hidden'); }}>×</Close>
        </Launcher>
      )}
      {view === 'notice' && (
        <Notice role="dialog" aria-label="Hinweis zum KI-Assistenten">
          <strong>Kurz vorab</strong>
          <p>
            Kim ist unser KI-Assistent von ElevenLabs. Wenn du das Gespräch startest, gehen deine
            Sprach- oder Texteingaben zur Verarbeitung an ElevenLabs (USA). Bitte teile keine
            sensiblen Daten. Mehr dazu in der <a href="/datenschutz">Datenschutzerklärung</a>.
          </p>
          <Row>
            <Secondary type="button" onClick={() => setView('launcher')}>Abbrechen</Secondary>
            <Primary type="button" onClick={() => { remember('started'); setView('started'); }}>Gespräch starten</Primary>
          </Row>
        </Notice>
      )}
    </Dock>
  );
}
