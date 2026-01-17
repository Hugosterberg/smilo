import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroCamera from "@/assets/hero-camera.jpg";
import heroSample1 from "@/assets/hero-sample-1.jpg";
import heroSample2 from "@/assets/hero-sample-2.jpg";

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
        <div className="flex-1 flex flex-col items-center justify-center px-6 lg:px-16 pt-24 pb-12">
          
          {/* Center text content */}
          <motion.div 
            className="text-center max-w-3xl mb-12"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-3xl md:text-5xl lg:text-6xl text-smajl-brown leading-[1.1] mb-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              Släpp mobilen.
              <br />
              <span className="italic text-smajl-olive">Ta kameran.</span>
            </motion.h1>
            
            <motion.p 
              className="text-base md:text-lg text-smajl-brown-light leading-relaxed mb-8 max-w-xl mx-auto"
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
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button variant="default" size="xl" asChild className="rounded-full px-8">
                <a href="#produkt">Utforska kameran</a>
              </Button>
              <Button variant="outline" size="xl" asChild className="rounded-full px-8 border-smajl-olive/30 text-smajl-olive hover:bg-smajl-olive/5">
                <a href="#hur-funkar-det">Hur funkar det?</a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Visual showcase - Camera + Sample photos */}
          <div className="w-full max-w-6xl mx-auto">
            <div className="grid grid-cols-12 gap-4 md:gap-6 items-center">
              
              {/* Left sample photo */}
              <motion.div 
                className="col-span-4 md:col-span-3"
                initial={{ opacity: 0, x: -30, rotate: -5 }}
                animate={{ opacity: 1, x: 0, rotate: -3 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-lg shadow-lg transform rotate-2" />
                  <img 
                    src={heroSample1}
                    alt="Bild tagen med Smajl"
                    className="relative rounded-lg shadow-card w-full aspect-[3/4] object-cover border-4 border-white"
                  />
                </div>
              </motion.div>

              {/* Center camera product */}
              <motion.div 
                className="col-span-4 md:col-span-6 flex justify-center"
                initial={{ opacity: 0, scale: 0.8, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              >
                <div className="relative">
                  {/* Glow effect */}
                  <div className="absolute inset-0 bg-smajl-olive/15 blur-3xl rounded-full scale-125" />
                  
                  {/* Floating animation */}
                  <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <img 
                      src={heroCamera} 
                      alt="Smajl Kamera" 
                      className="relative w-full max-w-[200px] md:max-w-[320px] lg:max-w-[400px] drop-shadow-2xl"
                    />
                  </motion.div>
                </div>
              </motion.div>

              {/* Right sample photo */}
              <motion.div 
                className="col-span-4 md:col-span-3"
                initial={{ opacity: 0, x: 30, rotate: 5 }}
                animate={{ opacity: 1, x: 0, rotate: 3 }}
                transition={{ duration: 0.8, delay: 0.7 }}
              >
                <div className="relative">
                  <div className="absolute inset-0 bg-white rounded-lg shadow-lg transform -rotate-2" />
                  <img 
                    src={heroSample2}
                    alt="Bild tagen med Smajl"
                    className="relative rounded-lg shadow-card w-full aspect-[3/4] object-cover border-4 border-white"
                  />
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
