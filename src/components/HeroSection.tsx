import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroCameraNoBg from "@/assets/hero-camera-nobg.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const photos = [gallery1, gallery2, gallery3, gallery4, gallery5, gallery6];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Photo grid background - full bleed */}
      <div className="absolute inset-0 grid grid-cols-3 md:grid-cols-4">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
          >
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
        {/* Extra photos to fill on desktop */}
        <motion.div
          className="relative overflow-hidden hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <img src={gallery1} alt="" className="w-full h-full object-cover" />
        </motion.div>
        <motion.div
          className="relative overflow-hidden hidden md:block"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <img src={gallery3} alt="" className="w-full h-full object-cover" />
        </motion.div>
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex">
        
        {/* Left side - cream panel with text */}
        <motion.div 
          className="w-full md:w-1/2 lg:w-2/5 min-h-screen bg-smajl-cream/95 backdrop-blur-sm flex flex-col justify-center px-8 md:px-12 lg:px-16"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-smajl-brown leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Släpp mobilen.
            <br />
            <span className="italic text-smajl-olive">Ta kameran.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-smajl-brown-light leading-relaxed mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            En digital kamera utan skärm. Ta bilder – och fortsätt leva i stunden.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Button variant="default" size="lg" asChild className="rounded-full px-8">
              <a href="#produkt">Köp nu</a>
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              asChild 
              className="rounded-full px-8 text-smajl-olive hover:bg-smajl-olive/10"
            >
              <a href="#hur-funkar-det">Hur funkar det?</a>
            </Button>
          </motion.div>
        </motion.div>

        {/* Right side - Camera floating over photos */}
        <div className="hidden md:flex flex-1 items-center justify-center relative">
          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.8, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          >
            {/* Subtle shadow/glow behind camera */}
            <div className="absolute inset-0 bg-black/20 blur-3xl rounded-full scale-110 translate-y-8" />
            
            <motion.img
              src={heroCameraNoBg}
              alt="Smajl Kamera"
              className="relative w-72 lg:w-96 xl:w-[450px] drop-shadow-2xl"
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Mobile camera - shows below text */}
        <motion.div
          className="md:hidden absolute bottom-8 right-4 w-40"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
        >
          <img
            src={heroCameraNoBg}
            alt="Smajl Kamera"
            className="w-full drop-shadow-xl"
          />
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
