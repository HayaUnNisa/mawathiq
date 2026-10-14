import { AnimatePresence, LayoutGroup, motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import Dossier from '../components/property/Dossier'
import FolderCard from '../components/property/FolderCard'
import PageHead from '../components/ui/PageHead'
import { properties, types, type Property } from '../data/site'
import { useLang } from '../i18n/LangContext'

export default function Properties() {
  const { L, lang } = useLang()
  const [sp, setSp] = useSearchParams()
  const purpose = sp.get('for') ?? 'all'
  const type = sp.get('type') ?? 'all'
  const sort = sp.get('sort') ?? 'new'
  const [open, setOpen] = useState<Property | null>(null)
  const set = (k: string, v: string) => { const n = new URLSearchParams(sp); if (v === 'all' || (k === 'sort' && v === 'new')) n.delete(k); else n.set(k, v); setSp(n, { replace: true }) }

  const list = useMemo(() => {
    let l = properties.filter((p) => (purpose === 'all' || p.purpose === purpose) && (type === 'all' || p.type === type))
    if (sort === 'low') l = [...l].sort((a, b) => a.price - b.price)
    if (sort === 'high') l = [...l].sort((a, b) => b.price - a.price)
    return l
  }, [purpose, type, sort])

  const purposes = [
    { id: 'all', l: { ar: 'الكل', en: 'All' } },
    { id: 'sale', l: { ar: 'للبيع', en: 'For sale' } },
    { id: 'rent', l: { ar: 'للإيجار', en: 'For rent' } },
  ]

  return (
    <>
      <PageHead no="03" title={L({ ar: 'العقارات', en: 'Properties' })} sub={L({ ar: 'ملفات العقارات المتاحة لدى المكتب للبيع والإيجار في المدينة المنورة.', en: 'Property files available through the office, for sale and rent in Madinah.' })} />
      <section className="paper min-h-[60vh] bg-linen pb-24">
        <div className="sticky top-16 z-30 border-b border-coffee/10 bg-linen/90 backdrop-blur-md">
          <div className="wrap flex flex-wrap items-center gap-3 py-4">
            <LayoutGroup id="purpose">
              <div className="flex rounded-full bg-linen-light p-1 ring-1 ring-coffee/10">
                {purposes.map((p) => (
                  <button key={p.id} onClick={() => set('for', p.id)} className={`relative rounded-full px-4 py-2 text-[14px] transition-colors ${purpose === p.id ? 'text-linen-light' : 'text-coffee-soft hover:text-coffee-dark'}`}>
                    {purpose === p.id && <motion.span layoutId="pill" className="absolute inset-0 rounded-full bg-coffee" transition={{ type: 'spring', stiffness: 380, damping: 32 }} />}
                    <span className="relative">{L(p.l)}</span>
                  </button>
                ))}
              </div>
            </LayoutGroup>
            <div className="no-scrollbar -mx-1 flex max-w-full gap-2 overflow-x-auto px-1">
              {[{ id: 'all', label: { ar: 'كل الأنواع', en: 'All types' } }, ...types].map((t) => (
                <button key={t.id} onClick={() => set('type', t.id)} className={`shrink-0 rounded-full border px-4 py-2 text-[14px] transition-colors ${type === t.id ? 'border-coffee bg-coffee/10 text-coffee-dark' : 'border-coffee/15 text-coffee-soft hover:border-coffee/40'}`}>{L(t.label)}</button>
              ))}
            </div>
            <select value={sort} onChange={(e) => set('sort', e.target.value)} className="ms-auto rounded-full border border-coffee/15 bg-linen-light px-4 py-2 text-[14px] text-coffee-dark outline-none" aria-label={L({ ar: 'الترتيب', en: 'Sort' })}>
              <option value="new">{L({ ar: 'الأحدث', en: 'Newest' })}</option>
              <option value="low">{L({ ar: 'السعر: الأقل', en: 'Price: low to high' })}</option>
              <option value="high">{L({ ar: 'السعر: الأعلى', en: 'Price: high to low' })}</option>
            </select>
          </div>
        </div>
        <div className="wrap pt-10">
          <p className="text-[14px] text-slate">{lang === 'ar' ? `${list.length} ملف` : `${list.length} file${list.length === 1 ? '' : 's'}`}</p>
          <motion.div layout className="mt-6 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence>
              {list.map((p, i) => <FolderCard key={p.id} p={p} i={i} onOpen={setOpen} />)}
            </AnimatePresence>
          </motion.div>
          {!list.length && <p className="py-20 text-center text-coffee-soft">{L({ ar: 'لا توجد ملفات مطابقة. جرّب تغيير التصفية.', en: 'No matching files. Try changing the filters.' })}</p>}
        </div>
      </section>
      <Dossier p={open} onClose={() => setOpen(null)} />
    </>
  )
}
