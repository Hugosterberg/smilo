'use client'

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import Image from "next/image";

const productBlack = "/assets/product-black.jpg";

const comparisonFeatures = [
  { feature: "Retro-känsla i bilderna", smilo: true, disposable: true, polaroid: true },
  { feature: "Skärmfri & distraktion-fri", smilo: true, disposable: true, polaroid: true },
  { feature: "Överför bilder direkt till mobilen", smilo: true, disposable: false, polaroid: false },
  { feature: "Massvis med bilder på en och samma laddning", smilo: true, disposable: false, polaroid: false },
  { feature: "Återanvändbar & laddningsbar", smilo: true, disposable: false, polaroid: true },
  { feature: "Inga framkallnings-/filmkostnader", smilo: true, disposable: false, polaroid: false },
  { feature: "Kompakt & lättanvänd", smilo: true, disposable: true, polaroid: false },
];

const ComparisonSection = () => {
  return (
    <section className="smilo-section bg-smilo-cream-light">
      <div className="smilo-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="smilo-heading-lg text-smilo-brown mb-4">
            Det bästa av <span className="italic text-smilo-olive">två världar</span>
          </h2>
          <p className="smilo-body text-smilo-brown-light max-w-xl mx-auto">
            Retrocharm möter modern bekvämlighet ✨
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-4 gap-2 sm:gap-4 p-4 sm:p-6 pb-4 border-b border-border">
              <div className="col-span-1" />

              {/* Smilo Column Header */}
              <div className="text-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-2xl bg-smilo-olive overflow-hidden p-1.5 sm:p-2">
                  <Image
                    src={productBlack}
                    alt="Smilo kamera"
                    width={96}
                    height={96}
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold text-smilo-brown text-[10px] sm:text-sm leading-tight">Smilo retro kamera</p>
              </div>

              {/* Disposable Column Header */}
              <div className="text-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl opacity-60">📷</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Engångs</p>
              </div>

              {/* Polaroid Column Header */}
              <div className="text-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl opacity-60">🖼️</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Polaroid</p>
              </div>
            </div>

            {/* Feature Rows */}
            <div className="divide-y divide-border">
              {comparisonFeatures.map((item, index) => (
                <motion.div
                  key={item.feature}
                  className="grid grid-cols-4 gap-2 sm:gap-4 p-3 sm:p-4 px-4 sm:px-6 items-center hover:bg-smilo-cream/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <p className="text-xs sm:text-sm text-smilo-brown font-medium">{item.feature}</p>

                  {/* Smilo */}
                  <div className="flex justify-center">
                    {item.smilo ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-smilo-olive flex items-center justify-center">
                        <Check className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Disposable */}
                  <div className="flex justify-center">
                    {item.disposable ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-smilo-olive/40 flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-smilo-olive/60" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  {/* Polaroid */}
                  <div className="flex justify-center">
                    {item.polaroid ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-smilo-olive/40 flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-smilo-olive/60" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-4 sm:p-6 bg-smilo-cream/50 text-center">
              <p className="text-xs sm:text-sm text-smilo-brown-light italic">
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
