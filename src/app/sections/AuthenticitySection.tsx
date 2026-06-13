'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const pillars = [
  {
    id: 'authentic',
    title: '100% Authentic',
    desc: 'Every jersey is professionally authenticated and verified by our team of football historians and collectors.',
    tag: 'Verified Jerseys',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
        <polyline points="9 12 11 14 15 10"/>
      </svg>
    ),
  },
  {
    id: 'shipping',
    title: 'Worldwide Shipping',
    desc: 'We deliver to 180+ countries worldwide with premium tracked shipping and fully insured packaging.',
    tag: '180+ Countries',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <circle cx="12" cy="12" r="10"/>
        <line x1="2" y1="12" x2="22" y2="12"/>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
  },
  {
    id: 'returns',
    title: 'Easy Returns',
    desc: '30-day hassle-free returns. If you\'re not completely satisfied, we\'ll make it right — no questions asked.',
    tag: '30 Day Window',
    icon: (
      <svg width="52" height="52" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <polyline points="1 4 1 10 7 10"/>
        <path d="M3.51 15a9 9 0 1 0 .49-3.51"/>
      </svg>
    ),
  },
]

export default function AuthenticitySection() {
  return (
    <section id="authenticity" className="py-32 px-6 md:px-16 bg-white">
      <ScrollReveal className="text-center mb-20">
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">07 — Promise</span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight">
          Why Collectors{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>Trust Us</em>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((p, i) => (
          <ScrollReveal key={p.id} delay={i * 0.12} className="relative">
            <motion.div
              className="relative bg-[#f5f5f5] rounded-2xl p-14 overflow-hidden group h-full"
              whileHover={{ y: -6, boxShadow: '0 24px 60px rgba(0,0,0,0.08)' }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              {/* Top accent bar */}
              <motion.div
                className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-[#b6f542] to-[#7ecf00] rounded-t-2xl"
                initial={{ scaleX: 0, transformOrigin: 'left' }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              />

              {/* Icon */}
              <motion.div
                className="text-[#0a0a0a] mb-10"
                whileHover={{ scale: 1.12, rotate: -3 }}
                transition={{ duration: 0.4 }}
              >
                {p.icon}
              </motion.div>

              <h3 className="text-[clamp(22px,2vw,30px)] font-black tracking-tight mb-4">{p.title}</h3>
              <p className="text-base leading-[1.75] text-gray-500 mb-8">{p.desc}</p>

              <span className="inline-block px-4 py-2 rounded-full bg-white border border-gray-200 text-xs font-bold tracking-[0.08em] uppercase text-gray-400">
                {p.tag}
              </span>
            </motion.div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  )
}
