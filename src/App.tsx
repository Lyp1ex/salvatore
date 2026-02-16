import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { FaArrowRight, FaInstagram, FaTelegramPlane } from "react-icons/fa";
import { siteConfigs, type CounterMetric, type SiteConfig, type TrustMetric } from "./config/site";

type PageKey = "home" | "about" | "services" | "process" | "contact";

const pageKeys: PageKey[] = ["home", "about", "services", "process", "contact"];
const pageOrder: Record<PageKey, number> = {
  home: 0,
  about: 1,
  services: 2,
  process: 3,
  contact: 4,
};

const pageTransition = {
  initial: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? 14 : -14,
    y: 6,
  }),
  animate: {
    opacity: 1,
    x: 0,
    y: 0,
  },
  exit: (direction: number) => ({
    opacity: 0,
    x: direction >= 0 ? -12 : 12,
    y: -4,
  }),
};

const isPageKey = (value: string): value is PageKey => {
  return pageKeys.includes(value as PageKey);
};

const getPageFromHash = (): PageKey => {
  if (typeof window === "undefined") return "home";
  const raw = window.location.hash.replace("#", "").trim().toLowerCase();
  return isPageKey(raw) ? raw : "home";
};

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

type NavItem = {
  key: PageKey;
  label: string;
};

const sectionLabels = (site: SiteConfig): Record<PageKey, string> => ({
  home: site.nav.home,
  about: site.nav.about,
  services: site.nav.work,
  process: site.nav.process,
  contact: site.nav.contact,
});

const ambientDots = [
  { left: "8%", top: "22%", size: 7, duration: 9.8, delay: 0.2 },
  { left: "18%", top: "66%", size: 5, duration: 11.2, delay: 1.3 },
  { left: "32%", top: "34%", size: 4, duration: 8.8, delay: 0.9 },
  { left: "52%", top: "74%", size: 6, duration: 12.4, delay: 2.1 },
  { left: "66%", top: "28%", size: 5, duration: 10.1, delay: 1.7 },
  { left: "79%", top: "62%", size: 7, duration: 13.4, delay: 0.6 },
  { left: "90%", top: "38%", size: 4, duration: 9.6, delay: 2.4 },
];

const ambientShapes = [
  { left: "6%", top: "80%", size: 16, rotate: 14, duration: 17, delay: 0.4 },
  { left: "20%", top: "18%", size: 12, rotate: -18, duration: 22, delay: 1.5 },
  { left: "30%", top: "58%", size: 14, rotate: 24, duration: 19, delay: 0.9 },
  { left: "44%", top: "24%", size: 10, rotate: -14, duration: 16, delay: 2.3 },
  { left: "58%", top: "78%", size: 18, rotate: 20, duration: 24, delay: 1.2 },
  { left: "72%", top: "14%", size: 12, rotate: -26, duration: 18, delay: 0.6 },
  { left: "84%", top: "52%", size: 16, rotate: 16, duration: 21, delay: 2.1 },
  { left: "92%", top: "74%", size: 10, rotate: -12, duration: 15, delay: 1.8 },
];

const getTelegramUsername = (url: string, fallbackHandle: string): string => {
  try {
    const parsed = new URL(url);
    const firstSegment = parsed.pathname.split("/").filter(Boolean)[0];
    if (firstSegment) return firstSegment.replace("@", "");
  } catch {
    // Fallback below
  }
  return fallbackHandle.replace("@", "");
};

const useAnimatedNumber = (target: number, trigger: number, duration = 900): number => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    let frame = 0;
    let startTime: number | null = null;

    const tick = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(target * eased);

      if (progress < 1) {
        frame = window.requestAnimationFrame(tick);
      }
    };

    frame = window.requestAnimationFrame(tick);
    return () => window.cancelAnimationFrame(frame);
  }, [duration, target, trigger]);

  return value;
};

type CounterStatCardProps = {
  metric: CounterMetric;
};

function CounterStatCard({ metric }: CounterStatCardProps) {
  const [trigger, setTrigger] = useState(1);
  const animatedValue = useAnimatedNumber(metric.value, trigger, 1000);

  return (
    <motion.button
      type="button"
      onClick={() => setTrigger((current) => current + 1)}
      whileTap={{ scale: 0.98 }}
      className="metric-card w-full rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] px-3 py-2.5 text-left"
      aria-label={`${metric.label} metrik animasyonunu tekrar oynat`}
    >
      <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">{metric.label}</p>
      <p className="mt-1 text-base font-semibold text-zinc-100">
        {metric.prefix ?? ""}
        {Math.round(animatedValue)}
        {metric.suffix ?? ""}
      </p>
    </motion.button>
  );
}

type TrustMetricCardProps = {
  metric: TrustMetric;
};

function TrustMetricCard({ metric }: TrustMetricCardProps) {
  const [trigger, setTrigger] = useState(1);
  const animatedValue = useAnimatedNumber(metric.value, trigger, 950);
  const rounded = Math.round(animatedValue);

  return (
    <motion.button
      type="button"
      onClick={() => setTrigger((current) => current + 1)}
      whileTap={{ scale: 0.99 }}
      className="metric-card w-full rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] p-3 text-left"
      aria-label={`${metric.label} metrik animasyonunu tekrar oynat`}
    >
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-zinc-100">{metric.label}</p>
        <p className="font-mono text-[11px] text-[var(--text-main)]">{rounded}%</p>
      </div>
      <div className="mt-2 h-1.5 rounded-full bg-white/10">
        <motion.div
          key={`${metric.label}-${trigger}`}
          initial={{ width: 0 }}
          animate={{ width: `${rounded}%` }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="h-full rounded-full bg-[linear-gradient(90deg,#5fc199,#b6d3c8)]"
        />
      </div>
      <p className="mt-2 text-xs text-zinc-400">{metric.summary}</p>
    </motion.button>
  );
}

type IntroOverlayProps = {
  show: boolean;
  onClose: () => void;
  site: SiteConfig;
};

function IntroOverlay({ show, onClose, site }: IntroOverlayProps) {
  return (
    <AnimatePresence>
      {show ? (
        <motion.div
          key="intro-overlay"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeOut" } }}
          className="intro-overlay fixed inset-0 z-[90] flex items-center justify-center px-5"
          onClick={onClose}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") onClose();
          }}
          aria-label="Giriş animasyonunu kapat"
        >
          <div className="intro-panel max-w-xl text-center">
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45 }}
              className="font-mono text-[11px] uppercase tracking-[0.25em] text-[var(--text-faint)]"
            >
              Don Salvatore
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.08 }}
              className="intro-brand mt-2 text-5xl sm:text-7xl"
            >
              {site.displayName}
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.18 }}
              className="mt-4 text-base font-semibold text-[var(--text-main)] sm:text-lg"
            >
              {site.slogan}
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24 }}
              className="intro-status mt-2 text-sm text-[var(--text-soft)]"
            >
              Sistem hazırlanıyor...
            </motion.p>

            <div className="intro-progress mt-6">
              <motion.span
                className="intro-progress-fill"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 4.5, ease: "easeInOut" }}
              />
            </div>

            <p className="intro-hint mt-4 font-mono text-[10px] uppercase tracking-[0.14em] text-[var(--text-faint)]">
              Atlamak için ekrana dokun
            </p>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

function BackgroundFX() {
  return (
    <div className="background-layer" aria-hidden>
      <div className="background-core" />
      <div className="background-flow" />
      <div className="background-wave wave-a" />
      <div className="background-wave wave-b" />
      <div className="background-orb orb-a" />
      <div className="background-orb orb-b" />
      <div className="background-orb orb-c" />
      <div className="background-monogram mono-a" />
      <div className="background-monogram mono-b" />
      <div className="background-vignette" />
      <div className="background-grid" />
      {ambientDots.map((dot) => (
        <motion.span
          key={`${dot.left}-${dot.top}`}
          className="background-dot"
          style={{
            left: dot.left,
            top: dot.top,
            width: `${dot.size}px`,
            height: `${dot.size}px`,
          }}
          animate={{ y: [0, -14, 0], x: [0, 6, 0], opacity: [0.16, 0.42, 0.16] }}
          transition={{
            duration: dot.duration,
            delay: dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      {ambientShapes.map((shape) => (
        <motion.span
          key={`${shape.left}-${shape.top}`}
          className="background-shape"
          style={{
            left: shape.left,
            top: shape.top,
            width: `${shape.size}px`,
            height: `${shape.size}px`,
            rotate: `${shape.rotate}deg`,
          }}
          animate={{
            y: [0, -26, 0],
            x: [0, 10, 0],
            rotate: [shape.rotate, shape.rotate + 42, shape.rotate],
            opacity: [0.12, 0.34, 0.12],
          }}
          transition={{
            duration: shape.duration,
            delay: shape.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
      <div className="background-noise" />
    </div>
  );
}

type TopNavProps = {
  site: SiteConfig;
  page: PageKey;
  onNavigate: (page: PageKey) => void;
};

function TopNav({ site, page, onNavigate }: TopNavProps) {
  const navItems: NavItem[] = [
    { key: "home", label: site.nav.home },
    { key: "about", label: site.nav.about },
    { key: "services", label: site.nav.work },
    { key: "process", label: site.nav.process },
    { key: "contact", label: site.nav.contact },
  ];

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      <nav className="nav-shell mx-auto flex max-w-6xl items-center gap-2 rounded-2xl border border-[var(--line-soft)] bg-[rgba(8,9,12,.78)] p-1.5 shadow-[0_18px_44px_rgba(0,0,0,.45)] backdrop-blur-xl">
        <button
          type="button"
          onClick={() => onNavigate("home")}
          className="brand-badge rounded-xl border border-[var(--line-strong)] bg-[rgba(125,199,171,.12)] px-3 py-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-main)]"
          aria-label="Ana sayfa"
        >
          DS
        </button>

        <div className="hide-scrollbar flex min-w-0 flex-1 items-center gap-1 overflow-x-auto">
          {navItems.map((item) => {
            const active = item.key === page;
            return (
              <motion.button
                key={item.key}
                type="button"
                onClick={() => onNavigate(item.key)}
                whileTap={{ scale: 0.96 }}
                className={`nav-item shrink-0 rounded-lg px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] transition sm:text-[13px] ${
                  active
                    ? "nav-item-active border border-[var(--line-strong)] bg-[rgba(125,199,171,.12)] text-[var(--text-main)]"
                    : "border border-transparent text-zinc-300 hover:border-[var(--line-soft)] hover:bg-[rgba(255,255,255,.03)]"
                }`}
              >
                {active ? (
                  <motion.span
                    layoutId="nav-active-pill"
                    className="nav-active-pill"
                    transition={{ type: "spring", stiffness: 260, damping: 32, mass: 0.9 }}
                  />
                ) : null}
                <span className="relative z-[2]">{item.label}</span>
              </motion.button>
            );
          })}
        </div>
      </nav>
    </header>
  );
}

type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description?: string;
};

function SectionIntro({ eyebrow, title, description }: SectionIntroProps) {
  return (
    <div className="section-intro">
      <div className="section-rule" />
      <p className="section-kicker font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-bold text-[var(--text-main)] sm:text-4xl">{title}</h2>
      {description ? <p className="mt-3 max-w-2xl text-sm text-[var(--text-soft)] sm:text-base">{description}</p> : null}
    </div>
  );
}

type HomePageProps = {
  site: SiteConfig;
  onNavigate: (page: PageKey) => void;
};

function HomePage({ site, onNavigate }: HomePageProps) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.15fr_.85fr]">
      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.28 }}
        className="surface-card elevated-card monogram-card p-6 sm:p-8"
      >
        <span className="status-chip inline-flex rounded-lg border border-[var(--line-strong)] bg-[rgba(125,199,171,.12)] px-3 py-1 font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-main)]">
          {site.statusChip}
        </span>

        <h1 data-brand={site.displayName} className="brand-title mt-5 text-6xl leading-[0.85] sm:text-8xl">
          {site.displayName}
        </h1>

        <p className="mt-4 text-2xl font-semibold text-[var(--text-main)] sm:text-3xl">{site.slogan}</p>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-300 sm:text-lg">{site.tagline}</p>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-faint)]">{site.microLine}</p>

        <div className="mt-7 flex flex-wrap gap-3">
          <motion.button
            type="button"
            onClick={() => onNavigate("contact")}
            whileHover={{ y: -1.5, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="cta-primary inline-flex items-center gap-2 rounded-xl border border-[var(--line-strong)] px-5 py-2.5 text-sm font-semibold text-[#0d1a16] transition"
          >
            {site.buttons.primary}
            <FaArrowRight className="text-xs" />
          </motion.button>

          <motion.button
            type="button"
            onClick={() => onNavigate("services")}
            whileHover={{ y: -1.5 }}
            whileTap={{ scale: 0.98 }}
            className="cta-secondary inline-flex items-center gap-2 rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.03)] px-5 py-2.5 text-sm font-semibold text-zinc-100 transition hover:border-[var(--line-strong)] hover:bg-[rgba(125,199,171,.1)]"
          >
            {site.buttons.secondary}
          </motion.button>
        </div>
      </motion.article>

      <motion.article
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.32, delay: 0.04 }}
        className="surface-card elevated-card p-5 sm:p-6"
      >
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{site.heroSignatureLine}</p>
        <p className="mt-1 text-xs text-[var(--text-faint)]">Metrik kartlarına dokun, animasyonu tekrar başlat.</p>

        <div className="mt-5 grid grid-cols-2 gap-2">
          {site.counterMetrics.slice(0, 4).map((metric) => (
            <CounterStatCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="mt-5 space-y-3">
          {site.trustMetrics.map((metric) => (
            <TrustMetricCard key={metric.label} metric={metric} />
          ))}
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {site.highlights.map((item) => (
            <span
              key={item}
              className="mini-chip rounded-lg border border-[var(--line-soft)] bg-[rgba(255,255,255,.03)] px-3 py-1 text-[11px] uppercase tracking-[0.1em] text-zinc-300"
            >
              {item}
            </span>
          ))}
        </div>
      </motion.article>
    </section>
  );
}

function AboutPage({ site }: { site: SiteConfig }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.12fr_.88fr]">
      <article className="surface-card elevated-card p-6 sm:p-7">
        <SectionIntro eyebrow={site.aboutEyebrow} title={site.aboutTitle} />
        <div className="mt-5 space-y-4 text-zinc-200">
          {site.aboutParagraphs.map((paragraph) => (
            <p key={paragraph} className="leading-relaxed">
              {paragraph}
            </p>
          ))}
        </div>
      </article>

      <article className="surface-card elevated-card p-6 sm:p-7">
        <h3 className="text-xl font-semibold text-zinc-100">{site.factsTitle}</h3>
        <ul className="mt-4 space-y-2.5">
          {site.quickFacts.map((fact) => (
            <li key={fact} className="flex items-start gap-2 text-sm leading-relaxed text-zinc-300">
              <span className="mt-[8px] h-1.5 w-1.5 rounded-full bg-[var(--text-main)]" />
              <span>{fact}</span>
            </li>
          ))}
        </ul>
      </article>
    </section>
  );
}

type ServicesPageProps = {
  site: SiteConfig;
  activeFilter: string;
  onFilterChange: (filterId: string) => void;
};

function ServicesPage({ site, activeFilter, onFilterChange }: ServicesPageProps) {
  const filteredServices = useMemo(() => {
    return site.services.filter((service) => activeFilter === "all" || service.filters.includes(activeFilter));
  }, [activeFilter, site.services]);

  return (
    <section className="space-y-6">
      <SectionIntro eyebrow={site.workEyebrow} title={site.workTitle} description={site.workIntro} />

      <div className="flex flex-wrap gap-2">
        {site.serviceFilters.map((filter) => {
          const active = filter.id === activeFilter;
          return (
            <motion.button
              key={filter.id}
              type="button"
              onClick={() => onFilterChange(filter.id)}
              whileTap={{ scale: 0.97 }}
              className={`filter-chip rounded-lg border px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.12em] transition ${
                active
                  ? "border-[var(--line-strong)] bg-[rgba(125,199,171,.14)] text-[var(--text-main)]"
                  : "border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] text-zinc-300 hover:border-[var(--line-strong)]"
              }`}
            >
              {filter.label}
            </motion.button>
          );
        })}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {filteredServices.map((service) => (
          <motion.article
            key={service.title}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.22 }}
            whileHover={{ y: -4, transition: { duration: 0.18 } }}
            className="surface-card service-card h-full p-5"
          >
            <h3 className="text-lg font-semibold text-zinc-100">{service.title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.description}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="mini-chip rounded-md border border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] px-2.5 py-1 text-[11px] uppercase tracking-[0.1em] text-zinc-300"
                >
                  {tag}
                </span>
              ))}
            </div>
          </motion.article>
        ))}
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <article className="surface-card elevated-card p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-zinc-400">{site.comparison.standardLabel}</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {site.comparison.standardPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>

        <article className="surface-card elevated-card border-[var(--line-strong)] bg-[linear-gradient(140deg,rgba(125,199,171,.1),rgba(11,13,18,.94))] p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--text-main)]">{site.comparison.premiumLabel}</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-100">
            {site.comparison.premiumPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-[7px] h-1.5 w-1.5 rounded-full bg-[var(--text-main)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </article>
      </div>
    </section>
  );
}

function ProcessPage({ site }: { site: SiteConfig }) {
  return (
    <section className="grid gap-6 lg:grid-cols-[1.08fr_.92fr]">
      <article className="surface-card elevated-card p-6 sm:p-7">
        <SectionIntro eyebrow={site.processEyebrow} title={site.processTitle} />
        <div className="mt-5 space-y-3">
          {site.processSteps.map((step, index) => (
            <div key={step.title} className="metric-card rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] p-3.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-faint)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-1 text-base font-semibold text-zinc-100">{step.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">{step.detail}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="surface-card elevated-card p-6 sm:p-7">
        <SectionIntro eyebrow={site.storyEyebrow} title={site.storyTitle} />
        <div className="mt-5 space-y-3">
          {site.storyMoments.map((moment) => (
            <div key={`${moment.year}-${moment.title}`} className="metric-card rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] p-3.5">
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-main)]">{moment.year}</p>
              <h3 className="mt-1 text-base font-semibold text-zinc-100">{moment.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-zinc-300">{moment.detail}</p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
}

function ContactPage({ site }: { site: SiteConfig }) {
  const serviceOptions = site.quoteWizard.options.services;
  const budgetOptions = site.quoteWizard.options.budgets;
  const timelineOptions = site.quoteWizard.options.timelines;

  const [selectedService, setSelectedService] = useState(serviceOptions[0] ?? "");
  const [selectedBudget, setSelectedBudget] = useState(budgetOptions[0] ?? "");
  const [selectedTimeline, setSelectedTimeline] = useState(timelineOptions[0] ?? "");

  const telegramUsername = useMemo(
    () => getTelegramUsername(site.socials.telegram.url, site.socials.telegram.handle),
    [site.socials.telegram.url, site.socials.telegram.handle],
  );

  const quickMessage = useMemo(() => {
    return [
      "Selam, hizmet talebim var.",
      "",
      `Hizmet: ${selectedService}`,
      `Bütçe: ${selectedBudget}`,
      `Süre: ${selectedTimeline}`,
      "",
      "Uygunsan detay için dönüş yapabilir misin?",
    ].join("\n");
  }, [selectedBudget, selectedService, selectedTimeline]);

  const quickTelegramUrl = useMemo(() => {
    return `https://t.me/${telegramUsername}?text=${encodeURIComponent(quickMessage)}`;
  }, [quickMessage, telegramUsername]);

  return (
    <section className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
      <article className="surface-card elevated-card p-6 sm:p-7">
        <SectionIntro eyebrow={site.finalCtaEyebrow} title={site.contactTitle} description={site.contactLine} />
        <p className="mt-2 font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--text-faint)]">{site.contactHint}</p>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <motion.a
            href={site.socials.telegram.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="telegram-btn cta-primary inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold text-[#0d1a16] transition"
          >
            <FaTelegramPlane className="telegram-icon" />
            {site.socials.telegram.label}
          </motion.a>
          <motion.a
            href={site.socials.instagram.url}
            target="_blank"
            rel="noreferrer"
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="cta-secondary inline-flex items-center justify-center gap-2 rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.03)] px-5 py-3 text-sm font-semibold text-zinc-100 transition hover:border-[var(--line-strong)] hover:bg-[rgba(125,199,171,.1)]"
          >
            <FaInstagram />
            {site.socials.instagram.label}
          </motion.a>
        </div>
      </article>

      <article className="surface-card elevated-card p-6 sm:p-7">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--text-faint)]">{site.finalCtaEyebrow}</p>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-soft)]">{site.quoteWizard.intro}</p>

        <div className="mt-5 space-y-3">
          <label className="form-field">
            <span className="form-label">{site.quoteWizard.stepLabels[0] ?? "Hizmet"}</span>
            <select
              value={selectedService}
              onChange={(event) => setSelectedService(event.target.value)}
              className="form-select"
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">{site.quoteWizard.stepLabels[1] ?? "Bütçe"}</span>
            <select
              value={selectedBudget}
              onChange={(event) => setSelectedBudget(event.target.value)}
              className="form-select"
            >
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <label className="form-field">
            <span className="form-label">{site.quoteWizard.stepLabels[2] ?? "Süre"}</span>
            <select
              value={selectedTimeline}
              onChange={(event) => setSelectedTimeline(event.target.value)}
              className="form-select"
            >
              {timelineOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          </label>

          <a
            href={quickTelegramUrl}
            target="_blank"
            rel="noreferrer"
            className="telegram-btn cta-primary mt-2 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[var(--line-strong)] px-5 py-3 text-sm font-semibold text-[#0d1a16] transition"
          >
            <FaTelegramPlane className="telegram-icon" />
            Telegram’a Otomatik Gönder
          </a>
        </div>

        <div className="form-preview mt-4 rounded-xl border border-[var(--line-soft)] bg-[rgba(255,255,255,.02)] p-3">
          <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--text-faint)]">Gönderilecek Mesaj</p>
          <p className="mt-2 whitespace-pre-line text-xs leading-relaxed text-zinc-300">{quickMessage}</p>
        </div>
      </article>
    </section>
  );
}

export default function App() {
  const site = siteConfigs.tr;

  const [showIntro, setShowIntro] = useState(true);
  const [page, setPage] = useState<PageKey>(() => getPageFromHash());
  const [direction, setDirection] = useState(1);
  const [activeFilter, setActiveFilter] = useState(site.serviceFilters[0]?.id ?? "all");

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setShowIntro(false);
    }, 5000);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    document.body.style.overflow = showIntro ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [showIntro]);

  useEffect(() => {
    const onHashChange = () => {
      const nextPage = getPageFromHash();
      setPage((previous) => {
        const delta = pageOrder[nextPage] - pageOrder[previous];
        setDirection(delta === 0 ? 1 : delta);
        return nextPage;
      });
    };

    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    setActiveFilter(site.serviceFilters[0]?.id ?? "all");
  }, [site.serviceFilters]);

  const labels = useMemo(() => sectionLabels(site), [site]);

  useEffect(() => {
    const canonicalUrl = `${window.location.origin}${window.location.pathname}`;
    const pageTitle = page === "home" ? site.seo.title : `${site.displayName} • ${labels[page]}`;
    const pageDescription = page === "contact" ? site.contactLine : site.seo.description;

    document.title = pageTitle;
    upsertMeta("name", "description", pageDescription);
    upsertMeta("name", "keywords", site.seo.keywords.join(", "));
    upsertMeta("property", "og:title", pageTitle);
    upsertMeta("property", "og:description", pageDescription);
    upsertMeta("property", "og:type", "website");
    upsertMeta("property", "og:image", "/og-card.svg");
    upsertMeta("property", "og:url", canonicalUrl);
    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", pageTitle);
    upsertMeta("name", "twitter:description", pageDescription);
    upsertMeta("name", "twitter:image", "/og-card.svg");
    upsertLink("canonical", canonicalUrl);
  }, [labels, page, site]);

  const onNavigate = (nextPage: PageKey) => {
    setPage((previous) => {
      const delta = pageOrder[nextPage] - pageOrder[previous];
      setDirection(delta === 0 ? 1 : delta);
      return nextPage;
    });
    window.history.replaceState(null, "", `#${nextPage}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <MotionConfig reducedMotion="user">
      <div className="app-shell relative min-h-screen text-zinc-100">
        <BackgroundFX />
        <IntroOverlay show={showIntro} onClose={() => setShowIntro(false)} site={site} />

        <TopNav site={site} page={page} onNavigate={onNavigate} />

        <main className="page-shell relative z-10 mx-auto w-full max-w-6xl px-3 pb-16 pt-24 sm:px-6 sm:pt-28">
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              variants={pageTransition}
              custom={direction}
              initial="initial"
              animate="animate"
              exit="exit"
              transition={{ duration: 0.3, ease: [0.22, 0.61, 0.36, 1] }}
              className="space-y-6"
            >
              {page === "home" ? <HomePage site={site} onNavigate={onNavigate} /> : null}
              {page === "about" ? <AboutPage site={site} /> : null}
              {page === "services" ? (
                <ServicesPage site={site} activeFilter={activeFilter} onFilterChange={setActiveFilter} />
              ) : null}
              {page === "process" ? <ProcessPage site={site} /> : null}
              {page === "contact" ? <ContactPage site={site} /> : null}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </MotionConfig>
  );
}
