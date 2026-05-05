import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import WhySmiloSection from '@/components/sections/WhySmiloSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import ProductSection from '@/components/sections/ProductSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import GallerySection from '@/components/sections/GallerySection'
import FAQSection from '@/components/sections/FAQSection'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhySmiloSection />
        <ComparisonSection />
        <ProductSection />
        <HowItWorksSection />
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
