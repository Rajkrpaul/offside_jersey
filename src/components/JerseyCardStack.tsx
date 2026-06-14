'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

const EASE = [0.22, 1, 0.36, 1] as const

interface Jersey {
  id: number
  player: string
  club: string
  kit: string
  year: string
  img: string
}

const JERSEYS: Jersey[] = [
  { id: 0, player: 'Ronaldinho',  club: 'Brazil 2002',  kit: 'Away Kit',  year: '2002', img: '/assets/jersey_product3.png' },
  { id: 1, player: 'C. Ronaldo',  club: 'Man United',   kit: 'Home Kit',  year: '2008', img: '/assets/jersey_product1.png' },
  { id: 2, player: 'L. Messi',    club: 'FC Barcelona', kit: 'Home Kit',  year: '2011', img: '/assets/jersey_product2.png' },
  { id: 3, player: 'Zidane',      club: 'France NT',    kit: 'Home Kit',  year: '2006', img: '/assets/jersey_hero.png'    },
  { id: 4, player: 'Giggs',       club: 'Man United',   kit: 'Treble Kit',year: '1999', img: '/assets/jersey_product1.png' },
]

/* ─── Stack layout ─────────────────────────────────────────────────
   Front card is large and dominant.
   Background cards fan out to the right, filling the right half.
   The last card may bleed off the viewport edge (clipped by section overflow-hidden). */
const OFFSETS = [
  { x: 0,   scale: 1,    opacity: 1,   z: 5 },
  { x: 155, scale: 0.90, opacity: 1,   z: 4 },
  { x: 295, scale: 0.80, opacity: 1,   z: 3 },
  { x: 415, scale: 0.70, opacity: 0.9, z: 2 },
  { x: 518, scale: 0.60, opacity: 0.8, z: 1 },
]

const CARD_W = 410   // fills right column
const CARD_H = 590   // tall premium card

/* ─── Card face ─────────────────────────────────────────────────── */
function JerseyCard({
  jersey,
  isFront,
  posIdx,
}: {
  jersey: Jersey
  isFront: boolean
  posIdx: number
}) {
  return (
    <div
      className="relative w-full h-full rounded-[22px] overflow-hidden flex flex-col"
      style={{
        background: isFront
          ? 'linear-gradient(170deg, #b8b0a3 0%, #5a5650 100%)'
          : 'linear-gradient(170deg, #1e1e1e 0%, #0c0c0c 100%)',
        border: '1px solid rgba(255,255,255,0.07)',
        boxShadow: isFront
          ? '0 32px 72px rgba(0,0,0,0.75), 0 0 0 1px rgba(182,245,66,0.12)'
          : '0 16px 40px rgba(0,0,0,0.9)',
      }}
    >
      {/* Top bar */}
      <div className="absolute top-5 left-6 right-5 flex justify-between items-start z-10">
        <span
          className="text-[10px] tracking-[0.22em] font-semibold"
          style={{ color: isFront ? 'rgba(255,255,255,0.85)' : 'rgba(255,255,255,0.35)' }}
        >
          0{posIdx + 1}&nbsp;/&nbsp;05
        </span>
        {isFront && (
          <div className="bg-[#b6f542] text-black text-[8px] font-black uppercase px-2 py-1.5 rounded text-right leading-[1.3] tracking-wider shadow-[0_4px_14px_rgba(182,245,66,0.35)]">
            NEW DROP
            <br />
            AW 2024
          </div>
        )}
      </div>

      {/* Jersey image */}
      <div className="flex-1 relative w-full mt-14 mb-28">
        <Image
          src={jersey.img}
          alt={jersey.player}
          fill
          className="object-contain p-6 drop-shadow-2xl"
          sizes="410px"
          priority={isFront}
        />
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between z-10">
        <div>
          <span
            className="block text-[9px] tracking-[0.2em] uppercase mb-1 font-semibold"
            style={{ color: isFront ? 'rgba(255,255,255,0.75)' : 'rgba(255,255,255,0.25)' }}
          >
            {jersey.player}
          </span>
          <h3 className="text-[22px] font-bold text-white leading-[1.15] tracking-tight">
            {jersey.club}
            <br />
            {jersey.kit}
          </h3>
          <span
            className="block text-[8px] tracking-[0.2em] uppercase mt-2 font-medium"
            style={{ color: isFront ? 'rgba(255,255,255,0.6)' : 'rgba(255,255,255,0.18)' }}
          >
            {jersey.year} · ICONIC SEASON
          </span>
        </div>

        <div
          className="w-9 h-9 rounded-full flex items-center justify-center border flex-shrink-0 transition-colors duration-500"
          style={{ borderColor: isFront ? '#b6f542' : 'rgba(255,255,255,0.12)' }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke={isFront ? '#b6f542' : 'rgba(255,255,255,0.4)'}
            strokeWidth="2.5"
          >
            <path d="M5 12h14M12 5l7 7-7 7" />
          </svg>
        </div>
      </div>

      {/* Subtle dark overlay for background cards — keeps jerseys visible */}
      {!isFront && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'rgba(0,0,0,0.18)' }}
        />
      )}
    </div>
  )
}

/* ─── Stack controller ───────────────────────────────────────────── */
export default function JerseyCardStack() {
  const orderRef = useRef<number[]>([0, 1, 2, 3, 4])
  const [orderDisplay, setOrderDisplay] = useState<number[]>([0, 1, 2, 3, 4])
  const [exitingId, setExitingId] = useState<number | null>(null)
  const [freshBackId, setFreshBackId] = useState<number | null>(null)

  const locked = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const exitTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const freshTimer = useRef<ReturnType<typeof setTimeout> | null>(null)

  const cycle = useCallback(() => {
    if (locked.current) return
    locked.current = true

    const cur = orderRef.current
    const frontId = cur[0]
    setExitingId(frontId)

    const next = [...cur.slice(1), cur[0]]
    orderRef.current = next
    setOrderDisplay(next)

    if (exitTimer.current) clearTimeout(exitTimer.current)
    exitTimer.current = setTimeout(() => {
      setFreshBackId(frontId)
      setExitingId(null)
      locked.current = false
      if (freshTimer.current) clearTimeout(freshTimer.current)
      freshTimer.current = setTimeout(() => setFreshBackId(null), 80)
    }, 820)
  }, [])

  const startCycling = useCallback(() => {
    cycle()
    intervalRef.current = setInterval(cycle, 2600)
  }, [cycle])

  const stopCycling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
  }, [])

  useEffect(
    () => () => {
      stopCycling()
      if (exitTimer.current) clearTimeout(exitTimer.current)
      if (freshTimer.current) clearTimeout(freshTimer.current)
    },
    [stopCycling]
  )

  /* Container width: front card + how far last card peeks out */
  const lastOff = OFFSETS[OFFSETS.length - 1]
  const CONTAINER_W = lastOff.x + CARD_W * lastOff.scale

  return (
    <div
      className="relative select-none"
      style={{ width: CONTAINER_W, height: CARD_H }}
      onMouseEnter={startCycling}
      onMouseLeave={stopCycling}
    >
      {orderDisplay.map((jerseyId, posIdx) => {
        const pos = OFFSETS[posIdx]
        const isExiting = jerseyId === exitingId
        const isFreshBack = jerseyId === freshBackId && posIdx === orderDisplay.length - 1
        const isFront = posIdx === 0 && !isExiting

        /* Exiting — slide left and fade */
        if (isExiting) {
          return (
            <motion.div
              key={`card-${jerseyId}`}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                top: 0,
                left: 0,
                zIndex: 20,
                transformOrigin: 'center center',
              }}
              initial={false}
              animate={{ x: -(CARD_W + 60), opacity: 0, scale: 0.88 }}
              transition={{ duration: 0.82, ease: EASE }}
            >
              <JerseyCard jersey={JERSEYS[jerseyId]} isFront={false} posIdx={posIdx} />
            </motion.div>
          )
        }

        /* Snapped back — no animation */
        if (isFreshBack) {
          return (
            <motion.div
              key={`card-${jerseyId}`}
              style={{
                position: 'absolute',
                width: CARD_W,
                height: CARD_H,
                top: 0,
                left: 0,
                zIndex: pos.z,
              }}
              animate={{ x: pos.x, scale: pos.scale, opacity: pos.opacity }}
              transition={{ duration: 0 }}
            >
              <JerseyCard jersey={JERSEYS[jerseyId]} isFront={false} posIdx={posIdx} />
            </motion.div>
          )
        }

        /* Normal */
        return (
          <motion.div
            key={`card-${jerseyId}`}
            style={{
              position: 'absolute',
              width: CARD_W,
              height: CARD_H,
              top: 0,
              left: 0,
              zIndex: pos.z,
            }}
            animate={{ x: pos.x, scale: pos.scale, opacity: pos.opacity }}
            transition={{ duration: 0.7, ease: EASE }}
          >
            <JerseyCard jersey={JERSEYS[jerseyId]} isFront={isFront} posIdx={posIdx} />
          </motion.div>
        )
      })}

      {/* Green glow under front card */}
      <div
        className="absolute pointer-events-none"
        style={{
          bottom: -14,
          left: CARD_W * 0.1,
          width: CARD_W * 0.6,
          height: 22,
          background: 'rgba(182,245,66,0.22)',
          filter: 'blur(18px)',
          borderRadius: '50%',
        }}
      />
    </div>
  )
}
