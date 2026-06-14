'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!email.includes('@')) return
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 4000)
  }

  const titleWords = ['THE ARCHIVE', 'NEVER STOPS', 'GROWING.']

  return (
    <section id="newsletter" className="relative py-[clamp(80px,12vw,180px)] px-6 md:px-16 bg-[#0a0a0a] overflow-hidden text-center">
      {/* Radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-[#b6f542]/[0.04] blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <ScrollReveal>
          <span className="block text-xs tracking-[0.2em] uppercase text-white/25 mb-8">06 - Stay Close</span>
        </ScrollReveal>

        {/* Huge title */}
        <div className="mb-12">
          {titleWords.map((word, i) => (
            <ScrollReveal key={word} delay={i * 0.12} className="overflow-hidden">
              <h2
                className={`block text-[clamp(52px,9vw,128px)] font-black leading-[0.88] tracking-[-0.05em] ${
                  i === 1
                    ? 'text-white/40'
                    : 'text-white'
                }`}
                style={{ fontFamily: i === 1 ? 'DM Serif Display, serif' : undefined, fontStyle: i === 1 ? 'italic' : undefined, fontWeight: i === 1 ? '400' : undefined }}
              >
                {word}
              </h2>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.3}>
          <p className="text-base text-white/35 max-w-md mx-auto mb-12 leading-[1.8]">
            Get first access to new drops, rare finds, and exclusive collections.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.4}>
          <form onSubmit={handleSubmit} className="flex flex-col items-center gap-4">
            <div className="flex w-full max-w-[540px] bg-white/[0.06] border border-white/[0.1] rounded-full pl-7 pr-2 py-2 gap-2 focus-within:border-[#b6f542]/40 transition-colors duration-300">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-transparent text-white text-base outline-none placeholder:text-white/20"
              />
              <MagneticButton
                id="newsletter-submit"
                type="submit"
                className={`inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-bold tracking-wide whitespace-nowrap transition-all duration-300 ${
                  submitted
                    ? 'bg-green-500 text-white'
                    : 'bg-[#b6f542] text-black hover:scale-105 hover:shadow-[0_8px_32px_rgba(182,245,66,0.35)]'
                }`}
              >
                {submitted ? (
                  <>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                    You're in!
                  </>
                ) : (
                  <>
                    Join the Archive
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </>
                )}
              </MagneticButton>
            </div>
            <p className="text-xs text-white/15 tracking-wide">No spam. Unsubscribe anytime. We respect your privacy.</p>
          </form>
        </ScrollReveal>
      </div>
    </section>
  )
}
