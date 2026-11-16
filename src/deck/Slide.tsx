import type { ReactNode } from 'react'
import { motion, type Variants } from 'motion/react'
import SplitText from '@/components/SplitText'

/* Layout helpers. Sizes use min(vh, vw) so a slide fits 1280x720 up to 1920x1080 and phones. */
export const headingSize = 'text-[clamp(2.25rem,min(8.5vh,8vw),5.75rem)]'
export const bodySize = 'text-[clamp(1.125rem,min(3vh,4.6vw),1.75rem)]'

export function Slide({ children }: { children: ReactNode }) {
  return (
    <section className="flex h-full flex-col overflow-y-auto px-[clamp(1.25rem,6vw,7rem)] py-6">
      <div className="mx-auto my-auto flex w-full max-w-6xl flex-col gap-[clamp(1rem,4vh,3rem)]">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="muted text-[clamp(0.75rem,1.9vh,1rem)] font-medium uppercase tracking-[0.22em] text-gold">
      {children}
    </p>
  )
}

export function Heading({ children, reduce, as = 'h2' }: { children: string; reduce: boolean; as?: 'h1' | 'h2' }) {
  const cls = `${headingSize} text-cream`
  if (reduce) {
    const Tag = as
    return <Tag className={cls}>{children}</Tag>
  }
  return (
    <SplitText text={children} tag={as} splitType="words" effect="rise" trigger="load" textAlign="left" delay={50} duration={0.9} className={cls} />
  )
}

/* Staggered rise. Reduced motion: opacity only. */
export function Stagger({ children, reduce, className, delay = 0.45 }: { children: ReactNode; reduce: boolean; className?: string; delay?: number }) {
  const parent: Variants = { hidden: {}, show: { transition: { staggerChildren: reduce ? 0 : 0.12, delayChildren: reduce ? 0 : delay } } }
  return (
    <motion.div className={className} variants={parent} initial="hidden" animate="show">
      {children}
    </motion.div>
  )
}

export function Rise({ children, reduce, className }: { children: ReactNode; reduce: boolean; className?: string }) {
  const v: Variants = {
    hidden: { opacity: 0, y: reduce ? 0 : 28 },
    show: { opacity: 1, y: 0, transition: { type: 'spring', duration: reduce ? 0.2 : 0.7, bounce: 0 } },
  }
  return (
    <motion.div className={className} variants={v}>
      {children}
    </motion.div>
  )
}

