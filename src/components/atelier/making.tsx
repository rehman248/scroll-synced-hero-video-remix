import { Eyebrow, SlideIn } from './motion'

const STEPS = [
  { n: '01', title: 'Rough', copy: 'The stone arrives as it left the earth. We look for a long time before anyone touches it.' },
  { n: '02', title: 'Cleaving', copy: 'One blow along the grain. There is no second attempt, so the first is planned for weeks.' },
  { n: '03', title: 'Polishing', copy: 'Fifty-seven facets, each brought to a fraction of a degree on a wheel that has not changed in a century.' },
  { n: '04', title: 'Setting', copy: 'Platinum, drawn thin. The metal exists to disappear so the stone can be worn, not displayed.' },
]

export function Making() {
  return (
    <section id="making" className="border-t border-border/60 px-5 py-24 md:px-10 md:py-32" aria-labelledby="making-title">
      <Eyebrow index="II">The making</Eyebrow>
      <h2 id="making-title" className="max-w-3xl font-serif text-4xl tracking-[-0.04em] md:text-6xl">Four decisions, <em>in order.</em></h2>

      <div className="mt-16 grid gap-16 lg:grid-cols-12 lg:gap-10">
        <ol className="space-y-14 lg:col-span-6">
          {STEPS.map((s, i) => (
            <li key={s.n}>
              <SlideIn from={i % 2 === 0 ? 'left' : 'right'} className={`max-w-md ${i % 2 === 1 ? 'ml-auto text-right lg:ml-16' : ''}`}>
                <span className="font-mono text-xs tracking-[0.28em] text-primary">{s.n}</span>
                <h3 className="mt-3 font-serif text-3xl tracking-[-0.03em] md:text-4xl">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.copy}</p>
              </SlideIn>
            </li>
          ))}
        </ol>

        {/* Plays normally. Not scrubbed, not pinned. */}
        <figure className="lg:col-span-6">
          <video
            className="h-[60vh] w-full rounded-2xl border border-border/60 object-cover"
            src="/media/loupe.mp4"
            poster="/media/loupe-poster.jpg"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
            aria-label="A diamond being turned under a jeweller's loupe"
          />
          <figcaption className="mt-4 flex justify-between font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground">
            <span>Antwerp cutting house</span>
            <span>Éclat I under the loupe</span>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
