'use client';

import { useState, useEffect } from 'react';

/**
 * Custom hook: tracks mouse position normalised to [-1, 1]
 * and provides smooth lerped values for parallax effects.
 *
 * Performance: the requestAnimationFrame loop runs ONLY while the value
 * is actually settling toward the cursor. Once it reaches the target the
 * loop stops completely, so it no longer forces ~60fps React re-renders
 * while the page sits idle. On touch / no-hover devices, or when the user
 * prefers reduced motion, the loop never starts at all -- the resting
 * value {0, 0} is exactly what those devices already display, so the
 * visual output is identical.
 *
 * @param {number} smoothing - lerp factor (0 = frozen, 1 = instant). Default 0.08
 * @returns {{ x: number, y: number }}
 */
export default function useMouseParallax(smoothing = 0.08) {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Parallax is a mouse-only flourish. Skip the loop entirely on devices
    // without a hovering pointer, or when reduced motion is requested. The
    // {0,0} resting value is what they already render.
    const mq = (query) =>
      typeof window.matchMedia === 'function'
        ? window.matchMedia(query).matches
        : false;
    if (
      mq('(hover: none)') ||
      mq('(pointer: coarse)') ||
      mq('(prefers-reduced-motion: reduce)')
    ) {
      return;
    }

    const EPS = 0.0005;
    const target = { x: 0, y: 0 };
    const current = { x: 0, y: 0 };
    let raf = null;
    let running = false;

    const tick = () => {
      current.x += (target.x - current.x) * smoothing;
      current.y += (target.y - current.y) * smoothing;

      const dx = target.x - current.x;
      const dy = target.y - current.y;

      // Settled: snap exactly to target, emit one final value, stop the loop.
      if (Math.abs(dx) < EPS && Math.abs(dy) < EPS) {
        current.x = target.x;
        current.y = target.y;
        setPos({ x: current.x, y: current.y });
        running = false;
        raf = null;
        return;
      }

      setPos({ x: current.x, y: current.y });
      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      if (running || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(tick);
    };

    const handleMouseMove = (e) => {
      target.x = (e.clientX / window.innerWidth - 0.5) * 2;
      target.y = (e.clientY / window.innerHeight - 0.5) * 2;
      start();
    };

    const handleVisibility = () => {
      if (document.hidden) {
        if (raf) cancelAnimationFrame(raf);
        raf = null;
        running = false;
      } else {
        // Settle to the latest target if the cursor moved while hidden.
        start();
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibility);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [smoothing]);

  return pos;
}
