import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhySmajlSection from "@/components/WhySmajlSection";
import ProductSection from "@/components/ProductSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GallerySection from "@/components/GallerySection";
import WhatsIncludedSection from "@/components/WhatsIncludedSection";
import TechnicalSection from "@/components/TechnicalSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhySmajlSection />
        <ProductSection />
        <HowItWorksSection />
        <GallerySection />
        <WhatsIncludedSection />
        <TechnicalSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
