'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const eras = [
  { id: 'e90s',    year: '90s',  label: '1990s Classics',    desc: 'The golden era of kits',            count: '64 Kits',   accent: '#c8a96e', size: 'large'  },
  { id: 'e2000s',  year: '00s',  label: '2000s Icons',       desc: 'Peak Galácticos era',               count: '88 Kits',   accent: '#a8b5c8', size: 'wide'   },
  { id: 'e2010s',  year: '10s',  label: '2010s Dominance',   desc: 'Barça, Madrid & beyond',            count: '96 Kits',   accent: '#8fb8a8', size: 'tall'   },
  { id: 'ewc',     year: 'WC',   label: 'World Cup Legends', desc: 'Historic tournament kits',          count: '120+ Kits', accent: '#d4af37', size: 'medium' },
  { id: 'eucl',    year: 'UCL',  label: 'Champions League',  desc: 'The biggest nights in football',    count: '72 Kits',   accent: '#7c9ab5', size: 'small'  },
  { id: 'enat',    year: 'NATL', label: 'National Teams',    desc: '56 countries represented',          count: '210 Kits',  accent: '#b5a07c', size: 'large2' },
  { id: 'eretro',  year: 'RETRO',label: 'Retro Kits',        desc: 'Limited vintage pieces',            count: '38 Kits',   accent: '#c88a6e', size: 'street' },
]

const sizeClasses: Record<string, string> = {
  large:  'md:col-span-1 md:row-span-2 min-h-[320px]',
  wide:   'md:col-span-2 md:row-span-1 min-h-[240px]',
  tall:   'md:col-span-1 md:row-span-2 min-h-[320px]',
  medium: 'md:col-span-1 md:row-span-1 min-h-[220px]',
  small:  'md:col-span-1 md:row-span-1 min-h-[200px]',
  large2: 'md:col-span-1 md:row-span-1 min-h-[220px]',
  street: 'md:col-span-2 md:row-span-1 min-h-[200px]',
}

export default function EraSection() {
  return (
    <section id="era" className="py-32 px-6 md:px-16 bg-[#f5f5f5]">
      <ScrollReveal className="text-center mb-20">
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">
          03 — Eras
        </span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight text-[#0a0a0a]">
          Shop By{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>
            Era
          </em>
        </h2>
        <p className="text-lg text-gray-400 mt-5 max-w-md mx-auto">
          Football through time — from the golden age to modern dominance.
        </p>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-3 gap-4">
        {eras.map((era, i) => (
          <ScrollReveal
            key={era.id}
            delay={i * 0.07}
            direction={i % 2 === 0 ? 'left' : 'right'}
            className={`era-card ${sizeClasses[era.size]} relative rounded-2xl overflow-hidden bg-white group cursor-pointer min-h-[180px] flex flex-col justify-end p-8`}
          >
            {/* Accent wash */}
            <motion.div
              className="absolute inset-0"
              style={{ background: `linear-gradient(135deg, ${era.accent}22 0%, transparent 60%)` }}
              whileHover={{ opacity: 2 }}
              initial={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />

            {/* Scale on hover */}
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Year label */}
            <span className="absolute top-6 right-6 text-[11px] font-bold tracking-[0.2em] uppercase text-gray-300">
              {era.year}
            </span>

            {/* Content */}
            <div className="relative z-10">
              <h3 className="text-[clamp(20px,2.5vw,36px)] font-black tracking-tight text-[#0a0a0a] leading-[1.1] mb-2 group-hover:text-[#0a0a0a]">
                {era.label}
              </h3>

              <motion.p
                className="text-sm text-gray-400 mb-4"
                initial={{ opacity: 0, y: 8 }}
                whileHover={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                {era.desc}
              </motion.p>

              <span className="inline-block px-3.5 py-1.5 rounded-full bg-gray-100 text-[11px] font-semibold tracking-[0.08em] uppercase text-gray-400">
                {era.count}
              </span>
            </div>

            {/* Hover border */}
            <motion.div
              className="absolute inset-0 rounded-2xl border border-transparent pointer-events-none"
              whileHover={{ borderColor: `${era.accent}60` }}
              transition={{ duration: 0.3 }}
            />

            {/* Top accent bar */}
            <motion.div
              className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl"
              style={{ background: `linear-gradient(90deg, ${era.accent}, transparent)` }}
              initial={{ scaleX: 0, transformOrigin: 'left' }}
              whileHover={{ scaleX: 1 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            />
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
