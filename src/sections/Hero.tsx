import { motion } from "framer-motion";
import Button from "../components/Button";
import SignatureReel from "../components/SignatureReel";
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
        className="hero-shell rounded-3xl border border-[rgba(196,164,92,.26)] bg-[linear-gradient(145deg,rgba(17,19,24,.9),rgba(10,11,14,.96))] px-4 py-8 shadow-[0_28px_90px_rgba(0,0,0,.58)] backdrop-blur-xl sm:px-8 sm:py-12"
      >
        <div className="grid gap-8 lg:grid-cols-[1.14fr_.86fr] lg:items-start">
          <div>
            <span className="inline-flex rounded-lg border border-[rgba(212,176,93,.42)] bg-[rgba(212,176,93,.12)] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-cream)]">
              {site.statusChip}
            </span>

            <div className="relative mt-5">
              <h1 className="signature-name relative z-10 text-[3.1rem] font-extrabold italic leading-[0.9] text-zinc-50 sm:text-[5.5rem]">
                {site.displayName}
              </h1>
            </div>

            <p className="lux-title mt-3 text-xl font-semibold sm:text-2xl">{site.slogan}</p>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-200 sm:text-lg">{site.tagline}</p>
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
          </div>

          <aside className="rounded-2xl border border-[rgba(201,173,112,.26)] bg-[linear-gradient(145deg,rgba(20,22,28,.82),rgba(11,13,18,.95))] p-4 sm:p-5">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{site.workTitle}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-300">
              {site.workIntro}
            </p>
            <div className="mt-4 space-y-2.5">
              {site.highlights.slice(0, 4).map((item, index) => (
                <div key={item} className="flex items-start gap-2.5 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2.5">
                  <span className="mt-0.5 font-mono text-[11px] text-[var(--lux-gold-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm text-zinc-200">{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              {site.counterMetrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-lg border border-[rgba(201,173,112,.18)] bg-[rgba(10,12,16,.82)] px-3 py-2"
                >
                  <p className="font-mono text-[10px] uppercase tracking-[0.14em] text-zinc-500">{metric.label}</p>
                  <p className="mt-1 text-base font-bold text-zinc-100">
                    {metric.prefix ?? ""}
                    {metric.value}
                    {metric.suffix ?? ""}
                  </p>
                </div>
              ))}
            </div>
          </aside>
        </div>

        <div className="mt-7">
          <TrustMetricsBar metrics={site.trustMetrics} />
        </div>
        <SignatureReel words={site.reelWords} />
      </motion.div>
    </section>
  );
}
