import { motion } from 'framer-motion'
import { Check, Copy, Navigation, Phone } from 'lucide-react'
import { useState } from 'react'
import { hours, office } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { hourRange } from '../../lib/format'
import { madinahNow } from '../../lib/hours'
import { Btn } from '../ui/Button'
import { useStatusText } from '../ui/OpenBadge'
import { Heading, Reveal } from '../ui/Reveal'

/** Today's 24h ruler with the open window shaded and a live "now" marker (Madinah time). */
export function DayRuler() {
  const { lang, dir } = useLang()
  const { minutes } = madinahNow()
  const pos = (m: number) => `${(m / 1440) * 100}%`
  const side = dir === 'rtl' ? 'right' : 'left'
  return (
    <div className="mt-8">
      <div className="relative h-12 rounded-lg bg-linen ring-1 ring-coffee/10">
        <motion.div className="absolute inset-y-1.5 rounded-md bg-coffee/85" style={{ [side]: pos(15 * 60), width: pos(7 * 60), transformOrigin: side }} initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} />
        <span className="absolute inset-y-0 grid place-items-center text-[12px] text-linen-light" style={{ [side]: pos(15 * 60), width: pos(7 * 60) }}>{hourRange(15, 22, lang)}</span>
        <motion.div className="absolute -inset-y-2 w-0.5 rounded bg-emerald-600" style={{ [side]: pos(minutes) }} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1 }}>
          <span className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-emerald-600 ring-4 ring-emerald-600/20" />
        </motion.div>
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-slate-light" dir={dir}>
        {[0, 6, 12, 18, 24].map((h) => <span key={h}>{h === 24 ? '24' : String(h).padStart(2, '0')}:00</span>)}
      </div>
    </div>
  )
}

export function WeekList() {
  const { L, lang, t } = useLang()
  const { day } = madinahNow()
  return (
    <ul className="divide-y divide-dashed divide-coffee/15">
      {hours.map((h) => (
        <li key={h.day} className={`flex items-center justify-between py-3 text-[15px] ${h.day === day ? 'font-medium text-coffee-dark' : 'text-coffee-soft'}`}>
          <span className="flex items-center gap-2">{h.day === day && <span className="h-1.5 w-1.5 rounded-full bg-coffee" />}{L(h.name)}{h.day === day && <span className="text-[12px] text-sand-dark">({L({ ar: 'اليوم', en: 'today' })})</span>}</span>
          <span>{h.open ? hourRange(h.open[0], h.open[1], lang) : <span className="text-sand-dark">{L({ ar: 'مغلق', en: 'Closed' })}</span>}</span>
        </li>
      ))}
      <li className="sr-only">{t('madinah')}</li>
    </ul>
  )
}

/** Illustrative map card (a real embedded map can be added after approval). */
export function MapCard() {
  const { L } = useLang()
  const [copied, setCopied] = useState(false)
  const copy = () => { navigator.clipboard?.writeText(office.plus).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) }).catch(() => {}) }
  return (
    <div className="relative overflow-hidden rounded-2xl bg-sand-light ring-1 ring-coffee/10">
      <svg viewBox="0 0 600 420" className="h-[320px] w-full sm:h-[380px]" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <rect width="600" height="420" fill="#D9C8B8" />
        {[...Array(9)].map((_, i) => <path key={'h' + i} d={`M0 ${30 + i * 50} L600 ${10 + i * 52}`} stroke="#EADDD5" strokeWidth="6" />)}
        {[...Array(12)].map((_, i) => <path key={'v' + i} d={`M${20 + i * 52} 0 L${40 + i * 50} 420`} stroke="#EADDD5" strokeWidth="6" />)}
        {[...Array(20)].map((_, i) => <rect key={'b' + i} x={(i * 97) % 560 + 10} y={(i * 61) % 380 + 12} width="30" height="22" rx="3" fill="#C6AE96" opacity=".6" />)}
        <path d="M-10 250 C 150 230, 300 200, 610 150" stroke="#F6EFE9" strokeWidth="22" fill="none" />
        <path d="M-10 250 C 150 230, 300 200, 610 150" stroke="#C6AE96" strokeWidth="1.5" strokeDasharray="10 10" fill="none" />
        <path d="M330 -10 C 320 120, 300 300, 310 430" stroke="#F6EFE9" strokeWidth="14" fill="none" />
      </svg>
      <span className="absolute start-6 top-[44%] rotate-[-6deg] rounded bg-linen-light/80 px-2 py-0.5 text-[11px] text-coffee-soft">{L({ ar: 'شارع الإمام أحمد بن حنبل', en: 'Imam Ahmad bin Hanbal St' })}</span>
      {/* pin */}
      <div className="absolute left-[52%] top-[40%] -translate-x-1/2 -translate-y-full">
        <span className="absolute left-1/2 top-full h-6 w-6 -translate-x-1/2 -translate-y-1/2 animate-ping rounded-full bg-coffee/30" />
        <motion.div initial={{ y: -40, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ once: true }} transition={{ type: 'spring', stiffness: 300, damping: 14, delay: 0.3 }} className="flex flex-col items-center">
          <span className="rounded-full bg-coffee px-3 py-1.5 text-[12px] text-linen-light shadow-lg">{L({ ar: 'مواثيق النماء', en: 'Mawathiq Al-Namaa' })}</span>
          <span className="h-3 w-0.5 bg-coffee" />
        </motion.div>
      </div>
      <div className="absolute inset-x-3 bottom-3 flex flex-wrap items-center gap-2 rounded-xl bg-linen-light/95 p-3 shadow-lg backdrop-blur sm:inset-x-4 sm:bottom-4">
        <button onClick={copy} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-coffee/30 px-3 py-2 text-[13px] text-coffee-dark hover:bg-white" dir="ltr">
          {copied ? <Check className="h-3.5 w-3.5 text-emerald-600" /> : <Copy className="h-3.5 w-3.5" />}{office.plus}
        </button>
        <Btn href={office.maps} className="ms-auto !px-4 !py-2 !text-[14px]" icon={<Navigation className="h-4 w-4" />}>{L({ ar: 'الاتجاهات', en: 'Directions' })}</Btn>
      </div>
      <span className="absolute end-3 top-3 rounded-full bg-linen-light/80 px-2.5 py-1 text-[11px] text-slate">{L({ ar: 'خريطة توضيحية', en: 'Illustrative map' })}</span>
    </div>
  )
}

export default function HoursMap() {
  const { L, t } = useLang()
  const { s, label, detail } = useStatusText()
  return (
    <section className="relative bg-linen py-24 sm:py-28">
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:gap-16">
        <div>
          <Heading no="05" title={L({ ar: 'زورونا في المكتب', en: 'Visit the office' })}>{L(office.address)}</Heading>
          <Reveal delay={0.2} className="mt-8 rounded-2xl bg-linen-light p-6 ring-1 ring-coffee/10 sm:p-7">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <p className={`font-display text-2xl ${s.open ? 'text-emerald-700' : 'text-coffee'}`}>{label}</p>
              <p className="text-[14px] text-coffee-soft">{detail}</p>
            </div>
            <p className="mt-1 text-[12px] text-slate-light">{L({ ar: 'بتوقيت المدينة المنورة', en: 'Madinah time' })}</p>
            <DayRuler />
            <div className="mt-6"><WeekList /></div>
            <Btn href={`tel:${office.phoneIntl}`} v="ghost" className="mt-6" icon={<Phone className="h-4 w-4" />}>{t('call')} · <span dir="ltr">{office.phone}</span></Btn>
          </Reveal>
        </div>
        <Reveal delay={0.15} className="lg:pt-28"><MapCard /></Reveal>
      </div>
    </section>
  )
}
