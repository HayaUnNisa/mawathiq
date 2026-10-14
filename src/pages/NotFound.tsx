import { motion } from 'framer-motion'
import { Btn } from '../components/ui/Button'
import Mark from '../components/ui/Mark'
import { useLang } from '../i18n/LangContext'

export default function NotFound() {
  const { L, t } = useLang()
  return (
    <section className="paper grid min-h-[75vh] place-items-center bg-linen-light px-5 py-20 text-center">
      <div>
        <motion.div initial={{ rotate: -6, y: 20, opacity: 0 }} animate={{ rotate: -3, y: 0, opacity: 1 }} transition={{ duration: 0.8 }} className="relative mx-auto w-64 rounded-md bg-white/80 p-8 shadow-xl ring-1 ring-coffee/10 [clip-path:polygon(0_0,100%_0,100%_86%,88%_100%,74%_90%,60%_100%,46%_90%,32%_100%,18%_90%,0_100%)]">
          <Mark className="mx-auto h-16 w-auto text-coffee/30" stroke={16} />
          <p className="mt-4 font-display text-6xl text-coffee">404</p>
          <span className="mt-3 inline-block -rotate-12 rounded border-2 border-double border-red-800/70 px-3 py-1 text-[13px] font-bold text-red-800/80">{L({ ar: 'غير موثّقة', en: 'Not on file' })}</span>
        </motion.div>
        <h1 className="mt-10 text-3xl text-coffee-dark">{L({ ar: 'هذه الصفحة غير موجودة في ملفاتنا', en: 'This page isn’t in our files' })}</h1>
        <p className="mt-3 text-coffee-soft">{L({ ar: 'ربما نُقلت أو أن الرابط غير صحيح.', en: 'It may have moved, or the link is incorrect.' })}</p>
        <Btn to="/" className="mt-8" arrow>{t('nav_home')}</Btn>
      </div>
    </section>
  )
}
