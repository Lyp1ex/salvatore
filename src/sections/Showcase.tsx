import { motion } from "framer-motion";
import Button from "../components/Button";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import { siteConfig } from "../config/site";

export default function Showcase() {
  return (
    <section id="highlights" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title="Örnek işler / highlights" eyebrow="vitrin" />

        <div className="grid gap-4 sm:grid-cols-2">
          {siteConfig.showcases.map((item) => (
            <Card key={item.title} className="flex h-full flex-col">
              <h3 className="text-xl font-bold text-zinc-100">{item.title}</h3>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-300">{item.description}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {item.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-cyan-300/25 bg-cyan-300/5 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-cyan-100"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              {item.link ? (
                <Button
                  href={item.link}
                  target="_blank"
                  rel="noreferrer"
                  variant="ghost"
                  className="mt-5 w-fit"
                >
                  Detaya Git
                </Button>
              ) : null}
            </Card>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
