import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { siteConfig } from "../config/site";

export default function Process() {
  return (
    <section id="process" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title="Nasıl ilerliyorum?" eyebrow="süreç" />

        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.processSteps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card className="h-full border-[rgba(212,176,93,.24)] bg-[linear-gradient(130deg,rgba(255,255,255,.05),rgba(19,22,27,.64))]">
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

