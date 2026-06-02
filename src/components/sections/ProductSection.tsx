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
import { TiltCard } from "@/components/shared/TiltCard";
import { CameraFlash } from "@/components/shared/CameraFlash";

const MotionImage = motion(Image);

const productBlack = "/assets/smilo-black-transparent.png";
const productGreen = "/assets/smilo-green-transparent.png";
const productPink = "/assets/smilo-pink-transparent.png";
const productBrown = "/assets/smilo-brown-transparent.png";

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

const cameraColors: CameraColor[] = [
  { id: "black", name: "Svart", fullName: "Smilo retro kamera – svart", image: productBlack, colorClass: "bg-zinc-900" },
  { id: "green", name: "Grön", fullName: "Smilo retro kamera – grön", image: productGreen, colorClass: "bg-[#6B7B4B]" },
  { id: "pink", name: "Rosa", fullName: "Smilo retro kamera – rosa", image: productPink, colorClass: "bg-[#D4A5A5]" },
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
    <section id="produkt" className="smilo-section smilo-scroll-anchor bg-background">
      <div className="smilo-container">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-10 lg:gap-14 xl:gap-16">
          {/* Product Images - Left Side */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <TiltCard className="block" max={10} scale={1.03}>
              <div className="relative aspect-square rounded-lg overflow-hidden smilo-retro-frame bg-smilo-cream-light">
                <AnimatePresence mode="wait">
                  <MotionImage
                    key={activeImage}
                    src={activeImage}
                    alt={selectedColors[activeColorIndex]?.fullName || 'Smilo kamera'}
                    width={900}
                    height={900}
                    className="w-full h-full object-contain p-5 sm:p-6 md:p-8"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.02 }}
                    transition={{ duration: 0.25 }}
                  />
                </AnimatePresence>
                <CameraFlash trigger={activeImage} />
              </div>
            </TiltCard>

            {/* Färgminiatyrer */}
            <div className="flex flex-wrap gap-2 sm:gap-3 justify-center mt-3 sm:mt-4">
              {cameraColors.map((color) => (
                <button
                  key={color.id}
                  type="button"
                  onClick={() => handleColorChange(activeColorIndex, color)}
                  className={`relative smilo-flash-ring w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-lg sm:rounded-xl overflow-hidden bg-white shadow-soft transition-all hover:-translate-y-0.5 ${
                    selectedColors[activeColorIndex]?.id === color.id
                      ? 'ring-2 ring-smilo-olive ring-offset-2'
                      : 'hover:ring-2 hover:ring-smilo-olive/50'
                  }`}
                  aria-label={color.name}
                  aria-pressed={selectedColors[activeColorIndex]?.id === color.id}
                >
                  <Image src={color.image} alt={color.fullName} width={80} height={80} className="w-full h-full object-contain p-2" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info - Right Side */}
          <motion.div
            className="w-full max-w-md mx-auto text-center lg:mx-0 lg:max-w-none lg:text-left lg:sticky lg:top-[calc(var(--header-height)+1rem)] lg:self-start"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="mb-5 sm:mb-6">
              <h2 className="font-display leading-[1.05] text-smilo-ink">
                <span className="block text-2xl sm:text-4xl font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase md:text-5xl">
                  Smilo
                </span>
                <span className="mt-1 block sm:mt-1.5 text-xl sm:text-2xl font-medium tracking-[0.05em] sm:tracking-[0.06em] md:text-3xl">
                  <span className="italic text-smilo-flash">retro</span>
                  <span className="text-smilo-brown"> kamera</span>
                </span>
              </h2>
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-smilo-brown mb-3">Välj antal</p>
              <div className="space-y-3 pt-1">
                {quantityOptions.map((option) => (
                  <motion.button
                    key={option.quantity}
                    onClick={() => handleQuantityChange(option)}
                    className={`w-full p-3 sm:p-3.5 rounded-xl border-2 transition-all relative ${
                      option.popular ? 'mt-1' : ''
                    } ${
                      selectedQuantity.quantity === option.quantity
                        ? "border-smilo-olive bg-smilo-olive/5"
                        : "border-border hover:border-smilo-olive/50 bg-white"
                    }`}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    {option.popular && (
                      <span className="absolute -top-2.5 left-1/2 -translate-x-1/2 lg:left-4 lg:translate-x-0 px-2 py-0.5 bg-smilo-gold text-smilo-brown text-xs font-semibold rounded-full flex items-center gap-1 whitespace-nowrap">
                        <Sparkles className="w-3 h-3" />
                        Populärast
                      </span>
                    )}
                    <div className="flex flex-col gap-3 items-center text-center sm:flex-row sm:items-center sm:justify-between lg:text-left">
                      <div className="flex items-center gap-3 min-w-0 justify-center sm:justify-start w-full sm:w-auto">
                        <div className={`w-10 h-10 shrink-0 rounded-lg flex items-center justify-center ${
                          selectedQuantity.quantity === option.quantity
                            ? "bg-smilo-olive text-smilo-cream"
                            : "bg-smilo-cream text-smilo-olive"
                        }`}>
                          <option.icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0 text-center sm:text-left">
                          <p className="font-semibold text-smilo-brown">{option.label}</p>
                          <p className="text-xs text-muted-foreground line-clamp-2">{option.description}</p>
                        </div>
                      </div>
                      <div className="shrink-0 text-center sm:text-right w-full sm:w-auto">
                        <p className="font-bold text-smilo-brown">{option.price} kr</p>
                        {option.originalPrice > option.price && (
                          <div className="flex items-center justify-center sm:justify-end gap-2 flex-wrap">
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
            <div className="flex flex-col items-center gap-3 mb-6 p-4 rounded-xl bg-smilo-cream/50 sm:flex-row sm:items-center sm:gap-4 lg:items-center">
              <div>
                <p className="text-xs text-muted-foreground mb-1">Totalt</p>
                <motion.p
                  className="text-2xl sm:text-3xl font-bold text-smilo-brown"
                  key={totalPrice}
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {totalPrice} kr
                </motion.p>
              </div>
              <div className="flex items-center justify-center gap-1 text-smilo-gold flex-wrap sm:ml-auto lg:ml-auto">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current shrink-0" />
                ))}
                <span className="text-xs sm:text-sm text-muted-foreground ml-1">47 recensioner</span>
              </div>
            </div>

            {/* Features List */}
            <div className="space-y-3 mb-6">
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  className="flex items-center justify-center lg:justify-start gap-3"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <feature.icon className="w-5 h-5 shrink-0 text-smilo-olive" />
                  <span className="text-sm text-smilo-brown text-balance">{feature.text}</span>
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
                    <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                      {cameraColors.map((color) => (
                        <motion.button
                          key={color.id}
                          onClick={() => handleColorChange(cameraIndex, color)}
                          className={`relative smilo-flash-ring w-11 h-11 sm:w-12 sm:h-12 rounded-lg sm:rounded-xl overflow-hidden border-2 transition-all ${
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
                      <span className="w-full text-center text-xs text-muted-foreground sm:w-auto sm:text-left lg:text-left sm:self-center sm:ml-1 pt-0.5">
                        {selectedColors[cameraIndex]?.name || 'Välj färg'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

            </div>

            {/* Adapter Option */}
            <div className="mb-6 p-4 rounded-xl bg-smilo-cream border border-smilo-gold/20 text-center lg:text-left">
              <label className="flex flex-col items-center gap-3 cursor-pointer sm:flex-row sm:items-start lg:items-start">
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
                className="w-full mb-4 smilo-shine"
                onClick={handleCheckout}
                disabled={isLoading}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Skickar...
                  </span>
                ) : (
                  <>
                    <span className="sm:hidden">Gå till kassan</span>
                    <span className="hidden sm:inline">
                      {`Gå till kassan – ${selectedQuantity.quantity} ${selectedQuantity.quantity === 1 ? 'kamera' : 'kameror'}`}
                    </span>
                  </>
                )}
              </Button>
            </motion.div>
            <p className="text-xs text-center text-muted-foreground mb-6">
              Fri frakt • Leverans inom Sverige
            </p>

            {/* Trust Badges */}
            <div className="grid grid-cols-1 min-[400px]:grid-cols-3 gap-4 mb-6 py-4 border-y border-border">
              {trustBadges.map((badge, index) => (
                <div key={index} className="flex flex-col items-center text-center gap-2 min-[400px]:gap-0 px-2">
                  <badge.icon className="w-6 h-6 shrink-0 mb-0 min-[400px]:mb-2 text-smilo-brown" />
                  <div>
                    <p className="text-xs font-semibold text-smilo-brown">{badge.title}</p>
                    <p className="text-[10px] sm:text-xs text-muted-foreground mt-0.5 line-clamp-2">{badge.subtitle}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Accordion Sections */}
            <Accordion type="single" collapsible className="space-y-0">
              <AccordionItem value="included" className="border-b border-border">
                <AccordionTrigger className="text-sm font-medium text-smilo-brown hover:no-underline py-4 justify-center lg:justify-between [&>svg]:lg:ml-auto">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Gift className="w-4 h-4" />
                    Detta ingår
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col items-center sm:flex-row sm:flex-wrap sm:items-start sm:justify-start gap-4 sm:gap-6 pb-4 lg:items-stretch">
                    {includedItems.map((item) => (
                      <div key={item.title} className="flex items-center justify-center lg:justify-start gap-2 min-w-[140px]">
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
                <AccordionTrigger className="text-sm font-medium text-smilo-brown hover:no-underline py-4 justify-center lg:justify-between [&>svg]:lg:ml-auto">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <Camera className="w-4 h-4" />
                    Specifikationer
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4 text-center lg:text-left">
                    {specs.map((spec) => (
                      <div
                        key={spec.label}
                        className="flex flex-col gap-0.5 sm:flex-row sm:justify-between sm:items-start py-2 sm:py-1.5 text-sm border-b border-border/50 last:border-0 sm:border-0"
                      >
                        <span className="text-muted-foreground shrink-0">{spec.label}</span>
                        <span className="font-medium text-smilo-brown sm:text-right">{spec.value}</span>
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="shipping" className="border-b-0">
                <AccordionTrigger className="text-sm font-medium text-smilo-brown hover:no-underline py-4 justify-center lg:justify-between [&>svg]:lg:ml-auto">
                  <div className="flex items-center justify-center lg:justify-start gap-2">
                    <RotateCcw className="w-4 h-4" />
                    Frakt & Returer
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="space-y-2 pb-4 text-sm text-muted-foreground text-center lg:text-left">
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
