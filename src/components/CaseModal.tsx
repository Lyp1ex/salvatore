import { motion } from "framer-motion";
import { useEffect } from "react";
import { HiChevronLeft, HiChevronRight, HiOutlineXMark } from "react-icons/hi2";
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
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") onNext();
      if (event.key === "ArrowLeft") onPrevious();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[96] overflow-y-auto bg-[rgba(2,3,5,.82)] px-4 py-5 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, y: 18, scale: 0.985 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 12, scale: 0.985 }}
        transition={{ duration: 0.24, ease: "easeOut" }}
        className="relative mx-auto flex min-h-[calc(100vh-2.5rem)] w-full max-w-6xl flex-col overflow-hidden rounded-[2rem] border border-[rgba(212,176,93,.34)] bg-[linear-gradient(130deg,rgba(14,16,22,.94),rgba(5,6,8,.96))] shadow-[0_35px_120px_rgba(0,0,0,.72)]"
        onClick={(event) => event.stopPropagation()}
      >
        <header className="border-b border-[rgba(212,176,93,.2)] px-5 py-4 sm:px-7">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">
                {labels.progress} {index + 1}/{total}
              </p>
              <p className="mt-1 text-xs text-zinc-500">{labels.keyboardHint}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={onPrevious}
                data-cursor="active"
                aria-label={labels.previous}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(212,176,93,.34)] text-zinc-200 transition hover:bg-[rgba(212,176,93,.15)]"
              >
                <HiChevronLeft />
              </button>
              <button
                onClick={onNext}
                data-cursor="active"
                aria-label={labels.next}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(212,176,93,.34)] text-zinc-200 transition hover:bg-[rgba(212,176,93,.15)]"
              >
                <HiChevronRight />
              </button>
              <button
                onClick={onClose}
                data-cursor="active"
                aria-label={labels.close}
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[rgba(212,176,93,.34)] text-zinc-200 transition hover:bg-[rgba(212,176,93,.15)]"
              >
                <HiOutlineXMark />
              </button>
            </div>
          </div>

          <div className="mt-3 h-1.5 rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-[linear-gradient(90deg,var(--lux-gold),var(--lux-mint))] transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </header>

        <div className="grid flex-1 gap-5 p-5 sm:p-7 lg:grid-cols-[1.06fr_.94fr]">
          <section className="relative overflow-hidden rounded-3xl border border-[rgba(212,176,93,.22)] bg-[linear-gradient(140deg,rgba(255,255,255,.06),rgba(9,11,14,.78))] p-5">
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--lux-gold-soft)]">{labels.eyebrow}</p>
            <h3 className="mt-3 text-3xl font-extrabold text-zinc-100 sm:text-4xl">{item.title}</h3>
            <p className="mt-4 max-w-xl leading-relaxed text-zinc-300">{labels.sceneNote}</p>

            <div className="mt-6 flex flex-wrap gap-2">
              {item.tags.map((tag) => (
                <span
                  key={tag}
                  className="rounded-full border border-[rgba(212,176,93,.34)] bg-[rgba(212,176,93,.08)] px-2.5 py-1 text-[11px] uppercase tracking-wide text-zinc-200"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="pointer-events-none absolute -right-10 -top-10 h-48 w-48 rounded-full bg-[radial-gradient(circle,rgba(212,176,93,.2)_0%,rgba(212,176,93,0)_70%)]" />
          </section>

          <section className="grid gap-3">
            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{labels.situation}</p>
              <p className="mt-2 leading-relaxed text-zinc-300">{item.situation}</p>
            </article>

            <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{labels.solution}</p>
              <p className="mt-2 leading-relaxed text-zinc-300">{item.solution}</p>
            </article>

            <article className="rounded-2xl border border-[rgba(212,176,93,.3)] bg-[rgba(212,176,93,.09)] p-4">
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{labels.result}</p>
              <p className="mt-2 leading-relaxed text-zinc-100">{item.result}</p>
            </article>

            <button
              onClick={onClose}
              data-cursor="active"
              className="mt-1 rounded-full border border-[rgba(196,164,92,.62)] bg-[linear-gradient(112deg,var(--lux-gold),#d7bc73,var(--lux-gold-soft))] px-5 py-2.5 text-sm font-semibold tracking-wide text-[#14110a] shadow-[0_0_28px_rgba(196,164,92,.3)] transition hover:-translate-y-0.5 hover:shadow-[0_0_40px_rgba(196,164,92,.42)]"
            >
              {labels.close}
            </button>
          </section>
        </div>
      </motion.div>
    </motion.div>
  );
}
