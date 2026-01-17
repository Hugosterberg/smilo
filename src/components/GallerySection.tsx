import { motion } from "framer-motion";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const images = [
  { src: gallery1, alt: "Vänner som skålar på en fest" },
  { src: gallery2, alt: "Sommardag på stranden" },
  { src: gallery3, alt: "Mysig middag med levande ljus" },
  { src: gallery4, alt: "Vänner som skrattar tillsammans" },
  { src: gallery5, alt: "Solnedgång under en resa" },
  { src: gallery6, alt: "Födelsedagsfirande med tårta" },
];

const GallerySection = () => {
  return (
    <section className="smajl-section">
      <div className="smajl-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="smajl-heading-lg text-center mb-4">Tagna med smajl</h2>
          <p className="smajl-body text-center text-muted-foreground mb-12 max-w-lg mx-auto">
            Äkta ögonblick, inte perfekta bilder. Så här ser livet ut genom smajl.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {images.map((image, index) => (
            <motion.div
              key={index}
              className="aspect-square rounded-2xl overflow-hidden shadow-card"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
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
