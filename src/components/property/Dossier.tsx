import { AnimatePresence, motion } from 'framer-motion'
import { Bath, BedDouble, Hash, MapPin, MessageCircle, Phone, Ruler, Tag, X } from 'lucide-react'
import { useEffect } from 'react'
import { img } from '../../data/images'
import { office, types, waLink, type Property } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { num } from '../../lib/format'
import { easeIO } from '../../lib/motion'
import { useLenisSafe } from '../../lib/scrollLock'
import { Btn } from '../ui/Button'
import Mark from '../ui/Mark'
import { PurposeStamp, priceText } from './FolderCard'

/** Opening a property file: the brown folder cover swings open on its spine to reveal the dossier. */
export default function Dossier({ p, onClose }: { p: Property | null; onClose: () => void }) {
  const { L, lang, dir, t } = useLang()
  useLenisSafe(!!p)
  useEffect(() => {
    const k = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', k)
    return () => window.removeEventListener('keydown', k)
  }, [onClose])
  const type = p ? types.find((x) => x.id === p.type)! : null
  const specs = p ? [
    { icon: Hash, k: { ar: 'رقم الملف', en: 'File no.' }, v: p.ref },
    { icon: Tag, k: { ar: 'النوع', en: 'Type' }, v: L(type!.label) },
    { icon: Ruler, k: { ar: 'المساحة', en: 'Area' }, v: `${num(p.area, lang)} ${lang === 'ar' ? 'م²' : 'm²'}` },
    ...(p.beds ? [{ icon: BedDouble, k: { ar: 'الغرف', en: 'Bedrooms' }, v: String(p.beds) }] : []),
    ...(p.baths ? [{ icon: Bath, k: { ar: 'دورات المياه', en: 'Bathrooms' }, v: String(p.baths) }] : []),
    { icon: MapPin, k: { ar: 'الحي', en: 'District' }, v: L(p.district) },
  ] : []

  return (
    <AnimatePresence>
      {p && (
        <motion.div className="fixed inset-0 z-[85] flex items-end justify-center p-0 sm:items-center sm:p-6" initial={{ opacity: 1 }} exit={{ opacity: 1, transition: { duration: 0.5 } }}>
          <motion.div className="absolute inset-0 bg-coffee-deep/60 backdrop-blur-sm" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <div role="dialog" aria-modal="true" aria-label={L(p.title)} className="relative w-full max-w-5xl [perspective:2000px]">
            <motion.div initial={{ y: 60, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 60, opacity: 0 }} transition={{ duration: 0.5, ease: easeIO }} className="paper relative max-h-[92vh] overflow-y-auto rounded-t-2xl bg-linen-light shadow-2xl sm:rounded-2xl">
              <button onClick={onClose} className="absolute end-4 top-4 z-20 grid h-10 w-10 place-items-center rounded-full bg-linen-light/90 text-coffee shadow ring-1 ring-coffee/10" aria-label="Close"><X className="h-5 w-5" /></button>
              <div className="grid md:grid-cols-[1.1fr_1fr]">
                <div className="relative p-3 md:p-4">
                  <motion.img layoutId={`img-${p.id}`} src={img(p.image)} alt="" className="aspect-[4/3] w-full rounded-xl object-cover md:h-full md:aspect-auto" />
                  <PurposeStamp p={p} className="absolute start-8 top-8 bg-linen-light/90 text-[14px]" />
                </div>
                <div className="p-6 sm:p-8">
                  <p className="text-[13px] text-sand-dark" dir="ltr" style={{ textAlign: dir === 'rtl' ? 'right' : 'left' }}>{p.ref}</p>
                  <h2 className="mt-1 text-[1.9rem] leading-snug text-coffee-dark">{L(p.title)}</h2>
                  <p className="mt-3 text-2xl font-medium text-coffee">{priceText(p, lang)}</p>
                  <p className="mt-4 text-[15px] leading-[1.9] text-coffee-soft">{L(p.desc)}</p>
                  <dl className="mt-6 grid grid-cols-2 gap-x-6 border-t border-dashed border-coffee/20 pt-2">
                    {specs.map((s) => (
                      <div key={s.k.en} className="flex items-center gap-3 border-b border-dotted border-coffee/20 py-3">
                        <s.icon className="h-4 w-4 shrink-0 text-sand-dark" />
                        <dt className="text-[13px] text-slate-light">{L(s.k)}</dt>
                        <dd className="ms-auto text-[14px] font-medium text-coffee-dark" dir={s.icon === Hash ? 'ltr' : undefined}>{s.v}</dd>
                      </div>
                    ))}
                  </dl>
                  <div className="mt-7 flex flex-wrap gap-3">
                    <Btn href={waLink(L({ ar: `السلام عليكم، أرغب في الاستفسار عن العقار رقم ${p.ref}: ${p.title.ar}`, en: `Hello, I'd like to ask about property ${p.ref}: ${p.title.en}` }))} icon={<MessageCircle className="h-4 w-4" />} className="flex-1">{L({ ar: 'استفسر عبر واتساب', en: 'Ask on WhatsApp' })}</Btn>
                    <Btn href={`tel:${office.phoneIntl}`} v="ghost" icon={<Phone className="h-4 w-4" />}>{t('call')}</Btn>
                  </div>
                  <p className="mt-5 text-[12px] text-slate-light">{L({ ar: 'بيانات تجريبية للعرض — تُستبدل بعقارات المكتب الفعلية.', en: 'Demo listing — to be replaced with the office’s real listings.' })}</p>
                </div>
              </div>
            </motion.div>
            {/* folder cover swinging open on its spine */}
            <motion.div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 flex items-center justify-center rounded-2xl bg-coffee [backface-visibility:hidden]"
              style={{ transformOrigin: dir === 'rtl' ? 'right center' : 'left center' }}
              initial={{ rotateY: 0 }}
              animate={{ rotateY: dir === 'rtl' ? 120 : -120, opacity: [1, 1, 0], transition: { duration: 0.9, ease: easeIO, delay: 0.25, opacity: { duration: 0.9, times: [0, 0.8, 1], delay: 0.25 } } }}
              exit={{ rotateY: 0, opacity: 1, transition: { duration: 0.45, ease: easeIO } }}
            >
              <div className="flex flex-col items-center text-linen-light">
                <Mark className="h-16 w-auto text-sand-light" stroke={20} />
                <span className="mt-4 font-sans text-sm tracking-[0.3em]" dir="ltr">{p.ref}</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
