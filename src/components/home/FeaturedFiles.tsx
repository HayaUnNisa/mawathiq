import { useState } from 'react'
import { properties, type Property } from '../../data/site'
import { useLang } from '../../i18n/LangContext'
import Dossier from '../property/Dossier'
import FolderCard from '../property/FolderCard'
import { Btn } from '../ui/Button'
import { Heading } from '../ui/Reveal'

export default function FeaturedFiles() {
  const { L, t } = useLang()
  const [open, setOpen] = useState<Property | null>(null)
  return (
    <section className="paper bg-linen-light py-24 sm:py-28">
      <div className="wrap">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <Heading no="04" title={L({ ar: 'من ملفات المكتب', en: 'From our files' })}>{L({ ar: 'مختارات من العقارات المتاحة للبيع والإيجار في المدينة المنورة. افتح الملف لتفاصيل أكثر.', en: 'A selection of properties for sale and rent in Madinah. Open a file for the details.' })}</Heading>
          <Btn to="/properties" v="ghost" arrow>{t('all_props')}</Btn>
        </div>
        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {properties.slice(0, 3).map((p, i) => <FolderCard key={p.id} p={p} i={i} onOpen={setOpen} />)}
        </div>
      </div>
      <Dossier p={open} onClose={() => setOpen(null)} />
    </section>
  )
}
