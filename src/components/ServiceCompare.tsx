import { motion } from "framer-motion";
import { useMemo } from "react";
import { HiArrowTrendingUp, HiCheckCircle } from "react-icons/hi2";
import type { ServiceComparison } from "../config/site";

type ServiceCompareProps = {
  data: ServiceComparison;
};

export default function ServiceCompare({ data }: ServiceCompareProps) {
  const isTurkish = data.standardLabel.toLowerCase().includes("standart");

  const rows = useMemo(() => {
    const max = Math.max(data.standardPoints.length, data.premiumPoints.length);
    return Array.from({ length: max }, (_, index) => ({
      standard: data.standardPoints[index] ?? "",
      premium: data.premiumPoints[index] ?? "",
    }));
  }, [data.premiumPoints, data.standardPoints]);

  const matrixTitle = isTurkish ? "Fark Matrisi" : "Difference Matrix";
  const standardHint = isTurkish ? "Temel Akış" : "Base Flow";
  const premiumHint = isTurkish ? "Signature Akış" : "Signature Flow";

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 28% 0 round 24px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 24px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mt-8 overflow-hidden rounded-3xl border border-[rgba(212,176,93,.28)] bg-[linear-gradient(130deg,rgba(255,255,255,.06),rgba(10,11,14,.84))] p-4 shadow-[0_30px_80px_rgba(0,0,0,.5)] sm:p-6"
    >
      <h3 className="mb-5 text-2xl font-bold text-zinc-100">{data.title}</h3>

      <div className="grid gap-4 lg:grid-cols-2">
        <motion.article
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.35 }}
          className="rounded-2xl border border-white/10 bg-[rgba(5,6,9,.44)] p-4"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">{data.standardLabel}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-500">{standardHint}</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {data.standardPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-[3px] h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.article>

        <motion.article
          initial={{ opacity: 0, x: 10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="rounded-2xl border border-[rgba(212,176,93,.32)] bg-[linear-gradient(130deg,rgba(212,176,93,.14),rgba(120,213,199,.08),rgba(7,8,12,.78))] p-4"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">{data.premiumLabel}</p>
          <p className="mt-2 text-xs uppercase tracking-[0.14em] text-zinc-300">{premiumHint}</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-100">
            {data.premiumPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <HiCheckCircle className="mt-[1px] text-base text-[var(--lux-gold-soft)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.article>
      </div>

      <div className="mt-5 rounded-2xl border border-[rgba(212,176,93,.22)] bg-[rgba(8,10,14,.7)] p-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{matrixTitle}</p>
          <span className="inline-flex items-center gap-1 rounded-full border border-[rgba(212,176,93,.3)] bg-[rgba(212,176,93,.08)] px-3 py-1 text-[11px] uppercase tracking-[0.14em] text-zinc-200">
            <HiArrowTrendingUp />
            {data.premiumLabel}
          </span>
        </div>

        <div className="mt-4 space-y-2">
          {rows.map((row, index) => (
            <motion.article
              key={`${row.standard}-${row.premium}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.28, delay: index * 0.03 }}
              className="grid gap-2 rounded-xl border border-white/10 bg-black/20 p-3 md:grid-cols-2"
            >
              <div className="rounded-lg border border-white/10 bg-white/[0.02] px-3 py-2 text-sm text-zinc-300">
                {row.standard || "-"}
              </div>
              <div className="rounded-lg border border-[rgba(212,176,93,.34)] bg-[rgba(212,176,93,.08)] px-3 py-2 text-sm text-zinc-100">
                {row.premium || "-"}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
