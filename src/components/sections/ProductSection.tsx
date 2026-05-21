'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Camera, Cable, CreditCard, Zap, Battery, RefreshCw, Gift, RotateCcw, ShieldCheck, Star, Users, Sparkles, Loader2 } from "lucide-react";
import { toast } from "sonner";
import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const MotionImage = motion(Image);

// Real product images
const productBlack = "/assets/smilo-black.png";
const productGreen = "/assets/smilo-black.png";
const productBrown = "/assets/smilo-brown.png";
const productAllColors = "/assets/smilo-black.png";
const productBack = "/assets/smilo-black.png";

const smiloLogoIcon = "/assets/smilo-logo-icon.png";

// Product features
const features = [
  { icon: Camera, text: "Ingen skärm – bara riktig fotografering" },
  { icon: Zap, text: "Direkt överföring via USB-C" },
  { icon: Battery, text: "200+ bilder per laddning" },
  { icon: RefreshCw, text: "Återanvändbar & laddningsbar" },
];

// What's included items
const includedItems = [
  { icon: Camera, title: "Smilo retro kamera" },
  { icon: Cable, title: "USB-C-kabel" },
  { icon: CreditCard, title: "4GB minneskort (ca 1300 bilder)" },
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
  { label: "Lagring", value: "4GB minneskort ingår (stöder upp till 16GB)" },
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
  { id: "black", name: "Svart", fullName: "Smilo retro kamera – svart", image: productBlack, colorClass: "bg-zinc-900" },
  { id: "green", name: "Grön", fullName: "Smilo retro kamera – grön", image: productGreen, colorClass: "bg-[#6B7B4B]" },
  { id: "brown", name: "Brun", fullName: "Smilo retro kamera – brun", image: productBrown, colorClass: "bg-[#8B5A3C]" },
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
  const [adapterAdded, setAdapterAdded] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(quantityOptions[0]);
  const [selectedColors, setSelectedColors] = useState<CameraColor[]>([cameraColors[0]]);
  const [activeImage, setActiveImage] = useState<string>(cameraColors[0].image);
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleCheckout = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity: selectedQuantity.quantity,
          colors: selectedColors.map(c => c.name),
          adapterAdded,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        toast.error(data.error ?? 'Något gick fel. Försök igen.');
        return;
      }
      window.location.href = data.url;
    } catch {
      toast.error('Något gick fel. Försök igen.');
    } finally {
      setIsLoading(false);
    }
  };

  const adapterPrice = adapterAdded ? 99 * selectedQuantity.quantity : 0;
  const totalPrice = selectedQuantity.price + adapterPrice;

  const handleQuantityChange = (option: typeof quantityOptions[0]) => {
    setSelectedQuantity(option);
    setSelectedColors(prev => {
      const newColors = [...prev];
      while (newColors.length < option.quantity) {
        newColors.push(cameraColors[0]);
      }
      return newColors.slice(0, option.quantity);
    });
    if (activeColorIndex >= option.quantity) {
      setActiveColorIndex(0);
      setActiveImage(selectedColors[0]?.image || cameraColors[0].image);
    }
  };

  const getGalleryImages = () => {
    const currentColor = selectedColors[activeColorIndex] || cameraColors[0];
    return [
      { id: 'main', src: currentColor.image, alt: `${currentColor.fullName} - framsida` },
      { id: 'back', src: productBack, alt: `${currentColor.fullName} - baksida` },
      { id: 'all', src: productAllColors, alt: 'Alla färger' },
    ];
  };

  const handleColorChange = (colorIndex: number, color: CameraColor) => {
    setSelectedColors(prev => {
      const newColors = [...prev];
      newColors[colorIndex] = color;
      return newColors;
    });
    setActiveImage(color.image);
    setActiveColorIndex(colorIndex);
  };

  return (
    <section id="produkt" className="smilo-section scroll-mt-20 bg-background">
      <div className="smilo-container">
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
                <MotionImage
                  key={activeImage}
                  src={activeImage}
                  alt={selectedColors[activeColorIndex]?.fullName || 'Smilo kamera'}
                  width={900}
                  height={900}
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
                      ? 'ring-2 ring-smilo-olive ring-offset-2'
                      : 'hover:ring-2 hover:ring-smilo-olive/50'
                  }`}
                >
                  <Image src={img.src} alt={img.alt} width={80} height={80} className="w-full h-full object-contain p-2" />
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
              <Image src={smiloLogoIcon} alt="" width={40} height={40} className="h-8 w-auto" />
              <span className="text-xs font-semibold uppercase tracking-wider text-smilo-olive bg-smilo-olive/10 px-2 py-1 rounded">Retro Kamera</span>
            </div>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-smilo-brown mb-2">Smilo retro kamera</h2>

            {/* Quantity Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-smilo-brown mb-3">Välj antal</p>
              <div className="space-y-2">
                {quantityOptions.map((option) => (
                  <motion.button
                    key={option.quantity}
                    onClick={() => handleQuantityChange(option)}
                    className={`w-full p-3 rounded-xl border-2 transition-all relative ${
                      selectedQuantity.quantity === option.quantity
                        ? "border-smilo-olive bg-smilo-olive/5"
                        : "border-border hover:border-smilo-olive/50 bg-white"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {option.popular && (
                      <span className="absolute -top-2.5 left-4 px-2 py-0.5 bg-smilo-gold text-smilo-brown text-xs font-semibold rounded-full flex items-center gap-1">
                        <Sparkles className="w-3 h-3" />
                        Populärast
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          selectedQuantity.quantity === option.quantity
                            ? "bg-smilo-olive text-smilo-cream"
                            : "bg-smilo-cream text-smilo-olive"
                        }`}>
                          <option.icon className="w-5 h-5" />
                        </div>
                        <div className="text-left">
                          <p className="font-semibold text-smilo-brown">{option.label}</p>
                          <p className="text-xs text-muted-foreground">{option.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-smilo-brown">{option.price} kr</p>
                        {option.originalPrice > option.price && (
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-muted-foreground line-through">{option.originalPrice} kr</span>
                            <span className="text-xs font-semibold text-smilo-olive">
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
            <div className="flex items-center gap-4 mb-6 p-4 rounded-xl bg-smilo-cream/50">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Totalt</p>
                <motion.p
                  className="text-3xl font-bold text-smilo-brown"
                  key={totalPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {totalPrice} kr
                </motion.p>
              </div>
              <div className="ml-auto flex items-center gap-1 text-smilo-gold">
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
                  <feature.icon className="w-5 h-5 text-smilo-olive" />
                  <span className="text-sm text-smilo-brown">{feature.text}</span>
                </motion.div>
              ))}
            </div>

            {/* Color Selection - Per Camera */}
            <div className="mb-6">
              <p className="text-sm font-medium text-smilo-brown mb-3">
                {selectedQuantity.quantity === 1
                  ? 'Välj färg'
                  : `Välj färg för varje kamera`}
              </p>

              <div className="space-y-4">
                {Array.from({ length: selectedQuantity.quantity }).map((_, cameraIndex) => (
                  <div key={cameraIndex} className="space-y-2">
                    {selectedQuantity.quantity > 1 && (
                      <p className="text-xs font-semibold text-smilo-olive">
                        Kamera {cameraIndex + 1}
                      </p>
                    )}
                    <div className="flex gap-2">
                      {cameraColors.map((color) => (
                        <motion.button
                          key={color.id}
                          onClick={() => handleColorChange(cameraIndex, color)}
                          className={`w-12 h-12 rounded-xl overflow-hidden border-2 transition-all ${
                            selectedColors[cameraIndex]?.id === color.id
                              ? "border-smilo-olive ring-2 ring-smilo-olive/20"
                              : "border-transparent hover:border-smilo-olive/50"
                          }`}
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          <Image src={color.image} alt={color.name} width={48} height={48} className="w-full h-full object-contain p-0.5 bg-white" />
                        </motion.button>
                      ))}
                      <span className="text-xs text-muted-foreground self-center ml-2">
                        {selectedColors[cameraIndex]?.name || 'Välj färg'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <p className="text-xs text-muted-foreground mt-3">
                Fler färger kommer snart: Vit, Rosa
              </p>
            </div>

            {/* Adapter Option */}
            <div className="mb-6 p-4 rounded-xl bg-smilo-cream border border-smilo-gold/20">
              <label className="flex items-start gap-3 cursor-pointer">
                <motion.button
                  onClick={() => setAdapterAdded(!adapterAdded)}
                  className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-colors ${
                    adapterAdded
                      ? "bg-smilo-olive border-smilo-olive"
                      : "border-smilo-brown/30 hover:border-smilo-olive"
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
                        <Check className="w-3 h-3 text-smilo-cream" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
                <div>
                  <p className="text-sm font-semibold text-smilo-brown">
                    Lägg till USB-C-adapter (+{99 * selectedQuantity.quantity} kr för {selectedQuantity.quantity} st)
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Krävs för iPhone 14 eller äldre
                  </p>
                </div>
              </label>
            </div>

            {/* Checkout */}
            <motion.div
              whileHover={{ scale: isLoading ? 1 : 1.02 }}
              whileTap={{ scale: isLoading ? 1 : 0.98 }}
            >
              <Button
                variant="hero"
                size="xl"
                className="w-full mb-4"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Skickar...
                  </span>
                ) : (
                  `Gå till kassan – ${selectedQuantity.quantity} ${selectedQuantity.quantity === 1 ? 'kamera' : 'kameror'}`
                )}
              </Button>
            </motion.div>
            <p className="text-xs text-center text-muted-foreground mb-6">
              Fri frakt • Leverans inom Sverige
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
              {trustBadges.map((badge, index) => (
                <div key={index} className="text-center">
                  <badge.icon className="w-6 h-6 mx-auto mb-2 text-smilo-brown" />
                  <p className="text-xs font-semibold text-smilo-brown">{badge.title}</p>
                </div>
              ))}
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="space-y-0">
              <AccordionItem value="included" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium text-smilo-brown hover:no-underline py-4">
                  <div className="flex items-center gap-2">
                    <Gift className="w-4 h-4" />
                    Detta ingår
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex gap-6 pb-4">
                    {includedItems.map((item) => (
                      <div key={item.title} className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-smilo-cream flex items-center justify-center">
                          <item.icon className="w-4 h-4 text-smilo-olive" />
                        </div>
                        <span className="text-sm text-smilo-brown">{item.title}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="specs" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium text-smilo-brown hover:no-underline py-4">
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
                        <span className="font-medium text-smilo-brown">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b-0">
                <AccordionTrigger className="text-sm font-medium text-smilo-brown hover:no-underline py-4">
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
