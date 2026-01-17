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
import gallery10 from "@/assets/gallery-10.jpg";

const images = [
  { src: gallery1, alt: "Spontan selfie hemma" },
  { src: gallery2, alt: "Uppklädd för fest" },
  { src: gallery3, alt: "Mysig middag med vänner" },
  { src: gallery4, alt: "Bästa vänner selfie" },
  { src: gallery5, alt: "Matlagning i köket" },
  { src: gallery6, alt: "Ljuständning på kvällen" },
  { src: gallery7, alt: "Par vid middagsbordet" },
  { src: gallery8, alt: "Vänner med tomtebloss" },
  { src: gallery9, alt: "Stilig kille vid fönstret" },
  { src: gallery10, alt: "Rolig stund på festen" },
];

const GallerySection = () => {
  return (
    <section className="smajl-section bg-smajl-cream">
      <div className="smajl-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="smajl-heading-lg mb-4 text-smajl-brown">Bilder tagna med smajl</h2>
          <motion.div
            className="w-16 h-1 bg-smajl-gold mx-auto mb-6 rounded-full"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="smajl-body text-smajl-brown-light max-w-xl mx-auto mb-2">
            Äkta ögonblick. Precis som de är.
          </p>
          <p className="smajl-body-sm text-smajl-brown-light/70 max-w-xl mx-auto">
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
