import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { useEffect, useRef, useState, type ReactNode } from 'react'

/** Section header shared by every chapter below the hero. */
export function Eyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="mb-6 flex items-center gap-4 font-mono text-[10px] uppercase tracking-[0.28em] text-primary">
      <span>{index}</span>
      <span className="h-px w-10 bg-primary/40" />
      <span>{children}</span>
    </p>
  )
}

/**
 * Scroll-linked horizontal slide. Odd steps come from the left, even from the
 * right. Finishes by the time the element reaches 60% of the viewport.
 */
export function SlideIn({ from, children, className }: { from: 'left' | 'right'; children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 95%', 'start 60%'] })
  const x = useTransform(scrollYProgress, [0, 1], [from === 'left' ? -80 : 80, 0])
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  return (
    <motion.div ref={ref} style={reduce ? undefined : { x, opacity }} className={className}>
      {children}
    </motion.div>
  )
}

/** Counts from 0 to `value` over 800ms, once, when `start` flips true. */
export function CountUp({ value, decimals = 0, start }: { value: number; decimals?: number; start: boolean }) {
  const reduce = useReducedMotion()
  const [n, setN] = useState(0)
  const done = useRef(false)
  useEffect(() => {
    if (!start || done.current || reduce) return
    done.current = true
    const t0 = performance.now()
    let raf = 0
    const tick = (t: number) => {
      const k = Math.min(1, (t - t0) / 800)
      const eased = 1 - Math.pow(1 - k, 3)
      setN(value * eased)
      if (k < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [start, value, reduce])
  return <>{(reduce ? value : n).toFixed(decimals)}</>
}
