import { motion } from "framer-motion";
import { HiCheckCircle } from "react-icons/hi2";
import Card from "../components/Card";
import SectionTitle from "../components/SectionTitle";
import type { SiteConfig } from "../config/site";

type PackagesProps = {
  site: SiteConfig;
};

export default function Packages({ site }: PackagesProps) {
  const scopeLabel = site.localeLabel.startsWith("EN") ? "Scope" : "Başlık";

  return (
    <section id="packages" className="scroll-mt-24 py-14 sm:py-20">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <SectionTitle title={site.packageTitle} eyebrow={site.packageEyebrow} />
        <p className="mb-6 max-w-3xl text-zinc-300">{site.packageIntro}</p>

        <div className="grid gap-4 lg:grid-cols-3">
          {site.packageTiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 16, clipPath: "inset(0 0 30% 0 round 18px)" }}
              whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 18px)" }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
            >
              <Card
                className={`h-full ${
                  tier.featured
                    ? "border-[rgba(212,176,93,.44)] bg-[linear-gradient(130deg,rgba(212,176,93,.13),rgba(120,213,199,.08),rgba(10,11,14,.76))]"
                    : ""
                }`}
              >
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-2xl font-extrabold text-zinc-100">{tier.name}</h3>
                  {tier.featured ? (
                    <span className="rounded-full border border-[rgba(212,176,93,.38)] bg-[rgba(212,176,93,.1)] px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.15em] text-[var(--lux-gold-soft)]">
                      Premium
                    </span>
                  ) : null}
                </div>
                <p className="mt-2 text-sm text-zinc-300">{tier.subtitle}</p>

                <ul className="mt-4 space-y-2 text-sm text-zinc-200">
                  {tier.points.map((point) => (
                    <li key={point} className="flex items-start gap-2">
                      <HiCheckCircle className="mt-[2px] text-base text-[var(--lux-gold-soft)]" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 28% 0 round 24px)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 24px)" }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.5, ease: "easeOut", delay: 0.05 }}
          className="mt-7 overflow-hidden rounded-3xl border border-[rgba(212,176,93,.28)] bg-[linear-gradient(130deg,rgba(255,255,255,.06),rgba(10,11,14,.84))] p-4 shadow-[0_30px_80px_rgba(0,0,0,.5)] sm:p-6"
        >
          <div className="mb-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
              {site.beforeAfter.eyebrow}
            </p>
            <h3 className="mt-2 text-2xl font-bold text-zinc-100">{site.beforeAfter.title}</h3>
          </div>

          <div className="rounded-2xl border border-white/10 bg-black/20 p-3">
            <div className="grid gap-2 rounded-xl border border-white/10 bg-white/[0.02] p-3 text-xs uppercase tracking-[0.15em] text-zinc-400 md:grid-cols-[0.74fr_1fr_1fr]">
              <span>{scopeLabel}</span>
              <span>{site.beforeAfter.beforeLabel}</span>
              <span>{site.beforeAfter.afterLabel}</span>
            </div>

            <div className="mt-2 space-y-2">
              {site.beforeAfter.rows.map((row, index) => (
                <motion.article
                  key={`${row.label}-${index}`}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.3, delay: index * 0.03 }}
                  className="grid gap-2 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-[0.74fr_1fr_1fr]"
                >
                  <p className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm font-semibold text-zinc-100">
                    {row.label}
                  </p>
                  <p className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-300">
                    {row.before}
                  </p>
                  <p className="rounded-lg border border-[rgba(212,176,93,.34)] bg-[rgba(212,176,93,.08)] px-3 py-2 text-sm text-zinc-100">
                    {row.after}
                  </p>
                </motion.article>
              ))}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
