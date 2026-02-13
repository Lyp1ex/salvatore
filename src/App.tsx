import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { lazy, Suspense, useEffect, useMemo, useState } from "react";
import AmbientLight from "./components/AmbientLight";
import BackgroundFX from "./components/BackgroundFX";
import ExitCta from "./components/ExitCta";
import LuxuryCursor from "./components/LuxuryCursor";
import MobileStickyCTA from "./components/MobileStickyCTA";
import Navbar from "./components/Navbar";
import ScrollProgress from "./components/ScrollProgress";
import StorylineRail from "./components/StorylineRail";
import { siteConfigs, type Locale } from "./config/site";
import About from "./sections/About";
import Contact from "./sections/Contact";
import Faq from "./sections/Faq";
import Hero from "./sections/Hero";
import Process from "./sections/Process";
import Proof from "./sections/Proof";
import Work from "./sections/Work";

const CommandPalette = lazy(() => import("./components/CommandPalette"));

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

const upsertLink = (rel: string, href: string) => {
  const selector = `link[rel="${rel}"]`;
  const existing = document.querySelector<HTMLLinkElement>(selector);
  if (existing) {
    existing.setAttribute("href", href);
    return;
  }

  const link = document.createElement("link");
  link.setAttribute("rel", rel);
  link.setAttribute("href", href);
  document.head.appendChild(link);
};

const upsertJsonLd = (id: string, data: Record<string, unknown>) => {
  const existing = document.querySelector<HTMLScriptElement>(`script[data-schema-id="${id}"]`);
  const payload = JSON.stringify(data);
  if (existing) {
    existing.textContent = payload;
    return;
  }

  const script = document.createElement("script");
  script.type = "application/ld+json";
  script.setAttribute("data-schema-id", id);
  script.textContent = payload;
  document.head.appendChild(script);
};

function BootOverlay({ visible, title }: { visible: boolean; title: string }) {
  return (
    <AnimatePresence>
      {visible ? (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.35, ease: "easeOut" } }}
          className="pointer-events-none fixed inset-0 z-[80] bg-[#050507]"
        >
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_24%,_rgba(212,176,93,.12),_transparent_45%)]" />
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.28 }}
            className="absolute inset-0 m-auto flex h-fit w-fit flex-col items-center gap-2 text-center"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400">kimlik yükleniyor</p>
            <h2 className="signature-name text-4xl font-extrabold italic text-zinc-100 sm:text-5xl">{title}</h2>
            <p className="font-mono text-[11px] uppercase tracking-[0.24em] text-[var(--lux-gold-soft)]">
              premium mode • 2017+
            </p>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

type MotionMode = "ultra" | "lite";

export default function App() {
  const [isBooting, setIsBooting] = useState(true);
  const [locale, setLocale] = useState<Locale>("tr");
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [motionMode, setMotionMode] = useState<MotionMode>("ultra");

  useEffect(() => {
    const saved = window.localStorage.getItem("site-locale");
    if (saved === "tr" || saved === "en") {
      setLocale(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("site-locale", locale);
    document.documentElement.lang = locale;
  }, [locale]);

  useEffect(() => {
    const saved = window.localStorage.getItem("site-motion-mode");
    if (saved === "ultra" || saved === "lite") {
      setMotionMode(saved);
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("site-motion-mode", motionMode);
    document.documentElement.setAttribute("data-motion-mode", motionMode);
  }, [motionMode]);

  const site = useMemo(() => siteConfigs[locale], [locale]);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    document.title = site.seo.title;
    upsertMeta("name", "description", site.seo.description);
    upsertMeta("property", "og:title", site.seo.title);
    upsertMeta("property", "og:description", site.seo.ogDescription);
    upsertMeta("property", "og:image", "/og-card.svg");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("property", "og:locale", locale === "tr" ? "tr_TR" : "en_US");
    upsertMeta("name", "twitter:title", site.seo.title);
    upsertMeta("name", "twitter:description", site.seo.twitterDescription);
    upsertMeta("name", "twitter:image", "/og-card.svg");
    upsertMeta("name", "twitter:url", canonicalUrl);
    upsertMeta("name", "robots", "index,follow,max-image-preview:large");
    upsertMeta("name", "keywords", site.seo.keywords.join(", "));
    upsertLink("canonical", canonicalUrl);

    upsertJsonLd("salvatore-schema", {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "Person",
          name: site.displayName,
          alternateName: "Don Salvatore",
          description: site.seo.description,
          url: canonicalUrl,
          sameAs: [site.socials.telegram.url, site.socials.instagram.url],
          knowsAbout: site.services.map((service) => service.title),
        },
        {
          "@type": "ProfessionalService",
          name: site.displayName,
          url: canonicalUrl,
          areaServed: "Global",
          description: site.seo.ogDescription,
          serviceType: site.services.map((service) => service.title),
        },
        {
          "@type": "WebSite",
          name: site.displayName,
          url: canonicalUrl,
          inLanguage: locale,
        },
      ],
    });

    const timer = window.setTimeout(() => setIsBooting(false), 900);
    return () => window.clearTimeout(timer);
  }, [locale, site]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const isShortcut = (event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k";
      if (!isShortcut) return;
      event.preventDefault();
      setIsCommandOpen((previous) => !previous);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const onToggleLocale = () => {
    setLocale((previous) => (previous === "tr" ? "en" : "tr"));
  };

  const onToggleMotion = () => {
    setMotionMode((previous) => (previous === "ultra" ? "lite" : "ultra"));
  };

  const onNavigate = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <MotionConfig reducedMotion={motionMode === "lite" ? "always" : "user"}>
      <div className={`relative min-h-screen text-zinc-100 ${motionMode === "lite" ? "motion-lite" : ""}`}>
        <BackgroundFX lite={motionMode === "lite"} />
        {motionMode === "ultra" ? <AmbientLight /> : null}
        {motionMode === "ultra" ? <LuxuryCursor /> : null}
        <ScrollProgress />
        {motionMode === "ultra" ? <StorylineRail /> : null}
        <Navbar
          site={site}
          locale={locale}
          motionMode={motionMode}
          onToggleLocale={onToggleLocale}
          onToggleMotion={onToggleMotion}
          onOpenCommand={() => setIsCommandOpen(true)}
        />

        <main className="relative z-10 mx-auto max-w-6xl px-3 pb-32 pt-24 sm:px-5 md:pb-12 md:pt-28">
          <Hero site={site} />
          <div className="section-divider" />
          <About site={site} />
          <div className="section-divider" />
          <Work site={site} />
          <div className="section-divider" />
          <Process site={site} />
          <div className="section-divider" />
          <Proof site={site} />
          <div className="section-divider" />
          <Faq site={site} />
          <div className="section-divider" />
          <Contact site={site} />
        </main>

        <MobileStickyCTA site={site} />
        <ExitCta site={site} />

        {isCommandOpen ? (
          <Suspense fallback={null}>
            <CommandPalette
              open={isCommandOpen}
              site={site}
              locale={locale}
              onClose={() => setIsCommandOpen(false)}
              onNavigate={onNavigate}
              onToggleLocale={onToggleLocale}
            />
          </Suspense>
        ) : null}

        <BootOverlay visible={isBooting} title={site.displayName} />
      </div>
    </MotionConfig>
  );
}
