import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Camera, Cable, CreditCard, Zap, Battery, RefreshCw, Gift, RotateCcw, ShieldCheck, Star, Users, Sparkles } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// Real product images
import productBlack from "@/assets/product-black.jpg";
import productGreen from "@/assets/product-green.jpg";
import productBrown from "@/assets/product-brown.jpg";
import productAllColors from "@/assets/product-all-colors.jpg";
import productBack from "@/assets/product-back.jpg";

import smajlLogoIcon from "@/assets/smajl-logo-icon.png";

// Product features
const features = [
  { icon: Camera, text: "Ingen skärm – bara riktig fotografering" },
  { icon: Zap, text: "Direkt överföring via USB-C" },
  { icon: Battery, text: "200+ bilder per laddning" },
  { icon: RefreshCw, text: "Återanvändbar & laddningsbar" },
];

// What's included items
const includedItems = [
  { icon: Camera, title: "Smajl retro kamera" },
  { icon: Cable, title: "USB-C-kabel" },
  { icon: CreditCard, title: "Minneskort" },
];

// Trust badges
const trustBadges = [
  { icon: Gift, title: "Perfekt present", subtitle: "Den mest omtänksamma gåvan" },
  { icon: RotateCcw, title: "30 dagars öppet köp", subtitle: "Enkel returhantering" },
  { icon: ShieldCheck, title: "Säker betalning", subtitle: "Krypterad checkout" },
];

// Specifications
const specs = [
  { label: "Sensor", value: "12 MP CMOS-sensor" },
  { label: "Blixt", value: "LED- & xenonblixt" },
  { label: "Filter", value: "Flera inbyggda filter" },
  { label: "Lagring", value: "Minneskort ingår (utbyggbart)" },
  { label: "Anslutning", value: "USB-C" },
  { label: "Vikt", value: "Ca 95 g" },
  { label: "Storlek", value: "Ca 115 × 65 × 34 mm" },
];

interface CameraColor {
  id: string;
  name: string;
  fullName: string;
  image: string;
  colorClass: string;
}

// Colors: vit (white), svart (black), rosa (pink), brun (brown), grön (green)
const cameraColors: CameraColor[] = [
  { id: "black", name: "Svart", fullName: "Smajl retro kamera – svart", image: productBlack, colorClass: "bg-zinc-900" },
  { id: "green", name: "Grön", fullName: "Smajl retro kamera – grön", image: productGreen, colorClass: "bg-[#6B7B4B]" },
  { id: "brown", name: "Brun", fullName: "Smajl retro kamera – brun", image: productBrown, colorClass: "bg-[#8B5A3C]" },
];

// Quantity pricing options
const quantityOptions = [
  { 
    quantity: 1, 
    price: 785, 
    originalPrice: 785, 
    label: "1 kamera", 
    description: "Perfekt för dig",
    icon: Camera,
    popular: false 
  },
  { 
    quantity: 2, 
    price: 1199, 
    originalPrice: 1570, 
    label: "2 kameror", 
    description: "En till dig & en till en vän",
    icon: Gift,
    popular: true 
  },
  { 
    quantity: 3, 
    price: 1649, 
    originalPrice: 2355, 
    label: "3 kameror", 
    description: "Hela gänget inför resan!",
    icon: Users,
    popular: false 
  },
];

const ProductSection = () => {
  const [selectedColor, setSelectedColor] = useState(cameraColors[0]);
  const [adapterAdded, setAdapterAdded] = useState(false);
  const [activeImage, setActiveImage] = useState<string>(selectedColor.image);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);

  const adapterPrice = adapterAdded ? 99 * selectedQuantity.quantity : 0;
  const totalPrice = selectedQuantity.price + adapterPrice;

  // Gallery images for selected color - only show selected color's images
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
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16">
          {/* Product Images - Left Side */}
          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-square rounded-3xl overflow-hidden bg-white shadow-card">
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
            <div className="flex gap-3 justify-center mt-4">
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

          {/* Product Info - Right Side */}
          <motion.div 
            className="lg:sticky lg:top-24 lg:self-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            {/* Product Title & Logo */}
            <div className="flex items-center gap-3 mb-2">
              <img src={smajlLogoIcon} alt="" className="h-8 w-auto" />
              <span className="text-xs font-semibold uppercase tracking-wider text-smajl-olive bg-smajl-olive/10 px-2 py-1 rounded">Retro Kamera</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-smajl-brown mb-2">{selectedColor.fullName}</h2>
            
            {/* Quantity Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-smajl-brown mb-3">Välj antal</p>
              <div className="space-y-2">
                {quantityOptions.map((option) => (
                  <motion.button
                    key={option.quantity}
                    onClick={() => setSelectedQuantity(option)}
                    className={`w-full p-3 rounded-xl border-2 transition-all relative ${
                      selectedQuantity.quantity === option.quantity
                        ? "border-smajl-olive bg-smajl-olive/5"
                        : "border-border hover:border-smajl-olive/50 bg-white"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {option.popular && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-smajl-gold text-smajl-brown text-xs font-semibold rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Populärast
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedQuantity.quantity === option.quantity
                            ? "bg-smajl-olive text-smajl-cream"
                            : "bg-smajl-cream text-smajl-olive"
                        }`}>
                          <option.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-smajl-brown">{option.label}</p>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-smajl-brown">{option.price} kr</p>
                        {option.originalPrice > option.price && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground line-through">{option.originalPrice} kr</span>
                            <span className="text-xs font-semibold text-smajl-olive">
                              Spara {option.originalPrice - option.price} kr
                            </span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Price & Reviews */}
            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-smajl-cream/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Totalt</p>
                <motion.p 
                  className="text-3xl font-bold text-smajl-brown"
                  key={totalPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {totalPrice} kr
                </motion.p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-smajl-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
                <span className="text-sm text-muted-foreground ml-1">47 recensioner</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div 
                  key={index}
                  className="flex items-center gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <feature.icon className="w-5 h-5 text-smajl-olive" />
                  <span className="text-sm text-smajl-brown">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Color Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-smajl-brown mb-3">Färg: <span className="font-semibold">{selectedColor.name}</span></p>
              <div className="flex gap-2">
                {cameraColors.map((color) => (
                  <motion.button
                    key={color.id}
                    onClick={() => handleColorChange(color)}
                    className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                      selectedColor.id === color.id
                        ? "border-smajl-olive"
                        : "border-transparent hover:border-smajl-olive/50"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <img src={color.image} alt={color.name} className="w-full h-full object-contain p-1 bg-white" />
                  </motion.button>
                ))}
              </div>
              <p className="text-xs text-muted-foreground mt-2">
                Fler färger kommer snart: Vit, Rosa
              </p>
            </div>

            {/* Adapter Option */}
            <div className="mb-6 p-4 rounded-xl bg-smajl-cream border border-smajl-gold/20">
              <label className="flex items-start gap-3 cursor-pointer">
                <motion.button
                  onClick={() => setAdapterAdded(!adapterAdded)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
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
                  <p className="text-sm font-semibold text-smajl-brown">
                    Lägg till USB-C-adapter (+{99 * selectedQuantity.quantity} kr för {selectedQuantity.quantity} st)
                  </p>
                  <p className="text-xs text-muted-foreground">
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
                Lägg i varukorg – {selectedQuantity.quantity} {selectedQuantity.quantity === 1 ? 'kamera' : 'kameror'}
              </Button>
            </motion.div>
            <p className="text-xs text-center text-muted-foreground mb-6">
              Fri frakt • Leverans inom Sverige
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
              {trustBadges.map((badge, index) => (
                <div key={index} className="text-center">
                  <badge.icon className="w-6 h-6 mx-auto mb-2 text-smajl-brown" />
                  <p className="text-xs font-semibold text-smajl-brown">{badge.title}</p>
                </div>
              ))}
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="space-y-0">
              <AccordionItem value="included" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium text-smajl-brown hover:no-underline py-4">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Detta ingår
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-6 pb-4">
                    {includedItems.map((item) => (
                      <div key={item.title} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-smajl-cream flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-smajl-olive" />
                        </div>
                        <span className="text-sm text-smajl-brown">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specs" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium text-smajl-brown hover:no-underline py-4">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4" />
                    Specifikationer
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex justify-between py-1.5 text-sm"
                      >
                        <span className="text-muted-foreground">{spec.label}</span>
                        <span className="font-medium text-smajl-brown">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b-0">
                <AccordionTrigger className="text-sm font-medium text-smajl-brown hover:no-underline py-4">
                  <div className="flex items-center gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Frakt & Returer
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4 text-sm text-muted-foreground">
                    <p>• Fri frakt inom Sverige</p>
                    <p>• Leverans inom 2-4 arbetsdagar</p>
                    <p>• 30 dagars öppet köp</p>
                    <p>• Enkel returhantering</p>
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProductSection;
