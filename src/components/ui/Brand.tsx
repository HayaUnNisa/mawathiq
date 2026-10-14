import { useLang } from '../../i18n/LangContext'
import Mark from './Mark'

export default function Brand({ light, compact }: { light?: boolean; compact?: boolean }) {
  const { lang } = useLang()
  return (
    <span className={`flex items-center gap-2.5 ${light ? 'text-linen-light' : 'text-coffee'}`}>
      <Mark className={`${compact ? 'h-9' : 'h-11'} w-auto shrink-0 ${light ? 'text-sand-light' : 'text-slate'}`} stroke={20} />
      <span className="flex flex-col leading-none">
        {lang === 'ar' ? (
          <>
            <span className={`font-display font-bold ${compact ? 'text-[19px]' : 'text-[22px]'} leading-[1.15]`}>مواثيق النماء</span>
            <span className={`mt-0.5 text-[11px] leading-none ${light ? 'text-sand-light' : 'text-sand-dark'}`}>للخدمات العقارية</span>
          </>
        ) : (
          <>
            <span className={`font-display ${compact ? 'text-[16px]' : 'text-[18px]'} uppercase tracking-[0.12em]`}>Mawathiq</span>
            <span className={`mt-1 text-[10px] uppercase tracking-[0.32em] ${light ? 'text-sand-light' : 'text-sand-dark'}`}>Al-Namaa</span>
          </>
        )}
      </span>
    </span>
  )
}
