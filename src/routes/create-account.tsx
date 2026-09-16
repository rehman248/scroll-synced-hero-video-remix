import { createFileRoute } from '@tanstack/react-router'
import { AuthForm } from '@/components/atelier/auth-form'

export const Route = createFileRoute('/create-account')({
  head: () => ({ meta: [{ title: 'Create account · Éclat' }, { name: 'description', content: 'Create a private Éclat client account.' }] }),
  component: () => <AuthForm mode="signup" />,
})
