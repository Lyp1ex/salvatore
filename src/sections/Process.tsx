import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type ProcessProps = {
  site: SiteConfig;
};

export default function Process({ site }: ProcessProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 80%", "end 20%"],
  });

  const headingY = useTransform(scrollYProgress, [0, 1], [0, -16]);
  const lineScale = useTransform(scrollYProgress, [0, 1], [0.04, 1]);

  return (
    <section ref={sectionRef} id="process" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <motion.div style={{ y: headingY }}>
          <SectionTitle title={site.storyTitle} eyebrow={site.storyEyebrow} />
        </motion.div>

        <div className="grid gap-5 lg:grid-cols-[1.25fr_.95fr]">
          <div className="relative overflow-hidden rounded-3xl border border-[rgba(212,176,93,.26)] bg-[linear-gradient(135deg,rgba(255,255,255,.06),rgba(10,11,14,.82))] p-5 shadow-[0_20px_70px_rgba(0,0,0,.48)] sm:p-6">
            <div className="absolute bottom-6 left-4 top-6 w-[2px] bg-white/10 sm:left-7" />
            <motion.div
              style={{ scaleY: lineScale }}
              className="absolute bottom-6 left-4 top-6 w-[2px] origin-top bg-[linear-gradient(180deg,var(--lux-gold),var(--lux-mint))] sm:left-7"
            />

            <div className="space-y-4">
              {site.storyMoments.map((moment, index) => (
                <motion.article
                  key={`${moment.year}-${moment.title}`}
                  initial={{ opacity: 0, y: 16, clipPath: "inset(0 0 26% 0 round 16px)" }}
                  whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)" }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="relative ml-0 rounded-2xl border border-white/10 bg-black/25 p-4 sm:ml-4"
                >
                  <span className="absolute -left-[14px] top-5 h-3 w-3 rounded-full border border-[var(--lux-gold-soft)] bg-[var(--lux-gold)] shadow-[0_0_16px_rgba(212,176,93,.5)] sm:-left-[26px]" />
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">{moment.year}</p>
                  <h3 className="mt-2 text-lg font-bold text-zinc-100">{moment.title}</h3>
                  <p className="mt-2 leading-relaxed text-zinc-300">{moment.detail}</p>
                </motion.article>
              ))}
            </div>
          </div>

          <Card className="h-full border-[rgba(212,176,93,.28)]">
            <SectionTitle title={site.processTitle} eyebrow={site.processEyebrow} />
            <div className="space-y-4">
              {site.processSteps.map((step, index) => (
                <motion.div
                  key={step.title}
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.38, delay: index * 0.05 }}
                  className="rounded-xl border border-white/10 bg-white/[0.02] p-3"
                >
                  <p className="font-mono text-[11px] uppercase tracking-[0.15em] text-[var(--lux-gold-soft)]">
                    {String(index + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-1 text-base font-semibold text-zinc-100">{step.title}</h3>
                  <p className="mt-1 text-sm text-zinc-300">{step.detail}</p>
                </motion.div>
              ))}
            </div>
          </Card>
        </div>
      </motion.div>
    </section>
  );
}
