'use client'

import { useState, useMemo, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

// ─── MOCK DATA ─────────────────────────────────────────────────────────────
type Product = {
  id: string
  name: string
  player: string
  year: string
  price: string
  img: string
  badge?: 'RARE' | 'NEW' | 'LIMITED'
  categories: string[]
  league: string
}

const mockImages = [
  '/assets/jersey_hero.png',
  '/assets/jersey_product1.png',
  '/assets/jersey_product2.png',
  '/assets/jersey_product3.png',
]

const leagues = ['Premier League', 'LaLiga', 'Bundesliga', 'Serie A', 'Champions League', 'International']
const leagueLogos: Record<string, string> = {
  'Premier League': '/assets/legends/premier league logo.png',
  'LaLiga': '/assets/legends/laliga logo.png',
  'Bundesliga': '/assets/legends/bundesliga logo.jpg',
  'Serie A': '/assets/legends/serie a logo.png',
  'Champions League': '/assets/legends/champions league logo.png',
  'International': '/assets/legends/national teams.jpg',
}
const filters = ['All', 'New Arrivals', 'Limited Edition', 'Player Collection', 'Club Classics', 'International', 'Retro']

const generateProducts = (): Product[] => {
  const products: Product[] = []
  for (let i = 1; i <= 24; i++) {
    const isRare = i % 5 === 0
    const isNew = i % 7 === 0
    const isLimited = i % 3 === 0
    
    products.push({
      id: `p${i}`,
      name: `Classic Jersey Edition ${i}`,
      player: `LEGEND ${i}`,
      year: `199${i % 9}`,
      price: `£${150 + (i * 10)}`,
      img: mockImages[i % mockImages.length],
      badge: isNew ? 'NEW' : isRare ? 'RARE' : isLimited ? 'LIMITED' : undefined,
      categories: [
        'All',
        isNew ? 'New Arrivals' : '',
        isLimited ? 'Limited Edition' : '',
        i % 2 === 0 ? 'Player Collection' : 'Club Classics',
        i % 4 === 0 ? 'International' : '',
        i % 3 === 0 ? 'Retro' : '',
      ].filter(Boolean),
      league: leagues[i % leagues.length],
    })
  }
  // Specific overrides to match reference if possible
  products[0] = { ...products[0], name: 'FC Barcelona Champions League Final', player: 'LIONEL MESSI', year: '2015', price: '£289', badge: 'RARE', img: mockImages[0], categories: ['All', 'Player Collection', 'Club Classics', 'Retro'] }
  products[1] = { ...products[1], name: 'Portugal World Cup', player: 'CRISTIANO RONALDO', year: '2018', price: '£219', badge: 'NEW', img: mockImages[1], categories: ['All', 'New Arrivals', 'International', 'Player Collection'] }
  products[2] = { ...products[2], name: 'England Away Classic', player: 'DAVID BECKHAM', year: '2001', price: '£179', badge: 'LIMITED', img: mockImages[2], categories: ['All', 'Limited Edition', 'International', 'Retro'] }
  return products
}

const PRODUCTS = generateProducts()

// ─── CART DRAWER ──────────────────────────────────────────────────────────
function CartDrawer({
  isOpen,
  onClose,
  cart,
  removeFromCart,
}: {
  isOpen: boolean
  onClose: () => void
  cart: Product[]
  removeFromCart: (index: number) => void
}) {
  const subtotal = cart.reduce((sum, item) => sum + parseInt(item.price.replace('£', '')), 0)

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            className="fixed inset-0 bg-black/40 z-[100]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
          />
          <motion.div
            className="fixed inset-y-0 right-0 w-full max-w-md bg-white z-[101] shadow-2xl flex flex-col"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h2 className="text-xl font-black text-[#0a0a0a]">Your Cart ({cart.length})</h2>
              <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6 space-y-6">
              {cart.length === 0 ? (
                <p className="text-gray-400 text-center mt-10">Your cart is empty.</p>
              ) : (
                cart.map((item, i) => (
                  <div key={`${item.id}-${i}`} className="flex gap-4 items-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0 relative">
                      <img src={item.img} alt={item.name} className="absolute inset-0 w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-sm text-[#0a0a0a] line-clamp-1">{item.name}</h4>
                      <p className="text-xs text-gray-400 mt-1">{item.player}</p>
                      <p className="text-sm font-bold text-[#0a0a0a] mt-2">{item.price}</p>
                    </div>
                    <button onClick={() => removeFromCart(i)} className="p-2 text-gray-400 hover:text-red-500 transition-colors">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                ))
              )}
            </div>

            <div className="p-6 border-t border-gray-100 bg-gray-50">
              <div className="flex justify-between items-center mb-6">
                <span className="font-semibold text-gray-500">Subtotal</span>
                <span className="text-xl font-black text-[#0a0a0a]">£{subtotal}</span>
              </div>
              <button className="w-full bg-[#0a0a0a] text-white font-bold py-4 rounded-full hover:bg-black transition-colors" disabled={cart.length === 0}>
                Checkout
              </button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// ─── TOAST NOTIFICATION ───────────────────────────────────────────────────
function Toast({ message }: { message: string | null }) {
  return (
    <AnimatePresence>
      {message && (
        <motion.div
          className="fixed bottom-8 left-1/2 -translate-x-1/2 bg-[#0a0a0a] text-white px-6 py-3 rounded-full shadow-lg z-[110] flex items-center gap-3 text-sm font-semibold"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#b6f542" strokeWidth="3">
            <path d="M20 6L9 17l-5-5" />
          </svg>
          {message}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ─── PRODUCT CARD ─────────────────────────────────────────────────────────
function ProductCard({
  product,
  isFeatured,
  index,
  onClick,
  onAdd,
}: {
  product: Product
  isFeatured: boolean
  index: number
  onClick: () => void
  onAdd: (e: React.MouseEvent) => void
}) {
  let cardTypeClass = ''
  if (isFeatured) {
    cardTypeClass = 'card-featured'
  } else if (index === 1 || index === 2) {
    cardTypeClass = 'card-medium'
  } else if (index >= 3 && index <= 6) {
    cardTypeClass = 'card-small'
  } else {
    cardTypeClass = 'card-standard'
  }

  return (
    <motion.div
      layout
      layoutId={`card-${product.id}`}
      onClick={onClick}
      className={`bg-white rounded-[12px] border border-gray-100 shadow-sm overflow-hidden flex flex-col cursor-pointer group hover:shadow-[0_8px_32px_rgba(0,0,0,0.13)] hover:scale-[1.025] hover:border-black transition-all duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${cardTypeClass}`}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ layout: { type: 'spring', bounce: 0.2, duration: 0.6 } }}
    >
      <div className={`relative w-full bg-gray-50/50 overflow-hidden ${isFeatured ? 'h-[400px]' : 'h-[200px]'}`}>
        <img src={product.img} alt={product.name} className="absolute inset-0 w-full h-full object-contain p-4 mix-blend-multiply group-hover:scale-[1.07] transition-transform duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]" />
        {product.badge && (
          <span className={`absolute top-4 left-4 text-[9px] font-bold tracking-widest uppercase px-3 py-1.5 rounded-full ${
            product.badge === 'NEW' ? 'bg-[#b6f542] text-[#0a0a0a]' : 'bg-[#0a0a0a] text-white'
          }`}>
            {product.badge}
          </span>
        )}
      </div>

      <div className={`p-5 flex flex-col flex-1 justify-between ${isFeatured ? 'gap-4' : 'gap-2'}`}>
        <div>
          <div className="flex justify-between items-center mb-1">
            <span className="text-[10px] font-bold tracking-widest uppercase text-gray-400">{product.player}</span>
            <span className="text-[10px] text-gray-300 font-mono">{product.year}</span>
          </div>
          <h3 className={`font-bold text-[#0a0a0a] leading-tight ${isFeatured ? 'text-2xl' : 'text-sm line-clamp-1'}`}>
            {product.name}
          </h3>
        </div>

        <div className="flex items-center justify-between mt-auto">
          <span className={`font-black text-[#0a0a0a] ${isFeatured ? 'text-2xl' : 'text-base'}`}>
            {product.price}
          </span>

          {isFeatured ? (
            <button
              onClick={onAdd}
              className="bg-[#0a0a0a] text-white text-xs font-bold px-5 py-2.5 rounded-full flex items-center gap-2 hover:bg-black transition-colors"
            >
              Add to Cart
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
              </svg>
            </button>
          ) : (
            <button
              onClick={onAdd}
              className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center opacity-60 group-hover:opacity-100 group-hover:scale-110 hover:bg-[#0a0a0a] hover:border-[#0a0a0a] group/btn transition-all duration-[280ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-gray-400 group-hover/btn:text-white transition-colors">
                <path d="M12 5v14M5 12h14" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </motion.div>
  )
}

// ─── MAIN SECTION ─────────────────────────────────────────────────────────
export default function TrendingSection() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [expandedId, setExpandedId] = useState(PRODUCTS[0].id)
  const [visibleCount, setVisibleCount] = useState(7)
  const [cart, setCart] = useState<Product[]>([])
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [toastMessage, setToastMessage] = useState<string | null>(null)

  // Filtering
  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter(p => p.categories.includes(activeFilter))
  }, [activeFilter])

  // Sorting: Expanded item is always first
  const displayProducts = useMemo(() => {
    const list = [...filteredProducts]
    const expandedIndex = list.findIndex(p => p.id === expandedId)
    if (expandedIndex > -1) {
      const [expandedItem] = list.splice(expandedIndex, 1)
      list.unshift(expandedItem)
    }
    return list.slice(0, visibleCount)
  }, [filteredProducts, expandedId, visibleCount])

  // Reset expanded item when filter changes
  useEffect(() => {
    if (filteredProducts.length > 0) {
      setExpandedId(filteredProducts[0].id)
    }
    setVisibleCount(7)
  }, [filteredProducts])

  // Handlers
  const handleAddToCart = (e: React.MouseEvent, product: Product) => {
    e.stopPropagation() // Prevent click-to-expand
    setCart(prev => [...prev, product])
    setToastMessage(`${product.name} added to cart`)
    setTimeout(() => setToastMessage(null), 2500)
  }

  return (
    <section id="trending" className="bg-[#FFFFFF] py-[96px] px-6 md:px-[40px] relative">
      
      <Toast message={toastMessage} />
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cart={cart} removeFromCart={(i) => setCart(prev => prev.filter((_, idx) => idx !== i))} />

      {/* Cart Icon */}
      <button 
        onClick={() => setIsCartOpen(true)}
        className="absolute top-12 right-[40px] w-12 h-12 bg-white border border-gray-200 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors z-20 shadow-sm"
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2">
          <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0" />
        </svg>
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.span 
              initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
              className="absolute -top-1 -right-1 bg-[#b6f542] text-[#0a0a0a] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-white"
            >
              {cart.length}
            </motion.span>
          )}
        </AnimatePresence>
      </button>

      {/* ── Section Header ── */}
      <ScrollReveal className="text-center mb-[48px]">
        <span className="block text-[11px] tracking-[0.25em] uppercase text-gray-400 font-semibold mb-[12px]">
          02 — MOST WANTED
        </span>
        <h2 className="text-[clamp(40px,5vw,72px)] font-black leading-[0.9] tracking-tight text-[#0a0a0a]">
          Most <em className="font-normal italic" style={{ fontFamily: 'DM Serif Display, serif' }}>Wanted</em>
        </h2>
        <p className="text-[15px] text-gray-500 mt-4 tracking-wide font-light">
          Iconic jerseys. Legendary players. Timeless moments.
        </p>
      </ScrollReveal>

      {/* ── Filter Bar ── */}
      <ScrollReveal className="mb-[48px] w-full box-border">
        <div className="flex w-full justify-between items-center gap-[8px] flex-nowrap overflow-x-auto md:overflow-visible scrollbar-hide">
          {filters.map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`flex-1 flex justify-center items-center text-center whitespace-nowrap px-[24px] py-[12px] rounded-[40px] text-[15px] font-[600] transition-colors duration-200 ease-in-out hover:scale-[1.03] border cursor-pointer ${
                activeFilter === f 
                  ? 'bg-[#0a0a0a] text-white border-[#0a0a0a] hover:bg-[#222222]' 
                  : 'bg-white text-[#0a0a0a] border-[#0a0a0a] hover:bg-[#0a0a0a] hover:text-white'
              }`}
            >
              {f}
            </button>
          ))}
          <button className="hidden md:flex flex-shrink-0 items-center justify-center gap-2 px-[24px] py-[12px] rounded-[40px] border border-gray-200 text-[15px] font-[600] text-[#0a0a0a] hover:bg-gray-50 transition-colors duration-200 ease-in-out cursor-pointer hover:scale-[1.03]">
            Sort: Featured
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 9l6 6 6-6" />
            </svg>
          </button>
        </div>
      </ScrollReveal>

      {/* ── Product Grid ── */}
      <style>{`
        .most-wanted-grid {
          display: grid;
          width: 100%;
          box-sizing: border-box;
          gap: 10px;
          grid-template-columns: 1fr;
        }
        @media (min-width: 768px) {
          .most-wanted-grid {
            grid-template-columns: repeat(80, minmax(0, 1fr));
          }
          .card-featured { grid-column: span 36 / span 36; grid-row: span 2 / span 2; }
          .card-medium { grid-column: span 22 / span 22; grid-row: span 1 / span 1; }
          .card-small { grid-column: span 11 / span 11; grid-row: span 1 / span 1; }
          .card-standard { grid-column: span 20 / span 20; grid-row: span 1 / span 1; }
        }
      `}</style>
      <div className="w-full box-border">
        <div className="most-wanted-grid">
          {displayProducts.map((product, index) => {
            const isFeatured = product.id === expandedId
            return (
              <ProductCard
                key={product.id}
                product={product}
                isFeatured={isFeatured}
                index={index}
                onClick={() => setExpandedId(product.id)}
                onAdd={(e) => handleAddToCart(e, product)}
              />
            )
          })}
        </div>

        {/* Load More */}
        {visibleCount < filteredProducts.length && (
          <div className="flex justify-center mt-12">
            <button
              onClick={() => setVisibleCount(v => v + 4)}
              className="px-8 py-3 rounded-full border border-gray-200 text-sm font-bold text-[#0a0a0a] hover:border-[#0a0a0a] transition-colors"
            >
              Load More
            </button>
          </div>
        )}
      </div>

      {/* ── League Quick-Links Bar ── */}
      <div className="w-full mt-24">
        <div className="bg-[#fafafa] rounded-[16px] border border-gray-100 py-2 px-[16px] flex w-full box-border overflow-hidden gap-2">
          {leagues.map((league, i) => (
            <button key={league} className="flex-1 min-w-0 overflow-hidden bg-white border border-transparent hover:border-gray-200 hover:shadow-sm rounded-[12px] p-3 flex items-center justify-between group transition-all">
              <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100 overflow-hidden mix-blend-multiply">
                  <img src={leagueLogos[league]} alt={league} className="w-5 h-5 object-contain mix-blend-multiply" />
                </div>
                <div className="text-left truncate">
                  <h4 className="text-[13px] font-bold text-[#0a0a0a] leading-tight truncate">{league}</h4>
                  <p className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase truncate">{80 + i * 15}+ KITS</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" className="flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          ))}
          
          <button className="flex-1 min-w-0 overflow-hidden bg-white border border-transparent hover:border-gray-200 hover:shadow-sm rounded-[12px] p-3 flex items-center justify-between group transition-all">
             <div className="flex items-center gap-3 truncate">
                <div className="w-8 h-8 rounded-full bg-gray-50 flex-shrink-0 flex items-center justify-center border border-gray-100">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2">
                    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
                  </svg>
                </div>
                <div className="text-left truncate">
                  <h4 className="text-[13px] font-bold text-[#0a0a0a] leading-tight truncate">View All Leagues</h4>
                  <p className="text-[11px] font-bold text-gray-400 mt-0.5 uppercase truncate">Explore all leagues</p>
                </div>
              </div>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="2" className="flex-shrink-0 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
          </button>
        </div>
      </div>

      {/* ── Can't Find What You're Looking For Banner ── */}
      <div className="w-full mt-6">
        <div className="bg-[#fcfcfc] rounded-[16px] border border-gray-100 flex items-center justify-between w-full box-border py-[20px] px-[32px]">
          <div className="flex flex-row items-center gap-[16px]">
            <div className="w-16 h-16 bg-[#eaf5eb] rounded-full flex items-center justify-center flex-shrink-0">
               <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#b6f542" strokeWidth="2.5" className="mt-1">
                 <path d="M20.38 3.46L16 2a8.96 8.96 0 0 1-4 1 8.96 8.96 0 0 1-4-1L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z" />
               </svg>
            </div>
            <div>
              <h3 className="text-xl font-black text-[#0a0a0a] mb-1">Can't Find What You're Looking For?</h3>
              <p className="text-sm text-gray-500 font-light">Explore our full collection of 2,400+ jerseys from every era.</p>
            </div>
          </div>
          <button className="bg-[#b6f542] text-[#0a0a0a] font-bold text-sm px-[28px] py-[14px] rounded-full flex items-center gap-3 hover:bg-[#a5e03b] transition-colors whitespace-nowrap group self-center flex-shrink-0 ml-auto">
            Shop All Collections
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

    </section>
  )
}
