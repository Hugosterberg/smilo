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
import GiftSection from '@/components/sections/GiftSection'
import ReviewsSection from '@/components/sections/ReviewsSection'
import FAQSection from '@/components/sections/FAQSection'
import { JsonLd } from '@/components/seo/JsonLd'
import { createProductSchema, faqSchema } from '@/lib/seo'
import { readCameraInventory } from '@/lib/camera-inventory'
import { readProductReviews } from '@/lib/product-reviews'

export const dynamic = 'force-dynamic'

export default async function Home() {
  const [inventoryResult, reviews] = await Promise.all([
    readCameraInventory(),
    readProductReviews(),
  ])
  const inventory = inventoryResult.items
  const hasStock = inventory.some((item) => item.stockQuantity > 0)
  const reviewStats =
    reviews.reviewCount > 0
      ? { averageRating: reviews.averageRating, reviewCount: reviews.reviewCount }
      : undefined

  return (
    <div className="min-h-screen bg-background">
      <JsonLd data={createProductSchema(hasStock, reviewStats)} />
      <JsonLd data={faqSchema} />
      <HashScrollHandler />
      <Header />
      <main>
        <HeroSection />
        <WhySmiloSection />
        <ComparisonSection />
        <ProductSection
          inventory={inventory}
          inventoryError={inventoryResult.error}
          reviewStats={reviewStats}
        />
        <ReviewsSection reviews={reviews} />
        <HowItWorksSection />
        <FilterSection />
        <GallerySection />
        <GiftSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}
