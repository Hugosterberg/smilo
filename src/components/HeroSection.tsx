import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroCamera from "@/assets/hero-camera.jpg";
import smajlLogoFull from "@/assets/smajl-logo-full.png";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-smajl-cream-light overflow-hidden">
      {/* Warm gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-smajl-cream via-smajl-cream-light to-smajl-gold-soft/20 z-0" />
      
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
        <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 lg:px-16 pt-24 pb-12 gap-8 lg:gap-16">
          
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
              className="h-16 md:h-24 w-auto mx-auto lg:mx-0 mb-6"
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

          {/* Right side - Product Image */}
          <motion.div 
            className="flex-1 max-w-md lg:max-w-lg xl:max-w-xl flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
          >
            <div className="relative">
              {/* Glow effect behind camera */}
              <div className="absolute inset-0 bg-smajl-olive/10 blur-3xl rounded-full scale-150" />
              
              {/* Floating animation wrapper */}
              <motion.div
                animate={{ 
                  y: [0, -10, 0],
                }}
                transition={{ 
                  duration: 4, 
                  repeat: Infinity, 
                  ease: "easeInOut" 
                }}
                className="relative"
              >
                {/* Main camera image */}
                <img 
                  src={heroCamera} 
                  alt="Smajl Kamera - Olive Green Edition" 
                  className="relative w-full max-w-[400px] lg:max-w-[500px] drop-shadow-2xl"
                />
                
                {/* Decorative badge */}
                <motion.div 
                  className="absolute -bottom-4 -right-4 bg-smajl-olive text-white px-4 py-2 rounded-full text-sm font-medium shadow-lg"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: 0.8 }}
                >
                  ✨ Nyhet 2025
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
