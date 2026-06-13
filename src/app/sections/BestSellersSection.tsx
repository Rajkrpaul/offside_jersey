'use client'

import { useState } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'
import MagneticButton from '@/components/MagneticButton'

interface Product {
  id: string
  player: string
  year: string
  name: string
  price: string
  badge?: { label: string; type: 'rare' | 'new' | 'limited' }
  imgFront: string
  imgBack: string
  size: 'featured' | 'medium' | 'small'
}

const products: Product[] = [
  { id: 'p1', player: 'Lionel Messi',      year: '2015', name: 'FCB Champions League Final', price: '£289', badge: { label: 'RARE',    type: 'rare'    }, imgFront: '/assets/jersey_hero.png',    imgBack: '/assets/jersey_product1.png', size: 'featured' },
  { id: 'p2', player: 'Cristiano Ronaldo', year: '2018', name: 'Portugal World Cup',          price: '£219', badge: { label: 'NEW',     type: 'new'     }, imgFront: '/assets/jersey_product2.png', imgBack: '/assets/jersey_product3.png', size: 'medium'   },
  { id: 'p3', player: 'David Beckham',     year: '2001', name: 'England Away Classic',        price: '£179', badge: { label: 'LIMITED', type: 'limited' }, imgFront: '/assets/jersey_product3.png', imgBack: '/assets/jersey_hero.png',    size: 'medium'   },
  { id: 'p4', player: 'Zinedine Zidane',   year: '2002', name: 'UCL Final — Real Madrid',     price: '£249',                                               imgFront: '/assets/jersey_product1.png', imgBack: '/assets/jersey_product2.png', size: 'small'    },
  { id: 'p5', player: 'Ronaldinho',        year: '2006', name: 'Barcelona Home Classic',      price: '£195',                                               imgFront: '/assets/jersey_product2.png', imgBack: '/assets/jersey_product3.png', size: 'small'    },
  { id: 'p6', player: 'Paolo Maldini',     year: '2003', name: 'AC Milan UCL Final',          price: '£329', badge: { label: 'RARE',    type: 'rare'    }, imgFront: '/assets/jersey_product3.png', imgBack: '/assets/jersey_product1.png', size: 'small'    },
  { id: 'p7', player: 'Diego Maradona',    year: '1986', name: 'Argentina — Mexico WC',       price: '£449', badge: { label: 'LIMITED', type: 'limited' }, imgFront: '/assets/jersey_hero.png',    imgBack: '/assets/jersey_product2.png', size: 'small'    },
]

const badgeStyle = { rare: 'border border-[#c8a96e] text-[#c8a96e] bg-[#c8a96e]/10', new: 'bg-[#b6f542] text-black', limited: 'bg-black/80 text-white' }

function ProductCard({ product, cartAdd }: { product: Product; cartAdd: (id: string) => void }) {
  const [flipped, setFlipped] = useState(false)
  const [wishlisted, setWishlisted] = useState(false)

  const sizeClass = {
    featured: 'md:col-span-2 md:row-span-2',
    medium:   'md:col-span-1 md:row-span-1',
    small:    'md:col-span-1 md:row-span-1',
  }[product.size]

  const imgHeight = { featured: 'h-[55%]', medium: 'h-[55%]', small: 'h-[52%]' }[product.size]

  return (
    <ScrollReveal
      delay={product.size === 'featured' ? 0 : 0.1}
      direction={product.size === 'featured' ? 'left' : 'up'}
      className={`product-card ${sizeClass} relative bg-[#f5f5f5] rounded-2xl overflow-hidden group cursor-pointer min-h-[300px] flex flex-col`}
    >
      {/* Flip image area */}
      <div
        className={`relative ${imgHeight} overflow-hidden flex-shrink-0`}
        onMouseEnter={() => setFlipped(true)}
        onMouseLeave={() => setFlipped(false)}
        style={{ perspective: '1000px' }}
      >
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: flipped ? 180 : 0, opacity: flipped ? 0 : 1 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image src={product.imgFront} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>
        <motion.div
          className="absolute inset-0"
          animate={{ rotateY: flipped ? 0 : -180, opacity: flipped ? 1 : 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          style={{ backfaceVisibility: 'hidden' }}
        >
          <Image src={product.imgBack} alt={`${product.name} back`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 50vw" />
        </motion.div>

        {/* Badge */}
        {product.badge && (
          <span className={`absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] font-black tracking-[0.1em] uppercase ${badgeStyle[product.badge.type]}`}>
            {product.badge.label}
          </span>
        )}

        {/* Wishlist */}
        <button
          id={`wish-${product.id}`}
          onClick={() => setWishlisted(!wishlisted)}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center text-gray-400 hover:text-red-500 transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110"
          aria-label="Wishlist"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill={wishlisted ? '#e53e3e' : 'none'} stroke={wishlisted ? '#e53e3e' : 'currentColor'} strokeWidth="1.5">
            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
          </svg>
        </button>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-2 flex-1">
        <div className="flex justify-between items-center">
          <span className="text-[11px] font-semibold uppercase tracking-[0.08em] text-gray-400">{product.player}</span>
          <span className="text-[11px] text-gray-300">{product.year}</span>
        </div>
        <div className="text-sm font-bold tracking-tight text-[#0a0a0a] leading-[1.3] flex-1">{product.name}</div>
        <div className="flex items-center justify-between pt-1">
          <span className="text-xl font-black tracking-tight text-[#0a0a0a]">{product.price}</span>
          <MagneticButton
            id={`add-${product.id}`}
            onClick={() => cartAdd(product.id)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#0a0a0a] text-white text-xs font-bold opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all duration-300 hover:bg-[#b6f542] hover:text-black"
          >
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 5v14M5 12h14"/></svg>
            Add
          </MagneticButton>
        </div>
      </div>

      {/* Hover shadow */}
      <motion.div
        className="absolute inset-0 rounded-2xl pointer-events-none"
        whileHover={{ boxShadow: '0 32px 72px rgba(0,0,0,0.1)' }}
        transition={{ duration: 0.4 }}
      />
    </ScrollReveal>
  )
}

/* ── Cart toast ─────────────────────────────────── */
function CartToast({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed bottom-8 right-8 z-50 flex items-center gap-3 px-6 py-3.5 rounded-full bg-[#0a0a0a] border border-white/10 text-white text-sm font-semibold shadow-2xl"
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ ease: [0.16, 1, 0.3, 1] }}
        >
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#b6f542" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          Added to cart!
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default function BestSellersSection() {
  const [toastVisible, setToastVisible] = useState(false)

  const handleAdd = (_id: string) => {
    setToastVisible(true)
    setTimeout(() => setToastVisible(false), 2800)
  }

  return (
    <section id="bestsellers" className="py-32 px-6 md:px-16 bg-white">
      <ScrollReveal className="text-center mb-20">
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">04 — Best Sellers</span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight">
          Most{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>Wanted</em>
        </h2>
      </ScrollReveal>

      <div className="grid grid-cols-2 md:grid-cols-3 md:grid-rows-2 gap-4">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} cartAdd={handleAdd} />
        ))}
      </div>

      <CartToast show={toastVisible} />
    </section>
  )
}
