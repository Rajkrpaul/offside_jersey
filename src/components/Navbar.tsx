'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import MagneticButton from './MagneticButton'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    setMenuOpen(false)
  }

  const navLinks = [
    { label: 'Collections', id: 'collections' },
    { label: 'Shop by Era', id: 'era' },
    { label: 'Best Sellers', id: 'bestsellers' },
    { label: 'Legends', id: 'players' },
  ]

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 h-20 z-50 flex items-center px-6 md:px-16 transition-all duration-500 ${
          scrolled ? 'bg-white/90 backdrop-blur-xl border-b border-gray-100' : ''
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.6, ease: [0.16, 1, 0.3, 1] }}
      >
        {/* Logo */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className={`text-lg font-black tracking-tight mr-auto ${scrolled ? 'text-[#0a0a0a]' : 'text-white'}`}
          id="nav-logo"
        >
          OFFSIDE<span className="text-[#b6f542]">JERSEY</span>
        </button>

        {/* Desktop links */}
        <div className="hidden md:flex gap-9 mx-auto">
          {navLinks.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-sm font-medium tracking-wide relative group ${
                scrolled ? 'text-gray-500' : 'text-white/75'
              } hover:text-[#b6f542] transition-colors duration-300`}
            >
              {l.label}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#b6f542] group-hover:w-full transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]" />
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 ml-auto">
          {/* Bag */}
          <MagneticButton
            id="nav-bag"
            className={`w-10 h-10 flex items-center justify-center rounded-full relative transition-colors ${
              scrolled ? 'text-gray-500 hover:bg-gray-100' : 'text-white/75'
            }`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <path d="M16 10a4 4 0 0 1-8 0" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#b6f542] text-black text-[9px] font-black rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </MagneticButton>

          {/* CTA */}
          <MagneticButton
            id="nav-shop-cta"
            onClick={() => scrollTo('bestsellers')}
            className="hidden md:inline-flex items-center px-5 py-2.5 rounded-full bg-[#b6f542] text-black text-sm font-bold hover:-translate-y-0.5 hover:shadow-[0_8px_24px_rgba(182,245,66,0.4)] transition-all duration-300"
          >
            Shop Now
          </MagneticButton>

          {/* Hamburger */}
          <button
            id="nav-menu-toggle"
            onClick={() => setMenuOpen(!menuOpen)}
            className={`md:hidden flex flex-col gap-1.5 w-7 p-1 ${scrolled ? 'text-black' : 'text-white'}`}
            aria-label="Menu"
          >
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-opacity duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`w-full h-0.5 bg-current transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-[#0a0a0a] flex flex-col items-center justify-center gap-8"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            {navLinks.map((l, i) => (
              <motion.button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-5xl font-black text-white tracking-tight hover:text-[#b6f542] transition-colors"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              >
                {l.label}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
