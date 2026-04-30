# SEO Audit — startplatz-ai-academy.de

**Datum:** 26. April 2026  
**Domain:** https://startplatz-ai-academy.de/  
**Audit-Typ:** Full Site Audit  
**Ziel:** Platz 1 für KI-Weiterbildung Keywords in Deutschland

---

## Executive Summary

Die Website ist inhaltlich stark — klare Produkte, gute Struktur, echte Testimonials, professionelle Brand. Aber: **Google kennt die Seite noch nicht.** Eine `site:startplatz-ai-academy.de` Suche liefert null Ergebnisse. Ohne Indexierung gibt es kein Ranking. Das ist das Problem Nr. 1 und muss sofort gelöst werden.

Die drei größten Prioritäten:

1. **Indexierung sicherstellen** — Sitemap, Google Search Console, robots.txt, Redirect von alter Domain
2. **Unique Title Tags & Meta Descriptions** — alle Seiten haben aktuell denselben Titel
3. **H1-Tags mit Keywords versehen** — die emotionalen Headlines sind gut für Conversion, aber Google braucht Keyword-Signale

Die gute Nachricht: Der Content ist da, die Seitenstruktur ist sauber, und die Wettbewerber sind schlagbar. Mit den richtigen technischen Fixes und Content-Erweiterungen ist Platz 1 realistisch.

---

## 1. KRITISCH: Indexierung & Sichtbarkeit

### Status Quo

| Check | Ergebnis | Bewertung |
|-------|----------|-----------|
| `site:startplatz-ai-academy.de` | **0 Ergebnisse** | 🔴 KRITISCH |
| Google-Suche "STARTPLATZ AI Academy" | Alte Domain startplatz.de erscheint | 🔴 KRITISCH |
| bildungsgutschein.startplatz-ai-hub.de | Noch indexiert | ⚠️ Verwirrend |
| startplatz.de/ki-weiterbildungen/ | Noch indexiert | ⚠️ Redirect nötig |
| sitemap.xml | Nicht abrufbar / nicht vorhanden | 🔴 KRITISCH |
| robots.txt | Nicht abrufbar / nicht vorhanden | 🔴 KRITISCH |

### Was zu tun ist (SOFORT)

1. **Google Search Console einrichten** für startplatz-ai-academy.de
   - Domain-Eigentumsbestätigung via DNS-TXT-Record
   - Alle Seiten zur Indexierung einreichen
   - Indexierungsstatus überwachen

2. **sitemap.xml erstellen und einreichen**
   - Alle Seiten auflisten: /, /arbeitssuchende, /berufstaetige, /unternehmen, /oneday, /experten, /ueber-uns, /insights, /wissens-test, /impressum, /datenschutz, /agb, /presse
   - Alle Insight-Artikel einschließen
   - OneDay-Detailseiten einschließen (z.B. /oneday/claude-cowork)
   - Unter https://startplatz-ai-academy.de/sitemap.xml erreichbar machen
   - In Google Search Console einreichen

3. **robots.txt erstellen**
   ```
   User-agent: *
   Allow: /
   Sitemap: https://startplatz-ai-academy.de/sitemap.xml
   ```

4. **301-Redirects von alten Domains** (alle noch bei Google indexiert!)
   - startplatz.de/ki-weiterbildungen/ → startplatz-ai-academy.de/
   - startplatz.de/kompetenzrahmen-ki-manager/ → startplatz-ai-academy.de/arbeitssuchende
   - bildungsgutschein.startplatz-ai-hub.de/azav-ki-manager → startplatz-ai-academy.de/arbeitssuchende
   - ki-kompetenz.startplatz-ai-hub.de/ → startplatz-ai-academy.de/oneday
   - ai-automation.startplatz-ai-hub.de/ → startplatz-ai-academy.de/berufstaetige
   - ki-start.startplatz-ai-hub.de/ → startplatz-ai-academy.de/oneday
   - innovator.startplatz-ai-hub.de/ → startplatz-ai-academy.de/
   - startplatz-ai-hub.de/ → startplatz-ai-academy.de/
   - startplatz-ai-hub.de/ai-summer-school → startplatz-ai-academy.de/oneday
   - Alle weiteren alten AI-Hub-Seiten → entsprechende neue Seiten

5. **Canonical Tags setzen**
   - Jede Seite braucht `<link rel="canonical" href="https://startplatz-ai-academy.de/[pfad]" />`

---

## 2. On-Page SEO: Title Tags & Meta Descriptions

### Aktueller Zustand — ALLE Seiten haben denselben Titel:

| Seite | Aktueller Title Tag | Bewertung |
|-------|-------------------|-----------|
| Homepage | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | ⚠️ OK aber generisch |
| /arbeitssuchende | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | 🔴 Duplikat |
| /berufstaetige | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | 🔴 Duplikat |
| /unternehmen | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | 🔴 Duplikat |
| /oneday | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | 🔴 Duplikat |
| /experten | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | 🔴 Duplikat |
| /insights | STARTPLATZ AI Academy \| KI-Weiterbildung & Bootcamps | 🔴 Duplikat |

### Empfohlene Title Tags (50-60 Zeichen, mit Ziel-Keyword)

| Seite | Empfohlener Title Tag |
|-------|----------------------|
| Homepage | KI-Weiterbildung Köln & Düsseldorf \| STARTPLATZ AI Academy |
| /arbeitssuchende | KI-Manager Weiterbildung mit Bildungsgutschein \| AZAV \| AI Academy |
| /berufstaetige | KI-Weiterbildung berufsbegleitend \| AfterWork AI Automation |
| /unternehmen | KI-Schulung für Unternehmen \| Innovation Day & Inhouse \| AI Academy |
| /oneday | KI-Workshop an einem Tag \| OneDay Workshops \| AI Academy |
| /experten | KI-Dozenten & Experten \| STARTPLATZ AI Academy |
| /insights | KI-Wissen & Tutorials \| Insights \| STARTPLATZ AI Academy |
| /ueber-uns | Über STARTPLATZ AI Academy \| KI-Weiterbildung seit 2011 |

### Empfohlene Meta Descriptions (150-160 Zeichen, mit CTA)

| Seite | Meta Description |
|-------|-----------------|
| Homepage | KI-Weiterbildung in Köln & Düsseldorf. AZAV-zertifiziert, bis zu 100% gefördert. FortyDays, AfterWork & OneDay Workshops. 4,98/5 Sterne. Jetzt beraten lassen. |
| /arbeitssuchende | In 8 Wochen zum KI-Manager:in. FortyDays Vollzeit-Bootcamp, 100% über Bildungsgutschein gefördert. AZAV & Cert-IT zertifiziert. Kostenlose Beratung buchen. |
| /berufstaetige | KI-Weiterbildung neben dem Job. AfterWork AI Automation: 8 Wochen, Di & Do abends. n8n, GPT-APIs & Workflows. QCG-förderfähig. Jetzt Platz sichern. |
| /unternehmen | KI-Schulungen für Teams. Vom Innovation Day (1 Tag) bis zur Private Academy (12 Monate). 100+ Unternehmen vertrauen uns. Erstgespräch buchen. |
| /oneday | KI-Workshop an einem Tag. Praxisnah, mit konkretem Deliverable. Ab 250 EUR. Claude, n8n, KI-Kompetenz. Nächsten Termin sichern. |
| /experten | Unsere KI-Dozenten arbeiten selbst täglich mit KI. Praxisnahe Weiterbildung durch Experten aus dem STARTPLATZ Ökosystem. |
| /insights | Artikel, Tutorials und Interviews zu KI-Weiterbildung, Prompt Engineering, Automatisierung und Karrierewegen. Kostenlos lesen. |

---

## 3. On-Page SEO: H1-Tags & Heading-Struktur

### Aktueller Zustand

| Seite | Aktueller H1 | Bewertung |
|-------|--------------|-----------|
| Homepage | ENTDECKEMEHRSTÄRKENMIT KI. | 🔴 Keine Leerzeichen (CSS-Effekt, Bots lesen zusammengeklebt) |
| /arbeitssuchende | In 8 Wochen von überfordert zu selbstbewusst. | ⚠️ Emotional gut, aber kein Keyword |
| /berufstaetige | Du bringst zwei Abende. Wir bringen den Rest. | ⚠️ Emotional gut, aber kein Keyword |
| /unternehmen | Euer Team nutzt KI produktiv — nicht nur zum Experimentieren. | ⚠️ KI erwähnt, aber kein Core-Keyword |
| /oneday | Ein Tag verändert, was du morgen tust. | ⚠️ Emotional, kein Keyword |
| /experten | Lerne von Menschen, die KI selbst anwenden. | ⚠️ KI erwähnt, OK |
| /insights | Wissen für die KI-Zukunft | ⚠️ Kurz, kein spezifisches Keyword |

### Empfohlene Lösung

Die emotionalen H1s sind gut für Conversion — aber Google braucht Keywords. Lösung: **Visueller H1 bleibt emotional, aber im HTML bekommt die Seite ein unsichtbares (aber crawlbares) Element mit dem Keyword.** Oder besser: Die H1 wird so umformuliert, dass sie beides schafft.

| Seite | Empfohlener H1 |
|-------|---------------|
| Homepage | KI-Weiterbildung in Köln & Düsseldorf — Entdecke deine Stärken mit KI |
| /arbeitssuchende | KI-Manager Weiterbildung mit Bildungsgutschein — In 8 Wochen zum Neustart |
| /berufstaetige | KI-Weiterbildung berufsbegleitend — AfterWork AI Automation |
| /unternehmen | KI-Schulung für Unternehmen — Vom Pilottag bis zur Private Academy |
| /oneday | KI-Workshop an einem Tag — OneDay Workshops |
| /experten | Unsere KI-Experten & Dozenten |
| /insights | KI-Wissen: Artikel, Tutorials & Interviews |

**Wichtig zum Homepage-H1:** Der CSS-Animationseffekt (ENTDECKE MEHR STÄRKEN MIT KI) rendert ohne Leerzeichen im HTML-Text. Googlebot liest "ENTDECKEMEHRSTÄRKENMIT KI" als ein Wort. Das muss technisch gefixt werden — entweder durch echte Leerzeichen im Quelltext oder durch ein separates, crawlbares H1-Element.

**Status 2026-04-30:** Dieser konkrete Homepage-H1-Technikpunkt ist im Next-16-Migrationsfix erledigt. Der Hero-H1 rendert jetzt als Textinhalt `ENTDECKE DEINE KARRIERE MIT KI.` mit echten Leerzeichen; der alte zusammengeklebte `ENTDECKEMEHRSTÄRKENMIT KI`-Zustand ist nur noch historische Audit-Referenz.

---

## 4. Keyword-Opportunity-Tabelle

| Keyword | Schwierigkeit | Opportunity | Aktuelles Ranking | Intent | Empfohlener Content |
|---------|--------------|-------------|-------------------|--------|-------------------|
| KI Weiterbildung | Hoch | 🔴 Hoch | Nicht indexiert | Informational/Commercial | Homepage + /arbeitssuchende |
| KI Weiterbildung Bildungsgutschein | Mittel | 🔴 Hoch | Nicht indexiert | Commercial | /arbeitssuchende + Insight-Artikel |
| KI Manager Weiterbildung | Mittel | 🔴 Hoch | Nicht indexiert | Commercial | /arbeitssuchende |
| KI Weiterbildung Köln | Niedrig | 🔴 Hoch | Nicht indexiert | Local/Commercial | Homepage + alle Seiten |
| KI Weiterbildung NRW | Niedrig | 🔴 Hoch | Nicht indexiert | Local/Commercial | Homepage |
| KI Kurs mit Bildungsgutschein | Mittel | 🔴 Hoch | Nicht indexiert | Transactional | /arbeitssuchende |
| KI Schulung Unternehmen | Mittel | 🔴 Hoch | Nicht indexiert | Commercial | /unternehmen |
| KI Workshop | Mittel | 🟡 Mittel | Nicht indexiert | Commercial | /oneday |
| AI Automation Kurs | Niedrig | 🟡 Mittel | Nicht indexiert | Commercial | /berufstaetige |
| n8n Kurs Deutschland | Niedrig | 🟡 Mittel | Nicht indexiert | Commercial | /berufstaetige |
| KI Weiterbildung berufsbegleitend | Mittel | 🔴 Hoch | Nicht indexiert | Commercial | /berufstaetige |
| AZAV KI Kurs | Niedrig | 🔴 Hoch | Nicht indexiert | Transactional | /arbeitssuchende |
| KI Zertifikat | Hoch | 🟡 Mittel | Nicht indexiert | Commercial | /arbeitssuchende + Insight |
| Prompt Engineering Kurs | Mittel | 🟡 Mittel | Nicht indexiert | Commercial | /oneday + Insight |
| KI Manager Gehalt | Niedrig | 🟡 Mittel | Nicht indexiert | Informational | Insight-Artikel |
| KI Weiterbildung kostenlos | Mittel | 🔴 Hoch | Nicht indexiert | Transactional | /arbeitssuchende |
| EU AI Act Schulung | Niedrig | 🟡 Mittel | Nicht indexiert | Commercial | /oneday (KI-Kompetenz) |
| ChatGPT Kurs | Hoch | 🟡 Mittel | Nicht indexiert | Commercial | Insight + /oneday |
| KI Fortbildung | Mittel | 🟡 Mittel | Nicht indexiert | Commercial | Homepage |
| Bildungsgutschein Köln | Niedrig | 🟢 Niedrig | Nicht indexiert | Informational | Insight-Artikel |
| Was macht ein KI Manager | Niedrig | 🟡 Mittel | Nicht indexiert | Informational | Insight-Artikel |
| KI Weiterbildung Düsseldorf | Niedrig | 🔴 Hoch | Nicht indexiert | Local/Commercial | Homepage |
| Qualifizierungschancengesetz KI | Niedrig | 🟡 Mittel | Nicht indexiert | Informational | /berufstaetige + Insight |
| KI Bootcamp Deutschland | Niedrig | 🟡 Mittel | Nicht indexiert | Commercial | /arbeitssuchende |
| Claude AI Workshop | Niedrig | 🟢 Nische | Nicht indexiert | Commercial | /oneday/claude-cowork |

---

## 5. Competitor SEO Vergleich

### Identifizierte Wettbewerber

| Wettbewerber | Domain | Fokus |
|-------------|--------|-------|
| WBS Training | wbstraining.de | Große Bildungsträger-Kette, AZAV, viel Content |
| Skill-Sprinters | skill-sprinters.de | SEO-Affiliate-Seite, rankt für Vergleichs-Keywords |
| AI Transformation Institute (AITi) | aiti.ai | KI-Manager mit DFKI-Zertifikat |
| NextSkill AI | nextskill-ai.de | Kursvergleichs-Plattform |
| Hilker Consulting | hilker-consulting.de | KI-Manager mit Bildungsgutschein |
| KI Academy | ki.academy | Umfangreiche KI-Kursplattform |

### Vergleich

| Dimension | STARTPLATZ AI Academy | WBS Training | Skill-Sprinters | AITi |
|-----------|----------------------|-------------|----------------|------|
| Google-Indexierung | ❌ 0 Seiten | ✅ Tausende | ✅ 100+ Artikel | ✅ 50+ |
| Blog/Insights | 7 Artikel (nicht indexiert) | 500+ Artikel | 200+ SEO-Artikel | 30+ |
| Keyword-Rankings | ❌ Keine | ✅ Top 3 viele Keywords | ✅ Top 5 Vergleiche | ✅ Top 10 |
| AZAV-Zertifizierung | ✅ | ✅ | ❌ (Affiliate) | ✅ |
| Structured Data | ❌ Nicht sichtbar | ✅ Course, FAQ | ❌ | ✅ Course |
| Backlinks (geschätzt) | Niedrig (neue Domain) | Sehr hoch | Mittel | Mittel |
| Content-Tiefe pro Seite | Gut (1500+ Wörter) | Gut | Sehr gut (SEO-optimiert) | Mittel |
| Lokale SEO (Köln/NRW) | ⚠️ Erwähnt, nicht optimiert | ✅ Standortseiten | ❌ | ❌ |
| Unique Selling Points | Cert-IT, STARTPLATZ Netzwerk, 4,98/5 | Bekanntheit, Größe | SEO-Content | DFKI-Partnerschaft |

### Wo STARTPLATZ gewinnen kann

1. **Lokale Dominanz Köln/Düsseldorf/NRW** — Kein anderer AZAV-zertifizierter KI-Anbieter hat eine so starke lokale Präsenz
2. **Cert-IT Zertifizierung** — Stärker als IHK-Zertifikate, kaum ein Wettbewerber hat das
3. **4,98/5 Bewertung** — Herausragend, sollte viel prominenter in SEO genutzt werden
4. **Praxisnähe & STARTPLATZ Ökosystem** — 15+ Jahre Startup-Erfahrung als Trust-Signal
5. **Breites Portfolio** — OneDay bis Private Academy, kein Wettbewerber hat diese Bandbreite

---

## 6. Content Gap Analyse

### Fehlende Inhalte, die für Rankings essentiell sind

| Thema/Keyword | Warum es wichtig ist | Format | Priorität | Aufwand |
|--------------|---------------------|--------|-----------|---------|
| "Bildungsgutschein KI Kurs" Landingpage | Transactional Keyword, hohes Suchvolumen | Dedicated Landing Page | 🔴 Hoch | Mittel |
| "KI Manager Gehalt & Karriere" | Informational, zieht Arbeitssuchende an | Insight-Artikel (2000+ Wörter) | 🔴 Hoch | Quick Win |
| "KI Weiterbildung Vergleich 2026" | Vergleichs-Keywords ranken gut | Insight-Artikel (Pillar Page) | 🔴 Hoch | Substanziell |
| "n8n Tutorial Deutsch" | Longtail, wenig Wettbewerb | Insight-Artikel + Video | 🟡 Mittel | Mittel |
| "EU AI Act Pflichten Unternehmen" | Hochaktuell, zieht Unternehmenskunden | Insight-Artikel | 🔴 Hoch | Quick Win |
| "Qualifizierungschancengesetz KI 2026" | Förderthema, zieht Berufstätige | Insight-Artikel | 🟡 Mittel | Quick Win |
| "Was macht ein KI Manager" (Berufsbild) | Informational Pillar Page | Insight-Artikel (3000+ Wörter) | 🔴 Hoch | Substanziell |
| "KI Weiterbildung Köln" Lokale Seite | Lokale SEO | Dedizierte Seite oder Section | 🔴 Hoch | Quick Win |
| FAQ-Schema auf allen Seiten | Featured Snippets in Google | JSON-LD Markup | 🔴 Hoch | Quick Win |
| Absolventen-Erfolgsgeschichten | E-E-A-T Signal, Trust | Case Studies auf /insights | 🟡 Mittel | Mittel |
| "Prompt Engineering Guide" (ausführlich) | Bereits angelegt, muss tief sein | Insight Pillar (5000+ Wörter) | 🟡 Mittel | Substanziell |
| Google Business Profil | Lokale Sichtbarkeit Köln + Düsseldorf | Google Maps Eintrag | 🔴 Hoch | Quick Win |
| Kurs-Vergleichsseite (FortyDays vs AfterWork vs OneDay) | Interne Verlinkung + Entscheidungshilfe | Neue Seite | 🟡 Mittel | Quick Win |

### Content, der existiert aber nicht indexiert wird

Alle 7 Insight-Artikel sind inhaltlich gut, aber da die gesamte Domain nicht indexiert ist, bringen sie aktuell null organischen Traffic. Nach Lösung des Indexierungsproblems sofort prüfen, ob die Artikel individuelle Title Tags und Meta Descriptions haben.

---

## 7. Technical SEO Checkliste

| Check | Status | Details |
|-------|--------|---------|
| Google-Indexierung | 🔴 Fail | 0 Seiten indexiert |
| sitemap.xml | 🔴 Fail | Nicht vorhanden oder nicht erreichbar |
| robots.txt | 🔴 Fail | Nicht vorhanden oder nicht erreichbar |
| HTTPS | ✅ Pass | Korrekt konfiguriert |
| Canonical Tags | 🔴 Fail | Nicht sichtbar im HTML |
| Title Tags (unique) | 🔴 Fail | Alle Seiten haben denselben Titel |
| Meta Descriptions | 🔴 Fail | Nicht sichtbar / wahrscheinlich fehlend |
| H1-Tags | ⚠️ Warning | Vorhanden, aber ohne Keywords; Homepage-H1 hat keine Leerzeichen |
| Breadcrumbs | ✅ Pass | Auf Subpages vorhanden |
| Interne Verlinkung | ✅ Pass | Gute Navigation, Footer-Links, Cross-Links |
| Mobile-Freundlichkeit | ✅ Pass (angenommen) | Responsive Design, Next.js |
| Bildoptimierung | ✅ Pass | Cloudinary mit f_auto, q_auto, Breiten-Parameter |
| Alt-Texte für Bilder | ⚠️ Warning | Teilweise vorhanden, teilweise generisch |
| Structured Data (JSON-LD) | 🔴 Fail | Kein Schema Markup sichtbar |
| Open Graph Tags | ⚠️ Unklar | Nicht im Text-Fetch sichtbar, im HTML-Head prüfen |
| Page Speed | ⚠️ Prüfen | Cloudinary-Bilder sind optimiert, aber JS-Bundle-Größe unbekannt |
| 301-Redirects von alter Domain | 🔴 Fail | Alte Seiten noch separat indexiert |
| Google Search Console | 🔴 Fail | Wahrscheinlich nicht eingerichtet |
| Google Business Profile | 🔴 Fail | Nicht geprüft, wahrscheinlich noch unter altem Namen |

---

## 8. Structured Data Empfehlungen

Folgende JSON-LD Schemas sollten implementiert werden:

### Homepage
- **Organization** — Name, Logo, URL, Kontaktdaten, Social Media
- **WebSite** — mit SearchAction für interne Suche
- **FAQPage** — für die 5 FAQ-Fragen

### /arbeitssuchende
- **Course** — FortyDays KI-Manager:in (Name, Beschreibung, Anbieter, Preis: 0 EUR mit Bildungsgutschein, Dauer: 8 Wochen, Modus: Online)
- **FAQPage** — für die 5 FAQ-Fragen
- **AggregateRating** — 4,98/5 bei 290+ Bewertungen

### /berufstaetige
- **Course** — AfterWork AI Automation (Preis, Dauer, Modus)
- **FAQPage** — für die FAQ-Fragen

### /unternehmen
- **FAQPage** — für die Entscheider-FAQ
- **Service** — Innovation Day, Inhouse, Private Academy

### /oneday
- **Course** (multiple) — für jeden OneDay Workshop
- **FAQPage**
- **Offer** — Preise (590/790 EUR)

### /insights (jeder Artikel)
- **Article** — Autor, Datum, Bild, Publisher

### Alle Seiten
- **BreadcrumbList** — passend zur sichtbaren Breadcrumb-Navigation
- **LocalBusiness** — 2 Standorte (Köln + Düsseldorf)

---

## 9. Prioritierter Aktionsplan

### SOFORT (diese Woche)

| # | Aktion | Impact | Aufwand | Details |
|---|--------|--------|---------|---------|
| 1 | Google Search Console einrichten | 🔴 Kritisch | 30 Min | DNS-Verifizierung, Sitemap einreichen |
| 2 | sitemap.xml erstellen | 🔴 Kritisch | 1 Std | Alle Seiten + Insights auflisten, in Next.js generieren |
| 3 | robots.txt erstellen | 🔴 Kritisch | 15 Min | Allow all + Sitemap-Verweis |
| 4 | Unique Title Tags für jede Seite | 🔴 Kritisch | 2 Std | Siehe Empfehlungen oben |
| 5 | Meta Descriptions für jede Seite | 🔴 Kritisch | 2 Std | Siehe Empfehlungen oben |
| 6 | Homepage H1 CSS-Bug fixen | 🔴 Kritisch | 30 Min | Leerzeichen im HTML-Text sicherstellen |
| 7 | Canonical Tags auf allen Seiten | Hoch | 1 Std | In Next.js Head-Komponente |
| 8 | FAQ-Schema (JSON-LD) auf allen Seiten mit FAQ | Hoch | 2 Std | Direkt Featured-Snippet-fähig |
| 9 | Google Business Profile erstellen/aktualisieren | Hoch | 1 Std | Köln + Düsseldorf, neue Domain verlinken |
| 10 | 301-Redirects von alten Domains einrichten | Hoch | 2 Std | startplatz.de/ki-*, startplatz-ai-hub.de/* |

### KURZFRISTIG (nächste 2-4 Wochen)

| # | Aktion | Impact | Aufwand | Details |
|---|--------|--------|---------|---------|
| 11 | H1-Tags mit Keywords anreichern | Hoch | 2 Std | Emotional + Keyword kombinieren |
| 12 | Course Schema auf Kursseiten | Hoch | 3 Std | JSON-LD für FortyDays, AfterWork, OneDay |
| 13 | Insight-Artikel mit eigenen Title Tags + Metas | Hoch | 2 Std | Jeden der 7 Artikel optimieren |
| 14 | Alt-Texte aller Bilder überprüfen und optimieren | Mittel | 2 Std | Keyword-relevant, beschreibend |
| 15 | "Bildungsgutschein KI" Landingpage erstellen | Hoch | 4 Std | Transactional Keyword, eigene /foerderung Seite |
| 16 | Open Graph + Twitter Card Tags prüfen/setzen | Mittel | 1 Std | Für Social Sharing |
| 17 | Lokale Keywords auf allen Seiten einbauen | Mittel | 2 Std | "Köln", "Düsseldorf", "NRW" natürlich einstreuen |

### STRATEGISCH (dieses Quartal)

| # | Aktion | Impact | Aufwand | Details |
|---|--------|--------|---------|---------|
| 18 | Pillar Page "Was ist ein KI-Manager?" (3000+ Wörter) | Hoch | 1 Tag | Berufsbild, Gehalt, Karrierewege, Ausbildung |
| 19 | Pillar Page "KI Weiterbildung Vergleich 2026" | Hoch | 1 Tag | Eigene Angebote + Markt einordnen |
| 20 | 5+ neue Insight-Artikel pro Monat | Hoch | Laufend | SEO-optimiert, mit internen Links |
| 21 | Absolventen-Case-Studies (3-5 Stück) | Hoch | 3 Tage | Echte Karrierewege, E-E-A-T Signal |
| 22 | Backlink-Aufbau: Gastbeiträge + PR | Hoch | Laufend | Gründer.de, t3n, Handelsblatt, IHK-Seiten |
| 23 | Kurs-Vergleichsseite (intern) | Mittel | 4 Std | FortyDays vs AfterWork vs OneDay Entscheidungshilfe |
| 24 | "EU AI Act" Ratgeber-Artikel | Mittel | 4 Std | Hochaktuell, zieht Unternehmenskunden |
| 25 | Video-SEO: YouTube-Kanal mit Testimonials | Mittel | Laufend | Testimonial-Videos sind vorhanden |
| 26 | Local SEO: Bewertungen sammeln (Google, Trustpilot) | Hoch | Laufend | 4,98/5 ist hervorragend, muss auf Google sichtbar sein |
| 27 | GEO-Optimierung (Generative Engine Optimization) | Mittel | Laufend | Strukturierte Daten, klare Fakten, FAQ-Format |

---

## 10. GEO-Optimierung (Generative Engine Optimization)

Für KI-Suchmaschinen (ChatGPT, Perplexity, Google AI Overviews) gelten zusätzliche Empfehlungen:

1. **Klare, zitierbare Fakten auf jeder Seite** — "8 Wochen, 100% Bildungsgutschein, 4,98/5 Sterne" statt vager Aussagen
2. **FAQ-Struktur auf jeder Seite** — bereits vorhanden, muss mit JSON-LD Schema verstärkt werden
3. **Tabellen und strukturierte Vergleiche** — Kursvergleich (Dauer, Preis, Zielgruppe, Förderung) als HTML-Tabelle
4. **Autorität signalisieren** — AZAV, Cert-IT, STARTPLATZ-Geschichte, Partnerlogos
5. **Unique Insights liefern** — Eigene Daten (1.000+ Absolventen, 4,98/5), die kein Wettbewerber hat

---

## 11. Bekannte Content-Fehler auf der Live-Site

| Seite | Problem | Fix |
|-------|---------|-----|
| Homepage | "Über 150 Dozenten" — auf /experten sind nur 3 gelistet | Zahl korrigieren oder mehr Dozenten listen |
| Homepage | H1 ohne Leerzeichen (CSS-Animation) | Technisch fixen |
| /berufstaetige | Kein Preis sichtbar (1.022,08 EUR fehlt) | Preis ergänzen |
| /berufstaetige | AZAV-Zertifizierung fehlt in der Produkt-Box | Nur QCG erwähnt, AZAV ergänzen |
| /oneday | Unterschiedliche Preise (590/790, 890, 250, 449) | Konsistenz prüfen — im Briefing war 590/790 für alle |
| /insights | Artikel-Bilder sind generiert/Placeholder | Durch echte Bilder ersetzen |
| Alle Seiten | Footer "Presse & Medien" verlinkt auf /presse — existiert diese Seite? | Prüfen und ggf. erstellen |

---

## Zusammenfassung

**Die Website ist inhaltlich bereit für Platz 1.** Der Content ist stark, die Produkte klar, die Testimonials echt, die Bewertung hervorragend. Was fehlt, ist ausschließlich technische SEO-Infrastruktur:

1. 🔴 **Indexierung** — Google kennt die Seite nicht
2. 🔴 **Title Tags & Metas** — alle identisch
3. 🔴 **Structured Data** — kein JSON-LD
4. 🔴 **Redirects von alten Domains** — Link-Equity geht verloren
5. ⚠️ **H1-Keywords** — emotional gut, SEO-schwach
6. ⚠️ **Content-Lücken** — Pillar Pages und Ratgeber-Artikel fehlen

Die Quick Wins (Punkte 1-10) können in einer Woche erledigt werden und werden den größten Unterschied machen. Sobald Google die Seite indexiert hat, sollten die ersten Rankings innerhalb von 2-4 Wochen sichtbar werden.
