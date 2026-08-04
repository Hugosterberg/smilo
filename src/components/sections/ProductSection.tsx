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
import {
  getFallbackCameraInventory,
  getStockRequestIssues,
  getTotalCameraStock,
  type CameraInventoryItem,
} from "@/lib/camera-colors";

const MotionImage = motion.create(Image);

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

// Ordinarie pris per kamera. Kampanjpriserna nedan är vad kunden faktiskt
// betalar – det ordinarie priset används endast för att visa besparingen.
const REGULAR_UNIT_PRICE = 899;

// Quantity pricing options. `originalPrice` räknas ut från ordinarie styckpris
// så att besparingen alltid stämmer mot 899 kr/kamera.
const quantityOptions = [
  {
    quantity: 1,
    price: 749,
    label: "1 kamera",
    description: "Perfekt för dig",
    icon: Camera,
    tag: null as string | null,
  },
  {
    quantity: 2,
    price: 1349,
    label: "2 kameror",
    description: "En till dig & en till en vän",
    icon: Gift,
    tag: null as string | null,
  },
  {
    quantity: 3,
    price: 1899,
    label: "3 kameror",
    description: "Hela gänget inför resan",
    icon: Users,
    tag: null as string | null,
  },
  {
    quantity: 5,
    price: 2995,
    label: "5 kameror",
    description: "En till alla – fånga hela kvällen",
    icon: PartyPopper,
    tag: "Till festen!" as string | null,
  },
].map((option) => ({
  ...option,
  originalPrice: REGULAR_UNIT_PRICE * option.quantity,
}));

interface ProductSectionProps {
  inventory?: CameraInventoryItem[];
  inventoryError?: string;
}

const getSelectedColorCount = (
  colors: CameraInventoryItem[],
  colorId: string,
  excludeIndex?: number
) =>
  colors.reduce(
    (count, color, index) =>
      index === excludeIndex || color.id !== colorId ? count : count + 1,
    0
  );

const normalizeInventory = (inventory?: CameraInventoryItem[]) => {
  const inventoryById = new Map(inventory?.map((item) => [item.id, item]) ?? []);

  return getFallbackCameraInventory().map((fallbackItem) => {
    const item = inventoryById.get(fallbackItem.id);
    return {
      ...fallbackItem,
      stockQuantity: Math.max(0, Number(item?.stockQuantity ?? fallbackItem.stockQuantity)),
      version: Math.max(1, Number(item?.version ?? fallbackItem.version)),
      updatedAt: item?.updatedAt ?? fallbackItem.updatedAt,
    };
  });
};

const getFirstAvailableColor = (
  cameraColors: CameraInventoryItem[],
  selectedColors: CameraInventoryItem[]
) =>
  cameraColors.find(
    (color) => getSelectedColorCount(selectedColors, color.id) < color.stockQuantity
  ) ?? cameraColors[0];

const buildSelectionForQuantity = (
  quantity: number,
  cameraColors: CameraInventoryItem[],
  previousSelection: CameraInventoryItem[]
) => {
  const nextSelection: CameraInventoryItem[] = [];

  for (let index = 0; index < quantity; index += 1) {
    const preferred = previousSelection[index];
    if (
      preferred &&
      getSelectedColorCount(nextSelection, preferred.id) < preferred.stockQuantity
    ) {
      nextSelection.push(preferred);
    } else {
      nextSelection.push(getFirstAvailableColor(cameraColors, nextSelection));
    }
  }

  return nextSelection;
};

const ProductSection = ({ inventory, inventoryError }: ProductSectionProps) => {
  const cameraColors = normalizeInventory(inventory);
  const totalCameraStock = getTotalCameraStock(cameraColors);
  const initialQuantity =
    quantityOptions.find((option) => option.quantity <= totalCameraStock) ?? quantityOptions[0];
  const initialSelectedColors = buildSelectionForQuantity(initialQuantity.quantity, cameraColors, []);

  const [adapterAdded, setAdapterAdded] = useState(false);
  const [selectedQuantity, setSelectedQuantity] = useState(initialQuantity);
  const [selectedColors, setSelectedColors] = useState<CameraInventoryItem[]>(initialSelectedColors);
  const [activeImage, setActiveImage] = useState<string>(
    initialSelectedColors[0]?.image ?? cameraColors[0].image
  );
  const [activeColorIndex, setActiveColorIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const selectedColorIds = selectedColors
    .slice(0, selectedQuantity.quantity)
    .map((color) => color.id);
  const stockIssues = getStockRequestIssues(selectedColorIds, cameraColors);
  const canCheckout = totalCameraStock >= selectedQuantity.quantity && stockIssues.length === 0;
  const soldOutColors = cameraColors.filter((color) => color.stockQuantity <= 0);
  const selectedSoldOutColor = selectedColors
    .slice(0, selectedQuantity.quantity)
    .find((color) => color.stockQuantity <= 0);

  const handleCheckout = async () => {
    if (!canCheckout) {
      toast.error(
        stockIssues[0]?.message ?? "Det finns inte tillräckligt många kameror i lager."
      );
      return;
    }

    setIsLoading(true);
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quantity: selectedQuantity.quantity,
          colors: selectedColors.map(c => c.name),
          colorIds: selectedColorIds,
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
  const totalSaving = selectedQuantity.originalPrice - selectedQuantity.price;
  const originalTotalPrice = selectedQuantity.originalPrice + adapterPrice;

  const handleQuantityChange = (option: typeof quantityOptions[0]) => {
    if (option.quantity > totalCameraStock) {
      toast.error("Det finns inte tillräckligt många kameror i lager för det paketet.");
      return;
    }

    const nextSelection = buildSelectionForQuantity(
      option.quantity,
      cameraColors,
      selectedColors
    );
    const nextActiveIndex = activeColorIndex >= option.quantity ? 0 : activeColorIndex;

    setSelectedQuantity(option);
    setSelectedColors(nextSelection);
    setActiveColorIndex(nextActiveIndex);
    setActiveImage(nextSelection[nextActiveIndex]?.image ?? cameraColors[0].image);
  };

  const handleColorChange = (colorIndex: number, color: CameraInventoryItem) => {
    const alreadySelectedCount = getSelectedColorCount(selectedColors, color.id, colorIndex);
    const soldOut = color.stockQuantity <= 0;

    if (!soldOut && alreadySelectedCount >= color.stockQuantity) {
      toast.error(
        `Det finns bara ${color.stockQuantity} kvar i ${color.name.toLocaleLowerCase(
          "sv-SE"
        )}.`
      );
      return;
    }

    setSelectedColors(prev => {
      const newColors = [...prev];
      newColors[colorIndex] = color;
      return newColors;
    });
    setActiveImage(color.image);
    setActiveColorIndex(colorIndex);
  };

  const activeColor = selectedColors[activeColorIndex];
  const activeColorSoldOut = Boolean(activeColor && activeColor.stockQuantity <= 0);

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
                {activeColorSoldOut && (
                  <div className="absolute left-4 top-4 rounded-full border border-smilo-brown/10 bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-smilo-brown shadow-soft">
                    Slutsåld
                  </div>
                )}
              </div>
            </TiltCard>

            {/* Färgminiatyrer */}
            <div className="mt-4 grid grid-cols-6 gap-1.5 sm:gap-2.5">
              {cameraColors.map((color) => {
                const selected = selectedColors[activeColorIndex]?.id === color.id;
                const unavailable =
                  getSelectedColorCount(selectedColors, color.id, activeColorIndex) >=
                  color.stockQuantity;
                const soldOut = color.stockQuantity <= 0;
                const disabled = unavailable && !soldOut;
                return (
                  <button
                    key={color.id}
                    type="button"
                    onClick={() => handleColorChange(activeColorIndex, color)}
                    disabled={disabled}
                    className={`group/thumb relative smilo-flash-ring flex min-w-0 flex-col items-center gap-1.5 rounded-2xl bg-white p-1.5 transition-all hover:-translate-y-0.5 sm:p-2 ${
                      soldOut
                        ? selected
                          ? "cursor-pointer ring-2 ring-smilo-brown/35 ring-offset-2 shadow-soft"
                          : "cursor-pointer opacity-80 ring-1 ring-smilo-brown/15 shadow-soft hover:opacity-100 hover:ring-smilo-brown/35"
                        : disabled
                        ? "cursor-not-allowed opacity-45 grayscale ring-1 ring-border"
                        : selected
                        ? "ring-2 ring-smilo-olive ring-offset-2 shadow-card"
                        : "ring-1 ring-border hover:ring-smilo-olive/50 shadow-soft"
                    }`}
                    aria-label={`${color.name}${soldOut ? " - slutsåld" : ""}`}
                    aria-pressed={selected}
                  >
                    <Image
                      src={color.image}
                      alt={color.fullName}
                      width={80}
                      height={80}
                      className="aspect-square w-full object-contain transition-transform duration-200 group-hover/thumb:scale-105"
                    />
                    {soldOut && (
                      <span className="absolute right-1 top-1 rounded-full bg-smilo-brown/90 px-1.5 py-[1px] text-[7px] font-semibold uppercase leading-none tracking-[0.08em] text-white sm:right-1.5 sm:top-1.5 sm:text-[8px]">
                        Slut
                      </span>
                    )}
                    <span
                      className={`text-[10px] font-medium tracking-wide transition-colors sm:text-[11px] ${
                        soldOut
                          ? selected
                            ? "text-smilo-brown"
                            : "text-muted-foreground"
                          : disabled
                          ? "text-muted-foreground"
                          : selected
                          ? "text-smilo-olive"
                          : "text-muted-foreground"
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
              <div className="mt-4 flex flex-wrap justify-center gap-2 lg:justify-start">
                {cameraColors.map((color) => {
                  const soldOut = color.stockQuantity <= 0;
                  return (
                    <span
                      key={color.id}
                      className={`rounded-full border px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] ${
                        soldOut
                          ? "border-smilo-brown/15 bg-white text-muted-foreground"
                          : "border-smilo-olive/20 bg-smilo-olive/10 text-smilo-olive"
                      }`}
                    >
                      {color.name}: {soldOut ? "Slutsåld" : "I lager"}
                    </span>
                  );
                })}
              </div>
              {inventoryError ? (
                <p className="mt-3 rounded-xl border border-smilo-brown/10 bg-white/70 px-3 py-2 text-xs text-muted-foreground">
                  Lagerstatus kunde inte hämtas just nu. Försök igen om en stund.
                </p>
              ) : soldOutColors.length > 0 ? (
                <p className="mt-3 text-xs text-muted-foreground">
                  Du kan öppna slutsålda färger för att se dem, men välj en färg i lager för att köpa.
                </p>
              ) : null}
            </div>

            {/* Quantity Selection */}
            <div className="mb-6">
              <p className="text-sm font-medium text-smilo-brown mb-3">Välj antal</p>
              <div className="space-y-3 pt-2">
                {quantityOptions.map((option) => {
                  const selected = selectedQuantity.quantity === option.quantity;
                  const perUnit = Math.round(option.price / option.quantity);
                  const saving = option.originalPrice - option.price;
                  const unavailable = option.quantity > totalCameraStock;
                  return (
                    <motion.button
                      key={option.quantity}
                      type="button"
                      onClick={() => handleQuantityChange(option)}
                      disabled={unavailable}
                      aria-pressed={selected}
                      className={`group relative w-full rounded-2xl border-2 p-3.5 sm:p-4 text-left transition-all ${
                        unavailable
                          ? "cursor-not-allowed border-border bg-white/65 opacity-55"
                          : selected
                          ? "border-smilo-olive bg-smilo-olive/[0.06] shadow-card"
                          : "border-border bg-white hover:border-smilo-olive/50 hover:shadow-soft"
                      }`}
                      whileHover={unavailable ? undefined : { y: -2 }}
                      whileTap={unavailable ? undefined : { scale: 0.99 }}
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
                          <p className="truncate text-xs text-muted-foreground">
                            {unavailable
                              ? totalCameraStock === 0
                                ? "Tillfälligt slutsålt"
                                : `Endast ${totalCameraStock} kvar totalt`
                              : option.description}
                          </p>
                        </div>
                        <div className="shrink-0 text-right">
                          <p className="text-[11px] leading-none text-muted-foreground/70 line-through decoration-smilo-flash/60 decoration-2">
                            {REGULAR_UNIT_PRICE} kr/st
                          </p>
                          <p className="mt-1 text-lg font-bold leading-none text-smilo-brown">{option.price} kr</p>
                          <p className="mt-1 text-[11px] font-medium text-smilo-olive">{perUnit} kr/st</p>
                        </div>
                      </div>
                      {saving > 0 && (
                        <div className="mt-3 flex items-center justify-between gap-2 border-t border-border/60 pt-2">
                          <span className="text-[11px] uppercase tracking-wide text-muted-foreground">
                            Ordinarie{" "}
                            <span className="font-medium text-smilo-brown/70 line-through decoration-smilo-flash/70 decoration-2">
                              {option.originalPrice} kr
                            </span>
                          </span>
                          <span className="inline-flex items-center gap-1 rounded-full bg-smilo-olive/10 px-2.5 py-0.5 text-xs font-semibold text-smilo-olive ring-1 ring-smilo-olive/20">
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
                <div className="flex items-baseline gap-2">
                  <motion.p
                    className="text-2xl sm:text-3xl font-bold text-smilo-brown"
                    key={totalPrice}
                    initial={{ scale: 1.1 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    {totalPrice} kr
                  </motion.p>
                  {totalSaving > 0 && (
                    <span className="text-sm text-muted-foreground line-through decoration-smilo-flash/60 decoration-2">
                      {originalTotalPrice} kr
                    </span>
                  )}
                </div>
                {totalSaving > 0 && (
                  <p className="mt-0.5 text-xs font-semibold text-smilo-olive">
                    Du sparar {totalSaving} kr
                  </p>
                )}
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
                {Array.from({ length: selectedQuantity.quantity }).map((_, cameraIndex) => {
                  const selectedColor = selectedColors[cameraIndex];
                  const selectedColorSoldOut = Boolean(
                    selectedColor && selectedColor.stockQuantity <= 0
                  );

                  return (
                    <div key={cameraIndex} className="space-y-2">
                      {selectedQuantity.quantity > 1 && (
                        <p className="text-xs font-semibold text-smilo-olive">
                          Kamera {cameraIndex + 1}
                        </p>
                      )}
                      <div className="flex flex-wrap gap-2 justify-center lg:justify-start">
                        {cameraColors.map((color) => {
                          const selected = selectedColor?.id === color.id;
                          const unavailable =
                            getSelectedColorCount(selectedColors, color.id, cameraIndex) >=
                            color.stockQuantity;
                          const soldOut = color.stockQuantity <= 0;
                          const disabled = unavailable && !soldOut;

                          return (
                            <motion.button
                              key={color.id}
                              type="button"
                              onClick={() => handleColorChange(cameraIndex, color)}
                              disabled={disabled}
                              aria-pressed={selected}
                              aria-label={`${color.name}${soldOut ? " - slutsåld, visas endast" : ""}`}
                              className={`relative smilo-flash-ring h-11 w-11 overflow-hidden rounded-lg border-2 transition-all sm:h-12 sm:w-12 sm:rounded-xl ${
                                soldOut
                                  ? selected
                                    ? "cursor-pointer border-smilo-brown/45 bg-white ring-2 ring-smilo-brown/15"
                                    : "cursor-pointer border-smilo-brown/15 bg-white/80 opacity-75 hover:border-smilo-brown/35 hover:opacity-100"
                                  : disabled
                                  ? "cursor-not-allowed border-border bg-white opacity-40 grayscale"
                                  : selected
                                  ? "border-smilo-olive ring-2 ring-smilo-olive/20"
                                  : "border-transparent hover:border-smilo-olive/50"
                              }`}
                              whileHover={disabled ? undefined : { scale: 1.05 }}
                              whileTap={disabled ? undefined : { scale: 0.95 }}
                            >
                              <Image
                                src={color.image}
                                alt={color.name}
                                width={48}
                                height={48}
                                className="h-full w-full bg-white object-contain p-0.5"
                              />
                              {soldOut && (
                                <span
                                  aria-hidden
                                  className="absolute right-0.5 top-0.5 rounded-full bg-smilo-brown/90 px-1 py-px text-[6px] font-semibold uppercase leading-none tracking-[0.04em] text-white sm:text-[7px]"
                                >
                                  Slut
                                </span>
                              )}
                            </motion.button>
                          );
                        })}
                        <span
                          className={`w-full text-center text-xs sm:w-auto sm:text-left lg:text-left sm:self-center sm:ml-1 pt-0.5 ${
                            selectedColorSoldOut ? "font-medium text-smilo-brown" : "text-muted-foreground"
                          }`}
                        >
                          {selectedColor
                            ? `${selectedColor.name}${selectedColorSoldOut ? " - slutsåld" : ""}`
                            : "Välj färg"}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>

              {selectedSoldOutColor && (
                <p className="mt-3 rounded-xl border border-smilo-brown/15 bg-smilo-cream/70 px-3 py-2 text-center text-xs font-medium text-smilo-brown lg:text-left">
                  {selectedSoldOutColor.name} är slutsåld just nu. Du kan titta på färgen,
                  men den går inte att köpa.
                </p>
              )}

            </div>

            {/* Adapter Option */}
            <div className="mb-6 p-4 rounded-xl bg-smilo-cream border border-smilo-gold/20 text-center lg:text-left">
              <label className="flex flex-col items-center gap-3 cursor-pointer sm:flex-row sm:items-start lg:items-start">
                <motion.button
                  type="button"
                  role="checkbox"
                  aria-checked={adapterAdded}
                  aria-label="Lägg till USB-C-adapter"
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
              whileHover={{ scale: isLoading || !canCheckout ? 1 : 1.02 }}
              whileTap={{ scale: isLoading || !canCheckout ? 1 : 0.98 }}
            >
              <Button
                variant="hero"
                size="xl"
                className="w-full mb-4 smilo-shine"
                onClick={handleCheckout}
                disabled={isLoading || !canCheckout}
              >
                {isLoading ? (
                  <span className="flex items-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Öppnar kassan…
                  </span>
                ) : !canCheckout ? (
                  <span>
                    {totalCameraStock <= 0 ? "Tillfälligt slutsåld" : "Välj färger i lager"}
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
            {!canCheckout && (
              <p className="mb-3 rounded-xl border border-smilo-brown/10 bg-white/70 px-3 py-2 text-center text-xs text-muted-foreground">
                {stockIssues[0]?.message ?? "Det finns inte tillräckligt många kameror i lager."}
              </p>
            )}
            <p className="text-xs text-center text-muted-foreground mb-6">
              49 kr frakt inom Sverige • Fri retur
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
                    <p>• 49 kr frakt inom Sverige</p>
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
