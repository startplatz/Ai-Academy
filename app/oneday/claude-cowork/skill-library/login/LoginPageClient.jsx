'use client';

import React from 'react';
import Image from 'next/image';
import styled from 'styled-components';
import SubpageLayout from '../../../../../components/SubpageLayout';
import { Button } from '../../../../../components/ui';
import { tokens, media } from '../../../../../styles/tokens';
import { clipBR, CHAMFER, CyberCorners } from '../../../../../styles/cyberpunk';
import { loginClaudeCoworkLibrary } from '../actions';

const Shell = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  padding: calc(72px + ${tokens.spacing['3xl']}) ${tokens.spacing.lg} ${tokens.spacing['3xl']};
  background:
    linear-gradient(135deg, rgba(124, 58, 237, 0.14), rgba(20, 184, 166, 0.08) 42%, rgba(255, 153, 71, 0.08)),
    ${tokens.colors.pageBg};
`;

const LoginPanel = styled.div`
  position: relative;
  width: min(100%, 980px);
  display: grid;
  grid-template-columns: 1fr;
  background: rgba(255, 255, 255, 0.88);
  border: 1px solid rgba(124, 58, 237, 0.2);
  box-shadow: ${tokens.shadows.card};
  overflow: hidden;
  ${clipBR(CHAMFER.lg)}

  ${media.lg} {
    grid-template-columns: 0.9fr 1.1fr;
  }
`;

const Visual = styled.div`
  min-height: 320px;
  position: relative;
  overflow: hidden;
  background: ${tokens.colors.dark};

  img {
    width: 100%;
    height: 100%;
    min-height: 320px;
    object-fit: cover;
    opacity: 0.84;
    filter: saturate(0.95);
  }

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background:
      linear-gradient(180deg, rgba(10, 10, 10, 0.06), rgba(10, 10, 10, 0.76)),
      linear-gradient(90deg, rgba(124, 58, 237, 0.34), transparent);
  }
`;

const VisualCopy = styled.div`
  position: absolute;
  z-index: 1;
  left: ${tokens.spacing.xl};
  right: ${tokens.spacing.xl};
  bottom: ${tokens.spacing.xl};
`;

const VisualKicker = styled.div`
  margin-bottom: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.primaryLight};
  letter-spacing: 0.12em;
  text-transform: uppercase;
`;

const VisualTitle = styled.h1`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 5vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.darkText};
  text-transform: uppercase;
`;

const FormSide = styled.div`
  position: relative;
  padding: ${tokens.spacing['2xl']};

  ${media.md} {
    padding: ${tokens.spacing['3xl']};
  }
`;

const Badge = styled.div`
  display: inline-flex;
  margin-bottom: ${tokens.spacing.lg};
  padding: 6px 12px;
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: ${tokens.colors.primary};
  background: ${tokens.colors.primaryLighter};
  border: 1px solid rgba(124, 58, 237, 0.24);
  ${clipBR(CHAMFER.xs)}
`;

const Heading = styled.h2`
  max-width: 540px;
  margin-bottom: ${tokens.spacing.md};
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['3xl']}, 4vw, ${tokens.fontSizes['5xl']});
  font-weight: ${tokens.fontWeights.black};
  line-height: ${tokens.lineHeights.tight};
  color: ${tokens.colors.text};
  text-transform: uppercase;
`;

const Copy = styled.p`
  max-width: 560px;
  margin-bottom: ${tokens.spacing.xl};
  color: ${tokens.colors.textMuted};
  line-height: ${tokens.lineHeights.relaxed};
`;

const Form = styled.form`
  display: grid;
  gap: ${tokens.spacing.md};
`;

const Label = styled.label`
  display: grid;
  gap: ${tokens.spacing.sm};
  font-family: ${tokens.fonts.mono};
  font-size: ${tokens.fontSizes.xs};
  color: ${tokens.colors.textDim};
  letter-spacing: 0.08em;
  text-transform: uppercase;
`;

const Input = styled.input`
  width: 100%;
  min-height: 52px;
  padding: 0 ${tokens.spacing.md};
  font-family: ${tokens.fonts.body};
  font-size: ${tokens.fontSizes.base};
  color: ${tokens.colors.text};
  background: ${tokens.colors.surface};
  border: 1px solid rgba(124, 58, 237, 0.24);
  outline: 0;
  ${clipBR(CHAMFER.sm)}

  &:focus {
    border-color: ${tokens.colors.primary};
    box-shadow: 0 0 0 3px rgba(124, 58, 237, 0.12);
  }
`;

const ErrorText = styled.p`
  color: ${tokens.colors.coral};
  font-size: ${tokens.fontSizes.sm};
  line-height: ${tokens.lineHeights.relaxed};
`;

export default function LoginPageClient({ hasError = false }) {
  return (
    <SubpageLayout>
      <Shell>
        <LoginPanel>
          <CyberCorners $color={tokens.colors.primary} $size={14} />
          <Visual>
            <Image
              src="/claude-cowork/images/library-hero.webp"
              alt=""
              fill
              priority
              sizes="(min-width: 1024px) 392px, 100vw"
            />
            <VisualCopy>
              <VisualKicker>OneDay Claude Cowork</VisualKicker>
              <VisualTitle>Skill Library</VisualTitle>
            </VisualCopy>
          </Visual>
          <FormSide>
            <Badge>Teilnehmerzugang</Badge>
            <Heading>Claude Workflows freischalten.</Heading>
            <Copy>
              Melde dich mit dem Workshop-Passwort an und lade Skills oder komplette Skill-Pakete als Claude.ai Upload-ZIP herunter.
            </Copy>
            <Form action={loginClaudeCoworkLibrary}>
              <Label>
                Passwort
                <Input name="password" type="password" autoComplete="current-password" required />
              </Label>
              {hasError && <ErrorText>Das Passwort passt noch nicht. Bitte prüfe die Schreibweise.</ErrorText>}
              <Button type="submit" variant="primary" size="lg" arrow>
                Einloggen
              </Button>
            </Form>
          </FormSide>
        </LoginPanel>
      </Shell>
    </SubpageLayout>
  );
}
