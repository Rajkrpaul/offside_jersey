import Navbar from '@/components/Navbar'
import HeroSection from './sections/HeroSection'
import CollectionsSection from './sections/CollectionsSection'
import EraSection from './sections/EraSection'
import BestSellersSection from './sections/BestSellersSection'
import LegendsSection from './sections/LegendsSection'
import TrendingSection from './sections/TrendingSection'
import AuthenticitySection from './sections/AuthenticitySection'
import GallerySection from './sections/GallerySection'
import NewsletterSection from './sections/NewsletterSection'
import FooterSection from './sections/FooterSection'

/**
 * OffsideJersey — Premium Football Jersey Ecommerce
 *
 * Page flow:
 *   Emotion → Discovery → Nostalgia → Shopping → Storytelling →
 *   Social Proof → Trust → Brand Culture → Conversion
 */
export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <CollectionsSection />
      <EraSection />
      <BestSellersSection />
      <LegendsSection />
      <TrendingSection />
      <AuthenticitySection />
      <GallerySection />
      <NewsletterSection />
      <FooterSection />
    </main>
  )
}
