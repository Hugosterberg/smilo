import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

import productBlack from "@/assets/product-black.jpg";

const comparisonFeatures = [
  { feature: "Skärmfri & distraktion-fri", smajl: true, disposable: true, film: true },
  { feature: "Retro-känsla i bilderna", smajl: true, disposable: true, film: true },
  { feature: "Direkt överföring till mobilen", smajl: true, disposable: false, film: false },
  { feature: "500+ bilder per laddning", smajl: true, disposable: false, film: false },
  { feature: "Återanvändbar & laddningsbar", smajl: true, disposable: false, film: false },
  { feature: "Inga framkallningskostnader", smajl: true, disposable: false, film: false },
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
            Varför välja <span className="italic text-smajl-olive">Smajl</span>?
          </h2>
          <p className="smajl-body text-smajl-brown-light max-w-xl mx-auto">
            Allt det bästa från analoga kameror – utan krånglet
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
            <div className="grid grid-cols-4 gap-4 p-6 pb-4 border-b border-border">
              <div className="col-span-1" />
              
              {/* Smajl Column Header */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-smajl-olive overflow-hidden p-2">
                  <img 
                    src={productBlack} 
                    alt="Smajl kamera" 
                    className="w-full h-full object-contain"
                  />
                </div>
                <p className="font-semibold text-smajl-brown text-sm">Smajl</p>
              </div>
              
              {/* Disposable Column Header */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-3xl opacity-60">📷</span>
                </div>
                <p className="text-xs text-muted-foreground">Engångskamera</p>
              </div>
              
              {/* Film Column Header */}
              <div className="text-center">
                <div className="w-20 h-20 mx-auto mb-3 rounded-2xl bg-muted flex items-center justify-center">
                  <span className="text-3xl opacity-60">🎞️</span>
                </div>
                <p className="text-xs text-muted-foreground">Filmkamera</p>
              </div>
            </div>

            {/* Feature Rows */}
            <div className="divide-y divide-border">
              {comparisonFeatures.map((item, index) => (
                <motion.div
                  key={item.feature}
                  className="grid grid-cols-4 gap-4 p-4 px-6 items-center hover:bg-smajl-cream/30 transition-colors"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: 0.1 + index * 0.05 }}
                >
                  <p className="text-sm text-smajl-brown font-medium">{item.feature}</p>
                  
                  {/* Smajl */}
                  <div className="flex justify-center">
                    <div className="w-8 h-8 rounded-full bg-smajl-olive flex items-center justify-center">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                  </div>
                  
                  {/* Disposable */}
                  <div className="flex justify-center">
                    {item.disposable ? (
                      <div className="w-8 h-8 rounded-full border-2 border-smajl-olive/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-smajl-olive/60" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                  
                  {/* Film */}
                  <div className="flex justify-center">
                    {item.film ? (
                      <div className="w-8 h-8 rounded-full border-2 border-smajl-olive/40 flex items-center justify-center">
                        <Check className="w-4 h-4 text-smajl-olive/60" />
                      </div>
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                        <X className="w-4 h-4 text-muted-foreground" />
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Footer */}
            <div className="p-6 bg-smajl-cream/50 text-center">
              <p className="text-sm text-smajl-brown-light italic">
                ✨ Smajl kombinerar det bästa av två världar – retrocharm och modern bekvämlighet
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonSection;
