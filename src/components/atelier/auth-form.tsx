import { useState, type FormEvent } from 'react'
import { Link, useNavigate } from '@tanstack/react-router'
import { ArrowRight, LockKeyhole } from 'lucide-react'
import { blink } from '@/blink/client'
import { toast } from 'sonner'

export function AuthForm({ mode }: { mode: 'login' | 'signup' }) {
  const navigate = useNavigate()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = String(data.get('email') || '').trim()
    const password = String(data.get('password') || '')
    const name = String(data.get('name') || '').trim()
    setBusy(true)
    setError('')
    try {
      if (mode === 'signup') {
        await blink.auth.signUp({ email, password, metadata: { displayName: name } })
        toast.success('Account created', { description: 'Welcome to Éclat.' })
      } else {
        await blink.auth.signInWithEmail(email, password)
        toast.success('Welcome back')
      }
      await navigate({ to: '/shop' })
    } catch (err) {
      const message = err instanceof Error ? err.message : String(err)
      setError(message)
      toast.error('Authentication failed', { description: message })
    } finally {
      setBusy(false)
    }
  }

  return (
    <main className="min-h-dvh bg-background px-5 py-8 text-foreground md:px-10">
      <header className="flex items-center justify-between">
        <Link to="/" className="font-serif text-xl tracking-[0.3em]">ÉCLAT</Link>
        <Link to="/shop" className="font-mono text-[10px] uppercase tracking-[0.22em] text-muted-foreground hover:text-primary">Shop the collection</Link>
      </header>
      <div className="mx-auto flex min-h-[calc(100dvh-120px)] max-w-md items-center justify-center">
        <section className="w-full border-t border-border pt-8">
          <div className="mb-10 flex items-center gap-3 font-mono text-[10px] uppercase tracking-[0.24em] text-primary">
            <LockKeyhole className="h-4 w-4" /> Private client account
          </div>
          <h1 className="font-serif text-5xl tracking-[-0.05em]">{mode === 'login' ? 'Welcome back.' : 'Join the atelier.'}</h1>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{mode === 'login' ? 'Access saved pieces, private viewings, and your Éclat account.' : 'Create an account for early access to one-of-a-kind pieces and private appointments.'}</p>
          <form onSubmit={submit} className="mt-10 space-y-7">
            {mode === 'signup' && <div><label htmlFor="name" className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Full name</label><input id="name" name="name" required autoComplete="name" className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-primary" /></div>}
            <div><label htmlFor="email" className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Email</label><input id="email" name="email" type="email" required autoComplete="email" className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-primary" /></div>
            <div><label htmlFor="password" className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary">Password</label><input id="password" name="password" type="password" required minLength={8} autoComplete={mode === 'login' ? 'current-password' : 'new-password'} className="mt-2 w-full border-0 border-b border-border bg-transparent py-3 outline-none focus:border-primary" /></div>
            {error && <p role="alert" className="border border-destructive/50 p-3 text-sm text-destructive">{error}</p>}
            <button disabled={busy} className="inline-flex h-12 items-center gap-3 bg-primary px-7 font-mono text-xs uppercase tracking-[0.2em] text-primary-foreground transition-transform hover:scale-[1.02] disabled:opacity-50">{busy ? 'Please wait…' : mode === 'login' ? 'Sign in' : 'Create account'} <ArrowRight className="h-4 w-4" /></button>
          </form>
          <p className="mt-8 text-sm text-muted-foreground">{mode === 'login' ? 'New to Éclat? ' : 'Already have an account? '}<Link to={mode === 'login' ? '/create-account' : '/login'} className="text-foreground underline underline-offset-4 hover:text-primary">{mode === 'login' ? 'Create an account' : 'Sign in'}</Link></p>
        </section>
      </div>
    </main>
  )
}
