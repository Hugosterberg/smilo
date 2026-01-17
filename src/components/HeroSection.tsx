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
    <section className="relative min-h-screen bg-smajl-cream overflow-hidden">
      
      {/* Top section - centered content */}
      <div className="relative z-10 pt-32 pb-40 md:pt-40 md:pb-52 px-6">
        <div className="max-w-4xl mx-auto text-center">
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-smajl-brown leading-[1.1] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Släpp mobilen.
            <br />
            <span className="italic text-smajl-olive">Ta kameran.</span>
          </motion.h1>

          <motion.p
            className="text-base md:text-lg lg:text-xl text-smajl-brown-light leading-relaxed mb-10 max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            En digital kamera utan skärm. Ta bilder – och fortsätt leva i stunden.
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            <Button variant="default" size="lg" asChild className="rounded-full px-10">
              <a href="#produkt">Köp nu</a>
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              asChild 
              className="rounded-full px-10 border-smajl-olive/30 text-smajl-olive hover:bg-smajl-olive/5"
            >
              <a href="#hur-funkar-det">Hur funkar det?</a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Camera - overlapping between hero text and photo grid */}
      <motion.div
        className="absolute left-1/2 -translate-x-1/2 z-20"
        style={{ bottom: "calc(25vh - 60px)" }}
        initial={{ opacity: 0, y: 60, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
      >
        <div className="absolute inset-0 bg-smajl-olive/15 blur-[50px] rounded-full scale-125" />
        <motion.img
          src={heroCameraNoBg}
          alt="Smajl Kamera"
          className="relative w-56 md:w-72 lg:w-80 xl:w-96 drop-shadow-2xl"
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>

      {/* Photo grid - bottom of page */}
      <div className="absolute bottom-0 left-0 right-0 h-[25vh] md:h-[30vh]">
        <div className="h-full grid grid-cols-4">
          {photos.map((photo, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover"
              />
              {/* Subtle dark gradient overlay for depth */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
