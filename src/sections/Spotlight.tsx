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

  const title = isEnglish ? "Spotlight" : "Vitrin";
  const eyebrow = isEnglish ? "signature feed" : "signature akış";
  const pulseLabel = isEnglish ? "live cut" : "canlı kesit";
  const quoteLabel = isEnglish ? "direct feedback" : "direkt geri bildirim";

  return (
    <section id="spotlight" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={title} eyebrow={eyebrow} />

        <div className="rounded-2xl border border-[rgba(212,176,93,.24)] bg-[rgba(8,10,14,.72)] p-3">
          <div className="hide-scrollbar flex gap-2 overflow-x-auto pb-1">
            {site.highlights.map((item) => (
              <span
                key={item}
                className="shrink-0 rounded-full border border-[rgba(212,176,93,.28)] bg-[rgba(212,176,93,.09)] px-3 py-1 text-[10px] uppercase tracking-[0.14em] text-zinc-200 sm:text-xs"
              >
                {item}
              </span>
            ))}
          </div>
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
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{pulseLabel}</p>
                <h3 className="mt-2 text-lg font-bold text-zinc-100">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-300">{compact(item.result)}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {site.proofQuotes.slice(0, 2).map((quote, index) => (
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
