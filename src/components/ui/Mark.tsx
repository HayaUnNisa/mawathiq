import { motion } from 'framer-motion'

// The office mark: three rising buildings, redrawn as three single strokes so it can "draw itself".
export const markPaths = [
  'M190 722 V262 Q190 210 236 186 L450 66 V722',
  'M110 722 V312 L282 366 Q340 388 340 452 V722',
  'M290 722 V610 Q290 560 338 548 L515 494 V722',
]

type Props = { className?: string; draw?: boolean; delay?: number; duration?: number; stroke?: number; inView?: boolean }

export default function Mark({ className = '', draw = false, delay = 0, duration = 1.6, stroke = 16, inView = false }: Props) {
  const anim = (i: number) =>
    draw
      ? {
          initial: { pathLength: 0, opacity: 0 },
          ...(inView ? { whileInView: { pathLength: 1, opacity: 1 }, viewport: { once: true, amount: 0.4 } } : { animate: { pathLength: 1, opacity: 1 } }),
          transition: { pathLength: { duration, delay: delay + i * 0.35, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.01, delay: delay + i * 0.35 } },
        }
      : {}
  return (
    <svg viewBox="80 40 465 690" className={className} aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinejoin="round">
        {markPaths.map((d, i) => (
          <motion.path key={i} d={d} {...anim(i)} />
        ))}
      </g>
    </svg>
  )
}
