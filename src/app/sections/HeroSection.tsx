'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useTransform } from 'framer-motion'
import MagneticButton from '@/components/MagneticButton'

/* ── Flow-line canvas ─────────────────────────────── */
function FlowCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let raf: number
    let t = 0

    const lines = Array.from({ length: 14 }, () => ({
      y:       Math.random() * window.innerHeight,
      speed:   0.2 + Math.random() * 0.4,
      amp:     60 + Math.random() * 80,
      freq:    0.002 + Math.random() * 0.003,
      phase:   Math.random() * Math.PI * 2,
      opacity: 0.12 + Math.random() * 0.22,
      width:   0.5 + Math.random() * 1.5,
      green:   Math.random() > 0.72,
    }))

    function resize() {
      canvas!.width  = canvas!.offsetWidth
      canvas!.height = canvas!.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    function draw() {
      ctx.clearRect(0, 0, canvas!.width, canvas!.height)
      t += 0.008
      lines.forEach((l) => {
        ctx.beginPath()
        ctx.strokeStyle = l.green ? '#b6f542' : '#ffffff'
        ctx.globalAlpha = l.opacity
        ctx.lineWidth   = l.width
        for (let i = 0; i <= 100; i++) {
          const x = (i / 100) * canvas!.width
          const w1 = Math.sin(x * l.freq + l.phase + t * l.speed) * l.amp
          const w2 = Math.cos(x * l.freq * 0.7 + l.phase * 1.3 + t * l.speed * 0.6) * (l.amp * 0.4)
          const y = l.y + w1 + w2
          i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y)
        }
        ctx.stroke()
      })
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="hero-canvas z-0" />
}

/* ── Animated counter ─────────────────────────────── */
function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const count = useMotionValue(0)

  useEffect(() => {
    let frame: number
    const duration = 1800
    const start = performance.now()

    function step(now: number) {
      const progress = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - progress, 3)
      count.set(Math.round(ease * target))
      if (progress < 1) frame = requestAnimationFrame(step)
    }

    const delay = setTimeout(() => { frame = requestAnimationFrame(step) }, 2800)
    return () => { clearTimeout(delay); cancelAnimationFrame(frame) }
  }, [target, count])

  return (
    <motion.span>
      {useTransform(count, (v) => `${v.toLocaleString()}${suffix}`)}
    </motion.span>
  )
}

/* ── Particles ────────────────────────────────────── */
function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]">
      {Array.from({ length: 35 }).map((_, i) => {
        const size   = 1 + Math.random() * 2.5
        const left   = Math.random() * 100
        const dur    = 8 + Math.random() * 10
        const delay  = -(Math.random() * dur)
        const green  = Math.random() > 0.7

        return (
          <span
            key={i}
            className="absolute bottom-0 rounded-full"
            style={{
              width:     size,
              height:    size,
              left:      `${left}%`,
              background: green ? '#b6f542' : 'rgba(255,255,255,0.5)',
              opacity:    0.3 + Math.random() * 0.5,
              animation: `particle-rise ${dur}s ${delay}s linear infinite`,
            }}
          />
        )
      })}
    </div>
  )
}

/* ── Hero Section ─────────────────────────────────── */
export default function HeroSection() {
  const jerseyRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (!jerseyRef.current) return
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top  + rect.height / 2
    const dx = (e.clientX - cx) / rect.width
    const dy = (e.clientY - cy) / rect.height
    jerseyRef.current.style.transform = `perspective(1000px) rotateY(${dx * 14}deg) rotateX(${-dy * 10}deg)`
  }

  const handleMouseLeave = () => {
    if (!jerseyRef.current) return
    jerseyRef.current.style.transform = ''
  }

  const titleLines = ['WEAR', 'FOOTBALL', 'HISTORY.']

  const stats = [
    { num: 2400, label: 'Jerseys', suffix: '+' },
    { num: 180,  label: 'Countries' },
    { num: 42,   label: 'Legends' },
  ]

  return (
    <section
      id="hero"
      className="relative min-h-screen bg-[#0a0a0a] flex items-center overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <FlowCanvas />
      <Particles />

      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/80 to-transparent z-[2] pointer-events-none" />

      {/* Content */}
      <div className="relative z-[3] w-full flex flex-col lg:flex-row items-center gap-12 px-6 md:px-16 pt-24 pb-16">

        {/* LEFT */}
        <div className="flex-1 max-w-xl">
          {/* Eyebrow */}
          <motion.div
            className="flex items-center gap-2.5 text-xs tracking-[0.18em] uppercase text-white/40 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#b6f542] animate-pulse-dot" />
            Est. 1966 — Football Archive
          </motion.div>

          {/* Title */}
          <h1 className="text-[clamp(64px,10vw,130px)] font-black leading-[0.9] tracking-tight mb-8">
            {titleLines.map((line, i) => (
              <motion.span
                key={line}
                className={`block overflow-hidden ${i === 2 ? 'italic text-white/70 font-light' : 'text-white'}`}
                style={{ fontFamily: i === 2 ? 'DM Serif Display, serif' : undefined }}
                initial={{ y: '100%', opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 2.6 + i * 0.15, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            ))}
          </h1>

          {/* Subtext */}
          <motion.p
            className="text-[clamp(15px,1.5vw,18px)] leading-[1.9] text-white/40 font-light mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.1, duration: 0.8 }}
          >
            Rare jerseys.<br />
            Legendary moments.<br />
            Authentic football culture.
          </motion.p>

          {/* Buttons */}
          <motion.div
            className="flex flex-wrap gap-4 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 3.25, duration: 0.7 }}
          >
            <MagneticButton
              id="hero-shop"
              onClick={() => document.getElementById('bestsellers')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#b6f542] text-black font-bold text-base hover:-translate-y-1 hover:shadow-[0_12px_36px_rgba(182,245,66,0.45)] transition-all duration-300 overflow-hidden relative group"
            >
              <span className="relative z-10">Shop Collection</span>
              <svg className="relative z-10" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </MagneticButton>

            <MagneticButton
              id="hero-explore"
              onClick={() => document.getElementById('players')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full border border-white/25 text-white font-semibold text-base hover:border-white/60 hover:bg-white/5 hover:-translate-y-0.5 transition-all duration-300"
            >
              Explore Legends
            </MagneticButton>
          </motion.div>

          {/* Stats */}
          <motion.div
            className="flex items-center gap-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 3.5, duration: 0.8 }}
          >
            {stats.map((s, i) => (
              <div key={s.label} className="flex items-center gap-8">
                <div className="text-center">
                  <div className="text-3xl font-black text-white tracking-tight tabular-nums">
                    <Counter target={s.num} suffix={s.suffix} />
                  </div>
                  <div className="text-[10px] tracking-[0.16em] uppercase text-white/35 mt-1">{s.label}</div>
                </div>
                {i < stats.length - 1 && <div className="w-px h-10 bg-white/10" />}
              </div>
            ))}
          </motion.div>
        </div>

        {/* RIGHT — floating jersey */}
        <motion.div
          className="flex-1 flex items-center justify-center"
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 2.8, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            ref={jerseyRef}
            className="relative w-[min(420px,42vw)] aspect-[3/4] animate-float transition-transform duration-300"
          >
            {/* Glow */}
            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-16 bg-[#b6f542]/20 blur-2xl rounded-full" />

            <Image
              src="/assets/jersey_hero.png"
              alt="Featured Football Jersey"
              fill
              priority
              className="object-contain drop-shadow-[0_40px_80px_rgba(0,0,0,0.7)]"
              sizes="(max-width: 768px) 60vw, 42vw"
            />

            {/* Badge */}
            <div className="absolute top-6 -right-4 flex flex-col items-center bg-[#b6f542] text-black text-[9px] font-black tracking-[0.12em] uppercase px-3.5 py-2.5 rounded gap-0.5 shadow-[0_8px_24px_rgba(182,245,66,0.4)]">
              <span>NEW DROP</span>
              <span>AW 2024</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[3] flex flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent to-white/40 animate-scroll-line" />
        <span className="text-[10px] tracking-[0.18em] uppercase text-white/30">Scroll</span>
      </div>
    </section>
  )
}
