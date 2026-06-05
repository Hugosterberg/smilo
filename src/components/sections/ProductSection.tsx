'use client'

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Check, Camera, Cable, CreditCard, Zap, Battery, RefreshCw, Gift, RotateCcw, ShieldCheck, Star, Users, PartyPopper, Loader2 } from "lucide-react";
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

const MotionImage = motion.create(Image);

const productBlack = "/assets/smilo-black-transparent.png";
const productWhite = "/assets/smilo-white-transparent.png";
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
}

const cameraColors: CameraColor[] = [
  { id: "black", name: "Svart", fullName: "Smilo retro kamera – svart", image: productBlack },
  { id: "white", name: "Vit", fullName: "Smilo retro kamera – vit", image: productWhite },
  { id: "pink", name: "Rosa", fullName: "Smilo retro kamera – rosa", image: productPink },
  { id: "brown", name: "Brun", fullName: "Smilo retro kamera – brun", image: productBrown },
];

// Quantity pricing options
const quantityOptions = [
  {
    quantity: 1,
    price: 749,
    originalPrice: 749,
    label: "1 kamera",
    description: "Perfekt för dig",
    icon: Camera,
    tag: null as string | null,
  },
  {
    quantity: 2,
    price: 1349,
    originalPrice: 1498,
    label: "2 kameror",
    description: "En till dig & en till en vän",
    icon: Gift,
    tag: null as string | null,
  },
  {
    quantity: 3,
    price: 1899,
    originalPrice: 2247,
    label: "3 kameror",
    description: "Hela gänget inför resan",
    icon: Users,
    tag: null as string | null,
  },
  {
    quantity: 5,
    price: 2995,
    originalPrice: 3745,
    label: "5 kameror",
    description: "En till alla – fånga hela kvällen",
    icon: PartyPopper,
    tag: "Till festen!" as string | null,
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
                <CameraFlash trigger={activeImage} origin={{ x: 55, y: 38 }} />
              </div>
            </TiltCard>

            {/* Färgminiatyrer */}
            <div className="mt-4 flex flex-wrap justify-center gap-2.5 sm:gap-3">
              {cameraColors.map((color) => {
                const selected = selectedColors[activeColorIndex]?.id === color.id;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => handleColorChange(activeColorIndex, color)}
                    className={`group/thumb relative smilo-flash-ring flex flex-col items-center gap-1.5 rounded-2xl bg-white p-2 transition-all hover:-translate-y-0.5 ${
                      selected
                        ? "ring-2 ring-smilo-olive ring-offset-2 shadow-card"
                        : "ring-1 ring-border hover:ring-smilo-olive/50 shadow-soft"
                    }`}
                    aria-label={color.name}
                    aria-pressed={selected}
                  >
                    <Image
                      src={color.image}
                      alt={color.fullName}
                      width={80}
                      height={80}
                      className="h-12 w-12 object-contain transition-transform duration-200 group-hover/thumb:scale-105 sm:h-14 sm:w-14 md:h-16 md:w-16"
                    />
                    <span
                      className={`text-[10px] font-medium tracking-wide transition-colors sm:text-[11px] ${
                        selected ? "text-smilo-olive" : "text-muted-foreground"
                      }`}
                    >
                      {color.name}
                    </span>
                  </button>
                );
              })}
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
              <div className="space-y-3 pt-2">
                {quantityOptions.map((option) => {
                  const selected = selectedQuantity.quantity === option.quantity;
                  const perUnit = Math.round(option.price / option.quantity);
                  const saving = option.originalPrice - option.price;
                  return (
                    <motion.button
                      key={option.quantity}
                      onClick={() => handleQuantityChange(option)}
                      aria-pressed={selected}
                      className={`group relative w-full rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all ${
                        selected
                          ? "border-smilo-olive bg-smilo-olive/[0.06] shadow-card"
                          : "border-border bg-white hover:border-smilo-olive/50 hover:shadow-soft"
                      }`}
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.99 }}
                    >
                      {option.tag && (
                        <span className="absolute -top-2.5 right-3 inline-flex items-center gap-1 rounded-full bg-smilo-gold px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wide text-smilo-brown shadow-sm">
                          <PartyPopper className="h-3 w-3" />
                          {option.tag}
                        </span>
                      )}
                      <div className="flex items-center gap-3">
                        <span
                          className={`relative flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${
                            selected ? "border-smilo-olive" : "border-smilo-brown/25 group-hover:border-smilo-olive/50"
                          }`}
                          aria-hidden
                        >
                          <span
                            className={`h-2.5 w-2.5 rounded-full bg-smilo-olive transition-transform duration-200 ${
                              selected ? "scale-100" : "scale-0"
                            }`}
                          />
                        </span>
                        <div
                          className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-colors ${
                            selected ? "bg-smilo-olive text-smilo-cream-light" : "bg-smilo-cream text-smilo-olive"
                          }`}
                        >
                          <option.icon className="h-5 w-5" />
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="font-semibold leading-tight text-smilo-brown">{option.label}</p>
                          <p className="truncate text-xs text-muted-foreground">{option.description}</p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-lg font-bold leading-none text-smilo-brown">{option.price} kr</p>
                          <p className="mt-1 text-[11px] text-muted-foreground">{perUnit} kr/st</p>
                        </div>
                      </div>
                      {saving > 0 && (
                        <div className="mt-3 flex items-center justify-end gap-2 border-t border-border/60 pt-2">
                          <span className="text-xs text-muted-foreground line-through">{option.originalPrice} kr</span>
                          <span className="rounded-full bg-smilo-olive/10 px-2 py-0.5 text-xs font-semibold text-smilo-olive">
                            Spara {saving} kr
                          </span>
                        </div>
                      )}
                    </motion.button>
                  );
                })}
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
                    Öppnar kassan…
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
