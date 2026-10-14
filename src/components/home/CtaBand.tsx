import { MessageCircle } from 'lucide-react'
import { waLink } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { Btn } from '../ui/Button'
import { Ink, Reveal } from '../ui/Reveal'
import Seal from '../ui/Seal'

export default function CtaBand() {
  const { L, t } = useLang()
  return (
    <section className="bg-linen-light py-20">
      <div className="wrap">
        <div className="grain relative overflow-hidden rounded-[28px] bg-coffee px-6 py-14 text-center text-linen-light sm:px-14 sm:py-20 lg:text-start">
          <div className="absolute -end-16 -top-16 hidden w-72 opacity-25 lg:block"><Seal tone="linen" /></div>
          <div className="relative max-w-2xl">
            <h2 className="text-[2rem] leading-[1.35] sm:text-5xl sm:leading-[1.3]"><Ink>{L({ ar: 'لديك عقار، أو تبحث عن عقار؟', en: 'Own a property, or looking for one?' })}</Ink></h2>
            <Reveal delay={0.2}><p className="mt-4 text-[17px] leading-[1.9] text-linen/75">{L({ ar: 'اكتب لنا طلبك في دقيقة، وسنعود إليك خلال ساعات العمل.', en: 'Write your request in a minute and we’ll get back to you during working hours.' })}</p></Reveal>
            <Reveal delay={0.3} className="mt-8 flex flex-wrap justify-center gap-3 lg:justify-start">
              <Btn to="/contact" v="light" arrow>{t('request')}</Btn>
              <Btn href={waLink()} v="outline-light" icon={<MessageCircle className="h-4 w-4" />}>{t('whatsapp')}</Btn>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
