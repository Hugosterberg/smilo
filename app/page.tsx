import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'
import { HashScrollHandler } from '@/components/layout/HashScrollHandler'
import HeroSection from '@/components/sections/HeroSection'
import WhySmiloSection from '@/components/sections/WhySmiloSection'
import ComparisonSection from '@/components/sections/ComparisonSection'
import ProductSection from '@/components/sections/ProductSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FilterSection from '@/components/sections/FilterSection'
import GallerySection from '@/components/sections/GallerySection'
import FAQSection from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { createProductSchema, faqSchema } from '@/lib/seo'
import { readCameraInventory } from '@/lib/camera-inventory'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const inventoryResult = await readCameraInventory()
  const inventory = inventoryResult.items
  const hasStock = inventory.some((item) => item.stockQuantity > 0)

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={createProductSchema(hasStock)} />
      <JsonLd data={faqSchema} />
      <HashScrollHandler />
      <Header />
      <main>
        <HeroSection />
        <WhySmiloSection />
        <ComparisonSection />
        <ProductSection inventory={inventory} inventoryError={inventoryResult.error} />
        <HowItWorksSection />
        <FilterSection />
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
