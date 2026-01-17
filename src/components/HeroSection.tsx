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
    <section className="relative min-h-screen overflow-hidden bg-smajl-cream">
      <div className="min-h-screen flex flex-col lg:flex-row">
        
        {/* Left side - Text content */}
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen flex flex-col justify-center px-8 md:px-12 lg:px-16 xl:px-20 py-24 lg:py-0 relative z-10">
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl text-smajl-brown leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Släpp mobilen.
            <br />
            <span className="italic text-smajl-olive">Ta kameran.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg text-smajl-brown-light leading-relaxed mb-8 max-w-md"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            En digital kamera utan skärm. Ta bilder – och fortsätt leva i stunden.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
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

          {/* Camera - positioned at bottom of text section, extending into photo area */}
          <motion.div
            className="absolute bottom-8 right-0 lg:bottom-16 lg:-right-24 xl:-right-32 z-20"
            initial={{ opacity: 0, x: 40, y: 20 }}
            animate={{ opacity: 1, x: 0, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: "easeOut" }}
          >
            <div className="absolute inset-0 bg-black/20 blur-2xl rounded-full scale-90 translate-y-4" />
            <motion.img
              src={heroCameraNoBg}
              alt="Smajl Kamera"
              className="relative w-40 md:w-56 lg:w-72 xl:w-80 drop-shadow-2xl"
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </div>

        {/* Right side - 2x2 Photo grid */}
        <div className="w-full lg:w-1/2 min-h-[50vh] lg:min-h-screen grid grid-cols-2 grid-rows-2">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden"
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, delay: 0.1 + index * 0.1 }}
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
