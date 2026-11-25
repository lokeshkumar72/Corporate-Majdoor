import { useEffect, useRef, useState } from "react";
import { songs } from "./songs.js";
import { haryanviSongs } from "./haryanvi bangers.js";

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
const QUOTES = [
  // DJ ATTITUDE & DESI SWAG
  {
    hi: "छोरे का नाम सुनते ही, गाम में सन्नाटा छा ज्या सै!",
    en: "One name, and the entire village goes silent.",
  },
  {
    hi: "भौकाल ऐसा काटो छोरे, धूल भी सलाम ठोके!",
    en: "Make such an impact that even dust salutes.",
  },
  {
    hi: "हमसे अकड़ के ना बोलिए, लहजा बदल देंगे!",
    en: "Don't test our attitude.",
  },
  {
    hi: "छोरा पश्चिम यूपी का, ठाठ पूरे नवाबां आले!",
    en: "West UP boy, royal attitude.",
  },
  {
    hi: "गाम छोटा हो सके सै, पर छोरे का रौला ना!",
    en: "Small village, massive reputation.",
  },
  {
    hi: "जिगरा चाहिए छोरे, सिर्फ मूंछ रखने से दबंग ना बनते!",
    en: "Being a legend takes guts.",
  },

  // GHAZIABAD / MEERUT STYLE RAULA
  {
    hi: "मेरठ की धरती सै भाई, बातां में भी बारूद सै!",
    en: "Meerut attitude, explosive words.",
  },
  {
    hi: "रौला ऐसा सै अपना, DJ भी आवाज बढ़ा दे!",
    en: "Even the DJ turns up the volume.",
  },
  {
    hi: "छोरे की एंट्री होवे, तो भीड़ अपने आप हट ज्या सै!",
    en: "The crowd makes way automatically.",
  },
  {
    hi: "ना कोई दिखावा, ना कोई शोर, अपना नाम ही काफी सै छोरे!",
    en: "No show-off, the name says it all.",
  },
  {
    hi: "गाम के छोरे सैं, दिल में प्यार और आंखां में अंगार!",
    en: "Village boys, loving hearts and fiery eyes.",
  },
  {
    hi: "जहां खड़े हो जावें, वहीं माहौल बन ज्या सै!",
    en: "Where we stand, the party begins.",
  },

  // DESI ROMANCE & CHHORI
  {
    hi: "छोरी तेरी चाल पे तो पूरा गाम फिदा हो रया सै!",
    en: "The whole village is crushing on your walk.",
  },
  {
    hi: "तेरी पायल की छन-छन, DJ की बीट पे भारी पड़गी!",
    en: "Your anklets beat the DJ bass.",
  },
  {
    hi: "घूंघट उठा के देख छोरी, छोरा दिल हार बैठ्या!",
    en: "Lift the veil, he's already lost his heart.",
  },
  {
    hi: "छोरी आंख मार गई, छोरे की अकड़ उतर गई!",
    en: "One wink and his attitude disappeared.",
  },
  {
    hi: "तेरे नखरे हजार छोरी, पर छोरा भी कम ना सै!",
    en: "A thousand tantrums, but he's no less.",
  },
  {
    hi: "गोरी तेरी कमर लचकती, DJ की बीट धड़कती!",
    en: "Your moves make the bassline pulse.",
  },

  // FUNNY & DOUBLE-MEANING DJ DIALOGUES
  {
    hi: "खाट पे बैठ्या छोरा, सपना देखे रानी का!",
    en: "Village boy dreaming of royalty.",
  },
  {
    hi: "छोरी बोली धीरे नाच, छोरा बोल्या DJ और तेज कर!",
    en: "She says slow down, he says turn it up.",
  },
  {
    hi: "लुगाई का गुस्सा और DJ का बेस, दोनों सीधे दिल पे लागें!",
    en: "Her anger and the DJ bass hit hard.",
  },
  {
    hi: "ब्याह में आया था खाना खाणे, अब ठुमके मार रया सै!",
    en: "Came for the food, stayed for the dance.",
  },
  {
    hi: "चाचा ने पी ली लस्सी, अब नाचेंगे पूरी बस्ती!",
    en: "Uncle had his lassi, now the whole village dances.",
  },
  {
    hi: "घणी ठंड सै भाई, पर छोरे का डांस गरम सै!",
    en: "Cold weather, hot dance moves.",
  },

  // GAAM KA DABANGG
  {
    hi: "खानदानी ठाठ सैं छोरे, किराये का भौकाल ना!",
    en: "Inherited class, not rented swagger.",
  },
  {
    hi: "अपना गाम, अपनी माटी, अपना अलग ही रौला!",
    en: "Our village, our soil, our identity.",
  },
  {
    hi: "पगड़ी का मान राखें, जुबान का वजन राखें!",
    en: "Respect the turban, honor your word.",
  },
  {
    hi: "बोलचाल देसी सै, पर अंदाज नवाबी सै!",
    en: "Desi language, royal style.",
  },
  {
    hi: "नाम ना पूछ छोरे का, गाम बता देगा!",
    en: "The village itself knows the name.",
  },
  {
    hi: "पश्चिम यूपी के छोरे, जहां खड़े हों वहीं मेला लग ज्या सै!",
    en: "West UP boys turn every place into a fair.",
  },
];
const HARYANVI_NOTES = [
  "Beat drop hote hi energy double",
  "Desi swag, no skip",
  "Bass up, stress down",
  "Kaam bhi chale, banger bhi",
];
export default function App() {
  const audio = useRef(null);
  const shouldPlay = useRef(false);
  const themeMenuRef = useRef(null);
  const [theme, setTheme] = useState("corporate");
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [pos, setPos] = useState(0);
  const [dur, setDur] = useState(0);
  const [vol, setVol] = useState(70);
  const [muted, setMuted] = useState(false);
  const [panel, setPanel] = useState(null); // list | notes | daant
  const [fake, setFake] = useState(false);
  const [daant, setDaant] = useState(0);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [bubbleParticles, setBubbleParticles] = useState([]);
  const [sparkleParticles, setSparkleParticles] = useState([]);
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);

  useEffect(() => {
    audio.current.volume = vol / 100;
  }, [vol]);
  useEffect(() => {
    if (!themeMenuOpen) return undefined;

    const closeMenu = (event) => {
      if (!themeMenuRef.current?.contains(event.target)) {
        setThemeMenuOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === "Escape") setThemeMenuOpen(false);
    };

    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [themeMenuOpen]);
  useEffect(() => {
    if (shouldPlay.current) audio.current.play().catch(() => {});
  }, [idx]);
  useEffect(() => {
    shouldPlay.current = false;
    audio.current.pause();
    setIdx(0);
    setPos(0);
    setDur(0);
    setPlaying(false);
  }, [theme]);
  useEffect(() => {
    if (theme !== "bartan") return undefined;

    const quoteTimer = window.setInterval(() => {
      setDaant((current) => (current + 1) % BARTAN_DIALOGUES.length);
    }, 8000);

    return () => window.clearInterval(quoteTimer);
  }, [theme]);
  useEffect(() => {
    if (theme !== "haryanvi") return undefined;

    setQuoteVisible(true);
    let fadeTimeout;
    const quoteTimer = window.setInterval(() => {
      setQuoteVisible(false);
      fadeTimeout = window.setTimeout(() => {
        setQuoteIndex((current) => (current + 1) % QUOTES.length);
        setQuoteVisible(true);
      }, 500);
    }, 4000);

    return () => {
      window.clearInterval(quoteTimer);
      window.clearTimeout(fadeTimeout);
    };
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

  const activeSongs = theme === "haryanvi" ? haryanviSongs : songs;
  const currentSong = activeSongs[idx] ?? null;
  const nextSong =
    activeSongs.length > 1 ? activeSongs[(idx + 1) % activeSongs.length] : null;
  const go = (i) => {
    if (activeSongs.length === 0) return;
    shouldPlay.current = true;
    const nextIndex = (i + activeSongs.length) % activeSongs.length;
    if (nextIndex === idx) {
      audio.current.currentTime = 0;
      setPos(0);
      audio.current.play().catch(() => {});
      return;
    }
    setPos(0);
    setDur(0);
    setIdx(nextIndex);
  };
  const toggle = () => {
    if (!currentSong) return;
    const a = audio.current;
    if (a.paused) {
      shouldPlay.current = true;
      a.play().catch(() => {});
    } else a.pause();
  };
  const title = (i) => activeSongs[i]?.title ?? "No songs added yet";

  return (
    <div className={`app theme-${theme}`}>
      <audio
        ref={audio}
        src={currentSong?.src}
        preload="auto"
        muted={muted}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setPos(e.target.currentTime)}
        onLoadedMetadata={(e) => setDur(e.target.duration)}
        onEnded={() => go(idx + 1)}
      />
      {nextSong && (
        <audio src={nextSong.src} preload="auto" aria-hidden="true" />
      )}
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
      {theme === "haryanvi" && (
        <>
          <div className="haryanvi-background" aria-hidden="true">
            <img
              className="haryanvi-background-mobile"
              src="/haryanvi-mobile.png"
              alt=""
            />
            <img
              className="haryanvi-background-desktop"
              src="/haryanvi-desktop.png"
              alt=""
            />
          </div>
          <div className="haryanvi-background-gradient" aria-hidden="true" />
          <div className="grain-overlay" aria-hidden="true" />
        </>
      )}

      <header>
        <a
          className="brand"
          href="/"
          aria-label={
            theme === "bartan"
              ? "Bartan Time home"
              : theme === "haryanvi"
                ? "Haryanvi Banger home"
                : "Corporate Majdoor home"
          }
        >
          <img src="/logo.svg" alt="Corporate Majdoor" />
        </a>
        <div className="theme-picker" ref={themeMenuRef}>
          <button
            className="theme-picker-trigger"
            type="button"
            onClick={() => setThemeMenuOpen((open) => !open)}
            aria-label="Choose website theme"
            aria-haspopup="menu"
            aria-expanded={themeMenuOpen}
          >
            <span className="theme-picker-icon" aria-hidden="true">
              {theme === "bartan" ? "🍳" : theme === "haryanvi" ? "🐃" : "💼"}
            </span>
            <span className="theme-picker-name">
              {theme === "bartan"
                ? "Bartan Time"
                : theme === "haryanvi"
                  ? "Haryanvi Banger"
                  : "Corporate Majdoor"}
            </span>
            <span className="theme-picker-chevron" aria-hidden="true">
              ⌄
            </span>
          </button>
          {themeMenuOpen && (
            <div className="theme-menu" role="menu" aria-label="Website themes">
              <button
                type="button"
                role="menuitem"
                className={theme === "corporate" ? "active" : ""}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setTheme("corporate");
                  setThemeMenuOpen(false);
                }}
                onClick={() => {
                  setTheme("corporate");
                  setThemeMenuOpen(false);
                }}
              >
                <span aria-hidden="true">💼</span>
                <span>Corporate Majdoor</span>
              </button>
              <button
                type="button"
                role="menuitem"
                className={theme === "bartan" ? "active" : ""}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setTheme("bartan");
                  setThemeMenuOpen(false);
                }}
                onClick={() => {
                  setTheme("bartan");
                  setThemeMenuOpen(false);
                }}
              >
                <span aria-hidden="true">🍳</span>
                <span>Bartan Time</span>
              </button>
              <button
                type="button"
                role="menuitem"
                className={theme === "haryanvi" ? "active" : ""}
                onPointerDown={(event) => {
                  event.preventDefault();
                  event.stopPropagation();
                  setTheme("haryanvi");
                  setThemeMenuOpen(false);
                }}
                onClick={() => {
                  setTheme("haryanvi");
                  setThemeMenuOpen(false);
                }}
              >
                <span aria-hidden="true">🐃</span>
                <span>Haryanvi Banger</span>
              </button>
            </div>
          )}
        </div>
        <nav>
          <a href="#about">About</a>
          <a href="#faq">FAQ</a>
        </nav>
      </header>

      <main className="hero">
        <h1>
          {theme === "bartan" ? (
            "बर्तन TIME"
          ) : theme === "haryanvi" ? (
            <>
              <span className="haryanvi-title-prefix">हरियाणवी</span> Bangers
            </>
          ) : (
            "Corporate Majdoor"
          )}
        </h1>
        {theme === "haryanvi" ? null : theme !== "bartan" ? (
          <p>9 to 5 ki Majdoori • Overtime Playlist</p>
        ) : null}
        {theme === "bartan" ? (
          <button
            type="button"
            className="bartan-quote-card"
            onClick={() => setDaant((d) => (d + 1) % BARTAN_DIALOGUES.length)}
          >
            <span className="bartan-quote">"{BARTAN_DIALOGUES[daant]}"</span>
            <span className="bartan-speaker">
              <i aria-hidden="true" />— {BARTAN_SPEAKERS[daant]}
            </span>
          </button>
        ) : theme === "haryanvi" ? null : (
          <div className="chips">
            <button
              onClick={() => {
                setDaant((d) => (d + 1) % DAANT.length);
                setPanel("daant");
              }}
            >
              🤬 Boss Ki Daant
            </button>
            <button
              onClick={() => setPanel(panel === "notes" ? null : "notes")}
            >
              📝 Meeting Notes
            </button>
            <button className="red" onClick={() => setFake(true)}>
              🚨 Boss Aaya! (Fake Work)
            </button>
          </div>
        )}
      </main>

      {theme === "haryanvi" && (
        <div className="haryanvi-quote-wrap">
          <p
            id="haryanviQuote"
            className={`haryanvi-rotating-quote font-hindi quote-fade${quoteVisible ? "" : " is-hidden"}`}
            lang="hi"
            aria-label="Rotating Haryanvi quote"
          >
            {QUOTES[quoteIndex].hi}
          </p>
        </div>
      )}

      <footer className="bar">
        <div className="np">
          <b>{title(idx)}</b>
          <small>
            {currentSong?.artist ??
              (theme === "haryanvi"
                ? "Add tracks to src/haryanvi bangers.js"
                : "")}
          </small>
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
            <button onClick={() => go(idx - 1)} disabled={!currentSong}>
              ⏮
            </button>
            <button className="play" onClick={toggle} disabled={!currentSong}>
              {playing ? "⏸" : "▶"}
            </button>
            <button onClick={() => go(idx + 1)} disabled={!currentSong}>
              ⏭
            </button>
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
            disabled={!currentSong}
            onChange={(e) => (audio.current.currentTime = +e.target.value)}
          />
          <span>{fmt(dur)}</span>
        </div>
      </footer>

      {panel === "notes" && (
        <aside className="sticky">
          <h3>
            {theme === "bartan"
              ? "Chore Notes 🫧"
              : theme === "haryanvi"
                ? "Banger Notes 🎧"
                : "Meeting Notes ✍️"}
          </h3>
          <ol>
            {(theme === "bartan"
              ? BARTAN_NOTES
              : theme === "haryanvi"
                ? HARYANVI_NOTES
                : NOTES
            ).map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ol>
          <button onClick={() => setPanel(null)}>✕</button>
        </aside>
      )}
      {panel === "daant" && (
        <div className="modal">
          <div className="card">
            <h3>
              {theme === "bartan"
                ? "🫧 Ghar Ki Baat"
                : theme === "haryanvi"
                  ? "🤠 Desi Quote"
                  : "🚨 MANAGER ESCALATION"}
            </h3>
            {theme === "haryanvi" ? (
              <>
                <p lang="hi">{QUOTES[daant].hi}</p>
                <p lang="en">{QUOTES[daant].en}</p>
              </>
            ) : (
              <p>“{(theme === "bartan" ? BARTAN_DIALOGUES : DAANT)[daant]}”</p>
            )}
            <button onClick={() => setPanel(null)}>
              {theme === "bartan"
                ? "Abhi dho raha hoon! 🫧"
                : theme === "haryanvi"
                  ? "Yo hui na baat! 🤠"
                  : "Working on it Sir! 🙏"}
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
          {activeSongs.length === 0 ? (
            <p className="empty-playlist">
              No Haryanvi tracks yet. Add MP3s to{" "}
              <code>public/Haryanvi bangers</code> and register them in{" "}
              <code>src/haryanvi bangers.js</code>.
            </p>
          ) : (
            activeSongs.map((s, i) => (
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
            ))
          )}
        </aside>
      )}

      <footer className="site-footer">
        <section id="about" className="info footer-about">
          {theme === "bartan" ? (
            <>
              <h2>
                Welcome to Bartan Time — Kitchen-Chore Nostalgia, Rebuilt in
                Sound
              </h2>
              <p>
                Bartan Time (बर्तन टाइम) is a free ambient radio built around
                golden-hour light through the kitchen window, warm soapy water,
                and a song humming in the background. Press play and let the
                sink-side playlist carry you through the chore.
              </p>
              <div className="grid">
                <div>
                  <h4>🫧 Golden-Hour Girly Vibes</h4>
                  <p>
                    Soft light, floating bubbles and cozy colors for a daily
                    chore.
                  </p>
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
          ) : theme === "haryanvi" ? (
            <>
              <h2>Welcome to Haryanvi Banger</h2>
              <p>
                Turn up the desi energy with a bold Haryanvi-inspired look for
                your music player. Pick a track, press play, and bring some
                full-volume swagger to the workday.
              </p>
              <div className="grid">
                <div>
                  <h4>🎧 Desi Energy</h4>
                  <p>
                    A punchy, high-energy visual theme for your listening
                    sessions.
                  </p>
                </div>
                <div>
                  <h4>🤠 Desi Quotes</h4>
                  <p>
                    Haryanvi lines rotate above the player to keep the mood
                    lively.
                  </p>
                </div>
                <div>
                  <h4>🏢 Free & No Login</h4>
                  <p>Open the tab and let the playlist play.</p>
                </div>
              </div>
            </>
          ) : (
            <>
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
                  <p>
                    Meeting notes, boss daant alerts and 5 PM tapri chai vibes.
                  </p>
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
              <p>
                <b>What is Bartan Time?</b> A cozy, golden-hour nostalgia radio
                for the dishes.
              </p>
              <p>
                <b>Is Bartan Time free?</b> Yes — free in your browser, with no
                sign-up.
              </p>
              <p>
                <b>What kind of music plays?</b> A curated nostalgic playlist of
                familiar songs.
              </p>
            </>
          ) : theme === "haryanvi" ? (
            <>
              <p>
                <b>What is Haryanvi Banger?</b> A bold, Haryanvi-inspired theme
                for the music player.
              </p>
              <p>
                <b>Is it free?</b> Yes — free in your browser, with no sign-up.
              </p>
              <p>
                <b>Can I pick a track?</b> Yes, open the playlist using the list
                button.
              </p>
            </>
          ) : (
            <>
              <p>
                <b>Is it free?</b> Yes, no login needed. Just press play.
              </p>
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
          <pre>
            {theme === "bartan"
              ? `SinkStatus: BARTAN DHUL RAHE HAIN
AmmaAlert: "Abhi tak start nahi kiya?"
Move: plate --scrub--> shine
Mood: golden-hour-soft

[TERMINAL] Chore progress 98.4%... jaldi finish karo!`
              : theme === "haryanvi"
                ? `HaryanviBanger: LIVE
DesiMode: full-volume
Energy: HIGH
Mood: "Bass thoda aur tez kar!"

[TERMINAL] Desi beats incoming... click to exit`
                : `public class PaymentGatewayService implements HighPriorityService {
  private volatile boolean isOvertimeActive = true;

  public synchronized void executeCriticalPipeline(ExecutionContext ctx) {
    if (ctx.getStressLevel() > 9000) {
      System.out.println("Chai break required immediately.");
      orchestrator.triggerEmergencyLofiStream();
    }
  }
}
[TERMINAL] compilation successful. Watching for file changes...`}
          </pre>
        </div>
      )}
    </div>
  );
}
