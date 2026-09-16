import { createFileRoute, Link } from '@tanstack/react-router'
import { CreditCard, LockKeyhole, ArrowLeft } from 'lucide-react'

export const Route = createFileRoute('/payment-method')({
  head: () => ({ meta: [{ title: 'Payment method · Éclat' }, { name: 'description', content: 'Secure payment method setup for Éclat clients.' }] }),
  component: PaymentMethod,
})

function PaymentMethod() {
  return (
    <main className="min-h-dvh bg-background px-5 py-8 text-foreground md:px-10">
      <header className="flex items-center justify-between"><Link to="/" className="font-serif text-xl tracking-[0.3em]">ÉCLAT</Link><Link to="/shop" className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">Return to collection</Link></header>
      <div className="mx-auto flex min-h-[calc(100dvh-120px)] max-w-xl items-center"><section className="w-full border-t border-border pt-8">
        <Link to="/shop" className="mb-10 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary"><ArrowLeft className="h-3 w-3" /> Back to pieces</Link>
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary"><CreditCard className="h-4 w-4" /> Payment method</div>
        <h1 className="mt-6 font-serif text-5xl tracking-[-0.05em]">Checkout, with care.</h1>
        <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">Éclat uses secure hosted checkout for all purchases. Payment details never touch our atelier systems.</p>
        <div className="mt-10 border border-border bg-card p-6"><div className="flex items-start gap-4"><LockKeyhole className="mt-1 h-5 w-5 text-primary" /><div><h2 className="font-serif text-2xl">Payment setup is coming soon</h2><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Live card processing is not connected yet. To reserve a piece today, request a private viewing and our team will confirm availability and payment options directly.</p><Link to="/" hash="book" className="mt-6 inline-flex border-b border-primary pb-1 font-mono text-xs uppercase tracking-[0.2em] hover:text-primary">Request a viewing</Link></div></div></div>
      </section></div>
    </main>
  )
}
