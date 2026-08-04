'use client'

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";

const productBlack = "/assets/smilo-black-transparent.png";

const ComparisonMark = ({ has, emphasized = false }: { has: boolean; emphasized?: boolean }) => (
  <div className="flex justify-center">
    {has ? (
      <div
        className={
          emphasized
            ? "w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-smilo-olive flex items-center justify-center shrink-0"
            : "w-6 h-6 sm:w-8 sm:h-8 rounded-full border-2 border-smilo-olive/40 flex items-center justify-center shrink-0"
        }
      >
        <Check
          className={
            emphasized ? "w-3.5 h-3.5 sm:w-5 sm:h-5 text-white" : "w-3 h-3 sm:w-4 sm:h-4 text-smilo-olive/60"
          }
          aria-hidden
        />
      </div>
    ) : (
      <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
        <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" aria-hidden />
      </div>
    )}
    <span className="sr-only">{has ? "Ja" : "Nej"}</span>
  </div>
);

const comparisonFeatures = [
  { feature: "Retro-känsla i bilderna", smilo: true, disposable: true, polaroid: true },
  { feature: "Skärmfri & utan distraktioner", smilo: true, disposable: true, polaroid: true },
  { feature: "Bilder direkt till mobilen", smilo: true, disposable: false, polaroid: false },
  { feature: "Många bilder per laddning", smilo: true, disposable: false, polaroid: false },
  { feature: "Återanvändbar & laddningsbar", smilo: true, disposable: false, polaroid: true },
  { feature: "Inga filmkostnader", smilo: true, disposable: false, polaroid: false },
  { feature: "Kompakt & lättanvänd", smilo: true, disposable: true, polaroid: false },
];

const ComparisonSection = () => {
  return (
    <section className="smilo-section bg-smilo-cream-light overflow-x-hidden">
      <div className="smilo-container">
        <motion.div
          className="text-center mb-8 sm:mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="smilo-heading-lg text-smilo-brown mb-4">
            Det bästa av <span className="smilo-heading-accent">två världar</span>
          </h2>
          <div className="smilo-accent-bar" />
          <p className="smilo-body text-smilo-brown-light max-w-xl mx-auto">
            Retrocharm möter modern bekvämlighet ✨
          </p>
        </motion.div>

        <motion.div
          className="w-full max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="w-full overflow-hidden bg-card rounded-lg shadow-card border-2 border-smilo-brown/10">
            <div className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-x-1 gap-y-0 sm:gap-x-4 border-b border-border p-3 pb-3 sm:p-6 sm:pb-4">
              <div className="min-w-0" aria-hidden />

              <div className="min-w-0 text-center">
                <div className="w-10 h-10 sm:w-20 sm:h-20 mx-auto mb-1.5 sm:mb-3 rounded-xl sm:rounded-2xl bg-smilo-olive overflow-hidden p-1 sm:p-2">
                  <Image
                    src={productBlack}
                    alt="Smilo kamera"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold text-smilo-brown text-[9px] leading-tight sm:text-sm">
                  <span className="sm:hidden">Smilo</span>
                  <span className="hidden sm:inline">Smilo retro kamera</span>
                </p>
              </div>

              <div className="min-w-0 text-center">
                <div className="w-10 h-10 sm:w-20 sm:h-20 mx-auto mb-1.5 sm:mb-3 rounded-xl sm:rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-lg sm:text-3xl opacity-60" aria-hidden>📷</span>
                </div>
                <p className="text-[9px] sm:text-xs text-muted-foreground">Engångs</p>
              </div>

              <div className="min-w-0 text-center">
                <div className="w-10 h-10 sm:w-20 sm:h-20 mx-auto mb-1.5 sm:mb-3 rounded-xl sm:rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-lg sm:text-3xl opacity-60" aria-hidden>🖼️</span>
                </div>
                <p className="text-[9px] sm:text-xs text-muted-foreground">Polaroid</p>
              </div>
            </div>

            <div className="divide-y divide-border">
              {comparisonFeatures.map((item, index) => (
                <motion.div
                  key={item.feature}
                  className="grid grid-cols-[minmax(0,1.4fr)_repeat(3,minmax(0,1fr))] gap-x-1 sm:gap-x-4 items-center p-2.5 sm:p-4 px-2.5 sm:px-6 hover:bg-smilo-cream/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <p className="min-w-0 text-[10px] sm:text-sm text-smilo-brown font-medium leading-snug pr-0.5 sm:pr-1">
                    {item.feature}
                  </p>

                  <ComparisonMark has={item.smilo} emphasized />
                  <ComparisonMark has={item.disposable} />
                  <ComparisonMark has={item.polaroid} />
                </motion.div>
              ))}
            </div>

            <div className="p-3 sm:p-6 bg-smilo-cream/50 text-center">
              <p className="text-[11px] sm:text-sm text-smilo-brown-light italic text-balance leading-relaxed max-w-prose mx-auto px-1">
                ✨ Smilo ger dig retrokänslan utan engångskamerans begränsningar och polaroidens höga kostnader
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
