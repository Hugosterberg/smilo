'use client'

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { DevelopedPhoto } from "@/components/shared/DevelopedPhoto";
import { TiltCard } from "@/components/shared/TiltCard";
import { CameraFlash } from "@/components/shared/CameraFlash";

const MotionImage = motion.create(Image);

const heroCameraNoBg = "/assets/smilo-black-transparent.png";
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
  const reduceMotion = useReducedMotion();
  const [flash, setFlash] = useState(0);

  useEffect(() => {
    if (reduceMotion) return;
    const id = setInterval(() => setFlash((f) => f + 1), 6500);
    return () => clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="relative min-h-[100dvh] bg-smilo-sepia/40 overflow-hidden flex flex-col border-b border-smilo-brown/10">

      {/* Main content area */}
      <div className="flex-1 flex flex-col lg:flex-row items-center justify-center px-4 sm:px-6 md:px-10 lg:px-16 pt-[calc(var(--header-height)+1.25rem)] sm:pt-[calc(var(--header-height)+2rem)] pb-6 sm:pb-8 lg:pb-0">
        <div className="w-full max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-12 xl:gap-20">

          {/* Left side - Text content */}
          <motion.div
            className="w-full lg:w-auto lg:flex-1 text-center lg:text-left lg:max-w-xl"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <p className="smilo-retro-label mb-3 sm:mb-4 text-[10px] sm:text-xs">Digital retrokamera · Smilo</p>
            <motion.h1
              className="font-display smilo-heading-xl text-smilo-brown mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
            >
              Släpp mobilen.
              <br />
              <span className="smilo-heading-accent">Ta kameran.</span>
            </motion.h1>

            <motion.p
              className="text-sm sm:text-base md:text-lg text-smilo-brown-light leading-relaxed mb-8 sm:mb-10 max-w-lg mx-auto lg:mx-0 px-1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
            >
              En digital kamera utan skärm. Ta bilder – och fortsätt leva i stunden.
            </motion.p>

            <motion.div
              className="w-full sm:w-auto max-w-sm sm:max-w-none mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
            >
              <div className="smilo-film-frame inline-block w-full sm:w-auto">
                <div className="smilo-film-frame__track smilo-film-frame__track--stack flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start p-2 sm:p-2.5">
                  <Button variant="hero" size="lg" asChild className="smilo-shine">
                    <a href="#produkt">Köp nu</a>
                  </Button>
                  <Button variant="cream" size="lg" asChild className="smilo-btn-on-film">
                    <a href="#hur-funkar-det">Hur funkar det?</a>
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right side - Camera */}
          <motion.div
            className="w-full lg:w-auto lg:flex-1 flex justify-center lg:max-w-xl"
            initial={{ opacity: 0, x: 30, scale: 0.95 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            onHoverStart={() => setFlash((f) => f + 1)}
          >
            <TiltCard className="relative" max={14} scale={1.06}>
              <div className="relative">
                <div className="smilo-lens-glow absolute inset-0 -z-10 rounded-full bg-smilo-flash/20 blur-[70px] scale-110" />
                <MotionImage
                  src={heroCameraNoBg}
                  alt="Smilo Kamera"
                  width={520}
                  height={520}
                  className="relative w-48 sm:w-64 md:w-72 lg:w-96 xl:w-[26rem] max-w-[min(85vw,20rem)] drop-shadow-2xl"
                  animate={reduceMotion ? undefined : { y: [0, -12, 0], rotate: [-1.5, 1.5, -1.5] }}
                  transition={
                    reduceMotion
                      ? undefined
                      : {
                          y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                          rotate: { duration: 7, repeat: Infinity, ease: "easeInOut" },
                        }
                  }
                />
                <CameraFlash trigger={flash} />
              </div>
            </TiltCard>
          </motion.div>
        </div>
      </div>

      {/* Infinite scrolling carousel — utvecklade bilder med digital överföring */}
      <div className="w-full overflow-x-hidden overflow-y-visible py-6 sm:py-8 md:py-10">
        <motion.div
          className="flex items-end gap-3 sm:gap-5 md:gap-7 px-3 sm:px-4"
          animate={reduceMotion ? undefined : { x: ["0%", "-50%"] }}
          transition={
            reduceMotion
              ? undefined
              : {
                  x: {
                    duration: 30,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }
          }
        >
          {doubledPhotos.map((photo, index) => (
            <DevelopedPhoto
              key={index}
              src={photo}
              alt="Ögonblick fångat med Smilo"
              index={index}
              aspect="landscape"
              tilt={index % 3 === 0}
              preserveQuality
              sizes="(min-width: 1024px) 256px, (min-width: 768px) 224px, 176px"
              className="relative w-32 sm:w-40 md:w-48 lg:w-56 xl:w-64 flex-shrink-0"
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
