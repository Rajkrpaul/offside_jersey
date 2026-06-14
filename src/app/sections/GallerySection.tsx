'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import ScrollReveal from '@/components/ScrollReveal'

const gallery = [
  { id: 'g1', title: 'Stadium Lights',   sub: 'The atmosphere before the storm',     img: '/assets/football_gallery1.png', span: 'md:col-span-2 md:row-span-2' },
  { id: 'g2', title: 'World Cup Glory',  sub: 'Moments frozen in time',              img: '/assets/jersey_product1.png',   span: 'md:col-span-1 md:row-span-1' },
  { id: 'g3', title: 'The Faithful',     sub: 'Culture beyond the game',             img: '/assets/football_culture1.png', span: 'md:col-span-1 md:row-span-1' },
  { id: 'g4', title: 'The Tunnel Walk',  sub: 'Where legends are born',              img: '/assets/beckham_card.png',      span: 'md:col-span-2 md:row-span-1' },
  { id: 'g5', title: 'Historic Match',   sub: 'Defining moments of football',        img: '/assets/jersey_product2.png',   span: 'md:col-span-1 md:row-span-2' },
  { id: 'g6', title: 'Jersey Heritage',  sub: 'Fabric of football history',          img: '/assets/jersey_product3.png',   span: 'md:col-span-1 md:row-span-1' },
]

export default function GallerySection() {
  return (
    <section id="gallery" className="py-32 px-6 md:px-16 bg-[#0a0a0a]">
      <ScrollReveal className="text-center mb-20">
        <span className="block text-xs tracking-[0.2em] uppercase text-white/25 mb-4">05 - Culture</span>
        <h2 className="text-[clamp(48px,6vw,90px)] font-black leading-[0.92] tracking-tight text-white">
          Beyond{' '}
          <em className="font-normal" style={{ fontFamily: 'DM Serif Display, serif' }}>The Jersey</em>
        </h2>
      </ScrollReveal>

      <div
        className="grid grid-cols-2 md:grid-cols-3 gap-3"
        style={{ gridAutoRows: '160px' }}
      >
        {gallery.map((item, i) => (
          <motion.div
            key={item.id}
            className={`relative rounded-xl overflow-hidden group ${item.span}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '0px 0px -60px 0px' }}
            transition={{ delay: i * 0.08, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Image */}
            <motion.div
              className="absolute inset-0"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <Image
                src={item.img}
                alt={item.title}
                fill
                className="object-cover transition-all duration-500 [filter:grayscale(35%)] group-hover:[filter:grayscale(0%)]"
                sizes="(max-width: 768px) 50vw, 33vw"
              />
            </motion.div>

            {/* Caption */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/10 to-transparent"
              initial={{ opacity: 0 }}
              whileHover={{ opacity: 1 }}
              transition={{ duration: 0.4 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 right-0 p-6"
              initial={{ y: 16, opacity: 0 }}
              whileHover={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4 }}
            >
              <span className="block text-base font-bold text-white mb-1">{item.title}</span>
              <span className="text-xs text-white/50">{item.sub}</span>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
