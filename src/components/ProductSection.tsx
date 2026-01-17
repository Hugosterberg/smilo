import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Real product images
import productBlack from "@/assets/product-black.jpg";
import productGreen from "@/assets/product-green.jpg";
import productBrown from "@/assets/product-brown.jpg";
import productAllColors from "@/assets/product-all-colors.jpg";
import productBack from "@/assets/product-back.jpg";

import smajlLogoIcon from "@/assets/smajl-logo-icon.png";

interface CameraColor {
  id: string;
  name: string;
  fullName: string;
  image: string;
  colorClass: string;
}

// Colors: vit (white), svart (black), rosa (pink), brun (brown), grön (green)
// Note: Using available product images - white and pink can be added when photos are available
const cameraColors: CameraColor[] = [
  { id: "black", name: "Svart", fullName: "smajl retro kamera – svart", image: productBlack, colorClass: "bg-zinc-900" },
  { id: "green", name: "Grön", fullName: "smajl retro kamera – grön", image: productGreen, colorClass: "bg-[#6B7B4B]" },
  { id: "brown", name: "Brun", fullName: "smajl retro kamera – brun", image: productBrown, colorClass: "bg-[#8B5A3C]" },
];

const ProductSection = () => {
  const [selectedColor, setSelectedColor] = useState(cameraColors[0]);
  const [adapterAdded, setAdapterAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(selectedColor.image);

  const totalPrice = 800 + (adapterAdded ? 99 : 0);

  // Gallery images for selected color
  const getGalleryImages = () => {
    return [
      { id: 'main', src: selectedColor.image, alt: `${selectedColor.fullName} - framsida` },
      { id: 'back', src: productBack, alt: `${selectedColor.fullName} - baksida` },
      { id: 'all', src: productAllColors, alt: 'Alla färger' },
    ];
  };

  const handleColorChange = (color: CameraColor) => {
    setSelectedColor(color);
    setActiveImage(color.image);
  };

  return (
    <section id="produkt" className="smajl-section scroll-mt-20 bg-background">
      <div className="smajl-container">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <img src={smajlLogoIcon} alt="" className="h-16 w-auto mx-auto mb-4" />
          <h2 className="smajl-heading-lg text-smajl-brown mb-4">{selectedColor.fullName}</h2>
          <p className="smajl-body text-muted-foreground max-w-xl mx-auto">
            En liten digital kamera som påminner om hur fotografering kändes förr –
            fast med dagens enkelhet.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Images */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-card mb-4">
              <AnimatePresence mode="wait">
                <motion.img
                  key={activeImage}
                  src={activeImage}
                  alt={selectedColor.fullName}
                  className="w-full h-full object-contain p-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                />
              </AnimatePresence>
            </div>

            {/* Thumbnail Gallery */}
            <div className="flex gap-3 justify-center">
              {getGalleryImages().map((img) => (
                <button
                  key={img.id}
                  onClick={() => setActiveImage(img.src)}
                  className={`w-20 h-20 rounded-xl overflow-hidden bg-white shadow-soft transition-all ${
                    activeImage === img.src 
                      ? 'ring-2 ring-smajl-olive ring-offset-2' 
                      : 'hover:ring-2 hover:ring-smajl-olive/50'
                  }`}
                >
                  <img src={img.src} alt={img.alt} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info / Buy Box */}
          <motion.div 
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Color Selection */}
            <div className="mb-8">
              <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-smajl-brown">Välj färg</p>
              <div className="flex gap-3 flex-wrap">
                {cameraColors.map((color) => (
                  <motion.button
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    className={`flex flex-col items-center gap-2 p-3 rounded-xl transition-all duration-200 border-2 ${
                      selectedColor.id === color.id
                        ? "border-smajl-olive bg-smajl-olive/5"
                        : "border-transparent hover:bg-smajl-cream"
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className={`w-10 h-10 rounded-full ${color.colorClass} shadow-soft border border-black/10`} />
                    <span className="text-xs font-medium text-smajl-brown">{color.name}</span>
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-3">
                Fler färger kommer snart: Vit, Rosa
              </p>
            </div>

            {/* Price */}
            <div className="mb-6 p-6 rounded-2xl bg-smajl-cream">
              <motion.p 
                className="text-4xl font-bold text-smajl-brown"
                key={totalPrice}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {totalPrice} kr
              </motion.p>
              <p className="text-sm text-smajl-brown-light mt-2">
                Fri frakt och fri retur inom Sverige.
              </p>
            </div>

            {/* Adapter Option */}
            <div className="mb-8 p-4 rounded-2xl bg-smajl-gold-soft border border-smajl-gold/30">
              <label className="flex items-start gap-3 cursor-pointer">
                <motion.button
                  onClick={() => setAdapterAdded(!adapterAdded)}
                  className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    adapterAdded
                      ? "bg-smajl-olive border-smajl-olive"
                      : "border-smajl-brown/30 hover:border-smajl-olive"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence>
                    {adapterAdded && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                      >
                        <Check className="w-3 h-3 text-smajl-cream" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <div>
                  <p className="text-sm font-semibold text-smajl-brown">Lägg till USB-C-adapter (+99 kr)</p>
                  <p className="text-xs text-smajl-brown-light mt-1">
                    Krävs för iPhone 14 eller äldre
                  </p>
                </div>
              </label>
            </div>

            {/* Add to Cart */}
            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button variant="hero" size="xl" className="w-full mb-4">
                Lägg i varukorg
              </Button>
            </motion.div>

            <p className="text-sm text-center text-muted-foreground">
              Leverans inom Sverige
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
