import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Locale, SiteConfig } from "../config/site";

type CommandPaletteProps = {
  open: boolean;
  site: SiteConfig;
  locale: Locale;
  onClose: () => void;
  onNavigate: (sectionId: string) => void;
  onToggleLocale: () => void;
};

type CommandItem = {
  id: string;
  label: string;
  meta: string;
  action: () => void;
};

export default function CommandPalette({
  open,
  site,
  locale,
  onClose,
  onNavigate,
  onToggleLocale,
}: CommandPaletteProps) {
  const [query, setQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const commands = useMemo<CommandItem[]>(
    () => [
      { id: "home", label: site.nav.home, meta: "#home", action: () => onNavigate("home") },
      { id: "about", label: site.nav.about, meta: "#about", action: () => onNavigate("about") },
      { id: "work", label: site.nav.work, meta: "#work", action: () => onNavigate("work") },
      { id: "process", label: site.nav.process, meta: "#process", action: () => onNavigate("process") },
      { id: "proof", label: site.nav.proof, meta: "#proof", action: () => onNavigate("proof") },
      { id: "contact", label: site.nav.contact, meta: "#contact", action: () => onNavigate("contact") },
      {
        id: "telegram",
        label: site.socials.telegram.label,
        meta: site.socials.telegram.handle,
        action: () => window.open(site.socials.telegram.url, "_blank", "noopener,noreferrer"),
      },
      {
        id: "instagram",
        label: site.socials.instagram.label,
        meta: site.socials.instagram.handle,
        action: () => window.open(site.socials.instagram.url, "_blank", "noopener,noreferrer"),
      },
      {
        id: "locale",
        label: locale === "tr" ? "Switch to English" : "Türkçe'ye Geç",
        meta: site.localeLabel,
        action: onToggleLocale,
      },
    ],
    [locale, onNavigate, onToggleLocale, site],
  );

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    if (!normalized) return commands;
    return commands.filter((item) =>
      `${item.label} ${item.meta} ${item.id}`.toLowerCase().includes(normalized),
    );
  }, [commands, query]);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 20);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      setQuery("");
    };
  }, [onClose, open]);

  const handleRun = (command: CommandItem) => {
    command.action();
    onClose();
  };

  return (
    <AnimatePresence>
      {open ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[95] bg-black/60 px-4 py-14 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
            className="mx-auto max-w-2xl rounded-2xl border border-[rgba(212,176,93,.34)] bg-[rgba(10,11,14,.92)] shadow-[0_24px_80px_rgba(0,0,0,.62)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="border-b border-[rgba(212,176,93,.2)] px-4 py-4">
              <p className="font-mono text-xs uppercase tracking-[0.24em] text-[var(--lux-gold-soft)]">
                {site.commandTitle}
              </p>
              <input
                ref={inputRef}
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={site.commandPlaceholder}
                className="mt-3 w-full rounded-xl border border-[rgba(212,176,93,.22)] bg-black/30 px-3 py-2 text-zinc-100 outline-none ring-[0] placeholder:text-zinc-500 focus:border-[rgba(212,176,93,.52)]"
              />
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {filtered.length > 0 ? (
                filtered.map((command) => (
                  <button
                    key={command.id}
                    onClick={() => handleRun(command)}
                    className="flex w-full items-center justify-between rounded-xl px-3 py-2 text-left transition hover:bg-[rgba(212,176,93,.12)]"
                  >
                    <span className="text-zinc-100">{command.label}</span>
                    <span className="font-mono text-xs uppercase tracking-[0.12em] text-zinc-400">
                      {command.meta}
                    </span>
                  </button>
                ))
              ) : (
                <p className="px-3 py-6 text-sm text-zinc-400">{site.commandEmpty}</p>
              )}
            </div>

            <div className="border-t border-[rgba(212,176,93,.2)] px-4 py-3 font-mono text-xs uppercase tracking-[0.16em] text-zinc-500">
              {site.commandHint}
            </div>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
