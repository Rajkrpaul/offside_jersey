'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function PageLoader() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[10000] bg-[#0a0a0a] flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }}
        >
          <div className="text-center">
            <motion.div
              className="text-4xl font-black tracking-tight text-white mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              OFFSIDE<span className="text-[#b6f542]">JERSEY</span>
            </motion.div>
            <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden mx-auto mb-4">
              <div className="h-full bg-gradient-to-r from-[#b6f542] to-[#7ecf00] loader-fill-anim rounded-full" />
            </div>
            <motion.p
              className="text-xs tracking-[0.2em] uppercase text-white/40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Curating the archive...
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
