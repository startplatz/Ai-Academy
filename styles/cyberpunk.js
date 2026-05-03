'use client';

import styled, { css, keyframes } from 'styled-components';
import { tokens } from './tokens';

/* ─────────────────────────────────────────────
   CYBERPUNK STYLE HELPERS
   Chamfered corners, corner accents, offset
   shadows, grid pulse effects.

   Inspired by Cyberpunk 2077 UI aesthetic.
   Colors + fonts stay unchanged – shapes only.
   ───────────────────────────────────────────── */

/* ── Chamfer Sizes ───────────────────────── */
export const CHAMFER = {
  xs: 6,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 28,
};

/* ── Clip-Path CSS Mixins ────────────────── */

export const clipBR = (size = CHAMFER.md) => css`
  clip-path: polygon(
    0 0, 100% 0,
    100% calc(100% - ${size}px),
    calc(100% - ${size}px) 100%,
    0 100%
  );
`;

export const clipTLBR = (size = CHAMFER.md) => css`
  clip-path: polygon(
    ${size}px 0, 100% 0,
    100% calc(100% - ${size}px),
    calc(100% - ${size}px) 100%,
    0 100%, 0 ${size}px
  );
`;

export const clipAll = (size = CHAMFER.md) => css`
  clip-path: polygon(
    ${size}px 0, calc(100% - ${size}px) 0,
    100% ${size}px, 100% calc(100% - ${size}px),
    calc(100% - ${size}px) 100%, ${size}px 100%,
    0 calc(100% - ${size}px), 0 ${size}px
  );
`;

export const clipTR = (size = CHAMFER.md) => css`
  clip-path: polygon(
    0 0, calc(100% - ${size}px) 0,
    100% ${size}px, 100% 100%,
    0 100%
  );
`;

/* ── Corner Accent Component ─────────────── */
/* Drop this inside any position:relative parent
   to get L-shaped corner decorations */

export const CyberCorners = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;
  opacity: ${({ $revealOnHover }) => ($revealOnHover ? 0 : 1)};
  transition: opacity ${tokens.transitions.base};

  &::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: ${({ $size }) => $size || 12}px;
    height: ${({ $size }) => $size || 12}px;
    border-top: 2px solid ${({ $color }) => $color || tokens.colors.mint};
    border-left: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  }
  &::after {
    content: '';
    position: absolute;
    bottom: -1px; right: -1px;
    width: ${({ $size }) => $size || 12}px;
    height: ${({ $size }) => $size || 12}px;
    border-bottom: 2px solid ${({ $color }) => $color || tokens.colors.mint};
    border-right: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  }

  ${({ $revealOnHover }) => $revealOnHover && css`
    :where(:hover, :focus-within) > & {
      opacity: 1;
    }

    @media (hover: none) {
      opacity: 1;
    }
  `}
`;

export const OuterCornerFrame = styled.div`
  position: absolute;
  inset: 0;
  z-index: 8;
  pointer-events: none;
  opacity: ${({ $revealOnHover }) => ($revealOnHover ? 0 : 1)};
  transition: opacity ${tokens.transitions.base};

  &::before,
  &::after {
    content: '';
    position: absolute;
    width: ${({ $size }) => $size || 16}px;
    height: ${({ $size }) => $size || 16}px;
  }

  &::before {
    top: -${({ $offset }) => $offset || 9}px;
    left: -${({ $offset }) => $offset || 9}px;
    border-top: 2px solid ${({ $color }) => $color || tokens.colors.mint};
    border-left: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  }

  &::after {
    right: -${({ $offset }) => $offset || 9}px;
    bottom: -${({ $offset }) => $offset || 9}px;
    border-right: 2px solid ${({ $color }) => $color || tokens.colors.mint};
    border-bottom: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  }

  ${({ $revealOnHover }) => $revealOnHover && css`
    :where(:hover, :focus-within) > & {
      opacity: 1;
    }

    @media (hover: none) {
      opacity: 1;
    }
  `}
`;

/* Four corner variant */
export const CyberCornersAll = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 5;

  /* Top-left */
  &::before {
    content: '';
    position: absolute;
    top: -1px; left: -1px;
    width: ${({ $size }) => $size || 12}px;
    height: ${({ $size }) => $size || 12}px;
    border-top: 2px solid ${({ $color }) => $color || tokens.colors.mint};
    border-left: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  }
  /* Bottom-right */
  &::after {
    content: '';
    position: absolute;
    bottom: -1px; right: -1px;
    width: ${({ $size }) => $size || 12}px;
    height: ${({ $size }) => $size || 12}px;
    border-bottom: 2px solid ${({ $color }) => $color || tokens.colors.mint};
    border-right: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  }
`;

/* Additional corners as child spans */
export const CornerTR = styled.span`
  position: absolute;
  top: -1px; right: -1px;
  width: ${({ $size }) => $size || 12}px;
  height: ${({ $size }) => $size || 12}px;
  border-top: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  border-right: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  pointer-events: none;
  z-index: 5;
`;

export const CornerBL = styled.span`
  position: absolute;
  bottom: -1px; left: -1px;
  width: ${({ $size }) => $size || 12}px;
  height: ${({ $size }) => $size || 12}px;
  border-bottom: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  border-left: 2px solid ${({ $color }) => $color || tokens.colors.mint};
  pointer-events: none;
  z-index: 5;
`;

/* ── Offset Shadow Layer ─────────────────── */
/* Place behind a button for the "window layering" effect */

export const OffsetLayer = styled.div`
  position: absolute;
  inset: 0;
  background: ${({ $color }) => $color || tokens.colors.primary};
  opacity: 0.25;
  transform: translate(${({ $x }) => $x || 4}px, ${({ $y }) => $y || 4}px);
  transition: transform ${tokens.transitions.fast}, opacity ${tokens.transitions.fast};
  z-index: -1;
  ${({ $chamfer }) => $chamfer && clipBR($chamfer)}
`;

/* ── Decorative Scan Line ────────────────── */

export const scanLineAnim = keyframes`
  0% { transform: translateY(-100%); }
  100% { transform: translateY(200%); }
`;

/* ── Grid Pulse Keyframes ────────────────── */
export const gridPulseAnim = keyframes`
  0%, 100% { opacity: 0.03; }
  50% { opacity: 0.07; }
`;

/* ── Decorative Dashed Lines ─────────────── */
export const CyberDash = styled.div`
  position: absolute;
  ${({ $top }) => $top !== undefined && `top: ${$top}px;`}
  ${({ $bottom }) => $bottom !== undefined && `bottom: ${$bottom}px;`}
  ${({ $left }) => $left !== undefined && `left: ${$left}px;`}
  ${({ $right }) => $right !== undefined && `right: ${$right}px;`}
  width: ${({ $w }) => $w || 40}px;
  height: 2px;
  background: repeating-linear-gradient(
    90deg,
    ${({ $color }) => $color || tokens.colors.primary} 0px,
    ${({ $color }) => $color || tokens.colors.primary} 4px,
    transparent 4px,
    transparent 8px
  );
  opacity: ${({ $opacity }) => $opacity || 0.3};
  pointer-events: none;
  z-index: 5;
`;

/* ── HUD-style decorative bar ────────────── */
export const CyberBar = styled.div`
  display: flex;
  gap: 3px;
  align-items: center;
  pointer-events: none;

  span {
    display: block;
    height: 2px;
    background: ${({ $color }) => $color || tokens.colors.primary};
    opacity: ${({ $opacity }) => $opacity || 0.4};

    &:first-child { width: 24px; }
    &:nth-child(2) { width: 8px; opacity: 0.25; }
    &:nth-child(3) { width: 8px; opacity: 0.15; }
  }
`;
