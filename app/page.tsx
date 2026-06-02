import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { HashScrollHandler } from '@/components/layout/HashScrollHandler'
import HeroSection from '@/components/sections/HeroSection'
import WhySmiloSection from '@/components/sections/WhySmiloSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import ProductSection from '@/components/sections/ProductSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import GallerySection from '@/components/sections/GallerySection'
import FAQSection from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { productSchema, faqSchema } from '@/lib/seo'

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={productSchema} />
      <JsonLd data={faqSchema} />
      <HashScrollHandler />
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
