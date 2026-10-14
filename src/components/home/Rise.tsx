import { motion } from 'framer-motion'
import { MessageCircle, Search, Stamp } from 'lucide-react'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'
import { Heading } from '../ui/Reveal'

const steps = [
  { icon: MessageCircle, h: 0.46, t: { ar: 'تواصل معنا', en: 'Reach out' }, d: { ar: 'اتصال أو واتساب أو زيارة للمكتب، ونسمع احتياجك كاملًا.', en: 'Call, WhatsApp or visit the office, and we listen to exactly what you need.' } },
  { icon: Search, h: 0.7, t: { ar: 'دراسة ومعاينة', en: 'Study & inspect' }, d: { ar: 'نعاين العقار وندرس السوق ونقترح الطريق الأنسب لك.', en: 'We inspect the property, study the market and propose the best route for you.' } },
  { icon: Stamp, h: 1, t: { ar: 'إنجاز وتوثيق', en: 'Deliver & document' }, d: { ar: 'ننفّذ ونوثّق كل خطوة، ونسلّمك ما يثبت حقك.', en: 'We carry it out, document every step, and hand you proof of your rights.' } },
]

/** "Al-Namaa" means growth: three steps rise like the three buildings of the mark. */
export default function Rise() {
  const { L, lang } = useLang()
  return (
    <section className="paper relative bg-linen-light py-24 sm:py-28">
      <div className="wrap">
        <Heading no="03" title={L({ ar: 'كيف نعمل', en: 'How we work' })} center>
          {L({ ar: 'ثلاث خطوات تنمو معك، كما تنمو المباني الثلاثة في شعارنا.', en: 'Three steps that grow with you, like the three buildings in our mark.' })}
        </Heading>
        <div className="mt-16 grid items-end gap-6 md:grid-cols-3 md:gap-8">
          {steps.map((s, i) => (
            <motion.div key={i} initial="h" whileInView="s" viewport={{ once: true, amount: 0.3 }} className="flex flex-col">
              <motion.div variants={{ h: { opacity: 0, y: 16 }, s: { opacity: 1, y: 0, transition: { delay: 0.5 + i * 0.25, duration: 0.6 } } }} className="mb-5">
                <p className="font-display text-[13px] text-sand-dark">{lang === 'ar' ? `الخطوة ${i + 1}` : `Step ${i + 1}`}</p>
                <h3 className="mt-1 text-2xl text-coffee-dark">{L(s.t)}</h3>
                <p className="mt-2 text-[15px] leading-[1.85] text-coffee-soft">{L(s.d)}</p>
              </motion.div>
              <div className="relative h-[120px] md:h-[300px]">
                <motion.div
                  variants={{ h: { scaleY: 0 }, s: { scaleY: 1, transition: { duration: 1.1, ease, delay: i * 0.25 } } }}
                  style={{ height: `${s.h * 100}%`, transformOrigin: 'bottom' }}
                  className="absolute inset-x-0 bottom-0 overflow-hidden rounded-t-[18px] bg-gradient-to-b from-coffee to-coffee-dark md:rounded-t-[28px]"
                >
                  <div className="absolute inset-0 bg-[repeating-linear-gradient(90deg,transparent_0,transparent_22px,rgba(246,239,233,.07)_22px,rgba(246,239,233,.07)_24px)]" />
                  <s.icon className="absolute start-5 top-5 h-6 w-6 text-sand-light" />
                  <span className="absolute bottom-3 end-5 font-display text-6xl text-linen/15 md:text-8xl">{i + 1}</span>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="h-2 rounded-full bg-coffee-deep" />
      </div>
    </section>
  )
}
