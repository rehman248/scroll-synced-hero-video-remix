import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Heart, UserRound } from 'lucide-react'

const PRODUCTS = [
  { name: 'Signet No. 01', category: 'For him', price: '€2,400', detail: '18k recycled gold · Hand-finished', image: '/media/stone-3.jpg' },
  { name: 'Ligne Solitaire', category: 'For her', price: '€4,800', detail: 'Platinum · 0.42 ct brilliant', image: '/media/stone-1.jpg' },
  { name: 'Atelier Chain', category: 'For him', price: '€1,950', detail: '18k yellow gold · 52 cm', image: '/media/stone-2.jpg' },
  { name: 'Éclat Ear Climber', category: 'For her', price: '€1,280', detail: '18k gold · Pair', image: '/media/stone-4.jpg' },
  { name: 'Halo Band', category: 'For her', price: '€3,600', detail: 'Platinum · Pavé diamonds', image: '/media/stone-1.jpg' },
  { name: 'No. 07 Cuff', category: 'For him', price: '€2,150', detail: 'Brushed silver · Gold clasp', image: '/media/stone-3.jpg' },
]

export const Route = createFileRoute('/shop')({
  head: () => ({ meta: [{ title: 'The collection · Éclat' }, { name: 'description', content: 'Fine jewelry for him and her, made in Paris and Antwerp.' }] }),
  component: Shop,
})

function Shop() {
  return <main className="min-h-dvh bg-background px-5 py-8 text-foreground md:px-10"><header className="flex items-center justify-between border-b border-border pb-7"><Link to="/" className="font-serif text-xl tracking-[0.3em]">ÉCLAT</Link><nav className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground"><Link to="/login" className="inline-flex items-center gap-2 hover:text-primary"><UserRound className="h-3 w-3" /> Account</Link><Link to="/payment-method" className="hover:text-primary">Payment</Link></nav></header><section className="py-20 md:py-28"><p className="font-mono text-[10px] uppercase tracking-[0.28em] text-primary">The collection · 2026</p><div className="mt-5 flex flex-col justify-between gap-6 md:flex-row md:items-end"><h1 className="max-w-2xl font-serif text-5xl tracking-[-0.05em] md:text-7xl">Objects to be<br /><em>lived in.</em></h1><p className="max-w-xs text-sm leading-relaxed text-muted-foreground">A considered selection of fine jewelry for him and her. Each piece is finished by hand in our Paris and Antwerp rooms.</p></div><div className="mt-16 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">{PRODUCTS.map((p) => <article key={p.name} className="group"><div className="relative aspect-[4/5] overflow-hidden bg-card"><img src={p.image} alt={`${p.name}, ${p.category}`} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" /><button aria-label={`Save ${p.name}`} className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-background/80 text-foreground transition-colors hover:text-primary"><Heart className="h-4 w-4" /></button></div><div className="mt-4 flex items-start justify-between gap-4"><div><p className="font-mono text-[10px] uppercase tracking-[0.2em] text-primary">{p.category}</p><h2 className="mt-2 font-serif text-2xl">{p.name}</h2><p className="mt-1 text-sm text-muted-foreground">{p.detail}</p></div><p className="font-mono text-xs text-muted-foreground">{p.price}</p></div><Link to="/payment-method" className="mt-4 inline-flex items-center gap-2 border-b border-border pb-1 font-mono text-[10px] uppercase tracking-[0.2em] opacity-0 transition-all group-hover:opacity-100 hover:border-primary hover:text-primary">Enquire <ArrowRight className="h-3 w-3" /></Link></article>)}</div></section></main>
}
