import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import type { Locale, SiteConfig } from "../config/site";

type NavbarProps = {
  site: SiteConfig;
  locale: Locale;
  onToggleLocale: () => void;
  onOpenCommand: () => void;
};

export default function Navbar({ site, locale, onToggleLocale, onOpenCommand }: NavbarProps) {
  const navItems = useMemo(
    () => [
      { id: "home", href: "#home", label: site.nav.home },
      { id: "about", href: "#about", label: site.nav.about },
      { id: "work", href: "#work", label: site.nav.work },
      { id: "process", href: "#process", label: site.nav.process },
      { id: "proof", href: "#proof", label: site.nav.proof },
      { id: "contact", href: "#contact", label: site.nav.contact },
    ],
    [site.nav.about, site.nav.contact, site.nav.home, site.nav.process, site.nav.proof, site.nav.work],
  );

  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.id);

    const updateActiveSection = () => {
      const marker = window.scrollY + 160;
      let current = sectionIds[0] ?? "home";

      sectionIds.forEach((id) => {
        const section = document.getElementById(id);
        if (!section) return;
        if (section.offsetTop <= marker) {
          current = id;
        }
      });

      const nearBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 12;
      if (nearBottom && sectionIds.length > 0) {
        current = sectionIds[sectionIds.length - 1];
      }

      setActiveSection(current);
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, [navItems]);

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav className="pointer-events-auto ml-auto flex w-fit items-center gap-1 rounded-full border border-[rgba(196,164,92,.26)] bg-[rgba(7,8,11,.62)] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,.45)] backdrop-blur-xl">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;
          return (
            <a
              key={item.href}
              href={item.href}
              data-cursor="active"
              className={`nav-pill relative rounded-full px-3 py-1.5 text-xs font-medium transition duration-300 sm:text-sm ${
                isActive
                  ? "text-[var(--lux-cream)]"
                  : "text-zinc-200 hover:bg-[rgba(196,164,92,.14)] hover:text-[var(--lux-cream)]"
              }`}
            >
              {isActive ? <motion.span layoutId="nav-active-pill" className="nav-pill-active" /> : null}
              <span className="relative z-10">{item.label}</span>
            </a>
          );
        })}
        <button
          data-cursor="active"
          onClick={onOpenCommand}
          className="rounded-full border border-[rgba(212,176,93,.28)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.13em] text-zinc-300 transition hover:bg-[rgba(212,176,93,.14)]"
        >
          {site.commandShortcutLabel}
        </button>
        <button
          data-cursor="active"
          onClick={onToggleLocale}
          className="rounded-full border border-[rgba(212,176,93,.28)] px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.13em] text-zinc-300 transition hover:bg-[rgba(212,176,93,.14)]"
          aria-label={site.localeLabel}
        >
          {locale.toUpperCase()}
        </button>
      </nav>
    </header>
  );
}
