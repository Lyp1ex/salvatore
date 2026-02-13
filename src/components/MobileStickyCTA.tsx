import { useEffect, useState } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import type { SiteConfig } from "../config/site";

type MobileStickyCTAProps = {
  site: SiteConfig;
};

export default function MobileStickyCTA({ site }: MobileStickyCTAProps) {
  const [isNearContact, setIsNearContact] = useState(false);

  useEffect(() => {
    const contact = document.getElementById("contact");
    if (!contact) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsNearContact(entry.isIntersecting);
      },
      { threshold: 0.2 },
    );

    observer.observe(contact);
    return () => observer.disconnect();
  }, [site.localeLabel]);

  return (
    <div
      className={`fixed inset-x-0 bottom-3 z-[65] px-3 transition-all duration-300 md:hidden ${
        isNearContact ? "pointer-events-none translate-y-24 opacity-0" : "translate-y-0 opacity-100"
      }`}
    >
      <a
        href={site.socials.telegram.url}
        target="_blank"
        rel="noreferrer"
        data-cursor="active"
        aria-label={site.mobileCtaLabel}
        className="mobile-cta-glow flex items-center justify-between rounded-2xl border border-[rgba(196,164,92,.55)] bg-[rgba(8,10,14,.92)] px-4 py-3 backdrop-blur-xl"
      >
        <span className="inline-flex min-w-0 items-center gap-2 text-sm font-semibold text-zinc-100">
          <FaTelegramPlane className="text-[var(--lux-gold-soft)]" />
          <span className="truncate">{site.mobileCtaLabel}</span>
        </span>
        <span className="hidden font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--lux-gold-soft)] min-[390px]:inline">
          {site.mobileCtaHint}
        </span>
      </a>
    </div>
  );
}
