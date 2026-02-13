import { motion } from "framer-motion";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import type { CaseStudy, SiteConfig } from "../config/site";

type CaseModalProps = {
  item: CaseStudy;
  index: number;
  total: number;
  labels: SiteConfig["caseLabels"];
  onClose: () => void;
  onPrevious: () => void;
  onNext: () => void;
};

export default function CaseModal({ item, index, total, labels, onClose, onPrevious, onNext }: CaseModalProps) {
  const progress = ((index + 1) / total) * 100;

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [onClose, onNext, onPrevious]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[92] bg-black/64 px-4 py-10 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 10, scale: 0.98 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="mx-auto max-w-2xl rounded-3xl border border-[rgba(212,176,93,.34)] bg-[rgba(10,11,14,.92)] p-6 shadow-[0_30px_90px_rgba(0,0,0,.64)]"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 space-y-2">
          <div className="flex items-center justify-between gap-4">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
              {labels.progress} {index + 1}/{total}
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={onPrevious}
                data-cursor="active"
                aria-label={labels.previous}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(212,176,93,.34)] text-zinc-200 transition hover:bg-[rgba(212,176,93,.15)]"
              >
                <HiChevronLeft />
              </button>
              <button
                onClick={onNext}
                data-cursor="active"
                aria-label={labels.next}
                className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-[rgba(212,176,93,.34)] text-zinc-200 transition hover:bg-[rgba(212,176,93,.15)]"
              >
                <HiChevronRight />
              </button>
            </div>
          </div>

          <div className="h-1.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--lux-gold),var(--lux-mint))] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        <h3 className="text-2xl font-bold text-zinc-100">{item.title}</h3>
        <div className="mt-4 space-y-4 text-zinc-300">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
              {labels.situation}
            </p>
            <p className="mt-1 leading-relaxed">{item.situation}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
              {labels.solution}
            </p>
            <p className="mt-1 leading-relaxed">{item.solution}</p>
          </div>
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">
              {labels.result}
            </p>
            <p className="mt-1 leading-relaxed">{item.result}</p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-[rgba(212,176,93,.35)] bg-[rgba(212,176,93,.08)] px-2.5 py-1 text-[11px] uppercase tracking-wide text-zinc-200"
            >
              {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onClose}
          data-cursor="active"
          className="mt-6 rounded-full border border-[rgba(196,164,92,.62)] bg-[linear-gradient(112deg,var(--lux-gold),#d7bc73,var(--lux-gold-soft))] px-5 py-2.5 text-sm font-semibold tracking-wide text-[#14110a] shadow-[0_0_28px_rgba(196,164,92,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(196,164,92,.42)]"
        >
          {labels.close}
        </button>
      </motion.div>
    </motion.div>
  );
}

