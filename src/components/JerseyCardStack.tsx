'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

/* ─── Types & data ─────────────────────────────────────────────────── */
const EASE = [0.22, 1, 0.36, 1] as const

interface Jersey {
  id: number
  player: string
  club: string
  kit: string
  year: string
  tag: string
  img: string
}

const JERSEYS: Jersey[] = [
  { id: 0, player: 'Ronaldinho',  club: 'Brazil 2002',  kit: 'Away Kit',  year: '2002', tag: 'WC Champ.',   img: '/assets/jersey_product3.png' },
  { id: 1, player: 'C. Ronaldo',  club: 'Man United',   kit: 'Home Kit',  year: '2008', tag: 'UCL Winner',  img: '/assets/jersey_product1.png' },
  { id: 2, player: 'L. Messi',    club: 'FC Barcelona', kit: 'Home Kit',  year: '2011', tag: 'Treble Kit',  img: '/assets/jersey_product2.png' },
  { id: 3, player: 'Zidane',      club: 'France NT',   kit: 'Home Kit',  year: '2006', tag: 'WC Final',    img: '/assets/jersey_hero.png'     },
  { id: 4, player: 'Giggs',       club: 'Man United',   kit: 'Treble Kit',year: '1999', tag: 'Treble',      img: '/assets/jersey_product1.png' },
]

/* Stack offsets (horizontal fan layout) */
const OFFSETS = [
  { x: 0,   scale: 1,    z: 5 },
  { x: 130, scale: 0.92, z: 4 },
  { x: 240, scale: 0.84, z: 3 },
  { x: 330, scale: 0.76, z: 2 },
  { x: 400, scale: 0.68, z: 1 },
]

const CARD_W = 340
const CARD_H = 480

/* ─── Individual card face ─────────────────────────────────────────── */
function JerseyCard({ jersey, isFront, originalIndex }: { jersey: Jersey; isFront: boolean; originalIndex: number }) {
  return (
    <div
      className="relative w-full h-full rounded-[24px] overflow-hidden flex flex-col transition-colors duration-500"
      style={{
        background: isFront ? 'linear-gradient(180deg, #c0b7ab 0%, #514f4a 100%)' : 'linear-gradient(180deg, #1f1f1f 0%, #0a0a0a 100%)',
        border: '1px solid rgba(255,255,255,0.08)',
        boxShadow: isFront
          ? '0 30px 60px rgba(0,0,0,0.6), 0 0 40px rgba(182,245,66,0.1)'
          : '0 20px 40px rgba(0,0,0,0.8)',
      }}
    >
      {/* Top Bar */}
      <div className="absolute top-6 left-7 right-6 flex justify-between items-start z-10">
        <span className="text-[10px] tracking-[0.2em] font-medium" style={{ color: isFront ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.4)' }}>
          0{originalIndex + 1} / 05
        </span>
        {isFront && (
          <div className="bg-[#b6f542] text-black text-[9px] font-black uppercase px-2.5 py-1.5 rounded text-right leading-[1.2] tracking-wide shadow-[0_4px_12px_rgba(182,245,66,0.3)]">
            NEW DROP<br/>AW 2024
          </div>
        )}
      </div>

      {/* Image area */}
      <div className="flex-1 relative w-full mt-14 mb-24 flex items-center justify-center">
        <Image
          src={jersey.img}
          alt={jersey.player}
          fill
          className="object-contain p-8 drop-shadow-2xl"
          sizes="340px"
          priority={isFront}
        />
      </div>

      {/* Bottom Info */}
      <div className="absolute bottom-7 left-7 right-7 flex items-end justify-between z-10">
        <div>
          <span className="block text-[9px] tracking-[0.2em] uppercase mb-1.5 font-medium" style={{ color: isFront ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)' }}>
            {jersey.player}
          </span>
          <h3 className="text-[26px] font-bold text-white leading-[1.15] tracking-tight">
            {jersey.club}
            <br />
            {jersey.kit}
          </h3>
          <span className="block text-[8.5px] tracking-[0.2em] uppercase mt-3 font-medium" style={{ color: isFront ? 'rgba(255,255,255,0.7)' : 'rgba(255,255,255,0.2)' }}>
            {jersey.year} • ICONIC SEASON
          </span>
        </div>

        {/* Arrow icon */}
        <div
          className="w-10 h-10 rounded-full flex items-center justify-center border transition-all duration-500 flex-shrink-0"
          style={{ borderColor: isFront ? '#b6f542' : 'rgba(255,255,255,0.15)' }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={isFront ? "#b6f542" : "rgba(255,255,255,0.5)"} strokeWidth="2.5">
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Dark overlay for inactive cards */}
      {!isFront && (
        <div className="absolute inset-0 bg-black/40 pointer-events-none transition-opacity duration-500" />
      )}
    </div>
  )
}

/* ─── The stack ────────────────────────────────────────────────────── */
export default function JerseyCardStack() {
  /* orderRef holds the source of truth to avoid stale closures in intervals */
  const orderRef = useRef<number[]>([0, 1, 2, 3, 4])
  const [orderDisplay, setOrderDisplay] = useState<number[]>([0, 1, 2, 3, 4])
  const [exitingId, setExitingId] = useState<number | null>(null)
  const [freshBackId, setFreshBackId] = useState<number | null>(null)

  const locked = useRef(false)
  const hoverIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const freshTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  /* ── Core cycle: swipe front card left, shift others forward ── */
  const cycle = useCallback(() => {
    if (locked.current) return
    locked.current = true

    const cur = orderRef.current
    const frontId = cur[0]

    /* Kick off exit animation */
    setExitingId(frontId)

    /* Rotate order immediately so background cards shift forward */
    const next = [...cur.slice(1), cur[0]]
    orderRef.current = next
    setOrderDisplay(next)

    /* After exit anim finishes, snap the exited card to back position instantly */
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
    exitTimerRef.current = setTimeout(() => {
      setFreshBackId(frontId)
      setExitingId(null)
      locked.current = false

      if (freshTimerRef.current) clearTimeout(freshTimerRef.current)
      freshTimerRef.current = setTimeout(() => setFreshBackId(null), 90)
    }, 840)
  }, [])

  /* ── Hover handlers ── */
  const startCycling = useCallback(() => {
    cycle()
    hoverIntervalRef.current = setInterval(cycle, 2500)
  }, [cycle])

  const stopCycling = useCallback(() => {
    if (hoverIntervalRef.current) {
      clearInterval(hoverIntervalRef.current)
      hoverIntervalRef.current = null
    }
  }, [])

  /* Cleanup on unmount */
  useEffect(() => {
    return () => {
      stopCycling()
      if (exitTimerRef.current) clearTimeout(exitTimerRef.current)
      if (freshTimerRef.current) clearTimeout(freshTimerRef.current)
    }
  }, [stopCycling])

  /* ── Mouse tilt on front card ── */
  const containerRef = useRef<HTMLDivElement>(null)
  const frontCardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current || !frontCardRef.current || exitingId !== null) return
    const rect = containerRef.current.getBoundingClientRect()
    // Target the front card bounds approximately
    const cx = rect.left + CARD_W / 2
    const cy = rect.top + CARD_H / 2
    const dx = (e.clientX - cx) / (CARD_W / 2)
    const dy = (e.clientY - cy) / (CARD_H / 2)
    
    // Only tilt if mouse is roughly over the front card
    if (Math.abs(dx) <= 1 && Math.abs(dy) <= 1) {
      frontCardRef.current.style.transform = `perspective(800px) rotateY(${dx * 8}deg) rotateX(${-dy * 6}deg)`
    }
  }
  const handleMouseLeaveCard = () => {
    if (frontCardRef.current)
      frontCardRef.current.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)'
  }

  // Total container width = card width + max X offset (scaling starts from left)
  const maxOffset = OFFSETS[OFFSETS.length - 1]
  const CONTAINER_W = CARD_W * maxOffset.scale + maxOffset.x

  return (
    <div
      ref={containerRef}
      className="relative select-none"
      style={{ width: CONTAINER_W, height: CARD_H }}
      onMouseEnter={startCycling}
      onMouseLeave={() => { stopCycling(); handleMouseLeaveCard() }}
      onMouseMove={handleMouseMove}
    >
      {orderDisplay.map((jerseyId, posIdx) => {
        const pos = OFFSETS[posIdx]
        const isExiting = jerseyId === exitingId
        const isFreshBack = jerseyId === freshBackId && posIdx === orderDisplay.length - 1
        const isFront = posIdx === 0 && !isExiting

        /* ── Exiting: fly left ── */
        if (isExiting) {
          return (
            <motion.div
              key={`card-${jerseyId}`}
              style={{ position: 'absolute', width: CARD_W, height: CARD_H, top: 0, left: 0, zIndex: 20, transformOrigin: 'left center' }}
              initial={false}
              animate={{ x: -CARD_W - 40, opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.84, ease: EASE }}
            >
              <JerseyCard jersey={JERSEYS[jerseyId]} isFront={false} originalIndex={jerseyId} />
            </motion.div>
          )
        }

        /* ── Just moved to back: instant snap, no animation ── */
        if (isFreshBack) {
          return (
            <motion.div
              key={`card-${jerseyId}`}
              style={{ position: 'absolute', width: CARD_W, height: CARD_H, top: 0, left: 0, zIndex: pos.z, transformOrigin: 'left center' }}
              animate={{ x: pos.x, scale: pos.scale, opacity: 1 }}
              transition={{ duration: 0 }}
            >
              <JerseyCard jersey={JERSEYS[jerseyId]} isFront={false} originalIndex={jerseyId} />
            </motion.div>
          )
        }

        /* ── Normal stack card ── */
        return (
          <motion.div
            key={`card-${jerseyId}`}
            ref={isFront ? frontCardRef : undefined}
            style={{ position: 'absolute', width: CARD_W, height: CARD_H, top: 0, left: 0, zIndex: pos.z, transformOrigin: 'left center', transition: 'transform 0.25s ease' }}
            animate={{ x: pos.x, scale: pos.scale, opacity: 1 }}
            transition={{ duration: 0.72, ease: EASE }}
          >
            <JerseyCard jersey={JERSEYS[jerseyId]} isFront={isFront} originalIndex={jerseyId} />
          </motion.div>
        )
      })}
    </div>
  )
}
