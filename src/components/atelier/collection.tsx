import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { Eyebrow } from './motion'

const STONES = [
  { name: 'Éclat I', cut: 'Round brilliant', carat: '3.12 ct', city: 'Antwerp', price: '€148,000', img: '/media/stone-1.jpg' },
  { name: 'Éclat II', cut: 'Cushion', carat: '2.04 ct', city: 'Paris', price: '€62,500', img: '/media/stone-2.jpg' },
  { name: 'Éclat III', cut: 'Oval', carat: '1.71 ct', city: 'Antwerp', price: '€41,200', img: '/media/stone-3.jpg' },
  { name: 'Éclat IV', cut: 'Emerald', carat: '2.48 ct', city: 'Paris', price: '€89,900', img: '/media/stone-4.jpg' },
]

const TILE_STYLES = [
  'lg:col-span-7 lg:row-span-3 aspect-[4/5] lg:aspect-auto',
  'lg:col-span-5 aspect-[16/10] lg:mt-0',
  'lg:col-span-5 aspect-[16/10] lg:ml-10',
  'lg:col-span-5 aspect-[16/10] lg:ml-20',
]

function Tile({ stone, index, progress, feature }: { stone: (typeof STONES)[number]; index: number; progress: MotionValue<number>; feature: boolean }) {
  const reduce = useReducedMotion()
  // Stagger: each tile's wipe starts 0.12 later along the section's scroll progress.
  const start = index * 0.12
  const clipPath = useTransform(progress, [start, start + 0.45], ['inset(0% 100% 0% 0%)', 'inset(0% 0% 0% 0%)'])
  return (
    <a
      href="#book"
      className={`group relative block overflow-hidden border border-border/60 bg-card ${TILE_STYLES[index]}`}
      aria-label={`${stone.name} — enquire`}
    >
      <motion.img
        src={stone.img}
        alt={`${stone.name}, ${stone.cut} diamond, ${stone.carat}`}
        loading="lazy"
        style={reduce ? undefined : { clipPath }}
        className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_45%,oklch(0.08_0.01_70/.85))]" />
      <div className="absolute inset-x-0 bottom-0 p-5 md:p-7">
        <div className="flex items-end justify-between">
          <h3 className={`font-serif tracking-[-0.03em] ${feature ? 'text-4xl md:text-6xl' : 'text-2xl md:text-3xl'}`}>{stone.name}</h3>
          <span className="font-mono text-xs text-foreground/70">{stone.price}</span>
        </div>
        {/* Specs rise into the tile on hover; always visible where hover is unavailable. */}
        <dl className="mt-3 grid grid-cols-3 gap-4 border-t border-foreground/20 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/70 transition-all duration-500 ease-out lg:max-h-0 lg:translate-y-4 lg:opacity-0 lg:group-hover:max-h-20 lg:group-hover:translate-y-0 lg:group-hover:opacity-100">
          <div><dt className="text-primary/80">Cut</dt><dd>{stone.cut}</dd></div>
          <div><dt className="text-primary/80">Carat</dt><dd>{stone.carat}</dd></div>
          <div><dt className="text-primary/80">Provenance</dt><dd>{stone.city}</dd></div>
        </dl>
      </div>
    </a>
  )
}

export function Collection() {
  const ref = useRef<HTMLElement>(null)
  // Wipes complete well before the grid is centred — no mid-animation screenshots.
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 90%', 'start 25%'] })
  return (
    <section id="collection" ref={ref} className="px-5 py-24 md:px-10 md:py-32" aria-labelledby="collection-title">
      <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div>
          <Eyebrow index="I">The collection</Eyebrow>
          <h2 id="collection-title" className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">Four stones.<br /><em>Nothing else this season.</em></h2>
        </div>
        <p className="max-w-xs text-sm leading-relaxed text-muted-foreground">Each stone is cut once, argued over for months, and offered to a single client. Prices include setting and certificate.</p>
      </div>
      <div className="grid grid-cols-1 gap-5 lg:grid-cols-12 lg:grid-rows-3 lg:gap-6">
        {STONES.map((s, i) => (
          <Tile key={s.name} stone={s} index={i} progress={scrollYProgress} feature={i === 0} />
        ))}
      </div>
    </section>
  )
}
