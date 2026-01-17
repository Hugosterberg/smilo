import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

import heroCameraNoBg from "@/assets/hero-camera-nobg.png";
import heroSample1 from "@/assets/hero-sample-1.jpg";
import heroSample2 from "@/assets/hero-sample-2.jpg";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";

const floatingPhotos = [
  { src: heroSample1, delay: 0, x: "8%", y: "15%", rotate: -8, size: "w-32 md:w-44" },
  { src: gallery1, delay: 0.1, x: "75%", y: "8%", rotate: 6, size: "w-28 md:w-40" },
  { src: heroSample2, delay: 0.2, x: "85%", y: "55%", rotate: 12, size: "w-36 md:w-48" },
  { src: gallery2, delay: 0.3, x: "5%", y: "60%", rotate: -12, size: "w-30 md:w-42" },
  { src: gallery3, delay: 0.4, x: "70%", y: "85%", rotate: -4, size: "w-24 md:w-32" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-smajl-cream via-smajl-cream-light to-smajl-gold-soft/30">
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-smajl-olive/10 blur-3xl"
          animate={{ 
            scale: [1, 1.2, 1],
            x: [0, 30, 0],
            y: [0, -20, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-1/3 -right-32 w-[500px] h-[500px] rounded-full bg-smajl-gold-soft/40 blur-3xl"
          animate={{ 
            scale: [1, 1.15, 1],
            x: [0, -40, 0]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-0 left-1/4 w-72 h-72 rounded-full bg-smajl-terracotta/10 blur-3xl"
          animate={{ 
            scale: [1, 1.3, 1],
            y: [0, -30, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>

      {/* Floating polaroid photos - scattered around */}
      <div className="absolute inset-0 pointer-events-none hidden md:block">
        {floatingPhotos.map((photo, index) => (
          <motion.div
            key={index}
            className={`absolute ${photo.size}`}
            style={{ left: photo.x, top: photo.y }}
            initial={{ opacity: 0, scale: 0.8, rotate: photo.rotate - 10 }}
            animate={{ 
              opacity: 1, 
              scale: 1, 
              rotate: photo.rotate,
              y: [0, -8, 0]
            }}
            transition={{ 
              opacity: { duration: 0.6, delay: 0.5 + photo.delay },
              scale: { duration: 0.6, delay: 0.5 + photo.delay },
              rotate: { duration: 0.6, delay: 0.5 + photo.delay },
              y: { duration: 3 + index * 0.5, repeat: Infinity, ease: "easeInOut", delay: index * 0.3 }
            }}
          >
            <div className="relative bg-white p-2 rounded shadow-xl">
              <img 
                src={photo.src} 
                alt="Foto taget med Smajl" 
                className="w-full aspect-[4/5] object-cover rounded-sm"
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-28 pb-16">
        
        {/* Camera - prominent center piece */}
        <motion.div
          className="relative mb-8 md:mb-12"
          initial={{ opacity: 0, y: 40, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          {/* Glow behind camera */}
          <div className="absolute inset-0 bg-smajl-olive/20 blur-[60px] rounded-full scale-150" />
          
          <motion.img
            src={heroCameraNoBg}
            alt="Smajl Kamera"
            className="relative w-64 md:w-80 lg:w-96 drop-shadow-2xl"
            animate={{ 
              y: [0, -12, 0],
              rotate: [0, 1, 0, -1, 0]
            }}
            transition={{ 
              y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
              rotate: { duration: 6, repeat: Infinity, ease: "easeInOut" }
            }}
          />
        </motion.div>

        {/* Text content */}
        <motion.div
          className="text-center max-w-2xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <motion.h1
            className="text-4xl md:text-6xl lg:text-7xl text-smajl-brown leading-[1.05] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Släpp mobilen.
            <br />
            <span className="italic text-smajl-olive">Ta kameran.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-smajl-brown-light leading-relaxed mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            En digital kamera utan skärm. Ta bilder – och fortsätt leva i stunden.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button variant="default" size="xl" asChild className="rounded-full px-10 shadow-lg hover:shadow-xl transition-shadow">
              <a href="#produkt">Utforska kameran</a>
            </Button>
            <Button 
              variant="ghost" 
              size="xl" 
              asChild 
              className="rounded-full px-10 text-smajl-olive hover:bg-smajl-olive/10"
            >
              <a href="#hur-funkar-det">Hur funkar det?</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-smajl-brown-light/60"
          >
            <span className="text-xs uppercase tracking-widest">Scrolla</span>
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>

      {/* Mobile floating photos - simpler layout */}
      <div className="md:hidden absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute w-20 left-4 top-28"
          initial={{ opacity: 0, rotate: -8 }}
          animate={{ opacity: 0.7, rotate: -8 }}
          transition={{ delay: 0.8 }}
        >
          <div className="bg-white p-1 rounded shadow-lg">
            <img src={heroSample1} alt="" className="w-full aspect-square object-cover rounded-sm" />
          </div>
        </motion.div>
        <motion.div
          className="absolute w-16 right-6 top-32"
          initial={{ opacity: 0, rotate: 6 }}
          animate={{ opacity: 0.7, rotate: 6 }}
          transition={{ delay: 0.9 }}
        >
          <div className="bg-white p-1 rounded shadow-lg">
            <img src={gallery1} alt="" className="w-full aspect-square object-cover rounded-sm" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
