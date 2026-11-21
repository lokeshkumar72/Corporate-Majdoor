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

export default function App() {
  const audio = useRef(null);
  const shouldPlay = useRef(false);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(70);
  const [muted, setMuted] = useState(false);
  const [panel, setPanel] = useState(null); // list | notes | daant
  const [fake, setFake] = useState(false);
  const [daant, setDaant] = useState(0);

  useEffect(() => {
    audio.current.volume = vol / 100;
  }, [vol]);
  useEffect(() => {
    if (shouldPlay.current) audio.current.play().catch(() => {});
  }, [idx]);

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
    <div className="app">
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

      <header>
        <a className="brand" href="/" aria-label="Corporate Majdoor home">
          <img src="/logo.svg" alt="Corporate Majdoor" />
        </a>
        <nav>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main className="hero">
        <h1>Corporate Majdoor</h1>
        <p>9 to 5 ki Majdoori • Overtime Playlist</p>
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
          <h3>Meeting Notes ✍️</h3>
          <ol>
            {NOTES.map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
          <button onClick={() => setPanel(null)}>✕</button>
        </aside>
      )}
      {panel === "daant" && (
        <div className="modal">
          <div className="card">
            <h3>🚨 MANAGER ESCALATION</h3>
            <p>“{DAANT[daant]}”</p>
            <button onClick={() => setPanel(null)}>
              Working on it Sir! 🙏
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
          <h2>Welcome to Corporate Majdoor</h2>
          <div className="grid">
            <div>
              <h4>🎧 Deep Work & Focus</h4>
              <p>
                Chill Bollywood and lo-fi for presentations, reports and
                overtime.
              </p>
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
        </section>
        <section id="faq" className="info footer-faq">
          <h2>FAQ</h2>
          <p>
            <b>Is it free?</b> Yes, no login needed. Just press play.
          </p>
          <small>All music rights belong to their respective owners.</small>
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
            PaymentGatewayService.java — CorporateCoreEngine{" "}
            <span>● BUILD PASSING (98.4%) · click to exit</span>
          </div>
          <pre>{`public class PaymentGatewayService implements HighPriorityService {
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
