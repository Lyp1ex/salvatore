import { motion } from "framer-motion";
import Button from "../components/Button";
import { siteConfig } from "../config/site";

export default function Hero() {
  return (
    <section id="home" className="scroll-mt-24 pt-16 sm:pt-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.45 }}
        transition={{ duration: 0.55, ease: "easeOut" }}
        className="hero-shell rounded-3xl border border-[rgba(196,164,92,.26)] bg-[linear-gradient(135deg,rgba(255,255,255,.08),rgba(10,11,14,.8))] px-5 py-10 shadow-neon backdrop-blur-xl sm:px-8 sm:py-14"
      >
        <span className="inline-flex rounded-full border border-[rgba(212,176,93,.45)] bg-[rgba(212,176,93,.14)] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-cream)]">
          {siteConfig.statusChip}
        </span>

        <h1 className="signature-name mt-5 text-6xl font-extrabold italic leading-[0.9] text-zinc-50 sm:text-8xl">
          {siteConfig.displayName}
        </h1>

        <p className="lux-title mt-3 text-xl font-semibold sm:text-2xl">{siteConfig.slogan}</p>
        <p className="mt-6 max-w-2xl text-lg text-zinc-200 sm:text-xl">{siteConfig.tagline}</p>
        <p className="mt-3 max-w-2xl font-mono text-xs uppercase tracking-[0.2em] text-zinc-400">
          {siteConfig.microLine}
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="#contact" variant="primary">
            İş Çıkaralım
          </Button>
          <Button href="#work" variant="ghost">
            Neler Yapıyorum?
          </Button>
        </div>
        <p className="mt-3 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
          Signature akış: Script + Kripto + Finans + Reklam
        </p>

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] py-3">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            className="flex min-w-max gap-2 px-3"
          >
            {[...siteConfig.highlights, ...siteConfig.highlights].map((item, index) => (
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
          {siteConfig.trustMetrics.map((metric, index) => (
            <motion.div
              key={metric.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 + index * 0.07, duration: 0.35 }}
              className="rounded-2xl border border-white/10 bg-zinc-900/55 p-3"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-zinc-400">{metric.label}</p>
              <p className="mt-1 text-lg font-bold text-zinc-100">{metric.value}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
