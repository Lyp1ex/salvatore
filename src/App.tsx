import { AnimatePresence, motion } from "framer-motion";
import { type FormEvent, useEffect, useMemo, useState } from "react";
import { FaHeart, FaLock, FaUnlockAlt } from "react-icons/fa";

const DEFAULT_SECRET_HASH = "3ad6c825b0ca916eed2ebcea64e3bf367da7d28de9d8d8097c9312cac7f43fb0";
const MAX_ATTEMPTS = 4;
const LOCK_DURATION_MS = 30_000;
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

const toHex = (buffer: ArrayBuffer): string =>
  Array.from(new Uint8Array(buffer))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");

const sha256 = async (value: string): Promise<string> => {
  const encoded = new TextEncoder().encode(value);
  const digest = await window.crypto.subtle.digest("SHA-256", encoded);
  return toHex(digest);
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
  const [failedAttempts, setFailedAttempts] = useState(0);
  const [lockedUntil, setLockedUntil] = useState<number | null>(null);
  const [now, setNow] = useState(Date.now());

  const secretHash = useMemo(() => {
    const fromEnv = import.meta.env.VITE_SURPRISE_PASSWORD_HASH;
    return typeof fromEnv === "string" && fromEnv.trim().length > 0
      ? fromEnv.trim().toLowerCase()
      : DEFAULT_SECRET_HASH;
  }, []);

  const secondsLeft = lockedUntil ? Math.max(0, Math.ceil((lockedUntil - now) / 1000)) : 0;
  const isLocked = secondsLeft > 0;

  useEffect(() => {
    if (!lockedUntil) return;

    const timer = window.setInterval(() => {
      setNow(Date.now());
    }, 250);

    return () => window.clearInterval(timer);
  }, [lockedUntil]);

  useEffect(() => {
    if (!lockedUntil) return;
    if (Date.now() >= lockedUntil) {
      setLockedUntil(null);
      setFailedAttempts(0);
      setErrorText("");
    }
  }, [lockedUntil, now]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (isLocked) {
      setErrorText(`Kısa bir bekleme var: ${secondsLeft} saniye sonra tekrar dene.`);
      setShake(true);
      window.setTimeout(() => setShake(false), 420);
      return;
    }

    const normalizedInput = normalize(password);

    if (!normalizedInput) {
      setErrorText("Şifre boş olamaz.");
      return;
    }

    const inputHash = await sha256(normalizedInput);

    if (inputHash === secretHash) {
      setIsUnlocked(true);
      setErrorText("");
      setFailedAttempts(0);
      setLockedUntil(null);
      return;
    }

    const nextAttempts = failedAttempts + 1;

    if (nextAttempts >= MAX_ATTEMPTS) {
      const nextLock = Date.now() + LOCK_DURATION_MS;
      setLockedUntil(nextLock);
      setNow(Date.now());
      setFailedAttempts(0);
      setErrorText(`Çok deneme oldu. ${Math.ceil(LOCK_DURATION_MS / 1000)} saniye bekle.`);
    } else {
      setFailedAttempts(nextAttempts);
      setErrorText(`Bu olmadı. ${MAX_ATTEMPTS - nextAttempts} deneme hakkın kaldı.`);
    }

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
                    disabled={isLocked}
                    className="lock-input"
                  />
                  <button type="submit" className="unlock-btn" disabled={isLocked}>
                    <FaUnlockAlt aria-hidden="true" />
                    {isLocked ? `${secondsLeft} sn` : "Kapıyı Aç"}
                  </button>
                </form>

                <p className="hint">İpucu: {PASSWORD_HINT}</p>
                <p className="hint">
                  Güvenlik modu: {MAX_ATTEMPTS} yanlış denemeden sonra kısa süreli kilit açılır.
                </p>
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
