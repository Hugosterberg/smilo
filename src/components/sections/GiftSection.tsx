'use client'

import { motion } from "framer-motion";
import { Gift, PartyPopper, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SELECT_QUANTITY_EVENT } from "@/components/sections/ProductSection";

const giftOccasions = ["Studenten", "Födelsedagen", "Julklappen", "Bröllopsparet"];

const partyPoints = [
  "En kamera per bord – gästerna fotar, ni får minnena",
  "Inga appar eller QR-koder som ingen orkar använda",
  "599 kr per kamera i stället för 899 kr",
];

const scrollToProduct = () => {
  document.getElementById("produkt")?.scrollIntoView({ behavior: "smooth", block: "start" });
};

const selectPartyPack = () => {
  window.dispatchEvent(new CustomEvent(SELECT_QUANTITY_EVENT, { detail: 5 }));
  scrollToProduct();
};

const GiftSection = () => {
  return (
    <section id="present" className="smilo-section smilo-scroll-anchor bg-smilo-cream-light">
      <div className="smilo-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="mb-8 text-center sm:mb-12"
        >
          <h2 className="smilo-heading-lg mb-4 text-smilo-brown">
            Ge bort <span className="smilo-heading-accent">ett ögonblick</span>
          </h2>
          <motion.div
            className="smilo-accent-bar"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          />
          <p className="smilo-body text-smilo-brown-light max-w-xl mx-auto">
            Smilo är presenten som skapar minnen – och festens bästa gäst.
          </p>
        </motion.div>

        <div className="mx-auto grid max-w-4xl gap-5 md:grid-cols-2 md:gap-6">
          {/* Present */}
          <motion.div
            className="flex flex-col rounded-2xl bg-white p-6 shadow-card sm:p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-smilo-gold/20">
              <Gift className="h-6 w-6 text-smilo-brown" aria-hidden />
            </div>
            <h3 className="smilo-heading-md mb-2 text-smilo-brown">Presenten som alltid uppskattas</h3>
            <p className="smilo-body-sm mb-4 text-smilo-brown-light">
              En kamera i handen i stället för ännu ett presentkort. Mottagaren
              fotar, minns och lever i stunden – långt efter att paketet öppnats.
            </p>
            <div className="mb-6 flex flex-wrap gap-2">
              {giftOccasions.map((occasion) => (
                <span
                  key={occasion}
                  className="rounded-full bg-smilo-cream px-3 py-1 text-xs font-medium text-smilo-brown"
                >
                  {occasion}
                </span>
              ))}
            </div>
            <Button variant="outline" size="lg" className="mt-auto w-full" onClick={scrollToProduct}>
              Köp som present
            </Button>
          </motion.div>

          {/* Fest & bröllop */}
          <motion.div
            className="relative flex flex-col rounded-2xl bg-smilo-olive p-6 text-smilo-cream-light shadow-card sm:p-7"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <span className="absolute -top-3 right-5 rounded-full bg-smilo-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-smilo-brown shadow-sm">
              Spara 1500 kr
            </span>
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-smilo-cream-light/15">
              <PartyPopper className="h-6 w-6 text-smilo-cream-light" aria-hidden />
            </div>
            <h3 className="smilo-heading-md mb-2 text-smilo-cream-light">Festpaketet – 5 kameror</h3>
            <p className="smilo-body-sm mb-4 text-smilo-cream-light/85">
              Perfekt till bröllopet, studentskivan eller födelsedagsfesten.
              Samla hela kvällen genom gästernas ögon – äkta och oredigerat.
            </p>
            <ul className="mb-6 space-y-2">
              {partyPoints.map((point) => (
                <li key={point} className="flex items-start gap-2 text-sm text-smilo-cream-light/90">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-smilo-gold" aria-hidden />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mb-4 flex items-baseline gap-2">
              <span className="text-2xl font-bold">2995 kr</span>
              <span className="text-sm text-smilo-cream-light/70 line-through">4495 kr</span>
            </div>
            <Button variant="hero" size="lg" className="mt-auto w-full smilo-shine" onClick={selectPartyPack}>
              Välj festpaketet
            </Button>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default GiftSection;
