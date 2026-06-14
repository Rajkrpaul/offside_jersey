'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

/* ─── Cycling photo hook ─────────────────────────────────────────── */
function useCycle(imgs: string[], interval = 3600, startOffset = 0) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    const t = setTimeout(() => {
      const id = setInterval(() => setIdx((v) => (v + 1) % imgs.length), interval)
      return () => clearInterval(id)
    }, startOffset)
    return () => clearTimeout(t)
  }, [imgs, interval, startOffset])
  return idx
}

/* ─── Arrow Button ───────────────────────────────────────────────── */
function ArrowBtn({
  position = 'bottom-right',
}: {
  position?: 'bottom-right' | 'bottom-left'
}) {
  return (
    <div
      className={`absolute z-20 w-8 h-8 rounded-full border border-[#b6f542] flex items-center justify-center group-hover:bg-[#b6f542] transition-colors duration-300 ${
        position === 'bottom-right' ? 'bottom-6 right-6' : 'bottom-6 left-6'
      }`}
    >
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b6f542"
        strokeWidth="2.5"
        className="group-hover:stroke-[#0a0a0a] transition-colors duration-300"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  )
}

/* ─── Base Card Container ────────────────────────────────────────── */
interface CardProps {
  imgs: string[]
  num: string
  jerseys: string
  name: string
  years: string
  interval?: number
  startOffset?: number
  objectPos?: string
  style?: React.CSSProperties
  arrowPos?: 'bottom-right' | 'bottom-left'
  nameSize?: 'sm' | 'md' | 'lg'
}

function LegendCard({
  imgs,
  num,
  jerseys,
  name,
  years,
  interval = 3500,
  startOffset = 0,
  objectPos = 'center top',
  style,
  arrowPos = 'bottom-right',
  nameSize = 'md',
}: CardProps) {
  const idx = useCycle(imgs, interval, startOffset)
  const textSizeClass =
    nameSize === 'lg' ? 'text-[42px] leading-[1]' : nameSize === 'sm' ? 'text-[22px] leading-[1]' : 'text-[32px] leading-[1]'

  return (
    <motion.div
      className="relative rounded-[12px] overflow-hidden cursor-pointer group bg-[#0a0a0a]"
      style={style}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Background Cycling Image */}
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url(${imgs[idx]})`,
            backgroundSize: 'cover',
            backgroundPosition: objectPos,
          }}
        />
      </AnimatePresence>

      {/* Dark Gradient Overlay */}
      <div
        className="absolute inset-0 z-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.1) 100%)',
        }}
      />

      {/* Number Top-Left */}
      <span className="absolute top-6 left-6 z-20 text-[10px] tracking-[0.2em] font-semibold text-white/50">
        {num}
      </span>

      {/* Arrow Button */}
      <ArrowBtn position={arrowPos} />

      {/* Text Content */}
      <div className={`absolute bottom-6 z-20 ${arrowPos === 'bottom-right' ? 'left-6' : 'right-6 text-right'}`}>
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#b6f542] font-bold mb-1.5">
          {jerseys}
        </p>
        <h3 className={`font-black text-white tracking-tight mb-1 ${textSizeClass}`}>
          {name}
        </h3>
        <p className="text-[10px] text-white/50 tracking-widest">{years}</p>
      </div>
    </motion.div>
  )
}

/* ─── More Legends Banner ────────────────────────────────────────── */
function MoreLegendsBanner() {
  const faces = [
    '/assets/legends/maldini-1.jpg',
    '/assets/legends/ronaldinho1.jpg',
    '/assets/legends/beckham1.jpg',
    '/assets/legends/zidane1.jpg',
    '/assets/legends/maldini-2.jpg',
    '/assets/legends/messi1.jpg',
    '/assets/legends/neymar1.jpg',
  ]

  const idx = useCycle(faces, 2000, 0)

  return (
    <motion.div
      className="relative rounded-[12px] overflow-hidden cursor-pointer group bg-[#0d0d0d] mt-[4px]"
      style={{ gridColumn: '1 / 5', gridRow: '4 / 5', height: '140px' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Faces Strip */}
      <div className="absolute inset-y-0 right-0 w-[65%] flex opacity-40 mix-blend-luminosity filter grayscale mask-image-left">
        {faces.map((src, i) => (
          <div
            key={i}
            className="flex-1 relative"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
            }}
          />
        ))}
      </div>

      <div
        className="absolute inset-0 z-0"
        style={{
          background: 'linear-gradient(to right, #0d0d0d 30%, rgba(13,13,13,0.8) 50%, rgba(13,13,13,0) 100%)',
        }}
      />

      <div className="relative z-10 flex items-center h-full px-8">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-white/40 mr-8">08</span>
        <div>
          <h3 className="text-[32px] font-black text-white tracking-tight leading-[1] mb-1">
            More Legends
          </h3>
          <p className="text-[12px] text-white/50">100+ legendary players. Endless stories.</p>
        </div>
        <div className="ml-8 w-10 h-10 rounded-full border border-[#b6f542] flex items-center justify-center group-hover:bg-[#b6f542] transition-colors duration-300">
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b6f542" strokeWidth="2.5" className="group-hover:stroke-[#0a0a0a]">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section Layout ─────────────────────────────────────────────── */
export default function CollectionsSection() {
  return (
    <section id="collections" className="bg-[#FFFFFF] py-[48px] px-[40px]">
      
      {/* ── Section Header ── */}
      <ScrollReveal className="text-center mb-[48px]">
        <h2 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.9] tracking-tight text-[#0a0a0a]">
          Discover <em className="font-normal italic" style={{ fontFamily: 'DM Serif Display, serif' }}>The Legends</em>
        </h2>
        <p className="text-[15px] text-gray-500 mt-4 tracking-wide font-light">
          Iconic players. Legendary moments. Timeless jerseys.
        </p>
      </ScrollReveal>

      {/* ── Grid Layout ── */}
      <div
        className="w-full max-w-[1500px] mx-auto"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: '280px 200px 200px auto',
          gap: 10,
        }}
      >
        {/* 1. Neymar (Tall Left) */}
        <LegendCard
          imgs={['/assets/legends/neymar1.jpg', '/assets/legends/neymar2.jpg', '/assets/legends/neymar3.jpg']}
          num="01"
          jerseys="24 JERSEYS"
          name="Neymar Jr"
          years="2010 — 2025"
          nameSize="lg"
          arrowPos="bottom-left"
          style={{ gridColumn: '1 / 2', gridRow: '1 / 4' }}
        />

        {/* 2. Ronaldo (Tall Center-Left) */}
        <LegendCard
          imgs={['/assets/legends/ronaldo1.jpg', '/assets/legends/ronaldo2.jpg', '/assets/legends/ronaldo3.jpg']}
          num="02"
          jerseys="38 JERSEYS"
          name="Ronaldo"
          years="2003 — 2023"
          nameSize="lg"
          arrowPos="bottom-left"
          interval={3800}
          startOffset={500}
          style={{ gridColumn: '2 / 3', gridRow: '1 / 4' }}
        />

        {/* 3. Messi (Wide Top Right) */}
        <LegendCard
          imgs={['/assets/legends/messi1.jpg', '/assets/legends/messi2.jpg', '/assets/legends/messi3.jpg']}
          num="03"
          jerseys="42 JERSEYS"
          name="Messi"
          years="2004 — 2025"
          nameSize="lg"
          arrowPos="bottom-right"
          objectPos="center 20%"
          interval={4200}
          startOffset={1200}
          style={{ gridColumn: '3 / 5', gridRow: '1 / 2' }}
        />

        {/* 4. Beckham (Mid Right 1) */}
        <LegendCard
          imgs={['/assets/legends/beckham1.jpg', '/assets/legends/beckham2.jpg', '/assets/legends/beckham3.jpg']}
          num="04"
          jerseys="27 JERSEYS"
          name="Beckham"
          years="1992 — 2013"
          nameSize="sm"
          arrowPos="bottom-right"
          objectPos="center 20%"
          interval={3400}
          startOffset={800}
          style={{ gridColumn: '3 / 4', gridRow: '2 / 3' }}
        />

        {/* 5. Zidane (Mid Right 2) */}
        <LegendCard
          imgs={['/assets/legends/zidane1.jpg', '/assets/legends/zidane2.jpg', '/assets/legends/zidane3.jpg']}
          num="05"
          jerseys="18 JERSEYS"
          name="Zidane"
          years="1991 — 2006"
          nameSize="sm"
          arrowPos="bottom-right"
          objectPos="center 20%"
          interval={3600}
          startOffset={1600}
          style={{ gridColumn: '4 / 5', gridRow: '2 / 3' }}
        />

        {/* 6. Ronaldinho (Bottom Right 1) */}
        <LegendCard
          imgs={['/assets/legends/ronaldinho1.jpg', '/assets/legends/ronaldinho2.jpg', '/assets/legends/ronaldinho3.jpg']}
          num="06"
          jerseys="24 JERSEYS"
          name="Ronaldinho"
          years="1998 — 2015"
          nameSize="sm"
          arrowPos="bottom-right"
          objectPos="center 30%"
          interval={3100}
          startOffset={2000}
          style={{ gridColumn: '3 / 4', gridRow: '3 / 4' }}
        />

        {/* 7. World Cup Classics (Bottom Right 2) */}
        <LegendCard
          imgs={['/assets/legends/world%20cup.jpg', '/assets/legends/world%20cup.jpg', '/assets/legends/world%20cup.jpg']}
          num="07"
          jerseys="15 COLLECTIONS"
          name="World Cup Classics"
          years="1930 — 2022"
          nameSize="sm"
          arrowPos="bottom-right"
          objectPos="center"
          interval={5000}
          style={{ gridColumn: '4 / 5', gridRow: '3 / 4' }}
        />

        {/* 8. More Legends Banner (Full Width Bottom) */}
        <MoreLegendsBanner />
      </div>
    </section>
  )
}
