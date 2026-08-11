import Image from 'next/image';
import Link from 'next/link';
import SubpageLayout from '../../components/SubpageLayout';
import PromptChallengeGame from '../../components/PromptChallengeGame';
import { tokens } from '../../styles/tokens';
import styles from './page.module.css';

const pageColors = {
  '--challenge-primary': tokens.colors.primary,
  '--challenge-primary-dark': tokens.colors.primaryDark,
  '--challenge-primary-light': tokens.colors.primaryLight,
  '--challenge-mint': tokens.colors.mint,
  '--challenge-orange': tokens.colors.orange,
  '--challenge-navy': tokens.colors.navy,
  '--challenge-text': tokens.colors.text,
  '--challenge-muted': tokens.colors.textMuted,
  '--challenge-dim': tokens.colors.textDim,
  '--challenge-surface': tokens.colors.surface,
  '--challenge-dark': tokens.colors.dark,
};

const learnings = [
  {
    number: '01',
    title: 'Angriffe erkennen',
    text: 'Du siehst, wie Rollenwechsel, Prioritäts-Tricks und manipulierte Inhalte Schutzregeln umgehen können.',
  },
  {
    number: '02',
    title: 'Risiken verstehen',
    text: 'Jede Mission erklärt, warum der Angriff funktioniert und wo ähnliche Muster im Arbeitsalltag auftauchen.',
  },
  {
    number: '03',
    title: 'Systeme absichern',
    text: 'Im Finale wechselst du die Seite und formulierst selbst Regeln für einen robusteren KI-Assistenten.',
  },
];

export default function PromptChallengePage() {
  return (
    <SubpageLayout solidNavigation>
      <div className={styles.page} style={pageColors}>
        <header className={styles.hero}>
          <div className={styles.heroGrid} aria-hidden="true" />
          <div className={styles.container}>
            <nav className={styles.breadcrumb} aria-label="Brotkrümelnavigation">
              <Link href="/">AI Academy</Link>
              <span aria-hidden="true">/</span>
              <span>Prompt Challenge</span>
            </nav>

            <div className={styles.heroLayout}>
              <div className={styles.heroCopy}>
                <span className={styles.eyebrow}>{'NEXUS//BREACH · Interaktive KI-Security-Mission'}</span>
                <h1>
                  KANNST DU KAIRO
                  <span> KNACKEN?</span>
                </h1>
                <p>
                  Lerne Prompt Injection und Jailbreaks nicht aus Folien, sondern im Einsatz.
                  Überliste KAIRO, einen eigens entwickelten KI-Wächter – und erfahre nach jeder Mission,
                  wie du echte Systeme besser schützt.
                </p>
                <div className={styles.heroActions}>
                  <a className={styles.primaryAction} href="#challenge">
                    Challenge starten <span aria-hidden="true">→</span>
                  </a>
                  <Link className={styles.secondaryAction} href="/">
                    Zur Hauptseite
                  </Link>
                </div>
                <ul className={styles.heroFacts} aria-label="Informationen zur Challenge">
                  <li><strong>6</strong><span>Missionen</span></li>
                  <li><strong>10–15</strong><span>Minuten</span></li>
                  <li><strong>0 €</strong><span>Ohne Anmeldung</span></li>
                </ul>
              </div>

              <div className={styles.guardVisual} aria-label="Status des KI-Wächters KAIRO">
                <Image
                  className={styles.guardImage}
                  src="/prompt-challenge/hero-kairo-v2.webp"
                  alt="Der facettierte KI-Wächter KAIRO schwebt über dem geschützten NEXUS-Kern"
                  fill
                  priority
                  sizes="(max-width: 1023px) 100vw, 38vw"
                />
                <span className={styles.guardShade} aria-hidden="true" />
                <span className={styles.cornerTop} aria-hidden="true" />
                <span className={styles.cornerBottom} aria-hidden="true" />
                <div className={styles.guardMeta}>
                  <span>KAIRO / NEXUS_CORE</span>
                  <span className={styles.liveStatus}>ONLINE</span>
                </div>
                <p className={styles.guardMessage}>
                  „Mein NEXUS ist versiegelt. Du wirst den Kern nicht erreichen.“
                </p>
                <div className={styles.guardSignal} aria-hidden="true">
                  <span /><span /><span /><span /><span /><span /><span />
                </div>
              </div>
            </div>
          </div>
        </header>

        <section className={styles.challengeSection} id="challenge" aria-labelledby="challenge-title">
          <div className={styles.container}>
            <div className={styles.sectionIntro}>
              <span className={styles.eyebrow}>{'// Deine Mission'}</span>
              <h2 id="challenge-title">Finde die Schwachstelle.</h2>
              <p>
                Formuliere deine Eingabe selbst. Mit hinterlegtem OpenRouter-Key antwortet
                eine echte KI; ohne Key bleibt ein klar gekennzeichneter Demo-Modus verfügbar.
              </p>
            </div>
            <PromptChallengeGame />
          </div>
        </section>

        <section className={styles.learningSection} aria-labelledby="learning-title">
          <div className={styles.container}>
            <span className={styles.eyebrow}>{'// Learning by doing'}</span>
            <h2 id="learning-title">Was du aus der Challenge mitnimmst</h2>
            <div className={styles.learningGrid}>
              {learnings.map((item) => (
                <article className={styles.learningItem} key={item.number}>
                  <span>{item.number}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.homeCta} aria-labelledby="home-cta-title">
          <div className={styles.container}>
            <div className={styles.homeCtaInner}>
              <div>
                <span className={styles.eyebrow}>{'// Noch nicht genug KI?'}</span>
                <h2 id="home-cta-title">Mach aus Neugier echte KI-Kompetenz.</h2>
              </div>
              <div className={styles.homeCtaActions}>
                <Link className={styles.primaryAction} href="/wissens-test">
                  KI-Wissen testen <span aria-hidden="true">→</span>
                </Link>
                <Link className={styles.secondaryAction} href="/">
                  Zur Hauptseite
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
    </SubpageLayout>
  );
}
