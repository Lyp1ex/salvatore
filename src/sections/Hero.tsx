import { motion } from "framer-motion";
import Button from "../components/Button";
import TrustMetricsBar from "../components/TrustMetricsBar";
import type { SiteConfig } from "../config/site";

type HeroProps = {
  site: SiteConfig;
};

export default function Hero({ site }: HeroProps) {
  return (
    <section id="home" className="scroll-mt-24 pt-14 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hero-shell rounded-3xl border border-[rgba(196,164,92,.26)] bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(10,11,14,.8))] px-4 py-9 shadow-neon backdrop-blur-xl sm:px-8 sm:py-14"
      >
        <span className="inline-flex rounded-full border border-[rgba(212,176,93,.45)] bg-[rgba(212,176,93,.14)] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-cream)]">
          {site.statusChip}
        </span>

        <div className="relative mt-5">
          <h1 className="signature-name relative z-10 text-[3.2rem] font-extrabold italic leading-[0.9] text-zinc-50 sm:text-8xl">
            {site.displayName}
          </h1>
        </div>

        <p className="lux-title mt-3 text-xl font-semibold sm:text-2xl">{site.slogan}</p>
        <p className="mt-6 max-w-2xl text-lg text-zinc-200 sm:text-xl">{site.tagline}</p>
        <p className="mt-3 max-w-2xl font-mono text-[11px] uppercase tracking-[0.14em] text-zinc-400 sm:text-xs sm:tracking-[0.2em]">
          {site.microLine}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary" className="w-full sm:w-auto">
            {site.buttons.primary}
          </Button>
          <Button href="#work" variant="ghost" className="w-full sm:w-auto">
            {site.buttons.secondary}
          </Button>
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
          {site.heroSignatureLine}
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {site.highlights.slice(0, 5).map((item) => (
            <span
              key={item}
              className="rounded-full border border-[rgba(212,176,93,.26)] bg-[rgba(212,176,93,.08)] px-3 py-1 text-[10px] uppercase tracking-wide text-zinc-200 sm:text-xs"
            >
              {item}
            </span>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {site.counterMetrics.map((metric) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10, clipPath: "inset(0 0 36% 0 round 14px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 14px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.35 }}
              className="glass-distort rounded-2xl border border-white/10 bg-zinc-900/55 p-3"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">{metric.label}</p>
              <p className="mt-1 text-lg font-bold text-zinc-100">
                {metric.prefix ?? ""}
                {metric.value}
                {metric.suffix ?? ""}
              </p>
            </motion.div>
          ))}
        </div>

        <TrustMetricsBar metrics={site.trustMetrics} />
      </motion.div>
    </section>
  );
}
