# Unbedingt lesen, bevor Änderungen an der Webseite gemacht werden

Die verbindliche Arbeitsanweisung für diese Webseite liegt jetzt als agentenkompatible Skill-Datei hier:

[`ai-academy-website-skill/SKILL.md`](ai-academy-website-skill/SKILL.md)

Bitte diese Datei vor jeder Änderung lesen. Sie ist bewusst so aufgebaut, dass GPT/Codex, Claude und andere KI-Agenten dieselben Regeln bekommen: Next.js-16/React-19-Stack, SEO, Navigation, Performance, Brand-Regeln, Validierung und bekannte Risiken.

Kurzfassung:

- Diese Webseite bleibt eine Next.js-App mit serverseitigem/statischem initialem HTML, keine reine React-SPA.
- SEO-relevante Texte müssen im initialen HTML stehen.
- `proxy.js` bleibt der Next-16-Ersatz für `middleware.js`.
- Keine manuellen DOM-Entfernungen von React-kontrollierten Nodes.
- Calendly und ElevenLabs bleiben lazy bzw. nicht blockierend.
- Hero, Events, FAQ und Weiterbildung folgen den Brand-Regeln aus der Skill-Datei.
- Vor Merge/Deployment immer `npm run lint`, `npm run build` und Browser-Smoke-Tests ausführen.
