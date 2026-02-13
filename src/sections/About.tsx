import { motion } from "framer-motion";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type AboutProps = {
  site: SiteConfig;
};

export default function About({ site }: AboutProps) {
  return (
    <section id="about" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={site.aboutTitle} eyebrow={site.aboutEyebrow} />

        <div className="grid gap-5 lg:grid-cols-[1.3fr_.9fr]">
          <motion.div
            initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 30% 0 round 18px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45 }}
          >
            <Card>
              <div className="space-y-4 text-zinc-200">
                {site.aboutParagraphs.map((paragraph) => (
                  <p key={paragraph} className="leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 30% 0 round 18px)" }}
            whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)" }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.45, delay: 0.08 }}
          >
            <Card>
              <h3 className="text-xl font-bold text-zinc-100">{site.factsTitle}</h3>
              <ul className="mt-4 space-y-2 text-sm text-zinc-300">
                {site.quickFacts.map((fact) => (
                  <li key={fact} className="flex items-start gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-cyan-300" />
                    <span>{fact}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
