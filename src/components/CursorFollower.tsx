'use client'

import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)

  /* Ring follows with spring — slightly behind the dot */
  const ringX = useSpring(mouseX, { stiffness: 140, damping: 18, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 140, damping: 18, mass: 0.6 })

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <>
      {/*
       * DOT — neon green, always visible on any background color.
       * No mix-blend-mode so it never disappears on white sections.
       */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9999]"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: 9,
          height: 9,
          borderRadius: '50%',
          background: '#b6f542',
          boxShadow: '0 0 0 1.5px rgba(0,0,0,0.25), 0 0 8px rgba(182,245,66,0.55)',
        }}
      />

      {/*
       * RING — offset-ring with a dual-tone outline so it shows on
       * both white (dark stroke) and dark (white glow) sections.
       */}
      <motion.div
        aria-hidden
        className="fixed top-0 left-0 pointer-events-none z-[9998]"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid rgba(10,10,10,0.35)',
          outline: '1.5px solid rgba(255,255,255,0.18)',
          outlineOffset: '-1px',
        }}
      />
    </>
  )
}
