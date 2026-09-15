const LINKS = [
  { href: '#collection', label: 'Collection' },
  { href: '#making', label: 'The making' },
  { href: '#cities', label: 'Paris · Antwerp' },
]

export function Footer() {
  return (
    <footer className="border-t border-border px-5 py-14 md:px-10">
      <div className="grid gap-10 md:grid-cols-12 md:items-start">
        <a href="#top" className="font-serif text-2xl tracking-[0.3em] md:col-span-4">ÉCLAT</a>
        <nav aria-label="Footer" className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.22em] md:col-span-4">
          {LINKS.map((l) => (
            <a key={l.href} href={l.href} className="text-foreground/70 transition-colors hover:text-primary">{l.label}</a>
          ))}
        </nav>
        <div className="flex flex-col gap-3 font-mono text-[11px] uppercase tracking-[0.22em] md:col-span-4">
          <a href="mailto:atelier@eclat.example" className="text-foreground/70 transition-colors hover:text-primary">atelier@eclat.example</a>
          <a href="tel:+33142610012" className="text-foreground/70 transition-colors hover:text-primary">+33 1 42 61 00 12</a>
          <a href="#book" className="text-foreground/70 transition-colors hover:text-primary">Book a private viewing</a>
        </div>
      </div>
      <p className="mt-14 border-t border-border/60 pt-6 font-mono text-[10px] uppercase tracking-[0.28em] text-muted-foreground">© 2026 ÉCLAT · PARIS · ANTWERP</p>
    </footer>
  )
}
