import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import Button from "./Button";
import type { SiteConfig } from "../config/site";

type QuoteWizardProps = {
  site: SiteConfig;
};

export default function QuoteWizard({ site }: QuoteWizardProps) {
  const isEnglish = site.localeLabel.startsWith("EN");
  const [step, setStep] = useState(0);
  const [service, setService] = useState("");
  const [budget, setBudget] = useState("");
  const [timeline, setTimeline] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    setStep(0);
    setService("");
    setBudget("");
    setTimeline("");
    setNote("");
  }, [site.localeLabel]);

  const steps = site.quoteWizard.stepLabels;
  const progress = ((step + 1) / steps.length) * 100;

  const canMoveNext = useMemo(() => {
    if (step === 0) return service.length > 0;
    if (step === 1) return budget.length > 0;
    if (step === 2) return timeline.length > 0;
    return true;
  }, [budget, service, step, timeline]);

  const message = useMemo(() => {
    const helloLabel = isEnglish ? "Hello" : "Merhaba";
    const serviceLabel = isEnglish ? "Service" : "Hizmet";
    const budgetLabel = isEnglish ? "Budget" : "Bütçe";
    const timelineLabel = isEnglish ? "Timeline" : "Süre";
    const noteLabel = isEnglish ? "Note" : "Not";
    const notSpecified = isEnglish ? "Not specified" : "Belirtilmedi";
    const noNote = isEnglish ? "None" : "Yok";
    const lines = [
      `${helloLabel} ${site.displayName},`,
      `${site.quoteWizard.readyLabel}:`,
      `- ${serviceLabel}: ${service || notSpecified}`,
      `- ${budgetLabel}: ${budget || notSpecified}`,
      `- ${timelineLabel}: ${timeline || notSpecified}`,
      `- ${noteLabel}: ${note.trim() || noNote}`,
    ];
    return lines.join("\n");
  }, [budget, isEnglish, note, service, site.displayName, site.quoteWizard.readyLabel, timeline]);

  const onSend = () => {
    const encoded = encodeURIComponent(message);
    const separator = site.socials.telegram.url.includes("?") ? "&" : "?";
    window.open(`${site.socials.telegram.url}${separator}text=${encoded}`, "_blank", "noopener,noreferrer");
  };

  const stepPrompt =
    step === 0
      ? site.quoteWizard.prompts.service
      : step === 1
        ? site.quoteWizard.prompts.budget
        : step === 2
          ? site.quoteWizard.prompts.timeline
          : site.quoteWizard.prompts.note;

  return (
    <div className="rounded-2xl border border-[rgba(212,176,93,.26)] bg-[rgba(7,9,12,.78)] p-4 sm:p-5">
      <p className="font-mono text-xs uppercase tracking-[0.18em] text-[var(--lux-gold-soft)]">{site.quoteWizard.title}</p>
      <p className="mt-2 text-sm text-zinc-300">{site.quoteWizard.intro}</p>

      <div className="mt-4">
        <div className="flex items-center justify-between text-[11px] uppercase tracking-[0.16em] text-zinc-500">
          <span>{steps[step]}</span>
          <span>{step + 1}/{steps.length}</span>
        </div>
        <div className="wizard-progress-shell mt-1 h-1.5 rounded-full bg-white/10">
          <motion.div
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="wizard-progress-fill h-full rounded-full bg-[linear-gradient(90deg,var(--lux-gold),var(--lux-mint))]"
          />
        </div>
      </div>

      <p className="mt-4 text-sm font-semibold text-zinc-100">{stepPrompt}</p>

      {step === 0 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {site.quoteWizard.options.services.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setService(item)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                service === item
                  ? "border-[rgba(212,176,93,.65)] bg-[rgba(212,176,93,.16)] text-zinc-100"
                  : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-[rgba(212,176,93,.32)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {step === 1 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {site.quoteWizard.options.budgets.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setBudget(item)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                budget === item
                  ? "border-[rgba(212,176,93,.65)] bg-[rgba(212,176,93,.16)] text-zinc-100"
                  : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-[rgba(212,176,93,.32)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {step === 2 ? (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          {site.quoteWizard.options.timelines.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setTimeline(item)}
              className={`rounded-xl border px-3 py-2 text-left text-sm transition ${
                timeline === item
                  ? "border-[rgba(212,176,93,.65)] bg-[rgba(212,176,93,.16)] text-zinc-100"
                  : "border-white/10 bg-white/[0.02] text-zinc-300 hover:border-[rgba(212,176,93,.32)]"
              }`}
            >
              {item}
            </button>
          ))}
        </div>
      ) : null}

      {step === 3 ? (
        <div className="mt-3 space-y-3">
          <textarea
            value={note}
            onChange={(event) => setNote(event.target.value)}
            rows={4}
            className="w-full rounded-xl border border-white/10 bg-black/25 px-3 py-2 text-sm text-zinc-200 outline-none placeholder:text-zinc-500 focus:border-[rgba(212,176,93,.52)]"
            placeholder={site.quoteWizard.notePlaceholder}
          />
          <pre className="max-h-28 overflow-auto rounded-xl border border-white/10 bg-black/25 p-3 text-xs text-zinc-300">
            {message}
          </pre>
        </div>
      ) : null}

      <div className="mt-4 flex items-center justify-between gap-2">
        <Button variant="ghost" onClick={() => setStep((current) => Math.max(0, current - 1))}>
          {site.quoteWizard.buttons.back}
        </Button>

        {step < steps.length - 1 ? (
          <Button
            variant="primary"
            disabled={!canMoveNext}
            onClick={() => setStep((current) => Math.min(steps.length - 1, current + 1))}
            className={canMoveNext ? "" : "opacity-50"}
          >
            {site.quoteWizard.buttons.next}
          </Button>
        ) : (
          <Button variant="primary" onClick={onSend}>
            {site.quoteWizard.buttons.send}
          </Button>
        )}
      </div>
    </div>
  );
}
