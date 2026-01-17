import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

// Import camera images
import cameraBlack from "@/assets/camera-black.jpg";
import cameraPink from "@/assets/camera-pink.jpg";
import cameraBlue from "@/assets/camera-blue.jpg";
import cameraGreen from "@/assets/camera-green.jpg";
import cameraYellow from "@/assets/camera-yellow.jpg";

interface CameraColor {
  id: string;
  name: string;
  image: string;
  colorClass: string;
}

const cameraColors: CameraColor[] = [
  { id: "black", name: "Svart", image: cameraBlack, colorClass: "bg-smajl-black" },
  { id: "pink", name: "Rosa", image: cameraPink, colorClass: "bg-smajl-pink" },
  { id: "blue", name: "Blå", image: cameraBlue, colorClass: "bg-smajl-blue" },
  { id: "green", name: "Grön", image: cameraGreen, colorClass: "bg-smajl-green" },
  { id: "yellow", name: "Gul", image: cameraYellow, colorClass: "bg-smajl-yellow" },
];

const ProductSection = () => {
  const [selectedColor, setSelectedColor] = useState(cameraColors[0]);
  const [adapterAdded, setAdapterAdded] = useState(false);

  const totalPrice = 800 + (adapterAdded ? 99 : 0);

  return (
    <section id="produkt" className="smajl-section scroll-mt-20">
      <div className="smajl-container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Product Image */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="aspect-square rounded-3xl overflow-hidden bg-secondary/50 shadow-card">
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedColor.id}
                  src={selectedColor.image}
                  alt={`smajl retro kamera i ${selectedColor.name}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                />
              </AnimatePresence>
            </div>
            
            {/* Color Swatches below image on mobile */}
            <div className="mt-6 flex justify-center gap-3 lg:hidden">
              {cameraColors.map((color) => (
                <motion.button
                  key={color.id}
                  onClick={() => setSelectedColor(color)}
                  className={`w-10 h-10 rounded-full ${color.colorClass} transition-all duration-200 border-2 ${
                    selectedColor.id === color.id
                      ? "border-primary"
                      : "border-transparent"
                  }`}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={`Välj ${color.name}`}
                />
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
            <h2 className="smajl-heading-md mb-4">smajl retro kamera</h2>
            <p className="smajl-body text-muted-foreground mb-8">
              En enkel digitalkamera som hjälper dig att vara i nuet – och spara minnena till senare.
            </p>

            {/* Color Selection - Desktop */}
            <div className="hidden lg:block mb-8">
              <p className="text-sm font-medium mb-3">Välj färg: {selectedColor.name}</p>
              <div className="flex gap-3">
                {cameraColors.map((color) => (
                  <motion.button
                    key={color.id}
                    onClick={() => setSelectedColor(color)}
                    className={`w-12 h-12 rounded-full ${color.colorClass} transition-all duration-200 border-2 ${
                      selectedColor.id === color.id
                        ? "border-primary ring-2 ring-primary/20"
                        : "border-transparent"
                    }`}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    aria-label={`Välj ${color.name}`}
                  />
                ))}
              </div>
            </div>

            {/* Price */}
            <div className="mb-6">
              <motion.p 
                className="text-3xl font-display"
                key={totalPrice}
                initial={{ scale: 1.1 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              >
                {totalPrice} kr
              </motion.p>
              <p className="text-sm text-muted-foreground mt-1">
                Fri frakt & fri retur
              </p>
            </div>

            {/* Adapter Option */}
            <div className="mb-8 p-4 rounded-2xl bg-secondary/50 border border-border">
              <label className="flex items-start gap-3 cursor-pointer">
                <motion.button
                  onClick={() => setAdapterAdded(!adapterAdded)}
                  className={`mt-1 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    adapterAdded
                      ? "bg-primary border-primary"
                      : "border-muted-foreground/30 hover:border-primary"
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
                        <Check className="w-3 h-3 text-primary-foreground" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <div>
                  <p className="text-sm font-medium">Lägg till USB-C-adapter (+99 kr)</p>
                  <p className="text-xs text-muted-foreground mt-1">
                    Behövs för iPhone 14 eller äldre
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
