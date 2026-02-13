import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type ProcessProps = {
  site: SiteConfig;
};

export default function Process({ site }: ProcessProps) {
  return (
    <section id="process" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={site.processTitle} eyebrow={site.processEyebrow} />

        <div className="grid gap-4 md:grid-cols-2">
          {site.processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 30% 0 round 18px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card className="glass-distort h-full border-[rgba(212,176,93,.24)] bg-[linear-gradient(130deg,rgba(255,255,255,.05),rgba(19,22,27,.64))]">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-bold text-zinc-100">{step.title}</h3>
                <p className="mt-3 leading-relaxed text-zinc-300">{step.detail}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
