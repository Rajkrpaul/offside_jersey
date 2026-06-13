'use client'

import { useRef, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const legends = [
  { id: 'messi',      name: 'Lionel\nMessi',      years: '2004 — 2025', stats: ['8× Ballon d\'Or', '42 Jerseys'], img: '/assets/beckham_card.png' },
  { id: 'ronaldo',    name: 'Cristiano\nRonaldo',  years: '2002 — 2024', stats: ['5× Ballon d\'Or', '38 Jerseys'], img: '/assets/jersey_product1.png' },
  { id: 'beckham',    name: 'David\nBeckham',      years: '1993 — 2013', stats: ['Cultural Icon',   '28 Jerseys'], img: '/assets/beckham_card.png' },
  { id: 'zidane',     name: 'Zinedine\nZidane',    years: '1989 — 2006', stats: ['World Cup 98',   '22 Jerseys'], img: '/assets/jersey_product2.png' },
  { id: 'ronaldinho', name: 'Ronaldinho',           years: '1998 — 2015', stats: ['Ballon d\'Or 05','31 Jerseys'], img: '/assets/jersey_product3.png' },
  { id: 'maldini',    name: 'Paolo\nMaldini',       years: '1985 — 2009', stats: ['5× UCL',         '19 Jerseys'], img: '/assets/football_gallery1.png' },
]

export default function LegendsSection() {
  const trackRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const startX = useRef(0)
  const scrollLeft = useRef(0)

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
            className="flex-shrink-0 w-[clamp(280px,28vw,380px)] rounded-2xl overflow-hidden bg-[#f5f5f5] group"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -80px 0px' }}
            transition={{ delay: i * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ y: -8 }}
          >
            {/* Image */}
            <div className="relative h-[380px] overflow-hidden">
              <motion.div
                className="absolute inset-0"
                whileHover={{ scale: 1.04 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                <Image
                  src={legend.img}
                  alt={legend.name.replace('\n', ' ')}
                  fill
                  className="object-cover transition-all duration-700 group-hover:[filter:grayscale(0%)] [filter:grayscale(100%)_contrast(1.1)]"
                  draggable={false}
                  sizes="(max-width: 768px) 80vw, 30vw"
                />
              </motion.div>
              {/* Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent" />
            </div>

            {/* Info */}
            <div className="bg-[#0a0a0a] p-7">
              <span className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-2">{legend.years}</span>
              <h3 className="text-[clamp(26px,3vw,38px)] font-black text-white tracking-tight leading-[1.05] mb-4 whitespace-pre-line">
                {legend.name}
              </h3>
              <div className="flex gap-2 flex-wrap mb-6">
                {legend.stats.map((s) => (
                  <span key={s} className="text-xs font-medium text-white/40 border border-white/[0.08] rounded-full px-3 py-1">{s}</span>
                ))}
              </div>
              <button
                id={`legend-${legend.id}`}
                className="w-full py-3.5 rounded-full border border-white/15 text-white text-sm font-semibold hover:border-[#b6f542] hover:bg-[#b6f542] hover:text-black transition-all duration-300 tracking-wide"
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
