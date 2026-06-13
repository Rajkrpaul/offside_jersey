'use client'

import { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const legends = [
  { id: 'messi',      name: 'Lionel Messi',      years: '2004 — 2025', stats: ['8× Ballon d\'Or', '42 Jerseys'], imgs: ['/assets/legends/messi-1.jpg', '/assets/legends/messi-2.jpg', '/assets/legends/messi-3.jpg'] },
  { id: 'ronaldo',    name: 'Cristiano Ronaldo',  years: '2002 — 2024', stats: ['5× Ballon d\'Or', '38 Jerseys'], imgs: ['/assets/legends/ronaldo-1.jpg', '/assets/legends/ronaldo-2.jpg', '/assets/legends/ronaldo-3.jpg'] },
  { id: 'zidane',     name: 'Zinedine Zidane',    years: '1989 — 2006', stats: ['World Cup 98',   '22 Jerseys'], imgs: ['/assets/legends/zidane-1.jpg', '/assets/legends/zidane-2.jpg', '/assets/legends/zidane-3.jpg'] },
  { id: 'beckham',    name: 'David Beckham',      years: '1993 — 2013', stats: ['Cultural Icon',   '28 Jerseys'], imgs: ['/assets/legends/beckham-1.jpg', '/assets/legends/beckham-2.jpg', '/assets/legends/beckham-3.jpg'] },
  { id: 'ronaldinho', name: 'Ronaldinho',           years: '1998 — 2015', stats: ['Ballon d\'Or 05','31 Jerseys'], imgs: ['/assets/legends/ronaldinho-1.jpg', '/assets/legends/ronaldinho-2.jpg', '/assets/legends/ronaldinho-3.jpg'] },
  { id: 'maldini',    name: 'Paolo Maldini',       years: '1985 — 2009', stats: ['5× UCL',         '19 Jerseys'], imgs: ['/assets/legends/maldini-1.jpg', '/assets/legends/maldini-2.jpg', '/assets/legends/maldini-3.jpg'] },
]

export default function LegendsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

  // Cycler for images
  const [imgIdx, setImgIdx] = useState(0)
  useEffect(() => {
    const int = setInterval(() => setImgIdx((v) => (v + 1) % 3), 3000)
    return () => clearInterval(int)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    if (!trackRef.current) return
    setIsDragging(true)
    startX.current = e.pageX - trackRef.current.offsetLeft
    scrollLeft.current = trackRef.current.scrollLeft
  }
  const onMouseLeave = () => setIsDragging(false)
  const onMouseUp = () => setIsDragging(false)
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !trackRef.current) return
    e.preventDefault()
    const x = e.pageX - trackRef.current.offsetLeft
    const walk = (x - startX.current) * 1.4
    trackRef.current.scrollLeft = scrollLeft.current - walk
  }

  return (
    <section id="players" className="py-32 bg-white overflow-hidden">
      <ScrollReveal className="text-center mb-16 px-6 md:px-16">
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">05 — Legends</span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight">
          The{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>Icons</em>
        </h2>
      </ScrollReveal>

      {/* Drag scroll track */}
      <div
        ref={trackRef}
        className={`flex gap-6 px-6 md:px-16 pb-10 overflow-x-auto no-scrollbar select-none ${isDragging ? 'cursor-grabbing' : 'cursor-grab'}`}
        onMouseDown={onMouseDown}
        onMouseLeave={onMouseLeave}
        onMouseUp={onMouseUp}
        onMouseMove={onMouseMove}
      >
        {legends.map((legend, i) => (
          <motion.div
            key={legend.id}
            className="flex-shrink-0 w-[clamp(320px,32vw,400px)] rounded-2xl overflow-hidden bg-[#0a0a0a] group flex flex-col"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            {/* Image Box */}
            <div className="relative h-[420px] overflow-hidden bg-black/5">
              <AnimatePresence initial={false}>
                <motion.div
                  key={imgIdx}
                  className="absolute inset-0"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Image
                    src={legend.imgs[imgIdx]}
                    alt={`${legend.name} photo`}
                    fill
                    className="object-cover transition-all duration-700 group-hover:[filter:grayscale(0%)] [filter:grayscale(100%)_contrast(1.1)]"
                    draggable={false}
                    sizes="(max-width: 768px) 80vw, 30vw"
                  />
                </motion.div>
              </AnimatePresence>
              {/* Gradient overlay for better blend with bottom section */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
            </div>

            {/* Info Box */}
            <div className="bg-[#0a0a0a] p-7 pt-4 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-2">{legend.years}</span>
                <h3 className="text-[clamp(28px,2.5vw,36px)] font-black text-white tracking-tight leading-[1.05] mb-5">
                  {legend.name}
                </h3>
                <div className="flex gap-2 flex-wrap mb-6">
                  {legend.stats.map((s) => (
                    <span key={s} className="text-[11px] font-medium text-white/40 border border-white/[0.08] rounded-full px-3 py-1.5">{s}</span>
                  ))}
                </div>
              </div>
              <button
                id={`legend-${legend.id}`}
                className="w-full py-4 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-[#b6f542] hover:bg-[#b6f542] hover:text-black transition-all duration-300 tracking-wide mt-auto"
              >
                View Collection
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Drag hint */}
      <div className="flex items-center justify-center gap-2 text-xs tracking-[0.1em] uppercase text-gray-300 mt-2">
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
        Drag to explore
      </div>
    </section>
  )
}

