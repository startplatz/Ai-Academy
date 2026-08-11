'use client';

import React from 'react';
import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../styles/GlobalStyles';
import { tokens } from '../styles/tokens';
import LiquidEther from './LiquidEther';
import Navigation from './Navigation';
import ScrollProgress from './ScrollProgress';
import Footer from './Footer';
import { getGpuTier, GPU_PRESETS } from '../utils/gpuTier';

export default function SubpageLayout({ children, solidNavigation = false }) {
  const mainRef = React.useRef(null);

  React.useEffect(() => {
    window.history.scrollRestoration = 'manual';
    window.scrollTo(0, 0);

    /* Adapt opacity to GPU tier — NO backdrop-filter anymore. */
    const tier = getGpuTier();
    const p = GPU_PRESETS[tier];
    if (mainRef.current) {
      mainRef.current.style.background = `rgba(255, 255, 255, ${p.mainOpacity})`;
    }
  }, []);

  return (
    <ThemeProvider theme={tokens}>
      <GlobalStyles />
      <a href="#main-content" className="skip-to-content">
        Zum Hauptinhalt springen
      </a>
      <LiquidEther
        colors={['#7C3AED', '#FF9FFC', '#B497CF']}
        mouseForce={18}
        cursorSize={150}
        resolution={0.5}
        autoDemo
        autoSpeed={0.6}
        autoIntensity={3.5}
      />
      <ScrollProgress />
      <Navigation forceSolid={solidNavigation} />

      <main
        ref={mainRef}
        id="main-content"
        role="main"
        style={{
          position: 'relative',
          zIndex: 1,
          background: 'rgba(255, 255, 255, 0.72)',
        }}
      >
        {children}
      </main>

      <Footer />
    </ThemeProvider>
  );
}
