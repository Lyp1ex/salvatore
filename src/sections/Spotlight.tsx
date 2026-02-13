import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type SpotlightProps = {
  site: SiteConfig;
};

const compact = (text: string) => {
  const clean = text.trim();
  if (clean.length <= 96) return clean;
  return `${clean.slice(0, 93).trimEnd()}...`;
};

export default function Spotlight({ site }: SpotlightProps) {
  const isEnglish = site.localeLabel.startsWith("EN");

  const title = isEnglish ? "Selected Work" : "Seçili İşler";
  const eyebrow = isEnglish ? "portfolio" : "portföy";
  const pulseLabel = isEnglish ? "project summary" : "proje özeti";
  const quoteLabel = isEnglish ? "client feedback" : "müşteri geri bildirimi";

  return (
    <section id="spotlight" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={title} eyebrow={eyebrow} />

        <div className="grid gap-4 lg:grid-cols-2">
          <Card className="border-[rgba(212,176,93,.24)]">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{pulseLabel}</p>
            <div className="mt-3 grid gap-2">
              {site.highlights.slice(0, 4).map((item, index) => (
                <div key={item} className="flex items-start gap-2 rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2">
                  <span className="font-mono text-[11px] text-[var(--lux-gold-soft)]">{String(index + 1).padStart(2, "0")}</span>
                  <span className="text-sm text-zinc-200">{item}</span>
                </div>
              ))}
            </div>
          </Card>

          <motion.article
            initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 32% 0 round 16px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.35 }}
            className="rounded-2xl border border-white/10 bg-[rgba(8,10,14,.65)] p-4"
          >
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{quoteLabel}</p>
            <p className="mt-2 text-sm leading-relaxed text-zinc-200">"{site.proofQuotes[0]?.quote}"</p>
            <p className="mt-3 text-xs uppercase tracking-[0.14em] text-zinc-400">
              {site.proofQuotes[0]?.author} • {site.proofQuotes[0]?.role}
            </p>
          </motion.article>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          {site.caseStudies.slice(0, 3).map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16, clipPath: "inset(0 0 28% 0 round 16px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="h-full border-[rgba(212,176,93,.24)]">
                <div className="mb-3 h-px w-full bg-[linear-gradient(90deg,rgba(212,176,93,.4),rgba(124,140,158,.22),rgba(255,255,255,0))]" />
                <h3 className="text-lg font-bold text-zinc-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{compact(item.result)}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {site.proofQuotes.slice(1, 3).map((quote, index) => (
            <motion.article
              key={`${quote.author}-${quote.role}`}
              initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 32% 0 round 16px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.05 }}
              className="rounded-2xl border border-white/10 bg-[rgba(8,10,14,.65)] p-4"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{quoteLabel}</p>
              <p className="mt-2 text-sm leading-relaxed text-zinc-200">"{quote.quote}"</p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-zinc-400">{quote.author} • {quote.role}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
