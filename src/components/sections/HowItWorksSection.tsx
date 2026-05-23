'use client'

import { motion } from "framer-motion";

const HowItWorksSection = () => {
  return (
    <section id="hur-funkar-det" className="smilo-section smilo-scroll-anchor bg-smilo-olive text-smilo-cream-light">
      <div className="smilo-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="smilo-heading-lg mb-4">Så fungerar det</h2>
          <p className="smilo-body text-smilo-cream/80">
            För över bilder till mobilen
          </p>
        </motion.div>

        {/* Main explanation */}
        <motion.div
          className="max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-smilo-olive-dark/50 backdrop-blur-sm rounded-lg border border-smilo-cream/15 p-5 sm:p-8 md:p-12 shadow-retro">
            <p className="text-lg sm:text-xl font-semibold text-center mb-8 sm:mb-10 text-smilo-gold">
              Enkelt. Inga appar. Inget konto.
            </p>

            {/* Steps */}
            <div className="space-y-6 mb-10">
              {[
                "Koppla kameran till mobilen med USB-C-kabel",
                "Öppna Filer på mobilen",
                "Ladda ner bilderna",
                "Radera bilderna direkt medan kameran är inkopplad"
              ].map((step, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                >
                  <span className="flex-shrink-0 w-10 h-10 rounded-full bg-smilo-gold text-smilo-brown flex items-center justify-center text-lg font-bold">
                    {index + 1}
                  </span>
                  <p className="smilo-body pt-1.5">{step}</p>
                </motion.div>
              ))}
            </div>

            <div className="pt-8 border-t border-smilo-cream/20">
              <p className="text-sm font-semibold uppercase tracking-wider mb-4 text-smilo-gold">Kompatibilitet</p>
              <div className="space-y-2 mb-6">
                <p className="smilo-body-sm text-smilo-cream/80">
                  • Android & iPhone med USB-C: fungerar direkt
                </p>
                <p className="smilo-body-sm text-smilo-cream/80">
                  • iPhone 14 eller äldre: kräver adapter (kan köpas hos oss)
                </p>
              </div>
              <p className="smilo-body-sm text-smilo-cream/70">
                Det gör att du när som helst kan få över alla bilder till mobilen.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
