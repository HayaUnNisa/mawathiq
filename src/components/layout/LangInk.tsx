import { AnimatePresence, motion } from 'framer-motion'
import { useLang } from '../../i18n/LangContext'
import { easeIO } from '../../lib/motion'

const LINES = 9

/** Language switch: ruled lines are written across the screen, the page "re-writes" in the other language, then the lines are erased. */
export default function LangInk() {
  const { switching, lang } = useLang()
  // While switching, lang is still the OLD language for the first ~0.5s; lines draw from the OLD writing direction.
  return (
    <AnimatePresence>
      {switching && (
        <motion.div key="ink" className="pointer-events-none fixed inset-0 z-[95] flex flex-col" aria-hidden="true" exit={{ opacity: 1 }} transition={{ duration: 0.6 }}>
          {Array.from({ length: LINES }).map((_, i) => (
            <motion.div
              key={i}
              className={`flex-1 ${i % 2 ? 'bg-coffee' : 'bg-coffee-dark'}`}
              style={{ transformOrigin: lang === 'ar' ? 'right' : 'left' }}
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1, transition: { duration: 0.45, ease: easeIO, delay: i * 0.03 } }}
              exit={{ scaleX: 0, transition: { duration: 0.45, ease: easeIO, delay: i * 0.03 } }}
            />
          ))}
          <motion.span
            className="absolute inset-0 grid place-items-center font-display text-4xl text-linen-light"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { delay: 0.35 } }}
            exit={{ opacity: 0, transition: { duration: 0.15 } }}
          >
            {lang === 'ar' ? 'English' : 'العربية'}
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
