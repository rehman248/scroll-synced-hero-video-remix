import { createFileRoute } from '@tanstack/react-router'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { BlinkClientBoundary } from '@/components/BlinkClientBoundary'
import { Collection } from '@/components/atelier/collection'
import { Making } from '@/components/atelier/making'
import { Specification } from '@/components/atelier/specification'
import { Cities } from '@/components/atelier/cities'
import { Booking } from '@/components/atelier/booking'
import { Footer } from '@/components/atelier/footer'

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Éclat — Measured Purity' },
      { name: 'description', content: 'A study in light, proportion, and the discipline of the cut.' },
    ],
  }),
  component: Home,
})

function Home() {
  return (
    <BlinkClientBoundary fallback={<div className="min-h-dvh bg-background" />}>
      <ScrollHero />
    </BlinkClientBoundary>
  )
}

/** Linear ramp: 0 before `a`, 1 after `b`. */
const ramp = (p: number, a: number, b: number) =>
  Math.min(1, Math.max(0, (p - a) / (b - a)))

function ScrollHero() {
  const wrapRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [p, setP] = useState(0)

  useEffect(() => {
    const wrap = wrapRef.current, vid = videoRef.current
    if (!wrap || !vid) return
    let cur = 0, lastSeek = -1, lastP = -1, raf = 0, unlocked = false
    const unlock = () => {                       // iOS shows only the poster without this
      if (unlocked) return
      unlocked = true
      const pr = vid.play()
      if (pr && typeof pr.then === 'function') pr.then(() => vid.pause()).catch(() => {})
      else vid.pause()
    }
    const tick = () => {
      const span = wrap.offsetHeight - window.innerHeight
      const target = span > 0
        ? Math.min(1, Math.max(0, -wrap.getBoundingClientRect().top / span))
        : 0
      cur += (target - cur) * 0.18
      if (Math.abs(target - cur) < 0.001) cur = target
      if (Math.abs(cur - lastP) > 0.002) { lastP = cur; setP(cur) }
      const d = vid.duration
      if (vid.readyState >= 2 && Number.isFinite(d) && d > 0 && !vid.seeking) {
        const t = cur * (d - 0.05)
        if (Math.abs(t - lastSeek) > 1 / 30) { lastSeek = t; vid.currentTime = t; unlock() }
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  // Chapter one 0.00–0.30, two 0.35–0.65, three 0.70–1.00; cross-fade in the gaps.
  const firstOpacity = 1 - ramp(p, 0.3, 0.35)
  const secondOpacity = ramp(p, 0.3, 0.35) * (1 - ramp(p, 0.65, 0.7))
  const thirdOpacity = ramp(p, 0.65, 0.7)
  const chapter = p < 0.325 ? 1 : p < 0.675 ? 2 : 3

  return (
    <main id="top" className="bg-background text-foreground">
      <section
        ref={wrapRef}
        data-scrub-progress={p.toFixed(3)}
        className="relative h-[250vh]"
        aria-label="Éclat diamond story"
      >
        <div className="sticky top-0 h-screen overflow-hidden">
          <video
            ref={videoRef}
            className="absolute inset-0 h-full w-full object-cover"
            src="/media/atelier-diamond.mp4"
            poster="/media/atelier-diamond-poster.jpg"
            muted
            playsInline
            preload="auto"
            aria-label="A diamond transformed by the cutting house"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,oklch(0.08_0.01_70/.68),transparent_52%,oklch(0.08_0.01_70/.32))]" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.08_0.01_70/.45),transparent_28%,oklch(0.08_0.01_70/.6))]" />

          <header className="absolute inset-x-0 top-0 z-20 flex items-center justify-between px-5 py-6 md:px-10 md:py-8">
            <a href="#top" className="font-serif text-xl tracking-[0.3em] text-foreground">ÉCLAT</a>
            <div className="flex items-center gap-5 font-mono text-[10px] uppercase tracking-[0.22em] text-foreground/70">
              <a href="/shop" className="transition-colors hover:text-primary">Collection</a>
              <a href="#cities" className="transition-colors hover:text-primary">Paris · Antwerp</a>
              <span className="border-l border-foreground/30 pl-5">{String(chapter).padStart(2, '0')} / 03</span>
            </div>
          </header>

          <article style={{ opacity: firstOpacity }} className="absolute bottom-10 left-5 z-10 max-w-xl md:bottom-16 md:left-10">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Chapter one · Origin</p>
            <h1 className="font-serif text-5xl leading-[0.9] tracking-[-0.05em] md:text-8xl">MEASURED<br />PURITY</h1>
            <a href="#craft" className="mt-7 inline-flex items-center gap-3 border-b border-primary pb-2 text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary">
              Discover <ArrowDown className="h-4 w-4" />
            </a>
          </article>

          <article style={{ opacity: secondOpacity }} className="absolute right-5 top-28 z-10 max-w-md text-right md:right-10 md:top-32">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Chapter two · The cut</p>
            <h2 className="font-serif text-4xl leading-[0.98] tracking-[-0.04em] md:text-7xl">Every facet,<br /><em>argued for.</em></h2>
            <p className="ml-auto mt-6 max-w-xs text-sm leading-relaxed text-foreground/70">In our Antwerp cutting house, proportion is debated to the fraction of a degree.</p>
          </article>

          <article style={{ opacity: thirdOpacity }} className="absolute bottom-10 right-5 z-10 max-w-lg text-right md:bottom-16 md:right-10">
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">Chapter three · Life</p>
            <h2 className="font-serif text-5xl leading-[0.92] tracking-[-0.05em] md:text-8xl">Worn, not<br /><em>displayed.</em></h2>
            <a href="#book" className="mt-7 inline-flex items-center gap-3 border-b border-primary pb-2 text-xs uppercase tracking-[0.2em] transition-colors hover:text-primary">
              Enter the atelier <ArrowUpRight className="h-4 w-4" />
            </a>
          </article>

          <div className="absolute bottom-5 left-1/2 z-20 hidden -translate-x-1/2 items-center gap-3 font-mono text-[9px] uppercase tracking-[0.2em] text-foreground/50 md:flex">
            <span>Scroll to examine</span><span className="h-px w-16 bg-foreground/30" />
          </div>
        </div>
      </section>

      <section id="craft" className="grid min-h-[70vh] place-items-center px-6 py-24 text-center">
        <div className="max-w-2xl">
          <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">The atelier</p>
          <h2 className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">Light, held with intention.</h2>
          <p className="mx-auto mt-6 max-w-lg leading-relaxed text-muted-foreground">Each stone begins with restraint: less intervention, finer judgment, and a setting made for a life in motion.</p>
        </div>
      </section>

      <Collection />
      <Making />
      <Specification />
      <Cities />
      <Booking />
      <Footer />
    </main>
  )
}
