import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

import heroLifestyle from "@/assets/hero-lifestyle.jpg";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-smajl-cream-light overflow-hidden">
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-smajl-cream via-smajl-cream-light to-smajl-gold-soft/30 z-0" />
      
      {/* Subtle texture pattern */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}
      />

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Main hero content */}
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 pt-24 pb-12 gap-12 lg:gap-20">
          
          {/* Left side - Text content */}
          <motion.div 
            className="flex-1 max-w-xl text-center lg:text-left"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.img 
              src={smajlLogoFull} 
              alt="Smajl" 
              className="h-20 md:h-28 w-auto mx-auto lg:mx-0 mb-8"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            />
            
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl text-smajl-brown leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Släpp mobilen.
              <br />
              <span className="italic text-smajl-olive">Ta kameran.</span>
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-smajl-brown-light leading-relaxed mb-8 max-w-md mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              En digital kamera utan skärm. Du tar bilder – och fortsätter leva i stunden.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button variant="default" size="xl" asChild className="rounded-full px-8">
                <a href="#produkt">Utforska kameran</a>
              </Button>
              <Button variant="outline" size="xl" asChild className="rounded-full px-8 border-smajl-olive/30 text-smajl-olive hover:bg-smajl-olive/5">
                <a href="#hur-funkar-det">Hur funkar det?</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Right side - Image */}
          <motion.div 
            className="flex-1 max-w-lg lg:max-w-xl"
            initial={{ opacity: 0, x: 30, rotate: -2 }}
            animate={{ opacity: 1, x: 0, rotate: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
          >
            <div className="relative">
              {/* Decorative frame */}
              <div className="absolute -inset-4 bg-white/60 rounded-3xl shadow-soft -rotate-2" />
              <div className="absolute -inset-4 border-2 border-smajl-gold/20 rounded-3xl rotate-1" />
              
              {/* Main image */}
              <img 
                src={heroLifestyle} 
                alt="Ögonblick fångade med Smajl" 
                className="relative rounded-2xl shadow-card w-full aspect-[4/5] object-cover"
              />
              
              {/* Floating badge */}
              <motion.div 
                className="absolute -bottom-4 -right-4 bg-white rounded-full px-5 py-3 shadow-card"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                <span className="text-smajl-olive font-medium text-sm">✨ Lev i stunden</span>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div 
          className="pb-8 flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <a 
            href="#varfor-smajl" 
            className="flex flex-col items-center gap-2 text-smajl-olive/60 hover:text-smajl-olive transition-colors"
          >
            <span className="text-sm">Upptäck mer</span>
            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ArrowDown className="w-5 h-5" />
            </motion.div>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
