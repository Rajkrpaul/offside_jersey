import ScrollReveal from '@/components/ScrollReveal'

const socials = [
  {
    id: 'instagram',
    label: 'Instagram',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>,
  },
  {
    id: 'twitter',
    label: 'Twitter / X',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>,
  },
  {
    id: 'tiktok',
    label: 'TikTok',
    icon: <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/></svg>,
  },
]

const cols = [
  {
    title: 'Shop',
    links: ['New Arrivals', 'Best Sellers', 'Rare Finds', 'Limited Editions', 'Sale'],
    ids:   ['footer-new', 'footer-bestsellers', 'footer-rare', 'footer-limited', 'footer-sale'],
  },
  {
    title: 'Collections',
    links: ['1990s Classics', '2000s Icons', 'World Cup', 'Champions League', 'National Teams'],
    ids:   ['footer-90s', 'footer-00s', 'footer-wc', 'footer-ucl', 'footer-national'],
  },
  {
    title: 'Players',
    links: ['Messi Archive', 'Ronaldo Archive', 'Beckham Archive', 'Zidane Archive', 'Ronaldinho Archive'],
    ids:   ['footer-messi', 'footer-cr7', 'footer-beckham', 'footer-zidane', 'footer-r10'],
  },
  {
    title: 'Support',
    links: ['Authentication', 'Shipping Info', 'Returns', 'Contact Us', 'FAQ'],
    ids:   ['footer-auth', 'footer-shipping', 'footer-returns', 'footer-contact', 'footer-faq'],
  },
]

export default function FooterSection() {
  return (
    <footer className="bg-[#0a0a0a] border-t border-white/[0.06] pt-20 pb-10 px-6 md:px-16">
      <ScrollReveal>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="text-xl font-black text-white tracking-tight mb-3">
              OFFSIDE<span className="text-[#b6f542]">JERSEY</span>
            </div>
            <p className="text-sm text-white/30 leading-relaxed mb-7">Football history, worn with pride.</p>
            <div className="flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.id}
                  href="#"
                  id={s.id}
                  aria-label={s.label}
                  className="w-10 h-10 flex items-center justify-center rounded-full border border-white/10 text-white/30 hover:border-[#b6f542] hover:text-[#b6f542] hover:bg-[#b6f542]/[0.08] transition-all duration-300"
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {cols.map((col) => (
            <div key={col.title}>
              <h4 className="text-[11px] font-bold tracking-[0.16em] uppercase text-white/25 mb-6">{col.title}</h4>
              <ul className="space-y-3.5">
                {col.links.map((link, i) => (
                  <li key={link}>
                    <a
                      href="#"
                      id={col.ids[i]}
                      className="text-sm text-white/40 hover:text-white transition-colors duration-300"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ScrollReveal>

      {/* Bottom bar */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4 pt-8 border-t border-white/[0.06]">
        <span className="text-xs text-white/15">© 2024 OffsideJersey. All rights reserved.</span>
        <div className="flex gap-6">
          <a href="#" id="footer-privacy" className="text-xs text-white/20 hover:text-white/50 transition-colors">Privacy Policy</a>
          <a href="#" id="footer-terms"   className="text-xs text-white/20 hover:text-white/50 transition-colors">Terms of Service</a>
        </div>
      </div>
    </footer>
  )
}
