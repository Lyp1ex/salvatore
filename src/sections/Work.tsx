import { AnimatePresence, motion } from "framer-motion";
import { useMemo, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type WorkProps = {
  site: SiteConfig;
};

export default function Work({ site }: WorkProps) {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null);

  const activeCase = useMemo(() => {
    if (activeCaseIndex === null) return null;
    return site.caseStudies[activeCaseIndex % site.caseStudies.length] ?? null;
  }, [activeCaseIndex, site.caseStudies]);

  return (
    <section id="work" className="scroll-mt-24 py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={site.workTitle} eyebrow={site.workEyebrow} />
        <p className="mb-6 max-w-3xl text-zinc-300">{site.workIntro}</p>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 26% 0 round 18px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.04 }}
            >
              <Card className="glass-distort group h-full transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:shadow-[0_20px_50px_rgba(63,222,201,.14)]">
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
                <Button
                  variant="ghost"
                  className="mt-5"
                  onClick={() => setActiveCaseIndex(index)}
                >
                  {site.buttons.openCase}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence>
        {activeCase ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[92] bg-black/64 px-4 py-10 backdrop-blur-sm"
            onClick={() => setActiveCaseIndex(null)}
          >
            <motion.div
              initial={{ opacity: 0, y: 18, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.98 }}
              transition={{ duration: 0.24, ease: "easeOut" }}
              className="mx-auto max-w-2xl rounded-3xl border border-[rgba(212,176,93,.34)] bg-[rgba(10,11,14,.92)] p-6 shadow-[0_30px_90px_rgba(0,0,0,.64)]"
              onClick={(event) => event.stopPropagation()}
            >
              <h3 className="text-2xl font-bold text-zinc-100">{activeCase.title}</h3>
              <div className="mt-4 space-y-4 text-zinc-300">
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
                    {site.caseLabels.situation}
                  </p>
                  <p className="mt-1 leading-relaxed">{activeCase.situation}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
                    {site.caseLabels.solution}
                  </p>
                  <p className="mt-1 leading-relaxed">{activeCase.solution}</p>
                </div>
                <div>
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
                    {site.caseLabels.result}
                  </p>
                  <p className="mt-1 leading-relaxed">{activeCase.result}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {activeCase.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full border border-[rgba(212,176,93,.35)] bg-[rgba(212,176,93,.08)] px-2.5 py-1 text-[11px] uppercase tracking-wide text-zinc-200"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <Button variant="primary" className="mt-6" onClick={() => setActiveCaseIndex(null)}>
                {site.caseLabels.close}
              </Button>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
