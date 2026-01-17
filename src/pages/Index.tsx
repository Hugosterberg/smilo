import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import WhySmajlSection from "@/components/WhySmajlSection";
import ComparisonSection from "@/components/ComparisonSection";
import ProductSection from "@/components/ProductSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import GallerySection from "@/components/GallerySection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSection />
        <WhySmajlSection />
        <ComparisonSection />
        <ProductSection />
        <HowItWorksSection />
        <GallerySection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
