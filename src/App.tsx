import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Aurora from '@/components/Aurora'
import { slides } from '@/deck/slides'
import { usePrefersReducedMotion } from '@/deck/usePrefersReducedMotion'

export default function App() {
  const [{ index, dir }, setState] = useState({ index: 0, dir: 1 })
  const [notes, setNotes] = useState(false)
  const reduce = usePrefersReducedMotion()
  const total = slides.length
  const swiped = useRef(false)
  const start = useRef<{ x: number; y: number } | null>(null)

  const go = useCallback(
    (to: number) =>
      setState(cur => {
        const next = Math.min(total - 1, Math.max(0, to))
        return next === cur.index ? cur : { index: next, dir: next > cur.index ? 1 : -1 }
      }),
    [total],
  )
  const step = useCallback((d: number) => setState(cur => {
    const next = Math.min(total - 1, Math.max(0, cur.index + d))
    return next === cur.index ? cur : { index: next, dir: d }
  }), [total])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return
      const k = e.key
      if (['ArrowRight', 'ArrowDown', 'PageDown'].includes(k) || (k === ' ' && !e.shiftKey)) step(1)
      else if (['ArrowLeft', 'ArrowUp', 'PageUp'].includes(k) || (k === ' ' && e.shiftKey)) step(-1)
      else if (k === 'Home') go(0)
      else if (k === 'End') go(total - 1)
      else if (k === 'f' || k === 'F') {
        if (document.fullscreenElement) void document.exitFullscreen()
        else void document.documentElement.requestFullscreen?.()
      } else if (k === 'n' || k === 'N') setNotes(n => !n)
      else return
      e.preventDefault()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [step, go, total])

  const onPointerDown = (e: React.PointerEvent) => {
    start.current = { x: e.clientX, y: e.clientY }
    swiped.current = false
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const s = start.current
    start.current = null
    if (!s) return
    const dx = e.clientX - s.x
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(e.clientY - s.y) * 1.5) {
      swiped.current = true
      step(dx < 0 ? 1 : -1)
    }
  }
  const onClick = (e: React.MouseEvent) => {
    if (swiped.current || (e.target as HTMLElement).closest('a,button')) return
    step(e.clientX < window.innerWidth / 3 ? -1 : 1)
  }

  const slide = slides[index]
  const x = reduce ? 0 : 70 * dir

  return (
    <div className="flex h-dvh w-screen flex-col overflow-hidden bg-green text-cream">
      {!reduce && (
        <div className="pointer-events-none absolute inset-x-0 top-0 h-[55vh] opacity-45" aria-hidden>
          <Aurora colorStops={['#0F3D2E', '#C9A227', '#1F7A5A']} amplitude={0.7} blend={0.6} speed={0.4} />
        </div>
      )}

      <main className="relative min-h-0 flex-1" onPointerDown={onPointerDown} onPointerUp={onPointerUp} onClick={onClick}>
        <AnimatePresence initial={false} custom={x}>
          <motion.div
            key={index}
            className="absolute inset-0"
            custom={x}
            variants={{
              enter: (c: number) => ({ opacity: 0, x: c }),
              center: { opacity: 1, x: 0 },
              exit: (c: number) => ({ opacity: 0, x: -c }),
            }}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ type: 'spring', duration: reduce ? 0.25 : 0.55, bounce: 0 }}
          >
            {slide.render(reduce)}
          </motion.div>
        </AnimatePresence>
      </main>

      {notes && (
        <aside className="relative max-h-[30vh] overflow-y-auto border-t border-gold/50 bg-green-deep px-[clamp(1.25rem,6vw,7rem)] py-3" aria-label="Speaker notes">
          <p className="mx-auto max-w-6xl text-[clamp(0.95rem,2.4vh,1.25rem)] leading-relaxed text-cream/90">
            <span className="mr-3 text-xs font-medium uppercase tracking-[0.2em] text-gold">Notes</span>
            {slide.notes}
          </p>
        </aside>
      )}

      <footer className="relative flex items-center justify-between gap-4 px-[clamp(1.25rem,6vw,7rem)] pb-3 pt-2 text-sm text-cream/70">
        <span className="hidden md:inline">Arrows, space or swipe to move. F fullscreen. N notes.</span>
        <div className="ml-auto flex items-center gap-3">
          <button aria-label="Previous slide" className="p-2 hover:text-gold disabled:opacity-30" disabled={index === 0} onClick={() => step(-1)}>
            <ChevronLeft size={20} />
          </button>
          <span className="tabular-nums" aria-live="polite">
            {index + 1} / {total}
          </span>
          <button aria-label="Next slide" className="p-2 hover:text-gold disabled:opacity-30" disabled={index === total - 1} onClick={() => step(1)}>
            <ChevronRight size={20} />
          </button>
          <button className="ml-2 border border-cream/30 px-3 py-1 text-xs uppercase tracking-widest hover:border-gold hover:text-gold" style={{ borderRadius: 8 }} aria-pressed={notes} onClick={() => setNotes(n => !n)}>
            Notes
          </button>
        </div>
        <div className="absolute inset-x-0 bottom-0 h-0.5 bg-cream/10">
          <div className="h-full bg-gold transition-[width] duration-300" style={{ width: `${((index + 1) / total) * 100}%` }} />
        </div>
      </footer>
    </div>
  )
}
