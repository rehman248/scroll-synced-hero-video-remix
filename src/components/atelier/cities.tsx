import { Eyebrow } from './motion'

const CITIES = [
  {
    name: 'Paris',
    address: ['12 rue de la Paix', '75002 Paris'],
    hours: ['Tue – Sat, 11:00 – 19:00', 'Closed Sunday and Monday'],
    phone: '+33 1 42 61 00 12',
  },
  {
    name: 'Antwerp',
    address: ['Hoveniersstraat 30', '2018 Antwerpen'],
    hours: ['Mon – Fri, 10:00 – 18:00', 'Saturday by appointment'],
    phone: '+32 3 232 40 18',
  },
]

const STRIP = 'PRIVATE VIEWINGS · BY APPOINTMENT · PARIS · ANTWERP · '

export function Cities() {
  return (
    <section id="cities" className="border-t border-border/60 py-24 md:py-32" aria-labelledby="cities-title">
      <div className="overflow-hidden border-y border-border/60 py-4 [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]" aria-hidden="true">
        <div className="animate-marquee flex w-max whitespace-nowrap font-mono text-xs uppercase tracking-[0.3em] text-foreground/70">
          <span className="pr-0">{STRIP.repeat(4)}</span>
          <span className="pr-0">{STRIP.repeat(4)}</span>
        </div>
      </div>

      <div className="px-5 pt-20 md:px-10">
        <Eyebrow index="IV">Two rooms</Eyebrow>
        <h2 id="cities-title" className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">Paris · Antwerp</h2>
        <div className="mt-14 grid gap-12 md:grid-cols-2 md:gap-10">
          {CITIES.map((c) => (
            <address key={c.name} className="border-t border-border pt-8 not-italic">
              <h3 className="font-serif text-3xl tracking-[-0.03em]">{c.name}</h3>
              <dl className="mt-6 grid gap-6 text-sm leading-relaxed">
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Address</dt>
                  <dd className="mt-2 text-foreground/80">{c.address.map((l) => <span key={l} className="block">{l}</span>)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Hours</dt>
                  <dd className="mt-2 text-foreground/80">{c.hours.map((l) => <span key={l} className="block">{l}</span>)}</dd>
                </div>
                <div>
                  <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-primary">Appointments</dt>
                  <dd className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-foreground/80">
                    <a href={`tel:${c.phone.replace(/\s/g, '')}`} className="font-mono text-sm hover:text-primary">{c.phone}</a>
                    <a href="#book" className="border-b border-primary pb-0.5 text-xs uppercase tracking-[0.2em] hover:text-primary">Book a viewing</a>
                  </dd>
                </div>
              </dl>
            </address>
          ))}
        </div>
      </div>
    </section>
  )
}
