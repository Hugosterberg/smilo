import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import heroImage from "@/assets/hero-lifestyle.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center pt-16">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Vänner som skrattar vid middagsbordet - ett ögonblick fångat med smajl"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/30 to-background" />
      </div>

      {/* Content */}
      <div className="smajl-container relative z-10 py-20 md:py-32">
        <div className="max-w-2xl">
          <motion.h1 
            className="smajl-heading-xl text-foreground mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            Släpp mobilen.
            <br />
            Ta kameran.
          </motion.h1>
          
          <motion.p 
            className="smajl-body text-foreground/90 mb-6 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            smajl retro kamera är en digital kamera utan skärm.
            <br />
            Du tar bilder – och fortsätter leva i stunden.
          </motion.p>

          <motion.p 
            className="smajl-body-sm text-foreground/70 mb-10 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            Inget scrollande. Inga notiser.
            <br />
            Bara ögonblick som får vara kvar lite längre.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#produkt">Köp smajl retro kamera – 800 kr</a>
            </Button>
            
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-6 mt-6">
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Check className="w-4 h-4 text-primary" />
                <span>Fri frakt</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-foreground/70">
                <Check className="w-4 h-4 text-primary" />
                <span>Fri retur inom Sverige</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
