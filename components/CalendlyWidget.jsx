'use client';

import { useEffect } from 'react';
import { CALENDLY_BASE_URL } from '../lib/site';

const WIDGET_SCRIPT = 'https://assets.calendly.com/assets/external/widget.js';
const WIDGET_CSS = 'https://assets.calendly.com/assets/external/widget.css';
let calendlyScriptPromise = null;

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_content', 'utm_term'];

function isCalendlyBookingUrl(href) {
  try {
    const url = new URL(href, window.location.href);
    return url.origin === 'https://calendly.com' && url.pathname.startsWith('/d/cxtf-hhx-929');
  } catch {
    return false;
  }
}

// Attaches whatever real UTM parameters brought the visitor to this page
// onto the outgoing Calendly link. No hardcoded fallback values are added
// when the page URL carries no UTM parameters.
function withPageUtms(href) {
  const url = new URL(href, window.location.href);
  const pageParams = new URLSearchParams(window.location.search);

  UTM_KEYS.forEach((key) => {
    const value = pageParams.get(key);
    if (value) {
      url.searchParams.set(key, value);
    }
  });

  return url.toString();
}

function ensureCalendlyAssets() {
  if (typeof window === 'undefined') return Promise.resolve();

  if (!document.querySelector('link[data-calendly-widget-css]')) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = WIDGET_CSS;
    link.dataset.calendlyWidgetCss = 'true';
    document.head.appendChild(link);
  }

  if (window.Calendly?.initPopupWidget) return Promise.resolve();
  if (calendlyScriptPromise) return calendlyScriptPromise;

  calendlyScriptPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = WIDGET_SCRIPT;
    script.async = true;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });

  return calendlyScriptPromise;
}

export default function CalendlyWidget() {
  useEffect(() => {
    const handleClick = async (event) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const anchor = event.target?.closest?.('a[href]');
      if (!anchor) return;

      const href = anchor.href;
      if (!isCalendlyBookingUrl(href)) return;

      event.preventDefault();

      const hrefWithUtms = withPageUtms(href || CALENDLY_BASE_URL);

      try {
        await ensureCalendlyAssets();
        window.Calendly?.initPopupWidget({ url: hrefWithUtms });
      } catch {
        window.location.href = hrefWithUtms;
      }
    };

    document.addEventListener('click', handleClick);
    return () => document.removeEventListener('click', handleClick);
  }, []);

  return null;
}
