import { createClient } from '@blinkdotnew/sdk'

export const blink = createClient({
  projectId: import.meta.env.VITE_BLINK_PROJECT_ID || 'scroll-synced-hero-z1zhwilj',
  publishableKey: import.meta.env.VITE_BLINK_PUBLISHABLE_KEY || 'blnk_pk_mp_7onS5qF3-ked34wQiPCkWr7dF8aCl',
  authRequired: false,
  auth: { mode: 'managed' },
})
