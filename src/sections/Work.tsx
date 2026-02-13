import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { siteConfig } from "../config/site";

export default function Work() {
  return (
    <section id="work" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title="Ne yapıyorum?" eyebrow="servisler" />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {siteConfig.services.map((service) => (
            <Card key={service.title} className="group transition hover:-translate-y-1 hover:border-cyan-200/30">
              <h3 className="text-lg font-bold text-zinc-100">{service.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-300">{service.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-zinc-700/70 bg-zinc-900/60 px-2.5 py-1 text-[11px] font-medium uppercase tracking-wide text-zinc-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
