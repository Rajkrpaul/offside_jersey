'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

/* ─── Cycling photo hook ─────────────────────────────────────────── */
function useCycle(imgs: string[], interval = 3600, startOffset = 0) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    if (imgs.length <= 1) return
    const t = setTimeout(() => {
      const id = setInterval(() => setIdx((v) => (v + 1) % imgs.length), interval)
      return () => clearInterval(id)
    }, startOffset)
    return () => clearTimeout(t)
  }, [imgs, interval, startOffset])
  return idx
}

/* ─── Arrow Button ───────────────────────────────────────────────── */
function ArrowBtn() {
  return (
    <div className="w-8 h-8 rounded-full border border-[#0a0a0a] flex items-center justify-center group-hover:bg-[#0a0a0a] transition-colors duration-300 mt-auto">
      <svg
        width="13"
        height="13"
        viewBox="0 0 24 24"
        fill="none"
        stroke="#0a0a0a"
        strokeWidth="2.5"
        className="group-hover:stroke-white transition-colors duration-300"
      >
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </div>
  )
}

/* ─── Base Card Component ────────────────────────────────────────── */
interface CardProps {
  eraLabel?: string
  title: string
  subtitle: string
  imgs?: string[]
  img?: string
  bgClass: string
  heightClass: string
  imageAlign?: 'logo' | 'right-blend' | 'bottom-right-blend' | 'cover-blend'
  imgStyles?: React.CSSProperties
  interval?: number
  startOffset?: number
}

function EraCard({
  eraLabel,
  title,
  subtitle,
  imgs,
  img,
  bgClass,
  heightClass,
  imageAlign = 'right-blend',
  imgStyles,
  interval = 3500,
  startOffset = 0,
}: CardProps) {
  const isBlend = imageAlign.includes('blend')
  const isLogo = imageAlign === 'logo'
  const isCover = imageAlign === 'cover-blend'

  // Normalize single image to array for cycling logic (which stops if length is 1)
  const imageList = imgs || (img ? [img] : [])
  const idx = useCycle(imageList, interval, startOffset)

  return (
    <motion.div
      className={`relative rounded-[16px] overflow-hidden cursor-pointer group flex-1 flex flex-col p-6 ${bgClass} ${heightClass}`}
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ scale: 1.015 }}
    >
      {/* Background/Foreground Image(s) */}
      <AnimatePresence initial={false}>
        {imageList.length > 0 && (
          <motion.img
            key={idx}
            src={imageList[idx]}
            alt=""
            className={`absolute pointer-events-none ${
              isLogo
                ? 'right-6 top-1/2 -translate-y-1/2 w-[40%] h-auto max-h-[60%] object-contain object-right'
                : isCover
                ? 'inset-y-0 right-0 w-[80%] h-full object-cover object-right'
                : 'inset-y-0 right-0 w-[70%] h-full object-cover object-right'
            }`}
            initial={imageList.length > 1 ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
            style={{
              maskImage: isBlend
                ? 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
                : 'none',
              WebkitMaskImage: isBlend
                ? 'linear-gradient(to left, rgba(0,0,0,1) 40%, rgba(0,0,0,0) 100%)'
                : 'none',
              ...imgStyles,
            }}
          />
        )}
      </AnimatePresence>

      {/* Top-left Label */}
      {eraLabel && (
        <span className="text-[10px] tracking-[0.15em] font-semibold text-[#0a0a0a]/40 mb-auto relative z-10">
          {eraLabel}
        </span>
      )}

      {/* Text Content */}
      <div className={`relative z-10 mt-auto flex flex-col justify-end ${eraLabel ? '' : 'h-full'}`}>
        <h3 className="text-[clamp(18px,2vw,32px)] font-black tracking-tight leading-[1.05] text-[#0a0a0a] mb-1.5 w-1/2">
          {title.split('\\n').map((line, i) => (
            <span key={i} className="block">
              {line}
            </span>
          ))}
        </h3>
        <p className="text-[10px] tracking-[0.1em] font-bold uppercase text-[#0a0a0a]/50 mb-4">
          {subtitle}
        </p>
        <ArrowBtn />
      </div>
    </motion.div>
  )
}

/* ─── Section Layout ─────────────────────────────────────────────── */
export default function EraSection() {
  return (
    <section id="era" className="bg-[#FFFFFF] py-[96px] px-[40px]">
      
      {/* ── Section Header ── */}
      <ScrollReveal className="text-center mb-[48px]">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-gray-400 font-semibold mb-[12px]">
          01 — ERAS
        </span>
        <h2 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.9] tracking-tight text-[#0a0a0a]">
          Shop By <em className="font-normal italic" style={{ fontFamily: 'DM Serif Display, serif' }}>Era</em>
        </h2>
        <p className="text-[15px] text-gray-500 mt-4 tracking-wide font-light">
          Football through time — from the golden age to modern dominance.
        </p>
      </ScrollReveal>

      {/* ── Flexbox Bento Layout ── */}
      <div className="w-full max-w-[1500px] mx-auto flex flex-col gap-[12px]">
        
        {/* ROW 1 (3 items) */}
        <div className="flex flex-col md:flex-row gap-[12px]">
          <EraCard
            eraLabel="90s — 00s"
            title="1990s\nClassics"
            subtitle="64 KITS"
            imgs={['/assets/legends/90s1.jpg', '/assets/legends/90s2.jpg', '/assets/legends/90s3.jpg']}
            bgClass="bg-[#f8f5eb]"
            heightClass="h-[340px]"
            imageAlign="cover-blend"
            interval={3600}
            startOffset={0}
          />
          <EraCard
            eraLabel="00s — 10s"
            title="2000s\nIcons"
            subtitle="98 KITS"
            imgs={['/assets/legends/2000s1.jpg', '/assets/legends/2000s2.jpg', '/assets/legends/2000s3.jpg']}
            bgClass="bg-[#f0f2fa]"
            heightClass="h-[340px]"
            imageAlign="cover-blend"
            interval={3800}
            startOffset={500}
          />
          <EraCard
            eraLabel="10s — 20s"
            title="2010s\nDominance"
            subtitle="96 KITS"
            imgs={['/assets/legends/2010s1.jpg', '/assets/legends/2010s2.jpg', '/assets/legends/2010s3.jpg']}
            bgClass="bg-[#eaf5eb]"
            heightClass="h-[340px]"
            imageAlign="cover-blend"
            interval={4000}
            startOffset={1200}
          />
        </div>

        {/* ROW 2 (5 items) */}
        <div className="flex flex-col md:flex-row gap-[12px]">
          <EraCard
            title="Premier\nLeague"
            subtitle="140+ KITS"
            img="/assets/legends/premier league logo.png"
            bgClass="bg-[#f7f0fa]"
            heightClass="h-[200px]"
            imageAlign="logo"
            imgStyles={{ opacity: 0.9 }}
          />
          <EraCard
            title="LaLiga"
            subtitle="120+ KITS"
            img="/assets/legends/laliga logo.png"
            bgClass="bg-[#fffbf5]"
            heightClass="h-[200px]"
            imageAlign="logo"
            imgStyles={{ opacity: 0.9 }}
          />
          <EraCard
            title="Bundesliga"
            subtitle="90+ KITS"
            img="/assets/legends/bundesliga logo.jpg"
            bgClass="bg-[#fcf0f2]"
            heightClass="h-[200px]"
            imageAlign="logo"
            imgStyles={{ mixBlendMode: 'multiply' }}
          />
          <EraCard
            title="Serie A"
            subtitle="90+ KITS"
            img="/assets/legends/serie a logo.png"
            bgClass="bg-[#f0f6fc]"
            heightClass="h-[200px]"
            imageAlign="logo"
            imgStyles={{ opacity: 0.9 }}
          />
          <EraCard
            title="Champions\nLeague"
            subtitle="72+ KITS"
            img="/assets/legends/champions league logo.png"
            bgClass="bg-[#f0f3f5]"
            heightClass="h-[200px]"
            imageAlign="logo"
            imgStyles={{ opacity: 0.9, mixBlendMode: 'multiply' }}
          />
        </div>

        {/* ROW 3 (2 items) */}
        <div className="flex flex-col md:flex-row gap-[12px]">
          <EraCard
            eraLabel="30s — 50s"
            title="World Cup\nLegends"
            subtitle="120+ KITS"
            img="/assets/legends/world cup eras.jpg"
            bgClass="bg-[#fff8e3]"
            heightClass="h-[300px]"
            imageAlign="cover-blend"
            imgStyles={{ backgroundPosition: 'center' }}
          />
          <EraCard
            eraLabel="All Era"
            title="National\nTeams"
            subtitle="210+ KITS"
            img="/assets/legends/national teams.jpg"
            bgClass="bg-[#f2f2f2]"
            heightClass="h-[300px]"
            imageAlign="cover-blend"
            imgStyles={{ width: '65%' }}
          />
        </div>

        {/* ROW 4 (1 item) */}
        <div className="flex flex-col md:flex-row gap-[12px]">
          <EraCard
            eraLabel="Classic Collections"
            title="Retro Kits"
            subtitle="38 KITS"
            img="/assets/legends/retro jerseys.jpg"
            bgClass="bg-[#f5f4ef]"
            heightClass="h-[180px]"
            imageAlign="right-blend"
          />
        </div>

      </div>
    </section>
  )
}
