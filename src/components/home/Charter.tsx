import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { office } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import Mark from '../ui/Mark'
import { Ink, Reveal } from '../ui/Reveal'
import Seal from '../ui/Seal'

export const signature = 'M8 62 C 22 18, 44 8, 40 46 S 52 84, 70 40 S 96 12, 100 44 S 118 70, 132 34 C 140 16, 160 18, 152 44 S 170 66, 196 30 C 204 20, 214 22, 210 40 S 228 56, 262 26 M 40 74 C 110 66, 190 64, 276 56'

const clauses = [
  { ar: 'الوضوح: نشرح لك كل بند قبل أن توقّع، دون رسوم خفية.', en: 'Clarity: we explain every clause before you sign, with no hidden fees.' },
  { ar: 'الأمانة: نتعامل مع عقارك وأموالك كأمانة نُسأل عنها.', en: 'Trust: we treat your property and money as a trust we answer for.' },
  { ar: 'التوثيق: كل اتفاق مكتوب وموثّق عبر المنصات المعتمدة.', en: 'Documentation: every agreement is written and documented on approved platforms.' },
  { ar: 'المتابعة: نبقى معك بعد التوقيع، لا ينتهي دورنا عند الإغلاق.', en: 'Follow-through: we stay with you after signing; our role doesn’t end at closing.' },
]

/** "Our charter": a letterhead page whose signature is written by your scroll, then stamped. */
export default function Charter({ no = '02' }: { no?: string }) {
  const { L, lang } = useLang()
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.75'] })
  const len = useTransform(scrollYProgress, [0.45, 0.9], [0, 1])
  const [stamped, setStamped] = useState(false)
  useMotionValueEvent(scrollYProgress, 'change', (v) => setStamped(v > 0.92))

  return (
    <section className="relative overflow-hidden bg-coffee py-24 sm:py-32">
      <Mark className="pointer-events-none absolute -top-20 start-[-80px] h-[600px] w-auto text-linen/[0.04]" stroke={8} />
      <div className="wrap relative">
        <div className="mx-auto max-w-2xl text-center text-linen-light">
          <p className="text-[13px] font-medium tracking-wide text-sand-light">{lang === 'ar' ? 'البند' : 'Clause'} {no}</p>
          <h2 className="mt-3 text-[2rem] leading-[1.35] sm:text-[2.6rem]"><Ink>{L({ ar: 'ميثاقنا معك', en: 'Our charter with you' })}</Ink></h2>
          <p className="mt-3 text-[16px] leading-[1.9] text-linen/70">{L({ ar: '«مواثيق» تعني العهود. هذه عهودنا لكل عميل، مكتوبة وموقّعة.', en: '“Mawathiq” means covenants. These are ours to every client — written and signed.' })}</p>
        </div>

        <div ref={ref} className="relative mx-auto mt-14 max-w-3xl">
          <div className="absolute inset-0 translate-y-4 rotate-[1.8deg] rounded-md bg-sand-light/80" />
          <div className="absolute inset-0 translate-y-2 -rotate-[1.2deg] rounded-md bg-linen/90" />
          <div className="paper relative rounded-md bg-linen-light px-6 py-10 shadow-[0_40px_80px_-30px_rgba(0,0,0,.5)] sm:px-14 sm:py-14">
            {/* letterhead */}
            <div className="flex items-center justify-between gap-4 border-b-[3px] border-double border-coffee/30 pb-5">
              <div className="flex items-center gap-3 text-coffee">
                <Mark className="h-12 w-auto text-slate" stroke={18} />
                <div className="leading-tight">
                  <p className="font-display text-lg">{L({ ar: 'مكتب مواثيق النماء', en: 'Mawathiq Al-Namaa' })}</p>
                  <p className="text-[12px] text-sand-dark">{L({ ar: 'للخدمات العقارية', en: 'Real Estate Services' })}</p>
                </div>
              </div>
              <p className="text-end text-[12px] leading-5 text-slate-light">{L({ ar: 'المدينة المنورة', en: 'Madinah' })}<br /><span dir="ltr">{office.phone}</span></p>
            </div>
            <ol className="mt-8 space-y-5">
              {clauses.map((c, i) => {
                const [head, rest] = L(c).split(':')
                return (
                  <Reveal key={i} delay={i * 0.12} y={10}>
                    <li className="flex gap-4">
                      <span className="mt-1 font-display text-[15px] text-sand-dark">{lang === 'ar' ? ['أولًا', 'ثانيًا', 'ثالثًا', 'رابعًا'][i] : ['I.', 'II.', 'III.', 'IV.'][i]}</span>
                      <p className="flex-1 border-b border-dotted border-coffee/25 pb-4 text-[16px] leading-[1.9] text-coffee-soft"><b className="font-medium text-coffee-dark">{head}:</b>{rest}</p>
                    </li>
                  </Reveal>
                )
              })}
            </ol>
            <div className="mt-10 flex items-end justify-between gap-6">
              <div className="w-56 sm:w-72">
                <svg viewBox="0 0 284 86" className="h-20 w-full text-coffee-dark" aria-hidden="true" style={{ transform: lang === 'ar' ? 'scaleX(-1)' : undefined }}>
                  <motion.path d={signature} fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" style={{ pathLength: len }} />
                </svg>
                <div className="h-px bg-coffee/30" />
                <p className="mt-2 text-[14px] font-medium text-coffee-dark">{L(office.person)}</p>
                <p className="text-[12px] text-slate-light">{L(office.role)}</p>
              </div>
              <motion.div className="w-28 sm:w-36" initial={false} animate={stamped ? { opacity: 0.92, scale: 1, rotate: -12 } : { opacity: 0, scale: 1.8, rotate: -35 }} transition={{ duration: 0.35, ease: 'easeOut' }}>
                <Seal spin={false} />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
