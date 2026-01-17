import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Use real lifestyle image for hero background
import productLifestyle from "@/assets/product-lifestyle.jpg";
import productUnboxing from "@/assets/product-unboxing.jpg";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

// Gallery images for collage
import gallery1 from "@/assets/gallery-1.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen pt-16 md:pt-20">
      {/* Image Grid Background - Inspired by klikcamera */}
      <div className="absolute inset-0 z-0 grid grid-cols-2 md:grid-cols-4">
        <div className="relative overflow-hidden">
          <img src={productLifestyle} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-smajl-brown/20" />
        </div>
        <div className="relative overflow-hidden">
          <img src={gallery1} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-smajl-brown/30" />
        </div>
        <div className="relative overflow-hidden hidden md:block">
          <img src={productUnboxing} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-smajl-brown/20" />
        </div>
        <div className="relative overflow-hidden hidden md:block">
          <img src={gallery3} alt="" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-smajl-brown/30" />
        </div>
      </div>

      {/* Overlay for readability */}
      <div className="absolute inset-0 z-10 bg-gradient-to-b from-smajl-brown/60 via-smajl-brown/50 to-smajl-brown/70" />

      {/* Content */}
      <div className="relative z-20 min-h-screen flex flex-col items-center justify-center px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <img 
            src={smajlLogoFull} 
            alt="smajl" 
            className="h-32 md:h-44 w-auto mx-auto drop-shadow-2xl"
          />
        </motion.div>

        <motion.h1 
          className="smajl-heading-xl text-smajl-cream-light mb-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          Släpp mobilen.
          <br />
          Ta kameran.
        </motion.h1>
        
        <motion.p 
          className="smajl-body text-smajl-cream/90 mb-4 max-w-xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          smajl retro kamera är en digital kamera utan skärm.
          <br />
          Du tar bilder – och fortsätter leva i stunden.
        </motion.p>

        <motion.p 
          className="smajl-body-sm text-smajl-cream/70 mb-10 max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          Inget scrollande. Inga notiser.
          <br />
          Bara ögonblick som får vara kvar lite längre.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="flex flex-col items-center"
        >
          <Button variant="hero" size="xl" asChild>
            <a href="#produkt">Köp smajl retro kamera – 800 kr</a>
          </Button>
          
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-6">
            <div className="flex items-center gap-2 text-sm text-smajl-cream/80">
              <Check className="w-4 h-4 text-smajl-gold" />
              <span>Fri frakt</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-smajl-cream/80">
              <Check className="w-4 h-4 text-smajl-gold" />
              <span>Fri retur inom Sverige</span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
