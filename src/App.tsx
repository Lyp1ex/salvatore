import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundFX from "./components/BackgroundFX";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import { siteConfig } from "./config/site";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Process from "./sections/Process";
import Work from "./sections/Work";

const upsertMeta = (key: "name" | "property", value: string, content: string) => {
  const selector = `meta[${key}="${value}"]`;
  const existing = document.querySelector<HTMLMetaElement>(selector);

  if (existing) {
    existing.setAttribute("content", content);
    return;
  }

  const meta = document.createElement("meta");
  meta.setAttribute(key, value);
  meta.setAttribute("content", content);
  document.head.appendChild(meta);
};

function BootOverlay({ visible }: { visible: boolean }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeOut" } }}
          className="pointer-events-none fixed inset-0 z-[80] bg-[#050507]"
        >
          <div className="scanline-layer absolute inset-0" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,_rgba(212,176,93,.16),_transparent_45%)]" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center gap-2 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-zinc-400">
              kimlik senkronlanıyor
            </p>
            <h2 className="signature-name text-4xl font-extrabold italic text-zinc-100 sm:text-5xl">
              {siteConfig.displayName}
            </h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--lux-gold-soft)]">
              sinyal kilitlendi • 2017+
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function App() {
  const [isBooting, setIsBooting] = useState(true);

  useEffect(() => {
    document.title = siteConfig.seo.title;
    upsertMeta("name", "description", siteConfig.seo.description);
    upsertMeta("property", "og:title", siteConfig.seo.title);
    upsertMeta("property", "og:description", siteConfig.seo.ogDescription);
    upsertMeta("name", "twitter:title", siteConfig.seo.title);
    upsertMeta("name", "twitter:description", siteConfig.seo.twitterDescription);

    const timer = window.setTimeout(() => setIsBooting(false), 1400);
    return () => window.clearTimeout(timer);
  }, []);

  return (
    <div className="relative min-h-screen text-zinc-100">
      <BackgroundFX />
      <ScrollProgress />
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 md:pt-24">
        <Hero />
        <div className="section-divider" />
        <About />
        <div className="section-divider" />
        <Work />
        <div className="section-divider" />
        <Process />
        <div className="section-divider" />
        <Contact />
      </main>

      <BootOverlay visible={isBooting} />
    </div>
  );
}
