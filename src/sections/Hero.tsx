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
        className="rounded-3xl border border-white/10 bg-white/[0.045] px-5 py-10 shadow-neon backdrop-blur-xl sm:px-8 sm:py-14"
      >
        <span className="inline-flex rounded-full border border-emerald-300/40 bg-emerald-300/10 px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-emerald-200">
          {siteConfig.statusChip}
        </span>

        <h1 className="signature-name mt-5 text-6xl font-extrabold italic leading-[0.9] text-zinc-50 sm:text-8xl">
          {siteConfig.displayName}
        </h1>

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
      </motion.div>
    </section>
  );
}
