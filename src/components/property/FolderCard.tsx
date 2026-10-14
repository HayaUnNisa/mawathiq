import { motion } from 'framer-motion'
import { Bath, BedDouble, Ruler } from 'lucide-react'
import { img } from '../../data/images'
import { types, type Property } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import { num, sar } from '../../lib/format'

export function PurposeStamp({ p, className = '' }: { p: Property; className?: string }) {
  const { L } = useLang()
  return (
    <span className={`inline-block -rotate-[8deg] rounded-[6px] border-2 border-double px-2.5 py-0.5 text-[12px] font-bold uppercase tracking-wider ${p.purpose === 'sale' ? 'border-coffee text-coffee' : 'border-emerald-700 text-emerald-700'} ${className}`}>
      {L(p.purpose === 'sale' ? { ar: 'للبيع', en: 'For sale' } : { ar: 'للإيجار', en: 'For rent' })}
    </span>
  )
}

export function priceText(p: Property, lang: 'ar' | 'en') {
  return sar(p.price, lang) + (p.period ? (lang === 'ar' ? ' / سنويًا' : ' / year') : '')
}

/** A property as a file folder: tab with the reference number, stamped purpose, paper body. */
export default function FolderCard({ p, onOpen, i = 0 }: { p: Property; onOpen: (p: Property) => void; i?: number }) {
  const { L, lang } = useLang()
  const type = types.find((t) => t.id === p.type)!
  return (
    <motion.button
      layout
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      exit={{ opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.6, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onOpen(p)}
      className="group relative block w-full pt-7 text-start"
    >
      {/* folder tab */}
      <span className="absolute start-0 top-0 flex h-8 items-center rounded-t-[10px] bg-sand px-4 font-sans text-[12px] font-medium tracking-wider text-coffee-dark transition-transform duration-500 group-hover:-translate-y-1" dir="ltr">{p.ref}</span>
      <span className="relative block overflow-hidden rounded-[12px] rounded-ss-none bg-sand p-2 shadow-[0_20px_40px_-25px_rgba(58,45,41,.6)] transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-[0_30px_50px_-25px_rgba(58,45,41,.7)]">
        <span className="relative block overflow-hidden rounded-[8px]">
          <motion.img layoutId={`img-${p.id}`} src={img(p.image)} alt="" className="aspect-[4/3] w-full object-cover transition-transform duration-[1.2s] ease-out group-hover:scale-105" />
          <span className="absolute end-3 top-3 rounded-[8px] bg-linen-light/90 px-1 backdrop-blur"><PurposeStamp p={p} /></span>
        </span>
        <span className="paper block rounded-[8px] bg-linen-light px-4 pb-4 pt-3.5 mt-2">
          <span className="flex items-center justify-between text-[12px] text-sand-dark"><span>{L(type.label)}</span><span>{L(p.district)}</span></span>
          <span className="mt-1.5 block font-display text-[18px] leading-snug text-coffee-dark line-clamp-1">{L(p.title)}</span>
          <span className="mt-3 flex items-center justify-between border-t border-dashed border-coffee/20 pt-3">
            <b className="text-[16px] font-medium text-coffee">{priceText(p, lang)}</b>
            <span className="flex items-center gap-3 text-[13px] text-slate">
              {p.beds && <span className="inline-flex items-center gap-1"><BedDouble className="h-3.5 w-3.5" />{p.beds}</span>}
              {p.baths && <span className="inline-flex items-center gap-1"><Bath className="h-3.5 w-3.5" />{p.baths}</span>}
              <span className="inline-flex items-center gap-1"><Ruler className="h-3.5 w-3.5" />{num(p.area, lang)}{lang === 'ar' ? 'م²' : 'm²'}</span>
            </span>
          </span>
        </span>
      </span>
    </motion.button>
  )
}
