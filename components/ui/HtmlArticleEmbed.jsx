'use client';

import { useEffect, useRef } from 'react';

/**
 * Renders a self-contained "sp-article" HTML snippet (<article>) inside the site chrome.
 * The matching scoped CSS ships as a real static file linked via <link rel="stylesheet">
 * by the page — not injected inline, since dynamically-created <style> tags get silently
 * rescoped/broken by tooling in this environment.
 *
 * Content arrives pre-rendered as an HTML string — dangerouslySetInnerHTML is safe here
 * because these snippets are authored in-house, never user input.
 *
 * <script> tags inside innerHTML never execute (browser behavior), so any
 * "Prompt kopieren" button logic is re-wired here via a real click listener instead.
 */
export default function HtmlArticleEmbed({ html }) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const buttons = container.querySelectorAll('.sp-copy');
    if (!buttons.length) return;

    function fallbackCopy(text) {
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      try { document.execCommand('copy'); } catch (e) { /* no-op */ }
      document.body.removeChild(ta);
    }

    function makeHandler(btn) {
      const raw = btn.closest('.sp-prompt')?.querySelector('script[type="text/plain"]')
        || container.querySelector('script[type="text/plain"]');

      return function handleClick() {
        if (!raw) return;
        const text = raw.textContent.trim();
        const original = btn.textContent;
        const done = () => {
          btn.textContent = 'Kopiert ✓';
          btn.classList.add('copied');
          setTimeout(() => {
            btn.textContent = original;
            btn.classList.remove('copied');
          }, 2000);
        };
        if (navigator.clipboard && navigator.clipboard.writeText) {
          navigator.clipboard.writeText(text).then(done, () => { fallbackCopy(text); done(); });
        } else {
          fallbackCopy(text);
          done();
        }
      };
    }

    const handlers = Array.from(buttons).map((btn) => {
      const handler = makeHandler(btn);
      btn.addEventListener('click', handler);
      return { btn, handler };
    });

    return () => {
      handlers.forEach(({ btn, handler }) => btn.removeEventListener('click', handler));
    };
  }, [html]);

  return (
    <div
      ref={containerRef}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
