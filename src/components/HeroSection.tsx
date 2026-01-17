import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

import heroCameraNoBg from "@/assets/hero-camera-nobg.png";
import carousel1 from "@/assets/carousel-1.jpg";
import carousel2 from "@/assets/carousel-2.jpg";
import carousel3 from "@/assets/carousel-3.jpg";
import carousel4 from "@/assets/carousel-4.jpg";
import carousel5 from "@/assets/carousel-5.jpg";
import carousel6 from "@/assets/carousel-6.jpg";
import carousel7 from "@/assets/carousel-7.jpg";
import carousel8 from "@/assets/carousel-8.jpg";
import carousel9 from "@/assets/carousel-9.jpg";
import carousel10 from "@/assets/carousel-10.jpg";
import carousel11 from "@/assets/carousel-11.jpg";
import carousel12 from "@/assets/carousel-12.jpg";
import carousel13 from "@/assets/carousel-13.jpg";
import carousel14 from "@/assets/carousel-14.jpg";
import carousel15 from "@/assets/carousel-15.jpg";
import carousel16 from "@/assets/carousel-16.jpg";

const carouselPhotos = [
  carousel1, carousel2, carousel3, carousel4, carousel5,
  carousel6, carousel7, carousel8, carousel9, carousel10,
  carousel11, carousel12, carousel13, carousel14, carousel15, carousel16
];

// Double the array for seamless infinite scroll
const doubledPhotos = [...carouselPhotos, ...carouselPhotos];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-smajl-cream overflow-hidden flex flex-col">
      
      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-6 md:px-12 lg:px-16 pt-28 pb-8 lg:pb-0">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center lg:gap-12 xl:gap-20">
          
          {/* Left side - Text content */}
          <motion.div 
            className="w-full lg:w-auto lg:flex-1 text-center lg:text-left mb-8 lg:mb-0 lg:max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-smajl-brown leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Släpp mobilen.
              <br />
              <span className="italic text-smajl-olive">Ta kameran.</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-smajl-brown-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              En digital kamera utan skärm. Ta bilder – och fortsätt leva i stunden.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
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
          </motion.div>

          {/* Right side - Camera */}
          <motion.div 
            className="w-full lg:w-auto lg:flex-1 flex justify-center lg:max-w-xl"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            <div className="relative">
              <div className="absolute inset-0 bg-smajl-olive/10 blur-[60px] rounded-full scale-110" />
              <motion.img
                src={heroCameraNoBg}
                alt="Smajl Kamera"
                className="relative w-64 md:w-80 lg:w-96 xl:w-[26rem] drop-shadow-2xl"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Infinite scrolling carousel */}
      <div className="w-full overflow-hidden py-6 md:py-8">
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            x: {
              duration: 30,
              repeat: Infinity,
              ease: "linear"
            }
          }}
        >
          {doubledPhotos.map((photo, index) => (
            <div
              key={index}
              className="flex-shrink-0 w-48 md:w-64 lg:w-72 aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src={photo}
                alt=""
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
