import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";
import gallery7 from "@/assets/gallery-7.jpg";
import gallery8 from "@/assets/gallery-8.jpg";
import gallery9 from "@/assets/gallery-9.jpg";

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
    <section className="smilo-section bg-smilo-cream">
      <div className="smilo-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="smilo-heading-lg mb-4 text-smilo-brown">Bilder tagna med Smilo</h2>
          <motion.div
            className="w-16 h-1 bg-smilo-gold mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="smilo-body text-smilo-brown-light max-w-xl mx-auto mb-2">
            Äkta ögonblick. Precis som de är.
          </p>
          <p className="smilo-body-sm text-smilo-brown-light/70 max-w-xl mx-auto">
            Inga filter i efterhand. Ingen redigering.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden shadow-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              whileHover={{ scale: 1.02 }}
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
