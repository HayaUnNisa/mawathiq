import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'
import Mark from './Mark'
import { Ink } from './Reveal'

/** Page header laid out like the top of an official letter. */
export default function PageHead({ title, sub, no, children }: { title: string; sub?: string; no: string; children?: ReactNode }) {
  const { t, lang } = useLang()
  return (
    <section className="paper relative overflow-hidden bg-linen-light pb-14 pt-10 sm:pb-20 sm:pt-14">
      <Mark draw inView delay={0.2} duration={1.2} stroke={6} className="pointer-events-none absolute -bottom-10 end-6 h-[280px] w-auto text-coffee/10 sm:h-[360px]" />
      <div className="wrap relative">
        <div className="flex items-center justify-between text-[13px] text-slate-light">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2"><Link to="/" className="hover:text-coffee">{t('nav_home')}</Link><span>/</span><span className="text-coffee-dark">{title}</span></nav>
          <span dir="ltr" className="hidden font-display tracking-wider sm:inline">MWN · {no}</span>
        </div>
        <motion.div className="mt-5 h-[5px] border-y border-coffee/30" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1, ease, delay: 0.1 }} style={{ transformOrigin: lang === 'ar' ? 'right' : 'left' }} />
        <h1 className="mt-10 text-[2.6rem] leading-[1.3] text-coffee-dark sm:text-6xl sm:leading-[1.25]"><Ink delay={0.2}>{title}</Ink></h1>
        {sub && <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.7 }} className="mt-4 max-w-2xl text-[17px] leading-[1.9] text-coffee-soft">{sub}</motion.p>}
        {children}
      </div>
    </section>
  )
}
