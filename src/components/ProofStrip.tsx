import { motion } from "framer-motion";
import type { ProofQuote } from "../config/site";

type ProofStripProps = {
  quotes: ProofQuote[];
};

export default function ProofStrip({ quotes }: ProofStripProps) {
  const roll = [...quotes, ...quotes];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, clipPath: "inset(0 0 30% 0 round 22px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 22px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.55, ease: "easeOut" }}
      className="relative overflow-hidden rounded-2xl border border-[rgba(212,176,93,.2)] bg-[rgba(8,10,14,.72)] py-4"
    >
      <div className="proof-fade-edge-left absolute bottom-0 left-0 top-0 z-10 w-16" />
      <div className="proof-fade-edge-right absolute bottom-0 right-0 top-0 z-10 w-16" />

      <div className="proof-track flex min-w-max gap-3 px-3">
        {roll.map((quote, index) => (
          <article
            key={`${quote.author}-${index}`}
            className="w-[280px] shrink-0 rounded-2xl border border-white/10 bg-white/[0.03] p-4 backdrop-blur-xl"
          >
            <p className="text-sm leading-relaxed text-zinc-100">“{quote.quote}”</p>
            <p className="mt-3 text-xs font-semibold uppercase tracking-[0.15em] text-[var(--lux-gold-soft)]">
              {quote.author}
            </p>
            <p className="mt-1 text-xs text-zinc-400">{quote.role}</p>
          </article>
        ))}
      </div>
    </motion.div>
  );
}
