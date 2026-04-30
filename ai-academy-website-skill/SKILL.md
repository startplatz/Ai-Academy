---
name: ai-academy-website-skill
description: Use this skill before changing the STARTPLATZ AI Academy website. It defines the Next.js 16 / React 19 architecture, SEO rules, routing rules, brand system, performance constraints, validation checklist, and known risks for safe edits.
---

# STARTPLATZ AI Academy Website Skill

Use this skill for every code, design, SEO, routing, performance, dependency, or content change in this repository.

This site is a live SEO-relevant Next.js website, not a disposable React prototype. Preserve server-rendered/static HTML, stable navigation, brand consistency, and performance safeguards.

## Project Stack

- Framework: Next.js 16.2.4 with App Router in `app/`
- React: 19.2.5 and `react-dom` 19.2.5
- Styling: `styled-components` 6 and design tokens in `styles/tokens.js`
- Build: Turbopack via `next build`
- Package manager: npm with `package-lock.json`
- Routing proxy: `proxy.js`, not `middleware.js`
- Lint: ESLint 9 via `npm run lint`

React 19 does not mean this is a client-only SPA. The site must keep SEO-critical copy in the initial HTML produced by Next.js.

## First Moves For Any Agent

1. Read this `SKILL.md`.
2. Check `git status --short --branch`.
3. Inspect nearby code before editing.
4. Keep changes scoped. Do not revert unrelated user or collaborator edits.
5. After edits, run the validation commands and browser checks below.

## Architecture Rules

- Do not migrate to Vite, CRA, plain React, or another stack without explicit human approval.
- Do not downgrade Next/React casually.
- Do not move SEO-critical pages fully into Client Components.
- Do not load important copy only through `useEffect`, browser APIs, or client-only fetches.
- Do not manually remove or reparent React-owned DOM nodes.
- Do not reintroduce `middleware.js`; Next 16 uses `proxy.js`.
- Do not globally/eagerly load third-party scripts that are only needed after interaction.

## SEO Rules

For public pages:

- Important text must exist in initial HTML.
- Metadata must include meaningful `title`, `description`, canonical URL, and Open Graph where relevant.
- App Router dynamic params in Next 16 are async: `const { slug } = await params`.
- Blog/Insight article bodies must render server-side, not only through `useParams()`.
- `/blog` and `/blog/[slug]` should redirect permanently to `/insights`.
- `robots.txt` and `sitemap.xml` must remain reachable.
- Hero H1 text must include real spaces in text content, even if visual words are separate blocks.
- Do not include the site suffix twice. Root metadata already templates titles with `| STARTPLATZ AI Academy`.

SEO spot checks:

```bash
npm run build
node -e "fetch('http://127.0.0.1:3000/').then(r=>r.text()).then(h=>console.log(h.includes('ENTDECKE DEINE KARRIERE MIT KI.')))"
node -e "fetch('http://127.0.0.1:3000/insights/5-skills-ki-manager').then(r=>r.text()).then(h=>console.log(h.includes('Prompting und Workflow-Design')))"
```

## Routing And Navigation Rules

- Keep `proxy.js` for old-domain redirects.
- Do not manually remove root-level preloader or widget nodes.
- Global widgets belong in `app/layout.jsx` if they must survive route changes.
- Desktop and mobile navigation must be tested after routing changes.
- The old symptom to guard against is the browser error page: `This page couldn't load`.

Smoke-test these paths:

- `/`
- `/arbeitssuchende`
- `/berufstaetige`
- `/unternehmen`
- `/oneday`
- `/oneday/claude-cowork`
- `/oneday/immobilien`
- `/experten`
- `/ueber-uns`
- `/insights`
- `/insights/5-skills-ki-manager`
- `/wissens-test`
- `/produktkatalog`
- `/presse`
- `/datenschutz`
- `/impressum`
- `/agb`
- `/robots.txt`
- `/sitemap.xml`

Also verify `/blog/5-skills-ki-manager` redirects to `/insights/5-skills-ki-manager`.

## Performance Rules

- Preserve `LiquidEther` GPU-tier fallback logic in `utils/gpuTier.js`.
- Do not add large `backdrop-filter` surfaces over the animated background.
- Calendly must remain lazy-loaded on click through `components/CalendlyWidget.jsx`.
- ElevenLabs ConvAI must remain lazy-loaded and dismissible from `app/layout.jsx`.
- Prefer `next/image` or Cloudinary `f_auto,q_auto` for important images.
- Avoid new uncompressed local images over 1 MB unless deliberately justified.
- Keep `/api/events` cache behavior: `s-maxage=1800`, `stale-while-revalidate=3600`.

Known performance backlog:

- `npm run lint` currently warns about older `<img>` usage in several legacy components.
- Font loading still triggers a Next font warning because of the current external Aileron/Google font setup.
- Large existing public assets include:
  - `public/generated/insights-generative-ai.png`
  - `public/oneday/oneday-immobilien-hero.png`
  - `public/oneday/oneday-claude-cowork-hero.png`

## Brand Rules

Use the tokens in `styles/tokens.js`.

Core colors:

- Primary Purple: `#7C3AED`
- Mint: `#14B8A6`
- Sky/Navy: `#5CB5F2`
- Orange/Coral: `#FF9947`
- Text Dim/Grey: `#9CA3AF`

Design language:

- Angular, sharp, technical, confident.
- No pill-shaped CTA buttons.
- No generic gradient-orb/bokeh decoration.
- No card-inside-card layouts.
- Use chamfered/cyber corner patterns already in `styles/cyberpunk.js`.

Hero:

- Claim structure: `ENTDECKE / DEINE / [KARRIERE, SKILLS, ZUKUNFT] / MIT KI.`
- `MIT KI.` stays grey via `tokens.colors.textDim`.
- Rotating words stay primarily in STARTPLATZ Academy Purple; the three category colors appear only as a shimmer/accent.
- Hero persona labels should be pure white and pulse in sync: visible after the preloader, fade to fully invisible together, then reappear together. Do not add category-colored glow or staggered delays to these labels.
- Desktop CTA buttons align visually with the bottom of the persona image area.
- Preloader words must match the initial Hero words.

Weiterbildungen:

- Section claim: `Dein Weg in die KI-Zukunft`.
- Keep the three target audiences structured by the three accent colors.

Events:

- Mobile events use native CSS Scroll Snap.
- Keep `scroll-snap-type: x mandatory` on the carousel.
- Keep `scroll-snap-align: start` and `scroll-snap-stop: always` on cards.
- Do not reintroduce a heavy drag library unless native snap is proven insufficient.

FAQ:

- The accordion control is a chamfered brand chevron, not a rotating plus.
- Open state uses Purple.
- Closed state uses a subtle Purple surface, Purple border, and Mint accent.

## Third-Party Rules

- Google Tag Manager and Google Analytics live in `app/layout.jsx`.
- Calendly assets load only when a Calendly booking link is clicked.
- ElevenLabs ConvAI lives in root layout to avoid route-change mismatch.
- If console errors appear, identify whether they come from local code or an external script before patching.

## Required Validation Before Merge Or Deploy

```bash
npm install
npm run lint
npm run build
npm run start -- -p 3000
```

Then browser-check:

- Home loads; preloader disappears and does not block clicks.
- Hero H1 text content reads `ENTDECKE DEINE KARRIERE MIT KI.`.
- Desktop navigation from Home to `/arbeitssuchende` works.
- Logo navigation back to Home works.
- Mobile menu link to `/arbeitssuchende` works.
- Events swipe on mobile and snap to the next card.
- FAQ opens and closes.
- `/api/events` returns 200 and events or a graceful fallback.
- Browser console has no local application errors.

Known audit status:

- `npm audit --omit=dev` currently reports moderate PostCSS advisories through Next.js with no available direct fix in the Next 16.2.4 dependency tree.

## If In Doubt

Favor preserving SEO, route stability, and the existing brand system. If a change would alter the framework, render model, dependency major versions, or public URL behavior, stop and ask for explicit approval.
