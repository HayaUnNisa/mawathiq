import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { Check, MapPin, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { services, waLink } from '../../data/site'
import { img } from '../../data/images'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'
import { Btn } from '../ui/Button'
import Mark from '../ui/Mark'
import OpenBadge from '../ui/OpenBadge'
import Seal from '../ui/Seal'

export default function Hero() {
  const { t, L, lang, dir } = useLang()
  const mx = useMotionValue(0), my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 })
  const from = dir === 'rtl' ? 'inset(-10% 0 -10% 100%)' : 'inset(-10% 100% -10% 0)'
  const line = (text: string, d: number, cls = '') => (
    <motion.span className={`block ${cls}`} initial={{ clipPath: from }} animate={{ clipPath: 'inset(-10% 0% -10% 0%)' }} transition={{ duration: 1.2, ease, delay: d }}>{text}</motion.span>
  )

  return (
    <section className="paper relative overflow-hidden bg-linen-light">
      {/* ruled lines like letter paper */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[repeating-linear-gradient(to_bottom,transparent_0,transparent_47px,rgba(90,70,65,.06)_47px,rgba(90,70,65,.06)_48px)]" />
      <div className="wrap relative grid items-center gap-14 pb-16 pt-8 lg:min-h-[calc(100vh-116px)] lg:grid-cols-[1.08fr_1fr] lg:pb-24">
        <div>
          <motion.p initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="inline-flex items-center gap-2 rounded-full border border-coffee/15 bg-white/50 px-4 py-1.5 text-[13px] text-coffee-soft">
            <MapPin className="h-3.5 w-3.5 text-sand-dark" />{L({ ar: 'المدينة المنورة · حي الجمعة', en: 'Madinah · Al Jumuah' })}
          </motion.p>
          <h1 className={`mt-6 text-[2.6rem] leading-[1.3] text-coffee-dark sm:text-6xl ${lang === 'ar' ? 'sm:leading-[1.35]' : 'sm:leading-[1.08]'}`}>
            {line(L({ ar: 'عقارك في أيدٍ أمينة،', en: 'Your property in trusted hands,' }), 0.3)}
            {line(L({ ar: 'وعقودك موثّقة.', en: 'your contracts documented.' }), 0.75, 'text-sand-dark')}
          </h1>
          <motion.p initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1, duration: 0.8, ease }} className="mt-6 max-w-lg text-[17px] leading-[1.95] text-coffee-soft">
            {L({ ar: 'مكتب مواثيق النماء للخدمات العقارية — نُدير أملاكك، ونسوّق عقارك، ونرافقك في البيع والشراء، ونصيغ عقودك ونوثّقها بوضوح يحفظ حق الجميع.', en: 'Mawathiq Al-Namaa Real Estate Services — we manage your property, market it, guide you through buying and selling, and draft and document your contracts with clarity that protects everyone.' })}
          </motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.25, duration: 0.8, ease }} className="mt-8 flex flex-wrap gap-3">
            <Btn to="/contact" arrow>{t('request')}</Btn>
            <Btn href={waLink(L({ ar: 'السلام عليكم، أرغب في الاستفسار عن خدماتكم.', en: 'Hello, I would like to ask about your services.' }))} v="ghost" icon={<MessageCircle className="h-4 w-4" />}>{t('whatsapp')}</Btn>
          </motion.div>
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }} className="mt-8 border-t border-dashed border-coffee/20 pt-5">
            <OpenBadge />
          </motion.div>
        </div>

        {/* the "deed": photo with a folded corner, the mark drawing itself, and the seal */}
        <div
          className="relative mx-auto w-full max-w-[520px] [perspective:1400px]"
          onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5) }}
          onMouseLeave={() => { mx.set(0); my.set(0) }}
        >
          <motion.div style={{ rotateX: rx, rotateY: ry }} initial={{ opacity: 0, y: 40, rotate: dir === 'rtl' ? -3 : 3 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ duration: 1.1, ease, delay: 0.3 }} className="relative">
            {/* sheets behind */}
            <div className="absolute inset-0 translate-x-3 translate-y-3 rotate-[2.5deg] rounded-[6px] bg-sand-light shadow-sm" />
            <div className="absolute inset-0 -translate-x-2 translate-y-1.5 -rotate-[1.5deg] rounded-[6px] bg-linen shadow-sm" />
            <div className="relative overflow-hidden rounded-[6px] bg-coffee shadow-[0_30px_80px_-20px_rgba(58,45,41,.45)] [clip-path:polygon(0_0,calc(100%-56px)_0,100%_56px,100%_100%,0_100%)] rtl:[clip-path:polygon(56px_0,100%_0,100%_100%,0_100%,0_56px)]">
              <img src={img('hero')} alt="" className="aspect-[4/5] w-full object-cover opacity-90 mix-blend-luminosity" />
              <div className="absolute inset-0 bg-gradient-to-t from-coffee-deep/85 via-coffee/20 to-transparent" />
              <Mark draw delay={1} duration={1.3} stroke={10} className="absolute bottom-[18%] start-8 h-[42%] w-auto text-linen-light" />
              <div className="absolute inset-x-8 bottom-7 flex items-end justify-between text-linen-light">
                <div>
                  <p className="font-display text-2xl">{t('brand')}</p>
                  <p className="text-[13px] text-linen/70">{t('brand_sub')} · {t('madinah')}</p>
                </div>
              </div>
              {/* folded corner */}
              <div className="absolute end-0 top-0 h-14 w-14 bg-gradient-to-bl from-linen to-sand-light shadow-[-4px_4px_10px_rgba(0,0,0,.2)] [clip-path:polygon(0_0,0_100%,100%_100%)] rtl:[clip-path:polygon(100%_0,100%_100%,0_100%)]" />
            </div>
            {/* documented chip */}
            <motion.div initial={{ opacity: 0, x: dir === 'rtl' ? 30 : -30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 2.1, duration: 0.8, ease }} className="absolute start-3 top-[22%] w-48 rounded-xl sm:w-56 bg-linen-light p-4 shadow-[0_18px_40px_-12px_rgba(58,45,41,.35)] ring-1 ring-coffee/10 sm:-start-12">
              <p className="flex items-center gap-2 text-[13px] font-medium text-coffee-dark"><span className="grid h-5 w-5 place-items-center rounded-full bg-emerald-600 text-white"><Check className="h-3 w-3" /></span>{L({ ar: 'عقد إيجار موثّق', en: 'Lease documented' })}</p>
              <svg viewBox="0 0 200 40" className="mt-2 h-8 w-full text-coffee" aria-hidden="true">
                <motion.path d="M6 28 C 20 6, 34 6, 30 26 S 46 38, 58 18 S 80 6, 86 24 S 104 34, 116 16 C 124 6, 138 10, 132 24 S 150 30, 190 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ delay: 2.6, duration: 1.4, ease: 'easeInOut' }} />
              </svg>
              <div className="mt-1 h-px bg-coffee/15" />
              <p className="mt-1.5 text-[11px] text-slate-light">{L({ ar: 'توقيع الأطراف', en: 'Signed by both parties' })}</p>
            </motion.div>
            <motion.div initial={{ opacity: 0, scale: 2, rotate: -40 }} animate={{ opacity: 1, scale: 1, rotate: -10 }} transition={{ delay: 2.4, duration: 0.5, ease: 'easeOut' }} className="absolute -bottom-10 -end-4 w-32 rounded-full bg-linen-light/90 p-1 shadow-lg backdrop-blur sm:-end-10 sm:w-36">
              <Seal />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* service index: like tabs of a file divider */}
      <div className="relative border-t border-coffee/10 bg-linen/60">
        <div className="wrap grid grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <motion.div key={s.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + i * 0.08, duration: 0.6, ease }}>
              <Link to={`/services#${s.id}`} className={`group relative block px-1 py-5 sm:px-5 ${i ? 'lg:border-s lg:border-dashed lg:border-coffee/15' : ''}`}>
                <span className="text-[12px] text-sand-dark">{s.no}</span>
                <span className="mt-1 block font-display text-[17px] text-coffee-dark sm:text-lg">{L(s.title)}</span>
                <span className="absolute inset-x-1 bottom-3 h-px origin-[var(--o)] scale-x-0 bg-coffee transition-transform duration-500 group-hover:scale-x-100 sm:inset-x-5" style={{ ['--o' as string]: dir === 'rtl' ? 'right' : 'left' }} />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
