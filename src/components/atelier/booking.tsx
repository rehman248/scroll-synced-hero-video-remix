import { useState, type FormEvent } from 'react'
import { toast } from 'sonner'
import { blink } from '@/blink/client'
import type { ViewingEnquiriesRow } from '@/lib/db-types'
import { Eyebrow } from './motion'

const requests = blink.db.table<ViewingEnquiriesRow>('viewing_enquiries')

const field =
  'w-full border-0 border-b border-border bg-transparent py-3 font-sans text-base text-foreground placeholder:text-muted-foreground/60 focus:border-primary focus:outline-none'
const label = 'font-mono text-[10px] uppercase tracking-[0.24em] text-primary'

export function Booking() {
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    setStatus('sending')
    try {
      await requests.create({
        id: `vr_${Date.now().toString(36)}${Math.random().toString(36).slice(2, 7)}`,
        name: String(data.get('name')),
        email: String(data.get('email')),
        city: String(data.get('city')),
        preferredDate: String(data.get('date')),
        message: String(data.get('message') ?? ''),
      })
      setStatus('sent')
      form.reset()
      toast.success('Request received', { description: 'The atelier will write to you within two working days.' })
    } catch (err) {
      setStatus('idle')
      toast.error('Could not send your request', { description: err instanceof Error ? err.message : String(err) })
    }
  }

  return (
    <section id="book" className="border-t border-border/60 px-5 py-24 md:px-10 md:py-32" aria-labelledby="book-title">
      <div className="grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Eyebrow index="V">Appointment</Eyebrow>
          <h2 id="book-title" className="font-serif text-4xl tracking-[-0.04em] md:text-6xl">Book a<br /><em>private viewing.</em></h2>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-muted-foreground">One client at a time, one stone on the table. Tell us which room and when; we will confirm by email.</p>
        </div>

        {status === 'sent' ? (
          <div className="flex flex-col justify-center border-t border-border pt-8 lg:col-span-7">
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-primary">Received</p>
            <p className="mt-4 max-w-md font-serif text-3xl tracking-[-0.03em]">Thank you. The atelier will write to you within two working days.</p>
            <button type="button" onClick={() => setStatus('idle')} className="mt-8 self-start border-b border-primary pb-1 text-xs uppercase tracking-[0.2em] hover:text-primary">
              Send another request
            </button>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-8 lg:col-span-7 md:grid-cols-2">
            <div>
              <label htmlFor="bk-name" className={label}>Name</label>
              <input id="bk-name" name="name" required autoComplete="name" className={field} placeholder="Your full name" />
            </div>
            <div>
              <label htmlFor="bk-email" className={label}>Email</label>
              <input id="bk-email" name="email" type="email" required autoComplete="email" className={field} placeholder="you@example.com" />
            </div>
            <div>
              <label htmlFor="bk-city" className={label}>Room</label>
              <select id="bk-city" name="city" required defaultValue="Paris" className={`${field} appearance-none`}>
                <option value="Paris">Paris</option>
                <option value="Antwerp">Antwerp</option>
              </select>
            </div>
            <div>
              <label htmlFor="bk-date" className={label}>Preferred date</label>
              <input id="bk-date" name="date" type="date" required className={`${field} [color-scheme:dark]`} />
            </div>
            <div className="md:col-span-2">
              <label htmlFor="bk-message" className={label}>Message</label>
              <textarea id="bk-message" name="message" rows={3} className={`${field} resize-none`} placeholder="Which stone, or what you have in mind." />
            </div>
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={status === 'sending'}
                className="inline-flex h-12 items-center gap-3 bg-primary px-8 font-mono text-xs uppercase tracking-[0.22em] text-primary-foreground transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Request appointment'}
              </button>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
