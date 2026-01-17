import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
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
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/20 to-background" />
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
            className="smajl-body text-foreground/80 mb-8 max-w-lg"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.1 }}
          >
            smajl retro kamera är en digital kamera utan skärm – skapad för att fånga ögonblicket utan att fastna i mobilen.
          </motion.p>

          <motion.div 
            className="space-y-2 mb-10"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.2 }}
          >
            <p className="smajl-body-sm text-foreground/70">Ta bilden.</p>
            <p className="smajl-body-sm text-foreground/70">Lev stunden.</p>
            <p className="smajl-body-sm text-foreground/70">Se minnena när du är redo.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.3 }}
          >
            <Button variant="hero" size="xl" asChild>
              <a href="#produkt">Köp smajl retro kamera – 800 kr</a>
            </Button>
            <p className="text-sm text-foreground/60 mt-4">
              Fri frakt & fri retur inom Sverige
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
