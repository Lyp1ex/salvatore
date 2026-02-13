import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { siteConfig } from "../config/site";

export default function Proof() {
  return (
    <section id="proof" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title="Neden güven veriyor?" eyebrow="proof wall" />
        <p className="mb-6 max-w-3xl text-zinc-300">
          Müşteri içeride kaldığında sebep tasarım değil sadece; akışın netliği, teslimin hızı ve sürecin güven vermesi.
        </p>

        <div className="grid gap-4 md:grid-cols-2">
          {siteConfig.proofPillars.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.35, delay: index * 0.06 }}
            >
              <Card className="h-full">
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

