import { createFileRoute } from '@tanstack/react-router'
import { AuthForm } from '@/components/atelier/auth-form'

export const Route = createFileRoute('/login')({
  head: () => ({ meta: [{ title: 'Sign in · Éclat' }, { name: 'description', content: 'Sign in to your Éclat private client account.' }] }),
  component: () => <AuthForm mode="login" />,
})
