import { motion } from 'framer-motion'
import { Eye, HeartHandshake, Scale, ShieldCheck } from 'lucide-react'
import Charter from '../components/home/Charter'
import CtaBand from '../components/home/CtaBand'
import { markPaths } from '../components/ui/Mark'
import PageHead from '../components/ui/PageHead'
import { Heading, Reveal } from '../components/ui/Reveal'
import { img } from '../data/images'
import { office } from '../data/site'
import { useLang } from '../i18n/LangContext'

const values = [
  { icon: ShieldCheck, t: { ar: 'الأمانة', en: 'Integrity' }, d: { ar: 'نحفظ حقوق المالك والمستأجر والمشتري على حد سواء.', en: 'We protect the rights of owners, tenants and buyers alike.' } },
  { icon: Eye, t: { ar: 'الشفافية', en: 'Transparency' }, d: { ar: 'أسعار واضحة وبنود مفهومة، لا مفاجآت بعد التوقيع.', en: 'Clear prices and understandable clauses — no surprises after signing.' } },
  { icon: Scale, t: { ar: 'النظامية', en: 'Compliance' }, d: { ar: 'نعمل وفق الأنظمة ونوثّق عبر المنصات المعتمدة.', en: 'We work within the regulations and document on approved platforms.' } },
  { icon: HeartHandshake, t: { ar: 'العلاقة الطويلة', en: 'Long relationships' }, d: { ar: 'عميلنا اليوم شريكنا غدًا، والمتابعة لا تنتهي بالإغلاق.', en: 'Today’s client is tomorrow’s partner; follow-up doesn’t end at closing.' } },
]

const meaning = [
  { ar: 'المبنى الأوسط، الأطول: الأمانة التي يقوم عليها كل شيء.', en: 'The tall middle building: the trust everything stands on.' },
  { ar: 'المبنى الأيسر: العقد الذي يحفظ الحق ويسنده.', en: 'The left building: the contract that supports and protects rights.' },
  { ar: 'المبنى الأيمن: النماء، استثمارك وهو يكبر معنا.', en: 'The right building: growth — your investment growing with us.' },
]

export default function About() {
  const { L, t } = useLang()
  return (
    <>
      <PageHead no="04" title={t('nav_about')} sub={L({ ar: 'مكتب عقاري من قلب المدينة المنورة، يجمع الخبرة المحلية بالتوثيق الحديث.', en: 'A real estate office from the heart of Madinah, combining local knowledge with modern documentation.' })} />

      <section className="bg-linen py-24">
        <div className="wrap grid items-center gap-14 lg:grid-cols-2">
          <Reveal>
            <div className="relative">
              <div className="absolute inset-0 translate-x-4 translate-y-4 rounded-2xl border-2 border-dashed border-coffee/25 rtl:-translate-x-4" />
              <img src={img('about')} alt="" className="relative aspect-[5/6] w-full rounded-2xl object-cover" />
            </div>
          </Reveal>
          <div>
            <Heading no="01" title={L({ ar: 'قصتنا', en: 'Our story' })} />
            <Reveal delay={0.15}>
              <div className="mt-6 space-y-4 text-[16px] leading-[2] text-coffee-soft">
                <p>{L({ ar: 'تأسس مكتب مواثيق النماء للخدمات العقارية في المدينة المنورة ليكون المرجع الذي يثق به الملّاك والباحثون عن السكن والاستثمار. اخترنا اسم «مواثيق» لأن كل تعامل عقاري هو عهد بين أطرافه، ويستحق أن يُكتب ويُوثّق ويُحترم.', en: 'Mawathiq Al-Namaa Real Estate Services was founded in Madinah to be the office that owners, home-seekers and investors can rely on. We chose the name “Mawathiq” (covenants) because every property dealing is a promise between its parties — and it deserves to be written, documented and honoured.' })}</p>
                <p>{L({ ar: 'ومن «النماء» نستمد هدفنا: أن ينمو عقارك، وأن تنمو ثقتك بنا مع كل معاملة.', en: 'From “Al-Namaa” (growth) comes our aim: for your property to grow, and for your trust in us to grow with every transaction.' })}</p>
              </div>
              <div className="mt-8 flex items-center gap-4 rounded-2xl bg-linen-light p-5 ring-1 ring-coffee/10">
                <span className="grid h-14 w-14 place-items-center rounded-full bg-coffee font-display text-xl text-linen-light">{L({ ar: 'ف', en: 'F' })}</span>
                <div>
                  <p className="font-medium text-coffee-dark">{L(office.person)}</p>
                  <p className="text-[13px] text-slate" dir="ltr" style={{ textAlign: 'start' }}>{office.phone}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* the meaning of the mark, drawn stroke by stroke with captions */}
      <section className="paper bg-linen-light py-24">
        <div className="wrap grid items-center gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div className="order-2 lg:order-1">
            <Heading no="02" title={L({ ar: 'معنى الشعار', en: 'What the mark means' })}>{L({ ar: 'ثلاثة مبانٍ متصاعدة، مرسومة بخط واحد متصل لكلٍ منها.', en: 'Three rising buildings, each drawn in a single continuous line.' })}</Heading>
            <ol className="mt-8 space-y-4">
              {meaning.map((m, i) => (
                <Reveal key={i} delay={0.2 + i * 0.35} y={10}>
                  <li className="flex items-start gap-4 border-b border-dashed border-coffee/20 pb-4">
                    <span className="mt-1 grid h-7 w-7 shrink-0 place-items-center rounded-full bg-coffee font-display text-[13px] text-linen-light">{i + 1}</span>
                    <span className="text-[16px] leading-[1.8] text-coffee-dark">{L(m)}</span>
                  </li>
                </Reveal>
              ))}
            </ol>
          </div>
          <div className="order-1 mx-auto lg:order-2">
            <motion.svg viewBox="80 40 465 690" className="h-[340px] w-auto sm:h-[460px]" initial="h" whileInView="s" viewport={{ once: true, amount: 0.5 }} aria-hidden="true">
              {[0, 1, 2].map((i) => (
                <motion.path key={i} d={markPaths[i]} fill="none" stroke="#C6AE96" strokeWidth={3} strokeDasharray="6 8" />
              ))}
              {[0, 1, 2].map((i) => (
                <motion.path key={'d' + i} d={markPaths[i]} fill="none" stroke="#5A4641" strokeWidth={16} strokeLinejoin="round" variants={{ h: { pathLength: 0 }, s: { pathLength: 1, transition: { duration: 1.2, delay: 0.2 + i * 0.35, ease: [0.65, 0, 0.35, 1] } } }} />
              ))}
            </motion.svg>
          </div>
        </div>
      </section>

      <section className="bg-linen py-24">
        <div className="wrap">
          <Heading no="03" center title={L({ ar: 'قيمنا', en: 'Our values' })} />
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={i} delay={i * 0.08}>
                <div className="group h-full rounded-2xl bg-linen-light p-7 ring-1 ring-coffee/10 transition-all duration-500 hover:-translate-y-1 hover:bg-coffee hover:ring-coffee">
                  <v.icon className="h-8 w-8 text-sand-dark transition-colors group-hover:text-sand-light" />
                  <h3 className="mt-5 text-xl text-coffee-dark transition-colors group-hover:text-linen-light">{L(v.t)}</h3>
                  <p className="mt-2 text-[15px] leading-[1.85] text-coffee-soft transition-colors group-hover:text-linen/75">{L(v.d)}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
      <Charter no="04" />
      <CtaBand />
    </>
  )
}
