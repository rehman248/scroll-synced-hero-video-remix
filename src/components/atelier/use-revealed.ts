import { useInView, useReducedMotion } from 'framer-motion'
import { useRef } from 'react'

/** Fires once when the element is ~15% into view. Reduced motion => immediately true. */
export function useRevealed<T extends Element>() {
  const ref = useRef<T>(null)
  const reduce = useReducedMotion()
  const inView = useInView(ref, { once: true, margin: '0px 0px -15% 0px' })
  return { ref, revealed: reduce || inView }
}
