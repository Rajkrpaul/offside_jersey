'use client'

import { useRef, type ReactNode, type MouseEvent } from 'react'
import { motion } from 'framer-motion'

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  onClick?: () => void
  type?: 'button' | 'submit' | 'reset'
  id?: string
  strength?: number
}

export default function MagneticButton({
  children,
  className = '',
  onClick,
  type = 'button',
  id,
  strength = 0.35,
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null)
  const xVal = useRef(0)
  const yVal = useRef(0)

  const handleMouseMove = (e: MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    xVal.current = (e.clientX - cx) * strength
    yVal.current = (e.clientY - cy) * strength
    ref.current.style.transform = `translate(${xVal.current}px, ${yVal.current}px)`
  }

  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
    ref.current.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)'
  }

  const handleMouseEnter = () => {
    if (!ref.current) return
    ref.current.style.transition = 'transform 0.1s ease'
  }

  return (
    <button
      ref={ref}
      id={id}
      type={type}
      className={className}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
    >
      {children}
    </button>
  )
}
