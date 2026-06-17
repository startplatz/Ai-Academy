---
version: alpha
name: STARTPLATZ AI Academy
description: Visual identity and production guidance for STARTPLATZ AI Academy websites, presentations, slide decks, and social media assets.
colors:
  primary: "#7C3AED"
  primary-hover: "#6D28D9"
  primary-light: "#A78BFA"
  primary-lighter: "#EDE9FE"
  primary-dark: "#5B21B6"
  lavender-bg: "#F0ECF5"
  surface: "#FFFFFF"
  surface-alt: "#F8F6FB"
  surface-hover: "#F3F0F7"
  ink: "#0F0F0F"
  ink-soft: "#2D2D2D"
  text-muted: "#5C5C5C"
  text-dim: "#9CA3AF"
  dark: "#0A0A0A"
  dark-mid: "#141414"
  dark-text: "#F5F5F5"
  dark-muted: "#8A8A8A"
  mint: "#14B8A6"
  mint-bg: "#ECFDF5"
  sky: "#5CB5F2"
  sky-bg: "#E0F2FE"
  coral: "#FF9947"
  coral-bg: "#FFF4EB"
  error: "#E11D48"
typography:
  headline-display:
    fontFamily: Aileron
    fontSize: 72px
    fontWeight: 900
    lineHeight: 1.05
    letterSpacing: 0em
  headline-lg:
    fontFamily: Aileron
    fontSize: 48px
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: 0em
  headline-md:
    fontFamily: Aileron
    fontSize: 32px
    fontWeight: 800
    lineHeight: 1.15
    letterSpacing: 0em
  headline-sm:
    fontFamily: Aileron
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: 0em
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: 0em
  label-md:
    fontFamily: Aileron
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: 0em
  mono-md:
    fontFamily: JetBrains Mono
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: 0em
rounded:
  none: 0px
  xs: 2px
  sm: 3px
  md: 4px
  lg: 6px
  xl: 8px
  xxl: 10px
  full: 9999px
spacing:
  xxs: 4px
  xs: 8px
  sm: 16px
  md: 24px
  lg: 32px
  xl: 48px
  xxl: 64px
  section: 96px
  slide-safe: 64px
  social-safe: 72px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  button-primary-hover:
    backgroundColor: "{colors.primary-hover}"
    textColor: "{colors.surface}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.label-md}"
    rounded: "{rounded.md}"
    padding: "{spacing.sm}"
  card-surface:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
    rounded: "{rounded.xl}"
    padding: "{spacing.lg}"
  hero-panel:
    backgroundColor: "{colors.lavender-bg}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-display}"
    rounded: "{rounded.lg}"
    padding: "{spacing.xl}"
  slide-cover-light:
    backgroundColor: "{colors.lavender-bg}"
    textColor: "{colors.ink}"
    typography: "{typography.headline-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl}"
  slide-cover-dark:
    backgroundColor: "{colors.dark}"
    textColor: "{colors.dark-text}"
    typography: "{typography.headline-lg}"
    rounded: "{rounded.none}"
    padding: "{spacing.xxl}"
  badge-arbeitssuchende:
    backgroundColor: "{colors.mint}"
    textColor: "{colors.dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  badge-berufstaetige:
    backgroundColor: "{colors.sky}"
    textColor: "{colors.dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
  badge-unternehmen:
    backgroundColor: "{colors.coral}"
    textColor: "{colors.dark}"
    typography: "{typography.label-md}"
    rounded: "{rounded.sm}"
    padding: "{spacing.xs}"
---

# STARTPLATZ AI Academy Design System

## Overview

STARTPLATZ AI Academy is the leading AI education center in Nordrhein-Westfalen. The brand makes AI practical, fundable, and human: AZAV-certified bootcamps, OneDay workshops, AfterWork programs, and enterprise academies for people and teams who want to use AI confidently.

The visual identity combines liquid motion with technical precision. It should feel fluid, human, clear, and forward-looking, but never vague or decorative. The signature image is the Liquid Ether: a calm, flowing knowledge field around a precise AI Academy logo system. The shape language stays angular and confident, with sharp corners, chamfered edges, disciplined spacing, and a single dominant purple.

Use this file for website UI, Claude Design projects, Google Stitch projects, coding agents, presentations, LinkedIn/Instagram posts, PDF handouts, and workshop materials. The authoritative local sources are `styles/tokens.js`, `styles/cyberpunk.js`, `Brandbook/STARTPLATZ_AI_Academy_Brandbook.pdf`, and the logo files in `public/logo-assets/png/`.

## Colors

The palette is disciplined: one primary brand color, three persona accents, and a quiet neutral foundation.

- **Primary Purple (#7C3AED):** The heart of the brand. Use for CTAs, headline accents, icons, focus states, and selected Liquid Ether moments.
- **Purple Dark (#5B21B6):** Pressed, hover, low-light, or photo-overlay situations where primary purple is too bright.
- **Purple Light (#A78BFA):** Soft outlines, subtle labels, secondary details, and supporting states.
- **Lavender BG (#F0ECF5):** The default environmental background for pages, slide sections, and calm social layouts.
- **Surface (#FFFFFF):** Content layers, cards, quote blocks, tables, and UI controls.
- **Base Black (#0A0A0A):** Dark sections, keynote covers, high-contrast headlines, and monochrome logo usage. Do not use pure `#000000`.
- **Ink (#0F0F0F):** Main text on light backgrounds.
- **Text Dim (#9CA3AF):** Muted hero phrase such as `MIT KI.` and subtle supporting metadata.

Persona accents are semantic, not decorative:

- **Mint (#14B8A6):** Arbeitssuchende. New starts, opportunity, confidence.
- **Sky (#5CB5F2):** Berufstaetige. Progress, calm, clarity in everyday work.
- **Coral (#FF9947):** Unternehmen. Energy, transformation, speed.

Rules:

- Purple remains the base brand accent. Persona colors never replace it as the overall brand color.
- Do not mix Mint, Sky, and Coral randomly in one layout. Use them only when the three target audiences are deliberately compared.
- Do not place Primary Purple directly on Mint, Sky, or Coral.
- White text works on Primary Purple and Dark. Black or Ink text works on Mint, Sky, Coral, and Lavender BG.
- Use Lavender BG as the default atmosphere. Use pure white only for foreground content layers.
- Dark sections are intentional premium/keynote moments, not the default website or social background.

## Typography

The type system uses three families:

- **Aileron:** Display, logo-adjacent wording, headlines, subheads, large slide statements, and social post hooks.
- **Inter:** Body copy, captions, interface text, tables, FAQs, and long-form explanation.
- **JetBrains Mono:** Code snippets, automation workflows, technical data, model names, timestamps, API examples, and slide annotations.

Use Aileron 700-900 for strong claims. Use Inter 400-500 for readable body text. Use JetBrains Mono only where the content is genuinely technical. Avoid serif fonts, cursive fonts, handwritten styles, italic display text, and novelty type.

Digital UI should keep letter spacing at `0em`. For large static slide or social compositions, all-caps labels may be used sparingly, but clarity beats styling. Body lines should stay around 55-70 characters when possible.

German copy is written in the informal `Du`. The tone is confident, respectful, concrete, and practical. Explain AI in a way that non-technical people feel taken seriously while technical people still feel the precision.

## Layout

Use an 8px-based rhythm with generous but controlled whitespace. Layouts should feel organized, editorial, and technical, not playful or ornamental.

Website and app layouts:

- Prefer full-width bands with constrained inner content.
- Use cards for repeated items, testimonials, product comparisons, or modal-like tools only.
- Do not nest cards inside cards.
- Keep primary content readable in server-rendered/static HTML when working on the website.
- Use angular/chamfered composition details from `styles/cyberpunk.js` where a stronger brand edge is needed.

Presentation layouts:

- Default ratio: 16:9.
- Keep a 64px safe margin on all sides.
- Put the logo in a quiet corner with clear space; never frame it or place it inside a decorative shape.
- Use one main message per slide. Prefer a strong Aileron headline plus one visual, table, or proof point.
- Use Liquid Ether on covers, section dividers, and openers. For content slides, use Lavender BG or white with restrained purple accents.

Social layouts:

- Recommended production sizes: 1080x1080 square, 1080x1350 portrait feed, 1920x1080 LinkedIn/video cover, and 1080x1920 story.
- Keep a 72px safe margin for feed graphics and a larger top/bottom safe zone for stories.
- Carousels should carry one thought per frame: hook, proof, example, action.
- Use large headlines, short body text, and one focal image or chart per frame.

## Elevation & Depth

Depth is created through tonal layering, contrast, and subtle shadows rather than heavy effects.

- Light backgrounds use Lavender BG with white content surfaces.
- Cards may use soft shadows from `styles/tokens.js`, especially `card` and `cardHover`, but avoid heavy drop shadows.
- Purple glow is allowed only as a subtle emphasis. It must not become a generic gradient-orb or bokeh decoration.
- Glass or blur overlays may be used on top of Liquid Ether for legibility, but do not create large opaque blur surfaces over animated website backgrounds.
- On slides and social posts, use Liquid Ether still frames behind restrained content layers, not as busy text backgrounds.

## Shapes

The interface shape language is angular, sharp, and technical. Rounded corners are small and functional, not soft or pill-like.

- Preferred radii: 2px, 3px, 4px, 6px, 8px, 10px.
- Use chamfered corners for hero panels, feature cards, CTAs, callouts, and FAQ controls.
- `9999px` exists only for dots, tiny indicators, avatars, or crop masks. Never use it for CTA buttons.
- Avoid soft circles, blobs, decorative orbs, pill-shaped CTAs, rounded badges that look generic, and playful sticker shapes.
- The logo itself may contain organic curves because it represents the human/AI contrast; surrounding UI should stay precise.

## Components

**Logo**

- Use official logo files only.
- Use color-on-light on Lavender/white layouts: `public/logo-assets/png/logo-full-color-on-light-1200w.png`.
- Use color-on-dark or white on dark/keynote layouts: `public/logo-assets/png/logo-full-color-on-dark-1200w.png` or `public/logo-assets/png/logo-full-white-1200w.png`.
- Use the solo icon for favicons, avatars, small social profile marks, and tiny app contexts.
- Minimum digital logo width: 120px for full wordmark; 32px for icon-only.
- Clear space: at least 1x the icon height on all sides; use 1.5x in polished templates.
- Never stretch, rotate, recolor, shadow, outline, or frame the logo.

**Buttons and CTAs**

- Primary CTA: Purple fill, white text, sharp/chamfered corners.
- Secondary CTA: White or transparent surface, purple text, visible edge, sharp/chamfered corners.
- No pill-shaped CTAs.
- Use direct labels such as `Kostenlos beraten lassen`, `Wissens-Test machen`, `Foerderung pruefen`, `Platz sichern`, or `Gespraech buchen`.

**Cards**

- Cards are single-layer content containers with white or near-white surfaces.
- Use small radii and optional chamfered corners.
- Keep hierarchy clear: headline, short copy, proof point, CTA.
- Avoid nested cards, excessive borders, and decorative icon clutter.

**Badges**

- Badges are semantic markers, not decoration.
- Use Mint for Arbeitssuchende, Sky for Berufstaetige, Coral for Unternehmen.
- Use Purple for brand or platform-wide labels such as `KI-Weiterbildung`, `AZAV`, or `Cert-IT`.

**Charts and Data**

- Use Ink or Dark for axes and labels.
- Use Purple for the main data series.
- Use persona accents only when comparing the three audiences.
- Use JetBrains Mono for technical annotations, dates, API terms, or automation steps.
- Keep charts quiet and legible; avoid rainbow palettes.

**Liquid Ether**

- Use these local stills for non-web production: `Brandbook/assets/generated/liquid-ether-light.png`, `Brandbook/assets/generated/liquid-ether-purple.png`, and `Brandbook/assets/generated/liquid-ether-dark.png`.
- Use Liquid Ether on slide covers, keynote openers, social hooks, and hero imagery.
- Do not set dense text directly on Liquid Ether without a white, dark, or glass contrast layer.
- The Ether should feel spacious and atmospheric, not cropped harshly.

**Imagery**

The image style is modern editorial photography: bright natural light, clean European office or campus spaces, warm skin tones, natural expressions, shallow depth of field, subtle purple accent lighting, and no stock-photo cliches.

Global image prompt base:

`Modern editorial photography style, bright natural lighting, clean minimalist European office environment, soft lavender and white tones in the background, subtle purple accent lighting, shot on Sony A7IV with 35mm f/1.4 lens, shallow depth of field, warm skin tones, natural expressions, high-end corporate lifestyle look. Color palette: whites, light grays, soft lavender (#F0ECF5), accents of vivid purple (#7C3AED) and teal (#14B8A6). No stock photo cliches, no forced smiles, no overly staged poses.`

## Do's and Don'ts

Do:

- Use `STARTPLATZ AI Academy` as the full brand name.
- Use `AI Academy` only as the short form when context is clear.
- Use `Dein Weg in die KI-Zukunft.` as the main claim.
- Communicate AZAV certification, Cert-IT certification, funding options, and real course formats clearly where relevant.
- Keep Primary Purple as the calm brand anchor.
- Use Liquid Ether for covers, section openers, and premium atmosphere.
- Keep designs sharp, structured, and readable.
- Use real numbers only: for example `1.000+ Absolventen`, `4,98/5`, `100+ Unternehmen`, `15+ Jahre STARTPLATZ` when current and verified.

Don't:

- Do not use `AI HUB`, `STARTPLATZ AI-HUB`, or `A.I. Academy` in new communication.
- Do not use pure black `#000000`; use `#0A0A0A`.
- Do not recolor, stretch, rotate, shadow, outline, or frame the logo.
- Do not mix persona colors without a target-audience reason.
- Do not use serif, script, comic, or handwritten fonts.
- Do not use generic gradient orbs, bokeh blobs, pill CTAs, or stock-photo business poses.
- Do not overload social posts with long paragraphs.
- Do not use emojis near the logo or as a core visual system.

## Voice & Wording

Brand voice:

- Clear before clever.
- Concrete before abstract.
- Guiding before lecturing.
- German before Denglisch, except where the technical term is established.
- Benefit before feature.
- Respectful, calm, and specific.

Standard wording:

- Long brand name: `STARTPLATZ AI Academy`
- Short brand name: `AI Academy`
- Claim: `Dein Weg in die KI-Zukunft.`
- Short definition: `Das fuehrende KI-Weiterbildungszentrum in NRW.`
- Primary audiences: `Arbeitssuchende`, `Berufstaetige`, `Unternehmen`
- Core formats: `OneDay`, `FortyDays`, `AfterWork`, `AI-Private Academy`
- Core proof points: `AZAV-zertifiziert`, `Cert-IT geprueft`, `foerderfaehig`, `praxisnah`

Example social copy direction:

- Hook: `KI verstehen reicht nicht. Du musst sie anwenden koennen.`
- Proof: `8 Wochen. AZAV-zertifiziert. 100% foerderfaehig mit Bildungsgutschein.`
- CTA: `Kostenlos beraten lassen.`

## Presentation And Social Media Usage

Presentation deck structure:

- Cover: Liquid Ether background, official logo, one strong headline, short subtitle, no decorative clutter.
- Problem slide: white or Lavender BG, one clear tension, optional two-column before/after.
- Method slide: three steps or three pillars, Purple as primary connector.
- Proof slide: numbers, testimonials, certificates, or concrete course details.
- Offer slide: format, duration, audience, funding, CTA.
- Closing slide: Dark or Purple Ether variant, logo, contact, one action.

Social post structure:

- Single image post: one hook, one proof point, one CTA.
- Carousel: hook, context, 3-5 value frames, proof, CTA.
- Event post: date, format, target audience, one practical outcome, booking CTA.
- Testimonial post: authentic quote, participant context, one visual, no over-designed quotation marks.
- Workshop recap: editorial image, concise learnings, one next step.

Recommended prompt for Claude Design, Stitch, or a coding/design agent:

`Create a STARTPLATZ AI Academy design asset using DESIGN.md as the source of truth. Keep the brand angular, sharp, technical, human, and confident. Use Primary Purple #7C3AED as the main accent, Lavender BG #F0ECF5 as the default atmosphere, and persona accents only when the audience is explicitly Arbeitssuchende, Berufstaetige, or Unternehmen. Use Aileron for headlines, Inter for body, and JetBrains Mono only for technical details. Avoid pill buttons, generic gradient orbs, stock-photo cliches, serif fonts, and logo effects.`

## Tool Usage Notes

Google Stitch and open DESIGN.md usage:

- Place this file in the project root as `DESIGN.md`.
- Use it as a portable design-system source for AI agents and design tools.
- Validate structure with `npx @google/design.md lint DESIGN.md`.
- Export tokens when useful with `npx @google/design.md export --format dtcg DESIGN.md` or `npx @google/design.md export --format tailwind DESIGN.md`.
- The public format is currently alpha, so keep this file easy to update.

Claude Design usage:

- Claude Design does not require a separate proprietary `CLAUDE-DESIGN.md` file.
- Upload this `DESIGN.md` together with the Brandbook PDF, logo assets, Liquid Ether stills, and 2-3 screenshots of the current website.
- Ask Claude Design to extract or update the organization design system from those assets.
- Review the generated color palette, typography, components, and layout patterns before publishing it to the team.
- For presentations, ask Claude Design to create editable 16:9 decks and then export as HTML, PPTX, or PDF depending on the use case.
