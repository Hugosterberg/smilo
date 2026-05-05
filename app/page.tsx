import Header from '@/components/Header'
import HeroSection from '@/components/HeroSection'
import WhySmiloSection from '@/components/WhySmiloSection'
import ComparisonSection from '@/components/ComparisonSection'
import ProductSection from '@/components/ProductSection'
import HowItWorksSection from '@/components/HowItWorksSection'
import GallerySection from '@/components/GallerySection'
import FAQSection from '@/components/FAQSection'
import Footer from '@/components/Footer'

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
