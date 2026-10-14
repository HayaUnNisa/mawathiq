import { AnimatePresence, motion } from 'framer-motion'
import { Check, ChevronDown } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import CtaBand from '../components/home/CtaBand'
import { serviceIcon } from '../components/home/ServiceScrolls'
import { Btn } from '../components/ui/Button'
import PageHead from '../components/ui/PageHead'
import { Heading, Reveal } from '../components/ui/Reveal'
import { faqs, services, waLink } from '../data/site'
import { useLang } from '../i18n/LangContext'
import { ease } from '../lib/motion'

export default function Services() {
  const { L, t } = useLang()
  const { hash } = useLocation()
  const [faq, setFaq] = useState<number | null>(0)
  useEffect(() => {
    if (!hash) return
    const id = setTimeout(() => document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 900)
    return () => clearTimeout(id)
  }, [hash])

  return (
    <>
      <PageHead no="02" title={t('nav_services')} sub={L({ ar: 'من إدارة أملاكك إلى توثيق عقودك: كل خدمة نقدّمها لها خطوات واضحة، ومسؤول يتابعها معك حتى النهاية.', en: 'From managing your property to documenting your contracts: every service has clear steps and someone who follows it through with you.' })} />

      <div className="bg-linen">
        {services.map((s, i) => {
          const Icon = serviceIcon[s.id]
          return (
            <section key={s.id} id={s.id} className={`scroll-mt-24 py-20 sm:py-24 ${i % 2 ? 'paper bg-linen-light' : ''}`}>
              <div className="wrap grid gap-10 lg:grid-cols-[auto_1fr_1fr] lg:gap-14">
                <Reveal className="lg:sticky lg:top-28 lg:self-start">
                  <div className="relative grid h-28 w-28 place-items-center rounded-full bg-coffee text-linen-light">
                    <Icon className="h-10 w-10" />
                    <span className="absolute -end-2 -top-2 grid h-10 w-10 place-items-center rounded-full bg-sand font-display text-[15px] text-coffee-dark ring-4 ring-linen">{s.no}</span>
                  </div>
                </Reveal>
                <div>
                  <Heading title={L(s.title)}>{L(s.body)}</Heading>
                  <Reveal delay={0.2}>
                    <ul className="mt-6 space-y-3">
                      {s.points.map((p, j) => (
                        <li key={j} className="flex items-start gap-3 text-[15px] text-coffee-dark"><span className="mt-1 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-coffee/10 text-coffee"><Check className="h-3 w-3" /></span>{L(p)}</li>
                      ))}
                    </ul>
                    <Btn href={waLink(L({ ar: `السلام عليكم، أرغب في خدمة: ${s.title.ar}`, en: `Hello, I'm interested in: ${s.title.en}` }))} className="mt-8" arrow>{t('request')}</Btn>
                  </Reveal>
                </div>
                {/* steps as a stamped ledger */}
                <Reveal delay={0.15}>
                  <div className="paper rounded-2xl bg-linen-light p-6 ring-1 ring-coffee/10 sm:p-8">
                    <p className="font-display text-lg text-coffee">{L({ ar: 'خطوات الخدمة', en: 'How it works' })}</p>
                    <ol className="relative mt-6 space-y-6 before:absolute before:inset-y-2 before:start-[15px] before:border-s-2 before:border-dashed before:border-coffee/20">
                      {s.steps.map((st, j) => (
                        <motion.li key={j} className="relative flex items-start gap-4" initial={{ opacity: 0, x: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.8 }} transition={{ delay: j * 0.12, duration: 0.6, ease }}>
                          <span className="relative z-10 grid h-8 w-8 shrink-0 place-items-center rounded-full bg-coffee font-display text-[14px] text-linen-light ring-4 ring-linen-light">{j + 1}</span>
                          <span className="pt-1 text-[15px] text-coffee-dark">{L(st)}</span>
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                </Reveal>
              </div>
            </section>
          )
        })}
      </div>

      <section className="paper bg-linen-light py-24">
        <div className="wrap max-w-3xl">
          <Heading center title={L({ ar: 'أسئلة شائعة', en: 'Common questions' })} />
          <div className="mt-10 divide-y divide-dashed divide-coffee/20 border-y border-dashed border-coffee/20">
            {faqs.map((f, i) => (
              <div key={i}>
                <button onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i} className="flex w-full items-center justify-between gap-4 py-5 text-start">
                  <span className="font-display text-[18px] text-coffee-dark">{L(f.q)}</span>
                  <motion.span animate={{ rotate: faq === i ? 180 : 0 }}><ChevronDown className="h-5 w-5 text-coffee" /></motion.span>
                </button>
                <AnimatePresence initial={false}>
                  {faq === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.45, ease }} className="overflow-hidden">
                      <p className="pb-6 text-[15px] leading-[1.9] text-coffee-soft">{L(f.a)}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
      <CtaBand />
    </>
  )
}
