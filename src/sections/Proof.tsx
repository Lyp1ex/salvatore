import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type ProofProps = {
  site: SiteConfig;
};

export default function Proof({ site }: ProofProps) {
  return (
    <section id="proof" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={site.proofTitle} eyebrow={site.proofEyebrow} />
        <div className="mb-5 grid gap-3 md:grid-cols-2">
          {site.proofQuotes.slice(0, 2).map((quote, index) => (
            <motion.article
              key={`${quote.author}-${quote.role}`}
              initial={{ opacity: 0, y: 12, clipPath: "inset(0 0 30% 0 round 16px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.32, delay: index * 0.05 }}
              className="rounded-2xl border border-[rgba(212,176,93,.2)] bg-[rgba(8,10,14,.68)] p-4"
            >
              <p className="text-sm leading-relaxed text-zinc-200">"{quote.quote}"</p>
              <p className="mt-3 text-xs uppercase tracking-[0.14em] text-zinc-400">
                {quote.author} • {quote.role}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-5 grid gap-4 md:grid-cols-2">
          {site.proofPillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16, clipPath: "inset(0 0 30% 0 round 18px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
            >
              <Card className="h-full border-[rgba(212,176,93,.24)]">
                <h3 className="text-xl font-bold text-zinc-100">{item.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-300">{item.detail}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
