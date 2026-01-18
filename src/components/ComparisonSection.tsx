import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import productBlack from "@/assets/product-black.jpg";

const comparisonFeatures = [
  { feature: "Retro-känsla i bilderna", smajl: true, disposable: true, polaroid: true, digital: false },
  { feature: "Skärmfri & distraktion-fri", smajl: true, disposable: true, polaroid: true, digital: false },
  { feature: "Överför bilder direkt till mobilen", smajl: true, disposable: false, polaroid: false, digital: true },
  { feature: "Tusentals bilder per laddning", smajl: true, disposable: false, polaroid: false, digital: true },
  { feature: "Återanvändbar & laddningsbar", smajl: true, disposable: false, polaroid: true, digital: true },
  { feature: "Inga framkallnings-/filmkostnader", smajl: true, disposable: false, polaroid: false, digital: true },
  { feature: "Kompakt & lättanvänd", smajl: true, disposable: true, polaroid: false, digital: false },
  { feature: "Fysiska bilder direkt", smajl: false, disposable: false, polaroid: true, digital: false },
];

const ComparisonSection = () => {
  return (
    <section className="smajl-section bg-smajl-cream-light">
      <div className="smajl-container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="smajl-heading-lg text-smajl-brown mb-4">
            Det bästa av <span className="italic text-smajl-olive">alla världar</span>
          </h2>
          <p className="smajl-body text-smajl-brown-light max-w-xl mx-auto">
            Retrocharm möter modern bekvämlighet ✨
          </p>
        </motion.div>

        {/* Comparison Table */}
        <motion.div
          className="max-w-5xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="bg-white rounded-3xl shadow-card overflow-hidden">
            {/* Header Row */}
            <div className="grid grid-cols-5 gap-2 sm:gap-4 p-4 sm:p-6 pb-4 border-b border-border">
              <div className="col-span-1" />
              
              {/* Smajl Column Header */}
              <div className="text-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-2xl bg-smajl-olive overflow-hidden p-1.5 sm:p-2">
                  <img 
                    src={productBlack} 
                    alt="Smajl kamera" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold text-smajl-brown text-xs sm:text-sm">Smajl</p>
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
              
              {/* Digital Column Header */}
              <div className="text-center">
                <div className="w-14 h-14 sm:w-20 sm:h-20 mx-auto mb-2 sm:mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-2xl sm:text-3xl opacity-60">📱</span>
                </div>
                <p className="text-[10px] sm:text-xs text-muted-foreground">Digital</p>
              </div>
            </div>

            {/* Feature Rows */}
            <div className="divide-y divide-border">
              {comparisonFeatures.map((item, index) => (
                <motion.div
                  key={item.feature}
                  className="grid grid-cols-5 gap-2 sm:gap-4 p-3 sm:p-4 px-4 sm:px-6 items-center hover:bg-smajl-cream/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <p className="text-xs sm:text-sm text-smajl-brown font-medium">{item.feature}</p>
                  
                  {/* Smajl */}
                  <div className="flex justify-center">
                    {item.smajl ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-smajl-olive flex items-center justify-center">
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
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-smajl-olive/40 flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-smajl-olive/60" />
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
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-smajl-olive/40 flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-smajl-olive/60" />
                      </div>
                    ) : (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-3 h-3 sm:w-4 sm:h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Digital */}
                  <div className="flex justify-center">
                    {item.digital ? (
                      <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-smajl-olive/40 flex items-center justify-center">
                        <Check className="w-3 h-3 sm:w-4 sm:h-4 text-smajl-olive/60" />
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
            <div className="p-4 sm:p-6 bg-smajl-cream/50 text-center">
              <p className="text-xs sm:text-sm text-smajl-brown-light italic">
                ✨ Smajl kombinerar det bästa från alla kameratyper – retrocharm, modern teknik och noll löpande kostnader
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
