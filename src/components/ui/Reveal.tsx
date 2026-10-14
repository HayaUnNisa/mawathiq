import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'

export function Reveal({ children, delay = 0, className = '', y = 26 }: { children: ReactNode; delay?: number; className?: string; y?: number }) {
  return (
    <motion.div className={className} initial={{ opacity: 0, y }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }} transition={{ duration: 0.85, ease, delay }}>
      {children}
    </motion.div>
  )
}

/** Text revealed in the reading direction, like ink being written across the line. */
export function Ink({ children, delay = 0, className = '', as = 'span' }: { children: ReactNode; delay?: number; className?: string; as?: 'span' | 'div' }) {
  const { dir } = useLang()
  const from = dir === 'rtl' ? 'inset(-20% 0 -20% 100%)' : 'inset(-20% 100% -20% 0)'
  const C = as === 'div' ? motion.div : motion.span
  return (
    <C className={`${as === 'span' ? 'inline-block' : 'block'} ${className}`} initial={{ clipPath: from, opacity: 0.2 }} whileInView={{ clipPath: 'inset(-20% 0% -20% 0%)', opacity: 1 }} viewport={{ once: true, amount: 0.6 }} transition={{ duration: 1.1, ease, delay }}>
      {children}
    </C>
  )
}

/** Section heading styled like a clause in a contract: "البند 02" + ruled line drawing in. */
export function Heading({ no, kicker, title, light, center, children }: { no?: string; kicker?: string; title: string; light?: boolean; center?: boolean; children?: ReactNode }) {
  const { lang } = useLang()
  return (
    <div className={center ? 'text-center' : ''}>
      {(kicker || no) && (
        <div className={`flex items-center gap-3 ${center ? 'justify-center' : ''}`}>
          {no && <span className={`text-[13px] font-medium tracking-wide ${light ? 'text-sand-light' : 'text-sand-dark'}`}>{lang === 'ar' ? 'البند' : 'Clause'} {no}</span>}
          <motion.span className={`h-px w-14 origin-[inherit] ${light ? 'bg-sand-light/60' : 'bg-sand-dark/60'}`} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease }} style={{ transformOrigin: lang === 'ar' ? 'right' : 'left' }} />
          {kicker && <span className={`text-[13px] font-medium ${light ? 'text-sand-light' : 'text-sand-dark'}`}>{kicker}</span>}
        </div>
      )}
      <h2 className={`mt-3 text-[2rem] leading-[1.35] sm:text-[2.6rem] ${light ? 'text-linen-light' : 'text-coffee-dark'}`}>
        <Ink delay={0.1}>{title}</Ink>
      </h2>
      {children && (
        <Reveal delay={0.25} y={12} className={`mt-3 max-w-xl text-[16px] leading-[1.9] ${light ? 'text-linen/75' : 'text-coffee-soft'} ${center ? 'mx-auto' : ''}`}>{children}</Reveal>
      )}
    </div>
  )
}
