import { AnimatePresence, motion } from 'framer-motion'
import { MessageCircle, Phone, X } from 'lucide-react'
import { useState } from 'react'
import { office, waLink } from '../../data/site'
import { useLang } from '../../i18n/LangContext'

/** Floating quick-contact: a folded "card" that opens into call / WhatsApp. */
export default function QuickContact() {
  const { t, L } = useLang()
  const [open, setOpen] = useState(false)
  return (
    <div className="fixed bottom-5 end-5 z-[60] flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div className="flex flex-col items-end gap-2" initial="h" animate="s" exit="h" variants={{ s: { transition: { staggerChildren: 0.06 } } }}>
            {[
              { href: waLink(L({ ar: 'السلام عليكم، أرغب في الاستفسار عن خدماتكم العقارية.', en: 'Hello, I would like to ask about your real estate services.' })), label: t('whatsapp'), icon: <MessageCircle className="h-4 w-4" /> },
              { href: `tel:${office.phoneIntl}`, label: t('call'), icon: <Phone className="h-4 w-4" /> },
            ].map((a) => (
              <motion.a key={a.label} href={a.href} target={a.href.startsWith('http') ? '_blank' : undefined} rel="noreferrer" variants={{ h: { opacity: 0, y: 12, scale: 0.9 }, s: { opacity: 1, y: 0, scale: 1 } }} className="inline-flex items-center gap-2 rounded-full bg-linen-light px-4 py-2.5 text-[14px] font-medium text-coffee-dark shadow-[0_8px_30px_rgba(58,45,41,.18)] ring-1 ring-coffee/10 hover:bg-white">
                {a.icon}{a.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open} aria-label={t('nav_contact')} className="grid h-14 w-14 place-items-center rounded-full bg-coffee text-linen-light shadow-[0_10px_30px_rgba(58,45,41,.35)] transition-transform hover:scale-105">
        <motion.span animate={{ rotate: open ? 90 : 0 }}>{open ? <X className="h-5 w-5" /> : <MessageCircle className="h-5 w-5" />}</motion.span>
      </button>
    </div>
  )
}
