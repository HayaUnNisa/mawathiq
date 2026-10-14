import type { Lang } from '../i18n/LangContext'
export const num = (n: number, lang: Lang) => n.toLocaleString(lang === 'ar' ? 'ar-SA-u-nu-latn' : 'en-US')
export const sar = (n: number, lang: Lang) => (lang === 'ar' ? `${num(n, lang)} ر.س` : `SAR ${num(n, lang)}`)
export const fmtHour = (h: number, lang: Lang) => {
  const h12 = h % 12 || 12
  return lang === 'ar' ? `${h12}:00 ${h < 12 ? 'ص' : 'م'}` : `${h12}:00 ${h < 12 ? 'AM' : 'PM'}`
}
export const hourRange = (a: number, b: number, lang: Lang) => `${fmtHour(a, lang)} – ${fmtHour(b, lang)}`
