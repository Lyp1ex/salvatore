import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useMemo, useState } from "react";
import { FaHeart, FaLock, FaUnlockAlt } from "react-icons/fa";

const SECRET_PASSWORD = "iclal";
const PASSWORD_HINT = "seni en çok kim sever?";

const reasons = [
  "Yanımda olduğunda her şey daha sakin, daha net, daha güzel.",
  "Gülüşün en kötü günü bile toparlayan gizli güç gibi.",
  "Seninle aynı cümlede olmak bile bana iyi geliyor.",
];

const littlePlan = [
  "Bir kahve, uzun bir yürüyüş ve sadece biz.",
  "Telefon sessizde, dünya beklemede.",
  "Anı biriktirip geceye güzel bir kapanış.",
];

const floaters = [
  { left: "8%", top: "16%", duration: "11s", delay: "0s", symbol: "✦" },
  { left: "18%", top: "72%", duration: "14s", delay: "1.2s", symbol: "❤" },
  { left: "32%", top: "28%", duration: "12.5s", delay: "0.7s", symbol: "✦" },
  { left: "48%", top: "80%", duration: "15.5s", delay: "2.1s", symbol: "❤" },
  { left: "64%", top: "20%", duration: "13.8s", delay: "1.8s", symbol: "✦" },
  { left: "78%", top: "66%", duration: "16s", delay: "0.4s", symbol: "❤" },
  { left: "90%", top: "32%", duration: "12s", delay: "1.4s", symbol: "✦" },
] as const;

const normalize = (value: string): string => {
  return value
    .trim()
    .toLocaleLowerCase("tr-TR")
    .replace(/ı/g, "i")
    .replace(/ğ/g, "g")
    .replace(/ü/g, "u")
    .replace(/ş/g, "s")
    .replace(/ö/g, "o")
    .replace(/ç/g, "c")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]/g, "");
};

function Background() {
  return (
    <div className="bg-layer" aria-hidden="true">
      <div className="bg-gradient bg-gradient-a" />
      <div className="bg-gradient bg-gradient-b" />
      <div className="bg-gradient bg-gradient-c" />
      <div className="bg-grid" />
      <div className="bg-noise" />
      <div className="bg-floaters">
        {floaters.map((item, index) => (
          <span
            key={`${item.left}-${item.top}-${index}`}
            className="floater"
            style={{
              left: item.left,
              top: item.top,
              animationDelay: item.delay,
              animationDuration: item.duration,
            }}
          >
            {item.symbol}
          </span>
        ))}
      </div>
    </div>
  );
}

function App() {
  const [password, setPassword] = useState("");
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [errorText, setErrorText] = useState("");
  const [shake, setShake] = useState(false);

  const normalizedSecret = useMemo(() => normalize(SECRET_PASSWORD), []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (normalize(password) === normalizedSecret) {
      setIsUnlocked(true);
      setErrorText("");
      return;
    }

    setErrorText("Bu olmadı. İpucuna bir daha bak.");
    setShake(true);
    window.setTimeout(() => setShake(false), 420);
  };

  return (
    <div className="love-app">
      <Background />

      <main className="main-shell">
        <AnimatePresence mode="wait">
          {!isUnlocked ? (
            <motion.section
              key="lock"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className="lock-wrap"
            >
              <article className={`lock-card ${shake ? "shake" : ""}`}>
                <p className="lock-kicker">Özel sayfa</p>
                <h1>İclal için sürpriz</h1>
                <p className="lock-copy">
                  Bu ekranı sadece doğru kişi açar. Şifreyi gir ve içeri geç.
                </p>

                <form onSubmit={handleSubmit} className="lock-form">
                  <label htmlFor="secret" className="sr-only">
                    Şifre
                  </label>
                  <input
                    id="secret"
                    type="password"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    placeholder="Şifreyi yaz"
                    autoComplete="off"
                    className="lock-input"
                  />
                  <button type="submit" className="unlock-btn">
                    <FaUnlockAlt aria-hidden="true" />
                    Kapıyı Aç
                  </button>
                </form>

                <p className="hint">İpucu: {PASSWORD_HINT}</p>
                {errorText ? <p className="error-text">{errorText}</p> : null}
              </article>
            </motion.section>
          ) : (
            <motion.section
              key="open"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="open-wrap"
            >
              <header className="hero-card">
                <span className="hero-chip">
                  <FaHeart aria-hidden="true" />
                  sadece sana özel
                </span>
                <h1 className="hero-title">İclal</h1>
                <p className="hero-subtitle">
                  Sen gelince bütün karmaşa sesi kısılıyor. Geriye sadece iyi his kalıyor.
                </p>
              </header>

              <section className="content-grid" aria-label="Sürpriz içeriği">
                <article className="glass-card">
                  <h2>Sana kısa not</h2>
                  <p>
                    Bu sayfa küçük bir jest ama his büyük: iyi ki varsın. Yanında kendimi daha güçlü,
                    daha huzurlu ve daha tamam hissediyorum.
                  </p>
                  <p>
                    Çok uzatmadan net söyleyeyim: seninle hayat daha güzel.
                  </p>
                </article>

                <article className="glass-card">
                  <h2>Sende en sevdiğim şeyler</h2>
                  <ul>
                    {reasons.map((item) => (
                      <li key={item}>
                        <span aria-hidden="true">✦</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </article>
              </section>

              <section className="glass-card plan-card">
                <h2>Mini plan</h2>
                <ol>
                  {littlePlan.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ol>
              </section>

              <footer className="final-card">
                <p>İyi ki hayatımdasın, İclal.</p>
                <button
                  type="button"
                  className="lock-again-btn"
                  onClick={() => {
                    setIsUnlocked(false);
                    setPassword("");
                    setErrorText("");
                  }}
                >
                  <FaLock aria-hidden="true" />
                  Sayfayı tekrar kilitle
                </button>
              </footer>
            </motion.section>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}

export default App;
