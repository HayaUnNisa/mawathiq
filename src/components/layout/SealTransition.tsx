import { motion } from 'framer-motion'
import { createContext, useContext, type ReactNode } from 'react'
import { easeIO } from '../../lib/motion'
import Seal from '../ui/Seal'

export const NextTitle = createContext('')

/**
 * "Fold & seal": a sheet of paper unfolds over the page (top half drops in, bottom half
 * swings down on its crease), the office seal is stamped with the next page's name,
 * then the sealed sheet is lifted away to reveal the new page.
 */
export default function SealTransition({ children }: { children: ReactNode }) {
  const title = useContext(NextTitle)
  return (
    <>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] } }} exit={{ opacity: 1, transition: { duration: 1 } }}>
        {children}
      </motion.div>

      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[90] [perspective:1800px]">
        <motion.div
          className="absolute inset-0"
          initial={{ y: '0%' }}
          animate={{ y: '-104%', transition: { duration: 0.75, ease: easeIO, delay: 0.55 } }}
          exit={{ y: '0%', transition: { duration: 0 } }}
        >
          {/* top half: drops in */}
          <motion.div
            className="paper absolute inset-x-0 top-0 h-1/2 bg-linen shadow-[0_10px_40px_rgba(58,45,41,.25)]"
            initial={{ y: '0%' }}
            exit={{ y: ['-102%', '0%'], transition: { duration: 0.5, ease: easeIO } }}
          >
            <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-coffee/15 to-transparent" />
          </motion.div>
          {/* bottom half: swings down on the crease */}
          <motion.div
            className="paper absolute inset-x-0 bottom-0 h-1/2 origin-top bg-linen [backface-visibility:hidden]"
            initial={{ rotateX: 0 }}
            exit={{ rotateX: [-92, -92, 0], transition: { duration: 0.95, times: [0, 0.45, 1], ease: easeIO } }}
          >
            <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-coffee/20 to-transparent" />
          </motion.div>
          {/* the stamp */}
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center"
            initial={{ opacity: 1, scale: 1, rotate: -8 }}
            exit={{ opacity: [0, 0, 1], scale: [2.4, 2.4, 1], rotate: [-30, -30, -8], transition: { duration: 1.2, times: [0, 0.7, 1], ease: 'easeOut' } }}
          >
            <Seal className="w-36 sm:w-44" spin={false} />
            <span className="mt-5 font-display text-2xl text-coffee">{title}</span>
          </motion.div>
        </motion.div>
      </div>
    </>
  )
}
