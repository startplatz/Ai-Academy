'use client';

import React from 'react';
import styled from 'styled-components';
import SubpageLayout from '../../components/SubpageLayout';
import { tokens } from '../../styles/tokens';

/* ─────────────────────────────────────────────
   CLAUDE DESIGN FREEBIE – one-pager guide
   Direct-link-only resource page. Not linked in nav,
   not in sitemap, noindex via app/claude-design/page.jsx.
   Reproduces the exported artifact design 1:1, using the
   site's own logo assets + already-loaded brand fonts
   instead of the artifact's embedded copies.
   ───────────────────────────────────────────── */

const LOGO_FULL_COLOR =
  'https://res.cloudinary.com/startplatz/image/upload/ai-hub/website/AI-Academy%20Logos/png/logo-full-color-on-light-400w.png';
const ICON_PURPLE = '/logo-assets/png/icon-purple-128w.png';

const CHECK_BOX = {
  width: '17px',
  height: '17px',
  flexShrink: 0,
  marginTop: '2px',
  background: '#fff',
  clipPath: 'polygon(0 0,100% 0,100% calc(100% - 4px),calc(100% - 4px) 100%,0 100%)',
};

const CHECK_ITEM = { display: 'flex', gap: '10px', alignItems: 'flex-start' };
const CHECK_TEXT = { fontSize: '12.5px', lineHeight: 1.5, color: '#2D2D2D' };
const CHECK_STRONG = { fontWeight: 700, color: '#0F0F0F' };

const CHIP = {
  fontFamily: "'JetBrains Mono', monospace",
  fontSize: '12.5px',
  color: '#F5F5F5',
  background: 'rgba(255,255,255,0.06)',
  border: '1px solid rgba(255,255,255,0.16)',
  padding: '7px 13px',
  clipPath: 'polygon(0 0,100% 0,100% calc(100% - 6px),calc(100% - 6px) 100%,0 100%)',
};

const Wrap = styled.section`
  position: relative;
  z-index: 1;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  padding: 120px 20px ${tokens.spacing['3xl']};
`;

const Sheet = styled.div`
  width: min(210mm, 100%);
  max-width: 210mm;
  background: #ffffff;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08), 0 24px 60px rgba(124, 58, 237, 0.07);
  border-radius: 3px;
  padding: 10mm 13mm 9mm 13mm;
`;

function Phase({ number, color, colorSoft, title, why, items, showConnector }) {
  return (
    <div style={{ display: 'flex', gap: '18px', alignItems: 'stretch', paddingBottom: showConnector ? '13px' : 0 }}>
      <div style={{ position: 'relative', width: '44px', flexShrink: 0 }}>
        <div
          style={{
            position: 'relative',
            zIndex: 1,
            width: '44px',
            height: '44px',
            background: color,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            clipPath: 'polygon(0 0,100% 0,100% calc(100% - 10px),calc(100% - 10px) 100%,0 100%)',
          }}
        >
          <span style={{ fontFamily: "'Aileron', sans-serif", fontWeight: 900, fontSize: '22px', color: '#fff', lineHeight: 1 }}>
            {number}
          </span>
        </div>
        {showConnector && (
          <div
            style={{
              position: 'absolute',
              zIndex: 0,
              left: '21px',
              top: '50px',
              bottom: '-18px',
              width: '2px',
              background: '#7C3AED',
              opacity: 0.18,
            }}
          />
        )}
      </div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.16em',
            color: colorSoft,
            textTransform: 'uppercase',
          }}
        >
          {`Phase 0${number}`}
        </div>
        <div style={{ fontFamily: "'Aileron', sans-serif", fontWeight: 900, fontSize: '18px', lineHeight: 1.15, color: '#0F0F0F', marginTop: '2px' }}>
          {title}
        </div>
        <div style={{ fontSize: '12px', lineHeight: 1.45, color: '#6B6B6B', fontStyle: 'italic', marginTop: '4px', marginBottom: '7px' }}>
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '9px', fontWeight: 600, letterSpacing: '0.14em', color: '#9CA3AF' }}>
            WARUM&nbsp;&nbsp;
          </span>
          {why}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          {items.map((item, i) => (
            <div key={i} style={CHECK_ITEM}>
              <span style={{ ...CHECK_BOX, border: `1.6px solid ${color}` }} />
              <span style={CHECK_TEXT}>
                <strong style={CHECK_STRONG}>{item.bold}</strong> {item.rest}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ClaudeDesignPageClient() {
  return (
    <SubpageLayout>
      <Wrap>
        <Sheet>
          {/* ── HEADER ───────────────────────────────────── */}
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '12px' }}>
            <img src={LOGO_FULL_COLOR} alt="STARTPLATZ AI Academy" style={{ height: '30px', width: 'auto', display: 'block' }} />
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: '9.5px',
                fontWeight: 600,
                letterSpacing: '0.18em',
                color: '#B9B2C7',
                textTransform: 'uppercase',
                paddingTop: '11px',
              }}
            >
              Freebie
            </div>
          </div>

          <div
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: '10px',
              fontWeight: 600,
              letterSpacing: '0.18em',
              color: '#7C3AED',
              textTransform: 'uppercase',
              marginBottom: '7px',
            }}
          >
            Schnellstart · Claude Design
          </div>

          <h1 style={{ fontFamily: "'Aileron', sans-serif", fontWeight: 900, fontSize: '33px', lineHeight: 1.07, letterSpacing: 0, color: '#0F0F0F', textTransform: 'uppercase', margin: 0 }}>
            Einmal einrichten,
            <br />
            für immer on‑brand
          </h1>

          <div style={{ fontFamily: "'Aileron', sans-serif", fontWeight: 700, fontSize: '17px', lineHeight: 1.3, color: '#2D2D2D', marginTop: '9px' }}>
            Dein Schnellstart für Claude Design.
          </div>
          <div style={{ fontSize: '13.5px', lineHeight: 1.4, color: '#5C5C5C', marginTop: '3px' }}>
            Drei Phasen, ein Brand‑System, <strong style={{ fontWeight: 700, color: '#7C3AED' }}>null Hex‑Code‑Kopieren.</strong>
          </div>

          {/* dashed HUD separator */}
          <div style={{ height: '1px', margin: '11px 0 11px 0', background: 'rgba(0,0,0,0.1)' }} />

          {/* ── INTRO ────────────────────────────────────── */}
          <p style={{ fontSize: '13.5px', lineHeight: 1.55, color: '#2D2D2D', fontWeight: 400, margin: '0 0 10px 0', maxWidth: '96%' }}>
            Du brauchst keinen Designer und keine Vorlage. Du brauchst dein Brand‑System einmal, dann baut Claude alles darauf auf.
          </p>

          {/* ── PHASES ───────────────────────────────────── */}
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <Phase
              number={1}
              color="#14B8A6"
              colorSoft="#14B8A6"
              title="Einrichten: dein Brand‑System"
              why="Einmal sauber gefüttert, ist alles danach automatisch on‑brand."
              showConnector
              items={[
                { bold: 'Logo hochladen,', rest: 'am besten als Vektor oder PNG mit transparentem Hintergrund.' },
                { bold: 'Farben festlegen:', rest: 'Primär, Sekundär, Akzent. Hex‑Codes einmal rein, nie wieder kopieren.' },
                { bold: 'Schriften festlegen:', rest: 'eine für Überschriften, eine für Fließtext.' },
                {
                  bold: 'Kein Material zur Hand?',
                  rest: 'Beschreib deine Marke in einem Satz, etwa „modern, technisch, dunkel, mit kräftigem Grün", und lass Claude das System vorschlagen.',
                },
              ]}
            />

            <Phase
              number={2}
              color="#5CB5F2"
              colorSoft="#2E97E0"
              title="Erstellen: sag, was du brauchst"
              why="Du beschreibst das Ergebnis, Claude baut es auf dem Canvas, immer im Brand‑System."
              showConnector
              items={[
                { bold: 'Format klar benennen:', rest: 'Pitch Deck, Social Post, Landingpage, One‑Pager.' },
                { bold: 'Zweck und Ton mitgeben:', rest: '„für Investoren, seriös" oder „für TikTok, laut".' },
                { bold: 'Inhalt liefern oder skizzieren:', rest: 'Stichpunkte reichen, Claude baut die Struktur.' },
                { bold: 'Unsicher?', rest: 'Mehrere Varianten anfordern: „Gib mir drei Versionen."' },
              ]}
            />

            <Phase
              number={3}
              color="#FF9947"
              colorSoft="#E07A1F"
              title="Verfeinern: ändere es im Gespräch"
              why="Kein Menü‑Suchen. Du redest, es passt sich an."
              showConnector={false}
              items={[
                { bold: 'In kurzen Befehlen denken:', rest: '„Dunkler.", „Kürzer.", „Mutiger.", „Mehr Weißraum."' },
                { bold: 'Gezielt auf Elemente zeigen:', rest: '„Nur die Überschrift größer."' },
                { bold: 'On‑brand bleibt on‑brand:', rest: 'Änderungen brechen dein System nicht, sie arbeiten darin.' },
                { bold: 'Fertig?', rest: 'Exportieren und raus damit.' },
              ]}
            />
          </div>

          {/* ── PROMPT-SPICKZETTEL (dark HUD box) ────────── */}
          <div style={{ position: 'relative', marginTop: '11px' }}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                transform: 'translate(6px,6px)',
                background: '#A78BFA',
                opacity: 0.28,
                clipPath: 'polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)',
              }}
            />
            <div
              style={{
                position: 'relative',
                zIndex: 1,
                background: '#0A0A0A',
                padding: '18px 22px',
                clipPath: 'polygon(14px 0,100% 0,100% calc(100% - 14px),calc(100% - 14px) 100%,0 100%,0 14px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: '12px', flexWrap: 'wrap' }}>
                <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '11px', fontWeight: 600, letterSpacing: '0.16em', color: '#A78BFA', textTransform: 'uppercase' }}>
                  Prompt‑Spickzettel
                </div>
                <div style={{ fontSize: '11.5px', color: '#8A8A8A', fontWeight: 400 }}>Schnelle Verfeinern‑Befehle zum Mitsprechen</div>
              </div>
              <div style={{ height: '1px', margin: '11px 0 13px 0', background: 'rgba(255,255,255,0.1)' }} />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
                <span style={CHIP}>„Dunkler."</span>
                <span style={CHIP}>„Heller."</span>
                <span style={CHIP}>„Kürzer."</span>
                <span style={CHIP}>„Mutiger."</span>
                <span style={CHIP}>„Mehr Weißraum."</span>
                <span style={CHIP}>„Andere Variante."</span>
                <span style={CHIP}>„Mach es seriöser."</span>
                <span style={CHIP}>„Mach es verspielter."</span>
              </div>
            </div>
          </div>

          {/* ── CLOSING LINE ─────────────────────────────── */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginTop: '10px',
              background: '#EDE9FE',
              padding: '15px 20px',
              clipPath: 'polygon(0 0,100% 0,100% calc(100% - 13px),calc(100% - 13px) 100%,0 100%)',
            }}
          >
            <div style={{ width: '4px', alignSelf: 'stretch', background: '#7C3AED', flexShrink: 0 }} />
            <div style={{ fontFamily: "'Aileron', sans-serif", fontWeight: 800, fontSize: '16.5px', lineHeight: 1.32, color: '#2D2D2D' }}>
              Einmal einrichten. Dann sagst du es nur noch. <span style={{ color: '#5B21B6' }}>On‑brand kommt von allein.</span>
            </div>
          </div>

          {/* ── FOOTER ───────────────────────────────────── */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px', paddingTop: '8px', borderTop: '1px solid rgba(0,0,0,0.1)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <img src={ICON_PURPLE} alt="" style={{ height: '15px', width: 'auto', display: 'block' }} />
              <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 600, letterSpacing: '0.1em', color: '#5C5C5C', textTransform: 'uppercase' }}>
                AI Academy
              </span>
            </div>
            <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: '10.5px', fontWeight: 500, letterSpacing: '0.1em', color: '#9CA3AF', textTransform: 'uppercase' }}>
              Codewort: <span style={{ color: '#7C3AED', fontWeight: 600 }}>DESIGN</span>
            </div>
          </div>
        </Sheet>
      </Wrap>
    </SubpageLayout>
  );
}
