'use client'

import { motion } from "framer-motion";
import { DevelopedPhoto } from "@/components/shared/DevelopedPhoto";

// Exempelbilder tagna med Smilo, omblandade så att liknande motiv inte
// hamnar bredvid varandra.
const images = [
  { src: "/assets/example-1.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-8.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-15.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-5.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-12.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-2.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-9.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-16.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-6.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-13.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-3.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-10.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-17.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-7.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-14.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-4.jpg", alt: "Bild tagen med Smilo-kameran" },
  { src: "/assets/example-11.jpg", alt: "Bild tagen med Smilo-kameran" },
];

// Tre snören: 6 + 6 + 5 — sista raden centreras så den inte känns "trasig".
const rows = [
  images.slice(0, 6),
  images.slice(6, 12),
  images.slice(12),
] as const;

// Deterministisk "slump" per foto — tilt + vertikal förskjutning.
const HANG = [
  { rotate: -3.5, y: 6 },
  { rotate: 2.2, y: -4 },
  { rotate: -1.4, y: 10 },
  { rotate: 3.8, y: 2 },
  { rotate: -2.6, y: -8 },
  { rotate: 1.6, y: 8 },
  { rotate: 2.8, y: -2 },
  { rotate: -3.2, y: 12 },
  { rotate: 1.1, y: 4 },
  { rotate: -2.0, y: -6 },
  { rotate: 3.4, y: 8 },
  { rotate: -1.8, y: 0 },
  { rotate: 2.5, y: -10 },
  { rotate: -3.0, y: 6 },
  { rotate: 1.9, y: 10 },
  { rotate: -2.4, y: -4 },
  { rotate: 3.1, y: 2 },
] as const;

const ROW_OFFSETS = [0, 6, 12] as const;

const GallerySection = () => {
  return (
    <section id="galleri" className="smilo-scroll-anchor bg-smilo-cream pb-16 md:pb-24 lg:pb-32">
      <div className="smilo-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8 sm:mb-12 pt-4 sm:pt-6 md:pt-8"
        >
          <h2 className="smilo-heading-lg mb-4 text-smilo-brown">Samla minnen med Smilo</h2>
          <motion.div
            className="smilo-accent-bar"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="smilo-body text-smilo-brown-light max-w-xl mx-auto mb-2">
            Äkta ögonblick. Precis som de är.
          </p>
          <p className="smilo-body-sm text-smilo-brown-light/70 max-w-xl mx-auto">
            12 MP · filtret väljer du när du fotar · ingen redigering i efterhand.
          </p>
          <p className="smilo-body-sm text-smilo-brown-light/70 max-w-xl mx-auto mt-2">
            För över till mobilen i full kvalitet via USB-C.
          </p>
        </motion.div>

        <div className="mx-auto flex max-w-5xl flex-col gap-10 sm:gap-14 lg:gap-16">
          {rows.map((row, rowIndex) => (
            <motion.div
              key={rowIndex}
              className="relative"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: rowIndex * 0.08 }}
            >
              {/* Snöre */}
              <div
                className="pointer-events-none absolute left-[2%] right-[2%] top-3 h-px bg-gradient-to-r from-transparent via-smilo-brown/35 to-transparent sm:top-4"
                aria-hidden
              />
              <div
                className="pointer-events-none absolute left-[2%] right-[2%] top-[13px] h-px bg-smilo-brown/10 sm:top-[17px]"
                aria-hidden
              />

              <ul className="relative flex flex-wrap items-start justify-center gap-x-2 gap-y-6 px-1 pt-5 sm:gap-x-3 sm:gap-y-8 sm:px-2 sm:pt-6 md:gap-x-4 lg:gap-x-5">
                {row.map((image, colIndex) => {
                  const index = ROW_OFFSETS[rowIndex] + colIndex;
                  const hang = HANG[index % HANG.length];

                  return (
                    <motion.li
                      key={image.src}
                      // Från md: bredd = (radbredd − 5 gap) / 6 så att sex foton
                      // alltid ryms per snöre. Under md radbryts som förut.
                      className="relative list-none w-[6.75rem] sm:w-[8.25rem] md:w-[calc((100%-5rem)/6)] lg:w-[calc((100%-6.25rem)/6)]"
                      style={{
                        rotate: `${hang.rotate}deg`,
                        y: hang.y,
                      }}
                      initial={{ opacity: 0, y: 28 }}
                      whileInView={{ opacity: 1, y: hang.y }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: colIndex * 0.05 }}
                      whileHover={{
                        scale: 1.06,
                        y: hang.y - 6,
                        rotate: hang.rotate * 0.35,
                        zIndex: 20,
                        transition: { duration: 0.25 },
                      }}
                    >
                      {/* Klädnypa / pinne över snöret */}
                      <span
                        className="absolute left-1/2 top-0 z-20 flex -translate-x-1/2 -translate-y-[calc(50%-2px)] flex-col items-center"
                        aria-hidden
                      >
                        <span className="h-3 w-[7px] rounded-[1px] bg-gradient-to-b from-smilo-flash to-smilo-flash-dark shadow-sm sm:h-3.5 sm:w-2" />
                        <span className="mt-[-1px] h-1.5 w-1.5 rounded-full bg-smilo-brown/50" />
                      </span>

                      <DevelopedPhoto
                        src={image.src}
                        alt={image.alt}
                        index={index}
                        aspect="square"
                        preserveQuality
                        priority={index < 4}
                        sizes="(min-width: 1024px) 152px, (min-width: 768px) 112px, (min-width: 640px) 132px, 108px"
                        className="w-full"
                      />
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
