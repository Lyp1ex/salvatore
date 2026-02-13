const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#process", label: "Flow" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav className="pointer-events-auto ml-auto flex w-fit items-center gap-1 rounded-full border border-[rgba(196,164,92,.26)] bg-[rgba(7,8,11,.62)] p-1.5 shadow-[0_10px_30px_rgba(0,0,0,.45)] backdrop-blur-xl">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-200 transition duration-300 hover:bg-[rgba(196,164,92,.14)] hover:text-[var(--lux-cream)] sm:text-sm"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}
