import { AnimatePresence, motion } from "framer-motion";
import { lazy, Suspense, useMemo, useState } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import ServiceCompare from "../components/ServiceCompare";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

const CaseModal = lazy(() => import("../components/CaseModal"));

type WorkProps = {
  site: SiteConfig;
};

export default function Work({ site }: WorkProps) {
  const [activeCaseIndex, setActiveCaseIndex] = useState<number | null>(null);
  const caseCount = site.caseStudies.length;

  const activeCase = useMemo(() => {
    if (activeCaseIndex === null || caseCount === 0) return null;
    const normalized = ((activeCaseIndex % caseCount) + caseCount) % caseCount;
    return site.caseStudies[normalized] ?? null;
  }, [activeCaseIndex, caseCount, site.caseStudies]);

  const onCloseCase = () => setActiveCaseIndex(null);
  const onNextCase = () => {
    if (caseCount < 1) return;
    setActiveCaseIndex((prev) => (prev === null ? 0 : (prev + 1) % caseCount));
  };
  const onPreviousCase = () => {
    if (caseCount < 1) return;
    setActiveCaseIndex((prev) => (prev === null ? 0 : (prev - 1 + caseCount) % caseCount));
  };

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
              <Card className="group h-full transition duration-300 hover:-translate-y-1 hover:border-cyan-200/30 hover:shadow-[0_20px_50px_rgba(63,222,201,.14)]">
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
                <Button variant="ghost" className="mt-5" onClick={() => setActiveCaseIndex(index)}>
                  {site.buttons.openCase}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <ServiceCompare data={site.comparison} />
      </motion.div>

      <AnimatePresence>
        {activeCase && activeCaseIndex !== null ? (
          <Suspense
            fallback={<div className="fixed inset-0 z-[92] bg-black/50 backdrop-blur-sm" aria-hidden />}
          >
            <CaseModal
              item={activeCase}
              index={((activeCaseIndex % caseCount) + caseCount) % caseCount}
              total={caseCount}
              labels={site.caseLabels}
              onClose={onCloseCase}
              onNext={onNextCase}
              onPrevious={onPreviousCase}
            />
          </Suspense>
        ) : null}
      </AnimatePresence>
    </section>
  );
}
