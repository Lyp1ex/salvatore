const navItems = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#highlights", label: "Highlights" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-50 px-4 sm:px-6">
      <nav className="pointer-events-auto ml-auto flex w-fit items-center gap-1 rounded-full border border-white/15 bg-black/35 p-1.5 backdrop-blur-lg">
        {navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="rounded-full px-3 py-1.5 text-xs font-medium text-zinc-200 transition hover:bg-white/10 hover:text-white sm:text-sm"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

