import { useEffect, useRef, useState } from "react";
import { songs } from "./songs.js";

const fmt = (s) =>
  `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;
const DAANT = [
  "Kaha ho tum?! PPT deck kab aayegi?! Client presentation 2 minute me start ho rahi hai!",
  "Ye kya bana diya? Kal tak sab fix chahiye, warna appraisal bhool jao!",
  "Weekend pe kaam nahi karoge toh kab karoge? Just a small ask yaar!",
];
const NOTES = [
  "Nodding like I understand everything",
  "Keeping Teams status green",
  "Planning 5:00 PM tapri chai break",
  "“Let's circle back on this offline”",
  "Appraisal form me kya likhu? 😭",
];
const BARTAN_DIALOGUES = [
  "Amma bol rahi hai jaldi bartan dho warna TV band kar degi!",
  "Ek gaana lagao yaar, bina music ke bartan nahi dhulte.",
  "Sabun khatam ho gaya phir se? Kal hi to laayi thi!",
  "Bas ek plate aur reh gayi hai, phir main free hoon.",
  "Bulbule dekho kitne pyare lag rahe hain aaj!",
  "Chai ka cup kisne sink me chhod diya bina paani daale?",
  "Kadhai ghisne ka alag se medal milna chahiye!",
];
const BARTAN_SPEAKERS = [
  "Ghar Ki Chhoti",
  "Bartan Wali Didi",
  "Amma",
  "Main",
  "Chhoti Behen",
  "Ghar Ka Detective",
  "Chef of the House",
];
const BARTAN_NOTES = [
  "Amma ki call sun ke sab battein baad me",
  "Ek andaz, poora sink clean",
  "Paani ka level perfect set karo",
  "Ek plate, ek khwaab",
];

export default function App() {
  const audio = useRef(null);
  const shouldPlay = useRef(false);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("corporate-majdoor-theme");
    return savedTheme === "bartan" ? "bartan" : "corporate";
  });
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(70);
  const [muted, setMuted] = useState(false);
  const [panel, setPanel] = useState(null); // list | notes | daant
  const [fake, setFake] = useState(false);
  const [daant, setDaant] = useState(0);
  const [bubbleParticles, setBubbleParticles] = useState([]);
  const [sparkleParticles, setSparkleParticles] = useState([]);

  useEffect(() => {
    audio.current.volume = vol / 100;
  }, [vol]);
  useEffect(() => {
    localStorage.setItem("corporate-majdoor-theme", theme);
  }, [theme]);
  useEffect(() => {
    if (shouldPlay.current) audio.current.play().catch(() => {});
  }, [idx]);
  useEffect(() => {
    if (theme !== "bartan") return undefined;

    const quoteTimer = window.setInterval(() => {
      setDaant((current) => (current + 1) % BARTAN_DIALOGUES.length);
    }, 8000);

    return () => window.clearInterval(quoteTimer);
  }, [theme]);
  useEffect(() => {
    if (theme !== "bartan") return;

    setBubbleParticles(
      Array.from({ length: 16 }, () => ({
        left: `${Math.random() * 100}%`,
        size: `${6 + Math.random() * 16}px`,
        duration: `${9 + Math.random() * 10}s`,
        delay: `${Math.random() * -18}s`,
        drift: `${Math.floor(Math.random() * 60 - 30)}px`,
      })),
    );
    setSparkleParticles(
      Array.from({ length: 8 }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${10 + Math.random() * 70}%`,
        delay: `${(Math.random() * 2.6).toFixed(2)}s`,
        size: `${10 + Math.random() * 8}px`,
      })),
    );
  }, [theme]);

  const go = (i) => {
    shouldPlay.current = true;
    setIdx((i + songs.length) % songs.length);
  };
  const toggle = () => {
    const a = audio.current;
    if (a.paused) {
      shouldPlay.current = true;
      a.play().catch(() => {});
    } else a.pause();
  };
  const title = (i) => songs[i].title;

  return (
    <div className={`app theme-${theme}`}>
      <audio
        ref={audio}
        src={songs[idx].src}
        preload="auto"
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setPos(e.target.currentTime)}
        onLoadedMetadata={(e) => setDur(e.target.duration)}
        onEnded={() => go(idx + 1)}
      />
      <div className="shade" />
      {theme === "bartan" && (
        <>
          <div className="bartan-background" aria-hidden="true">
            <img
              className="bartan-background-mobile"
              src="/bartan-mobile.png"
              alt=""
            />
            <img
              className="bartan-background-desktop"
              src="/bartan-desktop.jpg"
              alt=""
            />
          </div>
          <div className="bubble-field" aria-hidden="true">
            {bubbleParticles.map((bubble, index) => (
              <span
                key={index}
                className="bubble"
                style={{
                  left: bubble.left,
                  width: bubble.size,
                  height: bubble.size,
                  animationDelay: bubble.delay,
                  animationDuration: bubble.duration,
                  "--drift": bubble.drift,
                }}
              />
            ))}
            {sparkleParticles.map((sparkle, index) => (
              <span
                key={`sparkle-${index}`}
                className="sparkle"
                style={{
                  left: sparkle.left,
                  top: sparkle.top,
                  fontSize: sparkle.size,
                  animationDelay: sparkle.delay,
                }}
              >
                ✨
              </span>
            ))}
          </div>
          <div className="bartan-background-gradient" aria-hidden="true" />
        </>
      )}

      <header>
        <a
          className="brand"
          href="/"
          aria-label={theme === "bartan" ? "Bartan Time home" : "Corporate Majdoor home"}
        >
          <img src="/logo.svg" alt="Corporate Majdoor" />
        </a>
        <label className="theme-picker">
          <span className="theme-picker-icon" aria-hidden="true">
            {theme === "bartan" ? "🍳" : "💼"}
          </span>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            aria-label="Choose website theme"
          >
            <option value="corporate">Corporate Majdoor</option>
            <option value="bartan">Bartan Time</option>
          </select>
        </label>
        <nav>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main className="hero">
        <h1>{theme === "bartan" ? "बर्तन TIME" : "Corporate Majdoor"}</h1>
        {theme !== "bartan" && (
          <p>9 to 5 ki Majdoori • Overtime Playlist</p>
        )}
        {theme === "bartan" ? (
          <button
            type="button"
            className="bartan-quote-card"
            onClick={() => setDaant((d) => (d + 1) % BARTAN_DIALOGUES.length)}
          >
            <span className="bartan-quote">
              "{BARTAN_DIALOGUES[daant]}"
            </span>
            <span className="bartan-speaker">
              <i aria-hidden="true" />
              — {BARTAN_SPEAKERS[daant]}
            </span>
          </button>
        ) : (
          <div className="chips">
            <button
              onClick={() => {
                setDaant((d) => (d + 1) % DAANT.length);
                setPanel("daant");
              }}
            >
              🤬 Boss Ki Daant
            </button>
            <button onClick={() => setPanel(panel === "notes" ? null : "notes")}>
              📝 Meeting Notes
            </button>
            <button className="red" onClick={() => setFake(true)}>
              🚨 Boss Aaya! (Fake Work)
            </button>
          </div>
        )}
      </main>

      <footer className="bar">
        <div className="np">
          <b>{title(idx)}</b>
          <small>{songs[idx].artist}</small>
        </div>
        <div className="ctl">
          <div className="volume-control">
            <button
              onClick={() => setMuted((value) => !value)}
              aria-label={muted ? "Unmute audio" : "Mute audio"}
              aria-pressed={muted}
            >
              {muted ? "🔇" : "🔊"}
            </button>
            <input
              className="vol"
              type="range"
              min="0"
              max="100"
              value={vol}
              onChange={(e) => setVol(+e.target.value)}
              aria-label="Volume"
            />
            <output className="volume-value" aria-live="polite">
              {vol}%
            </output>
          </div>
          <div className="transport-controls">
            <button onClick={() => go(idx - 1)}>⏮</button>
            <button className="play" onClick={toggle}>
              {playing ? "⏸" : "▶"}
            </button>
            <button onClick={() => go(idx + 1)}>⏭</button>
            <button
              onClick={() => setPanel(panel === "list" ? null : "list")}
              aria-label={panel === "list" ? "Close playlist" : "Open playlist"}
            >
              ☰
            </button>
          </div>
        </div>
        <div className="seek">
          <span>{fmt(pos)}</span>
          <input
            type="range"
            min="0"
            max={dur || 1}
            value={pos}
            onChange={(e) => (audio.current.currentTime = +e.target.value)}
          />
          <span>{fmt(dur)}</span>
        </div>
      </footer>

      {panel === "notes" && (
        <aside className="sticky">
          <h3>{theme === "bartan" ? "Chore Notes 🫧" : "Meeting Notes ✍️"}</h3>
          <ol>
            {(theme === "bartan" ? BARTAN_NOTES : NOTES).map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
          <button onClick={() => setPanel(null)}>✕</button>
        </aside>
      )}
      {panel === "daant" && (
        <div className="modal">
          <div className="card">
            <h3>{theme === "bartan" ? "🫧 Ghar Ki Baat" : "🚨 MANAGER ESCALATION"}</h3>
            <p>
              “{(theme === "bartan" ? BARTAN_DIALOGUES : DAANT)[daant]}”
            </p>
            <button onClick={() => setPanel(null)}>
              {theme === "bartan" ? "Abhi dho raha hoon! 🫧" : "Working on it Sir! 🙏"}
            </button>
          </div>
        </div>
      )}
      {panel === "list" && (
        <aside className="list">
          <div className="list-header">
            <h3>Playlist</h3>
            <button
              className="close-list"
              onClick={() => setPanel(null)}
              aria-label="Close playlist"
            >
              ✕
            </button>
          </div>
          {songs.map((s, i) => (
            <button
              key={s.src}
              className={i === idx ? "on" : ""}
              onClick={() => {
                go(i);
                setPanel(null);
              }}
            >
              {i + 1}. {title(i)}
            </button>
          ))}
        </aside>
      )}

      <footer className="site-footer">
        <section id="about" className="info footer-about">
          {theme === "bartan" ? (
            <>
              <h2>Welcome to Bartan Time — Kitchen-Chore Nostalgia, Rebuilt in Sound</h2>
              <p>
                Bartan Time (बर्तन टाइम) is a free ambient radio built around
                golden-hour light through the kitchen window, warm soapy water,
                and a song humming in the background. Press play and let the
                sink-side playlist carry you through the chore.
              </p>
              <div className="grid">
                <div>
                  <h4>🫧 Golden-Hour Girly Vibes</h4>
                  <p>Soft light, floating bubbles and cozy colors for a daily chore.</p>
                </div>
                <div>
                  <h4>💬 Bartan Dhone Ke Dialogues</h4>
                  <p>One-liners about siblings, chores and Amma's calls.</p>
                </div>
                <div>
                  <h4>✨ Always Open</h4>
                  <p>Free, browser-based and no sign-up required.</p>
                </div>
              </div>
            </>
          ) : (
            <>
              <h2>Welcome to Corporate Majdoor</h2>
              <div className="grid">
                <div>
                  <h4>🎧 Deep Work & Focus</h4>
                  <p>Chill Bollywood and lo-fi for presentations, reports and overtime.</p>
                </div>
                <div>
                  <h4>📝 Doodles & Banter</h4>
                  <p>Meeting notes, boss daant alerts and 5 PM tapri chai vibes.</p>
                </div>
                <div>
                  <h4>🏢 Free & No Login</h4>
                  <p>Open the tab and let it play all day.</p>
                </div>
              </div>
            </>
          )}
        </section>
        <section id="faq" className="info footer-faq">
          <h2>FAQ</h2>
          {theme === "bartan" ? (
            <>
              <p><b>What is Bartan Time?</b> A cozy, golden-hour nostalgia radio for the dishes.</p>
              <p><b>Is Bartan Time free?</b> Yes — free in your browser, with no sign-up.</p>
              <p><b>What kind of music plays?</b> A curated nostalgic playlist of familiar songs.</p>
            </>
          ) : (
            <>
              <p><b>Is it free?</b> Yes, no login needed. Just press play.</p>
              <small>All music rights belong to their respective owners.</small>
            </>
          )}
        </section>
        <p className="credit">
          Designed and Developed by gitpush_with.lokesh
          <a
            className="instagram-link"
            href="https://www.instagram.com/gitpush_with.lokesh/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram: gitpush_with.lokesh"
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="3" width="18" height="18" rx="5" />
              <circle cx="12" cy="12" r="4" />
              <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" />
            </svg>
          </a>
        </p>
      </footer>

      {fake && (
        <div className="fake" onClick={() => setFake(false)}>
          <div className="top">
            {theme === "bartan"
              ? "BartanTime — Kitchen Activity"
              : "PaymentGatewayService.java — CorporateCoreEngine"}{" "}
            <span>
              {theme === "bartan"
                ? "● AMMA NE DEKHA NAHI · click to exit"
                : "● BUILD PASSING (98.4%) · click to exit"}
            </span>
          </div>
          <pre>{theme === "bartan"
            ? `SinkStatus: BARTAN DHUL RAHE HAIN
AmmaAlert: "Abhi tak start nahi kiya?"
Move: plate --scrub--> shine
Mood: golden-hour-soft

[TERMINAL] Chore progress 98.4%... jaldi finish karo!`
            : `public class PaymentGatewayService implements HighPriorityService {
  private volatile boolean isOvertimeActive = true;

  public synchronized void executeCriticalPipeline(ExecutionContext ctx) {
    if (ctx.getStressLevel() > 9000) {
      System.out.println("Chai break required immediately.");
      orchestrator.triggerEmergencyLofiStream();
    }
  }
}
[TERMINAL] compilation successful. Watching for file changes...`}</pre>
        </div>
      )}
    </div>
  );
}
