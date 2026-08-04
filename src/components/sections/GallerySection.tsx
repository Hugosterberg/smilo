'use client'

import { motion } from "framer-motion";
import { DevelopedPhoto } from "@/components/shared/DevelopedPhoto";
// Exempelbilder tagna med Smilo, omblandade så att liknande motiv inte
// hamnar bredvid varandra i rutnätet.
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

const GallerySection = () => {
  return (
    <section className="bg-smilo-cream pb-16 md:pb-24 lg:pb-32">
      <div className="smilo-container">
        <motion.div
          id="galleri"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="smilo-scroll-anchor text-center mb-8 sm:mb-12 pt-4 sm:pt-6 md:pt-8"
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
            12 MP · inga filter i efterhand · ingen redigering.
          </p>
          <p className="smilo-body-sm text-smilo-brown-light/70 max-w-xl mx-auto mt-2">
            För över till mobilen i full kvalitet via USB-C.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-3xl grid-cols-3 gap-3 sm:gap-4 sm:max-w-4xl sm:grid-cols-4 sm:gap-5 lg:max-w-5xl lg:grid-cols-5 lg:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="flex min-w-0 justify-center"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.03 }}
            >
              <DevelopedPhoto
                src={image.src}
                alt={image.alt}
                index={index}
                aspect="square"
                tilt
                preserveQuality
                priority={index < 4}
                sizes="(min-width: 1024px) 168px, (min-width: 640px) 152px, 128px"
                className="w-full max-w-[7.5rem] sm:max-w-[9rem] md:max-w-[9.75rem] lg:max-w-[10.25rem]"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
