import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { tokens, media } from '../../../styles/tokens';
import SubpageLayout from '../../../components/SubpageLayout';
import PageHero from '../../../components/ui/PageHero';
import BlogCard from '../../../components/ui/BlogCard';
import CTABanner from '../../../components/ui/CTABanner';
import Button from '../../../components/ui/Button';
import { CALENDLY_URL } from '../../../lib/site';

/* Blog content data mapping */
const BLOG_CONTENT = {
  'generative-ai-kreativbranche': {
    title: 'Wie Generative AI die Kreativbranche revolutioniert',
    badge: 'Trend Report',
    category: 'Trend Report',
    excerpt: 'Generative KI verändert Design, Content Creation und Fotografie. Hier siehst du, welche Chancen und Grenzen jetzt wichtig werden.',
    publishedAt: '15 Apr 2026',
    readingTime: '8 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Einleitung</h2>
      <p>Die Kreativbranche steht an einem Wendepunkt. Generative Künstliche Intelligenz ist nicht mehr Science Fiction, sondern Realität. Tools wie DALL-E, Midjourney und Stable Diffusion ermöglichen es Kreativfachleuten, ihre Visionen schneller und effizienter zu realisieren. Gleichzeitig eröffnen diese Technologien völlig neue Möglichkeiten für Innovation und Experimentation.</p>

      <h2>Die transformative Kraft der generativen KI</h2>
      <p>Generative KI-Systeme lernen aus riesigen Mengen an Trainingsdaten und können anschließend völlig neue Inhalte erstellen – sei es Bilder, Text oder Code. Für die Kreativbranche bedeutet dies eine fundamentale Veränderung der Arbeitsweise:</p>
      <ul>
        <li><strong>Schnellere Ideation:</strong> Kreative können mehrere Konzepte in Minuten statt Stunden generieren</li>
        <li><strong>Überwindung von Blockaden:</strong> KI kann helfen, kreative Herausforderungen zu überwinden</li>
        <li><strong>Neue Kunstformen:</strong> Völlig neue Wege der künstlerischen Ausdrucksfähigkeit entstehen</li>
      </ul>

      <h2>Praktische Anwendungen</h2>
      <p>Die praktischen Anwendungen sind vielfältig und wachsen täglich. In der Grafikdesign werden KI-Tools zur Komposition, zur Erstellung von Variationen und zur Automatisierung von wiederholten Aufgaben eingesetzt. Content Creator nutzen Text-zu-Bild-Modelle, um schnell visuelle Konzepte zu kommunizieren. Fotografen experimentieren mit KI-gestützter Bildbearbeitung und kreativen Filtern.</p>

      <p>Auch in der Werbung, dem Filmmaking und der Spielentwicklung zeigen sich enorme Potenziale. Es entstehen neue Rollen und neue Spezialisierungen – etwa der „AI-Prompt-Engineer" oder der „Kreative KI-Direktor".</p>

      <h2>Chancen und Herausforderungen</h2>
      <p>Die größten Chancen liegen in der Demokratisierung von kreativen Tools: Nicht nur große Studios mit großen Budgets können fotorealistische 3D-Umgebungen oder Illustrationen erstellen. Kleine Teams und Einzelne erhalten Zugang zu Fähigkeiten, die früher unerreichbar waren.</p>

      <p>Die Herausforderungen sind ebenso real. Fragen zu Urheberrecht, zur authentischen menschlichen Kreativität und zur Verlagerung von Arbeitsplätzen müssen diskutiert werden. Viele Kreative fragen: Wird KI meine Fähigkeiten ersetzen? Die Antwort ist nuanciert: KI ersetzt Fähigkeiten, die durch wiederholte, strukturierte Arbeit erworben wurden. Kreativität im engeren Sinne – die Fähigkeit, einzigartige Perspektiven zu haben und innovative Probleme zu lösen – wird auf absehbare Zeit menschlich geprägt bleiben.</p>

      <h2>Best Practices und Ansätze</h2>
      <p>Kreative, die erfolgreich mit generativer KI arbeiten, folgen einigen bewährten Praktiken:</p>
      <ul>
        <li>KI als Werkzeug nutzen, nicht als Ersatz für eigene Expertise</li>
        <li>Die technischen Grundlagen der wichtigsten Tools verstehen</li>
        <li>Kontinuierlich experimentieren und Ergebnisse iterieren</li>
        <li>Kontrolle über Qualität, Stil und Vision behalten</li>
      </ul>

      <h2>Fazit</h2>
      <p>Generative KI revolutioniert nicht die Kreativbranche, sondern verschiebt sie. Die wichtigsten Fähigkeiten der Zukunft werden nicht darin bestehen, Techniken zu kennen, sondern zu wissen, wie man KI als Werkzeug effektiv einsetzt, um bessere, schneller und kreativer zu arbeiten. Kreative, die diesen Übergang aktiv gestalten und ihr Verständnis von KI vertiefen, werden in der kommenden Dekade führend sein.</p>
    `,
    relatedArticles: [
      {
        slug: 'prompt-engineering-anfaenger',
        title: 'Prompt Engineering: Der ultimative Einsteiger Guide',
        badge: 'Tutorial',
      },
      {
        slug: 'machine-learning-basics',
        title: 'Machine Learning Basics: Von der Theorie zur Praxis',
        badge: 'Deep Dive',
      },
      {
        slug: '5-skills-ki-manager',
        title: '5 Skills, die jeder KI-Manager braucht',
        badge: 'Karriere',
      },
    ],
  },
  '5-skills-ki-manager': {
    title: '5 Skills, die jeder KI-Manager braucht',
    badge: 'Karriere',
    category: 'Karriere',
    excerpt: 'Welche Kompetenzen brauchst du, um KI-Projekte sinnvoll zu führen? Diese fünf Skills machen den Unterschied.',
    publishedAt: '12 Apr 2026',
    readingTime: '6 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Warum KI-Management mehr ist als Tool-Wissen</h2>
      <p>KI-Projekte scheitern selten daran, dass ein Tool fehlt. Sie scheitern daran, dass Ziele unklar bleiben, Daten nicht passen, Teams kein gemeinsames Verständnis haben oder Ergebnisse nicht in den Arbeitsalltag übersetzt werden. Genau hier entsteht die Rolle des KI-Managers.</p>

      <h2>1. Problemverständnis</h2>
      <p>Ein guter KI-Manager startet nicht mit der Frage: Welches Modell nutzen wir? Sondern mit: Welches Problem lohnt sich zu lösen? Das bedeutet, Geschäftsprozesse zu verstehen, relevante Aufgaben zu priorisieren und Erfolgskriterien so zu formulieren, dass ein Team sie messen kann.</p>

      <h2>2. Prompting und Workflow-Design</h2>
      <p>Prompts sind kein Zaubertrick, sondern eine Schnittstelle zwischen Fachwissen und Maschine. Entscheidend ist, Aufgaben so zu zerlegen, dass KI-Systeme reproduzierbar gute Zwischenergebnisse liefern. Dazu gehören Rollen, Kontext, Beispiele, Qualitätskriterien und Feedbackschleifen.</p>

      <h2>3. Automatisierungsdenken</h2>
      <p>Viele Gewinne entstehen nicht durch einen einzelnen Chat, sondern durch wiederholbare Abläufe: Briefings auslesen, Daten strukturieren, Texte vorbereiten, Leads klassifizieren oder interne Wissensabfragen automatisieren. KI-Manager müssen erkennen, wo Automatisierung entlastet und wo menschliche Kontrolle nötig bleibt.</p>

      <h2>4. Bewertungskompetenz</h2>
      <p>KI-Ergebnisse klingen oft plausibel, sind aber nicht automatisch richtig. Wer KI produktiv einsetzt, braucht Prüfroutinen: Quellencheck, fachliche Validierung, Datenschutz, Bias-Risiken und klare Freigabepunkte. Bewertungskompetenz trennt Spielerei von belastbarer Anwendung.</p>

      <h2>5. Veränderung führen</h2>
      <p>Am Ende ist KI-Einführung immer auch Kulturarbeit. Menschen brauchen Sicherheit, Beispiele und kleine Erfolgserlebnisse. KI-Manager übersetzen Technologie in Sprache, die Teams verstehen, und bauen Routinen, die wirklich genutzt werden.</p>
    `,
    relatedArticles: [
      {
        slug: 'generative-ai-kreativbranche',
        title: 'Wie Generative AI die Kreativbranche revolutioniert',
        badge: 'Trend Report',
      },
      {
        slug: 'interview-zukunft-arbeit-ki',
        title: 'Interview: Die Zukunft der Arbeit mit KI',
        badge: 'Interview',
      },
      {
        slug: 'prompt-engineering-anfaenger',
        title: 'Prompt Engineering: Der ultimative Einsteiger Guide',
        badge: 'Tutorial',
      },
    ],
  },
  'prompt-engineering-anfaenger': {
    title: 'Prompt Engineering: Der ultimative Einsteiger Guide',
    badge: 'Tutorial',
    category: 'Tutorial',
    excerpt: 'Lerne, wie du bessere Prompts schreibst, Ergebnisse prüfst und KI-Modelle im Alltag gezielter steuerst.',
    publishedAt: '10 Apr 2026',
    readingTime: '10 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Was ein guter Prompt leisten muss</h2>
      <p>Ein guter Prompt ist kein langer Wunschzettel. Er ist eine klare Arbeitsanweisung. Er beschreibt Rolle, Ziel, Kontext, Format und Qualitätsmaßstab. Je präziser diese Elemente sind, desto zuverlässiger wird das Ergebnis.</p>

      <h2>Die einfache Prompt-Struktur</h2>
      <p>Starte mit vier Bausteinen: Aufgabe, Kontext, gewünschtes Ergebnis und Einschränkungen. Beispiel: Analysiere diese Kundenmail, erkenne den Bedarf, formuliere drei Antwortoptionen und bleibe unter 120 Wörtern. So entsteht aus einer vagen Anfrage ein steuerbarer Arbeitsauftrag.</p>

      <h2>Mit Beispielen arbeiten</h2>
      <p>KI-Systeme reagieren stark auf Muster. Wenn du Tonalität, Struktur oder Detailgrad beeinflussen willst, gib ein Beispiel mit. Ein gutes Beispiel spart oft mehr Nacharbeit als zehn zusätzliche Erklärungen.</p>

      <h2>Iterieren statt hoffen</h2>
      <p>Prompt Engineering ist ein Dialog. Erstes Ergebnis prüfen, konkrete Rückmeldung geben, Kriterien nachschärfen. Besonders hilfreich sind Rückfragen wie: Welche Informationen fehlen dir? Oder: Welche Annahmen hast du getroffen?</p>

      <h2>Der wichtigste Praxistipp</h2>
      <p>Schreibe nicht nur, was die KI tun soll. Schreibe auch, woran ein gutes Ergebnis erkannt wird. Dieser Qualitätsrahmen macht den Unterschied zwischen nettem Output und brauchbarer Arbeit.</p>
    `,
    relatedArticles: [
      {
        slug: 'generative-ai-kreativbranche',
        title: 'Wie Generative AI die Kreativbranche revolutioniert',
        badge: 'Trend Report',
      },
      {
        slug: 'machine-learning-basics',
        title: 'Machine Learning Basics: Von der Theorie zur Praxis',
        badge: 'Deep Dive',
      },
      {
        slug: 'chatgpt-claude-gemini-vergleich',
        title: 'ChatGPT vs. Claude vs. Gemini: Der große Vergleich 2026',
        badge: 'Vergleich',
      },
    ],
  },
  'interview-zukunft-arbeit-ki': {
    title: 'Interview: Die Zukunft der Arbeit mit KI',
    badge: 'Interview',
    category: 'Interview',
    excerpt: 'Führende Experten teilen ihre Perspektive auf die zukünftige Arbeitswelt mit KI.',
    publishedAt: '08 Apr 2026',
    readingTime: '12 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Was sich in Teams zuerst verändert</h2>
      <p>Die größte Veränderung beginnt nicht bei neuen Jobtiteln, sondern bei alltäglichen Aufgaben. Recherche, Zusammenfassungen, Entwürfe, Datenaufbereitung und interne Dokumentation werden schneller. Dadurch verschiebt sich Arbeit von reiner Ausführung hin zu Bewertung, Entscheidung und Kommunikation.</p>

      <h2>KI ersetzt keine Verantwortung</h2>
      <p>Auch wenn KI viele Arbeitsschritte unterstützt, bleibt Verantwortung menschlich. Teams müssen entscheiden, welche Daten genutzt werden dürfen, welche Ergebnisse veröffentlicht werden und wann ein Mensch final prüft. Gute KI-Kompetenz macht diese Verantwortung sichtbarer, nicht kleiner.</p>

      <h2>Neue Rollen entstehen im Übergang</h2>
      <p>Viele Unternehmen brauchen Menschen, die zwischen Fachbereich, IT und Management übersetzen. Sie müssen Use Cases priorisieren, Mitarbeitende befähigen und Standards entwickeln. Genau daraus entstehen Rollen wie AI Automation Specialist, KI-Manager oder interne KI-Champions.</p>

      <h2>Weiterbildung wird Teil der Strategie</h2>
      <p>Ein einmaliger Tool-Workshop reicht selten aus. Produktive KI-Nutzung braucht Wiederholung, konkrete Anwendungsfälle und Raum für Fragen. Unternehmen, die Weiterbildung mit echten Projekten verbinden, bauen Kompetenz deutlich nachhaltiger auf.</p>

      <h2>Der realistische Blick</h2>
      <p>Die Zukunft der Arbeit wird nicht automatisch effizienter. Sie wird besser, wenn Menschen lernen, KI bewusst einzusetzen: mit klaren Zielen, guter Prüfung und dem Mut, Prozesse neu zu denken.</p>
    `,
    relatedArticles: [
      {
        slug: '5-skills-ki-manager',
        title: '5 Skills, die jeder KI-Manager braucht',
        badge: 'Karriere',
      },
      {
        slug: 'generative-ai-kreativbranche',
        title: 'Wie Generative AI die Kreativbranche revolutioniert',
        badge: 'Trend Report',
      },
      {
        slug: 'bildungsgutschein-ki-kurse',
        title: 'Bildungsgutschein für KI-Kurse: Alles was du wissen musst',
        badge: 'Förderung',
      },
    ],
  },
  'chatgpt-claude-gemini-vergleich': {
    title: 'ChatGPT vs. Claude vs. Gemini: Der große Vergleich 2026',
    badge: 'Vergleich',
    category: 'Vergleich',
    excerpt: 'Ein umfassender Vergleich der führenden Sprachmodelle und ihrer jeweiligen Stärken.',
    publishedAt: '05 Apr 2026',
    readingTime: '9 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Warum es nicht das eine beste Modell gibt</h2>
      <p>ChatGPT, Claude und Gemini stehen für unterschiedliche Stärken. Die wichtigste Frage ist deshalb nicht: Welches Modell gewinnt? Sondern: Für welchen Zweck brauche ich es? Textarbeit, Analyse, Coding, Recherche und multimodale Aufgaben stellen unterschiedliche Anforderungen.</p>

      <h2>Worauf du beim Vergleich achten solltest</h2>
      <p>Bewerte Modelle anhand echter Aufgaben aus deinem Alltag. Liefert es verwertbare Struktur? Fragt es sinnvoll nach? Bleibt es konsistent? Kann es lange Dokumente sauber verarbeiten? Und wie gut lässt sich das Ergebnis prüfen?</p>

      <h2>Typische Einsatzlogik</h2>
      <p>Für kreative Entwürfe zählt Varianz und Tonalität. Für Analyse zählt Nachvollziehbarkeit. Für Code zählt Präzision und Testbarkeit. Für Unternehmensprozesse zählen Datenschutz, Integration und Kostenkontrolle. Ein Modellvergleich ohne Use Case bleibt Theorie.</p>

      <h2>Der Team-Ansatz</h2>
      <p>Viele professionelle Setups kombinieren mehrere Modelle. Ein Tool kann für Entwürfe stark sein, ein anderes für strukturierte Auswertung. Entscheidend ist, dass Teams gemeinsame Standards definieren und Ergebnisse nicht ungeprüft übernehmen.</p>

      <h2>Unser Rat</h2>
      <p>Starte mit einem klaren Testset aus fünf bis zehn wiederkehrenden Aufgaben. Vergleiche Qualität, Geschwindigkeit, Nacharbeit und Sicherheit. Danach weißt du mehr als nach jedem allgemeinen Ranking.</p>
    `,
    relatedArticles: [
      {
        slug: 'prompt-engineering-anfaenger',
        title: 'Prompt Engineering: Der ultimative Einsteiger Guide',
        badge: 'Tutorial',
      },
      {
        slug: 'machine-learning-basics',
        title: 'Machine Learning Basics: Von der Theorie zur Praxis',
        badge: 'Deep Dive',
      },
      {
        slug: 'generative-ai-kreativbranche',
        title: 'Wie Generative AI die Kreativbranche revolutioniert',
        badge: 'Trend Report',
      },
    ],
  },
  'bildungsgutschein-ki-kurse': {
    title: 'Bildungsgutschein für KI-Kurse: Alles was du wissen musst',
    badge: 'Förderung',
    category: 'Förderung',
    excerpt: 'So nutzt du Bildungsgutschein und Förderung, um deine KI-Weiterbildung gut vorbereitet anzugehen.',
    publishedAt: '02 Apr 2026',
    readingTime: '7 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Was der Bildungsgutschein ermöglicht</h2>
      <p>Ein Bildungsgutschein kann eine zertifizierte Weiterbildung vollständig fördern, wenn die Voraussetzungen erfüllt sind. Für Arbeitssuchende bedeutet das: Du kannst dich gezielt für neue Rollen qualifizieren, ohne die Kurskosten selbst tragen zu müssen.</p>

      <h2>Welche Weiterbildung passt?</h2>
      <p>Wichtig ist, dass die Weiterbildung anerkannt ist und zu deinem beruflichen Ziel passt. Bei KI-Kursen zählt besonders, dass du nicht nur Theorie lernst, sondern konkrete Fähigkeiten für Bewerbungen, Projekte und moderne Arbeitsprozesse aufbaust.</p>

      <h2>So bereitest du das Gespräch vor</h2>
      <p>Formuliere vor dem Termin bei der Agentur für Arbeit oder dem Jobcenter klar, warum KI-Kompetenz für deine berufliche Perspektive relevant ist. Hilfreich sind Zielrollen, Stellenanzeigen und eine kurze Begründung, welche Lücke die Weiterbildung schließt.</p>

      <h2>Was du von uns bekommst</h2>
      <p>Wir unterstützen dich mit Kursinformationen, Ablauf, Zertifizierungsdetails und den Argumenten, die du für dein Beratungsgespräch brauchst. So gehst du vorbereitet in den Prozess.</p>

      <h2>Der nächste Schritt</h2>
      <p>Wenn du prüfen möchtest, ob FortyDays KI-Manager:in zu dir passt, starte mit einer Beratung. Wir schauen gemeinsam auf Ziel, Förderung und Timing.</p>
    `,
    relatedArticles: [
      {
        slug: '5-skills-ki-manager',
        title: '5 Skills, die jeder KI-Manager braucht',
        badge: 'Karriere',
      },
      {
        slug: 'interview-zukunft-arbeit-ki',
        title: 'Interview: Die Zukunft der Arbeit mit KI',
        badge: 'Interview',
      },
      {
        slug: 'machine-learning-basics',
        title: 'Machine Learning Basics: Von der Theorie zur Praxis',
        badge: 'Deep Dive',
      },
    ],
  },
  'machine-learning-basics': {
    title: 'Machine Learning Basics: Von der Theorie zur Praxis',
    badge: 'Deep Dive',
    category: 'Deep Dive',
    excerpt: 'Verstehe die Grundlagen von Machine Learning und warum sie für praktische KI-Projekte reichen.',
    publishedAt: '31 Mär 2026',
    readingTime: '14 min Lesezeit',
    author: 'STARTPLATZ AI Academy',
    content: `
      <h2>Machine Learning in einem Satz</h2>
      <p>Machine Learning bedeutet: Ein System erkennt Muster in Daten und nutzt diese Muster, um Vorhersagen, Empfehlungen oder Entscheidungen zu unterstützen. Es wird nicht für jede Regel einzeln programmiert, sondern aus Beispielen trainiert.</p>

      <h2>Daten sind der Ausgangspunkt</h2>
      <p>Ohne passende Daten gibt es kein gutes Modell. Qualität, Menge, Aktualität und Kontext entscheiden darüber, ob ein Machine-Learning-System nützlich ist. Schlechte Daten führen zu schlechten Ergebnissen, auch wenn der Algorithmus modern ist.</p>

      <h2>Training, Test und Anwendung</h2>
      <p>Im Training lernt das Modell aus Beispielen. Im Test wird geprüft, ob es auch mit neuen Daten funktioniert. Erst danach gehört es in echte Prozesse. Dieser Schritt ist wichtig, weil Modelle sonst scheinbar gut wirken, aber im Alltag versagen.</p>

      <h2>Typische Anwendungsfälle</h2>
      <p>Machine Learning wird eingesetzt, um Nachfrage vorherzusagen, Dokumente zu klassifizieren, Anomalien zu erkennen, Empfehlungen auszusprechen oder Sprache und Bilder zu verarbeiten. Viele moderne KI-Anwendungen bauen auf diesen Grundlagen auf.</p>

      <h2>Warum Grundlagen reichen, um loszulegen</h2>
      <p>Nicht jede Rolle braucht mathematische Tiefe. Für viele Fach- und Managementaufgaben reicht es, Datenlogik, Modellgrenzen und Bewertungsfragen zu verstehen. Genau dieses Verständnis macht KI-Projekte planbarer.</p>
    `,
    relatedArticles: [
      {
        slug: 'prompt-engineering-anfaenger',
        title: 'Prompt Engineering: Der ultimative Einsteiger Guide',
        badge: 'Tutorial',
      },
      {
        slug: 'generative-ai-kreativbranche',
        title: 'Wie Generative AI die Kreativbranche revolutioniert',
        badge: 'Trend Report',
      },
      {
        slug: 'chatgpt-claude-gemini-vergleich',
        title: 'ChatGPT vs. Claude vs. Gemini: Der große Vergleich 2026',
        badge: 'Vergleich',
      },
    ],
  },
};

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = BLOG_CONTENT[slug];

  if (!article) {
    return {
      title: 'Artikel nicht gefunden',
      alternates: { canonical: `/insights/${slug}` },
    };
  }

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/insights/${slug}` },
    openGraph: {
      title: article.title,
      description: article.excerpt,
      url: `https://startplatz-ai-academy.de/insights/${slug}`,
      type: 'article',
    },
  };
}

/* Styled components */
const ArticleSection = styled.section`
  padding: ${tokens.spacing['3xl']} 0;
  background: ${tokens.colors.pageBg};
`;

const ArticleContainer = styled.div`
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 ${tokens.spacing.lg};
  ${media.lg} {
    padding: 0 ${tokens.spacing['2xl']};
  }
`;

const ArticleBody = styled.div`
  max-width: 720px;
  margin: 0 auto ${tokens.spacing['4xl']};
  padding: ${tokens.spacing['3xl']} ${tokens.spacing.lg};
  background: ${tokens.colors.surface};
  border: 1px solid ${tokens.colors.glassBorder};
  border-radius: ${tokens.radii.md};

  ${media.md} {
    padding: ${tokens.spacing['3xl']};
  }

  h2 {
    font-family: ${tokens.fonts.display};
    font-size: ${tokens.fontSizes['2xl']};
    font-weight: ${tokens.fontWeights.bold};
    color: ${tokens.colors.text};
    margin-top: ${tokens.spacing['2xl']};
    margin-bottom: ${tokens.spacing.lg};
    line-height: ${tokens.lineHeights.snug};
  }

  h2:first-child {
    margin-top: 0;
  }

  p {
    font-family: ${tokens.fonts.body};
    font-size: ${tokens.fontSizes.base};
    color: ${tokens.colors.textSoft};
    line-height: ${tokens.lineHeights.relaxed};
    margin-bottom: ${tokens.spacing.lg};
  }

  ul, ol {
    margin: ${tokens.spacing.lg} 0;
    padding-left: ${tokens.spacing['2xl']};
  }

  li {
    font-family: ${tokens.fonts.body};
    font-size: ${tokens.fontSizes.base};
    color: ${tokens.colors.textSoft};
    line-height: ${tokens.lineHeights.relaxed};
    margin-bottom: ${tokens.spacing.sm};
  }

  strong {
    font-weight: ${tokens.fontWeights.bold};
    color: ${tokens.colors.text};
  }
`;

const RelatedSection = styled.section`
  padding: ${tokens.spacing['3xl']} 0;
  background: ${tokens.colors.surface};
`;

const RelatedTitle = styled.h2`
  font-family: ${tokens.fonts.display};
  font-size: clamp(${tokens.fontSizes['2xl']}, 3vw, ${tokens.fontSizes['4xl']});
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.text};
  text-align: center;
  margin-bottom: ${tokens.spacing['3xl']};
  line-height: ${tokens.lineHeights.snug};
`;

const RelatedGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: ${tokens.spacing['2xl']};

  ${media.md} {
    grid-template-columns: repeat(2, 1fr);
  }

  ${media.lg} {
    grid-template-columns: repeat(3, 1fr);
  }
`;

export default async function BlogArticlePage({ params }) {
  const { slug } = await params;
  const article = slug ? BLOG_CONTENT[slug] : null;

  if (!article) {
    return (
      <SubpageLayout>
        <PageHero
          badge="Artikel nicht gefunden"
          title="Seite nicht <span>gefunden</span>"
          subtitle="Der Artikel, den du suchst, existiert nicht."
          breadcrumbs={[{ label: 'Insights', href: '/insights' }]}
        />
        <ArticleSection>
          <ArticleContainer style={{ textAlign: 'center' }}>
            <p style={{ fontSize: tokens.fontSizes.lg, color: tokens.colors.textMuted }}>
              Zurück zur <Link href="/insights" style={{ color: tokens.colors.primary }}>Insights-Übersicht</Link>
            </p>
          </ArticleContainer>
        </ArticleSection>
      </SubpageLayout>
    );
  }

  return (
    <SubpageLayout>
      <PageHero
        badge={article.badge}
        title={article.title}
        subtitle={article.excerpt}
        breadcrumbs={[
          { label: 'Insights', href: '/insights' },
          { label: article.title },
        ]}
      />

      <ArticleSection>
        <ArticleContainer>
          <ArticleBody dangerouslySetInnerHTML={{ __html: article.content }} />
        </ArticleContainer>
      </ArticleSection>

      {article.relatedArticles && article.relatedArticles.length > 0 && (
        <RelatedSection>
          <ArticleContainer>
            <RelatedTitle>Mehr Artikel</RelatedTitle>
            <RelatedGrid>
              {article.relatedArticles.map((relatedArticle) => (
                <BlogCard
                  key={relatedArticle.slug}
                  title={relatedArticle.title}
                  badge={relatedArticle.badge}
                  slug={relatedArticle.slug}
                />
              ))}
            </RelatedGrid>
          </ArticleContainer>
        </RelatedSection>
      )}

      <CTABanner
        title="Mehr über <span>KI-Trends</span> erfahren?"
        subtitle="Lies weiter, teste dein Level oder sprich direkt mit uns über den passenden Einstieg."
      >
        <Button variant="primary" size="lg" href="/insights">
          Zu allen Artikeln
        </Button>
        <Button variant="secondary" size="lg" href={CALENDLY_URL} target="_blank" rel="noopener noreferrer">
          Beratung buchen
        </Button>
      </CTABanner>
    </SubpageLayout>
  );
}
