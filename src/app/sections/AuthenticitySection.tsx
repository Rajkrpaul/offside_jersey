'use client'

import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const cards = [
  {
    id: 'c1',
    num: '01',
    bigNum: '100%',
    title: '100% Authentic',
    desc: 'Every jersey verified by our team of football historians and experts.',
    bg: '/assets/football_culture1.png',
    highlight: false,
  },
  {
    id: 'c2',
    num: '02',
    bigNum: '180+',
    title: 'Worldwide Shipping',
    desc: 'Delivering to 180+ countries with premium tracked packaging.',
    bg: '/assets/jersey_hero.png',
    highlight: false,
  },
  {
    id: 'c3',
    num: '03',
    bigNum: '30',
    title: '30-Day Easy Returns',
    desc: 'Hassle-free returns within 30 days. No questions asked.',
    bg: '/assets/jersey_product3.png',
    highlight: true,
  }
]

export default function AuthenticitySection() {
  return (
    <section id="authenticity" className="py-[96px] px-6 md:px-[40px] bg-[#FFFFFF] w-full box-border">
      
      {/* ── Section Header ── */}
      <ScrollReveal className="text-center mb-[48px]">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-gray-400 font-semibold mb-[12px]">
          03 — PROMISE
        </span>
        <h2 className="text-[clamp(48px,5vw,64px)] font-black leading-[1] tracking-tight text-[#0a0a0a] mb-4">
          Why <em className="font-normal italic" style={{ fontFamily: 'DM Serif Display, serif' }}>Collectors</em> Trust Us
        </h2>
        <p className="text-[16px] text-gray-500 font-light max-w-xl mx-auto">
          At Offside Jersey, authenticity isn't a claim — it's our culture.<br/>
          Every jersey. Every detail. Every time.
        </p>
      </ScrollReveal>

      {/* ── Cards Grid ── */}
      <div className="w-full max-w-[1500px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-[16px]">
        {cards.map((card, i) => (
          <ScrollReveal key={card.id} delay={i * 0.1}>
            <div 
              className={`relative bg-[#0D0D0D] rounded-[16px] h-[460px] p-[28px] flex flex-col overflow-hidden group cursor-pointer transition-all duration-[280ms] ease-out hover:scale-[1.02] hover:shadow-2xl hover:z-10 ${
                card.highlight ? 'border-2 border-[#CAFF00] hover:shadow-[0_0_20px_rgba(202,255,0,0.3)]' : 'border border-transparent'
              }`}
            >
              {/* Background Photo */}
              <div className="absolute inset-0 w-full h-full z-0">
                <img src={card.bg} alt="" className="w-full h-full object-cover opacity-60 mix-blend-luminosity grayscale" />
              </div>
              
              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/85 z-10 pointer-events-none" />

              {/* Content z-20 */}
              <div className="relative z-20 flex flex-col h-full w-full">
                
                {/* Top Left Number */}
                <div className="flex items-center gap-2">
                  <span className="text-[13px] text-white font-medium">{card.num}</span>
                  <div className="w-[16px] h-[1px] bg-[#CAFF00]" />
                </div>

                {/* Center Massive Number */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center w-full">
                  <span className="text-[#CAFF00] text-[120px] lg:text-[160px] font-black leading-none tracking-tighter mix-blend-screen drop-shadow-2xl">
                    {card.bigNum}
                  </span>
                </div>

                {/* Bottom Content */}
                <div className="mt-auto flex flex-col">
                  <div className="w-[32px] h-[2px] bg-[#CAFF00] mb-4" />
                  <h3 className="text-white font-bold text-[24px] mb-2">{card.title}</h3>
                  <p className="text-gray-300 text-[14px] leading-relaxed max-w-[280px]">
                    {card.desc}
                  </p>
                </div>

                {/* Highlight Card Button */}
                {card.highlight && (
                  <div className="absolute bottom-0 right-0 w-[44px] h-[44px] bg-[#CAFF00] rounded-full flex items-center justify-center transition-transform duration-[280ms] group-hover:rotate-45">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2.5">
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
                
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>

      {/* ── Social Proof Bar ── */}
      <ScrollReveal delay={0.3} className="w-full max-w-[1500px] mx-auto mt-[24px]">
        <div className="border border-[#E5E5E5] rounded-[12px] bg-white py-[20px] px-[32px] w-full box-border flex flex-col xl:flex-row items-center justify-between gap-6 overflow-hidden">
          
          {/* Left Cluster */}
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4">
              <div className="flex -space-x-[8px]">
                {[1,2,3,4,5].map(n => (
                  <div key={n} className="w-[36px] h-[36px] rounded-full bg-gray-200 border-2 border-white overflow-hidden">
                    <img src={`https://i.pravatar.cc/100?img=${n + 10}`} alt="User" className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-[#CAFF00] text-[16px] leading-none mb-1">★★★★★</span>
                <span className="text-[13px] font-bold text-[#0a0a0a] leading-none">4.9/5 from 8,000+ collectors</span>
              </div>
            </div>
          </div>

          {/* Center Logos */}
          <div className="flex flex-wrap justify-center items-center gap-x-[40px] gap-y-4 opacity-80 mix-blend-multiply">
            <span className="font-serif font-bold text-xl tracking-tighter">FourFourTwo</span>
            <div className="flex items-center gap-1 font-sans font-black tracking-tighter leading-none text-center">
              <svg width="18" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              <div className="text-[9px] uppercase flex flex-col"><span className="tracking-widest">Classic</span><span>Football Shirts</span></div>
            </div>
            <span className="font-serif font-black text-2xl tracking-tight">GQ</span>
            <span className="font-sans font-black text-lg tracking-tighter uppercase">Hypebeast</span>
          </div>

          {/* Right Cluster */}
          <div className="flex items-center gap-3">
            <div className="w-[40px] h-[40px] rounded-full border border-gray-200 flex items-center justify-center flex-shrink-0">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[13px] font-bold text-[#0a0a0a] leading-none mb-1">Secure Checkout</span>
              <span className="text-[12px] text-gray-500 leading-none">256-bit SSL encrypted</span>
            </div>
          </div>

        </div>
      </ScrollReveal>

    </section>
  )
}
