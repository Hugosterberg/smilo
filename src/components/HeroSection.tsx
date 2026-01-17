import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroCameraNoBg from "@/assets/hero-camera-nobg.png";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";

const photos = [gallery1, gallery2, gallery3, gallery4];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* Photo grid background - 2x2 grid on right side */}
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        {photos.map((photo, index) => (
          <motion.div
            key={index}
            className="relative overflow-hidden"
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
          >
            <img
              src={photo}
              alt=""
              className="w-full h-full object-cover"
            />
          </motion.div>
        ))}
      </div>

      {/* Content overlay */}
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        
        {/* Left side - cream panel with text */}
        <motion.div 
          className="w-full md:w-1/2 min-h-[60vh] md:min-h-screen bg-smajl-cream/95 backdrop-blur-sm flex flex-col justify-center px-8 md:px-12 lg:px-16 py-24 md:py-0"
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

        {/* Right side - just the photo grid visible */}
        <div className="hidden md:block flex-1 relative" />
      </div>

      {/* Camera - positioned at bottom right, overlapping the corner */}
      <motion.div
        className="absolute bottom-8 right-8 md:bottom-12 md:right-12 lg:bottom-16 lg:right-16 z-20"
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
      >
        {/* Shadow */}
        <div className="absolute inset-0 bg-black/25 blur-2xl rounded-full scale-90 translate-y-6" />
        
        <motion.img
          src={heroCameraNoBg}
          alt="Smajl Kamera"
          className="relative w-44 md:w-64 lg:w-80 xl:w-96 drop-shadow-2xl"
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </section>
  );
};

export default HeroSection;
