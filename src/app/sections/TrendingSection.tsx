'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const items = [
  { id: 't1', tag: 'Retro Drop',      name: 'Brazil 1994',             price: '£159', img: '/assets/jersey_product1.png', height: 'row-span-3' },
  { id: 't2', tag: 'Rare Find',       name: 'France 1998 Away',        price: '£229', img: '/assets/jersey_product2.png', height: 'row-span-2' },
  { id: 't3', tag: 'New Arrival',     name: 'Netherlands 88',          price: '£189', img: '/assets/jersey_product3.png', height: 'row-span-2' },
  { id: 't4', tag: 'Limited Edition', name: 'Argentina 2022 Final',    price: '£349', img: '/assets/jersey_hero.png',    height: 'row-span-2' },
  { id: 't5', tag: 'Player Edition',  name: 'Ronaldo #7 Original',     price: '£279', img: '/assets/football_gallery1.png', height: 'row-span-3' },
  { id: 't6', tag: 'National Team',   name: 'Italy 2006 WC Final',     price: '£219', img: '/assets/jersey_product1.png', height: 'col-span-2 row-span-2' },
  { id: 't7', tag: 'Retro Classic',   name: 'Ajax 1995',               price: '£145', img: '/assets/jersey_product2.png', height: 'col-span-2 row-span-2' },
]

export default function TrendingSection() {
  return (
    <section id="trending" className="py-32 px-6 md:px-16 bg-[#f5f5f5]">
      <ScrollReveal className="text-center mb-20">
        <span className="block text-xs tracking-[0.2em] uppercase text-gray-400 mb-4">06 — Trending</span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight text-[#0a0a0a]">
          What's{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>Moving</em>
        </h2>
      </ScrollReveal>

      {/* Pinterest masonry */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-3"
        style={{ gridAutoRows: '80px' }}
      >
        {items.map((item, i) => (
          <motion.div
            key={item.id}
            className={`relative rounded-xl overflow-hidden group cursor-pointer ${item.height}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ delay: i * 0.07, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            whileHover={{ scale: 1.025, zIndex: 2 }}
          >
            <motion.div className="absolute inset-0" whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
              <Image
                src={item.img}
                alt={item.name}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </motion.div>

            {/* Overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.35 }}
            />

            {/* Info */}
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-5"
              initial={{ y: 10, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.35 }}
            >
              <span className="block text-[10px] font-bold tracking-[0.16em] uppercase text-[#b6f542] mb-1">{item.tag}</span>
              <h4 className="text-sm font-bold text-white mb-2 leading-tight">{item.name}</h4>
              <span className="text-lg font-black text-white">{item.price}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
