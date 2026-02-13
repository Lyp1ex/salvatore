import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { HiArrowsRightLeft } from "react-icons/hi2";
import type { ServiceComparison } from "../config/site";

type ServiceCompareProps = {
  data: ServiceComparison;
};

export default function ServiceCompare({ data }: ServiceCompareProps) {
  const [ratio, setRatio] = useState(58);

  const sliderMask = useMemo(
    () => ({
      clipPath: `polygon(${ratio}% 0%, 100% 0%, 100% 100%, ${ratio}% 100%)`,
    }),
    [ratio],
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 18, clipPath: "inset(0 0 28% 0 round 24px)" }}
      whileInView={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0 round 24px)" }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="relative mt-8 overflow-hidden rounded-3xl border border-[rgba(212,176,93,.28)] bg-[linear-gradient(130deg,rgba(255,255,255,.06),rgba(10,11,14,.84))] p-4 shadow-[0_30px_80px_rgba(0,0,0,.5)] sm:p-6"
    >
      <div className="mb-5">
        <h3 className="text-2xl font-bold text-zinc-100">{data.title}</h3>
        <p className="mt-2 max-w-3xl text-sm text-zinc-300">{data.intro}</p>
      </div>

      <div className="relative min-h-[340px] overflow-hidden rounded-2xl border border-white/10 bg-black/35">
        <div className="absolute inset-0 p-4 sm:p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400">{data.standardLabel}</p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-300">
            {data.standardPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-zinc-500" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <motion.div
          style={sliderMask}
          className="absolute inset-0 border-l border-[rgba(212,176,93,.4)] bg-[linear-gradient(135deg,rgba(212,176,93,.16),rgba(120,213,199,.1),rgba(7,8,12,.9))] p-4 sm:p-5"
        >
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">
            {data.premiumLabel}
          </p>
          <ul className="mt-3 space-y-2 text-sm text-zinc-100">
            {data.premiumPoints.map((point) => (
              <li key={point} className="flex items-start gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[var(--lux-gold-soft)]" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </motion.div>

        <div className="pointer-events-none absolute inset-y-0 z-20" style={{ left: `${ratio}%` }}>
          <div className="absolute inset-y-0 -ml-px w-0.5 bg-[rgba(241,228,197,.9)] shadow-[0_0_20px_rgba(241,228,197,.55)]" />
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[rgba(241,228,197,.7)] bg-[rgba(10,11,14,.95)] p-2 text-[var(--lux-gold-soft)] shadow-[0_0_24px_rgba(212,176,93,.45)]">
            <HiArrowsRightLeft className="text-base" />
          </div>
        </div>

        <input
          aria-label="Service comparison slider"
          type="range"
          min={20}
          max={80}
          value={ratio}
          onChange={(event) => setRatio(Number(event.target.value))}
          className="absolute inset-0 z-30 h-full w-full cursor-ew-resize opacity-0"
        />
      </div>
    </motion.div>
  );
}
