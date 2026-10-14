import { useLang } from '../../i18n/LangContext'
import { hours } from '../../data/site'
import { fmtHour } from '../../lib/format'
import { useOfficeStatus } from '../../lib/hours'

/** Live status from real working hours in Madinah time. */
export function useStatusText() {
  const s = useOfficeStatus()
  const { lang, L, t } = useLang()
  let detail: string
  if (s.open) {
    const h = Math.floor(s.minsLeft / 60), m = s.minsLeft % 60
    detail = lang === 'ar'
      ? `يغلق بعد ${h ? `${h} س ` : ''}${m} د`
      : `Closes in ${h ? `${h}h ` : ''}${m}m`
  } else {
    const day = s.nextDay === s.today ? (lang === 'ar' ? 'اليوم' : 'today') : s.nextDay === (s.today + 1) % 7 ? (lang === 'ar' ? 'غدًا' : 'tomorrow') : L(hours[s.nextDay].name)
    detail = lang === 'ar' ? `يفتح ${day} ${fmtHour(s.nextHour, lang)}` : `Opens ${day} at ${fmtHour(s.nextHour, lang)}`
  }
  return { s, label: s.open ? t('open_now') : t('closed_now'), detail }
}

export default function OpenBadge({ light, className = '' }: { light?: boolean; className?: string }) {
  const { s, label, detail } = useStatusText()
  return (
    <span className={`inline-flex items-center gap-2 text-[13px] ${light ? 'text-linen/85' : 'text-coffee-soft'} ${className}`}>
      <span className="relative flex h-2.5 w-2.5">
        {s.open && <span className="absolute inset-0 animate-ping rounded-full bg-emerald-500/60" />}
        <span className={`relative h-2.5 w-2.5 rounded-full ${s.open ? 'bg-emerald-500' : 'bg-sand-dark'}`} />
      </span>
      <b className={`font-medium ${light ? 'text-linen-light' : 'text-coffee-dark'}`}>{label}</b>
      <span className="opacity-70">·</span>
      <span>{detail}</span>
    </span>
  )
}
