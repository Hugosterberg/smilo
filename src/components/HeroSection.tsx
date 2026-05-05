'use client'

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";

const MotionImage = motion(Image);

const heroCameraNoBg = "/assets/hero-camera-nobg.png";
const carousel1 = "/assets/carousel-1.jpg";
const carousel2 = "/assets/carousel-2.jpg";
const carousel3 = "/assets/carousel-3.jpg";
const carousel4 = "/assets/carousel-4.jpg";
const carousel5 = "/assets/carousel-5.jpg";
const carousel6 = "/assets/carousel-6.jpg";
const carousel7 = "/assets/carousel-7.jpg";
const carousel8 = "/assets/carousel-8.jpg";
const carousel9 = "/assets/carousel-9.jpg";
const carousel10 = "/assets/carousel-10.jpg";
const carousel11 = "/assets/carousel-11.jpg";
const carousel12 = "/assets/carousel-12.jpg";
const carousel13 = "/assets/carousel-13.jpg";
const carousel14 = "/assets/carousel-14.jpg";
const carousel15 = "/assets/carousel-15.jpg";
const carousel16 = "/assets/carousel-16.jpg";

const carouselPhotos = [
  carousel1, carousel2, carousel3, carousel4, carousel5,
  carousel6, carousel7, carousel8, carousel9, carousel10,
  carousel11, carousel12, carousel13, carousel14, carousel15, carousel16
];

const doubledPhotos = [...carouselPhotos, ...carouselPhotos];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-smilo-cream overflow-hidden flex flex-col">

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
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-smilo-brown leading-[1.1] mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Släpp mobilen.
              <br />
              <span className="italic text-smilo-olive">Ta kameran.</span>
            </motion.h1>

            <motion.p
              className="text-base md:text-lg lg:text-xl text-smilo-brown-light leading-relaxed mb-10 max-w-lg mx-auto lg:mx-0"
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
                className="rounded-full px-10 border-smilo-olive/30 text-smilo-olive hover:bg-smilo-olive/5"
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
              <div className="absolute inset-0 bg-smilo-olive/10 blur-[60px] rounded-full scale-110" />
              <MotionImage
                src={heroCameraNoBg}
                alt="Smilo Kamera"
                width={520}
                height={520}
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
              className="relative flex-shrink-0 w-48 md:w-64 lg:w-72 aspect-[4/3] rounded-lg overflow-hidden"
            >
              <Image
                src={photo}
                alt=""
                fill
                sizes="(min-width: 1024px) 18rem, (min-width: 768px) 16rem, 12rem"
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
