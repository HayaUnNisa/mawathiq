import { useId } from 'react'
import { useLang } from '../../i18n/LangContext'
import Mark from './Mark'

/** Round office stamp: rotating legend ring around the mark. */
export default function Seal({ className = '', spin = true, tone = 'coffee' }: { className?: string; spin?: boolean; tone?: 'coffee' | 'linen' }) {
  const { lang } = useLang()
  const id = useId().replace(/:/g, '')
  const text = lang === 'ar' ? 'مكتب مواثيق النماء للخدمات العقارية • المدينة المنورة • ' : 'MAWATHIQ AL-NAMAA • REAL ESTATE SERVICES • MADINAH • '
  const c = tone === 'coffee' ? '#5A4641' : '#F6EFE9'
  return (
    <div className={`relative aspect-square ${className}`}>
      <svg viewBox="0 0 200 200" className={`absolute inset-0 h-full w-full ${spin ? 'animate-[spin_28s_linear_infinite]' : ''}`} aria-hidden="true">
        <defs><path id={id} d="M100 100 m-78 0 a78 78 0 1 1 156 0 a78 78 0 1 1 -156 0" /></defs>
        <text direction={lang === 'ar' ? 'rtl' : 'ltr'} style={{ direction: lang === 'ar' ? 'rtl' : 'ltr' }} fill={c} fontSize={lang === 'ar' ? 15 : 11.5} letterSpacing={lang === 'ar' ? 0 : 2.6} fontFamily={lang === 'ar' ? 'IBM Plex Sans Arabic' : 'IBM Plex Sans'} fontWeight={500}>
          <textPath href={`#${id}`} startOffset={lang === 'ar' ? '100%' : '0'} textLength="486" lengthAdjust="spacing">{text}</textPath>
        </text>
      </svg>
      <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <circle cx="100" cy="100" r="96" fill="none" stroke={c} strokeWidth="2" />
        <circle cx="100" cy="100" r="62" fill="none" stroke={c} strokeWidth="1.5" strokeDasharray="2 4" />
      </svg>
      <div className="absolute inset-0 grid place-items-center" style={{ color: c }}>
        <Mark className="h-[34%] w-auto" stroke={26} />
      </div>
    </div>
  )
}
