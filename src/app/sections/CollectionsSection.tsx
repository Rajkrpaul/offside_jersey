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

/* ─── Photo cell (cycles images) ────────────────────────────────── */
function PhotoCell({
  imgs,
  alt,
  objectPos = 'center top',
  interval = 3600,
  startOffset = 0,
  style,
  className = '',
}: {
  imgs: string[]
  alt: string
  objectPos?: string
  interval?: number
  startOffset?: number
  style?: React.CSSProperties
  className?: string
}) {
  const idx = useCycle(imgs, interval, startOffset)
  return (
    <div className={`relative overflow-hidden rounded-2xl ${className}`} style={style}>
      <AnimatePresence initial={false}>
        <motion.div
          key={idx}
          className="absolute inset-0"
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            backgroundImage: `url(${imgs[idx]})`,
            backgroundSize: 'cover',
            backgroundPosition: objectPos,
          }}
        />
      </AnimatePresence>
      {/* Bottom gradient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'linear-gradient(to top, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0.2) 45%, transparent 100%)',
        }}
      />
    </div>
  )
}

/* ─── Jersey card (static product image, white bg) ──────────────── */
function JerseyCard({
  img,
  label,
  sub,
  style,
  className = '',
}: {
  img: string
  label: string
  sub: string
  style?: React.CSSProperties
  className?: string
}) {
  return (
    <motion.div
      className={`relative rounded-2xl overflow-hidden bg-[#f2f2f0] group cursor-pointer flex flex-col ${className}`}
      style={style}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="flex-1 flex items-center justify-center p-6">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={img}
          alt={label}
          className="w-full h-full object-contain drop-shadow-xl"
          style={{ maxHeight: '100%' }}
        />
      </div>
      <div className="px-5 pb-5">
        <p className="text-[11px] tracking-[0.18em] uppercase text-gray-400 font-medium mb-0.5">{sub}</p>
        <h4 className="text-[15px] font-black text-[#0a0a0a] tracking-tight">{label}</h4>
      </div>
      {/* Green hover line */}
      <div className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#b6f542] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-400" />
    </motion.div>
  )
}

/* ─── Legend info label (overlaid on photo cells) ────────────────── */
function LegendLabel({
  name,
  jerseys,
  years,
  size = 'md',
}: {
  name: string
  jerseys: string
  years: string
  size?: 'sm' | 'md' | 'lg'
}) {
  const nameClass =
    size === 'lg'
      ? 'text-[44px]'
      : size === 'sm'
      ? 'text-[20px]'
      : 'text-[28px]'
  return (
    <div className="absolute bottom-0 left-0 right-0 p-6 z-10">
      <p className="text-[9px] tracking-[0.22em] uppercase text-[#b6f542] font-bold mb-1.5">
        {jerseys}
      </p>
      <h3 className={`font-black text-white leading-[1] tracking-tight mb-1 ${nameClass}`}>
        {name}
      </h3>
      <p className="text-[10px] text-white/50 tracking-widest">{years}</p>
    </div>
  )
}

/* ─── Arrow button ───────────────────────────────────────────────── */
function ArrowBtn({ label = 'Explore' }: { label?: string }) {
  return (
    <motion.button
      className="group inline-flex items-center gap-3 px-6 py-3 rounded-full border border-[#0a0a0a] text-[#0a0a0a] text-[13px] font-bold tracking-wide hover:bg-[#0a0a0a] hover:text-white transition-colors duration-300"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
    >
      {label}
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </motion.button>
  )
}

/* ─── Section ────────────────────────────────────────────────────── */
export default function CollectionsSection() {
  return (
    <section id="collections" className="bg-white py-24 px-6 md:px-12 lg:px-16">
      {/*
       * ASYMMETRIC 5-COLUMN EDITORIAL GRID
       *
       * Columns: [1.1fr 1.2fr 1fr 0.9fr 0.8fr] × rows explicit
       *
       *  Row 1 (tall ~480px):
       *   [INTRO BLOCK 2col] [RONALDO photo 1col] [MESSI photo 2col]
       *
       *  Row 2 (medium ~280px):
       *   [JERSEY 1col] [RONALDO continues] [NEYMAR photo 2col] [JERSEY 1col]
       *
       *  Row 3 (short ~220px):
       *   [JERSEY 2col] [STADIUM/WIDE 3col]
       */}

      {/* ── Section eyebrow ── */}
      <ScrollReveal className="mb-10">
        <span className="text-[11px] tracking-[0.25em] uppercase text-gray-400 font-semibold">
          01 — Legends
        </span>
      </ScrollReveal>

      {/* ── MAIN EDITORIAL GRID ── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1.15fr 1.3fr 1fr 1fr 0.85fr',
          gridTemplateRows: '460px 260px 210px',
          gap: 14,
        }}
      >

        {/* ── CELL A: Intro / copy block ── col 1, row 1 */}
        <ScrollReveal
          delay={0}
          style={{ gridColumn: '1 / 2', gridRow: '1 / 2' }}
          className="flex flex-col justify-between bg-[#0a0a0a] rounded-2xl p-9"
        >
          <div>
            <p className="text-[10px] tracking-[0.22em] uppercase text-[#b6f542] font-bold mb-6">
              Football Archive
            </p>
            <h2 className="text-[clamp(34px,3.2vw,54px)] font-black leading-[0.9] tracking-tight text-white mb-6">
              DISCOVER<br />
              <em className="font-normal italic text-white/60" style={{ fontFamily: 'DM Serif Display, serif' }}>
                The Legends
              </em>
            </h2>
            <p className="text-[13px] text-white/45 leading-[1.7] font-light">
              Relive football's greatest eras through iconic jerseys worn by the players who defined the game.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <ArrowBtn label="Explore Legends" />
            <p className="text-[10px] text-white/25 tracking-widest uppercase">
              42 Legends · 400+ Jerseys
            </p>
          </div>
        </ScrollReveal>

        {/* ── CELL B: Ronaldo tall photo ── col 2, rows 1–2 */}
        <motion.div
          className="relative cursor-pointer group"
          style={{ gridColumn: '2 / 3', gridRow: '1 / 3' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.05 }}
          whileHover={{ scale: 1.012 }}
        >
          <PhotoCell
            imgs={['/assets/legends/ronaldo1.jpg', '/assets/legends/ronaldo2.jpg', '/assets/legends/ronaldo3.jpg']}
            alt="Ronaldo"
            objectPos="center top"
            interval={3800}
            startOffset={0}
            style={{ height: '100%' }}
          />
          <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] text-white/50 font-semibold">02</span>
          <LegendLabel name="Ronaldo" jerseys="38 Jerseys" years="2003 — 2023" size="lg" />
        </motion.div>

        {/* ── CELL C: Messi wide photo ── cols 3–4, row 1 */}
        <motion.div
          className="relative cursor-pointer group"
          style={{ gridColumn: '3 / 5', gridRow: '1 / 2' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          whileHover={{ scale: 1.012 }}
        >
          <PhotoCell
            imgs={['/assets/legends/messi1.jpg', '/assets/legends/messi2.jpg', '/assets/legends/messi3.jpg']}
            alt="Messi"
            objectPos="center 20%"
            interval={3600}
            startOffset={500}
            style={{ height: '100%' }}
          />
          <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] text-white/50 font-semibold">03</span>
          <LegendLabel name="Messi" jerseys="42 Jerseys" years="2004 — 2025" size="lg" />
        </motion.div>

        {/* ── CELL D: Jersey card ── col 5, row 1 */}
        <ScrollReveal
          delay={0.12}
          style={{ gridColumn: '5 / 6', gridRow: '1 / 2' }}
        >
          <JerseyCard
            img="/assets/jersey_product2.png"
            label="Barça Home Kit"
            sub="2010–11 · Treble"
            style={{ height: '100%' }}
          />
        </ScrollReveal>

        {/* ── CELL E: Jersey card ── col 1, row 2 */}
        <ScrollReveal
          delay={0.14}
          style={{ gridColumn: '1 / 2', gridRow: '2 / 3' }}
        >
          <JerseyCard
            img="/assets/jersey_product1.png"
            label="Man Utd Home Kit"
            sub="2007–08 · UCL"
            style={{ height: '100%' }}
          />
        </ScrollReveal>

        {/* ── CELL F: Neymar tall photo ── cols 3–4, row 2 */}
        <motion.div
          className="relative cursor-pointer group"
          style={{ gridColumn: '3 / 5', gridRow: '2 / 3' }}
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.18 }}
          whileHover={{ scale: 1.012 }}
        >
          <PhotoCell
            imgs={['/assets/legends/neymar1.jpg', '/assets/legends/neymar2.jpg', '/assets/legends/neymar3.jpg']}
            alt="Neymar"
            objectPos="center 15%"
            interval={4000}
            startOffset={1200}
            style={{ height: '100%' }}
          />
          <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] text-white/50 font-semibold">01</span>
          <LegendLabel name="Neymar Jr" jerseys="24 Jerseys" years="2010 — 2025" size="md" />
        </motion.div>

        {/* ── CELL G: Jersey card ── col 5, row 2 */}
        <ScrollReveal
          delay={0.2}
          style={{ gridColumn: '5 / 6', gridRow: '2 / 3' }}
        >
          <JerseyCard
            img="/assets/jersey_hero.png"
            label="France Home Kit"
            sub="2006 · WC Final"
            style={{ height: '100%' }}
          />
        </ScrollReveal>

        {/* ── CELL H: Beckham photo ── cols 1–2, row 3 */}
        <motion.div
          className="relative cursor-pointer group"
          style={{ gridColumn: '1 / 3', gridRow: '3 / 4' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.22 }}
          whileHover={{ scale: 1.012 }}
        >
          <PhotoCell
            imgs={['/assets/legends/beckham1.jpg', '/assets/legends/beckham2.jpg', '/assets/legends/beckham3.jpg']}
            alt="Beckham"
            objectPos="center 25%"
            interval={3400}
            startOffset={800}
            style={{ height: '100%' }}
          />
          <span className="absolute top-5 left-5 text-[10px] tracking-[0.2em] text-white/50 font-semibold">04</span>
          <LegendLabel name="Beckham" jerseys="27 Jerseys" years="1992 — 2013" size="sm" />
        </motion.div>

        {/* ── CELL I: Wide stadium/Ronaldinho card ── cols 3–5, row 3 */}
        <motion.div
          className="relative cursor-pointer group"
          style={{ gridColumn: '3 / 6', gridRow: '3 / 4' }}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.28 }}
          whileHover={{ scale: 1.008 }}
        >
          <PhotoCell
            imgs={['/assets/legends/ronaldinho1.jpg', '/assets/legends/ronaldinho2.jpg', '/assets/legends/ronaldinho3.jpg']}
            alt="Ronaldinho"
            objectPos="center 30%"
            interval={3200}
            startOffset={600}
            style={{ height: '100%' }}
          />
          {/* Cinematic wide label */}
          <div className="absolute inset-0 flex items-end justify-between px-8 pb-7 z-10">
            <div>
              <p className="text-[9px] tracking-[0.22em] uppercase text-[#b6f542] font-bold mb-1">
                24 Jerseys
              </p>
              <h3 className="text-[26px] font-black text-white tracking-tight leading-[1]">
                Ronaldinho
              </h3>
              <p className="text-[10px] text-white/45 mt-1 tracking-widest">1998 — 2015</p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-[10px] tracking-[0.2em] text-white/40 font-semibold">05</span>
              <div className="w-9 h-9 rounded-full border border-[#b6f542] flex items-center justify-center">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#b6f542" strokeWidth="2.5">
                  <path d="M5 12h14M12 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
