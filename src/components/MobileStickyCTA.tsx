import { FaTelegramPlane } from "react-icons/fa";
import type { SiteConfig } from "../config/site";

type MobileStickyCTAProps = {
  site: SiteConfig;
};

export default function MobileStickyCTA({ site }: MobileStickyCTAProps) {
  return (
    <div className="fixed inset-x-0 bottom-3 z-[65] px-3 md:hidden">
      <a
        href={site.socials.telegram.url}
        target="_blank"
        rel="noreferrer"
        data-cursor="active"
        className="mobile-cta-glow flex items-center justify-between rounded-2xl border border-[rgba(196,164,92,.55)] bg-[rgba(8,10,14,.92)] px-4 py-3 backdrop-blur-xl"
      >
        <span className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100">
          <FaTelegramPlane className="text-[var(--lux-gold-soft)]" />
          {site.mobileCtaLabel}
        </span>
        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-[var(--lux-gold-soft)]">
          {site.mobileCtaHint}
        </span>
      </a>
    </div>
  );
}

