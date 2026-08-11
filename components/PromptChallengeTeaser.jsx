'use client';

import Link from 'next/link';
import styled from 'styled-components';
import PlanetSection from './PlanetSection';
import { tokens, media } from '../styles/tokens';
import { CHAMFER, CyberCorners, clipTLBR } from '../styles/cyberpunk';

const Teaser = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  overflow: hidden;
  color: #fff;
  background: ${tokens.colors.dark};
  border: 1px solid rgba(124, 58, 237, 0.22);
  ${clipTLBR(CHAMFER.xl)}

  ${media.lg} {
    grid-template-columns: minmax(0, 1.1fr) minmax(360px, 0.7fr);
    min-height: 450px;
  }
`;

const Grid = styled.div`
  position: absolute;
  inset: 0;
  opacity: 0.16;
  pointer-events: none;
  background-image:
    linear-gradient(rgba(167,139,250,0.16) 1px, transparent 1px),
    linear-gradient(90deg, rgba(167,139,250,0.16) 1px, transparent 1px);
  background-size: 42px 42px;
`;

const Copy = styled.div`
  position: relative;
  z-index: 1;
  padding: clamp(2rem, 6vw, 4.5rem);
  align-self: center;
`;

const Label = styled.span`
  display: inline-block;
  margin-bottom: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  font-weight: ${tokens.fontWeights.semi};
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: ${tokens.colors.mint};
`;

const Title = styled.h2`
  max-width: 720px;
  margin-bottom: ${tokens.spacing.lg};
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['6xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: 0.98;
  letter-spacing: -0.04em;
  color: #fff;

  span {
    display: block;
    color: ${tokens.colors.primaryLight};
  }
`;

const Text = styled.p`
  max-width: 650px;
  margin-bottom: ${tokens.spacing.xl};
  font-size: ${tokens.fontSizes.base};
  line-height: ${tokens.lineHeights.relaxed};
  color: rgba(255,255,255,0.62);
`;

const ActionRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: ${tokens.spacing.lg};
`;

const Action = styled(Link)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: ${tokens.spacing.sm};
  min-height: 50px;
  padding: 0.85rem 1.35rem;
  font-size: ${tokens.fontSizes.sm};
  font-weight: ${tokens.fontWeights.bold};
  letter-spacing: 0.04em;
  text-transform: uppercase;
  color: #fff;
  background: ${tokens.colors.primary};
  text-decoration: none;
  clip-path: polygon(0 0, 100% 0, 100% calc(100% - 9px), calc(100% - 9px) 100%, 0 100%);
  transition: transform ${tokens.transitions.fast}, background ${tokens.transitions.fast};

  &:hover {
    color: #fff;
    background: ${tokens.colors.primaryHover};
    transform: translate(-2px, -2px);
  }
`;

const Meta = styled.span`
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: rgba(255,255,255,0.4);
`;

const Visual = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  min-height: 320px;
  overflow: hidden;
  border-top: 1px solid rgba(255,255,255,0.08);
  background: rgba(124,58,237,0.08);

  ${media.lg} {
    border-top: 0;
    border-left: 1px solid rgba(255,255,255,0.08);
  }
`;

const Core = styled.div`
  position: relative;
  display: grid;
  place-items: center;
  width: 164px;
  height: 164px;
  border: 1px solid rgba(167,139,250,0.45);
  transform: rotate(45deg);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: 20px;
    border: 1px dashed rgba(20,184,166,0.45);
  }

  &::after {
    inset: 48px;
    border-style: solid;
    border-color: ${tokens.colors.primaryLight};
    background: rgba(124,58,237,0.24);
    box-shadow: 0 0 34px rgba(124,58,237,0.25);
  }
`;

const Status = styled.div`
  position: absolute;
  right: ${tokens.spacing.lg};
  bottom: ${tokens.spacing.lg};
  left: ${tokens.spacing.lg};
  display: flex;
  justify-content: space-between;
  font-family: ${tokens.fonts.mono};
  font-size: 0.62rem;
  letter-spacing: 0.08em;
  color: rgba(255,255,255,0.35);

  strong {
    color: ${tokens.colors.mint};
  }
`;

export default function PromptChallengeTeaser() {
  return (
    <PlanetSection id="prompt-challenge" compactTop showStitch={false}>
      <Teaser>
        <Grid aria-hidden="true" />
        <CyberCorners $color={tokens.colors.mint} $size={14} />
        <Copy>
          <Label>{'NEXUS//BREACH · Neues Lernspiel'}</Label>
          <Title>
            Kannst du KAIRO
            <span>knacken?</span>
          </Title>
          <Text>
            Sechs Missionen gegen unseren eigenen KI-Wächter zu Prompt Injection, Jailbreaks und sicherem KI-Einsatz.
            Kostenlos, ohne Anmeldung und direkt im Browser spielbar.
          </Text>
          <ActionRow>
            <Action href="/prompt-challenge">
              Challenge starten <span aria-hidden="true">→</span>
            </Action>
            <Meta>6 Missionen · 10–15 Minuten</Meta>
          </ActionRow>
        </Copy>
        <Visual aria-hidden="true">
          <Core />
          <Status>
            <span>KAIRO / NEXUS_CORE</span>
            <strong>ONLINE</strong>
          </Status>
        </Visual>
      </Teaser>
    </PlanetSection>
  );
}
