import { AnimatePresence, motion } from 'framer-motion'
import { Mail, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { office } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import type { StringKey } from '../../i18n/strings'
import { ease, easeIO } from '../../lib/motion'
import { useLenisSafe } from '../../lib/scrollLock'
import Brand from '../ui/Brand'
import { Btn } from '../ui/Button'
import OpenBadge from '../ui/OpenBadge'

export const nav: { to: string; key: StringKey }[] = [
  { to: '/', key: 'nav_home' },
  { to: '/services', key: 'nav_services' },
  { to: '/properties', key: 'nav_properties' },
  { to: '/about', key: 'nav_about' },
  { to: '/contact', key: 'nav_contact' },
]

export function LangToggle({ light }: { light?: boolean }) {
  const { lang, setLang } = useLang()
  return (
    <button
      onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
      className={`relative grid h-10 min-w-10 place-items-center rounded-full border px-3 text-[14px] font-medium transition-colors ${light ? 'border-linen/30 text-linen-light hover:bg-linen/10' : 'border-coffee/20 text-coffee hover:border-coffee'}`}
      aria-label={lang === 'ar' ? 'Switch to English' : 'التبديل إلى العربية'}
    >
      <span lang={lang === 'ar' ? 'en' : 'ar'} className={lang === 'ar' ? 'font-sans' : 'font-display text-[17px] leading-none'}>{lang === 'ar' ? 'EN' : 'ع'}</span>
    </button>
  )
}

export default function Navbar() {
  const { t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  useLenisSafe(open)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 40)
    on(); window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  useEffect(() => setOpen(false), [pathname])

  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:start-3 focus:top-3 focus:z-[200] focus:rounded-lg focus:bg-coffee focus:px-4 focus:py-2 focus:text-linen-light">{t('skip')}</a>
      {/* document-style top strip */}
      <div className="relative z-40 hidden bg-coffee text-linen-light md:block">
        <div className="wrap flex h-9 items-center justify-between text-[13px]">
          <OpenBadge light />
          <div className="flex items-center gap-5 text-linen/80">
            <a href={`tel:${office.phoneIntl}`} className="inline-flex items-center gap-1.5 hover:text-white"><Phone className="h-3.5 w-3.5" /><span dir="ltr">{office.phone}</span></a>
            <a href={`mailto:${office.email}`} className="inline-flex items-center gap-1.5 hover:text-white"><Mail className="h-3.5 w-3.5" />{office.email}</a>
          </div>
        </div>
      </div>
      <header className={`sticky top-0 z-50 transition-all duration-500 ${scrolled ? 'bg-linen-light/85 shadow-[0_1px_0_rgba(90,70,65,.12)] backdrop-blur-md' : 'bg-transparent'}`}>
        <div className={`wrap flex items-center justify-between transition-all duration-500 ${scrolled ? 'h-16' : 'h-20'}`}>
          <Link to="/" aria-label={t('brand_full')}><Brand compact={scrolled} /></Link>
          <nav className="hidden items-center gap-1 lg:flex" aria-label="Main">
            {nav.map((n) => (
              <NavLink key={n.to} to={n.to} end={n.to === '/'} className={({ isActive }) => `relative px-4 py-2 text-[15px] transition-colors ${isActive ? 'text-coffee-dark' : 'text-coffee-soft hover:text-coffee-dark'}`}>
                {({ isActive }) => (
                  <>
                    {t(n.key)}
                    {isActive && (
                      <motion.svg layoutId="nav-ink" viewBox="0 0 100 8" preserveAspectRatio="none" className="absolute inset-x-3 -bottom-0.5 h-2 w-[calc(100%-1.5rem)] text-sand-dark" transition={{ duration: 0.5, ease }}>
                        <path d="M2 5 C 25 2, 55 7, 98 3" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
                      </motion.svg>
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <LangToggle />
            <Btn to="/contact" className="hidden !px-5 !py-2.5 sm:inline-flex">{t('request')}</Btn>
            <button onClick={() => setOpen(true)} className="grid h-10 w-10 place-items-center rounded-full border border-coffee/20 text-coffee lg:hidden" aria-label="Menu"><Menu className="h-5 w-5" /></button>
          </div>
        </div>
      </header>

      {/* mobile: an index page sliding down like a file divider */}
      <AnimatePresence>
        {open && (
          <motion.div role="dialog" aria-modal="true" className="paper fixed inset-0 z-[80] flex flex-col bg-linen lg:hidden" initial={{ clipPath: 'inset(0 0 100% 0)' }} animate={{ clipPath: 'inset(0 0 0% 0)' }} exit={{ clipPath: 'inset(0 0 100% 0)' }} transition={{ duration: 0.6, ease: easeIO }}>
            <div className="wrap flex h-20 items-center justify-between">
              <Brand compact />
              <button onClick={() => setOpen(false)} className="grid h-10 w-10 place-items-center rounded-full border border-coffee/20 text-coffee" aria-label="Close"><X className="h-5 w-5" /></button>
            </div>
            <nav className="wrap mt-4 flex-1">
              {nav.map((n, i) => (
                <motion.div key={n.to} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.06, duration: 0.5, ease }} className="border-b border-dashed border-coffee/20">
                  <NavLink to={n.to} end={n.to === '/'} className={({ isActive }) => `flex items-baseline gap-4 py-4 font-display text-3xl ${isActive ? 'text-coffee-dark' : 'text-coffee-soft'}`}>
                    <span className="font-sans text-sm text-sand-dark">0{i + 1}</span>{t(n.key)}
                  </NavLink>
                </motion.div>
              ))}
            </nav>
            <div className="wrap space-y-4 pb-10">
              <OpenBadge />
              <div className="flex gap-3">
                <Btn to="/contact" className="flex-1">{t('request')}</Btn>
                <Btn href={`tel:${office.phoneIntl}`} v="ghost" icon={<Phone className="h-4 w-4" />}>{t('call')}</Btn>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
