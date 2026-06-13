'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const collections = [
  {
    id: 'messi',
    num: '01',
    name: 'Messi',
    sub: '42 Jerseys · 2004–2025',
    desc: "The GOAT's complete archive",
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a2e 100%)',
    size: 'large',
  },
  {
    id: 'ronaldo',
    num: '02',
    name: 'Ronaldo',
    sub: '38 Jerseys · 2002–2024',
    desc: 'Five Ballon d\'Or trophies',
    bg: 'linear-gradient(135deg, #0d0d0d 0%, #2d1515 100%)',
    size: 'medium',
  },
  {
    id: 'beckham',
    num: '03',
    name: 'Beckham',
    sub: '28 Jerseys · 1993–2013',
    desc: 'Cultural icon, football legend',
    bg: 'linear-gradient(135deg, #0a0f1a 0%, #121a2e 100%)',
    size: 'tall',
  },
  {
    id: 'zidane',
    num: '04',
    name: 'Zidane',
    sub: '22 Jerseys · 1989–2006',
    desc: 'World Cup 1998, pure elegance',
    bg: 'linear-gradient(135deg, #111 0%, #1a1a1a 100%)',
    size: 'medium-sm',
  },
  {
    id: 'ronaldinho',
    num: '05',
    name: 'Ronaldinho',
    sub: '31 Jerseys · 1998–2015',
    desc: 'The beautiful game personified',
    bg: 'linear-gradient(135deg, #0a0a0a 0%, #1f2a1f 100%)',
    size: 'wide',
  },
  {
    id: 'worldcup',
    num: '06',
    name: 'World Cup Classics',
    sub: '120+ Jerseys · 1966–2022',
    desc: 'Every tournament, every legend',
    bg: 'linear-gradient(135deg, #0d0d18 0%, #1a1530 100%)',
    size: 'worldcup',
  },
]

const sizeClasses: Record<string, string> = {
  large:     'col-span-2 row-span-2 min-h-[520px]',
  medium:    'col-span-1 row-span-1 min-h-[240px]',
  tall:      'col-span-1 row-span-2 min-h-[500px]',
  'medium-sm': 'col-span-1 row-span-1 min-h-[240px]',
  wide:      'col-span-2 row-span-1 min-h-[220px] md:col-span-2',
  worldcup:  'col-span-1 row-span-1 min-h-[220px]',
}

export default function CollectionsSection() {
  return (
    <section id="collections" className="py-32 px-6 md:px-16 bg-white">
      {/* Header */}
      <ScrollReveal className="text-center mb-20">
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
          02 — Collections
        </span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight">
          Discover{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>
            The Legends
          </em>
        </h2>
      </ScrollReveal>

      {/* Asymmetric Bento Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 auto-rows-auto">
        {collections.map((col, i) => (
          <ScrollReveal
            key={col.id}
            delay={i * 0.08}
            direction={i % 3 === 0 ? 'left' : i % 3 === 2 ? 'right' : 'up'}
            className={`bento-card ${sizeClasses[col.size]} relative rounded-2xl overflow-hidden group cursor-pointer`}
          >
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ background: col.bg }}
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Glowing border on hover */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-transparent"
              whileHover={{ borderColor: 'rgba(182,245,66,0.25)', boxShadow: '0 0 0 1px rgba(182,245,66,0.15)' }}
              transition={{ duration: 0.3 }}
            />

            {/* Number */}
            <span className="absolute top-6 left-6 text-[11px] font-bold tracking-[0.2em] uppercase text-white/25 z-10">
              {col.num}
            </span>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/70"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
              <motion.span
                className="block text-[11px] tracking-[0.12em] uppercase text-white/45 mb-2"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35 }}
              >
                {col.sub}
              </motion.span>

              <h3 className="text-[clamp(26px,3.5vw,52px)] font-black text-white tracking-tight leading-[1] mb-3">
                {col.name}
              </h3>

              <motion.p
                className="text-sm text-white/45 mb-4"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.05 }}
              >
                {col.desc}
              </motion.p>

              <motion.button
                id={`bento-${col.id}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/20 text-white text-xs font-semibold tracking-wide hover:border-[#b6f542] hover:bg-[rgba(182,245,66,0.1)] hover:text-[#b6f542] transition-all duration-300"
                initial={{ opacity: 0, y: 10 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: 0.1 }}
              >
                Explore
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.button>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
