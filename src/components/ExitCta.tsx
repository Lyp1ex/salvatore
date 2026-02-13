import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { HiOutlineXMark } from "react-icons/hi2";
import Button from "./Button";
import type { SiteConfig } from "../config/site";

type ExitCtaProps = {
  site: SiteConfig;
};

export default function ExitCta({ site }: ExitCtaProps) {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isEnglish = useMemo(() => site.localeLabel.startsWith("EN"), [site.localeLabel]);

  useEffect(() => {
    setDismissed(false);
    setVisible(false);
  }, [site.localeLabel]);

  useEffect(() => {
    if (dismissed) return;

    const onScroll = () => {
      const full = document.documentElement.scrollHeight - window.innerHeight;
      if (full <= 0) return;
      const progress = window.scrollY / full;

      const contact = document.getElementById("contact");
      const nearContact = contact ? contact.getBoundingClientRect().top < window.innerHeight * 0.88 : false;

      setVisible(progress > 0.56 && !nearContact);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [dismissed]);

  const onOpenWizard = () => {
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {visible && !dismissed ? (
        <motion.aside
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.22, ease: "easeOut" }}
          className="fixed bottom-20 left-3 right-3 z-[72] mx-auto w-auto max-w-md rounded-2xl border border-[rgba(212,176,93,.34)] bg-[rgba(7,9,12,.9)] p-4 shadow-[0_28px_70px_rgba(0,0,0,.62)] backdrop-blur-xl md:bottom-6 md:left-6 md:right-auto"
        >
          <button
            type="button"
            onClick={() => setDismissed(true)}
            aria-label={isEnglish ? "Close" : "Kapat"}
            className="absolute right-2 top-2 inline-flex h-7 w-7 items-center justify-center rounded-full border border-white/10 text-zinc-400 transition hover:text-zinc-100"
          >
            <HiOutlineXMark />
          </button>

          <p className="pr-7 text-base font-bold text-zinc-100">{site.exitCtaTitle}</p>
          <p className="mt-1 text-sm text-zinc-300">{site.exitCtaLine}</p>

          <div className="mt-3 flex flex-wrap gap-2">
            <Button href={site.socials.telegram.url} target="_blank" rel="noreferrer" variant="primary" className="text-xs">
              {site.exitCtaPrimary}
            </Button>
            <Button onClick={onOpenWizard} variant="ghost" className="text-xs">
              {site.exitCtaSecondary}
            </Button>
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
