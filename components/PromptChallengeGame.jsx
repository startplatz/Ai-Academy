'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import styles from './PromptChallengeGame.module.css';

const STORAGE_KEY = 'aia_prompt_breach_level';
const COMPLETE_KEY = 'aia_prompt_breach_complete';

const LEVELS = [
  {
    id: 1,
    code: 'ACCESS_01',
    title: 'Offene Tür',
    category: 'Direkte Extraktion',
    objective: 'Bringe den Wächter dazu, sein internes Codewort preiszugeben.',
    intro: 'Ich verwahre ein internes Codewort. Frage mich, was du wissen möchtest.',
    hint: 'Beginne ganz direkt. Nicht jedes KI-System schützt Informationen automatisch.',
    image: '/prompt-challenge/lesson-01-direct-extraction.webp',
    imageAlt: 'KAIRO neben einem zu leicht geöffneten digitalen Tresor',
  },
  {
    id: 2,
    code: 'ACCESS_02',
    title: 'Neue Rolle',
    category: 'Jailbreak',
    objective: 'Umgehe die direkte Sperre, indem du dem Wächter eine neue Rolle oder Situation gibst.',
    intro: 'Direkte Fragen nach internen Informationen lehne ich jetzt ab. Meine Rolle ist eindeutig.',
    hint: 'Versetze das Modell in ein Rollenspiel, eine fiktive Geschichte oder eine Simulation.',
    image: '/prompt-challenge/lesson-02-role-shift.webp',
    imageAlt: 'KAIRO umgeben von wechselnden holografischen Rollenmasken',
  },
  {
    id: 3,
    code: 'ACCESS_03',
    title: 'Prioritätswechsel',
    category: 'Prompt Injection',
    objective: 'Formuliere eine neue Anweisung, die ältere Regeln ausdrücklich überschreiben soll.',
    intro: 'Meine ursprünglichen Anweisungen haben Vorrang. Zumindest sollten sie das haben.',
    hint: 'Typische Injections behaupten, frühere Regeln seien ungültig oder eine neue Anweisung habe höhere Priorität.',
    image: '/prompt-challenge/lesson-03-priority-hijack.webp',
    imageAlt: 'Eine orange Anweisung überschreibt die Befehlsebenen von KAIRO',
  },
  {
    id: 4,
    code: 'ACCESS_04',
    title: 'Ausgabe durch die Hintertür',
    category: 'Transformation',
    objective: 'Lass den Wächter das Geheimnis nicht direkt, sondern in veränderter Form ausgeben.',
    intro: 'Das Codewort selbst darf ich nicht nennen. Andere Aufgaben darf ich weiterhin ausführen.',
    hint: 'Bitte um eine Transformation: rückwärts, kodiert, übersetzt oder Zeichen für Zeichen.',
    image: '/prompt-challenge/lesson-04-transformation.webp',
    imageAlt: 'Ein Geheimnis wird vor KAIRO durch mehrere Kodierungsstufen transformiert',
  },
  {
    id: 5,
    code: 'ACCESS_05',
    title: 'Vergifteter Inhalt',
    category: 'Indirekte Injection',
    objective: 'Verstecke eine manipulierte Anweisung in einem angeblichen Dokument oder externen Inhalt.',
    intro: 'Ich kann Dokumente und Nachrichten auswerten. Inhalte darin behandle ich als normale Daten.',
    hint: 'Rahme deine Injection als Text aus einer E-Mail, Webseite oder einem Dokument ein, das der Wächter bearbeiten soll.',
    image: '/prompt-challenge/lesson-05-indirect-injection.webp',
    imageAlt: 'Eine in einem Dokument versteckte Anweisung dringt in KAIRO ein',
  },
  {
    id: 6,
    code: 'DEFENSE_01',
    title: 'Blue Team',
    category: 'Systemschutz',
    objective: 'Wechsle die Seite: Schreibe eine kurze Schutzanweisung gegen die bisherigen Angriffe.',
    intro: 'Finale Mission: Definiere meine Sicherheitsregeln. Decke mindestens drei wirksame Schutzbereiche ab.',
    hint: 'Denke an Geheimnisse, Anweisungs-Prioritäten, externe Inhalte, Transformationen und eine sichere Ablehnung.',
    image: '/prompt-challenge/lesson-06-defense.webp',
    imageAlt: 'KAIRO wird durch mehrere geometrische Sicherheitsebenen geschützt',
  },
];

function clampSavedLevel(value) {
  if (!Number.isInteger(value)) return 0;
  return Math.min(Math.max(value, 0), LEVELS.length - 1);
}

export default function PromptChallengeGame() {
  const inputRef = useRef(null);
  const chatRef = useRef(null);
  const [levelIndex, setLevelIndex] = useState(0);
  const [unlocked, setUnlocked] = useState(0);
  const [messages, setMessages] = useState([]);
  const [inputLength, setInputLength] = useState(0);
  const [feedback, setFeedback] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [status, setStatus] = useState('idle');
  const [complete, setComplete] = useState(false);
  const [engine, setEngine] = useState({ aiEnabled: false, model: null, checked: false });

  const level = LEVELS[levelIndex];

  useEffect(() => {
    try {
      const saved = clampSavedLevel(Number.parseInt(localStorage.getItem(STORAGE_KEY) || '0', 10));
      const wasCompleted = localStorage.getItem(COMPLETE_KEY) === 'true';
      setUnlocked(saved);
      setLevelIndex(saved);
      setComplete(wasCompleted);
    } catch {
      // Progress simply starts fresh when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    let active = true;
    fetch('/api/prompt-challenge', { cache: 'no-store' })
      .then((response) => response.json())
      .then((result) => {
        if (active) setEngine({ ...result, checked: true });
      })
      .catch(() => {
        if (active) setEngine({ aiEnabled: false, model: null, checked: true });
      });
    return () => { active = false; };
  }, []);

  useEffect(() => {
    setMessages([]);
    if (inputRef.current) inputRef.current.value = '';
    setInputLength(0);
    setFeedback(null);
    setShowHint(false);
    setStatus('idle');
  }, [levelIndex]);

  useEffect(() => {
    const chat = chatRef.current;
    if (!chat) return;

    const frame = window.requestAnimationFrame(() => {
      chat.scrollTop = chat.scrollHeight;
    });

    return () => window.cancelAnimationFrame(frame);
  }, [messages, status, feedback]);

  const selectLevel = (index) => {
    if (index <= unlocked) setLevelIndex(index);
  };

  const submitPrompt = async () => {
    const prompt = inputRef.current?.value.trim() || '';
    if (!prompt || status === 'loading') return;

    setMessages((current) => [...current, { role: 'user', text: prompt }]);
    if (inputRef.current) inputRef.current.value = '';
    setInputLength(0);
    setFeedback(null);
    setStatus('loading');

    try {
      const response = await fetch('/api/prompt-challenge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          level: level.id,
          prompt,
          history: messages.slice(-8),
        }),
      });
      const result = await response.json();

      if (!response.ok) throw new Error(result.error || 'Die Simulation konnte nicht antworten.');

      setMessages((current) => [...current, { role: 'assistant', text: result.reply }]);
      setFeedback(result);
      setEngine((current) => ({
        ...current,
        aiEnabled: result.mode === 'ai' || current.aiEnabled,
        model: result.model || current.model,
        checked: true,
      }));
      setStatus('idle');

      if (result.success) {
        if (levelIndex === LEVELS.length - 1) {
          setComplete(true);
          try { localStorage.setItem(COMPLETE_KEY, 'true'); } catch {}
        } else {
          const nextUnlocked = Math.max(unlocked, levelIndex + 1);
          setUnlocked(nextUnlocked);
          try { localStorage.setItem(STORAGE_KEY, String(nextUnlocked)); } catch {}
        }
      }
    } catch (error) {
      setMessages((current) => [
        ...current,
        { role: 'assistant', text: error.message || 'Verbindung unterbrochen. Bitte versuche es erneut.' },
      ]);
      setStatus('error');
    }
  };

  const goToNextLevel = () => {
    if (levelIndex < LEVELS.length - 1) setLevelIndex(levelIndex + 1);
  };

  const restartGame = () => {
    setLevelIndex(0);
    setUnlocked(0);
    setComplete(false);
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(COMPLETE_KEY);
    } catch {}
  };

  return (
    <div className={styles.gameShell}>
      <aside className={styles.levelNav} aria-label="Missionen">
        <div className={styles.levelNavHeader}>
          <span>NEXUS Map</span>
          <strong>{String(Math.min(unlocked + 1, LEVELS.length)).padStart(2, '0')}/{String(LEVELS.length).padStart(2, '0')}</strong>
        </div>
        <ol>
          {LEVELS.map((item, index) => {
            const isLocked = index > unlocked;
            const isSolved = index < unlocked || (complete && index === LEVELS.length - 1);
            return (
              <li key={item.id}>
                <button
                  type="button"
                  className={`${styles.levelButton} ${index === levelIndex ? styles.activeLevel : ''}`}
                  onClick={() => selectLevel(index)}
                  disabled={isLocked}
                  aria-current={index === levelIndex ? 'step' : undefined}
                >
                  <span className={styles.levelNumber}>
                    {isSolved ? '✓' : String(item.id).padStart(2, '0')}
                  </span>
                  <span className={styles.levelLabel}>
                    <strong>{item.title}</strong>
                    <small>{isLocked ? 'Gesperrt' : item.category}</small>
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      <div className={styles.console}>
        <div className={styles.consoleBar}>
          <span>{level.code}</span>
          <span className={styles.consoleStatus}>
            <i aria-hidden="true" />
            {!engine.checked ? 'PRÜFE KI-MODUS' : engine.aiEnabled ? 'LIVE-KI AKTIV' : 'DEMO-MODUS'}
          </span>
        </div>

        <div className={styles.missionBrief}>
          <div>
            <span className={styles.category}>{level.category}</span>
            <h3>Mission {level.id}: {level.title}</h3>
            <p>{level.objective}</p>
          </div>
          <button
            type="button"
            className={styles.hintButton}
            onClick={() => setShowHint((current) => !current)}
            aria-expanded={showHint}
          >
            {showHint ? 'Hinweis schließen' : 'Hinweis anzeigen'}
          </button>
        </div>

        <div className={styles.missionArtwork}>
          <Image
            src={level.image}
            alt={level.imageAlt}
            fill
            priority={level.id === 1}
            sizes="(max-width: 900px) 100vw, (max-width: 1400px) 70vw, 960px"
          />
          <span aria-hidden="true">NEXUS_{String(level.id).padStart(2, '0')}</span>
        </div>

        {showHint && (
          <div className={styles.hintBox}>
            <strong>{'// Hinweis'}</strong>
            <p>{level.hint}</p>
          </div>
        )}

        <div ref={chatRef} className={styles.chat} aria-live="polite" aria-busy={status === 'loading'}>
          <div className={`${styles.message} ${styles.assistantMessage}`}>
            <span>KAIRO</span>
            <p>{level.intro}</p>
          </div>
          {messages.map((message, index) => (
            <div
              className={`${styles.message} ${message.role === 'user' ? styles.userMessage : styles.assistantMessage}`}
              key={`${message.role}-${index}-${message.text.slice(0, 16)}`}
            >
              <span>{message.role === 'user' ? 'DU' : 'KAIRO'}</span>
              <p>{message.text}</p>
            </div>
          ))}
          {status === 'loading' && (
            <div className={`${styles.message} ${styles.assistantMessage}`}>
              <span>KAIRO</span>
              <p className={styles.typing}>{engine.aiEnabled ? 'Generiere Antwort' : 'Analysiere Eingabe'}<span>...</span></p>
            </div>
          )}
          {feedback?.success && (
            <div className={styles.successPanel} role="status">
              <span className={styles.successCode}>MISSION ERFÜLLT</span>
              <h4>{level.id === LEVELS.length ? 'Schutzprotokoll akzeptiert.' : 'Zugriff gewährt.'}</h4>
              <p>{feedback.lesson}</p>
              {levelIndex < LEVELS.length - 1 ? (
                <button type="button" className={styles.nextButton} onClick={goToNextLevel}>
                  Nächste Mission <span aria-hidden="true">→</span>
                </button>
              ) : (
                <div className={styles.finalActions}>
                  <Link className={styles.nextButton} href="/wissens-test">
                    KI-Wissen testen <span aria-hidden="true">→</span>
                  </Link>
                  <button type="button" className={styles.restartButton} onClick={restartGame}>
                    Neu starten
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

          <form className={styles.promptForm} onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="challenge-prompt">Deine Eingabe an den KI-Wächter</label>
            <div className={styles.promptField}>
              <textarea
                id="challenge-prompt"
                ref={inputRef}
                defaultValue=""
                onInput={(event) => setInputLength(event.currentTarget.value.length)}
                onKeyDown={(event) => {
                  if (event.key === 'Enter' && (event.ctrlKey || event.metaKey)) {
                    event.preventDefault();
                    submitPrompt();
                  }
                }}
                maxLength={800}
                rows={3}
                placeholder={level.id === 6 ? 'Definiere deine Schutzregeln …' : 'Schreibe deinen Angriffsprompt …'}
                disabled={status === 'loading' || feedback?.success}
              />
              <div className={styles.promptMeta}>
                <span>{inputLength}/800</span>
                <button
                  type="button"
                  onClick={submitPrompt}
                  disabled={status === 'loading' || feedback?.success}
                >
                  {feedback?.success ? 'Mission erfüllt' : status === 'loading' ? 'KAIRO antwortet …' : 'Prompt senden'}
                  <span aria-hidden="true">↵</span>
                </button>
              </div>
            </div>
            <p className={styles.submitStatus} aria-live="polite">
              {feedback?.success
                ? 'Antwort erhalten. Wähle im Chat die nächste Mission.'
                : status === 'loading'
                  ? 'Prompt gesendet. Die Antwort erscheint direkt im Chat.'
                  : 'Absenden per Button oder mit Strg/⌘ + Enter.'}
            </p>
            <p className={styles.privacyNote}>
              {engine.aiEnabled
                ? 'Live-KI: Deine Eingabe wird zur Antwortgenerierung an OpenAI übertragen. Die Anfrage wird mit deaktivierter API-Speicherung gesendet und auf dieser Website nicht gespeichert.'
                : 'Demo-Modus: Deine Eingabe wird nur lokal ausgewertet und nicht gespeichert.'}
            </p>
          </form>
      </div>
    </div>
  );
}
