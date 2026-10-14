import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import { Link } from 'react-router-dom'
import { hours, office, services } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { hourRange } from '../../lib/format'
import Brand from '../ui/Brand'
import Mark from '../ui/Mark'
import OpenBadge from '../ui/OpenBadge'
import { nav } from './Navbar'

export default function Footer() {
  const { t, L, lang } = useLang()
  return (
    <footer className="relative overflow-hidden bg-coffee-dark text-linen/80">
      {/* perforated tear-off edge */}
      <div className="perforated h-3 bg-coffee-dark" style={{ backgroundColor: 'transparent' }} />
      <Mark className="pointer-events-none absolute -bottom-24 end-[-60px] h-[520px] w-auto text-linen/[0.05]" stroke={10} />
      <div className="wrap relative grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1.3fr]">
        <div>
          <Brand light />
          <p className="mt-5 max-w-xs text-[15px] leading-[1.9]">
            {L({ ar: 'مكتب عقاري في المدينة المنورة يقدّم إدارة الأملاك والتسويق والبيع والشراء وتوثيق العقود بأمانة ووضوح.', en: 'A real estate office in Madinah offering property management, marketing, buying & selling and contract documentation with honesty and clarity.' })}
          </p>
          <OpenBadge light className="mt-6" />
        </div>
        <div>
          <h3 className="font-display text-lg text-linen-light">{L({ ar: 'روابط', en: 'Links' })}</h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            {nav.map((n) => <li key={n.to}><Link to={n.to} className="transition-colors hover:text-white">{t(n.key)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg text-linen-light">{t('nav_services')}</h3>
          <ul className="mt-5 space-y-3 text-[15px]">
            {services.map((s) => <li key={s.id}><Link to={`/services#${s.id}`} className="transition-colors hover:text-white">{L(s.title)}</Link></li>)}
          </ul>
        </div>
        <div>
          <h3 className="font-display text-lg text-linen-light">{t('nav_contact')}</h3>
          <ul className="mt-5 space-y-3.5 text-[15px]">
            <li className="flex gap-3"><Phone className="mt-1 h-4 w-4 shrink-0 text-sand" /><a href={`tel:${office.phoneIntl}`} dir="ltr" className="hover:text-white">{office.phone}</a></li>
            <li className="flex gap-3"><Mail className="mt-1 h-4 w-4 shrink-0 text-sand" /><a href={`mailto:${office.email}`} className="break-all hover:text-white">{office.email}</a></li>
            <li className="flex gap-3"><MapPin className="mt-1 h-4 w-4 shrink-0 text-sand" /><a href={office.maps} target="_blank" rel="noreferrer" className="hover:text-white">{L(office.address)}</a></li>
            <li className="flex gap-3"><Clock className="mt-1 h-4 w-4 shrink-0 text-sand" /><span>{L({ ar: `${L(hours[0].name)} – ${L(hours[4].name)}`, en: 'Sun – Thu' })}: <span className="inline-block">{hourRange(15, 22, lang)}</span></span></li>
          </ul>
        </div>
      </div>
      <div className="relative border-t border-dashed border-linen/15">
        <div className="wrap flex flex-col items-center justify-between gap-2 py-6 text-[13px] text-linen/55 sm:flex-row">
          <span>© {new Date().getFullYear()} {t('brand_full')}. {L({ ar: 'جميع الحقوق محفوظة.', en: 'All rights reserved.' })}</span>
          <span>{L({ ar: 'المدينة المنورة، المملكة العربية السعودية', en: 'Madinah, Saudi Arabia' })}</span>
        </div>
      </div>
    </footer>
  )
}
