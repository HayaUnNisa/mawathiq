import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLang } from '../../i18n/LangContext'
import { easeIO } from '../../lib/motion'
import Mark from '../ui/Mark'

/** First visit of the session: the mark draws itself stroke by stroke, the name is written, then the sheet lifts. */
export default function Preloader() {
  const { t } = useLang()
  const [show, setShow] = useState(() => {
    try { return !sessionStorage.getItem('maw-intro') } catch { return true }
  })
  useEffect(() => {
    if (!show) return
    document.documentElement.style.overflow = 'hidden'
    const id = setTimeout(() => {
      setShow(false)
      document.documentElement.style.overflow = ''
      try { sessionStorage.setItem('maw-intro', '1') } catch { /* ignore */ }
    }, 2300)
    return () => clearTimeout(id)
  }, [show])
  return (
    <AnimatePresence>
      {show && (
        <motion.div className="paper fixed inset-0 z-[100] flex flex-col items-center justify-center bg-linen" exit={{ y: '-100%', transition: { duration: 0.8, ease: easeIO } }}>
          <Mark draw duration={0.9} className="h-28 w-auto text-coffee" stroke={14} />
          <motion.p className="mt-6 font-display text-2xl text-coffee" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2, duration: 0.6 }}>
            {t('brand_full')}
          </motion.p>
          <motion.span className="mt-5 h-px w-40 origin-center bg-coffee/40" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.4, duration: 0.8 }} />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
