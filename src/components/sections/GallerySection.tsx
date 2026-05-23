'use client'

import { motion } from "framer-motion";
import { DevelopedPhoto } from "@/components/shared/DevelopedPhoto";
const gallery1 = "/assets/gallery-1.jpg";
const gallery2 = "/assets/gallery-2.jpg";
const gallery3 = "/assets/gallery-3.jpg";
const gallery4 = "/assets/gallery-4.jpg";
const gallery5 = "/assets/gallery-5.jpg";
const gallery6 = "/assets/gallery-6.jpg";
const gallery7 = "/assets/gallery-7.jpg";
const gallery8 = "/assets/gallery-8.jpg";
const gallery9 = "/assets/gallery-9.jpg";

const images = [
  { src: gallery1, alt: "Stilig kille i vit kavaj" },
  { src: gallery2, alt: "Par på romantisk middag" },
  { src: gallery3, alt: "Bästa vännerna i soffan" },
  { src: gallery4, alt: "Matlagning med vänner i köket" },
  { src: gallery5, alt: "Förrätt tillsammans" },
  { src: gallery6, alt: "Skratt under middagsspelet" },
  { src: gallery7, alt: "Stilig kille i kostym" },
  { src: gallery8, alt: "Mysig middagsfest med vänner" },
  { src: gallery9, alt: "Vinprovning vid bordet" },
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
          <h2 className="smilo-heading-lg mb-4 text-smilo-brown">Bilder tagna med Smilo</h2>
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
