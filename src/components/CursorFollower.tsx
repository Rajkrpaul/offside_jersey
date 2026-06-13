'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorFollower() {
  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(cursorX, { damping: 20, stiffness: 150 })
  const ringY = useSpring(cursorY, { damping: 20, stiffness: 150 })

  const dotRef = useRef<HTMLDivElement>(null)
  const ringRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const onEnter = () => {
      dotRef.current?.classList.add('scale-0')
      ringRef.current?.classList.add('!w-16', '!h-16', '!border-[--color-neon]')
    }
    const onLeave = () => {
      dotRef.current?.classList.remove('scale-0')
      ringRef.current?.classList.remove('!w-16', '!h-16', '!border-[--color-neon]')
    }

    window.addEventListener('mousemove', move)

    const hoverEls = document.querySelectorAll(
      'a, button, [data-cursor], .product-card, .bento-card, input'
    )
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', onEnter)
      el.addEventListener('mouseleave', onLeave)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', onEnter)
        el.removeEventListener('mouseleave', onLeave)
      })
    }
  }, [cursorX, cursorY])

  return (
    <>
      {/* Dot */}
      <motion.div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-[#0a0a0a] pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-200"
        style={{ x: cursorX, y: cursorY }}
      />
      {/* Ring */}
      <motion.div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-black/30 pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-all duration-300"
        style={{ x: ringX, y: ringY }}
      />
    </>
  )
}
