import { AnimatePresence, motion } from 'framer-motion'
import { FileSignature, Handshake, KeyRound, Megaphone, Plus } from 'lucide-react'
import { useState } from 'react'
import { services, type ServiceId } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { ease } from '../../lib/motion'
import { Btn } from '../ui/Button'
import { Heading, Reveal } from '../ui/Reveal'

export const serviceIcon: Record<ServiceId, typeof KeyRound> = { management: KeyRound, marketing: Megaphone, trade: Handshake, contracts: FileSignature }

/**
 * Services as rolled documents: each brown bar (straight from the flyer) is the rod of a scroll.
 * Opening one unrolls the paper beneath it, with a curled paper edge riding the bottom.
 */
export default function ServiceScrolls() {
  const { L, t } = useLang()
  const [open, setOpen] = useState<ServiceId>('management')
  return (
    <section className="relative bg-linen py-24 sm:py-28">
      <div className="wrap grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
        <div className="lg:sticky lg:top-28 lg:self-start">
          <Heading no="01" title={L({ ar: 'خدماتنا', en: 'Our services' })}>
            {L({ ar: 'أربع خدمات متكاملة تغطي رحلة العقار كاملة، من أول معاينة حتى آخر توقيع. افتح كل وثيقة لترى كيف نعمل.', en: 'Four connected services covering the whole life of a property, from the first viewing to the final signature. Open each document to see how we work.' })}
          </Heading>
          <Reveal delay={0.3} className="mt-8"><Btn to="/services" v="ghost" arrow>{t('more')}</Btn></Reveal>
        </div>
        <div className="space-y-4">
          {services.map((s, i) => {
            const Icon = serviceIcon[s.id]
            const isOpen = open === s.id
            return (
              <Reveal key={s.id} delay={i * 0.06}>
                <div className="relative">
                  <button
                    onClick={() => setOpen(isOpen ? ('' as ServiceId) : s.id)}
                    aria-expanded={isOpen}
                    className="relative z-10 flex w-full items-center gap-4 rounded-[10px] bg-coffee px-5 py-4 text-start text-linen-light shadow-[0_8px_20px_-8px_rgba(58,45,41,.6)] transition-colors hover:bg-coffee-dark sm:px-6"
                  >
                    <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-linen-light/10 ring-1 ring-linen/20"><Icon className="h-5 w-5" /></span>
                    <span className="flex-1">
                      <span className="block text-[12px] text-sand-light">{s.no}</span>
                      <span className="block font-display text-[19px] sm:text-xl">{L(s.title)}</span>
                    </span>
                    <motion.span animate={{ rotate: isOpen ? 45 : 0 }} transition={{ duration: 0.4, ease }}><Plus className="h-5 w-5" /></motion.span>
                    {/* rod caps */}
                    <span className="absolute -start-1.5 top-1/2 h-7 w-3 -translate-y-1/2 rounded-full bg-coffee-deep" />
                    <span className="absolute -end-1.5 top-1/2 h-7 w-3 -translate-y-1/2 rounded-full bg-coffee-deep" />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div key="paper" initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} transition={{ duration: 0.7, ease }} className="relative mx-3 -mt-2 overflow-hidden">
                        <div className="paper relative bg-linen-light px-6 pb-10 pt-8 shadow-inner sm:px-8">
                          <p className="text-[16px] leading-[1.95] text-coffee-soft">{L(s.body)}</p>
                          <ol className="relative mt-6 grid gap-4 sm:grid-cols-2">
                            {s.steps.map((st, j) => (
                              <motion.li key={j} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + j * 0.08 }} className="flex items-start gap-3">
                                <span className="grid h-7 w-7 shrink-0 place-items-center rounded-full border border-dashed border-coffee/40 font-display text-[13px] text-coffee">{j + 1}</span>
                                <span className="pt-0.5 text-[15px] text-coffee-dark">{L(st)}</span>
                              </motion.li>
                            ))}
                          </ol>
                        </div>
                        {/* curled paper edge */}
                        <div className="absolute inset-x-0 bottom-0 h-4 rounded-b-[50%] bg-gradient-to-b from-sand-light to-sand shadow-[0_6px_10px_-4px_rgba(58,45,41,.4)]" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
