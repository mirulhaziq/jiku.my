export function Nav() {
  const links = [
    { href: '#journey', label: 'Journey' },
    { href: '#projects', label: 'Projects' },
    { href: '#roadmap', label: 'Roadmap' },
    { href: '#contact', label: 'Contact' },
  ];
  return (
    <nav className="sticky top-0 z-50 backdrop-blur-xl bg-bg/70 border-b border-border">
      <div className="mx-auto max-w-5xl flex items-center justify-between px-6 py-4">
        <a href="#hero" className="font-semibold tracking-tight">jiku.my</a>
        <ul className="flex gap-6 text-sm text-muted">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:text-fg transition-colors">
                {l.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
