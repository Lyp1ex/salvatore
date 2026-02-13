import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import BackgroundFX from "./components/BackgroundFX";
import Navbar from "./components/Navbar";
import { siteConfig } from "./config/site";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Hero from "./sections/Hero";
import Showcase from "./sections/Showcase";
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
          className="pointer-events-none fixed inset-0 z-[80] bg-[#040509]"
        >
          <div className="scanline-layer absolute inset-0" />
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center gap-2 text-center"
          >
            <p className="font-mono text-xs uppercase tracking-[0.32em] text-zinc-400">
              kimlik senkronlanıyor
            </p>
            <h2 className="text-4xl font-extrabold text-zinc-100 sm:text-5xl">{siteConfig.displayName}</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-cyan-200/70">
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
      <Navbar />

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-10 pt-20 sm:px-6 md:pt-24">
        <Hero />
        <About />
        <Work />
        <Showcase />
        <Contact />
      </main>

      <BootOverlay visible={isBooting} />
    </div>
  );
}
