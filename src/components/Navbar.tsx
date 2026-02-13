import type { Locale, SiteConfig } from "../config/site";

type NavbarProps = {
  site: SiteConfig;
  locale: Locale;
  onToggleLocale: () => void;
  onOpenCommand: () => void;
};

export default function Navbar({ site, locale, onToggleLocale, onOpenCommand }: NavbarProps) {
  const navItems = [
    { href: "#home", label: site.nav.home },
    { href: "#about", label: site.nav.about },
    { href: "#work", label: site.nav.work },
    { href: "#process", label: site.nav.process },
    { href: "#proof", label: site.nav.proof },
    { href: "#contact", label: site.nav.contact },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav className="pointer-events-auto ml-auto flex w-fit items-center gap-1 rounded-full border border-[rgba(196,164,92,.26)] bg-[rgba(7,8,11,.62)] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,.45)] backdrop-blur-xl">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            data-cursor="active"
            className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-200 transition duration-300 hover:bg-[rgba(196,164,92,.14)] hover:text-[var(--lux-cream)] sm:text-sm"
          >
            {item.label}
          </a>
        ))}
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
