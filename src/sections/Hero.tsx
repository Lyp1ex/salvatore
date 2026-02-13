import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "../components/AnimatedCounter";
import Button from "../components/Button";
import type { SiteConfig } from "../config/site";

type HeroProps = {
  site: SiteConfig;
};

export default function Hero({ site }: HeroProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const foregroundY = useTransform(scrollYProgress, [0, 1], [0, -20]);
  const backgroundY = useTransform(scrollYProgress, [0, 1], [0, -68]);

  return (
    <section ref={sectionRef} id="home" className="scroll-mt-24 pt-16 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hero-shell rounded-3xl border border-[rgba(196,164,92,.26)] bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(10,11,14,.8))] px-5 py-10 shadow-neon backdrop-blur-xl sm:px-8 sm:py-14"
      >
        <div className="hero-monogram" aria-hidden>
          DS
        </div>

        <span className="inline-flex rounded-full border border-[rgba(212,176,93,.45)] bg-[rgba(212,176,93,.14)] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-cream)]">
          {site.statusChip}
        </span>

        <div className="relative mt-5">
          <motion.h1 style={{ y: foregroundY }} className="signature-name relative z-10 text-6xl font-extrabold italic leading-[0.9] text-zinc-50 sm:text-8xl">
            {site.displayName}
          </motion.h1>
          <motion.h1
            aria-hidden
            style={{ y: backgroundY }}
            className="pointer-events-none absolute inset-0 z-0 text-6xl font-extrabold italic leading-[0.9] text-[rgba(212,176,93,.16)] blur-[1px] sm:text-8xl"
          >
            {site.displayName}
          </motion.h1>
        </div>

        <p className="lux-title mt-3 text-xl font-semibold sm:text-2xl">{site.slogan}</p>
        <p className="mt-6 max-w-2xl text-lg text-zinc-200 sm:text-xl">{site.tagline}</p>
        <p className="mt-3 max-w-2xl font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">{site.microLine}</p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary">
            {site.buttons.primary}
          </Button>
          <Button href="#work" variant="ghost">
            {site.buttons.secondary}
          </Button>
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
          {site.heroSignatureLine}
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="flex min-w-max gap-2 px-3"
          >
            {[...site.highlights, ...site.highlights].map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="rounded-full border border-cyan-200/25 bg-zinc-900/70 px-3 py-1 text-xs uppercase tracking-wide text-zinc-200"
              >
                {item}
              </span>
            ))}
          </motion.div>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-4">
          {site.counterMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10, clipPath: "inset(0 0 36% 0 round 14px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 14px)" }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.45 }}
              className="glass-distort rounded-2xl border border-white/10 bg-zinc-900/55 p-3"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">{metric.label}</p>
              <p className="mt-1 text-lg font-bold text-zinc-100">
                <AnimatedCounter
                  value={metric.value}
                  prefix={metric.prefix}
                  suffix={metric.suffix}
                  duration={1300 + index * 140}
                />
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
