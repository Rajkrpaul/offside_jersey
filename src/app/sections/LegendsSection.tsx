'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

/* ─── Data ──────────────────────────────────────────────────────────── */
interface Legend {
  id: string
  name: string
  years: string
  jerseys: string
  no: string
  imgs: string[]
  orientation: 'vertical' | 'horizontal'
}

const LEGENDS: Legend[] = [
  {
    id: 'neymar',
    name: 'Neymar Jr',
    years: '2010 — 2025',
    jerseys: '24 Jerseys',
    no: '01',
    imgs: ['/assets/legends/neymar1.jpg', '/assets/legends/neymar2.jpg', '/assets/legends/neymar3.jpg'],
    orientation: 'vertical',
  },
  {
    id: 'ronaldo',
    name: 'Ronaldo',
    years: '2003 — 2023',
    jerseys: '38 Jerseys',
    no: '02',
    imgs: ['/assets/legends/ronaldo1.jpg', '/assets/legends/ronaldo2.jpg', '/assets/legends/ronaldo3.jpg'],
    orientation: 'vertical',
  },
  {
    id: 'messi',
    name: 'Messi',
    years: '2004 — 2025',
    jerseys: '42 Jerseys',
    no: '03',
    imgs: ['/assets/legends/messi1.jpg', '/assets/legends/messi2.jpg', '/assets/legends/messi3.jpg'],
    orientation: 'horizontal',
  },
  {
    id: 'beckham',
    name: 'Beckham',
    years: '1992 — 2013',
    jerseys: '27 Jerseys',
    no: '04',
    imgs: ['/assets/legends/beckham1.jpg', '/assets/legends/beckham2.jpg', '/assets/legends/beckham3.jpg'],
    orientation: 'horizontal',
  },
  {
    id: 'zidane',
    name: 'Zidane',
    years: '1991 — 2006',
    jerseys: '18 Jerseys',
    no: '05',
    imgs: ['/assets/legends/zidane1.jpg', '/assets/legends/zidane2.jpg', '/assets/legends/zidane3.jpg'],
    orientation: 'horizontal',
  },
  {
    id: 'ronaldinho',
    name: 'Ronaldinho',
    years: '1998 — 2015',
    jerseys: '24 Jerseys',
    no: '06',
    imgs: ['/assets/legends/ronaldinho1.jpg', '/assets/legends/ronaldinho2.jpg', '/assets/legends/ronaldinho3.jpg'],
    orientation: 'horizontal',
  },
  {
    id: 'worldcup',
    name: 'World Cup Classics',
    years: '1930 — 2022',
    jerseys: '15 Collections',
    no: '07',
    imgs: ['/assets/legends/world%20cup.jpg', '/assets/legends/world%20cup.jpg', '/assets/legends/world%20cup.jpg'],
    orientation: 'horizontal',
  },
]

/* ─── Arrow ────────────────────────────────────────────────────────── */
function Arrow() {
  return (
    <div className="w-8 h-8 rounded-full border border-[#b6f542] flex items-center justify-center flex-shrink-0 group-hover:bg-[#b6f542] transition-all duration-300">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#b6f542"
        strokeWidth="2.5"
        className="group-hover:stroke-black transition-all duration-300"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  )
}

/* ─── Cycling background image card ────────────────────────────────── */
function LegendCard({
  legend,
  style,
  animDelay = 0,
  textSize = 'md',
}: {
  legend: Legend
  style?: React.CSSProperties
  animDelay?: number
  textSize?: 'sm' | 'md' | 'lg'
}) {
  const [imgIdx, setImgIdx] = useState(0)

  useEffect(() => {
    // stagger starts so all cards don't flip at the same time
    const startDelay = setTimeout(
      () => {
        const id = setInterval(() => setImgIdx((v) => (v + 1) % legend.imgs.length), 3500)
        return () => clearInterval(id)
      },
      animDelay * 1200
    )
    return () => clearTimeout(startDelay)
  }, [legend.imgs, animDelay])

  const nameSize =
    textSize === 'lg'
      ? 'text-[42px]'
      : textSize === 'sm'
      ? 'text-[20px]'
      : 'text-[28px]'

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group"
      style={{ background: '#111', ...style }}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: animDelay * 0.1 }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Cycling background images */}
      <AnimatePresence initial={false}>
        <motion.div
          key={imgIdx}
          className="absolute inset-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2, ease: 'easeInOut' }}
          style={{
            backgroundImage: `url(${legend.imgs[imgIdx]})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center top',
          }}
        />
      </AnimatePresence>

      {/* Bottom gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.5) 40%, rgba(0,0,0,0.1) 70%, rgba(0,0,0,0) 100%)',
        }}
      />

      {/* Card number — top left */}
      <span className="absolute top-5 left-5 text-[10px] tracking-[0.22em] text-white/55 font-semibold z-10">
        {legend.no}
      </span>

      {/* Info — bottom */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10">
        <p className="text-[9px] tracking-[0.2em] uppercase text-[#b6f542] font-semibold mb-1.5">
          {legend.jerseys}
        </p>
        <h3 className={`font-black text-white leading-[1] tracking-tight mb-1 ${nameSize}`}>
          {legend.name}
        </h3>
        <p className="text-[10px] text-white/45 tracking-widest mb-4">{legend.years}</p>
        <Arrow />
      </div>
    </motion.div>
  )
}

/* ─── More Legends Bar ──────────────────────────────────────────────── */
function MoreLegendsBar() {
  const faces = [
    '/assets/legends/maldini-1.jpg',
    '/assets/legends/ronaldinho1.jpg',
    '/assets/legends/beckham1.jpg',
    '/assets/legends/zidane1.jpg',
    '/assets/legends/maldini-2.jpg',
    '/assets/legends/messi1.jpg',
  ]

  return (
    <motion.div
      className="relative rounded-2xl overflow-hidden cursor-pointer group mt-3"
      style={{ height: 130, background: '#0e0e0e', border: '1px solid rgba(255,255,255,0.06)' }}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
      whileHover={{ scale: 1.005 }}
    >
      {/* Face strip */}
      <div className="absolute inset-0 flex">
        {faces.map((src, i) => (
          <div
            key={i}
            className="flex-1 relative"
            style={{
              backgroundImage: `url(${src})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center top',
              filter: 'grayscale(1)',
              opacity: 0.35,
            }}
          />
        ))}
      </div>

      {/* Gradient mask */}
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(to right, rgba(14,14,14,1) 0%, rgba(14,14,14,0.55) 30%, rgba(14,14,14,0.2) 70%, rgba(14,14,14,0.15) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(to top, rgba(14,14,14,0.8) 0%, transparent 100%)',
        }}
      />

      {/* Text */}
      <div className="relative z-10 flex items-center gap-6 h-full px-7">
        <span className="text-[10px] tracking-[0.2em] font-semibold text-white/40">08</span>
        <div>
          <h3 className="text-[28px] font-black text-white tracking-tight leading-[1]">More Legends</h3>
          <p className="text-[11px] text-white/35 mt-1">100+ legendary players. Endless stories.</p>
        </div>
        <div className="ml-3">
          <Arrow />
        </div>
      </div>
    </motion.div>
  )
}

/* ─── Section ───────────────────────────────────────────────────────── */
export default function LegendsSection() {
  const [neymar, ronaldo, messi, beckham, zidane, ronaldinho, worldcup] = LEGENDS

  return (
    <section id="players" className="py-24 bg-[#0a0a0a]">
      {/* Header */}
      <ScrollReveal className="text-center mb-12 px-6">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-white/35 mb-5">
          04 — Collections
        </span>
        <h2 className="text-[clamp(40px,5.5vw,82px)] font-black leading-[0.92] tracking-tight text-white">
          Discover{' '}
          <em className="font-normal italic" style={{ fontFamily: 'DM Serif Display, serif' }}>
            The Legends
          </em>
        </h2>
        <p className="text-[15px] text-white/35 mt-5 font-light tracking-wide">
          Iconic players. Legendary moments. Timeless jerseys.
        </p>
      </ScrollReveal>

      {/* Bento Grid */}
      <div className="px-6 md:px-10 max-w-[1400px] mx-auto">
        {/*
         * Layout:
         *  ┌──────────┬──────────┬────────────────────────────────┐
         *  │          │          │  Messi  (tall ~170px)          │
         *  │ Neymar   │ Ronaldo  ├─────────────────┬──────────────┤
         *  │ vertical │ vertical │  Beckham        │  Zidane      │
         *  │          │          ├─────────────────┼──────────────┤
         *  │          │          │  Ronaldinho     │  World Cup   │
         *  └──────────┴──────────┴─────────────────┴──────────────┘
         */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr 2fr',
            gridTemplateRows: '560px',
            gap: 12,
          }}
        >
          {/* Neymar — full-height vertical */}
          <LegendCard
            legend={neymar}
            animDelay={0}
            textSize="lg"
            style={{ height: '100%' }}
          />

          {/* Ronaldo — full-height vertical */}
          <LegendCard
            legend={ronaldo}
            animDelay={1}
            textSize="lg"
            style={{ height: '100%' }}
          />

          {/* Right column: nested 3-row grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: '1fr 185px 185px',
              gap: 12,
              height: '100%',
            }}
          >
            {/* Messi — wide tall top */}
            <LegendCard
              legend={messi}
              animDelay={2}
              textSize="lg"
              style={{ height: '100%' }}
            />

            {/* Beckham + Zidane — row 2 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, height: '100%' }}>
              <LegendCard legend={beckham} animDelay={3} textSize="sm" style={{ height: '100%' }} />
              <LegendCard legend={zidane} animDelay={4} textSize="sm" style={{ height: '100%' }} />
            </div>

            {/* Ronaldinho + World Cup — row 3 */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, height: '100%' }}>
              <LegendCard legend={ronaldinho} animDelay={5} textSize="sm" style={{ height: '100%' }} />
              <LegendCard legend={worldcup} animDelay={6} textSize="sm" style={{ height: '100%' }} />
            </div>
          </div>
        </div>

        {/* More Legends */}
        <MoreLegendsBar />
      </div>
    </section>
  )
}
