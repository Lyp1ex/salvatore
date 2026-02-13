import { motion } from "framer-motion";
import type { TrustMetric } from "../config/site";

type TrustMetricsBarProps = {
  metrics: TrustMetric[];
};

export default function TrustMetricsBar({ metrics }: TrustMetricsBarProps) {
  return (
    <div className="mt-6 grid gap-3 lg:grid-cols-3">
      {metrics.map((metric, index) => (
        <motion.article
          key={metric.label}
          initial={{ opacity: 0, y: 14, clipPath: "inset(0 0 34% 0 round 16px)" }}
          whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 16px)" }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.42, delay: index * 0.06 }}
          className="rounded-2xl border border-[rgba(212,176,93,.22)] bg-[rgba(7,9,12,.68)] p-3"
        >
          <div className="flex items-center justify-between gap-3">
            <p className="text-sm font-semibold text-zinc-100">{metric.label}</p>
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-[var(--lux-gold-soft)]">{metric.value}%</p>
          </div>
          <div className="trust-bar-shell mt-2 h-1.5 rounded-full bg-white/10">
            <div
              style={{ width: `${metric.value}%` }}
              className="trust-bar-fill h-full rounded-full bg-[linear-gradient(90deg,var(--lux-gold),var(--lux-mint))]"
            />
          </div>
          <p className="mt-2 text-xs text-zinc-400">{metric.summary}</p>
        </motion.article>
      ))}
    </div>
  );
}
